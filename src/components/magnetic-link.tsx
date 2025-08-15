"use client";

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface MagneticLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export default function MagneticLink({ 
  href, 
  children, 
  className = "",
  strength = 0.3 
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Enhanced magnetic effect with distance-based strength
    const distance = Math.sqrt(
      Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
    );
    const maxDistance = 100;
    const magneticStrength = Math.max(0, 1 - distance / maxDistance) * strength * 2;
    
    const deltaX = (e.clientX - centerX) * magneticStrength;
    const deltaY = (e.clientY - centerY) * magneticStrength;
    
    setPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      className="relative inline-block"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <Link
        ref={ref}
        href={href}
        className={`relative inline-block ${className}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.span
          className="relative z-10 inline-block"
          animate={{ x: position.x, y: position.y }}
          transition={{ 
            type: "spring", 
            stiffness: 150, 
            damping: 15,
            mass: 0.1,
          }}
        >
          {children}
        </motion.span>
        
        {/* Enhanced magnetic glow effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-blue-500/30 to-accent-emerald-500/30 blur-xl"
          animate={{ 
            x: position.x * 0.3, 
            y: position.y * 0.3,
            scale: position.x !== 0 || position.y !== 0 ? 1.5 : 0,
            opacity: position.x !== 0 || position.y !== 0 ? 1 : 0,
          }}
          transition={{ 
            type: "spring", 
            stiffness: 150, 
            damping: 25,
          }}
        />
        
        {/* Secondary glow layer */}
        <motion.div
          className="absolute inset-0 rounded-full bg-white/10 blur-md"
          animate={{ 
            x: position.x * 0.7, 
            y: position.y * 0.7,
            scale: position.x !== 0 || position.y !== 0 ? 1.3 : 0,
          }}
          transition={{ 
            type: "spring", 
            stiffness: 200, 
            damping: 30,
          }}
        />
        
        {/* Hover background with enhanced glass effect */}
        <motion.div
          className="absolute inset-0 rounded-full bg-white/8 backdrop-blur-md border border-white/20"
          initial={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1, opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </Link>
    </motion.div>
  );
}