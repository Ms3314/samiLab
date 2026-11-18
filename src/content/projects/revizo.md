---
source: "For now, adapted from the project’s README on GitHub. A fuller write-up is coming."
---

## What it is

Revizo is a spaced-repetition revision coach for DSA interview prep that lives inside your LLM. *Your problems remember what you got wrong.*

It is an MCP server, so you talk to it from Claude, Cursor, ChatGPT or any other MCP client. The loop is simple: **solve, record, revisit, repeat.**

## What it can do

- Add problems from LeetCode, CodeChef, GFG and other sources.
- Sync your LeetCode activity, or import your full solved history with incremental updates.
- Schedule problems for review with spaced repetition.
- Remember the mistakes you made on earlier attempts, and spot weak points that recur across problems.
- Give AI hints when you revise.
- Sign in with Google over OAuth.

## How it is built

Revizo is a monorepo with two packages that only talk over HTTP:

- **server/**: the Python app (FastAPI plus MCP). It serves the MCP endpoint at /mcp, the JSON API at /api, OAuth at /oauth, and the built dashboard.
- **web/**: the React and TypeScript dashboard, built with Vite and Tailwind 4.

One deployment serves everything from the FastAPI process: same origin, cookie sessions, no CORS. Saved LeetCode session cookies are encrypted with a Fernet key that stays stable across deploys.
