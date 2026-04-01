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
    <section className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8">
              <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                About Me
              </span>
            </h2>

            <div className="space-y-6 text-gray-300 leading-relaxed">
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

            <div className="mt-8 flex flex-wrap gap-4">
              <span className="flex items-center gap-2 px-4 py-2 bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-400/30">
                <Globe className="w-4 h-4" />
                Web Development
              </span>
              <span className="flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-full border border-green-400/30">
                <Smartphone className="w-4 h-4" />
                Mobile Development
              </span>
              <span className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full border border-blue-400/30">
                <Shield className="w-4 h-4" />
                Cybersecurity
              </span>
              <span className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 text-purple-400 rounded-full border border-purple-400/30">
                <Users className="w-4 h-4" />
                Community & Hackathons
              </span>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold text-white mb-8">Journey Timeline</h3>

            {isLoading && <p className="text-gray-400">Loading timeline...</p>}
            {isError && <p className="text-red-400">Could not load timeline right now.</p>}
            {!isLoading && !isError && (!timeline || timeline.length === 0) && (
              <p className="text-gray-400">No timeline items available.</p>
            )}

            {!isLoading && !isError && timeline && timeline.length > 0 && (
              <div className="space-y-6">
                {timeline.map((item, idx) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-4 h-4 rounded-full border-2 ${
                          item.status === 'current'
                            ? 'bg-green-400 border-green-400 animate-pulse'
                            : 'bg-cyan-400 border-cyan-400'
                        }`}
                      ></div>
                      {idx !== timeline.length - 1 && (
                        <div className="w-0.5 h-16 bg-gray-700 mt-2"></div>
                      )}
                    </div>

                    <div className="flex-1 pb-8">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-cyan-400 font-mono text-sm">
                          {item.yearLabel}
                        </span>
                        {item.status === 'current' && (
                          <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                            Current
                          </span>
                        )}
                      </div>
                      <h4 className="text-white font-semibold mb-1">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.description}</p>
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
