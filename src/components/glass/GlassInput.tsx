/**
 * GlassInput Component
 * Form input with glass morphism styling and floating labels
 */

'use client';

import React, { forwardRef, useState, useEffect } from 'react';
import Glass from './Glass';
import type { GlassComponentProps } from '@/types/glass';

interface GlassInputProps extends Omit<GlassComponentProps, 'children'> {
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  /** Input placeholder */
  placeholder?: string;
  /** Floating label text */
  label?: string;
  /** Input value */
  value?: string;
  /** Default value for uncontrolled input */
  defaultValue?: string;
  /** Whether input is disabled */
  disabled?: boolean;
  /** Whether input is required */
  required?: boolean;
  /** Error message to display */
  error?: string;
  /** Helper text to display */
  helperText?: string;
  /** Input size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to enable floating label animations */
  floatingLabel?: boolean;
  /** Label animation style */
  labelAnimation?: 'smooth' | 'spring' | 'bounce';
  /** Icon to display before input */
  icon?: React.ReactNode;
  /** Icon to display after input */
  iconAfter?: React.ReactNode;
  /** Change handler */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  /** Focus handler */
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Blur handler */
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  /** Additional HTML attributes */
  style?: React.CSSProperties;
}

/**
 * Glass input component with floating labels and enhanced glass morphism styling
 */
export const GlassInput = forwardRef<HTMLInputElement, GlassInputProps>(
  ({ 
    type = 'text',
    placeholder,
    label,
    value,
    defaultValue,
    disabled = false,
    required = false,
    error,
    helperText,
    size = 'md',
    floatingLabel = true,
    labelAnimation = 'smooth',
    icon,
    iconAfter,
    variant = 'input',
    className = '',
    onChange,
    onFocus,
    onBlur,
    ...props 
  }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const [hasValue, setHasValue] = useState(Boolean(value || defaultValue));
    const [isAnimating, setIsAnimating] = useState(false);
    
    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-5 py-4 text-lg',
    };
    
    const labelSizeClasses = {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    };
    
    const animationClasses = {
      smooth: 'transition-all duration-300 ease-out',
      spring: 'transition-all duration-400 cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      bounce: 'transition-all duration-500 cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    };
    
    // Update hasValue when value prop changes
    useEffect(() => {
      setHasValue(Boolean(value));
    }, [value]);
    
    const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 400);
      onFocus?.(event);
    };
    
    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 400);
      onBlur?.(event);
    };
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(Boolean(event.target.value));
      onChange?.(event);
    };
    
    const isLabelFloating = floatingLabel && (isFocused || hasValue || Boolean(placeholder));
    const showError = Boolean(error);
    
    return (
      <div className="relative group">
        <Glass
          variant={variant}
          className={`
            relative flex items-center transition-all duration-300
            ${sizeClasses[size]} 
            ${isFocused ? 'glass-input-focused' : ''} 
            ${showError ? 'glass-input-error' : ''} 
            ${disabled ? 'glass-input-disabled' : ''} 
            ${className}
          `.trim()}
          enableHover={!disabled}
          style={{
            borderColor: showError ? 'rgba(239, 68, 68, 0.5)' : 
                        isFocused ? 'rgba(59, 130, 246, 0.5)' : undefined,
            boxShadow: showError ? '0 0 0 1px rgba(239, 68, 68, 0.3)' :
                      isFocused ? '0 0 0 1px rgba(59, 130, 246, 0.3), 0 8px 24px rgba(59, 130, 246, 0.2)' : undefined,
          }}
          {...props}
        >
          {icon && (
            <div className={`
              mr-3 transition-colors duration-200
              ${isFocused ? 'text-blue-400' : 'text-white/60'}
              ${showError ? 'text-red-400' : ''}
            `}>
              {icon}
            </div>
          )}
          
          <div className="relative flex-1">
            <input
              ref={ref}
              type={type}
              value={value}
              defaultValue={defaultValue}
              placeholder={label && floatingLabel ? '' : placeholder}
              disabled={disabled}
              required={required}
              className={`
                w-full bg-transparent border-none outline-none
                text-white placeholder-white/50
                transition-all duration-200
                ${label && floatingLabel ? 'pt-2' : ''}
                ${disabled ? 'cursor-not-allowed opacity-50' : ''}
              `.trim()}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
            
            {label && floatingLabel && (
              <label
                className={`
                  absolute left-0 pointer-events-none select-none
                  ${animationClasses[labelAnimation]}
                  ${labelSizeClasses[size]}
                  ${isLabelFloating 
                    ? `top-0 text-xs ${isFocused ? 'text-blue-400' : 'text-white/60'}` 
                    : 'top-1/2 -translate-y-1/2 text-white/70'
                  }
                  ${showError && isLabelFloating ? 'text-red-400' : ''}
                  ${isAnimating ? 'animate-pulse' : ''}
                `.trim()}
              >
                {label}
                {required && <span className="text-red-400 ml-1">*</span>}
              </label>
            )}
            
            {/* Floating label without animation for non-floating mode */}
            {label && !floatingLabel && (
              <label className={`
                block text-sm font-medium mb-2 
                ${showError ? 'text-red-400' : 'text-white/70'}
              `}>
                {label}
                {required && <span className="text-red-400 ml-1">*</span>}
              </label>
            )}
          </div>
          
          {iconAfter && (
            <div className={`
              ml-3 transition-colors duration-200
              ${isFocused ? 'text-blue-400' : 'text-white/60'}
              ${showError ? 'text-red-400' : ''}
            `}>
              {iconAfter}
            </div>
          )}
          
          {/* Focus indicator line */}
          <div className={`
            absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-emerald-500
            transition-all duration-300 ease-out
            ${isFocused ? 'w-full opacity-100' : 'w-0 opacity-0'}
          `} />
        </Glass>
        
        {/* Helper text and error messages */}
        {(error || helperText) && (
          <div className="mt-2 px-1">
            {error ? (
              <p className="text-red-400 text-sm flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            ) : (
              <p className="text-white/50 text-sm">{helperText}</p>
            )}
          </div>
        )}
      </div>
    );
  }
);

GlassInput.displayName = 'GlassInput';

export default GlassInput;