'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      description: 'Plataforma completa de e-commerce com Next.js, processamento de pagamentos via Stripe e dashboard admin com analytics em tempo real.',
      tags: ['Next.js', 'TypeScript', 'Stripe', 'Tailwind CSS', 'PostgreSQL'],
      image: null,
      github: 'https://github.com',
      live: 'https://example.com',
      featured: true,
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 2,
      title: 'AI Chat Application',
      description: 'Interface moderna de chat com IA integrada usando OpenAI API e comunicação em tempo real via WebSocket.',
      tags: ['React', 'OpenAI', 'WebSocket', 'Node.js'],
      image: null,
      github: 'https://github.com',
      live: 'https://example.com',
      featured: false,
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 3,
      title: 'Interactive 3D Portfolio',
      description: 'Portfolio interativo com Three.js, animações WebGL e experiência 3D imersiva.',
      tags: ['Three.js', 'React Three Fiber', 'GSAP', 'WebGL'],
      image: null,
      github: 'https://github.com',
      live: 'https://example.com',
      featured: false,
      color: 'from-amber-500 to-orange-500',
    },
    {
      id: 4,
      title: 'Analytics Dashboard',
      description: 'Dashboard de analytics em tempo real com visualizações interativas de dados e gráficos dinâmicos.',
      tags: ['Next.js', 'Chart.js', 'PostgreSQL', 'Redis'],
      image: null,
      github: 'https://github.com',
      live: 'https://example.com',
      featured: false,
      color: 'from-green-500 to-emerald-500',
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

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid gap-8 md:grid-cols-2"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              className={`group relative ${project.featured ? 'md:col-span-2' : ''}`}
            >
              <div className="relative overflow-hidden rounded-3xl bg-slate-800/50 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all h-full">
                {/* Gradient Container */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent z-10" />
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-40`}
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
                  
                  {/* Overlay Links */}
                  <div className="absolute inset-0 z-20 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <motion.a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all"
                      aria-label="View on GitHub"
                    >
                      <Github className="w-6 h-6" />
                    </motion.a>
                    <motion.a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all"
                      aria-label="View Live Site"
                    >
                      <ExternalLink className="w-6 h-6" />
                    </motion.a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-gradient transition-all">
                      {project.title}
                    </h3>
                    <ArrowUpRight className="w-6 h-6 text-slate-400 group-hover:text-primary-400 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
                  </div>

                  <p className="text-slate-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-3 py-1.5 text-xs font-medium rounded-full bg-white/5 border border-white/10 text-slate-300 hover:border-primary-500/50 hover:bg-primary-500/10 transition-all"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Gradient Border Effect */}
                <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-20 blur-xl -z-10 transition-opacity duration-500`} />
              </div>
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
