const packages = {
  diagnostic: 'System Diagnostic',
  blueprint: 'Build Blueprint',
  prototype: 'Prototype Sprint',
};

const notice = document.querySelector('#notice');
const purchaseView = document.querySelector('#purchase-view');
const briefView = document.querySelector('#brief-view');
const completeView = document.querySelector('#complete-view');
const checkoutForm = document.querySelector('#checkout-form');
const briefForm = document.querySelector('#brief-form');
const packageInput = document.querySelector('#package-id');
const checkoutButton = document.querySelector('#checkout-button');
const selectedTitle = document.querySelector('#selected-title');

function showNotice(text, kind = 'info') {
  notice.textContent = text;
  notice.dataset.kind = kind;
  notice.hidden = false;
}

function setBusy(button, busy, busyText, readyText) {
  button.disabled = busy;
  button.dataset.busy = busy ? 'true' : 'false';
  button.innerHTML = busy ? busyText : readyText;
}

function fields(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function readPendingLead() {
  try {
    return JSON.parse(localStorage.getItem('saga_pending_checkout') || '{}');
  } catch {
    return {};
  }
}

function savePendingLead(value) {
  localStorage.setItem('saga_pending_checkout', JSON.stringify(value));
}

function selectPackage(packageId) {
  if (!packages[packageId]) return;
  packageInput.value = packageId;
  selectedTitle.textContent = packages[packageId];
  checkoutButton.disabled = false;
  document.querySelectorAll('[data-package]').forEach((card) => {
    card.classList.toggle('is-selected', card.dataset.package === packageId);
    card.setAttribute('aria-pressed', card.dataset.package === packageId ? 'true' : 'false');
  });
  checkoutForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

document.querySelectorAll('[data-package]').forEach((card) => {
  card.addEventListener('click', () => selectPackage(card.dataset.package));
});

checkoutForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  notice.hidden = true;

  const data = fields(checkoutForm);
  const packageId = packageInput.value;
  if (!packages[packageId]) {
    showNotice('Select an engagement before continuing.', 'error');
    return;
  }

  const lead = {
    packageId,
    customerName: String(data.customerName || '').trim(),
    customerEmail: String(data.customerEmail || '').trim(),
    projectTitle: String(data.projectTitle || '').trim(),
  };
  savePendingLead(lead);

  setBusy(checkoutButton, true, 'Creating secure checkout…', 'Continue to secure checkout <span>→</span>');

  try {
    const response = await fetch('/api/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.url) throw new Error(result.error || 'Checkout could not be created.');
    window.location.assign(result.url);
  } catch (error) {
    showNotice(error.message || 'Checkout is temporarily unavailable.', 'error');
    setBusy(checkoutButton, false, '', 'Continue to secure checkout <span>→</span>');
  }
});

briefForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  notice.hidden = true;

  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get('session_id');
  const packageId = params.get('package');
  const pending = readPendingLead();
  const data = fields(briefForm);
  const button = document.querySelector('#brief-button');

  if (!sessionId) {
    showNotice('The paid checkout session is missing. Return to checkout and use the payment confirmation link.', 'error');
    return;
  }

  const lead = {
    name: pending.customerName || '',
    email: pending.customerEmail || '',
    projectTitle: pending.projectTitle || '',
    organization: data.organization || '',
    phone: data.phone || '',
    budget: data.budget || '',
    timeline: data.timeline || '',
    projectSummary: data.projectSummary || '',
  };

  const brief = {
    desiredOutcome: data.desiredOutcome || '',
    primaryUsers: data.primaryUsers || '',
    requiredFeatures: data.requiredFeatures || '',
    successMeasures: data.successMeasures || '',
    referenceLinks: data.referenceLinks || '',
    existingAssets: data.existingAssets || '',
    integrations: data.integrations || '',
    constraints: data.constraints || '',
    decisionMakers: data.decisionMakers || '',
    targetLaunch: data.targetLaunch || '',
  };

  setBusy(button, true, 'Recording brief…', 'Submit commissioning brief <span>→</span>');

  try {
    const response = await fetch('/api/submit-project', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId, packageId, lead, brief }),
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || !result.reference) throw new Error(result.error || 'The commissioning brief could not be recorded.');

    localStorage.removeItem('saga_pending_checkout');
    briefView.hidden = true;
    completeView.hidden = false;
    document.querySelector('#project-reference').textContent = result.reference;
    window.history.replaceState({}, '', '/checkout?recorded=1');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } catch (error) {
    showNotice(error.message || 'The commissioning brief could not be recorded.', 'error');
    setBusy(button, false, '', 'Submit commissioning brief <span>→</span>');
  }
});

const params = new URLSearchParams(window.location.search);
const payment = params.get('payment');
const packageFromQuery = params.get('package');
const pending = readPendingLead();

if (packages[packageFromQuery]) selectPackage(packageFromQuery);

if (pending.customerName) checkoutForm.elements.customerName.value = pending.customerName;
if (pending.customerEmail) checkoutForm.elements.customerEmail.value = pending.customerEmail;
if (pending.projectTitle) checkoutForm.elements.projectTitle.value = pending.projectTitle;

if (payment === 'success' && params.get('session_id')) {
  purchaseView.hidden = true;
  briefView.hidden = false;
  showNotice('Payment received. Complete the commissioning brief to create the project record.', 'success');
} else if (payment === 'cancelled') {
  showNotice('Checkout was cancelled. No project payment was completed.', 'info');
} else if (params.get('recorded') === '1') {
  purchaseView.hidden = true;
  completeView.hidden = false;
}
