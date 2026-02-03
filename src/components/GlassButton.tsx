import { ReactNode } from 'react';

interface GlassButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

export function GlassButton({ 
  children, 
  variant = 'primary', 
  size = 'md',
  onClick,
  className = '' 
}: GlassButtonProps) {
  const sizeStyles = {
    sm: 'px-5 py-2.5 text-sm min-h-[44px]',
    md: 'px-7 py-3.5 min-h-[48px]',
    lg: 'px-9 py-4 text-base lg:text-lg min-h-[52px]'
  };
  
  const variantStyles = {
    primary: 'bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/50 active:scale-95',
    secondary: 'bg-white/10 backdrop-blur-xl text-gray-800 dark:text-gray-100 border border-white/20 hover:bg-white/5 hover:shadow-white/40 active:scale-95'
  };
  
  return (
    <button
      onClick={onClick}
      className={`
        rounded-full 
        ${sizeStyles[size]} 
        ${variantStyles[variant]}
        transition-all duration-300
        hover:scale-105
        font-medium
        touch-manipulation
        ${className}
      `}
    >
      {children}
    </button>
  );
}