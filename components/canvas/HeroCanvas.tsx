'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import ParticleField from '../3d/ParticleField';
import { useStore } from '@/lib/store/useStore';

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
      
      {/* Simplified Lights */}
      <ambientLight intensity={0.4} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} color="#6366f1" />

      {/* Only Particle Field - Fluid Background disabled for performance */}
      <ParticleField />

      {/* Post-processing disabled for performance */}
    </>
  );
}

export default function HeroCanvas() {
  const performanceMode = useStore((state) => state.performanceMode);

  // Disable on mobile and low performance mode for better performance
  if (typeof window !== 'undefined') {
    const isMobile = window.innerWidth < 1024;
    if (isMobile || performanceMode === 'low') {
      return null;
    }
  }

  return (
    <div className="absolute inset-0 -z-10 opacity-40">
      <Canvas
        gl={{
          antialias: false, // Disabled for performance
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        dpr={[1, 1.5]} // Reduced DPR for better performance
        frameloop="demand" // Only render when needed
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
