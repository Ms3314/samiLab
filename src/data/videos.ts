// Talks and tutorials on YouTube. Thumbnails load from YouTube's image CDN, lazily; no player JS.
export interface Video { id: string; title: string; series: string; group: string }

export const videos: Video[] = [
  { id: 'W2KH-VBzAfU', title: 'Retrieval-augmented generation (RAG)', series: 'Day 6' , group: 'GenAI Build Week, GDGC × Horizon' },
  { id: 'eCwZImg4sDA', title: 'LangChain agents', series: 'Day 7' , group: 'GenAI Build Week, GDGC × Horizon' },
  { id: '7bMxD6KPXo4', title: 'Azure DevOps, AKS, ArgoCD and a VM', series: 'Part 1' , group: 'Azure CI/CD' },
  { id: '3R3gMrlUxXQ', title: 'Azure DevOps, AKS, ArgoCD and a VM', series: 'Part 2' , group: 'Azure CI/CD' },
  { id: 'eU_7Vpky1T0', title: 'API fetching and useEffect', series: 'Part 1' , group: 'React Intermediate, TSIG MJCET' },
  { id: 'EGFp5LO7BXg', title: 'Basics of React Router DOM', series: 'Part 2' , group: 'React Intermediate, TSIG MJCET' },
  { id: 'XoJFJycb8E4', title: 'Controlled and uncontrolled components, form validation', series: 'Part 3' , group: 'React Intermediate, TSIG MJCET' },
];

export const videoGroups = [...new Set(videos.map((v) => v.group))].map((g) => ({ name: g, videos: videos.filter((v) => v.group === g) }));
