import React from 'react';
import { Globe, Smartphone, Shield, Users } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { cmsApi } from '@/lib/cms-api';

const About = () => {
  const { data: timeline, isLoading, isError } = useQuery({
    queryKey: ['timeline', 'public'],
    queryFn: cmsApi.getTimeline,
  });

  return (
    <section className="py-24 bg-[#FFF3C7]/20 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8">
              <span className="bg-gradient-to-r from-[#F7418F] via-[#FC819E] to-[#FEC7B4] dark:from-cyan-400 dark:to-green-400 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>

            <div className="space-y-6 text-slate-700 dark:text-gray-300 leading-relaxed font-normal">
              <p>
                I am a developer with a passion for building across web, mobile, and
                cross-platform solutions. Along the way, I have gained experience
                working across the stack and shipping impactful projects.
              </p>

              <p>
                My journey blends software engineering with cybersecurity, enabling
                me to build not only scalable applications but also secure systems
                that stand the test of time.
              </p>

              <p>
                I value continuous learning, collaboration, and being part of
                communities that drive innovation, whether that is through
                hackathons, summits, or open-source projects.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3.5">
              <span className="flex items-center gap-2 px-4 py-2 bg-[#FFF3C7] text-[#F7418F] dark:bg-cyan-500/20 dark:text-cyan-400 rounded-full border border-[#FC819E]/40 dark:border-cyan-400/30 text-sm font-medium shadow-xs">
                <Globe className="w-4 h-4" />
                Web Development
              </span>
              <span className="flex items-center gap-2 px-4 py-2 bg-[#FEC7B4]/50 text-[#C1266B] dark:bg-green-500/20 dark:text-green-400 rounded-full border border-[#FEC7B4] dark:border-green-400/30 text-sm font-medium shadow-xs">
                <Smartphone className="w-4 h-4" />
                Mobile Development
              </span>
              <span className="flex items-center gap-2 px-4 py-2 bg-[#FC819E]/20 text-[#F7418F] dark:bg-blue-500/20 dark:text-blue-400 rounded-full border border-[#FC819E]/50 dark:border-blue-400/30 text-sm font-medium shadow-xs">
                <Shield className="w-4 h-4" />
                Cybersecurity
              </span>
              <span className="flex items-center gap-2 px-4 py-2 bg-[#F7418F]/15 text-[#F7418F] dark:bg-purple-500/20 dark:text-purple-400 rounded-full border border-[#F7418F]/30 dark:border-purple-400/30 text-sm font-medium shadow-xs">
                <Users className="w-4 h-4" />
                Community & Hackathons
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-slate-900 dark:text-white mb-8">Journey Timeline</h3>

            {isLoading && <p className="text-gray-500 dark:text-gray-400">Loading timeline...</p>}
            {isError && <p className="text-red-500 dark:text-red-400">Could not load timeline right now.</p>}
            {!isLoading && !isError && (!timeline || timeline.length === 0) && (
              <p className="text-gray-500 dark:text-gray-400">No timeline items available.</p>
            )}

            {!isLoading && !isError && timeline && timeline.length > 0 && (
              <div className="space-y-6">
                {timeline.map((item, idx) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          item.status === 'current'
                            ? 'bg-[#F7418F] border-[#F7418F] dark:bg-green-400 dark:border-green-400 animate-pulse'
                            : 'bg-[#FC819E] border-[#FC819E] dark:bg-cyan-400 dark:border-cyan-400'
                        }`}
                      ></div>
                      {idx !== timeline.length - 1 && (
                        <div className="w-0.5 h-16 bg-[#FEC7B4] dark:bg-gray-700 mt-2"></div>
                      )}
                    </div>

                    <div className="flex-1 pb-6">
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="text-[#F7418F] dark:text-cyan-400 font-mono text-sm font-semibold">
                          {item.yearLabel}
                        </span>
                        {item.status === 'current' && (
                          <span className="px-2.5 py-0.5 bg-[#FFF3C7] text-[#F7418F] dark:bg-green-500/20 dark:text-green-400 text-xs font-semibold rounded-full border border-[#FC819E]/40 dark:border-green-400/30">
                            Current
                          </span>
                        )}
                      </div>
                      <h4 className="text-slate-900 dark:text-white font-semibold mb-1">{item.title}</h4>
                      <p className="text-slate-600 dark:text-gray-400 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
