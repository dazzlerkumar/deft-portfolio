"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NarrativeTransitionProps {
  fromChapter: number;
  toChapter: number;
  transitionType?: "fade" | "slide" | "morph" | "dissolve";
  duration?: number;
  isActive: boolean;
  onComplete?: () => void;
}

interface TransitionTheme {
  colors: string[];
  icon: string;
  message: string;
  pattern: "particles" | "waves" | "geometric" | "organic";
}

const chapterTransitions: Record<string, TransitionTheme> = {
  "1-2": {
    colors: ["#FF6B35", "#00D4FF"],
    icon: "🌱→🧩",
    message: "From growth to challenges...",
    pattern: "organic"
  },
  "2-3": {
    colors: ["#00D4FF", "#6B46C1"],
    icon: "🧩→🤝",
    message: "From solving to leading...",
    pattern: "geometric"
  },
  "3-4": {
    colors: ["#6B46C1", "#1E293B"],
    icon: "🤝→🚀",
    message: "From leadership to vision...",
    pattern: "waves"
  },
  "4-1": {
    colors: ["#1E293B", "#FF6B35"],
    icon: "🚀→🌱",
    message: "Beginning anew...",
    pattern: "particles"
  }
};

export function NarrativeTransition({ 
  fromChapter,
  toChapter,
  transitionType = "fade",
  duration = 2000,
  isActive,
  onComplete
}: NarrativeTransitionProps) {
  const [stage, setStage] = useState<"enter" | "transition" | "exit">("enter");
  const transitionKey = `${fromChapter}-${toChapter}`;
  const theme = chapterTransitions[transitionKey] || chapterTransitions["1-2"];

  useEffect(() => {
    if (!isActive) return;

    const timer1 = setTimeout(() => setStage("transition"), duration * 0.2);
    const timer2 = setTimeout(() => setStage("exit"), duration * 0.8);
    const timer3 = setTimeout(() => {
      onComplete?.();
    }, duration);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isActive, duration, onComplete]);

  const getTransitionVariants = () => {
    switch (transitionType) {
      case "slide":
        return {
          enter: { x: "100%", opacity: 0 },
          transition: { x: 0, opacity: 1 },
          exit: { x: "-100%", opacity: 0 }
        };
      
      case "morph":
        return {
          enter: { scale: 0, rotate: -180, opacity: 0 },
          transition: { scale: 1, rotate: 0, opacity: 1 },
          exit: { scale: 0, rotate: 180, opacity: 0 }
        };
      
      case "dissolve":
        return {
          enter: { opacity: 0, filter: "blur(20px)" },
          transition: { opacity: 1, filter: "blur(0px)" },
          exit: { opacity: 0, filter: "blur(20px)" }
        };
      
      default: // fade
        return {
          enter: { opacity: 0 },
          transition: { opacity: 1 },
          exit: { opacity: 0 }
        };
    }
  };

  const renderPattern = () => {
    const { pattern } = theme;
    const elements = Array.from({ length: 20 });

    switch (pattern) {
      case "particles":
        return elements.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            initial={{ 
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
              y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
              opacity: 0,
              scale: 0
            }}
            animate={{ 
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
              y: [null, Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)]
            }}
            transition={{ 
              duration: duration / 1000,
              delay: Math.random() * 0.5,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
        ));

      case "waves":
        return elements.map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
            style={{ top: `${(i / elements.length) * 100}%` }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ 
              scaleX: [0, 1, 0],
              opacity: [0, 0.3, 0]
            }}
            transition={{ 
              duration: 1.5,
              delay: i * 0.1,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
        ));

      case "geometric":
        return elements.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 border-2 border-white opacity-20"
            style={{
              left: `${(i % 5) * 20}%`,
              top: `${Math.floor(i / 5) * 25}%`
            }}
            initial={{ rotate: 0, scale: 0 }}
            animate={{ 
              rotate: 360,
              scale: [0, 1, 0]
            }}
            transition={{ 
              duration: 2,
              delay: i * 0.05,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
        ));

      case "organic":
      default:
        return elements.map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-6 bg-white rounded-full opacity-10"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            initial={{ scale: 0 }}
            animate={{ 
              scale: [0, Math.random() * 2 + 0.5, 0],
              x: [0, (Math.random() - 0.5) * 200],
              y: [0, (Math.random() - 0.5) * 200]
            }}
            transition={{ 
              duration: 3,
              delay: Math.random() * 1,
              repeat: Infinity,
              repeatType: "loop"
            }}
          />
        ));
    }
  };

  if (!isActive) return null;

  const variants = getTransitionVariants();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={`transition-${fromChapter}-${toChapter}`}
        initial={variants.enter}
        animate={variants.transition}
        exit={variants.exit}
        transition={{ 
          duration: duration / 1000,
          ease: "easeInOut"
        }}
        className="fixed inset-0 z-50 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${theme.colors[0]} 0%, ${theme.colors[1]} 100%)`
        }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0">
          {renderPattern()}
        </div>

        {/* Transition Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ 
              scale: stage === "transition" ? 1 : 0.5,
              opacity: stage === "transition" ? 1 : 0
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center text-white max-w-md mx-auto px-6"
          >
            {/* Chapter Transition Icon */}
            <motion.div
              initial={{ rotateY: 0 }}
              animate={{ rotateY: stage === "transition" ? 360 : 0 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="text-6xl mb-6"
            >
              {theme.icon}
            </motion.div>

            {/* Transition Message */}
            <motion.h2
              initial={{ y: 20, opacity: 0 }}
              animate={{ 
                y: stage === "transition" ? 0 : 20,
                opacity: stage === "transition" ? 1 : 0
              }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-2xl font-light mb-4"
            >
              {theme.message}
            </motion.h2>

            {/* Chapter Numbers */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: stage === "transition" ? 1 : 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="flex items-center justify-center space-x-4 text-lg font-mono opacity-80"
            >
              <span>Chapter {fromChapter}</span>
              <motion.span
                animate={{ x: [0, 10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                →
              </motion.span>
              <span>Chapter {toChapter}</span>
            </motion.div>

            {/* Progress Indicator */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: duration / 1000, ease: "linear" }}
              className="mt-8 h-1 bg-white/30 rounded-full overflow-hidden"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: duration / 1000, ease: "linear" }}
                className="h-full bg-white rounded-full"
              />
            </motion.div>
          </motion.div>
        </div>

        {/* Overlay Effects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: stage === "exit" ? 1 : 0 }}
          className="absolute inset-0 bg-black/20"
        />
      </motion.div>
    </AnimatePresence>
  );
}