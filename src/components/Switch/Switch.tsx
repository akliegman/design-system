import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode, Ref } from 'react';
import type { SwitchProps as AriaSwitchProps } from 'react-aria-components';
import { Switch as AriaSwitch, composeRenderProps } from 'react-aria-components';
import { cn } from '../../lib/cn';

export const switchTrackStyles = cva(
  [
    'flex shrink-0 items-center rounded-full border border-border-strong bg-surface-sunken p-px',
    'transition-[background-color,border-color] group-data-focus-visible:focus-ring',
    'group-data-selected:border-accent group-data-selected:bg-accent',
    'group-data-selected:group-data-hovered:border-accent-hover group-data-selected:group-data-hovered:bg-accent-hover',
  ],
  {
    variants: {
      /** Track size. */
      size: {
        /** 28 by 16. Dense settings lists. */
        sm: 'h-4 w-7',
        /** 36 by 20. Default. */
        md: 'h-5 w-9',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

const thumbStyles = cva(
  [
    'rounded-full bg-fg-muted shadow-raised transition-[translate,background-color] duration-(--ds-duration-base)',
    'group-data-selected:bg-fg-on-accent',
  ],
  {
    variants: {
      /** Thumb size and travel distance, matched to the track size. */
      size: {
        /** 12px thumb, 12px travel. */
        sm: 'size-3 group-data-selected:translate-x-3 rtl:group-data-selected:-translate-x-3',
        /** 16px thumb, 16px travel. */
        md: 'size-4 group-data-selected:translate-x-4 rtl:group-data-selected:-translate-x-4',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export interface SwitchProps extends Omit<AriaSwitchProps, 'children'>, VariantProps<typeof switchTrackStyles> {
  /** Visible label naming the setting, phrased so "on" reads as true ("Email notifications", not "Mute emails"). */
  children: ReactNode;
  ref?: Ref<HTMLLabelElement>;
}

/** An on/off setting that takes effect immediately. For choices applied on submit, use a Checkbox. */
export function Switch({ size, className, children, ...props }: SwitchProps) {
  return (
    <AriaSwitch
      {...props}
      className={composeRenderProps(className, (className) =>
        cn(
          'group flex items-center gap-2.5 text-base text-fg',
          'data-disabled:cursor-not-allowed data-disabled:opacity-50',
          className,
        ),
      )}
    >
      <span className={switchTrackStyles({ size })}>
        <span className={thumbStyles({ size })} />
      </span>
      {children}
    </AriaSwitch>
  );
}
