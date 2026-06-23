import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { cmsApi } from '@/lib/cms-api';

const Projects = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const { data: projects, isLoading, isError } = useQuery({
    queryKey: ['projects', 'public'],
    queryFn: cmsApi.getProjects,
  });

  const validProjects = useMemo(() => projects ?? [], [projects]);

  const scrollByAmount = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: dir === 'left' ? -420 : 420,
      behavior: 'smooth',
    });
  };

  // Track centered card (Netflix-style focus)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const cards = Array.from(container.children);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset.id;
            if (id) setActiveId(id);
          }
        });
      },
      {
        root: container,
        threshold: 0.6,
      }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [validProjects]);

  return (
    <section className="py-20 bg-black">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>

          {validProjects.length > 0 && (
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => scrollByAmount('left')}
                className="px-3 py-2 bg-gray-900 border border-gray-800 rounded hover:border-cyan-400/50"
              >
                ←
              </button>
              <button
                onClick={() => scrollByAmount('right')}
                className="px-3 py-2 bg-gray-900 border border-gray-800 rounded hover:border-cyan-400/50"
              >
                →
              </button>
            </div>
          )}
        </div>

        {/* STATES */}
        {isLoading && (
          <p className="text-center text-gray-400">Loading projects...</p>
        )}

        {isError && (
          <p className="text-center text-red-400">
            Could not load projects right now.
          </p>
        )}

        {!isLoading && !isError && validProjects.length === 0 && (
          <p className="text-center text-gray-400">
            No projects published yet.
          </p>
        )}

        {/* CAROUSEL */}
        {!isLoading && !isError && validProjects.length > 0 && (
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto pb-8 scroll-smooth snap-x snap-mandatory scrollbar-hide"
          >
            {validProjects.map((project) => {
              const isActive = activeId === project.id;

              return (
                <div
                  key={project.id}
                  data-id={project.id}
                  className="min-w-[320px] md:min-w-[380px] snap-center transition-all duration-500"
                >
                  <div
                    className={`
                      bg-gray-900 border rounded-xl overflow-hidden shadow-lg
                      transition-all duration-500
                      ${isActive
                        ? 'border-cyan-400 scale-105 opacity-100'
                        : 'border-gray-800 opacity-60 scale-95 blur-[0.2px]'
                      }
                      hover:opacity-100 hover:scale-105 hover:border-cyan-400
                    `}
                  >
                    {/* IMAGE */}
                    <div className="relative overflow-hidden">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-48 object-cover transition-transform duration-700 hover:scale-110"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    </div>

                    {/* CONTENT */}
                    <div className="p-5 flex flex-col gap-3">
                      <h3 className="text-lg font-semibold text-green-400">
                        {project.title}
                      </h3>

                      <p className="text-gray-400 text-sm line-clamp-2">
                        {project.description}
                      </p>

                      {/* TECH */}
                      <div className="flex flex-wrap gap-2">
                        {(project.techStack ?? [])
                          .slice(0, 3)
                          .map((tech) => (
                            <span
                              key={`${project.id}-${tech}`}
                              className="px-2 py-1 text-xs rounded-full bg-gray-800 text-cyan-400 border border-cyan-400/30"
                            >
                              {tech}
                            </span>
                          ))}
                      </div>

                      {/* LINKS */}
                      <div className="flex justify-between pt-2">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-400 text-sm hover:text-green-300"
                        >
                          Repo
                        </a>

                        <a
                          href={project.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 text-sm hover:text-cyan-300"
                        >
                          Live
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;