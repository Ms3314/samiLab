---
source: "For now, adapted from the project’s README on GitHub. A fuller write-up is coming."
---

## What it is

Jessica is a local voice assistant and IELTS speaking coach. You talk out loud and get an answer out loud. She can also run a mock IELTS Speaking test and give you an estimated band report.

## What it does

- **Free conversation.** Speak naturally. You can interrupt her, and she remembers what you actually heard.
- **IELTS mock test.** Short (about 6 minutes) or full (about 14 minutes). The examiner's lines and the cue card are written fresh each time, with a countdown for every part.
- **Report and progress.** Estimated bands for fluency, vocabulary, grammar and pronunciation, with quotes from your answers and what to practise first. Scores are charted over time.
- **History.** Every conversation and test is saved, and you can listen back to your own answers.
- **Private by default.** Speech recognition, the voice and your recordings stay on your computer. The LLM can run there too.

## How it works

Microphone → Silero VAD (is someone talking?) → Whisper large-v3-turbo on MLX (speech to text) → an agent on OpenAI or a local Ollama model → Kokoro TTS (speaks each sentence as soon as it is ready).

The latency tricks:

- It records only while you talk and trims dead air.
- The reply is streamed: each finished sentence is spoken while the rest is still being written.
- One persistent microphone stream and one speaker stream, because opening and closing them kept wedging macOS CoreAudio.
- Whisper and the voice load at startup, and audio goes straight to Whisper as an array, with no temp files.

## What I measured

The report quotes your answers as evidence, so every quote is checked against what you actually said. A local 4B model invented 29 of the 31 quotes it used. OpenAI invented 0 of 42, and took 20 s against the local model's 114 s. So, for now, the report should run on OpenAI.

## Where it stands

It works well on Apple Silicon Macs (tested on an M4 with 16 GB). Windows and Linux aren't supported yet, because the speech-to-text backend is Apple-only. The bands are practice estimates from an AI, not an official score.
