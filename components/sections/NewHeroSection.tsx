'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame, type Variants } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HiMail } from 'react-icons/hi';
import dynamic from 'next/dynamic';

const HeroCanvas = dynamic(() => import('@/components/canvas/HeroCanvas'), {
  ssr: false,
  loading: () => null,
});

export default function NewHeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const ySpring = useSpring(y, springConfig);
  const scaleSpring = useSpring(scale, springConfig);

  // Mouse Movement Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const mouseXSpring = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
      setMousePosition({ x, y });
      mouseX.set(x * 20);
      mouseY.set(y * 20);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Animated gradient rotation
  const [gradientRotation, setGradientRotation] = useState(0);
  
  useAnimationFrame((time) => {
    setGradientRotation(time / 50);
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 40,
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 1,
        ease: [0.22, 1, 0.36, 1] as any,
      }
    },
  };

  const socialLinks = [
    { 
      Icon: FaGithub, 
      href: 'https://github.com', 
      label: 'GitHub',
      color: 'hover:text-purple-400',
    },
    { 
      Icon: FaLinkedin, 
      href: 'https://linkedin.com', 
      label: 'LinkedIn',
      color: 'hover:text-blue-400',
    },
    { 
      Icon: HiMail, 
      href: 'mailto:contact@example.com', 
      label: 'Email',
      color: 'hover:text-accent-400',
    },
  ];

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-mesh-dark"
    >
      {/* Advanced 3D WebGL Canvas Background */}
      <div className="absolute inset-0 z-0">
        <HeroCanvas />
      </div>

      {/* Animated Mesh Gradient Background */}
      <motion.div 
        className="absolute inset-0 opacity-40"
        style={{ 
          scale: scaleSpring,
          background: `radial-gradient(circle at ${50 + mousePosition.x * 20}% ${50 + mousePosition.y * 20}%, rgba(99, 102, 241, 0.15) 0%, transparent 50%),
                       radial-gradient(circle at ${50 - mousePosition.x * 15}% ${50 - mousePosition.y * 15}%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)`
        }}
      />

      {/* Grid Pattern with Perspective */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-30"
          style={{ 
            transform: `perspective(1000px) rotateX(60deg) translateZ(-100px) translateY(-50%)` 
          }}
        />
      </div>

      {/* Floating Gradient Orbs - Enhanced */}
      <motion.div 
        className="absolute top-1/4 -left-48 w-[600px] h-[600px] bg-primary-500/20 rounded-full blur-[150px]"
        animate={{
          x: [0, 30, 0],
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
        className="absolute bottom-1/4 -right-48 w-[600px] h-[600px] bg-accent-500/20 rounded-full blur-[150px]"
        animate={{
          x: [0, -30, 0],
          y: [0, 30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Main Content */}
      <motion.div
        style={{ 
          y: ySpring, 
          opacity,
          x: mouseXSpring,
        }}
        className="relative z-10 container-padding mx-auto max-w-7xl"
      >
        <motion.div 
          className="flex flex-col items-center text-center gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Premium Badge */}
          <motion.div variants={itemVariants}>
            <motion.div
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full glass-strong backdrop-blur-2xl text-sm text-neutral-200 shadow-2xl border-gradient relative overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-primary-500/20 via-accent-500/20 to-primary-500/20"
                animate={{ x: isHovered ? ['-100%', '100%'] : 0 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                <Sparkles className="w-4 h-4 text-primary-400" />
              </motion.div>
              <span className="relative font-semibold tracking-wide">
                Available for Projects
              </span>
              <motion.div
                className="absolute inset-0 rounded-full glow-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
            </motion.div>
          </motion.div>

          {/* Main Heading - Award-Winning Typography */}
          <div className="space-y-6">
            <motion.h1
              variants={itemVariants}
              className="relative"
            >
              <span className="block text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter leading-[0.9] mb-4">
                <motion.span 
                  className="block text-white"
                  style={{ 
                    textShadow: '0 0 80px rgba(99, 102, 241, 0.3)',
                  }}
                >
                  Crafting Digital
                </motion.span>
                <motion.span 
                  className="block text-gradient-animated bg-clip-text text-transparent"
                  style={{
                    backgroundImage: `linear-gradient(${gradientRotation}deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)`,
                    backgroundSize: '200% 200%',
                  }}
                >
                  Experiences
                </motion.span>
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg md:text-2xl lg:text-3xl text-neutral-400 max-w-3xl mx-auto leading-relaxed font-light"
            >
              Transforming <span className="text-primary-300 font-semibold">complex ideas</span> into{' '}
              <span className="text-accent-300 font-semibold">memorable digital experiences</span> through code, creativity, and craftsmanship
            </motion.p>
          </div>

          {/* CTA Buttons - Premium Design */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-6 mt-6"
          >
            <motion.a
              href="#projects"
              className="group relative px-10 py-5 rounded-full bg-gradient-to-r from-primary-500 via-accent-500 to-primary-600 text-white font-bold text-lg shadow-2xl overflow-hidden"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10 flex items-center gap-3">
                View Projects
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ArrowDown className="w-5 h-5" />
                </motion.div>
              </span>
              
              {/* Animated gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-accent-600 to-primary-600"
                initial={{ x: '-100%' }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
              
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full blur-2xl bg-primary-500/50 -z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                whileHover={{ opacity: 1, scale: 1.2 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>

            <motion.a
              href="#contact"
              className="group relative px-10 py-5 rounded-full border-2 border-white/10 glass backdrop-blur-xl text-white font-bold text-lg hover-lift"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="relative z-10">Get In Touch</span>
              
              {/* Hover border animation */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary-500/50 opacity-0 group-hover:opacity-100"
                initial={{ scale: 0.9 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </motion.div>

          {/* Social Links - Refined Design */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-6 mt-8"
          >
            {socialLinks.map(({ Icon, href, label, color }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`group relative p-4 rounded-full glass border border-white/10 text-neutral-400 transition-all hover-lift ${color}`}
                whileHover={{ y: -8, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon className="w-6 h-6 relative z-10" />
                
                {/* Glow on hover */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500/30 to-accent-500/30 blur-xl -z-10"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileHover={{ opacity: 1, scale: 1.5 }}
                  transition={{ duration: 0.4 }}
                />
              </motion.a>
            ))}
          </motion.div>

          {/* Scroll Indicator - Premium Design */}
          <motion.div
            variants={itemVariants}
            className="absolute bottom-16 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="flex flex-col items-center gap-3"
            >
              <div className="relative w-8 h-14 rounded-full border-2 border-white/20 flex items-start justify-center p-2 glass">
                <motion.div
                  animate={{ 
                    y: [0, 18, 0],
                    opacity: [0.3, 1, 0.3]
                  }}
                  transition={{ 
                    duration: 2.5, 
                    repeat: Infinity, 
                    ease: 'easeInOut'
                  }}
                  className="w-2 h-2 rounded-full bg-gradient-to-b from-primary-400 to-accent-400"
                />
              </div>
              <span className="text-xs text-neutral-500 uppercase tracking-[0.2em] font-semibold">
                Explore
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating Particles - Award-Winning Detail */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-r from-primary-400 to-accent-400 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 bg-noise opacity-40 mix-blend-overlay pointer-events-none" />
    </section>
  );
}
