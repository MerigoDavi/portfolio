'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 250 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
      
      const target = e.target as HTMLElement;
      const isClickable = target.closest('a, button, input, textarea, [role="button"]');
      setIsPointer(!!isClickable);
    };

    window.addEventListener('mousemove', moveCursor);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  // Esconder cursor customizado em mobile
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed z-50 mix-blend-difference"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
        }}
      >
        <motion.div
          className="h-8 w-8 rounded-full border-2 border-white"
          animate={{
            scale: isPointer ? 1.5 : 1,
            borderWidth: isPointer ? 1 : 2,
          }}
          transition={{
            duration: 0.2,
            ease: 'easeOut',
          }}
        />
      </motion.div>
      
      {/* Dot central */}
      <motion.div
        className="pointer-events-none fixed z-50 h-1 w-1 rounded-full bg-white mix-blend-difference"
        style={{
          left: useSpring(cursorX, { damping: 30, stiffness: 300 }),
          top: useSpring(cursorY, { damping: 30, stiffness: 300 }),
        }}
      />
    </>
  );
}
