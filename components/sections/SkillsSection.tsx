'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const skillCategories = [
    {
      title: 'Frontend',
      skills: [
        { name: 'React', level: 95 },
        { name: 'Next.js', level: 90 },
        { name: 'TypeScript', level: 88 },
        { name: 'Tailwind CSS', level: 92 },
      ],
    },
    {
      title: 'Backend',
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'PostgreSQL', level: 80 },
        { name: 'GraphQL', level: 75 },
        { name: 'REST APIs', level: 88 },
      ],
    },
    {
      title: 'Animação & 3D',
      skills: [
        { name: 'Framer Motion', level: 90 },
        { name: 'GSAP', level: 85 },
        { name: 'Three.js', level: 75 },
        { name: 'React Three Fiber', level: 78 },
      ],
    },
    {
      title: 'Ferramentas',
      skills: [
        { name: 'Git', level: 92 },
        { name: 'Figma', level: 88 },
        { name: 'Docker', level: 75 },
        { name: 'Vercel', level: 90 },
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
              className="glass rounded-3xl p-8"
            >
              <h3 className="mb-6 text-2xl font-bold text-white">
                {category.title}
              </h3>

              <div className="space-y-6">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name} className="group">
                    {/* Nome e percentual */}
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-medium text-slate-300">
                        {skill.name}
                      </span>
                      <motion.span
                        className="text-sm text-primary-400"
                        initial={{ opacity: 0 }}
                        animate={
                          isInView
                            ? { opacity: 1 }
                            : { opacity: 0 }
                        }
                        transition={{
                          delay: categoryIndex * 0.15 + skillIndex * 0.1 + 0.5,
                        }}
                      >
                        {skill.level}%
                      </motion.span>
                    </div>

                    {/* Barra de progresso */}
                    <div className="relative h-2 overflow-hidden rounded-full bg-slate-800">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-primary-500 to-accent-500"
                        initial={{ width: 0 }}
                        animate={
                          isInView
                            ? { width: `${skill.level}%` }
                            : { width: 0 }
                        }
                        transition={{
                          duration: 1,
                          delay: categoryIndex * 0.15 + skillIndex * 0.1,
                        }}
                      />

                      {/* Efeito de brilho na barra */}
                      <motion.div
                        className="absolute left-0 top-0 h-full w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        initial={{ x: '-100%' }}
                        animate={
                          isInView
                            ? {
                                x: ['0%', '400%'],
                              }
                            : {}
                        }
                        transition={{
                          duration: 1.5,
                          delay: categoryIndex * 0.15 + skillIndex * 0.1 + 0.3,
                          ease: 'easeInOut',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
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
