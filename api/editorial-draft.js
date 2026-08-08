const MODEL = process.env.OPENAI_EDITORIAL_MODEL || 'gpt-5.6-terra';

function send(res, status, body) {
  res.status(status).json(body);
}

function authorized(req) {
  const expected = process.env.SAGA_EDITORIAL_TOKEN;
  const header = req.headers.authorization || '';
  return Boolean(expected && header === `Bearer ${expected}`);
}

function cleanSource(item) {
  return {
    url: String(item?.url || '').slice(0, 2000),
    title: String(item?.title || '').slice(0, 500),
    excerpt: String(item?.excerpt || '').slice(0, 12000),
    published_at: String(item?.published_at || '').slice(0, 100),
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return send(res, 405, { error: 'Method not allowed.' });
  }

  if (!authorized(req)) {
    return send(res, 401, { error: 'Editorial authorization required.' });
  }

  if (!process.env.OPENAI_API_KEY) {
    return send(res, 503, { code: 'OPENAI_NOT_CONFIGURED', error: 'The editorial model is not configured.' });
  }

  const topic = String(req.body?.topic || '').trim().slice(0, 4000);
  const sourceMaterial = Array.isArray(req.body?.sourceMaterial)
    ? req.body.sourceMaterial.slice(0, 20).map(cleanSource)
    : [];

  if (!topic) return send(res, 400, { error: 'A topic or editorial question is required.' });

  const system = `You are the private drafting assistant for Saga Solutions Editorial Desk. Draft analysis; never publish it. Use only the supplied source material for factual claims. Separate VERIFIED FACT, INFERENCE, FORECAST, and UNRESOLVED. Do not invent sourcing, dates, quotes, access, exclusivity, or results. Seek a credible countercase. The editorial standard values novelty, evidence quality, operational consequence, and durable value. Return structured JSON only.`;

  const user = JSON.stringify({
    topic,
    source_material: sourceMaterial,
    required_flow: ['SIGNAL', 'EVIDENCE', 'WHAT CHANGES', 'COUNTERCASE', 'WHAT TO DO NEXT', 'SOURCES'],
  });

  const schema = {
    type: 'object',
    additionalProperties: false,
    required: ['title', 'dek', 'category', 'claims', 'sections', 'key_takeaways', 'countercase', 'operational_implications', 'source_urls', 'editorial_score', 'human_review_required'],
    properties: {
      title: { type: 'string' },
      dek: { type: 'string' },
      category: { type: 'string' },
      claims: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          required: ['claim', 'status', 'source_url'],
          properties: {
            claim: { type: 'string' },
            status: { type: 'string', enum: ['verified_fact', 'inference', 'forecast', 'unresolved'] },
            source_url: { type: ['string', 'null'] },
          },
        },
      },
      sections: {
        type: 'array',
        items: {
          type: 'object',
          additionalProperties: false,
          required: ['label', 'text'],
          properties: { label: { type: 'string' }, text: { type: 'string' } },
        },
      },
      key_takeaways: { type: 'array', items: { type: 'string' } },
      countercase: { type: 'string' },
      operational_implications: { type: 'array', items: { type: 'string' } },
      source_urls: { type: 'array', items: { type: 'string' } },
      editorial_score: {
        type: 'object',
        additionalProperties: false,
        required: ['novelty', 'evidence_quality', 'operational_consequence', 'durable_value'],
        properties: {
          novelty: { type: 'integer', minimum: 0, maximum: 10 },
          evidence_quality: { type: 'integer', minimum: 0, maximum: 10 },
          operational_consequence: { type: 'integer', minimum: 0, maximum: 10 },
          durable_value: { type: 'integer', minimum: 0, maximum: 10 },
        },
      },
      human_review_required: { type: 'boolean', const: true },
    },
  };

  try {
    const response = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: MODEL,
        reasoning: { effort: 'medium' },
        text: {
          verbosity: 'medium',
          format: {
            type: 'json_schema',
            name: 'saga_editorial_draft',
            strict: true,
            schema,
          },
        },
        input: [
          { role: 'system', content: [{ type: 'input_text', text: system }] },
          { role: 'user', content: [{ type: 'input_text', text: user }] },
        ],
      }),
    });

    const payload = await response.json();
    if (!response.ok) {
      console.error('OpenAI editorial request failed', payload);
      return send(res, 502, { error: 'The editorial model request failed.' });
    }

    const outputText = payload.output_text || payload.output?.flatMap((item) => item.content || []).find((item) => item.type === 'output_text')?.text;
    if (!outputText) return send(res, 502, { error: 'The editorial model returned no draft text.' });

    const draft = JSON.parse(outputText);
    return send(res, 200, { model: MODEL, draft, publication_status: 'human_review_required' });
  } catch (error) {
    console.error('Editorial endpoint failed', error);
    return send(res, 500, { error: 'Editorial drafting is temporarily unavailable.' });
  }
}
