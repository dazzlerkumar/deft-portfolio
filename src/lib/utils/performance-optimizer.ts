// Main performance optimization orchestrator

import { performanceMonitor } from './performance-monitor';
import { preloader } from './preloader';
import { injectCriticalCSS, fontOptimization } from './critical-css';
import { benchmark } from './benchmark';

interface PerformanceConfig {
  enableCriticalCSS: boolean;
  enableFontOptimization: boolean;
  enablePreloading: boolean;
  enableMonitoring: boolean;
  enableBenchmarking: boolean;
  preloadThreshold: number;
  smartPreloadEnabled: boolean;
}

const defaultConfig: PerformanceConfig = {
  enableCriticalCSS: true,
  enableFontOptimization: true,
  enablePreloading: true,
  enableMonitoring: true,
  enableBenchmarking: process.env.NODE_ENV === 'development',
  preloadThreshold: 0.5,
  smartPreloadEnabled: true,
};

class PerformanceOptimizer {
  private config: PerformanceConfig;
  private initialized = false;

  constructor(config: Partial<PerformanceConfig> = {}) {
    this.config = { ...defaultConfig, ...config };
  }

  async initialize() {
    if (this.initialized) return;

    try {
      // Initialize critical CSS
      if (this.config.enableCriticalCSS) {
        injectCriticalCSS();
      }

      // Initialize font optimizations
      if (this.config.enableFontOptimization) {
        fontOptimization.preloadFonts();
        fontOptimization.optimizeFontDisplay();
      }

      // Initialize preloader
      if (this.config.enablePreloading) {
        await preloader.preloadCriticalResources();
      }

      // Start performance monitoring
      if (this.config.enableMonitoring) {
        // Performance monitor is automatically initialized
        console.log('Performance monitoring enabled');
      }

      // Initialize benchmarking in development
      if (this.config.enableBenchmarking) {
        console.log('Performance benchmarking enabled');
      }

      this.initialized = true;
      console.log('Performance optimizer initialized successfully');
    } catch (error) {
      console.error('Failed to initialize performance optimizer:', error);
      throw error;
    }
  }

  // Smart preloading based on user progress
  async handleUserProgress(currentChapter: number, progress: number) {
    if (!this.config.smartPreloadEnabled) return;

    try {
      await preloader.smartPreload(currentChapter as any, progress);
    } catch (error) {
      console.warn('Smart preload failed:', error);
    }
  }

  // Get performance insights
  getPerformanceInsights() {
    const metrics = performanceMonitor.getMetrics();
    const score = performanceMonitor.getPerformanceScore();
    const resourceAnalysis = performanceMonitor.analyzeResourceTiming();
    const memoryUsage = performanceMonitor.getMemoryUsage();
    const preloadStatus = preloader.getPreloadStatus();

    return {
      metrics,
      score,
      resourceAnalysis,
      memoryUsage,
      preloadStatus,
      recommendations: this.generateRecommendations(score, resourceAnalysis),
    };
  }

  // Generate performance recommendations
  private generateRecommendations(score: number, resourceAnalysis: any) {
    const recommendations: string[] = [];

    if (score < 70) {
      recommendations.push('Overall performance needs improvement');
    }

    if (resourceAnalysis.slowResources?.length > 0) {
      recommendations.push(`Optimize ${resourceAnalysis.slowResources.length} slow-loading resources`);
    }

    if (resourceAnalysis.totalSize > 5000000) { // 5MB
      recommendations.push('Consider reducing total bundle size');
    }

    const imageCount = resourceAnalysis.resourceTypes?.image || 0;
    if (imageCount > 20) {
      recommendations.push('Consider lazy loading or optimizing images');
    }

    return recommendations;
  }

  // Benchmark a specific operation
  async benchmarkOperation(name: string, operation: () => Promise<void> | void) {
    if (!this.config.enableBenchmarking) return null;

    try {
      return await benchmark.measure(name, operation);
    } catch (error) {
      console.warn(`Benchmark failed for ${name}:`, error);
      return null;
    }
  }

  // Run performance audit
  async runPerformanceAudit() {
    const insights = this.getPerformanceInsights();
    const auditResults = {
      timestamp: new Date().toISOString(),
      score: insights.score,
      metrics: insights.metrics,
      resourceAnalysis: insights.resourceAnalysis,
      memoryUsage: insights.memoryUsage,
      preloadStatus: insights.preloadStatus,
      recommendations: insights.recommendations,
      passed: insights.score >= 80 && insights.recommendations.length === 0,
    };

    if (this.config.enableBenchmarking) {
      console.log('Performance Audit Results:', auditResults);
    }

    return auditResults;
  }

  // Cleanup resources
  cleanup() {
    performanceMonitor.disconnect();
    preloader.clearCache();
    benchmark.clear();
    this.initialized = false;
  }

  // Update configuration
  updateConfig(newConfig: Partial<PerformanceConfig>) {
    this.config = { ...this.config, ...newConfig };
  }

  // Get current configuration
  getConfig() {
    return { ...this.config };
  }
}

// Singleton instance
export const performanceOptimizer = new PerformanceOptimizer();

// Hook for React components
export function usePerformanceOptimizer() {
  return {
    initialize: () => performanceOptimizer.initialize(),
    handleUserProgress: (chapter: number, progress: number) => 
      performanceOptimizer.handleUserProgress(chapter, progress),
    getInsights: () => performanceOptimizer.getPerformanceInsights(),
    benchmark: (name: string, operation: () => Promise<void> | void) => 
      performanceOptimizer.benchmarkOperation(name, operation),
    runAudit: () => performanceOptimizer.runPerformanceAudit(),
    updateConfig: (config: Partial<PerformanceConfig>) => 
      performanceOptimizer.updateConfig(config),
  };
}

// Auto-initialize in browser environment
if (typeof window !== 'undefined') {
  // Initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      performanceOptimizer.initialize().catch(console.error);
    });
  } else {
    performanceOptimizer.initialize().catch(console.error);
  }

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    performanceOptimizer.cleanup();
  });
}