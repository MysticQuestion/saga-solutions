# Saga Solutions editorial operating flow

SAGA BLOG is not designed as a high-volume AI-news feed. The operating goal is to publish material that changes how a reader interprets a technical shift or acts on it.

## Editorial sequence

1. **Candidate signal** — record the question, event, product change, skill shift, or operating pattern worth examining.
2. **Source packet** — gather primary sources first, then strong secondary reporting for context. Record publication date separately from event date.
3. **Claim ledger** — label each material claim as `verified_fact`, `inference`, `forecast`, or `unresolved`.
4. **Draft** — structure the piece as SIGNAL → EVIDENCE → WHAT CHANGES → COUNTERCASE → WHAT TO DO NEXT → SOURCES.
5. **SAGA SIGNAL SCORE** — score novelty, evidence quality, operational consequence, and durable value from 0–10.
6. **Human review** — verify every cited source against the wording of the claim, remove unsupported certainty, and check whether credible contrary evidence was addressed.
7. **Publish** — only set `saga_blog_posts.status = 'published'` after review. Update `last_verified_at` when claims are rechecked.

## Optional OpenAI drafting endpoint

`POST /api/editorial-draft` is a private drafting helper. It is intentionally unusable unless both of these server-side variables exist:

- `OPENAI_API_KEY`
- `SAGA_EDITORIAL_TOKEN`

The model defaults to `gpt-5.6-terra` through `OPENAI_EDITORIAL_MODEL` and uses the Responses API with structured output.

The endpoint accepts a topic and a bounded `sourceMaterial` array containing URL, title, excerpt, and publication date. The model is instructed to use supplied material only for factual claims. The endpoint returns `publication_status: human_review_required` and never writes directly to the public database.

## Publication rule

AI can assist with extraction, classification, comparison, drafting, and revision. Publication remains a human editorial action. A valid JSON response is not evidence that the underlying claims are true.

## CODE curation rule

A SAGA CODE entry should not be added merely because it exists in a project. Each entry must state:

- what it does
- when to use it
- why it is useful
- failure modes
- security notes
- prerequisites
- tested-on context
- last verification date
- quality state: `tested`, `reviewed`, `experimental`, or `deprecated`

Deprecated material can remain available for historical context but should be clearly labeled and excluded from featured placement.
