import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { cmsApi } from '@/lib/cms-api';

const Skills = () => {
  const { data: skillCategories, isLoading, isError } = useQuery({
    queryKey: ['skills', 'public'],
    queryFn: cmsApi.getSkills,
  });

  return (
    <section className="py-24 bg-[#FFFDF7] dark:bg-gray-900/60 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-[#F7418F] via-[#FC819E] to-[#FEC7B4] dark:from-cyan-400 dark:to-green-400 bg-clip-text text-transparent">
            Technical Expertise
          </span>
        </h2>

        {isLoading && <p className="text-center text-gray-500 dark:text-gray-400 py-6">Loading skills...</p>}

        {isError && (
          <p className="text-center text-red-500 dark:text-red-400 py-6">Could not load skills right now.</p>
        )}

        {!isLoading && !isError && (!skillCategories || skillCategories.length === 0) && (
          <p className="text-center text-gray-500 dark:text-gray-400 py-6">No skills configured yet.</p>
        )}

        {!isLoading && !isError && skillCategories && skillCategories.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category, index) => {
              const borderColors = [
                'border-[#FC819E]/50 hover:border-[#F7418F]',
                'border-[#FEC7B4] hover:border-[#FC819E]',
                'border-[#F7418F]/40 hover:border-[#F7418F]',
                'border-[#FEC7B4] hover:border-[#F7418F]'
              ];
              const borderColor = borderColors[index % borderColors.length];

              return (
                <div
                  key={category.id}
                  className={`bg-white dark:bg-gray-800 p-7 rounded-2xl border ${borderColor} dark:border-gray-700 dark:hover:border-cyan-400/50 shadow-sm hover:shadow-md transition-all duration-300`}
                >
                  <h3 className="text-xl font-semibold text-[#F7418F] dark:text-cyan-400 mb-6 transition-colors">
                    {category.name}
                  </h3>
                  <div className="flex flex-wrap gap-2.5">
                    {category.skills.map((skill) => (
                      <span
                        key={skill.id}
                        className="px-3 py-1.5 bg-[#FFF3C7]/60 dark:bg-gray-900 text-slate-800 dark:text-gray-200 text-sm font-medium rounded-full border border-[#FEC7B4] dark:border-gray-600 hover:bg-[#FEC7B4]/40 dark:hover:bg-gray-800 transition-colors"
                      >
                        {skill.name}
                      </span>
                    ))}
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

export default Skills;
