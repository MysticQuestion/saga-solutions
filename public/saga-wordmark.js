(() => {
  const asset = '/saga-wordmark-exact.webp';

  function installWordmark() {
    document.querySelectorAll('a.wordmark').forEach((link) => {
      const existing = link.querySelector('img.saga-wordmark-image');
      if (existing) return;

      link.dataset.sagaWordmark = 'true';
      link.innerHTML = `<img class="saga-wordmark-image" src="${asset}" alt="" aria-hidden="true" />`;
    });

    const heroHeading = document.querySelector('.home-hero .hero-copy h1');
    if (heroHeading && !heroHeading.querySelector('img.saga-wordmark-image')) {
      heroHeading.classList.add('saga-hero-wordmark');
      heroHeading.setAttribute('aria-label', 'Saga Systems');
      heroHeading.innerHTML = `<img class="saga-wordmark-image" src="${asset}" alt="" aria-hidden="true" />`;
    }
  }

  let queued = false;
  const scheduleInstall = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      installWordmark();
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleInstall, { once: true });
  } else {
    scheduleInstall();
  }

  window.addEventListener('popstate', scheduleInstall);

  const observer = new MutationObserver(scheduleInstall);
  observer.observe(document.documentElement, { childList: true, subtree: true });
})();
