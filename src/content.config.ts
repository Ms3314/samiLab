import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

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
      cover: image().optional(),
      coverAlt: z.string().optional(),
    }),
});

export const collections = { posts };
