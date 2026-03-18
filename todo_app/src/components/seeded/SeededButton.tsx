'use client';

import { ButtonHTMLAttributes, forwardRef } from 'react';
import { isSeedEnabled } from '@/lib/seeds';

interface SeededButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  seedPage: string;
  seedFlag?: string;
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const SeededButton = forwardRef<HTMLButtonElement, SeededButtonProps>(
  ({ seedPage, seedFlag, variant = 'primary', size = 'md', className = '', children, ...props }, ref) => {
    const isFaultEnabled = seedFlag ? isSeedEnabled(seedPage, seedFlag) : false;
    
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2';
    
    const variantStyles = {
      primary: 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg hover:shadow-indigo-500/30 hover:-translate-y-0.5 focus:ring-indigo-500',
      secondary: 'bg-white text-gray-700 border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-md focus:ring-indigo-500',
      danger: 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 hover:shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5 focus:ring-red-500',
    };

    const sizeStyles = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-2.5 text-sm',
      lg: 'px-8 py-3 text-base',
    };

    // Seed: small hit target
    const hitTargetClass = isFaultEnabled && seedFlag === 'small_hit_target' ? 'p-1 w-3 h-3' : sizeStyles[size];
    
    // Seed: save affordance confusing (low contrast)
    const confusingAffordance = isFaultEnabled && seedFlag === 'save_affordance_confusing';
    const opacityClass = confusingAffordance ? 'opacity-40' : '';

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
