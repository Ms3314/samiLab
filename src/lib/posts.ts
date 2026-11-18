import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

/** Drafts show in `astro dev` (or with SHOW_DRAFTS=1) and never in a normal build. */
const showDrafts = import.meta.env.DEV || process.env.SHOW_DRAFTS === '1';

export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('posts', ({ data }) => showDrafts || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const postUrl = (p: Post) => `/blog/${p.id}/`;
export const ogUrl = (p: Post) => `/og/${p.id}.png`;

export const isoDate = (d: Date) => d.toISOString().slice(0, 10);

import getReadingTime from 'reading-time';
/** Whole minutes, at least 1, from the raw Markdown. */
export const minutesRead = (p: Post) => Math.max(1, Math.round(getReadingTime(p.body ?? '').minutes));

import { covers, tones, type Cover, type Tone } from '../data/covers';
const hash = (s: string) => [...s].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
/** The post's illustration: its `art` frontmatter, or a generic drawing picked from its slug. */
export function postArt(p: Post): { cover: Cover; tone: Tone } {
  const generic: Cover[] = ['notes', 'chart', 'flow'];
  const h = hash(p.id);
  return {
    cover: (p.data.art as Cover) ?? generic[h % generic.length],
    tone: (p.data.artTone as Tone) ?? tones[h % tones.length],
  };
}
export const featuredPost = (posts: Post[]) => posts.find((p) => p.data.featured);
