'use client';

import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from '@/lib/gsap';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Check if device is mobile or has reduced motion preference
    const isMobile = window.innerWidth < 1024 || 'ontouchstart' in window;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Disable smooth scroll on mobile or if user prefers reduced motion
    if (isMobile || prefersReducedMotion) {
      return;
    }

    // Inicializar Lenis com configurações otimizadas
    lenisRef.current = new Lenis({
      duration: 0.8, // Reduzido de 1.2 para mais responsividade
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1, // Ajuste para scroll mais rápido
      touchMultiplier: 2,
    });

    // Sincronizar com GSAP ScrollTrigger
    lenisRef.current.on('scroll', () => {
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new Event('scroll'));
      }
    });

    // Adicionar ao ticker do GSAP
    const ticker = (time: number) => {
      lenisRef.current?.raf(time * 1000);
    };
    
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenisRef.current?.destroy();
      gsap.ticker.remove(ticker);
    };
  }, []);

  return <>{children}</>;
}
