"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/lib/types/project';
import { X, ExternalLink, Github, ChevronLeft, ChevronRight, Play, Code } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  hasNext?: boolean;
  hasPrevious?: boolean;
}

export function ProjectModal({
  project,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  hasNext,
  hasPrevious
}: ProjectModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showDemo, setShowDemo] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'technical' | 'impact'>('overview');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (hasPrevious) onPrevious?.();
          break;
        case 'ArrowRight':
          if (hasNext) onNext?.();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, hasNext, hasPrevious, onClose, onNext, onPrevious]);

  if (!project) return null;

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1
    },
    exit: { 
      opacity: 0, 
      scale: 0.95
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-6xl max-h-[90vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {project.title}
                </h2>
                {project.featured && (
                  <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Featured
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                {/* Navigation */}
                {(hasPrevious || hasNext) && (
                  <div className="flex items-center space-x-1 mr-4">
                    <button
                      onClick={onPrevious}
                      disabled={!hasPrevious}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={onNext}
                      disabled={!hasNext}
                      className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </div>
                )}
                
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col lg:flex-row h-full max-h-[calc(90vh-80px)]">
              {/* Left Side - Media */}
              <div className="lg:w-1/2 bg-gray-50 dark:bg-gray-800">
                {showDemo && project.demoUrl ? (
                  <div className="h-full">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Live Demo
                      </span>
                      <button
                        onClick={() => setShowDemo(false)}
                        className="text-sm text-blue-600 hover:text-blue-700"
                      >
                        View Images
                      </button>
                    </div>
                    <iframe
                      src={project.demoUrl}
                      className="w-full h-full border-0"
                      title={`${project.title} Demo`}
                    />
                  </div>
                ) : (
                  <div className="h-full flex flex-col">
                    {/* Image Gallery */}
                    <div className="flex-1 relative">
                      {project.images.length > 0 && (
                        <>
                          <img
                            src={project.images[activeImageIndex]}
                            alt={`${project.title} screenshot ${activeImageIndex + 1}`}
                            className="w-full h-full object-cover"
                          />
                          
                          {project.images.length > 1 && (
                            <>
                              <button
                                onClick={() => setActiveImageIndex(
                                  activeImageIndex > 0 ? activeImageIndex - 1 : project.images.length - 1
                                )}
                                className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
                              >
                                <ChevronLeft size={20} />
                              </button>
                              <button
                                onClick={() => setActiveImageIndex(
                                  activeImageIndex < project.images.length - 1 ? activeImageIndex + 1 : 0
                                )}
                                className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 bg-black/50 text-white rounded-full hover:bg-black/70"
                              >
                                <ChevronRight size={20} />
                              </button>
                            </>
                          )}
                        </>
                      )}
                    </div>
                    
                    {/* Image Thumbnails */}
                    {project.images.length > 1 && (
                      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex space-x-2 overflow-x-auto">
                          {project.images.map((image, index) => (
                            <button
                              key={index}
                              onClick={() => setActiveImageIndex(index)}
                              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 ${
                                index === activeImageIndex
                                  ? 'border-blue-500'
                                  : 'border-transparent hover:border-gray-300'
                              }`}
                            >
                              <img
                                src={image}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {/* Demo Button */}
                    {project.demoUrl && (
                      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <button
                          onClick={() => setShowDemo(true)}
                          className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                          <Play size={16} />
                          <span>View Live Demo</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Side - Details */}
              <div className="lg:w-1/2 flex flex-col">
                {/* Tabs */}
                <div className="flex border-b border-gray-200 dark:border-gray-700">
                  {[
                    { id: 'overview', label: 'Overview' },
                    { id: 'technical', label: 'Technical' },
                    { id: 'impact', label: 'Impact' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                          : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {activeTab === 'overview' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          Description
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      {project.storyIntegration && (
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-4 rounded-lg">
                          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                            Story Context
                          </h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                            "{project.storyIntegration}"
                          </p>
                        </div>
                      )}

                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                          Category
                        </h4>
                        <span className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                          {project.category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      </div>
                    </div>
                  )}

                  {activeTab === 'technical' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          Technologies
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {['frontend', 'backend', 'database', 'tool', 'cloud'].map(category => {
                            const techs = project.technologies.filter(t => t.category === category);
                            if (techs.length === 0) return null;
                            
                            return (
                              <div key={category} className="space-y-2">
                                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                                  {category}
                                </h4>
                                <div className="space-y-1">
                                  {techs.map((tech, index) => (
                                    <div key={index} className="flex items-center justify-between text-sm">
                                      <span className="text-gray-900 dark:text-white">{tech.name}</span>
                                      <span className={`px-2 py-1 rounded text-xs ${
                                        tech.proficiency === 'expert' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                                        tech.proficiency === 'advanced' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                                        tech.proficiency === 'intermediate' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                                        'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300'
                                      }`}>
                                        {tech.proficiency}
                                      </span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="bg-gray-900 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-semibold text-white">Code Example</h4>
                          <Code size={16} className="text-gray-400" />
                        </div>
                        <pre className="text-sm text-gray-300 overflow-x-auto">
                          <code>
{`// ${project.title} - Key Implementation
const ${project.id.replace(/-/g, '')}App = () => {
  const [state, setState] = useState(initialState);
  
  useEffect(() => {
    // Initialize ${project.title}
    initializeProject();
  }, []);
  
  const handleUserInteraction = (event) => {
    // Handle user interactions
    setState(prevState => ({
      ...prevState,
      [event.type]: event.value
    }));
  };
  
  return (
    <ProjectContainer>
      <Header title="${project.title}" />
      <MainContent 
        data={state}
        onInteraction={handleUserInteraction}
      />
    </ProjectContainer>
  );
};`}
                          </code>
                        </pre>
                      </div>
                    </div>
                  )}

                  {activeTab === 'impact' && (
                    <div className="space-y-6">
                      {project.impact && (
                        <>
                          <div className="grid grid-cols-2 gap-4">
                            {project.impact.userReach && (
                              <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                  {project.impact.userReach.toLocaleString()}
                                </div>
                                <div className="text-sm text-blue-700 dark:text-blue-300">Users Reached</div>
                              </div>
                            )}
                            {project.impact.teamSize && (
                              <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                                <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                  {project.impact.teamSize}
                                </div>
                                <div className="text-sm text-green-700 dark:text-green-300">Team Members</div>
                              </div>
                            )}
                          </div>

                          {project.impact.performanceImprovement && (
                            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
                              <h4 className="text-sm font-semibold text-orange-800 dark:text-orange-300 mb-2">
                                Performance Impact
                              </h4>
                              <p className="text-orange-700 dark:text-orange-400">
                                {project.impact.performanceImprovement}
                              </p>
                            </div>
                          )}

                          {project.impact.businessValue && (
                            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
                              <h4 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-2">
                                Business Value
                              </h4>
                              <p className="text-green-700 dark:text-green-400">
                                {project.impact.businessValue}
                              </p>
                            </div>
                          )}

                          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
                            <h4 className="text-sm font-semibold text-purple-800 dark:text-purple-300 mb-2">
                              Project Timeline
                            </h4>
                            <p className="text-purple-700 dark:text-purple-400">
                              Completed in {project.impact.timeframe}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                </div>

                {/* Footer Actions */}
                <div className="border-t border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex space-x-3">
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                      >
                        <ExternalLink size={16} />
                        <span>Live Demo</span>
                      </a>
                    )}
                    {project.codeUrl && (
                      <a
                        href={project.codeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors"
                      >
                        <Github size={16} />
                        <span>View Code</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}