/**
 * Glass Performance Hook
 * React hook for monitoring glass effect performance and applying optimizations
 */

import { useEffect, useState, useCallback, useRef } from 'react';
import type { GlassConfig, GlassVariant } from '@/types/glass';
import {
  GlassPerformanceMonitor,
  GlassProgressiveEnhancement,
  PerformanceMetrics,
  initializeGlassPerformance,
  getPerformanceOptimizedConfig,
  hardwareAcceleration
} from '@/utils/glass-performance';
import {
  getResponsiveGlassConfig,
  getCurrentScreenSize,
  TouchInteractionManager,
  initializeTouchInteractions
} from '@/utils/glass-responsive';

export interface UseGlassPerformanceOptions {
  variant?: GlassVariant;
  enableMonitoring?: boolean;
  enableTouchOptimization?: boolean;
  enableHardwareAcceleration?: boolean;
  customConfig?: Partial<GlassConfig>;
  onPerformanceChange?: (metrics: PerformanceMetrics) => void;
}

export interface GlassPerformanceState {
  config: Partial<GlassConfig>;
  metrics: PerformanceMetrics | null;
  isOptimized: boolean;
  screenSize: string;
  className: string;
  cssVars: Record<string, string>;
}

/**
 * Hook for managing glass performance and responsive behavior
 */
export function useGlassPerformance(options: UseGlassPerformanceOptions = {}): {
  state: GlassPerformanceState;
  elementRef: React.RefObject<HTMLElement | null>;
  updateConfig: (newConfig: Partial<GlassConfig>) => void;
  startMonitoring: () => void;
  stopMonitoring: () => void;
} {
  const {
    variant = 'medium',
    enableMonitoring = true,
    enableTouchOptimization = true,
    enableHardwareAcceleration = true,
    customConfig = {},
    onPerformanceChange,
  } = options;

  const elementRef = useRef<HTMLElement | null>(null);
  const monitorRef = useRef<GlassPerformanceMonitor | null>(null);
  const enhancementRef = useRef<GlassProgressiveEnhancement | null>(null);
  const touchManagerRef = useRef<TouchInteractionManager | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);

  const [state, setState] = useState<GlassPerformanceState>(() => {
    const baseConfig = getResponsiveGlassConfig(variant);
    const mergedConfig = { ...baseConfig, ...customConfig };

    return {
      config: mergedConfig,
      metrics: null,
      isOptimized: false,
      screenSize: getCurrentScreenSize(),
      className: getPerformanceClassName(mergedConfig, null),
      cssVars: generateCSSVars(mergedConfig),
    };
  });

  /**
   * Update configuration
   */
  const updateConfig = useCallback((newConfig: Partial<GlassConfig>) => {
    setState(prev => {
      const mergedConfig = { ...prev.config, ...newConfig };
      const optimizedConfig = prev.metrics
        ? getPerformanceOptimizedConfig(mergedConfig, prev.metrics)
        : mergedConfig;

      return {
        ...prev,
        config: optimizedConfig,
        className: getPerformanceClassName(optimizedConfig, prev.metrics),
        cssVars: generateCSSVars(optimizedConfig),
      };
    });
  }, []);

  /**
   * Handle performance metrics update
   */
  const handlePerformanceUpdate = useCallback((metrics: PerformanceMetrics) => {
    setState(prev => {
      const optimizedConfig = getPerformanceOptimizedConfig(prev.config, metrics);
      const isOptimized = metrics.performanceTier !== 'high' || metrics.frameRate < 55;

      const newState = {
        ...prev,
        metrics,
        isOptimized,
        config: optimizedConfig,
        className: getPerformanceClassName(optimizedConfig, metrics),
        cssVars: generateCSSVars(optimizedConfig),
      };

      // Notify parent component
      if (onPerformanceChange) {
        onPerformanceChange(metrics);
      }

      return newState;
    });
  }, [onPerformanceChange]);

  /**
   * Handle screen size changes
   */
  const handleScreenSizeChange = useCallback(() => {
    const newScreenSize = getCurrentScreenSize();
    if (newScreenSize !== state.screenSize) {
      const responsiveConfig = getResponsiveGlassConfig(variant);
      const mergedConfig = { ...responsiveConfig, ...customConfig };

      setState(prev => ({
        ...prev,
        screenSize: newScreenSize,
        config: mergedConfig,
        className: getPerformanceClassName(mergedConfig, prev.metrics),
        cssVars: generateCSSVars(mergedConfig),
      }));
    }
  }, [variant, customConfig, state.screenSize]);

  /**
   * Start performance monitoring
   */
  const startMonitoring = useCallback(() => {
    if (!enableMonitoring || typeof window === 'undefined') return;

    const { monitor, enhancement } = initializeGlassPerformance();
    monitorRef.current = monitor;
    enhancementRef.current = enhancement;

    // Start monitoring
    const unsubscribe = monitor.onPerformanceUpdate(handlePerformanceUpdate);
    monitor.startMonitoring();

    cleanupRef.current = () => {
      unsubscribe();
      monitor.stopMonitoring();
    };
  }, [enableMonitoring, handlePerformanceUpdate]);

  /**
   * Stop performance monitoring
   */
  const stopMonitoring = useCallback(() => {
    if (cleanupRef.current) {
      cleanupRef.current();
      cleanupRef.current = null;
    }

    if (monitorRef.current) {
      monitorRef.current.stopMonitoring();
    }
  }, []);

  /**
   * Setup element optimizations
   */
  const setupElementOptimizations = useCallback(() => {
    const element = elementRef.current;
    if (!element) return;

    // Apply hardware acceleration
    if (enableHardwareAcceleration) {
      hardwareAcceleration.enableForGlass(element);
    }

    // Setup touch interactions
    if (enableTouchOptimization && 'ontouchstart' in window) {
      if (!touchManagerRef.current) {
        touchManagerRef.current = initializeTouchInteractions();
      }
      touchManagerRef.current.addTouchInteractions(element);
    }

    // Apply performance class
    element.className = `${element.className} ${state.className}`.trim();

    // Apply CSS variables
    Object.entries(state.cssVars).forEach(([key, value]) => {
      element.style.setProperty(key, value);
    });
  }, [enableHardwareAcceleration, enableTouchOptimization, state.className, state.cssVars]);

  /**
   * Initialize on mount
   */
  useEffect(() => {
    startMonitoring();

    // Listen for screen size changes
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    mediaQuery.addEventListener('change', handleScreenSizeChange);

    return () => {
      stopMonitoring();
      mediaQuery.removeEventListener('change', handleScreenSizeChange);

      if (touchManagerRef.current) {
        touchManagerRef.current.cleanup();
      }
    };
  }, [startMonitoring, stopMonitoring, handleScreenSizeChange]);

  /**
   * Setup element when ref changes
   */
  useEffect(() => {
    setupElementOptimizations();
  }, [setupElementOptimizations]);

  /**
   * Update element when state changes
   */
  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Update CSS variables
    Object.entries(state.cssVars).forEach(([key, value]) => {
      element.style.setProperty(key, value);
    });

    // Update performance class
    element.className = element.className
      .split(' ')
      .filter(cls => !cls.startsWith('glass-performance-') && !cls.startsWith('glass-progressive-'))
      .concat(state.className.split(' '))
      .join(' ');
  }, [state.cssVars, state.className]);

  return {
    state,
    elementRef,
    updateConfig,
    startMonitoring,
    stopMonitoring,
  };
}

/**
 * Generate performance-aware class name
 */
function getPerformanceClassName(
  config: Partial<GlassConfig>,
  metrics: PerformanceMetrics | null
): string {
  const classes = ['glass-enhanced', 'glass-accelerated'];

  if (metrics) {
    // Add performance tier class
    classes.push(`glass-performance-${metrics.performanceTier}`);

    // Add progressive enhancement class
    if (metrics.frameRate < 20) {
      classes.push('glass-progressive-minimal');
    } else if (metrics.frameRate < 40) {
      classes.push('glass-progressive-reduced');
    } else {
      classes.push('glass-progressive-full');
    }

    // Add hardware acceleration level
    if (metrics.performanceTier === 'low') {
      classes.push('glass-hw-minimal');
    } else if (metrics.performanceTier === 'medium') {
      classes.push('glass-hw-medium');
    } else {
      classes.push('glass-hw-full');
    }

    // Add frame rate optimization
    if (metrics.frameRate >= 60) {
      classes.push('glass-60fps');
    } else if (metrics.frameRate >= 30) {
      classes.push('glass-30fps');
    } else {
      classes.push('glass-throttled');
    }
  } else {
    // Default classes when no metrics available
    classes.push('glass-progressive-full', 'glass-hw-full');
  }

  // Add responsive classes
  const screenSize = getCurrentScreenSize();
  classes.push(`glass-container-${screenSize}`);
  classes.push(`glass-text-${screenSize}`);
  classes.push(`glass-radius-${screenSize}`);

  // Add touch optimization for mobile
  if (screenSize === 'mobile' || (typeof window !== 'undefined' && 'ontouchstart' in window)) {
    classes.push('glass-touch-optimized', 'glass-touch-target');
  }

  return classes.join(' ');
}

/**
 * Generate CSS custom properties from config
 */
function generateCSSVars(config: Partial<GlassConfig>): Record<string, string> {
  return {
    '--glass-opacity': (config.opacity ?? 0.1).toString(),
    '--glass-border-opacity': (config.borderOpacity ?? 0.2).toString(),
    '--glass-blur': `${config.blur ?? 20}px`,
    '--glass-saturation': `${config.saturation ?? 180}%`,
    '--glass-radius': `${config.borderRadius ?? 16}px`,
    '--glass-duration-hover': `${config.animation?.hover?.duration ?? 300}ms`,
    '--glass-duration-entrance': `${config.animation?.entrance?.duration ?? 600}ms`,
    '--glass-scale-hover': (config.animation?.hover?.scale ?? 1.02).toString(),
    '--glass-easing-hover': config.animation?.hover?.easing ?? 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    '--glass-easing-entrance': config.animation?.entrance?.easing ?? 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
  };
}

/**
 * Hook for simple responsive glass configuration
 */
export function useResponsiveGlass(variant: GlassVariant = 'medium'): {
  config: Partial<GlassConfig>;
  className: string;
  cssVars: Record<string, string>;
} {
  const [config, setConfig] = useState(() => getResponsiveGlassConfig(variant));
  const [screenSize, setScreenSize] = useState(() => getCurrentScreenSize());

  useEffect(() => {
    const handleResize = () => {
      const newScreenSize = getCurrentScreenSize();
      if (newScreenSize !== screenSize) {
        setScreenSize(newScreenSize);
        setConfig(getResponsiveGlassConfig(variant));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [variant, screenSize]);

  return {
    config,
    className: getPerformanceClassName(config, null),
    cssVars: generateCSSVars(config),
  };
}