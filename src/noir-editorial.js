const stablePortfolioAssets = {
  'Neural Breach': {
    image: 'https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/0beff80f-3170-458e-a8dd-ea488a799cad/id-preview-a7f6d6dc--31af633f-6c4a-4d7d-8063-7379e19b1a28.lovable.app-1781096955214.png',
    label: 'Interface capture',
  },
  'Ark of Bones': {
    image: 'https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/bca5fe87-6c61-476a-9f03-eadabc589b8f/id-preview-3dbc922a--120a0249-bb33-403e-bf0b-34ee753673b6.lovable.app-1780934722699.png',
    label: 'Interface capture',
  },
  'Oakland STREETS': {
    image: 'https://storage.googleapis.com/gpt-engineer-file-uploads/uNkkNpjJUzP0GB7fBdtYmwcmQB92/social-images/social-1772324998614-esnoc.webp',
    label: 'Published interface',
  },
  'Bay Evidence': {
    image: 'https://storage.googleapis.com/gpt-engineer-file-uploads/attachments/og-images/5907469f-9e23-47f1-a023-73517e0c8494',
    label: 'Published interface',
  },
  'Mystic Sage': {
    image: 'https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/c7b937f0-4510-41ce-816e-1e1520e26445/id-preview-306d24b1--57ea58e5-e244-4284-9af6-cad3a9b0b5b3.lovable.app-1777603668645.png',
    label: 'Published interface',
  },
};

const exactText = new Map([
  ['Independent systems company / Oakland', 'OAKLAND / SYSTEMS · RESEARCH · SOFTWARE'],
  ['View selected work', 'Work'],
  ['Start a project', 'Project intake'],
  ['Institutional shell. Distinct systems.', 'PUBLIC BUILD / 2026'],
  ['Six construction environments. One operating practice.', 'Operating areas.'],
  ['The categories are deliberately broad enough to support a research platform, a client portal, an AI workflow, a publishing system, or an experimental interface without pretending those things are the same product.', 'Digital systems, AI workflows, research infrastructure, automation, creative technology, and supporting infrastructure.'],
  ['Different problems should produce different interfaces.', 'Selected systems and interfaces.'],
  ['Saga retains a restrained institutional identity. The work is allowed to look, move, and behave according to the system it serves.', 'Interface captures, behaviors, and implementation notes from current projects.'],
  ['Useful material, released when there is something worth using.', 'Published resources.'],
  ['Reserved categories do not become navigation destinations until the underlying material exists.', 'Only material with a usable public artifact is listed here.'],
  ['Notes from systems being built, tested, and maintained.', 'Research and operating notes.'],
  ['Research and operational observations are published as records of practice, not as a feed that needs to be filled every day.', 'Notes from systems under active development or maintenance.'],
  ['Prompt-driven production should still leave a system you can inspect and edit.', 'Saga Vibes Studio'],
  ['The Studio is being designed around explicit project state, production roles, visual revision, repository handoff, and deployment—not one-shot page generation.', 'Project routing, production roles, repository handoff, and deployment controls.'],
  ['View the Studio architecture', 'Studio system notes'],
  ['Saga Systems is organized around systems, not personalities.', 'Company record.'],
  ['The company develops and maintains digital products, research infrastructure, applied AI workflows, automation, creative technology, and client systems. Public work is labeled by development state. Methods and constraints should remain visible where they materially affect the result.', 'Saga Systems develops digital products, research infrastructure, AI workflows, automation, and project-specific interfaces. Development state is shown where relevant.'],
  ['Bring the problem, the existing material, and the constraint.', 'Send the problem, existing material, constraints, and desired outcome.'],
  ['Systems in practice.', 'Selected work.'],
  ['Visual and technical evidence from production systems, pilots, prototypes, and maintained research environments.', 'Interface captures, implementation notes, and system architecture.'],
  ['Each project keeps its own visual language.', 'Status labels distinguish production, pilot, and prototype work.'],
  ['WHAT THIS DEMONSTRATES', 'SYSTEM NOTES'],
  ['Visual feature tour', 'Interface / feature notes'],
  ['What this demonstrates', 'System notes'],
  ['Built as a system, not a surface.', 'System architecture.'],
  ['The public interface is one layer. The operating model underneath defines what the system records, how state changes, how review happens, and where future components can attach.', 'The architecture list records the main operating layers behind the public interface.'],
  ['Discuss a related system', 'Project inquiry'],
  ['Continue through the portfolio.', 'Next system'],
  ['Full case study', 'System record'],
  ['Open case study', 'Open system record'],
]);

function replaceText(root = document) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = [];
  while (walker.nextNode()) nodes.push(walker.currentNode);

  nodes.forEach((node) => {
    const raw = node.nodeValue;
    const trimmed = raw?.trim();
    if (!trimmed || !exactText.has(trimmed)) return;
    const leading = raw.match(/^\s*/)?.[0] || '';
    const trailing = raw.match(/\s*$/)?.[0] || '';
    node.nodeValue = `${leading}${exactText.get(trimmed)}${trailing}`;
  });
}

function stabilizeEvidence(root = document) {
  root.querySelectorAll?.('.project-visual.has-interface-evidence').forEach((visual) => {
    const name = visual.querySelector('.visual-browser-bar small')?.textContent?.trim();
    const item = stablePortfolioAssets[name];
    const image = visual.querySelector('.portfolio-capture img');
    const label = visual.querySelector('.portfolio-capture figcaption span');

    if (item && image) {
      if (image.src !== item.image) image.src = item.image;
      image.referrerPolicy = 'no-referrer';
      image.loading = 'lazy';
      if (label) label.textContent = item.label;
      visual.dataset.assetSource = 'stable';
      return;
    }

    // Aethos currently has no durable public capture. Prefer the built logic view over a broken image.
    if (name === 'Aethos') {
      const stage = visual.querySelector('.visual-stage');
      stage?.classList.remove('evidence-capture-mode');
      stage?.classList.add('evidence-logic-mode');
      visual.querySelector('.portfolio-capture')?.setAttribute('hidden', '');
      visual.querySelectorAll('.evidence-mode').forEach((button) => button.setAttribute('hidden', ''));
      visual.dataset.assetSource = 'logic-only';
    }
  });
}

function simplifyEvidenceLabels(root = document) {
  root.querySelectorAll?.('.evidence-standard small').forEach((label) => {
    if (label.textContent?.trim() === 'EVIDENCE STANDARD') label.textContent = 'SOURCE NOTE';
  });
  root.querySelectorAll?.('.implementation-evidence small').forEach((label) => {
    if (label.textContent?.trim() === 'IMPLEMENTATION EVIDENCE') label.textContent = 'IMPLEMENTATION';
  });
}

function applyEditorialPass(root = document) {
  replaceText(root);
  stabilizeEvidence(root);
  simplifyEvidenceLabels(root);
}

applyEditorialPass();

const appRoot = document.querySelector('#root');
if (appRoot) {
  let queued = false;
  new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      applyEditorialPass(appRoot);
      queued = false;
    });
  }).observe(appRoot, { childList: true, subtree: true });
}