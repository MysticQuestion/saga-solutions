import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Menu,
  MoveUpRight,
  X,
} from 'lucide-react';
import {
  company,
  intelligenceItems,
  lexicon,
  projects,
  resourceGroups,
  systems,
} from './site-data.js';
import './styles.css';

function cx(...values) {
  return values.filter(Boolean).join(' ');
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
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) return;

    event.preventDefault();
    window.history.pushState({}, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
    window.scrollTo({ top: 0, behavior: 'instant' });
    onClick?.(event);
  };

  return <a href={to} className={className} onClick={navigate} {...props}>{children}</a>;
}

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <InternalLink to="/" className="wordmark" onClick={() => setOpen(false)} aria-label="Saga Systems home">
          <span>SAGA</span>
          <strong>SYSTEMS</strong>
        </InternalLink>

        <button
          className="menu-button"
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>

        <nav className={cx('main-nav', open && 'is-open')} aria-label="Primary navigation">
          <a href="/#systems" onClick={() => setOpen(false)}>Systems</a>
          <InternalLink to="/work" onClick={() => setOpen(false)}>Work</InternalLink>
          <a href="/#resources" onClick={() => setOpen(false)}>Resources</a>
          <a href="/#intelligence" onClick={() => setOpen(false)}>Intelligence</a>
          <a href="/#studio" onClick={() => setOpen(false)}>Studio</a>
          <a href="/#about" onClick={() => setOpen(false)}>About</a>
          <a className="nav-action" href={`mailto:${company.email}`}>Start a project</a>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-company">
          <strong>Saga Systems</strong>
          <p>{company.description}</p>
          <a href={`mailto:${company.email}`}>{company.email}</a>
        </div>

        <div className="lexicon-card" aria-label="Saga Lexicon word of the day">
          <div className="lexicon-meta"><span>LEXICON / {lexicon.date}</span><span>WORD OF THE DAY</span></div>
          <div className="lexicon-wordline">
            <strong>{lexicon.word}</strong>
            <span>{lexicon.pronunciation}</span>
          </div>
          <p>{lexicon.definition}</p>
          <em>{lexicon.example}</em>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Saga Systems</span>
        <span>{company.location}</span>
        <span>{company.domain}</span>
      </div>
    </footer>
  );
}

function ProjectVisual({ project, compact = false }) {
  const style = {
    '--project-accent': project.accent,
    '--project-surface': project.surface,
    '--project-ink': project.ink,
  };

  return (
    <div className={cx('project-visual', `visual-${project.visual}`, compact && 'is-compact')} style={style}>
      <div className="visual-browser-bar">
        <span /><span /><span />
        <small>{project.name}</small>
      </div>
      <div className="visual-stage">
        {project.visual === 'breach' && <BreachVisual />}
        {project.visual === 'domino' && <DominoVisual />}
        {project.visual === 'streets' && <StreetsVisual />}
        {project.visual === 'evidence' && <EvidenceVisual />}
        {project.visual === 'aethos' && <AethosVisual />}
        {project.visual === 'sage' && <SageVisual />}
        {project.visual === 'vibes' && <VibesVisual />}
      </div>
    </div>
  );
}

function BreachVisual() {
  return (
    <div className="breach-scene">
      <div className="breach-noise" />
      <div className="breach-counter">00:08:17</div>
      <div className="breach-title">
        <small>ENTRY SEQUENCE</small>
        <strong>NEURAL<br />BREACH</strong>
        <span>signal acquired / interface pending</span>
      </div>
      <div className="breach-timeline"><i /><i /><i /><i /><i /></div>
    </div>
  );
}

function DominoVisual() {
  const dominoes = [[3, 4], [6, 1], [2, 5], [0, 6], [4, 4]];
  return (
    <div className="domino-scene">
      <div className="domino-heading"><small>ARK OF BONES</small><span>loading the table</span></div>
      <div className="domino-row">
        {dominoes.map(([top, bottom], index) => (
          <div className="domino" key={`${top}-${bottom}-${index}`} style={{ '--delay': `${index * 90}ms` }}>
            <span>{top}</span><b /><span>{bottom}</span>
          </div>
        ))}
      </div>
      <div className="domino-progress"><span /></div>
    </div>
  );
}

function StreetsVisual() {
  return (
    <div className="streets-scene">
      <div className="map-panel">
        <div className="map-grid" />
        <div className="street-line one" />
        <div className="street-line two" />
        <div className="street-line three" />
        <i className="map-pin p1" /><i className="map-pin p2" /><i className="map-pin p3" /><i className="map-pin p4" />
        <div className="map-label">WEST OAKLAND / CORRIDOR 03</div>
      </div>
      <div className="recurrence-panel">
        <small>RECURRENCE</small>
        <strong>12.4 days</strong>
        <p>median return interval</p>
        <div className="recurrence-bars"><i /><i /><i /><i /><i /><i /></div>
        <div className="verification-chip">human verified</div>
      </div>
    </div>
  );
}

function EvidenceVisual() {
  const rows = [
    ['OAK-PR-042', 'Public record', 'Verified'],
    ['ALA-HMIS-18', 'Dataset', 'Updated'],
    ['SF-LEG-311', 'Legislation', 'Source linked'],
    ['CC-MTG-229', 'Meeting record', 'Reviewed'],
  ];
  return (
    <div className="evidence-scene">
      <div className="evidence-header"><span>BAY EVIDENCE</span><small>source registry / live index</small></div>
      <div className="county-tabs"><span>ALAMEDA</span><span>SF</span><span>CONTRA COSTA</span><span>+6</span></div>
      <div className="evidence-table">
        {rows.map((row) => (
          <div className="evidence-row" key={row[0]}>
            <code>{row[0]}</code><span>{row[1]}</span><b>{row[2]}</b>
          </div>
        ))}
      </div>
      <div className="evidence-foot"><span>PROVENANCE ATTACHED</span><span>CORRECTIONS LEDGER ACTIVE</span></div>
    </div>
  );
}

function AethosVisual() {
  return (
    <div className="aethos-scene">
      <svg viewBox="0 0 360 360" role="img" aria-label="Abstract natal chart interface study">
        <circle cx="180" cy="180" r="150" fill="none" stroke="currentColor" strokeWidth="1" opacity=".55" />
        <circle cx="180" cy="180" r="112" fill="none" stroke="currentColor" strokeWidth="1" opacity=".32" />
        <circle cx="180" cy="180" r="68" fill="none" stroke="currentColor" strokeWidth="1" opacity=".22" />
        {[0, 30, 60, 90, 120, 150].map((angle) => (
          <line key={angle} x1="180" y1="30" x2="180" y2="330" transform={`rotate(${angle} 180 180)`} stroke="currentColor" strokeWidth="1" opacity=".26" />
        ))}
        <path d="M78 118 L270 210 L112 274 L242 78 L78 118" fill="none" stroke="var(--project-accent)" strokeWidth="2" opacity=".95" />
        <path d="M92 238 L278 130 L180 312 L92 238" fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".55" />
        <circle cx="78" cy="118" r="5" fill="var(--project-accent)" />
        <circle cx="270" cy="210" r="5" fill="var(--project-accent)" />
        <circle cx="112" cy="274" r="5" fill="var(--project-accent)" />
        <circle cx="242" cy="78" r="5" fill="var(--project-accent)" />
      </svg>
      <div className="aethos-copy"><small>AETHOS / NATAL MODEL</small><strong>Know Thyself.</strong><span>sources → conditions → synthesis → report</span></div>
    </div>
  );
}

function SageVisual() {
  return (
    <div className="sage-scene">
      <div className="sage-bookline"><span>MYSTIC SAGE</span><small>ADVANCED WORKSHOP SYSTEM</small></div>
      <div className="module-stack">
        <div><span>05</span><strong>Traditional Planets</strong><small>Core components</small></div>
        <div><span>10</span><strong>Essential Dignities</strong><small>Condition analysis</small></div>
        <div><span>18</span><strong>Reception</strong><small>Relational logic</small></div>
        <div><span>24</span><strong>Partnership</strong><small>Applied synthesis</small></div>
      </div>
      <div className="sage-note">lecture / method / exercises / sources / participant record</div>
    </div>
  );
}

function VibesVisual() {
  return (
    <div className="vibes-scene">
      <div className="prompt-panel">
        <small>PROJECT PROMPT</small>
        <p>Build a public research interface with source provenance, a restrained editorial system, and an operating dashboard.</p>
        <div className="prompt-footer"><span>Audience defined</span><span>Constraints attached</span></div>
      </div>
      <div className="agent-panel">
        <small>PRODUCTION ROLES</small>
        {['Architecture', 'Design', 'Editorial', 'Accessibility', 'Deployment'].map((item, index) => (
          <div key={item}><i>{String(index + 1).padStart(2, '0')}</i><span>{item}</span><b>ready</b></div>
        ))}
      </div>
    </div>
  );
}

function StatusPill({ project }) {
  return <span className="status-pill"><i style={{ background: project.accent }} />{project.status}</span>;
}

function ProjectShowcase({ project, index, compact = false }) {
  const style = { '--project-accent': project.accent };

  if (compact) {
    return (
      <InternalLink className="compact-project" to={`/work/${project.slug}`} style={style}>
        <ProjectVisual project={project} compact />
        <div className="compact-project-copy">
          <div className="project-meta"><span>0{index + 1}</span><StatusPill project={project} /></div>
          <h3>{project.name}</h3>
          <p>{project.category}</p>
          <span className="case-link">Open case study <ArrowRight size={15} /></span>
        </div>
      </InternalLink>
    );
  }

  return (
    <article className={cx('project-showcase', index % 2 === 1 && 'is-reversed')} style={style}>
      <InternalLink className="project-media-link" to={`/work/${project.slug}`} aria-label={`Open ${project.name} case study`}>
        <ProjectVisual project={project} />
      </InternalLink>

      <div className="project-copy">
        <div className="project-meta">
          <span>0{index + 1} / {project.category}</span>
          <StatusPill project={project} />
        </div>
        <h2>{project.name}</h2>
        <p className="project-summary">{project.summary}</p>

        <div className="proof-list">
          {project.proof.slice(0, 3).map((item) => (
            <div key={item.title}>
              <CheckCircle2 size={17} />
              <p><strong>{item.title}</strong>{item.text}</p>
            </div>
          ))}
        </div>

        <div className="demonstrates">
          <small>WHAT THIS DEMONSTRATES</small>
          <div>{project.demonstrates.map((item) => <span key={item}>{item}</span>)}</div>
        </div>

        <div className="project-actions">
          <InternalLink to={`/work/${project.slug}`} className="text-action">Full case study <ArrowRight size={16} /></InternalLink>
          {project.href && <a href={project.href} target="_blank" rel="noreferrer" className="text-action secondary">View live <ArrowUpRight size={15} /></a>}
        </div>
      </div>
    </article>
  );
}

function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="home-hero">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
          <div className="hero-orbit hero-orbit-two" aria-hidden="true" />

          <div className="hero-inner">
            <div className="hero-copy">
              <p className="eyebrow">Independent systems company / Oakland</p>
              <h1>Saga Systems</h1>
              <p className="hero-lede">{company.description}</p>
              <div className="hero-actions">
                <InternalLink to="/work" className="button primary">View selected work <ArrowRight size={17} /></InternalLink>
                <a href={`mailto:${company.email}`} className="button secondary">Start a project</a>
              </div>
            </div>

            <div className="hero-system-card">
              <div className="system-card-top"><span>SAGA / OPERATING MODEL</span><span>2026</span></div>
              <div className="system-card-core">FRAME <i /> INVESTIGATE <i /> ARCHITECT <i /> BUILD <i /> VERIFY <i /> OPERATE</div>
              <div className="system-card-foot">
                <span>research infrastructure</span>
                <span>digital systems</span>
                <span>creative technology</span>
                <span>applied intelligence</span>
              </div>
            </div>
          </div>

          <div className="hero-bottomline"><span>{company.domain}</span><span>Institutional shell. Distinct systems.</span></div>
        </section>

        <section className="section systems-section" id="systems">
          <SectionHeading
            kicker="Systems"
            title="Six construction environments. One operating practice."
            body="The categories are deliberately broad enough to support a research platform, a client portal, an AI workflow, a publishing system, or an experimental interface without pretending those things are the same product."
          />
          <div className="systems-grid">
            {systems.map((item) => (
              <article key={item.id}>
                <span>{item.index}</span>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section selected-work-section">
          <SectionHeading
            kicker="Selected work"
            title="Different problems should produce different interfaces."
            body="Saga retains a restrained institutional identity. The work is allowed to look, move, and behave according to the system it serves."
            action={<InternalLink to="/work" className="heading-action">All work <ArrowRight size={16} /></InternalLink>}
          />
          <div className="compact-work-grid">
            {projects.slice(0, 4).map((project, index) => <ProjectShowcase key={project.slug} project={project} index={index} compact />)}
          </div>
        </section>

        <section className="section resources-section" id="resources">
          <SectionHeading
            kicker="Resources"
            title="Useful material, released when there is something worth using."
            body="Reserved categories do not become navigation destinations until the underlying material exists."
          />
          <div className="resource-grid">
            {resourceGroups.map((group) => (
              <article key={group.label}>
                <div><span>{group.status}</span><MoveUpRight size={17} /></div>
                <h3>{group.label}</h3>
                <p>{group.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section intelligence-section" id="intelligence">
          <SectionHeading
            kicker="Saga Intelligence"
            title="Notes from systems being built, tested, and maintained."
            body="Research and operational observations are published as records of practice, not as a feed that needs to be filled every day."
          />
          <div className="intelligence-list">
            {intelligenceItems.map((item, index) => (
              <article key={item.title}>
                <span>0{index + 1}</span>
                <div><small>{item.type}</small><h3>{item.title}</h3><p>{item.summary}</p></div>
              </article>
            ))}
          </div>
        </section>

        <section className="section studio-section" id="studio">
          <div className="studio-shell">
            <div>
              <p className="section-kicker">Saga Vibes Studio</p>
              <h2>Prompt-driven production should still leave a system you can inspect and edit.</h2>
              <p>The Studio is being designed around explicit project state, production roles, visual revision, repository handoff, and deployment—not one-shot page generation.</p>
              <InternalLink to="/work/saga-vibes" className="button studio-button">View the Studio architecture <ArrowRight size={16} /></InternalLink>
            </div>
            <ProjectVisual project={projects.find((project) => project.slug === 'saga-vibes')} compact />
          </div>
        </section>

        <section className="section about-section" id="about">
          <SectionHeading
            kicker="About"
            title="Saga Systems is organized around systems, not personalities."
            body="The company develops and maintains digital products, research infrastructure, applied AI workflows, automation, creative technology, and client systems. Public work is labeled by development state. Methods and constraints should remain visible where they materially affect the result."
          />
          <div className="about-principles">
            <div><span>01</span><strong>Evidence before certainty.</strong><p>Research outputs should retain sources, uncertainty, corrections, and the boundary between fact and inference.</p></div>
            <div><span>02</span><strong>Human review before release.</strong><p>Automation and AI can accelerate production without becoming the unexamined authority for the final result.</p></div>
            <div><span>03</span><strong>State the boundary.</strong><p>Prototype, pilot, research, and production are different conditions. The interface should say which one applies.</p></div>
          </div>
        </section>

        <section className="contact-band">
          <div><p className="section-kicker">Start a project</p><h2>Bring the problem, the existing material, and the constraint.</h2></div>
          <a href={`mailto:${company.email}`} className="contact-link">{company.email} <ArrowUpRight size={20} /></a>
        </section>
      </main>
      <Footer />
    </>
  );
}

function WorkIndex() {
  return (
    <>
      <Header />
      <main>
        <section className="page-hero work-hero">
          <div>
            <p className="eyebrow">Work / Selected systems</p>
            <h1>Systems in practice.</h1>
            <p>Visual and technical evidence from production systems, pilots, prototypes, and maintained research environments.</p>
          </div>
          <aside>
            <strong>{projects.length}</strong>
            <span>selected systems</span>
            <small>Each project keeps its own visual language.</small>
          </aside>
        </section>

        <section className="work-list">
          {projects.map((project, index) => <ProjectShowcase key={project.slug} project={project} index={index} />)}
        </section>
      </main>
      <Footer />
    </>
  );
}

function ProjectDetail({ project }) {
  if (!project) return <NotFound />;

  const style = { '--project-accent': project.accent };
  return (
    <>
      <Header />
      <main className="project-page" style={style}>
        <section className="project-detail-hero">
          <div className="project-detail-heading">
            <InternalLink to="/work" className="back-link">← Work</InternalLink>
            <div className="project-detail-meta"><span>{project.category}</span><StatusPill project={project} /></div>
            <h1>{project.name}</h1>
            <p>{project.summary}</p>
            <div className="project-actions">
              {project.href && <a href={project.href} target="_blank" rel="noreferrer" className="button primary">Visit live project <ExternalLink size={15} /></a>}
              <a href={`mailto:${company.email}?subject=${encodeURIComponent(`Saga Systems / ${project.name}`)}`} className="button secondary">Discuss a related system</a>
            </div>
          </div>
          <ProjectVisual project={project} />
        </section>

        <section className="detail-section feature-tour">
          <div className="detail-kicker"><span>01</span><p>Visual feature tour</p></div>
          <div className="feature-tour-grid">
            {project.proof.map((item, index) => (
              <article key={item.title}>
                <small>0{index + 1}</small>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="detail-section split-detail">
          <div className="detail-kicker"><span>02</span><p>What this demonstrates</p></div>
          <div className="demonstration-grid">
            {project.demonstrates.map((item) => <div key={item}><i /><strong>{item}</strong></div>)}
          </div>
        </section>

        <section className="detail-section split-detail technical-detail">
          <div className="detail-kicker"><span>03</span><p>System architecture</p></div>
          <div>
            <h2>Built as a system, not a surface.</h2>
            <p className="detail-intro">The public interface is one layer. The operating model underneath defines what the system records, how state changes, how review happens, and where future components can attach.</p>
            <ol className="architecture-list">
              {project.architecture.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong></li>)}
            </ol>
          </div>
        </section>

        <section className="next-project-band">
          <div><small>RELATED WORK</small><strong>Continue through the portfolio.</strong></div>
          <InternalLink to={`/work/${getNextProject(project.slug).slug}`} className="next-project-link">
            {getNextProject(project.slug).name} <ArrowRight size={18} />
          </InternalLink>
        </section>
      </main>
      <Footer />
    </>
  );
}

function getNextProject(slug) {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}

function SectionHeading({ kicker, title, body, action }) {
  return (
    <div className="section-heading">
      <div>
        <p className="section-kicker">{kicker}</p>
        <h2>{title}</h2>
      </div>
      <div className="section-heading-side">
        <p>{body}</p>
        {action}
      </div>
    </div>
  );
}

function NotFound() {
  return (
    <>
      <Header />
      <main className="not-found">
        <p className="eyebrow">404 / No system at this address</p>
        <h1>This route does not contain a public system.</h1>
        <p>Reserved destinations are intentionally not exposed as empty pages.</p>
        <InternalLink to="/" className="button primary">Return home <ArrowRight size={16} /></InternalLink>
      </main>
      <Footer />
    </>
  );
}

function App() {
  const path = usePathname();

  if (path === '/' || path === '') return <Home />;
  if (path === '/work' || path === '/work/') return <WorkIndex />;

  if (path.startsWith('/work/')) {
    const slug = path.replace('/work/', '').replace(/\/$/, '');
    return <ProjectDetail project={projects.find((item) => item.slug === slug)} />;
  }

  return <NotFound />;
}

createRoot(document.getElementById('root')).render(<App />);
