import React from 'react';

const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden transition-opacity duration-500">
      {/* Floating Code Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-[#F7418F]/20 dark:text-cyan-400/20 font-mono text-xs animate-pulse transition-colors"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
              animationDelay: `${(i % 5)}s`,
              animationDuration: `${3 + (i % 4)}s`
            }}
          >
            {['const', 'function', 'return', 'import', 'export', 'async', 'await', 'class', 'interface', 'type'][i % 10]}
          </div>
        ))}
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#FC819E]/15 dark:bg-cyan-500/10 rounded-full blur-3xl animate-pulse transition-colors"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FEC7B4]/25 dark:bg-green-500/10 rounded-full blur-3xl animate-pulse transition-colors" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-3/4 left-1/3 w-80 h-80 bg-[#FFF3C7]/40 dark:bg-purple-500/10 rounded-full blur-3xl animate-pulse transition-colors" style={{ animationDelay: '4s' }}></div>
      
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] dark:opacity-5 transition-opacity"
        style={{
          backgroundImage: `
            linear-gradient(rgba(247, 65, 143, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(247, 65, 143, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}
      ></div>
    </div>
  );
};

export default AnimatedBackground;