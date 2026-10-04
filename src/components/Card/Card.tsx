import { cva, type VariantProps } from 'class-variance-authority';
import type { HTMLAttributes, Ref } from 'react';
import { cn } from '../../lib/cn';

export const cardStyles = cva('flex flex-col rounded-xl border border-border bg-surface-raised text-fg', {
  variants: {
    /** How far the card lifts off the page. */
    elevation: {
      /** Border only. For cards in a dense grid where shadows would add noise. */
      flat: '',
      /** Border plus a soft shadow. Default. */
      raised: 'shadow-raised',
    },
  },
  defaultVariants: { elevation: 'raised' },
});

export interface CardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardStyles> {
  ref?: Ref<HTMLDivElement>;
}

export interface CardSectionProps extends HTMLAttributes<HTMLDivElement> {
  ref?: Ref<HTMLDivElement>;
}

function CardRoot({ elevation, className, ...props }: CardProps) {
  return <div {...props} className={cn(cardStyles({ elevation }), className)} />;
}

/** Title area. Put a Heading and an optional muted Text inside. */
function CardHeader({ className, ...props }: CardSectionProps) {
  return <div {...props} className={cn('flex flex-col gap-1 px-5 pt-5', className)} />;
}

function CardBody({ className, ...props }: CardSectionProps) {
  return <div {...props} className={cn('flex-1 px-5 py-4 text-base', className)} />;
}

/** Actions or metadata. Separated by a hairline and aligned to the end so primary actions land bottom-right. */
function CardFooter({ className, ...props }: CardSectionProps) {
  return (
    <div
      {...props}
      className={cn(
        'flex items-center justify-end gap-2 border-border border-t px-5 py-3 text-fg-muted text-sm',
        className,
      )}
    />
  );
}

/**
 * A grouped surface for related content. Compose it from its parts:
 * `<Card><Card.Header /><Card.Body /><Card.Footer /></Card>`.
 */
export const Card = Object.assign(CardRoot, { Header: CardHeader, Body: CardBody, Footer: CardFooter });
