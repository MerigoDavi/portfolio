'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store/useStore';
import LoadingScreen from '@/components/LoadingScreen';
import NewHeroSection from '@/components/sections/NewHeroSection';
import AboutSection from '@/components/sections/AboutSection';
import SkillsSection from '@/components/sections/SkillsSection';
import ProjectsSection from '@/components/sections/ProjectsSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';

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
      <main className="relative overflow-hidden">
        <NewHeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
      </main>
    </>
  );
}
