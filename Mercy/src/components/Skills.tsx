import React from 'react';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Development",
      skills: [
        { name: "React / Next.js", level: 90, tier: "Advanced" },
        { name: "TypeScript", level: 85, tier: "Advanced" },
        { name: "Tailwind CSS", level: 80, tier: "Proficient" },
        { name: "Vue.js", level: 70, tier: "Intermediate" }
      ]
    },
    {
      title: "Backend Development", 
      skills: [
        { name: "Node.js", level: 88, tier: "Advanced" },
        { name: "Python", level: 80, tier: "Proficient" },
        { name: "PostgreSQL", level: 82, tier: "Proficient" },
        { name: "MongoDB", level: 90, tier: "Advanced" }
      ]
    },
    {
      title: "Mobile Development",
      skills: [
        { name: "React Native", level: 85, tier: "Advanced" },
        { name: "Expo", level: 80, tier: "Proficient" }
      ]
    },
    {
      title: "Cybersecurity",
      skills: [
        { name: "Network Security", level: 70, tier: "Intermediate" },
        { name: "Penetration Testing", level: 65, tier: "Intermediate" },
        { name: "Cryptography", level: 72, tier: "Intermediate" },
        { name: "Risk Assessment", level: 68, tier: "Intermediate" }
      ]
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-16">
          <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
            Technical Expertise
          </span>
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category, idx) => (
            <div 
              key={idx} 
              className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-cyan-400/50 transition-all duration-300"
            >
              <h3 className="text-xl font-semibold text-cyan-400 mb-6">{category.title}</h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIdx) => (
                  <div key={skillIdx}>
                    <div className="flex justify-between mb-2 text-sm">
                      <span className="text-gray-300">{skill.name}</span>
                      <span className="text-green-400">{skill.tier}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-cyan-500 to-green-400 h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
