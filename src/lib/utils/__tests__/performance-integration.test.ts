import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { performanceMonitor } from '../performance-monitor';
import { preloader } from '../preloader';
import { injectCriticalCSS, fontOptimization } from '../critical-css';
import { benchmark } from '../benchmark';

// Mock performance APIs
const mockPerformance = {
  now: vi.fn(() => Date.now()),
  timeOrigin: Date.now(),
  timing: {
    navigationStart: Date.now(),
    responseStart: Date.now() + 100,
  },
  getEntriesByType: vi.fn(() => []),
  memory: {
    usedJSHeapSize: 10485760,
    totalJSHeapSize: 20971520,
    jsHeapSizeLimit: 104857600,
  },
};

describe('Performance Integration', () => {
  beforeEach(() => {
    global.performance = mockPerformance as any;
    global.PerformanceObserver = vi.fn() as any;
    global.Image = class {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      src = '';
      constructor() {
        setTimeout(() => {
          if (this.onload) this.onload();
        }, 10);
      }
    } as any;
    
    global.document = {
      getElementById: vi.fn(() => null),
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

    global.requestIdleCallback = vi.fn((callback) => {
      setTimeout(callback, 0);
      return 1;
    });

    // Clear caches
    preloader.clearCache();
    benchmark.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize performance optimizations', async () => {
    // Test critical CSS injection
    injectCriticalCSS();
    expect(document.createElement).toHaveBeenCalledWith('style');

    // Test font optimization
    fontOptimization.preloadFonts();
    expect(document.createElement).toHaveBeenCalledWith('link');

    // Test preloader initialization
    await preloader.preloadCriticalResources();
    const status = preloader.getPreloadStatus();
    expect(status.cachedImages).toBeGreaterThan(0);
  });

  it('should handle performance monitoring lifecycle', () => {
    // Get initial metrics
    const initialMetrics = performanceMonitor.getMetrics();
    expect(typeof initialMetrics).toBe('object');

    // Get performance score
    const score = performanceMonitor.getPerformanceScore();
    expect(typeof score).toBe('number');
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);

    // Analyze resources
    const analysis = performanceMonitor.analyzeResourceTiming();
    expect(typeof analysis).toBe('object');
    expect(typeof analysis.totalResources).toBe('number');
  });

  it('should benchmark performance operations', async () => {
    mockPerformance.now
      .mockReturnValueOnce(100)
      .mockReturnValueOnce(150);

    // Benchmark CSS injection
    const result = await benchmark.measure('CSS Injection Test', () => {
      injectCriticalCSS();
    });

    expect(result.name).toBe('CSS Injection Test');
    expect(result.duration).toBe(50);
    expect(result.averageTime).toBe(50);
  });

  it('should handle smart preloading workflow', async () => {
    // Test smart preloading at different progress levels
    await preloader.smartPreload(1, 0.3); // Should not preload next
    let status = preloader.getPreloadStatus();
    expect(status.preloadedChapters).toHaveLength(0);

    await preloader.smartPreload(1, 0.6); // Should preload chapter 2
    status = preloader.getPreloadStatus();
    expect(status.preloadedChapters).toContain(2);

    await preloader.smartPreload(1, 0.9); // Should preload chapters 2 and 3
    status = preloader.getPreloadStatus();
    expect(status.preloadedChapters).toContain(2);
    expect(status.preloadedChapters).toContain(3);
  });

  it('should provide comprehensive performance insights', () => {
    // Mock some resource data
    const mockResources = [
      {
        name: 'https://example.com/fast-script.js',
        startTime: 100,
        responseEnd: 150,
        transferSize: 25000,
      },
      {
        name: 'https://example.com/slow-image.jpg',
        startTime: 200,
        responseEnd: 1300,
        transferSize: 200000,
      },
    ];

    mockPerformance.getEntriesByType.mockReturnValue(mockResources);

    const analysis = performanceMonitor.analyzeResourceTiming();
    
    expect(analysis.totalResources).toBe(2);
    expect(analysis.totalSize).toBe(225000);
    expect(analysis.slowResources).toHaveLength(1);
    expect(analysis.slowResources[0].name).toBe('https://example.com/slow-image.jpg');
    expect(analysis.resourceTypes.javascript).toBe(1);
    expect(analysis.resourceTypes.image).toBe(1);
  });

  it('should handle memory monitoring', () => {
    const memoryUsage = performanceMonitor.getMemoryUsage();
    
    expect(memoryUsage).toBeDefined();
    expect(memoryUsage?.used).toBe(10); // 10MB
    expect(memoryUsage?.total).toBe(20); // 20MB
    expect(memoryUsage?.limit).toBe(100); // 100MB
  });

  it('should gracefully handle missing APIs', () => {
    // Test without performance.memory
    const originalMemory = mockPerformance.memory;
    delete (mockPerformance as any).memory;

    const memoryUsage = performanceMonitor.getMemoryUsage();
    expect(memoryUsage).toBeNull();

    // Restore
    mockPerformance.memory = originalMemory;
  });

  it('should handle errors gracefully', async () => {
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    // Test preloader error handling
    try {
      await preloader.preloadChapter(999 as any); // Invalid chapter
    } catch (error) {
      expect(consoleSpy).toHaveBeenCalled();
    }

    consoleSpy.mockRestore();
  });
});