'use client';

import { Link, useLocation } from 'react-router';
import { Home, User, FileText, Briefcase, BookOpen, Mail, Gamepad2 } from 'lucide-react';

export function MobileTabBar() {
  const location = useLocation();

  const tabs = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/about', icon: User, label: 'About' },
    { path: '/resume', icon: FileText, label: 'Resume' },
    { path: '/portfolio', icon: Briefcase, label: 'Work' },
    { path: '/contact', icon: Mail, label: 'Contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 mobile-tab-bar">
      <div className="grid grid-cols-5 gap-1 px-2 pt-2 pb-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = isActive(tab.path);
          
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-2xl transition-all duration-300 ${
                active 
                  ? 'tab-active text-indigo-600 dark:text-indigo-400' 
                  : 'text-gray-600 dark:text-gray-400 active:scale-95'
              }`}
            >
              <Icon className={`w-6 h-6 mb-1 transition-transform ${active ? 'scale-110' : ''}`} />
              <span className="text-xs font-medium truncate w-full text-center">
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
      
      {/* Snake Game Floating Button */}
      <Link
        to="/snake"
        className={`absolute -top-8 right-4 w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-300 ${
          location.pathname === '/snake'
            ? 'bg-gradient-to-br from-indigo-500 to-purple-600 scale-110'
            : 'bg-gradient-to-br from-blue-500 to-purple-600 hover:scale-105 active:scale-95'
        }`}
      >
        <Gamepad2 className="w-7 h-7 text-white" />
      </Link>
    </div>
  );
}
