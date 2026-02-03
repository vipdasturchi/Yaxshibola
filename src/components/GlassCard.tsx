import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  depth?: 'low' | 'medium' | 'high';
}

export function GlassCard({ children, className = '', depth = 'medium' }: GlassCardProps) {
  const depthStyles = {
    low: 'shadow-lg shadow-gray-300/10',
    medium: 'shadow-xl shadow-gray-400/15',
    high: 'shadow-2xl shadow-gray-500/20'
  };
  
  return (
    <div className={`glass-card rounded-3xl p-8 ${depthStyles[depth]} ${className}`}>
      {children}
    </div>
  );
}
