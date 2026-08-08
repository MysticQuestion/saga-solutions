import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  BookOpen,
  Check,
  Clipboard,
  Code2,
  Database,
  Gauge,
  Laptop,
  Mail,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
  Zap,
} from 'lucide-react';
import { heroImage } from './assets.js';
import {
  capabilities,
  coordinator,
  fallbackBlogPosts,
  fallbackCodeEntries,
  lanes,
  packages,
  portfolio,
  techServices,
} from './content.js';
import './styles.css';

const initialLead = {
  name: '',
  email: '',
  phone: '',
  organization: '',
  projectTitle: '',
  projectSummary: '',
  budget: '',
  timeline: '',
};

const initialBrief = {
  desiredOutcome: '',
  primaryUsers: '',
  requiredFeatures: '',
  referenceLinks: '',
  existingAssets: '',
  integrations: '',
  successMeasures: '',
  constraints: '',
  decisionMakers: '',
  targetLaunch: '',
};

const signalDimensions = [
  ['novelty', 'Novelty'],
  ['evidence_quality', 'Evidence'],
  ['operational_consequence', 'Consequence'],
  ['durable_value', 'Durable value'],
];

function cx(...values) {
  return values.filter(Boolean).join(' ');
}

function formatDate(value) {
  if (!value) return 'Not yet verified';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
}

async function postJSON(url, body) {
  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const error = new Error(data.error || 'The request could not be completed.');
    error.code = data.code;
    throw error;
  }
  return data;
}

async function fetchPublicTable(table, query) {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
  if (!url || !key) throw new Error('Public content database is not configured for this deployment.');
  const response = await fetch(`${url}/rest/v1/${table}?${query}`, {
    headers: { apikey: key, Accept: 'application/json' },
  });
  if (!response.ok) throw new Error(`Content request failed with ${response.status}.`);
  return response.json();
}

function usePathname() {
  const [path, setPath] = useState(() => window.location.pathname || '/');
  useEffect(() => {
    const sync = () => setPath(window.location.pathname || '/');
    window.addEventListener('popstate', sync);
    return () => window.removeEventListener('popstate', sync);
  }, []);
  return path;
}

function InternalLink({ to, children, className, onClick, ...props }) {
  const navigate = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    window.history.pushState({}, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onClick?.(event);
  };
  return <a href={to} className={className} onClick={navigate} {...props}>{children}</a>;
}

function Shell({ children, active }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="site-shell">
      <header className="site-header">
        <InternalLink className="wordmark" to="/" aria-label="Saga Solutions home" onClick={() => setMenuOpen(false)}>
          <span className="wordmark-primary">SAGA</span>
          <span className="wordmark-secondary">SOLUTIONS</span>
        </InternalLink>
        <button className="menu-button" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={cx('main-nav', menuOpen && 'is-open')} aria-label="Primary navigation">
          {lanes.map((lane) => (
            <InternalLink key={lane.key} to={lane.href} className={active === lane.key ? 'is-active' : ''} onClick={() => setMenuOpen(false)}>
              {lane.label}
            </InternalLink>
          ))}
          <a href="/#start-project" onClick={() => setMenuOpen(false)}>Commission</a>
          <a className="nav-cta" href={`mailto:${coordinator.email}`}>Contact</a>
        </nav>
      </header>
      {children}
      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <strong>Saga Solutions</strong>
        <p>Research, technology, code, and digital production converted into practical systems.</p>
      </div>
      <div className="footer-links">
        {lanes.map((lane) => <InternalLink key={lane.key} to={lane.href}>{lane.label}</InternalLink>)}
        <a href={`mailto:${coordinator.email}`}>{coordinator.email}</a>
      </div>
    </footer>
  );
}

function LaneSwitchboard() {
  const icons = { blog: BookOpen, tech: Wrench, vibes: Sparkles, code: Code2 };
  return (
    <section className="lane-grid" aria-label="Saga Solutions divisions">
      {lanes.map((lane, index) => {
        const Icon = icons[lane.key];
        return (
          <InternalLink className={`lane-card lane-${lane.key}`} to={lane.href} key={lane.key}>
            <div className="lane-card-top"><span>0{index + 1}</span><Icon size={21} /></div>
            <p className="lane-label">SAGA / {lane.label}</p>
            <h2>{lane.title}</h2>
            <p>{lane.description}</p>
            <span className="lane-action">{lane.action} <ArrowRight size={16} /></span>
          </InternalLink>
        );
      })}
    </section>
  );
}

function Home({ blogPosts, codeEntries }) {
  const featuredBlog = blogPosts.find((item) => item.featured) || blogPosts[0];
  const featuredCode = codeEntries.filter((item) => item.featured).slice(0, 3);
  return (
    <Shell>
      <main id="top">
        <section className="hero-section">
          <div className="hero-image" style={{ backgroundImage: `url("${heroImage}")` }} aria-hidden="true" />
          <div className="hero-scrim" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow">Oakland / Bay Area / Remote</p>
            <h1>Saga Solutions turns <span>research, technology, code, and digital production</span> into practical systems.</h1>
            <p className="hero-lede">
              Four public lanes. One operating practice. Read the analysis, solve the technical problem, commission a digital build, or take a tested pattern directly into your own work.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#start-project">Start a project <ArrowRight size={18} /></a>
              <InternalLink className="button button-secondary" to="/blog">Read SAGA BLOG</InternalLink>
            </div>
          </div>
          <div className="hero-index">
            <span>BLOG · TECH · VIBES · CODE</span>
            <span>Evidence before claims</span>
            <span>Human review before release</span>
          </div>
        </section>

        <LaneSwitchboard />

        <section className="proof-strip">
          <div><BadgeCheck size={17} /> Source discipline</div>
          <div><Gauge size={17} /> Visible scope and pricing</div>
          <div><ShieldCheck size={17} /> Security boundaries named</div>
          <div><Zap size={17} /> AI used as leverage, not authority</div>
        </section>

        {(featuredBlog || featuredCode.length > 0) && (
          <section className="section signal-preview">
            <div className="section-heading split-heading">
              <div>
                <p className="section-kicker">Current signal</p>
                <h2>Useful enough to act on. Specific enough to test.</h2>
              </div>
              <p>Editorial work and technical patterns are linked intentionally: analysis should lead to implementation, and implementation should generate better questions.</p>
            </div>
            <div className="preview-grid">
              {featuredBlog && (
                <InternalLink className="feature-card" to={`/blog/${featuredBlog.slug}`}>
                  <span className="pill">BLOG / {featuredBlog.category}</span>
                  <h3>{featuredBlog.title}</h3>
                  <p>{featuredBlog.dek}</p>
                  <span className="text-link">Read analysis <ArrowRight size={15} /></span>
                </InternalLink>
              )}
              <div className="mini-stack">
                {featuredCode.map((entry) => (
                  <InternalLink className="mini-card" to={`/code/${entry.slug}`} key={entry.slug}>
                    <span className="pill">CODE / {entry.kind}</span>
                    <strong>{entry.title}</strong>
                    <p>{entry.summary}</p>
                  </InternalLink>
                ))}
              </div>
            </div>
          </section>
        )}

        <PortfolioSection />
        <CapabilitiesSection />
        <CommissionSection />
      </main>
    </Shell>
  );
}

function PortfolioSection() {
  return (
    <section className="section" id="work">
      <div className="section-heading split-heading">
        <div><p className="section-kicker">Selected work</p><h2>Public properties, client work, and active builds.</h2></div>
        <p>Status labels stay visible. Development work is not presented as finished work.</p>
      </div>
      <div className="portfolio-grid">
        {portfolio.map((item) => (
          <a key={item.name} className="portfolio-card" href={item.href} target="_blank" rel="noreferrer">
            <div className="portfolio-meta"><span>{item.category}</span><span>{item.status}</span></div>
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <div className="tag-row">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
            <ArrowUpRight className="card-arrow" size={18} />
          </a>
        ))}
      </div>
    </section>
  );
}

function CapabilitiesSection() {
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return capabilities.slice(0, 3);
    return capabilities
      .map((item) => ({ ...item, score: terms.reduce((score, term) => score + (item.title.toLowerCase().includes(term) || item.detail.toLowerCase().includes(term) || item.keywords.some((k) => k.includes(term)) ? 1 : 0), 0) }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);
  }, [query]);
  return (
    <section className="section muted-section" id="capabilities">
      <div className="section-heading split-heading">
        <div><p className="section-kicker">Capability map</p><h2>Describe the problem. We identify the disciplines involved.</h2></div>
        <p>This finder does not pretend to quote a final scope. It helps reveal what the assignment actually touches before money is spent.</p>
      </div>
      <div className="scope-finder">
        <label htmlFor="scope-search">What are you trying to build, repair, investigate, automate, or sell?</label>
        <div className="search-field"><Search size={19} /><input id="scope-search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Example: publish a source-backed research database and automate updates" /></div>
        <div className="scope-results">
          {results.length ? results.map((item) => <article key={item.title}><h3>{item.title}</h3><p>{item.detail}</p></article>) : <article><h3>Cross-disciplinary scope</h3><p>No exact match yet. Submit the project outline and the scope will be reviewed manually.</p></article>}
        </div>
      </div>
    </section>
  );
}

function BlogIndex({ posts }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const categories = ['All', ...new Set(posts.map((item) => item.category))];
  const filtered = posts.filter((item) => {
    const matchesCategory = category === 'All' || item.category === category;
    const haystack = `${item.title} ${item.dek} ${(item.tags || []).join(' ')}`.toLowerCase();
    return matchesCategory && haystack.includes(query.toLowerCase());
  });
  return (
    <Shell active="blog">
      <main>
        <PageHero eyebrow="SAGA / BLOG" title="Analysis before consensus." lede="AI skills, agent systems, software shifts, security, technical economics, and consequential news — published only when the material survives a verification and usefulness test." />
        <section className="section compact-top">
          <SignalScoreExplainer />
          <div className="library-toolbar">
            <div className="search-field"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search analysis, tags, and topics" /></div>
            <div className="filter-row">{categories.map((item) => <button className={category === item ? 'filter-active' : ''} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div>
          </div>
          <div className="article-list">
            {filtered.map((post) => (
              <InternalLink className="article-row" to={`/blog/${post.slug}`} key={post.slug}>
                <div><span className="pill">{post.category}</span><span className="meta-text">{formatDate(post.published_at)} · {post.reading_minutes} min</span></div>
                <h2>{post.title}</h2>
                <p>{post.dek}</p>
                <div className="tag-row">{(post.tags || []).map((tag) => <span key={tag}>{tag}</span>)}</div>
              </InternalLink>
            ))}
          </div>
          {!filtered.length && <EmptyState text="No published analysis matches this filter yet." />}
        </section>
      </main>
    </Shell>
  );
}

function SignalScoreExplainer() {
  return (
    <div className="editorial-standard">
      <div>
        <p className="section-kicker">SAGA SIGNAL SCORE</p>
        <h2>Trend-setting requires a standard, not volume.</h2>
        <p>Each scored post is judged on novelty, evidence quality, operational consequence, and durable value. Material claims should be labeled internally as verified fact, inference, forecast, or unresolved.</p>
      </div>
      <div className="score-grid">
        {signalDimensions.map(([, label], index) => <div key={label}><span>0{index + 1}</span><strong>{label}</strong></div>)}
      </div>
    </div>
  );
}

function BlogDetail({ post }) {
  if (!post) return <NotFound />;
  const score = post.editorial_score || {};
  const sections = Array.isArray(post.body) ? post.body : [];
  const takeaways = Array.isArray(post.key_takeaways) ? post.key_takeaways : [];
  const implications = Array.isArray(post.operational_implications) ? post.operational_implications : [];
  const sources = Array.isArray(post.sources) ? post.sources : [];
  useEffect(() => {
    document.title = `${post.title} | Saga Solutions`;
  }, [post.title]);
  return (
    <Shell active="blog">
      <main className="article-page">
        <section className="article-hero">
          <InternalLink to="/blog" className="back-link">← SAGA BLOG</InternalLink>
          <span className="pill">{post.hero_label || post.category}</span>
          <h1>{post.title}</h1>
          <p className="article-dek">{post.dek}</p>
          <div className="article-byline">{post.author_name} · {formatDate(post.published_at)} · {post.reading_minutes} min</div>
        </section>
        <section className="article-layout">
          <aside className="score-panel">
            <p className="section-kicker">SAGA SIGNAL SCORE</p>
            {signalDimensions.map(([key, label]) => <div className="score-line" key={key}><span>{label}</span><strong>{score[key] ?? '—'}/10</strong></div>)}
            <p className="verify-note">Last verified: {formatDate(post.last_verified_at)}</p>
          </aside>
          <article className="article-body">
            {sections.map((section, index) => <section key={`${section.label}-${index}`}><p className="section-kicker">{section.label}</p><p>{section.text}</p></section>)}
            {takeaways.length > 0 && <section><p className="section-kicker">KEY TAKEAWAYS</p><ul>{takeaways.map((item) => <li key={item}>{item}</li>)}</ul></section>}
            {post.countercase && <section className="countercase"><p className="section-kicker">COUNTERCASE</p><p>{post.countercase}</p></section>}
            {implications.length > 0 && <section><p className="section-kicker">WHAT TO DO NEXT</p><ul>{implications.map((item) => <li key={item}>{item}</li>)}</ul></section>}
            <section><p className="section-kicker">SOURCES</p>{sources.length ? <div className="source-list">{sources.map((source) => <a href={source.url} target="_blank" rel="noreferrer" key={source.url}>{source.publisher}: {source.title} <ArrowUpRight size={14} /></a>)}</div> : <p>No external source list is attached to this note.</p>}</section>
          </article>
        </section>
      </main>
    </Shell>
  );
}

function TechPage() {
  return (
    <Shell active="tech">
      <main>
        <PageHero eyebrow="SAGA / TECH" title="Technology support without mystery pricing." lede="Direct help for software, accounts, devices, data recovery triage, security basics, migration, AI setup, and small-business operations. Scope boundaries are stated before work begins." />
        <section className="section compact-top">
          <div className="section-heading split-heading"><div><p className="section-kicker">Launch pricing</p><h2>Pay for the problem being solved.</h2></div><p>Rates are deliberately transparent. Larger or uncertain jobs are assessed before a final quote is issued.</p></div>
          <div className="pricing-grid tech-grid">
            {techServices.map((service) => <ServiceCard key={service.name} service={service} />)}
          </div>
          <div className="boundary-note">
            <ShieldCheck size={22} />
            <div><strong>Data recovery boundary</strong><p>Saga performs non-invasive assessment and may perform logical recovery where appropriate. We do not perform invasive clean-room or mechanical drive repair. Physical-failure cases are referred to a specialist lab.</p></div>
          </div>
          <div className="service-categories">
            {['Device + software troubleshooting', 'Email + cloud setup', 'Account + workflow cleanup', 'Backups + migration', 'Network diagnostics', 'Basic security hardening', 'Data recovery triage', 'AI tool configuration', 'Small-business automation'].map((item) => <span key={item}>{item}</span>)}
          </div>
          <CTA title="Need technical help?" text="Submit a short project outline. Choose Diagnostic Sprint for a defined problem or describe the support request directly." />
        </section>
      </main>
    </Shell>
  );
}

function ServiceCard({ service }) {
  return (
    <article className="price-card">
      <span className="pill">TECH</span>
      <h3>{service.name}</h3>
      <div className="price">{service.price}</div>
      <div className="price-qualifier">{service.qualifier}</div>
      <p>{service.summary}</p>
      <ul>{service.includes.map((item) => <li key={item}><Check size={15} />{item}</li>)}</ul>
      <a className="button button-secondary full" href={`/#start-project`}>Request service</a>
    </article>
  );
}

function VibesPage() {
  return (
    <Shell active="vibes">
      <main>
        <PageHero eyebrow="SAGA / VIBES" title="AI-assisted. Human-reviewed. Business-ready." lede="Saga Vibes is the digital build studio inside Saga Solutions: websites, landing pages, portals, intake systems, prototypes, and automation produced quickly without outsourcing judgment to the tools." />
        <section className="section compact-top">
          <div className="vibes-process">
            {[
              ['01', 'Intake', 'Business goal, audience, offer, assets, constraints, and deadline.'],
              ['02', 'Strategy', 'Structure, messaging, conversion path, technical requirements, and risk.'],
              ['03', 'AI-assisted build', 'Draft components, copy, code, and implementation work accelerated by a coordinated tool stack.'],
              ['04', 'Human review', 'Links, forms, claims, mobile layout, security basics, accessibility, and release readiness checked manually.'],
              ['05', 'Launch + handoff', 'Deployment, repository access, operating notes, and the next iteration plan.'],
            ].map(([index, title, text]) => <article key={index}><span>{index}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
          <PortfolioSection />
          <div className="section-heading"><p className="section-kicker">Entry points</p><h2>Start small or commission the full build.</h2></div>
          <div className="pricing-grid">{packages.map((item) => <PackageCard item={item} key={item.id} />)}</div>
          <CTA title="Bring the idea. Leave with something inspectable." text="Every engagement is defined by a written scope, explicit deliverables, and a review point before release." />
        </section>
      </main>
    </Shell>
  );
}

function PackageCard({ item }) {
  return (
    <article className={cx('price-card', item.featured && 'featured')}>
      {item.featured && <span className="pill">CORE ENTRY</span>}
      <h3>{item.name}</h3>
      <div className="price">{item.price}</div><div className="price-qualifier">{item.cadence}</div>
      <p>{item.description}</p>
      <ul>{item.includes.map((line) => <li key={line}><Check size={15} />{line}</li>)}</ul>
      <a className="button button-secondary full" href={`/#start-project`}>Select</a>
    </article>
  );
}

function CodeIndex({ entries }) {
  const [query, setQuery] = useState('');
  const [kind, setKind] = useState('All');
  const kinds = ['All', ...new Set(entries.map((item) => item.kind))];
  const filtered = entries.filter((item) => {
    const haystack = `${item.title} ${item.summary} ${item.category} ${(item.tags || []).join(' ')}`.toLowerCase();
    return (kind === 'All' || item.kind === kind) && haystack.includes(query.toLowerCase());
  });
  return (
    <Shell active="code">
      <main>
        <PageHero eyebrow="SAGA / CODE" title="A curated field library, not a project graveyard." lede="Every entry must state what it does, when to use it, why it matters, how it fails, what security assumptions it makes, and when it was last verified." />
        <section className="section compact-top">
          <div className="code-doctrine">
            {['WHAT IT DOES', 'WHEN TO USE IT', 'WHY IT IS BETTER', 'FAILURE MODES', 'SECURITY NOTES', 'LAST VERIFIED'].map((item, index) => <div key={item}><span>0{index + 1}</span><strong>{item}</strong></div>)}
          </div>
          <div className="library-toolbar">
            <div className="search-field"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search prompts, schemas, recipes, and tags" /></div>
            <div className="filter-row">{kinds.map((item) => <button className={kind === item ? 'filter-active' : ''} key={item} onClick={() => setKind(item)}>{item}</button>)}</div>
          </div>
          <div className="code-grid">
            {filtered.map((entry) => (
              <InternalLink className="code-card" to={`/code/${entry.slug}`} key={entry.slug}>
                <div className="code-meta"><span className="pill">{entry.kind}</span><span className={`quality quality-${entry.quality_status}`}>{entry.quality_status}</span></div>
                <h2>{entry.title}</h2><p>{entry.summary}</p>
                <div className="tag-row">{(entry.tags || []).map((tag) => <span key={tag}>{tag}</span>)}</div>
                <div className="meta-text">{entry.language || 'text'} · {entry.difficulty} · verified {formatDate(entry.last_verified_at)}</div>
              </InternalLink>
            ))}
          </div>
          {!filtered.length && <EmptyState text="No CODE entry matches this filter yet." />}
        </section>
      </main>
    </Shell>
  );
}

function CodeDetail({ entry }) {
  const [copied, setCopied] = useState(false);
  if (!entry) return <NotFound />;
  const copy = async () => {
    await navigator.clipboard.writeText(entry.code_or_prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };
  return (
    <Shell active="code">
      <main className="code-detail-page">
        <section className="article-hero">
          <InternalLink to="/code" className="back-link">← SAGA CODE</InternalLink>
          <div className="code-meta"><span className="pill">{entry.kind}</span><span className={`quality quality-${entry.quality_status}`}>{entry.quality_status}</span></div>
          <h1>{entry.title}</h1><p className="article-dek">{entry.summary}</p>
          <div className="article-byline">{entry.category} · {entry.language || 'text'} · {entry.difficulty} · verified {formatDate(entry.last_verified_at)}</div>
        </section>
        <section className="code-detail-layout">
          <div className="code-main">
            <div className="code-block-header"><span>{entry.language || 'text'}</span><button type="button" onClick={copy}><Clipboard size={15} />{copied ? 'Copied' : 'Copy'}</button></div>
            <pre><code>{entry.code_or_prompt}</code></pre>
          </div>
          <aside className="code-notes">
            <NoteList title="WHEN TO USE IT" items={entry.usage_notes} />
            <NoteList title="FAILURE MODES" items={entry.failure_modes} />
            <NoteList title="SECURITY NOTES" items={entry.security_notes} />
            <NoteList title="PREREQUISITES" items={entry.prerequisites} />
            <div><p className="section-kicker">TESTED ON</p><p>{entry.tested_on || 'Not specified'}</p></div>
          </aside>
        </section>
      </main>
    </Shell>
  );
}

function NoteList({ title, items }) {
  const safe = Array.isArray(items) ? items : [];
  if (!safe.length) return null;
  return <div><p className="section-kicker">{title}</p><ul>{safe.map((item) => <li key={item}>{item}</li>)}</ul></div>;
}

function PageHero({ eyebrow, title, lede }) {
  return <section className="page-hero"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{lede}</p></section>;
}

function CTA({ title, text }) {
  return <div className="cta-block"><div><p className="section-kicker">START</p><h2>{title}</h2><p>{text}</p></div><a className="button button-primary" href="/#start-project">Commission a project <ArrowRight size={17} /></a></div>;
}

function EmptyState({ text }) {
  return <div className="empty-state"><Database size={20} /><p>{text}</p></div>;
}

function CommissionSection() {
  const [selectedPackage, setSelectedPackage] = useState('blueprint');
  const [lead, setLead] = useState(initialLead);
  const [leadState, setLeadState] = useState({ status: 'idle', message: '' });
  const [checkoutState, setCheckoutState] = useState({ status: 'idle', message: '' });
  const [brief, setBrief] = useState(initialBrief);
  const [briefState, setBriefState] = useState({ status: 'idle', message: '' });
  const [paymentState, setPaymentState] = useState({ status: 'idle', message: '' });
  const params = useMemo(() => new URLSearchParams(window.location.search), []);
  const paymentSucceeded = params.get('payment') === 'success';
  const paymentCancelled = params.get('payment') === 'cancelled';
  const sessionId = params.get('session_id') || '';
  const paidPackage = params.get('package') || selectedPackage;
  const selectedPackageData = packages.find((item) => item.id === selectedPackage) || packages[1];

  useEffect(() => {
    if (!paymentSucceeded || !sessionId) return;
    const storageKey = `saga-payment-confirmed:${sessionId}`;
    if (window.sessionStorage.getItem(storageKey)) {
      setPaymentState({ status: 'success', message: 'Payment was verified during this browser session.' });
      return;
    }
    setPaymentState({ status: 'loading', message: 'Verifying payment and notifying the project coordinator…' });
    postJSON('/api/payment-confirmation', { sessionId, packageId: paidPackage })
      .then((data) => {
        window.sessionStorage.setItem(storageKey, 'true');
        setPaymentState({ status: 'success', message: `Payment verified. Reference: ${data.reference}.` });
      })
      .catch((error) => setPaymentState({ status: 'error', message: error.message || 'Payment verification could not be completed automatically.' }));
  }, [paymentSucceeded, sessionId, paidPackage]);

  const validateLead = () => {
    if (!lead.name.trim() || !lead.email.trim() || !lead.projectTitle.trim() || !lead.projectSummary.trim()) {
      setLeadState({ status: 'error', message: 'Name, email, project title, and a concise project summary are required.' });
      return false;
    }
    return true;
  };

  const submitLead = async (event) => {
    event.preventDefault();
    if (!validateLead()) return;
    setLeadState({ status: 'loading', message: 'Sending your project outline…' });
    try {
      const data = await postJSON('/api/contact', { ...lead, packageId: selectedPackage, packageName: selectedPackageData.name, source: 'Saga Solutions project intake' });
      setLeadState({ status: 'success', message: `Project outline received. Reference ${data.reference || 'created'}.` });
    } catch (error) {
      setLeadState({ status: 'error', message: error.code === 'CONTACT_NOT_CONFIGURED' ? `The automated inbox is not configured yet. Email ${coordinator.email} directly with your project title.` : error.message });
    }
  };

  const startCheckout = async () => {
    if (!validateLead()) return;
    setCheckoutState({ status: 'loading', message: 'Opening secure checkout…' });
    try {
      const data = await postJSON('/api/create-checkout', { packageId: selectedPackage, customerEmail: lead.email, customerName: lead.name, projectTitle: lead.projectTitle });
      window.location.assign(data.url);
    } catch (error) {
      setCheckoutState({ status: 'error', message: error.code === 'PAYMENTS_NOT_CONFIGURED' ? 'Secure checkout is prepared but the Stripe environment variables still need to be connected. Submit the outline to request an invoice meanwhile.' : error.message });
    }
  };

  const submitBrief = async (event) => {
    event.preventDefault();
    const required = ['desiredOutcome', 'primaryUsers', 'requiredFeatures', 'successMeasures'];
    if (!paymentSucceeded || !sessionId) return setBriefState({ status: 'error', message: 'A verified checkout session is required before this brief can be submitted.' });
    if (required.some((field) => !brief[field].trim())) return setBriefState({ status: 'error', message: 'Complete the outcome, users, required features, and success measures fields.' });
    setBriefState({ status: 'loading', message: 'Submitting your commissioning brief…' });
    try {
      const data = await postJSON('/api/submit-project', { sessionId, packageId: paidPackage, lead, brief });
      setBriefState({ status: 'success', message: `Commissioning brief received. Project reference: ${data.reference}.` });
    } catch (error) {
      setBriefState({ status: 'error', message: error.message });
    }
  };

  return (
    <section className="section commission-section" id="start-project">
      <div className="section-heading split-heading">
        <div><p className="section-kicker">Commission</p><h2>Turn the problem into a written scope.</h2></div>
        <p>Submitting the outline does not require payment. Checkout is available for defined entry packages when the payment environment is configured.</p>
      </div>
      {paymentCancelled && <StatusBox state={{ status: 'error', message: 'Checkout was cancelled. Your project outline can still be submitted without payment.' }} />}
      {paymentState.status !== 'idle' && <StatusBox state={paymentState} />}
      <div className="commission-grid">
        <div className="package-selector">
          {packages.map((item) => <button key={item.id} className={selectedPackage === item.id ? 'selected' : ''} onClick={() => setSelectedPackage(item.id)}><span>{item.name}</span><strong>{item.price}</strong><small>{item.cadence}</small></button>)}
        </div>
        <form id="project-form" className="project-form" onSubmit={submitLead}>
          <div className="form-grid">
            <Field label="Name *"><input name="name" value={lead.name} onChange={(e) => setLead((v) => ({ ...v, name: e.target.value }))} /></Field>
            <Field label="Email *"><input name="email" type="email" value={lead.email} onChange={(e) => setLead((v) => ({ ...v, email: e.target.value }))} /></Field>
            <Field label="Organization"><input value={lead.organization} onChange={(e) => setLead((v) => ({ ...v, organization: e.target.value }))} /></Field>
            <Field label="Phone"><input value={lead.phone} onChange={(e) => setLead((v) => ({ ...v, phone: e.target.value }))} /></Field>
          </div>
          <Field label="Project title *"><input value={lead.projectTitle} onChange={(e) => setLead((v) => ({ ...v, projectTitle: e.target.value }))} /></Field>
          <Field label="What needs to change? *"><textarea rows="5" value={lead.projectSummary} onChange={(e) => setLead((v) => ({ ...v, projectSummary: e.target.value }))} /></Field>
          <div className="form-grid">
            <Field label="Budget"><input value={lead.budget} onChange={(e) => setLead((v) => ({ ...v, budget: e.target.value }))} /></Field>
            <Field label="Timing"><input value={lead.timeline} onChange={(e) => setLead((v) => ({ ...v, timeline: e.target.value }))} /></Field>
          </div>
          <div className="form-actions"><button className="button button-primary" type="submit">Submit outline</button><button className="button button-secondary" type="button" onClick={startCheckout}>Pay for {selectedPackageData.name}</button></div>
          {leadState.status !== 'idle' && <StatusBox state={leadState} />}
          {checkoutState.status !== 'idle' && <StatusBox state={checkoutState} />}
        </form>
      </div>
      {paymentSucceeded && sessionId && (
        <form id="project-brief" className="project-brief" onSubmit={submitBrief}>
          <div className="section-heading"><p className="section-kicker">Paid commissioning brief</p><h2>Define the result before production starts.</h2></div>
          <div className="brief-grid">
            {[
              ['desiredOutcome', 'Desired outcome *'], ['primaryUsers', 'Primary users *'], ['requiredFeatures', 'Required features *'], ['successMeasures', 'Success measures *'],
              ['referenceLinks', 'Reference links'], ['existingAssets', 'Existing assets'], ['integrations', 'Integrations'], ['constraints', 'Constraints'], ['decisionMakers', 'Decision-makers'], ['targetLaunch', 'Target launch'],
            ].map(([key, label]) => <Field label={label} key={key}><textarea rows="3" value={brief[key]} onChange={(e) => setBrief((v) => ({ ...v, [key]: e.target.value }))} /></Field>)}
          </div>
          <button className="button button-primary" type="submit">Submit commissioning brief</button>
          {briefState.status !== 'idle' && <StatusBox state={briefState} />}
        </form>
      )}
    </section>
  );
}

function Field({ label, children }) {
  return <label className="field"><span>{label}</span>{children}</label>;
}

function StatusBox({ state }) {
  return <div className={cx('status-box', `status-${state.status}`)}>{state.message}</div>;
}

function NotFound() {
  return <Shell><main><section className="page-hero"><p className="eyebrow">404</p><h1>This page is not in the current Saga index.</h1><InternalLink className="button button-primary" to="/">Return home</InternalLink></section></main></Shell>;
}

function App() {
  const path = usePathname();
  const [blogPosts, setBlogPosts] = useState(fallbackBlogPosts);
  const [codeEntries, setCodeEntries] = useState(fallbackCodeEntries);

  useEffect(() => {
    fetchPublicTable('saga_blog_posts', 'select=*&status=eq.published&order=published_at.desc')
      .then((rows) => rows?.length && setBlogPosts(rows))
      .catch(() => {});
    fetchPublicTable('saga_code_entries', 'select=*&visibility=eq.public&order=featured.desc,updated_at.desc')
      .then((rows) => rows?.length && setCodeEntries(rows))
      .catch(() => {});
  }, []);

  useEffect(() => {
    const titles = {
      '/': 'Saga Solutions — BLOG · TECH · VIBES · CODE',
      '/blog': 'SAGA BLOG — AI analysis and technical signals',
      '/tech': 'SAGA TECH — Technology support and pricing',
      '/vibes': 'SAGA VIBES — Digital product studio',
      '/code': 'SAGA CODE — Curated prompts, schemas, and recipes',
    };
    document.title = titles[path] || 'Saga Solutions';
  }, [path]);

  if (path === '/') return <Home blogPosts={blogPosts} codeEntries={codeEntries} />;
  if (path === '/blog') return <BlogIndex posts={blogPosts} />;
  if (path.startsWith('/blog/')) return <BlogDetail post={blogPosts.find((item) => item.slug === decodeURIComponent(path.slice(6)))} />;
  if (path === '/tech') return <TechPage />;
  if (path === '/vibes') return <VibesPage />;
  if (path === '/code') return <CodeIndex entries={codeEntries} />;
  if (path.startsWith('/code/')) return <CodeDetail entry={codeEntries.find((item) => item.slug === decodeURIComponent(path.slice(6)))} />;
  return <NotFound />;
}

createRoot(document.getElementById('root')).render(<React.StrictMode><App /></React.StrictMode>);
