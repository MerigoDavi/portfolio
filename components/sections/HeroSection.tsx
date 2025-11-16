'use client';

import { useRef, Suspense } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';
import dynamic from 'next/dynamic';
import AnimatedText from '@/components/AnimatedText';

const HeroBackground3D = dynamic(() => import('@/components/HeroBackground3D'), {
  ssr: false,
  loading: () => null,
});

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  } as const;

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
    >
      {/* 3D WebGL Background */}
      <Suspense fallback={null}>
        <HeroBackground3D />
      </Suspense>
      
      {/* Background gradient overlay */}
      <div className="absolute inset-0 overflow-hidden bg-gradient-to-b from-transparent via-slate-950/50 to-slate-950/80">
        <motion.div
          className="absolute -left-1/4 -top-1/4 h-96 w-96 rounded-full bg-primary-500/20 blur-[120px]"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute -bottom-1/4 -right-1/4 h-96 w-96 rounded-full bg-accent-500/20 blur-[120px]"
          animate={{
            scale: [1.3, 1, 1.3],
            opacity: [0.4, 0.2, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1.5,
          }}
        />
      </div>

      {/* Conteúdo principal */}
      <motion.div
        className="container-padding relative z-10 mx-auto max-w-6xl text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Título principal */}
        <AnimatedText
          text="Desenvolvedor Criativo"
          className="mb-6 text-5xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-primary-300 via-accent-400 to-primary-300 md:text-7xl lg:text-8xl"
          animationType="blur"
          delay={0.3}
          staggerDelay={0.04}
        />

        {/* Subtítulo */}
        <motion.p
          variants={itemVariants}
          className="mb-8 text-xl text-slate-300 md:text-2xl"
        >
          Estudante de Engenharia da Computação criando experiências web inovadoras
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.a
            href="#projects"
            data-magnetic
            data-cursor-text="View"
            className="group relative overflow-hidden rounded-full bg-gradient-to-r from-primary-500 to-accent-500 px-8 py-4 font-semibold text-white shadow-lg shadow-primary-500/50 transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(99,102,241,0.8)]"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10">Ver Projetos</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent-500 to-primary-500"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>

          <motion.a
            href="#contact"
            data-magnetic
            data-cursor-text="Contact"
            className="rounded-full border-2 border-primary-500 bg-primary-500/10 px-8 py-4 font-semibold text-primary-300 backdrop-blur-sm transition-all hover:bg-primary-500/20 hover:text-primary-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Entrar em Contato
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div
          variants={itemVariants}
          className="flex items-center justify-center gap-6"
        >
          {[
            { icon: Github, href: 'https://github.com/MerigoDavi', label: 'GitHub' },
            { icon: Linkedin, href: 'https://www.linkedin.com/in/DaviOliveiraFerreira', label: 'LinkedIn' },
            { icon: Mail, href: 'mailto:davi.ferreira@sou.inteli.edu.br', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="group relative p-3 text-slate-400 transition-colors hover:text-primary-400"
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className="h-6 w-6" />
              <motion.div
                className="absolute inset-0 -z-10 rounded-full bg-primary-500/20 blur-xl"
                initial={{ opacity: 0, scale: 0 }}
                whileHover={{ opacity: 1, scale: 1.5 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="h-6 w-6 text-slate-400" />
          </motion.div>
          <p className="mt-2 text-xs text-slate-500">Scroll para explorar</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
