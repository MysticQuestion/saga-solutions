export const company = {
  name: 'Saga Systems',
  domain: 'SagaSystems.net',
  email: 'info@sagasystems.net',
  location: 'Oakland, California',
  description:
    'Digital systems, applied AI, research infrastructure, automation, and creative technology.',
};

export const systems = [
  {
    id: 'digital',
    index: '01',
    title: 'Digital systems',
    detail: 'Applications, microsites, dashboards, client portals, data interfaces, and interactive publications.',
  },
  {
    id: 'ai',
    index: '02',
    title: 'Applied AI',
    detail: 'Agents, model-assisted workflows, retrieval, prompt architecture, document intelligence, and evaluation.',
  },
  {
    id: 'research',
    index: '03',
    title: 'Research + intelligence',
    detail: 'OSINT, public records, evidence repositories, monitoring, editorial systems, and civic datasets.',
  },
  {
    id: 'automation',
    index: '04',
    title: 'Automation',
    detail: 'APIs, CRM workflows, publishing systems, email, alerts, scheduled tasks, and document pipelines.',
  },
  {
    id: 'creative',
    index: '05',
    title: 'Creative technology',
    detail: 'Interactive storytelling, generative media, motion systems, digital publications, and experimental interfaces.',
  },
  {
    id: 'infrastructure',
    index: '06',
    title: 'Infrastructure',
    detail: 'Deployment, databases, repositories, cloud services, security boundaries, and production maintenance.',
  },
];

export const projects = [
  {
    slug: 'neural-breach',
    name: 'Neural Breach',
    category: 'Interactive media system',
    status: 'Prototype',
    href: 'https://neuralbreachbysaga.lovable.app',
    accent: '#a64dff',
    surface: '#130d18',
    ink: '#f8f3ff',
    visual: 'breach',
    summary:
      'A web prototype built around an opening film, timed interface states, and a non-standard entry sequence.',
    proof: [
      {
        title: 'Opening sequence',
        text: 'Full-screen muted video precedes the archive interface and includes a skip path.',
      },
      {
        title: 'Timed state change',
        text: 'The opening state fades out before the primary interface becomes available.',
      },
      {
        title: 'Motion layer',
        text: 'Scanlines, status text, media timing, and interface reveal are handled as one entry state.',
      },
    ],
    demonstrates: ['Opening media layer', 'Timed state control', 'Motion interface', 'Responsive front end'],
    architecture: ['Opening media layer', 'Sequenced state machine', 'Reduced-motion fallback', 'Responsive interaction shell'],
  },
  {
    slug: 'ark-of-bones',
    name: 'Ark of Bones',
    category: 'Commerce + cultural platform',
    status: 'Production',
    href: 'https://www.arkofbones.com/',
    accent: '#d3a85a',
    surface: '#15130f',
    ink: '#fff8e8',
    visual: 'domino',
    summary:
      'A commerce and media platform for domino tables, recorded play, events, merchandise, and related product development.',
    proof: [
      {
        title: 'Domino loader',
        text: 'A domino animation replaces the generic loading spinner.',
      },
      {
        title: 'Product + media structure',
        text: 'Commerce, story, event, and media content are maintained as separate content types.',
      },
      {
        title: 'Multiple operating layers',
        text: 'The information model supports products, events, recorded play, and future licensing records.',
      },
    ],
    demonstrates: ['Custom loader', 'Commerce structure', 'Event layer', 'Media structure'],
    architecture: ['Product catalog', 'Commerce flow', 'Event layer', 'Media system', 'Licensing pathway'],
  },
  {
    slug: 'oakland-streets',
    name: 'Oakland STREETS',
    category: 'Civic field system',
    status: 'Pilot',
    href: 'https://oaklandstreets.live/',
    accent: '#43a66b',
    surface: '#0d1712',
    ink: '#f0fff5',
    visual: 'streets',
    summary:
      'A field reporting system for environmental conditions, privacy review, human verification, corridor analysis, recurrence tracking, and partner reporting.',
    proof: [
      {
        title: 'Recurrence tracking',
        text: 'Conditions can be tracked after an administrative closure to measure whether they return.',
      },
      {
        title: 'Privacy review',
        text: 'Reports document environmental conditions and include a human review step before publication.',
      },
      {
        title: 'Corridor analysis',
        text: 'Individual observations can be grouped over time to identify repeated conditions and service patterns.',
      },
    ],
    demonstrates: ['Field intake', 'Geospatial interface', 'Privacy review', 'Human verification', 'Recurrence analysis'],
    architecture: ['Observation intake', 'Privacy + safety review', 'Location model', 'Recurrence analysis', 'Partner + public reporting'],
  },
  {
    slug: 'bay-evidence',
    name: 'Bay Evidence',
    category: 'Research infrastructure',
    status: 'Production',
    href: 'https://bayevidence.com/',
    accent: '#3d6e9f',
    surface: '#0d131b',
    ink: '#f2f7ff',
    visual: 'evidence',
    summary:
      'A regional research system for public records, source provenance, jurisdiction comparison, corrections, and civic reporting.',
    proof: [
      {
        title: 'Source provenance',
        text: 'Records and claims retain source and jurisdiction context.',
      },
      {
        title: 'Regional comparison',
        text: 'The information model supports research across nine Bay Area counties.',
      },
      {
        title: 'Corrections record',
        text: 'Updates, corrections, and unresolved evidence are maintained as part of the research record.',
      },
    ],
    demonstrates: ['Source registry', 'OSINT workflow', 'Jurisdiction model', 'Corrections record'],
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
      'A structured interpretation prototype for natal-chart, timing, and symbolic data with inspectable calculation and synthesis layers.',
    proof: [
      {
        title: 'Chart-centered model',
        text: 'Natal-chart data remains the primary analytical object.',
      },
      {
        title: 'Dual-layer output',
        text: 'Insight view and engine view separate readable interpretation from calculation detail.',
      },
      {
        title: 'Reconciliation layer',
        text: 'Agreement, tension, and contradiction can be retained rather than averaged into one result.',
      },
    ],
    demonstrates: ['Chart interface', 'Structured interpretation', 'Calculation trail', 'Report model'],
    architecture: ['Chart input layer', 'Symbolic rules engine', 'Synthesis layer', 'Methodology record', 'Report + journal surfaces'],
  },
  {
    slug: 'mystic-sage',
    name: 'Mystic Sage',
    category: 'Publishing + workshops',
    status: 'Production',
    href: 'https://mysticsage.xyz/',
    accent: '#8c5f44',
    surface: '#17110d',
    ink: '#fff7ef',
    visual: 'sage',
    summary:
      'A publishing and education system for long-form workshops, curricula, participant materials, assessments, symbolic tools, and downloads.',
    proof: [
      {
        title: 'Module structure',
        text: 'Workshop content is organized into modules, exercises, source notes, and participant materials.',
      },
      {
        title: 'Method labels',
        text: 'Historical doctrine, modern additions, interpretation, and uncertainty can be labeled separately.',
      },
      {
        title: 'Multiple formats',
        text: 'The same content system supports web lessons, downloads, reports, and interactive tools.',
      },
    ],
    demonstrates: ['Workshop system', 'Long-form publishing', 'Participant materials', 'Downloads'],
    architecture: ['Workshop hub', 'Module system', 'Assessment layer', 'Downloadable materials', 'Publishing + commerce'],
  },
  {
    slug: 'saga-vibes',
    name: 'Saga Vibes Studio',
    category: 'Project routing + production control',
    status: 'Prototype',
    href: null,
    accent: '#0088a8',
    surface: '#08161a',
    ink: '#effcff',
    visual: 'vibes',
    summary:
      'A project-routing prototype that converts an intake brief and scored constraints into an explicit delivery lane and production plan.',
    proof: [
      {
        title: 'Scored intake',
        text: 'Seven project signals are scored before a delivery route is selected.',
      },
      {
        title: 'Explicit route',
        text: 'The current system returns rapid, hybrid, or enterprise routing with reason codes.',
      },
      {
        title: 'Human approval gate',
        text: 'Architecture and production promotion remain explicit human decisions.',
      },
    ],
    demonstrates: ['Project intake', 'Routing policy', 'Reason codes', 'Human approval gate'],
    architecture: ['Project intake', 'Routing policy', 'Production-role map', 'Repository handoff', 'Deployment control'],
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
    description: 'Source handling, verification, OSINT, and research protocols.',
  },
  {
    label: 'Templates + Documents',
    status: 'Expanding',
    description: 'Briefs, specifications, worksheets, and operating documents.',
  },
];

export const intelligenceItems = [
  {
    type: 'AI practice',
    title: 'Evaluation is part of the system',
    summary: 'Model-assisted workflows require test cases, failure classes, regression checks, and human review.',
  },
  {
    type: 'Systems note',
    title: 'Prototype boundaries should be visible',
    summary: 'Public prototypes should state what is live, simulated, reserved, or dependent on human review.',
  },
  {
    type: 'Research practice',
    title: 'Maintenance belongs in the evidence model',
    summary: 'Corrections, source changes, version history, and unresolved claims are maintained as records.',
  },
];

export const lexicon = {
  date: 'AUG 18',
  word: 'aporia',
  pronunciation: 'ə-ˈpȯr-ē-ə',
  definition: 'A genuine state of uncertainty or puzzlement, especially after competing lines of reasoning have reached an impasse.',
  example: 'The meeting achieved aporia by 10:14 a.m., which was still more measurable progress than the previous three meetings.',
};