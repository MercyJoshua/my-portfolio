import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { cmsApi } from '@/lib/cms-api';

interface ThemeColorSet {
  border: string;
  activeBorder: string;
  activeRing: string;
  badgeBg: string;
  title: string;
  repoBtn: string;
  demoBtn: string;
}

const CARD_THEMES: { light: ThemeColorSet; dark: ThemeColorSet }[] = [
  // 1: Magenta Theme (#F7418F)
  {
    light: {
      border: 'border-[#F7418F]/40 hover:border-[#F7418F]',
      activeBorder: 'border-[#F7418F] shadow-lg shadow-[#F7418F]/20',
      activeRing: 'border-[#F7418F]/40',
      badgeBg: 'bg-[#FFF3C7] text-[#F7418F] border-[#FC819E]/50',
      title: 'text-[#F7418F]',
      repoBtn: 'text-[#FC819E] hover:text-[#F7418F]',
      demoBtn: 'text-[#F7418F] hover:text-[#9E1B4C]',
    },
    dark: {
      border: 'border-[#F7418F]/40 hover:border-[#F7418F]',
      activeBorder: 'border-[#F7418F] shadow-lg shadow-[#F7418F]/30',
      activeRing: 'border-[#F7418F]/40',
      badgeBg: 'bg-[#F7418F]/15 text-[#F7418F] border-[#F7418F]/40',
      title: 'text-[#F7418F]',
      repoBtn: 'text-[#FC819E] hover:text-[#F7418F]',
      demoBtn: 'text-[#F7418F] hover:text-[#FC819E]',
    },
  },
  // 2: Rose Theme (#FC819E)
  {
    light: {
      border: 'border-[#FC819E]/50 hover:border-[#FC819E]',
      activeBorder: 'border-[#FC819E] shadow-lg shadow-[#FC819E]/20',
      activeRing: 'border-[#FC819E]/40',
      badgeBg: 'bg-[#FEC7B4]/40 text-[#C1266B] border-[#FC819E]/40',
      title: 'text-[#FC819E]',
      repoBtn: 'text-[#F7418F] hover:text-[#9E1B4C]',
      demoBtn: 'text-[#FC819E] hover:text-[#F7418F]',
    },
    dark: {
      border: 'border-cyan-500/40 hover:border-cyan-400',
      activeBorder: 'border-cyan-400 shadow-lg shadow-cyan-500/30',
      activeRing: 'border-cyan-400/40',
      badgeBg: 'bg-cyan-500/15 text-cyan-400 border-cyan-400/30',
      title: 'text-cyan-400',
      repoBtn: 'text-green-400 hover:text-green-300',
      demoBtn: 'text-cyan-400 hover:text-cyan-300',
    },
  },
  // 3: Peach & Warm Coral Theme (#FEC7B4 / #FFF3C7)
  {
    light: {
      border: 'border-[#FEC7B4] hover:border-[#F7418F]',
      activeBorder: 'border-[#F7418F] shadow-lg shadow-[#FEC7B4]/40',
      activeRing: 'border-[#FEC7B4]/70',
      badgeBg: 'bg-[#FFF3C7] text-[#9E1B4C] border-[#FEC7B4]',
      title: 'text-[#E0337E]',
      repoBtn: 'text-[#FC819E] hover:text-[#F7418F]',
      demoBtn: 'text-[#F7418F] hover:text-[#9E1B4C]',
    },
    dark: {
      border: 'border-green-500/40 hover:border-green-400',
      activeBorder: 'border-green-400 shadow-lg shadow-green-500/30',
      activeRing: 'border-green-400/40',
      badgeBg: 'bg-green-500/15 text-green-400 border-green-400/30',
      title: 'text-green-400',
      repoBtn: 'text-cyan-400 hover:text-cyan-300',
      demoBtn: 'text-green-400 hover:text-green-300',
    },
  },
  // 4: Cream & Fuchsia Gold Theme
  {
    light: {
      border: 'border-[#FC819E]/40 hover:border-[#F7418F]',
      activeBorder: 'border-[#F7418F] shadow-lg shadow-[#F7418F]/20',
      activeRing: 'border-[#F7418F]/40',
      badgeBg: 'bg-[#FFF3C7]/90 text-[#F7418F] border-[#FEC7B4]',
      title: 'text-[#F7418F]',
      repoBtn: 'text-[#E0337E] hover:text-[#FC819E]',
      demoBtn: 'text-[#F7418F] hover:text-[#9E1B4C]',
    },
    dark: {
      border: 'border-purple-500/40 hover:border-purple-400',
      activeBorder: 'border-purple-400 shadow-lg shadow-purple-500/30',
      activeRing: 'border-purple-400/40',
      badgeBg: 'bg-purple-500/15 text-purple-400 border-purple-400/30',
      title: 'text-purple-400',
      repoBtn: 'text-green-400 hover:text-green-300',
      demoBtn: 'text-purple-400 hover:text-purple-300',
    },
  },
];

const Projects = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const { data: projects, isLoading, isError } = useQuery({
    queryKey: ['projects', 'public'],
    queryFn: cmsApi.getProjects,
  });

  const list = useMemo(() => projects ?? [], [projects]);

  // Center tracking
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

  // Smooth scroll buttons
  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;

    const amount = scrollRef.current.clientWidth * 0.8;

    scrollRef.current.scrollBy({
      left: dir === 'left' ? -amount : amount,
      behavior: 'smooth',
    });
  };

  // Subtle autoplay drift
  useEffect(() => {
    if (!scrollRef.current || list.length === 0) return;

    let frame: number;

    const autoScroll = () => {
      if (!scrollRef.current) return;
      scrollRef.current.scrollLeft += 0.3;
      frame = requestAnimationFrame(autoScroll);
    };

    frame = requestAnimationFrame(autoScroll);

    const stop = () => cancelAnimationFrame(frame);

    scrollRef.current.addEventListener('mouseenter', stop);
    scrollRef.current.addEventListener('touchstart', stop);

    return () => cancelAnimationFrame(frame);
  }, [list]);

  return (
    <section className="py-24 bg-[#FFF3C7]/20 dark:bg-black text-slate-900 dark:text-white transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-4xl font-bold">
            <span className="bg-gradient-to-r from-[#F7418F] via-[#FC819E] to-[#FEC7B4] dark:from-cyan-400 dark:to-green-400 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>

          {list.length > 0 && (
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => scroll('left')}
                className="px-4 py-2 bg-white dark:bg-gray-900 border border-[#FEC7B4] dark:border-gray-800 rounded-lg text-slate-700 dark:text-white hover:border-[#F7418F] dark:hover:border-cyan-400 shadow-sm transition-all duration-200"
                aria-label="Scroll left"
              >
                ←
              </button>
              <button
                onClick={() => scroll('right')}
                className="px-4 py-2 bg-white dark:bg-gray-900 border border-[#FEC7B4] dark:border-gray-800 rounded-lg text-slate-700 dark:text-white hover:border-[#F7418F] dark:hover:border-cyan-400 shadow-sm transition-all duration-200"
                aria-label="Scroll right"
              >
                →
              </button>
            </div>
          )}
        </div>

        {/* STATES */}
        {isLoading && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-10">Loading projects...</p>
        )}

        {isError && (
          <p className="text-center text-red-500 dark:text-red-400 py-10">
            Could not load projects right now.
          </p>
        )}

        {!isLoading && !isError && list.length === 0 && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-10">
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
            {list.map((project, index) => {
              const isActive = activeId === project.id;
              const themeIndex = index % CARD_THEMES.length;
              const theme = CARD_THEMES[themeIndex];

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
                      border shadow-md dark:shadow-lg
                      bg-white dark:bg-gray-900/90 backdrop-blur-sm
                      transition-all duration-500
                      group cursor-pointer

                      ${
                        isActive
                          ? `${theme.light.activeBorder} dark:${theme.dark.activeBorder} scale-105 opacity-100`
                          : `${theme.light.border} dark:${theme.dark.border} opacity-85 scale-95 hover:opacity-100 hover:scale-105`
                      }
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
                          from-white via-white/20 to-transparent
                          dark:from-gray-900 dark:via-black/40 dark:to-transparent
                        "
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="p-5 flex flex-col gap-3">
                      <h3
                        className={`text-xl font-semibold transition-colors ${theme.light.title} dark:${theme.dark.title}`}
                      >
                        {project.title}
                      </h3>

                      {/* DESCRIPTION */}
                      <div
                        className="
                          text-slate-600 dark:text-gray-400 text-sm
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
                            className={`
                              px-2.5 py-1
                              text-xs font-mono font-medium
                              rounded-full border
                              transition-colors
                              ${theme.light.badgeBg}
                              dark:${theme.dark.badgeBg}
                            `}
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* ACTIONS */}
                      <div className="flex justify-between pt-3 text-sm font-semibold">
                        {project.githubUrl && project.githubUrl !== '#' && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`transition-colors ${theme.light.repoBtn} dark:${theme.dark.repoBtn}`}
                          >
                            Repository →
                          </a>
                        )}

                        {project.demoUrl && project.demoUrl !== '#' && (
                          <a
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`transition-colors ${theme.light.demoBtn} dark:${theme.dark.demoBtn}`}
                          >
                            Live Demo ↗
                          </a>
                        )}
                      </div>
                    </div>

                    {isActive && (
                      <div
                        className={`
                          absolute inset-0
                          border-2
                          ${theme.light.activeRing}
                          dark:${theme.dark.activeRing}
                          rounded-2xl
                          pointer-events-none
                        `}
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