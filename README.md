# @akliegman/design-system

A React component library with a DTCG token pipeline, documented in Storybook at
[storybook.adamkliegman.com](https://storybook.adamkliegman.com/).

Behavior comes from [React Aria Components](https://react-spectrum.adobe.com/react-aria/). Styling is Tailwind CSS v4,
driven entirely by generated design tokens. Every component has stories with keyboard interaction tests, unit tests,
and an axe accessibility assertion, and every color pairing the components render is contrast-checked in both themes.

## Stack

React 19, TypeScript (strict, `verbatimModuleSyntax`, `noUncheckedIndexedAccess`), Tailwind CSS v4,
class-variance-authority, React Aria Components, lucide-react, Geist and Geist Mono. Storybook 10 with the Vite
builder, Vitest with Testing Library and vitest-axe, Biome for lint and format, pnpm.

## Token pipeline

```
tokens/primitives.json ─┐
                        ├─ scripts/build-tokens.ts ─> src/styles/tokens.css ─> Tailwind @theme
tokens/semantic.json  ──┘
```

- **Primitives** are raw values in [DTCG format](https://www.designtokens.org/): oklch palettes (neutral, ultramarine,
  red, green, amber), spacing base, radii, type scale, durations and easings. They never reference other tokens.
- **Semantic tokens** are roles such as `surface-raised`, `fg-muted`, `accent-text` and `focus-ring`. Each color role
  aliases a primitive for light mode in `$value` and for dark mode in `$extensions["com.akliegman.modes"].dark`.
- **The build** validates references and dark values, then writes `src/styles/tokens.css`: CSS custom properties,
  semantic colors as `light-dark()`, a reduced-motion override that zeroes durations, and a `@theme inline` block that
  clears Tailwind's default palette and maps only the semantic roles to utilities. `bg-surface` exists;
  `bg-blue-500` does not.
- **Theming** is a `color-scheme` switch. `ThemeProvider` sets `data-theme` on `<html>`, and `ThemeScript` applies a
  stored choice before first paint. Any subtree can be themed with its own `data-theme`.
- **Tests** in `scripts/tokens/tokens.test.ts` check that every primitive is inside the sRGB gamut, that every semantic
  color has a dark value, and that every pair in `src/tokens/contrastPairs.ts` meets 4.5:1 for text or 3:1 for
  boundaries, icons and focus rings, in both themes.

## Components

| Component | Built on |
| --- | --- |
| Button, IconButton, LinkButton, ToggleButton | RAC `Button`, `Link`, `ToggleButton` |
| Link, Breadcrumbs | RAC `Link`, `Breadcrumbs` |
| Heading, Text, Icon, Badge | RAC `Heading` and `Text` slots, lucide-react |
| TextField, Checkbox, CheckboxGroup, RadioGroup, Switch, Select | RAC form components with shared label, description and error |
| Dialog, Tooltip | RAC `Modal`, `Dialog`, `TooltipTrigger` |
| Tabs | RAC `Tabs` with an animated `SelectionIndicator` |
| Card | Compound: `Card.Header`, `Card.Body`, `Card.Footer` |
| ThemeProvider, ThemeToggle | `data-theme` and `color-scheme`, RAC `ToggleButtonGroup` |

Each lives in `src/components/<Name>/` with `<Name>.tsx`, `<Name>.stories.tsx`, `<Name>.test.tsx` and `index.ts`.
Variants are defined with CVA, with a JSDoc line on every variant; `className` merges last through `cn()`; refs are
plain props (React 19); props interfaces are exported.

## Scripts

| Script | Does |
| --- | --- |
| `pnpm storybook` | Storybook dev server on port 6006 |
| `pnpm build-storybook` | Static Storybook in `storybook-static/` |
| `pnpm build` | `tokens:check`, then `build-storybook`. Used by Vercel |
| `pnpm tokens:build` | Regenerate `src/styles/tokens.css` from `tokens/` |
| `pnpm tokens:check` | Fail if `tokens.css` is out of date |
| `pnpm lint` / `pnpm lint:fix` | Biome lint and format check / apply fixes |
| `pnpm typecheck` | `tsc --noEmit` |
| `pnpm test` | Vitest: component behavior, axe, token contrast |

Requires Node 22.18 or later, for `--experimental-strip-types` in the token build.

## Quality gates

CI (`.github/workflows/ci.yml`) runs on pushes to `main` and on pull requests, and fails on any of:

1. `pnpm lint`: Biome errors
2. `pnpm typecheck`: type errors, including `@ts-expect-error` assertions that required accessible names are enforced
3. `pnpm tokens:check`: generated CSS out of sync with the token JSON
4. `pnpm test`: behavior, axe violations, or a contrast pair below its minimum
5. `pnpm build-storybook`: a story or MDX page that does not build

## Deploy

Vercel builds with `pnpm build` and serves `storybook-static/`, as configured in `vercel.json`.

## License

MIT
