const STORAGE_KEY = 'saga-project-outline';

const packageIds = {
  'Diagnostic Sprint': 'diagnostic',
  'Build Blueprint': 'blueprint',
  'Prototype Sprint': 'prototype',
  'Embedded Project Partner': 'partner',
};

function setControlledValue(element, value) {
  if (!element || value == null) return;

  const prototype =
    element instanceof HTMLTextAreaElement
      ? HTMLTextAreaElement.prototype
      : element instanceof HTMLSelectElement
        ? HTMLSelectElement.prototype
        : HTMLInputElement.prototype;
  const descriptor = Object.getOwnPropertyDescriptor(prototype, 'value');
  descriptor?.set?.call(element, value);
  element.dispatchEvent(new Event(element instanceof HTMLSelectElement ? 'change' : 'input', { bubbles: true }));
}

function persistCurrentOutline() {
  const form = document.querySelector('#project-form');
  if (!form) return;

  const lead = {};
  form.querySelectorAll('[name]').forEach((field) => {
    lead[field.name] = field.value;
  });

  const selectedName = document.querySelector('.package-card.selected h3')?.textContent?.trim();
  const packageId = packageIds[selectedName] || 'blueprint';

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ packageId, lead }));
}

function restoreOutline() {
  let stored;
  try {
    stored = JSON.parse(window.localStorage.getItem(STORAGE_KEY) || 'null');
  } catch {
    return false;
  }
  if (!stored?.lead) return false;

  const form = document.querySelector('#project-form');
  if (!form) return false;

  const packageName = Object.entries(packageIds).find(([, id]) => id === stored.packageId)?.[0];
  const packageButton = [...document.querySelectorAll('.package-card')].find(
    (button) => button.querySelector('h3')?.textContent?.trim() === packageName,
  );
  if (packageButton && !packageButton.classList.contains('selected')) packageButton.click();

  Object.entries(stored.lead).forEach(([name, value]) => {
    setControlledValue(form.querySelector(`[name="${CSS.escape(name)}"]`), value);
  });
  return true;
}

function repairAccessibilityLabel() {
  const liveRegion = document.querySelector('[aria-live="pollite"]');
  if (liveRegion) liveRegion.setAttribute('aria-live', 'polite');
}

document.addEventListener(
  'click',
  (event) => {
    const button = event.target.closest('button');
    if (button?.closest('#project-form') && button.textContent?.trim().startsWith('Pay ')) {
      persistCurrentOutline();
    }
  },
  true,
);

const observer = new MutationObserver(() => {
  repairAccessibilityLabel();
  if (restoreOutline()) observer.disconnect();
});

observer.observe(document.documentElement, { childList: true, subtree: true });
window.setTimeout(() => {
  repairAccessibilityLabel();
  restoreOutline();
  observer.disconnect();
}, 2500);
