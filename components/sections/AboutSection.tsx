'use client';

import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { Code2, Palette, Sparkles, Award, Users, Zap } from 'lucide-react';

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as any,
      },
    },
  } as const;

  const skills = [
    { 
      icon: Code2, 
      title: 'Desenvolvimento Full-Stack', 
      desc: 'React, Next.js, TypeScript, Node.js',
      color: 'from-blue-500 to-cyan-500'
    },
    { 
      icon: Palette, 
      title: 'Design & UI/UX', 
      desc: 'Figma, Tailwind CSS, Design Systems',
      color: 'from-purple-500 to-pink-500'
    },
    { 
      icon: Sparkles, 
      title: 'Animações & 3D', 
      desc: 'Framer Motion, GSAP, Three.js, WebGL',
      color: 'from-amber-500 to-orange-500'
    },
  ];

  const stats = [
    { icon: Award, value: '5+', label: 'Anos de Experiência' },
    { icon: Zap, value: '50+', label: 'Projetos Concluídos' },
    { icon: Users, value: '30+', label: 'Clientes Satisfeitos' },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-slate-950 py-32 md:py-40"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y, opacity }}
          className="absolute top-1/4 -left-48 w-96 h-96 bg-primary-500/20 rounded-full blur-[120px]"
        />
        <motion.div
          style={{ y: useTransform(y, v => -v), opacity }}
          className="absolute bottom-1/4 -right-48 w-96 h-96 bg-accent-500/20 rounded-full blur-[120px]"
        />
      </div>

      <div className="container-padding mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
            Sobre <span className="text-gradient">Mim</span>
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-primary-500 to-accent-500 mx-auto rounded-full" />
        </motion.div>

        {/* Main Content */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid gap-16 lg:grid-cols-2 lg:gap-20 items-center"
        >
          {/* Left Side - Text Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-6">
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed">
                Sou um <span className="text-primary-400 font-semibold">desenvolvedor criativo</span> apaixonado 
                por transformar ideias em experiências digitais excecionais que combinam código elegante 
                com design impactante.
              </p>

              <p className="text-lg text-slate-400 leading-relaxed">
                Especializado em <span className="text-accent-400 font-semibold">tecnologias web modernas</span>, 
                crio interfaces interativas e performáticas que não apenas funcionam perfeitamente, 
                mas também encantam os usuários em cada interação.
              </p>

              <p className="text-lg text-slate-400 leading-relaxed">
                Com foco em <span className="text-primary-400 font-semibold">performance</span>, <span className="text-accent-400 font-semibold">acessibilidade</span> e 
                <span className="text-primary-400 font-semibold"> experiência do usuário</span>, estou sempre explorando 
                novas tecnologias e tendências para entregar soluções inovadoras.
              </p>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 pt-6"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                  transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group"
                >
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 hover:border-primary-500/50 transition-all">
                    <stat.icon className="w-6 h-6 mx-auto mb-3 text-primary-400" />
                    <p className="text-gradient text-3xl font-bold mb-2">{stat.value}</p>
                    <p className="text-xs text-slate-400 leading-tight">{stat.label}</p>
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-primary-500/20 blur-xl -z-10"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Side - Skills Cards */}
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                variants={itemVariants}
                whileHover={{ scale: 1.02, x: 10 }}
                className="group relative"
              >
                <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/20 transition-all">
                  <div className="flex items-start gap-6">
                    <div className={`rounded-xl bg-gradient-to-br ${skill.color} p-4 shadow-lg`}>
                      <skill.icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">
                        {skill.title}
                      </h3>
                      <p className="text-slate-400 leading-relaxed">{skill.desc}</p>
                    </div>
                  </div>

                  {/* Animated Progress Bar */}
                  <div className="mt-6 h-2 overflow-hidden rounded-full bg-slate-800/50">
                    <motion.div
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 1.5, 
                        delay: index * 0.2,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                    />
                  </div>
                </div>

                {/* Glow Effect on Hover */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${skill.color} opacity-0 blur-xl -z-10 group-hover:opacity-30 transition-opacity duration-500`}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
