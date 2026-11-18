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
