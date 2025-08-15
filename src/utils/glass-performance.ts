/**
 * Glass Performance Monitoring and Optimization
 * Hardware acceleration, performance monitoring, and responsive behavior utilities
 */

import type { GlassConfig, GlassBrowserSupport } from '@/types/glass';
import { detectGlassSupport, prefersReducedMotion } from './glass-support';

export interface PerformanceMetrics {
  frameRate: number;
  averageFrameTime: number;
  droppedFrames: number;
  performanceTier: 'low' | 'medium' | 'high';
  isThrottled: boolean;
}

export interface ResponsiveGlassConfig {
  mobile: Partial<GlassConfig>;
  tablet: Partial<GlassConfig>;
  desktop: Partial<GlassConfig>;
  highEnd: Partial<GlassConfig>;
}

/**
 * Performance monitoring class for glass effects
 */
export class GlassPerformanceMonitor {
  private frameCount = 0;
  private lastTime = 0;
  private frameRates: number[] = [];
  private isMonitoring = false;
  private animationId: number | null = null;
  private performanceObserver: PerformanceObserver | null = null;
  private callbacks: ((metrics: PerformanceMetrics) => void)[] = [];

  constructor() {
    this.setupPerformanceObserver();
  }

  /**
   * Start monitoring frame rate performance
   */
  startMonitoring(): void {
    if (this.isMonitoring || typeof window === 'undefined') return;

    this.isMonitoring = true;
    this.frameCount = 0;
    this.lastTime = performance.now();
    this.frameRates = [];

    const monitor = (currentTime: number) => {
      if (!this.isMonitoring) return;

      this.frameCount++;
      const deltaTime = currentTime - this.lastTime;

      if (deltaTime >= 1000) {
        const fps = Math.round((this.frameCount * 1000) / deltaTime);
        this.frameRates.push(fps);

        // Keep only last 10 measurements
        if (this.frameRates.length > 10) {
          this.frameRates.shift();
        }

        this.frameCount = 0;
        this.lastTime = currentTime;

        // Notify callbacks with current metrics
        const metrics = this.getMetrics();
        this.callbacks.forEach(callback => callback(metrics));
      }

      this.animationId = requestAnimationFrame(monitor);
    };

    this.animationId = requestAnimationFrame(monitor);
  }

  /**
   * Stop monitoring performance
   */
  stopMonitoring(): void {
    this.isMonitoring = false;
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
  }

  /**
   * Get current performance metrics
   */
  getMetrics(): PerformanceMetrics {
    const averageFrameRate = this.frameRates.length > 0
      ? this.frameRates.reduce((sum, fps) => sum + fps, 0) / this.frameRates.length
      : 60;

    const droppedFrames = this.frameRates.filter(fps => fps < 55).length;
    const isThrottled = averageFrameRate < 30;

    let performanceTier: 'low' | 'medium' | 'high' = 'medium';
    if (averageFrameRate >= 55) performanceTier = 'high';
    else if (averageFrameRate < 30) performanceTier = 'low';

    return {
      frameRate: Math.round(averageFrameRate),
      averageFrameTime: averageFrameRate > 0 ? 1000 / averageFrameRate : 16.67,
      droppedFrames,
      performanceTier,
      isThrottled,
    };
  }

  /**
   * Add callback for performance updates
   */
  onPerformanceUpdate(callback: (metrics: PerformanceMetrics) => void): () => void {
    this.callbacks.push(callback);
    return () => {
      const index = this.callbacks.indexOf(callback);
      if (index > -1) this.callbacks.splice(index, 1);
    };
  }

  /**
   * Setup performance observer for paint timing
   */
  private setupPerformanceObserver(): void {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) return;

    try {
      this.performanceObserver = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        // Process paint timing entries if needed
        entries.forEach(entry => {
          if (entry.entryType === 'paint') {
            // Handle paint timing for optimization
          }
        });
      });

      this.performanceObserver.observe({ entryTypes: ['paint', 'measure'] });
    } catch (error) {
      console.warn('Performance Observer not supported:', error);
    }
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    this.stopMonitoring();
    if (this.performanceObserver) {
      this.performanceObserver.disconnect();
      this.performanceObserver = null;
    }
    this.callbacks = [];
  }
}

/**
 * Hardware acceleration utilities
 */
export const hardwareAcceleration = {
  /**
   * Apply hardware acceleration to element
   */
  enable(element: HTMLElement): void {
    element.style.willChange = 'transform, backdrop-filter, opacity';
    element.style.transform = 'translateZ(0)';
    element.style.backfaceVisibility = 'hidden';
    element.style.perspective = '1000px';
  },

  /**
   * Remove hardware acceleration from element
   */
  disable(element: HTMLElement): void {
    element.style.willChange = 'auto';
    element.style.transform = '';
    element.style.backfaceVisibility = '';
    element.style.perspective = '';
  },

  /**
   * Apply optimized hardware acceleration for glass effects
   */
  enableForGlass(element: HTMLElement): void {
    element.style.willChange = 'transform, backdrop-filter, background, box-shadow';
    element.style.transform = 'translate3d(0, 0, 0)';
    element.style.backfaceVisibility = 'hidden';
    element.style.transformStyle = 'preserve-3d';
  },

  /**
   * Apply hardware acceleration to multiple elements
   */
  enableBatch(elements: HTMLElement[]): void {
    elements.forEach(element => this.enableForGlass(element));
  },
};

/**
 * Responsive glass configuration based on device capabilities
 */
export const responsiveGlassConfigs: ResponsiveGlassConfig = {
  mobile: {
    opacity: 0.08,
    blur: 12,
    saturation: 140,
    borderOpacity: 0.15,
    borderRadius: 12,
    animation: {
      hover: {
        scale: 1.01,
        opacityIncrease: 0.02,
        blurIncrease: 2,
        duration: 200,
        easing: 'ease-out',
      },
      entrance: {
        delay: 0,
        duration: 400,
        easing: 'ease-out',
        type: 'fade',
      },
    },
  },
  tablet: {
    opacity: 0.1,
    blur: 16,
    saturation: 160,
    borderOpacity: 0.18,
    borderRadius: 14,
    animation: {
      hover: {
        scale: 1.015,
        opacityIncrease: 0.025,
        blurIncrease: 3,
        duration: 250,
        easing: 'ease-out',
      },
      entrance: {
        delay: 0,
        duration: 500,
        easing: 'ease-out',
        type: 'scale',
      },
    },
  },
  desktop: {
    opacity: 0.1,
    blur: 20,
    saturation: 180,
    borderOpacity: 0.2,
    borderRadius: 16,
    animation: {
      hover: {
        scale: 1.02,
        opacityIncrease: 0.03,
        blurIncrease: 5,
        duration: 300,
        easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      entrance: {
        delay: 100,
        duration: 600,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        type: 'blur',
      },
    },
  },
  highEnd: {
    opacity: 0.12,
    blur: 24,
    saturation: 200,
    borderOpacity: 0.25,
    borderRadius: 20,
    animation: {
      hover: {
        scale: 1.03,
        opacityIncrease: 0.05,
        blurIncrease: 8,
        duration: 350,
        easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      entrance: {
        delay: 150,
        duration: 800,
        easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        type: 'blur',
      },
    },
  },
};

/**
 * Get responsive glass configuration based on device
 */
export function getResponsiveGlassConfig(): Partial<GlassConfig> {
  if (typeof window === 'undefined') return responsiveGlassConfigs.desktop;

  const width = window.innerWidth;
  const support = detectGlassSupport();

  // High-end desktop
  if (width >= 1440 && support.performanceTier === 'high') {
    return responsiveGlassConfigs.highEnd;
  }

  // Desktop
  if (width >= 1024) {
    return responsiveGlassConfigs.desktop;
  }

  // Tablet
  if (width >= 768) {
    return responsiveGlassConfigs.tablet;
  }

  // Mobile
  return responsiveGlassConfigs.mobile;
}

/**
 * Performance-aware glass configuration
 */
export function getPerformanceOptimizedConfig(
  baseConfig: Partial<GlassConfig>,
  metrics: PerformanceMetrics
): Partial<GlassConfig> {
  const config = { ...baseConfig };

  // Reduce complexity for low performance
  if (metrics.performanceTier === 'low' || metrics.frameRate < 30) {
    config.blur = Math.max((config.blur || 20) * 0.6, 8);
    config.saturation = Math.max((config.saturation || 180) * 0.8, 120);

    if (config.animation?.hover) {
      config.animation.hover.duration = Math.min(config.animation.hover.duration || 300, 200);
      config.animation.hover.scale = Math.min(config.animation.hover.scale || 1.02, 1.01);
    }
  }

  // Disable animations for very poor performance
  if (metrics.frameRate < 20 || prefersReducedMotion()) {
    if (config.animation) {
      config.animation.hover.duration = 0;
      config.animation.hover.scale = 1;
      config.animation.entrance.duration = 0;
    }
  }

  return config;
}

/**
 * Touch-optimized glass interactions
 */
export const touchOptimization = {
  /**
   * Apply touch-friendly glass interactions
   */
  applyTouchOptimizations(element: HTMLElement): void {
    // Increase touch target size
    element.style.minHeight = '44px';
    element.style.minWidth = '44px';

    // Optimize touch feedback
    element.style.touchAction = 'manipulation';
    element.style.userSelect = 'none';
    element.style.webkitTapHighlightColor = 'transparent';

    // Add touch event listeners for better feedback
    let touchStartTime = 0;

    element.addEventListener('touchstart', (e) => {
      touchStartTime = Date.now();
      element.style.transform = 'scale(0.98) translateZ(0)';
      element.style.transition = 'transform 100ms ease-out';
    }, { passive: true });

    element.addEventListener('touchend', (e) => {
      const touchDuration = Date.now() - touchStartTime;

      // Quick tap feedback
      if (touchDuration < 200) {
        element.style.transform = 'scale(1.02) translateZ(0)';
        setTimeout(() => {
          element.style.transform = 'scale(1) translateZ(0)';
        }, 100);
      } else {
        element.style.transform = 'scale(1) translateZ(0)';
      }
    }, { passive: true });

    element.addEventListener('touchcancel', () => {
      element.style.transform = 'scale(1) translateZ(0)';
    }, { passive: true });
  },

  /**
   * Remove touch optimizations
   */
  removeTouchOptimizations(element: HTMLElement): void {
    element.style.minHeight = '';
    element.style.minWidth = '';
    element.style.touchAction = '';
    element.style.userSelect = '';
    element.style.webkitTapHighlightColor = '';
  },
};

/**
 * Progressive enhancement for glass complexity
 */
export class GlassProgressiveEnhancement {
  private support: GlassBrowserSupport;
  private performanceMonitor: GlassPerformanceMonitor;
  private currentComplexity: 'minimal' | 'reduced' | 'full' = 'full';

  constructor() {
    this.support = detectGlassSupport();
    this.performanceMonitor = new GlassPerformanceMonitor();
    this.initializeComplexity();
  }

  /**
   * Initialize complexity level based on device capabilities
   */
  private initializeComplexity(): void {
    if (!this.support.supportsBackdropFilter) {
      this.currentComplexity = 'minimal';
    } else if (this.support.performanceTier === 'low') {
      this.currentComplexity = 'reduced';
    } else {
      this.currentComplexity = 'full';
    }

    // Monitor performance and adjust complexity
    this.performanceMonitor.onPerformanceUpdate((metrics) => {
      this.adjustComplexityBasedOnPerformance(metrics);
    });

    this.performanceMonitor.startMonitoring();
  }

  /**
   * Adjust complexity based on performance metrics
   */
  private adjustComplexityBasedOnPerformance(metrics: PerformanceMetrics): void {
    const previousComplexity = this.currentComplexity;

    if (metrics.frameRate < 20) {
      this.currentComplexity = 'minimal';
    } else if (metrics.frameRate < 40) {
      this.currentComplexity = 'reduced';
    } else if (metrics.frameRate >= 55 && this.support.supportsBackdropFilter) {
      this.currentComplexity = 'full';
    }

    // Apply changes if complexity level changed
    if (previousComplexity !== this.currentComplexity) {
      this.applyComplexityLevel();
    }
  }

  /**
   * Apply current complexity level to all glass elements
   */
  private applyComplexityLevel(): void {
    const glassElements = document.querySelectorAll('[class*="glass"]');

    glassElements.forEach((element) => {
      const htmlElement = element as HTMLElement;

      // Remove existing complexity classes
      htmlElement.classList.remove('glass-minimal', 'glass-reduced', 'glass-full');

      // Add current complexity class
      htmlElement.classList.add(`glass-${this.currentComplexity}`);
    });
  }

  /**
   * Get configuration for current complexity level
   */
  getConfigForComplexity(baseConfig: Partial<GlassConfig>): Partial<GlassConfig> {
    const config = { ...baseConfig };

    switch (this.currentComplexity) {
      case 'minimal':
        return {
          ...config,
          blur: 0,
          saturation: 100,
          opacity: Math.min(config.opacity || 0.1, 0.15),
          animation: {
            hover: { scale: 1, opacityIncrease: 0, blurIncrease: 0, duration: 0, easing: 'linear' },
            entrance: { delay: 0, duration: 0, easing: 'linear', type: 'fade' },
          },
        };

      case 'reduced':
        return {
          ...config,
          blur: Math.max((config.blur || 20) * 0.5, 8),
          saturation: Math.max((config.saturation || 180) * 0.7, 120),
          animation: {
            hover: {
              scale: Math.min(config.animation?.hover?.scale || 1.02, 1.01),
              opacityIncrease: (config.animation?.hover?.opacityIncrease || 0.03) * 0.5,
              blurIncrease: Math.max((config.animation?.hover?.blurIncrease || 5) * 0.5, 2),
              duration: Math.min(config.animation?.hover?.duration || 300, 200),
              easing: 'ease-out',
            },
            entrance: {
              delay: 0,
              duration: Math.min(config.animation?.entrance?.duration || 600, 300),
              easing: 'ease-out',
              type: 'fade',
            },
          },
        };

      case 'full':
      default:
        return config;
    }
  }

  /**
   * Get current complexity level
   */
  getCurrentComplexity(): 'minimal' | 'reduced' | 'full' {
    return this.currentComplexity;
  }

  /**
   * Cleanup resources
   */
  destroy(): void {
    this.performanceMonitor.destroy();
  }
}

/**
 * Global performance monitor instance
 */
let globalPerformanceMonitor: GlassPerformanceMonitor | null = null;
let globalProgressiveEnhancement: GlassProgressiveEnhancement | null = null;

/**
 * Initialize global performance monitoring
 */
export function initializeGlassPerformance(): {
  monitor: GlassPerformanceMonitor;
  enhancement: GlassProgressiveEnhancement;
} {
  if (typeof window === 'undefined') {
    // Return mock objects for SSR
    return {
      monitor: {} as GlassPerformanceMonitor,
      enhancement: {} as GlassProgressiveEnhancement,
    };
  }

  if (!globalPerformanceMonitor) {
    globalPerformanceMonitor = new GlassPerformanceMonitor();
  }

  if (!globalProgressiveEnhancement) {
    globalProgressiveEnhancement = new GlassProgressiveEnhancement();
  }

  return {
    monitor: globalPerformanceMonitor,
    enhancement: globalProgressiveEnhancement,
  };
}

/**
 * Cleanup global performance monitoring
 */
export function cleanupGlassPerformance(): void {
  if (globalPerformanceMonitor) {
    globalPerformanceMonitor.destroy();
    globalPerformanceMonitor = null;
  }

  if (globalProgressiveEnhancement) {
    globalProgressiveEnhancement.destroy();
    globalProgressiveEnhancement = null;
  }
}