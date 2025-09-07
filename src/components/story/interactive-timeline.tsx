"use client";

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TimelineEvent, UserProgress } from '@/lib/types';

interface InteractiveTimelineProps {
  events: TimelineEvent[];
  currentPosition: number;
  onEventSelect: (event: TimelineEvent) => void;
  userProgress?: UserProgress;
  className?: string;
}

export function InteractiveTimeline({
  events,
  currentPosition,
  onEventSelect,
  userProgress,
  className = ''
}: InteractiveTimelineProps) {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null);
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to current position
  useEffect(() => {
    if (timelineRef.current && currentPosition >= 0) {
      const currentEventElement = timelineRef.current.querySelector(
        `[data-event-position="${currentPosition}"]`
      );
      if (currentEventElement) {
        currentEventElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'center'
        });
      }
    }
  }, [currentPosition]);

  const handleEventClick = (event: TimelineEvent) => {
    setSelectedEvent(event);
    onEventSelect(event);
  };

  const isEventVisited = (eventId: string) => {
    return userProgress?.visitedSections.includes(eventId) || false;
  };

  const isEventCurrent = (position: number) => {
    return position === currentPosition;
  };

  const isEventAccessible = (position: number) => {
    // Allow access to current and previous events, plus one ahead
    return position <= currentPosition + 1;
  };

  return (
    <div className={`interactive-timeline ${className}`}>
      {/* Timeline Header */}
      <div className="timeline-header mb-6">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Story Progress
        </h3>
        <div className="progress-indicator mt-2">
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-blue-600 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ 
                width: `${((currentPosition + 1) / events.length) * 100}%` 
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {currentPosition + 1} of {events.length} milestones
          </p>
        </div>
      </div>

      {/* Timeline Events */}
      <div 
        ref={timelineRef}
        className="timeline-events relative overflow-x-auto pb-4"
      >
        <div className="flex space-x-4 min-w-max">
          {events.map((event, index) => {
            const isVisited = isEventVisited(event.id);
            const isCurrent = isEventCurrent(event.position);
            const isAccessible = isEventAccessible(event.position);
            const isHovered = hoveredEvent === event.id;

            return (
              <motion.div
                key={event.id}
                data-event-position={event.position}
                className={`timeline-event relative flex-shrink-0 w-48 cursor-pointer ${
                  !isAccessible ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                whileHover={isAccessible ? { scale: 1.05 } : {}}
                whileTap={isAccessible ? { scale: 0.95 } : {}}
                onMouseEnter={() => isAccessible && setHoveredEvent(event.id)}
                onMouseLeave={() => setHoveredEvent(null)}
                onClick={() => isAccessible && handleEventClick(event)}
              >
                {/* Timeline Line */}
                {index < events.length - 1 && (
                  <div className="absolute top-6 left-full w-4 h-0.5 bg-gray-300 dark:bg-gray-600 z-0" />
                )}

                {/* Event Node */}
                <div className="relative z-10">
                  <motion.div
                    className={`w-12 h-12 rounded-full border-4 flex items-center justify-center mb-3 ${
                      isCurrent
                        ? 'bg-blue-600 border-blue-600 text-white'
                        : isVisited
                        ? 'bg-green-500 border-green-500 text-white'
                        : isAccessible
                        ? 'bg-white border-gray-300 text-gray-600 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300'
                        : 'bg-gray-100 border-gray-200 text-gray-400 dark:bg-gray-900 dark:border-gray-800'
                    }`}
                    animate={{
                      scale: isCurrent ? 1.2 : isHovered ? 1.1 : 1,
                      boxShadow: isCurrent 
                        ? '0 0 20px rgba(59, 130, 246, 0.5)' 
                        : isHovered 
                        ? '0 4px 12px rgba(0, 0, 0, 0.15)' 
                        : '0 2px 4px rgba(0, 0, 0, 0.1)'
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {isVisited ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className="text-sm font-bold">{index + 1}</span>
                    )}
                  </motion.div>

                  {/* Event Content */}
                  <div className="text-center">
                    <h4 className={`font-medium text-sm mb-1 ${
                      isCurrent 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-gray-800 dark:text-gray-200'
                    }`}>
                      {event.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                      {event.date}
                    </p>
                    
                    {/* Expandable Description */}
                    <AnimatePresence>
                      {(isHovered || selectedEvent?.id === event.id) && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20 w-64"
                        >
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            {event.description}
                          </p>
                          {isAccessible && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEventClick(event);
                              }}
                              className="mt-2 px-3 py-1 bg-blue-600 text-white text-xs rounded hover:bg-blue-700 transition-colors"
                            >
                              Go to Chapter
                            </button>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Skip Ahead Button */}
      <div className="timeline-actions mt-6 flex justify-center">
        <motion.button
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors text-sm"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const nextEvent = events.find(e => e.position > currentPosition);
            if (nextEvent) {
              handleEventClick(nextEvent);
            }
          }}
          disabled={currentPosition >= events.length - 1}
        >
          Skip to Next Chapter
        </motion.button>
      </div>
    </div>
  );
}