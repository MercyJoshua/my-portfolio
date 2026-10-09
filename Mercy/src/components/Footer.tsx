import React from 'react';
import { Github, Linkedin, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const XLogo = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 1200 1227" fill="currentColor">
      <path d="M714.163 519.284L1160.89 0H1056.79L666.508 450.887 370.511 0H0L464.909 681.821 0 1226.47H104.102L515.979 747.682 829.489 1226.47H1200L714.137 519.284H714.163ZM569.214 687.827L521.778 619.54 141.439 79.593H319.623L612.188 493.839 659.624 562.126 1057.04 1146.9H878.856L569.188 687.827H569.214Z"/>
    </svg>
  );

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/MercyJoshua', icon: <Github className="w-5 h-5" /> },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/mercy-joshua-417290195', icon: <Linkedin className="w-5 h-5" /> },
    { name: 'X', url: 'https://x.com/MercyJoshu93459', icon: <XLogo /> },
    { name: 'Email', url: 'mailto:tmercyjoshua747@gmail.com', icon: <Mail className="w-5 h-5" /> }
  ];

  return (
    <footer className="bg-[#FFF3C7]/40 dark:bg-gray-900 border-t border-[#FEC7B4] dark:border-gray-800 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-xl font-bold">
                <span className="text-[#F7418F] dark:text-cyan-400 font-mono">{'<'}</span>
                <span className="bg-gradient-to-r from-[#F7418F] to-[#FC819E] dark:from-cyan-400 dark:to-green-400 bg-clip-text text-transparent">MJ</span>
                <span className="text-[#FC819E] dark:text-green-400 font-mono">{'/>'}</span>
              </span>
            </div>
            <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">
              Fullstack developer passionate about creating secure, scalable solutions 
              across web, mobile, and cross-platform technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-[#F7418F] dark:text-green-400 font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="#skills" className="block text-slate-600 dark:text-gray-400 hover:text-[#F7418F] dark:hover:text-cyan-400 transition-colors text-sm">
                Skills & Expertise
              </a>
              <a href="#projects" className="block text-slate-600 dark:text-gray-400 hover:text-[#F7418F] dark:hover:text-cyan-400 transition-colors text-sm">
                Featured Projects
              </a>
              <a href="#about" className="block text-slate-600 dark:text-gray-400 hover:text-[#F7418F] dark:hover:text-cyan-400 transition-colors text-sm">
                About & Timeline
              </a>
              <a href="#contact" className="block text-slate-600 dark:text-gray-400 hover:text-[#F7418F] dark:hover:text-cyan-400 transition-colors text-sm">
                Contact Me
              </a>
            </div>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="text-[#F7418F] dark:text-green-400 font-semibold mb-4">Connect</h3>
            <div className="flex gap-3 mb-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center hover:bg-[#FEC7B4]/30 dark:hover:bg-cyan-500/20 hover:border-[#F7418F] dark:hover:border-cyan-400/50 border text-[#F7418F] dark:text-cyan-400 border-[#FEC7B4] dark:border-gray-700 shadow-xs transition-all duration-300"
                  title={link.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <p className="text-slate-600 dark:text-gray-400 text-sm">
              Open to new opportunities and collaborations
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#FEC7B4] dark:border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-600 dark:text-gray-400 text-sm">
            © {currentYear} Mercy Joshua.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="text-slate-500 dark:text-gray-500 text-xs font-mono">
              git commit -m "Building the future"
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
