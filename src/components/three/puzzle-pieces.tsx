"use client";

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PuzzlePiecesProps {
  progress: number; // 0 to 1
  qualityLevel?: 'low' | 'medium' | 'high';
  hoveredPiece?: string | null;
}

interface PuzzlePiece {
  id: string;
  position: [number, number, number];
  targetPosition: [number, number, number];
  rotation: [number, number, number];
  color: string;
  delay: number;
}

export function PuzzlePieces({ progress, qualityLevel = 'medium', hoveredPiece }: PuzzlePiecesProps) {
  const groupRef = useRef<THREE.Group>(null);
  const piecesRef = useRef<{ [key: string]: THREE.Mesh }>({});
  
  // Generate puzzle pieces based on quality level
  const pieces = useMemo(() => {
    const pieceCount = qualityLevel === 'low' ? 6 : qualityLevel === 'medium' ? 9 : 12;
    const colors = ['#00D4FF', '#1E40AF', '#3B82F6', '#0EA5E9', '#0284C7', '#0369A1'];
    
    const puzzlePieces: PuzzlePiece[] = [];
    
    for (let i = 0; i < pieceCount; i++) {
      const row = Math.floor(i / 3);
      const col = i % 3;
      
      puzzlePieces.push({
        id: `piece-${i}`,
        position: [
          (Math.random() - 0.5) * 8, // Scattered start position
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 4
        ],
        targetPosition: [
          (col - 1) * 1.2, // Grid formation
          (1 - row) * 1.2,
          0
        ],
        rotation: [
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2,
          Math.random() * Math.PI * 2
        ],
        color: colors[i % colors.length],
        delay: i * 0.1
      });
    }
    
    return puzzlePieces;
  }, [qualityLevel]);

  // Custom puzzle piece geometry
  const puzzleGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    
    // Create puzzle piece shape
    const size = 0.5;
    const knobSize = 0.15;
    
    // Main square
    shape.moveTo(-size, -size);
    shape.lineTo(size, -size);
    
    // Right knob
    shape.lineTo(size, -knobSize);
    shape.quadraticCurveTo(size + knobSize, -knobSize, size + knobSize, 0);
    shape.quadraticCurveTo(size + knobSize, knobSize, size, knobSize);
    shape.lineTo(size, size);
    
    // Top indentation
    shape.lineTo(knobSize, size);
    shape.quadraticCurveTo(knobSize, size - knobSize, 0, size - knobSize);
    shape.quadraticCurveTo(-knobSize, size - knobSize, -knobSize, size);
    shape.lineTo(-size, size);
    
    // Left side
    shape.lineTo(-size, knobSize);
    shape.quadraticCurveTo(-size - knobSize, knobSize, -size - knobSize, 0);
    shape.quadraticCurveTo(-size - knobSize, -knobSize, -size, -knobSize);
    shape.lineTo(-size, -size);
    
    const extrudeSettings = {
      depth: 0.1,
      bevelEnabled: true,
      bevelSegments: qualityLevel === 'low' ? 1 : 2,
      steps: 1,
      bevelSize: 0.02,
      bevelThickness: 0.02
    };
    
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, [qualityLevel]);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation of the entire puzzle
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
    
    // Animate individual pieces
    pieces.forEach((piece) => {
      const mesh = piecesRef.current[piece.id];
      if (!mesh) return;
      
      const pieceProgress = Math.max(0, Math.min(1, (progress - piece.delay) / 0.6));
      const isHovered = hoveredPiece === piece.id;
      
      // Interpolate position
      const currentPos = mesh.position;
      const targetPos = new THREE.Vector3(...piece.targetPosition);
      const startPos = new THREE.Vector3(...piece.position);
      
      currentPos.lerpVectors(startPos, targetPos, pieceProgress);
      
      // Rotation animation
      if (pieceProgress < 1) {
        mesh.rotation.x = piece.rotation[0] * (1 - pieceProgress);
        mesh.rotation.y = piece.rotation[1] * (1 - pieceProgress);
        mesh.rotation.z = piece.rotation[2] * (1 - pieceProgress);
      } else {
        // Gentle floating animation when in place
        mesh.rotation.y = Math.sin(state.clock.elapsedTime + piece.delay) * 0.1;
        mesh.position.y = piece.targetPosition[1] + Math.sin(state.clock.elapsedTime * 2 + piece.delay) * 0.05;
      }
      
      // Hover effect
      if (isHovered) {
        mesh.scale.setScalar(1.1);
        mesh.position.z = 0.2;
      } else {
        mesh.scale.setScalar(1);
        if (pieceProgress >= 1) {
          mesh.position.z = piece.targetPosition[2];
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      {pieces.map((piece) => (
        <mesh
          key={piece.id}
          ref={(ref) => {
            if (ref) piecesRef.current[piece.id] = ref;
          }}
          geometry={puzzleGeometry}
          position={piece.position}
          rotation={piece.rotation}
        >
          <meshStandardMaterial
            color={piece.color}
            metalness={0.1}
            roughness={0.3}
            emissive={hoveredPiece === piece.id ? piece.color : '#000000'}
            emissiveIntensity={hoveredPiece === piece.id ? 0.1 : 0}
          />
        </mesh>
      ))}
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.6}
        castShadow={qualityLevel !== 'low'}
      />
      <pointLight
        position={[0, 2, 2]}
        intensity={0.3}
        color="#00D4FF"
      />
    </group>
  );
}