---
source: "For now, adapted from the project’s README on GitHub. A fuller write-up is coming."
---

## What it is

Give MangaKaro a PDF or a folder of manga pages in Japanese, and get the pages back in English. No cloud, no API keys and no manual steps: everything runs on a Mac.

It is a working prototype, not a finished product. Speech bubbles on white paper work well. Text over art works less well, and sound effects, background signs and large display lettering stay in Japanese.

## How it works

1. **Load.** Render the PDF pages, split two-page spreads (right page first) and shrink to 1536 px.
2. **Find the text.** Two detectors (a YOLO model and comic-text-detector) are merged, and the boxes are numbered in reading order.
3. **Read.** manga-ocr reads each box.
4. **Triage.** A box with no Japanese in it, or one too big for what was read, is left alone and listed for review. This stops the pipeline erasing a block of prose and writing an invented sentence in its place.
5. **Emotion and scene.** A local vision LLM looks at the page and the text and tags the speaker, emotion and intensity.
6. **Translate.** A local LLM translates the whole page at once, using those tags.
7. **Fonts.** The lettering weight is measured once per manga to pick matching fonts.
8. **Erase and typeset.** White paper is erased by its pixel mask, flat black gets a flat fill, and lettering over screentone or art is erased with LaMa inpainting and re-lettered with a white outline.
9. **Check.** Find any Japanese left on the page and say why.

Every stage is cached, so an interrupted run resumes where it stopped.

## Local versus cloud

I ran the same four Manga109 pages through the local pipeline and through OpenAI models, with Claude judging each result against the local one on a five-point rubric.

- **Local:** about 41 s a page, $0.
- **gpt-6.1-sol in the same pipeline:** at most one clear translation error where local made six, at $0.021 a page.
- **gpt-5.4-mini:** slightly better than local, at $0.006 a page and about 15 s.
- **One image model doing the whole job:** no. gpt-image-2 invented lines on all four pages.

## What still goes wrong

- Display lettering, titles and sound effects stay in Japanese.
- Reading order and bubble matching can put a sentence in the wrong bubble.
- OCR mistakes reach the translation, and the translator turns garbled text into a confident wrong sentence.
- Narrow bubbles get small text.
- Translation quality has not been scored against reference translations. The notes above come from looking at the output.
