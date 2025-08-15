/**
 * GlassPanel Component
 * Base glass morphism component with configurable opacity and blur
 */

'use client';

import React, { forwardRef } from 'react';
import Glass from './Glass';
import type { GlassComponentProps, GlassConfig } from '@/types/glass';

interface GlassPanelProps extends GlassComponentProps {
  /** Panel padding size */
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  /** Whether to show inner glow effect */
  innerGlow?: boolean;
  /** Whether to enable floating animation */
  floating?: boolean;
  /** Custom opacity override (0.05-0.15) */
  opacity?: number;
  /** Custom blur override (10-40px) */
  blur?: number;
  /** Whether to enable morphing hover effects */
  morphing?: boolean;
  /** Additional HTML attributes */
  style?: React.CSSProperties;
}

/**
 * Base glass panel component with configurable opacity and blur
 * Optimized for content display with liquid morphing effects
 */
export const GlassPanel = forwardRef<HTMLDivElement, GlassPanelProps>(
  ({ 
    padding = 'lg',
    innerGlow = false,
    floating = false,
    opacity,
    blur,
    morphing = true,
    variant = 'card',
    glassConfig,
    className = '',
    children,
    ...props 
  }, ref) => {
    const paddingClasses = {
      sm: 'p-3',
      md: 'p-4',
      lg: 'p-6',
      xl: 'p-8',
    };
    
    // Create custom glass configuration with opacity and blur overrides
    const customGlassConfig: Partial<GlassConfig> = {
      ...glassConfig,
      ...(opacity !== undefined && { opacity }),
      ...(blur !== undefined && { blur }),
    };
    
    // Add morphing animation classes based on props
    const morphingClasses = morphing ? [
      'glass-liquid',
      'transition-all duration-300 ease-out',
      'hover:scale-[1.01] hover:shadow-2xl',
    ].join(' ') : '';
    
    const additionalClasses = [
      paddingClasses[padding],
      innerGlow ? 'glass-glow' : '',
      floating ? 'animate-float' : '',
      morphingClasses,
      'glass-panel-enhanced',
    ].filter(Boolean).join(' ');
    
    return (
      <Glass
        ref={ref}
        variant={variant}
        glassConfig={customGlassConfig}
        enableHover={morphing}
        className={`${additionalClasses} ${className}`.trim()}
        {...props}
      >
        {children}
      </Glass>
    );
  }
);

GlassPanel.displayName = 'GlassPanel';

export default GlassPanel;