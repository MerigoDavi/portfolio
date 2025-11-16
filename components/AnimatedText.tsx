'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  animationType?: 'fade' | 'blur' | 'glitch' | 'wave' | 'flip';
}

export default function AnimatedText({
  text,
  className = '',
  delay = 0,
  staggerDelay = 0.03,
  animationType = 'fade',
}: AnimatedTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    const chars = text.split('');
    textRef.current.innerHTML = '';
    
    chars.forEach((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.whiteSpace = 'pre';
      textRef.current!.appendChild(span);
    });

    const spans = textRef.current.querySelectorAll('span');
    
    const ctx = gsap.context(() => {
      switch (animationType) {
        case 'fade':
          gsap.from(spans, {
            opacity: 0,
            y: 50,
            rotationX: -90,
            transformOrigin: '50% 50%',
            duration: 0.8,
            stagger: staggerDelay,
            delay,
            ease: 'back.out(2)',
          });
          break;
          
        case 'blur':
          gsap.from(spans, {
            opacity: 0,
            filter: 'blur(20px)',
            scale: 2,
            duration: 1,
            stagger: staggerDelay,
            delay,
            ease: 'power3.out',
          });
          break;
          
        case 'glitch':
          gsap.from(spans, {
            opacity: 0,
            x: () => gsap.utils.random(-100, 100),
            y: () => gsap.utils.random(-50, 50),
            rotation: () => gsap.utils.random(-45, 45),
            scale: 0,
            duration: 0.6,
            stagger: staggerDelay,
            delay,
            ease: 'back.out(3)',
          });
          break;
          
        case 'wave':
          gsap.from(spans, {
            opacity: 0,
            y: -100,
            duration: 0.8,
            stagger: staggerDelay,
            delay,
            ease: 'elastic.out(1, 0.5)',
          });
          
          // Add continuous wave animation
          gsap.to(spans, {
            y: -10,
            duration: 1,
            stagger: {
              each: 0.05,
              repeat: -1,
              yoyo: true,
            },
            ease: 'sine.inOut',
            delay: delay + (chars.length * staggerDelay) + 0.5,
          });
          break;
          
        case 'flip':
          gsap.from(spans, {
            opacity: 0,
            rotationY: 180,
            rotationX: 90,
            scale: 0,
            transformOrigin: '50% 50%',
            duration: 1,
            stagger: staggerDelay,
            delay,
            ease: 'back.out(1.7)',
          });
          break;
      }
    }, textRef);

    return () => ctx.revert();
  }, [text, delay, staggerDelay, animationType]);

  return (
    <div
      ref={textRef}
      className={`${className} will-change-transform`}
      style={{ perspective: '1000px' }}
    />
  );
}
