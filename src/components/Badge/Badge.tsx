import { cva, type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import type { HTMLAttributes, ReactNode, Ref } from 'react';
import { cn } from '../../lib/cn';
import { Icon } from '../Icon';

export const badgeStyles = cva(
  'inline-flex w-fit shrink-0 items-center gap-1 whitespace-nowrap rounded-full font-medium tabular-nums',
  {
    variants: {
      /** Meaning of the status. Color reinforces the label; it never replaces it. */
      tone: {
        /** Neutral metadata: counts, categories, drafts. */
        neutral: 'bg-surface-hover text-fg',
        /** New, featured or selected. */
        accent: 'bg-accent-subtle text-accent-text',
        /** Complete, healthy, passing. */
        success: 'bg-success-subtle text-success-text',
        /** Degraded, expiring, needs review. */
        warning: 'bg-warning-subtle text-warning-text',
        /** Failed, blocked, overdue. */
        danger: 'bg-danger-subtle text-danger-text',
      },
      /** Badge height. */
      size: {
        /** 20px. Inside tables and dense lists. */
        sm: 'h-5 px-2 text-xs',
        /** 24px. Default. */
        md: 'h-6 px-2.5 text-sm',
      },
    },
    defaultVariants: { tone: 'neutral', size: 'md' },
  },
);

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement>, VariantProps<typeof badgeStyles> {
  children: ReactNode;
  /** Optional leading icon. Decorative; the label must stand on its own. */
  icon?: LucideIcon;
  ref?: Ref<HTMLSpanElement>;
}

/** A static status label. Not interactive; for a removable or selectable chip use a ToggleButton. */
export function Badge({ tone, size, icon, className, children, ...props }: BadgeProps) {
  return (
    <span {...props} className={cn(badgeStyles({ tone, size }), className)}>
      {icon && <Icon icon={icon} size="xs" />}
      {children}
    </span>
  );
}
