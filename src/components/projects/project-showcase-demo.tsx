"use client";

import React, { useState } from 'react';
import { ProjectShowcase, ProjectGrid, ProjectModal } from './';
import { projectData, getProjectsByChapter, getFeaturedProjects } from '@/content/projects/project-data';
import { Project } from '@/lib/types/project';

export function ProjectShowcaseDemo() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentView, setCurrentView] = useState<'showcase' | 'grid' | 'chapter'>('showcase');

  const featuredProjects = getFeaturedProjects();
  const chapter1Projects = getProjectsByChapter('1');
  const firstProject = Object.values(projectData)[0];

  const handleProjectSelect = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">
          Project Showcase System Demo
        </h1>

        {/* View Selector */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2 bg-white dark:bg-gray-800 rounded-lg p-1 shadow-lg">
            <button
              onClick={() => setCurrentView('showcase')}
              className={`px-4 py-2 rounded-md transition-colors ${
                currentView === 'showcase'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Single Showcase
            </button>
            <button
              onClick={() => setCurrentView('grid')}
              className={`px-4 py-2 rounded-md transition-colors ${
                currentView === 'grid'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Project Grid
            </button>
            <button
              onClick={() => setCurrentView('chapter')}
              className={`px-4 py-2 rounded-md transition-colors ${
                currentView === 'chapter'
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`}
            >
              Chapter Projects
            </button>
          </div>
        </div>

        {/* Content */}
        {currentView === 'showcase' && (
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
              Individual Project Showcase
            </h2>
            <ProjectShowcase
              project={firstProject}
              storyContext="This demonstrates how a single project is showcased within the story context."
              config={{
                interactionType: 'hover',
                visualStyle: 'card',
                animationPreset: 'fade'
              }}
              onProjectSelect={handleProjectSelect}
            />
          </div>
        )}

        {currentView === 'grid' && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              Featured Projects Grid
            </h2>
            <ProjectGrid
              projects={featuredProjects}
              storyContext="These are the featured projects that showcase key milestones in the developer's journey."
              showFilters={true}
              defaultCategory="all"
              layout="grid"
              onProjectSelect={handleProjectSelect}
            />
          </div>
        )}

        {currentView === 'chapter' && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6 text-center">
              Chapter 1: "The Beginning" Projects
            </h2>
            <ProjectGrid
              projects={chapter1Projects}
              storyContext="These projects represent the early learning phase, where curiosity met code and the foundation was built."
              showFilters={false}
              layout="grid"
              onProjectSelect={handleProjectSelect}
            />
          </div>
        )}

        {/* Project Modal */}
        <ProjectModal
          project={selectedProject}
          isOpen={isModalOpen}
          onClose={closeModal}
          hasNext={false}
          hasPrevious={false}
        />

        {/* Demo Information */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Project Showcase System Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-white">Interactive Components</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Hover and click interactions</li>
                <li>• Smooth animations</li>
                <li>• Image galleries</li>
                <li>• Code snippet display</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-white">Story Integration</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Context-aware presentation</li>
                <li>• Chapter-based organization</li>
                <li>• Narrative flow</li>
                <li>• Progressive disclosure</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-white">Advanced Features</h4>
              <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Filtering and sorting</li>
                <li>• Grid and list views</li>
                <li>• Modal exploration</li>
                <li>• Impact metrics display</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}