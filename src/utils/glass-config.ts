/**
 * Glass Morphism Configuration Utilities
 * Predefined configurations and helper functions for glass components
 */

import type { GlassConfig, GlassVariant, GlassTheme, GlassComponentProps } from '@/types/glass';
import { glass } from '@/design/tokens';

/**
 * Predefined glass configurations for different variants
 */
export const glassVariants: Record<GlassVariant, Partial<GlassConfig>> = {
  subtle: {
    opacity: glass.opacity.subtle,
    blur: parseInt(glass.blur.sm),
    saturation: 120,
    borderOpacity: glass.border.subtle,
    borderRadius: parseInt(glass.radius.sm),
    shadow: {
      blur: 16,
      color: 'rgba(0, 0, 0, 0.05)',
      offsetX: 0,
      offsetY: 4,
    },
    animation: {
      hover: {
        scale: 1.01,
        opacityIncrease: 0.02,
        blurIncrease: 2,
        duration: 200,
        easing: glass.animations.hover.easing,
      },
      entrance: {
        delay: 0,
        duration: 400,
        easing: glass.animations.entrance.easing,
        type: 'fade',
      },
    },
  },
  
  medium: {
    opacity: glass.opacity.medium,
    blur: parseInt(glass.blur.lg),
    saturation: 150,
    borderOpacity: glass.border.medium,
    borderRadius: parseInt(glass.radius.lg),
    shadow: {
      blur: 32,
      color: 'rgba(0, 0, 0, 0.1)',
      offsetX: 0,
      offsetY: 8,
      inset: {
        blur: 0,
        color: 'rgba(255, 255, 255, 0.2)',
        offsetX: 0,
        offsetY: 1,
      },
    },
    animation: {
      hover: {
        scale: glass.animations.hover.scale,
        opacityIncrease: glass.animations.hover.opacityIncrease,
        blurIncrease: parseInt(glass.animations.hover.blurIncrease),
        duration: parseInt(glass.animations.hover.duration),
        easing: glass.animations.hover.easing,
      },
      entrance: {
        delay: 0,
        duration: parseInt(glass.animations.entrance.duration),
        easing: glass.animations.entrance.easing,
        type: 'scale',
      },
    },
  },
  
  heavy: {
    opacity: glass.opacity.heavy,
    blur: parseInt(glass.blur.xl),
    saturation: 180,
    borderOpacity: glass.border.heavy,
    borderRadius: parseInt(glass.radius.xl),
    shadow: {
      blur: 40,
      color: 'rgba(0, 0, 0, 0.15)',
      offsetX: 0,
      offsetY: 16,
      inset: {
        blur: 0,
        color: 'rgba(255, 255, 255, 0.3)',
        offsetX: 0,
        offsetY: 1,
      },
    },
    animation: {
      hover: {
        scale: 1.03,
        opacityIncrease: 0.05,
        blurIncrease: 8,
        duration: 350,
        easing: glass.animations.hover.easing,
      },
      entrance: {
        delay: 100,
        duration: 800,
        easing: glass.animations.entrance.easing,
        type: 'blur',
      },
    },
  },
  
  accent: {
    opacity: glass.opacity.accent,
    blur: parseInt(glass.blur.lg),
    saturation: 180,
    borderOpacity: glass.border.medium,
    borderRadius: parseInt(glass.radius.lg),
    shadow: {
      blur: 32,
      color: 'rgba(59, 130, 246, 0.3)',
      offsetX: 0,
      offsetY: 8,
    },
    animation: {
      hover: {
        scale: 1.02,
        opacityIncrease: 0.03,
        blurIncrease: 5,
        duration: 300,
        easing: glass.animations.hover.easing,
      },
      entrance: {
        delay: 0,
        duration: 600,
        easing: glass.animations.entrance.easing,
        type: 'slide',
      },
    },
  },
  
  navigation: {
    opacity: glass.opacity.subtle,
    blur: parseInt(glass.blur['2xl']),
    saturation: 180,
    borderOpacity: glass.border.light,
    borderRadius: parseInt(glass.radius.pill),
    shadow: {
      blur: 24,
      color: 'rgba(0, 0, 0, 0.08)',
      offsetX: 0,
      offsetY: 4,
    },
    animation: {
      hover: {
        scale: 1.0,
        opacityIncrease: 0.02,
        blurIncrease: 4,
        duration: 250,
        easing: glass.animations.hover.easing,
      },
      entrance: {
        delay: 200,
        duration: 500,
        easing: glass.animations.entrance.easing,
        type: 'fade',
      },
    },
  },
  
  card: {
    opacity: glass.opacity.light,
    blur: parseInt(glass.blur.md),
    saturation: 150,
    borderOpacity: glass.border.light,
    borderRadius: parseInt(glass.radius.md),
    shadow: {
      blur: 24,
      color: 'rgba(0, 0, 0, 0.08)',
      offsetX: 0,
      offsetY: 6,
    },
    animation: {
      hover: {
        scale: 1.02,
        opacityIncrease: 0.04,
        blurIncrease: 4,
        duration: 300,
        easing: glass.animations.hover.easing,
      },
      entrance: {
        delay: 0,
        duration: 500,
        easing: glass.animations.entrance.easing,
        type: 'slide',
      },
    },
  },
  
  button: {
    opacity: glass.opacity.medium,
    blur: parseInt(glass.blur.md),
    saturation: 160,
    borderOpacity: glass.border.medium,
    borderRadius: parseInt(glass.radius.pill),
    shadow: {
      blur: 16,
      color: 'rgba(0, 0, 0, 0.1)',
      offsetX: 0,
      offsetY: 4,
    },
    animation: {
      hover: {
        scale: 1.05,
        opacityIncrease: 0.05,
        blurIncrease: 4,
        duration: 200,
        easing: glass.animations.hover.easing,
      },
      entrance: {
        delay: 0,
        duration: 400,
        easing: glass.animations.hover.easing,
        type: 'scale',
      },
    },
  },
  
  input: {
    opacity: glass.opacity.light,
    blur: parseInt(glass.blur.sm),
    saturation: 140,
    borderOpacity: glass.border.light,
    borderRadius: parseInt(glass.radius.md),
    shadow: {
      blur: 8,
      color: 'rgba(0, 0, 0, 0.05)',
      offsetX: 0,
      offsetY: 2,
      inset: {
        blur: 4,
        color: 'rgba(0, 0, 0, 0.1)',
        offsetX: 0,
        offsetY: 1,
      },
    },
    animation: {
      hover: {
        scale: 1.0,
        opacityIncrease: 0.02,
        blurIncrease: 2,
        duration: 200,
        easing: glass.animations.hover.easing,
      },
      entrance: {
        delay: 0,
        duration: 300,
        easing: glass.animations.entrance.easing,
        type: 'fade',
      },
    },
  },
  
  hero: {
    opacity: glass.opacity.medium,
    blur: parseInt(glass.blur['2xl']),
    saturation: 200,
    borderOpacity: glass.border.heavy,
    borderRadius: parseInt(glass.radius['2xl']),
    shadow: {
      blur: 48,
      color: 'rgba(0, 0, 0, 0.2)',
      offsetX: 0,
      offsetY: 20,
      inset: {
        blur: 0,
        color: 'rgba(255, 255, 255, 0.3)',
        offsetX: 0,
        offsetY: 1,
      },
    },
    animation: {
      hover: {
        scale: 1.01,
        opacityIncrease: 0.03,
        blurIncrease: 8,
        duration: 400,
        easing: glass.animations.morphing.easing,
      },
      entrance: {
        delay: 300,
        duration: 1000,
        easing: glass.animations.morphing.easing,
        type: 'blur',
      },
    },
  },
  
  overlay: {
    opacity: glass.opacity.heavy,
    blur: parseInt(glass.blur['3xl']),
    saturation: 120,
    borderOpacity: glass.border.subtle,
    borderRadius: parseInt(glass.radius.lg),
    shadow: {
      blur: 64,
      color: 'rgba(0, 0, 0, 0.3)',
      offsetX: 0,
      offsetY: 24,
    },
    animation: {
      hover: {
        scale: 1.0,
        opacityIncrease: 0.0,
        blurIncrease: 0,
        duration: 0,
        easing: 'linear',
      },
      entrance: {
        delay: 0,
        duration: 400,
        easing: glass.animations.entrance.easing,
        type: 'fade',
      },
    },
  },
};

/**
 * Glass theme color configurations
 */
export const glassThemes: Record<GlassTheme, { background: string; border: string; shadow?: string }> = {
  default: {
    background: 'rgba(255, 255, 255, var(--glass-opacity))',
    border: 'rgba(255, 255, 255, var(--glass-border-opacity))',
  },
  dark: {
    background: 'rgba(0, 0, 0, var(--glass-opacity))',
    border: 'rgba(255, 255, 255, var(--glass-border-opacity))',
  },
  blue: {
    background: 'rgba(59, 130, 246, var(--glass-opacity))',
    border: 'rgba(59, 130, 246, var(--glass-border-opacity))',
    shadow: '0 0 32px rgba(59, 130, 246, 0.3)',
  },
  emerald: {
    background: 'rgba(16, 185, 129, var(--glass-opacity))',
    border: 'rgba(16, 185, 129, var(--glass-border-opacity))',
    shadow: '0 0 32px rgba(16, 185, 129, 0.3)',
  },
  purple: {
    background: 'rgba(147, 51, 234, var(--glass-opacity))',
    border: 'rgba(147, 51, 234, var(--glass-border-opacity))',
    shadow: '0 0 32px rgba(147, 51, 234, 0.3)',
  },
  amber: {
    background: 'rgba(245, 158, 11, var(--glass-opacity))',
    border: 'rgba(245, 158, 11, var(--glass-border-opacity))',
    shadow: '0 0 32px rgba(245, 158, 11, 0.3)',
  },
  rose: {
    background: 'rgba(244, 63, 94, var(--glass-opacity))',
    border: 'rgba(244, 63, 94, var(--glass-border-opacity))',
    shadow: '0 0 32px rgba(244, 63, 94, 0.3)',
  },
  gradient: {
    background: 'linear-gradient(135deg, rgba(59, 130, 246, var(--glass-opacity)), rgba(16, 185, 129, var(--glass-opacity)))',
    border: 'rgba(255, 255, 255, var(--glass-border-opacity))',
    shadow: '0 0 32px rgba(59, 130, 246, 0.2)',
  },
};

/**
 * Generates CSS custom properties for a glass configuration
 */
export function generateGlassCSS(config: Partial<GlassConfig> = {}): Record<string, string> {
  return {
    '--glass-opacity': (config?.opacity ?? glass.opacity.medium).toString(),
    '--glass-border-opacity': (config?.borderOpacity ?? glass.border.medium).toString(),
    '--glass-blur': `${config?.blur ?? parseInt(glass.blur.lg)}px`,
    '--glass-saturation': `${config?.saturation ?? 180}%`,
    '--glass-radius': `${config?.borderRadius ?? parseInt(glass.radius.lg)}px`,
  };
}

/**
 * Generates Tailwind CSS classes for glass configuration
 */
export function generateGlassClasses(
  variant: GlassVariant = 'medium',
  theme: GlassTheme = 'default',
  enableHover: boolean = true,
  enableEntrance: boolean = false
): string {
  const classes = ['glass', `glass-${variant}`];
  
  if (theme !== 'default') {
    classes.push(`glass-${theme}`);
  }
  
  if (enableHover) {
    classes.push('glass-hover');
  }
  
  if (enableEntrance) {
    classes.push('glass-entrance');
  }
  
  classes.push('glass-accelerated');
  
  return classes.join(' ');
}

/**
 * Merges glass configuration with defaults
 */
export function mergeGlassConfig(
  variant: GlassVariant,
  customConfig?: Partial<GlassConfig>
): GlassConfig {
  const baseConfig = glassVariants[variant] || glassVariants.medium;
  
  // Create a complete config with all required properties
  const completeConfig: GlassConfig = {
    opacity: customConfig?.opacity ?? (baseConfig.opacity as number) ?? glass.opacity.medium,
    blur: customConfig?.blur ?? (baseConfig.blur as number) ?? parseInt(glass.blur.lg),
    saturation: customConfig?.saturation ?? (baseConfig.saturation as number) ?? 180,
    borderOpacity: customConfig?.borderOpacity ?? (baseConfig.borderOpacity as number) ?? glass.border.medium,
    borderRadius: customConfig?.borderRadius ?? (baseConfig.borderRadius as number) ?? parseInt(glass.radius.lg),
    shadow: {
      blur: customConfig?.shadow?.blur ?? baseConfig.shadow?.blur ?? 32,
      color: customConfig?.shadow?.color ?? baseConfig.shadow?.color ?? 'rgba(0, 0, 0, 0.1)',
      offsetX: customConfig?.shadow?.offsetX ?? baseConfig.shadow?.offsetX ?? 0,
      offsetY: customConfig?.shadow?.offsetY ?? baseConfig.shadow?.offsetY ?? 8,
      inset: customConfig?.shadow?.inset ?? baseConfig.shadow?.inset,
    },
    animation: {
      hover: {
        scale: customConfig?.animation?.hover?.scale ?? baseConfig.animation?.hover?.scale ?? 1.02,
        opacityIncrease: customConfig?.animation?.hover?.opacityIncrease ?? baseConfig.animation?.hover?.opacityIncrease ?? 0.03,
        blurIncrease: customConfig?.animation?.hover?.blurIncrease ?? baseConfig.animation?.hover?.blurIncrease ?? 5,
        duration: customConfig?.animation?.hover?.duration ?? baseConfig.animation?.hover?.duration ?? 300,
        easing: customConfig?.animation?.hover?.easing ?? baseConfig.animation?.hover?.easing ?? 'ease-out',
      },
      entrance: {
        delay: customConfig?.animation?.entrance?.delay ?? baseConfig.animation?.entrance?.delay ?? 0,
        duration: customConfig?.animation?.entrance?.duration ?? baseConfig.animation?.entrance?.duration ?? 600,
        easing: customConfig?.animation?.entrance?.easing ?? baseConfig.animation?.entrance?.easing ?? 'ease-out',
        type: customConfig?.animation?.entrance?.type ?? baseConfig.animation?.entrance?.type ?? 'fade',
      },
    },
  };
  
  return completeConfig;
}

/**
 * Gets the appropriate glass configuration based on component props
 */
export function getGlassConfiguration(props: GlassComponentProps): {
  config: GlassConfig;
  cssVars: Record<string, string>;
  className: string;
} {
  const variant = props.variant || 'medium';
  const theme = props.theme || 'default';
  const enableHover = props.enableHover ?? true;
  const enableEntrance = props.enableEntrance ?? false;
  
  const config = mergeGlassConfig(variant, props.glassConfig);
  
  // Create a safe config object for CSS generation with fallbacks
  const safeConfig = {
    opacity: config?.opacity ?? glass.opacity.medium,
    blur: config?.blur ?? parseInt(glass.blur.lg),
    saturation: config?.saturation ?? 180,
    borderOpacity: config?.borderOpacity ?? glass.border.medium,
    borderRadius: config?.borderRadius ?? parseInt(glass.radius.lg),
  };
  
  const cssVars = generateGlassCSS(safeConfig);
  const className = generateGlassClasses(variant, theme, enableHover, enableEntrance);
  
  return {
    config: config || safeConfig as GlassConfig,
    cssVars,
    className: `${className} ${props.className || ''}`.trim(),
  };
}