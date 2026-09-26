/**
 * Renders a four-pointed "sparkle" as a field of ASCII characters.
 * Runs at build time, so the output is plain text in the HTML.
 */
const RAMP = ' .·:-+=*#';

// Small deterministic hash so the texture is stable between builds.
function noise(x: number, y: number): number {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

export function sparkle(cols = 64, rows = 34): string {
  const lines: string[] = [];
  for (let r = 0; r < rows; r++) {
    let line = '';
    for (let c = 0; c < cols; c++) {
      // Normalise to -1..1; characters are ~2x taller than wide, so cols ≈ 2 * rows.
      const x = (c / (cols - 1)) * 2 - 1;
      const y = (r / (rows - 1)) * 2 - 1;
      // Astroid-like superellipse (p < 1) gives the pinched, four-point star.
      const d = Math.pow(Math.abs(x), 0.55) + Math.pow(Math.abs(y), 0.55);
      let v = Math.max(0, 1 - d) * 2.4;
      // Faint halo of scattered dots around the star.
      if (v === 0 && d < 1.45 && noise(c, r) > 0.9) v = 0.12;
      v *= 0.75 + noise(r, c) * 0.5;
      const i = Math.min(RAMP.length - 1, Math.floor(v * RAMP.length));
      line += RAMP[i];
    }
    lines.push(line.replace(/\s+$/, ''));
  }
  return lines.join('\n');
}
