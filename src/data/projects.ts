import type { Cover, Tone } from './covers';

export interface Project {
  /** URL of the project's page: /projects/<slug>. Its write-up is src/content/projects/<slug>.md. */
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  cover: Cover;
  tone: Tone;
  /** Shown on the home page (top 6). */
  featured?: boolean;
  stack?: string[];
  metrics?: { value: string; label: string; from?: string; good?: boolean }[];
  links: { label: string; href: string }[];
  /** YouTube videos embedded on the project's page. */
  videos?: { id: string; title: string }[];
}

// Order = order on the page. Numbers come from each project's own evals.
export const projects: Project[] = [
  {
    slug: 'clarix',
    name: 'Clarix',
    tagline: 'AI classroom with a RAG tutor',
    summary:
      'Team project with 2 teammates; I built the RAG pipeline (per-classroom Chroma collections, OCR fallback, past papers split question by question) and its eval harness: 150 frozen questions and retrieval ablations, scored by a judge validated against 4 models first.',
    cover: 'clarix', tone: 'sage', featured: true,
    stack: ['FastAPI', 'React', 'Chroma', 'OpenRouter', 'Tesseract'],
    metrics: [
      { from: '0.55', value: '0.77', label: 'Hit@5, dev split' },
      { from: '0.37', value: '0.59', label: 'Recall@5, dev split' },
    ],
    links: [
      { label: 'Code', href: 'https://github.com/Ms3314/Clarix' },
      { label: 'Demo', href: 'https://youtu.be/n4XfSUGcO5Y' },
    ],
  },
  {
    slug: 'the-relay',
    name: 'The Relay',
    tagline: 'Cited Q&A on a free-tier LLM budget',
    summary:
      "Answers questions only from 3 arXiv papers, citing the section behind every sentence, and lives inside Groq's free tier (7,000 tokens/min): hybrid retrieval, client-side token buckets and a capped retry budget, load-tested against a stand-in Groq server.",
    cover: 'relay', tone: 'sky', featured: true,
    stack: ['Python', 'Groq', 'BM25', 'FastAPI'],
    metrics: [
      { value: '1,222', label: 'requests, none refused' },
      { value: '35 ms', label: 'cited passages, 84% of requests' },
    ],
    links: [{ label: 'Code', href: 'https://github.com/Ms3314/the-relay' }],
  },
  {
    slug: 'revizo',
    name: 'Revizo',
    tagline: 'Spaced-repetition DSA coach, as an MCP server',
    summary:
      'Lives inside Claude, Cursor or ChatGPT and tracks the problems you solve, the mistakes you make and when to revisit them. Google OAuth, full LeetCode history import with incremental sync, encrypted session cookies and a React dashboard.',
    cover: 'revizo', tone: 'sand', featured: true,
    stack: ['Python', 'MCP', 'FastAPI', 'OAuth', 'React'],
    links: [
      { label: 'Live', href: 'https://revizo.samilabs.me' },
      { label: 'Code', href: 'https://github.com/Ms3314/RevizoMCP' },
      { label: 'Demo', href: 'https://youtu.be/IYj7S2BpOXM' },
    ],
  },
  {
    slug: 'mangakaro',
    name: 'MangaKaro',
    tagline: 'Offline Japanese-to-English manga translator',
    summary:
      'PDF in, translated pages out, with no cloud and no API keys: YOLO text detection, manga-ocr, a local vision LLM for speaker and emotion, whole-page translation, LaMa inpainting and matched typesetting. Benchmarked against a cloud model on 4 pages.',
    cover: 'mangakaro', tone: 'stone', featured: true,
    stack: ['PyTorch', 'YOLO', 'manga-ocr', 'LaMa', 'Ollama'],
    metrics: [
      { value: '41 s', label: 'per page, local, $0', good: false },
      { value: '6 vs 1', label: 'clear errors, local vs cloud', good: false },
    ],
    links: [
      { label: 'Code', href: 'https://github.com/Ms3314/MangaKaro' },
      { label: 'Demo', href: 'https://youtu.be/2HQXCjuTJc4' },
    ],
  },
  {
    slug: 'jessica',
    name: 'Jessica',
    tagline: 'Local voice assistant and IELTS speaking coach',
    summary:
      'Speak and get spoken answers back (VAD, Whisper, LLM, Kokoro TTS, with interruptions), plus a mock IELTS Speaking test with an estimated band report. Every quote the report uses as evidence is checked against what you actually said.',
    cover: 'jessica', tone: 'sky', featured: true,
    stack: ['Python', 'Whisper (MLX)', 'Kokoro', 'FastAPI', 'React'],
    metrics: [
      { value: '29 of 31', label: 'quotes invented by a local 4B model', good: false },
      { value: '0 of 42', label: 'invented by OpenAI, 20 s vs 114 s' },
    ],
    links: [{ label: 'Code', href: 'https://github.com/Ms3314/Jessica-IELTS-coach' }],
  },
  {
    slug: 'meowblogs',
    name: 'MeowBlogs',
    tagline: 'Topic in, researched technical post out',
    summary:
      'A LangGraph pipeline: a router decides if the topic needs web research, Tavily gathers evidence, an orchestrator plans 5 to 9 sections, parallel workers write them and diagrams are generated. Live progress streams into a Markdown editor.',
    cover: 'meowblogs', tone: 'sage', featured: true,
    stack: ['LangGraph', 'OpenAI', 'Tavily', 'FastAPI', 'React'],
    links: [
      { label: 'Code', href: 'https://github.com/Ms3314/MeowBlogs' },
      { label: 'Demo', href: 'https://youtu.be/eboBSlxEGiI' },
    ],
  },
  {
    slug: 'gdgc-platform',
    name: 'GDGC Internal Platform',
    tagline: 'Coding platform for the GDGC MJCET chapter',
    summary:
      'As Tech Captain I led 5+ developers building the chapter’s internal platform, including a LeetCode-style coding judge with its own judge worker. It runs behind sign-in at gdgcmjcet.in.',
    cover: 'gdgc', tone: 'stone',
    links: [
      { label: 'Frontend', href: 'https://github.com/GDSC-MJCET/GDGC-website' },
      { label: 'Backend', href: 'https://github.com/GDSC-MJCET/GDGC-Backend' },
      { label: 'Judge worker', href: 'https://github.com/GDSC-MJCET/Judge-worker' },
    ],
  },
  {
    slug: 'azure-cicd',
    name: 'Azure CI/CD',
    tagline: 'Azure DevOps to AKS with ArgoCD, and a VM',
    summary: 'A CI/CD setup on Azure: Azure DevOps pipelines, deployment to AKS kept in sync by ArgoCD, and a VM. I recorded the whole build as a two-part walkthrough.',
    cover: 'azure', tone: 'sky',
    stack: ['Azure DevOps', 'AKS', 'ArgoCD', 'Docker'],
    links: [
      { label: 'Part 1', href: 'https://www.youtube.com/watch?v=7bMxD6KPXo4' },
      { label: 'Part 2', href: 'https://www.youtube.com/watch?v=3R3gMrlUxXQ' },
    ],
    videos: [
      { id: '7bMxD6KPXo4', title: 'Part 1' },
      { id: '3R3gMrlUxXQ', title: 'Part 2' },
    ],
  },
  {
    slug: 'bearcli',
    name: 'BearCLI',
    tagline: 'Terminal coding agent',
    summary: 'A homemade AI coding agent for the terminal: a cool-looking CLI wrapped around GPT-5.',
    cover: 'bearcli', tone: 'sand',
    links: [{ label: 'Code', href: 'https://github.com/Ms3314/BearCLI' }],
  },
  {
    slug: 'sudotalk',
    name: 'SudoTalk',
    tagline: 'RAG-based LLM agent',
    summary: 'A RAG-based LLM agent, and the project where I learned how retrieval-augmented generation fits together.',
    cover: 'sudotalk', tone: 'sky',
    links: [{ label: 'Code', href: 'https://github.com/Ms3314/SudoTalk' }],
  },
  {
    slug: 'hyderabad-events',
    name: 'Hyderabad Events',
    tagline: 'Event listings with an admin panel',
    summary: 'An events site for Hyderabad, with a client app and a separate admin app.',
    cover: 'hydevents', tone: 'sand',
    links: [
      { label: 'Live', href: 'https://hydevents-main.onrender.com/' },
      { label: 'Admin', href: 'https://hyd-events-website-admin.onrender.com/' },
    ],
  },
  {
    slug: 'jargon-blog',
    name: 'Jargon Blog',
    tagline: 'A blogging platform',
    summary: 'A blogging platform with its own editor.',
    cover: 'jargon', tone: 'stone',
    links: [{ label: 'Live', href: 'https://blog-editor-frontend.onrender.com/' }],
  },
  {
    slug: 'knowmebetter',
    name: 'KnowmeBetter',
    tagline: 'Anonymous messaging',
    summary: 'An anonymous messaging app.',
    cover: 'knowmebetter', tone: 'sage',
    links: [{ label: 'Live', href: 'https://knowmebetter-nine.vercel.app/' }],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);
export const otherProjects = projects.filter((p) => !p.featured);

export const experience = [
  {
    company: 'Soapbox Technology Solutions',
    role: 'Associate AI Intern',
    period: 'Aug 2026 – now',
    location: 'Hyderabad · On-site',
    stack: ['Python', 'Pydantic', 'LLM evals', 'LiveKit', 'OpenTelemetry', 'Prometheus', 'Grafana', 'Tempo', 'Loki'],
    points: [
      'Built a Python AI-assist service for an EHS platform: LLM features that write and improve form sections, kept valid with Pydantic structured outputs.',
      'Built the team’s eval suite (22 AI features, about 256 cases). Each LLM judge must pass a planted-defect self-test before it scores. Its findings drove prompt fixes in 6 features.',
      'Deployed self-hosted observability (OpenTelemetry, Prometheus, Tempo, Loki, Grafana) with dashboards for latency, model-call cost and voice turns.',
      'Chose LiveKit over Pipecat and deployed a voice agent (ASR, LLM, TTS) across 8 languages so users fill forms by voice.',
    ],
  },
  {
    company: 'Appseed Technologies',
    role: 'SDE Intern',
    period: 'Apr 2025 – Oct 2025',
    location: 'Hyderabad · Remote',
    stack: ['TypeScript', 'NestJS', 'Flutter', 'Docker Compose', 'AWS EC2', 'ECS', 'Lambda', 'EventBridge', 'CI/CD', 'Razorpay', 'Stripe'],
    points: [
      'Built NestJS and TypeScript REST APIs, including a tracking system with multi-level dashboards for managers.',
      'Integrated Razorpay and Stripe payments.',
      'Contributed to the Flutter app for iOS and Android: UI work, bug fixes and new user workflows.',
      'Set up DevOps from scratch: Docker Compose, AWS EC2 and ECS, and CI/CD pipelines.',
      'Scheduled EC2 instances with EventBridge and Lambda.',
    ],
  },
];
