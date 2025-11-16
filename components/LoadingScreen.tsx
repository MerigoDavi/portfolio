'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useStore } from '@/lib/store/useStore';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const isLoading = useStore((state) => state.isLoading);
  const setLoading = useStore((state) => state.setLoading);
  const setLoadingProgress = useStore((state) => state.setLoadingProgress);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);
  const overlayTopRef = useRef<HTMLDivElement>(null);
  const overlayBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Simulate realistic loading with variable speed
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.random() * 12 + 3;
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        
        // Trigger exit animation after brief pause
        setTimeout(() => {
          animateExit();
        }, 400);
      }
      
      setProgress(currentProgress);
      setLoadingProgress(currentProgress);
    }, 150);

    // Initial entrance animation
    animateEntrance();

    return () => clearInterval(interval);
  }, [setLoadingProgress]);

  const animateEntrance = () => {
    const tl = gsap.timeline();
    
    // Logo animation - split reveal
    tl.from(logoRef.current, {
      duration: 1.2,
      opacity: 0,
      scale: 0.8,
      rotationY: 180,
      ease: 'expo.out',
    })
    // Progress bar container
    .from(progressBarRef.current, {
      duration: 0.8,
      scaleX: 0,
      opacity: 0,
      ease: 'power3.out',
    }, '-=0.4')
    // Counter
    .from(counterRef.current, {
      duration: 0.6,
      y: 20,
      opacity: 0,
      ease: 'power2.out',
    }, '-=0.4');
  };

  const animateExit = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        setLoading(false);
      },
    });

    // Counter fade out
    tl.to(counterRef.current, {
      duration: 0.3,
      opacity: 0,
      y: -20,
      ease: 'power2.in',
    })
    // Progress bar scale out
    .to(progressBarRef.current, {
      duration: 0.4,
      scaleX: 0,
      opacity: 0,
      ease: 'power3.in',
    }, '-=0.1')
    // Logo explode/zoom
    .to(logoRef.current, {
      duration: 0.8,
      scale: 2,
      opacity: 0,
      rotationY: -180,
      ease: 'expo.in',
    }, '-=0.2')
    // Split screen curtain reveal
    .to(overlayTopRef.current, {
      duration: 1,
      yPercent: -100,
      ease: 'expo.inOut',
    }, '-=0.4')
    .to(overlayBottomRef.current, {
      duration: 1,
      yPercent: 100,
      ease: 'expo.inOut',
    }, '-=1')
    // Container fade
    .to(containerRef.current, {
      duration: 0.3,
      opacity: 0,
      ease: 'power2.inOut',
    }, '-=0.3');
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          ref={containerRef}
          className="fixed inset-0 z-[9999] overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Split Screen Overlays */}
          <div 
            ref={overlayTopRef}
            className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950"
          >
            {/* Grid pattern top */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
          </div>
          
          <div 
            ref={overlayBottomRef}
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-neutral-950 via-neutral-900 to-neutral-950"
          >
            {/* Grid pattern bottom */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
          </div>

          {/* Main Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative z-10 flex flex-col items-center gap-12">
              {/* Logo/Brand */}
              <div ref={logoRef} className="relative">
                <motion.div
                  animate={{ 
                    rotateY: [0, 360],
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="relative"
                >
                  <h1 className="text-7xl md:text-8xl font-bold tracking-tighter">
                    <span className="block text-gradient-animated bg-clip-text text-transparent">
                      PORTFOLIO
                    </span>
                  </h1>
                  
                  {/* Glow effect */}
                  <div className="absolute inset-0 blur-3xl opacity-50">
                    <div className="w-full h-full bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500" />
                  </div>
                </motion.div>

                {/* Orbiting particles */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-primary-400"
                    animate={{
                      rotate: 360,
                      scale: [1, 1.5, 1],
                    }}
                    transition={{
                      rotate: {
                        duration: 3 + i,
                        repeat: Infinity,
                        ease: 'linear',
                      },
                      scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                    }}
                    style={{
                      transformOrigin: `${50 + i * 30}px 0px`,
                    }}
                  />
                ))}
              </div>

              {/* Progress Bar Container */}
              <div className="relative w-80 md:w-96">
                {/* Track */}
                <div 
                  ref={progressBarRef}
                  className="relative h-1 overflow-hidden rounded-full glass"
                >
                  {/* Animated progress fill */}
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    style={{
                      width: `${progress}%`,
                      background: 'linear-gradient(90deg, #6366f1 0%, #a855f7 50%, #6366f1 100%)',
                      backgroundSize: '200% 100%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 0%', '200% 0%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                  
                  {/* Progress glow */}
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full blur-lg bg-gradient-to-r from-primary-500 to-accent-500"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>

                {/* Progress markers */}
                <div className="absolute -top-2 left-0 right-0 flex justify-between">
                  {[0, 25, 50, 75, 100].map((marker) => (
                    <motion.div
                      key={marker}
                      className="w-1 h-3 rounded-full"
                      animate={{
                        backgroundColor: progress >= marker ? '#a855f7' : '#334155',
                        scale: progress >= marker ? [1, 1.2, 1] : 1,
                      }}
                      transition={{
                        scale: {
                          duration: 0.3,
                        },
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Counter */}
              <div ref={counterRef} className="relative">
                <motion.div
                  className="text-4xl md:text-5xl font-bold text-white font-mono"
                  key={Math.floor(progress)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {Math.floor(progress)}
                  <span className="text-primary-400">%</span>
                </motion.div>
                
                {/* Loading text */}
                <motion.p
                  className="mt-2 text-sm text-neutral-400 text-center tracking-[0.3em] uppercase"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  Loading Experience
                </motion.p>
              </div>
            </div>

            {/* Background ambient particles */}
            <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-gradient-to-r from-primary-400 to-accent-400"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -100, 0],
                    x: [0, Math.random() * 50 - 25, 0],
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 4,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>

            {/* Corner decorative elements */}
            <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary-500/30 rounded-tl-lg" />
            <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-accent-500/30 rounded-tr-lg" />
            <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-accent-500/30 rounded-bl-lg" />
            <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-primary-500/30 rounded-br-lg" />
          </div>

          {/* Noise texture overlay */}
          <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
