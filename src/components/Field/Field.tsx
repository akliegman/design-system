import { cva } from 'class-variance-authority';
import type { ReactNode } from 'react';
import type { FieldErrorProps as AriaFieldErrorProps, LabelProps as AriaLabelProps } from 'react-aria-components';
import {
  FieldError as AriaFieldError,
  Label as AriaLabel,
  Text as AriaText,
  composeRenderProps,
} from 'react-aria-components';
import { cn } from '../../lib/cn';

/**
 * Shared building blocks for form fields. TextField, Select, CheckboxGroup and RadioGroup compose these so that label,
 * description and error look and behave the same everywhere. React Aria wires the ids and ARIA relationships.
 */

export interface FieldLabelProps extends AriaLabelProps {
  isRequired?: boolean;
}

export function FieldLabel({ isRequired, className, children, ...props }: FieldLabelProps) {
  return (
    <AriaLabel {...props} className={cn('w-fit font-medium text-fg text-sm', className)}>
      {children}
      {isRequired && (
        <span aria-hidden="true" className="ms-0.5 text-danger-text">
          *
        </span>
      )}
    </AriaLabel>
  );
}

export function FieldDescription({ children }: { children: ReactNode }) {
  return (
    <AriaText slot="description" className="text-fg-muted text-sm">
      {children}
    </AriaText>
  );
}

export function FieldError({ className, ...props }: AriaFieldErrorProps) {
  return (
    <AriaFieldError
      {...props}
      className={composeRenderProps(className, (className) => cn('text-danger-text text-sm', className))}
    />
  );
}

/** Text input chrome shared by TextField and the Select trigger. */
export const fieldControlStyles = cva(
  [
    'w-full min-w-0 rounded-md border border-border-strong bg-surface-raised text-fg shadow-raised outline-none',
    'transition-[border-color,outline-color] data-hovered:border-fg-muted',
    'data-focused:outline-2 data-focused:outline-focus-ring data-focused:outline-offset-[-1px]',
    'data-focus-visible:outline-2 data-focus-visible:outline-focus-ring data-focus-visible:outline-offset-[-1px]',
    'data-invalid:border-danger-text data-invalid:data-focused:outline-danger-text',
    'data-disabled:cursor-not-allowed data-disabled:opacity-50',
  ],
  {
    variants: {
      /** Matches Button heights so a field and its submit button align. */
      size: {
        /** 32px. */
        sm: 'h-8 px-2.5 text-sm',
        /** 36px. */
        md: 'h-9 px-3 text-base',
      },
    },
    defaultVariants: { size: 'md' },
  },
);
