import type { VariantProps } from 'class-variance-authority';
import type { Ref } from 'react';
import type { TextFieldProps as AriaTextFieldProps, ValidationResult } from 'react-aria-components';
import { TextField as AriaTextField, composeRenderProps, Input } from 'react-aria-components';
import { cn } from '../../lib/cn';
import { FieldDescription, FieldError, FieldLabel, fieldControlStyles } from '../Field';

export interface TextFieldProps extends Omit<AriaTextFieldProps, 'children'>, VariantProps<typeof fieldControlStyles> {
  /** Visible label. Required: placeholders disappear on input and are not a substitute. */
  label: string;
  /** Persistent hint below the label, such as format or constraints. Linked via `aria-describedby`. */
  description?: string;
  /**
   * Message shown when the field is invalid. A function receives native validation details, so one field can report
   * "required" and "too short" differently.
   */
  errorMessage?: string | ((validation: ValidationResult) => string);
  placeholder?: string;
  ref?: Ref<HTMLInputElement>;
}

export function TextField({
  label,
  description,
  errorMessage,
  placeholder,
  size,
  className,
  ref,
  ...props
}: TextFieldProps) {
  return (
    <AriaTextField
      {...props}
      className={composeRenderProps(className, (className) => cn('flex flex-col gap-1.5', className))}
    >
      <FieldLabel isRequired={props.isRequired}>{label}</FieldLabel>
      {description && <FieldDescription>{description}</FieldDescription>}
      <Input
        ref={ref}
        placeholder={placeholder}
        className={cn(fieldControlStyles({ size }), 'placeholder:text-fg-muted')}
      />
      <FieldError>{errorMessage}</FieldError>
    </AriaTextField>
  );
}
