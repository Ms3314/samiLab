// Medium posts, fetched once at build time and shown as an "Elsewhere" list.
import Parser from 'rss-parser';
import { once } from './fetch';
import { SITE } from '../data/site';

export interface ExternalPost { title: string; link: string; date: Date | null }

export const getMediumPosts = once(async (): Promise<ExternalPost[]> => {
  try {
    const feed = await new Parser({ timeout: 8000 }).parseURL(`https://medium.com/feed/@${SITE.mediumUser}`);
    return feed.items.map((i) => ({
      title: i.title ?? 'Untitled',
      link: (i.link ?? '#').split('?')[0],
      date: i.pubDate ? new Date(i.pubDate) : null,
    }));
  } catch {
    return [];
  }
});
