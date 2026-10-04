import type { ReactNode } from 'react';
import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore } from 'react';

export type ThemePreference = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

export interface ThemeContextValue {
  /** What the user chose. `system` follows the operating system. */
  theme: ThemePreference;
  /** What is actually showing right now. */
  resolvedTheme: ResolvedTheme;
  setTheme: (theme: ThemePreference) => void;
}

export const THEME_STORAGE_KEY = 'ds-theme';

const ThemeContext = createContext<ThemeContextValue | null>(null);
const DARK_QUERY = '(prefers-color-scheme: dark)';

/**
 * Inline script for the document head. It runs before first paint and applies a stored light or dark choice, so the
 * page never flashes the wrong theme. "System" needs no script: tokens.css follows `prefers-color-scheme` by default.
 */
export function getThemeScript(storageKey: string = THEME_STORAGE_KEY): string {
  return `try{var t=localStorage.getItem(${JSON.stringify(storageKey)});if(t==='light'||t==='dark')document.documentElement.dataset.theme=t}catch(e){}`;
}

/** Render inside `<head>`, before any stylesheet that paints. */
export function ThemeScript({ storageKey }: { storageKey?: string }) {
  // biome-ignore lint/security/noDangerouslySetInnerHtml: static script built from a JSON-escaped storage key, no user input.
  return <script dangerouslySetInnerHTML={{ __html: getThemeScript(storageKey) }} />;
}

function readStoredTheme(storageKey: string): ThemePreference | null {
  try {
    const stored = window.localStorage.getItem(storageKey);
    return stored === 'light' || stored === 'dark' ? stored : null;
  } catch {
    return null;
  }
}

function subscribeToSystemTheme(onChange: () => void) {
  const query = window.matchMedia(DARK_QUERY);
  query.addEventListener('change', onChange);
  return () => query.removeEventListener('change', onChange);
}

const systemPrefersDark = () => window.matchMedia(DARK_QUERY).matches;

export interface ThemeProviderProps {
  children: ReactNode;
  /** Used when nothing is stored. Defaults to `system`. */
  defaultTheme?: ThemePreference;
  /** localStorage key. Must match the key given to `ThemeScript`. */
  storageKey?: string;
}

/**
 * Owns the theme preference. It writes `data-theme` on the root element, which flips `color-scheme` and with it every
 * `light-dark()` token. Components never read the theme; they only use semantic tokens.
 */
export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = THEME_STORAGE_KEY,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemePreference>(() =>
    typeof window === 'undefined' ? defaultTheme : (readStoredTheme(storageKey) ?? defaultTheme),
  );
  const prefersDark = useSyncExternalStore(subscribeToSystemTheme, systemPrefersDark, () => false);
  const resolvedTheme: ResolvedTheme = theme === 'system' ? (prefersDark ? 'dark' : 'light') : theme;

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'system') delete root.dataset.theme;
    else root.dataset.theme = theme;
  }, [theme]);

  const setTheme = useCallback(
    (next: ThemePreference) => {
      setThemeState(next);
      try {
        if (next === 'system') window.localStorage.removeItem(storageKey);
        else window.localStorage.setItem(storageKey, next);
      } catch {
        // Storage can be unavailable (private mode, blocked cookies). The choice still applies for this session.
      }
    },
    [storageKey],
  );

  const value = useMemo(() => ({ theme, resolvedTheme, setTheme }), [theme, resolvedTheme, setTheme]);

  return <ThemeContext value={value}>{children}</ThemeContext>;
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be called inside a ThemeProvider');
  return context;
}
