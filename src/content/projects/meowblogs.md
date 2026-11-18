---
source: "For now, adapted from the project’s README on GitHub. A fuller write-up is coming."
---

## What it is

MeowBlogs turns a single topic into a researched, well-structured technical blog post. It hands you editable Markdown, with diagrams, that you can copy or download.

## How it works

It is a LangGraph agent pipeline:

1. **Router.** Classifies the topic as closed-book, hybrid or open-book, and only searches the web when freshness matters.
2. **Research.** Tavily results are deduplicated, filtered by recency and cited in the text.
3. **Orchestrator.** Plans an outline of 5 to 9 sections.
4. **Workers.** One worker per section, all writing in parallel (LangGraph's Send).
5. **Reducer.** Merges the sections, decides where diagrams help (up to 3 per post) and generates them with gpt-image-1-mini.

Every step streams to the UI over Server-Sent Events, so you watch the post being built. The result opens in a Markdown editor with split, edit and preview modes, and every generation is saved to a local history.

## Stack

LangGraph and LangChain for the agents, OpenAI (gpt-5.4-mini by default) for writing, Tavily for research. FastAPI, SQLAlchemy and SQLite on the back end. React 18, Vite and Tailwind on the front end.
