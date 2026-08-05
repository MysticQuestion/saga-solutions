# Saga Solutions Intake Architecture

## Public surface

The Vite client contains the portfolio, capability matcher, paid package selection, pre-payment project outline, and post-purchase commissioning survey.

## Trust boundaries

The browser may choose a package identifier but cannot choose a Stripe Price ID. The serverless checkout function maps a whitelisted package identifier to a server-held environment variable.

The browser receives a Stripe Checkout Session ID only through the success redirect. Both payment-related serverless functions retrieve the session directly from Stripe and require `payment_status=paid`.

## Data flow

### Unpaid lead

`POST /api/contact`

- validates minimum project information;
- writes `project_leads` through the Supabase service role when configured;
- sends the coordinator a reply-ready summary;
- sends the prospective client a reference.

### Checkout

`POST /api/create-checkout`

- maps package ID to Stripe Price ID;
- creates a hosted Checkout Session;
- stores customer/project metadata on the session;
- returns the Stripe-hosted checkout URL.

### Payment return

`POST /api/payment-confirmation`

- verifies the Checkout Session;
- upserts a `payment_events` record;
- emails the project coordinator an immediate payment notice;
- directs the client to complete the detailed survey.

### Paid commissioning brief

`POST /api/submit-project`

- verifies the Checkout Session again;
- stores the complete `project_intakes` record;
- emails the coordinator the payment and project summary;
- emails the client a confirmation and project reference.

## Required hardening before scale

1. Add Stripe webhook verification for `checkout.session.completed`.
2. Add IP/user rate limiting to all public POST routes.
3. Add Turnstile or an equivalent anti-abuse control to unpaid intake.
4. Add structured logging with request IDs and alerting.
5. Create an authenticated coordinator dashboard using Supabase Auth.
6. Add retention and deletion policies for client data.
7. Add privacy, terms, refund, cancellation, and statement-of-work pages.
8. Replace launch pricing only after validating delivery cost and contribution margin.
