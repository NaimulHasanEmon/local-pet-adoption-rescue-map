import React from 'react';
import { FaPaw } from 'react-icons/fa';

const LoadingSpinner = ({ 
  size = 'medium', 
  variant = 'default', 
  text = 'Loading...',
  fullScreen = false 
}) => {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8',
    large: 'h-12 w-12',
    xl: 'h-16 w-16'
  };

  const variants = {
    default: 'border-blue-500',
    primary: 'border-blue-600',
    secondary: 'border-purple-600',
    success: 'border-green-600',
    warning: 'border-yellow-600',
    error: 'border-red-600'
  };

  const spinner = (
    <div className="flex flex-col items-center justify-center">
      {variant === 'paw' ? (
        <div className="animate-bounce">
          <FaPaw className={`${sizeClasses[size]} text-blue-500`} />
        </div>
      ) : (
        <div className={`${sizeClasses[size]} border-2 border-gray-200 rounded-full animate-spin`}>
          <div className={`${sizeClasses[size]} border-2 ${variants[variant]} rounded-full animate-spin border-t-transparent`}></div>
        </div>
      )}
      {text && (
        <p className="mt-3 text-sm text-gray-600 font-medium">{text}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-90 flex items-center justify-center z-50">
        {spinner}
      </div>
    );
  }

  return spinner;
};

// Specialized loading components
export const PageLoader = ({ text = 'Loading page...' }) => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
    <LoadingSpinner size="xl" variant="primary" text={text} />
  </div>
);

export const ContentLoader = ({ text = 'Loading content...' }) => (
  <div className="flex items-center justify-center py-12">
    <LoadingSpinner size="large" variant="default" text={text} />
  </div>
);

export const ButtonLoader = ({ size = 'small' }) => (
  <LoadingSpinner size={size} variant="primary" text="" />
);

export const InlineLoader = ({ text = 'Loading...' }) => (
  <div className="inline-flex items-center">
    <LoadingSpinner size="small" variant="default" text="" />
    <span className="ml-2 text-sm text-gray-600">{text}</span>
  </div>
);

export default LoadingSpinner;
