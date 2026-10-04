import { act, render, renderHook, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { axe } from '../../test/axe';
import { getThemeScript, THEME_STORAGE_KEY, ThemeProvider, ThemeScript, useTheme } from './ThemeProvider';

const wrapper = ({ children }: { children: ReactNode }) => <ThemeProvider>{children}</ThemeProvider>;

function mockSystemDark(matches: boolean) {
  vi.spyOn(window, 'matchMedia').mockImplementation(
    (query) =>
      ({
        matches,
        media: query,
        onchange: null,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
      }) satisfies MediaQueryList,
  );
}

afterEach(() => {
  localStorage.clear();
  delete document.documentElement.dataset.theme;
  vi.restoreAllMocks();
});

describe('ThemeProvider', () => {
  it('defaults to system and leaves the root attribute unset', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.theme).toBe('system');
    expect(document.documentElement.dataset.theme).toBeUndefined();
  });

  it('resolves system to the OS preference', () => {
    mockSystemDark(true);
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.resolvedTheme).toBe('dark');
  });

  it('applies and persists an explicit choice', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });

    act(() => result.current.setTheme('dark'));

    expect(result.current.resolvedTheme).toBe('dark');
    expect(document.documentElement.dataset.theme).toBe('dark');
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
  });

  it('clears storage and the attribute when returning to system', () => {
    const { result } = renderHook(() => useTheme(), { wrapper });
    act(() => result.current.setTheme('light'));
    act(() => result.current.setTheme('system'));

    expect(document.documentElement.dataset.theme).toBeUndefined();
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBeNull();
  });

  it('reads a stored choice on mount', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'dark');
    const { result } = renderHook(() => useTheme(), { wrapper });
    expect(result.current.theme).toBe('dark');
  });

  it('throws a clear error outside a provider', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useTheme())).toThrow('useTheme must be called inside a ThemeProvider');
  });
});

describe('getThemeScript', () => {
  it('applies a stored theme before React runs', () => {
    localStorage.setItem('custom-key', 'dark');
    new Function(getThemeScript('custom-key'))();
    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it('ignores unknown stored values', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'sepia');
    new Function(getThemeScript())();
    expect(document.documentElement.dataset.theme).toBeUndefined();
  });

  it('renders as an inline script element', () => {
    const { container } = render(<ThemeScript />);
    expect(container.querySelector('script')?.textContent).toBe(getThemeScript());
  });
});

describe('ThemeProvider accessibility', () => {
  it('adds no markup of its own, so it cannot introduce violations', async () => {
    const { container } = render(
      <ThemeProvider>
        <p>Content</p>
      </ThemeProvider>,
    );
    expect(screen.getByText('Content').parentElement).toBe(container);
    expect(await axe(container)).toHaveNoViolations();
  });
});
