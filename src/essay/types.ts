/**
 * The "Future of AI" essay as data, one file per language, rendered by
 * src/components/Essay.astro. Text fields are trusted HTML (inline <strong>,
 * <em>, <code> only). Section numbers are derived from the order of `h2`s.
 */

export type Block =
  | { type: 'h2'; html: string }
  | { type: 'p'; html: string }
  | { type: 'quote'; html: string }
  | { type: 'list'; variant: 'corners' | 'ready' | 'checklist'; items: string[] }
  | { type: 'note'; label: string; eyebrow: string; intro: string; items: string[]; close: string }
  | { type: 'code'; code: string; lang: 'yaml'; title?: string }
  | { type: 'toast'; title: string; meta: string; primary: string; secondary: string; time: string; caption: string }
  | { type: 'cta'; text: string; button: string }
  // Wide blocks, rendered outside the reading column:
  | { type: 'table'; variant: 'shift' | 'stages' | 'compare'; head: string[]; rows: string[][] }
  | { type: 'flow'; label: string; steps: { who: string; step: string; back?: string }[] }
  | { type: 'lanes'; lanes: { tag: string; title: string; lead: string; items: string[] }[] }
  | { type: 'frictions'; items: { title: string; text: string }[] }
  | { type: 'memory'; label: string; tag: string; items: string; owner: string; perspectives: { lens: string; title: string; text: string }[] }
  | { type: 'gateway'; clients: { who: string; where: string }[]; title: string; sub: string; chips: string[]; models: string; caption: string };

export type Essay = {
  lang: 'en' | 'de';
  path: string;
  title: string;
  description: string;
  eyebrow: string;
  heading: string;
  accent: string;
  intro: string[];
  blocks: Block[];
};

export const h2 = (html: string): Block => ({ type: 'h2', html });
export const p = (html: string): Block => ({ type: 'p', html });
export const quote = (html: string): Block => ({ type: 'quote', html });

export const hookConfig = `# fix what doesn't change behaviour, before it's committed
pre-commit:
  commands:
    fix:
      glob: "*.{js,ts,tsx,json}"
      run: npx biome check --write --no-errors-on-unmatched {staged_files}
      stage_fixed: true # re-stage what was fixed

pre-push:
  commands:
    types:
      run: npx tsc --noEmit`;

export const WIDE_BLOCKS = new Set<Block['type']>(['table', 'flow', 'lanes', 'frictions', 'memory', 'gateway']);
