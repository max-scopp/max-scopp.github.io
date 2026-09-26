/**
 * Liquid glass — a framework-free port of the refraction kernel from
 * liqui.design (@liqui-design/glass, MIT © 2026 Fan Li,
 * https://github.com/leefanv/liqui-design).
 *
 * Anatomy (see `.lg` rules in global.css):
 *   backdrop (blur + saturate) → refract (SVG displacement) → tint → shine → content
 *
 * The displacement map is rendered per surface size on a canvas: a rounded-rect
 * signed distance field gives depth + outward normal per pixel, and a lookup
 * table built from a convex glass profile (Snell's law, n = 1.5) gives the
 * refraction magnitude across the bezel. The map feeds an feDisplacementMap
 * that is applied via `backdrop-filter: url(#id)`.
 *
 * Refraction only renders in Chromium; Safari and Firefox keep the frosted
 * fallback that the CSS provides by default.
 */

type Profile = 'squircle' | 'convex' | 'rim';

/** Material settings (liqui.design playground values). */
export const GLASS = {
  profile: 'convex' as Profile,
  refraction: 60, // px — feDisplacementMap scale
  bezel: 20, // px — width of the refracting rim
  dispersion: 0, // chromatic split; 0 = single pass
  // frost (0.7), blur (1px), specular (0) and saturation (1.7) are expressed
  // in CSS: see the --lg-* tokens in global.css.
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

const mapCache = new Map<string, string>();

/**
 * R encodes horizontal displacement, B vertical, 128 is neutral. Pixels sample
 * toward the centre (convex-lens edge magnification).
 */
function displacementMap(fullW: number, fullH: number, fullRadius: number, fullBezel: number, lut: Float32Array) {
  const key = `${fullW}x${fullH}r${fullRadius}b${fullBezel}`;
  const hit = mapCache.get(key);
  if (hit) return hit;

  // Large surfaces render at half resolution; the field is smooth.
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
      const depth = -sd;

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

      const d = depth / bezel;
      const inRim = d >= 0 && d < 1;
      const mag = inRim ? lut[Math.min(Math.round(d * (LUT_SIZE - 1)), LUT_SIZE - 1)] : 0;

      const i = (y * w + x) * 4;
      data[i] = Math.round(128 - nx * mag * 127);
      data[i + 1] = 128;
      data[i + 2] = Math.round(128 - ny * mag * 127);
      data[i + 3] = 255;
    }
  }

  ctx.putImageData(image, 0, 0);
  const url = canvas.toDataURL();
  mapCache.set(key, url);
  return url;
}

let host: SVGSVGElement | null = null;
const filterIds = new Map<string, string>();
let nextId = 0;

function svg(name: string, attrs: Record<string, string | number>) {
  const node = document.createElementNS(SVG_NS, name);
  for (const [k, v] of Object.entries(attrs)) node.setAttribute(k, String(v));
  return node;
}

function ensureFilter(w: number, h: number, mapHref: string): string {
  const key = `${w}x${h}|${mapHref.length}:${mapHref.slice(-24)}`;
  const existing = filterIds.get(key);
  if (existing) return existing;

  if (!host) {
    host = svg('svg', { width: 0, height: 0, 'aria-hidden': 'true' }) as SVGSVGElement;
    host.style.cssText = 'position:absolute;width:0;height:0;pointer-events:none';
    document.body.appendChild(host);
  }

  const id = `lg-refract-${nextId++}`;
  const filter = svg('filter', {
    id,
    x: 0,
    y: 0,
    width: w,
    height: h,
    filterUnits: 'userSpaceOnUse',
    'color-interpolation-filters': 'sRGB',
  });
  const image = svg('feImage', { x: 0, y: 0, width: w, height: h, result: 'map' });
  image.setAttribute('href', mapHref);
  filter.appendChild(image);

  const displace = (scale: number, result: string) =>
    svg('feDisplacementMap', {
      in: 'SourceGraphic',
      in2: 'map',
      scale,
      xChannelSelector: 'R',
      yChannelSelector: 'B',
      result,
    });

  const { refraction, dispersion } = GLASS;
  if (dispersion > 0) {
    const isolate = {
      R: '1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0',
      G: '0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0',
      B: '0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0',
    };
    (['R', 'G', 'B'] as const).forEach((c, i) => {
      filter.appendChild(displace(refraction * (1 + (i - 1) * dispersion), `d${c}`));
      filter.appendChild(svg('feColorMatrix', { in: `d${c}`, values: isolate[c], result: `c${c}` }));
    });
    filter.appendChild(svg('feComposite', { in: 'cR', in2: 'cG', operator: 'arithmetic', k2: 1, k3: 1, result: 'cRG' }));
    filter.appendChild(svg('feComposite', { in: 'cRG', in2: 'cB', operator: 'arithmetic', k2: 1, k3: 1 }));
  } else {
    filter.appendChild(displace(refraction, 'out'));
  }

  host.appendChild(filter);
  filterIds.set(key, id);
  return id;
}

/** Upgrade every `.lg` surface on the page to refraction where supported. */
export function initLiquidGlass() {
  if (!supportsRefraction()) return;
  const lut = refractionLUT(GLASS.profile);

  document.querySelectorAll<HTMLElement>('.lg').forEach((el) => {
    const layer = el.querySelector<HTMLElement>(':scope > .lg__refract');
    if (!layer) return;

    let last = '';
    const apply = (w: number, h: number) => {
      if (w <= 0 || h <= 0) return;
      const radius = parseFloat(getComputedStyle(el).borderTopLeftRadius) || 0;
      const key = `${w}x${h}r${radius}`;
      if (key === last) return;
      last = key;
      const map = displacementMap(w, h, radius, GLASS.bezel, lut);
      const id = ensureFilter(w, h, map);
      layer.style.setProperty('backdrop-filter', `url(#${id})`);
      layer.style.setProperty('-webkit-backdrop-filter', `url(#${id})`);
      el.classList.add('lg--refract');
    };

    // Layout sizes, unaffected by transforms (e.g. the reveal animation).
    apply(el.offsetWidth, el.offsetHeight);
    new ResizeObserver(() => apply(el.offsetWidth, el.offsetHeight)).observe(el);
  });
}
