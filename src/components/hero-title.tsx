"use client";

import React from 'react';
import { motion } from 'framer-motion';
// Removed unused imports

interface HeroTitleProps {
  text: string;
  className?: string;
}

export default function HeroTitle({ text, className = "" }: HeroTitleProps) {
  const letters = text.split('');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Faster stagger for more dynamic effect
        delayChildren: 0.3,    // Reduced delay for quicker start
      },
    },
  };

  const letterVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      rotateX: -90,
      rotateY: 45,
      scale: 0.3,
      filter: 'blur(15px)',
    },
    visible: { 
      opacity: 1, 
      y: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 1.0,
        ease: [0.175, 0.885, 0.32, 1.275] as [number, number, number, number],
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      y: -5,
      rotateY: 15,
      scale: 1.05,
      textShadow: "0 0 20px rgba(59, 130, 246, 0.8)",
      transition: {
        duration: 0.3,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <motion.h1
      className={`perspective-1000 ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          className={`inline-block preserve-3d cursor-default hero-letter-${index}`}
          style={{ transformOrigin: '50% 50% -50px' }}
          whileHover="hover"
          onHoverStart={() => {
            // Add subtle glow effect to adjacent letters
            const adjacentElements = document.querySelectorAll(`.hero-letter-${index - 1}, .hero-letter-${index + 1}`);
            adjacentElements.forEach(el => {
              (el as HTMLElement).style.textShadow = "0 0 10px rgba(59, 130, 246, 0.4)";
            });
          }}
          onHoverEnd={() => {
            // Remove glow effect from adjacent letters
            const adjacentElements = document.querySelectorAll(`.hero-letter-${index - 1}, .hero-letter-${index + 1}`);
            adjacentElements.forEach(el => {
              (el as HTMLElement).style.textShadow = "none";
            });
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.h1>
  );
}