import { clsx } from 'clsx';
import type { LoadingSpinnerProps } from './types';

export function getLoadingSpinnerClassName(props: LoadingSpinnerProps): string {
  const { size = 'medium', color = 'primary', className } = props;

  return clsx(
    'animate-spin rounded-full border-2 border-solid border-current border-r-transparent',
    {
      'h-4 w-4': size === 'small',
      'h-8 w-8': size === 'medium',
      'h-12 w-12': size === 'large',
    },
    {
      'text-blue-600': color === 'primary',
      'text-gray-600': color === 'secondary',
      'text-white': color === 'white',
    },
    className
  );
}
