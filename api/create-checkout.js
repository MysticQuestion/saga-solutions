const PACKAGES = {
  diagnostic: {
    name: 'System Diagnostic',
    priceEnv: 'STRIPE_PRICE_DIAGNOSTIC',
    livePriceId: 'price_1U5tfw0TbfgV8jIjuTLRQIKX',
  },
  blueprint: {
    name: 'Build Blueprint',
    priceEnv: 'STRIPE_PRICE_BLUEPRINT',
    livePriceId: 'price_1U5tg80TbfgV8jIj0bGH5dyN',
  },
  prototype: {
    name: 'Prototype Sprint',
    priceEnv: 'STRIPE_PRICE_PROTOTYPE',
    livePriceId: 'price_1U5tgF0TbfgV8jIjhtAhy7cr',
  },
};

function send(res, status, body) {
  res.status(status).json(body);
}

function clean(value, max = 300) {
  return String(value || '').trim().slice(0, max);
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(res, 405, { error: 'Method not allowed.' });
  }

  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const siteUrl = (process.env.PUBLIC_SITE_URL || `https://${req.headers.host}`).replace(/\/$/, '');
  const packageId = clean(req.body?.packageId, 80);
  const customerEmail = clean(req.body?.customerEmail, 320);
  const customerName = clean(req.body?.customerName, 200);
  const projectTitle = clean(req.body?.projectTitle, 200);
  const selectedPackage = PACKAGES[packageId];

  if (!stripeKey) {
    return send(res, 503, {
      code: 'PAYMENTS_NOT_CONFIGURED',
      error: 'Checkout is not configured for this deployment.',
    });
  }

  if (!selectedPackage) {
    return send(res, 400, {
      code: 'PACKAGE_NOT_AVAILABLE',
      error: 'This engagement is not available through fixed-price checkout.',
    });
  }

  if (!customerEmail || !customerName || !projectTitle) {
    return send(res, 400, {
      error: 'Name, email, and project title are required.',
    });
  }

  const priceId = process.env[selectedPackage.priceEnv] || selectedPackage.livePriceId;
  const form = new URLSearchParams();
  form.set('mode', 'payment');
  form.set('line_items[0][price]', priceId);
  form.set('line_items[0][quantity]', '1');
  form.set('customer_email', customerEmail);
  form.set(
    'success_url',
    `${siteUrl}/checkout?payment=success&session_id={CHECKOUT_SESSION_ID}&package=${encodeURIComponent(packageId)}`,
  );
  form.set('cancel_url', `${siteUrl}/checkout?payment=cancelled&package=${encodeURIComponent(packageId)}`);
  form.set('metadata[package_id]', packageId);
  form.set('metadata[package_name]', selectedPackage.name);
  form.set('metadata[customer_name]', customerName);
  form.set('metadata[project_title]', projectTitle);
  form.set('payment_intent_data[metadata][package_id]', packageId);
  form.set('payment_intent_data[metadata][project_title]', projectTitle);

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
      console.error('Stripe checkout error', session?.error?.type || stripeResponse.status);
      return send(res, 502, {
        error: session?.error?.message || 'Stripe could not create the checkout session.',
      });
    }

    return send(res, 200, {
      url: session.url,
      sessionId: session.id,
      packageId,
    });
  } catch (error) {
    console.error('Checkout endpoint failed', error);
    return send(res, 500, { error: 'Checkout is temporarily unavailable.' });
  }
}
