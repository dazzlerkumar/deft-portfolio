"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ContactMissionControl } from "./contact-mission-control";
import { FutureVision } from "./future-vision";
import { SpaceBackground } from "./space-background";
import { SceneWrapper, SpaceEnvironment, ThreeProvider } from "@/components/three";

interface ChapterFourProps {
  onChapterComplete: () => void;
}

export function ChapterFour({ onChapterComplete }: ChapterFourProps) {
  const [currentSection, setCurrentSection] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const sections = [
    {
      id: "intro",
      title: "The Vision",
      subtitle: "Building the future, together",
      content: "The best is yet to come. Let's explore what we can build together and how we can shape the future of digital experiences."
    },
    {
      id: "future-tech",
      title: "What's Next?",
      subtitle: "Technology evolves, fundamentals remain",
      content: "Technology evolves rapidly, but the fundamentals of good engineering remain constant: empathy for users, attention to detail, and a commitment to continuous learning."
    },
    {
      id: "contact",
      title: "Let's Connect",
      subtitle: "Ready to start a conversation?",
      content: "Whether you're looking for a technical leader, a collaborative partner, or just want to chat about the future of web development, I'd love to hear from you."
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
    <div className="min-h-screen bg-chapter4-background relative overflow-hidden">
      {/* 3D Space Environment */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <ThreeProvider>
          <SceneWrapper
            className="w-full h-full"
            camera={{ position: [0, 0, 10], fov: 75 }}
            fallback={<SpaceBackground />}
          >
            <SpaceEnvironment 
              progress={currentSection / sections.length} 
            />
          </SceneWrapper>
        </ThreeProvider>
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
            className="inline-block px-4 py-2 bg-chapter4-accent/20 rounded-full mb-6 border border-chapter4-accent/30"
            animate={{ 
              boxShadow: [
                "0 0 15px rgba(14, 165, 233, 0.3)",
                "0 0 30px rgba(14, 165, 233, 0.5)",
                "0 0 15px rgba(14, 165, 233, 0.3)"
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            <span className="text-chapter4-accent font-semibold">Chapter 4</span>
          </motion.div>
          
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4 bg-gradient-to-r from-chapter4-secondary to-chapter4-accent bg-clip-text text-transparent"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            The Vision
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl text-chapter4-secondary/80 max-w-3xl mx-auto"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Building the future, together
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
                className="text-4xl md:text-5xl font-bold mb-6 text-chapter4-secondary"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {sections[currentSection].title}
              </motion.h2>
              
              <motion.p
                className="text-xl text-chapter4-accent font-semibold mb-8"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {sections[currentSection].subtitle}
              </motion.p>
              
              <motion.p
                className="text-lg text-chapter4-secondary/90 max-w-4xl mx-auto leading-relaxed"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                {sections[currentSection].content}
              </motion.p>
            </div>

            {/* Interactive Components */}
            {currentSection === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <FutureVision />
              </motion.div>
            )}

            {currentSection === 1 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="text-center"
              >
                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                  <motion.div
                    className="bg-chapter4-primary/50 backdrop-blur-sm border border-chapter4-accent/30 rounded-lg p-6"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(14, 165, 233, 0.4)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-chapter4-secondary mb-3">User Empathy</h3>
                    <p className="text-chapter4-secondary/80">Understanding and solving real problems for real people</p>
                  </motion.div>
                  
                  <motion.div
                    className="bg-chapter4-primary/50 backdrop-blur-sm border border-chapter4-accent/30 rounded-lg p-6"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(14, 165, 233, 0.4)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-chapter4-secondary mb-3">Attention to Detail</h3>
                    <p className="text-chapter4-secondary/80">Crafting experiences that delight in every interaction</p>
                  </motion.div>
                  
                  <motion.div
                    className="bg-chapter4-primary/50 backdrop-blur-sm border border-chapter4-accent/30 rounded-lg p-6"
                    whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(14, 165, 233, 0.4)" }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-bold text-chapter4-secondary mb-3">Continuous Learning</h3>
                    <p className="text-chapter4-secondary/80">Staying curious and adapting to new challenges</p>
                  </motion.div>
                </div>
              </motion.div>
            )}

            {currentSection === 2 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <ContactMissionControl />
              </motion.div>
            )}
          </div>
        </motion.section>

        {/* Navigation */}
        <motion.div
          className="fixed bottom-8 right-8 z-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <button
            onClick={handleSectionComplete}
            className="bg-gradient-to-r from-chapter4-accent to-chapter4-secondary text-chapter4-primary px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            style={{
              animation: "future-glow 2s ease-in-out infinite alternate"
            }}
          >
            {currentSection < sections.length - 1 ? "Continue" : "Epilogue"}
          </button>
        </motion.div>

        {/* Section Progress Indicator */}
        <motion.div
          className="fixed bottom-8 left-8 flex space-x-2 z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          {sections.map((_, index) => (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index <= currentSection 
                  ? "bg-chapter4-accent" 
                  : "bg-chapter4-secondary/30"
              }`}
              animate={{
                scale: index === currentSection ? 1.2 : 1,
                opacity: index <= currentSection ? 1 : 0.5,
                boxShadow: index === currentSection ? "0 0 10px rgba(14, 165, 233, 0.6)" : "none"
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}