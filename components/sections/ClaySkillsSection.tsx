'use client';

import { motion } from 'framer-motion';
import { 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiTailwindcss,
  SiPython,
  SiRust,
  SiPostgresql,
  SiMongodb,
  SiDocker,
  SiGit,
  SiFigma,
  SiFramer,
} from 'react-icons/si';

export default function ClaySkillsSection() {
  const skillCategories = [
    {
      title: 'Frontend',
      color: 'from-[#FFD4B8] to-[#FFC09D]',
      skills: [
        { name: 'React', icon: SiReact, level: 95 },
        { name: 'Next.js', icon: SiNextdotjs, level: 90 },
        { name: 'TypeScript', icon: SiTypescript, level: 92 },
        { name: 'Tailwind', icon: SiTailwindcss, level: 95 },
      ],
    },
    {
      title: 'Backend',
      color: 'from-[#E5D4FF] to-[#D5BFFF]',
      skills: [
        { name: 'Python', icon: SiPython, level: 88 },
        { name: 'Rust', icon: SiRust, level: 75 },
        { name: 'PostgreSQL', icon: SiPostgresql, level: 85 },
        { name: 'MongoDB', icon: SiMongodb, level: 80 },
      ],
    },
    {
      title: 'Tools & Design',
      color: 'from-[#B3F5CC] to-[#8DE9B3]',
      skills: [
        { name: 'Docker', icon: SiDocker, level: 82 },
        { name: 'Git', icon: SiGit, level: 90 },
        { name: 'Figma', icon: SiFigma, level: 88 },
        { name: 'Framer', icon: SiFramer, level: 85 },
      ],
    },
  ];

  return (
    <section
      id="skills"
      className="relative min-h-screen py-24 md:py-32 bg-gradient-to-br from-[#FFFEF9] via-[#F0F9FF] to-[#FAF7FF] overflow-hidden"
    >
      {/* Floating Background Shapes */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-32 left-[15%] w-80 h-80 bg-gradient-to-br from-[#FFD4B8] to-[#FFC09D] rounded-[100px] opacity-25 blur-3xl"
          animate={{
            y: [0, -50, 0],
            rotate: [0, 45, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-40 right-[10%] w-96 h-96 bg-gradient-to-br from-[#B3F5CC] to-[#8DE9B3] rounded-[120px] opacity-20 blur-3xl"
          animate={{
            y: [0, 40, 0],
            rotate: [0, -60, 0],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            type: 'spring',
            stiffness: 80,
          }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-7xl font-black text-[#6B5B4F] mb-6">
            Technical <span className="bg-gradient-to-r from-[#FFAC82] via-[#C5AAFF] to-[#66DD9A] bg-clip-text text-transparent">Skills</span>
          </h2>
          <p className="text-xl md:text-2xl text-[#8B7B6F] max-w-3xl mx-auto leading-relaxed">
            A diverse toolkit for building exceptional digital experiences
          </p>
        </motion.div>

        {/* Skills Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 0.7,
                delay: categoryIndex * 0.2,
                type: 'spring',
                stiffness: 80,
              }}
            >
              <motion.div
                className={`bg-gradient-to-br ${category.color} rounded-[40px] p-8 h-full`}
                style={{
                  boxShadow: '12px 12px 24px rgba(0,0,0,0.1), -8px -8px 20px rgba(255,255,255,0.9), inset 2px 2px 4px rgba(255,255,255,0.5)',
                }}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  boxShadow: '16px 16px 32px rgba(0,0,0,0.15), -12px -12px 28px rgba(255,255,255,1), inset 3px 3px 6px rgba(255,255,255,0.6)',
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
              >
                {/* Category Title */}
                <h3 className="text-3xl font-bold text-[#6B5B4F] mb-8">
                  {category.title}
                </h3>

                {/* Skills List */}
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => {
                    const Icon = skill.icon;
                    return (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{
                          delay: categoryIndex * 0.2 + skillIndex * 0.1,
                          type: 'spring',
                          stiffness: 100,
                        }}
                        className="space-y-3"
                      >
                        {/* Skill Header */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <motion.div
                              className="w-10 h-10 bg-white/40 rounded-[14px] flex items-center justify-center"
                              style={{
                                boxShadow: '4px 4px 8px rgba(0,0,0,0.1), -3px -3px 6px rgba(255,255,255,0.9)',
                              }}
                              whileHover={{
                                rotate: 360,
                                scale: 1.1,
                              }}
                              transition={{ duration: 0.6 }}
                            >
                              <Icon className="w-5 h-5 text-[#6B5B4F]" />
                            </motion.div>
                            <span className="font-bold text-[#6B5B4F]">
                              {skill.name}
                            </span>
                          </div>
                          <span className="text-sm font-semibold text-[#8B7B6F]">
                            {skill.level}%
                          </span>
                        </div>

                        {/* Progress Bar */}
                        <div
                          className="h-3 bg-white/30 rounded-full overflow-hidden"
                          style={{
                            boxShadow: 'inset 2px 2px 4px rgba(0,0,0,0.1)',
                          }}
                        >
                          <motion.div
                            className="h-full bg-gradient-to-r from-white/60 to-white/40 rounded-full"
                            style={{
                              boxShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                            }}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1,
                              delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.3,
                              ease: 'easeOut',
                            }}
                          />
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Additional Skills Tags */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            delay: 0.6,
            type: 'spring',
            stiffness: 80,
          }}
          className="mt-16 text-center"
        >
          <p className="text-[#8B7B6F] font-semibold mb-6">Also experienced with:</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Machine Learning', 'Computer Vision', 'IoT', 'GraphQL', 'Redis', 'AWS', 'CI/CD', 'Agile'].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.8 + index * 0.05,
                  type: 'spring',
                  stiffness: 300,
                }}
                className="px-6 py-3 bg-gradient-to-br from-[#C8E6F5] to-[#A7D8EA] rounded-[24px] font-semibold text-[#6B5B4F]"
                style={{
                  boxShadow: '6px 6px 12px rgba(126,200,227,0.3), -4px -4px 10px rgba(255,255,255,0.9)',
                }}
                whileHover={{
                  y: -4,
                  scale: 1.05,
                  boxShadow: '8px 8px 16px rgba(126,200,227,0.4), -6px -6px 14px rgba(255,255,255,1)',
                  transition: {
                    type: 'spring',
                    stiffness: 400,
                    damping: 17,
                  },
                }}
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Texture Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(107,91,79,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>
    </section>
  );
}
