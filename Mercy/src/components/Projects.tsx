import React from 'react';

const Projects = () => {
  const projects = [
    {
      title: "TalentVoyage",
      description: "Mobile Application for Local & Global Internships for students and young professionals",
      image: "/project/talentvoyage.png",
      tech: ["React Native", "Node.js", "Supabase", "Django"],
      github: "https://github.com/MercyJoshua/TalentVoyage.git",
      demo: "#"
    },
    {
      title: "Job Match",
      description: "AI powered job matching platform with advanced filtering",
      image: "/project/job-match.png",
      tech: ["Next.Js", "Nest.js", "OpenAI", "TypeScript"],
      github: "#",
      demo: "https://job-match-kappa.vercel.app/"
    },
    {
      title: "Devmeet",
      description: "Web based collaborative platform for developers to connect, share ideas and manage projects",
      image: "/project/devmeet.png",
      tech: ["Next.js", "SQL", "Express.js", "WebSocket"],
      github: "https://github.com/MercyJoshua/devmeet-app",
      demo: "https://devmeet-app.vercel.app/"
    },
    {
      title: "Waste Track Plus",
      description: "Community waste management tool for reporting hotspot and tracking",
      image: "/project/wastetrack.png",
      tech: ["React Native", "IoT", "Firebase"],
      github: "https://github.com/MercyJoshua/WasteTrackPlus",
      demo: "#"
    },
    {
      title: "ACLiF",
      description: "Website for African Child Leadership Foundation, a non-profit training children and teenagers on leadership in Nigeria and Africa",
      image: "/project/aclif.png",
      tech: ["React.js", "Python", "Typescript", "TailwindCSS"],
      github: "https://github.com/MercyJoshua/aclf-website.git",
      demo: "https://aclf-website.vercel.app/"
    },
    {
      title: "TaskMaster",
      description: "A productivity app to help users manage tasks, set reminders, and track progress",
      image: "/project/taskmaster.png",
      tech: ["Next.js", "Express.js", "MongoDB"],
      github: "https://github.com/MercyJoshua/todoapp.git",
      demo: "https://to-do-ten-rose.vercel.app/"
    }
  ];

  return (
    <section className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            Featured Projects
          </span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div key={idx} className="group bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-cyan-400/50 transform hover:scale-105 transition-all duration-300">
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-green-400 mb-2">{project.title}</h3>
                <p className="text-gray-400 mb-4 text-sm">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, techIdx) => (
                    <span key={techIdx} className="px-2 py-1 bg-gray-800 text-cyan-400 text-xs rounded-full border border-cyan-400/30">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-3">
                  <a href={project.github} className="text-green-400 hover:text-green-300 transition-colors">
                    GitHub
                  </a>
                  <a href={project.demo} className="text-cyan-400 hover:text-cyan-300 transition-colors">
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;