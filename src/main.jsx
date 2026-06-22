import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  BookOpen,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Code2,
  ExternalLink,
  FileText,
  Globe2,
  Landmark,
  Layers3,
  Rocket,
  Search,
  ShieldCheck,
  Sparkles,
  Store,
  TerminalSquare,
  Workflow,
} from 'lucide-react';

const contactEmail = 'ericmichael.wil@gmail.com';

const links = {
  mysticSage: 'https://mysticsage.xyz/',
  streets: 'https://oaklandstreets.live/',
  questlyne: 'https://thequestlyne.blogspot.com/',
  sagaVibesPrototype: 'https://saga-vibe-studio.lovable.app/',
  githubRepo: 'https://github.com/MysticQuestion/saga-solutions',
};

const packages = [
  {
    title: 'Local Presence Sprint',
    price: '$750–$1,500',
    timeline: '5–10 business days',
    icon: Globe2,
    audience: 'Local businesses, solo founders, community orgs, artists, service providers, and first-time operators who need credibility fast.',
    deliverables: [
      'Conversion-ready one-page website or landing page',
      'Offer positioning, headline system, and contact flow',
      'Basic SEO metadata, Open Graph text, and launch checklist',
      'Google Business Profile setup checklist',
      'Three reusable social or announcement templates',
    ],
  },
  {
    title: 'AI Operations Sprint',
    price: '$1,500–$3,500',
    timeline: '10–21 business days',
    icon: Bot,
    audience: 'Service businesses and lean teams that need intake, follow-up, documentation, and basic automation without hiring a full operations department.',
    deliverables: [
      'Client intake form and response workflow',
      'CRM sheet, Airtable, or lightweight database structure',
      'FAQ assistant or internal knowledge-base plan',
      'Proposal, estimate, and follow-up templates',
      'Automation map with risks, data boundaries, and next steps',
    ],
  },
  {
    title: 'Grant + Pitch Packet',
    price: '$900–$2,500',
    timeline: '7–14 business days',
    icon: FileText,
    audience: 'Nonprofits, civic startups, artists, cultural workers, and social-impact founders preparing for grants, sponsors, pilots, or partnerships.',
    deliverables: [
      'One-page executive brief',
      'Five-to-eight-slide pitch structure',
      'Budget narrative and impact logic',
      'Outreach email sequence',
      'Public landing page or proposal summary section',
    ],
  },
  {
    title: 'Content Engine Retainer',
    price: '$600–$2,000/mo',
    timeline: 'Monthly',
    icon: BookOpen,
    audience: 'Founders, writers, advocates, and organizations that need a steady publishing system instead of sporadic posts.',
    deliverables: [
      'Four articles, essays, or blog posts per month',
      'Eight social posts or newsletter segments per month',
      'SEO topic map and editorial calendar',
      'Monthly analytics and positioning review',
      'Repurposing plan for email, social, and website updates',
    ],
  },
];

const vibeProducts = [
  {
    title: 'Culture Signal Brief',
    price: '$49–$149',
    body: 'A concise interpretation of a trend, artist, aesthetic, public figure, album, show, platform behavior, or social mood through the Saga Vibes lens.',
  },
  {
    title: 'Identity + Aesthetic Audit',
    price: '$149–$500',
    body: 'A consumer-facing reflection product for creators, personal brands, artists, and founders who need sharper self-presentation and emotional resonance.',
  },
  {
    title: 'Music Mood Map',
    price: '$29–$99',
    body: 'A playlist, listening note, or music-personality interpretation that connects sound, memory, taste, mood, and self-understanding.',
  },
  {
    title: 'Social Energy Reading',
    price: '$39–$125',
    body: 'A structured reflection on group dynamics, attraction patterns, lifestyle signals, friendship chemistry, and the social codes shaping a person or scene.',
  },
];

const divisions = [
  {
    title: 'Saga Solutions Studio',
    kicker: 'Web, automation, and launch systems',
    body: 'The cashflow desk for websites, landing pages, offer pages, client intake systems, automations, grant packets, and content infrastructure.',
    icon: Sparkles,
    href: '#packages',
    cta: 'View service packages',
  },
  {
    title: 'Saga Vibes',
    kicker: 'Cultural & emotional intelligence',
    body: 'Media, identity, mysticism, music, lifestyle psychology, social energy, trend interpretation, and consumer-facing reflection tools.',
    icon: BrainCircuit,
    href: '#saga-vibes',
    cta: 'Open Saga Vibes lane',
  },
  {
    title: 'Saga Civic',
    kicker: 'Public-interest research desk',
    body: 'Grant packets, public-data briefs, records-request support, and civic intelligence products for organizations trying to prove need and win support.',
    icon: Landmark,
    href: '#civic',
    cta: 'See civic products',
  },
  {
    title: 'Saga Media',
    kicker: 'Writing and narrative systems',
    body: 'Articles, research-backed essays, campaign language, content calendars, newsletters, and editorial infrastructure for serious public communication.',
    icon: BookOpen,
    href: '#media',
    cta: 'Open media lane',
  },
  {
    title: 'Saga Labs',
    kicker: 'Experimental venture shelf',
    body: 'Neural Breach, Questlyne, CTI, software experiments, and commerce concepts stay visible but do not distract from the paid studio offers.',
    icon: TerminalSquare,
    href: '#ventures',
    cta: 'Review ventures',
  },
];

const ventures = [
  {
    title: 'Mystic Sage',
    type: 'Scalable IP product',
    body: 'Symbolic intelligence, Aethos reports, tools, workshops, and paid interpretive products. This is the long-term digital product lane.',
    icon: BrainCircuit,
    href: links.mysticSage,
  },
  {
    title: 'Oakland STREETS / Pure Street',
    type: 'Civic infrastructure product',
    body: 'Environmental condition audits, corridor monitoring, grant-ready civic intelligence, and field-response documentation for Oakland and beyond.',
    icon: Search,
    href: links.streets,
  },
  {
    title: 'Questlyne',
    type: 'Essay and authorship archive',
    body: 'A publication lane for essays, spiritual analysis, cultural criticism, and long-form intellectual work that can feed paid content packages.',
    icon: BookOpen,
    href: links.questlyne,
  },
  {
    title: 'Neural Breach',
    type: 'Commerce/storyworld experiment',
    body: 'A future apparel and storyworld node. Kept as a concept shelf until audience, product photos, fulfillment, and demand are stronger.',
    icon: Store,
    href: '#labs',
  },
];

const proofPoints = [
  'The offer is understandable in ten seconds: websites, automation, pitch packets, content systems, cultural intelligence, and civic research.',
  'Every primary CTA resolves to an internal section, external property, repository, or pre-filled inquiry email.',
  'Saga Vibes is now separated from the technical build studio, so the emotional/cultural intelligence brand has room to become its own product lane.',
  'Search and accessibility crawlers get real page text through the static fallback in index.html plus live React content.',
];

function inquiryHref(subject, body = '') {
  const normalizedBody = body || `Hi Eric-Michael,\n\nI am interested in ${subject}.\n\nProject or organization:\nGoal:\nTimeline:\nBudget range:\nBest way to reach me:\n\nThanks.`;
  return `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(normalizedBody)}`;
}

function ExternalAwareLink({ href, children, className = '', external = false, ariaLabel }) {
  const isExternal = external || href?.startsWith('http');
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      className={className}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
    >
      {children}
      {isExternal ? <ExternalLink size={15} aria-hidden="true" /> : null}
    </a>
  );
}

function PackageCard({ item }) {
  const Icon = item.icon;
  return (
    <article className="package-card">
      <div className="card-topline">
        <span className="card-icon"><Icon size={23} /></span>
        <span className="timeline">{item.timeline}</span>
      </div>
      <p className="kicker">Paid offer</p>
      <h3>{item.title}</h3>
      <p className="price">{item.price}</p>
      <p className="audience">{item.audience}</p>
      <ul>
        {item.deliverables.map((deliverable) => (
          <li key={deliverable}><CheckCircle2 size={16} /> {deliverable}</li>
        ))}
      </ul>
      <ExternalAwareLink href={inquiryHref(`Saga inquiry: ${item.title}`)} className="button primary full">
        Start this sprint <ArrowRight size={17} />
      </ExternalAwareLink>
    </article>
  );
}

function InquiryBuilder() {
  const [selectedPackage, setSelectedPackage] = useState(packages[0].title);
  const [goal, setGoal] = useState('');

  const selected = packages.find((item) => item.title === selectedPackage) || packages[0];
  const body = `Hi Eric-Michael,\n\nI am interested in the ${selected.title}.\n\nMy project goal:\n${goal || '[Add your goal here]'}\n\nTimeline:\nBudget range:\nCurrent website or social link:\nBest way to reach me:\n\nThanks.`;

  return (
    <div className="inquiry-panel" id="contact">
      <div>
        <p className="eyebrow">Lead capture</p>
        <h2>Turn the next conversation into a paid scope.</h2>
        <p>
          Use this as the working contact flow until Stripe, Calendly, or a CRM form is added. It creates a
          pre-filled inquiry email instead of sending visitors into a dead button.
        </p>
      </div>
      <div className="inquiry-form" aria-label="Saga Solutions inquiry builder">
        <label>
          Choose a service
          <select value={selectedPackage} onChange={(event) => setSelectedPackage(event.target.value)}>
            {packages.map((item) => (
              <option key={item.title} value={item.title}>{item.title}</option>
            ))}
          </select>
        </label>
        <label>
          What do you need built, clarified, or packaged?
          <textarea
            value={goal}
            onChange={(event) => setGoal(event.target.value)}
            placeholder="Example: I run a cleaning business and need a one-page website, quote form, and client follow-up system."
          />
        </label>
        <ExternalAwareLink href={inquiryHref(`Saga inquiry: ${selected.title}`, body)} className="button primary full">
          Email Saga Solutions <ArrowRight size={17} />
        </ExternalAwareLink>
        <p className="microcopy">The email opens in your mail app. No personal information is stored on this page.</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <main className="app-shell">
      <style>{styleText}</style>

      <section className="hero" id="top">
        <nav className="nav" aria-label="Primary navigation">
          <a href="#top" className="brandmark" aria-label="Saga Solutions home">
            <span className="brand-sigil">S</span>
            <span>
              <strong>Saga Solutions</strong>
              <small>Launch systems and cultural intelligence</small>
            </span>
          </a>
          <div className="nav-links">
            <a href="#packages">Services</a>
            <a href="#saga-vibes">Saga Vibes</a>
            <a href="#divisions">Divisions</a>
            <a href="#ventures">Ventures</a>
            <a href="#contact">Contact</a>
          </div>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Saga Solutions Studio / Saga Vibes / civic research / content systems</p>
            <h1>Make the idea payable.</h1>
            <p className="lede">
              Saga Solutions turns scattered concepts into launch-ready websites, client intake systems,
              grant packets, content engines, civic research products, and cultural intelligence tools.
              The priority is clear: package the work, capture leads, and sell useful systems now.
            </p>
            <div className="hero-actions">
              <ExternalAwareLink href="#packages" className="button primary">
                View paid packages <ArrowRight size={18} />
              </ExternalAwareLink>
              <ExternalAwareLink href="#saga-vibes" className="button ghost">
                Open Saga Vibes
              </ExternalAwareLink>
              <ExternalAwareLink href="#contact" className="button ghost">
                Start an inquiry
              </ExternalAwareLink>
            </div>
          </div>

          <aside className="signal-card" aria-label="Saga monetization hierarchy">
            <p className="terminal-line">saga://business-model</p>
            <h2>Commercial order</h2>
            <ol>
              <li><strong>Saga Solutions Studio pays the bills.</strong><span>Services, retainers, launch systems.</span></li>
              <li><strong>Saga Vibes builds consumer insight products.</strong><span>Culture, music, identity, mysticism, social energy.</span></li>
              <li><strong>Mystic Sage scales IP.</strong><span>Reports, tools, workshops, membership.</span></li>
              <li><strong>STREETS builds institutional upside.</strong><span>Audits, pilots, dashboards, grants.</span></li>
            </ol>
          </aside>
        </div>
      </section>

      <section className="section" id="packages">
        <div className="section-heading wide">
          <p className="eyebrow">Revenue-first service menu</p>
          <h2>Four offers a visitor can understand, request, and pay for.</h2>
          <p>
            These packages belong to Saga Solutions Studio, the practical cashflow desk. They can be delivered
            manually now, then automated once repetition proves demand.
          </p>
        </div>
        <div className="package-grid">
          {packages.map((item) => <PackageCard key={item.title} item={item} />)}
        </div>
      </section>

      <section className="section alt" id="saga-vibes">
        <div className="section-heading wide">
          <p className="eyebrow">Saga Vibes</p>
          <h2>Cultural and emotional intelligence for consumer-facing reflection.</h2>
          <p>
            Saga Vibes is not the technical build studio. It is the interpretive lane for media, identity,
            mysticism, music, lifestyle psychology, social energy, trend interpretation, and emotionally literate
            reflection tools.
          </p>
        </div>
        <div className="vibes-grid">
          {vibeProducts.map((item) => (
            <article className="vibe-card" key={item.title}>
              <BrainCircuit size={24} />
              <p className="kicker">Saga Vibes product</p>
              <h3>{item.title}</h3>
              <p className="price">{item.price}</p>
              <p>{item.body}</p>
              <ExternalAwareLink href={inquiryHref(`Saga Vibes inquiry: ${item.title}`)} className="text-link">
                Request this product <ArrowRight size={15} />
              </ExternalAwareLink>
            </article>
          ))}
        </div>
      </section>

      <section className="section" id="divisions">
        <div className="section-heading">
          <p className="eyebrow">Operating structure</p>
          <h2>The umbrella becomes legible.</h2>
          <p>
            Saga can still hold several ventures, but the public site needs hierarchy. The paid studio sits first;
            Saga Vibes becomes its own culture-and-identity product lane.
          </p>
        </div>
        <div className="division-grid">
          {divisions.map((item) => {
            const Icon = item.icon;
            return (
              <article className="division-card" key={item.title} id={item.title === 'Saga Civic' ? 'civic' : item.title === 'Saga Media' ? 'media' : item.title === 'Saga Labs' ? 'labs' : undefined}>
                <Icon size={24} />
                <p className="kicker">{item.kicker}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <a href={item.href} className="text-link">{item.cta} <ArrowRight size={15} /></a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section" id="ventures">
        <div className="section-heading wide">
          <p className="eyebrow">Portfolio discipline</p>
          <h2>Not every project has the same job.</h2>
          <p>
            The portfolio now explains what each property is supposed to do financially. That makes the ambition look
            intentional instead of unfinished.
          </p>
        </div>
        <div className="venture-grid">
          {ventures.map((item) => {
            const Icon = item.icon;
            return (
              <article className="venture-card" key={item.title}>
                <Icon size={25} />
                <p className="kicker">{item.type}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <ExternalAwareLink href={item.href} className="text-link" external={item.href.startsWith('http')}>
                  Open property
                </ExternalAwareLink>
              </article>
            );
          })}
        </div>
      </section>

      <section className="section alt" id="proof">
        <div className="proof-grid">
          <div className="section-heading">
            <p className="eyebrow">Credibility upgrades</p>
            <h2>What changed from concept page to sales page.</h2>
            <p>
              The rebuild makes the page more useful for prospects, funders, collaborators, search engines, and AI
              assistants that need readable text and crawlable links.
            </p>
          </div>
          <div className="proof-list">
            {proofPoints.map((point) => (
              <div className="proof-row" key={point}>
                <ShieldCheck size={19} />
                <span>{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="process">
        <div className="section-heading wide">
          <p className="eyebrow">Delivery method</p>
          <h2>A clean path from first message to finished asset.</h2>
        </div>
        <div className="process-grid">
          {[
            ['Diagnose', 'Clarify the buyer, offer, constraints, assets, deadline, and revenue target.', Layers3],
            ['Package', 'Turn the work into a scoped offer, landing page, deck, report, automation, cultural brief, or content system.', Workflow],
            ['Launch', 'Ship the public page, contact flow, SEO layer, outreach copy, and next-action checklist.', Rocket],
            ['Refine', 'Use feedback, analytics, and sales conversations to tighten the offer and raise the price.', Code2],
          ].map(([title, body, Icon]) => (
            <article className="process-card" key={title}>
              <Icon size={23} />
              <h3>{title}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section alt">
        <InquiryBuilder />
      </section>

      <section className="section resource-section" id="resources">
        <div className="section-heading">
          <p className="eyebrow">Working links</p>
          <h2>Primary destinations</h2>
        </div>
        <div className="resource-grid">
          <ExternalAwareLink href={links.mysticSage} className="resource-card"><Globe2 size={20} /><span>Mystic Sage</span></ExternalAwareLink>
          <ExternalAwareLink href={links.streets} className="resource-card"><Landmark size={20} /><span>Oakland STREETS</span></ExternalAwareLink>
          <ExternalAwareLink href={links.questlyne} className="resource-card"><BookOpen size={20} /><span>Questlyne Blog</span></ExternalAwareLink>
          <ExternalAwareLink href={links.sagaVibesPrototype} className="resource-card"><Sparkles size={20} /><span>Saga Vibes Prototype</span></ExternalAwareLink>
          <ExternalAwareLink href={links.githubRepo} className="resource-card"><Code2 size={20} /><span>GitHub Repository</span></ExternalAwareLink>
          <ExternalAwareLink href={inquiryHref('Saga Solutions discovery inquiry')} className="resource-card"><ArrowRight size={20} /><span>Email Inquiry</span></ExternalAwareLink>
        </div>
      </section>

      <footer className="footer">
        <div>
          <strong>Saga Solutions</strong>
          <p>Launch systems, AI operations, cultural intelligence, civic research, content infrastructure, and venture packaging.</p>
        </div>
        <div className="footer-links">
          <a href="#packages">Services</a>
          <a href="#saga-vibes">Saga Vibes</a>
          <a href="#contact">Contact</a>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </div>
      </footer>
    </main>
  );
}

const styleText = `
:root {
  color-scheme: dark;
  --bg: #050509;
  --panel: rgba(20, 22, 34, 0.86);
  --panel-strong: rgba(28, 31, 45, 0.96);
  --text: #f8f2e8;
  --muted: #b8bdcb;
  --soft: #d7d9e3;
  --line: rgba(255, 255, 255, 0.13);
  --accent: #f4d06f;
  --accent-2: #9df7ff;
  --violet: #aa8cff;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; background: var(--bg); }
body {
  margin: 0;
  color: var(--text);
  background:
    radial-gradient(circle at 14% 2%, rgba(170, 140, 255, 0.24), transparent 28%),
    radial-gradient(circle at 86% 8%, rgba(157, 247, 255, 0.16), transparent 30%),
    linear-gradient(135deg, #050509 0%, #080b12 52%, #130d16 100%);
}
a { color: inherit; text-decoration: none; }
button, textarea, select { font: inherit; }

.app-shell { min-height: 100vh; overflow: hidden; }
.hero { padding: 28px clamp(18px, 4vw, 64px) 86px; position: relative; }
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px);
  background-size: 54px 54px;
  -webkit-mask-image: linear-gradient(to bottom, #000 0%, transparent 90%);
  mask-image: linear-gradient(to bottom, #000 0%, transparent 90%);
  pointer-events: none;
}
.nav { display: flex; align-items: center; justify-content: space-between; gap: 22px; position: relative; z-index: 2; }
.brandmark { display: flex; align-items: center; gap: 13px; }
.brand-sigil {
  width: 52px; height: 52px; display: grid; place-items: center;
  border: 1px solid var(--line); border-radius: 16px;
  background: linear-gradient(145deg, rgba(244, 208, 111, 0.2), rgba(157, 247, 255, 0.09));
  color: var(--accent); font-weight: 950; letter-spacing: -0.04em;
}
.brandmark strong, .brandmark small { display: block; }
.brandmark small, .nav-links, .section-heading p, .package-card p, .division-card p, .venture-card p, .process-card p, .vibe-card p, .footer p { color: var(--muted); }
.nav-links { display: flex; gap: 18px; flex-wrap: wrap; font-size: 0.92rem; }
.nav-links a:hover, .text-link:hover, .footer a:hover { color: var(--accent-2); }
.hero-grid { display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(310px, 0.62fr); gap: 42px; align-items: center; max-width: 1240px; margin: 98px auto 0; position: relative; z-index: 1; }
.eyebrow, .kicker { color: var(--accent-2); text-transform: uppercase; letter-spacing: 0.18em; font-size: 0.75rem; font-weight: 900; }
.hero h1, .section-heading h2, .inquiry-panel h2 { letter-spacing: -0.07em; }
.hero h1 { font-size: clamp(3.4rem, 9vw, 8rem); line-height: 0.86; margin: 16px 0 22px; max-width: 880px; }
.lede { font-size: clamp(1.04rem, 2.1vw, 1.3rem); line-height: 1.72; color: var(--soft); max-width: 780px; }
.hero-actions { display: flex; gap: 14px; flex-wrap: wrap; margin-top: 32px; }
.button {
  border: 1px solid var(--line); background: rgba(255, 255, 255, 0.055); color: var(--text);
  border-radius: 999px; padding: 13px 18px; display: inline-flex; align-items: center; justify-content: center;
  gap: 10px; cursor: pointer; transition: 0.2s ease; min-height: 46px;
}
.button:hover, .package-card:hover, .division-card:hover, .venture-card:hover, .process-card:hover, .resource-card:hover, .vibe-card:hover { transform: translateY(-2px); border-color: rgba(157, 247, 255, 0.54); }
.button.primary { border: 0; background: linear-gradient(135deg, var(--accent), var(--accent-2)); color: #050509; font-weight: 950; }
.button.ghost { background: rgba(255, 255, 255, 0.04); }
.button.full { width: 100%; margin-top: 18px; }
.signal-card, .package-card, .division-card, .venture-card, .process-card, .resource-card, .inquiry-panel, .proof-row, .vibe-card {
  border: 1px solid var(--line); background: linear-gradient(180deg, rgba(28, 31, 45, 0.9), rgba(9, 10, 18, 0.92)); box-shadow: 0 24px 90px rgba(0,0,0,0.24);
}
.signal-card { border-radius: 30px; padding: 26px; }
.signal-card h2 { font-size: clamp(1.8rem, 3vw, 2.8rem); margin: 10px 0 20px; letter-spacing: -0.05em; }
.signal-card ol { margin: 0; padding-left: 20px; display: grid; gap: 18px; }
.signal-card li { color: var(--soft); line-height: 1.5; display: list-item; }
.signal-card li span { display: block; color: var(--muted); margin-top: 4px; }
.terminal-line { font-family: 'Courier New', monospace; color: var(--accent-2); margin: 0; }
.section { padding: 80px clamp(18px, 4vw, 64px); max-width: 1320px; margin: 0 auto; }
.section.alt { max-width: none; background: rgba(255,255,255,0.027); border-block: 1px solid rgba(255,255,255,0.05); }
.section.alt > * { max-width: 1320px; margin-left: auto; margin-right: auto; }
.section-heading { max-width: 820px; margin-bottom: 34px; }
.section-heading.wide { max-width: 980px; }
.section-heading h2, .inquiry-panel h2 { font-size: clamp(2.1rem, 4.8vw, 4.6rem); line-height: 0.95; margin: 10px 0 16px; }
.section-heading p, .inquiry-panel p { line-height: 1.72; }
.package-grid, .division-grid, .venture-grid, .process-grid, .resource-grid, .vibes-grid { display: grid; gap: 18px; }
.package-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.division-grid { grid-template-columns: repeat(5, minmax(0, 1fr)); }
.venture-grid, .process-grid, .vibes-grid { grid-template-columns: repeat(4, minmax(0, 1fr)); }
.resource-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
.package-card, .division-card, .venture-card, .process-card, .vibe-card { border-radius: 26px; padding: 24px; transition: 0.2s ease; }
.card-topline { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.card-icon { width: 46px; height: 46px; display: grid; place-items: center; border-radius: 15px; background: rgba(244,208,111,0.12); color: var(--accent); }
.timeline { color: var(--muted); font-size: 0.82rem; }
.package-card h3, .division-card h3, .venture-card h3, .process-card h3, .vibe-card h3 { font-size: 1.35rem; margin: 10px 0; letter-spacing: -0.03em; }
.price { color: var(--accent); font-weight: 950; font-size: 1.2rem; }
.audience { min-height: 94px; }
ul { padding: 0; margin: 18px 0 0; list-style: none; display: grid; gap: 10px; }
li { display: flex; gap: 9px; align-items: flex-start; color: var(--soft); line-height: 1.45; }
li svg { color: var(--accent-2); flex: 0 0 auto; margin-top: 2px; }
.text-link { color: var(--accent); font-weight: 800; display: inline-flex; align-items: center; gap: 8px; margin-top: 12px; }
.proof-grid { display: grid; grid-template-columns: minmax(0, 0.85fr) minmax(320px, 1fr); gap: 28px; align-items: start; }
.proof-list { display: grid; gap: 12px; }
.proof-row { border-radius: 18px; padding: 18px; display: flex; gap: 12px; align-items: flex-start; color: var(--soft); line-height: 1.5; }
.proof-row svg { color: var(--accent-2); flex: 0 0 auto; margin-top: 2px; }
.inquiry-panel { border-radius: 30px; padding: clamp(24px, 5vw, 46px); display: grid; grid-template-columns: minmax(0, 0.82fr) minmax(320px, 0.72fr); gap: 32px; }
.inquiry-form { display: grid; gap: 16px; }
label { color: var(--soft); display: grid; gap: 8px; font-weight: 750; }
select, textarea { width: 100%; border: 1px solid var(--line); border-radius: 16px; background: rgba(255,255,255,0.06); color: var(--text); padding: 13px 14px; }
option { color: #050509; }
textarea { min-height: 150px; resize: vertical; }
.microcopy { font-size: 0.86rem; color: var(--muted); margin: 0; }
.resource-section { padding-top: 54px; }
.resource-card { min-height: 86px; border-radius: 22px; padding: 20px; display: flex; align-items: center; justify-content: space-between; gap: 16px; transition: 0.2s ease; color: var(--soft); }
.resource-card span { margin-right: auto; font-weight: 850; }
.footer { padding: 34px clamp(18px, 4vw, 64px); border-top: 1px solid rgba(255,255,255,0.08); display: flex; justify-content: space-between; gap: 22px; align-items: center; max-width: 1320px; margin: 0 auto; }
.footer p { margin: 8px 0 0; max-width: 680px; }
.footer-links { display: flex; gap: 16px; flex-wrap: wrap; justify-content: flex-end; color: var(--muted); }
@media (max-width: 1180px) { .package-grid, .venture-grid, .process-grid, .vibes-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .division-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); } .audience { min-height: auto; } }
@media (max-width: 820px) { .nav, .footer { align-items: flex-start; flex-direction: column; } .hero-grid, .proof-grid, .inquiry-panel { grid-template-columns: 1fr; } .resource-grid { grid-template-columns: 1fr; } .hero { padding-bottom: 54px; } }
@media (max-width: 620px) { .package-grid, .division-grid, .venture-grid, .process-grid, .vibes-grid { grid-template-columns: 1fr; } .hero h1 { font-size: clamp(3rem, 18vw, 4.4rem); } .section { padding-block: 56px; } }
`;

createRoot(document.getElementById('root')).render(<App />);
