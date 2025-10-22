import { clsx } from 'clsx';

export interface CardVariantProps {
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
}

export function getCardClassName(props: CardVariantProps): string {
  const { variant = 'default', padding = 'md', className } = props;

  return clsx(
    'rounded-lg',
    {
      'bg-white': variant === 'default',
      'bg-white border border-gray-200': variant === 'outlined',
      'bg-white shadow-md': variant === 'elevated',
    },
    {
      'p-0': padding === 'none',
      'p-4': padding === 'sm',
      'p-6': padding === 'md',
      'p-8': padding === 'lg',
    },
    className
  );
}
