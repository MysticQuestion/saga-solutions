import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const INDEX_PATH = path.join(ROOT, 'public', 'tech', 'articles', 'index.json');
const ARTICLE_DIR = path.join(ROOT, 'public', 'tech', 'articles');
const IMAGE_DIR = path.join(ROOT, 'public', 'tech', 'images');
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATA_SOURCE_ID = process.env.SAGA_TECH_NOTION_DATA_SOURCE_ID || '5876076e-af56-448e-a8cf-9bafb91bca16';
const RESEARCH_MODEL = process.env.SAGA_TECH_MODEL || 'gpt-5.6-terra';
const IMAGE_MODEL = process.env.SAGA_TECH_IMAGE_MODEL || 'gpt-image-2';
const REPO = process.env.GITHUB_REPOSITORY || 'MysticQuestion/saga-solutions';
const BRANCH = process.env.SAGA_TECH_BRANCH || process.env.GITHUB_HEAD_REF || process.env.GITHUB_REF_NAME || 'main';
const NOW = new Date();

const categories = [
  'Artificial Intelligence', 'Robotics', 'Semiconductors', 'Quantum', 'Computing',
  'Energy', 'Biotechnology', 'Space', 'Cybersecurity', 'Interfaces', 'Infrastructure', 'Other',
];

const notionTags = new Set([
  'AI', 'agents', 'models', 'robotics', 'chips', 'quantum', 'energy', 'biotech', 'space',
  'cybersecurity', 'interfaces', 'infrastructure', 'research', 'forecast', 'history',
]);

function fail(message) {
  throw new Error(message);
}

function requireEnv() {
  if (!OPENAI_API_KEY) fail('OPENAI_API_KEY is required for Saga Tech research and image generation.');
  if (!NOTION_API_KEY && process.env.SAGA_TECH_SKIP_NOTION !== '1') {
    fail('NOTION_API_KEY is required because the Saga Tech Notion ledger is the editorial system of record.');
  }
}

function readIndex() {
  try {
    const parsed = JSON.parse(fs.readFileSync(INDEX_PATH, 'utf8'));
    return Array.isArray(parsed) ? parsed : parsed.articles || [];
  } catch {
    return [];
  }
}

function slugify(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 92);
}

function extractOutputText(payload) {
  if (typeof payload.output_text === 'string' && payload.output_text.trim()) return payload.output_text;
  for (const item of payload.output || []) {
    for (const content of item.content || []) {
      if (content.type === 'output_text' && content.text) return content.text;
    }
  }
  return '';
}

async function openAIResponse(body) {
  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });
  const payload = await response.json();
  if (!response.ok) {
    console.error(JSON.stringify(payload, null, 2));
    fail(`OpenAI Responses API failed with ${response.status}.`);
  }
  return payload;
}

const articleSchema = {
  type: 'object',
  additionalProperties: false,
  required: [
    'title', 'slug', 'dek', 'category', 'signal_date', 'event_date', 'primary_source_url',
    'reading_minutes', 'tags', 'hero_image_prompt', 'hero_alt', 'saga_score', 'evidence_score',
    'forecast_confidence', 'forecast_horizon', 'why_now', 'historical_lineage', 'claim_ledger',
    'sections', 'forecasts', 'countercase', 'watchlist', 'sources', 'source_quality_note', 'editorial_notes',
  ],
  properties: {
    title: { type: 'string', minLength: 8 },
    slug: { type: 'string' },
    dek: { type: 'string', minLength: 40 },
    category: { type: 'string', enum: categories },
    signal_date: { type: 'string' },
    event_date: { type: ['string', 'null'] },
    primary_source_url: { type: 'string' },
    reading_minutes: { type: 'integer', minimum: 4, maximum: 30 },
    tags: { type: 'array', minItems: 3, maxItems: 10, items: { type: 'string' } },
    hero_image_prompt: { type: 'string', minLength: 80 },
    hero_alt: { type: 'string', minLength: 20 },
    saga_score: { type: 'integer', minimum: 0, maximum: 10 },
    evidence_score: { type: 'integer', minimum: 0, maximum: 10 },
    forecast_confidence: { type: 'string', enum: ['High', 'Medium', 'Low', 'Unresolved'] },
    forecast_horizon: { type: 'string', enum: ['0–2 years', '3–5 years', '6–10 years', '10+ years'] },
    why_now: { type: 'string' },
    historical_lineage: {
      type: 'array', minItems: 4, maxItems: 12,
      items: {
        type: 'object', additionalProperties: false,
        required: ['year', 'development', 'significance', 'source_url'],
        properties: {
          year: { type: 'string' }, development: { type: 'string' }, significance: { type: 'string' }, source_url: { type: 'string' },
        },
      },
    },
    claim_ledger: {
      type: 'array', minItems: 8, maxItems: 40,
      items: {
        type: 'object', additionalProperties: false,
        required: ['claim', 'status', 'source_urls'],
        properties: {
          claim: { type: 'string' },
          status: { type: 'string', enum: ['verified_fact', 'inference', 'forecast', 'unresolved'] },
          source_urls: { type: 'array', items: { type: 'string' } },
        },
      },
    },
    sections: {
      type: 'array', minItems: 6, maxItems: 10,
      items: {
        type: 'object', additionalProperties: false,
        required: ['label', 'title', 'text'],
        properties: { label: { type: 'string' }, title: { type: 'string' }, text: { type: 'string', minLength: 220 } },
      },
    },
    forecasts: {
      type: 'array', minItems: 2, maxItems: 5,
      items: {
        type: 'object', additionalProperties: false,
        required: ['horizon', 'confidence', 'prediction', 'basis', 'invalidators'],
        properties: {
          horizon: { type: 'string' },
          confidence: { type: 'string', enum: ['High', 'Medium', 'Low', 'Unresolved'] },
          prediction: { type: 'string' }, basis: { type: 'string' }, invalidators: { type: 'string' },
        },
      },
    },
    countercase: { type: 'string', minLength: 120 },
    watchlist: { type: 'array', minItems: 3, maxItems: 10, items: { type: 'string' } },
    sources: {
      type: 'array', minItems: 5, maxItems: 20,
      items: {
        type: 'object', additionalProperties: false,
        required: ['type', 'publisher', 'title', 'url', 'published_at'],
        properties: {
          type: { type: 'string', enum: ['primary', 'secondary'] },
          publisher: { type: 'string' }, title: { type: 'string' }, url: { type: 'string' }, published_at: { type: ['string', 'null'] },
        },
      },
    },
    source_quality_note: { type: 'string' },
    editorial_notes: { type: 'string' },
  },
};

function researchPrompt(existing) {
  const recent = existing.slice(0, 80).map(({ title, slug, primary_source_url, category }) => ({ title, slug, primary_source_url, category }));
  return `You are the autonomous research desk for SAGA TECH, the future-systems intelligence publication of Saga Systems.

TODAY: ${NOW.toISOString()}

MISSION
Search the worldwide public web for a consequential, genuinely emerging technology or scientific/engineering development with plausible effects on the digital future or the trajectory of AI. Do not merely summarize AI industry news. Relevant fields include AI, robotics, semiconductors, quantum systems, computing architecture, energy systems that constrain computation, biotechnology/computation, space infrastructure, cybersecurity, human-computer interfaces, and foundational infrastructure.

EDITORIAL TEST
The winning signal must be new enough to matter now, but deep enough to support a durable explanatory article. Prefer developments from roughly the last 14 days, but permit an older event when a newly released paper, dataset, standard, prototype, regulatory filing, benchmark, manufacturing result, or technical disclosure materially changes what is knowable.

GLOBAL SEARCH BEHAVIOR
Search beyond the United States. Consider universities, national laboratories, standards bodies, peer-reviewed journals, reputable preprint servers, public research institutes, government science agencies, company research/engineering teams, patent or regulatory records, and major science/technology reporting. Look for work from Asia, Europe, Africa, Latin America, Oceania, and the Middle East where relevant.

SOURCE STANDARD
1. Trace the development to its most authoritative primary sources.
2. Use at least TWO primary sources and at least TWO independent reputable secondary sources; use five or more sources overall.
3. Primary means the actual paper, technical report, standards document, official laboratory/university/company technical disclosure, government filing, public dataset, or equivalent first-party evidence.
4. Secondary means high-quality independent reporting or expert analysis. Avoid content farms, SEO summaries, anonymous reposts, hype aggregators, and unsourced social posts.
5. Record EVENT DATE separately from PUBLICATION/REPORTING DATE.
6. Do not cite a source unless it materially supports a claim in the article.
7. Search for credible contrary evidence and technical obstacles.

HISTORICAL LINEAGE
Do not begin history at the press release. Trace at least four enabling steps backward: precursor discoveries, algorithms, manufacturing methods, architectures, institutions, standards, prior failed attempts, or conceptual breakthroughs. Explain causality: why each predecessor made the current development possible.

FORECASTING STANDARD
Forecasts must be separate from verified facts. For each forecast, give a time horizon, confidence, causal basis, and observable invalidators. Include second-order effects: labor, market structure, infrastructure, security, geopolitics, education, media, science, environment, public institutions, or everyday behavior when genuinely relevant. Avoid science-fiction certainty.

ARTICLE VOICE
Write for an educated general reader and technical decision-maker. Elegant, rigorous, lucid, skeptical of hype. The article should explain mechanism and consequence rather than advertise a product. No breathless clichés. No invented quotes.

ARTICLE FLOW
Use 6–10 substantial sections. The sequence should cover: THE SIGNAL; THE PRIMARY SOURCE / WHAT ACTUALLY HAPPENED; HOW IT BECAME POSSIBLE; HOW THE TECHNOLOGY WORKS; WHAT CHANGES IF IT SCALES; WORLD/INSTITUTIONAL CONSEQUENCES; COUNTERCASE OR CONSTRAINTS; WHAT TO WATCH NEXT. You may adapt titles to the subject.

IMAGE BRIEF
Create one specific editorial hero-image prompt that visually explains or evokes the technology itself. Saga Tech art direction: cinematic scientific editorialism; black, graphite, mineral white, restrained deep red accents; technically plausible forms; strong negative space; monumental scale when appropriate; no generic glowing humanoid robots, no floating code, no stock-photo business people, no logos, no text in image.

DUPLICATE AVOIDANCE
Do not repeat or lightly repackage these existing Saga Tech records:
${JSON.stringify(recent)}

Return one article candidate only. If the available evidence is too thin, choose a different signal rather than lowering the source standard.`;
}

async function research(existing) {
  console.log(`Researching with ${RESEARCH_MODEL} + web search…`);
  const payload = await openAIResponse({
    model: RESEARCH_MODEL,
    reasoning: { effort: 'high' },
    tools: [{ type: 'web_search' }],
    tool_choice: 'auto',
    include: ['web_search_call.action.sources'],
    text: {
      verbosity: 'high',
      format: { type: 'json_schema', name: 'saga_tech_article', strict: true, schema: articleSchema },
    },
    input: [
      { role: 'system', content: [{ type: 'input_text', text: 'Research aggressively, distinguish fact from inference, and prefer primary evidence. Never fabricate a source, URL, date, institution, benchmark, or technical result.' }] },
      { role: 'user', content: [{ type: 'input_text', text: researchPrompt(existing) }] },
    ],
  });

  const text = extractOutputText(payload);
  if (!text) fail('Research model returned no structured article.');
  return JSON.parse(text);
}

function normalizeArticle(raw, existing) {
  const article = structuredClone(raw);
  article.slug = slugify(article.slug || article.title);
  if (!article.slug) fail('Article slug is empty.');
  if (existing.some((item) => item.slug === article.slug)) fail(`Duplicate Saga Tech slug: ${article.slug}`);
  if (!categories.includes(article.category)) article.category = 'Other';

  article.sources = article.sources
    .filter((source) => /^https?:\/\//i.test(source.url || ''))
    .filter((source, index, list) => list.findIndex((candidate) => candidate.url === source.url) === index);

  const primary = article.sources.filter((source) => source.type === 'primary');
  const secondary = article.sources.filter((source) => source.type === 'secondary');
  if (article.sources.length < 5 || primary.length < 2 || secondary.length < 2) {
    fail(`Source threshold failed: ${article.sources.length} total / ${primary.length} primary / ${secondary.length} secondary.`);
  }

  if (!article.sources.some((source) => source.url === article.primary_source_url)) {
    article.primary_source_url = primary[0]?.url || article.sources[0]?.url;
  }
  if (article.evidence_score < 7) fail(`Evidence score ${article.evidence_score}/10 is below the publication-candidate threshold.`);
  if (article.saga_score < 7) fail(`Saga signal score ${article.saga_score}/10 is below the publication-candidate threshold.`);

  article.signal_date = article.signal_date || NOW.toISOString().slice(0, 10);
  article.published_at = NOW.toISOString();
  article.last_verified_at = NOW.toISOString();
  article.hero_image = `/tech/images/${article.slug}.png`;
  article.review_status = 'human_review_required';
  article.generator = { research_model: RESEARCH_MODEL, image_model: IMAGE_MODEL, generated_at: NOW.toISOString() };
  return article;
}

async function checkSource(source) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 9000);
  try {
    let response = await fetch(source.url, {
      method: 'HEAD', redirect: 'follow', signal: controller.signal,
      headers: { 'User-Agent': 'SagaTechResearchBot/1.0 (+https://sagasystems.net/tech)' },
    });
    if ([403, 405, 406].includes(response.status)) {
      response = await fetch(source.url, {
        method: 'GET', redirect: 'follow', signal: controller.signal,
        headers: { Range: 'bytes=0-1024', 'User-Agent': 'SagaTechResearchBot/1.0 (+https://sagasystems.net/tech)' },
      });
    }
    return { ...source, reachable: response.ok || response.status === 206, http_status: response.status };
  } catch {
    return { ...source, reachable: false, http_status: null };
  } finally {
    clearTimeout(timer);
  }
}

async function verifySources(article) {
  console.log(`Checking ${article.sources.length} source URLs…`);
  const checked = [];
  for (const source of article.sources) checked.push(await checkSource(source));
  article.sources = checked;
  const reachable = checked.filter((source) => source.reachable).length;
  console.log(`${reachable}/${checked.length} sources responded to a direct HTTP check (bot blocking does not automatically disqualify a source).`);
  return article;
}

async function generateImage(article) {
  console.log(`Generating editorial image with ${IMAGE_MODEL}…`);
  const prompt = `${article.hero_image_prompt}\n\nEditorial constraints: 3:2 landscape hero composition; visually specific to ${article.title}; cinematic scientific editorial photography/visualization; black and graphite field, mineral white detail, restrained deep crimson accents; high material realism and technical plausibility; sophisticated negative space; no words, captions, logos, watermarks, generic humanoid robots, floating source code, or corporate stock-photo staging.`;
  const response = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: { Authorization: `Bearer ${OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: IMAGE_MODEL, prompt, size: '1536x1024', quality: 'medium', output_format: 'png', n: 1 }),
  });
  const payload = await response.json();
  if (!response.ok) {
    console.error(JSON.stringify(payload, null, 2));
    fail(`Image generation failed with ${response.status}.`);
  }

  const image = payload.data?.[0];
  let buffer;
  if (image?.b64_json) buffer = Buffer.from(image.b64_json, 'base64');
  else if (image?.url) {
    const imageResponse = await fetch(image.url);
    if (!imageResponse.ok) fail('Generated image URL could not be downloaded.');
    buffer = Buffer.from(await imageResponse.arrayBuffer());
  }
  if (!buffer?.length) fail('Image generation returned no image bytes.');
  fs.mkdirSync(IMAGE_DIR, { recursive: true });
  fs.writeFileSync(path.join(IMAGE_DIR, `${article.slug}.png`), buffer);
}

function markdownForNotion(article) {
  const sourceLines = article.sources.map((source, index) => `${index + 1}. **${source.type.toUpperCase()} — ${source.publisher}:** [${source.title}](${source.url})${source.published_at ? ` — ${source.published_at}` : ''}`).join('\n');
  const historyLines = article.historical_lineage.map((item) => `- **${item.year} — ${item.development}:** ${item.significance} ([source](${item.source_url}))`).join('\n');
  const claims = article.claim_ledger.map((item) => `- **${item.status.toUpperCase()}** — ${item.claim}${item.source_urls?.length ? ` — ${item.source_urls.map((url) => `[source](${url})`).join(', ')}` : ''}`).join('\n');
  const sections = article.sections.map((section) => `## ${section.title}\n\n*${section.label}*\n\n${section.text}`).join('\n\n');
  const forecasts = article.forecasts.map((item) => `### ${item.horizon} / ${item.confidence} confidence\n\n**Prediction:** ${item.prediction}\n\n**Basis:** ${item.basis}\n\n**Invalidators:** ${item.invalidators}`).join('\n\n');
  const watch = article.watchlist.map((item) => `- ${item}`).join('\n');

  return `> **SAGA TECH EDITORIAL RECORD** — Automated research candidate. Human review required before public release.\n\n## Why this signal now\n\n${article.why_now}\n\n## Source quality assessment\n\n${article.source_quality_note}\n\n## Historical lineage\n\n${historyLines}\n\n## Claim ledger\n\n${claims}\n\n# Article draft\n\n${sections}\n\n## Forecast model\n\n${forecasts}\n\n## Countercase\n\n${article.countercase}\n\n## What to watch next\n\n${watch}\n\n## Source ledger\n\n${sourceLines}\n\n## Image brief\n\n${article.hero_image_prompt}\n\n**Alt text:** ${article.hero_alt}\n\n## Editorial notes\n\n${article.editorial_notes}\n`;
}

function richText(content) {
  return { rich_text: [{ type: 'text', text: { content: String(content || '').slice(0, 1900) } }] };
}

async function createNotionRecord(article) {
  if (!NOTION_API_KEY) return null;
  console.log('Creating Saga Tech Notion editorial record…');
  const tags = [...new Set(article.tags.map((tag) => String(tag)).filter((tag) => notionTags.has(tag)))];
  const githubRecord = `https://github.com/${REPO}/blob/${encodeURIComponent(BRANCH)}/public/tech/articles/${article.slug}.json`;
  const properties = {
    Article: { title: [{ type: 'text', text: { content: article.title.slice(0, 1900) } }] },
    Status: { select: { name: 'Review' } },
    Category: { select: { name: article.category } },
    'Signal Date': { date: { start: String(article.signal_date).slice(0, 10) } },
    'Published Date': { date: { start: String(article.published_at).slice(0, 10) } },
    'Last Verified': { date: { start: String(article.last_verified_at).slice(0, 10) } },
    'Saga Score': { number: article.saga_score },
    'Evidence Score': { number: article.evidence_score },
    'Forecast Confidence': { select: { name: article.forecast_confidence } },
    'Forecast Horizon': { select: { name: article.forecast_horizon } },
    'Primary Source': { url: article.primary_source_url },
    'Article URL': { url: `https://sagasystems.net/tech/${article.slug}` },
    'GitHub Record': { url: githubRecord },
    Slug: richText(article.slug),
    'Image Brief': richText(article.hero_image_prompt),
    'Sources Verified': { checkbox: true },
    'Human Review': { checkbox: false },
    'Reading Minutes': { number: article.reading_minutes },
    Tags: { multi_select: tags.map((name) => ({ name })) },
  };
  if (article.event_date) properties['Event Date'] = { date: { start: String(article.event_date).slice(0, 10) } };

  const response = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${NOTION_API_KEY}`,
      'Content-Type': 'application/json',
      'Notion-Version': '2026-03-11',
    },
    body: JSON.stringify({
      parent: { type: 'data_source_id', data_source_id: NOTION_DATA_SOURCE_ID },
      properties,
      markdown: markdownForNotion(article),
    }),
  });
  const payload = await response.json();
  if (!response.ok) {
    console.error(JSON.stringify(payload, null, 2));
    fail(`Notion record creation failed with ${response.status}.`);
  }
  return { id: payload.id, url: payload.url };
}

function compactRecord(article) {
  return {
    slug: article.slug,
    title: article.title,
    dek: article.dek,
    category: article.category,
    signal_date: article.signal_date,
    published_at: article.published_at,
    reading_minutes: article.reading_minutes,
    tags: article.tags,
    hero_image: article.hero_image,
    hero_alt: article.hero_alt,
    source_count: article.sources.length,
    saga_score: article.saga_score,
    evidence_score: article.evidence_score,
    forecast_confidence: article.forecast_confidence,
    forecast_horizon: article.forecast_horizon,
    primary_source_url: article.primary_source_url,
    featured: false,
  };
}

function writeArticle(article, notion) {
  fs.mkdirSync(ARTICLE_DIR, { recursive: true });
  const publicArticle = { ...article, notion_record: notion?.url || null };
  fs.writeFileSync(path.join(ARTICLE_DIR, `${article.slug}.json`), `${JSON.stringify(publicArticle, null, 2)}\n`);

  const index = readIndex().filter((item) => item.slug !== article.slug);
  index.unshift(compactRecord(article));
  index.sort((a, b) => new Date(b.published_at || b.signal_date || 0) - new Date(a.published_at || a.signal_date || 0));
  fs.writeFileSync(INDEX_PATH, `${JSON.stringify(index, null, 2)}\n`);
}

function emitOutputs(article, notion) {
  const output = process.env.GITHUB_OUTPUT;
  if (!output) return;
  fs.appendFileSync(output, `slug=${article.slug}\n`);
  fs.appendFileSync(output, `title=${article.title.replaceAll('\n', ' ')}\n`);
  fs.appendFileSync(output, `category=${article.category}\n`);
  if (notion?.url) fs.appendFileSync(output, `notion_url=${notion.url}\n`);
}

async function main() {
  requireEnv();
  const existing = readIndex();
  let article = await research(existing);
  article = normalizeArticle(article, existing);
  article = await verifySources(article);
  await generateImage(article);
  const notion = await createNotionRecord(article);
  writeArticle(article, notion);
  emitOutputs(article, notion);
  console.log(`Saga Tech candidate created: ${article.title}`);
  console.log(`Slug: ${article.slug}`);
  console.log(`Notion: ${notion?.url || 'skipped'}`);
}

main().catch((error) => {
  console.error(error?.stack || error);
  process.exit(1);
});
