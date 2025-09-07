"use client";

import React from "react";
import { motion } from "framer-motion";

interface LoadingProps {
  message?: string;
  className?: string;
  variant?: "dots" | "spinner" | "pulse" | "story";
  size?: "sm" | "md" | "lg";
}

export function Loading({ 
  message = "Loading...", 
  className = "",
  variant = "dots",
  size = "md"
}: LoadingProps) {
  const sizeClasses = {
    sm: "w-2 h-2",
    md: "w-3 h-3", 
    lg: "w-4 h-4"
  };

  const containerSizes = {
    sm: "space-y-2",
    md: "space-y-4",
    lg: "space-y-6"
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };

  const renderLoadingAnimation = () => {
    switch (variant) {
      case "spinner":
        return (
          <motion.div
            className={`border-2 border-gray-300 border-t-blue-500 rounded-full ${sizeClasses[size === "sm" ? "md" : size === "md" ? "lg" : "lg"]} ${size === "lg" ? "w-8 h-8" : size === "md" ? "w-6 h-6" : "w-4 h-4"}`}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        );

      case "pulse":
        return (
          <motion.div
            className={`bg-blue-500 rounded-full ${size === "lg" ? "w-8 h-8" : size === "md" ? "w-6 h-6" : "w-4 h-4"}`}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        );

      case "story":
        return (
          <div className="relative">
            {/* Book icon animation */}
            <motion.div
              className="text-4xl"
              animate={{
                rotateY: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              📖
            </motion.div>
            
            {/* Floating particles */}
            <div className="absolute inset-0">
              {[0, 1, 2, 3].map((index) => (
                <motion.div
                  key={index}
                  className="absolute w-1 h-1 bg-blue-400 rounded-full"
                  style={{
                    left: `${25 + index * 15}%`,
                    top: `${30 + (index % 2) * 20}%`
                  }}
                  animate={{
                    y: [-10, -20, -10],
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>
          </div>
        );

      case "dots":
      default:
        return (
          <motion.div
            className="flex space-x-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className={`${sizeClasses[size]} bg-blue-500 rounded-full`}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              />
            ))}
          </motion.div>
        );
    }
  };

  return (
    <div className={`flex flex-col items-center justify-center ${containerSizes[size]} ${className}`}>
      {renderLoadingAnimation()}
      
      {message && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className={`${textSizes[size]} text-gray-600 text-center max-w-xs`}
        >
          {message}
        </motion.p>
      )}
    </div>
  );
}

// Chapter-specific loading component
interface ChapterLoadingProps {
  chapterNumber: number;
  chapterTitle: string;
  className?: string;
}

export function ChapterLoading({ 
  chapterNumber, 
  chapterTitle, 
  className = "" 
}: ChapterLoadingProps) {
  const chapterThemes = {
    1: { color: "from-orange-400 to-blue-400", icon: "🌱" },
    2: { color: "from-blue-400 to-indigo-600", icon: "🧩" },
    3: { color: "from-purple-500 to-yellow-400", icon: "🤝" },
    4: { color: "from-slate-700 to-blue-500", icon: "🚀" }
  };

  const theme = chapterThemes[chapterNumber as keyof typeof chapterThemes] || chapterThemes[1];

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${theme.color} ${className}`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center text-white max-w-md mx-auto px-6"
      >
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-6xl mb-6"
        >
          {theme.icon}
        </motion.div>
        
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-2xl font-bold mb-2"
        >
          Chapter {chapterNumber}
        </motion.h2>
        
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-lg opacity-90 mb-8"
        >
          {chapterTitle}
        </motion.p>

        <Loading variant="dots" size="md" message="Loading your story..." />
      </motion.div>
    </div>
  );
}