'use client';

import { motion } from 'framer-motion';
import ClayProjectCard from '@/components/ClayProjectCard';
import ClayButton from '@/components/ClayButton';
import { Sparkles } from 'lucide-react';

export default function ClayProjectsSection() {
  const projects = [
    {
      id: 1,
      title: 'Sistema de Análise de Patologias com IA',
      subtitle: 'Instituto de Pesquisas Tecnológicas (IPT)',
      description: 'Desenvolvimento de aplicação desktop para automatizar identificação e classificação de fissuras em edificações usando IA. Construído em Rust e Python para alto desempenho offline, com sistema de geração automática de relatórios e galeria visual.',
      tags: ['Rust', 'Python', 'IA', 'Visão Computacional', 'Desktop'],
      github: 'https://github.com/MerigoDavi',
      live: 'https://github.com/MerigoDavi',
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
      github: 'https://github.com/MerigoDavi',
      live: 'https://github.com/MerigoDavi',
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
      github: 'https://github.com/MerigoDavi',
      live: 'https://github.com/MerigoDavi',
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
      github: 'https://github.com/MerigoDavi',
      live: 'https://github.com/MerigoDavi',
      color: 'from-green-500 via-emerald-500 to-teal-500',
      stats: {
        lines: '10K+',
        time: '2 meses',
        impact: 'Social',
      },
    },
  ];

  return (
    <section
      id="projects"
      className="relative min-h-screen py-24 md:py-32 bg-gradient-to-br from-[#FFFEF9] via-[#FFF8F3] to-[#F0F9FF] overflow-hidden"
    >
      {/* Floating Clay Shapes Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 left-[10%] w-64 h-64 bg-gradient-to-br from-[#C8E6F5] to-[#A7D8EA] rounded-[60px] opacity-30 blur-3xl"
          animate={{
            y: [0, -40, 0],
            rotate: [0, 45, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-40 right-[15%] w-96 h-96 bg-gradient-to-br from-[#E5D4FF] to-[#D5BFFF] rounded-[80px] opacity-25 blur-3xl"
          animate={{
            y: [0, 40, 0],
            rotate: [0, -45, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/2 left-[60%] w-48 h-48 bg-gradient-to-br from-[#B3F5CC] to-[#8DE9B3] rounded-[50px] opacity-20 blur-2xl"
          animate={{
            y: [0, -30, 0],
            x: [0, 30, 0],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 18,
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
          className="text-center mb-20 space-y-6"
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-br from-[#E5D4FF] to-[#D5BFFF] rounded-[28px]"
            style={{
              boxShadow: '8px 8px 16px rgba(197,170,255,0.3), -6px -6px 14px rgba(255,255,255,0.9), inset 1px 1px 2px rgba(255,255,255,0.6)',
            }}
            whileHover={{
              scale: 1.05,
              y: -4,
            }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 17,
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
              }}
            >
              <Sparkles className="w-5 h-5 text-[#6B5B4F]" />
            </motion.div>
            <span className="font-bold text-[#6B5B4F]">Featured Work</span>
          </motion.div>

          {/* Title */}
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#6B5B4F] leading-none">
            Selected
            <br />
            <span className="bg-gradient-to-r from-[#FFAC82] via-[#C5AAFF] to-[#7EC8E3] bg-clip-text text-transparent">
              Projects
            </span>
          </h2>

          {/* Description */}
          <p className="text-xl md:text-2xl text-[#8B7B6F] max-w-3xl mx-auto leading-relaxed">
            A curated collection of projects demonstrating technical excellence, creative problem-solving, and attention to tactile details
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-12 md:space-y-16">
          {projects.map((project, index) => (
            <ClayProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

        {/* View All CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            delay: 0.3,
            type: 'spring',
            stiffness: 80,
          }}
          className="flex justify-center mt-20"
        >
          <ClayButton variant="mint" size="lg" href="/projects">
            <span className="flex items-center gap-3">
              <span>View All Projects</span>
              <motion.span
                animate={{ x: [0, 5, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                →
              </motion.span>
            </span>
          </ClayButton>
        </motion.div>
      </div>

      {/* Soft Clay Pattern Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(107,91,79,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />
      </div>
    </section>
  );
}
