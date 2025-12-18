/**
 * Toast Component
 * Notification system with variants and auto-dismiss
 */

import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export interface ToastProps {
  id: string;
  message: string;
  variant?: 'success' | 'error' | 'info';
  duration?: number;
  onClose: (id: string) => void;
}

export interface ToastContainerProps {
  toasts: ToastProps[];
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const Toast: React.FC<ToastProps> = ({
  id,
  message,
  variant = 'info',
  duration = 3000,
  onClose,
}) => {
  const [isExiting, setIsExiting] = useState(false);

  // Auto-dismiss
  useEffect(() => {
    if (duration === 0) return;

    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => onClose(id), 300); // Wait for exit animation
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, id, onClose]);

  // Variant styles and icons
  const variantConfig = {
    success: {
      bg: 'bg-green-50 border-green-500',
      icon: CheckCircle,
      iconColor: 'text-green-500',
      textColor: 'text-green-900',
    },
    error: {
      bg: 'bg-red-50 border-red-500',
      icon: AlertCircle,
      iconColor: 'text-red-500',
      textColor: 'text-red-900',
    },
    info: {
      bg: 'bg-blue-50 border-blue-500',
      icon: Info,
      iconColor: 'text-blue-500',
      textColor: 'text-blue-900',
    },
  };

  const config = variantConfig[variant];
  const Icon = config.icon;

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => onClose(id), 300);
  };

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg border-l-4 shadow-toast max-w-sm w-full ${config.bg} ${
        isExiting ? 'animate-slide-out-right' : 'animate-slide-in-right'
      }`}
      role="alert"
      aria-live="polite"
    >
      <Icon size={20} className={`flex-shrink-0 mt-0.5 ${config.iconColor}`} aria-hidden="true" />
      <p className={`flex-1 text-sm ${config.textColor}`}>{message}</p>
      <button
        onClick={handleClose}
        className={`flex-shrink-0 p-0.5 rounded hover:bg-white hover:bg-opacity-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 ${config.iconColor}`}
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  position = 'top-right',
}) => {
  // Position styles
  const positionStyles = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
  };

  if (toasts.length === 0) return null;

  return (
    <div
      className={`fixed ${positionStyles[position]} z-50 flex flex-col gap-3 pointer-events-none`}
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((toast) => (
        <div key={toast.id} className="pointer-events-auto">
          <Toast {...toast} />
        </div>
      ))}
    </div>
  );
};

export default Toast;
