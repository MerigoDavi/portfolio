'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { useRef } from 'react';

interface Project {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  github?: string;
  live?: string;
  color: string;
  stats: {
    lines: string;
    time: string;
    impact: string;
  };
}

interface ClayProjectCardProps {
  project: Project;
  index: number;
}

export default function ClayProjectCard({ project, index }: ClayProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Mouse tracking for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  });

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
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        type: 'spring',
        stiffness: 80,
        damping: 20,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{
        y: -16,
        scale: 1.02,
      }}
      className="group relative"
    >
      <motion.div
        className="relative bg-gradient-to-br from-[#FFD4B8] to-[#FFC09D] rounded-[40px] p-8 md:p-12 overflow-hidden"
        style={{
          boxShadow: '12px 12px 24px rgba(255,162,110,0.3), -8px -8px 20px rgba(255,255,255,0.8), inset 2px 2px 4px rgba(255,255,255,0.5), inset -2px -2px 4px rgba(255,162,110,0.2)',
        }}
        whileHover={{
          boxShadow: '16px 16px 32px rgba(255,162,110,0.4), -12px -12px 28px rgba(255,255,255,0.9), inset 3px 3px 6px rgba(255,255,255,0.6), inset -3px -3px 6px rgba(255,162,110,0.3)',
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
        }}
      >
        {/* Floating Clay Shape Decoration */}
        <motion.div
          className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-[#E5D4FF] to-[#D5BFFF] rounded-full opacity-40 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        {/* Project Number */}
        <motion.div
          className="absolute top-8 right-8 w-16 h-16 bg-gradient-to-br from-[#C8E6F5] to-[#A7D8EA] rounded-full flex items-center justify-center font-bold text-2xl text-[#6B5B4F]"
          style={{
            boxShadow: '6px 6px 12px rgba(126,200,227,0.3), -4px -4px 10px rgba(255,255,255,0.9)',
            transform: 'translateZ(40px)',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </motion.div>

        {/* Content */}
        <div className="relative z-10 space-y-6">
          {/* Title Section */}
          <div className="space-y-2">
            <motion.h3
              className="text-3xl md:text-4xl font-bold text-[#6B5B4F] leading-tight"
              style={{ transform: 'translateZ(20px)' }}
            >
              {project.title}
            </motion.h3>
            <motion.p
              className="text-lg text-[#8B7B6F] font-semibold"
              style={{ transform: 'translateZ(15px)' }}
            >
              {project.subtitle}
            </motion.p>
          </div>

          {/* Description */}
          <motion.p
            className="text-base md:text-lg text-[#8B7B6F] leading-relaxed max-w-3xl"
            style={{ transform: 'translateZ(10px)' }}
          >
            {project.description}
          </motion.p>

          {/* Tags */}
          <motion.div
            className="flex flex-wrap gap-3"
            style={{ transform: 'translateZ(12px)' }}
          >
            {project.tags.map((tag, i) => (
              <motion.span
                key={i}
                className="bg-gradient-to-br from-[#FFF8E7] to-[#FFF1D0] rounded-[20px] px-4 py-2 text-sm font-semibold text-[#6B5B4F]"
                style={{
                  boxShadow: '4px 4px 8px rgba(255,233,184,0.3), -3px -3px 6px rgba(255,255,255,0.9), inset 1px 1px 2px rgba(255,255,255,0.6)',
                }}
                whileHover={{
                  y: -3,
                  scale: 1.05,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 17,
                }}
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-4 pt-6 border-t-2 border-[#FFAC82]/30"
            style={{ transform: 'translateZ(8px)' }}
          >
            {Object.entries(project.stats).map(([key, value]) => (
              <div key={key} className="text-center">
                <div className="text-2xl font-bold text-[#6B5B4F]">{value}</div>
                <div className="text-sm text-[#A89B8F] uppercase tracking-wider mt-1">
                  {key}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex gap-4 pt-4"
            style={{ transform: 'translateZ(16px)' }}
          >
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-[#E5D4FF] to-[#D5BFFF] rounded-[24px] font-bold text-[#6B5B4F]"
                style={{
                  boxShadow: '6px 6px 12px rgba(197,170,255,0.3), -4px -4px 10px rgba(255,255,255,0.9)',
                }}
                whileHover={{
                  y: -4,
                  boxShadow: '8px 8px 16px rgba(197,170,255,0.4), -6px -6px 14px rgba(255,255,255,1)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <FaGithub className="w-5 h-5" />
                <span>Code</span>
              </motion.a>
            )}
            {project.live && (
              <motion.a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-[#B3F5CC] to-[#8DE9B3] rounded-[24px] font-bold text-[#6B5B4F]"
                style={{
                  boxShadow: '6px 6px 12px rgba(102,221,154,0.3), -4px -4px 10px rgba(255,255,255,0.9)',
                }}
                whileHover={{
                  y: -4,
                  boxShadow: '8px 8px 16px rgba(102,221,154,0.4), -6px -6px 14px rgba(255,255,255,1)',
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 17 }}
              >
                <ExternalLink className="w-5 h-5" />
                <span>Live Demo</span>
              </motion.a>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
