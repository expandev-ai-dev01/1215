import { forwardRef } from 'react';
import { getInputClassName } from './variants';
import type { InputProps } from './types';

/**
 * @component Input
 * @summary Reusable input component with validation support
 * @domain core
 * @type ui-component
 * @category form
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      required = false,
      disabled = false,
      fullWidth = false,
      type = 'text',
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div className={clsx('flex flex-col gap-1', { 'w-full': fullWidth })}>
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          disabled={disabled}
          className={getInputClassName({ error: !!error, disabled, fullWidth, className })}
          {...props}
        />
        {(error || helperText) && (
          <p className={clsx('text-sm', error ? 'text-red-600' : 'text-gray-500')}>
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

import { clsx } from 'clsx';
