import type { VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import type { ReactNode, Ref } from 'react';
import type { LinkProps as AriaLinkProps } from 'react-aria-components';
import { Link as AriaLink, composeRenderProps } from 'react-aria-components';
import { cn } from '../../lib/cn';
import { buttonStyles } from '../Button/Button';
import { Icon } from '../Icon';

export interface LinkButtonProps extends Omit<AriaLinkProps, 'children'>, VariantProps<typeof buttonStyles> {
  /** Required. A LinkButton without a destination is a Button. */
  href: string;
  children: ReactNode;
  iconStart?: LucideIcon;
  iconEnd?: LucideIcon;
  ref?: Ref<HTMLAnchorElement>;
}

/** Navigation that looks like a Button. It renders an anchor, so it opens in new tabs and shows up in history. */
export function LinkButton({ variant, size, iconStart, iconEnd, className, children, ...props }: LinkButtonProps) {
  const iconSize = size === 'lg' ? 'md' : 'sm';

  return (
    <AriaLink
      {...props}
      className={composeRenderProps(className, (className) =>
        cn(buttonStyles({ variant, size }), 'cursor-pointer', className),
      )}
    >
      {iconStart && <Icon icon={iconStart} size={iconSize} />}
      {children}
      {iconEnd && <Icon icon={iconEnd} size={iconSize} />}
    </AriaLink>
  );
}
