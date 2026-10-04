import { configureAxe } from 'vitest-axe';

/**
 * axe configured for component tests. `region` is a page-level rule (all content inside landmarks) that cannot pass for
 * a component rendered in isolation, so it is off here; every other rule, including best practices, stays on.
 * Color contrast cannot be computed in jsdom; scripts/tokens/tokens.test.ts covers it from the token values instead.
 */
export const axe = configureAxe({
  rules: { region: { enabled: false } },
});
