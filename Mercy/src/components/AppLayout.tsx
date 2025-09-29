import React from 'react';
import Navigation from './Navigation';
import Hero from './Hero';
import Skills from './Skills';
import Projects from './Projects';
import About from './About';
import Contact from './Contact';
import Footer from './Footer';
import AnimatedBackground from './AnimatedBackground';

const AppLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white relative">
      <AnimatedBackground />
      <Navigation />
      
      <main>
        <section id="home">
          <Hero />
        </section>
        
        <section id="skills">
          <Skills />
        </section>
        
        <section id="projects">
          <Projects />
        </section>
        
        <section id="about">
          <About />
        </section>
        
        <section id="contact">
          <Contact />
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default AppLayout;