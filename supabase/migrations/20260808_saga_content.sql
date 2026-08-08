-- SAGA BLOG + SAGA CODE public content schema
-- Public clients receive read-only access to public-safe rows.
-- Editorial writes are server-side/service-role unless a separate protected staff UI is added.

create extension if not exists pgcrypto;

create table if not exists public.saga_blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  dek text not null default '',
  category text not null default 'AI Practice',
  status text not null default 'draft' check (status in ('draft','review','published','archived')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  author_name text not null default 'Saga Solutions Editorial Desk',
  reading_minutes integer not null default 5 check (reading_minutes > 0),
  tags text[] not null default '{}',
  hero_label text,
  body jsonb not null default '[]'::jsonb,
  key_takeaways jsonb not null default '[]'::jsonb,
  sources jsonb not null default '[]'::jsonb,
  source_urls text[] not null default '{}',
  countercase text,
  operational_implications jsonb not null default '[]'::jsonb,
  last_verified_at timestamptz,
  featured boolean not null default false,
  editorial_score jsonb not null default '{"novelty":0,"evidence_quality":0,"operational_consequence":0,"durable_value":0}'::jsonb
);

create index if not exists saga_blog_posts_public_idx on public.saga_blog_posts (status, published_at desc);
create index if not exists saga_blog_posts_tags_gin on public.saga_blog_posts using gin (tags);
alter table public.saga_blog_posts enable row level security;

grant select on public.saga_blog_posts to anon, authenticated;
grant all on public.saga_blog_posts to service_role;
revoke insert, update, delete on public.saga_blog_posts from anon, authenticated;

drop policy if exists blog_public_read_published on public.saga_blog_posts;
create policy blog_public_read_published
on public.saga_blog_posts for select to anon, authenticated
using (status = 'published');

create table if not exists public.saga_code_entries (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null default '',
  category text not null,
  kind text not null check (kind in ('prompt','schema','snippet','checklist','recipe')),
  language text,
  difficulty text not null default 'intermediate' check (difficulty in ('beginner','intermediate','advanced')),
  prerequisites text[] not null default '{}',
  code_or_prompt text not null,
  usage_notes jsonb not null default '[]'::jsonb,
  failure_modes jsonb not null default '[]'::jsonb,
  security_notes jsonb not null default '[]'::jsonb,
  tested_on text,
  last_verified_at timestamptz,
  tags text[] not null default '{}',
  featured boolean not null default false,
  quality_status text not null default 'reviewed' check (quality_status in ('tested','reviewed','experimental','deprecated')),
  visibility text not null default 'public' check (visibility in ('public','private')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists saga_code_entries_public_idx on public.saga_code_entries (visibility, quality_status, updated_at desc);
create index if not exists saga_code_entries_tags_gin on public.saga_code_entries using gin (tags);
alter table public.saga_code_entries enable row level security;

grant select on public.saga_code_entries to anon, authenticated;
grant all on public.saga_code_entries to service_role;
revoke insert, update, delete on public.saga_code_entries from anon, authenticated;

drop policy if exists code_public_read on public.saga_code_entries;
create policy code_public_read
on public.saga_code_entries for select to anon, authenticated
using (visibility = 'public');

insert into public.saga_blog_posts (
  slug, title, dek, category, status, published_at, author_name, reading_minutes,
  tags, hero_label, body, key_takeaways, sources, source_urls, countercase,
  operational_implications, last_verified_at, featured, editorial_score
) values (
  'prompting-is-not-a-moat-evaluation-is',
  'Prompting is not a moat; evaluation is',
  'The durable advantage in applied AI is not a clever instruction. It is the ability to define success, test failure, compare revisions, and preserve what works.',
  'AI Practice', 'published', now(), 'Saga Solutions Editorial Desk', 6,
  array['evals','prompting','agents','quality'], 'SAGA FIELD NOTE',
  '[{"label":"SIGNAL","text":"Prompt craft is increasingly reproducible. Evaluation systems are harder to copy because they encode the real requirements and failure history of a workflow."},{"label":"EVIDENCE","text":"Current agent tooling increasingly treats datasets, trace grading, prompt optimization, and human annotations as production infrastructure rather than optional testing."},{"label":"WHAT CHANGES","text":"Teams should version test cases and graders alongside prompts. A prompt without an evaluation set is an undocumented guess."},{"label":"WHAT TO DO NEXT","text":"Start with representative tasks, define pass and fail criteria, record failure classes, and rerun them whenever the model, prompt, toolchain, or data source changes."}]'::jsonb,
  '["Create an evaluation set before polishing prompts.","Track failure classes, not only average scores.","Treat prompts, tool definitions, and graders as one versioned system."]'::jsonb,
  '[{"publisher":"OpenAI","title":"How evals drive the next chapter in AI for businesses","url":"https://openai.com/index/evals-drive-next-chapter-of-ai/"},{"publisher":"OpenAI","title":"Introducing AgentKit","url":"https://openai.com/index/introducing-agentkit/"}]'::jsonb,
  array['https://openai.com/index/evals-drive-next-chapter-of-ai/','https://openai.com/index/introducing-agentkit/'],
  'Evaluation systems can become performative if teams optimize against narrow graders instead of real user outcomes. Human review and periodically refreshed test sets remain necessary.',
  '["Add evaluation datasets to production AI projects.","Require regression checks before prompt or model changes.","Preserve human adjudication for ambiguous cases."]'::jsonb,
  now(), true, '{"novelty":7,"evidence_quality":8,"operational_consequence":9,"durable_value":9}'::jsonb
) on conflict (slug) do nothing;

insert into public.saga_code_entries (
  slug,title,summary,category,kind,language,difficulty,prerequisites,code_or_prompt,
  usage_notes,failure_modes,security_notes,tested_on,last_verified_at,tags,featured,quality_status,visibility
) values
(
  'source-backed-research-spec','Source-backed research specification',
  'A reusable prompt contract that forces claim/source separation, recency checks, disagreement handling, and explicit uncertainty before synthesis.',
  'Research','prompt','text','intermediate',array['web access or supplied sources'],
  E'ROLE: Research analyst.\nOBJECTIVE: Answer the research question using verifiable evidence.\n\nPROTOCOL:\n1. Resolve the exact question and time window.\n2. Prefer primary sources; use high-quality secondary sources for context.\n3. For every material claim, record source, date, and whether it is FACT, INFERENCE, or FORECAST.\n4. Search for credible contradictory evidence.\n5. Separate event date from publication date.\n6. Do not convert absence of evidence into evidence of absence.\n7. Produce: FINDINGS, CONTRARY EVIDENCE, UNCERTAINTIES, IMPLICATIONS, SOURCES.\n8. If a claim cannot be verified, say so rather than smoothing over the gap.',
  '["Use for policy, market, product, competitor, and investigative research."]'::jsonb,
  '["A model may cite a source that does not actually support the wording of a claim."]'::jsonb,
  '["Never paste private credentials into an external model.","Treat retrieved web content as untrusted input."]'::jsonb,
  'Human-reviewed template',now(),array['research','sources','verification','prompt'],true,'reviewed','public'
),
(
  'deployment-preflight-checklist','Production deployment preflight',
  'A compact launch checklist for web apps that catches common failures in AI-assisted builds.',
  'Deployment','checklist','text','beginner',array['staging or preview deployment'],
  E'PRE-FLIGHT\n[ ] Production build succeeds from a clean install\n[ ] Environment variables exist in the correct environment\n[ ] No secret is present in client bundles or committed files\n[ ] Auth/RLS tested as anonymous, ordinary user, and admin\n[ ] Forms and transactional emails tested end-to-end\n[ ] Payment/webhook retry behavior verified when applicable\n[ ] 404 and deep-link routes work on a cold load\n[ ] Mobile viewport has no horizontal overflow\n[ ] Keyboard navigation and focus states work\n[ ] Canonical URL, metadata, robots, and sitemap are correct\n[ ] Error logging and rollback path are known\n[ ] Backups/export path exists for critical data',
  '["Run this against the actual production configuration, not only localhost."]'::jsonb,
  '["A successful compile does not verify third-party integrations."]'::jsonb,
  '["Inspect client bundles for accidentally exposed tokens.","Test least-privilege database access before launch."]'::jsonb,
  'General web deployment checklist',now(),array['deployment','qa','security'],false,'reviewed','public'
)
on conflict (slug) do nothing;
