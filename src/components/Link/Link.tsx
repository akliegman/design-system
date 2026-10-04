import { cva, type VariantProps } from 'class-variance-authority';
import { ArrowUpRight } from 'lucide-react';
import type { ReactNode, Ref } from 'react';
import type { LinkProps as AriaLinkProps } from 'react-aria-components';
import { Link as AriaLink, composeRenderProps } from 'react-aria-components';
import { cn } from '../../lib/cn';
import { Icon } from '../Icon';

export const linkStyles = cva(
  [
    'cursor-pointer rounded-sm font-medium underline-offset-[0.2em] outline-none transition-colors',
    'decoration-1 data-focus-visible:focus-ring',
    'data-disabled:cursor-not-allowed data-disabled:no-underline data-disabled:opacity-50',
  ],
  {
    variants: {
      /** Color of the link text. */
      tone: {
        /** Accent text. The default, and the only choice inside running prose. */
        accent: 'text-accent-text decoration-accent-text/40 data-hovered:decoration-accent-text',
        /** Inherits the surrounding text color. For footers and metadata where accent would be loud. */
        inherit: 'text-current decoration-current/40 data-hovered:decoration-current',
      },
      /** When the underline shows. Links in prose always underline so color is not the only cue (WCAG 1.4.1). */
      underline: {
        /** Always underlined. Required inside paragraphs. */
        always: 'underline',
        /** Underlined on hover only. For navigation lists where position already signals a link. */
        hover: 'no-underline data-hovered:underline',
      },
    },
    defaultVariants: { tone: 'accent', underline: 'always' },
  },
);

export interface LinkProps extends Omit<AriaLinkProps, 'children'>, VariantProps<typeof linkStyles> {
  children: ReactNode;
  /**
   * Opens in a new tab with `rel="noopener noreferrer"`, adds an arrow icon, and tells screen readers the link opens a
   * new tab. Defaults to true for absolute http(s) URLs; pass false for absolute URLs on your own domain.
   */
  isExternal?: boolean;
  ref?: Ref<HTMLAnchorElement>;
}

const ABSOLUTE_URL = /^https?:\/\//;

export function Link({ tone, underline, isExternal, className, children, ...props }: LinkProps) {
  const external = isExternal ?? (typeof props.href === 'string' && ABSOLUTE_URL.test(props.href));

  return (
    <AriaLink
      {...props}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={composeRenderProps(className, (className) => cn(linkStyles({ tone, underline }), className))}
    >
      {children}
      {external && (
        <>
          <Icon icon={ArrowUpRight} size="xs" className="ms-0.5 inline-block align-[-0.0625em] rtl:-scale-x-100" />
          <span className="sr-only"> (opens in a new tab)</span>
        </>
      )}
    </AriaLink>
  );
}
