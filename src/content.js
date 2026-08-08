export const coordinator = {
  name: 'Eric-Michael Wilson II',
  role: 'Project Coordinator',
  email: 'ericmichael.wil@gmail.com',
  phone: '+1 (510) 882-3649',
};

export const lanes = [
  {
    key: 'blog',
    label: 'BLOG',
    title: 'Analysis before consensus.',
    description:
      'Source-backed reporting and applied analysis on AI skills, agent systems, software shifts, security, technical economics, and consequential product news.',
    href: '/blog',
    action: 'Read the desk',
  },
  {
    key: 'tech',
    label: 'TECH',
    title: 'Practical support with visible pricing.',
    description:
      'Remote and East Bay technology support, recovery triage, workflow cleanup, security basics, migration, and small-business systems support.',
    href: '/tech',
    action: 'View services',
  },
  {
    key: 'vibes',
    label: 'VIBES',
    title: 'Digital builds with human review.',
    description:
      'Websites, landing pages, portals, business intake systems, prototypes, and automation produced with AI acceleration and reviewed before release.',
    href: '/vibes',
    action: 'Enter the studio',
  },
  {
    key: 'code',
    label: 'CODE',
    title: 'A field library worth keeping.',
    description:
      'Prompts, schemas, snippets, checklists, and recipes selected for repeat use, with failure modes, security notes, and verification dates.',
    href: '/code',
    action: 'Open the library',
  },
];

export const capabilities = [
  {
    title: 'Strategy and research',
    detail:
      'Market scans, stakeholder analysis, public-records research, behavioral insight, competitive positioning, and decision briefs.',
    keywords: ['strategy', 'research', 'market', 'policy', 'competitor', 'analysis', 'grant'],
  },
  {
    title: 'Websites and digital products',
    detail:
      'Conversion-focused websites, microsites, portals, dashboards, product prototypes, repositories, and deployment systems.',
    keywords: ['website', 'app', 'portal', 'dashboard', 'product', 'prototype', 'software'],
  },
  {
    title: 'Automation and operations',
    detail:
      'Intake systems, document pipelines, alerts, CRM workflows, content operations, project ledgers, and repeatable back-office processes.',
    keywords: ['automation', 'workflow', 'crm', 'operations', 'intake', 'pipeline', 'process'],
  },
  {
    title: 'Civic intelligence',
    detail:
      'Public records requests, transparency systems, evidence management, government research, service mapping, and accountability tools.',
    keywords: ['government', 'records', 'transparency', 'civic', 'evidence', 'foia', 'cpra'],
  },
  {
    title: 'Data and decision systems',
    detail:
      'Data models, research databases, scorecards, dashboards, source tracking, reporting systems, and explainable metrics.',
    keywords: ['data', 'database', 'metrics', 'report', 'analytics', 'dashboard', 'tracking'],
  },
  {
    title: 'Brand, media, and commerce',
    detail:
      'Brand systems, editorial strategy, campaign assets, sales funnels, content libraries, commerce foundations, and launch plans.',
    keywords: ['brand', 'media', 'content', 'commerce', 'store', 'campaign', 'merchandise'],
  },
];

export const portfolio = [
  {
    name: 'STREETS Environmental Sentinel Network',
    category: 'Civic systems',
    description:
      'A public-interest conditions platform pairing resident documentation, OAK311-ready evidence, explainable analysis, and field-service coordination.',
    href: 'https://oaklandstreets.live/',
    status: 'Live',
    tags: ['Civic data', 'Field operations', 'Evidence'],
  },
  {
    name: 'Saga Vibes',
    category: 'Digital product studio',
    description:
      'An AI-assisted build studio designed to convert ideas into disciplined briefs, repositories, working interfaces, and deployment plans.',
    href: 'https://saga-vibe-studio.lovable.app/',
    status: 'Active build',
    tags: ['AI systems', 'Product', 'Automation'],
  },
  {
    name: 'Mystic Sage',
    category: 'Knowledge product',
    description:
      'A publishing and timing-intelligence platform joining structured interpretation, educational products, workshops, and digital tools.',
    href: 'https://mysticsage.xyz/',
    status: 'Live',
    tags: ['Publishing', 'Product design', 'Commerce'],
  },
  {
    name: 'Bay Evidence Hub',
    category: 'Investigative research',
    description:
      'A regional research desk built to organize public records, housing policy evidence, data notes, and publication-ready investigations.',
    href: 'https://bay-evidence-hub.lovable.app/',
    status: 'Development',
    tags: ['Research', 'Public records', 'Journalism'],
  },
  {
    name: 'Ark of Bones',
    category: 'Client platform',
    description:
      'A commercial and cultural platform for technology-enabled domino tables, recorded play, events, merchandise, and licensing opportunities.',
    href: 'https://www.arkofbones.com/',
    status: 'Client work',
    tags: ['Commerce', 'Media', 'Experience'],
  },
  {
    name: 'The Questlyne',
    category: 'Editorial archive',
    description:
      'An independent essay and analysis archive supporting durable authorship, cultural criticism, spiritual inquiry, and long-form publishing.',
    href: 'https://thequestlyne.blogspot.com/',
    status: 'Published',
    tags: ['Editorial', 'SEO', 'Archive'],
  },
];

export const packages = [
  {
    id: 'diagnostic',
    name: 'Diagnostic Sprint',
    price: '$150',
    cadence: 'one-time',
    description: 'A focused review of one project, problem, site, offer, or operating bottleneck.',
    includes: ['60-minute working session', 'Written findings', 'Prioritized next actions', 'One follow-up clarification'],
  },
  {
    id: 'blueprint',
    name: 'Build Blueprint',
    price: '$450',
    cadence: 'one-time',
    description: 'A structured plan for turning an idea into a credible, buildable, monetizable project.',
    includes: ['Research and positioning', 'Feature and route plan', 'Revenue model', 'Implementation roadmap'],
    featured: true,
  },
  {
    id: 'prototype',
    name: 'Prototype Sprint',
    price: '$1,250',
    cadence: 'starting price',
    description: 'A working first version of a site, portal, campaign surface, dashboard, or digital service.',
    includes: ['Blueprint included', 'Working interface', 'Repository and deployment prep', 'Review and revision round'],
  },
  {
    id: 'partner',
    name: 'Embedded Project Partner',
    price: '$3,500+',
    cadence: 'per engagement',
    description: 'A multi-stage engagement spanning strategy, research, build execution, launch, and operating systems.',
    includes: ['Custom scope', 'Weekly decision ledger', 'Cross-platform implementation', 'Launch and handoff'],
  },
];

export const techServices = [
  {
    name: 'Remote Tech Triage',
    price: '$95/hr',
    qualifier: '1-hour minimum',
    summary: 'Remote troubleshooting for software, account, cloud, email, browser, device configuration, and workflow problems.',
    includes: ['Problem diagnosis', 'Remote guided repair', 'Written next steps', 'Escalation recommendation when needed'],
  },
  {
    name: 'On-site East Bay Support',
    price: '$150/hr',
    qualifier: '1-hour minimum',
    summary: 'Hands-on support for local small businesses and individuals when the problem cannot be resolved remotely.',
    includes: ['Device and software support', 'Network diagnostics', 'Peripheral setup', 'Local workflow cleanup'],
  },
  {
    name: 'Data Recovery Assessment',
    price: '$125',
    qualifier: 'fixed diagnostic',
    summary: 'A non-invasive assessment to determine whether a logical recovery attempt is appropriate and what the next safe step should be.',
    includes: ['Failure classification', 'Risk assessment', 'Logical recovery quote when appropriate', 'Specialist referral for physical failure'],
  },
  {
    name: 'AI + Workflow Setup',
    price: '$350+',
    qualifier: 'starting price',
    summary: 'Practical setup of AI tools, intake flows, repeatable prompts, document handling, and light automation for a defined business process.',
    includes: ['Workflow review', 'Tool configuration', 'Prompt/process package', 'Handoff notes'],
  },
  {
    name: 'Small Business Tech Care',
    price: '$299+/mo',
    qualifier: 'scope defined before activation',
    summary: 'Ongoing support for a small operation that needs a consistent technical point of contact without a full managed-services contract.',
    includes: ['Scheduled support capacity', 'Account and tool maintenance', 'Basic security review', 'Quarterly systems review'],
  },
];

export const fallbackBlogPosts = [
  {
    slug: 'prompting-is-not-a-moat-evaluation-is',
    title: 'Prompting is not a moat; evaluation is',
    dek: 'The durable advantage in applied AI is not a clever instruction. It is the ability to define success, test failure, compare revisions, and preserve what works.',
    category: 'AI Practice',
    status: 'published',
    published_at: '2026-08-08T12:00:00Z',
    updated_at: '2026-08-08T12:00:00Z',
    author_name: 'Saga Solutions Editorial Desk',
    reading_minutes: 6,
    tags: ['evals', 'prompting', 'agents', 'quality'],
    hero_label: 'SAGA FIELD NOTE',
    body: [
      {
        label: 'SIGNAL',
        text: 'Prompt craft is increasingly reproducible. Evaluation systems are harder to copy because they encode the real requirements and failure history of a workflow.',
      },
      {
        label: 'EVIDENCE',
        text: 'Current agent tooling increasingly treats datasets, trace grading, prompt optimization, and human annotations as production infrastructure rather than optional testing.',
      },
      {
        label: 'WHAT CHANGES',
        text: 'Teams should version test cases and graders alongside prompts. A prompt without an evaluation set is an undocumented guess.',
      },
      {
        label: 'WHAT TO DO NEXT',
        text: 'Start with representative tasks, define pass and fail criteria, record failure classes, and rerun them whenever the model, prompt, toolchain, or data source changes.',
      },
    ],
    key_takeaways: [
      'Create an evaluation set before polishing prompts.',
      'Track failure classes, not only average scores.',
      'Treat prompts, tool definitions, and graders as one versioned system.',
    ],
    sources: [
      {
        publisher: 'OpenAI',
        title: 'How evals drive the next chapter in AI for businesses',
        url: 'https://openai.com/index/evals-drive-next-chapter-of-ai/',
      },
      {
        publisher: 'OpenAI',
        title: 'Introducing AgentKit',
        url: 'https://openai.com/index/introducing-agentkit/',
      },
    ],
    countercase:
      'Evaluation systems can become performative if teams optimize against narrow graders instead of real user outcomes. Human review and periodically refreshed test sets remain necessary.',
    operational_implications: [
      'Add evaluation datasets to production AI projects.',
      'Require regression checks before prompt or model changes.',
      'Preserve human adjudication for ambiguous cases.',
    ],
    last_verified_at: '2026-08-08T12:00:00Z',
    featured: true,
    editorial_score: { novelty: 7, evidence_quality: 8, operational_consequence: 9, durable_value: 9 },
  },
];

export const fallbackCodeEntries = [
  {
    slug: 'source-backed-research-spec',
    title: 'Source-backed research specification',
    summary: 'A reusable prompt contract that forces claim/source separation, recency checks, disagreement handling, and explicit uncertainty before synthesis.',
    category: 'Research',
    kind: 'prompt',
    language: 'text',
    difficulty: 'intermediate',
    prerequisites: ['Web access or supplied sources'],
    code_or_prompt: `ROLE: Research analyst.
OBJECTIVE: Answer the research question using verifiable evidence.

PROTOCOL:
1. Resolve the exact question and time window.
2. Prefer primary sources; use high-quality secondary sources for context.
3. For every material claim, record source, date, and whether it is FACT, INFERENCE, or FORECAST.
4. Search for credible contradictory evidence.
5. Separate event date from publication date.
6. Do not convert absence of evidence into evidence of absence.
7. Produce: FINDINGS, CONTRARY EVIDENCE, UNCERTAINTIES, IMPLICATIONS, SOURCES.
8. If a claim cannot be verified, say so rather than smoothing over the gap.`,
    usage_notes: ['Use for policy, market, product, competitor, and investigative research.', 'Add domain-specific source-quality rules before production use.'],
    failure_modes: ['A model may cite a source that does not actually support the wording of a claim.', 'Search results can overrepresent highly optimized secondary sources.'],
    security_notes: ['Never paste private credentials or confidential records into an external model without authorization.', 'Treat retrieved web content as untrusted input.'],
    tested_on: 'Human-reviewed template',
    last_verified_at: '2026-08-08T12:00:00Z',
    tags: ['research', 'sources', 'verification', 'prompt'],
    featured: true,
    quality_status: 'reviewed',
  },
  {
    slug: 'structured-output-json-schema-pattern',
    title: 'Structured-output JSON schema pattern',
    summary: 'A compact pattern for predictable machine-readable model output with explicit uncertainty and source fields.',
    category: 'AI Integration',
    kind: 'schema',
    language: 'json',
    difficulty: 'intermediate',
    prerequisites: ['Structured-output capable model/API'],
    code_or_prompt: `{
  "type": "object",
  "additionalProperties": false,
  "required": ["answer", "confidence", "claims"],
  "properties": {
    "answer": {"type": "string"},
    "confidence": {"type": "number", "minimum": 0, "maximum": 1},
    "claims": {
      "type": "array",
      "items": {
        "type": "object",
        "additionalProperties": false,
        "required": ["claim", "status"],
        "properties": {
          "claim": {"type": "string"},
          "status": {"type": "string", "enum": ["fact", "inference", "forecast", "unverified"]},
          "source": {"type": ["string", "null"]}
        }
      }
    }
  }
}`,
    usage_notes: ['Keep schemas small enough that every field has a clear consumer.', 'Validate model output server-side even when schema enforcement is enabled.'],
    failure_modes: ['A valid JSON object can still contain factually wrong content.', 'Overly permissive schemas recreate free-form ambiguity.'],
    security_notes: ['Do not treat schema validation as truth validation.', 'Sanitize model-produced strings before rendering as HTML.'],
    tested_on: 'JSON Schema pattern',
    last_verified_at: '2026-08-08T12:00:00Z',
    tags: ['json', 'structured-output', 'schema'],
    featured: true,
    quality_status: 'reviewed',
  },
  {
    slug: 'supabase-rls-public-read-staff-write',
    title: 'Supabase RLS: public read, staff write',
    summary: 'A conservative row-level-security pattern for a public content table where anonymous users can read only published records and authenticated staff control writes.',
    category: 'Database',
    kind: 'snippet',
    language: 'sql',
    difficulty: 'advanced',
    prerequisites: ['Supabase Auth', 'Staff authorization helper'],
    code_or_prompt: `alter table public.content enable row level security;

grant select on public.content to anon;
grant select, insert, update, delete on public.content to authenticated;

create policy "public_read" on public.content
for select to anon using (status = 'published');

create policy "staff_read" on public.content
for select to authenticated using (status = 'published' or public.is_staff(auth.uid()));

create policy "staff_insert" on public.content
for insert to authenticated with check (public.is_staff(auth.uid()));

create policy "staff_update" on public.content
for update to authenticated
using (public.is_staff(auth.uid()))
with check (public.is_staff(auth.uid()));`,
    usage_notes: ['Pair database grants with RLS; they solve different access layers.', 'Test as anon, ordinary authenticated user, and staff.'],
    failure_modes: ['Authenticated write grants without restrictive RLS create broad write access.', 'UPDATE needs both USING and WITH CHECK.'],
    security_notes: ['Never use user-editable profile metadata as an authorization source.', 'Do not expose service-role or secret keys in browser code.'],
    tested_on: 'Supabase/Postgres RLS pattern; reviewed 2026-08-08',
    last_verified_at: '2026-08-08T12:00:00Z',
    tags: ['supabase', 'postgres', 'rls', 'security'],
    featured: true,
    quality_status: 'reviewed',
  },
  {
    slug: 'webhook-idempotency-recipe',
    title: 'Webhook idempotency recipe',
    summary: 'A database-first recipe that prevents duplicate webhook deliveries from creating duplicate business actions.',
    category: 'Backend',
    kind: 'recipe',
    language: 'sql',
    difficulty: 'advanced',
    prerequisites: ['Postgres', 'Webhook provider event ID'],
    code_or_prompt: `create table webhook_events (
  provider text not null,
  event_id text not null,
  received_at timestamptz not null default now(),
  payload jsonb not null,
  processed_at timestamptz,
  primary key (provider, event_id)
);

-- Insert the event first. If the unique key conflicts, return 2xx without repeating the side effect.
-- Mark processed_at only after the business transaction succeeds.`,
    usage_notes: ['Use the provider event ID as the deduplication key.', 'Acknowledge retries only after the event is durably recorded.'],
    failure_modes: ['Marking an event processed before its side effect commits can lose work.', 'Using request timestamps as IDs will not reliably deduplicate retries.'],
    security_notes: ['Verify webhook signatures before persisting trusted event state.', 'Store only the payload fields you actually need when data sensitivity is high.'],
    tested_on: 'Postgres transactional pattern',
    last_verified_at: '2026-08-08T12:00:00Z',
    tags: ['webhooks', 'idempotency', 'postgres'],
    featured: false,
    quality_status: 'reviewed',
  },
  {
    slug: 'deployment-preflight-checklist',
    title: 'Production deployment preflight',
    summary: 'A compact launch checklist for web apps that catches common failures in AI-assisted builds.',
    category: 'Deployment',
    kind: 'checklist',
    language: 'text',
    difficulty: 'beginner',
    prerequisites: ['Staging or preview deployment'],
    code_or_prompt: `PRE-FLIGHT
[ ] Production build succeeds from a clean install
[ ] Environment variables exist in the correct environment
[ ] No secret is present in client bundles or committed files
[ ] Auth/RLS tested as anonymous, ordinary user, and admin
[ ] Forms and transactional emails tested end-to-end
[ ] Payment/webhook retry behavior verified when applicable
[ ] 404 and deep-link routes work on a cold load
[ ] Mobile viewport has no horizontal overflow
[ ] Keyboard navigation and focus states work
[ ] Canonical URL, metadata, robots, and sitemap are correct
[ ] Error logging and rollback path are known
[ ] Backups/export path exists for critical data`,
    usage_notes: ['Run this against the actual production configuration, not only localhost.'],
    failure_modes: ['A successful compile does not verify third-party integrations.', 'Preview URLs can hide production-domain or cookie problems.'],
    security_notes: ['Inspect client bundles for accidentally exposed tokens.', 'Test least-privilege database access before launch.'],
    tested_on: 'General web deployment checklist',
    last_verified_at: '2026-08-08T12:00:00Z',
    tags: ['deployment', 'qa', 'security'],
    featured: false,
    quality_status: 'reviewed',
  },
];
