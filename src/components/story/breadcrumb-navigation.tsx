"use client";

import { motion } from 'framer-motion';
import { ChevronRight, Home } from 'lucide-react';
import { Chapter } from '@/lib/types';

interface BreadcrumbItem {
  id: string;
  title: string;
  href?: string;
  isActive?: boolean;
  isAccessible?: boolean;
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[];
  onNavigate?: (item: BreadcrumbItem) => void;
  showHome?: boolean;
  className?: string;
}

export function BreadcrumbNavigation({
  items,
  onNavigate,
  showHome = true,
  className = ''
}: BreadcrumbNavigationProps) {
  const handleItemClick = (item: BreadcrumbItem) => {
    if (item.isAccessible !== false && onNavigate) {
      onNavigate(item);
    }
  };

  return (
    <nav className={`breadcrumb-navigation ${className}`} aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-sm">
        {showHome && (
          <>
            <li>
              <motion.button
                className="flex items-center text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate?.({ id: 'home', title: 'Home' })}
              >
                <Home className="w-4 h-4" />
                <span className="sr-only">Home</span>
              </motion.button>
            </li>
            {items.length > 0 && (
              <li>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </li>
            )}
          </>
        )}

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isAccessible = item.isAccessible !== false;

          return (
            <li key={item.id} className="flex items-center">
              <motion.button
                className={`transition-colors ${
                  item.isActive
                    ? 'text-blue-600 dark:text-blue-400 font-medium'
                    : isAccessible
                    ? 'text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100'
                    : 'text-gray-400 cursor-not-allowed'
                }`}
                whileHover={isAccessible ? { scale: 1.05 } : {}}
                whileTap={isAccessible ? { scale: 0.95 } : {}}
                onClick={() => handleItemClick(item)}
                disabled={!isAccessible}
                aria-current={item.isActive ? 'page' : undefined}
              >
                {item.title}
              </motion.button>

              {!isLast && (
                <ChevronRight className="w-4 h-4 text-gray-400 ml-2" />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

// Story Position Indicator Component
interface StoryPositionIndicatorProps {
  currentChapter: number;
  totalChapters: number;
  chapterTitle: string;
  completionPercentage: number;
  className?: string;
}

export function StoryPositionIndicator({
  currentChapter,
  totalChapters,
  chapterTitle,
  completionPercentage,
  className = ''
}: StoryPositionIndicatorProps) {
  return (
    <div className={`story-position-indicator ${className}`}>
      {/* Chapter Info */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <h4 className="text-sm font-medium text-gray-800 dark:text-gray-200">
            Chapter {currentChapter + 1}: {chapterTitle}
          </h4>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            {currentChapter + 1} of {totalChapters} chapters
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
            {Math.round(completionPercentage)}%
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Complete</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <motion.div
          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${completionPercentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>

      {/* Chapter Dots */}
      <div className="flex justify-between mt-3">
        {Array.from({ length: totalChapters }, (_, index) => {
          const isCompleted = index < currentChapter;
          const isCurrent = index === currentChapter;
          const isAccessible = index <= currentChapter + 1;

          return (
            <motion.div
              key={index}
              className={`w-3 h-3 rounded-full ${
                isCurrent
                  ? 'bg-blue-600 ring-2 ring-blue-200 dark:ring-blue-800'
                  : isCompleted
                  ? 'bg-green-500'
                  : isAccessible
                  ? 'bg-gray-300 dark:bg-gray-600'
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
              whileHover={isAccessible ? { scale: 1.2 } : {}}
              animate={{
                scale: isCurrent ? 1.2 : 1,
              }}
              transition={{ duration: 0.2 }}
            />
          );
        })}
      </div>
    </div>
  );
}

// Combined Navigation Component
interface StoryNavigationProps {
  currentChapter: number;
  totalChapters: number;
  chapterTitle: string;
  completionPercentage: number;
  breadcrumbItems: BreadcrumbItem[];
  onNavigate?: (item: BreadcrumbItem) => void;
  className?: string;
}

export function StoryNavigation({
  currentChapter,
  totalChapters,
  chapterTitle,
  completionPercentage,
  breadcrumbItems,
  onNavigate,
  className = ''
}: StoryNavigationProps) {
  return (
    <div className={`story-navigation ${className}`}>
      <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
        {/* Breadcrumb Navigation */}
        <BreadcrumbNavigation
          items={breadcrumbItems}
          onNavigate={onNavigate}
          className="order-2 lg:order-1"
        />

        {/* Story Position Indicator */}
        <StoryPositionIndicator
          currentChapter={currentChapter}
          totalChapters={totalChapters}
          chapterTitle={chapterTitle}
          completionPercentage={completionPercentage}
          className="order-1 lg:order-2 lg:w-64"
        />
      </div>
    </div>
  );
}