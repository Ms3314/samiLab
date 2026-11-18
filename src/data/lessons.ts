// Lessons for the Learn section: talks and classes I've taught, on YouTube.
// Each one gets a page at /learn/<slug> with a short description, then the video.
// Edit `description` and `learn` freely; they are shown above the video.
import type { Tone } from './covers';
import type { LessonArt } from '../components/LessonThumb.astro';

export interface Lesson {
  slug: string;
  id: string; // YouTube video id
  title: string;
  series: string;
  part: string;
  description: string;
  learn: string[];
  art: LessonArt;
}

export const lessons: Lesson[] = [
  {
    slug: 'rag', art: 'rag', id: 'W2KH-VBzAfU', series: 'GenAI Build Week, GDGC × Horizon', part: 'Day 6',
    title: 'Retrieval-augmented generation (RAG)',
    description: 'Day 6 of GenAI Build Week. Why a language model needs your documents, and how to give them to it: split, embed, retrieve, then answer from what was found.',
    learn: ['What RAG is and when you need it', 'How chunks, embeddings and a vector store fit together', 'How retrieved passages end up in the prompt'],
  },
  {
    slug: 'langchain-agents', art: 'agents', id: 'eCwZImg4sDA', series: 'GenAI Build Week, GDGC × Horizon', part: 'Day 7',
    title: 'LangChain agents',
    description: 'Day 7 of GenAI Build Week. Going from a model that answers to an agent that acts: giving an LLM tools and letting it decide which to call.',
    learn: ['What makes an agent different from a chain', 'How tools are described to the model', 'How LangChain runs the call-a-tool loop'],
  },
  {
    slug: 'react-fetching-useeffect', art: 'fetch', id: 'eU_7Vpky1T0', series: 'React Intermediate, TSIG MJCET', part: 'Part 1',
    title: 'API fetching and useEffect',
    description: 'Part 1 of React Intermediate for TSIG MJCET. Loading data from an API into a component, and the effect that runs it.',
    learn: ['Fetching data from an API in React', 'How useEffect and its dependency array work', 'Showing loading and error states'],
  },
  {
    slug: 'react-router', art: 'router', id: 'EGFp5LO7BXg', series: 'React Intermediate, TSIG MJCET', part: 'Part 2',
    title: 'Basics of React Router DOM',
    description: 'Part 2 of React Intermediate for TSIG MJCET. Turning a single-page app into one with real pages and URLs.',
    learn: ['Setting up routes with React Router', 'Linking between pages', 'Reading parameters from the URL'],
  },
  {
    slug: 'react-forms', art: 'forms', id: 'XoJFJycb8E4', series: 'React Intermediate, TSIG MJCET', part: 'Part 3',
    title: 'Controlled and uncontrolled components, form validation',
    description: 'Part 3 of React Intermediate for TSIG MJCET. Two ways to handle form inputs in React, and checking what the user typed before you submit it.',
    learn: ['Controlled versus uncontrolled inputs', 'When to use each one', 'Validating a form before submit'],
  },
];

/** Courses: one per series, in order. `blurb` and `tone` are shown on the course header and its cards. */
export const courses: { name: string; blurb: string; tone: Tone }[] = [
  { name: 'GenAI Build Week, GDGC × Horizon', tone: 'sage', blurb: 'From retrieval to agents: how to build on top of an LLM.' },
  { name: 'React Intermediate, TSIG MJCET', tone: 'sand', blurb: 'The next step after React basics: data, routing and forms.' },
];
export const lessonSeries = courses.map((c) => ({ ...c, lessons: lessons.filter((l) => l.series === c.name) }));
