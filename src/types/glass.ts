/**
 * Glass Morphism Type Definitions
 * TypeScript interfaces for glass component configuration and props
 */

import React from 'react';

export interface GlassConfig {
  /** Glass panel opacity (0.05-0.15) */
  opacity: number;
  /** Backdrop blur intensity in pixels (10-40px) */
  blur: number;
  /** Color saturation percentage (100-200%) */
  saturation: number;
  /** Border opacity (0.1-0.3) */
  borderOpacity: number;
  /** Border radius in pixels (8-24px) */
  borderRadius: number;
  /** Shadow configuration */
  shadow: ShadowConfig;
  /** Animation configuration */
  animation: GlassAnimationConfig;
}

export interface ShadowConfig {
  /** Outer shadow blur radius */
  blur: number;
  /** Shadow color with opacity */
  color: string;
  /** Shadow offset X */
  offsetX: number;
  /** Shadow offset Y */
  offsetY: number;
  /** Inner shadow (inset) configuration */
  inset?: {
    blur: number;
    color: string;
    offsetX: number;
    offsetY: number;
  };
}

export interface GlassAnimationConfig {
  /** Hover state animations */
  hover: {
    /** Scale transform on hover (1.02-1.05) */
    scale?: number;
    /** Opacity increase on hover (0.02-0.05) */
    opacityIncrease?: number;
    /** Blur increase on hover (5-10px) */
    blurIncrease?: number;
    /** Animation duration in milliseconds (200-400ms) */
    duration?: number;
    /** Animation easing curve */
    easing?: string;
  };
  /** Entrance animations */
  entrance: {
    /** Animation delay in milliseconds */
    delay?: number;
    /** Animation duration in milliseconds */
    duration?: number;
    /** Animation easing curve */
    easing?: string;
    /** Animation type */
    type?: 'fade' | 'slide' | 'scale' | 'blur';
  };
}

export interface GlassComponentProps {
  /** Glass configuration object */
  glassConfig?: Partial<GlassConfig>;
  /** Glass variant preset */
  variant?: GlassVariant;
  /** Additional CSS classes */
  className?: string;
  /** Children elements */
  children?: React.ReactNode;
  /** Whether to enable hover effects */
  enableHover?: boolean;
  /** Whether to enable entrance animations */
  enableEntrance?: boolean;
  /** Custom glass theme */
  theme?: GlassTheme;
}

export type GlassVariant = 
  | 'subtle'      // Light glass effect
  | 'medium'      // Standard glass effect
  | 'heavy'       // Strong glass effect
  | 'accent'      // Glass with color accent
  | 'navigation'  // Optimized for navigation bars
  | 'card'        // Optimized for content cards
  | 'button'      // Optimized for interactive buttons
  | 'input'       // Optimized for form inputs
  | 'hero'        // Optimized for hero sections
  | 'overlay';    // Optimized for modal overlays

export type GlassTheme = 
  | 'default'     // Standard white glass
  | 'dark'        // Dark glass for light backgrounds
  | 'blue'        // Blue-tinted glass
  | 'emerald'     // Emerald-tinted glass
  | 'purple'      // Purple-tinted glass
  | 'amber'       // Amber-tinted glass
  | 'rose'        // Rose-tinted glass
  | 'gradient';   // Gradient glass effect

export interface GlassBrowserSupport {
  /** Whether backdrop-filter is supported */
  supportsBackdropFilter: boolean;
  /** Whether CSS filters are supported */
  supportsFilter: boolean;
  /** Whether CSS transforms are supported */
  supportsTransform: boolean;
  /** Whether hardware acceleration is available */
  supportsHardwareAcceleration: boolean;
  /** Performance tier (low, medium, high) */
  performanceTier: 'low' | 'medium' | 'high';
}

export interface GlassFallbackConfig {
  /** Fallback background color */
  backgroundColor: string;
  /** Fallback border color */
  borderColor: string;
  /** Fallback shadow */
  boxShadow: string;
  /** Whether to use reduced animations */
  reducedMotion: boolean;
}