"use client";

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface GrowingTreeProps {
  progress: number; // 0 to 1
  qualityLevel?: 'low' | 'medium' | 'high';
}

export function GrowingTree({ progress, qualityLevel = 'medium' }: GrowingTreeProps) {
  const treeRef = useRef<THREE.Group>(null);
  const leavesRef = useRef<THREE.InstancedMesh>(null);
  
  // Generate tree structure based on quality level
  const treeData = useMemo(() => {
    const branchCount = qualityLevel === 'low' ? 8 : qualityLevel === 'medium' ? 12 : 16;
    const leafCount = qualityLevel === 'low' ? 20 : qualityLevel === 'medium' ? 40 : 60;
    
    const branches = [];
    const leaves = [];
    
    // Generate branches
    for (let i = 0; i < branchCount; i++) {
      const angle = (i / branchCount) * Math.PI * 2;
      const height = 0.5 + Math.random() * 1.5;
      const radius = 0.3 + Math.random() * 0.7;
      
      branches.push({
        position: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        ] as [number, number, number],
        rotation: [0, angle, Math.random() * 0.3] as [number, number, number],
        scale: 0.8 + Math.random() * 0.4,
        delay: i * 0.1
      });
    }
    
    // Generate leaves
    for (let i = 0; i < leafCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const height = 1 + Math.random() * 2;
      const radius = 0.5 + Math.random() * 1.2;
      
      leaves.push({
        position: [
          Math.cos(angle) * radius,
          height,
          Math.sin(angle) * radius
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ] as [number, number, number],
        scale: 0.5 + Math.random() * 0.5,
        delay: 0.5 + i * 0.02
      });
    }
    
    return { branches, leaves };
  }, [qualityLevel]);

  // Animate tree growth
  useFrame((state) => {
    if (treeRef.current) {
      // Gentle swaying motion
      treeRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
    
    // Animate leaves
    if (leavesRef.current) {
      const time = state.clock.elapsedTime;
      const matrix = new THREE.Matrix4();
      
      treeData.leaves.forEach((leaf, i) => {
        const leafProgress = Math.max(0, Math.min(1, (progress - leaf.delay) / 0.3));
        const scale = leafProgress * leaf.scale;
        const sway = Math.sin(time * 2 + i * 0.1) * 0.1;
        
        matrix.makeRotationFromEuler(new THREE.Euler(
          leaf.rotation[0] + sway,
          leaf.rotation[1],
          leaf.rotation[2] + sway * 0.5
        ));
        matrix.setPosition(
          leaf.position[0] + sway * 0.1,
          leaf.position[1],
          leaf.position[2] + sway * 0.05
        );
        matrix.scale(new THREE.Vector3(scale, scale, scale));
        
        leavesRef.current!.setMatrixAt(i, matrix);
      });
      
      leavesRef.current.instanceMatrix.needsUpdate = true;
    }
  });

  return (
    <group ref={treeRef} position={[0, -1, 0]}>
      {/* Tree Trunk */}
      <mesh
        position={[0, 0.5, 0]}
        scale={[progress * 0.8, progress * 1.5, progress * 0.8]}
      >
        <cylinderGeometry args={[0.1, 0.15, 1, 8]} />
        <meshLambertMaterial color="#8B4513" />
      </mesh>

      {/* Branches */}
      {treeData.branches.map((branch, i) => {
        const branchProgress = Math.max(0, Math.min(1, (progress - branch.delay) / 0.4));
        
        return (
          <mesh
            key={i}
            position={branch.position}
            rotation={branch.rotation}
            scale={[branchProgress * 0.6, branchProgress * branch.scale, branchProgress * 0.6]}
          >
            <cylinderGeometry args={[0.02, 0.05, 0.5, 6]} />
            <meshLambertMaterial color="#654321" />
          </mesh>
        );
      })}

      {/* Leaves (Instanced for performance) */}
      <instancedMesh
        ref={leavesRef}
        args={[undefined, undefined, treeData.leaves.length]}
      >
        <sphereGeometry args={[0.08, 6, 6]} />
        <meshLambertMaterial color="#228B22" />
      </instancedMesh>

      {/* Ambient lighting for the tree */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.8}
        castShadow={qualityLevel !== 'low'}
      />
    </group>
  );
}