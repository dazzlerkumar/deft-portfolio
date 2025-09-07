"use client";

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, ProjectCategory } from '@/lib/types/project';
import { ProjectShowcase } from './project-showcase';
import { Filter, Grid, List } from 'lucide-react';

interface ProjectGridProps {
  projects: Project[];
  storyContext?: string;
  showFilters?: boolean;
  defaultCategory?: ProjectCategory | 'all';
  layout?: 'grid' | 'list';
  onProjectSelect?: (project: Project) => void;
  className?: string;
}

export function ProjectGrid({
  projects,
  storyContext,
  showFilters = true,
  defaultCategory = 'all',
  layout = 'grid',
  onProjectSelect,
  className = ""
}: ProjectGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'all'>(defaultCategory);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>(layout);
  const [sortBy, setSortBy] = useState<'title' | 'category' | 'featured'>('featured');

  const categories: Array<{ value: ProjectCategory | 'all'; label: string }> = [
    { value: 'all', label: 'All Projects' },
    { value: 'web-application', label: 'Web Apps' },
    { value: 'mobile-app', label: 'Mobile Apps' },
    { value: 'library', label: 'Libraries' },
    { value: 'tool', label: 'Tools' },
    { value: 'experiment', label: 'Experiments' },
    { value: 'leadership', label: 'Leadership' }
  ];

  const filteredAndSortedProjects = useMemo(() => {
    let filtered = projects;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }
    
    // Sort projects
    filtered = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title);
        case 'category':
          return a.category.localeCompare(b.category);
        case 'featured':
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
    
    return filtered;
  }, [projects, selectedCategory, sortBy]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className={`project-grid ${className}`}>
      {/* Filters and Controls */}
      {showFilters && (
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter size={20} className="text-gray-500" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value as ProjectCategory | 'all')}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode and Sort */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600 dark:text-gray-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'title' | 'category' | 'featured')}
                  className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm"
                >
                  <option value="featured">Featured First</option>
                  <option value="title">Title</option>
                  <option value="category">Category</option>
                </select>
              </div>

              <div className="flex items-center space-x-1 border border-gray-300 dark:border-gray-600 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${
                    viewMode === 'grid'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Grid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${
                    viewMode === 'list'
                      ? 'bg-blue-500 text-white'
                      : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredAndSortedProjects.length} of {projects.length} projects
          </div>
        </div>
      )}

      {/* Projects Grid/List */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={
          viewMode === 'grid'
            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
            : 'space-y-6'
        }
      >
        <AnimatePresence mode="popLayout">
          {filteredAndSortedProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              layout
              initial="hidden"
              animate="visible"
              exit="hidden"
              className={viewMode === 'list' ? 'w-full' : ''}
            >
              <ProjectShowcase
                project={project}
                storyContext={storyContext}
                config={{
                  interactionType: 'hover',
                  visualStyle: 'card',
                  animationPreset: 'fade'
                }}
                onProjectSelect={onProjectSelect}
                className="h-full"
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Empty State */}
      {filteredAndSortedProjects.length === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-12"
        >
          <div className="text-gray-400 mb-4">
            <Filter size={48} className="mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No projects found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your filters to see more projects.
          </p>
        </motion.div>
      )}
    </div>
  );
}