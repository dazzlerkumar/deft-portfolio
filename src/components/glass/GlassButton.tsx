/**
 * GlassButton Component
 * Interactive glass button with liquid transition effects
 */

'use client';

import React, { forwardRef, useState } from 'react';
import Glass from './Glass';
import type { GlassComponentProps } from '@/types/glass';

interface GlassButtonProps extends GlassComponentProps {
  /** Button size variant */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Button style variant */
  buttonVariant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  /** Whether button is disabled */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Whether to enable liquid transition effects */
  liquid?: boolean;
  /** Liquid effect intensity */
  liquidIntensity?: 'subtle' | 'medium' | 'strong';
  /** Icon to display before text */
  icon?: React.ReactNode;
  /** Icon to display after text */
  iconAfter?: React.ReactNode;
  /** Click handler */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
  /** Additional HTML attributes */
  style?: React.CSSProperties;
}

/**
 * Glass button component with liquid transition effects and morphing animations
 */
export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(
  ({ 
    size = 'md',
    buttonVariant = 'primary',
    disabled = false,
    loading = false,
    liquid = true,
    liquidIntensity = 'medium',
    icon,
    iconAfter,
    variant = 'button',
    theme = buttonVariant === 'primary' ? 'blue' : 'default',
    className = '',
    children,
    onClick,
    type = 'button',
    ...props 
  }, ref) => {
    const [isPressed, setIsPressed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    
    const sizeClasses = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
      xl: 'px-8 py-4 text-xl',
    };
    
    const variantClasses = {
      primary: 'text-blue-200 font-medium',
      secondary: 'text-white font-medium',
      accent: 'text-emerald-200 font-medium',
      ghost: 'text-white/80 font-normal',
    };
    
    const liquidClasses = {
      subtle: 'glass-liquid-subtle',
      medium: 'glass-liquid-medium',
      strong: 'glass-liquid-strong',
    };
    
    const baseClasses = [
      'inline-flex items-center justify-center gap-2',
      'font-medium text-center cursor-pointer',
      'focus:outline-none focus:ring-2 focus:ring-blue-500/50',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'select-none relative overflow-hidden',
      'glass-animated',
      'transform-gpu will-change-transform',
      liquid ? liquidClasses[liquidIntensity] : '',
      'transition-all duration-300 cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      sizeClasses[size],
      variantClasses[buttonVariant],
    ].filter(Boolean).join(' ');
    
    const handleClick = (event: React.MouseEvent<Element>) => {
      if (disabled || loading) {
        event.preventDefault();
        return;
      }
      onClick?.(event as React.MouseEvent<HTMLButtonElement>);
    };
    
    const handleMouseDown = () => {
      setIsPressed(true);
    };
    
    const handleMouseUp = () => {
      setIsPressed(false);
    };
    
    const handleMouseEnter = () => {
      setIsHovered(true);
    };
    
    const handleMouseLeave = () => {
      setIsHovered(false);
      setIsPressed(false);
    };
    
    const buttonTheme = buttonVariant === 'accent' ? 'emerald' : 
                       buttonVariant === 'ghost' ? 'default' : theme;
    
    // Calculate liquid transform based on state
    const getLiquidTransform = () => {
      if (disabled || loading) return 'scale(1)';
      if (isPressed) return 'scale(0.95)';
      if (isHovered && liquid) {
        const scaleMap = { subtle: 1.02, medium: 1.05, strong: 1.08 };
        return `scale(${scaleMap[liquidIntensity]})`;
      }
      return 'scale(1)';
    };
    
    return (
      <Glass
        as="button"
        ref={ref}
        variant={variant}
        theme={buttonTheme}
        enableHover={liquid}
        className={`${baseClasses} ${className}`.trim()}
        disabled={disabled || loading}
        onClick={handleClick}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        type={type}
        style={{
          transform: getLiquidTransform(),
          ...props.style,
        }}
        {...props}
      >
        {/* Liquid ripple effect */}
        {liquid && !disabled && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute inset-0 bg-white/10 rounded-inherit opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-700 group-hover:translate-x-full" />
          </div>
        )}
        
        <div className="relative z-10 flex items-center justify-center gap-2">
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
          ) : icon}
          {children}
          {!loading && iconAfter}
        </div>
      </Glass>
    );
  }
);

GlassButton.displayName = 'GlassButton';

export default GlassButton;