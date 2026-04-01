import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { cmsApi } from '@/lib/cms-api';

const Skills = () => {
  const { data: skillCategories, isLoading, isError } = useQuery({
    queryKey: ['skills', 'public'],
    queryFn: cmsApi.getSkills,
  });

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            Technical Expertise
          </span>
        </h2>

        {isLoading && <p className="text-center text-gray-400">Loading skills...</p>}

        {isError && (
          <p className="text-center text-red-400">Could not load skills right now.</p>
        )}

        {!isLoading && !isError && (!skillCategories || skillCategories.length === 0) && (
          <p className="text-center text-gray-400">No skills configured yet.</p>
        )}

        {!isLoading && !isError && skillCategories && skillCategories.length > 0 && (
          <div className="grid md:grid-cols-2 gap-8">
            {skillCategories.map((category) => (
              <div
                key={category.id}
                className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-cyan-400/50 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-cyan-400 mb-6">{category.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.id}
                      className="px-3 py-1 bg-gray-900 text-gray-200 text-sm rounded-full border border-gray-600"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;
