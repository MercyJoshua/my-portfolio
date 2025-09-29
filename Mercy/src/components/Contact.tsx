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
    <section className="py-20 bg-black">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            Let's Connect
          </span>
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div>
            <h3 className="text-2xl font-semibold text-white mb-6">Get In Touch</h3>
            <p className="text-gray-400 mb-8 leading-relaxed">
              I'm always open to discussing new opportunities, collaborating on interesting projects, 
              or just having a chat about technology and cybersecurity.
            </p>
            
            <div className="space-y-4">
              {/* Email */}
              <a 
                href="mailto:tmercyjoshua747@gmail.com" 
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/30 transition">
                  <Mail className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Email</p>
                  <p className="text-gray-400 group-hover:text-cyan-400 transition">tmercyjoshua747@gmail.com</p>
                </div>
              </a>
              
              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/mercy-joshua-417290195" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center group-hover:bg-green-500/30 transition">
                  <Linkedin className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <p className="text-white font-medium">LinkedIn</p>
                  <p className="text-gray-400 group-hover:text-green-400 transition">/in/mercy-joshua</p>
                </div>
              </a>
              
              {/* GitHub */}
              <a 
                href="https://github.com/MercyJoshua" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-4 group"
              >
                <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500/30 transition">
                  <Github className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-white font-medium">GitHub</p>
                  <p className="text-gray-400 group-hover:text-blue-400 transition">github.com/MercyJoshua</p>
                </div>
              </a>
            </div>
          </div>
          
          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="name"
                placeholder="$ echo 'Your Name'"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors font-mono"
              />
              
              <input
                type="email"
                name="email"
                placeholder="$ cat email.txt"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors font-mono"
              />
              
              <textarea
                name="message"
                placeholder="$ vim message.md"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-cyan-400 focus:outline-none transition-colors font-mono resize-none"
              />

              <button
                type="submit"
                disabled={status === "loading"}
                className={`w-full px-6 py-3 rounded-lg font-semibold text-black transition-all duration-300 
                  ${status === "loading" 
                    ? "bg-gray-500 cursor-not-allowed" 
                    : "bg-gradient-to-r from-cyan-500 to-green-500 hover:shadow-lg hover:shadow-cyan-500/50 transform hover:scale-105"
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
