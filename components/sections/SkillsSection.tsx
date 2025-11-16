'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss,
  SiNodedotjs, SiPostgresql, SiGraphql, SiDocker,
  SiGit, SiFigma, SiVercel, SiFramer
} from 'react-icons/si';
import { TbApi, TbBrandThreejs } from 'react-icons/tb';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useFadeInScroll } from '@/lib/hooks/useScrollAnimations';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useFadeInScroll('up', 60);
  const gridRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const skillCategories = [
    {
      title: 'Desenvolvimento Frontend',
      color: 'from-blue-500 to-cyan-500',
      glowColor: 'rgba(59, 130, 246, 0.3)',
      skills: [
        { name: 'React', level: 90, icon: SiReact },
        { name: 'TypeScript', level: 88, icon: SiTypescript },
        { name: 'Next.js', level: 85, icon: SiNextdotjs },
        { name: 'Tailwind CSS', level: 92, icon: SiTailwindcss },
      ],
    },
    {
      title: 'Backend & Banco de Dados',
      color: 'from-green-500 to-emerald-500',
      glowColor: 'rgba(16, 185, 129, 0.3)',
      skills: [
        { name: 'Node.js', level: 85, icon: SiNodedotjs },
        { name: 'PostgreSQL', level: 82, icon: SiPostgresql },
        { name: 'REST APIs', level: 88, icon: TbApi },
        { name: 'GraphQL', level: 70, icon: SiGraphql },
      ],
    },
    {
      title: 'IA & Data Science',
      color: 'from-purple-500 to-pink-500',
      glowColor: 'rgba(168, 85, 247, 0.3)',
      skills: [
        { name: 'Python', level: 92, icon: SiFramer },
        { name: 'Machine Learning', level: 85, icon: SiFramer },
        { name: 'Visão Computacional', level: 80, icon: TbBrandThreejs },
        { name: 'Rust', level: 75, icon: TbBrandThreejs },
      ],
    },
    {
      title: 'Ferramentas & Design',
      color: 'from-orange-500 to-red-500',
      glowColor: 'rgba(249, 115, 22, 0.3)',
      skills: [
        { name: 'Git', level: 92, icon: SiGit },
        { name: 'Figma', level: 88, icon: SiFigma },
        { name: 'Docker', level: 75, icon: SiDocker },
        { name: 'Power BI', level: 80, icon: SiVercel },
      ],
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    if (!section || !grid) return;

    const ctx = gsap.context(() => {
      // Category cards stagger animation
      const cards = grid.querySelectorAll('.skill-category-card');
      
      gsap.from(cards, {
        y: 100,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: grid,
          start: 'top 80%',
          once: true,
        },
      });

      // Individual skill items animation
      cards.forEach((card) => {
        const skillItems = card.querySelectorAll('.skill-item');
        
        gsap.from(skillItems, {
          x: -30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          },
        });
      });

      // Floating orbs parallax
      gsap.to('.floating-orb', {
        y: (i) => -50 * (i + 1),
        x: (i) => (i % 2 === 0 ? -30 : 30),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Skill icons rotation on scroll
      const icons = section.querySelectorAll('.skill-icon');
      icons.forEach((icon) => {
        gsap.to(icon, {
          rotation: 360,
          ease: 'none',
          scrollTrigger: {
            trigger: icon,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 2,
          },
        });
      });

    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="skills"
      className="relative overflow-hidden bg-neutral-950 section-spacing"
    >
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="floating-orb absolute top-20 left-20 w-[400px] h-[400px] bg-primary-500/10 rounded-full blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div 
          className="floating-orb absolute bottom-40 right-20 w-[500px] h-[500px] bg-accent-500/10 rounded-full blur-[120px]"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div 
          className="floating-orb absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container-padding mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div ref={titleRef as React.RefObject<HTMLDivElement>} className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 rounded-full glass text-sm font-semibold text-primary-300 border border-primary-500/20">
              Habilidades Técnicas
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Stack Tecnológica & <span className="text-gradient">Especialização</span>
          </h2>
          
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Tecnologias e ferramentas modernas que uso para criar experiências digitais excepcionais
          </p>
        </div>

        {/* Skills Grid */}
        <div ref={gridRef} className="grid gap-8 md:grid-cols-2 mb-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              className="skill-category-card group relative"
              data-magnetic
            >
              <div className="glass-strong backdrop-blur-2xl border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all relative overflow-hidden">
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-8">
                  <motion.div
                    className={`h-2 w-16 bg-gradient-to-r ${category.color} rounded-full relative overflow-hidden`}
                    whileHover={{ width: 80 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                      animate={{
                        x: ['-100%', '200%'],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-gradient transition-all">
                    {category.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-6">
                  {category.skills.map((skill, skillIndex) => {
                    const Icon = skill.icon;
                    const skillId = `${category.title}-${skill.name}`;
                    
                    return (
                      <div 
                        key={skill.name} 
                        className="skill-item group/skill"
                        onMouseEnter={() => setHoveredSkill(skillId)}
                        onMouseLeave={() => setHoveredSkill(null)}
                      >
                        {/* Skill Header */}
                        <div className="mb-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <motion.div 
                              className={`skill-icon p-2.5 rounded-lg bg-gradient-to-br ${category.color} shadow-lg relative overflow-hidden`}
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                            >
                              <Icon className="w-5 h-5 text-white relative z-10" />
                              
                              {/* Icon shimmer effect */}
                              {hoveredSkill === skillId && (
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                                  initial={{ x: '-100%' }}
                                  animate={{ x: '200%' }}
                                  transition={{
                                    duration: 0.8,
                                    ease: 'easeInOut',
                                  }}
                                />
                              )}
                            </motion.div>
                            <span className="font-medium text-neutral-200 group-hover/skill:text-white transition-colors">
                              {skill.name}
                            </span>
                          </div>
                          <motion.span
                            className={`text-sm font-semibold bg-gradient-to-r ${category.color} bg-clip-text text-transparent`}
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{
                              delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.5,
                            }}
                          >
                            {skill.level}%
                          </motion.span>
                        </div>

                        {/* Progress Bar */}
                        <div className="relative h-3 overflow-hidden rounded-full bg-neutral-800/50 border border-neutral-700/50">
                          <motion.div
                            className={`h-full rounded-full bg-gradient-to-r ${category.color} shadow-lg relative overflow-hidden`}
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            viewport={{ once: true }}
                            transition={{
                              duration: 1.5,
                              delay: categoryIndex * 0.2 + skillIndex * 0.1,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                          >
                            {/* Animated shimmer */}
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                              animate={{
                                x: ['-100%', '200%'],
                              }}
                              transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: 'linear',
                                delay: categoryIndex * 0.2 + skillIndex * 0.1,
                              }}
                            />
                          </motion.div>

                          {/* Glow effect on hover */}
                          {hoveredSkill === skillId && (
                            <motion.div
                              className={`absolute inset-0 bg-gradient-to-r ${category.color} blur-md`}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 0.5 }}
                              exit={{ opacity: 0 }}
                            />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none rounded-3xl`} />
              </div>

              {/* Glow Effect */}
              <motion.div
                className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${category.color} opacity-0 blur-2xl -z-10 group-hover:opacity-20 transition-opacity duration-500`}
              />
            </motion.div>
          ))}
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'Tecnologias', value: '15+', color: 'from-blue-500 to-cyan-500' },
            { label: 'Anos de Experiência', value: '2+', color: 'from-green-500 to-emerald-500' },
            { label: 'Projetos Construídos', value: '5+', color: 'from-purple-500 to-pink-500' },
            { label: 'Certificações', value: '4+', color: 'from-orange-500 to-red-500' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-strong backdrop-blur-xl rounded-2xl p-6 text-center border border-white/10 hover:border-white/20 transition-all group"
              whileHover={{ scale: 1.05, y: -5 }}
              data-magnetic
            >
              <motion.p 
                className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{
                  type: 'spring',
                  stiffness: 200,
                  damping: 15,
                  delay: index * 0.1,
                }}
              >
                {stat.value}
              </motion.p>
              <p className="text-sm text-neutral-400 uppercase tracking-wider">{stat.label}</p>
              
              {/* Hover glow */}
              <motion.div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${stat.color} opacity-0 blur-xl -z-10 group-hover:opacity-30 transition-opacity duration-500`}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10 pointer-events-none" />
    </section>
  );
}
