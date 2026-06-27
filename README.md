# Saga Vibes Studio

Saga Vibes Studio is the market-facing name for the Saga cashflow engine. It preserves the vibe-coding language while making the business concrete: fast AI-assisted launch systems, invoice-starter offers, cultural intelligence products, portfolio proof, and larger service packages.

## Commercial role

Saga Vibes Studio should do five things immediately:

1. Present small paid offers that can close quickly.
2. Capture qualified inquiries through an intake form.
3. Show a portfolio of existing work so the studio feels real.
4. Convert starter invoices into larger packages and retainers.
5. Keep the broader Saga ecosystem legible without making every experiment compete for attention.

## Invoice-starter offers

- Website Clarity Audit — $150.
- One-Page Offer Sheet — $250.
- Vibe-Coded Landing Page — $500.
- Culture Signal Brief — $99.

## Larger packages

- Local Presence Sprint.
- AI Operations Sprint.
- Grant + Pitch Packet.
- Content Engine Retainer.

## Portfolio

The site includes portfolio cards for Mystic Sage, Oakland STREETS / Pure Street, Saga Vibes Studio, Questlyne, Neural Breach, and Saga Civic / CTI.

## Intake form setup

The React app expects this environment variable:

```bash
VITE_SAGA_INTAKE_FORM_URL=https://forms.gle/YOUR_FORM_URL
```

Create a form, publish it, and add the public form URL as `VITE_SAGA_INTAKE_FORM_URL` in Lovable or Vercel.

## Development

```bash
npm install
npm run dev
npm run build
npm run preview
```

## Technical notes

- `index.html` contains SEO metadata, structured data, and static fallback content.
- `src/main.jsx` contains the React app, offers, packages, portfolio, and intake-link architecture.
- `public/robots.txt` and `public/sitemap.xml` help crawlers discover the site.
