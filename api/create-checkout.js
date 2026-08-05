const PACKAGES = {
  diagnostic: {
    name: 'Diagnostic Sprint',
    priceEnv: 'STRIPE_PRICE_DIAGNOSTIC',
  },
  blueprint: {
    name: 'Build Blueprint',
    priceEnv: 'STRIPE_PRICE_BLUEPRINT',
  },
  prototype: {
    name: 'Prototype Sprint',
    priceEnv: 'STRIPE_PRICE_PROTOTYPE',
  },
  partner: {
    name: 'Embedded Project Partner',
    priceEnv: 'STRIPE_PRICE_PARTNER',
  },
};

function send(res, status, body) {
  res.status(status).json(body);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(res, 405, { error: 'Method not allowed.' });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const siteUrl = process.env.PUBLIC_SITE_URL || `https://${req.headers.host}`;
  const { packageId, customerEmail, customerName, projectTitle } = req.body || {};
  const selectedPackage = PACKAGES[packageId];

  if (!stripeKey || !selectedPackage || !process.env[selectedPackage.priceEnv]) {
    return send(res, 503, {
      code: 'PAYMENTS_NOT_CONFIGURED',
      error: 'Stripe checkout has not been configured for this package.',
    });
  }

  if (!customerEmail || !customerName || !projectTitle) {
    return send(res, 400, {
      error: 'Customer name, email, and project title are required.',
    });
  }

  const form = new URLSearchParams();
  form.set('mode', 'payment');
  form.set('line_items[0][price]', process.env[selectedPackage.priceEnv]);
  form.set('line_items[0][quantity]', '1');
  form.set('customer_email', customerEmail);
  form.set(
    'success_url',
    `${siteUrl}/?payment=success&session_id={CHECKOUT_SESSION_ID}&package=${encodeURIComponent(packageId)}#project-brief`,
  );
  form.set('cancel_url', `${siteUrl}/?payment=cancelled#start-project`);
  form.set('metadata[package_id]', packageId);
  form.set('metadata[package_name]', selectedPackage.name);
  form.set('metadata[customer_name]', customerName.slice(0, 200));
  form.set('metadata[project_title]', projectTitle.slice(0, 200));
  form.set('payment_intent_data[metadata][package_id]', packageId);
  form.set('payment_intent_data[metadata][project_title]', projectTitle.slice(0, 200));

  try {
    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${stripeKey}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: form,
    });

    const session = await stripeResponse.json();
    if (!stripeResponse.ok || !session.url) {
      console.error('Stripe checkout error', session);
      return send(res, 502, {
        error: session?.error?.message || 'Stripe could not create the checkout session.',
      });
    }

    return send(res, 200, { url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Checkout endpoint failed', error);
    return send(res, 500, { error: 'Checkout is temporarily unavailable.' });
  }
}
