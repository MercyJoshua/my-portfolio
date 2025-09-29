import React, { useState } from 'react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-sm border-b border-gray-800 z-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <span className="text-xl font-bold">
              <span className="text-cyan-400 font-mono">{'<'}</span>
              <span className="text-cyan-400">MJ</span>
              <span className="text-green-400 font-mono">{'/>'}</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-200 font-mono text-sm"
                >
                  {item.name}
                </a>
              ))}
              <button
  onClick={() => window.open('/resume.pdf', '_blank')}
  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-green-500 rounded-lg text-black font-semibold text-sm hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
>
  Resume
</button>

            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-cyan-400 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900 rounded-lg mt-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-gray-300 hover:text-cyan-400 transition-colors font-mono text-sm"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </a>
              ))}
             <button
  onClick={() => window.open('/resume.pdf', '_blank')}
  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-green-500 rounded-lg text-black font-semibold text-sm hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
>
  Resume
</button>

            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;