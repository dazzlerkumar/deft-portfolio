"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { StoryChapter, VisualTheme } from "./story-chapter";
import { LearningMilestones } from "./learning-milestones";
import { SkillProgression } from "./skill-progression";
import { SceneWrapper, GrowingTree, ThreeProvider } from "@/components/three";
import { chapter1LearningMilestones, chapter1SkillProgression } from "@/content/chapters/chapter-1";

interface ChapterOneProps {
  onChapterComplete?: () => void;
  className?: string;
}

const chapter1Theme: VisualTheme = {
  name: "chapter1",
  colors: {
    primary: "#FF6B35",
    secondary: "#4A90E2", 
    accent: "#F7931E",
    background: "linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #4A90E2 100%)",
    text: "#FFFFFF"
  },
  animations: {
    style: "organic",
    duration: 1.2,
    easing: "easeOut"
  },
  visualMetaphor: "growing-tree"
};

export function ChapterOne({ onChapterComplete, className = "" }: ChapterOneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [treeProgress, setTreeProgress] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Update tree progress based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setTreeProgress(latest);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  // Parallax transforms
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const treeScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 1.5]);

  // Section refs for scroll-triggered animations
  const introRef = useRef<HTMLDivElement>(null);
  const milestonesRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const conclusionRef = useRef<HTMLDivElement>(null);

  const introInView = useInView(introRef, { once: true, margin: "-100px" });
  const milestonesInView = useInView(milestonesRef, { once: true, margin: "-100px" });
  const skillsInView = useInView(skillsRef, { once: true, margin: "-100px" });
  const conclusionInView = useInView(conclusionRef, { once: true, margin: "-100px" });

  return (
    <StoryChapter
      chapterNumber={1}
      title="The Beginning"
      subtitle="Where curiosity met code"
      visualTheme={chapter1Theme}
      onChapterComplete={onChapterComplete}
      className={className}
    >
      <div ref={containerRef} className="relative">
        {/* 3D Growing Tree Background */}
        <motion.div
          className="fixed inset-0 pointer-events-none z-0"
          style={{ y: backgroundY }}
        >
          <ThreeProvider>
            <SceneWrapper
              className="w-full h-full"
              camera={{ position: [0, 0, 8], fov: 60 }}
              fallback={
                <motion.div
                  className="absolute bottom-0 left-1/2 transform -translate-x-1/2"
                  style={{ scale: treeScale }}
                >
                  <svg width="300" height="400" viewBox="0 0 300 400" className="opacity-20">
                    {/* Fallback SVG Tree */}
                    <motion.rect
                      x="140"
                      y="300"
                      width="20"
                      height="100"
                      fill="#8B4513"
                      initial={{ height: 0 }}
                      animate={{ height: 100 }}
                      transition={{ duration: 2, delay: 1 }}
                    />
                    {Array.from({ length: 8 }).map((_, i) => (
                      <motion.path
                        key={i}
                        d={`M150 ${320 - i * 15} Q${120 + Math.random() * 60} ${300 - i * 20} ${100 + Math.random() * 100} ${280 - i * 25}`}
                        stroke="#8B4513"
                        strokeWidth="3"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, delay: 2 + i * 0.2 }}
                      />
                    ))}
                    {Array.from({ length: 20 }).map((_, i) => (
                      <motion.circle
                        key={i}
                        cx={80 + Math.random() * 140}
                        cy={200 + Math.random() * 100}
                        r="8"
                        fill="#228B22"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.7 }}
                        transition={{ 
                          duration: 0.8, 
                          delay: 3 + i * 0.1,
                          type: "spring",
                          stiffness: 200
                        }}
                      />
                    ))}
                  </svg>
                </motion.div>
              }
            >
              <GrowingTree 
                progress={treeProgress} 
              />
            </SceneWrapper>
          </ThreeProvider>
        </motion.div>

        {/* Content Sections */}
        <div className="relative z-10 space-y-32">
          {/* Introduction Section */}
          <motion.section
            ref={introRef}
            className="container mx-auto px-6 pt-20"
            style={{ y: contentY }}
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={introInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div
                className="mb-8"
                initial={{ scale: 0 }}
                animate={introInView ? { scale: 1 } : { scale: 0 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
              >
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-orange-400 to-blue-400 rounded-full flex items-center justify-center mb-6">
                  <motion.svg
                    width="48"
                    height="48"
                    viewBox="0 0 48 48"
                    fill="white"
                    initial={{ rotate: -180, opacity: 0 }}
                    animate={introInView ? { rotate: 0, opacity: 1 } : { rotate: -180, opacity: 0 }}
                    transition={{ duration: 1, delay: 0.8 }}
                  >
                    <path d="M24 4l6 12h12l-10 8 4 12-12-8-12 8 4-12-10-8h12l6-12z"/>
                  </motion.svg>
                </div>
              </motion.div>

              <motion.h2
                className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-orange-300 to-blue-300 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 30 }}
                animate={introInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                The Spark
              </motion.h2>

              <motion.p
                className="text-xl md:text-2xl leading-relaxed text-orange-100 mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={introInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Every great journey starts with a single step. Mine began with a simple{" "}
                <motion.code
                  className="bg-gray-800/50 px-2 py-1 rounded text-orange-300 font-mono"
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(31, 41, 55, 0.8)" }}
                >
                  "Hello, World!"
                </motion.code>{" "}
                that sparked a passion for creating digital experiences.
              </motion.p>

              <motion.div
                className="prose prose-lg prose-invert max-w-3xl mx-auto text-orange-200/90"
                initial={{ opacity: 0, y: 30 }}
                animate={introInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <p>
                  It was a Tuesday evening in 2015 when I wrote my first line of JavaScript. 
                  The simple alert that popped up on my screen felt like magic. Little did I know 
                  that this moment would ignite a passion that would define my career path.
                </p>
                <p>
                  From late-night coding sessions learning HTML and CSS, to deploying my first 
                  React application, this chapter explores the foundation stones of my development 
                  journey - each milestone a stepping stone toward mastery.
                </p>
              </motion.div>
            </motion.div>
          </motion.section>

          {/* Learning Milestones Section */}
          <motion.section
            ref={milestonesRef}
            className="container mx-auto px-6"
          >
            <LearningMilestones 
              milestones={chapter1LearningMilestones}
              className="bg-gradient-to-br from-orange-900/20 to-blue-900/20 backdrop-blur-sm rounded-3xl border border-orange-300/20 p-8"
            />
          </motion.section>

          {/* Skills Progression Section */}
          <motion.section
            ref={skillsRef}
            className="container mx-auto px-6"
          >
            <SkillProgression 
              skills={chapter1SkillProgression}
              className="bg-gradient-to-br from-blue-900/20 to-orange-900/20 backdrop-blur-sm rounded-3xl border border-blue-300/20 p-8"
            />
          </motion.section>

          {/* Conclusion Section */}
          <motion.section
            ref={conclusionRef}
            className="container mx-auto px-6 pb-32"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={conclusionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 1 }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.h3
                className="text-3xl md:text-4xl font-bold mb-6 text-orange-100"
                initial={{ opacity: 0, y: 30 }}
                animate={conclusionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                The Foundation Years
              </motion.h3>

              <motion.div
                className="prose prose-lg prose-invert max-w-3xl mx-auto text-orange-200/90 mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={conclusionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <p>
                  Those early years were filled with curiosity and countless hours of experimentation. 
                  I learned that coding wasn't just about syntax and algorithms - it was about solving 
                  real problems and creating experiences that matter to people.
                </p>
                <p>
                  My first real project was a simple portfolio website. It wasn't much to look at, 
                  but it represented something important: the transition from learning to creating. 
                  That project taught me about responsive design, cross-browser compatibility, 
                  and the importance of clean, maintainable code.
                </p>
              </motion.div>

              {/* Call to Action */}
              <motion.div
                className="bg-gradient-to-r from-orange-500/20 to-blue-500/20 backdrop-blur-sm border border-orange-300/30 rounded-xl p-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={conclusionInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <h4 className="text-xl font-bold text-orange-100 mb-4">
                  Ready for the Next Chapter?
                </h4>
                <p className="text-orange-200/80 mb-6">
                  The journey from that first "Hello, World!" to building complex applications 
                  has been filled with challenges, breakthroughs, and continuous learning. 
                  Each milestone represents not just technical growth, but the development 
                  of a problem-solving mindset.
                </p>
                <motion.button
                  className="bg-gradient-to-r from-orange-500 to-blue-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(255, 107, 53, 0.3)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onChapterComplete}
                >
                  Continue to Chapter 2: The Challenges
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.section>
        </div>

        {/* Scroll Progress Indicator */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-blue-500 z-50 origin-left"
          style={{ scaleX: scrollYProgress }}
        />
      </div>
    </StoryChapter>
  );
}