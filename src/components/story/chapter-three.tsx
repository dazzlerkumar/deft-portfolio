"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NetworkVisualization } from "./network-visualization";
import { TeamImpactMetrics } from "./team-impact-metrics";
import { LeadershipShowcase } from "./leadership-showcase";
import { SceneWrapper, Network3D, ThreeProvider } from "@/components/three";

interface ChapterThreeProps {
  onChapterComplete: () => void;
}

export function ChapterThree({ onChapterComplete }: ChapterThreeProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sections = [
    {
      id: "intro",
      title: "The Leadership",
      subtitle: "Empowering teams, scaling impact",
      content: "Leadership in tech isn't just about code—it's about people, processes, and creating environments where great work happens."
    },
    {
      id: "team-building",
      title: "Building High-Performing Teams",
      subtitle: "From individual contributor to team multiplier",
      content: "Leading a team of 8 engineers taught me that technical excellence and human connection are equally important."
    },
    {
      id: "scaling-impact",
      title: "Scaling Impact Through Systems",
      subtitle: "Architecture that multiplies effectiveness",
      content: "The design system project showed me how good architecture can multiply a team's effectiveness across an entire organization."
    }
  ];

  const handleSectionComplete = () => {
    if (currentSection < sections.length - 1) {
      setCurrentSection(currentSection + 1);
    } else {
      onChapterComplete();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Network connection lines */}
        <div className="absolute top-1/4 left-1/4 w-32 h-0.5 bg-gradient-to-r from-purple-400/30 to-transparent rotate-45 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/3 w-24 h-0.5 bg-gradient-to-r from-amber-400/30 to-transparent -rotate-12 animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-1/3 left-1/3 w-20 h-0.5 bg-gradient-to-r from-purple-400/30 to-transparent rotate-12 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-2/3 right-1/4 w-28 h-0.5 bg-gradient-to-r from-amber-400/30 to-transparent -rotate-45 animate-pulse animation-delay-3000"></div>
        
        {/* Leadership nodes */}
        <div className="absolute top-1/5 left-1/5 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-2/5 right-1/5 w-2 h-2 bg-amber-400 rounded-full animate-pulse opacity-50 animation-delay-1000"></div>
        <div className="absolute bottom-1/4 left-2/5 w-2.5 h-2.5 bg-purple-300 rounded-full animate-pulse opacity-40 animation-delay-2000"></div>
        <div className="absolute top-3/5 right-2/5 w-2 h-2 bg-amber-300 rounded-full animate-pulse opacity-50 animation-delay-3000"></div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="relative z-10"
      >
        {/* Chapter Header */}
        <motion.section
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="pt-20 pb-16 px-6 text-center"
        >
          <motion.div
            className="inline-block px-4 py-2 bg-purple-500/20 backdrop-blur-sm rounded-full mb-6 border border-purple-400/30"
            animate={{ 
              boxShadow: [
                "0 0 10px rgba(168, 85, 247, 0.4)",
                "0 0 25px rgba(168, 85, 247, 0.6)",
                "0 0 10px rgba(168, 85, 247, 0.4)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <span className="text-purple-300 font-semibold">Chapter 3</span>
          </motion.div>
          
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-amber-400 to-purple-300 bg-clip-text text-transparent"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            The Leadership
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Empowering teams, scaling impact
          </motion.p>
        </motion.section>

        {/* Current Section Content */}
        <motion.section
          key={currentSection}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.6 }}
          className="px-6 py-16"
        >
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2
                className="text-4xl md:text-5xl font-bold mb-6 text-purple-300"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {sections[currentSection].title}
              </motion.h2>
              
              <motion.p
                className="text-xl text-amber-400 font-semibold mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {sections[currentSection].subtitle}
              </motion.p>
              
              <motion.p
                className="text-lg text-slate-300 max-w-4xl mx-auto leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {sections[currentSection].content}
              </motion.p>
            </div>

            {/* Interactive Visualizations */}
            {currentSection === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="h-96 mb-8"
              >
                <ThreeProvider>
                  <SceneWrapper
                    className="w-full h-full rounded-xl"
                    camera={{ position: [0, 0, 8], fov: 60 }}
                    fallback={<NetworkVisualization />}
                  >
                    <Network3D 
                      progress={0.8} 
                      activeNode={null}
                    />
                  </SceneWrapper>
                </ThreeProvider>
              </motion.div>
            )}

            {currentSection === 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <TeamImpactMetrics />
              </motion.div>
            )}

            {currentSection === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <LeadershipShowcase />
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* Navigation */}
        <motion.div
          className="fixed bottom-8 right-8 z-10"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <button
            onClick={handleSectionComplete}
            className="bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105"
            style={{
              animation: "leadership-glow 3s ease-in-out infinite"
            }}
          >
            {currentSection < sections.length - 1 ? "Continue" : "Next Chapter"}
          </button>
        </motion.div>

        {/* Section Progress Indicator */}
        <motion.div
          className="fixed bottom-8 left-8 flex space-x-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {sections.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index <= currentSection 
                  ? "bg-purple-400" 
                  : "bg-slate-600"
              }`}
              animate={{
                scale: index === currentSection ? 1.2 : 1,
                opacity: index <= currentSection ? 1 : 0.5
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}