import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode, Ref } from 'react';
import type { HeadingProps as AriaHeadingProps } from 'react-aria-components';
import { Heading as AriaHeading } from 'react-aria-components';
import { cn } from '../../lib/cn';

export const headingStyles = cva('text-balance font-semibold text-fg', {
  variants: {
    /** Visual size, independent of the semantic level. Defaults to the size that matches the level. */
    size: {
      /** 48px. Page heroes only. */
      '4xl': 'text-4xl',
      /** 36px. Page titles. */
      '3xl': 'text-3xl',
      /** 28px. Major sections. */
      '2xl': 'text-2xl',
      /** 22px. Subsections and dialog titles. */
      xl: 'text-xl',
      /** 18px. Card titles. */
      lg: 'text-lg',
      /** 16px. Small groups and list headers. */
      md: 'text-md',
      /** 14px. Overlines inside dense UI. */
      base: 'text-base',
    },
  },
});

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingSize = NonNullable<VariantProps<typeof headingStyles>['size']>;

const SIZE_FOR_LEVEL = {
  1: '3xl',
  2: '2xl',
  3: 'xl',
  4: 'lg',
  5: 'md',
  6: 'base',
} as const satisfies Record<HeadingLevel, HeadingSize>;

export interface HeadingProps extends Omit<AriaHeadingProps, 'level'>, VariantProps<typeof headingStyles> {
  /** Document outline position. Choose it from the page structure, never from how big the text should look. */
  level: HeadingLevel;
  children: ReactNode;
  ref?: Ref<HTMLHeadingElement>;
}

/**
 * Separates semantics from appearance: `level` sets the h1 to h6 tag, `size` sets the look. Reads React Aria's heading
 * slot, so `<Heading slot="title">` inside a Dialog becomes its accessible name.
 */
export function Heading({ level, size, className, ...props }: HeadingProps) {
  return (
    <AriaHeading
      {...props}
      level={level}
      className={cn(headingStyles({ size: size ?? SIZE_FOR_LEVEL[level] }), className)}
    />
  );
}
