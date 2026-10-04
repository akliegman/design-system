import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import type { ReactNode, Ref } from 'react';
import { useId } from 'react';
import type { DialogProps as AriaDialogProps } from 'react-aria-components';
import { Dialog as AriaDialog, DialogTrigger, Modal, ModalOverlay } from 'react-aria-components';
import { cn } from '../../lib/cn';
import { Heading } from '../Heading';
import { IconButton } from '../IconButton';
import { Text } from '../Text';

export { DialogTrigger };

export const dialogStyles = cva(
  [
    'relative flex max-h-[calc(100dvh-2rem)] w-full flex-col overflow-hidden rounded-xl border border-border',
    'bg-surface-raised text-fg shadow-overlay',
    'data-entering:animate-pop-in data-exiting:animate-pop-out',
  ],
  {
    variants: {
      /** Maximum width. Size to the content, not the screen. */
      size: {
        /** 400px. Confirmations with one sentence and two buttons. */
        sm: 'max-w-100',
        /** 520px. Short forms. Default. */
        md: 'max-w-130',
        /** 720px. Multi-column forms and previews. */
        lg: 'max-w-180',
      },
    },
    defaultVariants: { size: 'md' },
  },
);

export interface DialogProps extends Omit<AriaDialogProps, 'children'>, VariantProps<typeof dialogStyles> {
  /** Rendered as the dialog's heading and used as its accessible name. */
  title: string;
  /** Optional supporting sentence under the title, linked as the accessible description. */
  description?: string;
  /** Content. A function receives `close` for buttons that should dismiss the dialog. */
  children: ReactNode | ((renderProps: { close: () => void }) => ReactNode);
  /**
   * Whether clicking the backdrop or pressing Escape closes the dialog. Defaults to true. Turn it off only when
   * dismissing would lose unsaved work; Escape still works for `alertdialog`.
   */
  isDismissable?: boolean;
  ref?: Ref<HTMLElement>;
}

/**
 * A modal dialog. Place it inside a `DialogTrigger` next to the button that opens it. React Aria traps focus, restores
 * it to the trigger on close, hides the rest of the page from assistive technology and locks scroll.
 */
export function Dialog({ title, description, size, isDismissable = true, className, children, ...props }: DialogProps) {
  const generatedId = useId();
  const descriptionId = description ? `${generatedId}-description` : undefined;

  return (
    <ModalOverlay
      isDismissable={isDismissable}
      isKeyboardDismissDisabled={!isDismissable}
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center bg-backdrop p-4',
        'data-entering:animate-fade-in data-exiting:animate-fade-out',
      )}
    >
      <Modal className={dialogStyles({ size })}>
        <AriaDialog
          {...props}
          aria-describedby={descriptionId}
          className={cn('flex min-h-0 flex-1 flex-col outline-none', className)}
        >
          {({ close }) => (
            <>
              <header className="flex items-start gap-4 px-6 pt-5 pb-1">
                <div className="flex flex-1 flex-col gap-1">
                  <Heading slot="title" level={2} size="lg">
                    {title}
                  </Heading>
                  {description && (
                    <Text id={descriptionId} tone="muted">
                      {description}
                    </Text>
                  )}
                </div>
                {isDismissable && (
                  <IconButton icon={X} aria-label="Close" size="sm" onPress={close} className="-me-2 -mt-0.5" />
                )}
              </header>
              <div className="min-h-0 flex-1 overflow-y-auto px-6 pt-3 pb-6">
                {typeof children === 'function' ? children({ close }) : children}
              </div>
            </>
          )}
        </AriaDialog>
      </Modal>
    </ModalOverlay>
  );
}

/** Action row for the bottom of a dialog. Primary action goes last, so it lands at the trailing edge. */
export function DialogActions({ children }: { children: ReactNode }) {
  return <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">{children}</div>;
}
