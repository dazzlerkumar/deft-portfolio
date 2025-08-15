/**
 * Magnetic Hover Effect Hook
 * Custom hook for creating magnetic hover effects on glass elements
 */

import { useRef, useState, useEffect, useCallback } from 'react';
import { useMotionValue, useSpring, useTransform } from 'framer-motion';

interface MagneticHoverOptions {
  /** Strength of the magnetic effect (0-1) */
  strength?: number;
  /** Spring configuration for smooth movement */
  springConfig?: {
    damping?: number;
    stiffness?: number;
  };
  /** Whether to enable the magnetic effect */
  enabled?: boolean;
  /** Maximum distance for magnetic effect */
  maxDistance?: number;
}

interface MagneticHoverReturn {
  /** Ref to attach to the magnetic element */
  ref: React.RefObject<HTMLElement>;
  /** Motion values for x and y transforms */
  motionValues: {
    x: any;
    y: any;
  };
  /** Whether the element is currently being hovered */
  isHovered: boolean;
  /** Mouse position relative to element center */
  mousePosition: { x: number; y: number };
}

/**
 * Custom hook for magnetic hover effects on glass elements
 */
export const useMagneticHover = (options: MagneticHoverOptions = {}): MagneticHoverReturn => {
  const {
    strength = 0.3,
    springConfig = { damping: 25, stiffness: 700 },
    enabled = true,
    maxDistance = 100,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Motion values for smooth magnetic movement
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for smooth movement
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  // Calculate magnetic effect based on mouse position
  const calculateMagneticEffect = useCallback((clientX: number, clientY: number) => {
    if (!ref.current || !enabled) return { x: 0, y: 0 };

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Only apply magnetic effect within maxDistance
    if (distance > maxDistance) {
      return { x: 0, y: 0 };
    }

    // Calculate magnetic strength based on distance (closer = stronger)
    const distanceStrength = Math.max(0, 1 - distance / maxDistance);
    const magneticX = deltaX * strength * distanceStrength;
    const magneticY = deltaY * strength * distanceStrength;

    return { x: magneticX, y: magneticY };
  }, [strength, enabled, maxDistance]);

  // Handle mouse movement
  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (!enabled) return;

    const { clientX, clientY } = event;
    const magneticEffect = calculateMagneticEffect(clientX, clientY);

    // Update motion values
    mouseX.set(magneticEffect.x);
    mouseY.set(magneticEffect.y);

    // Update mouse position state
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const relativeX = clientX - rect.left - rect.width / 2;
      const relativeY = clientY - rect.top - rect.height / 2;
      setMousePosition({ x: relativeX, y: relativeY });
    }
  }, [enabled, calculateMagneticEffect, mouseX, mouseY]);

  // Handle mouse enter
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  // Handle mouse leave
  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setMousePosition({ x: 0, y: 0 });
    
    // Reset magnetic effect
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

  // Set up event listeners
  useEffect(() => {
    const element = ref.current;
    if (!element || !enabled) return;

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enabled, handleMouseMove, handleMouseEnter, handleMouseLeave]);

  return {
    ref,
    motionValues: { x, y },
    isHovered,
    mousePosition,
  };
};

/**
 * Hook for global magnetic cursor effect
 */
export const useGlobalMagneticCursor = (strength: number = 0.1) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const x = useSpring(mouseX, { damping: 25, stiffness: 700 });
  const y = useSpring(mouseY, { damping: 25, stiffness: 700 });

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      const { innerWidth, innerHeight } = window;

      // Normalize mouse position (-1 to 1)
      const normalizedX = (clientX / innerWidth) * 2 - 1;
      const normalizedY = (clientY / innerHeight) * 2 - 1;

      setMousePosition({ x: clientX, y: clientY });
      mouseX.set(normalizedX * strength * 50);
      mouseY.set(normalizedY * strength * 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [strength, mouseX, mouseY]);

  return {
    mousePosition,
    motionValues: { x, y },
  };
};

/**
 * Hook for scroll-based glass morphing
 */
export const useScrollGlassMorph = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollY = useMotionValue(0);

  // Transform scroll progress to glass properties
  const blurIntensity = useTransform(scrollY, [0, 300], [16, 32]);
  const opacity = useTransform(scrollY, [0, 300], [0.05, 0.15]);
  const saturation = useTransform(scrollY, [0, 300], [150, 200]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const maxScroll = 300;
      const progress = Math.min(currentScrollY / maxScroll, 1);
      
      setScrollProgress(progress);
      scrollY.set(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollY]);

  return {
    scrollProgress,
    glassProperties: {
      blurIntensity,
      opacity,
      saturation,
    },
    motionValues: {
      scrollY,
    },
  };
};

export default useMagneticHover;