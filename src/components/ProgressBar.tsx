'use client';

import { useEffect, useRef } from 'react';

interface ProgressBarProps {
  skill: string;
  percentage: number;
  color: string;
  delay?: number;
}

export function ProgressBar({ skill, percentage, color, delay = 0 }: ProgressBarProps) {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progressRef.current) {
        progressRef.current.style.width = `${percentage}%`;
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [percentage, delay]);

  return (
    <div className="mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-gray-900 dark:text-white font-medium">{skill}</span>
        <span className="text-gray-600 dark:text-gray-400">{percentage}%</span>
      </div>
      <div className="h-3 bg-white/10 dark:bg-white/5 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className={`h-full ${color} rounded-full transition-all duration-1000 ease-out`}
          style={{ width: '0%' }}
        />
      </div>
    </div>
  );
}
