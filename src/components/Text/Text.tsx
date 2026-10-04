import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode, Ref } from 'react';
import type { TextProps as AriaTextProps } from 'react-aria-components';
import { Text as AriaText } from 'react-aria-components';
import { cn } from '../../lib/cn';

export const textStyles = cva('text-pretty', {
  variants: {
    /** Step on the type scale. */
    size: {
      /** 12px. Captions, timestamps, badge labels. */
      xs: 'text-xs',
      /** 13px. Secondary UI text and field descriptions. */
      sm: 'text-sm',
      /** 14px. Default body and UI text. */
      base: 'text-base',
      /** 16px. Long-form reading. */
      md: 'text-md',
      /** 18px. Lead paragraphs. */
      lg: 'text-lg',
    },
    /** Semantic color. Status tones are for messages about that status, not decoration. */
    tone: {
      /** Primary text color. */
      default: 'text-fg',
      /** Supporting text. Still meets 4.5:1 on every surface. */
      muted: 'text-fg-muted',
      /** Highlighted values that relate to the primary action. */
      accent: 'text-accent-text',
      /** Errors and destructive consequences. */
      danger: 'text-danger-text',
      /** Confirmation that something worked. */
      success: 'text-success-text',
      /** Something needs attention but is not broken. */
      warning: 'text-warning-text',
    },
    /** Font weight. Use medium for emphasis inside UI; semibold belongs to headings. */
    weight: {
      /** 400. */
      regular: 'font-normal',
      /** 500. */
      medium: 'font-medium',
      /** 600. */
      semibold: 'font-semibold',
    },
    /** Typeface. Mono for code, IDs and tabular numbers. */
    family: {
      /** Geist. */
      sans: 'font-sans',
      /** Geist Mono. */
      mono: 'font-mono',
    },
  },
  defaultVariants: { size: 'base', tone: 'default', weight: 'regular', family: 'sans' },
});

export interface TextProps extends Omit<AriaTextProps, 'elementType'>, VariantProps<typeof textStyles> {
  /** Element to render. Defaults to `p`; use `span` inside other text and `div` around block content. */
  as?: 'p' | 'span' | 'div' | 'strong' | 'em' | 'small' | 'code';
  children: ReactNode;
  ref?: Ref<HTMLElement>;
}

/** Body text. Reads React Aria's text slots, so `<Text slot="description">` inside a field becomes its description. */
export function Text({ as = 'p', size, tone, weight, family, className, ...props }: TextProps) {
  return <AriaText {...props} elementType={as} className={cn(textStyles({ size, tone, weight, family }), className)} />;
}
