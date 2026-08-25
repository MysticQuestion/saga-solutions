# Saga Tech intelligence system

Saga Tech is a source-first technology intelligence publication inside Saga Systems. The system is designed to detect consequential technical developments, trace them backward to their primary evidence and enabling history, and publish explicitly labeled forecasts about what may follow.

## Public experience

- Index: `/tech`
- Article: `/tech/:slug`
- Article metadata: `public/tech/articles/index.json`
- Full article records: `public/tech/articles/:slug.json`
- Generated hero images: `public/tech/images/:slug.png`

The Tech interface is intentionally separate from the main portfolio interface. It uses its own editorial visual system and renders from structured article records rather than hard-coded story markup.

## Editorial system of record

The canonical working ledger is the Notion database **Saga Tech — Editorial Intelligence Ledger**.

Data source ID: `5876076e-af56-448e-a8cf-9bafb91bca16`

Each article is one database row and one full Notion page. Properties track status, field, signal/event/published dates, Saga Score, evidence score, forecast confidence/horizon, primary source, article/GitHub URLs, image brief, source verification, human review, read time, and tags.

The page body stores the deeper research packet:

1. why the signal matters now
2. source-quality assessment
3. historical lineage
4. claim ledger (`verified_fact`, `inference`, `forecast`, `unresolved`)
5. full article draft
6. forecast model with invalidators
7. countercase
8. watchlist
9. source ledger
10. image brief and editorial notes

## Automated research cycle

Workflow: `.github/workflows/saga-tech-agent.yml`

Default cadence: daily at `13:30 UTC`.

One run does the following:

1. Reads the existing Saga Tech index to avoid duplicate coverage.
2. Uses the OpenAI Responses API with web search to scan globally for a consequential signal.
3. Requires at least five sources, including at least two primary and two independent secondary sources.
4. Separates event date from reporting/publication date.
5. Reconstructs at least four causal historical predecessors.
6. Builds a claim ledger distinguishing verified fact, inference, forecast, and unresolved claims.
7. Rejects candidates below `7/10` for both evidence quality and Saga Signal Score.
8. Performs direct URL reachability checks as a secondary diagnostic. Bot blocking does not by itself invalidate a reputable source.
9. Generates a subject-specific 3:2 hero image with GPT Image 2.
10. Creates the full Notion editorial record with status `Review`.
11. Writes the article JSON, index entry, and image into a new Git branch.
12. Runs syntax checks and the production Vite build.
13. Opens a pull request containing an explicit human-review checklist.

Merging the pull request is the publication action.

## Publication sync

Workflow: `.github/workflows/saga-tech-publish-sync.yml`

When an article JSON file reaches `main`, the workflow finds the corresponding Notion row by slug and updates:

- Status → `Published`
- Human Review → checked
- Published Date → merge date
- Last Verified → merge date
- Article URL → `https://sagasystems.net/tech/:slug`

## Required GitHub Actions secrets

Two repository secrets are required before the scheduled agent can run:

- `OPENAI_API_KEY` — used for research/web search and image generation.
- `NOTION_API_KEY` — an internal/public Notion integration token with read/insert/update access to the Saga Tech database.

The Notion database must be shared with the Notion integration used by `NOTION_API_KEY`. The connected ChatGPT Notion app is not the same credential as a GitHub Actions Notion integration token.

Optional model overrides:

- `SAGA_TECH_MODEL` (default `gpt-5.6-terra`)
- `SAGA_TECH_IMAGE_MODEL` (default `gpt-image-2`)

## Source standard

A source is not considered reputable merely because it ranks well in search. Primary evidence should normally be one of:

- peer-reviewed paper or authoritative preprint
- laboratory/university research release tied to technical material
- standards body specification
- government science/technical record
- official dataset
- regulatory/public filing
- first-party engineering/research documentation
- patent or equivalent technical disclosure when genuinely relevant

Secondary evidence should be independent, attributable reporting or expert analysis with enough technical specificity to challenge or contextualize the primary source.

The agent is instructed to avoid content farms, unattributed reposts, SEO summaries, hype aggregators, and unsourced social posts.

## Forecasting standard

Forecasts must contain:

- time horizon
- confidence
- prediction
- causal basis
- observable invalidators

A compelling narrative is not sufficient evidence. If a forecast cannot be defended, the article should retain uncertainty rather than converting speculation into fact.

## Human review checklist

Before merge:

- open and verify every material primary source
- check that secondary sources support the claims attributed to them
- verify event dates separately from publication dates
- review the historical causal chain
- confirm fact/inference/forecast boundaries
- inspect countercase and failure modes
- inspect the generated image for technical plausibility or misleading implications
- approve title, dek, article language, and source ledger

## Design direction

Saga Tech uses cinematic scientific editorialism rather than conventional technology-news styling: black and graphite surfaces, mineral white typography, restrained deep-red signal accents, large editorial serif headlines, dense provenance metadata, and generated imagery tied directly to the technical subject.
