export interface Oklch {
  l: number;
  c: number;
  h: number;
  alpha?: number;
}

export type Rgb = readonly [r: number, g: number, b: number];

const GAMUT_EPSILON = 0.0005;

export function oklchToLinearSrgb({ l, c, h }: Oklch): Rgb {
  const hue = (h * Math.PI) / 180;
  const a = c * Math.cos(hue);
  const b = c * Math.sin(hue);

  const l_ = (l + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m_ = (l - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s_ = (l - 0.0894841775 * a - 1.291485548 * b) ** 3;

  return [
    4.0767416621 * l_ - 3.3077115913 * m_ + 0.2309699292 * s_,
    -1.2684380046 * l_ + 2.6097574011 * m_ - 0.3413193965 * s_,
    -0.0041960863 * l_ - 0.7034186147 * m_ + 1.707614701 * s_,
  ];
}

export function isInSrgbGamut(color: Oklch): boolean {
  return oklchToLinearSrgb(color).every((channel) => channel >= -GAMUT_EPSILON && channel <= 1 + GAMUT_EPSILON);
}

function clampUnit(value: number): number {
  return Math.min(1, Math.max(0, value));
}

function srgbToLinear(channel: number): number {
  return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
}

/** WCAG 2.x relative luminance from linear-light sRGB channels. */
export function relativeLuminance([r, g, b]: Rgb): number {
  return 0.2126 * clampUnit(r) + 0.7152 * clampUnit(g) + 0.0722 * clampUnit(b);
}

export function contrastRatio(a: Rgb, b: Rgb): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const [light, dark] = la > lb ? [la, lb] : [lb, la];
  return (light + 0.05) / (dark + 0.05);
}

/**
 * Parses the computed value of a CSS color, which browsers serialize as oklch(), rgb() or color(srgb ...)
 * depending on how the color was authored. Returns linear-light sRGB, or null for anything else.
 */
export function parseCssColor(value: string): Rgb | null {
  const numbers = (value.match(/-?\d*\.?\d+(?:e-?\d+)?/gi) ?? []).map(Number);
  const [x = 0, y = 0, z = 0] = numbers;

  if (value.startsWith('oklch(')) return oklchToLinearSrgb({ l: x, c: y, h: z });
  if (value.startsWith('rgb')) return [srgbToLinear(x / 255), srgbToLinear(y / 255), srgbToLinear(z / 255)];
  if (value.startsWith('color(srgb ')) return [srgbToLinear(x), srgbToLinear(y), srgbToLinear(z)];
  return null;
}
