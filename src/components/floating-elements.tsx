"use client";

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
  shape: 'circle' | 'square' | 'triangle';
  color: string;
  speed: number;
}

export default function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([]);
  const { scrollY } = useScroll();

  // Generate floating elements on mount
  useEffect(() => {
    const shapes: FloatingElement['shape'][] = ['circle', 'square', 'triangle'];
    const colors = [
      'rgba(59, 130, 246, 0.1)', // blue
      'rgba(16, 185, 129, 0.1)', // emerald
      'rgba(255, 255, 255, 0.05)', // white
    ];

    const newElements: FloatingElement[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 80 + 30, // Larger elements
      rotation: Math.random() * 360,
      shape: shapes[Math.floor(Math.random() * shapes.length)],
      color: colors[Math.floor(Math.random() * colors.length)],
      speed: Math.random() * 0.8 + 0.3, // More varied speeds
    }));

    setElements(newElements);
  }, []);

  const renderShape = (element: FloatingElement) => {
    const baseClasses = "absolute opacity-30 backdrop-blur-sm";
    
    switch (element.shape) {
      case 'circle':
        return (
          <div
            className={`${baseClasses} rounded-full border border-white/10`}
            style={{
              width: element.size,
              height: element.size,
              background: element.color,
            }}
          />
        );
      case 'square':
        return (
          <div
            className={`${baseClasses} border border-white/10`}
            style={{
              width: element.size,
              height: element.size,
              background: element.color,
              borderRadius: '8px',
            }}
          />
        );
      case 'triangle':
        return (
          <div
            className={`${baseClasses}`}
            style={{
              width: 0,
              height: 0,
              borderLeft: `${element.size / 2}px solid transparent`,
              borderRight: `${element.size / 2}px solid transparent`,
              borderBottom: `${element.size}px solid ${element.color}`,
              filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.1))',
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((element) => (
        <FloatingElement key={element.id} element={element} scrollY={scrollY} renderShape={renderShape} />
      ))}
    </div>
  );
}

// Separate component to handle individual floating elements
function FloatingElement({ 
  element, 
  scrollY, 
  renderShape 
}: { 
  element: FloatingElement; 
  scrollY: import('framer-motion').MotionValue<number>; 
  renderShape: (element: FloatingElement) => React.ReactNode;
}) {
  // Now we can safely use hooks here
  const y = useTransform(scrollY, [0, 1000], [0, -element.speed * 200]);
  const rotate = useTransform(scrollY, [0, 1000], [element.rotation, element.rotation + 180]);
  const opacity = useTransform(scrollY, [0, 300, 600], [0.4, 0.7, 0.1]);

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{
        left: `${element.x}%`,
        top: `${element.y}%`,
        y,
        rotate,
        opacity,
      }}
      initial={{ 
        scale: 0,
        opacity: 0,
        rotateX: -180,
      }}
      animate={{ 
        scale: 1,
        opacity: 0.4,
        rotateX: 0,
      }}
      transition={{
        duration: 2.5,
        delay: element.id * 0.15,
        ease: [0.175, 0.885, 0.32, 1.275],
      }}
      whileInView={{
        scale: [1, 1.1, 1],
        opacity: [0.4, 0.7, 0.4],
        transition: {
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
      viewport={{ once: false, amount: 0.3 }}
    >
      {renderShape(element)}
    </motion.div>
  );
}