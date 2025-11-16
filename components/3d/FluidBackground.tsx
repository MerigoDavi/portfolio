'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '@/lib/store/useStore';
import * as THREE from 'three';
import {
  fluidVertexShader,
  fluidFragmentShader,
} from '@/lib/shaders/fluidShader';

export default function FluidBackground() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const cursor = useStore((state) => state.cursor);
  const performanceMode = useStore((state) => state.performanceMode);

  // Shader uniforms
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uIntensity: { value: 1.0 },
      uColor1: { value: new THREE.Color('#6366f1') },
      uColor2: { value: new THREE.Color('#a855f7') },
      uColor3: { value: new THREE.Color('#ec4899') },
    }),
    []
  );

  // Update uniforms on frame
  useFrame((state) => {
    if (!meshRef.current) return;

    const material = meshRef.current.material as THREE.ShaderMaterial;
    
    // Update time
    material.uniforms.uTime.value = state.clock.elapsedTime;

    // Update mouse position (normalized to 0-1)
    if (typeof window !== 'undefined') {
      material.uniforms.uMouse.value.x = cursor.position.x / window.innerWidth;
      material.uniforms.uMouse.value.y = 1.0 - cursor.position.y / window.innerHeight;
    }

    // Adjust intensity based on performance mode
    const targetIntensity = performanceMode === 'high' ? 1.0 : performanceMode === 'medium' ? 0.7 : 0.4;
    material.uniforms.uIntensity.value += (targetIntensity - material.uniforms.uIntensity.value) * 0.1;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <planeGeometry args={[10, 10, performanceMode === 'high' ? 128 : 64, performanceMode === 'high' ? 128 : 64]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={fluidVertexShader}
        fragmentShader={fluidFragmentShader}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
