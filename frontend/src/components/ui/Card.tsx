/**
 * Card Component
 * Container with shadow, rounded corners, and optional hover effects
 */

import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hoverEffect?: boolean;
  className?: string;
  onClick?: () => void;
}

const Card: React.FC<CardProps> = ({
  children,
  padding = 'md',
  hoverEffect = false,
  className = '',
  onClick,
}) => {
  // Base styles with modern shadow and subtle border
  const baseStyles = 'bg-white rounded-xl shadow-lg border border-gray-100 transition-all duration-300';

  // Padding variants
  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6 sm:p-8',
    lg: 'p-8 sm:p-10',
  };

  // Hover effect with transform and shadow
  const hoverStyles = hoverEffect
    ? 'hover:shadow-2xl hover:border-primary hover:-translate-y-1 cursor-pointer'
    : '';

  // Interactive styles
  const interactiveStyles = onClick ? 'cursor-pointer' : '';

  const cardStyles = `${baseStyles} ${paddingStyles[padding]} ${hoverStyles} ${interactiveStyles} ${className}`;

  return (
    <div
      className={cardStyles}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {children}
    </div>
  );
};

export default Card;
