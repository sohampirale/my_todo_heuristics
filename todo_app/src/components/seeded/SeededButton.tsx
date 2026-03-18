'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { isSeedEnabled } from '@/lib/seeds';

interface SeededButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  seedPage: string;
  seedFlag?: string;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export const SeededButton = forwardRef<HTMLButtonElement, SeededButtonProps>(
  ({ seedPage, seedFlag, variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const isFaultEnabled = seedFlag ? isSeedEnabled(seedPage, seedFlag) : false;
    
    const baseStyles = 'inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const variantStyles = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
      secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
      danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    };

    const sizeStyles = {
      sm: 'px-2 py-1 text-xs',
      md: 'px-4 py-2 text-sm',
      lg: 'px-6 py-3 text-base',
    };

    // Seed: small hit target
    const hitTargetClass = isFaultEnabled && seedFlag === 'small_hit_target' ? 'p-1' : sizeStyles[size];
    
    // Seed: save affordance confusing (low contrast)
    const confusingAffordance = isFaultEnabled && seedFlag === 'save_affordance_confusing';
    const opacityClass = confusingAffordance ? 'opacity-50' : '';

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${hitTargetClass} ${opacityClass} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

SeededButton.displayName = 'SeededButton';
