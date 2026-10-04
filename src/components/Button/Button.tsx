import { cva, type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode, Ref } from 'react';
import type { ButtonProps as AriaButtonProps } from 'react-aria-components';
import { Button as AriaButton, composeRenderProps } from 'react-aria-components';
import { cn } from '../../lib/cn';
import { Icon } from '../Icon';
import { Spinner } from './Spinner';

export const buttonStyles = cva(
  [
    'relative inline-flex shrink-0 cursor-default select-none items-center justify-center whitespace-nowrap rounded-md font-medium',
    'outline-none transition-[background-color,border-color,color,box-shadow,scale]',
    'data-focus-visible:focus-ring motion-safe:data-pressed:scale-[0.98]',
    'data-disabled:cursor-not-allowed data-disabled:opacity-50 data-pending:cursor-progress',
  ],
  {
    variants: {
      /** Visual weight. Pick by how important the action is relative to everything else in view. */
      variant: {
        /** The single most important action in a view. Solid accent fill. */
        primary: 'bg-accent text-fg-on-accent shadow-raised data-hovered:bg-accent-hover',
        /** Supporting actions next to a primary one. Raised neutral surface. */
        secondary:
          'border border-border bg-surface-raised text-fg shadow-raised data-hovered:bg-surface-hover data-pressed:bg-surface-pressed',
        /** Low-emphasis actions in toolbars, tables and dense UI. No fill until hovered. */
        ghost: 'text-fg data-hovered:bg-surface-hover data-pressed:bg-surface-pressed',
        /** Destructive, hard-to-reverse actions such as delete. Pair with a confirmation. */
        danger: 'bg-danger text-fg-on-danger shadow-raised data-hovered:bg-danger-hover',
      },
      /** Control height. Keep one size per row of controls. */
      size: {
        /** 32px. Dense tables, toolbars and inline actions. */
        sm: 'h-8 gap-1.5 px-3 text-sm',
        /** 36px. Default for forms and dialogs. */
        md: 'h-9 gap-2 px-4 text-base',
        /** 44px. Marketing surfaces and touch-first layouts. */
        lg: 'h-11 gap-2 px-5 text-md',
      },
    },
    defaultVariants: { variant: 'secondary', size: 'md' },
  },
);

export interface ButtonProps
  extends Omit<AriaButtonProps, 'children' | 'isPending' | 'render'>,
    VariantProps<typeof buttonStyles> {
  children: ReactNode;
  /** Icon rendered before the label. Decorative; the label carries the meaning. */
  iconStart?: LucideIcon;
  /** Icon rendered after the label, typically a chevron or arrow that hints at what happens next. */
  iconEnd?: LucideIcon;
  /**
   * Shows a spinner, sets `aria-busy`, and ignores presses while keeping focus and the button's width. Use it for the
   * duration of an async action instead of toggling `isDisabled`.
   */
  isLoading?: boolean;
  ref?: Ref<HTMLButtonElement>;
}

export function Button({
  variant,
  size,
  iconStart,
  iconEnd,
  isLoading = false,
  className,
  children,
  ...props
}: ButtonProps) {
  const iconSize = size === 'lg' ? 'md' : 'sm';

  return (
    <AriaButton
      {...props}
      isPending={isLoading}
      render={(domProps, { isPending }) => <button {...domProps} aria-busy={isPending || undefined} />}
      className={composeRenderProps(className, (className) => cn(buttonStyles({ variant, size }), className))}
    >
      <span className={cn('inline-flex items-center gap-[inherit]', isLoading && 'invisible')}>
        {iconStart && <Icon icon={iconStart} size={iconSize} />}
        {children}
        {iconEnd && <Icon icon={iconEnd} size={iconSize} />}
      </span>
      {isLoading && <Spinner size={iconSize} />}
    </AriaButton>
  );
}
