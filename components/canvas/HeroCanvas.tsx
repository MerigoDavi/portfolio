'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import FluidBackground from '../3d/FluidBackground';
import ParticleField from '../3d/ParticleField';
import { useStore } from '@/lib/store/useStore';

function Scene() {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={75} />
      
      {/* Lights */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} color="#6366f1" />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} color="#a855f7" />
      <pointLight position={[0, 0, 4]} intensity={1.5} color="#ffffff" />

      {/* 3D Elements */}
      <FluidBackground />
      <ParticleField />

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom
          intensity={0.5}
          luminanceThreshold={0.9}
          luminanceSmoothing={0.9}
          blendFunction={BlendFunction.ADD}
        />
        <ChromaticAberration
          offset={[0.0005, 0.0005]}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

export default function HeroCanvas() {
  const performanceMode = useStore((state) => state.performanceMode);

  if (performanceMode === 'low') {
    return null;
  }

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={performanceMode === 'high' ? [1, 2] : [1, 1.5]}
      >
        <Suspense fallback={null}>
          <Scene />
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
}
