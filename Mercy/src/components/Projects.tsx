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

  const list = useMemo(() => projects ?? [], [projects]);

  // 🎯 Center tracking (Netflix spotlight behavior)
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const items = Array.from(container.children);

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
        threshold: 0.65,
      }
    );

    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [list]);

  // 🎬 Smooth scroll buttons (like Netflix row controls)
  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;

    const amount = scrollRef.current.clientWidth * 0.8;

    scrollRef.current.scrollBy({
      left: dir === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  // 🎞️ subtle autoplay drift (stop when user interacts)
  useEffect(() => {
    if (!scrollRef.current || list.length === 0) return;

    let frame: number;

    const autoScroll = () => {
      if (!scrollRef.current) return;

      scrollRef.current.scrollLeft += 0.3; // slow cinematic drift
      frame = requestAnimationFrame(autoScroll);
    };

    frame = requestAnimationFrame(autoScroll);

    const stop = () => cancelAnimationFrame(frame);

    scrollRef.current.addEventListener('mouseenter', stop);
    scrollRef.current.addEventListener('touchstart', stop);

    return () => cancelAnimationFrame(frame);
  }, [list]);

  return (
    <section className="py-24 bg-black text-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-bold">
            <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>

          {list.length > 0 && (
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => scroll('left')}
                className="px-3 py-2 bg-gray-900 border border-gray-800 rounded hover:border-cyan-400"
              >
                ←
              </button>
              <button
                onClick={() => scroll('right')}
                className="px-3 py-2 bg-gray-900 border border-gray-800 rounded hover:border-cyan-400"
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

        {!isLoading && !isError && list.length === 0 && (
          <p className="text-center text-gray-400">
            No projects published yet.
          </p>
        )}

        {/* CAROUSEL */}
        {!isLoading && !isError && list.length > 0 && (
          <div
            ref={scrollRef}
            className="
              flex gap-6 overflow-x-auto pb-10
              snap-x snap-mandatory scroll-smooth
              scrollbar-hide
              px-2
            "
          >
            {list.map((project) => {
              const isActive = activeId === project.id;

              return (
                <div
                  key={project.id}
                  data-id={project.id}
                  className="
                    min-w-[320px] md:min-w-[420px]
                    snap-center
                    transition-all duration-500
                  "
                >
<div
  className={`
    relative rounded-2xl overflow-hidden
    border shadow-lg
    transition-all duration-500
    group cursor-pointer

    ${
      isActive
        ? 'border-cyan-400 scale-105'
        : 'border-gray-800 opacity-80 scale-95'
    }

    hover:scale-105 hover:opacity-100 hover:border-cyan-400
  `}
>
  {/* IMAGE */}
  <div className="relative h-56 overflow-hidden">
    <img
      src={project.imageUrl}
      alt={project.title}
      className="
        w-full h-full object-cover
        transition-transform duration-700
        group-hover:scale-110
      "
      loading="lazy"
    />

    <div
      className="
        absolute inset-0
        bg-gradient-to-t
        from-black via-black/40 to-transparent
      "
    />
  </div>


  {/* CONTENT */}
  <div className="p-5 flex flex-col gap-3">

    <h3 className="text-xl font-semibold text-green-400">
      {project.title}
    </h3>


    {/* DESCRIPTION */}
    <div
      className="
        text-gray-400 text-sm
        transition-all duration-300
        max-h-12
        overflow-hidden

        group-hover:max-h-40
        group-hover:overflow-y-auto
      "
    >
      {project.description}
    </div>


    {/* TECH STACK */}
    <div
      className="
        flex flex-wrap gap-2
        transition-all duration-300
      "
    >
      {(project.techStack ?? []).map((tech) => (
        <span
          key={`${project.id}-${tech}`}
          className="
            px-2 py-1
            text-xs
            rounded-full
            bg-gray-800
            text-cyan-400
            border border-cyan-400/30
          "
        >
          {tech}
        </span>
      ))}
    </div>


    {/* ACTIONS */}
    <div className="flex justify-between pt-3 text-sm">

      {project.githubUrl !== '#' && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            text-green-400
            hover:text-green-300
          "
        >
          Repository
        </a>
      )}


      {project.demoUrl !== '#' && (
        <a
          href={project.demoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="
            text-cyan-400
            hover:text-cyan-300
          "
        >
          Live Demo
        </a>
      )}

    </div>

  </div>


  {isActive && (
    <div
      className="
        absolute inset-0
        border-2 border-cyan-400/30
        rounded-2xl
        pointer-events-none
      "
    />
  )}

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