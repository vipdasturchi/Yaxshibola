'use client';

import { ReactNode, useEffect, useRef } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxSection({ children, speed = 0.5, className = '' }: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX - innerWidth / 2) * speed * 0.01;
      const yPos = (clientY - innerHeight / 2) * speed * 0.01;
      
      sectionRef.current.style.transform = `translate(${xPos}px, ${yPos}px)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [speed]);
  
  return (
    <div 
      ref={sectionRef}
      className={`transition-transform duration-200 ease-out ${className}`}
    >
      {children}
    </div>
  );
}
