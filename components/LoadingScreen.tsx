'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { useStore } from '@/lib/store/useStore';
import { Sparkles } from 'lucide-react';

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
    
    // Logo animation - bounce in
    tl.from(logoRef.current, {
      duration: 1.2,
      opacity: 0,
      scale: 0.5,
      y: -50,
      ease: 'elastic.out(1, 0.5)',
    })
    // Progress bar container
    .from(progressBarRef.current, {
      duration: 0.8,
      scale: 0.8,
      opacity: 0,
      ease: 'back.out(1.7)',
    }, '-=0.6')
    // Counter
    .from(counterRef.current, {
      duration: 0.6,
      y: 30,
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

    // Counter bounce out
    tl.to(counterRef.current, {
      duration: 0.4,
      scale: 1.2,
      opacity: 0,
      y: -30,
      ease: 'back.in(2)',
    })
    // Progress bar pop out
    .to(progressBarRef.current, {
      duration: 0.5,
      scale: 0,
      opacity: 0,
      ease: 'back.in(2)',
    }, '-=0.2')
    // Logo zoom out
    .to(logoRef.current, {
      duration: 0.8,
      scale: 2,
      opacity: 0,
      ease: 'power3.in',
    }, '-=0.3')
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
          className="fixed inset-0 z-[9999] overflow-hidden bg-gradient-to-br from-[#FFF8E7] via-[#FFE8D8] to-[#E0F2FE]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Split Screen Overlays */}
          <div 
            ref={overlayTopRef}
            className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[#FFF1D0] via-[#FFE9B8] to-[#FFF8E7]"
          >
            {/* Soft pattern top */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(107,91,79,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />
            </div>
          </div>
          
          <div 
            ref={overlayBottomRef}
            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#E0F2FE] via-[#C8E6F5] to-[#FFF8E7]"
          >
            {/* Soft pattern bottom */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(107,91,79,0.1)_1px,transparent_1px)] bg-[size:32px_32px]" />
            </div>
          </div>

          {/* Floating Clay Shapes Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              className="absolute top-20 left-[10%] w-64 h-64 bg-gradient-to-br from-[#E5D4FF] to-[#D5BFFF] rounded-[80px] opacity-30 blur-2xl"
              animate={{
                y: [0, -30, 0],
                rotate: [0, 45, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute bottom-20 right-[15%] w-80 h-80 bg-gradient-to-br from-[#FFD4B8] to-[#FFC09D] rounded-[100px] opacity-25 blur-2xl"
              animate={{
                y: [0, 30, 0],
                rotate: [0, -30, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <motion.div
              className="absolute top-1/2 right-[20%] w-48 h-48 bg-gradient-to-br from-[#B3F5CC] to-[#8DE9B3] rounded-[60px] opacity-20 blur-xl"
              animate={{
                x: [0, 20, 0],
                y: [0, -20, 0],
                rotate: [0, 90, 0],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          </div>

          {/* Main Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative z-10 flex flex-col items-center gap-12">
              {/* Logo/Brand with Clay Effect */}
              <div ref={logoRef} className="relative">
                <motion.div
                  className="px-12 py-6 bg-gradient-to-br from-[#E5D4FF] to-[#D5BFFF] rounded-[48px]"
                  style={{
                    boxShadow: '16px 16px 32px rgba(197,170,255,0.4), -12px -12px 28px rgba(255,255,255,0.9), inset 3px 3px 6px rgba(255,255,255,0.6)',
                  }}
                  animate={{
                    y: [0, -10, 0],
                    boxShadow: [
                      '16px 16px 32px rgba(197,170,255,0.4), -12px -12px 28px rgba(255,255,255,0.9)',
                      '20px 20px 40px rgba(197,170,255,0.5), -16px -16px 36px rgba(255,255,255,1)',
                      '16px 16px 32px rgba(197,170,255,0.4), -12px -12px 28px rgba(255,255,255,0.9)',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'linear',
                      }}
                    >
                      <Sparkles className="w-10 h-10 text-[#6B5B4F]" />
                    </motion.div>
                    <h1 className="text-5xl md:text-6xl font-black text-[#6B5B4F] tracking-tight">
                      PORTFOLIO
                    </h1>
                  </div>
                </motion.div>

                {/* Orbiting Clay Particles */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-4 h-4 bg-gradient-to-br from-[#FFD4B8] to-[#FFC09D] rounded-full"
                    style={{
                      boxShadow: '4px 4px 8px rgba(255,162,110,0.3), -3px -3px 6px rgba(255,255,255,0.9)',
                      transformOrigin: `${60 + i * 40}px 0px`,
                    }}
                    animate={{
                      rotate: 360,
                      scale: [1, 1.3, 1],
                    }}
                    transition={{
                      rotate: {
                        duration: 4 + i,
                        repeat: Infinity,
                        ease: 'linear',
                      },
                      scale: {
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                    }}
                  />
                ))}
              </div>

              {/* Progress Bar Container - Clay Style */}
              <div className="relative w-80 md:w-96">
                <motion.div 
                  ref={progressBarRef}
                  className="relative h-8 bg-gradient-to-br from-[#FFF1D0] to-[#FFE9B8] rounded-[24px] overflow-hidden"
                  style={{
                    boxShadow: 'inset 6px 6px 12px rgba(255,233,184,0.5), inset -4px -4px 10px rgba(255,255,255,0.8)',
                  }}
                >
                  {/* Animated progress fill - Clay style */}
                  <motion.div
                    className="absolute inset-y-1 left-1 right-1 bg-gradient-to-br from-[#B3F5CC] to-[#8DE9B3] rounded-[20px]"
                    style={{
                      width: `${progress}%`,
                      boxShadow: '4px 4px 8px rgba(102,221,154,0.4), -3px -3px 6px rgba(255,255,255,0.8)',
                    }}
                    animate={{
                      boxShadow: [
                        '4px 4px 8px rgba(102,221,154,0.4), -3px -3px 6px rgba(255,255,255,0.8)',
                        '6px 6px 12px rgba(102,221,154,0.5), -4px -4px 8px rgba(255,255,255,0.9)',
                        '4px 4px 8px rgba(102,221,154,0.4), -3px -3px 6px rgba(255,255,255,0.8)',
                      ],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                </motion.div>

                {/* Progress markers - Clay pills */}
                <div className="absolute -bottom-8 left-0 right-0 flex justify-between px-1">
                  {[0, 25, 50, 75, 100].map((marker) => (
                    <motion.div
                      key={marker}
                      className="w-2 h-2 rounded-full"
                      style={{
                        background: progress >= marker 
                          ? 'linear-gradient(145deg, #8DE9B3, #66DD9A)'
                          : 'linear-gradient(145deg, #E2E8F0, #CBD5E1)',
                        boxShadow: progress >= marker
                          ? '3px 3px 6px rgba(102,221,154,0.3), -2px -2px 4px rgba(255,255,255,0.9)'
                          : '2px 2px 4px rgba(203,213,225,0.3), -2px -2px 4px rgba(255,255,255,0.8)',
                      }}
                      animate={{
                        scale: progress >= marker ? [1, 1.4, 1] : 1,
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

              {/* Counter - Clay Badge */}
              <div ref={counterRef} className="relative">
                <motion.div
                  className="px-10 py-5 bg-gradient-to-br from-[#C8E6F5] to-[#A7D8EA] rounded-[32px]"
                  style={{
                    boxShadow: '10px 10px 20px rgba(126,200,227,0.3), -8px -8px 18px rgba(255,255,255,0.9), inset 2px 2px 4px rgba(255,255,255,0.6)',
                  }}
                  animate={{
                    boxShadow: [
                      '10px 10px 20px rgba(126,200,227,0.3), -8px -8px 18px rgba(255,255,255,0.9)',
                      '12px 12px 24px rgba(126,200,227,0.4), -10px -10px 22px rgba(255,255,255,1)',
                      '10px 10px 20px rgba(126,200,227,0.3), -8px -8px 18px rgba(255,255,255,0.9)',
                    ],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <motion.div
                    className="text-5xl md:text-6xl font-black text-[#6B5B4F] font-mono"
                    key={Math.floor(progress)}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ 
                      duration: 0.3,
                      type: 'spring',
                      stiffness: 300,
                    }}
                  >
                    {Math.floor(progress)}
                    <span className="text-[#7EC8E3]">%</span>
                  </motion.div>
                </motion.div>
                
                {/* Loading text */}
                <motion.p
                  className="mt-6 text-sm text-[#8B7B6F] text-center tracking-[0.3em] uppercase font-bold"
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

              {/* Loading Dots - Clay Style */}
              <div className="flex gap-3">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-3 h-3 bg-gradient-to-br from-[#FFD4B8] to-[#FFC09D] rounded-full"
                    style={{
                      boxShadow: '3px 3px 6px rgba(255,162,110,0.3), -2px -2px 4px rgba(255,255,255,0.9)',
                    }}
                    animate={{
                      y: [0, -15, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.2,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Small floating clay particles */}
            <div className="absolute inset-0 overflow-hidden opacity-30 pointer-events-none">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-gradient-to-br from-[#E5D4FF] to-[#D5BFFF] rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    boxShadow: '2px 2px 4px rgba(197,170,255,0.3), -2px -2px 4px rgba(255,255,255,0.9)',
                  }}
                  animate={{
                    y: [0, -50, 0],
                    x: [0, Math.random() * 30 - 15, 0],
                    opacity: [0.3, 1, 0.3],
                    rotate: [0, 180, 360],
                    scale: [1, 1.3, 1],
                  }}
                  transition={{
                    duration: 4 + Math.random() * 3,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Soft texture overlay */}
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(107,91,79,0.1)_1px,transparent_1px)] bg-[size:24px_24px]" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
