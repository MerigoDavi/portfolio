'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { ArrowDown, Sparkles } from 'lucide-react';
import ClayButton from '@/components/ClayButton';

export default function ClayHeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 50, damping: 20 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);

  // Transform mouse position to rotation for 3D clay shape
  const rotateX = useTransform(mouseYSpring, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-300, 300], [-10, 10]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#FFF8E7] via-[#FFE8D8] to-[#E0F2FE]"
    >
      {/* Animated Clay Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large floating clay shapes */}
        <motion.div
          className="absolute top-20 left-[15%] w-96 h-96 bg-gradient-to-br from-[#E5D4FF] to-[#D5BFFF] rounded-[120px] opacity-40"
          style={{
            boxShadow: '20px 20px 40px rgba(197,170,255,0.3), -15px -15px 35px rgba(255,255,255,0.9)',
            rotateX,
            rotateY,
            transformStyle: 'preserve-3d',
          }}
          animate={{
            y: [0, -50, 0],
            rotate: [0, 45, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        
        <motion.div
          className="absolute bottom-32 right-[10%] w-[500px] h-[500px] bg-gradient-to-br from-[#C8E6F5] to-[#A7D8EA] rounded-[150px] opacity-35"
          style={{
            boxShadow: '24px 24px 48px rgba(126,200,227,0.3), -18px -18px 42px rgba(255,255,255,0.9)',
          }}
          animate={{
            y: [0, 40, 0],
            rotate: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.div
          className="absolute top-1/2 right-[25%] w-64 h-64 bg-gradient-to-br from-[#B3F5CC] to-[#8DE9B3] rounded-[80px] opacity-30"
          style={{
            boxShadow: '16px 16px 32px rgba(102,221,154,0.3), -12px -12px 28px rgba(255,255,255,0.9)',
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Small floating clay particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-12 h-12 bg-gradient-to-br from-[#FFD4B8] to-[#FFC09D] rounded-[16px] opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              boxShadow: '4px 4px 8px rgba(255,162,110,0.3), -3px -3px 6px rgba(255,255,255,0.9)',
            }}
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="flex flex-col items-center text-center space-y-12"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              type: 'spring',
              stiffness: 200,
              damping: 15,
            }}
          >
            <motion.div
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-br from-[#E5D4FF] to-[#D5BFFF] rounded-[32px]"
              style={{
                boxShadow: '10px 10px 20px rgba(197,170,255,0.3), -8px -8px 18px rgba(255,255,255,0.9), inset 2px 2px 4px rgba(255,255,255,0.6)',
              }}
              whileHover={{
                scale: 1.05,
                y: -4,
              }}
              animate={{
                boxShadow: [
                  '10px 10px 20px rgba(197,170,255,0.3), -8px -8px 18px rgba(255,255,255,0.9)',
                  '12px 12px 24px rgba(197,170,255,0.4), -10px -10px 22px rgba(255,255,255,1)',
                  '10px 10px 20px rgba(197,170,255,0.3), -8px -8px 18px rgba(255,255,255,0.9)',
                ],
              }}
              transition={{
                boxShadow: {
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
                scale: {
                  type: 'spring',
                  stiffness: 400,
                  damping: 17,
                },
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              >
                <Sparkles className="w-6 h-6 text-[#6B5B4F]" />
              </motion.div>
              <span className="font-bold text-lg text-[#6B5B4F] tracking-wide">
                Aberto a Novos Projetos
              </span>
            </motion.div>
          </motion.div>

          {/* Main Heading with 3D Clay Effect */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.4,
              type: 'spring',
              stiffness: 80,
            }}
            className="space-y-6"
          >
            <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black leading-[0.9] tracking-tighter">
              <motion.span
                className="block text-[#6B5B4F]"
                style={{
                  textShadow: '4px 4px 8px rgba(107,91,79,0.2), -2px -2px 6px rgba(255,255,255,0.8)',
                }}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                Construindo
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-[#FFAC82] via-[#C5AAFF] to-[#7EC8E3] bg-clip-text text-transparent"
                style={{
                  textShadow: '6px 6px 12px rgba(255,162,110,0.3)',
                }}
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 4,
                  delay: 0.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              >
                Para a Web
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="text-xl md:text-3xl text-[#8B7B6F] max-w-4xl mx-auto leading-relaxed font-medium"
            >
              Desenvolvo aplicações que combinam <span className="font-bold text-[#6B5B4F]">tecnologia com usabilidade</span>.{' '}
              Do <span className="font-bold text-[#6B5B4F]">frontend ao machine learning</span>
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 1,
              type: 'spring',
              stiffness: 100,
            }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <ClayButton variant="peach" size="lg" href="#projects">
              <span className="flex items-center gap-3">
                <span>Ver Projetos</span>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                >
                  <ArrowDown className="w-5 h-5" />
                </motion.div>
              </span>
            </ClayButton>

            <ClayButton variant="blue" size="lg" href="#contact">
              Entre em Contato
            </ClayButton>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.8 }}
            className="mt-16 md:mt-20"
          >
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="flex flex-col items-center gap-3"
            >
              <div
                className="w-8 h-14 bg-gradient-to-br from-[#FFF1D0] to-[#FFE9B8] rounded-full flex items-start justify-center p-2"
                style={{
                  boxShadow: '6px 6px 12px rgba(255,233,184,0.3), -4px -4px 10px rgba(255,255,255,0.9)',
                }}
              >
                <motion.div
                  animate={{
                    y: [0, 18, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-2 h-2 rounded-full bg-gradient-to-b from-[#FFAC82] to-[#C5AAFF]"
                />
              </div>
              <span className="text-xs text-[#A89B8F] uppercase tracking-[0.25em] font-bold">
                Role
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(107,91,79,0.1)_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
    </section>
  );
}
