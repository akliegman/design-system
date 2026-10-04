import type { Ref } from 'react';
import type {
  TabListProps as AriaTabListProps,
  TabPanelProps as AriaTabPanelProps,
  TabProps as AriaTabProps,
  TabsProps as AriaTabsProps,
} from 'react-aria-components';
import {
  Tab as AriaTab,
  TabList as AriaTabList,
  TabPanel as AriaTabPanel,
  Tabs as AriaTabs,
  composeRenderProps,
  SelectionIndicator,
} from 'react-aria-components';
import { cn } from '../../lib/cn';

export interface TabsProps extends AriaTabsProps {
  ref?: Ref<HTMLDivElement>;
}

/**
 * Switches between views of related content in one place. Arrow keys move between tabs and select them; set
 * `keyboardActivation="manual"` when rendering a panel is expensive, so Enter or Space selects instead.
 */
export function Tabs({ className, ...props }: TabsProps) {
  return (
    <AriaTabs
      {...props}
      className={composeRenderProps(className, (className) =>
        cn('flex gap-4 data-[orientation=horizontal]:flex-col', className),
      )}
    />
  );
}

export interface TabListProps<T extends object> extends AriaTabListProps<T> {
  ref?: Ref<HTMLDivElement>;
}

export function TabList<T extends object>({ className, ...props }: TabListProps<T>) {
  return (
    <AriaTabList
      {...props}
      className={composeRenderProps(className, (className) =>
        cn(
          'flex w-fit gap-1 rounded-lg bg-surface-sunken p-1',
          'data-[orientation=vertical]:flex-col data-[orientation=vertical]:self-start',
          className,
        ),
      )}
    />
  );
}

export interface TabProps extends AriaTabProps {
  ref?: Ref<HTMLDivElement>;
}

export function Tab({ className, children, ...props }: TabProps) {
  return (
    <AriaTab
      {...props}
      className={composeRenderProps(className, (className) =>
        cn(
          'relative flex h-8 cursor-default select-none items-center justify-center rounded-md px-3 font-medium text-base',
          'text-fg-muted outline-none transition-colors data-hovered:text-fg data-focus-visible:focus-ring',
          'data-selected:text-fg data-disabled:cursor-not-allowed data-disabled:opacity-50',
          className,
        ),
      )}
    >
      {composeRenderProps(children, (children) => (
        <>
          <SelectionIndicator className="absolute inset-0 rounded-md border border-border bg-surface-raised shadow-raised transition-[translate,width,height] duration-(--ds-duration-base) ease-standard" />
          <span className="relative">{children}</span>
        </>
      ))}
    </AriaTab>
  );
}

export interface TabPanelProps extends AriaTabPanelProps {
  ref?: Ref<HTMLDivElement>;
}

export function TabPanel({ className, ...props }: TabPanelProps) {
  return (
    <AriaTabPanel
      {...props}
      className={composeRenderProps(className, (className) =>
        cn('rounded-md text-base text-fg outline-none data-focus-visible:focus-ring', className),
      )}
    />
  );
}
