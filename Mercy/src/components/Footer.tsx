import React from 'react';
import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const XLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1200 1227" fill="currentColor">
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
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center mb-4">
              <span className="text-xl font-bold">
                <span className="text-cyan-400 font-mono">{'<'}</span>
                <span className="text-cyan-400">MJ</span>
                <span className="text-green-400 font-mono">{'/>'}</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Fullstack developer passionate about creating secure, scalable solutions 
              across web, mobile, and cross-platform technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="#skills" className="block text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                Skills & Expertise
              </a>
              <a href="#projects" className="block text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                Featured Projects
              </a>
              <a href="#about" className="block text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                About & Timeline
              </a>
              <a href="#contact" className="block text-gray-400 hover:text-cyan-400 transition-colors text-sm">
                Contact Me
              </a>
            </div>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex gap-4 mb-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-400/50 border text-cyan-400 border-gray-700 transition-all duration-300"
                  title={link.name}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <p className="text-gray-400 text-sm">
              Open to new opportunities and collaborations
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Mercy Joshua.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="text-gray-500 text-xs font-mono">
              git commit -m "Building the future"
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
