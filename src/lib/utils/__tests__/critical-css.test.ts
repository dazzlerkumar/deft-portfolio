import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { 
  injectCriticalCSS, 
  preloadCSS, 
  cssOptimization, 
  fontOptimization,
  criticalStyles 
} from '../critical-css';

describe('Critical CSS utilities', () => {
  beforeEach(() => {
    // Mock document
    global.document = {
      getElementById: vi.fn(),
      createElement: vi.fn(() => ({
        id: '',
        textContent: '',
        rel: '',
        as: '',
        href: '',
        onload: null,
        crossOrigin: '',
        type: '',
      })),
      head: {
        insertBefore: vi.fn(),
        appendChild: vi.fn(),
        firstChild: null,
      },
    } as any;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('injectCriticalCSS', () => {
    it('should inject critical CSS when not already present', () => {
      (document.getElementById as any).mockReturnValue(null);
      const mockStyle = { id: '', textContent: '' };
      (document.createElement as any).mockReturnValue(mockStyle);

      injectCriticalCSS();

      expect(document.createElement).toHaveBeenCalledWith('style');
      expect(mockStyle.id).toBe('critical-css');
      expect(mockStyle.textContent).toBe(criticalStyles);
      expect(document.head.insertBefore).toHaveBeenCalledWith(mockStyle, null);
    });

    it('should not inject critical CSS when already present', () => {
      (document.getElementById as any).mockReturnValue({ id: 'critical-css' });

      injectCriticalCSS();

      expect(document.createElement).not.toHaveBeenCalled();
    });

    it('should handle missing document gracefully', () => {
      const originalDocument = global.document;
      delete (global as any).document;

      expect(() => injectCriticalCSS()).not.toThrow();

      global.document = originalDocument;
    });
  });

  describe('preloadCSS', () => {
    it('should preload CSS file', () => {
      const mockLink = { 
        rel: '', 
        as: '', 
        href: '', 
        onload: null as (() => void) | null 
      };
      (document.createElement as any).mockReturnValue(mockLink);

      preloadCSS('/styles.css');

      expect(document.createElement).toHaveBeenCalledWith('link');
      expect(mockLink.rel).toBe('preload');
      expect(mockLink.as).toBe('style');
      expect(mockLink.href).toBe('/styles.css');
      expect(document.head.appendChild).toHaveBeenCalledWith(mockLink);
    });

    it('should convert preload to stylesheet on load', () => {
      const mockLink = { 
        rel: '', 
        as: '', 
        href: '', 
        onload: null as (() => void) | null 
      };
      (document.createElement as any).mockReturnValue(mockLink);

      preloadCSS('/styles.css');

      // Simulate onload
      if (mockLink.onload) {
        mockLink.onload();
      }

      expect(mockLink.rel).toBe('stylesheet');
    });
  });

  describe('cssOptimization', () => {
    describe('removeUnusedCSS', () => {
      it('should remove unused CSS classes', () => {
        const css = `
          .used-class { color: red; }
          .unused-class { color: blue; }
          .another-used { font-size: 16px; }
        `;
        const usedClasses = new Set(['used-class', 'another-used']);

        const result = cssOptimization.removeUnusedCSS(css, usedClasses);

        expect(result).toContain('.used-class');
        expect(result).toContain('.another-used');
        expect(result).not.toContain('.unused-class');
      });
    });

    describe('minifyCSS', () => {
      it('should minify CSS by removing comments and whitespace', () => {
        const css = `
          /* This is a comment */
          .test-class {
            color: red;
            font-size: 16px;
          }
        `;

        const result = cssOptimization.minifyCSS(css);

        expect(result).not.toContain('/* This is a comment */');
        expect(result).not.toContain('\n');
        expect(result).toContain('.test-class{color:red;font-size:16px}');
      });

      it('should remove last semicolon in blocks', () => {
        const css = '.test { color: red; }';
        const result = cssOptimization.minifyCSS(css);
        expect(result).toBe('.test{color:red}');
      });
    });

    describe('extractCriticalCSS', () => {
      it('should extract critical CSS rules', () => {
        const css = `
          .hero { color: red; }
          .sidebar { color: blue; }
          .footer { color: green; }
        `;
        const criticalSelectors = ['.hero', '.sidebar'];

        const result = cssOptimization.extractCriticalCSS(css, criticalSelectors);

        expect(result).toContain('.hero { color: red; }');
        expect(result).toContain('.sidebar { color: blue; }');
        expect(result).not.toContain('.footer { color: green; }');
      });
    });
  });

  describe('fontOptimization', () => {
    describe('preloadFonts', () => {
      it('should preload critical fonts', () => {
        const mockLinks: any[] = [];
        (document.createElement as any).mockImplementation(() => {
          const link = { 
            rel: '', 
            as: '', 
            type: '', 
            crossOrigin: '', 
            href: '' 
          };
          mockLinks.push(link);
          return link;
        });

        fontOptimization.preloadFonts();

        expect(mockLinks.length).toBeGreaterThan(0);
        mockLinks.forEach(link => {
          expect(link.rel).toBe('preload');
          expect(link.as).toBe('font');
          expect(link.type).toBe('font/woff2');
          expect(link.crossOrigin).toBe('anonymous');
        });
      });
    });

    describe('optimizeFontDisplay', () => {
      it('should add font-display optimization styles', () => {
        const mockStyle = { textContent: '' };
        (document.createElement as any).mockReturnValue(mockStyle);

        fontOptimization.optimizeFontDisplay();

        expect(document.createElement).toHaveBeenCalledWith('style');
        expect(mockStyle.textContent).toContain('font-display: swap');
        expect(document.head.appendChild).toHaveBeenCalledWith(mockStyle);
      });
    });
  });

  describe('criticalStyles', () => {
    it('should contain essential CSS rules', () => {
      expect(criticalStyles).toContain('html, body');
      expect(criticalStyles).toContain('.loading-skeleton');
      expect(criticalStyles).toContain('.hero-section');
      expect(criticalStyles).toContain('@keyframes');
      expect(criticalStyles).toContain('@media (prefers-reduced-motion: reduce)');
    });

    it('should include accessibility considerations', () => {
      expect(criticalStyles).toContain('prefers-reduced-motion');
      expect(criticalStyles).toContain('animation-duration: 0.01ms');
    });
  });
});