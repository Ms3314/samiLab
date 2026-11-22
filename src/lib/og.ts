// Build-time Open Graph images (1200×630 PNG) with satori + resvg. Nothing ships to the browser.
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { tilesSvg } from './tiles';

const require = createRequire(import.meta.url);
const font = (p: string) => readFile(require.resolve(p));

let fonts: Promise<Parameters<typeof satori>[1]['fonts']> | undefined;
const loadFonts = () =>
  (fonts ??= Promise.all([
    font('@fontsource/newsreader/files/newsreader-latin-400-normal.woff'),
    font('@fontsource/geist/files/geist-latin-400-normal.woff'),
    font('@fontsource/geist-mono/files/geist-mono-latin-400-normal.woff'),
  ]).then(([serif, sans, mono]) => [
    { name: 'Newsreader', data: serif, weight: 400, style: 'normal' },
    { name: 'Geist', data: sans, weight: 400, style: 'normal' },
    { name: 'Geist Mono', data: mono, weight: 400, style: 'normal' },
  ]));

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, ...children: (Node | string | null | false)[]): Node => ({
  type,
  props: { style, children: children.filter(Boolean) },
});

export interface OgInput { eyebrow: string; title: string; description?: string; footer?: string; /** A seed (the post's slug): puts that post's tile pattern in a panel on the right. */ pattern?: string }

export async function renderOg({ eyebrow, title, description, footer, pattern }: OgInput): Promise<Buffer> {
  if (pattern) return renderPatternOg({ eyebrow, title, description, footer, pattern });
  const size = title.length > 70 ? 56 : title.length > 40 ? 66 : 76;
  const tree = h(
    'div',
    { width: 1200, height: 630, display: 'flex', background: '#ffffff', color: '#121211', fontFamily: 'Geist' },
    h('div', { width: 1040, height: 486, marginTop: 72, marginLeft: 80, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
    h('div', { display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'Geist Mono', fontSize: 26, color: '#5c5c57' },
      h('div', { display: 'flex', alignItems: 'center', color: '#121211' }, 'samilab', h('div', { width: 13, height: 26, marginLeft: 5, background: '#13753a' })),
      h('div', { display: 'flex', textTransform: 'uppercase', letterSpacing: 3, fontSize: 20 }, eyebrow),
    ),
    h('div', { display: 'flex', flexDirection: 'column' },
      h('div', { display: 'flex', fontFamily: 'Newsreader', fontSize: size, lineHeight: 1.1, letterSpacing: -1.5 }, title),
      description ? h('div', { display: 'flex', marginTop: 28, fontFamily: 'Newsreader', fontSize: 30, lineHeight: 1.35, color: '#5c5c57' }, description.length > 140 ? description.slice(0, 137) + '…' : description) : null,
    ),
    h('div', { display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #e7e7e4', paddingTop: 28, fontFamily: 'Geist Mono', fontSize: 22, color: '#5c5c57' },
      h('div', { display: 'flex' }, 'Mohammed Samiuddin'),
      h('div', { display: 'flex' }, footer ?? 'samilabs.me'),
    ),
    ),
  );
  const svg = await satori(tree as never, { width: 1200, height: 630, fonts: await loadFonts() });
  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}

/** Pattern version: text on the left, the post's own tile pattern in a panel on the right, so the pattern shows when the link is shared. */
async function renderPatternOg({ eyebrow, title, description, footer, pattern }: OgInput): Promise<Buffer> {
  const png = new Resvg(tilesSvg('og', pattern ?? ''), { fitTo: { mode: 'width', value: 480 } }).render().asPng();
  const panel = `data:image/png;base64,${png.toString('base64')}`;
  const size = title.length > 70 ? 46 : title.length > 40 ? 56 : 66;
  const tree = h(
    'div',
    { width: 1200, height: 630, display: 'flex', background: '#ffffff', color: '#121211', fontFamily: 'Geist' },
    h('div', { boxSizing: 'border-box', width: 720, height: 630, padding: '64px 56px 56px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
      h('div', { display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: 'Geist Mono', fontSize: 26, color: '#5c5c57' },
        h('div', { display: 'flex', alignItems: 'center', color: '#121211' }, 'samilab', h('div', { width: 13, height: 26, marginLeft: 5, background: '#13753a' })),
        h('div', { display: 'flex', textTransform: 'uppercase', letterSpacing: 3, fontSize: 20 }, eyebrow),
      ),
      h('div', { display: 'flex', flexDirection: 'column' },
        h('div', { display: 'flex', fontFamily: 'Newsreader', fontSize: size, lineHeight: 1.1, letterSpacing: -1.2 }, title),
        description ? h('div', { display: 'flex', marginTop: 24, fontFamily: 'Newsreader', fontSize: 26, lineHeight: 1.35, color: '#5c5c57' }, description.length > 140 ? description.slice(0, 137) + '…' : description) : null,
      ),
      h('div', { display: 'flex', justifyContent: 'space-between', borderTop: '2px solid #e7e7e4', paddingTop: 22, fontFamily: 'Geist Mono', fontSize: 20, color: '#5c5c57' },
        h('div', { display: 'flex' }, 'Mohammed Samiuddin'),
        h('div', { display: 'flex' }, footer ?? 'samilabs.me'),
      ),
    ),
    h('div', { width: 480, height: 630, backgroundImage: `url(${panel})`, backgroundSize: '480px 630px', borderLeft: '2px solid #25221a' }),
  );
  const svg = await satori(tree as never, { width: 1200, height: 630, fonts: await loadFonts() });
  return new Resvg(svg, { fitTo: { mode: 'width', value: 1200 } }).render().asPng();
}
