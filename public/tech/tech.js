const app = document.querySelector('#tech-app');

const esc = (value = '') => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&#039;');

const cleanDate = (value) => {
  if (!value) return '—';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return esc(value);
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
};

const articleHref = (slug) => `/tech/${encodeURIComponent(slug)}`;

async function getJson(url) {
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Request failed (${response.status})`);
  return response.json();
}

function storyArt(article, className = '') {
  if (!article.hero_image) return `<div class="${className}" aria-hidden="true"></div>`;
  return `<div class="${className}"><img src="${esc(article.hero_image)}" alt="${esc(article.hero_alt || '')}" loading="lazy" /></div>`;
}

function meta(article) {
  return `<div class="story-meta"><span>${esc(article.category || 'Technology')}</span><span>${cleanDate(article.published_at || article.signal_date)}</span><span>${Number(article.reading_minutes || 6)} min</span></div>`;
}

function renderIndex(items) {
  const published = [...items]
    .filter((item) => item && item.slug && item.title)
    .sort((a, b) => new Date(b.published_at || b.signal_date || 0) - new Date(a.published_at || a.signal_date || 0));

  app.innerHTML = `
    <section class="tech-hero">
      <div>
        <p class="hero-kicker">SAGA TECH / FUTURE SYSTEMS INTELLIGENCE</p>
        <h1>Trace the future.<span>Start at the source.</span></h1>
        <p class="hero-lede">Emerging technology is easier to understand when the announcement is traced backward through the research, engineering constraints, institutions, and prior breakthroughs that made it possible—and then projected forward with uncertainty left visible.</p>
      </div>
      <aside class="hero-protocol" aria-label="Saga Tech research protocol">
        <small>RESEARCH PROTOCOL / 04 LAYERS</small>
        <div class="protocol-row"><b>01</b><span>Detect the consequential signal</span></div>
        <div class="protocol-row"><b>02</b><span>Locate primary evidence and provenance</span></div>
        <div class="protocol-row"><b>03</b><span>Reconstruct the enabling history</span></div>
        <div class="protocol-row"><b>04</b><span>Forecast impact, countercase, and invalidators</span></div>
      </aside>
    </section>

    <section class="tech-index">
      <div class="index-head">
        <div><p class="section-kicker">INTELLIGENCE INDEX</p><h2>Signals worth following.</h2></div>
        <div class="index-controls">
          <input id="tech-search" type="search" placeholder="Search research, systems, fields…" aria-label="Search Saga Tech" />
          <select id="tech-category" aria-label="Filter by category"><option value="">All fields</option></select>
        </div>
      </div>
      <div id="story-results"></div>
    </section>

    <section class="method-section">
      <p class="section-kicker">EDITORIAL METHOD</p>
      <div class="method-grid">
        <article><span>01 / SIGNAL</span><h3>Consequential, not merely new.</h3><p>The system scores novelty, evidence quality, operational consequence, and durable value before an item becomes an article candidate.</p></article>
        <article><span>02 / PROVENANCE</span><h3>Primary sources first.</h3><p>Research papers, standards, technical documentation, public filings, laboratories, universities, and official records anchor factual claims. Secondary reporting supplies context and challenge.</p></article>
        <article><span>03 / HISTORY</span><h3>Innovation has ancestry.</h3><p>Each piece identifies the discoveries, constraints, people, institutions, and earlier systems without which the present development would not exist.</p></article>
        <article><span>04 / FORECAST</span><h3>Prediction with conditions.</h3><p>Forecasts are explicitly labeled and paired with confidence, time horizon, assumptions, counterarguments, and observable conditions that could prove the forecast wrong.</p></article>
      </div>
    </section>
  `;

  const resultNode = document.querySelector('#story-results');
  const searchNode = document.querySelector('#tech-search');
  const categoryNode = document.querySelector('#tech-category');
  const categories = [...new Set(published.map((item) => item.category).filter(Boolean))].sort();
  categories.forEach((category) => categoryNode.insertAdjacentHTML('beforeend', `<option value="${esc(category)}">${esc(category)}</option>`));

  const paint = () => {
    const query = searchNode.value.trim().toLowerCase();
    const category = categoryNode.value;
    const filtered = published.filter((item) => {
      const haystack = [item.title, item.dek, item.category, ...(item.tags || [])].join(' ').toLowerCase();
      return (!query || haystack.includes(query)) && (!category || item.category === category);
    });

    if (!filtered.length) {
      resultNode.innerHTML = `<div class="empty-index"><h3>${published.length ? 'No article matches this filter.' : 'The observatory is configured. The first reviewed signal will appear here.'}</h3><p>${published.length ? 'Change the field or search terms to inspect the rest of the intelligence index.' : 'Saga Tech does not fill space for cadence alone. Automated research creates a review record first; publication follows source verification and editorial review.'}</p></div>`;
      return;
    }

    const featured = filtered.find((item) => item.featured) || filtered[0];
    const rest = filtered.filter((item) => item.slug !== featured.slug);
    resultNode.innerHTML = `
      <article class="featured-story">
        ${storyArt(featured, 'featured-art')}
        <div class="story-copy">
          <div>
            ${meta(featured)}
            <h3>${esc(featured.title)}</h3>
            <p>${esc(featured.dek || '')}</p>
          </div>
          <a class="story-link" href="${articleHref(featured.slug)}">Open intelligence record</a>
        </div>
      </article>
      ${rest.length ? `<div class="story-grid">${rest.map((item) => `
        <a class="story-card" href="${articleHref(item.slug)}">
          ${storyArt(item, 'card-art')}
          <div class="card-copy">
            ${meta(item)}
            <h3>${esc(item.title)}</h3>
            <p>${esc(item.dek || '')}</p>
            <div class="card-foot"><span>${Number(item.source_count || 0)} sources</span><span>SAGA ${Number(item.saga_score || 0)}/10</span></div>
          </div>
        </a>`).join('')}</div>` : ''}
    `;
  };

  searchNode.addEventListener('input', paint);
  categoryNode.addEventListener('change', paint);
  paint();
}

function renderArticle(article) {
  document.title = `${article.title} — Saga Tech`;
  const description = article.dek || 'Saga Tech future systems intelligence.';
  document.querySelector('meta[name="description"]')?.setAttribute('content', description);

  const sections = Array.isArray(article.sections) ? article.sections : [];
  const forecasts = Array.isArray(article.forecasts) ? article.forecasts : [];
  const sources = Array.isArray(article.sources) ? article.sources : [];
  const primaryCount = sources.filter((source) => source.type === 'primary').length;

  app.innerHTML = `
    <article class="article-page">
      <section class="article-hero">
        <div class="article-hero-copy">
          <a class="back-tech" href="/tech">← Saga Tech / Intelligence Index</a>
          <p class="article-kicker">${esc(article.category || 'TECHNOLOGY')} / ${cleanDate(article.signal_date || article.published_at)}</p>
          <h1>${esc(article.title)}</h1>
          <p class="article-dek">${esc(article.dek || '')}</p>
        </div>
        ${storyArt(article, 'article-hero-art')}
        <div class="article-meta-bar">
          <div><small>EVENT DATE</small><strong>${cleanDate(article.event_date)}</strong></div>
          <div><small>PUBLISHED</small><strong>${cleanDate(article.published_at)}</strong></div>
          <div><small>READ</small><strong>${Number(article.reading_minutes || 6)} minutes</strong></div>
          <div><small>EVIDENCE</small><strong>${Number(article.evidence_score || 0)}/10</strong></div>
          <div><small>LAST VERIFIED</small><strong>${cleanDate(article.last_verified_at)}</strong></div>
        </div>
      </section>

      <div class="article-shell">
        <div class="article-body">
          ${sections.map((section, index) => `<section class="article-section" id="section-${index + 1}"><p class="section-kicker">${esc(section.label || `SECTION ${index + 1}`)}</p><h2>${esc(section.title || section.label || '')}</h2><p>${esc(section.text || '')}</p></section>`).join('')}

          <section class="forecast-section">
            <div class="forecast-head"><h2>Forward model.</h2><p>These are forecasts, not established facts. Confidence describes the strength of the causal case and available evidence—not certainty about the future.</p></div>
            <div class="forecast-list">
              ${forecasts.length ? forecasts.map((forecast) => `<article class="forecast-card"><div class="horizon">${esc(forecast.horizon || 'Future')}<br />${esc(forecast.confidence || 'Unresolved')} confidence</div><div><h3>${esc(forecast.prediction || '')}</h3><p>${esc(forecast.basis || '')}</p>${forecast.invalidators ? `<em>Could fail if: ${esc(forecast.invalidators)}</em>` : ''}</div></article>`).join('') : '<article class="forecast-card"><div class="horizon">UNRESOLVED</div><div><h3>No forecast cleared the evidence threshold.</h3><p>The article remains useful as a source and historical record without forcing a prediction.</p></div></article>'}
            </div>
          </section>
        </div>

        <aside class="article-aside">
          <div class="aside-box"><small>SOURCE BASE</small><strong>${sources.length} cited / ${primaryCount} primary</strong><p>Primary evidence is separated from secondary context in the source ledger below.</p></div>
          <div class="aside-box"><small>SAGA SIGNAL SCORE</small><strong>${Number(article.saga_score || 0)} / 10</strong><p>Composite editorial assessment of novelty, evidence, consequence, and durable value.</p></div>
          <div class="aside-box"><small>FORECAST</small><strong>${esc(article.forecast_confidence || 'Unresolved')}</strong><p>${esc(article.forecast_horizon || 'No single horizon assigned')}.</p></div>
        </aside>
      </div>

      <section class="source-ledger">
        <p class="section-kicker">PROVENANCE / SOURCE LEDGER</p>
        <h2>Follow the evidence outward.</h2>
        ${sources.map((source) => `<div class="source-row"><span class="source-type">${esc(source.type || 'source')}</span><a href="${esc(source.url)}" target="_blank" rel="noreferrer"><strong>${esc(source.title || source.url)}</strong><span>${esc(source.publisher || '')}</span></a><span class="source-date">${cleanDate(source.published_at || source.date)}</span></div>`).join('') || '<div class="source-row"><span class="source-type">UNAVAILABLE</span><strong>No public source ledger is attached.</strong></div>'}
      </section>
    </article>
  `;
}

async function main() {
  try {
    const path = window.location.pathname.replace(/\/+$/, '') || '/tech';
    if (path === '/tech') {
      const index = await getJson('/tech/articles/index.json');
      return renderIndex(Array.isArray(index) ? index : index.articles || []);
    }

    const slug = decodeURIComponent(path.split('/').filter(Boolean).slice(1).join('/'));
    if (!slug || slug.includes('..') || slug.includes('/')) throw new Error('Invalid article path.');
    const article = await getJson(`/tech/articles/${encodeURIComponent(slug)}.json`);
    renderArticle(article);
  } catch (error) {
    console.error('Saga Tech failed to load', error);
    app.innerHTML = `<section class="error-state"><p class="section-kicker">SAGA TECH / LOAD ERROR</p><h1>This intelligence record could not be opened.</h1><p>${esc(error.message || 'The requested article is unavailable.')}</p><a class="story-link" href="/tech">Return to the Tech index</a></section>`;
  }
}

main();
