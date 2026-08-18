(() => {
  const stages = [
    ['Frame', 'Define the problem, owner, constraints, evidence standard, and what a useful result must actually do.'],
    ['Investigate', 'Inspect existing material, workflows, data, risks, dependencies, and unanswered questions before choosing a build.'],
    ['Architect', 'Set the information model, interface structure, integrations, permissions, review gates, and operating boundaries.'],
    ['Build', 'Implement the working system: interface, automation, data layer, agents, publishing flow, or infrastructure required.'],
    ['Verify', 'Test the system against the stated constraint: accessibility, provenance, privacy, failure modes, edge cases, and human review.'],
    ['Operate', 'Deploy, document, maintain, monitor, revise, and preserve enough system state for the work to remain usable after launch.'],
  ];

  function replaceFirstTextNode(element, value) {
    if (!element) return;
    const textNode = [...element.childNodes].find((node) => node.nodeType === Node.TEXT_NODE);
    if (textNode) textNode.nodeValue = `${value} `;
  }

  function installEngagements(heroCopy) {
    if (!heroCopy || heroCopy.querySelector('.hero-engagements')) return;
    const lede = heroCopy.querySelector('.hero-lede');
    if (!lede) return;

    const wrap = document.createElement('div');
    wrap.className = 'hero-engagements';
    wrap.setAttribute('aria-label', 'Common Saga Systems engagement types');
    [
      ['Private AI systems', 'Local or controlled AI workflows, retrieval, agents, and document intelligence.'],
      ['Research platforms', 'Evidence repositories, source provenance, publishing systems, and maintained knowledge infrastructure.'],
      ['Civic + data systems', 'Field intelligence, public records, maps, verification workflows, and accountable reporting.'],
      ['Operational automation', 'APIs, CRM flows, intake, notifications, scheduled intelligence, and internal operating tools.'],
    ].forEach(([title, detail]) => {
      const item = document.createElement('div');
      item.innerHTML = `<strong>${title}</strong><span>${detail}</span>`;
      wrap.append(item);
    });
    lede.insertAdjacentElement('afterend', wrap);
  }

  function installOperatingModel(card) {
    if (!card || card.querySelector('.operating-model-inspector')) return;
    card.classList.add('is-inspectable');

    const inspector = document.createElement('div');
    inspector.className = 'operating-model-inspector';

    const nav = document.createElement('div');
    nav.className = 'operating-model-nav';
    nav.setAttribute('role', 'tablist');
    nav.setAttribute('aria-label', 'Saga Systems operating model');

    const detail = document.createElement('div');
    detail.className = 'operating-model-detail';
    detail.setAttribute('role', 'tabpanel');
    detail.setAttribute('aria-live', 'polite');

    const render = (index) => {
      const [title, text] = stages[index];
      [...nav.querySelectorAll('button')].forEach((button, buttonIndex) => {
        const active = buttonIndex === index;
        button.classList.toggle('is-active', active);
        button.setAttribute('aria-selected', active ? 'true' : 'false');
        button.tabIndex = active ? 0 : -1;
      });
      detail.innerHTML = `<small>${String(index + 1).padStart(2, '0')} / 06</small><strong>${title}</strong><p>${text}</p>`;
    };

    stages.forEach(([title], index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('role', 'tab');
      button.textContent = title;
      button.addEventListener('click', () => render(index));
      button.addEventListener('keydown', (event) => {
        if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
        event.preventDefault();
        const next = event.key === 'ArrowRight'
          ? (index + 1) % stages.length
          : (index - 1 + stages.length) % stages.length;
        nav.querySelectorAll('button')[next]?.focus();
        render(next);
      });
      nav.append(button);
    });

    inspector.append(nav, detail);
    const foot = card.querySelector('.system-card-foot');
    if (foot) foot.insertAdjacentElement('beforebegin', inspector);
    else card.append(inspector);
    render(0);
  }

  function refineHeadings() {
    const selected = document.querySelector('.selected-work-section');
    if (selected) {
      const title = selected.querySelector('.section-heading h2');
      const body = selected.querySelector('.section-heading-side > p');
      if (title) title.textContent = 'Systems in practice.';
      if (body) body.textContent = 'Current interface captures and implementation evidence from systems already being built, piloted, or maintained.';
    }

    const systems = document.querySelector('.systems-section');
    if (systems) {
      const title = systems.querySelector('.section-heading h2');
      const body = systems.querySelector('.section-heading-side > p');
      if (title) title.textContent = 'What Saga builds.';
      if (body) body.textContent = 'Six working environments covering software, applied AI, research and data systems, automation, creative technology, and deployment infrastructure.';
    }
  }

  function wireHome() {
    if (window.location.pathname !== '/' && window.location.pathname !== '') return;

    const hero = document.querySelector('.home-hero');
    const selected = document.querySelector('.selected-work-section');
    const systems = document.querySelector('.systems-section');
    if (!hero) return;

    // Evidence should arrive before taxonomy. Do not make visitors read the method before seeing the work.
    if (selected && hero.nextElementSibling !== selected) hero.insertAdjacentElement('afterend', selected);
    if (selected && systems && selected.nextElementSibling !== systems) selected.insertAdjacentElement('afterend', systems);

    const heroCopy = hero.querySelector('.hero-copy');
    installEngagements(heroCopy);

    const primary = hero.querySelector('.hero-actions .button.primary');
    replaceFirstTextNode(primary, 'Selected work');

    const secondary = hero.querySelector('.hero-actions .button.secondary');
    if (secondary) secondary.textContent = 'Project intake';

    installOperatingModel(hero.querySelector('.hero-system-card'));
    refineHeadings();

    const bottomline = hero.querySelector('.hero-bottomline span:last-child');
    if (bottomline) bottomline.textContent = 'Public build / working systems / 2026';
  }

  let queued = false;
  const schedule = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      wireHome();
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', schedule, { once: true });
  else schedule();

  window.addEventListener('popstate', schedule);
  const root = document.querySelector('#root');
  if (root) new MutationObserver(schedule).observe(root, { childList: true, subtree: true });
})();
