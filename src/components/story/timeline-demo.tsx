"use client";

import { useState, useEffect } from 'react';
import { InteractiveTimeline } from './interactive-timeline';
import { BreadcrumbNavigation, StoryNavigation } from './breadcrumb-navigation';
import { useProgressTracker } from '@/lib/utils/progress-tracker';
import { timelineEvents } from '@/content/timeline';
import { TimelineEvent } from '@/lib/types';

export function TimelineDemo() {
  const {
    progress,
    setCurrentChapter,
    visitSection,
    addInteraction,
    updatePreferences
  } = useProgressTracker();

  const [currentPosition, setCurrentPosition] = useState(progress.currentChapter);

  // Update current position when progress changes
  useEffect(() => {
    setCurrentPosition(progress.currentChapter);
  }, [progress.currentChapter]);

  const handleEventSelect = (event: TimelineEvent) => {
    // Find the chapter number from the event
    const chapterNumber = timelineEvents.findIndex(e => e.id === event.id);
    
    if (chapterNumber >= 0) {
      setCurrentChapter(chapterNumber);
      setCurrentPosition(event.position);
      visitSection(event.id);
      
      addInteraction({
        id: `timeline-click-${Date.now()}`,
        type: 'timeline_click',
        data: {
          elementId: event.id,
          chapterId: event.chapterId
        }
      });
    }
  };

  const breadcrumbItems = [
    {
      id: 'chapter-1',
      title: 'The Beginning',
      isActive: currentPosition >= 0 && currentPosition <= 2,
      isAccessible: true
    },
    {
      id: 'chapter-2',
      title: 'The Challenges',
      isActive: currentPosition >= 3 && currentPosition <= 5,
      isAccessible: currentPosition >= 2
    },
    {
      id: 'chapter-3',
      title: 'The Leadership',
      isActive: currentPosition >= 6 && currentPosition <= 8,
      isAccessible: currentPosition >= 5
    },
    {
      id: 'chapter-4',
      title: 'The Vision',
      isActive: currentPosition >= 9 && currentPosition <= 9,
      isAccessible: currentPosition >= 8
    },
    {
      id: 'epilogue',
      title: 'The Code',
      isActive: currentPosition >= 10,
      isAccessible: currentPosition >= 9
    }
  ];

  const handleBreadcrumbNavigate = (item: any) => {
    if (item.id === 'home') {
      setCurrentChapter(0);
      setCurrentPosition(0);
      return;
    }

    // Find the first event for this chapter
    const chapterEvent = timelineEvents.find(event => 
      event.chapterId === item.id || event.id === item.id
    );
    
    if (chapterEvent) {
      handleEventSelect(chapterEvent);
    }
  };

  const getCurrentChapterTitle = () => {
    const currentEvent = timelineEvents.find(event => event.position === currentPosition);
    return currentEvent?.title || 'Story Journey';
  };

  return (
    <div className="timeline-demo p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          Interactive Story Timeline Demo
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          This demo shows the interactive timeline and progress tracking system in action.
          Click on timeline events to navigate through the story.
        </p>

        {/* Progress Summary */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Current Progress
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Chapter:</span>
              <span className="ml-2 font-medium">{progress.currentChapter + 1}</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Completion:</span>
              <span className="ml-2 font-medium">{Math.round(progress.completionPercentage)}%</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Sections Visited:</span>
              <span className="ml-2 font-medium">{progress.visitedSections.length}</span>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Interactions:</span>
              <span className="ml-2 font-medium">{progress.interactionHistory.length}</span>
            </div>
          </div>
        </div>

        {/* Preferences Controls */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">
            User Preferences
          </h3>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={progress.preferences.reducedMotion}
                onChange={(e) => updatePreferences({ reducedMotion: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm">Reduced Motion</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={progress.preferences.skipAnimations}
                onChange={(e) => updatePreferences({ skipAnimations: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm">Skip Animations</span>
            </label>
            <label className="flex items-center">
              <select
                value={progress.preferences.preferredNavigationStyle}
                onChange={(e) => updatePreferences({ 
                  preferredNavigationStyle: e.target.value as 'story' | 'traditional' 
                })}
                className="ml-2 text-sm border rounded px-2 py-1"
              >
                <option value="story">Story Navigation</option>
                <option value="traditional">Traditional Navigation</option>
              </select>
              <span className="text-sm ml-2">Navigation Style</span>
            </label>
          </div>
        </div>
      </div>

      {/* Story Navigation */}
      <div className="mb-8">
        <StoryNavigation
          currentChapter={progress.currentChapter}
          totalChapters={5}
          chapterTitle={getCurrentChapterTitle()}
          completionPercentage={progress.completionPercentage}
          breadcrumbItems={breadcrumbItems}
          onNavigate={handleBreadcrumbNavigate}
          className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700"
        />
      </div>

      {/* Interactive Timeline */}
      <div className="mb-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <InteractiveTimeline
            events={timelineEvents}
            currentPosition={currentPosition}
            onEventSelect={handleEventSelect}
            userProgress={progress}
          />
        </div>
      </div>

      {/* Current Event Details */}
      {timelineEvents[currentPosition] && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Current: {timelineEvents[currentPosition].title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {timelineEvents[currentPosition].description}
          </p>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-500">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded mr-3">
              {timelineEvents[currentPosition].date}
            </span>
            <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-2 py-1 rounded">
              Chapter: {timelineEvents[currentPosition].chapterId}
            </span>
          </div>
        </div>
      )}

      {/* Debug Information */}
      <details className="mt-8">
        <summary className="cursor-pointer text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200">
          Debug Information
        </summary>
        <div className="mt-4 bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
          <pre className="text-xs overflow-auto">
            {JSON.stringify({
              currentPosition,
              progress: {
                ...progress,
                lastVisit: progress.lastVisit.toISOString()
              }
            }, null, 2)}
          </pre>
        </div>
      </details>
    </div>
  );
}