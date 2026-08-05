import crypto from 'node:crypto';

const COORDINATOR_EMAIL = process.env.PROJECT_COORDINATOR_EMAIL || 'ericmichael.wil@gmail.com';

function send(res, status, body) {
  res.status(status).json(body);
}

function safe(value, max = 5000) {
  return String(value || '').trim().slice(0, max);
}

function escapeHtml(value) {
  return safe(value, 16000)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

async function verifyCheckout(sessionId) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('Stripe verification is not configured.');

  const response = await fetch(
    `https://api.stripe.com/v1/checkout/sessions/${encodeURIComponent(sessionId)}?expand[]=customer_details`,
    { headers: { Authorization: `Bearer ${key}` } },
  );
  const session = await response.json();

  if (!response.ok) {
    throw new Error(session?.error?.message || 'Checkout session could not be verified.');
  }
  if (session.payment_status !== 'paid') {
    throw new Error('The checkout session has not been paid.');
  }
  return session;
}

async function recordPayment(record) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return;

  const response = await fetch(
    `${url}/rest/v1/payment_events?on_conflict=stripe_session_id`,
    {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'resolution=merge-duplicates,return=minimal',
      },
      body: JSON.stringify(record),
    },
  );

  if (!response.ok) {
    throw new Error(`Payment record failed: ${await response.text()}`);
  }
}

async function sendEmail({ to, subject, html, replyTo }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.SAGA_FROM_EMAIL;
  if (!apiKey || !from) throw new Error('Payment email delivery is not configured.');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject,
      html,
      reply_to: replyTo || undefined,
    }),
  });

  if (!response.ok) {
    throw new Error(`Email delivery failed: ${await response.text()}`);
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(res, 405, { error: 'Method not allowed.' });
  }

  const { sessionId, packageId } = req.body || {};
  if (!sessionId) return send(res, 400, { error: 'A checkout session is required.' });

  try {
    const session = await verifyCheckout(sessionId);
    const reference = `SAGA-PAY-${new Date().toISOString().slice(0, 10).replaceAll('-', '')}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    const email = safe(session.customer_details?.email || session.customer_email, 320);
    const name = safe(session.customer_details?.name || session.metadata?.customer_name, 250);
    const projectTitle = safe(session.metadata?.project_title, 300);
    const packageName = safe(session.metadata?.package_name, 180);
    const amount = Number(session.amount_total || 0);

    await recordPayment({
      stripe_session_id: safe(session.id, 300),
      stripe_payment_intent_id: safe(session.payment_intent, 300),
      reference,
      package_id: safe(packageId || session.metadata?.package_id, 80),
      package_name: packageName,
      customer_name: name,
      customer_email: email,
      project_title: projectTitle,
      amount_total: amount,
      currency: safe(session.currency, 20),
      payment_status: safe(session.payment_status, 50),
    });

    const amountDisplay = (amount / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: (session.currency || 'usd').toUpperCase(),
    });

    await sendEmail({
      to: COORDINATOR_EMAIL,
      replyTo: email,
      subject: `[${reference}] Saga Solutions payment received`,
      html: `
        <h1>Payment received</h1>
        <p><strong>Reference:</strong> ${escapeHtml(reference)}</p>
        <p><strong>Amount:</strong> ${escapeHtml(amountDisplay)}</p>
        <p><strong>Package:</strong> ${escapeHtml(packageName || packageId || 'Not identified')}</p>
        <p><strong>Client:</strong> ${escapeHtml(name || 'Not supplied')} &lt;${escapeHtml(email || 'Not supplied')}&gt;</p>
        <p><strong>Project:</strong> ${escapeHtml(projectTitle || 'Not supplied')}</p>
        <p>The client has been directed to the post-purchase commissioning brief. A second email will follow when the detailed survey is submitted.</p>
      `,
    });

    return send(res, 200, { reference });
  } catch (error) {
    console.error('Payment confirmation failed', error);
    return send(res, 400, { error: error.message || 'Payment could not be verified.' });
  }
}
