import type { ReactElement, ReactNode } from 'react';
import type { TooltipProps as AriaTooltipProps } from 'react-aria-components';
import { Tooltip as AriaTooltip, composeRenderProps, OverlayArrow, TooltipTrigger } from 'react-aria-components';
import { cn } from '../../lib/cn';

export interface TooltipProps extends Omit<AriaTooltipProps, 'children'> {
  /** Short supplementary text. Plain text only: tooltips cannot hold links or buttons because they vanish on blur. */
  content: ReactNode;
  /** A single focusable React Aria element, such as Button, IconButton or Link. */
  children: ReactElement;
  /** Milliseconds of hover before it opens. Focus opens it immediately. Defaults to 600. */
  delay?: number;
  isDisabled?: boolean;
}

/**
 * Supplementary label that appears on hover and keyboard focus and closes on Escape. It describes its trigger via
 * `aria-describedby`; never put information here that the trigger needs in order to be understood.
 */
export function Tooltip({
  content,
  children,
  delay = 600,
  isDisabled,
  placement = 'top',
  offset = 8,
  className,
  ...props
}: TooltipProps) {
  return (
    <TooltipTrigger delay={delay} closeDelay={0} {...(isDisabled === undefined ? {} : { isDisabled })}>
      {children}
      <AriaTooltip
        {...props}
        placement={placement}
        offset={offset}
        className={composeRenderProps(className, (className) =>
          cn(
            'group max-w-64 rounded-md bg-surface-inverse px-2.5 py-1.5 text-fg-inverse text-sm shadow-overlay',
            'data-entering:animate-fade-in data-exiting:animate-fade-out',
            className,
          ),
        )}
      >
        <OverlayArrow>
          <svg
            width={8}
            height={8}
            viewBox="0 0 8 8"
            aria-hidden="true"
            className={cn(
              'block fill-surface-inverse',
              'group-data-[placement=bottom]:rotate-180 group-data-[placement=left]:-rotate-90 group-data-[placement=right]:rotate-90',
            )}
          >
            <path d="M0 0 L4 4 L8 0" />
          </svg>
        </OverlayArrow>
        {content}
      </AriaTooltip>
    </TooltipTrigger>
  );
}
