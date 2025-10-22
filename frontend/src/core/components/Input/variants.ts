import { clsx } from 'clsx';

export interface InputVariantProps {
  error?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export function getInputClassName(props: InputVariantProps): string {
  const { error = false, disabled = false, fullWidth = false, className } = props;

  return clsx(
    'px-3 py-2 border rounded-md text-sm transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-offset-0',
    {
      'border-gray-300 focus:border-blue-500 focus:ring-blue-500': !error,
      'border-red-500 focus:border-red-500 focus:ring-red-500': error,
      'bg-gray-100 cursor-not-allowed': disabled,
      'w-full': fullWidth,
    },
    className
  );
}
