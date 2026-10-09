import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { cmsApi } from '@/lib/cms-api';
import { useTheme } from '@/contexts/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, resolvedTheme, toggleTheme } = useTheme();

  const { data: settings } = useQuery({
    queryKey: ['settings', 'public'],
    queryFn: cmsApi.getPublicSettings,
  });
  const resumeUrl = settings?.resumeUrl || '/resume.pdf';

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className="fixed top-0 w-full bg-[#FFFDF7]/85 dark:bg-black/90 backdrop-blur-md border-b border-[#FEC7B4] dark:border-gray-800 z-50 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <a href="#home" className="text-xl font-bold flex items-center group transition-transform hover:scale-105">
              <span className="text-[#F7418F] dark:text-cyan-400 font-mono transition-colors">{'<'}</span>
              <span className="bg-gradient-to-r from-[#F7418F] via-[#FC819E] to-[#F7418F] dark:from-cyan-400 dark:to-green-400 bg-clip-text text-transparent font-bold">
                MJ
              </span>
              <span className="text-[#FC819E] dark:text-green-400 font-mono transition-colors">{'/>'}</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-slate-700 hover:text-[#F7418F] dark:text-gray-300 dark:hover:text-cyan-400 transition-colors duration-200 font-mono text-sm font-medium"
              >
                {item.name}
              </a>
            ))}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl border border-[#FEC7B4] dark:border-gray-700 bg-[#FFF3C7]/60 dark:bg-gray-800/80 text-[#F7418F] dark:text-yellow-400 hover:bg-[#FEC7B4]/40 dark:hover:bg-gray-700 hover:scale-110 active:scale-95 transition-all duration-300 shadow-sm"
              aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="h-5 w-5 transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon className="h-5 w-5 transition-transform duration-300 hover:-rotate-12 text-[#F7418F]" />
              )}
            </button>

            {/* Resume Button */}
            <button
              onClick={() => window.open(resumeUrl, '_blank')}
              className="px-4 py-2 bg-gradient-to-r from-[#FC819E] to-[#F7418F] dark:from-cyan-500 dark:to-green-500 rounded-lg text-white dark:text-black font-semibold text-sm hover:shadow-lg hover:shadow-[#F7418F]/30 dark:hover:shadow-cyan-500/50 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Resume
            </button>
          </div>

          {/* Mobile menu and toggle */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Mobile Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-[#FEC7B4] dark:border-gray-700 bg-[#FFF3C7]/60 dark:bg-gray-800 text-[#F7418F] dark:text-yellow-400 transition-all"
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5 text-[#F7418F]" />
              )}
            </button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-700 hover:text-[#F7418F] dark:text-gray-300 dark:hover:text-cyan-400 transition-colors"
              aria-label="Toggle mobile menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="px-4 pt-3 pb-4 space-y-2 bg-[#FFFDF7] dark:bg-gray-900 rounded-xl border border-[#FEC7B4] dark:border-gray-800 shadow-xl mt-2 transition-colors">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 rounded-lg text-slate-700 hover:text-[#F7418F] hover:bg-[#FFF3C7]/60 dark:text-gray-300 dark:hover:text-cyan-400 dark:hover:bg-gray-800 transition-colors font-mono text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    window.open(resumeUrl, '_blank');
                  }}
                  className="w-full px-4 py-2.5 bg-gradient-to-r from-[#FC819E] to-[#F7418F] dark:from-cyan-500 dark:to-green-500 rounded-lg text-white dark:text-black font-semibold text-sm hover:shadow-lg transition-all duration-300"
                >
                  Resume
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
