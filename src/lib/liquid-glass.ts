/**
 * Liquid glass — refraction kernel ported from liqui.design
 * (@liqui-design/glass, MIT © 2026 Fan Li, https://github.com/leefanv/liqui-design),
 * extended into a stacked, region-aware material.
 *
 * Every `.lg` surface gets a single `backdrop-filter: url(#id)`. The SVG filter
 * stacks the material in passes over the backdrop:
 *
 *   1. refraction — feDisplacementMap through a convex bezel (map R/B channels)
 *   2. inner      — frost blur, mild saturation (the flat centre)
 *   3. outer      — softer blur, stronger saturation (the bezel)
 *   4. stack      — outer over inner through the rim mask (map G channel)
 *   5. tint       — frost wash, full in the centre and thinner on the rim
 *
 * The displacement map is rendered per surface size on a canvas: a rounded-rect
 * signed distance field gives depth + outward normal per pixel, and a lookup
 * table built from a convex glass profile (Snell's law, n = 1.5) gives the
 * refraction magnitude across the bezel. The bezel is clamped to the shape so
 * the lens profile always completes before the centre — a bezel wider than half
 * the surface would flip the displacement at the centre line and tear it.
 *
 * Refraction only renders in Chromium; Safari and Firefox keep the frosted
 * fallback that the CSS provides by default.
 */

type Profile = 'squircle' | 'convex' | 'rim';

export const GLASS = {
  profile: 'convex' as Profile,
  refraction: 45, // px — displacement scale through the bezel
  bezel: 12, // px — width of the curved rim (clamped to fit the shape)
  dispersion: 0, // chromatic split; 0 = single refraction pass
  inner: { blur: 5, saturation: 1.15 }, // flat centre: frosted
  outer: { blur: 2.5, saturation: 1.9 }, // bezel: softly blurred, more saturated
  rimTint: 0.6, // tint strength on the rim, relative to the centre
};

const SVG_NS = 'http://www.w3.org/2000/svg';
const LUT_SIZE = 128;

function supportsRefraction(): boolean {
  if (!CSS.supports('backdrop-filter', 'blur(1px)')) return false;
  const ua = navigator.userAgent;
  if (/firefox\//i.test(ua)) return false;
  if (/^((?!chrome|chromium|edg|android).)*safari/i.test(ua)) return false;
  return true;
}

/** Normalised refraction magnitude along the bezel (0 = outer edge, 1 = inner end). */
function refractionLUT(profile: Profile): Float32Array {
  const mag = new Float32Array(LUT_SIZE);
  const n = 1.5; // refractive index of glass
  const T = 0.6; // slab thickness relative to bezel width
  const h =
    profile === 'squircle'
      ? (t: number) => Math.pow(1 - Math.pow(1 - t, 4), 0.25)
      : profile === 'convex'
        ? (t: number) => Math.sqrt(1 - (1 - t) * (1 - t))
        : (t: number) => 1 - (1 - t) * (1 - t);
  const eps = 1 / 1024;
  let max = 0;
  for (let i = 0; i < LUT_SIZE; i++) {
    const t = Math.max(i / (LUT_SIZE - 1), eps);
    const hi = Math.min(t + eps, 1);
    const lo = Math.max(t - eps, 0);
    const slope = ((h(hi) - h(lo)) / (hi - lo)) * T;
    if (profile === 'rim') {
      mag[i] = (1 - t) * (1 - t);
    } else {
      const thetaI = Math.atan(Math.abs(slope));
      const delta = thetaI - Math.asin(Math.sin(thetaI) / n);
      mag[i] = h(t) * T * Math.tan(delta);
      max = Math.max(max, mag[i]);
    }
  }
  if (max > 0) for (let i = 0; i < LUT_SIZE; i++) mag[i] /= max;
  return mag;
}

const smoothstep = (x: number) => {
  const t = Math.min(Math.max(x, 0), 1);
  return t * t * (3 - 2 * t);
};

/** The bezel can't be wider than the shape allows, or the lens never completes. */
const fitBezel = (w: number, h: number) => Math.max(1, Math.min(GLASS.bezel, (Math.min(w, h) / 2) * 0.75));

const mapCache = new Map<string, string>();

/**
 * R = horizontal displacement, B = vertical (128 is neutral), sampling toward
 * the centre (convex-lens edge magnification). G = rim mask: 255 at the outer
 * edge, easing to 0 where the bezel meets the flat centre.
 */
function glassMap(fullW: number, fullH: number, fullRadius: number, fullBezel: number, lut: Float32Array) {
  const key = `${fullW}x${fullH}r${fullRadius}b${fullBezel}`;
  const hit = mapCache.get(key);
  if (hit) return hit;

  // Large surfaces render at half resolution; both fields are smooth.
  const scale = fullW * fullH > 32000 ? 0.5 : 1;
  const w = Math.ceil(fullW * scale);
  const h = Math.ceil(fullH * scale);
  const bezel = fullBezel * scale;
  const r = Math.min(fullRadius * scale, w / 2, h / 2);
  const bx = w / 2 - r;
  const by = h / 2 - r;

  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  const image = ctx.createImageData(w, h);
  const data = image.data;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const px = x + 0.5 - w / 2;
      const py = y + 0.5 - h / 2;
      const qx = Math.abs(px) - bx;
      const qy = Math.abs(py) - by;

      // Signed distance to the rounded-rect boundary (negative inside).
      const sd = Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - r;
      const d = -sd / bezel; // 0 at the edge, 1 where the bezel ends

      let nx = 0;
      let ny = 0;
      if (qx > 0 && qy > 0) {
        const len = Math.hypot(qx, qy) || 1;
        nx = (Math.sign(px) * qx) / len;
        ny = (Math.sign(py) * qy) / len;
      } else if (qx > qy) {
        nx = Math.sign(px);
      } else {
        ny = Math.sign(py);
      }

      const inRim = d >= 0 && d < 1;
      const mag = inRim ? lut[Math.min(Math.round(d * (LUT_SIZE - 1)), LUT_SIZE - 1)] : 0;
      const rim = d < 0 ? 1 : 1 - smoothstep(d);

      const i = (y * w + x) * 4;
      data[i] = Math.round(128 - nx * mag * 127);
      data[i + 1] = Math.round(rim * 255);
      data[i + 2] = Math.round(128 - ny * mag * 127);
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(image, 0, 0);
  const url = canvas.toDataURL();
  mapCache.set(key, url);
  return url;
}

/**
 * Saturation matrix with the alpha row forced to 1. feColorMatrix works on
 * un-premultiplied colour, so this also re-normalises blurred pixels near the
 * edge, which would otherwise be darkened by the transparent area outside the
 * backdrop.
 */
function saturate(s: number): string {
  return [
    0.213 + 0.787 * s, 0.715 - 0.715 * s, 0.072 - 0.072 * s, 0, 0,
    0.213 - 0.213 * s, 0.715 + 0.285 * s, 0.072 - 0.072 * s, 0, 0,
    0.213 - 0.213 * s, 0.715 - 0.715 * s, 0.072 + 0.928 * s, 0, 0,
    0, 0, 0, 0, 1,
  ]
    .map((v) => +v.toFixed(4))
    .join(' ');
}

let host: SVGSVGElement | null = null;
const filterIds = new Map<string, string>();
let nextId = 0;

function svg(name: string, attrs: Record<string, string | number>) {
  const node = document.createElementNS(SVG_NS, name);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
  return node;
}

type Tint = { color: string; alpha: number };

function ensureFilter(w: number, h: number, mapHref: string, tint: Tint): string {
  const key = `${w}x${h}|${tint.color}/${tint.alpha}|${mapHref.length}:${mapHref.slice(-24)}`;
  const existing = filterIds.get(key);
  if (existing) return existing;

  if (!host) {
    host = svg('svg', { width: 0, height: 0, 'aria-hidden': 'true' }) as SVGSVGElement;
    host.style.cssText = 'position:absolute;width:0;height:0;pointer-events:none';
    document.body.appendChild(host);
  }

  const id = `lg-glass-${nextId++}`;
  const filter = svg('filter', {
    id,
    x: 0,
    y: 0,
    width: w,
    height: h,
    filterUnits: 'userSpaceOnUse',
    'color-interpolation-filters': 'sRGB',
  });
  const add = (name: string, attrs: Record<string, string | number>) => filter.appendChild(svg(name, attrs));

  add('feImage', { x: 0, y: 0, width: w, height: h, result: 'map', href: mapHref });

  // 1. Refraction through the convex bezel.
  const displace = (scale: number, result: string) =>
    add('feDisplacementMap', {
      in: 'SourceGraphic',
      in2: 'map',
      scale,
      xChannelSelector: 'R',
      yChannelSelector: 'B',
      result,
    });
  const { refraction, dispersion, inner, outer, rimTint } = GLASS;
  if (dispersion > 0) {
    const only = {
      R: '1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0',
      G: '0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0',
      B: '0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0',
    };
    (['R', 'G', 'B'] as const).forEach((c, i) => {
      displace(refraction * (1 + (i - 1) * dispersion), `d${c}`);
      add('feColorMatrix', { in: `d${c}`, values: only[c], result: `c${c}` });
    });
    add('feComposite', { in: 'cR', in2: 'cG', operator: 'arithmetic', k2: 1, k3: 1, result: 'cRG' });
    add('feComposite', { in: 'cRG', in2: 'cB', operator: 'arithmetic', k2: 1, k3: 1, result: 'refracted' });
  } else {
    displace(refraction, 'refracted');
  }

  // 2 + 3. Inner (frosted) and outer (clear, saturated) passes.
  for (const [name, pass] of [['inner', inner], ['outer', outer]] as const) {
    let src = 'refracted';
    if (pass.blur > 0) {
      add('feGaussianBlur', { in: src, stdDeviation: pass.blur, result: `${name}Blur` });
      src = `${name}Blur`;
    }
    add('feColorMatrix', { in: src, type: 'matrix', values: saturate(pass.saturation), result: name });
  }

  // 4. Stack the outer pass over the inner one through the rim mask (map G → alpha).
  add('feColorMatrix', { in: 'map', type: 'matrix', values: '0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 1 0 0 0', result: 'rim' });
  add('feComposite', { in: 'outer', in2: 'rim', operator: 'in', result: 'outerRim' });
  add('feComposite', { in: 'outerRim', in2: 'inner', operator: 'over', result: 'glass' });

  // 5. Tint: full strength in the centre, `rimTint` of it at the outer edge.
  const fade = +(1 - rimTint).toFixed(3);
  add('feColorMatrix', { in: 'map', type: 'matrix', values: `0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 ${-fade} 0 0 1`, result: 'tintMask' });
  add('feFlood', { 'flood-color': tint.color, 'flood-opacity': tint.alpha, result: 'wash' });
  add('feComposite', { in: 'wash', in2: 'tintMask', operator: 'in', result: 'tint' });
  add('feComposite', { in: 'tint', in2: 'glass', operator: 'over' });

  host.appendChild(filter);
  filterIds.set(key, id);
  return id;
}

/** Tint colour and alpha come from the --lg-tint tokens, so they follow the theme. */
function readTint(el: HTMLElement): Tint {
  const style = getComputedStyle(el);
  const [r = '255', g = '255', b = '255'] = style.getPropertyValue('--lg-tint').trim().split(/[\s,]+/);
  const alpha = parseFloat(style.getPropertyValue('--lg-tint-a')) || 0.3;
  return { color: `rgb(${r},${g},${b})`, alpha };
}

/** Upgrade every `.lg` surface on the page to refraction where supported. */
export function initLiquidGlass() {
  if (!supportsRefraction()) return;
  const lut = refractionLUT(GLASS.profile);
  const refreshers: (() => void)[] = [];

  document.querySelectorAll<HTMLElement>('.lg').forEach((el) => {
    let last = '';
    const apply = async (force = false) => {
      const w = el.offsetWidth; // layout size, unaffected by transforms
      const h = el.offsetHeight;
      if (w <= 0 || h <= 0) return;
      const radius = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
      const bezel = fitBezel(w, h);
      const tint = readTint(el);
      const key = `${w}x${h}r${radius}b${bezel}|${tint.color}/${tint.alpha}`;
      if (key === last && !force) return;
      last = key;

      const map = glassMap(w, h, radius, bezel, lut);
      // Chromium treats the whole backdrop-filter as inert while an feImage is
      // still decoding, so decode the map first and only then swap the frosted
      // fallback for the refracting filter.
      const img = new Image();
      img.src = map;
      await img.decode().catch(() => {});
      if (key !== last) return; // resized again meanwhile

      const filter = `url(#${ensureFilter(w, h, map, tint)})`;
      el.style.setProperty('-webkit-backdrop-filter', filter);
      el.style.setProperty('backdrop-filter', filter);
      el.classList.add('lg--refract');
    };

    apply();
    new ResizeObserver(() => apply()).observe(el);
    refreshers.push(() => apply(true));
  });

  // Tint tokens change with the colour scheme.
  matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => refreshers.forEach((f) => f()));
}
