"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView, AnimatePresence } from "framer-motion";
import { StoryChapter, VisualTheme } from "./story-chapter";
import { ProjectShowcase } from "@/components/projects/project-showcase";
import { SceneWrapper, PuzzlePieces, ThreeProvider } from "@/components/three";
import { getProjectsByChapter } from "@/content/projects/project-data";

interface ChapterTwoProps {
  onChapterComplete?: () => void;
  className?: string;
}

interface ProblemSolutionPair {
  id: string;
  problem: string;
  solution: string;
  impact: string;
  projectId?: string;
}

const chapter2Theme: VisualTheme = {
  name: "chapter2",
  colors: {
    primary: "#00D4FF",
    secondary: "#1E40AF", 
    accent: "#3B82F6",
    background: "linear-gradient(135deg, #1E40AF 0%, #00D4FF 50%, #3B82F6 100%)",
    text: "#FFFFFF"
  },
  animations: {
    style: "sharp",
    duration: 0.6,
    easing: "easeInOut"
  },
  visualMetaphor: "puzzle-pieces"
};

const problemSolutionPairs: ProblemSolutionPair[] = [
  {
    id: "performance",
    problem: "E-commerce site loading in 8+ seconds, causing 40% bounce rate",
    solution: "Implemented code splitting, lazy loading, and optimized images",
    impact: "Reduced load time to 2.1s, increased conversions by 15%",
    projectId: "performance-optimization"
  },
  {
    id: "scalability",
    problem: "Monolithic codebase becoming unmaintainable with team growth",
    solution: "Architected modular component system with clear boundaries",
    impact: "60% faster feature development, reduced bugs by 30%",
    projectId: "ecommerce-platform"
  },
  {
    id: "user-experience",
    problem: "Complex checkout flow with 70% abandonment rate",
    solution: "Redesigned UX with progressive disclosure and smart defaults",
    impact: "Reduced abandonment to 25%, improved user satisfaction",
    projectId: "ecommerce-platform"
  },
  {
    id: "cross-browser",
    problem: "Inconsistent behavior across different browsers and devices",
    solution: "Implemented comprehensive testing suite and polyfills",
    impact: "99.9% cross-browser compatibility, reduced support tickets by 50%"
  }
];

export function ChapterTwo({ onChapterComplete, className = "" }: ChapterTwoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPair, setSelectedPair] = useState<string | null>(null);
  const [hoveredPuzzle, setHoveredPuzzle] = useState<string | null>(null);
  const [puzzleProgress, setPuzzleProgress] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Update puzzle progress based on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setPuzzleProgress(latest);
    });
    return unsubscribe;
  }, [scrollYProgress]);

  // Sharp, precise transforms for Chapter 2 theme
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const puzzleRotation = useTransform(scrollYProgress, [0, 0.5, 1], [0, 180, 360]);

  // Section refs for scroll-triggered animations
  const introRef = useRef<HTMLDivElement>(null);
  const problemsRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const conclusionRef = useRef<HTMLDivElement>(null);

  const introInView = useInView(introRef, { once: true, margin: "-100px" });
  const problemsInView = useInView(problemsRef, { once: true, margin: "-100px" });
  const projectsInView = useInView(projectsRef, { once: true, margin: "-100px" });
  const conclusionInView = useInView(conclusionRef, { once: true, margin: "-100px" });

  const chapterProjects = getProjectsByChapter("2");

  return (
    <StoryChapter
      chapterNumber={2}
      title="The Challenges"
      subtitle="Solving problems, one pixel at a time"
      visualTheme={chapter2Theme}
      onChapterComplete={onChapterComplete}
      className={className}
    >
      <div ref={containerRef} className="relative">
        {/* 3D Puzzle Pieces Background */}
        <motion.div
          className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
          style={{ y: backgroundY }}
        >
          <ThreeProvider>
            <SceneWrapper
              className="w-full h-full"
              camera={{ position: [0, 0, 6], fov: 75 }}
              fallback={
                <motion.div
                  className="absolute inset-0"
                  style={{ rotate: puzzleRotation }}
                >
                  {/* Fallback 2D puzzle pieces */}
                  {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        left: `${20 + (i % 4) * 20}%`,
                        top: `${20 + Math.floor(i / 4) * 25}%`,
                      }}
                      initial={{ 
                        scale: 0, 
                        rotate: Math.random() * 360,
                        opacity: 0 
                      }}
                      animate={{ 
                        scale: 0.3 + Math.random() * 0.4, 
                        rotate: 0,
                        opacity: 0.1 
                      }}
                      transition={{ 
                        duration: 1.5, 
                        delay: i * 0.1,
                        type: "spring",
                        stiffness: 100
                      }}
                    >
                      <PuzzlePiece 
                        size={60 + Math.random() * 40} 
                        color={`hsl(${200 + Math.random() * 60}, 70%, 60%)`}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              }
            >
              <PuzzlePieces 
                progress={puzzleProgress} 
                hoveredPiece={hoveredPuzzle}
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
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div
                className="mb-8"
                initial={{ scale: 0, rotate: -45 }}
                animate={introInView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -45 }}
                transition={{ type: "spring", stiffness: 300, delay: 0.3 }}
              >
                <div className="w-24 h-24 mx-auto bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg flex items-center justify-center mb-6 transform rotate-45">
                  <motion.div
                    className="transform -rotate-45"
                    initial={{ scale: 0 }}
                    animate={introInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 }}
                  >
                    <PuzzlePiece size={32} color="white" />
                  </motion.div>
                </div>
              </motion.div>

              <motion.h2
                className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -50 }}
                animate={introInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                The Puzzle Solver
              </motion.h2>

              <motion.p
                className="text-xl md:text-2xl leading-relaxed text-cyan-100 mb-8"
                initial={{ opacity: 0, x: 50 }}
                animate={introInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                Real growth happens when you face real challenges. Every problem is a puzzle waiting to be solved,
                and every solution reveals new possibilities.
              </motion.p>

              <motion.div
                className="prose prose-lg prose-invert max-w-3xl mx-auto text-cyan-200/90"
                initial={{ opacity: 0, y: 30 }}
                animate={introInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <p>
                  The transition from building simple projects to solving complex, real-world problems 
                  marked a turning point in my career. Each challenge taught me that great solutions 
                  aren't just about writing code - they're about understanding users, business needs, 
                  and technical constraints.
                </p>
              </motion.div>
            </motion.div>
          </motion.section>

          {/* Problem-Solution Pairs Section */}
          <motion.section
            ref={problemsRef}
            className="container mx-auto px-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={problemsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto"
            >
              <motion.h3
                className="text-3xl md:text-4xl font-bold mb-12 text-center text-cyan-100"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={problemsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Problems & Solutions
              </motion.h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {problemSolutionPairs.map((pair, index) => (
                  <ProblemSolutionCard
                    key={pair.id}
                    pair={pair}
                    index={index}
                    isSelected={selectedPair === pair.id}
                    isHovered={hoveredPuzzle === pair.id}
                    onSelect={() => setSelectedPair(selectedPair === pair.id ? null : pair.id)}
                    onHover={() => setHoveredPuzzle(pair.id)}
                    onLeave={() => setHoveredPuzzle(null)}
                    inView={problemsInView}
                  />
                ))}
              </div>
            </motion.div>
          </motion.section>

          {/* Projects Showcase Section */}
          <motion.section
            ref={projectsRef}
            className="container mx-auto px-6"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6 }}
              className="max-w-6xl mx-auto"
            >
              <motion.h3
                className="text-3xl md:text-4xl font-bold mb-12 text-center text-cyan-100"
                initial={{ opacity: 0, y: 30 }}
                animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Challenge Projects
              </motion.h3>

              <div className="space-y-16">
                {chapterProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={projectsInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.2 }}
                  >
                    <ProjectShowcase
                      project={project}
                      variant="challenge"
                      className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-sm rounded-2xl border border-cyan-300/20"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.section>

          {/* Conclusion Section */}
          <motion.section
            ref={conclusionRef}
            className="container mx-auto px-6 pb-32"
          >
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={conclusionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.h3
                className="text-3xl md:text-4xl font-bold mb-6 text-cyan-100"
                initial={{ opacity: 0, y: 30 }}
                animate={conclusionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                The Problem-Solving Mindset
              </motion.h3>

              <motion.div
                className="prose prose-lg prose-invert max-w-3xl mx-auto text-cyan-200/90 mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={conclusionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p>
                  These challenges taught me that every problem is an opportunity to innovate. 
                  The key isn't just finding a solution - it's finding the right solution that 
                  balances user needs, technical constraints, and business objectives.
                </p>
                <p>
                  Each puzzle piece represents a lesson learned, a skill developed, or a 
                  breakthrough achieved. Together, they form the foundation of my approach 
                  to complex problem-solving.
                </p>
              </motion.div>

              {/* Call to Action */}
              <motion.div
                className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 backdrop-blur-sm border border-cyan-300/30 rounded-xl p-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={conclusionInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <h4 className="text-xl font-bold text-cyan-100 mb-4">
                  Ready for Leadership?
                </h4>
                <p className="text-cyan-200/80 mb-6">
                  Solving individual challenges was just the beginning. The next chapter explores 
                  how these problem-solving skills evolved into leadership opportunities and 
                  the ability to guide teams through complex technical decisions.
                </p>
                <motion.button
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 10px 30px rgba(0, 212, 255, 0.3)",
                    background: "linear-gradient(to right, #3B82F6, #06B6D4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onChapterComplete}
                >
                  Continue to Chapter 3: The Leadership
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.section>
        </div>

        {/* Scroll Progress Indicator */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 z-50 origin-left"
          style={{ scaleX: scrollYProgress }}
        />
      </div>
    </StoryChapter>
  );
}

// Puzzle Piece SVG Component
function PuzzlePiece({ size = 40, color = "#00D4FF" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill={color}>
      <path d="M20,20 L50,20 Q60,10 70,20 L80,20 L80,50 Q90,60 80,70 L80,80 L50,80 Q40,90 30,80 L20,80 L20,50 Q10,40 20,30 Z" />
    </svg>
  );
}

// Problem-Solution Card Component
interface ProblemSolutionCardProps {
  pair: ProblemSolutionPair;
  index: number;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: () => void;
  onHover: () => void;
  onLeave: () => void;
  inView: boolean;
}

function ProblemSolutionCard({ 
  pair, 
  index, 
  isSelected, 
  isHovered, 
  onSelect, 
  onHover, 
  onLeave, 
  inView 
}: ProblemSolutionCardProps) {
  return (
    <motion.div
      className="relative cursor-pointer"
      initial={{ opacity: 0, y: 50, rotate: -5 }}
      animate={inView ? { 
        opacity: 1, 
        y: 0, 
        rotate: isHovered ? 0 : -2 + Math.random() * 4 
      } : { opacity: 0, y: 50, rotate: -5 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        type: "spring",
        stiffness: 200
      }}
      whileHover={{ 
        scale: 1.02,
        rotate: 0,
        transition: { duration: 0.2 }
      }}
      onClick={onSelect}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 backdrop-blur-sm border border-cyan-300/30 rounded-xl p-6 h-full">
        {/* Puzzle piece icon */}
        <motion.div
          className="flex items-center mb-4"
          animate={{ rotate: isHovered ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <PuzzlePiece size={24} color="#00D4FF" />
          <h4 className="text-lg font-bold text-cyan-100 ml-3">
            Challenge #{index + 1}
          </h4>
        </motion.div>

        {/* Problem */}
        <div className="mb-4">
          <h5 className="text-sm font-semibold text-red-300 mb-2 uppercase tracking-wide">
            Problem
          </h5>
          <p className="text-cyan-200/90 text-sm leading-relaxed">
            {pair.problem}
          </p>
        </div>

        {/* Solution - Revealed on hover/selection */}
        <AnimatePresence>
          {(isHovered || isSelected) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mb-4">
                <h5 className="text-sm font-semibold text-green-300 mb-2 uppercase tracking-wide">
                  Solution
                </h5>
                <p className="text-cyan-200/90 text-sm leading-relaxed">
                  {pair.solution}
                </p>
              </div>

              <div>
                <h5 className="text-sm font-semibold text-yellow-300 mb-2 uppercase tracking-wide">
                  Impact
                </h5>
                <p className="text-cyan-200/90 text-sm leading-relaxed font-medium">
                  {pair.impact}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Hover indicator */}
        <motion.div
          className="absolute bottom-2 right-2 text-cyan-400/60 text-xs"
          animate={{ opacity: isHovered ? 1 : 0.3 }}
        >
          {isHovered || isSelected ? "Click to pin" : "Hover to reveal"}
        </motion.div>
      </div>
    </motion.div>
  );
}