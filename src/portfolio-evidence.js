const evidence = {
  'Neural Breach': {
    image: 'https://screenshot2.lovable.dev/bbd76016-5d22-48aa-97fe-8c877bf35760/id-preview-c3acf23c--31af633f-6c4a-4d7d-8063-7379e19b1a28.lovable.app-1781113622182.png',
    live: 'https://neuralbreachbysaga.lovable.app',
    label: 'Published interface capture',
    note: 'The published Neural Breach build uses a full-screen opening transmission before the archive interface becomes available.',
  },
  'Ark of Bones': {
    image: 'https://screenshot2.lovable.dev/a7ea6945-c7d8-4e66-b520-4d0203f345a8/id-preview-10e1336e--120a0249-bb33-403e-bf0b-34ee753673b6.lovable.app-1782035296189.png',
    live: 'https://www.arkofbones.com/',
    label: 'Saga build capture',
    note: 'A live Saga-built Ark environment showing the visual system developed around premium domino culture and technology-enabled play.',
  },
  'Oakland STREETS': {
    image: 'https://screenshot2.lovable.dev/e39178bf-8b48-488b-b02d-10b54c3416f8/id-preview-6eba0f83--872ed083-87d1-474e-8326-0b4afac2e9d9.lovable.app-1786708450126.png',
    live: 'https://oaklandstreets.live/',
    label: 'Published interface capture',
    note: 'The maintained STREETS build presents field reporting, verification, corridor intelligence, and exportable civic evidence as one operating system.',
  },
  'Bay Evidence': {
    image: 'https://screenshot2.lovable.dev/9606be5a-c6f3-4436-b06d-e77b6ae92443/id-preview-ec371479--5afa63b7-dc49-40e9-a8e5-f2b67d1da1e9.lovable.app-1787061680171.png',
    live: 'https://bayevidence.com/',
    label: 'Maintained research interface',
    note: 'The Bay Evidence system organizes verified records, source classes, jurisdiction filters, evidence tiers, methodology, and research collections through an editorial research interface.',
  },
  Aethos: {
    image: 'https://screenshot2.lovable.dev/a58a2c68-9c43-48ac-8537-2ec01e4ac744/id-preview-5de14e9d--18d35eb2-99ac-4798-829f-294fb1deb83e.lovable.app-1782406733732.png',
    label: 'Prototype interface capture',
    note: 'The Aethos prototype separates Insight View from Engine View, preserving calculation state, confidence, disagreement, and reconciliation instead of presenting interpretation as unexplained output.',
  },
  'Mystic Sage': {
    image: 'https://screenshot2.lovable.dev/b45cbd59-65f6-4688-802a-88a952f9b950/id-preview-f11e1168--57ea58e5-e244-4284-9af6-cad3a9b0b5b3.lovable.app-1785294861221.png',
    label: 'Published knowledge system',
    note: 'Mystic Sage combines long-form study pages, workshop modules, downloadable workbooks, symbolic tools, archived publishing, and Aethos components inside one maintained knowledge environment.',
  },
};

function makeButton(label, mode, active) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = `evidence-mode${active ? ' is-active' : ''}`;
  button.dataset.mode = mode;
  button.textContent = label;
  button.setAttribute('aria-pressed', active ? 'true' : 'false');
  return button;
}

function enhanceVisual(visual) {
  if (visual.dataset.evidenceReady === 'true') return;

  const name = visual.querySelector('.visual-browser-bar small')?.textContent?.trim();
  const item = evidence[name];
  const stage = visual.querySelector('.visual-stage');
  if (!item || !stage) return;

  visual.dataset.evidenceReady = 'true';
  visual.classList.add('has-interface-evidence');
  stage.classList.add('evidence-capture-mode');

  const capture = document.createElement('figure');
  capture.className = 'portfolio-capture';

  const image = document.createElement('img');
  image.src = item.image;
  image.alt = `${name} interface capture`;
  image.loading = 'lazy';
  image.decoding = 'async';

  const caption = document.createElement('figcaption');
  const meta = document.createElement('span');
  meta.textContent = item.label;
  const note = document.createElement('p');
  note.textContent = item.note;
  caption.append(meta, note);
  capture.append(image, caption);
  stage.prepend(capture);

  const switcher = document.createElement('div');
  switcher.className = 'evidence-switch';
  switcher.setAttribute('aria-label', `${name} evidence view`);
  const captureButton = makeButton('Interface', 'capture', true);
  const logicButton = makeButton('System logic', 'logic', false);
  switcher.append(captureButton, logicButton);
  visual.append(switcher);

  const setMode = (mode) => {
    const captureMode = mode === 'capture';
    stage.classList.toggle('evidence-capture-mode', captureMode);
    stage.classList.toggle('evidence-logic-mode', !captureMode);
    captureButton.classList.toggle('is-active', captureMode);
    logicButton.classList.toggle('is-active', !captureMode);
    captureButton.setAttribute('aria-pressed', captureMode ? 'true' : 'false');
    logicButton.setAttribute('aria-pressed', captureMode ? 'false' : 'true');
  };

  captureButton.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    setMode('capture');
  });
  logicButton.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    setMode('logic');
  });
}

function addEvidenceStandard() {
  const workHero = document.querySelector('.work-hero');
  if (!workHero || workHero.querySelector('.portfolio-proof-standard')) return;

  const target = workHero.querySelector('aside') || workHero;
  const standard = document.createElement('div');
  standard.className = 'portfolio-proof-standard';
  standard.innerHTML = `
    <small>EVIDENCE STANDARD</small>
    <div><strong>Interface</strong><span>Capture from a maintained, published, or explicitly labeled prototype build.</span></div>
    <div><strong>System logic</strong><span>Explanatory reconstruction used to show architecture, interaction, or data behavior that a screenshot cannot show by itself.</span></div>
    <p>Development state remains visible throughout the portfolio.</p>
  `;
  target.append(standard);
}

function wireEvidence() {
  document.querySelectorAll('.project-visual').forEach(enhanceVisual);
  addEvidenceStandard();

  document.querySelectorAll('.project-showcase, .compact-project, .project-detail-hero').forEach((container) => {
    const title = container.querySelector('h1, h2, h3')?.textContent?.trim();
    const item = evidence[title];
    if (!item?.live) return;

    container.querySelectorAll('.text-action.secondary, .project-actions a').forEach((link) => {
      if (/view live|visit live project/i.test(link.textContent || '')) link.href = item.live;
    });
  });
}

wireEvidence();
const root = document.querySelector('#root');
if (root) {
  new MutationObserver(wireEvidence).observe(root, { childList: true, subtree: true });
}
