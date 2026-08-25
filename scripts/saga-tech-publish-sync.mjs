const NOTION_API_KEY = process.env.NOTION_API_KEY;
const DATA_SOURCE_ID = process.env.SAGA_TECH_NOTION_DATA_SOURCE_ID || '5876076e-af56-448e-a8cf-9bafb91bca16';
const slugs = String(process.env.SAGA_TECH_PUBLISHED_SLUGS || '').split(',').map((value) => value.trim()).filter(Boolean);

if (!NOTION_API_KEY) {
  console.error('NOTION_API_KEY is required for Saga Tech publication sync.');
  process.exit(1);
}

if (!slugs.length) {
  console.log('No Saga Tech article slugs to sync.');
  process.exit(0);
}

const headers = {
  Authorization: `Bearer ${NOTION_API_KEY}`,
  'Content-Type': 'application/json',
  'Notion-Version': '2026-03-11',
};

async function findPage(slug) {
  const response = await fetch(`https://api.notion.com/v1/data_sources/${DATA_SOURCE_ID}/query`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      page_size: 5,
      filter: { property: 'Slug', rich_text: { equals: slug } },
    }),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(`Notion query failed (${response.status}): ${JSON.stringify(payload)}`);
  return payload.results?.[0] || null;
}

async function markPublished(pageId, slug) {
  const today = new Date().toISOString().slice(0, 10);
  const response = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: 'PATCH',
    headers,
    body: JSON.stringify({
      properties: {
        Status: { select: { name: 'Published' } },
        'Human Review': { checkbox: true },
        'Published Date': { date: { start: today } },
        'Last Verified': { date: { start: today } },
        'Article URL': { url: `https://sagasystems.net/tech/${slug}` },
      },
    }),
  });
  const payload = await response.json();
  if (!response.ok) throw new Error(`Notion update failed (${response.status}): ${JSON.stringify(payload)}`);
  return payload;
}

for (const slug of slugs) {
  const page = await findPage(slug);
  if (!page) {
    console.warn(`No Notion Saga Tech record found for ${slug}; skipping.`);
    continue;
  }
  await markPublished(page.id, slug);
  console.log(`Marked ${slug} as Published in Notion.`);
}
