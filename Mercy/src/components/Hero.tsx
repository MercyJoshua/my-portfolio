import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { cmsApi } from '@/lib/cms-api';

const Hero = () => {
  const { data: settings } = useQuery({
    queryKey: ['settings', 'public'],
    queryFn: cmsApi.getPublicSettings,
  });

  const resumeUrl = settings?.resumeUrl || '/resume.pdf';

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFFDF7] via-[#FFF3C7]/40 to-[#FEC7B4]/20 dark:from-gray-900 dark:via-black dark:to-gray-900 transition-colors duration-300">
      {/* Background overlay */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20 pointer-events-none">
        <img 
          src="https://d64gsuwffb70l.cloudfront.net/68bc5f5e997849091ee3f617_1757175708813_c90a5f10.webp" 
          alt="Developer Background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Floating Code Elements */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="animate-pulse absolute top-28 left-8 md:left-16 text-[#F7418F] dark:text-cyan-400 font-mono text-xs md:text-sm opacity-70 bg-white/70 dark:bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-[#FEC7B4] dark:border-cyan-500/30 shadow-xs">
          const developer = {'{'} skills: ['React', 'Node.js', 'Security'] {'}'}
        </div>
        <div className="animate-bounce absolute top-44 right-8 md:right-24 text-[#FC819E] dark:text-green-400 font-mono text-xs md:text-sm opacity-70 bg-white/70 dark:bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-[#FEC7B4] dark:border-green-500/30 shadow-xs">
          npm install security-tools
        </div>
        <div className="animate-pulse absolute bottom-36 left-12 md:left-28 text-[#F7418F] dark:text-blue-400 font-mono text-xs md:text-sm opacity-70 bg-white/70 dark:bg-black/40 backdrop-blur-xs px-3 py-1.5 rounded-lg border border-[#FEC7B4] dark:border-blue-500/30 shadow-xs">
          git commit -m "Building the future"
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-16">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          <span className="bg-gradient-to-r from-[#F7418F] via-[#FC819E] to-[#F7418F] dark:from-cyan-400 dark:via-blue-500 dark:to-green-400 bg-clip-text text-transparent animate-pulse">
            Fullstack Developer
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-700 dark:text-gray-300 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
          Turning code into elegant, secure, and practical solutions
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-[#FC819E] to-[#F7418F] dark:from-cyan-500 dark:to-blue-600 rounded-xl text-white font-semibold shadow-md hover:shadow-xl hover:shadow-[#F7418F]/30 dark:hover:shadow-cyan-500/50 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-center"
          >
            View Projects
          </a>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-3.5 border-2 border-[#F7418F] text-[#F7418F] dark:border-green-400 dark:text-green-400 rounded-xl font-semibold hover:bg-[#F7418F] hover:text-white dark:hover:bg-green-400 dark:hover:text-black transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 text-center shadow-xs"
          >
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
