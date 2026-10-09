import React, { useState } from 'react';
import { Mail, Linkedin, Github } from "lucide-react";
import emailjs from '@emailjs/browser';
import { toast } from "sonner"; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    emailjs.send(
      import.meta.env.VITE_SERVICE_ID,
      import.meta.env.VITE_TEMPLATE_ID,
      {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        time: new Date().toLocaleString(),
      },
      import.meta.env.VITE_PUBLIC_KEY
    )
    .then(() => {
      setStatus("success");
      toast.success("Message sent successfully 🎉"); 
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    })
    .catch((error) => {
      console.error("EmailJS Error:", error);
      setStatus("error");
      toast.error("Failed to send message 😢"); 
      setTimeout(() => setStatus("idle"), 3000);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="py-24 bg-[#FFFDF7] dark:bg-black transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-[#F7418F] via-[#FC819E] to-[#FEC7B4] dark:from-green-400 dark:to-cyan-400 bg-clip-text text-transparent">
            Let's Connect
          </span>
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-6">Get In Touch</h3>
            <p className="text-slate-600 dark:text-gray-400 mb-8 leading-relaxed">
              I'm always open to discussing new opportunities, collaborating on interesting projects, 
              or just having a chat about technology and cybersecurity.
            </p>
            
            <div className="space-y-4">
              {/* Email */}
              <a 
                href="mailto:tmercyjoshua747@gmail.com" 
                className="flex items-center gap-4 group p-3 rounded-xl hover:bg-[#FFF3C7]/40 dark:hover:bg-gray-900/60 transition-colors"
              >
                <div className="w-11 h-11 bg-[#FFF3C7] dark:bg-cyan-500/20 rounded-xl flex items-center justify-center group-hover:scale-105 border border-[#FEC7B4] dark:border-cyan-500/30 transition">
                  <Mail className="w-5 h-5 text-[#F7418F] dark:text-cyan-400" />
                </div>
                <div>
                  <p className="text-slate-900 dark:text-white font-medium">Email</p>
                  <p className="text-slate-600 dark:text-gray-400 group-hover:text-[#F7418F] dark:group-hover:text-cyan-400 transition font-mono text-sm">tmercyjoshua747@gmail.com</p>
                </div>
              </a>
              
              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/mercy-joshua-417290195" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 group p-3 rounded-xl hover:bg-[#FFF3C7]/40 dark:hover:bg-gray-900/60 transition-colors"
              >
                <div className="w-11 h-11 bg-[#FEC7B4]/50 dark:bg-green-500/20 rounded-xl flex items-center justify-center group-hover:scale-105 border border-[#FEC7B4] dark:border-green-500/30 transition">
                  <Linkedin className="w-5 h-5 text-[#F7418F] dark:text-green-400" />
                </div>
                <div>
                  <p className="text-slate-900 dark:text-white font-medium">LinkedIn</p>
                  <p className="text-slate-600 dark:text-gray-400 group-hover:text-[#F7418F] dark:group-hover:text-green-400 transition font-mono text-sm">/in/mercy-joshua</p>
                </div>
              </a>
              
              {/* GitHub */}
              <a 
                href="https://github.com/MercyJoshua" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 group p-3 rounded-xl hover:bg-[#FFF3C7]/40 dark:hover:bg-gray-900/60 transition-colors"
              >
                <div className="w-11 h-11 bg-[#FC819E]/20 dark:bg-blue-500/20 rounded-xl flex items-center justify-center group-hover:scale-105 border border-[#FC819E]/50 dark:border-blue-500/30 transition">
                  <Github className="w-5 h-5 text-[#F7418F] dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-slate-900 dark:text-white font-medium">GitHub</p>
                  <p className="text-slate-600 dark:text-gray-400 group-hover:text-[#F7418F] dark:group-hover:text-blue-400 transition font-mono text-sm">github.com/MercyJoshua</p>
                </div>
              </a>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                placeholder="$ echo 'Your Name'"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-[#FEC7B4] dark:border-gray-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:border-[#F7418F] dark:focus:border-cyan-400 focus:outline-none transition-colors font-mono shadow-xs"
              />
              
              <input
                type="email"
                name="email"
                placeholder="$ cat email.txt"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-[#FEC7B4] dark:border-gray-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:border-[#F7418F] dark:focus:border-cyan-400 focus:outline-none transition-colors font-mono shadow-xs"
              />
              
              <textarea
                name="message"
                placeholder="$ vim message.md"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-white dark:bg-gray-900 border border-[#FEC7B4] dark:border-gray-700 rounded-xl text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-500 focus:border-[#F7418F] dark:focus:border-cyan-400 focus:outline-none transition-colors font-mono resize-none shadow-xs"
              />

              <button
                type="submit"
                disabled={status === "loading"}
                className={`w-full px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 shadow-md 
                  ${status === "loading" 
                    ? "bg-gray-400 dark:bg-gray-600 text-white cursor-not-allowed" 
                    : "bg-gradient-to-r from-[#FC819E] to-[#F7418F] dark:from-cyan-500 dark:to-green-500 text-white dark:text-black hover:shadow-xl hover:shadow-[#F7418F]/30 dark:hover:shadow-cyan-500/50 hover:scale-[1.02] active:scale-[0.98]"
                  }`}
              >
                {status === "loading" && "Sending..."}
                {status === "success" && "✓ Message Sent!"}
                {status === "error" && "⚠️ Failed. Try Again"}
                {status === "idle" && "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
