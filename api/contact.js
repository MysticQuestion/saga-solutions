import crypto from 'node:crypto';

const OPERATIONS_EMAIL = process.env.PROJECT_OPERATIONS_EMAIL || 'info@sagasystems.net';
const PUBLIC_CONTACT_EMAIL = process.env.PUBLIC_CONTACT_EMAIL || 'info@sagasystems.net';

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

function htmlLines(value) {
  return escapeHtml(value).replaceAll('\n', '<br>');
}

async function insertSupabase(table, record) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return { configured: false };

  const response = await fetch(`${url}/rest/v1/${table}`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(record),
  });

  if (!response.ok) throw new Error(`Project record insert failed: ${await response.text()}`);
  return { configured: true };
}

async function sendEmail({ to, subject, html, replyTo }) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.SAGA_FROM_EMAIL;
  if (!apiKey || !from) return { configured: false };

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

  if (!response.ok) throw new Error(`Email delivery failed: ${await response.text()}`);
  return { configured: true };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(res, 405, { error: 'Method not allowed.' });
  }

  const input = req.body || {};
  const required = ['name', 'email', 'projectTitle', 'projectSummary'];
  if (required.some((field) => !safe(input[field]))) {
    return send(res, 400, {
      error: 'Name, email, project title, and project summary are required.',
    });
  }

  const reference = `SAGA-${new Date().toISOString().slice(0, 10).replaceAll('-', '')}-${crypto.randomBytes(3).toString('hex').toUpperCase()}`;
  const record = {
    reference,
    name: safe(input.name, 250),
    email: safe(input.email, 320),
    phone: safe(input.phone, 80),
    organization: safe(input.organization, 250),
    project_title: safe(input.projectTitle, 300),
    project_summary: safe(input.projectSummary, 12000),
    budget: safe(input.budget, 120),
    timeline: safe(input.timeline, 120),
    package_id: safe(input.packageId, 80),
    package_name: safe(input.packageName, 180),
    source: safe(input.source, 180),
    status: 'new',
  };

  const operationsHtml = `
    <h1>Saga Systems / new project outline</h1>
    <p><strong>Reference:</strong> ${escapeHtml(reference)}</p>
    <p><strong>Client:</strong> ${escapeHtml(record.name)} &lt;${escapeHtml(record.email)}&gt;</p>
    <p><strong>Phone:</strong> ${escapeHtml(record.phone || 'Not supplied')}</p>
    <p><strong>Organization:</strong> ${escapeHtml(record.organization || 'Not supplied')}</p>
    <p><strong>Selected engagement:</strong> ${escapeHtml(record.package_name || record.package_id || 'Not selected')}</p>
    <p><strong>Project:</strong> ${escapeHtml(record.project_title)}</p>
    <p><strong>Summary:</strong><br>${htmlLines(record.project_summary)}</p>
    <p><strong>Budget:</strong> ${escapeHtml(record.budget || 'Not supplied')}</p>
    <p><strong>Timing:</strong> ${escapeHtml(record.timeline || 'Not supplied')}</p>
  `;

  try {
    const storage = await insertSupabase('project_leads', record);
    const email = await sendEmail({
      to: OPERATIONS_EMAIL,
      subject: `[${reference}] New Saga Systems project outline`,
      html: operationsHtml,
      replyTo: record.email,
    });

    if (!email.configured) {
      return send(res, 503, {
        code: 'CONTACT_NOT_CONFIGURED',
        error: 'Project email delivery has not been configured.',
      });
    }

    await sendEmail({
      to: record.email,
      subject: `Saga Systems received your project outline — ${reference}`,
      html: `
        <p>Hello ${escapeHtml(record.name)},</p>
        <p>Your project outline for <strong>${escapeHtml(record.project_title)}</strong> has been received under reference <strong>${escapeHtml(reference)}</strong>.</p>
        <p>The selected entry point is <strong>${escapeHtml(record.package_name || 'to be confirmed')}</strong>. A paid checkout or written scope will establish the engagement.</p>
        <p>Saga Systems<br>
        Project Operations<br>
        ${escapeHtml(PUBLIC_CONTACT_EMAIL)}</p>
      `,
      replyTo: PUBLIC_CONTACT_EMAIL,
    });

    return send(res, 200, {
      reference,
      stored: storage.configured,
    });
  } catch (error) {
    console.error('Contact endpoint failed', error);
    return send(res, 500, { error: 'The project outline could not be recorded.' });
  }
}
