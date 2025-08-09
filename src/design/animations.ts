/**
 * Framer Motion Animation Presets and Variants
 * Reusable animation configurations for consistent motion design
 */

import { Variants, Transition } from 'framer-motion';

// Custom easing curves
export const easings = {
  spring: { type: 'spring', stiffness: 100, damping: 15 },
  springBouncy: { type: 'spring', stiffness: 400, damping: 17 },
  springSmooth: { type: 'spring', stiffness: 300, damping: 30 },
  easeOut: [0.0, 0.0, 0.2, 1],
  easeIn: [0.4, 0.0, 1, 1],
  easeInOut: [0.4, 0.0, 0.2, 1],
  easeSpring: [0.175, 0.885, 0.32, 1.275],
  easeBounce: [0.68, -0.55, 0.265, 1.55],
} as const;

// Base transition configurations
export const transitions: Record<string, Transition> = {
  fast: { duration: 0.3, ease: easings.easeOut },
  medium: { duration: 0.6, ease: easings.easeOut },
  slow: { duration: 1.2, ease: easings.easeOut },
  spring: easings.spring,
  springBouncy: easings.springBouncy,
  springSmooth: easings.springSmooth,
};

// Entrance animations
export const entranceVariants: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: transitions.medium,
    },
  },
  
  fadeInUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: transitions.medium,
    },
  },
  
  fadeInDown: {
    hidden: { opacity: 0, y: -30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: transitions.medium,
    },
  },
  
  fadeInLeft: {
    hidden: { opacity: 0, x: -30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: transitions.medium,
    },
  },
  
  fadeInRight: {
    hidden: { opacity: 0, x: 30 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: transitions.medium,
    },
  },
  
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: transitions.spring,
    },
  },
  
  slideInUp: {
    hidden: { y: '100%', opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: transitions.springSmooth,
    },
  },
  
  slideInDown: {
    hidden: { y: '-100%', opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: transitions.springSmooth,
    },
  },
};

// Text animation variants
export const textVariants: Record<string, Variants> = {
  // Character-by-character reveal
  textReveal: {
    hidden: { opacity: 0, y: 20, filter: 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { duration: 0.6, ease: easings.easeOut },
    },
  },
  
  // Word-by-word reveal
  wordReveal: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: easings.easeOut },
    },
  },
  
  // Typing effect
  typing: {
    hidden: { width: 0 },
    visible: { 
      width: 'auto',
      transition: { duration: 2, ease: 'linear' },
    },
  },
  
  // Gradient text animation
  gradientShift: {
    animate: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      transition: {
        duration: 3,
        ease: 'linear',
        repeat: Infinity,
      },
    },
  },
};

// Stagger animation containers
export const staggerVariants: Record<string, Variants> = {
  container: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  },
  
  fastStagger: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  },
  
  slowStagger: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  },
  
  item: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: transitions.medium,
    },
  },
};

// Hover and interaction variants
export const interactionVariants: Record<string, Variants> = {
  button: {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: transitions.fast,
    },
    tap: { 
      scale: 0.95,
      transition: transitions.fast,
    },
  },
  
  card: {
    rest: { 
      scale: 1,
      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    },
    hover: { 
      scale: 1.02,
      boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      transition: transitions.medium,
    },
  },
  
  magnetic: {
    rest: { x: 0, y: 0 },
    hover: { 
      x: 0, 
      y: 0,
      transition: transitions.springSmooth,
    },
  },
  
  float: {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        ease: 'easeInOut',
        repeat: Infinity,
      },
    },
  },
  
  pulse: {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        ease: 'easeInOut',
        repeat: Infinity,
      },
    },
  },
  
  glow: {
    animate: {
      boxShadow: [
        '0 0 20px rgba(59, 130, 246, 0.3)',
        '0 0 30px rgba(59, 130, 246, 0.6)',
        '0 0 20px rgba(59, 130, 246, 0.3)',
      ],
      transition: {
        duration: 2,
        ease: 'easeInOut',
        repeat: Infinity,
      },
    },
  },
};

// Scroll-triggered animation variants
export const scrollVariants: Record<string, Variants> = {
  revealUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: easings.easeOut },
    },
  },
  
  revealDown: {
    hidden: { opacity: 0, y: -50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: easings.easeOut },
    },
  },
  
  revealLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: easings.easeOut },
    },
  },
  
  revealRight: {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8, ease: easings.easeOut },
    },
  },
  
  parallax: {
    animate: {
      y: [0, -50],
      transition: {
        duration: 1,
        ease: 'linear',
      },
    },
  },
};

// Page transition variants
export const pageVariants: Record<string, Variants> = {
  slideLeft: {
    initial: { x: '100%', opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: transitions.medium,
    },
    exit: { 
      x: '-100%', 
      opacity: 0,
      transition: transitions.medium,
    },
  },
  
  slideRight: {
    initial: { x: '-100%', opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: transitions.medium,
    },
    exit: { 
      x: '100%', 
      opacity: 0,
      transition: transitions.medium,
    },
  },
  
  fade: {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: transitions.medium,
    },
    exit: { 
      opacity: 0,
      transition: transitions.fast,
    },
  },
  
  scale: {
    initial: { scale: 0.9, opacity: 0 },
    animate: { 
      scale: 1, 
      opacity: 1,
      transition: transitions.spring,
    },
    exit: { 
      scale: 0.9, 
      opacity: 0,
      transition: transitions.fast,
    },
  },
};

// Loading animation variants
export const loadingVariants: Record<string, Variants> = {
  spinner: {
    animate: {
      rotate: 360,
      transition: {
        duration: 1,
        ease: 'linear',
        repeat: Infinity,
      },
    },
  },
  
  dots: {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [1, 0.5, 1],
      transition: {
        duration: 1.5,
        ease: 'easeInOut',
        repeat: Infinity,
      },
    },
  },
  
  skeleton: {
    animate: {
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        ease: 'easeInOut',
        repeat: Infinity,
      },
    },
  },
  
  progress: {
    animate: {
      x: ['-100%', '100%'],
      transition: {
        duration: 1.5,
        ease: 'easeInOut',
        repeat: Infinity,
      },
    },
  },
};

// Utility functions for creating custom variants
export const createStaggerVariant = (
  staggerDelay: number = 0.1,
  childDelay: number = 0.2
): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: staggerDelay,
      delayChildren: childDelay,
    },
  },
});

export const createFadeVariant = (
  direction: 'up' | 'down' | 'left' | 'right' | 'none' = 'none',
  distance: number = 30,
  duration: number = 0.6
): Variants => {
  const getInitialTransform = () => {
    switch (direction) {
      case 'up': return { y: distance };
      case 'down': return { y: -distance };
      case 'left': return { x: -distance };
      case 'right': return { x: distance };
      default: return {};
    }
  };

  return {
    hidden: { opacity: 0, ...getInitialTransform() },
    visible: { 
      opacity: 1, 
      x: 0, 
      y: 0,
      transition: { duration, ease: easings.easeOut },
    },
  };
};

export const createHoverVariant = (
  scale: number = 1.05,
  duration: number = 0.3
): Variants => ({
  rest: { scale: 1 },
  hover: { 
    scale,
    transition: { duration, ease: easings.easeOut },
  },
});

// Export all variants as a single object for easy importing
export const motionVariants = {
  entrance: entranceVariants,
  text: textVariants,
  stagger: staggerVariants,
  interaction: interactionVariants,
  scroll: scrollVariants,
  page: pageVariants,
  loading: loadingVariants,
};