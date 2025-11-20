'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

interface ProjectCardTiltProps {
  project: {
    id: number;
    title: string;
    subtitle: string;
    description: string;
    tags: string[];
    github: string;
    live: string;
    featured: boolean;
    color: string;
    stats: {
      lines: string;
      time: string;
      impact: string;
    };
  };
  index: number;
}

export default function ProjectCardTilt({ project, index }: ProjectCardTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse tracking for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for smooth movement
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 20,
  });
  
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  });

  // Glow position tracking
  const glowX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glowY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left - width / 2) / width;
    const y = (e.clientY - rect.top - height / 2) / height;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.article
      ref={cardRef}
      className="project-card group relative"
      data-magnetic
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        perspective: '1500px',
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative h-full min-h-[500px] rounded-3xl glass-strong backdrop-blur-2xl border border-white/10 overflow-hidden transition-all duration-500 shadow-2xl"
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{
          scale: 1.02,
          borderColor: 'rgba(255, 255, 255, 0.2)',
          boxShadow: '0 25px 50px -12px rgba(99, 102, 241, 0.25)',
        }}
        transition={{ duration: 0.3 }}
      >
        {/* Dynamic gradient glow following mouse */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
          }}
        >
          <motion.div
            className={`absolute w-96 h-96 bg-gradient-to-r ${project.color} blur-[100px] opacity-50 -translate-x-1/2 -translate-y-1/2`}
            style={{
              left: glowX,
              top: glowY,
            }}
          />
        </motion.div>

        {/* Holographic shine effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at ${glowX.get()} ${glowY.get()}, rgba(255, 255, 255, 0.15) 0%, transparent 50%)`,
            opacity: isHovered ? 1 : 0,
          }}
        />

        <div className={`grid ${project.featured ? 'md:grid-cols-5' : 'md:grid-cols-3'} gap-0 h-full`}>
          {/* Project Visual with 3D depth */}
          <motion.div
            className={`relative ${project.featured ? 'md:col-span-2' : 'md:col-span-1'} overflow-hidden bg-neutral-800/30`}
            style={{
              transform: 'translateZ(40px)',
            }}
          >
            {/* Animated background gradient */}
            <motion.div
              className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-30`}
              animate={{
                opacity: [0.3, 0.5, 0.3],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            {/* Grid pattern overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20" />

            {/* Project number with parallax */}
            <div className="absolute inset-0 flex items-center justify-center p-12">
              <motion.div
                className="text-white/10 text-8xl md:text-9xl font-bold"
                style={{
                  transform: useTransform(
                    [mouseX, mouseY],
                    ([x, y]: any[]) => `translate(${x * 20}px, ${y * 20}px) translateZ(20px)`
                  ),
                }}
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 2, 0],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                {project.id.toString().padStart(2, '0')}
              </motion.div>
            </div>

            {/* Action buttons */}
            <motion.div
              className="absolute bottom-6 left-6 right-6 flex items-center justify-center gap-4 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300"
              style={{
                transform: 'translateZ(60px)',
              }}
            >
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none px-6 py-3 rounded-full glass-strong border border-white/10 hover:border-primary-500/50 backdrop-blur-xl transition-all text-white text-sm font-medium flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="View on GitHub"
              >
                <FaGithub className="w-5 h-5" />
                <span className="hidden sm:inline">GitHub</span>
              </motion.a>

              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 md:flex-none px-6 py-3 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 hover:shadow-lg hover:shadow-primary-500/50 transition-all text-white text-sm font-medium flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                aria-label="View Live Site"
              >
                <ExternalLink className="w-5 h-5" />
                <span className="hidden sm:inline">Demo</span>
              </motion.a>
            </motion.div>

            {/* Featured badge */}
            {project.featured && (
              <motion.div
                className="absolute top-6 right-6 px-4 py-2 rounded-full glass-strong border border-accent-500/30 text-xs font-bold text-accent-300 uppercase tracking-wider shadow-lg"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  delay: index * 0.15 + 0.5,
                  type: "spring",
                  stiffness: 200,
                }}
                style={{
                  transform: 'translateZ(80px)',
                }}
              >
                ⭐ Destaque
              </motion.div>
            )}

            {/* Shine effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
              animate={{
                translateX: isHovered ? '200%' : '-100%',
              }}
              transition={{ duration: 1 }}
            />
          </motion.div>

          {/* Project Content with subtle parallax */}
          <motion.div
            className={`flex flex-col justify-between p-8 md:p-10 ${project.featured ? 'md:col-span-3' : 'md:col-span-2'}`}
            style={{
              transform: 'translateZ(20px)',
            }}
          >
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
                {project.tags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    className="px-3 py-1.5 text-xs font-medium rounded-full glass border border-white/10 text-neutral-300 hover:border-primary-500/50 hover:text-primary-300 transition-all cursor-default"
                    whileHover={{ scale: 1.1, y: -2 }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.15 + i * 0.05 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Project Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-white/10">
              <div>
                <p className="text-2xl font-bold text-gradient">{project.stats.lines}</p>
                <p className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Linhas de Código</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gradient">{project.stats.time}</p>
                <p className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Desenvolvimento</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-gradient">{project.stats.impact}</p>
                <p className="text-xs text-neutral-500 uppercase tracking-wider mt-1">Impacto</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom border glow */}
        <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      </motion.div>
    </motion.article>
  );
}
