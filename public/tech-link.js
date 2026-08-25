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

  addTechLink();
  const root = document.querySelector('#root');
  if (root) new MutationObserver(addTechLink).observe(root, { childList: true, subtree: true });
})();
