/**
 * Button Component
 * Reusable button with variants, sizes, and loading states
 */

import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading = false, disabled, className = '', children, ...props }, ref) => {
    // Base styles
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    // Variant styles with modern gradients and shadows
    const variantStyles = {
      primary: 'bg-gradient-to-r from-primary to-orange-600 text-white hover:from-orange-600 hover:to-primary shadow-lg hover:shadow-xl focus:ring-primary transform hover:scale-105',
      secondary: 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white focus:ring-primary shadow-md hover:shadow-lg transform hover:scale-105',
      ghost: 'bg-transparent text-primary hover:bg-primary/10 focus:ring-primary hover:shadow-md',
    };

    // Size styles
    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm min-h-[36px]',
      md: 'px-4 py-2 text-base min-h-[44px]',
      lg: 'px-6 py-3 text-lg min-h-[52px]',
    };

    // Combine all styles
    const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    return (
      <button
        ref={ref}
        className={buttonStyles}
        disabled={disabled || loading}
        aria-busy={loading}
        aria-disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <Loader2
            className="animate-spin mr-2"
            size={size === 'sm' ? 14 : size === 'lg' ? 20 : 16}
            aria-hidden="true"
          />
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
