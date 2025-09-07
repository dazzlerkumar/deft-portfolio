import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { benchmark, performanceTests, runPerformanceTestSuite } from '../benchmark';

// Mock performance API
const mockPerformance = {
  now: vi.fn(() => Date.now()),
  memory: {
    usedJSHeapSize: 10485760, // 10MB
  },
};

// Mock React testing library
vi.mock('@testing-library/react', () => ({
  render: vi.fn(() => ({ unmount: vi.fn() })),
}));

describe('Benchmark', () => {
  beforeEach(() => {
    global.performance = mockPerformance as any;
    global.requestAnimationFrame = vi.fn((callback) => {
      setTimeout(callback, 16); // ~60fps
      return 1;
    });
    benchmark.clear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('measure', () => {
    it('should measure function execution time', async () => {
      let callCount = 0;
      mockPerformance.now
        .mockReturnValueOnce(100) // start
        .mockReturnValueOnce(150); // end

      const testFn = vi.fn(() => {
        callCount++;
        return 'result';
      });

      const result = await benchmark.measure('Test Function', testFn);

      expect(result.name).toBe('Test Function');
      expect(result.duration).toBe(50);
      expect(result.iterations).toBe(1);
      expect(result.averageTime).toBe(50);
      expect(testFn).toHaveBeenCalledTimes(1);
    });

    it('should measure multiple iterations', async () => {
      mockPerformance.now
        .mockReturnValueOnce(100) // iteration 1 start
        .mockReturnValueOnce(120) // iteration 1 end
        .mockReturnValueOnce(120) // iteration 2 start
        .mockReturnValueOnce(150); // iteration 2 end

      const testFn = vi.fn();

      const result = await benchmark.measure('Test Function', testFn, 2);

      expect(result.iterations).toBe(2);
      expect(result.averageTime).toBe(25); // (20 + 30) / 2
      expect(result.minTime).toBe(20);
      expect(result.maxTime).toBe(30);
      expect(testFn).toHaveBeenCalledTimes(2);
    });

    it('should measure memory usage when available', async () => {
      mockPerformance.now
        .mockReturnValueOnce(100)
        .mockReturnValueOnce(150);

      // Mock memory change
      const originalMemory = mockPerformance.memory.usedJSHeapSize;
      mockPerformance.memory.usedJSHeapSize = originalMemory + 1048576; // +1MB

      const result = await benchmark.measure('Memory Test', () => {});

      expect(result.memoryUsage).toBeDefined();
      expect(result.memoryUsage?.before).toBe(originalMemory);
      expect(result.memoryUsage?.after).toBe(originalMemory + 1048576);
      expect(result.memoryUsage?.delta).toBe(1048576);
    });

    it('should handle async functions', async () => {
      mockPerformance.now
        .mockReturnValueOnce(100)
        .mockReturnValueOnce(200);

      const asyncFn = vi.fn(async () => {
        await new Promise(resolve => setTimeout(resolve, 50));
        return 'async result';
      });

      const result = await benchmark.measure('Async Function', asyncFn);

      expect(result.duration).toBe(100);
      expect(asyncFn).toHaveBeenCalledTimes(1);
    });

    it('should handle function errors', async () => {
      const errorFn = vi.fn(() => {
        throw new Error('Test error');
      });

      await expect(benchmark.measure('Error Function', errorFn)).rejects.toThrow('Test error');
    });
  });

  describe('measureComponentRender', () => {
    it('should measure component rendering', async () => {
      mockPerformance.now
        .mockReturnValueOnce(100)
        .mockReturnValueOnce(150);

      const renderFn = vi.fn();

      const result = await benchmark.measureComponentRender('Component Render', renderFn, 5);

      expect(result.name).toBe('Component Render');
      expect(result.iterations).toBe(5);
      expect(renderFn).toHaveBeenCalledTimes(5);
    });
  });

  describe('measureAnimation', () => {
    it('should measure animation performance', async () => {
      mockPerformance.now
        .mockReturnValueOnce(100) // start
        .mockReturnValueOnce(200); // end

      const animationFn = vi.fn(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
      });

      const result = await benchmark.measureAnimation('Test Animation', animationFn, 500);

      expect(result.name).toBe('Test Animation (Animation)');
      expect(animationFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('measureBundleLoad', () => {
    it('should measure bundle loading time', async () => {
      mockPerformance.now
        .mockReturnValueOnce(100)
        .mockReturnValueOnce(300);

      const importFn = vi.fn(async () => {
        await new Promise(resolve => setTimeout(resolve, 100));
        return { default: 'module' };
      });

      const result = await benchmark.measureBundleLoad('Test Bundle', importFn);

      expect(result.name).toBe('Test Bundle (Bundle Load)');
      expect(result.duration).toBe(200);
      expect(importFn).toHaveBeenCalledTimes(1);
    });
  });

  describe('results management', () => {
    it('should store and retrieve results', async () => {
      mockPerformance.now
        .mockReturnValueOnce(100)
        .mockReturnValueOnce(150);

      await benchmark.measure('Test 1', () => {});

      const results = benchmark.getResults();
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('Test 1');
    });

    it('should generate summary', async () => {
      mockPerformance.now
        .mockReturnValueOnce(100).mockReturnValueOnce(200) // Test 1: 100ms
        .mockReturnValueOnce(200).mockReturnValueOnce(250); // Test 2: 50ms

      await benchmark.measure('Fast Test', () => {});
      await benchmark.measure('Slow Test', () => {});

      const summary = benchmark.getSummary();

      expect(summary.totalTests).toBe(2);
      expect(summary.totalTime).toBe(150);
      expect(summary.averageTime).toBe(75);
      expect(summary.slowTests).toHaveLength(1);
      expect(summary.slowTests[0].name).toBe('Slow Test');
    });

    it('should clear results', async () => {
      mockPerformance.now
        .mockReturnValueOnce(100)
        .mockReturnValueOnce(150);

      await benchmark.measure('Test', () => {});
      expect(benchmark.getResults()).toHaveLength(1);

      benchmark.clear();
      expect(benchmark.getResults()).toHaveLength(0);
    });

    it('should export results as JSON', async () => {
      mockPerformance.now
        .mockReturnValueOnce(100)
        .mockReturnValueOnce(150);

      await benchmark.measure('Test', () => {});

      const exported = benchmark.exportResults();
      const parsed = JSON.parse(exported);

      expect(parsed.timestamp).toBeDefined();
      expect(parsed.results).toHaveLength(1);
      expect(parsed.summary).toBeDefined();
    });
  });
});

describe('performanceTests', () => {
  beforeEach(() => {
    global.performance = mockPerformance as any;
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
  });

  describe('testImageLoad', () => {
    it('should test image loading performance', async () => {
      mockPerformance.now
        .mockReturnValueOnce(100)
        .mockReturnValueOnce(200);

      const result = await performanceTests.testImageLoad('/test-image.jpg');

      expect(result.name).toBe('Image Load');
      expect(result.duration).toBe(100);
    });
  });

  describe('testScrollPerformance', () => {
    it('should test scroll performance', async () => {
      const mockElement = {
        scrollTo: vi.fn(),
      } as any;

      mockPerformance.now
        .mockReturnValueOnce(100)
        .mockReturnValueOnce(200);

      const result = await performanceTests.testScrollPerformance(mockElement, 1000);

      expect(result.name).toBe('Scroll Performance (Animation)');
      expect(mockElement.scrollTo).toHaveBeenCalledWith({
        top: 1000,
        behavior: 'smooth',
      });
    });
  });

  describe('testBundleSize', () => {
    it('should test bundle size impact', async () => {
      mockPerformance.now
        .mockReturnValueOnce(100)
        .mockReturnValueOnce(200);

      const importFn = vi.fn(async () => ({ default: 'module' }));

      const result = await performanceTests.testBundleSize(importFn);

      expect(result.name).toBe('Bundle Import (Bundle Load)');
      expect(result.bundleImpact).toBeDefined();
    });
  });
});

describe('runPerformanceTestSuite', () => {
  beforeEach(() => {
    global.performance = mockPerformance as any;
    
    // Mock console methods
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should run complete performance test suite', async () => {
    mockPerformance.now.mockReturnValue(100);

    const summary = await runPerformanceTestSuite();

    expect(summary).toBeDefined();
    expect(summary.totalTests).toBeGreaterThan(0);
    expect(console.log).toHaveBeenCalledWith('🚀 Starting performance test suite...');
    expect(console.log).toHaveBeenCalledWith('✅ Performance test suite completed:', summary);
  });

  it('should handle test suite errors', async () => {
    // Mock an error in the test suite
    mockPerformance.now.mockImplementation(() => {
      throw new Error('Performance API error');
    });

    await expect(runPerformanceTestSuite()).rejects.toThrow('Performance API error');
    expect(console.error).toHaveBeenCalledWith('❌ Performance test suite failed:', expect.any(Error));
  });
});