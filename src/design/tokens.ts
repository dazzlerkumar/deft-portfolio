/**
 * Design Tokens
 * Central configuration for colors, typography, spacing, and other design values
 */

export const colors = {
  // Primary palette - maintaining current dark aesthetic
  primary: {
    black: '#0a0a0a',
    zinc: {
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
      950: '#09090b',
    },
  },
  
  // Accent colors for highlights and interactions
  accent: {
    blue: {
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6', // Primary blue
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    emerald: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981', // Primary emerald
      600: '#059669',
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
    },
  },
  
  // Semantic colors
  semantic: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
  
  // Text colors
  text: {
    primary: '#ededed',
    secondary: '#a1a1aa',
    muted: '#71717a',
    inverse: '#18181b',
  },
  
  // Background colors
  background: {
    primary: '#0a0a0a',
    secondary: '#18181b',
    tertiary: '#27272a',
    card: 'rgba(39, 39, 42, 0.5)',
    overlay: 'rgba(0, 0, 0, 0.8)',
  },
  
  // Border colors
  border: {
    primary: '#3f3f46',
    secondary: '#27272a',
    accent: '#3b82f6',
  },
} as const;

export const typography = {
  fontFamily: {
    display: ['var(--font-display)', 'system-ui', 'sans-serif'],
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['JetBrains Mono', 'Consolas', 'monospace'],
  },
  
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }],
    '7xl': ['4.5rem', { lineHeight: '1' }],
    '8xl': ['6rem', { lineHeight: '1' }],
    '9xl': ['8rem', { lineHeight: '1' }],
  },
  
  fontWeight: {
    thin: '100',
    extralight: '200',
    light: '300',
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  
  letterSpacing: {
    tighter: '-0.05em',
    tight: '-0.025em',
    normal: '0em',
    wide: '0.025em',
    wider: '0.05em',
    widest: '0.1em',
  },
} as const;

export const spacing = {
  // 8px grid system with fluid scaling
  px: '1px',
  0: '0px',
  0.5: '0.125rem', // 2px
  1: '0.25rem',    // 4px
  1.5: '0.375rem', // 6px
  2: '0.5rem',     // 8px
  2.5: '0.625rem', // 10px
  3: '0.75rem',    // 12px
  3.5: '0.875rem', // 14px
  4: '1rem',       // 16px
  5: '1.25rem',    // 20px
  6: '1.5rem',     // 24px
  7: '1.75rem',    // 28px
  8: '2rem',       // 32px
  9: '2.25rem',    // 36px
  10: '2.5rem',    // 40px
  11: '2.75rem',   // 44px
  12: '3rem',      // 48px
  14: '3.5rem',    // 56px
  16: '4rem',      // 64px
  20: '5rem',      // 80px
  24: '6rem',      // 96px
  28: '7rem',      // 112px
  32: '8rem',      // 128px
  36: '9rem',      // 144px
  40: '10rem',     // 160px
  44: '11rem',     // 176px
  48: '12rem',     // 192px
  52: '13rem',     // 208px
  56: '14rem',     // 224px
  60: '15rem',     // 240px
  64: '16rem',     // 256px
  72: '18rem',     // 288px
  80: '20rem',     // 320px
  96: '24rem',     // 384px
} as const;

export const breakpoints = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  glow: '0 0 20px rgb(59 130 246 / 0.5)',
  'glow-emerald': '0 0 20px rgb(16 185 129 / 0.5)',
} as const;

export const borderRadius = {
  none: '0px',
  sm: '0.125rem',
  base: '0.25rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '0.75rem',
  '2xl': '1rem',
  '3xl': '1.5rem',
  full: '9999px',
} as const;

export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  docked: 10,
  dropdown: 1000,
  sticky: 1100,
  banner: 1200,
  overlay: 1300,
  modal: 1400,
  popover: 1500,
  skipLink: 1600,
  toast: 1700,
  tooltip: 1800,
} as const;

// Animation timing functions
export const easing = {
  linear: 'linear',
  in: 'cubic-bezier(0.4, 0, 1, 1)',
  out: 'cubic-bezier(0, 0, 0.2, 1)',
  'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
  
  // Custom easing curves for natural motion
  'ease-spring': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  'ease-bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  'ease-smooth': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
} as const;

// Animation durations
export const duration = {
  75: '75ms',
  100: '100ms',
  150: '150ms',
  200: '200ms',
  300: '300ms',
  500: '500ms',
  700: '700ms',
  1000: '1000ms',
} as const;

// Glass Morphism Design Tokens
export const glass = {
  // Glass opacity levels
  opacity: {
    subtle: 0.05,
    light: 0.08,
    medium: 0.1,
    heavy: 0.15,
    accent: 0.12,
  },
  
  // Backdrop blur intensities
  blur: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '20px',
    xl: '24px',
    '2xl': '32px',
    '3xl': '40px',
  },
  
  // Border opacities for glass edges
  border: {
    subtle: 0.1,
    light: 0.15,
    medium: 0.2,
    heavy: 0.3,
  },
  
  // Glass color variants
  colors: {
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
    },
    emerald: {
      background: 'rgba(16, 185, 129, var(--glass-opacity))',
      border: 'rgba(16, 185, 129, var(--glass-border-opacity))',
    },
    purple: {
      background: 'rgba(147, 51, 234, var(--glass-opacity))',
      border: 'rgba(147, 51, 234, var(--glass-border-opacity))',
    },
    amber: {
      background: 'rgba(245, 158, 11, var(--glass-opacity))',
      border: 'rgba(245, 158, 11, var(--glass-border-opacity))',
    },
    rose: {
      background: 'rgba(244, 63, 94, var(--glass-opacity))',
      border: 'rgba(244, 63, 94, var(--glass-border-opacity))',
    },
  },
  
  // Glass shadows with depth
  shadows: {
    subtle: '0 4px 16px rgba(0, 0, 0, 0.05)',
    light: '0 8px 24px rgba(0, 0, 0, 0.08)',
    medium: '0 12px 32px rgba(0, 0, 0, 0.1)',
    heavy: '0 16px 40px rgba(0, 0, 0, 0.15)',
    glow: '0 0 32px rgba(59, 130, 246, 0.3)',
    'glow-emerald': '0 0 32px rgba(16, 185, 129, 0.3)',
    'glow-purple': '0 0 32px rgba(147, 51, 234, 0.3)',
  },
  
  // Glass animation presets
  animations: {
    hover: {
      duration: '300ms',
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      scale: 1.02,
      opacityIncrease: 0.03,
      blurIncrease: '5px',
    },
    entrance: {
      duration: '600ms',
      easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      delay: '0ms',
    },
    morphing: {
      duration: '400ms',
      easing: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
  },
  
  // Glass border radius presets
  radius: {
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    '2xl': '24px',
    pill: '9999px',
  },
} as const;