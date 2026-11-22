// The "tiles" pattern: a printed mosaic of quarter-circles, half-circles, arches and dots on warm paper.
// The arrangement is drawn from a seed (the post's slug), so every post gets its own. The page
// component (theme colours) and the share image (fixed light colours) both read it from here.

export type Tone = 'pink' | 'red' | 'blue' | 'amber' | 'green';
export type TilesVariant = 'card' | 'banner' | 'og';

/** w and h are the drawing's own size; cell is one square of the grid. The grid may bleed past the right and bottom edge. */
export const sizes: Record<TilesVariant, { w: number; h: number; cell: number }> = {
  card: { w: 400, h: 240, cell: 40 }, // 5:3, the shape of every card on the site
  banner: { w: 1200, h: 240, cell: 48 }, // wide and short, above the title of a post
  og: { w: 480, h: 630, cell: 80 }, // the right-hand panel of the link preview image
};

export const palette = {
  light: { ground: '#f1e9d6', ink: '#25221a', pink: '#e3a3b3', red: '#d0604f', blue: '#4584d2', amber: '#e3a64d', green: '#527d5c' },
  dark: { ground: '#1c1913', ink: '#070605', pink: '#b87689', red: '#a84a3e', blue: '#3068ad', amber: '#b98638', green: '#3b6046' },
} as const;

const tones: Tone[] = ['pink', 'red', 'blue', 'amber', 'green'];

function seedOf(s: string) {
  let h = 1779033703 ^ s.length;
  for (let i = 0; i < s.length; i++) { h = Math.imul(h ^ s.charCodeAt(i), 3432918353); h = (h << 13) | (h >>> 19); }
  return h >>> 0;
}
function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const n = (v: number) => Math.round(v * 100) / 100;

type Kind = 'quarter' | 'half' | 'circle' | 'ring' | 'arch';
export interface Tile { d: string; tone: Tone; rot: number; cx: number; cy: number; ring: boolean; dot?: { x: number; y: number; r: number; tone: Tone } }

function shape(kind: Kind, x: number, y: number, s: number): string {
  const cx = x + s / 2, cy = y + s / 2;
  switch (kind) {
    case 'quarter': return `M${n(x)} ${n(y)}H${n(x + s)}A${n(s)} ${n(s)} 0 0 1 ${n(x)} ${n(y + s)}Z`;
    case 'half': return `M${n(x)} ${n(y + s / 2)}A${n(s / 2)} ${n(s / 2)} 0 0 1 ${n(x + s)} ${n(y + s / 2)}Z`;
    case 'arch': return `M${n(x + 0.12 * s)} ${n(y + s)}V${n(y + 0.5 * s)}A${n(0.38 * s)} ${n(0.38 * s)} 0 0 1 ${n(x + 0.88 * s)} ${n(y + 0.5 * s)}V${n(y + s)}Z`;
    default: { const r = (kind === 'ring' ? 0.36 : 0.43) * s; return `M${n(cx - r)} ${n(cy)}a${n(r)} ${n(r)} 0 1 0 ${n(2 * r)} 0a${n(r)} ${n(r)} 0 1 0 ${n(-2 * r)} 0Z`; }
  }
}

/** Where the small accent dot sits for each kind, in the tile's unrotated frame. */
function dotAt(kind: Kind, x: number, y: number, s: number) {
  if (kind === 'quarter') return { x: x + 0.3 * s, y: y + 0.3 * s, r: 0.11 * s };
  if (kind === 'half') return { x: x + 0.5 * s, y: y + 0.24 * s, r: 0.1 * s };
  if (kind === 'arch') return { x: x + 0.5 * s, y: y + 0.66 * s, r: 0.11 * s };
  return { x: x + 0.5 * s, y: y + 0.5 * s, r: 0.17 * s };
}

export function tiles(variant: TilesVariant, seed: string): { w: number; h: number; items: Tile[] } {
  const { w, h, cell } = sizes[variant];
  const rand = rng(seedOf(`${seed}:${variant}`));
  const pick = <T,>(a: readonly T[]) => a[Math.floor(rand() * a.length)];
  const cols = Math.ceil(w / cell), rows = Math.ceil(h / cell);
  const used = Array.from({ length: rows }, () => Array<boolean>(cols).fill(false));
  const items: Tile[] = [];
  let last: Tone | undefined;

  const add = (kind: Kind, c: number, r: number, span: number, accent: boolean) => {
    const s = cell * span, x = c * cell, y = r * cell;
    let tone = pick(tones);
    if (tone === last) tone = pick(tones);
    last = tone;
    let dot: Tile['dot'];
    if (accent && kind !== 'ring') {
      let dt = pick(tones);
      if (dt === tone) dt = tones[(tones.indexOf(tone) + 2) % tones.length];
      dot = { ...dotAt(kind, x, y, s), tone: dt };
    }
    items.push({ d: shape(kind, x, y, s), tone, rot: pick([0, 90, 180, 270]), cx: n(x + s / 2), cy: n(y + s / 2), ring: kind === 'ring', dot });
    for (let j = r; j < r + span; j++) for (let i = c; i < c + span; i++) if (used[j]?.[i] !== undefined) used[j][i] = true;
  };

  // a few big 2 x 2 tiles first, so the mosaic has a rhythm
  const bigs = Math.max(2, Math.round((cols * rows) / 26));
  for (let t = 0; t < bigs * 6 && items.length < bigs; t++) {
    const c = Math.floor(rand() * (cols - 1)), r = Math.floor(rand() * (rows - 1));
    if (used[r][c] || used[r][c + 1] || used[r + 1][c] || used[r + 1][c + 1]) continue;
    add(pick<Kind>(['quarter', 'circle', 'arch', 'half']), c, r, 2, true);
  }
  // then single tiles, with room left blank
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (used[r][c] || rand() < 0.4) continue;
      add(pick<Kind>(['quarter', 'quarter', 'half', 'circle', 'ring', 'arch']), c, r, 1, rand() < 0.3);
    }
  }
  return { w, h, items };
}

/** Wobbly edges and ink specks: what makes the tiles look printed, not drawn. */
export const filtersSvg = (id: string) => `
  <filter id="${id}-wob" x="-2%" y="-2%" width="104%" height="104%">
    <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="4" result="t" />
    <feDisplacementMap in="SourceGraphic" in2="t" scale="2.6" xChannelSelector="R" yChannelSelector="G" />
  </filter>
  <filter id="${id}-grain" x="0" y="0" width="100%" height="100%">
    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="7" result="n" />
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  4 0 0 0 -2.55" />
  </filter>`;

/** The whole mosaic as a standalone SVG string, in fixed colours. Used for the share image. */
export function tilesSvg(variant: TilesVariant, seed: string, mode: 'light' | 'dark' = 'light'): string {
  const { w, h, items } = tiles(variant, seed);
  const c = palette[mode];
  const body = items.map((t) => {
    const rot = `rotate(${t.rot} ${t.cx} ${t.cy})`;
    const main = t.ring
      ? `<path d="${t.d}" fill="none" stroke="${c[t.tone]}" stroke-width="${n(sizes[variant].cell * 0.17)}" />`
      : `<path d="${t.d}" fill="${c[t.tone]}" />`;
    const off = t.ring ? '' : `<path d="${t.d}" fill="none" stroke="${c.ink}" stroke-width="1.1" transform="translate(1.5 1.5) ${rot}" />`;
    const dot = t.dot ? `<circle cx="${n(t.dot.x)}" cy="${n(t.dot.y)}" r="${n(t.dot.r)}" fill="${c[t.dot.tone]}" />` : '';
    return `${off}<g transform="${rot}">${main}${dot}</g>`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><defs>${filtersSvg('t')}</defs>`
    + `<rect width="${w}" height="${h}" fill="${c.ground}" /><g filter="url(#t-wob)">${body}</g>`
    + `<rect width="${w}" height="${h}" fill="${c.ink}" filter="url(#t-grain)" opacity="0.35" /></svg>`;
}
