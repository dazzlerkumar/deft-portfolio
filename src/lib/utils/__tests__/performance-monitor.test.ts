import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { performanceMonitor, usePerformanceMonitor, checkPerformanceBudget } from '../performance-monitor';

// Mock performance API
const mockPerformance = {
  timeOrigin: Date.now(),
  timing: {
    navigationStart: Date.now(),
    responseStart: Date.now() + 100,
  },
  getEntriesByType: vi.fn(),
  memory: {
    usedJSHeapSize: 10485760, // 10MB
    totalJSHeapSize: 20971520, // 20MB
    jsHeapSizeLimit: 104857600, // 100MB
  },
};

// Mock PerformanceObserver
class MockPerformanceObserver {
  private callback: (list: any) => void;
  
  constructor(callback: (list: any) => void) {
    this.callback = callback;
  }

  observe() {
    // Simulate immediate callback with mock data
    setTimeout(() => {
      this.callback({
        getEntries: () => [
          {
            name: 'largest-contentful-paint',
            startTime: 1500,
          },
          {
            name: 'first-contentful-paint',
            startTime: 800,
          },
        ],
      });
    }, 0);
  }

  disconnect() {}
}

describe('PerformanceMonitor', () => {
  beforeEach(() => {
    // Mock global performance
    global.performance = mockPerformance as any;
    global.PerformanceObserver = MockPerformanceObserver as any;
    
    // Mock window.gtag for analytics
    global.window = {
      gtag: vi.fn(),
    } as any;
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Core Web Vitals tracking', () => {
    it('should track LCP metric', async () => {
      // Wait for observer to trigger
      await new Promise(resolve => setTimeout(resolve, 10));
      
      const metrics = performanceMonitor.getMetrics();
      expect(metrics.LCP).toBeDefined();
      expect(metrics.LCP?.name).toBe('LCP');
      expect(typeof metrics.LCP?.value).toBe('number');
      expect(['good', 'needs-improvement', 'poor']).toContain(metrics.LCP?.rating);
    });

    it('should track FCP metric', async () => {
      await new Promise(resolve => setTimeout(resolve, 10));
      
      const metrics = performanceMonitor.getMetrics();
      expect(metrics.FCP).toBeDefined();
      expect(metrics.FCP?.name).toBe('FCP');
    });

    it('should track TTFB metric', () => {
      const metrics = performanceMonitor.getMetrics();
      expect(metrics.TTFB).toBeDefined();
      expect(metrics.TTFB?.name).toBe('TTFB');
      expect(metrics.TTFB?.value).toBe(100); // responseStart - navigationStart
    });
  });

  describe('Performance scoring', () => {
    it('should calculate performance score', () => {
      const score = performanceMonitor.getPerformanceScore();
      expect(typeof score).toBe('number');
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
    });
  });

  describe('Resource timing analysis', () => {
    it('should analyze resource timing', () => {
      const mockResources = [
        {
          name: 'https://example.com/script.js',
          startTime: 100,
          responseEnd: 200,
          transferSize: 50000,
        },
        {
          name: 'https://example.com/style.css',
          startTime: 150,
          responseEnd: 250,
          transferSize: 20000,
        },
        {
          name: 'https://example.com/image.jpg',
          startTime: 200,
          responseEnd: 1300, // Slow resource
          transferSize: 100000,
        },
      ];

      mockPerformance.getEntriesByType.mockReturnValue(mockResources);

      const analysis = performanceMonitor.analyzeResourceTiming();
      
      expect(analysis.totalResources).toBe(3);
      expect(analysis.totalSize).toBe(170000);
      expect(analysis.slowResources).toHaveLength(1);
      expect(analysis.slowResources[0].name).toBe('https://example.com/image.jpg');
      expect(analysis.resourceTypes.javascript).toBe(1);
      expect(analysis.resourceTypes.stylesheet).toBe(1);
      expect(analysis.resourceTypes.image).toBe(1);
    });
  });

  describe('Memory usage monitoring', () => {
    it('should get memory usage', () => {
      const memory = performanceMonitor.getMemoryUsage();
      
      expect(memory).toBeDefined();
      expect(memory?.used).toBe(10); // 10MB
      expect(memory?.total).toBe(20); // 20MB
      expect(memory?.limit).toBe(100); // 100MB
    });
  });
});

describe('usePerformanceMonitor hook', () => {
  it('should return performance monitor methods', () => {
    const monitor = usePerformanceMonitor();
    
    expect(typeof monitor.getMetrics).toBe('function');
    expect(typeof monitor.getScore).toBe('function');
    expect(typeof monitor.analyzeResources).toBe('function');
    expect(typeof monitor.getMemoryUsage).toBe('function');
  });
});

describe('checkPerformanceBudget', () => {
  it('should check performance budget violations', () => {
    const result = checkPerformanceBudget();
    
    expect(typeof result.passed).toBe('boolean');
    expect(Array.isArray(result.violations)).toBe(true);
    expect(typeof result.score).toBe('number');
  });

  it('should identify budget violations', () => {
    // Mock a slow LCP metric
    const originalGetMetrics = performanceMonitor.getMetrics;
    performanceMonitor.getMetrics = vi.fn().mockReturnValue({
      LCP: { name: 'LCP', value: 5000, rating: 'poor', timestamp: Date.now() },
    });

    const result = checkPerformanceBudget();
    
    expect(result.passed).toBe(false);
    expect(result.violations).toContain('LCP: 5000.00 > 2500');

    // Restore original method
    performanceMonitor.getMetrics = originalGetMetrics;
  });
});