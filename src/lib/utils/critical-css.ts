// Critical CSS utilities for performance optimization

export const criticalStyles = `
  /* Critical above-the-fold styles */
  html, body {
    margin: 0;
    padding: 0;
    font-family: var(--font-inter), system-ui, -apple-system, sans-serif;
    line-height: 1.6;
    color: #1f2937;
    background-color: #ffffff;
  }

  /* Loading states */
  .loading-skeleton {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
  }

  @keyframes loading {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  /* Critical layout styles */
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  /* Hero section critical styles */
  .hero-section {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  /* Navigation critical styles */
  .nav-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 50;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(10px);
  }

  /* Performance-critical animations */
  .fade-in {
    opacity: 0;
    animation: fadeIn 0.6s ease-out forwards;
  }

  @keyframes fadeIn {
    to { opacity: 1; }
  }

  /* Reduce motion for accessibility */
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

// Function to inject critical CSS
export function injectCriticalCSS() {
  if (typeof document === 'undefined') return;

  const existingStyle = document.getElementById('critical-css');
  if (existingStyle) return;

  const style = document.createElement('style');
  style.id = 'critical-css';
  style.textContent = criticalStyles;
  document.head.insertBefore(style, document.head.firstChild);
}

// Function to preload non-critical CSS
export function preloadCSS(href: string) {
  if (typeof document === 'undefined') return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'style';
  link.href = href;
  link.onload = () => {
    link.rel = 'stylesheet';
  };
  document.head.appendChild(link);
}

// CSS optimization utilities
export const cssOptimization = {
  // Remove unused CSS classes (simplified version)
  removeUnusedCSS: (css: string, usedClasses: Set<string>) => {
    return css.replace(/\.[a-zA-Z][\w-]*[^{]*{[^}]*}/g, (match) => {
      const className = match.match(/\.([a-zA-Z][\w-]*)/)?.[1];
      return className && usedClasses.has(className) ? match : '';
    });
  },

  // Minify CSS
  minifyCSS: (css: string) => {
    return css
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove comments
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/;\s*}/g, '}') // Remove last semicolon in blocks
      .replace(/\s*{\s*/g, '{') // Remove spaces around braces
      .replace(/}\s*/g, '}') // Remove spaces after closing braces
      .replace(/,\s*/g, ',') // Remove spaces after commas
      .replace(/:\s+/g, ':') // Remove spaces after colons
      .replace(/;\s+/g, ';') // Remove spaces after semicolons
      .trim();
  },

  // Extract critical CSS based on viewport
  extractCriticalCSS: (css: string, criticalSelectors: string[]) => {
    const criticalRules: string[] = [];
    
    criticalSelectors.forEach(selector => {
      const regex = new RegExp(`${selector.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^{]*{[^}]*}`, 'g');
      const matches = css.match(regex);
      if (matches) {
        criticalRules.push(...matches);
      }
    });

    return criticalRules.join('\n');
  },
};

// Font optimization
export const fontOptimization = {
  // Preload critical fonts
  preloadFonts: () => {
    if (typeof document === 'undefined') return;

    const fonts = [
      { family: 'Inter', weight: '400', display: 'swap' },
      { family: 'Inter', weight: '600', display: 'swap' },
      { family: 'JetBrains Mono', weight: '400', display: 'swap' },
    ];

    fonts.forEach(font => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      link.href = `https://fonts.googleapis.com/css2?family=${font.family.replace(' ', '+')}:wght@${font.weight}&display=${font.display}`;
      document.head.appendChild(link);
    });
  },

  // Font display optimization
  optimizeFontDisplay: () => {
    if (typeof document === 'undefined') return;

    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'Inter';
        font-display: swap;
      }
      @font-face {
        font-family: 'JetBrains Mono';
        font-display: swap;
      }
    `;
    document.head.appendChild(style);
  },
};