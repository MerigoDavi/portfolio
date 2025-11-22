'use client';

import { useState, useEffect, lazy, Suspense } from 'react';
import { useStore } from '@/lib/store/useStore';
import LoadingScreen from '@/components/LoadingScreen';
import ClayNavigation from '@/components/ClayNavigation';
import ClayHeroSection from '@/components/sections/ClayHeroSection';

// Lazy load sections for better performance
const ClayProjectsSection = lazy(() => import('@/components/sections/ClayProjectsSection'));
const ClayAboutSection = lazy(() => import('@/components/sections/ClayAboutSection'));
const ClaySkillsSection = lazy(() => import('@/components/sections/ClaySkillsSection'));
const ClayContactSection = lazy(() => import('@/components/sections/ClayContactSection'));
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
      <ClayNavigation />
      <main id="main-content" className="relative overflow-hidden">
        <ClayHeroSection />
        <Suspense fallback={<SectionFallback />}>
          <ClayProjectsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ClayAboutSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ClaySkillsSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <ClayContactSection />
        </Suspense>
        <Suspense fallback={<SectionFallback />}>
          <Footer />
        </Suspense>
      </main>
    </>
  );
}
