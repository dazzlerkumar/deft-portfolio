/**
 * GlassStagger Component
 * Container for staggered glass element animations with 100ms delays
 */

'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { glassStaggerContainer, glassStaggerItem } from '@/utils/glass-animations';

interface GlassStaggerProps {
  /** Children elements to animate */
  children: React.ReactNode;
  /** Stagger delay between children (in seconds) */
  staggerDelay?: number;
  /** Initial delay before starting animations */
  initialDelay?: number;
  /** Custom container className */
  className?: string;
  /** Whether to trigger animation on scroll into view */
  triggerOnScroll?: boolean;
  /** Scroll threshold for triggering animation */
  scrollThreshold?: number;
  /** Custom animation variants for container */
  containerVariants?: any;
  /** Custom animation variants for items */
  itemVariants?: any;
}

/**
 * Container component for staggered glass animations with 100ms delays between elements
 */
export const GlassStagger: React.FC<GlassStaggerProps> = ({
  children,
  staggerDelay = 0.1, // 100ms as specified in requirements
  initialDelay = 0.2,
  className = '',
  triggerOnScroll = true,
  scrollThreshold = 0.2,
  containerVariants = glassStaggerContainer,
  itemVariants = glassStaggerItem,
}) => {
  // Create custom container variants with specified delays
  const customContainerVariants = {
    ...containerVariants,
    visible: {
      ...containerVariants.visible,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      },
    },
  };

  return (
    <motion.div
      className={`glass-stagger-container ${className}`.trim()}
      variants={customContainerVariants}
      initial="hidden"
      animate={triggerOnScroll ? undefined : "visible"}
      whileInView={triggerOnScroll ? "visible" : undefined}
      viewport={triggerOnScroll ? { once: true, amount: scrollThreshold } : undefined}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="glass-stagger-item"
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

/**
 * Individual stagger item component for more control
 */
export const GlassStaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  variants?: any;
}> = ({
  children,
  className = '',
  variants = glassStaggerItem,
}) => {
  return (
    <motion.div
      className={`glass-stagger-item ${className}`.trim()}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};

export default GlassStagger;