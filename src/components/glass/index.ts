/**
 * Glass Morphism Components
 * Export all glass morphism components and utilities
 */

// Base glass component
export { default as Glass } from './Glass';

// Specialized glass components
export { default as GlassPanel } from './GlassPanel';
export { default as GlassButton } from './GlassButton';
export { default as GlassCard } from './GlassCard';
export { default as GlassInput } from './GlassInput';

// Performance and monitoring components
export { GlassPerformanceMonitor, GlassFPSCounter } from './GlassPerformanceMonitor';
export { GlassPerformanceDemo } from './GlassPerformanceDemo';

// Types
export type {
  GlassConfig,
  GlassVariant,
  GlassTheme,
  GlassComponentProps,
  GlassBrowserSupport,
  GlassFallbackConfig,
  ShadowConfig,
  GlassAnimationConfig,
} from '@/types/glass';

// Utilities
export {
  detectGlassSupport,
  prefersReducedMotion,
  getGlassFallback,
  getGlassClassName,
  createBackdropFilterPolyfill,
} from '@/utils/glass-support';

export {
  glassVariants,
  glassThemes,
  generateGlassCSS,
  generateGlassClasses,
  mergeGlassConfig,
  getGlassConfiguration,
} from '@/utils/glass-config';

// Performance utilities
export {
  GlassPerformanceMonitor as PerformanceMonitorClass,
  GlassProgressiveEnhancement,
  hardwareAcceleration,
  initializeGlassPerformance,
  cleanupGlassPerformance,
} from '@/utils/glass-performance';

export {
  getResponsiveGlassConfig,
  getCurrentScreenSize,
  TouchInteractionManager,
  initializeTouchInteractions,
  cleanupTouchInteractions,
  responsiveLayout,
  mediaQueries,
} from '@/utils/glass-responsive';

// Performance hooks
export { useGlassPerformance, useResponsiveGlass } from '@/hooks/useGlassPerformance';