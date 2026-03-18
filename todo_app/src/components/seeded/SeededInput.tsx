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
          className={`input-modern ${className}`}
          {...props}
        />
        {displayError && (
          <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {displayError}
          </p>
        )}
      </div>
    );
  }
);

SeededInput.displayName = 'SeededInput';
