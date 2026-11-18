import type { Status } from '../components/StatusPill.astro';

export interface Project {
  name: string;
  summary: string;
  status: Status;
  stack: string[];
  metrics?: { value: string; label: string; from?: string; good?: boolean }[];
  note?: string;
  links: { label: string; href: string }[];
}

// Order = order on the home page. Numbers come from each project's own evals.
export const projects: Project[] = [
  {
    name: 'Clarix',
    summary:
      'An AI classroom app. With 2 teammates; I built the RAG pipeline (per-classroom Chroma collections, OCR fallback, past-paper chunking) and its eval harness: 150 frozen questions and retrieval ablations, scored by a judge validated against 4 models first.',
    status: 'running',
    stack: ['FastAPI', 'React', 'Chroma', 'OpenRouter', 'Tesseract'],
    metrics: [
      { from: '0.55', value: '0.77', label: 'Hit@5, dev split' },
      { from: '0.37', value: '0.59', label: 'Recall@5, dev split' },
    ],
    links: [{ label: 'Code', href: 'https://github.com/Ms3314/Clarix' }],
  },
  {
    name: 'Revizo',
    summary:
      'An MCP server that gives Claude, Cursor and ChatGPT spaced-repetition scheduling, mistake tracking and weak-topic detection for LeetCode-style problems, with Google OAuth, full LeetCode history import and a React dashboard.',
    status: 'shipped',
    stack: ['Python', 'MCP', 'OAuth', 'Fernet'],
    links: [
      { label: 'Live', href: 'https://revizo.samilabs.me' },
      { label: 'Code', href: 'https://github.com/Ms3314/RevizoMCP' },
    ],
  },
  {
    name: 'MangaKaro',
    summary:
      'A fully offline Japanese-to-English manga translator: YOLO text detection, manga-ocr, a local vision LLM for speaker and emotion, whole-page translation, and LaMa inpainting with typesetting. Benchmarked against a cloud model on 4 pages.',
    status: 'mvp',
    stack: ['PyTorch', 'YOLO', 'manga-ocr', 'LaMa', 'Ollama'],
    metrics: [
      { value: '41 s', label: 'per page, local, $0', good: false },
      { value: '6 vs 1', label: 'clear errors, local vs cloud', good: false },
    ],
    links: [{ label: 'Code', href: 'https://github.com/Ms3314/MangaKaro' }],
  },
  {
    name: 'The Relay',
    summary:
      "Cited Q&A over 3 arXiv papers that stays inside Groq's free tier (7,000 tokens/min): hybrid retrieval, section-level citations, client-side rate limiting and a capped retry budget. Load-tested against a stand-in Groq server.",
    status: 'mvp',
    stack: ['Python', 'Groq', 'BM25', 'FastAPI'],
    metrics: [
      { value: '1,222', label: 'requests, none refused', good: true },
      { value: '35 ms', label: 'cited answer, 84% of requests', good: true },
    ],
    links: [{ label: 'Code', href: 'https://github.com/Ms3314/the-relay' }],
  },
];

export const experience = [
  {
    company: 'Soapbox Technologies',
    role: 'Associate AI Intern',
    period: 'Aug 2026 – now',
    points: [
      'Built a Python AI-assist service for an EHS platform: LLM features that write and improve form sections, kept valid with Pydantic structured outputs.',
      'Built the team’s eval suite (22 AI features, about 256 cases). Each LLM judge must pass a planted-defect self-test before it scores. Its findings drove prompt fixes in 6 features.',
      'Deployed self-hosted observability (OpenTelemetry, Prometheus, Tempo, Loki, Grafana) with dashboards for latency, model-call cost and voice turns.',
      'Chose LiveKit over Pipecat and deployed a voice agent (ASR, LLM, TTS) across 8 languages so users fill forms by voice.',
    ],
  },
  {
    company: 'Appseed Technologies',
    role: 'Full Stack Developer',
    period: 'Apr 2025 – Sep 2025',
    points: [
      'Built a tracking system with a multi-level dashboard for managers.',
      'Developed a Flutter mobile app for iOS and Android.',
      'Built DevOps from scratch: CI/CD pipelines, containerisation and deployment automation.',
      'Integrated Razorpay and Stripe payments.',
    ],
  },
];

export const stack: { area: string; items: string[] }[] = [
  { area: 'AI and LLM', items: ['LLM evals (DeepEval, LLM-as-judge)', 'RAG (Chroma, BM25)', 'LangGraph', 'MCP', 'LiveKit', 'Ollama'] },
  { area: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'] },
  { area: 'Backend', items: ['Node.js', 'NestJS', 'Python', 'FastAPI', 'PostgreSQL / MongoDB', 'Prisma', 'Redis'] },
  { area: 'Mobile', items: ['Flutter'] },
  { area: 'DevOps and cloud', items: ['Docker', 'Jenkins / GitHub Actions', 'ArgoCD', 'AWS (EC2, ECS, Fargate, Lambda, S3, CloudWatch)', 'Azure', 'OpenTelemetry', 'Grafana'] },
];
