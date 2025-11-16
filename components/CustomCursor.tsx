'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [trails, setTrails] = useState<{ x: number; y: number; id: number }[]>([]);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 20, stiffness: 200 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  
  // Trailing effect
  const slowSpringConfig = { damping: 30, stiffness: 100 };
  const trailXSpring = useSpring(cursorX, slowSpringConfig);
  const trailYSpring = useSpring(cursorY, slowSpringConfig);
  
  // Rotate based on movement
  const cursorRotate = useTransform(
    [cursorXSpring, cursorYSpring],
    ([x, y]) => {
      const angle = Math.atan2(y as number, x as number) * (180 / Math.PI);
      return angle;
    }
  );

  useEffect(() => {
    let magnetTarget: HTMLElement | null = null;
    let animationFrameId: number | undefined;
    
    const moveCursor = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const magneticElement = target.closest('[data-magnetic]') as HTMLElement;
      const isClickable = target.closest('a, button, input, textarea, [role="button"]');
      
      setIsPointer(!!isClickable);
      
      // Magnetic effect
      if (magneticElement && magneticElement !== magnetTarget) {
        magnetTarget = magneticElement;
        const rect = magneticElement.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const distance = Math.sqrt(
          Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
        );
        
        if (distance < 100) {
          const pullStrength = (100 - distance) / 100;
          const pullX = (centerX - e.clientX) * pullStrength * 0.3;
          const pullY = (centerY - e.clientY) * pullStrength * 0.3;
          
          cursorX.set(e.clientX + pullX - 16);
          cursorY.set(e.clientY + pullY - 16);
          
          // Show text on magnetic elements
          const text = magneticElement.getAttribute('data-cursor-text');
          if (text) setCursorText(text);
          return;
        }
      }
      
      magnetTarget = null;
      setCursorText('');
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    
    const handleMouseDown = () => setIsPressed(true);
    const handleMouseUp = () => setIsPressed(false);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
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
      {/* Trail effect */}
      <motion.div
        className="pointer-events-none fixed z-[49] h-16 w-16 rounded-full bg-primary-500/10 blur-xl"
        style={{
          left: trailXSpring,
          top: trailYSpring,
          x: -32,
          y: -32,
        }}
      />
      
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed z-50 flex items-center justify-center"
        style={{
          left: cursorXSpring,
          top: cursorYSpring,
          mixBlendMode: isPointer ? 'normal' : 'difference',
        }}
      >
        <motion.div
          className="relative flex items-center justify-center"
          animate={{
            scale: isPressed ? 0.8 : isPointer ? 1.5 : 1,
          }}
          transition={{
            duration: 0.2,
            ease: 'easeOut',
          }}
        >
          {/* Outer ring */}
          <motion.div
            className="absolute h-12 w-12 rounded-full border-2"
            style={{
              borderColor: isPointer ? '#6366f1' : '#ffffff',
              rotate: cursorRotate,
            }}
            animate={{
              scale: isPointer ? 1.3 : 1,
              borderWidth: isPointer ? 1 : 2,
            }}
          />
          
          {/* Glowing dot */}
          <motion.div
            className="h-2 w-2 rounded-full"
            style={{
              backgroundColor: isPointer ? '#6366f1' : '#ffffff',
              boxShadow: isPointer
                ? '0 0 20px rgba(99, 102, 241, 0.8)'
                : '0 0 10px rgba(255, 255, 255, 0.5)',
            }}
            animate={{
              scale: isPressed ? 0 : 1,
            }}
          />
          
          {/* Text label */}
          {cursorText && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute left-full ml-4 whitespace-nowrap rounded-full bg-primary-500 px-3 py-1 text-xs font-medium text-white"
            >
              {cursorText}
            </motion.div>
          )}
        </motion.div>
      </motion.div>
      
      {/* Ripple effect on click */}
      {isPressed && (
        <motion.div
          className="pointer-events-none fixed z-[48] h-20 w-20 rounded-full border-2 border-primary-500"
          style={{
            left: cursorXSpring,
            top: cursorYSpring,
            x: -40,
            y: -40,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      )}
    </>
  );
}
