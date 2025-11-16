'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiNodedotjs, SiPostgresql, SiGraphql, SiDocker,
  SiGit, SiFigma, SiVercel, SiFramer
} from 'react-icons/si';
import { TbApi, TbBrandThreejs } from 'react-icons/tb';

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const skillCategories = [
    {
      title: 'Frontend Development',
      color: 'from-blue-500 to-cyan-500',
      skills: [
        { name: 'React', level: 95, icon: SiReact },
        { name: 'Next.js', level: 90, icon: SiNextdotjs },
        { name: 'TypeScript', level: 88, icon: SiTypescript },
        { name: 'Tailwind CSS', level: 92, icon: SiTailwindcss },
      ],
    },
    {
      title: 'Backend & Database',
      color: 'from-green-500 to-emerald-500',
      skills: [
        { name: 'Node.js', level: 85, icon: SiNodedotjs },
        { name: 'PostgreSQL', level: 80, icon: SiPostgresql },
        { name: 'GraphQL', level: 75, icon: SiGraphql },
        { name: 'REST APIs', level: 88, icon: TbApi },
      ],
    },
    {
      title: 'Animation & 3D',
      color: 'from-purple-500 to-pink-500',
      skills: [
        { name: 'Framer Motion', level: 90, icon: SiFramer },
        { name: 'GSAP', level: 85, icon: SiFramer },
        { name: 'Three.js', level: 75, icon: TbBrandThreejs },
        { name: 'React Three Fiber', level: 78, icon: TbBrandThreejs },
      ],
    },
    {
      title: 'Tools & DevOps',
      color: 'from-orange-500 to-red-500',
      skills: [
        { name: 'Git', level: 92, icon: SiGit },
        { name: 'Figma', level: 88, icon: SiFigma },
        { name: 'Docker', level: 75, icon: SiDocker },
        { name: 'Vercel', level: 90, icon: SiVercel },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const categoryVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  } as const;

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative overflow-hidden bg-slate-950 py-24 md:py-32"
    >
      <div className="container-padding mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
            Skills & <span className="text-gradient">Tecnologias</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Ferramentas e tecnologias que uso para criar experiências incríveis
          </p>
        </motion.div>

        {/* Grid de categorias */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid gap-8 md:grid-cols-2"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={categoryVariants}
              whileHover={{ scale: 1.02 }}
              className="group relative"
            >
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 hover:border-white/20 transition-all">
                <div className="flex items-center gap-3 mb-8">
                  <div className={`h-1.5 w-12 bg-gradient-to-r ${category.color} rounded-full`} />
                  <h3 className="text-2xl font-bold text-white">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => {
                    const Icon = skill.icon;
                    return (
                      <div key={skill.name} className="group/skill">
                        {/* Nome e percentual */}
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg bg-gradient-to-br ${category.color} shadow-lg`}>
                              <Icon className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-medium text-slate-200">
                              {skill.name}
                            </span>
                          </div>
                          <motion.span
                            className="text-sm font-semibold text-primary-400"
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{
                              delay: categoryIndex * 0.15 + skillIndex * 0.1 + 0.5,
                            }}
                          >
                            {skill.level}%
                          </motion.span>
                        </div>

                        {/* Barra de progresso */}
                        <div className="relative h-3 overflow-hidden rounded-full bg-slate-800/50">
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${category.color} shadow-lg`}
                            initial={{ width: 0 }}
                            animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
                            transition={{
                              duration: 1.2,
                              delay: categoryIndex * 0.15 + skillIndex * 0.1,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          />

                          {/* Efeito de brilho na barra */}
                          <motion.div
                            className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                            initial={{ x: '-100%' }}
                            animate={isInView ? { x: ['0%', '500%'] } : {}}
                            transition={{
                              duration: 1.5,
                              delay: categoryIndex * 0.15 + skillIndex * 0.1 + 0.3,
                              ease: 'easeInOut',
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Glow Effect on Hover */}
              <motion.div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${category.color} opacity-0 blur-xl -z-10 group-hover:opacity-20 transition-opacity duration-500`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Floating elements decorativos */}
        <div className="absolute left-1/4 top-1/4 -z-10">
          <motion.div
            className="h-32 w-32 rounded-full bg-primary-500/20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>

        <div className="absolute bottom-1/4 right-1/4 -z-10">
          <motion.div
            className="h-40 w-40 rounded-full bg-accent-500/20 blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.2, 0.3],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
        </div>
      </div>
    </section>
  );
}
