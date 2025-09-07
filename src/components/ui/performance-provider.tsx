'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { performanceOptimizer, usePerformanceOptimizer } from '@/lib/utils/performance-optimizer';
import type { WebVitalsMetrics } from '@/lib/utils/performance-monitor';

interface PerformanceContextType {
  metrics: WebVitalsMetrics;
  performanceScore: number;
  isLoading: boolean;
  preloadChapter: (chapter: number) => Promise<void>;
  getResourceAnalysis: () => any;
}

const PerformanceContext = createContext<PerformanceContextType | null>(null);

interface PerformanceProviderProps {
  children: ReactNode;
}

export function PerformanceProvider({ children }: PerformanceProviderProps) {
  const [metrics, setMetrics] = useState<WebVitalsMetrics>({});
  const [performanceScore, setPerformanceScore] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize performance optimizations
    const initializePerformance = async () => {
      try {
        // Initialize the performance optimizer
        await performanceOptimizer.initialize();
        
        // Update metrics periodically
        const updateMetrics = () => {
          const insights = performanceOptimizer.getPerformanceInsights();
          setMetrics(insights.metrics);
          setPerformanceScore(insights.score);
        };

        // Initial update
        updateMetrics();
        
        // Update every 5 seconds
        const interval = setInterval(updateMetrics, 5000);
        
        setIsLoading(false);

        return () => {
          clearInterval(interval);
          performanceOptimizer.cleanup();
        };
      } catch (error) {
        console.error('Performance initialization failed:', error);
        setIsLoading(false);
      }
    };

    const cleanup = initializePerformance();
    
    return () => {
      cleanup.then(cleanupFn => cleanupFn?.());
    };
  }, []);

  const preloadChapter = async (chapter: number) => {
    try {
      await performanceOptimizer.handleUserProgress(chapter, 1.0); // Force preload
    } catch (error) {
      console.warn(`Failed to preload chapter ${chapter}:`, error);
    }
  };

  const getResourceAnalysis = () => {
    return performanceOptimizer.getPerformanceInsights().resourceAnalysis;
  };

  const value: PerformanceContextType = {
    metrics,
    performanceScore,
    isLoading,
    preloadChapter,
    getResourceAnalysis,
  };

  return (
    <PerformanceContext.Provider value={value}>
      {children}
    </PerformanceContext.Provider>
  );
}

export function usePerformance() {
  const context = useContext(PerformanceContext);
  if (!context) {
    throw new Error('usePerformance must be used within a PerformanceProvider');
  }
  return context;
}

// Performance monitoring component for development
export function PerformanceMonitor() {
  const { metrics, performanceScore, getResourceAnalysis } = usePerformance();
  const [showDetails, setShowDetails] = useState(false);
  const [insights, setInsights] = useState<any>(null);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      setInsights(performanceOptimizer.getPerformanceInsights());
    }
  }, [metrics, performanceScore]);

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const resourceAnalysis = insights?.resourceAnalysis || getResourceAnalysis();

  return (
    <div className="fixed bottom-20 left-4 z-50 bg-black text-white p-4 rounded-lg text-sm max-w-sm">
      <div className="flex items-center justify-between mb-2 gap-4">
        <h3 className="font-semibold">Performance</h3>
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="text-xs bg-gray-700 px-2 py-1 rounded"
        >
          {showDetails ? 'Hide' : 'Show'} Details
        </button>
      </div>
      
      <div className="mb-2">
        <div className="flex justify-between">
          <span>Score:</span>
          <span className={performanceScore >= 90 ? 'text-green-400' : performanceScore >= 70 ? 'text-yellow-400' : 'text-red-400'}>
            {performanceScore.toFixed(0)}%
          </span>
        </div>
      </div>

      {showDetails && (
        <div className="space-y-1 text-xs">
          {Object.entries(metrics).map(([key, metric]) => (
            <div key={key} className="flex justify-between">
              <span>{key}:</span>
              <span className={
                metric.rating === 'good' ? 'text-green-400' : 
                metric.rating === 'needs-improvement' ? 'text-yellow-400' : 'text-red-400'
              }>
                {metric.value.toFixed(0)}ms
              </span>
            </div>
          ))}
          
          <div className="border-t border-gray-600 pt-2 mt-2">
            <div className="flex justify-between">
              <span>Resources:</span>
              <span>{resourceAnalysis.totalResources}</span>
            </div>
            <div className="flex justify-between">
              <span>Slow Resources:</span>
              <span className={resourceAnalysis.slowResources?.length > 0 ? 'text-red-400' : 'text-green-400'}>
                {resourceAnalysis.slowResources?.length || 0}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}