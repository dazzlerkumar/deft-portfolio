"use client";

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface Network3DProps {
  progress: number; // 0 to 1
  qualityLevel?: 'low' | 'medium' | 'high';
  activeNode?: string | null;
}

interface NetworkNode {
  id: string;
  position: [number, number, number];
  size: number;
  color: string;
  connections: string[];
  label: string;
}

export function Network3D({ progress, qualityLevel = 'medium', activeNode }: Network3DProps) {
  const groupRef = useRef<THREE.Group>(null);
  const nodesRef = useRef<{ [key: string]: THREE.Mesh }>({});
  const connectionsRef = useRef<THREE.LineSegments>(null);
  
  // Generate network structure
  const networkData = useMemo(() => {
    const nodes: NetworkNode[] = [
      {
        id: 'leader',
        position: [0, 0, 0],
        size: 0.3,
        color: '#6B46C1',
        connections: ['dev1', 'dev2', 'dev3', 'designer'],
        label: 'Tech Lead'
      },
      {
        id: 'dev1',
        position: [-2, 1, -1],
        size: 0.2,
        color: '#8B5CF6',
        connections: ['dev2', 'qa1'],
        label: 'Senior Dev'
      },
      {
        id: 'dev2',
        position: [2, 1, -1],
        size: 0.2,
        color: '#8B5CF6',
        connections: ['dev3', 'qa2'],
        label: 'Senior Dev'
      },
      {
        id: 'dev3',
        position: [0, -2, 1],
        size: 0.2,
        color: '#8B5CF6',
        connections: ['designer'],
        label: 'Mid Dev'
      },
      {
        id: 'designer',
        position: [-1.5, -1, 1.5],
        size: 0.18,
        color: '#F59E0B',
        connections: ['qa1'],
        label: 'Designer'
      },
      {
        id: 'qa1',
        position: [1.5, -1, 1.5],
        size: 0.15,
        color: '#10B981',
        connections: ['qa2'],
        label: 'QA Lead'
      },
      {
        id: 'qa2',
        position: [2.5, 0, 0.5],
        size: 0.12,
        color: '#10B981',
        connections: [],
        label: 'QA Tester'
      }
    ];
    
    // Generate connection lines
    const connections: THREE.Vector3[] = [];
    nodes.forEach(node => {
      node.connections.forEach(connectionId => {
        const targetNode = nodes.find(n => n.id === connectionId);
        if (targetNode) {
          connections.push(new THREE.Vector3(...node.position));
          connections.push(new THREE.Vector3(...targetNode.position));
        }
      });
    });
    
    return { nodes, connections };
  }, []);

  // Create connection geometry
  const connectionGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(networkData.connections.length * 3);
    
    networkData.connections.forEach((point, i) => {
      positions[i * 3] = point.x;
      positions[i * 3 + 1] = point.y;
      positions[i * 3 + 2] = point.z;
    });
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [networkData.connections]);

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle rotation of the entire network
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
    
    // Animate nodes
    networkData.nodes.forEach((node, index) => {
      const mesh = nodesRef.current[node.id];
      if (!mesh) return;
      
      const nodeProgress = Math.max(0, Math.min(1, (progress - index * 0.1) / 0.5));
      const isActive = activeNode === node.id;
      
      // Scale animation
      const baseScale = nodeProgress * node.size;
      const pulseScale = isActive ? 1 + Math.sin(state.clock.elapsedTime * 4) * 0.2 : 1;
      mesh.scale.setScalar(baseScale * pulseScale);
      
      // Floating animation
      const originalY = node.position[1];
      mesh.position.y = originalY + Math.sin(state.clock.elapsedTime * 2 + index) * 0.1;
      
      // Glow effect for active node
      if (mesh.material instanceof THREE.MeshStandardMaterial) {
        mesh.material.emissiveIntensity = isActive ? 0.3 : 0.1;
      }
    });
    
    // Animate connections
    if (connectionsRef.current && connectionsRef.current.material instanceof THREE.LineBasicMaterial) {
      connectionsRef.current.material.opacity = progress * 0.6;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Network Nodes */}
      {networkData.nodes.map((node, index) => (
        <mesh
          key={node.id}
          ref={(ref) => {
            if (ref) nodesRef.current[node.id] = ref;
          }}
          position={node.position}
        >
          <sphereGeometry args={[1, qualityLevel === 'low' ? 8 : 16, qualityLevel === 'low' ? 6 : 12]} />
          <meshStandardMaterial
            color={node.color}
            metalness={0.2}
            roughness={0.3}
            emissive={node.color}
            emissiveIntensity={activeNode === node.id ? 0.3 : 0.1}
          />
        </mesh>
      ))}
      
      {/* Network Connections */}
      <lineSegments ref={connectionsRef} geometry={connectionGeometry}>
        <lineBasicMaterial
          color="#6B46C1"
          opacity={0.4}
          transparent
          linewidth={2}
        />
      </lineSegments>
      
      {/* Particle effects for high quality */}
      {qualityLevel === 'high' && (
        <NetworkParticles progress={progress} />
      )}
      
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.6}
        color="#FFFFFF"
      />
      <pointLight
        position={[0, 0, 3]}
        intensity={0.4}
        color="#6B46C1"
      />
    </group>
  );
}

// Particle system for enhanced visual effects
function NetworkParticles({ progress }: { progress: number }) {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const particleCount = 100;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      
      if (particlesRef.current.material instanceof THREE.PointsMaterial) {
        particlesRef.current.material.opacity = progress * 0.3;
      }
    }
  });
  
  return (
    <points ref={particlesRef} geometry={particleGeometry}>
      <pointsMaterial
        color="#8B5CF6"
        size={0.02}
        transparent
        opacity={0.3}
      />
    </points>
  );
}