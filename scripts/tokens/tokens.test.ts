// @vitest-environment node
import { contrastRatio, isInSrgbGamut, oklchToLinearSrgb } from '../../src/lib/color.ts';
import { CONTRAST_PAIRS } from '../../src/tokens/contrastPairs.ts';
import type { ColorValue } from './load.ts';
import { loadTokens, resolve } from './load.ts';

const tokens = loadTokens();

function rgb(role: string, mode: 'light' | 'dark') {
  const { components } = resolve(tokens, `{color.${role}}`, mode) as ColorValue;
  const [l, c, h] = components;
  return oklchToLinearSrgb({ l, c, h });
}

describe('primitives', () => {
  const colors = tokens.filter((token) => token.layer === 'primitive' && token.type === 'color');

  it.each(colors.map((token) => [token.path, token.value as ColorValue] as const))(
    '%s is inside the sRGB gamut',
    (_, value) => {
      const [l, c, h] = value.components;
      expect(isInSrgbGamut({ l, c, h })).toBe(true);
    },
  );
});

describe('semantic colors', () => {
  const semanticColors = tokens.filter((token) => token.layer === 'semantic' && token.type === 'color');

  it('defines a dark value for every role', () => {
    expect(semanticColors.filter((token) => token.dark === undefined)).toEqual([]);
  });

  it('covers every role named in the contrast pairs', () => {
    const roles = new Set(semanticColors.map((token) => token.path.replace('color.', '')));
    const missing = CONTRAST_PAIRS.flatMap(({ fg, bg }) => [fg, bg]).filter((role) => !roles.has(role));
    expect(missing).toEqual([]);
  });
});

describe.each(['light', 'dark'] as const)('contrast in %s mode', (mode) => {
  it.each(CONTRAST_PAIRS.map((pair) => [`${pair.fg} on ${pair.bg}`, pair] as const))(
    '%s meets its minimum',
    (_, { fg, bg, min }) => {
      const ratio = contrastRatio(rgb(fg, mode), rgb(bg, mode));
      expect(Number(ratio.toFixed(2))).toBeGreaterThanOrEqual(min);
    },
  );
});
