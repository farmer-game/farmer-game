/**
 * Loading Component
 * Spinner with optional full-screen overlay
 */

import React from 'react';
import { Loader2 } from 'lucide-react';

export interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
  fullScreen?: boolean;
  text?: string;
  className?: string;
}

const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  fullScreen = false,
  text,
  className = '',
}) => {
  // Size mapping
  const sizeMap = {
    sm: 20,
    md: 40,
    lg: 60,
  };

  const spinner = (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <Loader2
        size={sizeMap[size]}
        className="animate-spin text-primary"
        aria-hidden="true"
      />
      {text && (
        <p className="text-gray-600 text-sm sm:text-base" role="status">
          {text}
        </p>
      )}
      <span className="sr-only">Loading...</span>
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50 animate-fade-in">
        {spinner}
      </div>
    );
  }

  return spinner;
};

export default Loading;
