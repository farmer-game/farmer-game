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
  // Base styles
  const baseStyles = 'bg-white rounded-lg shadow-card transition-all duration-200';

  // Padding variants
  const paddingStyles = {
    none: '',
    sm: 'p-3',
    md: 'p-4 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  // Hover effect
  const hoverStyles = hoverEffect
    ? 'hover:shadow-card-hover hover:border-primary border-2 border-transparent cursor-pointer'
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
