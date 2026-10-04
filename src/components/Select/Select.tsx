import type { VariantProps } from 'class-variance-authority';
import { Check, ChevronsUpDown } from 'lucide-react';
import type { ReactNode, Ref } from 'react';
import type { SelectProps as AriaSelectProps, ListBoxItemProps, ValidationResult } from 'react-aria-components';
import {
  Select as AriaSelect,
  Button,
  composeRenderProps,
  ListBox,
  ListBoxItem,
  Popover,
  SelectValue,
} from 'react-aria-components';
import { cn } from '../../lib/cn';
import { FieldDescription, FieldError, FieldLabel, fieldControlStyles } from '../Field';
import { Icon } from '../Icon';

export interface SelectProps<T extends object>
  extends Omit<AriaSelectProps<T, 'single'>, 'children' | 'selectionMode'>,
    VariantProps<typeof fieldControlStyles> {
  label: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  /** Shown until a value is chosen. Say what to pick: "Select a timezone". */
  placeholder?: string;
  /** Static `SelectItem` children, or a render function when passing `items`. */
  children: ReactNode | ((item: T) => ReactNode);
  items?: Iterable<T>;
  ref?: Ref<HTMLDivElement>;
}

/**
 * Pick one option from a list too long for a RadioGroup. Opens on click, Enter, Space or arrow keys; typing jumps to a
 * matching option.
 */
export function Select<T extends object>({
  label,
  description,
  errorMessage,
  size,
  items,
  className,
  children,
  ...props
}: SelectProps<T>) {
  return (
    <AriaSelect
      {...props}
      className={composeRenderProps(className, (className) => cn('group flex flex-col gap-1.5', className))}
    >
      <FieldLabel isRequired={props.isRequired}>{label}</FieldLabel>
      {description && <FieldDescription>{description}</FieldDescription>}
      <Button
        className={cn(
          fieldControlStyles({ size }),
          'flex cursor-default items-center justify-between gap-2 text-start',
          'group-data-invalid:border-danger-text data-pressed:border-fg-muted',
        )}
      >
        <SelectValue className="truncate data-placeholder:text-fg-muted" />
        <Icon icon={ChevronsUpDown} className="text-fg-muted" />
      </Button>
      <FieldError>{errorMessage}</FieldError>
      <Popover
        offset={6}
        className={cn(
          'w-(--trigger-width) min-w-40 overflow-auto rounded-lg border border-border bg-surface-raised p-1 shadow-overlay',
          'outline-none data-entering:animate-pop-in data-exiting:animate-pop-out',
          'data-[placement=top]:[--ds-pop-offset:-4px]',
        )}
      >
        <ListBox items={items} className="max-h-72 outline-none">
          {children}
        </ListBox>
      </Popover>
    </AriaSelect>
  );
}

export interface SelectItemProps extends Omit<ListBoxItemProps, 'children'> {
  children: ReactNode;
}

export function SelectItem({ className, children, ...props }: SelectItemProps) {
  const textValue = props.textValue ?? (typeof children === 'string' ? children : undefined);

  return (
    <ListBoxItem
      {...props}
      {...(textValue === undefined ? {} : { textValue })}
      className={composeRenderProps(className, (className) =>
        cn(
          'group flex cursor-default select-none items-center gap-2 rounded-md py-1.5 ps-2 pe-8 text-base text-fg outline-none',
          'relative data-focused:bg-surface-hover data-pressed:bg-surface-pressed',
          'data-disabled:opacity-50',
          className,
        ),
      )}
    >
      {({ isSelected }) => (
        <>
          <span className="truncate">{children}</span>
          {isSelected && <Icon icon={Check} className="absolute end-2 text-accent-text" />}
        </>
      )}
    </ListBoxItem>
  );
}
