const app = document.getElementById('prompt-app');

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function safeSlug(value) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(value || '')) ? String(value) : '';
}

function formatDate(value) {
  if (!value) return 'Not dated';
  const date = new Date(`${value}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return escapeHtml(value);
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' }).format(date);
}

function statusMarkup(status) {
  const value = status || 'Unspecified';
  return `<span class="status" data-status="${escapeHtml(value)}">${escapeHtml(value)}</span>`;
}

function platformText(prompt) {
  return Array.isArray(prompt.platforms) && prompt.platforms.length ? prompt.platforms.join(' · ') : 'Any LLM';
}

function normalizePayload(payload, fallback = false) {
  const prompts = Array.isArray(payload?.prompts) ? payload.prompts : Array.isArray(payload) ? payload : [];
  return {
    source: fallback ? 'snapshot' : (payload?.source || 'notion'),
    synced_at: payload?.synced_at || payload?.generated_at || null,
    prompts: prompts.filter((prompt) => prompt && safeSlug(prompt.slug)),
  };
}

async function loadPrompts() {
  try {
    const live = await fetch('/api/prompts?limit=18', { cache: 'no-store' });
    if (live.ok) {
      const payload = normalizePayload(await live.json());
      if (payload.prompts.length) return payload;
    }
  } catch (error) {
    console.warn('Live prompt sync unavailable; using repository snapshot.', error);
  }

  const snapshot = await fetch('/prompts/index.json', { cache: 'no-store' });
  if (!snapshot.ok) throw new Error('Prompt snapshot is unavailable.');
  return normalizePayload(await snapshot.json(), true);
}

function renderCard(prompt) {
  return `
    <article class="prompt-card" data-category="${escapeHtml(prompt.category || 'Other')}" data-status="${escapeHtml(prompt.status || '')}">
      <div class="prompt-card-top">
        <div class="prompt-meta">
          <span>${escapeHtml(prompt.prompt_id || 'SAGA')}</span>
          <span>${escapeHtml(prompt.category || 'Uncategorized')}</span>
          <span>${escapeHtml(prompt.difficulty || 'Unspecified')}</span>
        </div>
        ${statusMarkup(prompt.status)}
      </div>
      <h2>${escapeHtml(prompt.title)}</h2>
      <p class="why">${escapeHtml(prompt.why_it_works || 'A reusable Saga prompt specification from the Prompt Intelligence Library.')}</p>
      <div class="prompt-card-footer">
        <div class="score"><strong>${escapeHtml(prompt.saga_score ?? '—')}</strong><span>Saga Score</span></div>
        <a class="open-link" href="/prompts/${escapeHtml(prompt.slug)}">Open prompt</a>
      </div>
    </article>
  `;
}

function renderIndex(data) {
  const prompts = data.prompts;
  const categories = [...new Set(prompts.map((item) => item.category).filter(Boolean))].sort();
  const syncLabel = data.source === 'notion' ? 'LIVE NOTION SOURCE' : 'REPOSITORY SNAPSHOT';
  const synced = data.synced_at ? new Date(data.synced_at).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' }) : 'current snapshot';

  app.innerHTML = `
    <div class="prompt-shell">
      <section class="prompt-hero">
        <div class="prompt-hero-grid">
          <div class="prompt-hero-copy">
            <p class="eyebrow">Saga Systems / Research infrastructure</p>
            <h1>Prompt Intelligence.</h1>
            <p>A living library of high-scoring prompt systems for research, strategy, decision analysis, futurecasting, business, experimentation, and creative work.</p>
          </div>
          <aside class="hero-side">
            <strong>Not a prompt dump.</strong>
            <p>Each record retains its editorial state, testing status, Saga Score, category, difficulty, supported platforms, and the reason the prompt exists.</p>
            <div class="sync-line"><i class="sync-dot"></i><span>${syncLabel} / ${escapeHtml(synced)}</span></div>
          </aside>
        </div>
      </section>

      <section class="library-bar" aria-label="Prompt filters">
        <div class="search-wrap"><input id="prompt-search" type="search" placeholder="Search titles, categories, methods, or prompt text" autocomplete="off" /></div>
        <div class="filter-row" id="category-filters">
          <button class="filter-button is-active" type="button" data-category="all">All</button>
          ${categories.map((category) => `<button class="filter-button" type="button" data-category="${escapeHtml(category)}">${escapeHtml(category)}</button>`).join('')}
        </div>
      </section>

      <div class="library-note"><strong>Editorial boundary</strong><span>Entries marked “Needs Testing” are visible as Prompt Lab records, not represented as reviewed or production-approved. Status changes made in Notion are preserved here.</span></div>

      <section class="prompt-grid" id="prompt-grid">
        ${prompts.map(renderCard).join('')}
      </section>
    </div>
    <footer class="prompt-footer"><span>SAGA SYSTEMS / PROMPT INTELLIGENCE</span><span>Notion is the source of truth</span></footer>
  `;

  const search = document.getElementById('prompt-search');
  const filterButtons = [...document.querySelectorAll('.filter-button')];
  const grid = document.getElementById('prompt-grid');
  let activeCategory = 'all';

  function applyFilters() {
    const term = search.value.trim().toLowerCase();
    const visible = prompts.filter((prompt) => {
      const categoryMatch = activeCategory === 'all' || prompt.category === activeCategory;
      const haystack = [prompt.title, prompt.category, prompt.difficulty, prompt.status, prompt.why_it_works, prompt.prompt_text, ...(prompt.platforms || [])].join(' ').toLowerCase();
      return categoryMatch && (!term || haystack.includes(term));
    });
    grid.innerHTML = visible.length ? visible.map(renderCard).join('') : `<div class="empty-state"><h1>No prompts match this view.</h1><p>Clear the search or select another category.</p></div>`;
  }

  search.addEventListener('input', applyFilters);
  filterButtons.forEach((button) => button.addEventListener('click', () => {
    activeCategory = button.dataset.category || 'all';
    filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
    applyFilters();
  }));
}

function renderDetail(prompt, data) {
  if (!prompt) {
    app.innerHTML = `<section class="empty-state"><h1>Prompt not found.</h1><p>This record may have been renamed, archived, or removed from the current public mirror.</p><p><a href="/prompts">← Return to Prompt Intelligence</a></p></section>`;
    return;
  }

  const syncLabel = data.source === 'notion' ? 'Live Notion record' : 'Repository snapshot';
  app.innerHTML = `
    <article class="prompt-detail">
      <a class="back-link" href="/prompts">← Prompt Intelligence</a>
      <section class="detail-hero">
        <div class="detail-topline">
          <div class="prompt-meta"><span>${escapeHtml(prompt.prompt_id || 'SAGA')}</span><span>${escapeHtml(prompt.category || 'Uncategorized')}</span><span>${escapeHtml(syncLabel)}</span></div>
          ${statusMarkup(prompt.status)}
        </div>
        <h1>${escapeHtml(prompt.title)}</h1>
        <p class="detail-dek">${escapeHtml(prompt.why_it_works || 'A reusable prompt specification from the Saga Prompt Intelligence Library.')}</p>
        <div class="detail-ledger">
          <div><span class="detail-label">Saga Score</span><strong>${escapeHtml(prompt.saga_score ?? '—')} / 100</strong></div>
          <div><span class="detail-label">Difficulty</span><strong>${escapeHtml(prompt.difficulty || '—')}</strong></div>
          <div><span class="detail-label">Platforms</span><strong>${escapeHtml(platformText(prompt))}</strong></div>
          <div><span class="detail-label">Added</span><strong>${escapeHtml(formatDate(prompt.date_added))}</strong></div>
        </div>
      </section>

      <section class="prompt-body">
        <h2>The prompt</h2>
        <p class="prompt-copy">${escapeHtml(prompt.prompt_text || 'Prompt body unavailable in the current mirror.')}</p>
      </section>

      <section class="prompt-body">
        <h2>Why it works</h2>
        <p class="why-copy">${escapeHtml(prompt.why_it_works || 'No rationale has been added yet.')}</p>
      </section>

      <div class="detail-actions">
        ${prompt.notion_url ? `<a href="${escapeHtml(prompt.notion_url)}" target="_blank" rel="noreferrer">Open source record in Notion ↗</a>` : ''}
        <a href="/prompts">Browse the library</a>
      </div>
    </article>
    <footer class="prompt-footer"><span>SAGA SYSTEMS / PROMPT INTELLIGENCE</span><span>${escapeHtml(prompt.status || 'Unspecified status')}</span></footer>
  `;
}

async function init() {
  try {
    const data = await loadPrompts();
    const path = window.location.pathname.replace(/\/$/, '');
    const prefix = '/prompts/';
    if (path.startsWith(prefix)) {
      const slug = safeSlug(path.slice(prefix.length));
      return renderDetail(data.prompts.find((item) => item.slug === slug), data);
    }
    renderIndex(data);
  } catch (error) {
    console.error(error);
    app.innerHTML = `<section class="empty-state"><h1>The prompt library could not be loaded.</h1><p>The live Notion source and repository snapshot are both unavailable.</p></section>`;
  }
}

init();
