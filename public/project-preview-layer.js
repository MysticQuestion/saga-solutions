(() => {
  const PROJECTS = {
    'Neural Breach': {
      key: 'neural-breach',
      label: 'Published interface capture',
      note: 'Opening transmission and archive interface from the Neural Breach build.',
    },
    'Ark of Bones': {
      key: 'ark-of-bones',
      label: 'Published interface capture',
      note: 'Ark of Bones commerce and cultural platform interface.',
    },
    'Oakland STREETS': {
      key: 'streets',
      label: 'Published interface capture',
      note: 'STREETS field reporting and civic intelligence interface.',
    },
    'Bay Evidence': {
      key: 'bay-evidence',
      label: 'Maintained interface capture',
      note: 'Bay Evidence research and source-provenance interface.',
    },
    Aethos: {
      key: 'aethos',
      label: 'Prototype interface capture',
      note: 'Aethos symbolic-intelligence demonstration interface.',
    },
    'Mystic Sage': {
      key: 'mystic-sage',
      label: 'Published interface capture',
      note: 'Mystic Sage publishing, workshop, and symbolic-tool environment.',
    },
    'Saga Vibes Studio': {
      key: 'saga-vibes',
      label: 'Studio build capture',
      note: 'A working Saga Vibes studio build used as visual evidence while the current orchestration layer develops.',
    },
  };

  function getProjectName(visual) {
    return visual.querySelector('.visual-browser-bar small')?.textContent?.trim() || '';
  }

  function makeCaption(item) {
    const caption = document.createElement('figcaption');
    const label = document.createElement('span');
    label.textContent = item.label;
    const note = document.createElement('p');
    note.textContent = item.note;
    caption.append(label, note);
    return caption;
  }

  function createCapture(name, item) {
    const figure = document.createElement('figure');
    figure.className = 'portfolio-capture saga-real-preview';

    const image = document.createElement('img');
    image.alt = `${name} website interface preview`;
    image.decoding = 'async';
    image.loading = 'lazy';
    image.src = `/api/project-preview?key=${encodeURIComponent(item.key)}`;

    const loading = document.createElement('div');
    loading.className = 'saga-preview-loading';
    loading.innerHTML = '<span>Loading project capture</span><i></i>';

    image.addEventListener('load', () => {
      figure.classList.add('is-loaded');
      loading.remove();
    }, { once: true });

    image.addEventListener('error', () => {
      figure.classList.add('has-error');
      loading.innerHTML = '<span>Capture unavailable — use the live project link</span>';
    }, { once: true });

    figure.append(loading, image, makeCaption(item));
    return figure;
  }

  function buildSwitcher(visual, stage) {
    const existing = visual.querySelector('.evidence-switch');
    if (existing) return existing;

    const switcher = document.createElement('div');
    switcher.className = 'evidence-switch';
    switcher.setAttribute('aria-label', 'Project evidence view');

    const screenshot = document.createElement('button');
    screenshot.type = 'button';
    screenshot.className = 'evidence-mode is-active';
    screenshot.textContent = 'Screenshot';
    screenshot.setAttribute('aria-pressed', 'true');

    const logic = document.createElement('button');
    logic.type = 'button';
    logic.className = 'evidence-mode';
    logic.textContent = 'System logic';
    logic.setAttribute('aria-pressed', 'false');

    const setMode = (mode) => {
      const captureMode = mode === 'capture';
      stage.classList.toggle('evidence-capture-mode', captureMode);
      stage.classList.toggle('evidence-logic-mode', !captureMode);
      screenshot.classList.toggle('is-active', captureMode);
      logic.classList.toggle('is-active', !captureMode);
      screenshot.setAttribute('aria-pressed', captureMode ? 'true' : 'false');
      logic.setAttribute('aria-pressed', captureMode ? 'false' : 'true');
    };

    screenshot.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      setMode('capture');
    });

    logic.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      setMode('logic');
    });

    switcher.append(screenshot, logic);
    visual.append(switcher);
    return switcher;
  }

  function forceCaptureMode(visual, stage) {
    stage.classList.add('evidence-capture-mode');
    stage.classList.remove('evidence-logic-mode');

    const switcher = visual.querySelector('.evidence-switch');
    if (!switcher) return;
    switcher.querySelectorAll('.evidence-mode').forEach((button, index) => {
      const active = index === 0;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', active ? 'true' : 'false');
      if (index === 0 && /interface/i.test(button.textContent || '')) button.textContent = 'Screenshot';
    });
  }

  function enhanceVisual(visual, priority = false) {
    const name = getProjectName(visual);
    const item = PROJECTS[name];
    const stage = visual.querySelector('.visual-stage');
    if (!item || !stage) return;

    visual.classList.add('has-interface-evidence', 'has-saga-real-preview');

    let capture = stage.querySelector('.portfolio-capture');
    if (!capture) {
      capture = createCapture(name, item);
      stage.prepend(capture);
    } else {
      capture.classList.add('saga-real-preview');
      const image = capture.querySelector('img');
      if (image) {
        image.src = `/api/project-preview?key=${encodeURIComponent(item.key)}`;
        image.alt = `${name} website interface preview`;
        image.decoding = 'async';
        image.loading = priority ? 'eager' : 'lazy';
        image.addEventListener('load', () => capture.classList.add('is-loaded'), { once: true });
      }

      const caption = capture.querySelector('figcaption');
      if (caption) {
        const label = caption.querySelector('span');
        const note = caption.querySelector('p');
        if (label) label.textContent = item.label;
        if (note) note.textContent = item.note;
      }
    }

    const image = capture.querySelector('img');
    if (image && priority) image.loading = 'eager';

    buildSwitcher(visual, stage);
    forceCaptureMode(visual, stage);
    visual.dataset.sagaRealPreview = 'true';
  }

  function installPreviewIntro() {
    const section = document.querySelector('.selected-work-section');
    if (!section || section.querySelector('.saga-preview-intro')) return;

    const grid = section.querySelector('.compact-work-grid');
    if (!grid) return;

    const note = document.createElement('div');
    note.className = 'saga-preview-intro';
    note.innerHTML = '<span>LIVE BUILD EVIDENCE</span><p>The images below are captures of working project interfaces, not generic mockups. Open a case study for implementation notes and system logic.</p>';
    grid.insertAdjacentElement('beforebegin', note);
  }

  function installWorkIntro() {
    const list = document.querySelector('.work-list');
    if (!list || list.querySelector(':scope > .saga-work-proof-note')) return;

    const note = document.createElement('div');
    note.className = 'saga-work-proof-note';
    note.innerHTML = '<span>VISUAL PORTFOLIO</span><strong>Actual interfaces first.</strong><p>Each project opens with a current build capture. The secondary view explains architecture or interaction that cannot be demonstrated in one screenshot.</p>';
    list.prepend(note);
  }

  function wire() {
    const visuals = [...document.querySelectorAll('.project-visual')];
    visuals.forEach((visual, index) => enhanceVisual(visual, index < 4));
    installPreviewIntro();
    installWorkIntro();
  }

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      wire();
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', schedule, { once: true });
  } else {
    schedule();
  }

  window.addEventListener('popstate', schedule);
  const root = document.querySelector('#root');
  if (root) new MutationObserver(schedule).observe(root, { childList: true, subtree: true });
})();
