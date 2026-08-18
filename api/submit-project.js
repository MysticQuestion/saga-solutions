import crypto from 'node:crypto';

const OPERATIONS_EMAIL = process.env.PROJECT_OPERATIONS_EMAIL || 'info@sagasystems.net';
const PUBLIC_CONTACT_EMAIL = process.env.PUBLIC_CONTACT_EMAIL || 'info@sagasystems.net';

function send(res, status, body) {
  res.status(status).json(body);
}

function safe(value, max = 10000) {
  return String(value || '').trim().slice(0, max);
}

function escapeHtml(value) {
  return safe(value, 20000)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function htmlLines(value) {
  return escapeHtml(value).replaceAll('\n', '<br>');
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

async function insertSupabase(record) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error('Project record storage is not configured.');

  const response = await fetch(`${url}/rest/v1/project_intakes`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(record),
  });

  if (!response.ok) {
    throw new Error(`Project record insert failed: ${await response.text()}`);
  }
}

async function sendEmail({ to, subject, html, replyTo }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.SAGA_FROM_EMAIL;
  if (!apiKey || !from) throw new Error('Project email delivery is not configured.');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: Array.isArray(to) ? to : [to],
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

  const { sessionId, packageId, lead = {}, brief = {} } = req.body || {};
  if (!sessionId) return send(res, 400, { error: 'A checkout session is required.' });

  const requiredBrief = ['desiredOutcome', 'primaryUsers', 'requiredFeatures', 'successMeasures'];
  if (requiredBrief.some((field) => !safe(brief[field]))) {
    return send(res, 400, { error: 'The commissioning brief is incomplete.' });
  }

  try {
    const session = await verifyCheckout(sessionId);
    const reference = `SAGA-${new Date().toISOString().slice(0, 10).replaceAll('-', '')}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
    const customerEmail =
      safe(session.customer_details?.email, 320) || safe(session.customer_email, 320) || safe(lead.email, 320);
    const customerName = safe(session.customer_details?.name, 250) || safe(lead.name, 250);

    const record = {
      reference,
      stripe_session_id: safe(session.id, 300),
      stripe_payment_intent_id: safe(session.payment_intent, 300),
      payment_status: safe(session.payment_status, 50),
      amount_total: Number(session.amount_total || 0),
      currency: safe(session.currency, 20),
      package_id: safe(packageId || session.metadata?.package_id, 80),
      package_name: safe(session.metadata?.package_name, 180),
      customer_name: customerName,
      customer_email: customerEmail,
      customer_phone: safe(lead.phone, 80),
      organization: safe(lead.organization, 250),
      project_title: safe(lead.projectTitle || session.metadata?.project_title, 300),
      project_summary: safe(lead.projectSummary, 12000),
      budget: safe(lead.budget, 120),
      timeline: safe(lead.timeline, 120),
      desired_outcome: safe(brief.desiredOutcome, 12000),
      primary_users: safe(brief.primaryUsers, 12000),
      required_features: safe(brief.requiredFeatures, 16000),
      reference_links: safe(brief.referenceLinks, 12000),
      existing_assets: safe(brief.existingAssets, 12000),
      integrations: safe(brief.integrations, 12000),
      success_measures: safe(brief.successMeasures, 12000),
      constraints: safe(brief.constraints, 12000),
      decision_makers: safe(brief.decisionMakers, 1000),
      target_launch: safe(brief.targetLaunch, 40) || null,
      status: 'paid_intake_received',
    };

    await insertSupabase(record);

    const amountDisplay = (record.amount_total / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: (record.currency || 'usd').toUpperCase(),
    });

    const summary = `
      <h1>Saga Systems / paid commissioning brief</h1>
      <p><strong>Reference:</strong> ${escapeHtml(reference)}</p>
      <p><strong>Payment:</strong> ${escapeHtml(amountDisplay)} — ${escapeHtml(record.payment_status)}</p>
      <p><strong>Engagement:</strong> ${escapeHtml(record.package_name || record.package_id)}</p>
      <p><strong>Client:</strong> ${escapeHtml(record.customer_name)} &lt;${escapeHtml(record.customer_email)}&gt;</p>
      <p><strong>Phone:</strong> ${escapeHtml(record.customer_phone || 'Not supplied')}</p>
      <p><strong>Organization:</strong> ${escapeHtml(record.organization || 'Not supplied')}</p>
      <p><strong>Project:</strong> ${escapeHtml(record.project_title || 'Untitled')}</p>
      <hr>
      <h2>Initial summary</h2>
      <p>${htmlLines(record.project_summary || 'Not supplied')}</p>
      <h2>Required outcome</h2>
      <p>${htmlLines(record.desired_outcome)}</p>
      <h2>Primary users and stakeholders</h2>
      <p>${htmlLines(record.primary_users)}</p>
      <h2>Required functions and deliverables</h2>
      <p>${htmlLines(record.required_features)}</p>
      <h2>Success measures</h2>
      <p>${htmlLines(record.success_measures)}</p>
      <h2>References, assets, and integrations</h2>
      <p><strong>Links:</strong><br>${htmlLines(record.reference_links || 'None supplied')}</p>
      <p><strong>Assets:</strong><br>${htmlLines(record.existing_assets || 'None supplied')}</p>
      <p><strong>Integrations:</strong><br>${htmlLines(record.integrations || 'None supplied')}</p>
      <h2>Constraints and governance</h2>
      <p>${htmlLines(record.constraints || 'None supplied')}</p>
      <p><strong>Decision-makers:</strong> ${escapeHtml(record.decision_makers || 'Not supplied')}</p>
      <p><strong>Target launch:</strong> ${escapeHtml(record.target_launch || 'Not supplied')}</p>
    `;

    await sendEmail({
      to: OPERATIONS_EMAIL,
      subject: `[${reference}] Paid commissioning brief — ${record.project_title || record.package_name}`,
      html: summary,
      replyTo: customerEmail,
    });

    if (customerEmail) {
      await sendEmail({
        to: customerEmail,
        subject: `Saga Systems commissioning brief confirmed — ${reference}`,
        html: `
          <p>Hello ${escapeHtml(customerName || 'there')},</p>
          <p>Your payment and commissioning brief have been verified and recorded under reference <strong>${escapeHtml(reference)}</strong>.</p>
          <p>Saga Systems has received the consolidated project record. The next communication will confirm scope, scheduling, dependencies, and the first decision required from you.</p>
          <p>Saga Systems<br>
          Project Operations<br>
          ${escapeHtml(PUBLIC_CONTACT_EMAIL)}</p>
        `,
        replyTo: PUBLIC_CONTACT_EMAIL,
      });
    }

    return send(res, 200, { reference });
  } catch (error) {
    console.error('Paid project intake failed', error);
    return send(res, 400, { error: error.message || 'The paid project intake could not be completed.' });
  }
}
