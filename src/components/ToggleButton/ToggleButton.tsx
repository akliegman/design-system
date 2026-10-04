import { cva, type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode, Ref } from 'react';
import type { ToggleButtonProps as AriaToggleButtonProps } from 'react-aria-components';
import { ToggleButton as AriaToggleButton, composeRenderProps } from 'react-aria-components';
import { cn } from '../../lib/cn';
import { Icon } from '../Icon';

export const toggleButtonStyles = cva(
  [
    'inline-flex shrink-0 cursor-default select-none items-center justify-center whitespace-nowrap rounded-md font-medium',
    'outline-none transition-[background-color,border-color,color,scale] data-focus-visible:focus-ring',
    'text-fg data-hovered:bg-surface-hover data-pressed:bg-surface-pressed motion-safe:data-pressed:scale-[0.98]',
    'data-selected:bg-accent-subtle data-selected:text-accent-text data-selected:data-hovered:bg-accent-subtle',
    'data-disabled:cursor-not-allowed data-disabled:opacity-50',
  ],
  {
    variants: {
      /** Resting treatment while unselected. Selected always uses the accent tint. */
      variant: {
        /** Bordered, for a toggle standing on its own. */
        secondary: 'border border-border bg-surface-raised data-selected:border-accent',
        /** Borderless, for toggles grouped in a toolbar. */
        ghost: 'border border-transparent',
      },
      /** Matches Button heights so toggles and buttons share a row. */
      size: {
        /** 32px. */
        sm: 'h-8 gap-1.5 px-3 text-sm',
        /** 36px. */
        md: 'h-9 gap-2 px-4 text-base',
      },
      /** Square footprint with no horizontal padding. Set automatically for icon-only toggles. */
      iconOnly: {
        true: 'px-0',
        false: '',
      },
    },
    compoundVariants: [
      { iconOnly: true, size: 'sm', className: 'size-8' },
      { iconOnly: true, size: 'md', className: 'size-9' },
    ],
    defaultVariants: { variant: 'secondary', size: 'md', iconOnly: false },
  },
);

interface ToggleButtonBaseProps
  extends Omit<AriaToggleButtonProps, 'children' | 'aria-label'>,
    Omit<VariantProps<typeof toggleButtonStyles>, 'iconOnly'> {
  ref?: Ref<HTMLButtonElement>;
}

interface LabelledToggleButtonProps extends ToggleButtonBaseProps {
  children: ReactNode;
  icon?: LucideIcon;
  'aria-label'?: string;
}

interface IconOnlyToggleButtonProps extends ToggleButtonBaseProps {
  children?: never;
  icon: LucideIcon;
  /** Required when there is no visible label. Name the state being toggled ("Bold"), not the action ("Toggle bold"). */
  'aria-label': string;
}

/** A visible label, or an icon with a required `aria-label`. The type system rejects an icon-only toggle with no name. */
export type ToggleButtonProps = LabelledToggleButtonProps | IconOnlyToggleButtonProps;

export function ToggleButton({ variant, size, icon, className, children, ...props }: ToggleButtonProps) {
  const iconOnly = children === undefined;

  return (
    <AriaToggleButton
      {...props}
      className={composeRenderProps(className, (className) =>
        cn(toggleButtonStyles({ variant, size, iconOnly }), className),
      )}
    >
      {icon && <Icon icon={icon} />}
      {children}
    </AriaToggleButton>
  );
}
