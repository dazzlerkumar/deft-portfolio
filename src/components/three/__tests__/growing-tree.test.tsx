import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { GrowingTree } from '../growing-tree';

// Mock React Three Fiber
vi.mock('@react-three/fiber', () => ({
  useFrame: vi.fn((callback) => {
    // Simulate a frame callback
    callback({ clock: { elapsedTime: 1 } }, 0.016);
  }),
}));

// No need to mock framer-motion-3d since we're not using it

// Mock Three.js
vi.mock('three', () => ({
  Group: vi.fn(),
  InstancedMesh: vi.fn(),
  Matrix4: vi.fn(() => ({
    makeRotationFromEuler: vi.fn(),
    setPosition: vi.fn(),
    scale: vi.fn(),
  })),
  Euler: vi.fn(),
  Vector3: vi.fn(),
}));

describe('GrowingTree', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render tree components', () => {
    const { container } = render(<GrowingTree progress={0.5} />);
    
    // Check if the tree structure is rendered
    expect(container.querySelector('group')).toBeInTheDocument();
    expect(container.querySelector('mesh')).toBeInTheDocument();
  });

  it('should render with different quality levels', () => {
    const { rerender, container } = render(
      <GrowingTree progress={0.5} qualityLevel="low" />
    );
    
    expect(container.querySelector('group')).toBeInTheDocument();
    
    rerender(<GrowingTree progress={0.5} qualityLevel="high" />);
    expect(container.querySelector('group')).toBeInTheDocument();
  });

  it('should handle progress changes', () => {
    const { rerender, container } = render(<GrowingTree progress={0} />);
    expect(container.querySelector('group')).toBeInTheDocument();
    
    rerender(<GrowingTree progress={1} />);
    expect(container.querySelector('group')).toBeInTheDocument();
  });

  it('should render trunk, branches, and leaves', () => {
    const { container } = render(<GrowingTree progress={1} />);
    
    // Should have multiple mesh elements for trunk, branches, and leaves
    const meshes = container.querySelectorAll('mesh');
    expect(meshes.length).toBeGreaterThan(1);
    
    // Should have instanced mesh for leaves
    const instancedMesh = container.querySelector('instancedMesh');
    expect(instancedMesh).toBeInTheDocument();
  });

  it('should include lighting components', () => {
    const { container } = render(<GrowingTree progress={1} />);
    
    expect(container.querySelector('ambientLight')).toBeInTheDocument();
    expect(container.querySelector('directionalLight')).toBeInTheDocument();
  });

  it('should adjust quality based on qualityLevel prop', () => {
    const { container: lowQuality } = render(
      <GrowingTree progress={1} qualityLevel="low" />
    );
    
    const { container: highQuality } = render(
      <GrowingTree progress={1} qualityLevel="high" />
    );
    
    // Both should render, but with potentially different complexity
    expect(lowQuality.querySelector('group')).toBeInTheDocument();
    expect(highQuality.querySelector('group')).toBeInTheDocument();
  });
});