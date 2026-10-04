import { cva, type VariantProps } from 'class-variance-authority';
import { ChevronRight } from 'lucide-react';
import type { ReactNode, Ref } from 'react';
import type {
  BreadcrumbProps as AriaBreadcrumbProps,
  BreadcrumbsProps as AriaBreadcrumbsProps,
} from 'react-aria-components';
import {
  Breadcrumb as AriaBreadcrumb,
  Breadcrumbs as AriaBreadcrumbs,
  composeRenderProps,
  Link,
} from 'react-aria-components';
import { cn } from '../../lib/cn';
import { Icon } from '../Icon';

export const breadcrumbsStyles = cva('flex flex-wrap items-center gap-1 text-fg-muted', {
  variants: {
    /** Text size of the trail. */
    size: {
      /** 13px. Default; sits quietly above a page title. */
      sm: 'text-sm',
      /** 14px. For trails that are the primary navigation on the page. */
      base: 'text-base',
    },
  },
  defaultVariants: { size: 'sm' },
});

export interface BreadcrumbsProps<T extends object>
  extends AriaBreadcrumbsProps<T>,
    VariantProps<typeof breadcrumbsStyles> {
  /** Names the landmark. Defaults to "Breadcrumbs"; change it only if a page has more than one trail. */
  'aria-label'?: string;
  ref?: Ref<HTMLOListElement>;
}

/**
 * The path from the site root to the current page. Renders a `nav` landmark around an ordered list; the last item is
 * marked `aria-current="page"` and is not a link.
 */
export function Breadcrumbs<T extends object>({
  size,
  className,
  'aria-label': ariaLabel = 'Breadcrumbs',
  ...props
}: BreadcrumbsProps<T>) {
  return (
    <nav aria-label={ariaLabel}>
      <AriaBreadcrumbs {...props} className={cn(breadcrumbsStyles({ size }), className)} />
    </nav>
  );
}

export interface BreadcrumbProps extends Omit<AriaBreadcrumbProps, 'children'> {
  /** Destination. Omit it on the last item: that item is the current page and renders as text with `aria-current="page"`. */
  href?: string;
  children: ReactNode;
}

export function Breadcrumb({ href, className, children, ...props }: BreadcrumbProps) {
  return (
    <AriaBreadcrumb
      {...props}
      className={composeRenderProps(className, (className) => cn('group flex items-center gap-1', className))}
    >
      {href === undefined ? (
        <span aria-current="page" className="font-medium text-fg">
          {children}
        </span>
      ) : (
        <Link
          href={href}
          className={cn(
            'rounded-sm underline-offset-[0.2em] outline-none transition-colors data-focus-visible:focus-ring',
            'data-hovered:text-fg data-hovered:underline',
          )}
        >
          {children}
        </Link>
      )}
      <Icon icon={ChevronRight} size="xs" className="text-fg-muted group-data-current:hidden rtl:rotate-180" />
    </AriaBreadcrumb>
  );
}
