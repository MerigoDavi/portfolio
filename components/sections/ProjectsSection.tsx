'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useFadeInScroll } from '@/lib/hooks/useScrollAnimations';
import ProjectCardTilt from '@/components/ProjectCardTilt';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useFadeInScroll('up', 80) as React.RefObject<HTMLDivElement>;
  const projectsRef = useRef<HTMLDivElement>(null);

  const projects = [
    {
      id: 1,
      title: 'Sistema de Análise de Patologias com IA',
      subtitle: 'Instituto de Pesquisas Tecnológicas (IPT)',
      description: 'Desenvolvimento de aplicação desktop para automatizar identificação e classificação de fissuras em edificações usando IA. Construído em Rust e Python para alto desempenho offline, com sistema de geração automática de relatórios e galeria visual.',
      tags: ['Rust', 'Python', 'IA', 'Visão Computacional', 'Desktop'],
      image: null,
      github: 'https://github.com/MerigoDavi',
      live: 'https://github.com/MerigoDavi',
      featured: true,
      color: 'from-blue-500 via-cyan-500 to-teal-500',
      stats: {
        lines: '15K+',
        time: '3 meses',
        impact: 'IPT',
      },
    },
    {
      id: 2,
      title: 'Hígia: Dispensação Farmacêutica Automatizada',
      subtitle: 'Hospital das Clínicas da Unicamp',
      description: 'Desenvolvimento de braço robótico para dispensação de medicamentos. Entreguei interface do usuário e sistemas de comunicação do robô, implementando algoritmos de visão computacional para reconhecimento de medicamentos.',
      tags: ['React', 'IoT', 'Visão Computacional', 'Robótica', 'Python'],
      image: null,
      github: 'https://github.com/MerigoDavi',
      live: 'https://github.com/MerigoDavi',
      featured: true,
      color: 'from-purple-500 via-pink-500 to-rose-500',
      stats: {
        lines: '12K+',
        time: '2 meses',
        impact: 'HC Unicamp',
      },
    },
    {
      id: 3,
      title: 'GPS: Sistema de Previsão de Gás',
      subtitle: 'Startup Compass',
      description: 'Criação de modelo preditivo robusto para detecção de vazamentos de gás e identificação de fraudes usando machine learning. Implementação de técnicas de ensemble learning resultando em 82% de precisão na detecção precoce de anomalias.',
      tags: ['Python', 'Machine Learning', 'Ensemble', 'Data Science', 'Power BI'],
      image: null,
      github: 'https://github.com/MerigoDavi',
      live: 'https://github.com/MerigoDavi',
      featured: false,
      color: 'from-amber-500 via-orange-500 to-red-500',
      stats: {
        lines: '8K+',
        time: '4 meses',
        impact: '82% precisão',
      },
    },
    {
      id: 4,
      title: 'Borbulha: Rede Social de Voluntários',
      subtitle: 'ONG Parceiros Voluntários',
      description: 'Desenvolvimento de aplicação web para facilitar interação entre voluntários, ONGs e empresas. Implementação completa de guia de estilos visual e desenvolvimento frontend com React e design responsivo de alta qualidade.',
      tags: ['React', 'TypeScript', 'UI/UX', 'Figma', 'TailwindCSS'],
      image: null,
      github: 'https://github.com/MerigoDavi',
      live: 'https://github.com/MerigoDavi',
      featured: false,
      color: 'from-green-500 via-emerald-500 to-teal-500',
      stats: {
        lines: '10K+',
        time: '2 meses',
        impact: 'Social',
      },
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Parallax background elements
      gsap.to('.project-bg-orb', {
        y: (i) => -100 * (i + 1),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
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
      id="projects"
      className="relative overflow-hidden bg-neutral-900 section-spacing"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div 
          className="project-bg-orb absolute top-1/4 -left-48 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[150px]"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div 
          className="project-bg-orb absolute bottom-1/4 -right-48 w-[600px] h-[600px] bg-accent-500/10 rounded-full blur-[150px]"
          animate={{
            x: [0, -50, 0],
            y: [0, 30, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Floating Particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-primary-400/30 to-accent-400/30 rounded-full blur-[1px]"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="container-padding mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <div ref={titleRef} className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 rounded-full glass text-sm font-semibold text-primary-300 border border-primary-500/20">
              Trabalhos em Destaque
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Projetos <span className="text-gradient">Selecionados</span>
          </h2>
          
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            Uma coleção selecionada de projetos demonstrando excelência técnica,
            resolução criativa de problemas e atenção aos detalhes
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={projectsRef} className="grid grid-cols-1 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <ProjectCardTilt key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View More CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full glass-strong border-2 border-primary-500/30 hover:border-primary-500 text-white font-semibold text-lg transition-all hover-lift group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            data-magnetic
          >
            <span>Ver Todos os Projetos</span>
            <ExternalLink className="w-5 h-5 group-hover:rotate-45 transition-transform" />
          </motion.a>
        </motion.div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10 pointer-events-none" />
    </section>
  );
}
