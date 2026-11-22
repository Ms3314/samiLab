// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// The public URL of the site. Used for canonical links, the sitemap, RSS and OG images.
const site = process.env.SITE_URL ?? 'https://samilabs.me';

export default defineConfig({
  site,
  trailingSlash: 'ignore',
  // MDX lets a post use the figure and hover components in src/components/blog/. They render at build time: no client JS.
  integrations: [sitemap(), mdx()],
  // Inline small stylesheets so a page needs no extra CSS request.
  build: { inlineStylesheets: 'auto' },
  prefetch: false,
  image: {
    // Images are optimised at build time with sharp (bundled with Astro).
    responsiveStyles: true,
  },
  markdown: {
    // Shiki runs at build time: highlighted HTML, no client JS.
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark-default' },
      defaultColor: false,
      wrap: false,
    },
  },
});
