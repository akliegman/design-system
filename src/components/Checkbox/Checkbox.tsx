import { cva } from 'class-variance-authority';
import type { ReactNode, Ref } from 'react';
import type {
  CheckboxGroupProps as AriaCheckboxGroupProps,
  CheckboxProps as AriaCheckboxProps,
  ValidationResult,
} from 'react-aria-components';
import {
  Checkbox as AriaCheckbox,
  CheckboxGroup as AriaCheckboxGroup,
  composeRenderProps,
} from 'react-aria-components';
import { cn } from '../../lib/cn';
import { FieldDescription, FieldError, FieldLabel } from '../Field';

export const checkboxBoxStyles = cva(
  [
    'flex size-4 shrink-0 items-center justify-center rounded-sm border bg-surface-raised text-fg-on-accent',
    'transition-[background-color,border-color] group-data-focus-visible:focus-ring',
  ],
  {
    variants: {
      /** Checked or indeterminate. Fills with accent so the state reads without relying on the glyph alone. */
      isFilled: {
        true: 'border-accent bg-accent group-data-hovered:border-accent-hover group-data-hovered:bg-accent-hover',
        false: 'border-border-strong group-data-hovered:border-fg-muted',
      },
      /** Invalid inside a required group. Swaps the boundary to the danger color. */
      isInvalid: {
        true: 'border-danger-text',
        false: '',
      },
    },
    compoundVariants: [{ isFilled: true, isInvalid: true, className: 'border-danger-text bg-danger' }],
  },
);

export interface CheckboxProps extends Omit<AriaCheckboxProps, 'children'> {
  /** Visible label. Clicking it toggles the box. */
  children?: ReactNode;
  ref?: Ref<HTMLLabelElement>;
}

export function Checkbox({ className, children, ...props }: CheckboxProps) {
  return (
    <AriaCheckbox
      {...props}
      className={composeRenderProps(className, (className) =>
        cn(
          'group flex items-start gap-2.5 text-base text-fg',
          'data-disabled:cursor-not-allowed data-disabled:opacity-50',
          className,
        ),
      )}
    >
      {({ isSelected, isIndeterminate, isInvalid }) => (
        <>
          <span className="flex h-[1.572em] items-center">
            <span className={checkboxBoxStyles({ isFilled: isSelected || isIndeterminate, isInvalid })}>
              <svg viewBox="0 0 16 16" aria-hidden="true" className="size-3.5" fill="none">
                {isIndeterminate ? (
                  <path d="M4 8h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                ) : (
                  <path
                    d="M3.5 8.5 6.5 11.5 12.5 4.5"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength={1}
                    className={cn(
                      'transition-[stroke-dashoffset] duration-(--ds-duration-base) [stroke-dasharray:1]',
                      isSelected ? '[stroke-dashoffset:0]' : '[stroke-dashoffset:1]',
                    )}
                  />
                )}
              </svg>
            </span>
          </span>
          {children}
        </>
      )}
    </AriaCheckbox>
  );
}

export interface CheckboxGroupProps extends Omit<AriaCheckboxGroupProps, 'children'> {
  label: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  children: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/** A labelled set of related checkboxes with one shared description and error. Value is the array of checked values. */
export function CheckboxGroup({ label, description, errorMessage, className, children, ...props }: CheckboxGroupProps) {
  return (
    <AriaCheckboxGroup
      {...props}
      className={composeRenderProps(className, (className) => cn('flex flex-col gap-2', className))}
    >
      <FieldLabel isRequired={props.isRequired} elementType="span">
        {label}
      </FieldLabel>
      {description && <FieldDescription>{description}</FieldDescription>}
      <div className="flex flex-col gap-2.5 pt-0.5">{children}</div>
      <FieldError>{errorMessage}</FieldError>
    </AriaCheckboxGroup>
  );
}
