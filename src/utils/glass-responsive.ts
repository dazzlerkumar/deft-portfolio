/**
 * Responsive Glass Utilities
 * Breakpoint-aware glass configurations and mobile optimizations
 */

import type { GlassConfig, GlassVariant } from '@/types/glass';
import { detectGlassSupport, prefersReducedMotion } from './glass-support';

export interface ResponsiveBreakpoints {
  mobile: number;
  tablet: number;
  desktop: number;
  wide: number;
}

export interface ResponsiveGlassVariants {
  mobile: Record<GlassVariant, Partial<GlassConfig>>;
  tablet: Record<GlassVariant, Partial<GlassConfig>>;
  desktop: Record<GlassVariant, Partial<GlassConfig>>;
  wide: Record<GlassVariant, Partial<GlassConfig>>;
}

export interface TouchInteractionConfig {
  minTouchTarget: number;
  touchFeedbackScale: number;
  touchFeedbackDuration: number;
  hapticFeedback: boolean;
}

/**
 * Default responsive breakpoints
 */
export const defaultBreakpoints: ResponsiveBreakpoints = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  wide: 1440,
};

/**
 * Touch interaction configuration
 */
export const touchConfig: TouchInteractionConfig = {
  minTouchTarget: 44, // iOS/Android minimum touch target
  touchFeedbackScale: 0.95,
  touchFeedbackDuration: 150,
  hapticFeedback: true,
};

/**
 * Responsive glass variants optimized for different screen sizes
 */
export const responsiveGlassVariants: ResponsiveGlassVariants = {
  mobile: {
    subtle: {
      opacity: 0.06,
      blur: 8,
      saturation: 130,
      borderOpacity: 0.12,
      borderRadius: 8,
      animation: {
        hover: { scale: 1.01, opacityIncrease: 0.01, blurIncrease: 1, duration: 150, easing: 'ease-out' },
        entrance: { delay: 0, duration: 300, easing: 'ease-out', type: 'fade' },
      },
    },
    medium: {
      opacity: 0.08,
      blur: 12,
      saturation: 140,
      borderOpacity: 0.15,
      borderRadius: 12,
      animation: {
        hover: { scale: 1.015, opacityIncrease: 0.02, blurIncrease: 2, duration: 200, easing: 'ease-out' },
        entrance: { delay: 0, duration: 400, easing: 'ease-out', type: 'fade' },
      },
    },
    heavy: {
      opacity: 0.1,
      blur: 16,
      saturation: 150,
      borderOpacity: 0.18,
      borderRadius: 14,
      animation: {
        hover: { scale: 1.02, opacityIncrease: 0.025, blurIncrease: 3, duration: 250, easing: 'ease-out' },
        entrance: { delay: 0, duration: 500, easing: 'ease-out', type: 'scale' },
      },
    },
    accent: {
      opacity: 0.1,
      blur: 12,
      saturation: 160,
      borderOpacity: 0.2,
      borderRadius: 12,
      animation: {
        hover: { scale: 1.02, opacityIncrease: 0.02, blurIncrease: 2, duration: 200, easing: 'ease-out' },
        entrance: { delay: 0, duration: 400, easing: 'ease-out', type: 'fade' },
      },
    },
    navigation: {
      opacity: 0.06,
      blur: 16,
      saturation: 150,
      borderOpacity: 0.1,
      borderRadius: 20,
      animation: {
        hover: { scale: 1.0, opacityIncrease: 0.01, blurIncrease: 2, duration: 200, easing: 'ease-out' },
        entrance: { delay: 0, duration: 300, easing: 'ease-out', type: 'fade' },
      },
    },
    card: {
      opacity: 0.08,
      blur: 10,
      saturation: 140,
      borderOpacity: 0.12,
      borderRadius: 10,
      animation: {
        hover: { scale: 1.015, opacityIncrease: 0.02, blurIncrease: 2, duration: 200, easing: 'ease-out' },
        entrance: { delay: 0, duration: 400, easing: 'ease-out', type: 'fade' },
      },
    },
    button: {
      opacity: 0.1,
      blur: 10,
      saturation: 150,
      borderOpacity: 0.15,
      borderRadius: 20,
      animation: {
        hover: { scale: 1.03, opacityIncrease: 0.03, blurIncrease: 2, duration: 150, easing: 'ease-out' },
        entrance: { delay: 0, duration: 300, easing: 'ease-out', type: 'scale' },
      },
    },
    input: {
      opacity: 0.06,
      blur: 8,
      saturation: 130,
      borderOpacity: 0.1,
      borderRadius: 10,
      animation: {
        hover: { scale: 1.0, opacityIncrease: 0.01, blurIncrease: 1, duration: 150, easing: 'ease-out' },
        entrance: { delay: 0, duration: 250, easing: 'ease-out', type: 'fade' },
      },
    },
    hero: {
      opacity: 0.1,
      blur: 20,
      saturation: 160,
      borderOpacity: 0.2,
      borderRadius: 16,
      animation: {
        hover: { scale: 1.005, opacityIncrease: 0.02, blurIncrease: 4, duration: 300, easing: 'ease-out' },
        entrance: { delay: 200, duration: 600, easing: 'ease-out', type: 'blur' },
      },
    },
    overlay: {
      opacity: 0.12,
      blur: 24,
      saturation: 120,
      borderOpacity: 0.08,
      borderRadius: 12,
      animation: {
        hover: { scale: 1.0, opacityIncrease: 0.0, blurIncrease: 0, duration: 0, easing: 'linear' },
        entrance: { delay: 0, duration: 300, easing: 'ease-out', type: 'fade' },
      },
    },
  },

  tablet: {
    subtle: {
      opacity: 0.05,
      blur: 12,
      saturation: 140,
      borderOpacity: 0.15,
      borderRadius: 10,
      animation: {
        hover: { scale: 1.01, opacityIncrease: 0.015, blurIncrease: 2, duration: 200, easing: 'ease-out' },
        entrance: { delay: 0, duration: 350, easing: 'ease-out', type: 'fade' },
      },
    },
    medium: {
      opacity: 0.08,
      blur: 16,
      saturation: 160,
      borderOpacity: 0.18,
      borderRadius: 14,
      animation: {
        hover: { scale: 1.02, opacityIncrease: 0.025, blurIncrease: 3, duration: 250, easing: 'ease-out' },
        entrance: { delay: 50, duration: 450, easing: 'ease-out', type: 'scale' },
      },
    },
    heavy: {
      opacity: 0.12,
      blur: 20,
      saturation: 170,
      borderOpacity: 0.22,
      borderRadius: 16,
      animation: {
        hover: { scale: 1.025, opacityIncrease: 0.035, blurIncrease: 5, duration: 300, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
        entrance: { delay: 75, duration: 600, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', type: 'blur' },
      },
    },
    accent: {
      opacity: 0.1,
      blur: 16,
      saturation: 170,
      borderOpacity: 0.2,
      borderRadius: 14,
      animation: {
        hover: { scale: 1.02, opacityIncrease: 0.025, blurIncrease: 3, duration: 250, easing: 'ease-out' },
        entrance: { delay: 0, duration: 500, easing: 'ease-out', type: 'slide' },
      },
    },
    navigation: {
      opacity: 0.06,
      blur: 24,
      saturation: 170,
      borderOpacity: 0.12,
      borderRadius: 22,
      animation: {
        hover: { scale: 1.0, opacityIncrease: 0.015, blurIncrease: 3, duration: 220, easing: 'ease-out' },
        entrance: { delay: 150, duration: 400, easing: 'ease-out', type: 'fade' },
      },
    },
    card: {
      opacity: 0.08,
      blur: 14,
      saturation: 150,
      borderOpacity: 0.15,
      borderRadius: 12,
      animation: {
        hover: { scale: 1.02, opacityIncrease: 0.03, blurIncrease: 3, duration: 250, easing: 'ease-out' },
        entrance: { delay: 0, duration: 450, easing: 'ease-out', type: 'slide' },
      },
    },
    button: {
      opacity: 0.12,
      blur: 14,
      saturation: 160,
      borderOpacity: 0.18,
      borderRadius: 22,
      animation: {
        hover: { scale: 1.04, opacityIncrease: 0.04, blurIncrease: 3, duration: 180, easing: 'ease-out' },
        entrance: { delay: 0, duration: 350, easing: 'ease-out', type: 'scale' },
      },
    },
    input: {
      opacity: 0.07,
      blur: 10,
      saturation: 140,
      borderOpacity: 0.12,
      borderRadius: 12,
      animation: {
        hover: { scale: 1.0, opacityIncrease: 0.015, blurIncrease: 2, duration: 180, easing: 'ease-out' },
        entrance: { delay: 0, duration: 280, easing: 'ease-out', type: 'fade' },
      },
    },
    hero: {
      opacity: 0.1,
      blur: 28,
      saturation: 180,
      borderOpacity: 0.25,
      borderRadius: 20,
      animation: {
        hover: { scale: 1.01, opacityIncrease: 0.025, blurIncrease: 6, duration: 350, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
        entrance: { delay: 250, duration: 800, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', type: 'blur' },
      },
    },
    overlay: {
      opacity: 0.14,
      blur: 32,
      saturation: 130,
      borderOpacity: 0.1,
      borderRadius: 14,
      animation: {
        hover: { scale: 1.0, opacityIncrease: 0.0, blurIncrease: 0, duration: 0, easing: 'linear' },
        entrance: { delay: 0, duration: 350, easing: 'ease-out', type: 'fade' },
      },
    },
  },

  desktop: {
    subtle: {
      opacity: 0.05,
      blur: 16,
      saturation: 120,
      borderOpacity: 0.1,
      borderRadius: 12,
      animation: {
        hover: { scale: 1.01, opacityIncrease: 0.02, blurIncrease: 2, duration: 200, easing: 'ease-out' },
        entrance: { delay: 0, duration: 400, easing: 'ease-out', type: 'fade' },
      },
    },
    medium: {
      opacity: 0.1,
      blur: 20,
      saturation: 180,
      borderOpacity: 0.2,
      borderRadius: 16,
      animation: {
        hover: { scale: 1.02, opacityIncrease: 0.03, blurIncrease: 5, duration: 300, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
        entrance: { delay: 100, duration: 600, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', type: 'scale' },
      },
    },
    heavy: {
      opacity: 0.15,
      blur: 24,
      saturation: 180,
      borderOpacity: 0.3,
      borderRadius: 20,
      animation: {
        hover: { scale: 1.03, opacityIncrease: 0.05, blurIncrease: 8, duration: 350, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
        entrance: { delay: 100, duration: 800, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', type: 'blur' },
      },
    },
    accent: {
      opacity: 0.12,
      blur: 20,
      saturation: 180,
      borderOpacity: 0.2,
      borderRadius: 16,
      animation: {
        hover: { scale: 1.02, opacityIncrease: 0.03, blurIncrease: 5, duration: 300, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
        entrance: { delay: 0, duration: 600, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', type: 'slide' },
      },
    },
    navigation: {
      opacity: 0.05,
      blur: 32,
      saturation: 180,
      borderOpacity: 0.15,
      borderRadius: 24,
      animation: {
        hover: { scale: 1.0, opacityIncrease: 0.02, blurIncrease: 4, duration: 250, easing: 'ease-out' },
        entrance: { delay: 200, duration: 500, easing: 'ease-out', type: 'fade' },
      },
    },
    card: {
      opacity: 0.08,
      blur: 16,
      saturation: 150,
      borderOpacity: 0.15,
      borderRadius: 12,
      animation: {
        hover: { scale: 1.02, opacityIncrease: 0.04, blurIncrease: 4, duration: 300, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' },
        entrance: { delay: 0, duration: 500, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', type: 'slide' },
      },
    },
    button: {
      opacity: 0.12,
      blur: 16,
      saturation: 160,
      borderOpacity: 0.2,
      borderRadius: 24,
      animation: {
        hover: { scale: 1.05, opacityIncrease: 0.05, blurIncrease: 4, duration: 200, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
        entrance: { delay: 0, duration: 400, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', type: 'scale' },
      },
    },
    input: {
      opacity: 0.08,
      blur: 8,
      saturation: 140,
      borderOpacity: 0.15,
      borderRadius: 12,
      animation: {
        hover: { scale: 1.0, opacityIncrease: 0.02, blurIncrease: 2, duration: 200, easing: 'ease-out' },
        entrance: { delay: 0, duration: 300, easing: 'ease-out', type: 'fade' },
      },
    },
    hero: {
      opacity: 0.1,
      blur: 32,
      saturation: 200,
      borderOpacity: 0.3,
      borderRadius: 24,
      animation: {
        hover: { scale: 1.01, opacityIncrease: 0.03, blurIncrease: 8, duration: 400, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
        entrance: { delay: 300, duration: 1000, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', type: 'blur' },
      },
    },
    overlay: {
      opacity: 0.15,
      blur: 40,
      saturation: 120,
      borderOpacity: 0.1,
      borderRadius: 16,
      animation: {
        hover: { scale: 1.0, opacityIncrease: 0.0, blurIncrease: 0, duration: 0, easing: 'linear' },
        entrance: { delay: 0, duration: 400, easing: 'ease-out', type: 'fade' },
      },
    },
  },

  wide: {
    subtle: {
      opacity: 0.05,
      blur: 20,
      saturation: 120,
      borderOpacity: 0.1,
      borderRadius: 14,
      animation: {
        hover: { scale: 1.01, opacityIncrease: 0.02, blurIncrease: 3, duration: 250, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' },
        entrance: { delay: 50, duration: 500, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', type: 'fade' },
      },
    },
    medium: {
      opacity: 0.1,
      blur: 24,
      saturation: 200,
      borderOpacity: 0.25,
      borderRadius: 18,
      animation: {
        hover: { scale: 1.02, opacityIncrease: 0.04, blurIncrease: 6, duration: 350, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
        entrance: { delay: 150, duration: 700, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', type: 'scale' },
      },
    },
    heavy: {
      opacity: 0.15,
      blur: 28,
      saturation: 200,
      borderOpacity: 0.35,
      borderRadius: 22,
      animation: {
        hover: { scale: 1.03, opacityIncrease: 0.06, blurIncrease: 10, duration: 400, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
        entrance: { delay: 200, duration: 900, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', type: 'blur' },
      },
    },
    accent: {
      opacity: 0.12,
      blur: 24,
      saturation: 200,
      borderOpacity: 0.25,
      borderRadius: 18,
      animation: {
        hover: { scale: 1.025, opacityIncrease: 0.04, blurIncrease: 6, duration: 350, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
        entrance: { delay: 100, duration: 700, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', type: 'slide' },
      },
    },
    navigation: {
      opacity: 0.05,
      blur: 40,
      saturation: 200,
      borderOpacity: 0.15,
      borderRadius: 28,
      animation: {
        hover: { scale: 1.0, opacityIncrease: 0.025, blurIncrease: 5, duration: 300, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' },
        entrance: { delay: 250, duration: 600, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', type: 'fade' },
      },
    },
    card: {
      opacity: 0.08,
      blur: 20,
      saturation: 170,
      borderOpacity: 0.18,
      borderRadius: 14,
      animation: {
        hover: { scale: 1.02, opacityIncrease: 0.05, blurIncrease: 5, duration: 350, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
        entrance: { delay: 75, duration: 600, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', type: 'slide' },
      },
    },
    button: {
      opacity: 0.14,
      blur: 18,
      saturation: 180,
      borderOpacity: 0.25,
      borderRadius: 26,
      animation: {
        hover: { scale: 1.06, opacityIncrease: 0.06, blurIncrease: 5, duration: 220, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
        entrance: { delay: 0, duration: 450, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', type: 'scale' },
      },
    },
    input: {
      opacity: 0.08,
      blur: 10,
      saturation: 150,
      borderOpacity: 0.18,
      borderRadius: 14,
      animation: {
        hover: { scale: 1.0, opacityIncrease: 0.025, blurIncrease: 3, duration: 220, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)' },
        entrance: { delay: 0, duration: 350, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', type: 'fade' },
      },
    },
    hero: {
      opacity: 0.12,
      blur: 36,
      saturation: 220,
      borderOpacity: 0.35,
      borderRadius: 28,
      animation: {
        hover: { scale: 1.015, opacityIncrease: 0.04, blurIncrease: 10, duration: 450, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
        entrance: { delay: 400, duration: 1200, easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)', type: 'blur' },
      },
    },
    overlay: {
      opacity: 0.18,
      blur: 48,
      saturation: 130,
      borderOpacity: 0.12,
      borderRadius: 18,
      animation: {
        hover: { scale: 1.0, opacityIncrease: 0.0, blurIncrease: 0, duration: 0, easing: 'linear' },
        entrance: { delay: 0, duration: 500, easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)', type: 'fade' },
      },
    },
  },
};

/**
 * Get current screen size category
 */
export function getCurrentScreenSize(): keyof ResponsiveBreakpoints {
  if (typeof window === 'undefined') return 'desktop';

  const width = window.innerWidth;

  if (width >= defaultBreakpoints.wide) return 'wide';
  if (width >= defaultBreakpoints.desktop) return 'desktop';
  if (width >= defaultBreakpoints.tablet) return 'tablet';
  return 'mobile';
}

/**
 * Get responsive glass configuration for current screen size
 */
export function getResponsiveGlassConfig(variant: GlassVariant): Partial<GlassConfig> {
  const screenSize = getCurrentScreenSize();
  const support = detectGlassSupport();

  let config = responsiveGlassVariants[screenSize][variant];

  // Apply performance-based adjustments
  if (support.performanceTier === 'low') {
    config = {
      ...config,
      blur: Math.max((config.blur || 20) * 0.6, 8),
      saturation: Math.max((config.saturation || 180) * 0.8, 120),
      animation: {
        hover: {
          ...config.animation?.hover,
          duration: Math.min(config.animation?.hover?.duration || 300, 200),
          scale: Math.min(config.animation?.hover?.scale || 1.02, 1.01),
        },
        entrance: { delay: 0, duration: 300, easing: 'ease-out', type: 'fade' },
        ...config.animation,
      },

    };
  }

  // Disable animations for reduced motion
  if (prefersReducedMotion()) {
    config = {
      ...config,
      animation: {
        hover: { scale: 1, opacityIncrease: 0, blurIncrease: 0, duration: 0, easing: 'linear' },
        entrance: { delay: 0, duration: 0, easing: 'linear', type: 'fade' },
      },
    };
  }

  return config;
}

/**
 * Touch interaction manager for mobile devices
 */
export class TouchInteractionManager {
  private elements = new Map<HTMLElement, { cleanup: () => void }>();

  /**
   * Add touch interactions to an element
   */
  addTouchInteractions(element: HTMLElement, config: Partial<TouchInteractionConfig> = {}): void {
    const finalConfig = { ...touchConfig, ...config };

    // Ensure minimum touch target size
    this.ensureMinimumTouchTarget(element, finalConfig.minTouchTarget);

    // Add touch event listeners
    const cleanup = this.setupTouchEvents(element, finalConfig);

    // Store cleanup function
    this.elements.set(element, { cleanup });
  }

  /**
   * Remove touch interactions from an element
   */
  removeTouchInteractions(element: HTMLElement): void {
    const entry = this.elements.get(element);
    if (entry) {
      entry.cleanup();
      this.elements.delete(element);
    }
  }

  /**
   * Ensure element meets minimum touch target size
   */
  private ensureMinimumTouchTarget(element: HTMLElement, minSize: number): void {
    const computedStyle = window.getComputedStyle(element);
    const currentWidth = parseFloat(computedStyle.width);
    const currentHeight = parseFloat(computedStyle.height);

    if (currentWidth < minSize || currentHeight < minSize) {
      element.style.minWidth = `${minSize}px`;
      element.style.minHeight = `${minSize}px`;
      element.style.display = element.style.display || 'inline-flex';
      element.style.alignItems = 'center';
      element.style.justifyContent = 'center';
    }
  }

  /**
   * Setup touch event listeners
   */
  private setupTouchEvents(element: HTMLElement, config: TouchInteractionConfig): () => void {
    let touchStartTime = 0;
    let touchStartPos = { x: 0, y: 0 };
    let isPressed = false;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartTime = Date.now();
      touchStartPos = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
      isPressed = true;

      // Apply press feedback
      element.style.transform = `scale(${config.touchFeedbackScale}) translateZ(0)`;
      element.style.transition = `transform ${config.touchFeedbackDuration}ms ease-out`;

      // Haptic feedback if supported
      if (config.hapticFeedback && 'vibrate' in navigator) {
        navigator.vibrate(10);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isPressed) return;

      const currentPos = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };

      const distance = Math.sqrt(
        Math.pow(currentPos.x - touchStartPos.x, 2) +
        Math.pow(currentPos.y - touchStartPos.y, 2)
      );

      // Cancel press if moved too far
      if (distance > 10) {
        isPressed = false;
        element.style.transform = 'scale(1) translateZ(0)';
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isPressed) return;

      const touchDuration = Date.now() - touchStartTime;
      isPressed = false;

      // Quick tap feedback
      if (touchDuration < 200) {
        element.style.transform = 'scale(1.02) translateZ(0)';
        setTimeout(() => {
          element.style.transform = 'scale(1) translateZ(0)';
        }, 100);
      } else {
        element.style.transform = 'scale(1) translateZ(0)';
      }
    };

    const handleTouchCancel = () => {
      isPressed = false;
      element.style.transform = 'scale(1) translateZ(0)';
    };

    // Add event listeners
    element.addEventListener('touchstart', handleTouchStart, { passive: true });
    element.addEventListener('touchmove', handleTouchMove, { passive: true });
    element.addEventListener('touchend', handleTouchEnd, { passive: true });
    element.addEventListener('touchcancel', handleTouchCancel, { passive: true });

    // Optimize for touch
    element.style.touchAction = 'manipulation';
    element.style.userSelect = 'none';
    element.style.webkitTapHighlightColor = 'transparent';

    // Return cleanup function
    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      element.removeEventListener('touchcancel', handleTouchCancel);

      element.style.touchAction = '';
      element.style.userSelect = '';
      element.style.webkitTapHighlightColor = '';
      element.style.minWidth = '';
      element.style.minHeight = '';
    };
  }

  /**
   * Cleanup all touch interactions
   */
  cleanup(): void {
    this.elements.forEach(({ cleanup }) => cleanup());
    this.elements.clear();
  }
}

/**
 * Responsive glass layout utilities
 */
export const responsiveLayout = {
  /**
   * Get responsive padding based on screen size
   */
  getPadding(): string {
    const screenSize = getCurrentScreenSize();

    switch (screenSize) {
      case 'mobile':
        return '16px';
      case 'tablet':
        return '24px';
      case 'desktop':
        return '32px';
      case 'wide':
        return '40px';
      default:
        return '24px';
    }
  },

  /**
   * Get responsive gap based on screen size
   */
  getGap(): string {
    const screenSize = getCurrentScreenSize();

    switch (screenSize) {
      case 'mobile':
        return '12px';
      case 'tablet':
        return '16px';
      case 'desktop':
        return '20px';
      case 'wide':
        return '24px';
      default:
        return '16px';
    }
  },

  /**
   * Get responsive border radius based on screen size
   */
  getBorderRadius(): string {
    const screenSize = getCurrentScreenSize();

    switch (screenSize) {
      case 'mobile':
        return '12px';
      case 'tablet':
        return '14px';
      case 'desktop':
        return '16px';
      case 'wide':
        return '20px';
      default:
        return '14px';
    }
  },

  /**
   * Get responsive font size based on screen size
   */
  getFontSize(base: number): string {
    const screenSize = getCurrentScreenSize();

    const multipliers = {
      mobile: 0.875,
      tablet: 0.9375,
      desktop: 1,
      wide: 1.125,
    };

    return `${base * multipliers[screenSize]}rem`;
  },
};

/**
 * Global touch interaction manager instance
 */
let globalTouchManager: TouchInteractionManager | null = null;

/**
 * Initialize global touch interactions
 */
export function initializeTouchInteractions(): TouchInteractionManager {
  if (typeof window === 'undefined') {
    return {} as TouchInteractionManager;
  }

  if (!globalTouchManager) {
    globalTouchManager = new TouchInteractionManager();
  }

  return globalTouchManager;
}

/**
 * Cleanup global touch interactions
 */
export function cleanupTouchInteractions(): void {
  if (globalTouchManager) {
    globalTouchManager.cleanup();
    globalTouchManager = null;
  }
}

/**
 * Media query utilities for responsive glass
 */
export const mediaQueries = {
  mobile: `(max-width: ${defaultBreakpoints.tablet - 1}px)`,
  tablet: `(min-width: ${defaultBreakpoints.tablet}px) and (max-width: ${defaultBreakpoints.desktop - 1}px)`,
  desktop: `(min-width: ${defaultBreakpoints.desktop}px) and (max-width: ${defaultBreakpoints.wide - 1}px)`,
  wide: `(min-width: ${defaultBreakpoints.wide}px)`,

  // Utility queries
  isMobile: () => typeof window !== 'undefined' && window.matchMedia(mediaQueries.mobile).matches,
  isTablet: () => typeof window !== 'undefined' && window.matchMedia(mediaQueries.tablet).matches,
  isDesktop: () => typeof window !== 'undefined' && window.matchMedia(mediaQueries.desktop).matches,
  isWide: () => typeof window !== 'undefined' && window.matchMedia(mediaQueries.wide).matches,
};