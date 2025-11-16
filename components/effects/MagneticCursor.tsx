'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPointer, setIsPointer] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'text' | 'drag'>('default');
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(mouseX, springConfig);
  const cursorYSpring = useSpring(mouseY, springConfig);
  
  const dotSpringConfig = { damping: 30, stiffness: 500, mass: 0.3 };
  const dotXSpring = useSpring(mouseX, dotSpringConfig);
  const dotYSpring = useSpring(mouseY, dotSpringConfig);

  useEffect(() => {
    // Check if device supports hover (not touch-only)
    const supportsHover = window.matchMedia('(hover: hover)').matches;
    if (!supportsHover) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    // Check if cursor is over interactive elements
    const checkCursorStyle = (target: HTMLElement | null) => {
      if (!target) return;

      const computedStyle = window.getComputedStyle(target);
      const isClickable = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.onclick !== null ||
        computedStyle.cursor === 'pointer' ||
        target.hasAttribute('data-cursor-hover');

      setIsPointer(isClickable);

      // Check for custom cursor attributes
      const cursorTextAttr = target.getAttribute('data-cursor-text');
      const cursorVariantAttr = target.getAttribute('data-cursor-variant');
      
      setCursorText(cursorTextAttr || '');
      setCursorVariant((cursorVariantAttr as any) || (isClickable ? 'hover' : 'default'));
    };

    const handleMouseOver = (e: MouseEvent) => {
      checkCursorStyle(e.target as HTMLElement);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  // Magnetic effect on elements with data-magnetic attribute
  useEffect(() => {
    const handleMagnetic = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-magnetic]');
      if (!target) return;

      const rect = target.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      const maxDistance = 100;
      const strength = 0.3;
      
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);
      
      if (distance < maxDistance) {
        const pullX = distanceX * strength;
        const pullY = distanceY * strength;
        
        (target as HTMLElement).style.transform = `translate(${pullX}px, ${pullY}px)`;
      }
    };

    const handleMagneticLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.hasAttribute('data-magnetic')) {
        target.style.transform = 'translate(0, 0)';
      }
    };

    document.addEventListener('mousemove', handleMagnetic);
    document.addEventListener('mouseleave', handleMagneticLeave, true);

    return () => {
      document.removeEventListener('mousemove', handleMagnetic);
      document.removeEventListener('mouseleave', handleMagneticLeave, true);
    };
  }, []);

  // Hide default cursor on hover elements
  useEffect(() => {
    if (isVisible) {
      document.body.style.cursor = 'none';
    }
    return () => {
      document.body.style.cursor = 'auto';
    };
  }, [isVisible]);

  const cursorVariants = {
    default: {
      width: 40,
      height: 40,
      backgroundColor: 'rgba(99, 102, 241, 0.1)',
      border: '2px solid rgba(99, 102, 241, 0.5)',
      mixBlendMode: 'normal' as const,
    },
    hover: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(168, 85, 247, 0.15)',
      border: '2px solid rgba(168, 85, 247, 0.8)',
      mixBlendMode: 'difference' as const,
    },
    text: {
      width: 120,
      height: 120,
      backgroundColor: 'rgba(99, 102, 241, 0.05)',
      border: '1px solid rgba(99, 102, 241, 0.3)',
      mixBlendMode: 'normal' as const,
    },
    drag: {
      width: 60,
      height: 60,
      backgroundColor: 'rgba(168, 85, 247, 0.2)',
      border: '3px solid rgba(168, 85, 247, 1)',
      mixBlendMode: 'normal' as const,
    },
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[10000] rounded-full"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={cursorVariant}
        variants={cursorVariants}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 20,
          mass: 0.5,
        }}
      >
        {/* Cursor Text */}
        <AnimatePresence>
          {cursorText && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center text-white text-xs font-semibold uppercase tracking-wider"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              {cursorText}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated ring effect on hover */}
        <AnimatePresence>
          {cursorVariant === 'hover' && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-accent-400"
              initial={{ scale: 1, opacity: 0.8 }}
              animate={{ 
                scale: 1.5, 
                opacity: 0,
              }}
              exit={{ scale: 1, opacity: 0 }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: 'easeOut',
              }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Center Dot */}
      <motion.div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 pointer-events-none z-[10001] rounded-full"
        style={{
          x: dotXSpring,
          y: dotYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          backgroundColor: isPointer 
            ? 'rgba(168, 85, 247, 1)' 
            : 'rgba(99, 102, 241, 1)',
          scale: isPointer ? 1.5 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 30,
        }}
      />

      {/* Trail effect */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: 20 - i * 5,
              height: 20 - i * 5,
              backgroundColor: `rgba(99, 102, 241, ${0.1 - i * 0.03})`,
            }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 0.1, 0],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
              ease: 'easeOut',
            }}
          />
        ))}
      </motion.div>
    </>
  );
}
