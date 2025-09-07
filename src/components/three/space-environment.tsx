"use client";

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SpaceEnvironmentProps {
  progress: number; // 0 to 1
  qualityLevel?: 'low' | 'medium' | 'high';
  cameraTarget?: [number, number, number];
}

export function SpaceEnvironment({ progress, qualityLevel = 'medium', cameraTarget }: SpaceEnvironmentProps) {
  const groupRef = useRef<THREE.Group>(null);
  const starsRef = useRef<THREE.Points>(null);
  const planetsRef = useRef<THREE.Group>(null);
  const rocketRef = useRef<THREE.Group>(null);
  
  // Generate stars based on quality level
  const starGeometry = useMemo(() => {
    const starCount = qualityLevel === 'low' ? 500 : qualityLevel === 'medium' ? 1000 : 2000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(starCount * 3);
    const colors = new Float32Array(starCount * 3);
    
    for (let i = 0; i < starCount; i++) {
      // Distribute stars in a sphere
      const radius = 50 + Math.random() * 50;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      // Random star colors (white to blue)
      const intensity = 0.5 + Math.random() * 0.5;
      colors[i * 3] = intensity;
      colors[i * 3 + 1] = intensity;
      colors[i * 3 + 2] = intensity + Math.random() * 0.3;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    return geometry;
  }, [qualityLevel]);
  
  // Generate planets
  const planets = useMemo(() => [
    {
      id: 'earth',
      position: [-8, -2, -15] as [number, number, number],
      size: 1.5,
      color: '#4A90E2',
      orbitRadius: 8,
      orbitSpeed: 0.5
    },
    {
      id: 'mars',
      position: [12, 3, -25] as [number, number, number],
      size: 1,
      color: '#E74C3C',
      orbitRadius: 12,
      orbitSpeed: 0.3
    },
    {
      id: 'jupiter',
      position: [-20, 5, -40] as [number, number, number],
      size: 2.5,
      color: '#F39C12',
      orbitRadius: 20,
      orbitSpeed: 0.1
    }
  ], []);

  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Rotate stars slowly
    if (starsRef.current) {
      starsRef.current.rotation.y = time * 0.02;
      starsRef.current.rotation.x = time * 0.01;
    }
    
    // Animate planets in orbit
    if (planetsRef.current) {
      planetsRef.current.children.forEach((planet, index) => {
        const planetData = planets[index];
        if (planetData) {
          const orbitAngle = time * planetData.orbitSpeed;
          planet.position.x = Math.cos(orbitAngle) * planetData.orbitRadius;
          planet.position.z = Math.sin(orbitAngle) * planetData.orbitRadius - 20;
          planet.rotation.y = time * 2;
        }
      });
    }
    
    // Animate rocket launch
    if (rocketRef.current) {
      const launchProgress = Math.max(0, Math.min(1, (progress - 0.3) / 0.7));
      rocketRef.current.position.y = -5 + launchProgress * 15;
      rocketRef.current.position.z = launchProgress * -10;
      rocketRef.current.rotation.x = -launchProgress * 0.3;
      
      // Add some wobble during launch
      if (launchProgress > 0 && launchProgress < 0.8) {
        rocketRef.current.rotation.z = Math.sin(time * 10) * 0.05 * (1 - launchProgress);
      }
    }
  });

  return (
    <group ref={groupRef}>
      {/* Starfield */}
      <points ref={starsRef} geometry={starGeometry}>
        <pointsMaterial
          size={qualityLevel === 'low' ? 0.5 : 1}
          vertexColors
          transparent
          opacity={progress}
        />
      </points>
      
      {/* Planets */}
      <group ref={planetsRef}>
        {planets.map((planet, index) => {
          const planetScale = progress > index * 0.2 ? 1 : 0;
          return (
            <mesh
              key={planet.id}
              position={planet.position}
              scale={[planetScale, planetScale, planetScale]}
            >
              <sphereGeometry args={[planet.size, qualityLevel === 'low' ? 8 : 16, qualityLevel === 'low' ? 6 : 12]} />
              <meshStandardMaterial
                color={planet.color}
                metalness={0.1}
                roughness={0.8}
                emissive={planet.color}
                emissiveIntensity={0.1}
              />
            </mesh>
          );
        })}
      </group>
      
      {/* Rocket */}
      <group ref={rocketRef} position={[0, -5, 0]}>
        <RocketModel qualityLevel={qualityLevel} />
      </group>
      
      {/* Nebula effect for high quality */}
      {qualityLevel === 'high' && (
        <NebulaEffect progress={progress} />
      )}
      
      {/* Space lighting */}
      <ambientLight intensity={0.2} color="#1a1a2e" />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.5}
        color="#ffffff"
      />
      <pointLight
        position={[0, 0, 0]}
        intensity={1}
        color="#ffd700"
        distance={100}
      />
    </group>
  );
}

// Rocket 3D model
function RocketModel({ qualityLevel }: { qualityLevel: 'low' | 'medium' | 'high' }) {
  const segments = qualityLevel === 'low' ? 6 : qualityLevel === 'medium' ? 8 : 12;
  
  return (
    <group>
      {/* Rocket body */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.2, 0.3, 2, segments]} />
        <meshStandardMaterial color="#E8E8E8" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Rocket nose */}
      <mesh position={[0, 1.2, 0]}>
        <coneGeometry args={[0.2, 0.4, segments]} />
        <meshStandardMaterial color="#FF4444" metalness={0.6} roughness={0.3} />
      </mesh>
      
      {/* Rocket fins */}
      {Array.from({ length: 3 }).map((_, i) => (
        <mesh
          key={i}
          position={[
            Math.cos((i / 3) * Math.PI * 2) * 0.4,
            -0.8,
            Math.sin((i / 3) * Math.PI * 2) * 0.4
          ]}
          rotation={[0, (i / 3) * Math.PI * 2, 0]}
        >
          <boxGeometry args={[0.1, 0.6, 0.3]} />
          <meshStandardMaterial color="#4A90E2" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
      
      {/* Engine glow */}
      <mesh position={[0, -1.2, 0]}>
        <cylinderGeometry args={[0.15, 0.25, 0.3, segments]} />
        <meshStandardMaterial
          color="#FF6B35"
          emissive="#FF6B35"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
}

// Nebula particle effect
function NebulaEffect({ progress }: { progress: number }) {
  const nebulaRef = useRef<THREE.Points>(null);
  
  const nebulaGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
      
      // Purple/blue nebula colors
      colors[i * 3] = 0.4 + Math.random() * 0.4; // R
      colors[i * 3 + 1] = 0.2 + Math.random() * 0.3; // G
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // B
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    
    return geometry;
  }, []);
  
  useFrame((state) => {
    if (nebulaRef.current) {
      nebulaRef.current.rotation.y = state.clock.elapsedTime * 0.01;
      
      if (nebulaRef.current.material instanceof THREE.PointsMaterial) {
        nebulaRef.current.material.opacity = progress * 0.4;
      }
    }
  });
  
  return (
    <points ref={nebulaRef} geometry={nebulaGeometry}>
      <pointsMaterial
        size={2}
        vertexColors
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}