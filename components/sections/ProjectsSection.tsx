'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useFadeInScroll, useStaggerScroll } from '@/lib/hooks/useScrollAnimations';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ProjectsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useFadeInScroll('up', 80) as React.RefObject<HTMLDivElement>;
  const projectsRef = useStaggerScroll('.project-card', 0.15) as React.RefObject<HTMLDivElement>;

  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      subtitle: 'Full-Stack Application',
      description: 'Complete e-commerce platform with Next.js 14, Stripe payments, real-time inventory management, and advanced analytics dashboard. Features include AI-powered product recommendations and seamless checkout experience.',
      tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Prisma', 'TailwindCSS'],
      image: null,
      github: 'https://github.com',
      live: 'https://example.com',
      featured: true,
      color: 'from-blue-500 via-cyan-500 to-teal-500',
      stats: {
        lines: '50K+',
        time: '4 months',
        impact: '10K users',
      },
    },
    {
      id: 2,
      title: 'AI Chat Application',
      subtitle: 'Real-Time Communication',
      description: 'Modern chat interface powered by OpenAI GPT-4, featuring real-time message streaming, code syntax highlighting, conversation memory, and multi-modal support for images and documents.',
      tags: ['React', 'OpenAI', 'WebSocket', 'Node.js', 'Redis', 'MongoDB'],
      image: null,
      github: 'https://github.com',
      live: 'https://example.com',
      featured: false,
      color: 'from-purple-500 via-pink-500 to-rose-500',
      stats: {
        lines: '30K+',
        time: '3 months',
        impact: '5K users',
      },
    },
    {
      id: 3,
      title: '3D Portfolio Experience',
      subtitle: 'WebGL & Creative Coding',
      description: 'Immersive 3D portfolio built with Three.js and React Three Fiber. Features custom shaders, physics-based animations, interactive 3D models, and optimized performance for all devices.',
      tags: ['Three.js', 'R3F', 'GLSL', 'GSAP', 'WebGL', 'Blender'],
      image: null,
      github: 'https://github.com',
      live: 'https://example.com',
      featured: false,
      color: 'from-amber-500 via-orange-500 to-red-500',
      stats: {
        lines: '25K+',
        time: '2 months',
        impact: 'Award',
      },
    },
    {
      id: 4,
      title: 'Analytics Dashboard',
      subtitle: 'Data Visualization Platform',
      description: 'Real-time analytics platform with interactive charts, custom data pipelines, automated reporting, and predictive analytics. Handles millions of data points with sub-second query times.',
      tags: ['Next.js', 'D3.js', 'PostgreSQL', 'Redis', 'WebSocket', 'Python'],
      image: null,
      github: 'https://github.com',
      live: 'https://example.com',
      featured: false,
      color: 'from-green-500 via-emerald-500 to-teal-500',
      stats: {
        lines: '40K+',
        time: '5 months',
        impact: '100K+ queries/day',
      },
    },
  ];

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Parallax background elements
      gsap.to('.project-bg-orb', {
        y: (i, target) => -100 * (i + 1),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      // Project cards entrance with custom timing
      const cards = section.querySelectorAll('.project-card');
      cards.forEach((card, index) => {
        gsap.from(card, {
          y: 100,
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            once: true,
          },
        });

        // Hover effect enhancement
        const handleMouseMove = (e: Event) => {
          const mouseEvent = e as unknown as MouseEvent;
          const rect = card.getBoundingClientRect();
          const x = mouseEvent.clientX - rect.left;
          const y = mouseEvent.clientY - rect.top;
          
          gsap.to(card.querySelector('.project-glow'), {
            x: x,
            y: y,
            duration: 0.3,
            ease: 'power2.out',
          });
        };

        card.addEventListener('mousemove', handleMouseMove as EventListener);
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
        <div className="project-bg-orb absolute top-1/4 -left-48 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-[150px]" />
        <div className="project-bg-orb absolute bottom-1/4 -right-48 w-[600px] h-[600px] bg-accent-500/10 rounded-full blur-[150px]" />
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
              Featured Work
            </span>
          </motion.div>
          
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Selected <span className="text-gradient">Projects</span>
          </h2>
          
          <p className="text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
            A curated collection of projects showcasing technical excellence,
            creative problem-solving, and attention to detail
          </p>
        </div>

        {/* Projects Grid */}
        <div ref={projectsRef} className="space-y-8">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              className={`project-card group relative ${
                project.featured ? 'md:col-span-2' : ''
              }`}
              data-magnetic
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Card Container */}
              <div className="relative h-full rounded-3xl glass-strong backdrop-blur-2xl border border-white/10 hover:border-white/20 overflow-hidden transition-all duration-500">
                {/* Gradient Glow Effect on Hover */}
                <div className="project-glow absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className={`absolute -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r ${project.color} blur-3xl opacity-30`} />
                </div>

                <div className={`grid ${project.featured ? 'md:grid-cols-2' : 'grid-cols-1'} gap-8 p-8 md:p-10`}>
                  {/* Project Visual */}
                  <div className="relative aspect-video md:aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-800/50 backdrop-blur-sm">
                    {/* Placeholder gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-40 group-hover:opacity-60 transition-opacity duration-500`} />
                    
                    {/* Grid pattern overlay */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30" />
                    
                    {/* Project mockup placeholder */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        className="text-white/20 text-6xl font-bold"
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      >
                        {project.id.toString().padStart(2, '0')}
                      </motion.div>
                    </div>

                    {/* Action buttons overlay */}
                    <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-neutral-950/50 backdrop-blur-sm">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-full glass-strong hover:scale-110 transition-transform"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="View on GitHub"
                      >
                        <FaGithub className="w-6 h-6 text-white" />
                      </motion.a>
                      
                      <motion.a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-4 rounded-full glass-strong hover:scale-110 transition-transform"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="View Live Site"
                      >
                        <ExternalLink className="w-6 h-6 text-white" />
                      </motion.a>
                    </div>

                    {/* Featured badge */}
                    {project.featured && (
                      <div className="absolute top-4 right-4 px-4 py-2 rounded-full glass-strong border border-accent-500/30 text-xs font-bold text-accent-300 uppercase tracking-wider">
                        Featured
                      </div>
                    )}
                  </div>

                  {/* Project Content */}
                  <div className="flex flex-col justify-between">
                    <div>
                      {/* Category */}
                      <p className="text-sm text-primary-400 font-semibold mb-2 uppercase tracking-wider">
                        {project.subtitle}
                      </p>

                      {/* Title */}
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 group-hover:text-gradient transition-all">
                        {project.title}
                        <ArrowUpRight className="inline-block w-6 h-6 ml-2 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </h3>

                      {/* Description */}
                      <p className="text-neutral-400 leading-relaxed mb-6 text-lg">
                        {project.description}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1.5 text-xs font-medium rounded-full glass border border-white/10 text-neutral-300 hover:border-primary-500/50 hover:text-primary-300 transition-all cursor-default"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Project Stats */}
                    <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
                      <div>
                        <p className="text-2xl font-bold text-gradient">{project.stats.lines}</p>
                        <p className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Lines of Code</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gradient">{project.stats.time}</p>
                        <p className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Development</p>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gradient">{project.stats.impact}</p>
                        <p className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Impact</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom border glow effect */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              </div>
            </motion.article>
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
            <span>View All Projects</span>
            <ExternalLink className="w-5 h-5 group-hover:rotate-45 transition-transform" />
          </motion.a>
        </motion.div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10 pointer-events-none" />
    </section>
  );
}
