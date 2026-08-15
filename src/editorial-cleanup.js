const replacements = new Map([
  ['Analysis before consensus.', 'Research, analysis, and practical intelligence.'],
  ['Source-backed reporting and applied analysis on AI skills, agent systems, software shifts, security, technical economics, and consequential product news.', 'Long-form research, essays, technical analysis, AI developments, and concise observations on tools, markets, culture, technology, public systems, and business.'],
  ['Practical support with visible pricing.', 'Technical support, implementation, and recovery services.'],
  ['Digital builds with human review.', 'Websites, applications, and digital systems.'],
  ['A field library worth keeping.', 'Prompts, schemas, code patterns, and implementation notes.'],
  ['Four public lanes. One operating practice. Read the analysis, solve the technical problem, commission a digital build, or take a tested pattern directly into your own work.', 'Saga Solutions publishes research and analysis, provides technical services, builds websites and digital products, and maintains a practical library of code, prompts, schemas, and implementation patterns.'],
  ['Source discipline', 'Research + analysis'],
  ['Visible scope and pricing', 'Technology services'],
  ['Security boundaries named', 'Web + product development'],
  ['AI used as leverage, not authority', 'Code + implementation library'],
  ['Current signal', 'Featured'],
  ['Useful enough to act on. Specific enough to test.', 'Research and technical resources.'],
  ['Editorial work and technical patterns are linked intentionally: analysis should lead to implementation, and implementation should generate better questions.', 'Selected articles, analysis, implementation patterns, and technical resources from across Saga Solutions.'],
  ['Public properties, client work, and active builds.', 'Selected client work, public projects, and active builds.'],
  ['Status labels stay visible. Development work is not presented as finished work.', 'A mix of production systems, research platforms, editorial projects, and digital products.'],
  ['Capability map', 'Services'],
  ['Describe the problem. We identify the disciplines involved.', 'What does the project require?'],
  ['This finder does not pretend to quote a final scope. It helps reveal what the assignment actually touches before money is spent.', 'Search across research, web development, automation, civic systems, data, brand, and operations to identify the relevant service areas.'],
  ['AI skills, agent systems, software shifts, security, technical economics, and consequential news — published only when the material survives a verification and usefulness test.', 'Long-form research, essays, technical analysis, AI developments, and concise observations on tools, markets, culture, technology, public systems, and business. The format follows the subject.'],
  ['SAGA SIGNAL SCORE', 'EDITORIAL ASSESSMENT'],
  ['Trend-setting requires a standard, not volume.', 'How we evaluate developing topics.'],
  ['Each scored post is judged on novelty, evidence quality, operational consequence, and durable value. Material claims should be labeled internally as verified fact, inference, forecast, or unresolved.', 'For fast-moving subjects, we consider novelty, evidence quality, practical consequence, and likely staying power. The assessment supplements the reporting; it does not replace it.'],
  ['Technology support without mystery pricing.', 'Technical support, implementation, and recovery services.'],
  ['Direct help for software, accounts, devices, data recovery triage, security basics, migration, AI setup, and small-business operations. Scope boundaries are stated before work begins.', 'Support for software, devices, accounts, migrations, backups, data recovery triage, security basics, AI tools, and small-business technology operations.'],
  ['Pay for the problem being solved.', 'Service pricing'],
  ['AI-assisted. Human-reviewed. Business-ready.', 'Websites, applications, and digital systems.'],
  ['Saga Vibes is the digital build studio inside Saga Solutions: websites, landing pages, portals, intake systems, prototypes, and automation produced quickly without outsourcing judgment to the tools.', 'Saga Vibes handles strategy, design, implementation, QA, deployment, and handoff for founders, organizations, and independent projects. AI tools accelerate production where useful; Saga remains responsible for the work.'],
  ['Bring the idea. Leave with something inspectable.', 'Start with a project brief.'],
  ['Every engagement is defined by a written scope, explicit deliverables, and a review point before release.', 'Share the goal, current constraints, and what needs to be built. We translate it into scope, deliverables, and next steps.'],
  ['A curated field library, not a project graveyard.', 'Prompts, schemas, code patterns, and implementation notes.'],
  ['Every entry must state what it does, when to use it, why it matters, how it fails, what security assumptions it makes, and when it was last verified.', 'A maintained library of patterns with clear use cases, constraints, failure modes, security notes, and verification history.'],
  ['Turn the problem into a written scope.', 'Tell us what you need.'],
  ['This page is not in the current Saga index.', 'Page not found.'],
  ['Short notes on how this work actually goes.', 'Research, analysis, and practical intelligence.'],
  ['Operational writing rather than thought leadership. Published when there is something specific to say, which is not often.', 'Long-form research, essays, technical analysis, AI developments, and concise observations on tools, markets, culture, technology, public systems, and business. The format follows the subject.'],
  ['Start small or commission the full build.', 'Defined starting scopes.'],
  ['CORE ENTRY', 'STANDARD SCOPE'],
  ['A structured plan for turning an idea into a credible, buildable, monetizable project.', 'Research, scope, feature planning, implementation sequence, and a practical revenue or sustainability model where relevant.'],
  ['AI production speed', 'AI-assisted production'],
  ['The Saga Vibes advantage', 'Working method'],
]);

const cadenceCopy = 'This is a working notebook, not a content programme. There is no newsletter, no posting schedule, and no plan to manufacture one.';

function cleanText(text) {
  let next = replacements.get(text) || text;
  next = next
    .replace(/\s*·\s*\d+\s*min(?:ute)?s?(?:\s*read)?\b/gi, '')
    .replace(/^\d+\s*min(?:ute)?s?\s*read$/i, '')
    .replace(/^\d+\s*min\s*read$/i, '')
    .trim();
  return next;
}

function removeCadenceNotice(root) {
  for (const element of root.querySelectorAll?.('*') || []) {
    if (element.children.length === 0 && element.textContent?.trim() === cadenceCopy) {
      const notice = element.closest('[role="status"], .status-notice, .status-box, article, section, div');
      if (notice) notice.remove();
    }
    if (element.children.length === 0 && element.textContent?.trim().toUpperCase() === 'PUBLICATION CADENCE') {
      const notice = element.closest('[role="status"], .status-notice, .status-box, article, section, div');
      if (notice && notice.textContent?.includes('working notebook')) notice.remove();
    }
  }
}

function ensureStartupLab() {
  if (document.getElementById('startup-lab')) return;
  const commission = document.getElementById('start-project');
  if (!commission?.parentNode) return;

  const section = document.createElement('section');
  section.className = 'section startup-lab-section';
  section.id = 'startup-lab';
  section.setAttribute('aria-labelledby', 'startup-lab-title');
  section.innerHTML = `
    <div class="section-heading split-heading startup-lab-heading">
      <div>
        <p class="section-kicker">SAGA STARTUP LAB</p>
        <h2 id="startup-lab-title">Structure for ideas that are not ready for an agency or accelerator.</h2>
      </div>
      <p>For early-stage founders, independent professionals, local businesses, community projects, and creators who need the underlying project organized before they spend heavily on development or professional services.</p>
    </div>
    <div class="startup-lab-grid">
      <article>
        <span>01</span>
        <h3>Concept + scope</h3>
        <p>Problem definition, users, feature inventory, operating assumptions, business model, technical requirements, and a written build brief.</p>
      </article>
      <article>
        <span>02</span>
        <h3>Website + working materials</h3>
        <p>Website or launch surface, intake forms, project documents, diagrams, templates, analytics setup, and a practical handoff package.</p>
      </article>
      <article>
        <span>03</span>
        <h3>IP readiness</h3>
        <p>Invention inventory, development chronology, technical diagrams, prior-art research worksheet, public-disclosure log, and materials organized for review by a registered patent practitioner when appropriate.</p>
      </article>
      <article>
        <span>04</span>
        <h3>Operations + launch</h3>
        <p>Client or customer intake, basic CRM structure, estimates and scope templates, launch copy, content planning, and the first operating workflow.</p>
      </article>
    </div>
    <div class="startup-lab-note">
      <strong>Scope boundary</strong>
      <p>Saga Solutions can organize technical and business documentation and help research public patent records. Patentability opinions, claim drafting, prosecution, and legal representation should be handled by a registered patent attorney or patent agent.</p>
      <a href="#start-project" class="text-link">Discuss a project →</a>
    </div>
  `;
  commission.parentNode.insertBefore(section, commission);
}

function cleanNode(root = document.body) {
  if (!root) return;
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);
  for (const node of nodes) {
    const original = node.nodeValue || '';
    const trimmed = original.trim();
    if (!trimmed) continue;
    const cleaned = cleanText(trimmed);
    if (cleaned !== trimmed) {
      const leading = original.match(/^\s*/)?.[0] || '';
      const trailing = original.match(/\s*$/)?.[0] || '';
      node.nodeValue = `${leading}${cleaned}${trailing}`;
    }
  }
  removeCadenceNotice(root);
}

function start() {
  cleanNode();
  ensureStartupLab();
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.TEXT_NODE) {
          const original = node.nodeValue || '';
          const trimmed = original.trim();
          const cleaned = cleanText(trimmed);
          if (trimmed && cleaned !== trimmed) node.nodeValue = cleaned;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          cleanNode(node);
        }
      }
    }
    ensureStartupLab();
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', start, { once: true });
} else {
  start();
}
