---
source: "For now, adapted from the project’s README on GitHub. A fuller write-up is coming."
---

## What it is

Clarix is an AI classroom platform: *where teachers teach, and AI amplifies.* Teachers upload their course material (textbooks, notes, past papers) into a classroom. It is indexed into a vector store for that classroom, and students get an AI tutor that answers from *that* material instead of generic knowledge.

It is a team project with two teammates. My part was the RAG pipeline and the eval harness behind it.

## What works today

| Area | Status |
|---|---|
| Teacher and student roles, auth, profiles | Working |
| Classrooms: create, invite code, public or private join with approval, co-teachers | Working |
| Resources: PDF upload, folders, PDF viewer, annotations, indexed for the tutor | Working |
| RAG tutor: chat sessions per student over the classroom's resources | Working (no citations yet) |
| Quizzes: manual and AI-generated, attempts, leaderboard | Working |
| Announcements | Working |
| Flashcards | Backend only |
| Group chat, podcast-style lessons | Planned |

## How the tutor finds its answers

1. **Extract.** PDFs go through PyMuPDF, with a Tesseract OCR fallback for scanned pages. Past papers are split question by question, so a retrieved chunk is one whole question.
2. **Index.** Each classroom gets its own Chroma collection, so one class never sees another's notes.
3. **Retrieve and answer.** The student's question pulls the closest chunks from that collection, and the LLM answers from them.

## How it is evaluated

The eval harness runs offline, on a real textbook (*Operating Systems: Three Easy Pieces*), and never touches the app's database.

- **150 frozen questions**, split 75 dev and 75 test, with 64 more held back for a later test.
- **Retrieval ablations** over embedding models, chunk sizes, overlap and dense, BM25 or hybrid search, scored with Hit, Recall and Precision at k and MRR.
- **Generation is scored by an LLM judge**, and the judge was checked against 4 models before it was trusted.

The best configuration so far moved Hit@5 on the dev split from 0.55 to 0.77, and Recall@5 from 0.37 to 0.59.

## Stack

React 19, Vite, Tailwind CSS 4 and Zustand on the front end. FastAPI, SQLAlchemy and Postgres (Supabase) with JWT auth on the back end. PyMuPDF, Tesseract, LangChain, Chroma Cloud and Ollama for the RAG side.
