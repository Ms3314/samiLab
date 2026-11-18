// Talks and tutorials on YouTube. Thumbnails are illustrated SVGs (VideoThumb.astro); no player JS.
import type { Tone } from './covers';
import type { VideoArt } from '../components/VideoThumb.astro';
export interface Video { id: string; title: string; series: string; group: string; art: VideoArt; tone: Tone }

export const videos: Video[] = [
  { id: 'W2KH-VBzAfU', title: 'Retrieval-augmented generation (RAG)', series: 'Day 6', group: 'GenAI Build Week, GDGC × Horizon', art: 'rag', tone: 'sage' },
  { id: 'eCwZImg4sDA', title: 'LangChain agents', series: 'Day 7', group: 'GenAI Build Week, GDGC × Horizon', art: 'agents', tone: 'sage' },
  { id: '7bMxD6KPXo4', title: 'Azure DevOps, AKS, ArgoCD and a VM', series: 'Part 1', group: 'Azure CI/CD', art: 'pipeline', tone: 'sky' },
  { id: '3R3gMrlUxXQ', title: 'Azure DevOps, AKS, ArgoCD and a VM', series: 'Part 2', group: 'Azure CI/CD', art: 'cluster', tone: 'sky' },
  { id: 'eU_7Vpky1T0', title: 'API fetching and useEffect', series: 'Part 1', group: 'React Intermediate, TSIG MJCET', art: 'fetch', tone: 'sand' },
  { id: 'EGFp5LO7BXg', title: 'Basics of React Router DOM', series: 'Part 2', group: 'React Intermediate, TSIG MJCET', art: 'router', tone: 'sand' },
  { id: 'XoJFJycb8E4', title: 'Controlled and uncontrolled components, form validation', series: 'Part 3', group: 'React Intermediate, TSIG MJCET', art: 'forms', tone: 'sand' },
];

export const videoGroups = [...new Set(videos.map((v) => v.group))].map((g) => ({ name: g, videos: videos.filter((v) => v.group === g) }));
