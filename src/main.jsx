import React from 'react';
import { createRoot } from 'react-dom/client';
import { ArrowRight, BookOpen, Bot, BrainCircuit, CheckCircle2, Code2, ExternalLink, FileText, Globe2, Landmark, Rocket, Search, Sparkles, Store, Workflow } from 'lucide-react';

const intakeFormUrl = import.meta.env.VITE_SAGA_INTAKE_FORM_URL || '';

const links = {
  mysticSage: 'https://mysticsage.xyz/',
  streets: 'https://oaklandstreets.live/',
  questlyne: 'https://thequestlyne.blogspot.com/',
  prototype: 'https://saga-vibe-studio.lovable.app/',
  github: 'https://github.com/MysticQuestion/saga-solutions',
};

const quickOffers = [
  ['Website Clarity Audit', '$150', 'A rapid review of one site, page, or business idea with specific fixes for offer clarity, trust, calls to action, and conversion.'],
  ['One-Page Offer Sheet', '$250', 'A clean service or project offer you can send to customers, collaborators, funders, property managers, or local businesses immediately.'],
  ['Vibe-Coded Landing Page', '$500', 'A lean one-page site or prototype built with AI-assisted development, then edited for taste, clarity, public credibility, and contact flow.'],
  ['Culture Signal Brief', '$99', 'A Saga Vibes interpretation of a trend, scene, artist, product idea, audience, or social mood for creators and small brands.'],
];

const packages = [
  {
    title: 'Local Presence Sprint', price: '$750–$1,500', timeline: '5–10 business days', icon: Globe2,
    audience: 'Local businesses, solo founders, community orgs, artists, service providers, and first-time operators who need credibility fast.',
    deliverables: ['One-page website or landing page', 'Offer positioning and headline system', 'Contact flow and quote-request path', 'Basic SEO metadata and launch checklist', 'Three reusable announcement templates'],
  },
  {
    title: 'AI Operations Sprint', price: '$1,500–$3,500', timeline: '10–21 business days', icon: Bot,
    audience: 'Service businesses and lean teams that need intake, follow-up, documentation, and basic automation without hiring an operations department.',
    deliverables: ['Client intake form and response workflow', 'CRM sheet or Airtable structure', 'FAQ assistant or knowledge-base plan', 'Proposal and follow-up templates', 'Automation map with risks and next steps'],
  },
  {
    title: 'Grant + Pitch Packet', price: '$900–$2,500', timeline: '7–14 business days', icon: FileText,
    audience: 'Nonprofits, civic startups, artists, cultural workers, and social-impact founders preparing for grants, sponsors, pilots, or partnerships.',
    deliverables: ['One-page executive brief', 'Five-to-eight-slide pitch structure', 'Budget narrative and impact logic', 'Outreach email sequence', 'Public proposal summary page'],
  },
  {
    title: 'Content Engine Retainer', price: '$600–$2,000/mo', timeline: 'Monthly', icon: BookOpen,
    audience: 'Founders, writers, advocates, and organizations that need steady publishing instead of sporadic posts.',
    deliverables: ['Four articles or blog posts per month', 'Eight social posts or newsletter segments', 'SEO topic map', 'Editorial calendar', 'Monthly positioning review'],
  },
];

const vibeProducts = [
  ['Culture Signal Brief', '$49–$149', 'Trend, artist, aesthetic, show, platform behavior, or public mood interpretation through the Saga Vibes lens.'],
  ['Identity + Aesthetic Audit', '$149–$500', 'Self-presentation, creator identity, public persona, taste, emotional resonance, and audience-fit review.'],
  ['Music Mood Map', '$29–$99', 'Playlist, listening note, or music-personality interpretation connecting sound, memory, taste, and self-understanding.'],
  ['Social Energy Reading', '$39–$125', 'Structured reflection on group dynamics, attraction patterns, lifestyle signals, friendship chemistry, and social codes.'],
];

const portfolio = [
  { title: 'Mystic Sage', tag: 'Symbolic intelligence platform', body: 'Astrology, Aethos, interpretive reports, esoteric education, workshops, and future digital products.', icon: BrainCircuit, href: links.mysticSage },
  { title: 'Oakland STREETS / Pure Street', tag: 'Civic technology + environmental response', body: 'Environmental condition reporting, corridor intelligence, cleanup documentation, grant-ready dashboards, and public-space accountability.', icon: Landmark, href: links.streets },
  { title: 'Saga Vibes Studio', tag: 'Vibe-coded business systems', body: 'The studio home for fast launch pages, AI-assisted prototypes, service packaging, content systems, and cultural intelligence products.', icon: Sparkles, href: links.prototype },
  { title: 'Questlyne', tag: 'Essay archive + media lane', body: 'Long-form writing, cultural analysis, spiritual criticism, identity work, and material that can feed paid content retainers.', icon: BookOpen, href: links.questlyne },
  { title: 'Neural Breach / Mad Evil Genius', tag: 'Commerce/storyworld concept', body: 'Cyberpunk apparel and narrative commerce concept. Kept as a future product shelf until audience and fulfillment are stronger.', icon: Store, href: '#ventures' },
  { title: 'Saga Civic / CTI', tag: 'Public-interest research', body: 'Records requests, budget notes, civic research workflows, accountability briefs, and public-data packaging.', icon: Search, href: '#divisions' },
];

function Link({ href, children, className = '' }) {
  const external = href?.startsWith('http');
  return <a href={href} className={className} target={external ? '_blank' : undefined} rel={external ? 'noreferrer' : undefined}>{children}{external ? <ExternalLink size={15} aria-hidden="true" /> : null}</a>;
}

function IntakeLink({ children, className = 'button primary' }) {
  return <a href={intakeFormUrl || '#form-setup'} className={className} target={intakeFormUrl ? '_blank' : undefined} rel={intakeFormUrl ? 'noreferrer' : undefined}>{children}<ArrowRight size={17} /></a>;
}

function App() {
  return (
    <main className="app-shell">
      <style>{styleText}</style>
      <section className="hero" id="top">
        <nav className="nav" aria-label="Primary navigation">
          <a href="#top" className="brandmark"><span className="brand-sigil">SV</span><span><strong>Saga Vibes Studio</strong><small>Vibe-coded systems + cultural intelligence</small></span></a>
          <div className="nav-links"><a href="#quick-offers">Quick Offers</a><a href="#packages">Packages</a><a href="#portfolio">Portfolio</a><a href="#saga-vibes">Saga Vibes</a><a href="#contact">Contact</a></div>
        </nav>
        <div className="hero-grid">
          <div>
            <p className="eyebrow">AI launch studio / vibe coding / culture / small-business systems</p>
            <h1>Make the idea payable.</h1>
            <p className="lede">Saga Vibes Studio turns scattered ideas into invoice-ready offers, fast landing pages, client intake systems, pitch materials, content engines, and cultural intelligence products. The goal is practical: close small paid work now, use the invoices as proof, and build upward from there.</p>
            <div className="hero-actions"><IntakeLink>Request invoice</IntakeLink><Link href="#quick-offers" className="button ghost">See quick offers</Link><Link href="#portfolio" className="button ghost">View portfolio</Link></div>
          </div>
          <aside className="signal-card"><p className="terminal-line">saga://revenue-order</p><h2>Bring-home order</h2><ol><li><strong>Sell $150–$500 starters first.</strong><span>Fast audits, offer sheets, landing pages, and culture briefs.</span></li><li><strong>Turn starters into $750–$3,500 packages.</strong><span>Websites, automation, pitch packets, and retainers.</span></li><li><strong>Use invoices as proof.</strong><span>Paid demand matters more than perfect software.</span></li></ol></aside>
        </div>
      </section>

      <section className="section" id="quick-offers"><div className="section-heading wide"><p className="eyebrow">Invoice-starter offers</p><h2>Small enough to close fast. Serious enough to prove demand.</h2><p>These are the offers to pitch first. They are priced to produce paid proof quickly while leaving room to upsell larger work.</p></div><div className="quick-grid">{quickOffers.map(([title, price, body]) => <article className="card" key={title}><p className="kicker">Quick offer</p><h3>{title}</h3><p className="price">{price}</p><p>{body}</p><IntakeLink className="button primary full">Request invoice</IntakeLink></article>)}</div></section>

      <section className="section alt" id="packages"><div className="section-heading wide"><p className="eyebrow">Larger service packages</p><h2>Once a small invoice lands, move the relationship upward.</h2><p>These packages are the serious cashflow lane after a prospect sees value from a starter offer.</p></div><div className="package-grid">{packages.map((item) => { const Icon = item.icon; return <article className="card package-card" key={item.title}><div className="card-topline"><span className="card-icon"><Icon size={23} /></span><span className="timeline">{item.timeline}</span></div><p className="kicker">Package</p><h3>{item.title}</h3><p className="price">{item.price}</p><p>{item.audience}</p><ul>{item.deliverables.map((d) => <li key={d}><CheckCircle2 size={16} />{d}</li>)}</ul><IntakeLink className="button primary full">Start this sprint</IntakeLink></article>; })}</div></section>

      <section className="section" id="portfolio"><div className="section-heading wide"><p className="eyebrow">Portfolio</p><h2>Proof of range: civic systems, spiritual technology, media, commerce, and AI-assisted launch work.</h2><p>This section makes the site less abstract. It shows that the studio is backed by real projects, not generic agency language.</p></div><div className="portfolio-grid">{portfolio.map((item) => { const Icon = item.icon; return <article className="card portfolio-card" key={item.title}><Icon size={25} /><p className="kicker">{item.tag}</p><h3>{item.title}</h3><p>{item.body}</p><Link href={item.href} className="text-link">Open project</Link></article>; })}</div></section>

      <section className="section alt" id="saga-vibes"><div className="section-heading wide"><p className="eyebrow">Saga Vibes</p><h2>Culture and emotional intelligence remain part of the brand.</h2><p>The name still works because it carries both meanings: vibe-coded creation for launch systems, and cultural/emotional intelligence for consumer-facing reflection products.</p></div><div className="quick-grid">{vibeProducts.map(([title, price, body]) => <article className="card" key={title}><BrainCircuit size={24} /><p className="kicker">Saga Vibes product</p><h3>{title}</h3><p className="price">{price}</p><p>{body}</p><IntakeLink className="text-link">Request this product</IntakeLink></article>)}</div></section>

      <section className="section" id="divisions"><div className="section-heading"><p className="eyebrow">Operating structure</p><h2>One name, two immediate revenue lanes.</h2><p>Saga Vibes Studio can sell AI-assisted launch work and cultural intelligence without confusing the buyer.</p></div><div className="division-grid"><article className="card"><Sparkles size={24} /><h3>Vibe-Coded Systems</h3><p>Landing pages, offer pages, intake forms, automations, prototypes, and launch assets.</p></article><article className="card"><BrainCircuit size={24} /><h3>Cultural Intelligence</h3><p>Media, identity, mysticism, music, lifestyle psychology, social energy, and trend interpretation.</p></article><article className="card"><Workflow size={24} /><h3>Content + Pitch</h3><p>Articles, newsletters, outreach copy, grant packets, pitch decks, and public-facing proposals.</p></article><article className="card"><Landmark size={24} /><h3>Civic Research</h3><p>Public-data briefs, accountability workflows, environmental documentation, and civic-tech packaging.</p></article></div></section>

      <section className="section alt" id="contact"><div className="inquiry-panel"><div><p className="eyebrow">Private intake</p><h2>No personal email exposed.</h2><p>The public page should send prospects to a Google Form or private intake tool, not display a personal Gmail address. The inquiry tracker Sheet has been created; the final Google Form URL should be connected through <code>VITE_SAGA_INTAKE_FORM_URL</code>.</p></div><div className="form-status" id="form-setup"><h3>{intakeFormUrl ? 'Intake form connected.' : 'Intake form link pending.'}</h3><p>{intakeFormUrl ? 'The button below opens the private intake form.' : 'Create a Google Form from the Saga Vibes Studio Inquiry Tracker Sheet, publish it, then add the form URL as VITE_SAGA_INTAKE_FORM_URL in Lovable/Vercel.'}</p><IntakeLink className="button primary full">{intakeFormUrl ? 'Open intake form' : 'Connect Google Form URL'}</IntakeLink></div></div></section>

      <footer className="footer"><div><strong>Saga Vibes Studio</strong><p>Vibe-coded launch systems, cultural intelligence, content infrastructure, and venture packaging.</p></div><div className="footer-links"><a href="#quick-offers">Quick Offers</a><a href="#portfolio">Portfolio</a><a href="#contact">Contact</a><Link href={links.github}>GitHub</Link></div></footer>
    </main>
  );
}

const styleText = `
:root{color-scheme:dark;--bg:#050509;--text:#f8f2e8;--muted:#b8bdcb;--soft:#d7d9e3;--line:rgba(255,255,255,.13);--accent:#f4d06f;--accent2:#9df7ff;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}*{box-sizing:border-box}html{scroll-behavior:smooth;background:var(--bg)}body{margin:0;color:var(--text);background:radial-gradient(circle at 14% 2%,rgba(170,140,255,.24),transparent 28%),radial-gradient(circle at 86% 8%,rgba(157,247,255,.16),transparent 30%),linear-gradient(135deg,#050509 0%,#080b12 52%,#130d16 100%)}a{color:inherit;text-decoration:none}.app-shell{min-height:100vh;overflow:hidden}.hero{padding:28px clamp(18px,4vw,64px) 86px;position:relative}.hero:before{content:'';position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.028) 1px,transparent 1px);background-size:54px 54px;mask-image:linear-gradient(to bottom,#000 0%,transparent 90%);pointer-events:none}.nav{display:flex;align-items:center;justify-content:space-between;gap:22px;position:relative;z-index:2}.brandmark{display:flex;align-items:center;gap:13px}.brand-sigil{width:52px;height:52px;display:grid;place-items:center;border:1px solid var(--line);border-radius:16px;background:linear-gradient(145deg,rgba(244,208,111,.2),rgba(157,247,255,.09));color:var(--accent);font-weight:950}.brandmark strong,.brandmark small{display:block}.brandmark small,.nav-links,.section-heading p,.card p,.footer p,.signal-card span{color:var(--muted)}.nav-links{display:flex;gap:18px;flex-wrap:wrap;font-size:.92rem}.hero-grid{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(310px,.62fr);gap:42px;align-items:center;max-width:1240px;margin:98px auto 0;position:relative;z-index:1}.eyebrow,.kicker{color:var(--accent2);text-transform:uppercase;letter-spacing:.18em;font-size:.75rem;font-weight:900}.hero h1,.section-heading h2,.inquiry-panel h2{letter-spacing:-.07em}.hero h1{font-size:clamp(3.4rem,9vw,8rem);line-height:.86;margin:16px 0 22px;max-width:880px}.lede{font-size:clamp(1.04rem,2.1vw,1.3rem);line-height:1.72;color:var(--soft);max-width:780px}.hero-actions{display:flex;gap:14px;flex-wrap:wrap;margin-top:32px}.button{border:1px solid var(--line);background:rgba(255,255,255,.055);color:var(--text);border-radius:999px;padding:13px 18px;display:inline-flex;align-items:center;justify-content:center;gap:10px;cursor:pointer;transition:.2s ease;min-height:46px}.button:hover,.card:hover{transform:translateY(-2px);border-color:rgba(157,247,255,.54)}.button.primary{border:0;background:linear-gradient(135deg,var(--accent),var(--accent2));color:#050509;font-weight:950}.button.ghost{background:rgba(255,255,255,.04)}.button.full{width:100%;margin-top:18px}.signal-card,.card,.inquiry-panel,.form-status{border:1px solid var(--line);background:linear-gradient(180deg,rgba(28,31,45,.9),rgba(9,10,18,.92));box-shadow:0 24px 90px rgba(0,0,0,.24);border-radius:26px;padding:24px}.signal-card h2{font-size:clamp(1.8rem,3vw,2.8rem);margin:10px 0 20px;letter-spacing:-.05em}.signal-card ol{margin:0;padding-left:20px;display:grid;gap:18px}.signal-card li{color:var(--soft);line-height:1.5}.terminal-line{font-family:'Courier New',monospace;color:var(--accent2);margin:0}.section{padding:80px clamp(18px,4vw,64px);max-width:1320px;margin:0 auto}.section.alt{max-width:none;background:rgba(255,255,255,.027);border-block:1px solid rgba(255,255,255,.05)}.section.alt>*{max-width:1320px;margin-left:auto;margin-right:auto}.section-heading{max-width:860px;margin-bottom:34px}.section-heading.wide{max-width:1000px}.section-heading h2,.inquiry-panel h2{font-size:clamp(2.1rem,4.8vw,4.6rem);line-height:.95;margin:10px 0 16px}.quick-grid,.package-grid,.portfolio-grid,.division-grid{display:grid;gap:18px}.quick-grid,.package-grid,.division-grid{grid-template-columns:repeat(4,minmax(0,1fr))}.portfolio-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.card{transition:.2s ease}.card h3{font-size:1.35rem;margin:10px 0;letter-spacing:-.03em}.price{color:var(--accent)!important;font-weight:950;font-size:1.2rem}.card-topline{display:flex;align-items:center;justify-content:space-between;gap:12px}.card-icon{width:46px;height:46px;display:grid;place-items:center;border-radius:15px;background:rgba(244,208,111,.12);color:var(--accent)}.timeline{color:var(--muted);font-size:.82rem}ul{padding:0;margin:18px 0 0;list-style:none;display:grid;gap:10px}li{display:flex;gap:9px;align-items:flex-start;color:var(--soft);line-height:1.45}li svg{color:var(--accent2);flex:0 0 auto;margin-top:2px}.text-link{color:var(--accent);font-weight:800;display:inline-flex;align-items:center;gap:8px;margin-top:12px}.inquiry-panel{display:grid;grid-template-columns:minmax(0,.9fr) minmax(320px,.7fr);gap:32px}.footer{padding:34px clamp(18px,4vw,64px);border-top:1px solid rgba(255,255,255,.08);display:flex;justify-content:space-between;gap:22px;align-items:center;max-width:1320px;margin:0 auto}.footer-links{display:flex;gap:16px;flex-wrap:wrap;justify-content:flex-end;color:var(--muted)}code{background:rgba(255,255,255,.08);padding:2px 6px;border-radius:8px;color:var(--accent2)}@media(max-width:1120px){.quick-grid,.package-grid,.portfolio-grid,.division-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:820px){.nav,.footer{align-items:flex-start;flex-direction:column}.hero-grid,.inquiry-panel{grid-template-columns:1fr}.hero{padding-bottom:54px}}@media(max-width:620px){.quick-grid,.package-grid,.portfolio-grid,.division-grid{grid-template-columns:1fr}.hero h1{font-size:clamp(3rem,18vw,4.4rem)}.section{padding-block:56px}}
`;

createRoot(document.getElementById('root')).render(<App />);
