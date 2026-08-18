function wireCommerceEntry() {
  const action = document.querySelector('.nav-action');
  if (action && action.getAttribute('href') !== '/checkout') {
    action.setAttribute('href', '/checkout');
    action.textContent = 'Start a project';
  }
}

wireCommerceEntry();

const root = document.querySelector('#root');
if (root) {
  new MutationObserver(wireCommerceEntry).observe(root, {
    childList: true,
    subtree: true,
  });
}
