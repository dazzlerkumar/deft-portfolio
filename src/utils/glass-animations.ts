/**
 * Glass Morphing Animations and Interactions
 * Enhanced animation utilities for glass components with cubic-bezier easing
 */

import { Variants, Transition } from 'framer-motion';

// Enhanced cubic-bezier easing curves for glass morphing
export const glassEasing = {
  // 300ms cubic-bezier easing as specified in requirements
  morphing: [0.175, 0.885, 0.32, 1.275] as const,
  smooth: [0.25, 0.46, 0.45, 0.94] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  elastic: [0.68, -0.6, 0.32, 1.6] as const,
} as const;

// Glass morphing transition configurations
export const glassTransitions: Record<string, Transition> = {
  // Standard 300ms hover transition
  hover: {
    duration: 0.3,
    ease: glassEasing.morphing,
  },
  
  // Fast interactions
  fast: {
    duration: 0.2,
    ease: glassEasing.smooth,
  },
  
  // Smooth morphing
  morph: {
    duration: 0.4,
    ease: glassEasing.morphing,
  },
  
  // Bounce effect
  bounce: {
    duration: 0.5,
    ease: glassEasing.bounce,
  },
  
  // Elastic effect
  elastic: {
    duration: 0.6,
    ease: glassEasing.elastic,
  },
  
  // Staggered entrance (100ms delays)
  stagger: {
    duration: 0.6,
    ease: glassEasing.smooth,
  },
};

// Glass panel lift effects with scale and shadow changes
export const glassLiftVariants: Variants = {
  rest: {
    scale: 1,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
  },
  hover: {
    scale: 1.02,
    y: -4,
    rotateX: 2,
    rotateY: 2,
    boxShadow: '0 20px 48px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
    transition: glassTransitions.hover,
  },
  tap: {
    scale: 0.98,
    y: -2,
    transition: glassTransitions.fast,
  },
};

// Enhanced glass morphing variants with different intensities
export const glassMorphVariants: Record<string, Variants> = {
  subtle: {
    rest: {
      scale: 1,
      backdropFilter: 'blur(20px) saturate(180%)',
      background: 'rgba(255, 255, 255, 0.08)',
    },
    hover: {
      scale: 1.01,
      backdropFilter: 'blur(22px) saturate(190%)',
      background: 'rgba(255, 255, 255, 0.1)',
      transition: glassTransitions.hover,
    },
  },
  
  medium: {
    rest: {
      scale: 1,
      backdropFilter: 'blur(20px) saturate(180%)',
      background: 'rgba(255, 255, 255, 0.08)',
    },
    hover: {
      scale: 1.02,
      backdropFilter: 'blur(25px) saturate(200%)',
      background: 'rgba(255, 255, 255, 0.12)',
      transition: glassTransitions.hover,
    },
  },
  
  strong: {
    rest: {
      scale: 1,
      backdropFilter: 'blur(20px) saturate(180%)',
      background: 'rgba(255, 255, 255, 0.08)',
    },
    hover: {
      scale: 1.05,
      backdropFilter: 'blur(30px) saturate(220%)',
      background: 'rgba(255, 255, 255, 0.15)',
      transition: glassTransitions.hover,
    },
  },
};

// Scroll-based glass panel fade-in with increasing blur effects
export const glassScrollVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    scale: 0.9,
    backdropFilter: 'blur(0px) saturate(100%)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    backdropFilter: 'blur(20px) saturate(180%)',
    transition: {
      duration: 0.8,
      ease: glassEasing.smooth,
    },
  },
};

// Staggered entrance animations with 100ms delays between elements
export const glassStaggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1, // 100ms delays as specified
      delayChildren: 0.2,
    },
  },
};

export const glassStaggerItem: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9,
    backdropFilter: 'blur(0px) saturate(100%)',
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    backdropFilter: 'blur(20px) saturate(180%)',
    transition: glassTransitions.stagger,
  },
};

// Magnetic hover effects for interactive glass elements
export const createMagneticVariants = (strength: number = 0.3): Variants => ({
  rest: {
    x: 0,
    y: 0,
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: glassTransitions.hover,
  },
});

// Page transition effects with glass element morphing
export const glassPageVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.95,
    backdropFilter: 'blur(0px) saturate(100%)',
  },
  animate: {
    opacity: 1,
    scale: 1,
    backdropFilter: 'blur(20px) saturate(180%)',
    transition: {
      duration: 0.6,
      ease: glassEasing.smooth,
    },
  },
  exit: {
    opacity: 0,
    scale: 1.05,
    backdropFilter: 'blur(40px) saturate(220%)',
    transition: {
      duration: 0.4,
      ease: glassEasing.smooth,
    },
  },
};

// Glass button morphing animations
export const glassButtonVariants: Variants = {
  rest: {
    scale: 1,
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
  },
  hover: {
    scale: 1.05,
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
    transition: glassTransitions.hover,
  },
  tap: {
    scale: 0.95,
    transition: glassTransitions.fast,
  },
};

// Glass card morphing with enhanced shadow effects
export const glassCardVariants: Variants = {
  rest: {
    scale: 1,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  },
  hover: {
    scale: 1.02,
    y: -6,
    rotateX: 3,
    rotateY: 3,
    boxShadow: '0 24px 48px rgba(0, 0, 0, 0.15)',
    transition: glassTransitions.hover,
  },
};

// Glass navigation morphing based on scroll
export const glassNavVariants: Variants = {
  transparent: {
    backdropFilter: 'blur(16px) saturate(150%)',
    background: 'rgba(255, 255, 255, 0.05)',
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  opaque: {
    backdropFilter: 'blur(32px) saturate(200%)',
    background: 'rgba(255, 255, 255, 0.15)',
    borderColor: 'rgba(255, 255, 255, 0.3)',
    transition: glassTransitions.morph,
  },
};

// Utility functions for glass animations

/**
 * Creates a magnetic hover effect based on mouse position
 */
export const createMagneticEffect = (
  mouseX: number,
  mouseY: number,
  elementRect: DOMRect,
  strength: number = 0.3
) => {
  const centerX = elementRect.left + elementRect.width / 2;
  const centerY = elementRect.top + elementRect.height / 2;
  
  const deltaX = (mouseX - centerX) * strength;
  const deltaY = (mouseY - centerY) * strength;
  
  return {
    x: deltaX,
    y: deltaY,
  };
};

/**
 * Creates scroll-based blur intensity
 */
export const createScrollBlur = (scrollProgress: number, minBlur: number = 16, maxBlur: number = 32) => {
  const blurValue = minBlur + (maxBlur - minBlur) * scrollProgress;
  return `blur(${blurValue}px) saturate(${150 + scrollProgress * 50}%)`;
};

/**
 * Creates staggered animation delays
 */
export const createStaggerDelay = (index: number, baseDelay: number = 0.1) => {
  return index * baseDelay;
};

/**
 * Glass morphing keyframes for CSS animations
 */
export const glassKeyframes = {
  // Breathing animation for idle states
  breathing: {
    '0%, 100%': {
      backdropFilter: 'blur(20px) saturate(180%)',
      transform: 'scale(1)',
    },
    '50%': {
      backdropFilter: 'blur(24px) saturate(200%)',
      transform: 'scale(1.005)',
    },
  },
  
  // Liquid morphing animation
  liquidMorph: {
    '0%': {
      transform: 'scale(1) rotate(0deg)',
      borderRadius: '16px',
    },
    '25%': {
      transform: 'scale(1.02) rotate(0.5deg)',
      borderRadius: '20px',
    },
    '50%': {
      transform: 'scale(1.05) rotate(0deg)',
      borderRadius: '12px',
    },
    '75%': {
      transform: 'scale(1.02) rotate(-0.5deg)',
      borderRadius: '18px',
    },
    '100%': {
      transform: 'scale(1) rotate(0deg)',
      borderRadius: '16px',
    },
  },
  
  // Shimmer effect for glass surfaces
  shimmer: {
    '0%': {
      transform: 'translateX(-100%)',
    },
    '100%': {
      transform: 'translateX(100%)',
    },
  },
  
  // Glow pulse for interactive elements
  glowPulse: {
    '0%, 100%': {
      boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
      opacity: 0.6,
    },
    '50%': {
      boxShadow: '0 0 30px rgba(59, 130, 246, 0.6)',
      opacity: 1,
    },
  },
};

/**
 * CSS-in-JS styles for glass animations
 */
export const glassAnimationStyles = {
  // Hardware acceleration
  accelerated: {
    willChange: 'transform, backdrop-filter, background',
    transform: 'translateZ(0)',
  },
  
  // Smooth transitions
  smoothTransition: {
    transition: 'all 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
  
  // Hover lift effect
  hoverLift: {
    '&:hover': {
      transform: 'translateY(-4px) scale(1.02)',
      boxShadow: '0 20px 48px rgba(0, 0, 0, 0.15)',
    },
  },
  
  // Magnetic effect container
  magnetic: {
    position: 'relative',
    cursor: 'pointer',
    transition: 'transform 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  },
};

export default {
  glassEasing,
  glassTransitions,
  glassLiftVariants,
  glassMorphVariants,
  glassScrollVariants,
  glassStaggerContainer,
  glassStaggerItem,
  createMagneticVariants,
  glassPageVariants,
  glassButtonVariants,
  glassCardVariants,
  glassNavVariants,
  createMagneticEffect,
  createScrollBlur,
  createStaggerDelay,
  glassKeyframes,
  glassAnimationStyles,
};