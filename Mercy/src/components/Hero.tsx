import React from 'react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src="https://d64gsuwffb70l.cloudfront.net/68bc5f5e997849091ee3f617_1757175708813_c90a5f10.webp" 
          alt="Cybersecurity Background" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Floating Code Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="animate-pulse absolute top-20 left-10 text-cyan-400 font-mono text-sm opacity-60">
          const developer = {'{'} skills: ['React', 'Node.js'] {'}'}
        </div>
        <div className="animate-bounce absolute top-40 right-20 text-green-400 font-mono text-sm opacity-60">
          npm install security-tools
        </div>
        <div className="animate-pulse absolute bottom-40 left-20 text-blue-400 font-mono text-sm opacity-60">
          git commit -m "Building the future"
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* <div className="mb-8">
          <img 
            src="https://d64gsuwffb70l.cloudfront.net/68bc5f5e997849091ee3f617_1757175689000_7c754f81.webp" 
            alt="Developer Avatar" 
            className="w-32 h-32 rounded-full mx-auto border-4 border-cyan-400 shadow-lg shadow-cyan-400/50 hover:shadow-cyan-400/80 transition-all duration-300"
          />
        </div>
         */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-green-400 bg-clip-text text-transparent animate-pulse">
            Fullstack Developer
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
          Turning code into practical solutions 
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105 transition-all duration-300">
          <a href='#projects'> View Projects</a>
           
          </button>
         <a
  href="/resume.pdf"
  download="My_Resume.pdf"
  className="px-8 py-3 border-2 border-green-400 text-green-400 rounded-lg font-semibold hover:bg-green-400 hover:text-black transition-all duration-300 text-center"
>
  Download Resume
</a>

        </div>
      </div>
    </section>
  );
};

export default Hero;