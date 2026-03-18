'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { isSeedEnabled } from '@/lib/seeds';

interface SeededInputProps extends InputHTMLAttributes<HTMLInputElement> {
  seedPage: string;
  label?: string;
  error?: string;
}

export const SeededInput = forwardRef<HTMLInputElement, SeededInputProps>(
  ({ seedPage, label, error, className = '', id, ...props }, ref) => {
    const missingLabels = isSeedEnabled(seedPage, 'missing_labels');
    const crypticError = isSeedEnabled(seedPage, 'cryptic_error');
    
    const displayLabel = missingLabels ? null : label;
    const displayError = crypticError && error ? 'ERR_INPUT_FAIL' : error;

    return (
      <div className="mb-4">
        {displayLabel && (
          <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {displayLabel}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={`w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${className}`}
          {...props}
        />
        {displayError && (
          <p className="mt-1 text-sm text-red-600">{displayError}</p>
        )}
      </div>
    );
  }
);

SeededInput.displayName = 'SeededInput';
