import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight,
  BookOpen,
  Bot,
  BrainCircuit,
  CheckCircle2,
  Code2,
  Database,
  ExternalLink,
  FileText,
  Globe2,
  KeyRound,
  Landmark,
  Layers3,
  Lock,
  Radio,
  Rocket,
  Sparkles,
  Store,
  TerminalSquare,
  Workflow,
  Search,
  Server,
  ShieldCheck,
} from 'lucide-react';

const links = {
  sagaVibesLive: 'https://saga-vibe-studio.lovable.app/',
  githubRepo: 'https://github.com/MysticQuestion/saga-solutions',
  githubCodespaces: 'https://github.com/codespaces/new?hide_repo_select=true&ref=main&repo=1259516437',
  questlyne: 'https://thequestlyne.blogspot.com/',
};

const sagaVibesSystemPrompt = `You are Codex operating inside the GitHub Codespaces workspace for the Saga Vibes application. Build Saga Vibes as a production-grade AI app-construction operating system: a web app that lets a user describe an idea, select a project type, generate a runnable repository, edit files with AI assistance, preview the app, manage tasks, connect GitHub, and prepare deployment.

Primary objective:
Create a working full-stack app that feels like a serious alternative to Lovable, Bolt, Replit Agent, v0, and other vibe-coding interfaces, but with a stronger operating model: project memory, requirements discipline, security checks, reproducible builds, and transparent execution logs.

Non-negotiable result:
The repository must run locally in Codespaces with:
- npm install
- npm run dev
- npm run build
- npm run test when tests are present

Recommended stack:
- Next.js App Router with TypeScript
- Tailwind CSS
- shadcn/ui or an equivalent accessible component system
- Supabase/Postgres for persistence, with local fallback mocks when Supabase variables are absent
- Auth-ready architecture, even if local dev uses a demo user
- OpenAI-compatible provider abstraction, supporting OPENAI_API_KEY when available and a deterministic mock agent when absent
- GitHub integration boundary with a service layer and mocked local adapter when credentials are absent
- Optional sandbox execution adapter for E2B, Docker, or local child-process execution, but never execute untrusted code without explicit isolation

Core modules to implement:
1. Studio Dashboard
   - Project list
   - New project wizard
   - Recent activity
   - Build health cards
   - Prompt library entry points

2. New Project Wizard
   - Input: project name, one-sentence idea, target users, app type, required features, data sources, integrations, tone/design direction, deployment target
   - Output: structured project brief, file plan, route plan, data model, test plan, risks, first sprint backlog
   - Save generated brief as a project artifact

3. AI Build Console
   - Chat interface with system, user, assistant, and tool-event messages
   - Agent modes: Architect, Builder, Debugger, Refactorer, Security Reviewer, Product Strategist
   - Every response must produce either a plan, patch, test result, question, or documented decision
   - Include a visible execution ledger: what changed, why, what still needs attention

4. Repository Workspace
   - File tree
   - Code editor area
   - Diff viewer
   - Patch apply/reject controls
   - Commit message generator
   - Branch naming helper
   - README and environment variable inspector

5. Live Preview
   - Preview panel with loading/error states
   - Route shortcuts
   - Responsive viewport presets
   - Console/error display
   - Build status

6. Deployment Desk
   - Deployment checklist
   - Environment variable checklist
   - GitHub push instructions
   - Vercel/Netlify/Railway deployment notes
   - Domain and SEO readiness checklist
   - Rollback notes

7. Prompt Library
   - Codex-ready prompts for creating apps, debugging, adding auth, adding payments, adding dashboards, scraping/importing public data, writing tests, and creating documentation
   - Each prompt has title, use case, required inputs, full prompt body, and copy button

8. System Memory
   - Store project briefs, decisions, tasks, file changes, deployment notes, and unresolved risks
   - Create a “project constitution” per app: purpose, users, design law, forbidden assumptions, security posture, revenue model, and success metrics

9. Governance and Safety Layer
   - Never claim a build passed unless tests actually ran
   - Never invent credentials, API keys, private URLs, or successful deployments
   - Mark missing integrations as pending
   - Add dependency/license checks
   - Add security checklist for auth, secrets, user data, API routes, prompt injection, rate limits, and server-side execution

10. Saga Solutions Integration
   - Include navigation links back to Saga Solutions, Questlyne Blog, Citizens Transparency Institute, Neural Breach/Mad Evil Genius, and the live Saga Vibes reference URL
   - Build a public-facing landing page and a logged-in studio shell

Data model:
Create TypeScript interfaces and, if using Supabase, SQL migrations for:
- users
- projects
- project_briefs
- conversations
- messages
- artifacts
- tasks
- builds
- deployments
- prompt_templates
- decisions
- integrations

Minimum screens/routes:
- /
- /studio
- /studio/new
- /studio/projects/[projectId]
- /studio/projects/[projectId]/files
- /studio/projects/[projectId]/preview
- /studio/projects/[projectId]/deploy
- /prompts
- /docs
- /settings

Implementation discipline:
- Build in vertical slices, not empty placeholder pages.
- Use meaningful mock data only where real credentials are absent.
- Keep all buttons, forms, and navigation functional.
- Add loading, empty, error, and success states.
- Add tests for utilities, data transforms, prompt generation, and project creation logic.
- Add a seed script for demo projects.
- Add clear README instructions for Codespaces, local dev, environment variables, and deployment.
- Add .env.example.
- Add a CHANGELOG.md.
- Add a docs/ARCHITECTURE.md explaining the agent loop, data model, integrations, and security limits.

Design direction:
The visual language should feel like a sovereign creative lab: cinematic, dark, luminous, editorial, operationally serious. Avoid toy-like dashboards. Use strong hierarchy, exact labels, readable typography, status panels, command surfaces, and crisp cards. The app should feel powerful enough for entrepreneurs, journalists, policy researchers, creators, civic technologists, and small-business operators.

Acceptance criteria:
- npm run build passes.
- All routes render.
- Navigation has no dead buttons.
- New project wizard saves a project brief locally or in Supabase.
- Prompt library copy buttons work.
- AI console works with a mock provider when no API key exists and switches to a real provider when configured.
- README explains setup clearly.
- The app makes missing integrations visible instead of pretending they work.
- The resulting codebase is clean enough for GitHub, Codespaces, and deployment.`;

const initiatives = [
  {
    title: 'Saga Vibes',
    kicker: 'AI build studio',
    body:
      'A creative operating system for turning ideas into structured briefs, working repositories, previews, deployments, and project memory.',
    icon: Sparkles,
    href: '#saga-vibes',
    action: 'Open Saga Vibes page',
  },
  {
    title: 'The Questlyne Blog',
    kicker: 'Original essay archive',
    body:
      'A minimal literary archive linked to the wider Saga Solutions system, built for essays, spiritual analysis, journalism, and durable authorship.',
    icon: BookOpen,
    href: links.questlyne,
    action: 'Visit Questlyne',
    external: true,
  },
  {
    title: 'Citizens Transparency Institute',
    kicker: 'Public-interest research desk',
    body:
      'A civic resource hub for records requests, budgets, public health data, food systems, corporate accountability, and government transparency.',
    icon: Landmark,
    href: '#transparency-institute',
    action: 'Open resources',
  },
  {
    title: 'Neural Breach / Mad Evil Genius',
    kicker: 'Commerce and storyworld node',
    body:
      'A cyberpunk commerce surface for Neural Breach, preserving the existing shop concept while routing it into the broader Saga ecosystem.',
    icon: Store,
    href: '#neural-breach-shop',
    action: 'View shop node',
  },
];

const vibeCapabilities = [
  {
    title: 'Prompt-to-App Studio',
    body: 'Convert rough ideas into app briefs, route maps, component plans, database schemas, and first-sprint task lists.',
    icon: BrainCircuit,
    href: '#working-system',
  },
  {
    title: 'Repository Control Tower',
    body: 'Inspect files, review proposed patches, generate commits, track decisions, and keep the build history intelligible.',
    icon: Code2,
    href: '#repo-workspace',
  },
  {
    title: 'AI Orchestration Layer',
    body: 'Run architect, builder, debugger, refactorer, security, and product strategy modes with a visible work ledger.',
    icon: Bot,
    href: '#agent-loop',
  },
  {
    title: 'Preview and Deployment Desk',
    body: 'Move from prototype to deployable app with checks for routes, environment variables, security, domains, and rollback.',
    icon: Rocket,
    href: '#deployment-desk',
  },
];

const systemModules = [
  {
    id: 'studio-dashboard',
    title: 'Studio Dashboard',
    icon: Layers3,
    body: 'Project inventory, recent activity, build health, prompt library entry points, and clear next actions.',
  },
  {
    id: 'intake-queue',
    title: 'New Project Wizard',
    icon: FileText,
    body: 'Collects idea, users, features, data needs, integrations, design direction, success metrics, and deployment target.',
  },
  {
    id: 'agent-loop',
    title: 'AI Build Console',
    icon: TerminalSquare,
    body: 'Chat plus execution ledger. Every agent answer must produce a plan, patch, test result, question, or documented decision.',
  },
  {
    id: 'repo-workspace',
    title: 'Repository Workspace',
    icon: Workflow,
    body: 'File tree, editor, diff viewer, patch controls, branch helper, commit message generator, and README inspector.',
  },
  {
    id: 'deployment-desk',
    title: 'Deployment Desk',
    icon: Server,
    body: 'Environment checklist, deploy readiness, GitHub push notes, Vercel/Railway/Netlify notes, domain checks, and rollback notes.',
  },
  {
    id: 'governance-layer',
    title: 'Governance Layer',
    icon: ShieldCheck,
    body: 'No false success claims, no invented keys, no fake deployments, explicit risk register, and security review surfaces.',
  },
];

const resourceLinks = [
  {
    label: 'Saga Vibes live reference',
    href: links.sagaVibesLive,
    icon: Globe2,
    type: 'External',
  },
  {
    label: 'GitHub repository',
    href: links.githubRepo,
    icon: Code2,
    type: 'Repo',
  },
  {
    label: 'Open in GitHub Codespaces',
    href: links.githubCodespaces,
    icon: TerminalSquare,
    type: 'Build',
  },
  {
    label: 'Questlyne Blog',
    href: links.questlyne,
    icon: BookOpen,
    type: 'Archive',
  },
];

const transparencyResources = [
  'Public records request strategy and request logs',
  'Budget, contract, and tax-spending research workflows',
  'Food, medicine, housing, policing, and infrastructure accountability links',
  'NextRequest-style civic request platform directory',
  'Downloadable request templates and evidence checklists',
  'Corporate ownership, lobbying, procurement, and campaign finance research notes',
];

const shopProducts = [
  {
    title: 'Neural Circuit Cargo Joggers',
    price: '$78',
    body: 'Technical black cargo joggers with circuit panel language and utility-pocket silhouette.',
  },
  {
    title: 'Crowned Circuit Crewneck',
    price: '$82',
    body: 'Oversized crewneck built around the crowned-brain mark and neon circuit language.',
  },
  {
    title: 'Blacksite Tactical Jacket',
    price: '$148',
    body: 'Premium outerwear concept with modular patch logic and cyber-field styling.',
  },
];

function ExternalAwareLink({ href, children, className = '', external = false, onClick }) {
  const isExternal = external || href?.startsWith('http');
  return (
    <a
      href={href}
      className={className}
      onClick={onClick}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
    >
      {children}
      {isExternal ? <ExternalLink size={15} aria-hidden="true" /> : null}
    </a>
  );
}

function App() {
  const [copyStatus, setCopyStatus] = useState('');
  const promptStats = useMemo(() => {
    const words = sagaVibesSystemPrompt.trim().split(/\s+/).length;
    return { words, characters: sagaVibesSystemPrompt.length };
  }, []);

  const copyPrompt = async () => {
    try {
      await navigator.clipboard.writeText(sagaVibesSystemPrompt);
      setCopyStatus('Codex prompt copied. Paste it into Codex inside GitHub Codespaces.');
    } catch {
      setCopyStatus('Copy blocked by browser permissions. Select the prompt text manually.');
    }
  };

  return (
    <main className="app-shell">
      <style>{styleText}</style>

      <section className="hero" id="top">
        <nav className="nav" aria-label="Primary navigation">
          <a href="#top" className="brandmark" aria-label="Saga Solutions home">
            <span className="brand-sigil">SV</span>
            <span>
              <strong>Saga Solutions</strong>
              <small>Saga Vibes system gateway</small>
            </span>
          </a>
          <div className="nav-links">
            <a href="#saga-vibes">Saga Vibes</a>
            <a href="#working-system">System</a>
            <a href="#transparency-institute">Transparency</a>
            <a href="#codex-prompt">Codex Prompt</a>
            <a href="#links">Links</a>
          </div>
        </nav>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">Saga Solutions / AI systems / civic creative infrastructure</p>
            <h1>Build the studio that builds the work.</h1>
            <p className="lede">
              Saga Solutions now routes cleanly into Saga Vibes: a working-system blueprint for turning creative,
              civic, journalistic, entrepreneurial, and technical ideas into structured software projects.
            </p>
            <div className="hero-actions">
              <ExternalAwareLink href="#saga-vibes" className="button primary">
                Open Saga Vibes <ArrowRight size={18} />
              </ExternalAwareLink>
              <ExternalAwareLink href={links.sagaVibesLive} className="button ghost">
                Live Saga Vibes reference
              </ExternalAwareLink>
              <ExternalAwareLink href="#codex-prompt" className="button ghost">
                Use Codex build prompt
              </ExternalAwareLink>
            </div>
          </div>

          <aside className="terminal-card" aria-label="Saga Vibes status panel">
            <div className="terminal-header">
              <span />
              <span />
              <span />
            </div>
            <p className="terminal-line">node://saga-solutions/saga-vibes</p>
            <p className="terminal-line green">STATUS: PAGE LINKED</p>
            <p className="terminal-line">BUTTON AUDIT: ROUTED</p>
            <p className="terminal-line">PROMPT: CODEX READY</p>
            <div className="scan-panel">
              {[
                ['Briefs', FileText],
                ['Builds', Code2],
                ['Preview', Radio],
                ['Deploy', Rocket],
              ].map(([label, Icon]) => (
                <a href="#working-system" className="scan-cell" key={label}>
                  <Icon size={22} />
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </aside>
        </div>
      </section>

      <section className="initiative-section" id="links">
        <div className="section-heading">
          <p className="eyebrow">Connected properties</p>
          <h2>Every major Saga Solutions button now has a destination.</h2>
          <p>
            Internal links move through this page. External links open the live reference, GitHub repository,
            Codespaces entry point, or original blog archive.
          </p>
        </div>

        <div className="initiative-grid">
          {initiatives.map((item) => {
            const Icon = item.icon;
            return (
              <article className="initiative-card" key={item.title}>
                <div className="card-icon">
                  <Icon size={24} />
                </div>
                <p className="kicker">{item.kicker}</p>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
                <ExternalAwareLink href={item.href} external={item.external} className="text-link">
                  {item.action}
                </ExternalAwareLink>
              </article>
            );
          })}
        </div>
      </section>

      <section className="saga-vibes-section" id="saga-vibes">
        <div className="section-heading wide">
          <p className="eyebrow">Saga Vibes</p>
          <h2>The creative build studio becomes an operating system.</h2>
          <p>
            The public page should not stop at inspiration. Saga Vibes needs to become the command surface
            where projects are defined, generated, audited, previewed, committed, documented, and shipped.
          </p>
        </div>

        <div className="hero-actions compact">
          <ExternalAwareLink href={links.sagaVibesLive} className="button primary">
            Open live Saga Vibes
          </ExternalAwareLink>
          <ExternalAwareLink href="#working-system" className="button ghost">
            View system blueprint
          </ExternalAwareLink>
          <ExternalAwareLink href="#codex-prompt" className="button ghost">
            Open Codex prompt
          </ExternalAwareLink>
          <ExternalAwareLink href="#intake-queue" className="button ghost">
            Start with intake
          </ExternalAwareLink>
        </div>

        <div className="capability-grid">
          {vibeCapabilities.map((item) => {
            const Icon = item.icon;
            return (
              <a href={item.href} className="capability-card" key={item.title}>
                <Icon size={25} />
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </a>
            );
          })}
        </div>
      </section>

      <section className="system-section" id="working-system">
        <div className="section-heading">
          <p className="eyebrow">Working-system architecture</p>
          <h2>From attractive landing page to real build platform.</h2>
          <p>
            The first production target is a full-stack studio shell: project intake, AI console, repository
            workspace, prompt library, preview desk, deployment desk, and governance layer.
          </p>
        </div>

        <div className="module-grid">
          {systemModules.map((module) => {
            const Icon = module.icon;
            return (
              <article className="module-card" id={module.id} key={module.title}>
                <Icon size={24} />
                <h3>{module.title}</h3>
                <p>{module.body}</p>
                <a href="#codex-prompt" className="text-link">Build this module</a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="codex-section" id="codex-prompt">
        <div className="prompt-shell">
          <div>
            <p className="eyebrow">Codex master prompt</p>
            <h2>Paste this into Codex inside GitHub Codespaces.</h2>
            <p>
              This prompt directs Codex to build Saga Vibes as a full-stack app-construction system with
              mocked fallbacks, clear missing-integration states, project memory, and deployment discipline.
            </p>
            <div className="prompt-meta">
              <span><CheckCircle2 size={16} /> {promptStats.words} words</span>
              <span><Lock size={16} /> No invented credentials</span>
              <span><Database size={16} /> Supabase-ready</span>
            </div>
            <button type="button" className="button primary" onClick={copyPrompt}>
              Copy complete prompt
            </button>
            {copyStatus ? <p className="status-line">{copyStatus}</p> : null}
          </div>
          <textarea
            aria-label="Saga Vibes complete Codex prompt"
            value={sagaVibesSystemPrompt}
            readOnly
          />
        </div>
      </section>

      <section className="transparency-section" id="transparency-institute">
        <div className="section-heading">
          <p className="eyebrow">Citizens Transparency Institute</p>
          <h2>A civic research desk inside the Saga Solutions ecosystem.</h2>
          <p>
            This page is routed as a working resource hub, ready for records-request guides, government-data
            tools, budget research, corporate accountability, and downloadable civic templates.
          </p>
        </div>

        <div className="resource-list">
          {transparencyResources.map((resource) => (
            <a href="#codex-prompt" className="resource-row" key={resource}>
              <Search size={18} />
              <span>{resource}</span>
              <ArrowRight size={16} />
            </a>
          ))}
        </div>
      </section>

      <section className="shop-section" id="neural-breach-shop">
        <div className="section-heading">
          <p className="eyebrow">Neural Breach commerce node</p>
          <h2>Mad Evil Genius remains linked as a commerce surface.</h2>
          <p>
            The shop concept is preserved as a routable section. Product buttons now lead to a live cart
            placeholder instead of disappearing into dead interface space.
          </p>
        </div>

        <div className="shop-grid">
          {shopProducts.map((product) => (
            <article className="shop-card" key={product.title}>
              <div className="product-art">
                <Store size={28} />
              </div>
              <h3>{product.title}</h3>
              <p>{product.body}</p>
              <div className="product-line">
                <strong>{product.price}</strong>
                <a href="#shop-cart" className="button small">Add to staged cart</a>
              </div>
            </article>
          ))}
        </div>

        <div className="cart-note" id="shop-cart">
          <ShoppingStatus />
        </div>
      </section>

      <section className="link-section">
        <div className="section-heading">
          <p className="eyebrow">Button destination audit</p>
          <h2>Primary action map</h2>
        </div>
        <div className="link-grid">
          {resourceLinks.map((resource) => {
            const Icon = resource.icon;
            return (
              <ExternalAwareLink href={resource.href} className="link-card" key={resource.label}>
                <Icon size={22} />
                <span>
                  <strong>{resource.label}</strong>
                  <small>{resource.type}</small>
                </span>
              </ExternalAwareLink>
            );
          })}
        </div>
      </section>

      <footer className="footer">
        <a href="#top">Saga Solutions</a>
        <a href="#saga-vibes">Saga Vibes</a>
        <a href={links.questlyne} target="_blank" rel="noreferrer">Questlyne Blog</a>
        <a href="#transparency-institute">Citizens Transparency Institute</a>
        <a href="#codex-prompt">Codex Prompt</a>
      </footer>
    </main>
  );
}

function ShoppingStatus() {
  const [status, setStatus] = useState('No staged product selected yet.');
  return (
    <div>
      <p>{status}</p>
      <button
        type="button"
        className="button primary"
        onClick={() =>
          setStatus(
            'Cart staging is working. Add Shopify product variant IDs and Storefront API variables when the shop is ready for transactions.'
          )
        }
      >
        Test checkout path <KeyRound size={16} />
      </button>
    </div>
  );
}

const styleText = `
:root {
  color-scheme: dark;
  --bg: #03030a;
  --panel: rgba(17, 19, 33, 0.84);
  --panel-strong: rgba(23, 26, 45, 0.94);
  --text: #f7f3ea;
  --muted: #aeb5ca;
  --line: rgba(160, 132, 255, 0.22);
  --violet: #a88cff;
  --cyan: #7cf7ff;
  --rose: #ff5c9a;
  --gold: #f7d774;
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
  background: var(--bg);
}

body {
  margin: 0;
  background:
    radial-gradient(circle at 18% 0%, rgba(168, 140, 255, 0.28), transparent 28%),
    radial-gradient(circle at 88% 18%, rgba(124, 247, 255, 0.16), transparent 26%),
    linear-gradient(135deg, #03030a 0%, #080713 52%, #110817 100%);
  color: var(--text);
}

a {
  color: inherit;
  text-decoration: none;
}

button,
textarea {
  font: inherit;
}

.app-shell {
  min-height: 100vh;
  overflow: hidden;
}

.hero {
  min-height: 92vh;
  padding: 28px clamp(18px, 4vw, 64px) 70px;
  position: relative;
}

.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(168, 140, 255, 0.045) 1px, transparent 1px),
    linear-gradient(90deg, rgba(124, 247, 255, 0.035) 1px, transparent 1px);
  background-size: 46px 46px;
  -webkit-mask-image: linear-gradient(to bottom, #000 0%, transparent 90%);
  mask-image: linear-gradient(to bottom, #000 0%, transparent 90%);
  pointer-events: none;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 22px;
  position: relative;
  z-index: 2;
}

.brandmark {
  display: flex;
  align-items: center;
  gap: 13px;
}

.brand-sigil {
  width: 52px;
  height: 52px;
  display: grid;
  place-items: center;
  border: 1px solid var(--line);
  border-radius: 16px;
  background: linear-gradient(145deg, rgba(168, 140, 255, 0.26), rgba(124, 247, 255, 0.12));
  color: var(--cyan);
  font-weight: 950;
  letter-spacing: -0.04em;
}

.brandmark strong,
.brandmark small {
  display: block;
}

.brandmark small,
.nav-links,
.section-heading p,
.initiative-card p,
.capability-card p,
.module-card p,
.shop-card p {
  color: var(--muted);
}

.nav-links {
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  font-size: 0.92rem;
}

.nav-links a:hover,
.text-link:hover,
.footer a:hover {
  color: var(--cyan);
}

.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.64fr);
  gap: 42px;
  align-items: center;
  max-width: 1220px;
  margin: 96px auto 0;
  position: relative;
  z-index: 1;
}

.eyebrow,
.kicker {
  color: var(--cyan);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-size: 0.75rem;
  font-weight: 900;
}

.hero h1,
.section-heading h2,
.prompt-shell h2 {
  letter-spacing: -0.07em;
}

.hero h1 {
  font-size: clamp(3.2rem, 8vw, 7.4rem);
  line-height: 0.88;
  margin: 16px 0 22px;
  max-width: 880px;
}

.lede {
  font-size: clamp(1.02rem, 2.2vw, 1.28rem);
  line-height: 1.72;
  color: #d7d9e8;
  max-width: 760px;
}

.hero-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 32px;
}

.hero-actions.compact {
  margin: 8px 0 34px;
}

.button {
  border: 1px solid var(--line);
  background: rgba(255, 255, 255, 0.055);
  color: var(--text);
  border-radius: 999px;
  padding: 13px 18px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  cursor: pointer;
  transition: 0.2s ease;
  min-height: 46px;
}

.button:hover,
.capability-card:hover,
.initiative-card:hover,
.module-card:hover,
.link-card:hover,
.resource-row:hover,
.shop-card:hover {
  transform: translateY(-2px);
  border-color: rgba(124, 247, 255, 0.54);
}

.button.primary {
  border: 0;
  background: linear-gradient(135deg, var(--violet), var(--cyan));
  color: #03030a;
  font-weight: 950;
}

.button.ghost {
  background: rgba(255, 255, 255, 0.04);
}

.button.small {
  min-height: 38px;
  padding: 9px 12px;
  font-size: 0.85rem;
}

.terminal-card,
.initiative-card,
.capability-card,
.module-card,
.shop-card,
.link-card,
.prompt-shell,
.cart-note {
  border: 1px solid var(--line);
  background: linear-gradient(180deg, rgba(23, 26, 45, 0.9), rgba(8, 9, 18, 0.92));
  box-shadow: 0 24px 90px rgba(0, 0, 0, 0.24);
}

.terminal-card {
  border-radius: 30px;
  padding: 24px;
}

.terminal-header {
  display: flex;
  gap: 8px;
  margin-bottom: 20px;
}

.terminal-header span {
  width: 10px;
  height: 10px;
  border-radius: 99px;
  background: var(--muted);
}

.terminal-line {
  font-family: 'Courier New', monospace;
  color: #cfd5ed;
  margin: 10px 0;
}

.terminal-line.green {
  color: var(--cyan);
}

.scan-panel {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
  margin-top: 24px;
}

.scan-cell {
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 16px;
  background: rgba(168, 140, 255, 0.06);
  color: var(--cyan);
  display: grid;
  gap: 12px;
}

.scan-cell span {
  color: #e2e7fb;
  font-size: 0.88rem;
}

.initiative-section,
.saga-vibes-section,
.system-section,
.codex-section,
.transparency-section,
.shop-section,
.link-section {
  padding: 76px clamp(18px, 4vw, 64px);
  max-width: 1280px;
  margin: 0 auto;
}

.section-heading {
  max-width: 790px;
  margin-bottom: 30px;
}

.section-heading.wide {
  max-width: 940px;
}

.section-heading h2,
.prompt-shell h2 {
  font-size: clamp(2.1rem, 4.6vw, 4.4rem);
  line-height: 0.95;
  margin: 10px 0 16px;
}

.section-heading p {
  line-height: 1.72;
}

.initiative-grid,
.capability-grid,
.module-grid,
.shop-grid,
.link-grid {
  display: grid;
  gap: 18px;
}

.initiative-grid {
  grid-template-columns: repeat(4, minmax(0, 1fr));
}

.capability-grid,
.module-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

.shop-grid,
.link-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}

.initiative-card,
.capability-card,
.module-card,
.shop-card,
.link-card {
  border-radius: 26px;
  padding: 22px;
  transition: 0.2s ease;
}

.card-icon {
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 16px;
  background: rgba(124, 247, 255, 0.09);
  color: var(--cyan);
  margin-bottom: 22px;
}

.initiative-card h3,
.capability-card h3,
.module-card h3,
.shop-card h3 {
  font-size: 1.18rem;
  margin: 12px 0 10px;
}

.text-link {
  color: var(--cyan);
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-top: 14px;
  font-weight: 800;
}

.saga-vibes-section {
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
}

.capability-card svg,
.module-card svg,
.link-card svg {
  color: var(--cyan);
}

.prompt-shell {
  border-radius: 30px;
  padding: clamp(20px, 4vw, 34px);
  display: grid;
  grid-template-columns: minmax(0, 0.76fr) minmax(320px, 1fr);
  gap: 26px;
  align-items: stretch;
}

.prompt-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 20px 0;
}

.prompt-meta span {
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 9px 12px;
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: #dfe5fb;
  background: rgba(255, 255, 255, 0.04);
  font-size: 0.88rem;
}

textarea {
  min-height: 560px;
  width: 100%;
  resize: vertical;
  border-radius: 22px;
  border: 1px solid var(--line);
  background: rgba(3, 3, 10, 0.8);
  color: #eef2ff;
  padding: 18px;
  line-height: 1.55;
  font-size: 0.92rem;
}

.status-line {
  color: var(--gold);
  margin-top: 14px;
  line-height: 1.5;
}

.resource-list {
  display: grid;
  gap: 10px;
}

.resource-row {
  border: 1px solid var(--line);
  border-radius: 18px;
  padding: 15px 16px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 12px;
  align-items: center;
  background: rgba(255, 255, 255, 0.035);
  transition: 0.2s ease;
}

.product-art {
  min-height: 150px;
  border-radius: 20px;
  display: grid;
  place-items: center;
  color: var(--cyan);
  background:
    radial-gradient(circle at 50% 42%, rgba(124, 247, 255, 0.28), transparent 32%),
    linear-gradient(145deg, #050510, #151629);
  margin-bottom: 18px;
}

.product-line {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 18px;
}

.cart-note {
  margin-top: 18px;
  border-radius: 22px;
  padding: 20px;
}

.link-card {
  display: flex;
  align-items: center;
  gap: 14px;
}

.link-card small {
  display: block;
  color: var(--muted);
}

.footer {
  border-top: 1px solid var(--line);
  padding: 30px clamp(18px, 4vw, 64px);
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 18px;
  color: var(--muted);
  background: rgba(0, 0, 0, 0.26);
}

@media (max-width: 980px) {
  .hero-grid,
  .prompt-shell,
  .initiative-grid,
  .capability-grid,
  .module-grid,
  .shop-grid,
  .link-grid {
    grid-template-columns: 1fr;
  }

  .nav {
    align-items: flex-start;
    flex-direction: column;
  }

  .hero {
    min-height: auto;
  }
}

@media (max-width: 640px) {
  .hero h1 {
    font-size: 3.3rem;
  }

  .scan-panel {
    grid-template-columns: 1fr;
  }

  .button {
    width: 100%;
  }

  .hero-actions {
    width: 100%;
  }
}
`;

createRoot(document.getElementById('root')).render(<App />);
