'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import Image from 'next/image';

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Plataforma completa de e-commerce com Next.js, Stripe e dashboard admin',
      tags: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind'],
      image: '/projects/project1.jpg',
      github: 'https://github.com',
      live: 'https://example.com',
      featured: true,
      span: 'lg:col-span-2 lg:row-span-2',
    },
    {
      id: 2,
      title: 'AI Chat Application',
      description: 'Interface de chat com IA usando OpenAI API',
      tags: ['React', 'OpenAI', 'WebSocket'],
      image: '/projects/project2.jpg',
      github: 'https://github.com',
      live: 'https://example.com',
      featured: false,
      span: 'lg:col-span-1 lg:row-span-1',
    },
    {
      id: 3,
      title: 'Portfolio 3D',
      description: 'Portfolio interativo com Three.js e animações WebGL',
      tags: ['Three.js', 'React Three Fiber', 'GSAP'],
      image: '/projects/project3.jpg',
      github: 'https://github.com',
      live: 'https://example.com',
      featured: false,
      span: 'lg:col-span-1 lg:row-span-1',
    },
    {
      id: 4,
      title: 'Dashboard Analytics',
      description: 'Dashboard de analytics em tempo real com gráficos interativos',
      tags: ['Next.js', 'Chart.js', 'PostgreSQL'],
      image: '/projects/project4.jpg',
      github: 'https://github.com',
      live: 'https://example.com',
      featured: false,
      span: 'lg:col-span-2 lg:row-span-1',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  } as const;

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative overflow-hidden bg-slate-900 py-24 md:py-32"
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
            Projetos em <span className="text-gradient">Destaque</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Seleção de trabalhos que demonstram minhas habilidades em
            desenvolvimento e design
          </p>
        </motion.div>

        {/* Bento Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid gap-6 lg:grid-cols-3 lg:grid-rows-3"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className={`group relative overflow-hidden rounded-3xl bg-slate-800 ${project.span}`}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Background image placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 to-accent-500/20" />
              
              {/* Overlay com informações */}
              <div className="relative flex h-full min-h-[300px] flex-col justify-between p-6 lg:p-8">
                {/* Badge de featured */}
                {project.featured && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5, type: 'spring' }}
                    className="absolute right-6 top-6 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 px-4 py-1 text-sm font-semibold text-white"
                  >
                    Destaque
                  </motion.div>
                )}

                {/* Conteúdo */}
                <div className="relative z-10 mt-auto">
                  <h3 className="mb-3 text-2xl font-bold text-white lg:text-3xl">
                    {project.title}
                  </h3>
                  <p className="mb-4 text-slate-300">{project.description}</p>

                  {/* Tags */}
                  <div className="mb-6 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-slate-700/50 px-3 py-1 text-xs text-slate-300 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex gap-4">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-primary-400"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="h-4 w-4" />
                      <span>Código</span>
                    </motion.a>
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-primary-400"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <ExternalLink className="h-4 w-4" />
                      <span>Demo</span>
                    </motion.a>
                  </div>
                </div>

                {/* Hover effect overlay */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-accent-500/0 opacity-0 transition-opacity group-hover:from-primary-500/10 group-hover:to-accent-500/10 group-hover:opacity-100"
                  initial={false}
                />
              </div>

              {/* Border gradient animado */}
              <motion.div
                className="absolute inset-0 rounded-3xl opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(99, 102, 241, 0.5), rgba(168, 85, 247, 0.5))',
                  padding: '2px',
                  WebkitMask:
                    'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'xor',
                  maskComposite: 'exclude',
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* CTA para mais projetos */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <motion.a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border-2 border-primary-500 px-8 py-4 font-semibold text-primary-300 transition-all hover:bg-primary-500/10"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Ver Mais Projetos</span>
            <ExternalLink className="h-5 w-5" />
          </motion.a>
        </motion.div>
      </div>

      {/* Background decorativo */}
      <div className="absolute left-0 top-1/2 -z-10 h-96 w-96 -translate-y-1/2 rounded-full bg-primary-500/10 blur-[120px]" />
    </section>
  );
}
