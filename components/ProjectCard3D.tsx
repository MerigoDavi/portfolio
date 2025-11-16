'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  github: string;
  live: string;
  featured: boolean;
  span: string;
}

interface ProjectCard3DProps {
  project: Project;
  index: number;
}

export default function ProjectCard3D({ project, index }: ProjectCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Mouse position tracking for advanced effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), {
    damping: 20,
    stiffness: 200,
  });
  
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), {
    damping: 20,
    stiffness: 200,
  });
  
  // Glare effect position
  const glareX = useTransform(mouseX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(mouseY, [-0.5, 0.5], ['0%', '100%']);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    
    mouseX.set(x);
    mouseY.set(y);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className={`${project.span} relative`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: '1000px',
      }}
    >
      <motion.div
        className="group relative h-full min-h-[400px] overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800 to-slate-900"
        style={{
          rotateX: rotateX,
          rotateY: rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        {/* Glare effect */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at ${glareX.get()} ${glareY.get()}, rgba(255, 255, 255, 0.2) 0%, transparent 50%)`,
            x: glareX,
            y: glareY,
          }}
        />
        
        {/* Animated gradient background */}
        <motion.div
          className="absolute inset-0 z-0"
          animate={{
            backgroundPosition: isHovered ? ['0% 0%', '100% 100%'] : '0% 0%',
          }}
          transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse' }}
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1), rgba(168, 85, 247, 0.1), rgba(99, 102, 241, 0.1))',
            backgroundSize: '200% 200%',
          }}
        />
        
        {/* Featured badge with floating animation */}
        {project.featured && (
          <motion.div
            className="absolute right-6 top-6 z-30 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 px-4 py-2 text-sm font-bold text-white shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            style={{
              transform: 'translateZ(40px)',
            }}
          >
            ⭐ Destaque
          </motion.div>
        )}
        
        {/* Content container */}
        <div className="relative z-10 flex h-full flex-col justify-end p-8">
          {/* Title with hover effect */}
          <motion.h3
            className="mb-3 text-3xl font-bold text-white"
            style={{
              transform: 'translateZ(30px)',
            }}
            animate={{
              textShadow: isHovered
                ? '0 0 20px rgba(99, 102, 241, 0.5)'
                : '0 0 0px rgba(99, 102, 241, 0)',
            }}
          >
            {project.title}
          </motion.h3>
          
          {/* Description */}
          <motion.p
            className="mb-4 text-slate-300"
            style={{
              transform: 'translateZ(20px)',
            }}
          >
            {project.description}
          </motion.p>
          
          {/* Tags with stagger animation */}
          <motion.div
            className="mb-6 flex flex-wrap gap-2"
            style={{
              transform: 'translateZ(25px)',
            }}
          >
            {project.tags.map((tag, i) => (
              <motion.span
                key={tag}
                className="rounded-full bg-slate-700/80 px-3 py-1 text-xs font-medium text-slate-200 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 + i * 0.05 }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: 'rgba(99, 102, 241, 0.3)',
                  color: '#ffffff',
                }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>
          
          {/* Action buttons */}
          <motion.div
            className="flex gap-4"
            style={{
              transform: 'translateZ(35px)',
            }}
          >
            <motion.a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              data-cursor-text="Code"
              className="group/btn flex items-center gap-2 rounded-full bg-slate-700/50 px-6 py-3 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-slate-700 hover:shadow-lg hover:shadow-primary-500/50"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="h-4 w-4 transition-transform group-hover/btn:rotate-12" />
              <span>GitHub</span>
            </motion.a>
            
            <motion.a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              data-magnetic
              data-cursor-text="Live"
              className="group/btn flex items-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 px-6 py-3 text-sm font-medium text-white shadow-lg transition-all hover:shadow-xl hover:shadow-primary-500/50"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <ExternalLink className="h-4 w-4 transition-transform group-hover/btn:rotate-12" />
              <span>Ver Demo</span>
            </motion.a>
          </motion.div>
        </div>
        
        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-0 transition-opacity group-hover:opacity-100"
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.8), rgba(168, 85, 247, 0.8))',
            padding: '2px',
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
          animate={{
            rotate: isHovered ? 360 : 0,
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        />
        
        {/* Corner highlights */}
        <motion.div
          className="absolute left-4 top-4 h-12 w-12 rounded-full bg-gradient-to-br from-primary-500/20 to-transparent blur-xl"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-4 right-4 h-12 w-12 rounded-full bg-gradient-to-tl from-accent-500/20 to-transparent blur-xl"
          animate={{
            scale: [1.5, 1, 1.5],
            opacity: [1, 0.5, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
