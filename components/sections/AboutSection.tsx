'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Palette, Sparkles, Award, Users, Zap, Briefcase, GraduationCap, Trophy } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useFadeInScroll, useStaggerScroll } from '@/lib/hooks/useScrollAnimations';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useFadeInScroll('up', 60);
  const timelineRef = useRef<HTMLDivElement>(null);
  const [activeTimeline, setActiveTimeline] = useState(0);

  const timeline = [
    {
      year: '2023',
      icon: Palette,
      title: 'Web Designer',
      company: 'EVA Colorido',
      description: 'Responsável pela entrega de elementos visuais e gerenciamento de estoque de templates. Criei recursos para uma plataforma de streaming de conteúdo artesanal usando Figma.',
      skills: ['Figma', 'UI/UX', 'Design'],
      color: 'from-purple-500 to-pink-500',
    },
    {
      year: '2024',
      icon: GraduationCap,
      title: 'Educators Tech Track',
      company: 'Oracle Academy / Inteli',
      description: 'Participação no programa Educators Tech Track, focado em desenvolver habilidades de liderança e educação em tecnologia através de metodologias inovadoras.',
      skills: ['Educação', 'Liderança', 'Tecnologia'],
      color: 'from-green-500 to-emerald-500',
    },
    {
      year: '2024',
      icon: Code2,
      title: 'Rede Social para Voluntários',
      company: 'ONG Parceiros Voluntários / Inteli',
      description: 'Desenvolvimento de solução tecnológica inovadora utilizando metodologia PBL, focando em resolver problemas reais da indústria com abordagem colaborativa.',
      skills: ['Python', 'React', 'Problem Solving'],
      color: 'from-cyan-500 to-blue-500',
    },
    {
      year: '2024',
      icon: Briefcase,
      title: 'Estagiário de Soluções de TI',
      company: 'BTG Pactual',
      description: 'Trabalhei no departamento de Soluções de TI, dando continuidade ao desenvolvimento do servidor de autenticação do banco. Entreguei duas novas seções de configuração de segurança e módulos de verificação de identidade.',
      skills: ['Cibersegurança', 'Frontend', 'Backend'],
      color: 'from-blue-500 to-cyan-500',
    },
    {
      year: '2024',
      icon: Sparkles,
      title: 'Sistema de Previsão de Gás',
      company: 'Compass / Inteli',
      description: 'Desenvolvimento de modelo preditivo utilizando técnicas de Machine Learning e análise de dados para resolver problemas complexos de predição e otimização.',
      skills: ['Machine Learning', 'Python', 'Data Analysis'],
      color: 'from-amber-500 to-orange-500',
    },
    {
      year: '2024',
      icon: Code2,
      title: 'IoT de Monitoramento Florestal',
      company: 'Abundance / Inteli',
      description: 'Desenvolvimento de solução completa focada em criar impacto positivo através da tecnologia, utilizando stack moderna e práticas de desenvolvimento ágil.',
      skills: ['Full-Stack', 'TypeScript', 'React'],
      color: 'from-violet-500 to-purple-500',
    },
    {
      year: '2025',
      icon: Zap,
      title: 'Sistema Automatizado de Farmácos',
      company: 'HC Unicamp / Inteli',
      description: 'Criação de sistema voltado para área da saúde, integrando tecnologias modernas para melhorar processos e facilitar o acesso a serviços.',
      skills: ['Healthcare Tech', 'API Integration', 'UX Design'],
      color: 'from-rose-500 to-red-500',
    },
    {
      year: '2025',
      icon: Award,
      title: 'Análise de Patologias Estruturais com IA',
      company: 'IPT / Inteli',
      description: 'Desenvolvimento de solução tecnológica em parceria com o IPT, aplicando conhecimentos avançados de engenharia para resolver desafios técnicos complexos.',
      skills: ['Research', 'Innovation', 'Engineering'],
      color: 'from-indigo-500 to-blue-500',
    },
  ];

  const expertise = [
    { 
      icon: Code2, 
      title: 'Desenvolvimento Full-Stack', 
      desc: 'Construindo aplicações escaláveis com React, TypeScript, Python e Node.js',
      color: 'from-blue-500 to-cyan-500',
      percentage: 90,
    },
    { 
      icon: Palette, 
      title: 'UI/UX Design', 
      desc: 'Criando interfaces elegantes com Figma, sistemas de design e animações criativas',
      color: 'from-purple-500 to-pink-500',
      percentage: 88,
    },
    { 
      icon: Sparkles, 
      title: 'Machine Learning & IA', 
      desc: 'Desenvolvendo soluções com inteligência artificial, visão computacional e modelos preditivos',
      color: 'from-amber-500 to-orange-500',
      percentage: 82,
    },
  ];

  const stats = [
    { icon: Award, value: '2+', label: 'Anos de Experiência' },
    { icon: Zap, value: '5+', label: 'Projetos Entregues' },
    { icon: Users, value: '4', label: 'Prêmios Conquistados' },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    const timelineEl = timelineRef.current;
    if (!section || !timelineEl) return;

    const ctx = gsap.context(() => {
      // Timeline items scroll animation
      const items = timelineEl.querySelectorAll('.timeline-item');
      
      items.forEach((item, index) => {
        gsap.from(item, {
          x: index % 2 === 0 ? -100 : 100,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 85%',
            once: true,
            onEnter: () => setActiveTimeline(index),
          },
        });
      });

      // Timeline line animation
      const timelineLine = timelineEl.querySelector('.timeline-line');
      if (timelineLine) {
        gsap.from(timelineLine, {
          scaleY: 0,
          transformOrigin: 'top',
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timelineEl,
            start: 'top 80%',
            once: true,
          },
        });
      }

      // Parallax stats
      gsap.to('.stat-card', {
        y: (i) => -30 * (i + 1),
        ease: 'none',
        scrollTrigger: {
          trigger: '.stats-container',
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-neutral-950 section-spacing"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="absolute top-1/4 -left-48 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[150px]"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 -right-48 w-[600px] h-[600px] bg-accent-500/10 rounded-full blur-[150px]"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
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
              Sobre Mim
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Construindo Excelência <span className="text-gradient">Digital</span>
          </h2>
          
          <p className="text-xl text-neutral-400 max-w-3xl mx-auto leading-relaxed">
            Desenvolvedor criativo apaixonado por construir experiências web excepcionais 
            que combinam código elegante com visuais impressionantes
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 mb-24">
          {/* Left: Story & Stats */}
          <div className="space-y-10">
            {/* Story */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <p className="text-2xl text-neutral-300 leading-relaxed">
                Sou um <span className="text-gradient font-bold">desenvolvedor criativo</span> que 
                transforma ideias complexas em experiências digitais intuitivas.
              </p>

              <p className="text-lg text-neutral-400 leading-relaxed">
                Estudante de <span className="text-primary-400 font-semibold">Engenharia da Computação</span> no Inteli, 
                me especializo em construir aplicações web de alta performance que não apenas funcionam—elas 
                cativam e inspiram os usuários em cada interação.
              </p>

              <p className="text-lg text-neutral-400 leading-relaxed">
                Minha abordagem combina excelência técnica com resolução criativa de problemas, sempre 
                empurrando os limites do que é possível na web, mantendo 
                <span className="text-accent-400 font-semibold"> acessibilidade</span> e 
                <span className="text-primary-400 font-semibold"> performance</span> como prioridade.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="stats-container grid grid-cols-3 gap-4"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="stat-card group relative"
                  whileHover={{ scale: 1.05, y: -5 }}
                  data-magnetic
                >
                  <div className="glass-strong backdrop-blur-2xl rounded-2xl p-6 text-center border border-white/10 hover:border-primary-500/50 transition-all">
                    <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary-400" />
                    <p className="text-gradient text-4xl font-bold mb-2">{stat.value}</p>
                    <p className="text-xs text-neutral-400 uppercase tracking-wider leading-tight">
                      {stat.label}
                    </p>
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

          {/* Right: Expertise Cards */}
          <div className="space-y-6">
            {expertise.map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.15 }}
                whileHover={{ scale: 1.02, x: 10 }}
                className="group relative"
                data-magnetic
              >
                <div className="glass-strong backdrop-blur-2xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all">
                  <div className="flex items-start gap-6 mb-6">
                    <div className={`rounded-xl bg-gradient-to-br ${skill.color} p-4 shadow-lg shadow-black/50`}>
                      <skill.icon className="h-7 w-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gradient transition-all">
                        {skill.title}
                      </h3>
                      <p className="text-neutral-400 leading-relaxed">{skill.desc}</p>
                    </div>
                  </div>

                  {/* Skill Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-500">Proficiency</span>
                      <span className="text-primary-400 font-semibold">{skill.percentage}%</span>
                    </div>
                    <div className="h-2 overflow-hidden rounded-full bg-neutral-800/50">
                      <motion.div
                        className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative overflow-hidden`}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 1.5, 
                          delay: index * 0.2 + 0.5,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                      >
                        {/* Animated shimmer effect */}
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
                    </div>
                  </div>
                </div>

                {/* Glow Effect */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${skill.color} opacity-0 blur-xl -z-10 group-hover:opacity-30 transition-opacity duration-500`}
                />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Interactive Timeline */}
        <div ref={timelineRef} className="relative">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Jornada <span className="text-gradient">Profissional</span>
            </h3>
            <p className="text-neutral-400 text-lg">Principais marcos da minha carreira</p>
          </motion.div>

          {/* Timeline Line */}
          <div className="absolute left-1/2 top-16 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-accent-500 to-primary-500 timeline-line hidden md:block" />

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-24">
            {timeline.map((item, index) => (
              <motion.div
                key={item.year}
                className={`timeline-item relative ${
                  index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
                }`}
              >
                <div className={`flex ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8`}>
                  {/* Timeline dot */}
                  <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-20 h-20">
                    <motion.div
                      className={`w-full h-full rounded-full glass-strong border-4 ${
                        activeTimeline === index ? 'border-primary-500' : 'border-white/20'
                      } flex items-center justify-center backdrop-blur-xl`}
                      animate={{
                        scale: activeTimeline === index ? [1, 1.2, 1] : 1,
                        borderColor: activeTimeline === index ? '#6366f1' : 'rgba(255,255,255,0.2)',
                      }}
                      transition={{
                        duration: 0.5,
                      }}
                    >
                      <item.icon className="w-8 h-8 text-primary-400" />
                    </motion.div>
                  </div>

                  {/* Content Card */}
                  <motion.div
                    className="flex-1 max-w-lg group"
                    whileHover={{ scale: 1.02 }}
                    data-magnetic
                  >
                    <div className="glass-strong backdrop-blur-2xl rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all relative overflow-hidden">
                      {/* Year Badge */}
                      <div className={`absolute top-4 ${index % 2 === 0 ? 'left-4' : 'right-4'}`}>
                        <span className={`px-4 py-2 rounded-full bg-gradient-to-r ${item.color} text-white text-sm font-bold shadow-lg`}>
                          {item.year}
                        </span>
                      </div>

                      {/* Mobile icon */}
                      <div className="md:hidden mb-4 pt-16">
                        <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${item.color}`}>
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                      </div>

                      <div className="pt-16 md:pt-0">
                        <h4 className="text-2xl font-bold text-white mb-2 group-hover:text-gradient transition-all">
                          {item.title}
                        </h4>
                        <p className="text-primary-400 font-semibold mb-4">{item.company}</p>
                        <p className="text-neutral-400 leading-relaxed mb-6">
                          {item.description}
                        </p>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-2">
                          {item.skills.map((skill) => (
                            <span
                              key={skill}
                              className="px-3 py-1 text-xs font-medium rounded-full glass border border-white/10 text-neutral-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Gradient overlay */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500 pointer-events-none`} />
                    </div>

                    {/* Glow effect */}
                    <motion.div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${item.color} opacity-0 blur-xl -z-10 group-hover:opacity-20 transition-opacity duration-500`}
                    />
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10 pointer-events-none" />
    </section>
  );
}
