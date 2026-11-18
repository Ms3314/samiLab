---
source: "For now, adapted from the project’s README on GitHub. A fuller write-up is coming."
---

## What it is

SudoTalk is a RAG-based PDF assistant. Upload a PDF and have a conversation about what is in it. It is the project where I learned how retrieval-augmented generation fits together.

## How it works

1. **Upload.** A PDF is uploaded through a Streamlit interface.
2. **Index.** It is parsed with PyPDFLoader and split into chunks (1,000 characters, 300 overlap) with LangChain's recursive splitter.
3. **Embed and store.** Chunks are embedded with sentence-transformers (all-mpnet-base-v2) and stored in Qdrant.
4. **Retrieve.** A question pulls the most similar chunks.
5. **Answer.** Gemini 2.5 Flash answers from those chunks, with a system prompt that carries the document's context and sources.

The chat keeps its history, shows session statistics, and cleans up uploaded files when it is done with them.

## Stack

Python, Streamlit, Qdrant, Hugging Face sentence-transformers, LangChain and Google Gemini 2.5 Flash, managed with uv.
