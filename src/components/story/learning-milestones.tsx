"use client";

import React, { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

interface LearningMilestone {
  id: string;
  title: string;
  date: string;
  description: string;
  skills: string[];
  achievement: string;
  impact: string;
}

interface LearningMilestonesProps {
  milestones: LearningMilestone[];
  className?: string;
}

export function LearningMilestones({ milestones, className = "" }: LearningMilestonesProps) {
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);
  const [hoveredMilestone, setHoveredMilestone] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const handleMilestoneClick = (milestoneId: string) => {
    setSelectedMilestone(selectedMilestone === milestoneId ? null : milestoneId);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const milestoneVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1
    }
  };

  const treeLineVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 0.3
    }
  };

  return (
    <div ref={containerRef} className={`relative py-16 ${className}`}>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h3 className="text-3xl font-bold mb-4 text-orange-100">
          Learning Milestones
        </h3>
        <p className="text-lg opacity-80 max-w-2xl mx-auto text-orange-200">
          Click on each milestone to explore the key moments that shaped my development journey
        </p>
      </motion.div>

      {/* Tree Structure Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg width="400" height="600" viewBox="0 0 400 600" className="opacity-20">
          <motion.path
            d="M200 50 L200 550"
            stroke="#F7931E"
            strokeWidth="3"
            fill="none"
            variants={treeLineVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          />
          {milestones.map((_, index) => (
            <motion.path
              key={index}
              d={`M200 ${100 + index * 80} L${index % 2 === 0 ? 150 : 250} ${100 + index * 80}`}
              stroke="#F7931E"
              strokeWidth="2"
              fill="none"
              variants={treeLineVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              transition={{ delay: 0.5 + index * 0.1 }}
            />
          ))}
        </svg>
      </div>

      {/* Milestones Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="relative z-10 max-w-4xl mx-auto"
      >
        <div className="space-y-8">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              variants={milestoneVariants}
              className={`flex items-center ${index % 2 === 0 ? 'justify-start' : 'justify-end'}`}
            >
              <motion.div
                className={`relative cursor-pointer group ${index % 2 === 0 ? 'mr-8' : 'ml-8'}`}
                onClick={() => handleMilestoneClick(milestone.id)}
                onHoverStart={() => setHoveredMilestone(milestone.id)}
                onHoverEnd={() => setHoveredMilestone(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Milestone Card */}
                <motion.div
                  className={`
                    bg-gradient-to-br from-orange-500/20 to-blue-500/20 
                    backdrop-blur-sm border border-orange-300/30 rounded-xl p-6 
                    max-w-md shadow-lg transition-all duration-300
                    ${selectedMilestone === milestone.id ? 'ring-2 ring-orange-400' : ''}
                    ${hoveredMilestone === milestone.id ? 'shadow-xl shadow-orange-500/20' : ''}
                  `}
                  layout
                >
                  {/* Date Badge */}
                  <motion.div
                    className="inline-block bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-mono mb-3"
                    whileHover={{ scale: 1.1 }}
                  >
                    {milestone.date}
                  </motion.div>

                  {/* Title */}
                  <h4 className="text-xl font-bold mb-2 text-orange-100 group-hover:text-orange-200 transition-colors">
                    {milestone.title}
                  </h4>

                  {/* Description */}
                  <p className="text-orange-200/80 mb-4 leading-relaxed">
                    {milestone.description}
                  </p>

                  {/* Skills Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {milestone.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        className="bg-blue-500/30 text-blue-200 px-2 py-1 rounded text-sm"
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(59, 130, 246, 0.5)" }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                  {/* Expand Indicator */}
                  <motion.div
                    className="flex items-center text-orange-300 text-sm"
                    animate={{ 
                      rotate: selectedMilestone === milestone.id ? 180 : 0 
                    }}
                  >
                    <span className="mr-2">
                      {selectedMilestone === milestone.id ? 'Click to collapse' : 'Click to expand'}
                    </span>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M8 12l-4-4h8l-4 4z"/>
                    </svg>
                  </motion.div>
                </motion.div>

                {/* Expanded Content */}
                <AnimatePresence>
                  {selectedMilestone === milestone.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -20 }}
                      animate={{ opacity: 1, height: "auto", y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -20 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="mt-4 overflow-hidden"
                    >
                      <div className="bg-gradient-to-br from-orange-600/20 to-blue-600/20 backdrop-blur-sm border border-orange-400/30 rounded-lg p-6">
                        <div className="space-y-4">
                          <div>
                            <h5 className="font-semibold text-orange-200 mb-2">Achievement</h5>
                            <p className="text-orange-100/90">{milestone.achievement}</p>
                          </div>
                          <div>
                            <h5 className="font-semibold text-orange-200 mb-2">Impact</h5>
                            <p className="text-orange-100/90">{milestone.impact}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Connection Node */}
                <motion.div
                  className={`
                    absolute top-1/2 transform -translate-y-1/2 w-4 h-4 
                    bg-orange-400 rounded-full border-2 border-orange-200
                    ${index % 2 === 0 ? '-right-6' : '-left-6'}
                  `}
                  whileHover={{ scale: 1.3 }}
                  animate={{
                    scale: hoveredMilestone === milestone.id ? 1.2 : 1,
                    boxShadow: hoveredMilestone === milestone.id 
                      ? "0 0 20px rgba(247, 147, 30, 0.6)" 
                      : "0 0 0px rgba(247, 147, 30, 0)"
                  }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-orange-400/30 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * 600,
              opacity: 0
            }}
            animate={{
              y: [null, -100],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    </div>
  );
}