import { useLayoutEffect, useRef, useState } from 'react';
import { contrastRatio, parseCssColor } from '../../lib/color';
import { CONTRAST_PAIRS } from '../../tokens/contrastPairs';

type Ratios = Record<string, number | null>;

const pairKey = (index: number, theme: string) => `${index}-${theme}`;

/**
 * Measures each pair from computed styles in the browser, so the numbers describe the CSS that actually shipped. The
 * unit test computes the same pairs from the token JSON and fails the build below the minimum.
 */
export function ContrastTable() {
  const probes = useRef<HTMLTableElement>(null);
  const [ratios, setRatios] = useState<Ratios>({});

  useLayoutEffect(() => {
    const next: Ratios = {};
    for (const probe of probes.current?.querySelectorAll<HTMLElement>('[data-pair]') ?? []) {
      const style = getComputedStyle(probe);
      const fg = parseCssColor(style.color);
      const bg = parseCssColor(style.backgroundColor);
      next[probe.dataset.pair ?? ''] = fg && bg ? contrastRatio(fg, bg) : null;
    }
    setRatios(next);
  }, []);

  return (
    <div className="not-prose overflow-x-auto">
      <table ref={probes} className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-border border-b text-fg-muted">
            <th className="py-2 pe-4 text-start font-medium">Sample</th>
            <th className="py-2 pe-4 text-start font-medium">Foreground on background</th>
            <th className="py-2 pe-4 text-end font-medium">Minimum</th>
            <th className="py-2 pe-4 text-end font-medium">Light</th>
            <th className="py-2 pe-4 text-end font-medium">Dark</th>
            <th className="py-2 text-start font-medium">Used by</th>
          </tr>
        </thead>
        <tbody>
          {CONTRAST_PAIRS.map((pair, index) => (
            <tr key={`${pair.fg}-${pair.bg}`} className="border-border border-b">
              <td className="py-2 pe-4">
                <div className="flex gap-1">
                  {(['light', 'dark'] as const).map((theme) => (
                    <span
                      key={theme}
                      data-theme={theme}
                      data-pair={pairKey(index, theme)}
                      className="rounded-md border border-border px-2 py-0.5 font-medium"
                      style={{ color: `var(--ds-color-${pair.fg})`, backgroundColor: `var(--ds-color-${pair.bg})` }}
                    >
                      Aa
                    </span>
                  ))}
                </div>
              </td>
              <td className="py-2 pe-4 font-mono text-fg text-xs">
                {pair.fg} / {pair.bg}
              </td>
              <td className="py-2 pe-4 text-end text-fg-muted tabular-nums">{pair.min}:1</td>
              {(['light', 'dark'] as const).map((theme) => {
                const ratio = ratios[pairKey(index, theme)];
                const passes = ratio != null && ratio >= pair.min;
                return (
                  <td
                    key={theme}
                    className={`py-2 pe-4 text-end font-medium tabular-nums ${passes ? 'text-success-text' : 'text-danger-text'}`}
                  >
                    {ratio == null ? 'n/a' : `${ratio.toFixed(2)}:1`}
                  </td>
                );
              })}
              <td className="py-2 text-fg-muted">{pair.usedBy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
