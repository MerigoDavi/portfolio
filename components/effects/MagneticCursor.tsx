'use client';

import { useEffect, useRef } from 'react';
import { motion, useSpring } from 'framer-motion';
import { useStore } from '@/lib/store/useStore';
import { useMousePosition } from '@/lib/hooks/useMousePosition';

export default function MagneticCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  
  useMousePosition(); // Initialize mouse tracking
  
  const cursor = useStore((state) => state.cursor);
  const performanceMode = useStore((state) => state.performanceMode);
  
  // Smooth spring animations
  const cursorX = useSpring(0, {
    damping: 25,
    stiffness: 200,
    mass: 0.5,
  });
  
  const cursorY = useSpring(0, {
    damping: 25,
    stiffness: 200,
    mass: 0.5,
  });
  
  const cursorDotX = useSpring(0, {
    damping: 20,
    stiffness: 400,
    mass: 0.1,
  });
  
  const cursorDotY = useSpring(0, {
    damping: 20,
    stiffness: 400,
    mass: 0.1,
  });

  // Update cursor position
  useEffect(() => {
    cursorX.set(cursor.position.x);
    cursorY.set(cursor.position.y);
    cursorDotX.set(cursor.position.x);
    cursorDotY.set(cursor.position.y);
  }, [cursor.position, cursorX, cursorY, cursorDotX, cursorDotY]);

  // Handle hover effects on magnetic elements
  useEffect(() => {
    const magneticElements = document.querySelectorAll('[data-magnetic]');
    
    const handleMouseEnter = () => {
      useStore.getState().setCursorHovering(true);
    };
    
    const handleMouseLeave = () => {
      useStore.getState().setCursorHovering(false);
      useStore.getState().setCursorText('');
    };
    
    magneticElements.forEach((element) => {
      element.addEventListener('mouseenter', handleMouseEnter);
      element.addEventListener('mouseleave', handleMouseLeave);
      
      // Get cursor text from data attribute
      const cursorText = element.getAttribute('data-cursor-text');
      if (cursorText) {
        element.addEventListener('mouseenter', () => {
          useStore.getState().setCursorText(cursorText);
        });
      }
    });
    
    return () => {
      magneticElements.forEach((element) => {
        element.removeEventListener('mouseenter', handleMouseEnter);
        element.removeEventListener('mouseleave', handleMouseLeave);
      });
    };
  }, []);

  // Hide on touch devices
  if (typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  // Disable for low performance mode
  if (performanceMode === 'low') {
    return null;
  }

  const cursorSize = cursor.isHovering ? 60 : 40;
  const dotSize = cursor.isHovering ? 0 : 8;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden mix-blend-difference lg:block"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          className="relative flex items-center justify-center rounded-full border-2 border-white"
          animate={{
            width: cursorSize,
            height: cursorSize,
            opacity: cursor.isHovering ? 0.3 : 0.5,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 20,
          }}
        >
          {cursor.cursorText && (
            <motion.span
              className="text-xs font-medium text-white"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
            >
              {cursor.cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>

      {/* Cursor dot */}
      <motion.div
        ref={cursorDotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] hidden rounded-full bg-white mix-blend-difference lg:block"
        style={{
          x: cursorDotX,
          y: cursorDotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: dotSize,
          height: dotSize,
          opacity: cursor.isHovering ? 0 : 1,
        }}
        transition={{
          type: 'spring',
          stiffness: 500,
          damping: 28,
        }}
      />
    </>
  );
}
