import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Banknote,
  BarChart3,
  BookOpen,
  Bot,
  BriefcaseBusiness,
  Building2,
  Check,
  CircleDollarSign,
  ClipboardList,
  Code2,
  Database,
  FileSearch,
  Gauge,
  Mail,
  Menu,
  MessageSquareText,
  Network,
  Phone,
  ReceiptText,
  Search,
  ShieldCheck,
  Sparkles,
  Target,
  Workflow,
  X,
  Zap,
} from 'lucide-react';
import { heroImage } from './assets.js';
import './styles.css';

const coordinator = {
  name: 'Eric-Michael Wilson II',
  role: 'Project Coordinator',
  email: 'ericmichael.wil@gmail.com',
  phone: '+1 (510) 882-3649',
};

const portfolio = [
  {
    name: 'STREETS Environmental Sentinel Network',
    category: 'Civic systems',
    description:
      'A public-interest conditions platform pairing resident documentation, OAK311-ready evidence, explainable analysis, and field-service coordination.',
    href: 'https://oaklandstreets.live/',
    status: 'Live',
    tags: ['Civic data', 'Field operations', 'Evidence'],
  },
  {
    name: 'Saga Vibes',
    category: 'Product development',
    description:
      'An AI-assisted build studio designed to convert ideas into disciplined briefs, repositories, working interfaces, and deployment plans.',
    href: 'https://saga-vibe-studio.lovable.app/',
    status: 'Active build',
    tags: ['AI systems', 'Product', 'Automation'],
  },
  {
    name: 'Mystic Sage',
    category: 'Knowledge product',
    description:
      'A publishing and timing-intelligence platform joining structured interpretation, educational products, workshops, and digital tools.',
    href: 'https://mysticsage.xyz/',
    status: 'Live',
    tags: ['Publishing', 'Product design', 'Commerce'],
  },
  {
    name: 'Bay Evidence Hub',
    category: 'Investigative research',
    description:
      'A regional research desk built to organize public records, homelessness policy evidence, data notes, and publication-ready investigations.',
    href: 'https://bay-evidence-hub.lovable.app/',
    status: 'Development',
    tags: ['Research', 'Public records', 'Journalism'],
  },
  {
    name: 'Ark of Bones',
    category: 'Client platform',
    description:
      'A commercial and cultural platform for high-technology domino tables, recorded play, events, merchandise, and licensing opportunities.',
    href: 'https://www.arkofbones.com/',
    status: 'Client work',
    tags: ['Commerce', 'Media', 'Experience'],
  },
  {
    name: 'The Questlyne',
    category: 'Editorial archive',
    description:
      'An independent essay and analysis archive supporting durable authorship, cultural criticism, spiritual inquiry, and long-form publishing.',
    href: 'https://thequestlyne.blogspot.com/',
    status: 'Published',
    tags: ['Editorial', 'SEO', 'Archive'],
  },
];

const capabilities = [
  {
    icon: Target,
    title: 'Strategy and research',
    detail:
      'Market scans, stakeholder analysis, public-records research, behavioral insight, competitive positioning, and decision briefs.',
    keywords: ['strategy', 'research', 'market', 'policy', 'competitor', 'analysis', 'grant'],
  },
  {
    icon: Code2,
    title: 'Websites and digital products',
    detail:
      'Conversion-focused websites, microsites, portals, dashboards, product prototypes, repositories, and deployment architecture.',
    keywords: ['website', 'app', 'portal', 'dashboard', 'product', 'prototype', 'software'],
  },
  {
    icon: Workflow,
    title: 'Automation and operations',
    detail:
      'Intake systems, document pipelines, alerts, CRM workflows, content operations, project ledgers, and repeatable back-office processes.',
    keywords: ['automation', 'workflow', 'crm', 'operations', 'intake', 'pipeline', 'process'],
  },
  {
    icon: FileSearch,
    title: 'Civic intelligence',
    detail:
      'Public records requests, transparency systems, evidence management, government research, service mapping, and accountability tools.',
    keywords: ['government', 'records', 'transparency', 'civic', 'evidence', 'foia', 'cpra'],
  },
  {
    icon: BarChart3,
    title: 'Data and decision systems',
    detail:
      'Data models, research databases, scorecards, dashboards, source tracking, reporting systems, and explainable metrics.',
    keywords: ['data', 'database', 'metrics', 'report', 'analytics', 'dashboard', 'tracking'],
  },
  {
    icon: Sparkles,
    title: 'Brand, media, and commerce',
    detail:
      'Brand systems, editorial strategy, campaign assets, merchandise architecture, sales funnels, content libraries, and launch plans.',
    keywords: ['brand', 'media', 'content', 'commerce', 'store', 'campaign', 'merchandise'],
  },
];

const packages = [
  {
    id: 'diagnostic',
    name: 'Diagnostic Sprint',
    price: '$150',
    cadence: 'one-time',
    description:
      'A focused review of one project, problem, site, offer, or operational bottleneck.',
    includes: ['60-minute working session', 'Written findings', 'Prioritized next actions', 'One follow-up clarification'],
    bestFor: 'A defined problem that needs an expert second look.',
  },
  {
    id: 'blueprint',
    name: 'Build Blueprint',
    price: '$450',
    cadence: 'one-time',
    description:
      'A structured plan for turning an idea into a credible, buildable, monetizable project.',
    includes: ['Research and positioning', 'Feature and route plan', 'Revenue model', 'Implementation roadmap'],
    bestFor: 'Founders who need architecture before spending heavily.',
    featured: true,
  },
  {
    id: 'prototype',
    name: 'Prototype Sprint',
    price: '$1,250',
    cadence: 'starting price',
    description:
      'A working first version of a site, portal, campaign surface, dashboard, or digital service.',
    includes: ['Blueprint included', 'Working interface', 'Repository and deployment prep', 'Review and revision round'],
    bestFor: 'Projects ready to move from planning into visible execution.',
  },
  {
    id: 'partner',
    name: 'Embedded Project Partner',
    price: '$3,500+',
    cadence: 'per engagement',
    description:
      'A multi-stage engagement spanning strategy, research, build execution, launch, and operating systems.',
    includes: ['Custom scope', 'Weekly decision ledger', 'Cross-platform implementation', 'Launch and handoff'],
    bestFor: 'Organizations requiring coordinated work across disciplines.',
  },
];

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

function classNames(...values) {
  return values.filter(Boolean).join(' ');
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

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [capabilityQuery, setCapabilityQuery] = useState('');
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

  const matchedCapabilities = useMemo(() => {
    const normalized = capabilityQuery.trim().toLowerCase();
    if (!normalized) return capabilities.slice(0, 3);
    const matches = capabilities
      .map((capability) => ({
        ...capability,
        score: capability.keywords.reduce(
          (total, keyword) => total + (normalized.includes(keyword) ? 2 : 0),
          normalized
            .split(/\s+/)
            .reduce((total, word) => total + (capability.detail.toLowerCase().includes(word) ? 1 : 0), 0),
        ),
      }))
      .sort((a, b) => b.score - a.score);
    return matches.filter((item) => item.score > 0).slice(0, 3).length
      ? matches.filter((item) => item.score > 0).slice(0, 3)
      : capabilities.slice(0, 3);
  }, [capabilityQuery]);

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
        setPaymentState({
          status: 'success',
          message: `Payment verified. Coordinator notification reference: ${data.reference}.`,
        });
      })
      .catch((error) => {
        setPaymentState({
          status: 'error',
          message: error.message || 'Payment verification could not be completed automatically.',
        });
      });
  }, [paymentSucceeded, sessionId, paidPackage]);

  const updateLead = (event) => {
    const { name, value } = event.target;
    setLead((current) => ({ ...current, [name]: value }));
  };

  const updateBrief = (event) => {
    const { name, value } = event.target;
    setBrief((current) => ({ ...current, [name]: value }));
  };

  const validateLead = () => {
    if (!lead.name.trim() || !lead.email.trim() || !lead.projectTitle.trim() || !lead.projectSummary.trim()) {
      setLeadState({
        status: 'error',
        message: 'Name, email, project title, and a concise project summary are required.',
      });
      return false;
    }
    return true;
  };

  const submitLead = async (event) => {
    event.preventDefault();
    if (!validateLead()) return;

    setLeadState({ status: 'loading', message: 'Sending your project outline…' });
    try {
      const data = await postJSON('/api/contact', {
        ...lead,
        packageId: selectedPackage,
        packageName: selectedPackageData.name,
        source: 'Saga Solutions project intake',
      });
      setLeadState({
        status: 'success',
        message: `Project outline received. Reference ${data.reference || 'created'}.`,
      });
    } catch (error) {
      setLeadState({
        status: 'error',
        message:
          error.code === 'CONTACT_NOT_CONFIGURED'
            ? `The automated inbox is not configured yet. Email ${coordinator.email} directly with your project title.`
            : error.message,
      });
    }
  };

  const startCheckout = async () => {
    if (!validateLead()) {
      document.querySelector('#project-form')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    setCheckoutState({ status: 'loading', message: 'Opening secure checkout…' });
    try {
      const data = await postJSON('/api/create-checkout', {
        packageId: selectedPackage,
        customerEmail: lead.email,
        customerName: lead.name,
        projectTitle: lead.projectTitle,
      });
      window.location.assign(data.url);
    } catch (error) {
      setCheckoutState({
        status: 'error',
        message:
          error.code === 'PAYMENTS_NOT_CONFIGURED'
            ? 'Secure checkout is prepared but Stripe environment variables still need to be connected. Submit the project outline to request an invoice meanwhile.'
            : error.message,
      });
    }
  };

  const submitBrief = async (event) => {
    event.preventDefault();
    if (!paymentSucceeded || !sessionId) {
      setBriefState({
        status: 'error',
        message: 'A verified checkout session is required before this commissioning brief can be submitted.',
      });
      return;
    }

    const required = ['desiredOutcome', 'primaryUsers', 'requiredFeatures', 'successMeasures'];
    if (required.some((field) => !brief[field].trim())) {
      setBriefState({
        status: 'error',
        message: 'Complete the outcome, users, required features, and success measures fields.',
      });
      return;
    }

    setBriefState({ status: 'loading', message: 'Submitting your commissioning brief…' });
    try {
      const data = await postJSON('/api/submit-project', {
        sessionId,
        packageId: paidPackage,
        lead,
        brief,
      });
      setBriefState({
        status: 'success',
        message: `Commissioning brief received. Project reference: ${data.reference}. A summary has been sent to the project coordinator.`,
      });
    } catch (error) {
      setBriefState({ status: 'error', message: error.message });
    }
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Saga Solutions home">
          <span className="wordmark-primary">SAGA</span>
          <span className="wordmark-secondary">SOLUTIONS</span>
        </a>

        <button
          className="menu-button"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        <nav className={classNames('main-nav', menuOpen && 'is-open')} aria-label="Primary navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>Work</a>
          <a href="#capabilities" onClick={() => setMenuOpen(false)}>Capabilities</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>Process</a>
          <a href="#start-project" onClick={() => setMenuOpen(false)}>Start a project</a>
          <a className="nav-cta" href={`mailto:${coordinator.email}`}>Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero-section">
          <div className="hero-image" style={{ backgroundImage: `url("${heroImage}")` }} aria-hidden="true" />
          <div className="hero-scrim" aria-hidden="true" />
          <div className="hero-content">
            <p className="eyebrow">Independent strategy, research, technology, and venture development</p>
            <h1>
              Difficult projects.
              <span>Clear operating systems.</span>
            </h1>
            <p className="hero-lede">
              Saga Solutions researches the problem, defines the offer, builds the system, and prepares the work
              for launch. One coordinated practice for organizations and founders who do not need another vague
              consultancy deck.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#start-project">
                Start a paid engagement <ArrowRight size={18} />
              </a>
              <a className="button button-secondary" href="#work">
                Inspect the portfolio
              </a>
            </div>
          </div>

          <div className="hero-index">
            <span>Oakland / Bay Area / Remote</span>
            <span>Research · Systems · Product · Operations</span>
            <span>Project coordination: {coordinator.name}</span>
          </div>
        </section>

        <section className="proof-strip" aria-label="Saga Solutions operating principles">
          <div><BadgeCheck size={17} /> Evidence before claims</div>
          <div><Gauge size={17} /> Scope before execution</div>
          <div><ReceiptText size={17} /> Written decisions and deliverables</div>
          <div><ShieldCheck size={17} /> No invented results or hidden dependencies</div>
        </section>

        <section className="section" id="capabilities">
          <div className="section-heading split-heading">
            <div>
              <p className="section-kicker">Capability architecture</p>
              <h2>Broad enough to coordinate the whole problem. Specific enough to deliver.</h2>
            </div>
            <p>
              The practical advantage is not “doing everything.” It is reducing handoff failure between research,
              strategy, design, technology, communications, and operations.
            </p>
          </div>

          <div className="capability-grid">
            {capabilities.map(({ icon: Icon, title, detail }) => (
              <article className="capability-card" key={title}>
                <Icon size={22} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="matcher-section">
          <div className="matcher-copy">
            <p className="section-kicker">Scope finder</p>
            <h2>Describe the assignment in plain language.</h2>
            <p>
              This is not an AI chatbot and it does not pretend to quote a final scope. It identifies the operating
              disciplines most likely to be involved so the first conversation starts at a higher level.
            </p>
          </div>

          <div className="matcher-panel">
            <label htmlFor="capability-query">What are you trying to build, repair, investigate, or sell?</label>
            <div className="search-field">
              <Search size={20} aria-hidden="true" />
              <input
                id="capability-query"
                value={capabilityQuery}
                onChange={(event) => setCapabilityQuery(event.target.value)}
                placeholder="Example: create a public records database and publish a paid research report"
              />
            </div>
            <div className="match-results" aria-live="pollite">
              {matchedCapabilities.map(({ icon: Icon, title, detail }) => (
                <div className="match-result" key={title}>
                  <Icon size={18} />
                  <div>
                    <strong>{title}</strong>
                    <span>{detail}</span>
                  </div>
                </div>
              ))}
            </div>
            <a className="text-link" href="#start-project">
              Convert this into a project brief <ArrowRight size={16} />
            </a>
          </div>
        </section>

        <section className="section work-section" id="work">
          <div className="section-heading">
            <p className="section-kicker">Portfolio insight</p>
            <h2>Projects that demonstrate the range without obscuring the method.</h2>
          </div>

          <div className="portfolio-grid">
            {portfolio.map((project, index) => (
              <a
                className={classNames('portfolio-card', index === 0 && 'portfolio-card-featured')}
                href={project.href}
                target="_blank"
                rel="noreferrer"
                key={project.name}
              >
                <div className="portfolio-meta">
                  <span>{project.category}</span>
                  <span className="project-status">{project.status}</span>
                </div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <div className="tag-row">
                  {project.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
                <div className="portfolio-link">
                  Open project <ArrowUpRight size={17} />
                </div>
              </a>
            ))}
          </div>
        </section>

        <section className="process-section" id="process">
          <div className="section-heading">
            <p className="section-kicker">Delivery model</p>
            <h2>A visible process from first question to working asset.</h2>
          </div>

          <ol className="process-list">
            <li>
              <span>01</span>
              <div><h3>Diagnose</h3><p>Clarify the actual decision, user, constraint, risk, and commercial objective.</p></div>
            </li>
            <li>
              <span>02</span>
              <div><h3>Structure</h3><p>Produce a scope, evidence plan, system architecture, price logic, and acceptance criteria.</p></div>
            </li>
            <li>
              <span>03</span>
              <div><h3>Build</h3><p>Create the research, interface, database, content, workflow, or operational package.</p></div>
            </li>
            <li>
              <span>04</span>
              <div><h3>Verify</h3><p>Test links, claims, forms, routes, permissions, dependencies, and handoff documentation.</p></div>
            </li>
            <li>
              <span>05</span>
              <div><h3>Launch and compound</h3><p>Publish, measure, repair weak points, and convert the project into repeatable capacity.</p></div>
            </li>
          </ol>
        </section>

        <section className="section pricing-section" id="start-project">
          <div className="section-heading split-heading">
            <div>
              <p className="section-kicker">Paid entry points</p>
              <h2>Buy a defined first step instead of entering an indefinite sales process.</h2>
            </div>
            <p>
              Launch pricing establishes a clean starting point. Materially larger scopes receive a written proposal
              after the diagnostic or blueprint stage.
            </p>
          </div>

          <div className="pricing-grid">
            {packages.map((item) => (
              <button
                type="button"
                className={classNames(
                  'package-card',
                  item.featured && 'featured',
                  selectedPackage === item.id && 'selected',
                )}
                onClick={() => setSelectedPackage(item.id)}
                key={item.id}
              >
                <div className="package-select">
                  <span>{selectedPackage === item.id ? <Check size={15} /> : null}</span>
                  {item.featured ? <em>Recommended starting point</em> : null}
                </div>
                <h3>{item.name}</h3>
                <div className="package-price">{item.price} <small>{item.cadence}</small></div>
                <p>{item.description}</p>
                <ul>
                  {item.includes.map((entry) => <li key={entry}><Check size={15} /> {entry}</li>)}
                </ul>
                <div className="best-for"><strong>Best for:</strong> {item.bestFor}</div>
              </button>
            ))}
          </div>

          <div className="project-console" id="project-form">
            <div className="console-summary">
              <p className="section-kicker">Selected engagement</p>
              <h3>{selectedPackageData.name}</h3>
              <div className="summary-price">{selectedPackageData.price}</div>
              <p>{selectedPackageData.description}</p>
              <div className="coordinator-card">
                <span className="coordinator-mark">S</span>
                <div>
                  <strong>{coordinator.name}</strong>
                  <small>{coordinator.role}</small>
                  <a href={`mailto:${coordinator.email}`}><Mail size={15} /> {coordinator.email}</a>
                  <a href={`tel:${coordinator.phone.replace(/[^\d+]/g, '')}`}><Phone size={15} /> {coordinator.phone}</a>
                </div>
              </div>
              <p className="fine-print">
                Card details are entered only on Stripe’s hosted checkout. Saga Solutions does not collect or store
                card numbers in this form.
              </p>
            </div>

            <form className="project-form" onSubmit={submitLead}>
              <div className="form-heading">
                <ClipboardList size={20} />
                <div>
                  <h3>Project outline</h3>
                  <p>Provide enough context to connect the payment to a real assignment.</p>
                </div>
              </div>

              <div className="form-grid">
                <label>
                  Name *
                  <input name="name" value={lead.name} onChange={updateLead} autoComplete="name" />
                </label>
                <label>
                  Email *
                  <input name="email" type="email" value={lead.email} onChange={updateLead} autoComplete="email" />
                </label>
                <label>
                  Phone
                  <input name="phone" value={lead.phone} onChange={updateLead} autoComplete="tel" />
                </label>
                <label>
                  Organization
                  <input name="organization" value={lead.organization} onChange={updateLead} />
                </label>
                <label className="span-two">
                  Project title *
                  <input name="projectTitle" value={lead.projectTitle} onChange={updateLead} />
                </label>
                <label className="span-two">
                  What needs to be accomplished? *
                  <textarea name="projectSummary" value={lead.projectSummary} onChange={updateLead} rows="5" />
                </label>
                <label>
                  Working budget
                  <select name="budget" value={lead.budget} onChange={updateLead}>
                    <option value="">Select</option>
                    <option>Under $500</option>
                    <option>$500–$1,500</option>
                    <option>$1,500–$5,000</option>
                    <option>$5,000–$15,000</option>
                    <option>$15,000+</option>
                  </select>
                </label>
                <label>
                  Desired timing
                  <select name="timeline" value={lead.timeline} onChange={updateLead}>
                    <option value="">Select</option>
                    <option>As soon as responsibly possible</option>
                    <option>Within 30 days</option>
                    <option>Within 60–90 days</option>
                    <option>This quarter</option>
                    <option>Exploratory</option>
                  </select>
                </label>
              </div>

              {leadState.message ? (
                <div className={classNames('form-notice', leadState.status)}>{leadState.message}</div>
              ) : null}
              {checkoutState.message ? (
                <div className={classNames('form-notice', checkoutState.status)}>{checkoutState.message}</div>
              ) : null}
              {paymentCancelled ? (
                <div className="form-notice error">Checkout was cancelled. Your project information remains in the form.</div>
              ) : null}

              <div className="form-actions">
                <button className="button button-secondary" type="submit" disabled={leadState.status === 'loading'}>
                  <MessageSquareText size={18} />
                  {leadState.status === 'loading' ? 'Sending…' : 'Send outline / request invoice'}
                </button>
                <button
                  className="button button-primary"
                  type="button"
                  onClick={startCheckout}
                  disabled={checkoutState.status === 'loading'}
                >
                  <CircleDollarSign size={18} />
                  {checkoutState.status === 'loading' ? 'Opening checkout…' : `Pay ${selectedPackageData.price}`}
                </button>
              </div>
            </form>
          </div>
        </section>

        <section className={classNames('commission-section', paymentSucceeded && 'is-active')} id="project-brief">
          <div className="commission-intro">
            <div className="payment-status">
              {paymentSucceeded ? <BadgeCheck size={22} /> : <Banknote size={22} />}
              {paymentSucceeded ? 'Payment return detected' : 'Post-purchase commissioning brief'}
            </div>
            <h2>Payment initiates the engagement. This brief supplies the operating facts.</h2>
            <p>
              After a successful checkout, the client completes this second-stage survey. The verified payment,
              project outline, and detailed brief are consolidated into a coordinator summary and project record.
            </p>
            {paymentState.message ? (
              <div className={classNames('form-notice', paymentState.status)}>{paymentState.message}</div>
            ) : null}
          </div>

          {paymentSucceeded ? (
            <form className="brief-form" onSubmit={submitBrief}>
              <div className="form-grid">
                <label className="span-two">
                  What must be measurably different when the engagement is complete? *
                  <textarea name="desiredOutcome" value={brief.desiredOutcome} onChange={updateBrief} rows="4" />
                </label>
                <label className="span-two">
                  Who are the primary users, customers, readers, partners, or decision-makers? *
                  <textarea name="primaryUsers" value={brief.primaryUsers} onChange={updateBrief} rows="4" />
                </label>
                <label className="span-two">
                  Required functions, deliverables, pages, research questions, or services *
                  <textarea name="requiredFeatures" value={brief.requiredFeatures} onChange={updateBrief} rows="5" />
                </label>
                <label>
                  Reference links
                  <textarea name="referenceLinks" value={brief.referenceLinks} onChange={updateBrief} rows="4" />
                </label>
                <label>
                  Existing assets and accounts
                  <textarea name="existingAssets" value={brief.existingAssets} onChange={updateBrief} rows="4" />
                </label>
                <label>
                  Required integrations
                  <textarea name="integrations" value={brief.integrations} onChange={updateBrief} rows="4" />
                </label>
                <label>
                  Constraints, exclusions, or sensitive issues
                  <textarea name="constraints" value={brief.constraints} onChange={updateBrief} rows="4" />
                </label>
                <label className="span-two">
                  How will success be judged? *
                  <textarea name="successMeasures" value={brief.successMeasures} onChange={updateBrief} rows="4" />
                </label>
                <label>
                  Final decision-makers
                  <input name="decisionMakers" value={brief.decisionMakers} onChange={updateBrief} />
                </label>
                <label>
                  Target launch or delivery date
                  <input name="targetLaunch" type="date" value={brief.targetLaunch} onChange={updateBrief} />
                </label>
              </div>

              {briefState.message ? (
                <div className={classNames('form-notice', briefState.status)}>{briefState.message}</div>
              ) : null}

              <button className="button button-primary" type="submit" disabled={briefState.status === 'loading'}>
                <Zap size={18} />
                {briefState.status === 'loading' ? 'Submitting brief…' : 'Submit commissioning brief'}
              </button>
            </form>
          ) : (
            <div className="locked-brief">
              <ShieldCheck size={28} />
              <div>
                <strong>The detailed survey unlocks after checkout.</strong>
                <span>The return URL carries the Stripe session ID used to verify payment server-side.</span>
              </div>
              <a href="#start-project">Select an engagement <ArrowRight size={16} /></a>
            </div>
          )}
        </section>

        <section className="section operating-section">
          <div className="section-heading split-heading">
            <div>
              <p className="section-kicker">Additional commercial infrastructure</p>
              <h2>What belongs on this page beyond a portfolio and contact form.</h2>
            </div>
            <p>
              A credible commercial site should reduce uncertainty, collect qualified demand, document transactions,
              and make the next operational action unmistakable.
            </p>
          </div>

          <div className="operating-grid">
            <article><Network size={21} /><h3>Partner network</h3><p>A reviewed bench of specialists for legal, finance, engineering, production, design, field work, and subject-matter research.</p></article>
            <article><Database size={21} /><h3>Client workspace</h3><p>Secure access to briefs, files, decisions, milestones, invoices, approvals, and launch documentation.</p></article>
            <article><BookOpen size={21} /><h3>Methods library</h3><p>Public explanations of how research, AI-assisted development, privacy, source control, and quality assurance are handled.</p></article>
            <article><Building2 size={21} /><h3>Procurement desk</h3><p>W-9, capability statement, insurance, vendor details, sample scopes, service classifications, and contracting readiness.</p></article>
            <article><BriefcaseBusiness size={21} /><h3>Retainer desk</h3><p>Recurring research, content, operations, maintenance, and product-development packages for ongoing clients.</p></article>
            <article><Bot size={21} /><h3>Automation readiness</h3><p>Automated intake summaries, lead routing, project records, payment verification, client updates, and reporting without concealing human accountability.</p></article>
          </div>
        </section>

        <section className="contact-section">
          <div>
            <p className="section-kicker">Direct contact</p>
            <h2>Bring the problem, the evidence, and the actual constraints.</h2>
          </div>
          <div className="contact-actions">
            <a href={`mailto:${coordinator.email}`}><Mail size={19} /> {coordinator.email}</a>
            <a href={`tel:${coordinator.phone.replace(/[^\d+]/g, '')}`}><Phone size={19} /> {coordinator.phone}</a>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <span>SAGA</span>
          <small>SOLUTIONS</small>
        </div>
        <p>Strategy · Research · Technology · Media · Operations</p>
        <div className="footer-links">
          <a href="#top">Top</a>
          <a href="#work">Portfolio</a>
          <a href="#start-project">Engage</a>
          <a href={`mailto:${coordinator.email}`}>Email</a>
        </div>
        <small>© {new Date().getFullYear()} Saga Solutions. Payment processing and project intake require configured Stripe, Supabase, and email-service credentials.</small>
      </footer>
    </div>
  );
}

createRoot(document.getElementById('root')).render(<App />);
