/**
 * GlassCard Component
 * Card component with glass morphism effects and hover morphing animations
 */

'use client';

import React, { forwardRef, useState } from 'react';
import Glass from './Glass';
import type { GlassComponentProps } from '@/types/glass';

interface GlassCardProps extends GlassComponentProps {
  /** Card header content */
  header?: React.ReactNode;
  /** Card footer content */
  footer?: React.ReactNode;
  /** Whether card is clickable */
  clickable?: boolean;
  /** Whether to show hover lift effect */
  hoverLift?: boolean;
  /** Whether to enable morphing animations */
  morphing?: boolean;
  /** Card padding size */
  padding?: 'sm' | 'md' | 'lg' | 'xl';
  /** Morphing intensity (subtle, medium, strong) */
  morphIntensity?: 'subtle' | 'medium' | 'strong';
  /** Click handler for clickable cards */
  onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
  /** Hover handler for morphing effects */
  onHover?: (isHovered: boolean) => void;
  /** Additional HTML attributes */
  style?: React.CSSProperties;
}

/**
 * Glass card component with hover morphing animations and interactive effects
 */
export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ 
    header,
    footer,
    clickable = false,
    hoverLift = true,
    morphing = true,
    padding = 'lg',
    morphIntensity = 'medium',
    variant = 'card',
    className = '',
    children,
    onClick,
    onHover,
    ...props 
  }, ref) => {
    const [isHovered, setIsHovered] = useState(false);
    
    const paddingClasses = {
      sm: 'p-4',
      md: 'p-5',
      lg: 'p-6',
      xl: 'p-8',
    };
    
    const morphingClasses = {
      subtle: 'glass-morph-subtle',
      medium: 'glass-morph-medium', 
      strong: 'glass-morph-strong',
    };
    
    const baseClasses = [
      'glass-card-enhanced',
      'glass-animated',
      paddingClasses[padding],
      clickable ? 'cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/50' : '',
      hoverLift ? 'hover:shadow-2xl' : '',
      morphing ? morphingClasses[morphIntensity] : '',
      'transition-all duration-300 cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      'transform-gpu will-change-transform',
    ].filter(Boolean).join(' ');
    
    const handleClick = (event: React.MouseEvent<Element>) => {
      if (clickable && onClick) {
        onClick(event as React.MouseEvent<HTMLDivElement>);
      }
    };
    
    const handleMouseEnter = () => {
      setIsHovered(true);
      onHover?.(true);
    };
    
    const handleMouseLeave = () => {
      setIsHovered(false);
      onHover?.(false);
    };
    
    const handleKeyDown = (event: React.KeyboardEvent<Element>) => {
      if (clickable && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault();
        onClick?.(event as unknown as React.MouseEvent<HTMLDivElement>);
      }
    };
    
    return (
      <Glass
        ref={ref}
        variant={variant}
        enableHover={morphing}
        className={`${baseClasses} ${className}`.trim()}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onKeyDown={handleKeyDown}
        role={clickable ? 'button' : undefined}
        tabIndex={clickable ? 0 : undefined}
        style={{
          transform: isHovered && morphing ? 'translateY(-4px) scale(1.02)' : undefined,
          boxShadow: isHovered && morphing ? '0 20px 48px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3)' : undefined,
          ...props.style,
        }}
        {...props}
      >
        {header && (
          <div className="mb-4 pb-4 border-b border-white/10 glass-border-animated">
            {header}
          </div>
        )}
        
        <div className="flex-1 relative">
          {children}
          {morphing && (
            <div className="absolute inset-0 pointer-events-none glass-reflection opacity-0 hover:opacity-100 transition-opacity duration-300" />
          )}
        </div>
        
        {footer && (
          <div className="mt-4 pt-4 border-t border-white/10 glass-border-animated">
            {footer}
          </div>
        )}
      </Glass>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;