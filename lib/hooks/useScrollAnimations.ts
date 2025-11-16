import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseScrollAnimationOptions {
  trigger?: string | HTMLElement;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean;
  markers?: boolean;
  once?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

/**
 * Custom hook for GSAP ScrollTrigger animations
 * Award-winning scroll-driven animations
 */
export function useScrollAnimation(
  animationFn: (element: HTMLElement) => gsap.core.Timeline | gsap.core.Tween,
  options: UseScrollAnimationOptions = {}
) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const animation = animationFn(element);

      ScrollTrigger.create({
        trigger: options.trigger || element,
        start: options.start || 'top 80%',
        end: options.end || 'bottom 20%',
        scrub: options.scrub ?? false,
        pin: options.pin ?? false,
        markers: options.markers ?? false,
        once: options.once ?? true,
        onEnter: options.onEnter,
        onLeave: options.onLeave,
        onEnterBack: options.onEnterBack,
        onLeaveBack: options.onLeaveBack,
        animation: animation as any,
      });
    }, element);

    return () => {
      ctx.revert();
    };
  }, [animationFn, options]);

  return elementRef;
}

/**
 * Batch scroll animations for multiple elements
 */
export function useBatchScrollAnimation(
  selector: string,
  animationFn: (elements: Element[]) => void,
  options: UseScrollAnimationOptions = {}
) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(selector);
    if (elements.length === 0) return;

    const ctx = gsap.context(() => {
      animationFn(Array.from(elements));
    }, container);

    return () => {
      ctx.revert();
    };
  }, [selector, animationFn, options]);

  return containerRef;
}

/**
 * Parallax scroll effect
 */
export function useParallaxScroll(speed: number = 0.5) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        y: () => window.innerHeight * speed,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, element);

    return () => {
      ctx.revert();
    };
  }, [speed]);

  return elementRef;
}

/**
 * Fade in with slide animation on scroll
 */
export function useFadeInScroll(
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  distance: number = 60
) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const getTransform = () => {
      switch (direction) {
        case 'up':
          return { y: distance };
        case 'down':
          return { y: -distance };
        case 'left':
          return { x: distance };
        case 'right':
          return { x: -distance };
      }
    };

    const ctx = gsap.context(() => {
      gsap.from(element, {
        ...getTransform(),
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          once: true,
        },
      });
    }, element);

    return () => {
      ctx.revert();
    };
  }, [direction, distance]);

  return elementRef;
}

/**
 * Stagger animation for child elements
 */
export function useStaggerScroll(
  childSelector: string = '> *',
  stagger: number = 0.1
) {
  const containerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.querySelectorAll(childSelector);
    if (children.length === 0) return;

    const ctx = gsap.context(() => {
      gsap.from(children, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: stagger,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 80%',
          once: true,
        },
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, [childSelector, stagger]);

  return containerRef;
}

/**
 * Pin element while scrolling
 */
export function usePinScroll(duration: string = '100%') {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: element,
        start: 'top top',
        end: `+=${duration}`,
        pin: true,
        pinSpacing: true,
      });
    }, element);

    return () => {
      ctx.revert();
    };
  }, [duration]);

  return elementRef;
}

/**
 * Scale animation on scroll
 */
export function useScaleScroll(fromScale: number = 0.8, toScale: number = 1) {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        element,
        { scale: fromScale, opacity: 0 },
        {
          scale: toScale,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, element);

    return () => {
      ctx.revert();
    };
  }, [fromScale, toScale]);

  return elementRef;
}

/**
 * Text reveal animation on scroll
 */
export function useTextRevealScroll() {
  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Split text into words or characters if needed
    const text = element.textContent || '';
    const words = text.split(' ');
    
    element.innerHTML = words
      .map((word) => `<span style="display: inline-block; overflow: hidden;"><span style="display: inline-block;">${word}</span></span>`)
      .join(' ');

    const ctx = gsap.context(() => {
      const spans = element.querySelectorAll('span span');
      
      gsap.from(spans, {
        y: '100%',
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 85%',
          once: true,
        },
      });
    }, element);

    return () => {
      ctx.revert();
    };
  }, []);

  return elementRef;
}

/**
 * Horizontal scroll section
 */
export function useHorizontalScroll() {
  const containerRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const scrollContainer = scrollRef.current;
    
    if (!container || !scrollContainer) return;

    const ctx = gsap.context(() => {
      const scrollWidth = scrollContainer.scrollWidth - window.innerWidth;
      
      gsap.to(scrollContainer, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${scrollWidth}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });
    }, container);

    return () => {
      ctx.revert();
    };
  }, []);

  return { containerRef, scrollRef };
}

/**
 * Refresh ScrollTrigger (useful after layout changes)
 */
export function refreshScrollTrigger() {
  if (typeof window !== 'undefined') {
    ScrollTrigger.refresh();
  }
}

/**
 * Kill all ScrollTriggers
 */
export function killAllScrollTriggers() {
  if (typeof window !== 'undefined') {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }
}
