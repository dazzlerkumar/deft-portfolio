"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, useAnimation } from "framer-motion";

interface SkillData {
  skill: string;
  level: number;
  color: string;
}

interface SkillProgressionProps {
  skills: SkillData[];
  className?: string;
}

export function SkillProgression({ skills, className = "" }: SkillProgressionProps) {
  const [animationComplete, setAnimationComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-50px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2
      }
    }
  };

  const skillVariants = {
    hidden: { 
      opacity: 0, 
      x: -50,
      scale: 0.8
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1
    }
  };

  const progressVariants = {
    hidden: { width: 0 },
    visible: (level: number) => ({
      width: `${level}%`
    })
  };

  return (
    <div ref={containerRef} className={`py-16 ${className}`}>
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -30 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h3 className="text-3xl font-bold mb-4 text-orange-100">
          Skill Evolution
        </h3>
        <p className="text-lg opacity-80 max-w-2xl mx-auto text-orange-200">
          Watch how my technical expertise grew from basic web technologies to modern development frameworks
        </p>
      </motion.div>

      {/* Skills Container */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={controls}
        className="max-w-4xl mx-auto"
      >
        <div className="grid gap-6">
          {skills.map((skillData, index) => (
            <motion.div
              key={skillData.skill}
              variants={skillVariants}
              className="group"
            >
              <div className="bg-gradient-to-r from-orange-500/10 to-blue-500/10 backdrop-blur-sm border border-orange-300/20 rounded-lg p-6 hover:border-orange-300/40 transition-all duration-300">
                {/* Skill Header */}
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-xl font-semibold text-orange-100 group-hover:text-orange-200 transition-colors">
                    {skillData.skill}
                  </h4>
                  <motion.span
                    className="text-lg font-mono text-orange-300"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 1.5 + index * 0.1 }}
                  >
                    {skillData.level}%
                  </motion.span>
                </div>

                {/* Progress Bar Container */}
                <div className="relative">
                  {/* Background Bar */}
                  <div className="w-full h-3 bg-gray-700/50 rounded-full overflow-hidden">
                    {/* Animated Progress Bar */}
                    <motion.div
                      className="h-full rounded-full relative overflow-hidden"
                      style={{ backgroundColor: skillData.color }}
                      variants={progressVariants}
                      custom={skillData.level}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      onAnimationComplete={() => {
                        if (index === skills.length - 1) {
                          setAnimationComplete(true);
                        }
                      }}
                    >
                      {/* Shimmer Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                        initial={{ x: "-100%" }}
                        animate={isInView ? { x: "100%" } : { x: "-100%" }}
                        transition={{
                          duration: 1.5,
                          delay: 0.8 + index * 0.1,
                          ease: "easeInOut"
                        }}
                      />
                    </motion.div>
                  </div>

                  {/* Skill Level Indicator */}
                  <motion.div
                    className="absolute -top-8 bg-gray-800 text-white px-2 py-1 rounded text-sm font-mono"
                    style={{ 
                      left: `${skillData.level}%`,
                      transform: "translateX(-50%)"
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                    transition={{ delay: 1.8 + index * 0.1 }}
                  >
                    {skillData.level}%
                    <div 
                      className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"
                    />
                  </motion.div>
                </div>

                {/* Skill Mastery Indicator */}
                <motion.div
                  className="mt-4 flex items-center space-x-2"
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 2 + index * 0.1 }}
                >
                  <div className="flex space-x-1">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <motion.div
                        key={starIndex}
                        initial={{ scale: 0, rotate: -180 }}
                        animate={isInView ? { 
                          scale: starIndex < Math.floor(skillData.level / 20) ? 1 : 0.3,
                          rotate: 0
                        } : { scale: 0, rotate: -180 }}
                        transition={{ 
                          delay: 2.2 + index * 0.1 + starIndex * 0.05,
                          type: "spring",
                          stiffness: 200
                        }}
                      >
                        <svg 
                          width="16" 
                          height="16" 
                          viewBox="0 0 16 16" 
                          className={`${starIndex < Math.floor(skillData.level / 20) ? 'text-yellow-400' : 'text-gray-600'}`}
                          fill="currentColor"
                        >
                          <path d="M8 0l2.4 4.8L16 5.6l-4 3.9L13 16l-5-2.6L3 16l1-6.5L0 5.6l5.6-.8L8 0z"/>
                        </svg>
                      </motion.div>
                    ))}
                  </div>
                  <span className="text-sm text-orange-300/70">
                    {skillData.level >= 80 ? 'Expert' : 
                     skillData.level >= 60 ? 'Advanced' : 
                     skillData.level >= 40 ? 'Intermediate' : 'Beginner'}
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Growth Visualization */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={animationComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <div className="bg-gradient-to-r from-orange-500/20 to-blue-500/20 backdrop-blur-sm border border-orange-300/30 rounded-xl p-8 max-w-2xl mx-auto">
          <motion.div
            initial={{ scale: 0 }}
            animate={animationComplete ? { scale: 1 } : { scale: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 1 }}
            className="mb-4"
          >
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-orange-400 to-blue-400 rounded-full flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="white">
                <path d="M16 2l4.8 9.6L32 11.2l-8 7.8L26 32l-10-5.2L6 32l2-13.2L0 11.2l11.2-.6L16 2z"/>
              </svg>
            </div>
          </motion.div>
          <h4 className="text-xl font-bold text-orange-100 mb-2">
            Continuous Growth
          </h4>
          <p className="text-orange-200/80">
            Each skill represents countless hours of learning, building, and refining. 
            The journey from beginner to expert is never truly complete - there's always more to discover.
          </p>
        </div>
      </motion.div>
    </div>
  );
}