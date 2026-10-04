import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode, Ref } from 'react';
import type {
  RadioGroupProps as AriaRadioGroupProps,
  RadioProps as AriaRadioProps,
  ValidationResult,
} from 'react-aria-components';
import { Radio as AriaRadio, RadioGroup as AriaRadioGroup, composeRenderProps } from 'react-aria-components';
import { cn } from '../../lib/cn';
import { FieldDescription, FieldError, FieldLabel } from '../Field';

export const radioListStyles = cva('flex gap-2.5 pt-0.5', {
  variants: {
    /** Layout of the options. Arrow keys follow it, and React Aria sets `aria-orientation` to match. */
    orientation: {
      /** Stacked. Default; scans fastest and fits long labels. */
      vertical: 'flex-col',
      /** In a row. Only for two or three short options. */
      horizontal: 'flex-row flex-wrap gap-x-5',
    },
  },
  defaultVariants: { orientation: 'vertical' },
});

export interface RadioGroupProps
  extends Omit<AriaRadioGroupProps, 'children' | 'orientation'>,
    VariantProps<typeof radioListStyles> {
  label: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  children: ReactNode;
  ref?: Ref<HTMLDivElement>;
}

/** One choice from a short, visible list. Arrow keys move and select; Tab leaves the group. */
export function RadioGroup({
  label,
  description,
  errorMessage,
  orientation,
  className,
  children,
  ...props
}: RadioGroupProps) {
  return (
    <AriaRadioGroup
      {...props}
      orientation={orientation ?? 'vertical'}
      className={composeRenderProps(className, (className) => cn('flex flex-col gap-2', className))}
    >
      <FieldLabel isRequired={props.isRequired} elementType="span">
        {label}
      </FieldLabel>
      {description && <FieldDescription>{description}</FieldDescription>}
      <div className={radioListStyles({ orientation })}>{children}</div>
      <FieldError>{errorMessage}</FieldError>
    </AriaRadioGroup>
  );
}

export interface RadioProps extends Omit<AriaRadioProps, 'children'> {
  children: ReactNode;
  ref?: Ref<HTMLLabelElement>;
}

export function Radio({ className, children, ...props }: RadioProps) {
  return (
    <AriaRadio
      {...props}
      className={composeRenderProps(className, (className) =>
        cn(
          'group flex items-start gap-2.5 text-base text-fg',
          'data-disabled:cursor-not-allowed data-disabled:opacity-50',
          className,
        ),
      )}
    >
      <span className="flex h-[1.572em] items-center">
        <span
          className={cn(
            'flex size-4 shrink-0 items-center justify-center rounded-full border border-border-strong bg-surface-raised',
            'transition-[border-color,border-width] group-data-hovered:border-fg-muted',
            'group-data-selected:border-[5px] group-data-selected:border-accent',
            'group-data-selected:group-data-hovered:border-accent-hover',
            'group-data-invalid:border-danger-text group-data-focus-visible:focus-ring',
          )}
        />
      </span>
      {children}
    </AriaRadio>
  );
}
