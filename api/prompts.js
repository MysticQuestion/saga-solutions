const NOTION_VERSION = '2026-03-11';
const DATA_SOURCE_ID = process.env.SAGA_PROMPT_NOTION_DATA_SOURCE_ID || '66faef04-87eb-4f29-afdc-c712177d4fcf';

function send(res, status, body) {
  res.status(status).json(body);
}

function plainText(richText = []) {
  return richText.map((item) => item?.plain_text || item?.text?.content || '').join('').trim();
}

function titleValue(property) {
  return plainText(property?.title || []);
}

function richTextValue(property) {
  return plainText(property?.rich_text || []);
}

function selectValue(property) {
  return property?.select?.name || property?.status?.name || null;
}

function multiSelectValue(property) {
  return Array.isArray(property?.multi_select) ? property.multi_select.map((item) => item.name).filter(Boolean) : [];
}

function uniqueIdValue(property) {
  const value = property?.unique_id;
  if (!value) return null;
  return `${value.prefix ? `${value.prefix}-` : ''}${value.number ?? ''}` || null;
}

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 120);
}

async function notion(path, options = {}) {
  const apiKey = process.env.NOTION_API_KEY;
  if (!apiKey) throw new Error('NOTION_API_KEY is not configured.');

  const response = await fetch(`https://api.notion.com${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Notion-Version': NOTION_VERSION,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Notion request failed (${response.status}): ${body.slice(0, 600)}`);
  }
  return response.json();
}

async function readPromptBody(pageId) {
  const blocks = [];
  let cursor;
  do {
    const query = new URLSearchParams({ page_size: '100' });
    if (cursor) query.set('start_cursor', cursor);
    const page = await notion(`/v1/blocks/${pageId}/children?${query}`);
    blocks.push(...(page.results || []));
    cursor = page.has_more ? page.next_cursor : null;
  } while (cursor && blocks.length < 300);

  const sections = { prompt: [], why: [] };
  let active = null;
  for (const block of blocks) {
    const payload = block?.[block.type];
    if (!payload) continue;
    const text = plainText(payload.rich_text || []);
    if (block.type.startsWith('heading_')) {
      const normalized = text.toLowerCase();
      if (normalized === 'prompt') active = 'prompt';
      else if (normalized === 'why it works') active = 'why';
      else active = null;
      continue;
    }
    if (!active || !text) continue;
    if (['paragraph', 'bulleted_list_item', 'numbered_list_item', 'quote', 'callout'].includes(block.type)) {
      sections[active].push(text);
    }
  }

  return {
    prompt_text: sections.prompt.join('\n\n').trim(),
    why_it_works: sections.why.join('\n\n').trim(),
  };
}

function mapPage(page, body) {
  const properties = page.properties || {};
  const title = titleValue(properties.Prompt) || 'Untitled prompt';
  return {
    id: page.id,
    slug: slugify(title),
    title,
    prompt_id: uniqueIdValue(properties['Prompt ID']),
    status: selectValue(properties.Status),
    saga_score: properties['Saga Score']?.number ?? null,
    category: selectValue(properties.Category),
    context_depth: selectValue(properties['Context Depth']),
    difficulty: selectValue(properties.Difficulty),
    origin: selectValue(properties.Origin),
    platforms: multiSelectValue(properties.Platforms),
    date_added: properties['Date Added']?.date?.start || null,
    published_date: properties['Published date']?.date?.start || null,
    published: Boolean(properties.Published?.checkbox),
    tested: Boolean(properties.Tested?.checkbox),
    editorial_notes: richTextValue(properties['Editorial Notes']),
    source_url: properties['Source URL']?.url || null,
    notion_url: page.url || null,
    ...body,
  };
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return send(res, 405, { error: 'Method not allowed.' });
  }

  const rawLimit = Number.parseInt(String(req.query?.limit || '12'), 10);
  const limit = Number.isFinite(rawLimit) ? Math.max(1, Math.min(rawLimit, 24)) : 12;

  try {
    const database = await notion(`/v1/data_sources/${DATA_SOURCE_ID}/query`, {
      method: 'POST',
      body: JSON.stringify({
        page_size: limit,
        filter: {
          property: 'Saga Score',
          number: { greater_than_or_equal_to: 90 },
        },
        sorts: [
          { property: 'Date Added', direction: 'descending' },
          { property: 'Saga Score', direction: 'descending' },
        ],
      }),
    });

    const prompts = await Promise.all(
      (database.results || []).map(async (page) => {
        try {
          return mapPage(page, await readPromptBody(page.id));
        } catch (error) {
          console.error(`Prompt body fetch failed for ${page.id}`, error);
          return mapPage(page, { prompt_text: '', why_it_works: '' });
        }
      }),
    );

    res.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=3600');
    return send(res, 200, {
      source: 'notion',
      data_source_id: DATA_SOURCE_ID,
      synced_at: new Date().toISOString(),
      prompts,
    });
  } catch (error) {
    console.error('Prompt intelligence sync failed', error);
    return send(res, 503, {
      source: 'unavailable',
      error: 'Live prompt intelligence is temporarily unavailable.',
    });
  }
}
