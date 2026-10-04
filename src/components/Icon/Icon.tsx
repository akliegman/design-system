import { cva, type VariantProps } from 'class-variance-authority';
import type { LucideIcon, LucideProps } from 'lucide-react';
import { cn } from '../../lib/cn';

export const iconStyles = cva('shrink-0', {
  variants: {
    /** Optical size. Match the text the icon sits beside: sm for base text, md for md and lg text. */
    size: {
      /** 12px. Inside badges and dense metadata. */
      xs: 'size-3',
      /** 16px. Default for buttons, inputs and body text. */
      sm: 'size-4',
      /** 20px. Large buttons and section headers. */
      md: 'size-5',
      /** 24px. Empty states and standalone illustrations. */
      lg: 'size-6',
    },
  },
  defaultVariants: { size: 'sm' },
});

export interface IconProps extends Omit<LucideProps, 'size'>, VariantProps<typeof iconStyles> {
  /** Any lucide-react icon component. */
  icon: LucideIcon;
  /**
   * Accessible name. Omit it when the icon sits beside text that already says the same thing; the icon is then
   * hidden from assistive technology. Provide it when the icon is the only thing conveying meaning.
   */
  label?: string;
}

export function Icon({ icon: Glyph, size, label, className, strokeWidth = 1.75, ...props }: IconProps) {
  return (
    <Glyph
      {...(label ? { role: 'img', 'aria-label': label } : { 'aria-hidden': true })}
      focusable="false"
      strokeWidth={strokeWidth}
      className={cn(iconStyles({ size }), className)}
      {...props}
    />
  );
}
