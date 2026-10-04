import { ProgressBar } from 'react-aria-components';
import { cn } from '../../lib/cn';

interface SpinnerProps {
  size: 'sm' | 'md';
  label?: string;
}

/**
 * Indeterminate progress for pending buttons. React Aria links the ProgressBar into the button's accessible name, so a
 * screen reader hears "Save, Loading" while the action runs.
 */
export function Spinner({ size, label = 'Loading' }: SpinnerProps) {
  return (
    <ProgressBar
      aria-label={label}
      isIndeterminate
      className="absolute inset-0 m-auto flex items-center justify-center"
    >
      <svg
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
        className={cn('animate-spin [animation-duration:900ms]', size === 'md' ? 'size-5' : 'size-4')}
      >
        <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeOpacity="0.25" strokeWidth="1.5" />
        <path d="M14.25 8A6.25 6.25 0 0 0 8 1.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </ProgressBar>
  );
}
