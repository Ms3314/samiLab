# samilab

Mohammed Samiuddin's portfolio and blog. Astro, fully static, no client JavaScript except the theme toggle and a small hover preview on video cards.

```sh
npm install
npm run dev      # http://localhost:4321, drafts visible
npm run build    # static site in dist/
npm run preview  # serve dist/
```

## Writing a post

1. Copy `src/content/posts/_template.md` to `src/content/posts/<slug>.md` (or `<slug>/index.md` with images beside it).
2. Fill in `title` and `date` (required), plus `description` and `tags`.
3. Remove `draft: true` when it is ready, commit and push to `dev`.
4. To put a post in the wide card above Projects on the home page, add `featured: true`. The newest featured post wins. Pick its drawing with `art:` (`notes`, `chart`, `flow` or any project drawing), or leave it out and one is picked from the slug.

Posts get reading time, a table of contents, Shiki highlighting, optimised images, an OG image (`/og/<slug>.png`), an RSS entry (`/rss.xml`) and a sitemap entry, all at build time.

## Where things live

| Path | What |
| --- | --- |
| `src/styles/global.css` | Design tokens (from the Samilab design system) and base styles |
| `src/styles/prose.css` | Post reading styles |
| `src/data/site.ts` | Name, links, usernames |
| `src/data/projects.ts` | Projects, experience and stack on the home page |
| `src/lib/og.ts` | OG image template |
| `src/assets/fonts/` | Self-hosted, Latin-subset fonts (Newsreader, Geist, Geist Mono) |

Set `SITE_URL` to override the site URL (default `https://samilabs.me`).
