import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { cmsApi } from '@/lib/cms-api';

const Projects = () => {
  const { data: projects, isLoading, isError } = useQuery({
    queryKey: ['projects', 'public'],
    queryFn: cmsApi.getProjects,
  });

  return (
    <section className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            Featured Projects
          </span>
        </h2>

        {isLoading && (
          <p className="text-center text-gray-400">Loading projects...</p>
        )}

        {isError && (
          <p className="text-center text-red-400">
            Could not load projects right now.
          </p>
        )}

        {!isLoading && !isError && (!projects || projects.length === 0) && (
          <p className="text-center text-gray-400">No projects published yet.</p>
        )}

        {!isLoading && !isError && projects && projects.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="group bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-cyan-400/50 transform hover:scale-105 transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-green-400 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.map((tech) => (
                      <span
                        key={`${project.id}-${tech}`}
                        className="px-2 py-1 bg-gray-800 text-cyan-400 text-xs rounded-full border border-cyan-400/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={project.githubUrl}
                      className="text-green-400 hover:text-green-300 transition-colors"
                    >
                      GitHub
                    </a>
                    <a
                      href={project.demoUrl}
                      className="text-cyan-400 hover:text-cyan-300 transition-colors"
                    >
                      Live Demo
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
