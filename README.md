# Saga Solutions

A revenue-ready public site and project-intake system for Saga Solutions.

The root application is intentionally direct: it explains what Saga Solutions does, presents live portfolio work, helps visitors map a problem to the appropriate capabilities, sells defined entry-point engagements, sends clients through Stripe Checkout, and collects a detailed post-purchase commissioning brief.

## Current architecture

- **Frontend:** React + Vite
- **Hosting and API runtime:** Vercel
- **Payments:** Stripe Checkout
- **Project records:** Supabase/Postgres
- **Transactional email:** Resend
- **Visual system:** custom dark editorial interface using the supplied Saga Solutions city artwork

## Revenue workflow

1. A visitor reviews the portfolio and service capabilities.
2. The visitor chooses a paid engagement.
3. The visitor supplies basic identity and project context.
4. `/api/create-checkout` creates a Stripe Checkout session using a package-specific Stripe Price ID.
5. Stripe returns the paid customer to the commissioning brief.
6. `/api/payment-confirmation` verifies the session and sends the project coordinator an immediate payment summary.
7. The customer completes the detailed commissioning survey.
8. `/api/submit-project` re-verifies payment, saves the complete record in Supabase, emails the coordinator a consolidated brief, and sends the customer a confirmation.
9. Visitors who need an invoice can use `/api/contact` instead of card checkout.

Card data is never collected by the Saga Solutions frontend.

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

The public interface runs without credentials. Payments, database writes, and automated email remain visibly unavailable until their environment variables are configured.

## Production configuration

Create four Stripe products/prices matching the displayed packages, then populate:

- `STRIPE_PRICE_DIAGNOSTIC`
- `STRIPE_PRICE_BLUEPRINT`
- `STRIPE_PRICE_PROTOTYPE`
- `STRIPE_PRICE_PARTNER`

Apply the SQL migration:

```text
supabase/migrations/20260805_saga_solutions_intake.sql
```

Configure Supabase server credentials, a verified Resend sending domain, the coordinator email, and the canonical public URL using `.env.example`.

## Required Vercel variables

```text
PUBLIC_SITE_URL
STRIPE_SECRET_KEY
STRIPE_PRICE_DIAGNOSTIC
STRIPE_PRICE_BLUEPRINT
STRIPE_PRICE_PROTOTYPE
STRIPE_PRICE_PARTNER
SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
RESEND_API_KEY
SAGA_FROM_EMAIL
PROJECT_COORDINATOR_EMAIL
```

Use production Stripe keys only in the Production environment. Keep preview deployments on test keys and test Price IDs.

## Quality and security notes

- API routes whitelist package identifiers; the browser cannot submit an arbitrary Stripe price.
- Payment and paid-survey endpoints verify the Checkout Session server-side.
- Project tables use row-level security and intentionally expose no anonymous read or write policies.
- Service-role and Stripe secret keys are server-side only.
- Email content escapes client-supplied HTML.
- The current payment notification is triggered when Stripe redirects the customer back to the site. Add a signed Stripe webhook before treating the system as failure-proof for customers who close the Stripe tab instead of returning.
- Add rate limiting, CAPTCHA/Turnstile, and an authenticated coordinator dashboard before high-volume marketing.

## Portfolio links

The site currently routes to:

- STREETS Environmental Sentinel Network
- Saga Vibes
- Mystic Sage
- Bay Evidence Hub
- Ark of Bones
- The Questlyne

Audit these URLs as projects change. Do not leave dead navigation in production.

## Next commercial additions

The interface identifies the next practical modules:

- authenticated client workspace;
- procurement and vendor-readiness desk;
- methods and governance library;
- recurring retainer packages;
- partner/specialist network;
- signed Stripe webhook;
- analytics and funnel reporting;
- consent-based mailing list and CRM routing.
