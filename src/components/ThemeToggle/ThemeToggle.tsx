import { Monitor, Moon, Sun } from 'lucide-react';
import type { Key, ToggleButtonGroupProps } from 'react-aria-components';
import { composeRenderProps, ToggleButtonGroup } from 'react-aria-components';
import { cn } from '../../lib/cn';
import type { ThemePreference } from '../ThemeProvider';
import { useTheme } from '../ThemeProvider';
import { ToggleButton } from '../ToggleButton';

const OPTIONS = [
  { id: 'light', label: 'Light theme', icon: Sun },
  { id: 'dark', label: 'Dark theme', icon: Moon },
  { id: 'system', label: 'Match system theme', icon: Monitor },
] as const satisfies readonly { id: ThemePreference; label: string; icon: unknown }[];

const isThemePreference = (key: Key | undefined): key is ThemePreference =>
  key === 'light' || key === 'dark' || key === 'system';

export interface ThemeToggleProps
  extends Omit<ToggleButtonGroupProps, 'selectionMode' | 'selectedKeys' | 'defaultSelectedKeys' | 'onSelectionChange'> {
  /** Names the group for assistive technology. Defaults to "Theme". */
  'aria-label'?: string;
}

/** Segmented control for light, dark or system theme. Must render inside a ThemeProvider. */
export function ThemeToggle({ className, 'aria-label': ariaLabel = 'Theme', ...props }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();

  return (
    <ToggleButtonGroup
      {...props}
      aria-label={ariaLabel}
      selectionMode="single"
      disallowEmptySelection
      selectedKeys={[theme]}
      onSelectionChange={(keys) => {
        const [next] = keys;
        if (isThemePreference(next)) setTheme(next);
      }}
      className={composeRenderProps(className, (className) =>
        cn('inline-flex w-fit gap-0.5 rounded-lg border border-border bg-surface-sunken p-0.5', className),
      )}
    >
      {OPTIONS.map(({ id, label, icon }) => (
        <ToggleButton
          key={id}
          id={id}
          icon={icon}
          aria-label={label}
          variant="ghost"
          size="sm"
          className="size-7 data-selected:bg-surface-raised data-selected:text-fg data-selected:shadow-raised"
        />
      ))}
    </ToggleButtonGroup>
  );
}
