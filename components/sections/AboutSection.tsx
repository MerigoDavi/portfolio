'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { Code, Palette, Sparkles } from 'lucide-react';

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.about-stat', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top center',
          end: 'bottom center',
          toggleActions: 'play none none reverse',
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  } as const;

  const skills = [
    { icon: Code, title: 'Desenvolvimento', desc: 'React, Next.js, TypeScript' },
    { icon: Palette, title: 'Design', desc: 'UI/UX, Figma, Tailwind CSS' },
    { icon: Sparkles, title: 'Animações', desc: 'Framer Motion, GSAP, Three.js' },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-slate-950 py-24 md:py-32"
    >
      <div className="container-padding mx-auto max-w-6xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          transition={{ duration: 0.6 }}
          className="grid gap-12 lg:grid-cols-2 lg:gap-16"
        >
          {/* Lado esquerdo - Texto */}
          <div className="space-y-6">
            <motion.div variants={itemVariants}>
              <h2 className="mb-4 text-4xl font-bold text-white md:text-5xl">
                Sobre <span className="text-gradient">Mim</span>
              </h2>
              <div className="h-1 w-20 bg-gradient-to-r from-primary-500 to-accent-500" />
            </motion.div>

            <motion.p variants={itemVariants} className="text-lg text-slate-300">
              Sou um desenvolvedor apaixonado por criar experiências digitais
              únicas que combinam código limpo com design excepcional. Com foco
              em performance e acessibilidade, transformo ideias em realidade.
            </motion.p>

            <motion.p variants={itemVariants} className="text-lg text-slate-300">
              Especializado em tecnologias modernas como React, Next.js e
              TypeScript, sempre busco estar à frente das tendências e criar
              interfaces que não apenas funcionam perfeitamente, mas também
              encantam os usuários.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 pt-8"
            >
              {[
                { value: '5+', label: 'Anos' },
                { value: '50+', label: 'Projetos' },
                { value: '30+', label: 'Clientes' },
              ].map((stat, index) => (
                <div
                  key={stat.label}
                  className="about-stat glass rounded-2xl p-4 text-center"
                >
                  <p className="text-gradient text-3xl font-bold">{stat.value}</p>
                  <p className="mt-1 text-sm text-slate-400">{stat.label}</p>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Lado direito - Skills cards */}
          <div className="space-y-4">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.title}
                variants={itemVariants}
                className="group glass rounded-2xl p-6 transition-all hover:bg-white/20"
                whileHover={{ scale: 1.02, x: 10 }}
              >
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 p-3">
                    <skill.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-xl font-semibold text-white">
                      {skill.title}
                    </h3>
                    <p className="text-slate-400">{skill.desc}</p>
                  </div>
                </div>

                {/* Barra de progresso decorativa */}
                <motion.div
                  className="mt-4 h-1 overflow-hidden rounded-full bg-slate-800"
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                >
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
                    initial={{ x: '-100%' }}
                    whileInView={{ x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: index * 0.2 }}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Background decorativo */}
      <div className="absolute right-0 top-1/2 -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-accent-500/10 blur-[120px]" />
    </section>
  );
}
