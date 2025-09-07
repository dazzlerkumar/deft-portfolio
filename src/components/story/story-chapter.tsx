"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Chapter, VisualElement, InteractiveElement } from "@/lib/types/story";

interface StoryChapterProps {
  chapterNumber: number;
  title: string;
  subtitle?: string;
  content?: Chapter["content"];
  visualTheme: VisualTheme;
  interactiveElements?: InteractiveElement[];
  children: ReactNode;
  className?: string;
  onChapterComplete?: () => void;
}

export interface VisualTheme {
  name: "chapter1" | "chapter2" | "chapter3" | "chapter4";
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  animations: {
    style: "organic" | "sharp" | "coordinated" | "smooth";
    duration: number;
    easing: string;
  };
  visualMetaphor: string;
}

const themeConfigs: Record<string, VisualTheme> = {
  chapter1: {
    name: "chapter1",
    colors: {
      primary: "#FF6B35", // Warm orange
      secondary: "#4A90E2", // Soft blue
      accent: "#F7931E",
      background: "linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #4A90E2 100%)",
      text: "#2C3E50"
    },
    animations: {
      style: "organic",
      duration: 1.2,
      easing: "easeOut"
    },
    visualMetaphor: "growing-tree"
  },
  chapter2: {
    name: "chapter2",
    colors: {
      primary: "#00D4FF", // Electric blue
      secondary: "#1A1A1A", // Bold contrast
      accent: "#FF3366",
      background: "linear-gradient(135deg, #00D4FF 0%, #0099CC 50%, #1A1A1A 100%)",
      text: "#FFFFFF"
    },
    animations: {
      style: "sharp",
      duration: 0.6,
      easing: "easeInOut"
    },
    visualMetaphor: "puzzle-pieces"
  },
  chapter3: {
    name: "chapter3",
    colors: {
      primary: "#6B46C1", // Professional purple
      secondary: "#F59E0B", // Gold accent
      accent: "#8B5CF6",
      background: "linear-gradient(135deg, #6B46C1 0%, #8B5CF6 50%, #F59E0B 100%)",
      text: "#FFFFFF"
    },
    animations: {
      style: "coordinated",
      duration: 0.8,
      easing: "easeInOut"
    },
    visualMetaphor: "network-nodes"
  },
  chapter4: {
    name: "chapter4",
    colors: {
      primary: "#1E293B", // Deep space blue
      secondary: "#F8FAFC", // Bright white
      accent: "#3B82F6",
      background: "linear-gradient(135deg, #1E293B 0%, #334155 50%, #0F172A 100%)",
      text: "#F8FAFC"
    },
    animations: {
      style: "smooth",
      duration: 1.0,
      easing: "easeOut"
    },
    visualMetaphor: "space-launch"
  }
};

export function StoryChapter({
  chapterNumber,
  title,
  subtitle,
  content,
  visualTheme,
  interactiveElements = [],
  children,
  className = "",
  onChapterComplete
}: StoryChapterProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<VisualTheme>(visualTheme);
  const { scrollYProgress } = useScroll();
  
  // Transform scroll progress for parallax effects
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  useEffect(() => {
    setIsVisible(true);
    
    // Update theme if it changes
    if (visualTheme.name !== currentTheme.name) {
      setCurrentTheme(visualTheme);
    }
  }, [visualTheme, currentTheme.name]);

  useEffect(() => {
    // Check if chapter is complete based on scroll position
    const unsubscribe = scrollYProgress.onChange((latest) => {
      if (latest > 0.9 && onChapterComplete) {
        onChapterComplete();
      }
    });

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  }, [scrollYProgress, onChapterComplete]);

  const getAnimationVariants = () => {
    const { style, duration, easing } = currentTheme.animations;
    
    const baseVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    };

    switch (style) {
      case "organic":
        return {
          ...baseVariants,
          hidden: { ...baseVariants.hidden, scale: 0.8, y: 50 },
          visible: { 
            ...baseVariants.visible, 
            scale: 1, 
            y: 0,
            transition: { 
              duration, 
              ease: easing as any,
              type: "spring" as const,
              stiffness: 100
            }
          }
        };
      
      case "sharp":
        return {
          ...baseVariants,
          hidden: { ...baseVariants.hidden, x: -100 },
          visible: { 
            ...baseVariants.visible, 
            x: 0,
            transition: { 
              duration, 
              ease: easing as any,
              type: "tween" as const
            }
          }
        };
      
      case "coordinated":
        return {
          ...baseVariants,
          hidden: { ...baseVariants.hidden, scale: 0.9, rotateY: -15 },
          visible: { 
            ...baseVariants.visible, 
            scale: 1, 
            rotateY: 0,
            transition: { 
              duration, 
              ease: easing as any,
              staggerChildren: 0.1
            }
          }
        };
      
      case "smooth":
        return {
          ...baseVariants,
          hidden: { ...baseVariants.hidden, y: 100 },
          visible: { 
            ...baseVariants.visible, 
            y: 0,
            transition: { 
              duration, 
              ease: easing as any,
              type: "tween" as const
            }
          }
        };
      
      default:
        return baseVariants;
    }
  };

  return (
    <motion.section
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      variants={getAnimationVariants()}
      className={`min-h-screen relative overflow-hidden ${className}`}
      style={{
        background: currentTheme.colors.background,
        color: currentTheme.colors.text
      }}
    >
      {/* Animated Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ y: backgroundY }}
      >
        <div className="absolute inset-0 opacity-10">
          {/* Visual metaphor background elements */}
          {currentTheme.visualMetaphor === "growing-tree" && (
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.3 }}
                transition={{ duration: 2, delay: 0.5 }}
                className="w-64 h-64 bg-gradient-to-t from-green-600 to-green-400 rounded-full blur-3xl"
              />
            </div>
          )}
          
          {currentTheme.visualMetaphor === "puzzle-pieces" && (
            <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-2 p-8">
              {Array.from({ length: 24 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ rotate: Math.random() * 360, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  transition={{ duration: 1, delay: i * 0.05 }}
                  className="bg-current opacity-5 rounded-lg"
                />
              ))}
            </div>
          )}
          
          {currentTheme.visualMetaphor === "network-nodes" && (
            <div className="absolute inset-0">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.2 }}
                  transition={{ duration: 1, delay: i * 0.1 }}
                  className="absolute w-4 h-4 bg-current rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                />
              ))}
            </div>
          )}
          
          {currentTheme.visualMetaphor === "space-launch" && (
            <div className="absolute inset-0">
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.1 }}
                transition={{ duration: 3 }}
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-blue-400 to-transparent rounded-full"
              />
            </div>
          )}
        </div>
      </motion.div>

      {/* Chapter Header */}
      <motion.div
        className="absolute top-8 left-8 z-20"
        style={{ y: contentY }}
        variants={{
          hidden: { x: -50, opacity: 0 },
          visible: { 
            x: 0, 
            opacity: 1,
            transition: { delay: 0.3, duration: 0.6 }
          }
        }}
      >
        <div className="space-y-2">
          <motion.span 
            className="text-sm font-mono opacity-70 block"
            style={{ color: currentTheme.colors.secondary }}
          >
            Chapter {chapterNumber}
          </motion.span>
          <motion.h1 
            className="text-4xl md:text-5xl font-bold leading-tight"
            style={{ color: currentTheme.colors.text }}
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p 
              className="text-lg opacity-80 max-w-md"
              style={{ color: currentTheme.colors.secondary }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* Chapter Content */}
      <motion.div 
        className="relative z-10 pt-32"
        style={{ y: contentY }}
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { delay: 0.6, duration: 0.8 }
          }
        }}
      >
        {children}
      </motion.div>

      {/* Theme-specific decorative elements */}
      <div className="absolute inset-0 pointer-events-none z-5">
        {currentTheme.name === "chapter1" && (
          <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, delay: 1 }}
            className="absolute bottom-10 right-10"
          >
            <svg width="100" height="100" viewBox="0 0 100 100" className="opacity-20">
              <path
                d="M20 80 Q 50 20 80 80"
                stroke={currentTheme.colors.accent}
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </motion.div>
        )}
        
        {currentTheme.name === "chapter2" && (
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-20 right-20 w-16 h-16 border-2 opacity-20"
            style={{ borderColor: currentTheme.colors.accent }}
          />
        )}
      </div>
    </motion.section>
  );
}