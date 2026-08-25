(() => {
  function addTechLink() {
    const nav = document.querySelector('.main-nav');
    if (!nav || nav.querySelector('[data-saga-tech-link]')) return;
    const link = document.createElement('a');
    link.href = '/tech';
    link.textContent = 'Tech';
    link.dataset.sagaTechLink = 'true';
    const studio = nav.querySelector('a[href="/#studio"]');
    if (studio) nav.insertBefore(link, studio);
    else nav.appendChild(link);
  }

  function wirePromptLibrary() {
    const cards = [...document.querySelectorAll('.resource-grid article')];
    const card = cards.find((item) => item.querySelector('h3')?.textContent?.trim() === 'Prompt Intelligence');
    if (!card || card.querySelector('[data-saga-prompt-link]')) return;

    const link = document.createElement('a');
    link.href = '/prompts';
    link.textContent = 'Open live library ↗';
    link.dataset.sagaPromptLink = 'true';
    Object.assign(link.style, {
      display: 'inline-block',
      marginTop: '18px',
      fontSize: '12px',
      fontWeight: '600',
      color: '#a4151c',
      position: 'relative',
      zIndex: '2',
    });
    card.appendChild(link);
  }

  function enhanceSagaNavigation() {
    addTechLink();
    wirePromptLibrary();
  }

  enhanceSagaNavigation();
  const root = document.querySelector('#root');
  if (root) new MutationObserver(enhanceSagaNavigation).observe(root, { childList: true, subtree: true });
})();
