import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    // Elevation names are not t-shirt sizes, so tailwind-merge would otherwise read them as shadow colors.
    theme: { shadow: ['raised', 'overlay'] },
  },
});

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
