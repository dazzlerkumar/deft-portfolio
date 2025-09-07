"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Project, ProjectShowcaseConfig } from '@/lib/types/project';
import { ExternalLink, Github, Code, Users, Clock, TrendingUp } from 'lucide-react';

interface ProjectShowcaseProps {
  project: Project;
  storyContext?: string;
  config?: Partial<ProjectShowcaseConfig>;
  onProjectSelect?: (project: Project) => void;
  className?: string;
  variant?: 'default' | 'challenge' | 'leadership';
}

export function ProjectShowcase({ 
  project, 
  storyContext, 
  config = {}, 
  onProjectSelect,
  className = "",
  variant = 'default'
}: ProjectShowcaseProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [showCode, setShowCode] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const defaultConfig: ProjectShowcaseConfig = {
    interactionType: 'hover',
    visualStyle: 'card',
    animationPreset: 'fade',
    ...config
  };

  const handleProjectClick = () => {
    if (defaultConfig.interactionType === 'click') {
      setIsExpanded(!isExpanded);
      onProjectSelect?.(project);
    }
  };

  const handleMouseEnter = () => {
    if (defaultConfig.interactionType === 'hover') {
      setIsExpanded(true);
    }
  };

  const handleMouseLeave = () => {
    if (defaultConfig.interactionType === 'hover') {
      setIsExpanded(false);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1
    },
    hover: { 
      y: variant === 'challenge' ? -4 : -8, 
      scale: variant === 'challenge' ? 1.01 : 1.02
    }
  };

  const contentVariants = {
    collapsed: { height: 0, opacity: 0 },
    expanded: { 
      height: "auto", 
      opacity: 1
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`project-showcase relative ${className}`}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleProjectClick}
    >
      <div className={`rounded-2xl shadow-lg overflow-hidden border cursor-pointer ${
        variant === 'challenge' 
          ? 'bg-gradient-to-br from-blue-900/60 to-cyan-900/60 backdrop-blur-sm border-cyan-300/30' 
          : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700'
      }`}>
        {/* Project Header */}
        <div className="relative">
          {project.images.length > 0 && (
            <div className="relative h-48 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={project.images[activeImage]}
                  alt={`${project.title} screenshot ${activeImage + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                />
              </AnimatePresence>
              
              {project.images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {project.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImage(index);
                      }}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === activeImage 
                          ? 'bg-white' 
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                    />
                  ))}
                </div>
              )}
              
              {project.featured && (
                <div className="absolute top-4 right-4">
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                </div>
              )}
            </div>
          )}
          
          <div className="p-6">
            <div className="flex items-start justify-between mb-3">
              <h3 className={`text-xl font-bold ${
                variant === 'challenge' 
                  ? 'text-cyan-100' 
                  : 'text-gray-900 dark:text-white'
              }`}>
                {project.title}
              </h3>
              <div className="flex space-x-2">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
                {project.codeUrl && (
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    <Github size={18} />
                  </a>
                )}
              </div>
            </div>
            
            <p className={`mb-4 line-clamp-2 ${
              variant === 'challenge' 
                ? 'text-cyan-200/90' 
                : 'text-gray-600 dark:text-gray-300'
            }`}>
              {project.description}
            </p>
            
            {storyContext && (
              <div className={`p-4 rounded-lg mb-4 ${
                variant === 'challenge'
                  ? 'bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-400/20'
                  : 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20'
              }`}>
                <p className={`text-sm italic ${
                  variant === 'challenge'
                    ? 'text-cyan-200/90'
                    : 'text-gray-700 dark:text-gray-300'
                }`}>
                  "{project.storyIntegration}"
                </p>
              </div>
            )}
            
            {/* Technology Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.technologies.slice(0, 4).map((tech, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    tech.category === 'frontend' 
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                      : tech.category === 'backend'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                      : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                  }`}
                >
                  {tech.name}
                </span>
              ))}
              {project.technologies.length > 4 && (
                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400">
                  +{project.technologies.length - 4} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Expandable Content */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              variants={contentVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              className="border-t border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-6 space-y-4">
                {/* Impact Metrics */}
                {project.impact && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {project.impact.userReach && (
                      <div className="text-center">
                        <Users className="w-5 h-5 mx-auto mb-1 text-blue-500" />
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          {project.impact.userReach.toLocaleString()}
                        </div>
                        <div className="text-xs text-gray-500">Users Reached</div>
                      </div>
                    )}
                    {project.impact.teamSize && (
                      <div className="text-center">
                        <Users className="w-5 h-5 mx-auto mb-1 text-green-500" />
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          {project.impact.teamSize}
                        </div>
                        <div className="text-xs text-gray-500">Team Size</div>
                      </div>
                    )}
                    {project.impact.timeframe && (
                      <div className="text-center">
                        <Clock className="w-5 h-5 mx-auto mb-1 text-purple-500" />
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          {project.impact.timeframe}
                        </div>
                        <div className="text-xs text-gray-500">Duration</div>
                      </div>
                    )}
                    {project.impact.performanceImprovement && (
                      <div className="text-center">
                        <TrendingUp className="w-5 h-5 mx-auto mb-1 text-orange-500" />
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                          {project.impact.performanceImprovement}
                        </div>
                        <div className="text-xs text-gray-500">Improvement</div>
                      </div>
                    )}
                  </div>
                )}

                {/* All Technologies */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          tech.category === 'frontend' 
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
                            : tech.category === 'backend'
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300'
                            : tech.category === 'database'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                            : tech.category === 'cloud'
                            ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300'
                            : 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300'
                        }`}
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Business Value */}
                {project.impact.businessValue && (
                  <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-1">
                      Business Impact
                    </h4>
                    <p className="text-sm text-green-700 dark:text-green-400">
                      {project.impact.businessValue}
                    </p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex space-x-3 pt-2">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      <ExternalLink size={16} />
                      <span>View Demo</span>
                    </a>
                  )}
                  {project.codeUrl && (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors"
                    >
                      <Github size={16} />
                      <span>View Code</span>
                    </a>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setShowCode(!showCode);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <Code size={16} />
                    <span>Code Snippet</span>
                  </button>
                </div>

                {/* Code Snippet Display */}
                <AnimatePresence>
                  {showCode && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-gray-900 rounded-lg p-4 overflow-hidden"
                    >
                      <pre className="text-sm text-gray-300 overflow-x-auto">
                        <code>
{`// Example code snippet for ${project.title}
const ${project.id.replace(/-/g, '')}Component = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    // Initialize ${project.title}
    console.log('${project.title} initialized');
  }, []);
  
  return (
    <div className="project-container">
      <h1>{project.title}</h1>
      {/* Implementation details... */}
    </div>
  );
};`}
                        </code>
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}