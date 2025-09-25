import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'black' | 'white' | 'gray';
  text?: string;
  fullScreen?: boolean;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'black',
  text,
  fullScreen = false
}) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'w-4 h-4';
      case 'md':
        return 'w-8 h-8';
      case 'lg':
        return 'w-12 h-12';
      default:
        return 'w-8 h-8';
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case 'black':
        return 'text-black dark:text-white';
      case 'white':
        return 'text-white';
      case 'gray':
        return 'text-gray-500';
      default:
        return 'text-black dark:text-white';
    }
  };

  const spinnerContent = (
    <div className="flex flex-col items-center justify-center">
      <div
        className={`${getSizeClasses()} ${getColorClasses()} animate-spin rounded-full border-2 border-current border-t-transparent`}
        style={{
          animation: 'spin 1s linear infinite'
        }}
      />
      {text && (
        <p className={`mt-2 text-sm ${getColorClasses()}`}>
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        {spinnerContent}
      </div>
    );
  }

  return spinnerContent;
};

export default LoadingSpinner;
