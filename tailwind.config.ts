import type { Config } from 'tailwindcss';
import { colors, typography, spacing, shadows, borderRadius, easing, duration, glass } from './src/design/tokens';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
        accent: colors.accent,
        semantic: colors.semantic,
        text: colors.text,
        background: colors.background,
        border: colors.border,
      },
      fontFamily: typography.fontFamily,
      fontSize: typography.fontSize,
      fontWeight: typography.fontWeight,
      letterSpacing: typography.letterSpacing,
      spacing,
      boxShadow: shadows,
      borderRadius,
      
      // Custom animations
      animation: {
        // Entrance animations
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'fade-in-down': 'fadeInDown 0.6s ease-out forwards',
        'fade-in-left': 'fadeInLeft 0.6s ease-out forwards',
        'fade-in-right': 'fadeInRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'slide-in-up': 'slideInUp 0.6s ease-out forwards',
        'slide-in-down': 'slideInDown 0.6s ease-out forwards',
        
        // Text animations
        'text-reveal': 'textReveal 1.2s ease-out forwards',
        'text-shimmer': 'textShimmer 2s ease-in-out infinite',
        'typing': 'typing 3.5s steps(40, end), blink-caret 0.75s step-end infinite',
        
        // Interactive animations
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'bounce-subtle': 'bounceSubtle 2s ease-in-out infinite',
        'rotate-slow': 'rotateSlow 20s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        
        // Loading animations
        'spin-slow': 'spin 3s linear infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'skeleton': 'skeleton 1.5s ease-in-out infinite',
        
        // Scroll-triggered animations
        'reveal-up': 'revealUp 0.8s ease-out forwards',
        'reveal-down': 'revealDown 0.8s ease-out forwards',
        'reveal-left': 'revealLeft 0.8s ease-out forwards',
        'reveal-right': 'revealRight 0.8s ease-out forwards',
        
        // Stagger animations (for use with delays)
        'stagger-fade-in': 'fadeIn 0.6s ease-out forwards',
        'stagger-slide-up': 'slideInUp 0.6s ease-out forwards',
      },
      
      keyframes: {
        // Basic fade animations
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        
        // Scale animations
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        
        // Slide animations
        slideInUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        
        // Text animations
        textReveal: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)',
            filter: 'blur(10px)',
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)',
            filter: 'blur(0px)',
          },
        },
        textShimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        typing: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        'blink-caret': {
          '0%, 50%': { borderColor: 'transparent' },
          '51%, 100%': { borderColor: 'currentColor' },
        },
        
        // Interactive animations
        pulseGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)',
            transform: 'scale(1)',
          },
          '50%': { 
            boxShadow: '0 0 30px rgba(59, 130, 246, 0.6)',
            transform: 'scale(1.02)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        
        // Loading animations
        skeleton: {
          '0%': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
          '50%': { backgroundColor: 'rgba(255, 255, 255, 0.2)' },
          '100%': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
        },
        
        // Reveal animations for scroll triggers
        revealUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(50px)',
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        revealDown: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(-50px)',
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)',
          },
        },
        revealLeft: {
          '0%': { 
            opacity: '0',
            transform: 'translateX(-50px)',
          },
          '100%': { 
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        revealRight: {
          '0%': { 
            opacity: '0',
            transform: 'translateX(50px)',
          },
          '100%': { 
            opacity: '1',
            transform: 'translateX(0)',
          },
        },
        
        // Glass morphism entrance animation
        glassEntrance: {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px) scale(0.95)',
            filter: 'blur(10px)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0) scale(1)',
            filter: 'blur(0px)',
          },
        },
      },
      
      // Custom timing functions
      transitionTimingFunction: easing,
      transitionDuration: duration,
      
      // Animation delays for staggered effects
      animationDelay: {
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
        '1000': '1000ms',
      },

      // Responsive breakpoints with performance considerations
      screens: {
        'xs': '480px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
        // Touch device queries
        'touch': { 'raw': '(hover: none) and (pointer: coarse)' },
        'no-touch': { 'raw': '(hover: hover) and (pointer: fine)' },
        // High refresh rate displays
        'high-refresh': { 'raw': '(min-resolution: 120dpi)' },
        // Reduced motion preference
        'reduce-motion': { 'raw': '(prefers-reduced-motion: reduce)' },
        // High contrast preference
        'high-contrast': { 'raw': '(prefers-contrast: high)' },
      },
      
      // Backdrop blur utilities (enhanced for glass morphism)
      backdropBlur: {
        xs: glass.blur.xs,
        sm: glass.blur.sm,
        md: glass.blur.md,
        lg: glass.blur.lg,
        xl: glass.blur.xl,
        '2xl': glass.blur['2xl'],
        '3xl': glass.blur['3xl'],
      },
      
      // Glass morphism utilities
      glassOpacity: glass.opacity,
      glassBorderOpacity: glass.border,
      glassRadius: glass.radius,
    },
  },
  plugins: [
    // Custom plugin for glass morphism and animation utilities
    function({ addUtilities, addComponents }: { 
      addUtilities: (utilities: Record<string, Record<string, string>>) => void; 
      addComponents: (components: Record<string, Record<string, string>>) => void;
      theme: (path: string) => unknown;
    }) {
      // Glass morphism utility classes
      const glassUtilities = {
        // CSS Custom Properties for glass configuration
        '.glass-vars': {
          '--glass-opacity': glass.opacity.medium.toString(),
          '--glass-border-opacity': glass.border.medium.toString(),
          '--glass-blur': glass.blur.lg,
          '--glass-saturation': '180%',
          '--glass-radius': glass.radius.lg,
        },
        
        // Base glass morphism effect
        '.glass': {
          background: glass.colors.default.background,
          backdropFilter: `blur(var(--glass-blur, ${glass.blur.lg})) saturate(var(--glass-saturation, 180%))`,
          WebkitBackdropFilter: `blur(var(--glass-blur, ${glass.blur.lg})) saturate(var(--glass-saturation, 180%))`,
          border: `1px solid ${glass.colors.default.border}`,
          borderRadius: `var(--glass-radius, ${glass.radius.lg})`,
          boxShadow: glass.shadows.medium,
          position: 'relative',
          overflow: 'hidden',
        },
        
        // Glass variants
        '.glass-subtle': {
          '--glass-opacity': glass.opacity.subtle.toString(),
          '--glass-border-opacity': glass.border.subtle.toString(),
          '--glass-blur': glass.blur.sm,
          boxShadow: glass.shadows.subtle,
        },
        
        '.glass-light': {
          '--glass-opacity': glass.opacity.light.toString(),
          '--glass-border-opacity': glass.border.light.toString(),
          '--glass-blur': glass.blur.md,
          boxShadow: glass.shadows.light,
        },
        
        '.glass-medium': {
          '--glass-opacity': glass.opacity.medium.toString(),
          '--glass-border-opacity': glass.border.medium.toString(),
          '--glass-blur': glass.blur.lg,
          boxShadow: glass.shadows.medium,
        },
        
        '.glass-heavy': {
          '--glass-opacity': glass.opacity.heavy.toString(),
          '--glass-border-opacity': glass.border.heavy.toString(),
          '--glass-blur': glass.blur.xl,
          boxShadow: glass.shadows.heavy,
        },
        
        // Glass color themes
        '.glass-dark': {
          background: glass.colors.dark.background,
          border: `1px solid ${glass.colors.dark.border}`,
        },
        
        '.glass-blue': {
          background: glass.colors.blue.background,
          border: `1px solid ${glass.colors.blue.border}`,
          boxShadow: glass.shadows.glow,
        },
        
        '.glass-emerald': {
          background: glass.colors.emerald.background,
          border: `1px solid ${glass.colors.emerald.border}`,
          boxShadow: glass.shadows['glow-emerald'],
        },
        
        '.glass-purple': {
          background: glass.colors.purple.background,
          border: `1px solid ${glass.colors.purple.border}`,
          boxShadow: glass.shadows['glow-purple'],
        },
        
        '.glass-amber': {
          background: glass.colors.amber.background,
          border: `1px solid ${glass.colors.amber.border}`,
        },
        
        '.glass-rose': {
          background: glass.colors.rose.background,
          border: `1px solid ${glass.colors.rose.border}`,
        },
        
        // Glass hover effects
        '.glass-hover': {
          transition: `all ${glass.animations.hover.duration} ${glass.animations.hover.easing}`,
          cursor: 'pointer',
        },
        
        '.glass-hover:hover': {
          transform: `scale(${glass.animations.hover.scale}) translateZ(0)`,
          '--glass-opacity': (glass.opacity.medium + glass.animations.hover.opacityIncrease).toString(),
          '--glass-blur': `calc(var(--glass-blur) + ${glass.animations.hover.blurIncrease})`,
          willChange: 'transform, backdrop-filter',
        },
        
        // Glass morphing animations
        '.glass-morph': {
          transition: `all ${glass.animations.morphing.duration} ${glass.animations.morphing.easing}`,
        },
        
        // Glass entrance animations
        '.glass-entrance': {
          opacity: '0',
          transform: 'translateY(20px) scale(0.95)',
          filter: 'blur(10px)',
          animation: `glassEntrance ${glass.animations.entrance.duration} ${glass.animations.entrance.easing} forwards`,
        },
        
        // Hardware acceleration for glass elements
        '.glass-accelerated': {
          transform: 'translateZ(0)',
          willChange: 'transform, backdrop-filter, opacity',
          backfaceVisibility: 'hidden',
          perspective: '1000px',
        },
        
        // Fallback styles for unsupported browsers
        '.glass-fallback': {
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'none',
          WebkitBackdropFilter: 'none',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        },
        
        // Reduced motion support
        '.glass-no-motion': {
          animation: 'none',
          transition: 'none',
        },
        
        '.glass-no-motion:hover': {
          transform: 'none',
        },
        
        // Performance optimized glass for low-end devices
        '.glass-reduced': {
          '--glass-blur': glass.blur.sm,
          backdropFilter: `blur(${glass.blur.sm})`,
          WebkitBackdropFilter: `blur(${glass.blur.sm})`,
          boxShadow: glass.shadows.subtle,
        },

        // Hardware acceleration utilities
        '.hw-accelerated': {
          willChange: 'transform, backdrop-filter, opacity',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          transformStyle: 'preserve-3d',
        },

        '.hw-minimal': {
          willChange: 'transform',
          transform: 'translateZ(0)',
        },

        '.hw-medium': {
          willChange: 'transform, opacity',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
        },

        '.hw-full': {
          willChange: 'transform, backdrop-filter, background, box-shadow',
          transform: 'translate3d(0, 0, 0)',
          backfaceVisibility: 'hidden',
          transformStyle: 'preserve-3d',
          perspective: '1000px',
        },

        // Performance tier classes
        '.perf-low': {
          backdropFilter: `blur(8px) saturate(120%)`,
          WebkitBackdropFilter: `blur(8px) saturate(120%)`,
          transition: 'all 150ms ease-out',
        },

        '.perf-medium': {
          backdropFilter: `blur(16px) saturate(150%)`,
          WebkitBackdropFilter: `blur(16px) saturate(150%)`,
          transition: 'all 250ms ease-out',
        },

        '.perf-high': {
          backdropFilter: `blur(24px) saturate(180%)`,
          WebkitBackdropFilter: `blur(24px) saturate(180%)`,
          transition: 'all 350ms cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        },

        // Touch optimization utilities
        '.touch-optimized': {
          touchAction: 'manipulation',
          userSelect: 'none',
          WebkitTapHighlightColor: 'transparent',
          minHeight: '44px',
          minWidth: '44px',
        },

        '.touch-feedback': {
          transition: 'transform 150ms ease-out',
        },

        '.touch-feedback:active': {
          transform: 'scale(0.95) translateZ(0)',
        },

        // Responsive glass utilities
        '.glass-mobile': {
          '--glass-blur': glass.blur.sm,
          '--glass-opacity': glass.opacity.light.toString(),
          padding: '16px',
          borderRadius: glass.radius.sm,
        },

        '.glass-tablet': {
          '--glass-blur': glass.blur.md,
          '--glass-opacity': glass.opacity.medium.toString(),
          padding: '24px',
          borderRadius: glass.radius.md,
        },

        '.glass-desktop': {
          '--glass-blur': glass.blur.lg,
          '--glass-opacity': glass.opacity.medium.toString(),
          padding: '32px',
          borderRadius: glass.radius.lg,
        },

        '.glass-wide': {
          '--glass-blur': glass.blur.xl,
          '--glass-opacity': glass.opacity.heavy.toString(),
          padding: '40px',
          borderRadius: glass.radius.xl,
        },
      };
      
      // Glass component classes
      const glassComponents = {
        // Glass panel component
        '.glass-panel': {
          padding: '1.5rem',
          borderRadius: glass.radius.lg,
        },
        
        // Glass card component
        '.glass-card': {
          padding: '1.25rem',
          borderRadius: glass.radius.md,
          background: 'rgba(255, 255, 255, 0.06)',
        },
        
        // Glass button component
        '.glass-button': {
          padding: '0.75rem 1.5rem',
          borderRadius: glass.radius.pill,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: '500',
          textAlign: 'center',
          cursor: 'pointer',
          userSelect: 'none',
        },
        
        // Glass navigation component
        '.glass-nav': {
          padding: '0.75rem 1.5rem',
          borderRadius: glass.radius.pill,
          backdropFilter: `blur(${glass.blur['2xl']}) saturate(180%)`,
          WebkitBackdropFilter: `blur(${glass.blur['2xl']}) saturate(180%)`,
        },
        
        // Glass input component
        '.glass-input': {
          padding: '0.75rem 1rem',
          borderRadius: glass.radius.md,
          background: 'rgba(255, 255, 255, 0.05)',
          color: 'white',
        },
      };
      
      // Other utility classes
      const otherUtilities = {
        // Stagger delay utilities
        '.stagger-1': { animationDelay: '100ms' },
        '.stagger-2': { animationDelay: '200ms' },
        '.stagger-3': { animationDelay: '300ms' },
        '.stagger-4': { animationDelay: '400ms' },
        '.stagger-5': { animationDelay: '500ms' },
        
        // Text shimmer effect
        '.text-shimmer': {
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          backgroundSize: '200% 100%',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          animation: 'textShimmer 2s ease-in-out infinite',
        },
        
        // Magnetic hover effect
        '.magnetic': {
          transition: 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        },
        
        // Gradient text
        '.gradient-text': {
          background: 'linear-gradient(135deg, #3b82f6, #10b981)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        },
        
        // Perspective utilities for 3D effects
        '.perspective-1000': { perspective: '1000px' },
        '.perspective-2000': { perspective: '2000px' },
        '.preserve-3d': { transformStyle: 'preserve-3d' },
        '.backface-hidden': { backfaceVisibility: 'hidden' },
      };
      
      addUtilities({ ...glassUtilities, ...otherUtilities });
      addComponents(glassComponents);
    },
  ],
};

export default config;