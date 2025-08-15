/**
 * Glass Component
 * Base glass morphism component with configurable variants and themes
 */

'use client';

import React, { forwardRef, useEffect, useState } from 'react';
import type { GlassComponentProps } from '@/types/glass';
import { getGlassConfiguration } from '@/utils/glass-config';
import { detectGlassSupport, getGlassClassName, getGlassFallback } from '@/utils/glass-support';
import type { GlassBrowserSupport } from '@/types/glass';

interface GlassProps extends GlassComponentProps {
  /** HTML element type to render */
  as?: keyof React.JSX.IntrinsicElements;
  /** Additional HTML attributes */
  style?: React.CSSProperties;
  /** Click handler for interactive elements */
  onClick?: (event: React.MouseEvent<Element>) => void;
  /** Mouse enter handler */
  onMouseEnter?: (event: React.MouseEvent<Element>) => void;
  /** Mouse leave handler */
  onMouseLeave?: (event: React.MouseEvent<Element>) => void;
  /** Mouse down handler */
  onMouseDown?: (event: React.MouseEvent<Element>) => void;
  /** Mouse up handler */
  onMouseUp?: (event: React.MouseEvent<Element>) => void;
  /** Key down handler */
  onKeyDown?: (event: React.KeyboardEvent<Element>) => void;
  /** ARIA role */
  role?: string;
  /** Tab index for keyboard navigation */
  tabIndex?: number;
  /** Disabled state for form elements */
  disabled?: boolean;
  /** Button type for button elements */
  type?: 'button' | 'submit' | 'reset';
}

/**
 * Glass morphism component with automatic browser support detection and fallbacks
 */
export const Glass = forwardRef<HTMLElement, GlassProps>(
  ({ 
    as: Component = 'div',
    glassConfig,
    variant = 'medium',
    className = '',
    children,
    enableHover = true,
    enableEntrance = false,
    theme = 'default',
    style,
    ...props 
  }, ref) => {
    const [browserSupport, setBrowserSupport] = useState<GlassBrowserSupport>({
      supportsBackdropFilter: true,
      supportsFilter: true,
      supportsTransform: true,
      supportsHardwareAcceleration: true,
      performanceTier: 'medium',
    });
    
    const [isClient, setIsClient] = useState(false);
    
    // Detect browser support on client side
    useEffect(() => {
      setIsClient(true);
      setBrowserSupport(detectGlassSupport());
    }, []);
    
    // Get glass configuration
    const { cssVars, className: glassClassName } = getGlassConfiguration({
      glassConfig,
      variant,
      className,
      enableHover,
      enableEntrance,
      theme,
    });
    
    // Generate fallback styles if needed
    const fallbackStyles = !browserSupport.supportsBackdropFilter 
      ? getGlassFallback(theme)
      : {};
    
    // Combine class names with browser support detection
    const finalClassName = isClient 
      ? getGlassClassName(glassClassName, browserSupport)
      : glassClassName;
    
    // Combine styles
    const combinedStyles = {
      ...cssVars,
      ...fallbackStyles,
      ...style,
    };
    
    // Add reduced motion class if needed
    const motionClassName = browserSupport.performanceTier === 'low' || 
      (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches)
      ? 'glass-no-motion'
      : '';
    
    const finalClassNames = `${finalClassName} ${motionClassName}`.trim();
    
    return React.createElement(
      Component,
      {
        ref,
        className: finalClassNames,
        style: combinedStyles,
        ...props,
      },
      children
    );
  }
);

Glass.displayName = 'Glass';

export default Glass;