/**
 * Glass Morphism Browser Support Detection
 * Utilities for detecting browser capabilities and providing fallbacks
 */

import type { GlassBrowserSupport, GlassFallbackConfig } from '@/types/glass';

/**
 * Detects browser support for glass morphism features
 */
export function detectGlassSupport(): GlassBrowserSupport {
  // Server-side rendering fallback
  if (typeof window === 'undefined') {
    return {
      supportsBackdropFilter: false,
      supportsFilter: false,
      supportsTransform: false,
      supportsHardwareAcceleration: false,
      performanceTier: 'medium',
    };
  }

  const testElement = document.createElement('div');
  testElement.style.position = 'absolute';
  testElement.style.visibility = 'hidden';
  document.body.appendChild(testElement);

  // Test backdrop-filter support
  const supportsBackdropFilter = CSS.supports('backdrop-filter', 'blur(1px)') || 
                                  CSS.supports('-webkit-backdrop-filter', 'blur(1px)');

  // Test filter support
  const supportsFilter = CSS.supports('filter', 'blur(1px)');

  // Test transform support
  const supportsTransform = CSS.supports('transform', 'translateZ(0)') ||
                           CSS.supports('-webkit-transform', 'translateZ(0)');

  // Test hardware acceleration
  testElement.style.transform = 'translateZ(0)';
  const supportsHardwareAcceleration = testElement.style.transform === 'translateZ(0)';

  // Determine performance tier
  const performanceTier = getPerformanceTier();

  document.body.removeChild(testElement);

  return {
    supportsBackdropFilter,
    supportsFilter,
    supportsTransform,
    supportsHardwareAcceleration,
    performanceTier,
  };
}

/**
 * Determines device performance tier based on available metrics
 */
function getPerformanceTier(): 'low' | 'medium' | 'high' {
  if (typeof window === 'undefined') return 'medium';

  // Check for performance API
  if ('deviceMemory' in navigator) {
    const memory = (navigator as { deviceMemory?: number }).deviceMemory;
    if (memory && memory >= 8) return 'high';
    if (memory && memory >= 4) return 'medium';
    return 'low';
  }

  // Check for hardware concurrency
  if ('hardwareConcurrency' in navigator) {
    const cores = navigator.hardwareConcurrency;
    if (cores >= 8) return 'high';
    if (cores >= 4) return 'medium';
    return 'low';
  }

  // Check user agent for mobile devices
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    (navigator as Navigator).userAgent || ''
  );

  return isMobile ? 'low' : 'medium';
}

/**
 * Checks if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Gets fallback configuration for unsupported browsers
 */
export function getGlassFallback(theme: string = 'default'): GlassFallbackConfig {
  const fallbacks = {
    default: {
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
      reducedMotion: prefersReducedMotion(),
    },
    dark: {
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      borderColor: 'rgba(255, 255, 255, 0.1)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      reducedMotion: prefersReducedMotion(),
    },
    blue: {
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      borderColor: 'rgba(59, 130, 246, 0.2)',
      boxShadow: '0 8px 32px rgba(59, 130, 246, 0.2)',
      reducedMotion: prefersReducedMotion(),
    },
    emerald: {
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      borderColor: 'rgba(16, 185, 129, 0.2)',
      boxShadow: '0 8px 32px rgba(16, 185, 129, 0.2)',
      reducedMotion: prefersReducedMotion(),
    },
  };

  return fallbacks[theme as keyof typeof fallbacks] || fallbacks.default;
}

/**
 * Creates a CSS class name based on browser support
 */
export function getGlassClassName(
  baseClass: string,
  support: GlassBrowserSupport
): string {
  const classes = [baseClass];

  if (!support.supportsBackdropFilter) {
    classes.push('glass-fallback');
  }

  if (support.performanceTier === 'low') {
    classes.push('glass-reduced');
  }

  if (prefersReducedMotion()) {
    classes.push('glass-no-motion');
  }

  return classes.join(' ');
}

/**
 * Polyfill for backdrop-filter using canvas (experimental)
 */
export function createBackdropFilterPolyfill(element: HTMLElement, blurAmount: number): void {
  if (typeof window === 'undefined' || CSS.supports('backdrop-filter', 'blur(1px)')) {
    return;
  }

  // This is a simplified polyfill - in production, you might want to use
  // a more sophisticated solution like backdrop-filter-polyfill
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  if (!ctx) return;

  // Position canvas behind the element
  canvas.style.position = 'absolute';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1';
  canvas.style.filter = `blur(${blurAmount}px)`;

  element.style.position = 'relative';
  element.appendChild(canvas);
}