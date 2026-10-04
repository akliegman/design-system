import { cva, type VariantProps } from 'class-variance-authority';
import type { LucideIcon } from 'lucide-react';
import type { Ref } from 'react';
import type { ButtonProps as AriaButtonProps } from 'react-aria-components';
import { Button as AriaButton, composeRenderProps } from 'react-aria-components';
import { cn } from '../../lib/cn';
import { buttonStyles } from '../Button/Button';
import { Spinner } from '../Button/Spinner';
import { Icon } from '../Icon';

export const iconButtonStyles = cva('px-0', {
  variants: {
    /** Square footprint matching Button heights, so icon and text buttons align in a row. */
    size: {
      /** 32px square. */
      sm: 'size-8',
      /** 36px square. */
      md: 'size-9',
      /** 44px square. Meets the 44px touch target on its own. */
      lg: 'size-11',
    },
  },
  defaultVariants: { size: 'md' },
});

export interface IconButtonProps
  extends Omit<AriaButtonProps, 'children' | 'isPending' | 'render' | 'aria-label'>,
    VariantProps<typeof buttonStyles> {
  icon: LucideIcon;
  /**
   * Required. An icon has no text, so this is the button's only accessible name. Describe the action ("Delete
   * invoice"), not the glyph ("Trash").
   */
  'aria-label': string;
  /** Same contract as Button: spinner, `aria-busy`, presses ignored, focus kept. */
  isLoading?: boolean;
  ref?: Ref<HTMLButtonElement>;
}

export function IconButton({ icon, variant = 'ghost', size, isLoading = false, className, ...props }: IconButtonProps) {
  const iconSize = size === 'lg' ? 'md' : 'sm';

  return (
    <AriaButton
      {...props}
      isPending={isLoading}
      render={(domProps, { isPending }) => <button {...domProps} aria-busy={isPending || undefined} />}
      className={composeRenderProps(className, (className) =>
        cn(buttonStyles({ variant, size }), iconButtonStyles({ size }), className),
      )}
    >
      <Icon icon={icon} size={iconSize} className={cn(isLoading && 'invisible')} />
      {isLoading && <Spinner size={iconSize} />}
    </AriaButton>
  );
}
