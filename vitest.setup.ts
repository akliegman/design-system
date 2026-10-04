import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import * as axeMatchers from 'vitest-axe/matchers';

expect.extend(axeMatchers);
afterEach(cleanup);

// jsdom has no Web Animations API; React Aria's SelectionIndicator reads it during transitions.
if (typeof Element !== 'undefined') Element.prototype.getAnimations ??= () => [];

// jsdom has no matchMedia. Tests that care about the system theme override `matches` per test.
if (typeof window !== 'undefined') {
  window.matchMedia ??= (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    }) satisfies MediaQueryList;
}

declare module 'vitest' {
  interface Matchers<R extends void | Promise<void> = void | Promise<void>, T = unknown> {
    /** From vitest-axe: fails with a readable list of violations when axe finds any. */
    toHaveNoViolations(): R;
  }
}
