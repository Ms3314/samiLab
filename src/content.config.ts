import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';
import { covers, tones } from './data/covers';

/**
 * Blog posts. Drop a Markdown file in src/content/posts/ (a folder per post works too,
 * e.g. src/content/posts/my-post/index.md with its images beside it).
 * Only `title` and `date` are required, so exports from Obsidian, Notion or Claude Docs
 * need just a small frontmatter block on top.
 */
const posts = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/posts' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      description: z.string().optional(),
      updated: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),
      /** Show this post as the wide card above Projects on the home page (the newest featured post wins). */
      featured: z.boolean().default(false),
      /** Illustration for the featured card and post list: one of the site's SVG drawings. Picked from the slug if left out. */
      art: z.enum(covers as [string, ...string[]]).optional(),
      artTone: z.enum(tones as [string, ...string[]]).optional(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
    }),
});

export const collections = { posts };
