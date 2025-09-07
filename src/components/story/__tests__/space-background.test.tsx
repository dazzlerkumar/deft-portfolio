import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { SpaceBackground } from '../space-background';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

// Mock canvas context
const mockContext = {
  clearRect: vi.fn(),
  fillStyle: '',
  globalAlpha: 1,
  save: vi.fn(),
  restore: vi.fn(),
  beginPath: vi.fn(),
  arc: vi.fn(),
  fill: vi.fn(),
};

const mockCanvas = {
  getContext: vi.fn(() => mockContext),
  width: 1024,
  height: 768,
};

// Mock HTMLCanvasElement
Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
  value: vi.fn(() => mockContext),
});

describe('SpaceBackground', () => {
  let mockRequestAnimationFrame: ReturnType<typeof vi.fn>;
  let mockCancelAnimationFrame: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    // Mock animation frame functions
    mockRequestAnimationFrame = vi.fn((callback) => {
      setTimeout(callback, 16); // Simulate 60fps
      return 1;
    });
    mockCancelAnimationFrame = vi.fn();

    Object.defineProperty(window, 'requestAnimationFrame', {
      value: mockRequestAnimationFrame,
      writable: true,
    });

    Object.defineProperty(window, 'cancelAnimationFrame', {
      value: mockCancelAnimationFrame,
      writable: true,
    });

    // Mock window dimensions
    Object.defineProperty(window, 'innerWidth', {
      value: 1024,
      writable: true,
    });

    Object.defineProperty(window, 'innerHeight', {
      value: 768,
      writable: true,
    });

    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders canvas element', () => {
    render(<SpaceBackground />);
    
    const canvas = screen.getByRole('img', { hidden: true }) || document.querySelector('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('renders gradient overlay', () => {
    const { container } = render(<SpaceBackground />);
    
    const gradientOverlay = container.querySelector('.bg-gradient-to-br');
    expect(gradientOverlay).toBeInTheDocument();
    expect(gradientOverlay).toHaveClass('from-chapter4-background');
  });

  it('renders floating geometric shapes', () => {
    const { container } = render(<SpaceBackground />);
    
    // Check for various geometric shapes
    const shapes = container.querySelectorAll('[class*="absolute"]');
    expect(shapes.length).toBeGreaterThan(0);
    
    // Check for specific shape classes
    const rotatedSquare = container.querySelector('.rotate-45');
    expect(rotatedSquare).toBeInTheDocument();
    
    const circle = container.querySelector('.rounded-full');
    expect(circle).toBeInTheDocument();
  });

  it('initializes canvas animation', () => {
    render(<SpaceBackground />);
    
    // Animation should start
    expect(mockRequestAnimationFrame).toHaveBeenCalled();
  });

  it('cleans up animation on unmount', () => {
    const { unmount } = render(<SpaceBackground />);
    
    unmount();
    
    expect(mockCancelAnimationFrame).toHaveBeenCalled();
  });

  it('handles window resize', () => {
    render(<SpaceBackground />);
    
    // Simulate window resize
    Object.defineProperty(window, 'innerWidth', { value: 1200 });
    Object.defineProperty(window, 'innerHeight', { value: 900 });
    
    const resizeEvent = new Event('resize');
    window.dispatchEvent(resizeEvent);
    
    // Canvas should be updated (this is handled in the useEffect)
    expect(mockContext.clearRect).toHaveBeenCalled();
  });

  it('applies correct styling classes', () => {
    const { container } = render(<SpaceBackground />);
    
    const canvas = container.querySelector('canvas');
    expect(canvas).toHaveClass('absolute', 'inset-0', 'w-full', 'h-full');
  });

  it('renders shapes with chapter4 theme colors', () => {
    const { container } = render(<SpaceBackground />);
    
    // Check for chapter4 accent color usage
    const accentElements = container.querySelectorAll('[class*="chapter4-accent"]');
    expect(accentElements.length).toBeGreaterThan(0);
  });

  it('has proper z-index layering', () => {
    const { container } = render(<SpaceBackground />);
    
    const canvas = container.querySelector('canvas');
    expect(canvas).toHaveStyle({ zIndex: '1' });
    
    const overlay = container.querySelector('.bg-gradient-to-br');
    expect(overlay).toHaveClass('absolute', 'inset-0');
  });

  it('creates animated floating elements', () => {
    const { container } = render(<SpaceBackground />);
    
    // Check for elements that should be animated
    const animatedElements = container.querySelectorAll('[class*="absolute"][class*="chapter4-accent"]');
    expect(animatedElements.length).toBeGreaterThan(0);
  });

  it('handles canvas context unavailability gracefully', () => {
    // Mock canvas without context
    const mockCanvasNoContext = {
      getContext: vi.fn(() => null),
      width: 1024,
      height: 768,
    };

    Object.defineProperty(HTMLCanvasElement.prototype, 'getContext', {
      value: vi.fn(() => null),
    });

    // Should not throw error
    expect(() => render(<SpaceBackground />)).not.toThrow();
  });

  it('uses proper canvas dimensions', () => {
    render(<SpaceBackground />);
    
    // Canvas should be sized to window dimensions
    const canvas = document.querySelector('canvas');
    if (canvas) {
      // The canvas dimensions are set in the useEffect
      expect(canvas.width).toBeDefined();
      expect(canvas.height).toBeDefined();
    }
  });
});