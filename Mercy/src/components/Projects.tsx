import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { cmsApi } from '@/lib/cms-api';

const Projects = () => {
  const [flipped, setFlipped] = useState<string | null>(null);
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
             <div className="relative h-[420px] perspective">
  <div
    className={`relative w-full h-full transition-transform duration-500 transform-style preserve-3d ${
      flipped === project.id ? 'rotate-y-180' : ''
    }`}
  >
    {/* FRONT */}
    <div className="absolute w-full h-full backface-hidden bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
      <div className="relative overflow-hidden">
        <img
          src={project.imageUrl}
          alt={project.title}
          className="w-full h-48 object-cover"
        />
      </div>

      <div className="p-6 flex flex-col h-[calc(100%-12rem)]">
        <h3 className="text-xl font-semibold text-green-400 mb-2">
          {project.title}
        </h3>

        <p className="text-gray-400 text-sm line-clamp-3 mb-4">
          {project.description}
        </p>

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

        <div className="mt-auto flex justify-between items-center">
          <button
            onClick={() => setFlipped(project.id)}
            className="text-sm text-cyan-400 hover:text-cyan-300"
          >
            Read more →
          </button>

          <div className="flex gap-3">
            <a className="text-green-400 text-sm" href={project.githubUrl}>
              Repo
            </a>
            <a className="text-cyan-400 text-sm" href={project.demoUrl}>
              Demo
            </a>
          </div>
        </div>
      </div>
    </div>

    {/* BACK */}
    <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-gray-950 rounded-xl border border-cyan-400/40 p-6 flex flex-col">
      <h3 className="text-xl font-semibold text-cyan-400 mb-3">
        {project.title}
      </h3>

      <p className="text-gray-300 text-sm leading-relaxed flex-1 overflow-auto">
        {project.description}
      </p>

      <div className="mt-4 flex justify-between">
        <button
          onClick={() => setFlipped(null)}
          className="text-sm text-gray-400 hover:text-white"
        >
          ← Back
        </button>

        <div className="flex gap-3">
          <a className="text-green-400 text-sm" href={project.githubUrl}>
            Repo
          </a>
          <a className="text-cyan-400 text-sm" href={project.demoUrl}>
            Demo
          </a>
        </div>
      </div>
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
