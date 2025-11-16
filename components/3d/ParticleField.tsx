'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '@/lib/store/useStore';
import * as THREE from 'three';
import {
  particleVertexShader,
  particleFragmentShader,
} from '@/lib/shaders/particleShader';

export default function ParticleField() {
  const pointsRef = useRef<THREE.Points>(null!);
  const cursor = useStore((state) => state.cursor);
  const performanceMode = useStore((state) => state.performanceMode);

  // Generate particles based on performance
  const particleCount = performanceMode === 'high' ? 10000 : performanceMode === 'medium' ? 5000 : 2000;

  const { positions, scales, randomness } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const randomness = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Position in sphere
      const radius = Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      // Scale
      scales[i] = Math.random();

      // Randomness for animation
      randomness[i3] = Math.random();
      randomness[i3 + 1] = Math.random();
      randomness[i3 + 2] = Math.random();
    }

    return { positions, scales, randomness };
  }, [particleCount]);

  // Shader uniforms
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSize: { value: 30.0 },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    []
  );

  // Update uniforms
  useFrame((state) => {
    if (!pointsRef.current) return;

    const material = pointsRef.current.material as THREE.ShaderMaterial;
    material.uniforms.uTime.value = state.clock.elapsedTime;

    // Update mouse
    if (typeof window !== 'undefined') {
      material.uniforms.uMouse.value.x = cursor.position.x / window.innerWidth;
      material.uniforms.uMouse.value.y = 1.0 - cursor.position.y / window.innerHeight;
    }

    // Rotate slowly
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05;
  });

  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
    geometry.setAttribute('aRandomness', new THREE.BufferAttribute(randomness, 3));
    return geometry;
  }, [positions, scales, randomness]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms,
      vertexShader: particleVertexShader,
      fragmentShader: particleFragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
  }, [uniforms]);

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}
