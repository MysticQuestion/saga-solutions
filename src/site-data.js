export const company = {
  name: 'Saga Systems',
  domain: 'SagaSystems.net',
  email: 'info@sagasystems.net',
  location: 'Oakland, California',
  description:
    'Independent digital systems, applied intelligence, research infrastructure, automation, and creative technology.',
};

export const systems = [
  {
    id: 'digital',
    index: '01',
    title: 'Digital systems',
    detail: 'Applications, microsites, dashboards, client portals, data interfaces, interactive publications, and product surfaces.',
  },
  {
    id: 'ai',
    index: '02',
    title: 'Applied AI',
    detail: 'Agents, model-assisted workflows, knowledge systems, retrieval, prompt architecture, document intelligence, and evaluation.',
  },
  {
    id: 'research',
    index: '03',
    title: 'Research + intelligence',
    detail: 'OSINT, public records, evidence repositories, monitoring, editorial systems, civic datasets, and maintained research infrastructure.',
  },
  {
    id: 'automation',
    index: '04',
    title: 'Automation',
    detail: 'APIs, CRM workflows, publishing systems, email, alerts, scheduled intelligence, document pipelines, and operational handoffs.',
  },
  {
    id: 'creative',
    index: '05',
    title: 'Creative technology',
    detail: 'Interactive storytelling, generative media, digital publications, motion systems, brand environments, and experimental interfaces.',
  },
  {
    id: 'infrastructure',
    index: '06',
    title: 'Infrastructure',
    detail: 'Vercel, Supabase, GitHub, OpenAI, cloud services, deployment architecture, security boundaries, and maintainable production systems.',
  },
];

export const projects = [
  {
    slug: 'neural-breach',
    name: 'Neural Breach',
    category: 'Immersive digital experience',
    status: 'Prototype',
    href: null,
    accent: '#a64dff',
    surface: '#130d18',
    ink: '#f8f3ff',
    visual: 'breach',
    summary:
      'An immersive web environment that uses an opening film, sequenced interface states, and deliberately non-standard landing architecture as part of the product experience.',
    proof: [
      {
        title: 'Opening film as interface',
        text: 'Motion establishes the visual grammar before navigation appears. The sequence is treated as product architecture rather than a decorative hero video.',
      },
      {
        title: 'Sequenced entry states',
        text: 'The landing experience controls pacing, transitions, and information reveal instead of presenting every destination at once.',
      },
      {
        title: 'Identity through interaction',
        text: 'Typography, movement, sound direction, and interface behavior are designed as one system rather than separate brand assets.',
      },
    ],
    demonstrates: ['Motion direction', 'Creative development', 'Narrative UX', 'Experimental front-end architecture'],
    architecture: ['Opening media layer', 'Sequenced state machine', 'Reduced-motion fallback', 'Responsive interaction shell'],
  },
  {
    slug: 'ark-of-bones',
    name: 'Ark of Bones',
    category: 'Commerce + cultural technology',
    status: 'Production',
    href: 'https://www.arkofbones.com/',
    accent: '#d3a85a',
    surface: '#15130f',
    ink: '#fff8e8',
    visual: 'domino',
    summary:
      'A commerce and cultural platform organized around technology-enabled domino tables, recorded play, events, merchandise, and future licensing pathways.',
    proof: [
      {
        title: 'Domino loading sequence',
        text: 'A familiar game object replaces the generic spinner. Even the waiting state reinforces the physical product and cultural context of the platform.',
      },
      {
        title: 'Commerce without flattening the culture',
        text: 'Product, media, event, and story layers remain distinct while still sharing one operating system.',
      },
      {
        title: 'Expansion-ready structure',
        text: 'The platform can support product catalog, event programming, recorded play, membership, and licensing without forcing them into one page type.',
      },
    ],
    demonstrates: ['Custom microinteraction', 'Commerce architecture', 'Cultural product design', 'Expandable information architecture'],
    architecture: ['Product catalog', 'Commerce flow', 'Event layer', 'Media system', 'Licensing pathway'],
  },
  {
    slug: 'oakland-streets',
    name: 'Oakland STREETS',
    category: 'Civic technology + field intelligence',
    status: 'Pilot',
    href: 'https://oaklandstreets.live/',
    accent: '#43a66b',
    surface: '#0d1712',
    ink: '#f0fff5',
    visual: 'streets',
    summary:
      'A public-interest environmental conditions system that connects field observations, privacy review, corridor analysis, human verification, recurrence tracking, and partner reporting.',
    proof: [
      {
        title: 'Recurrence instead of closure',
        text: 'The system distinguishes an administrative closure from durable resolution by tracking whether conditions return over time.',
      },
      {
        title: 'Conditions, not people',
        text: 'Privacy review and human verification are built into the operating model so the platform documents environmental conditions without becoming a surveillance product.',
      },
      {
        title: 'Corridor intelligence',
        text: 'Individual observations become longitudinal evidence that can reveal hotspots, service patterns, and unresolved conditions across a corridor.',
      },
    ],
    demonstrates: ['Civic product design', 'Geospatial interfaces', 'Privacy-by-design', 'Field verification', 'Operational analytics'],
    architecture: ['Observation intake', 'Privacy + safety review', 'Location model', 'Recurrence analysis', 'Partner + public reporting'],
  },
  {
    slug: 'bay-evidence',
    name: 'Bay Evidence',
    category: 'Investigative research infrastructure',
    status: 'Production',
    href: 'https://bayevidence.com/',
    accent: '#3d6e9f',
    surface: '#0d131b',
    ink: '#f2f7ff',
    visual: 'evidence',
    summary:
      'A regional evidence desk for public records, source provenance, jurisdiction comparison, maintained research, corrections, and publication-ready civic reporting.',
    proof: [
      {
        title: 'Source provenance remains visible',
        text: 'Evidence is treated as addressable infrastructure. Records, claims, jurisdictions, and publication outputs can be traced instead of disappearing into a summary.',
      },
      {
        title: 'Nine-county comparative research',
        text: 'The information architecture supports local detail while preserving cross-jurisdiction comparison across the Bay Area.',
      },
      {
        title: 'Maintenance is part of publication',
        text: 'Corrections, updates, source changes, and unresolved evidence are designed into the research system rather than handled as exceptions.',
      },
    ],
    demonstrates: ['Evidence architecture', 'OSINT workflow design', 'Editorial systems', 'Data provenance', 'Civic intelligence'],
    architecture: ['Source registry', 'Jurisdiction + topic model', 'Research workflow', 'Public evidence interface', 'Corrections ledger'],
  },
  {
    slug: 'aethos',
    name: 'Aethos',
    category: 'Symbolic intelligence',
    status: 'Prototype',
    href: 'https://mysticsage.xyz/aethos',
    accent: '#665bd8',
    surface: '#111020',
    ink: '#f4f2ff',
    visual: 'aethos',
    summary:
      'A structured interpretation system for natal-chart, timing, and symbolic data that separates source inputs, interpretive logic, synthesis, and user-facing guidance.',
    proof: [
      {
        title: 'The chart stays central',
        text: 'The natal chart is treated as the primary analytical object rather than decorative astrology imagery surrounding generic text generation.',
      },
      {
        title: 'Transparent interpretation',
        text: 'The system is designed to show the components that produced an interpretation so symbolic reasoning can be inspected rather than presented as unexplained authority.',
      },
      {
        title: 'Synthesis across systems',
        text: 'Multiple symbolic inputs can be consolidated into a coherent report without erasing the distinctions between their source traditions and methods.',
      },
    ],
    demonstrates: ['Complex data visualization', 'Structured generation', 'Interpretation systems', 'Report architecture'],
    architecture: ['Chart input layer', 'Symbolic rules engine', 'Synthesis layer', 'Methodology record', 'Report + journal surfaces'],
  },
  {
    slug: 'mystic-sage',
    name: 'Mystic Sage',
    category: 'Knowledge + workshop publishing',
    status: 'Production',
    href: 'https://mysticsage.xyz/',
    accent: '#8c5f44',
    surface: '#17110d',
    ink: '#fff7ef',
    visual: 'sage',
    summary:
      'A publishing and educational system supporting long-form workshops, structured curricula, participant materials, assessments, symbolic tools, and digital products.',
    proof: [
      {
        title: 'Long-form learning architecture',
        text: 'Workshops are designed as structured systems with modules, apparatus, exercises, standards, and participant artifacts rather than thin content pages.',
      },
      {
        title: 'Traditional priority with method transparency',
        text: 'Material can distinguish historical doctrine, modern additions, interpretation, and uncertainty without collapsing them into one voice.',
      },
      {
        title: 'Publishing across formats',
        text: 'The same knowledge system can support web lessons, downloadable materials, workshops, reports, and interactive tools.',
      },
    ],
    demonstrates: ['Knowledge architecture', 'Educational publishing', 'Structured curriculum design', 'Digital product systems'],
    architecture: ['Workshop hub', 'Module system', 'Assessment layer', 'Downloadable materials', 'Publishing + commerce'],
  },
  {
    slug: 'saga-vibes',
    name: 'Saga Vibes Studio',
    category: 'Prompt-driven production environment',
    status: 'Prototype',
    href: null,
    accent: '#0088a8',
    surface: '#08161a',
    ink: '#effcff',
    visual: 'vibes',
    summary:
      'An in-house visual production environment intended to turn project prompts into structured briefs, site architecture, agent tasks, editable interface states, and deployment-ready work.',
    proof: [
      {
        title: 'Prompt to operating brief',
        text: 'The first useful output is not an uncontrolled generated page. It is an explicit project model: audience, objective, structure, integrations, constraints, and owner decisions.',
      },
      {
        title: 'Agents as production roles',
        text: 'Design, copy, accessibility, technical architecture, deployment, and QA can be represented as coordinated responsibilities instead of one opaque generator.',
      },
      {
        title: 'Editable state over disposable generation',
        text: 'The studio is designed around persistent project state so outputs can be revised, compared, and handed off rather than regenerated from scratch each time.',
      },
    ],
    demonstrates: ['AI product architecture', 'Agent orchestration', 'Visual editor planning', 'Persistent project state'],
    architecture: ['Project configurator', 'Agent layer', 'Editable visual state', 'Repository bridge', 'Deployment handoff'],
  },
];

export const resourceGroups = [
  {
    label: 'Prompt Intelligence',
    status: 'Available',
    description: 'Reviewed prompt specifications with use cases, failure modes, and quality notes.',
  },
  {
    label: 'Research Methods',
    status: 'Expanding',
    description: 'Source discipline, evidence handling, verification, OSINT, and structured research protocols.',
  },
  {
    label: 'Templates + Documents',
    status: 'Expanding',
    description: 'Reusable briefs, specifications, operating documents, worksheets, and system records.',
  },
];

export const intelligenceItems = [
  {
    type: 'AI practice',
    title: 'Evaluation is infrastructure, not cleanup',
    summary: 'Prompt quality becomes durable only when the workflow includes test cases, failure classes, regression checks, and human adjudication.',
  },
  {
    type: 'Systems note',
    title: 'A prototype should expose its boundaries',
    summary: 'Public prototypes become more credible when the interface states what is live, simulated, reserved, and still dependent on human review.',
  },
  {
    type: 'Research practice',
    title: 'Maintenance belongs inside the evidence model',
    summary: 'Corrections, source changes, version history, and unresolved claims should be first-class records in maintained public-interest research.',
  },
];

export const lexicon = {
  date: 'AUG 18',
  word: 'aporia',
  pronunciation: 'ə-ˈpȯr-ē-ə',
  definition: 'A genuine state of uncertainty or puzzlement, especially after competing lines of reasoning have reached an impasse.',
  example: 'The meeting achieved aporia by 10:14 a.m., which was still more measurable progress than the previous three meetings.',
};
