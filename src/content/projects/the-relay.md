---
source: "For now, adapted from the project’s README on GitHub. A fuller write-up is coming."
---

## What it is

The Relay answers questions about three arXiv papers (*Attention Is All You Need*, *Moshi* and *H-Net / Dynamic Chunking*) and cites the passage behind every sentence. The interesting part is the constraint: it was built to behave well inside the real limits of Groq's free tier.

## The limit that shaped everything

By deliberately hitting the service's walls, I found that the binding limit is **7,000 input tokens per minute**: not the 8,000 the headers report, and not the request count. At about 1,100 tokens per answer, that is roughly 6 answers a minute for the whole service. So every design choice minimises Groq tokens per answer.

## How a question is answered

1. **Understand.** Simple rules work out which paper is being asked about.
2. **Cache.** Repeated questions, and identical questions arriving at the same time, are answered once.
3. **Retrieve.** Hybrid search (BM25 plus local embeddings, fused) over chunks that never cross a section, with tables keeping their caption and header.
4. **Decide.** Based on the predicted wait and the daily reserve: answer with 4 passages, answer with 2 (about 40% fewer tokens), or return the two best passages quoted, without calling the model at all.
5. **Draft.** One streaming Groq call, with passages labelled [P1..Pk].
6. **Check.** No model needed: each sentence must cite a passage that was actually sent, and every number in it must appear there. Only checked sentences are shown, so streaming never shows unchecked text.

## What I measured

- **First checked sentence in about 0.7 s** at the median on real Groq calls.
- A **stand-in model server** with Groq's API shape, calibrated from 104 real calls, so load tests don't burn the free tier.
- **Naive retries make things worse.** In the same 120-person burst, a client that retried immediately sent 253 requests (246 refused) for the same 7 answers that 48 requests produced with no retries. The Relay's client sent 10 and got 10 answers, because it waits for room instead of hammering.
- **When the daily budget runs out**, people still get the two most relevant passages, quoted and cited, in about 25 ms.

## What I'm unsure about

The burst results flatter the system a little: 52 to 65% of requests were cache hits because the test load draws from 30 questions, and real users repeat themselves less.
