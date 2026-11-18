---
title: "How this blog works: Markdown in, static HTML out"
date: 2026-11-18
description: "A post is a Markdown file in the repo. The build turns it into a static page with a table of contents, highlighted code, optimised images and its own preview card."
tags: [meta, astro]
draft: true
---

Every post on this site is a Markdown file. There is no editor and no CMS. I write in whatever app I like, export Markdown, and drop the file into `src/content/posts/`. The build does the rest.

## Writing a post

A post needs a small block of frontmatter on top. Only `title` and `date` are required:

```yaml
---
title: "My local model invented 29 of 31 quotes"
date: 2026-11-20
description: "One sentence for the post list, RSS and the preview card."
tags: [evals, llm]
---
```

The file name becomes the URL. A file called `local-model-quotes.md` publishes at `/blog/local-model-quotes/`. For a post with images, use a folder with an `index.md` and put the images beside it.

### From Obsidian, Notion or Claude Docs

All three export plain Markdown. Two things to check after exporting:

1. Images use normal links, like `![Alt text](./chart.png)`, not Obsidian's `![[chart.png]]`.
2. The frontmatter block is at the very top of the file.

## What the build does

| Step | When | Cost in the browser |
| --- | --- | --- |
| Markdown to HTML | build | 0 KB JS |
| Code highlighting (Shiki) | build | 0 KB JS |
| Image resizing to WebP | build | only the size you need |
| Reading time and table of contents | build | 0 KB JS |
| Preview card (OG image) | build | none |

Code blocks are highlighted at build time, in both themes:

```python
def judge_can_score(judge, rubric) -> bool:
    """A judge must catch planted defects before it is allowed to score."""
    good = [judge(case) for case in rubric.known_good]
    bad = [judge(case) for case in rubric.planted_defects]
    return all(good) and not any(bad)
```

## Drafts

Add `draft: true` to keep a post out of the live site. Drafts still show when you run `npm run dev`, so you can check them first. This post is a draft, so it only appears locally.
