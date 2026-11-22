/**
 * Plain-words definitions for the dotted terms in posts: <Gloss k="chunk">chunks</Gloss>.
 * One place, so a word means the same thing everywhere it is used.
 */
export const glossary = {
  harness: {
    term: 'harness',
    tip: 'Everything around the model that makes it an agent: the loop it runs in, its tools, its prompt and its memory.',
  },
  episodic: {
    term: 'episodic memory',
    tip: 'Memory of what happened, event by event, like a chat. The opposite of a fact you just know.',
  },
  compacted: {
    term: 'compaction',
    tip: 'Squeezing a long chat into a short summary so it still fits in the model’s window.',
  },
  nightjob: {
    term: 'the night job',
    tip: 'A background run at night that moves things from short-term into long-term memory. OpenClaw calls it dreaming. We will cover it in a future blog.',
  },
  sqlite: {
    term: 'SQLite',
    tip: 'A small database that lives in a single file, with no server to run.',
  },
  rag: {
    term: 'RAG',
    tip: 'Retrieval-augmented generation: look the text up first, then add it to the prompt so the model can answer with it.',
  },
  hybrid: {
    term: 'hybrid search',
    tip: 'Meaning search and keyword search run together, then blended into one score.',
  },
  embedding: {
    term: 'embedding',
    tip: 'A list of numbers a model makes from a text. Texts that mean similar things get similar numbers.',
  },
  cosine: {
    term: 'cosine similarity',
    tip: 'A score for how closely two embeddings point the same way. Higher means closer in meaning.',
  },
  bm25: {
    term: 'BM25',
    tip: 'The classic keyword score: a note ranks higher when it contains the question’s words often, and especially when those words are rare.',
  },
  fts5: {
    term: 'FTS5',
    tip: 'SQLite’s built-in full-text search.',
  },
  mmr: {
    term: 'MMR',
    tip: 'Maximal marginal relevance: a filter that drops near-duplicate results.',
  },
  token: {
    term: 'token',
    tip: 'A word-piece. In English, about four characters.',
  },
  chunk: {
    term: 'chunk',
    tip: 'A slice of a note, cut by size by the search index.',
  },
} as const satisfies Record<string, { term: string; tip: string }>;

export type GlossKey = keyof typeof glossary;
