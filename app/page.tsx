'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import { useStore } from '@/lib/store/useStore';
import LoadingScreen from '@/components/LoadingScreen';
import NewHeroSection from '@/components/sections/NewHeroSection';

// Lazy load sections for better performance
const AboutSection = lazy(() => import('@/components/sections/AboutSection'));
const SkillsSection = lazy(() => import('@/components/sections/SkillsSection'));
const ProjectsSection = lazy(() => import('@/components/sections/ProjectsSection'));
const ContactSection = lazy(() => import('@/components/sections/ContactSection'));
const Footer = lazy(() => import('@/components/Footer'));

// Section loading fallback
const SectionFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-neutral-950">
    <div className="w-12 h-12 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin" />
  </div>
);

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const setLoadingStore = useStore((state) => state.setLoading);
  const setLoadingProgress = useStore((state) => state.setLoadingProgress);

  useEffect(() => {
    // Simulate loading with progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 15;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        setTimeout(() => {
          setIsLoading(false);
          setLoadingStore(false);
        }, 500);
      }
      setLoadingProgress(progress);
    }, 100);

    return () => clearInterval(interval);
  }, [setLoadingStore, setLoadingProgress]);

  return (
    <>
      {isLoading && <LoadingScreen />}
      <main id="main-content" className="relative overflow-hidden">
        <NewHeroSection />
        <Suspense fallback={<SectionFallback />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <SkillsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ProjectsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ContactSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Footer />
        </Suspense>
      </main>
    </>
  );
}
