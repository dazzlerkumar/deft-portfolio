// Performance benchmarking utilities

interface BenchmarkResult {
  name: string;
  duration: number;
  iterations: number;
  averageTime: number;
  minTime: number;
  maxTime: number;
  memoryUsage?: {
    before: number;
    after: number;
    delta: number;
  };
}

class Benchmark {
  private results: BenchmarkResult[] = [];

  // Benchmark a function execution
  async measure<T>(
    name: string,
    fn: () => T | Promise<T>,
    iterations = 1
  ): Promise<BenchmarkResult> {
    const times: number[] = [];
    let memoryBefore = 0;
    let memoryAfter = 0;

    // Get initial memory usage
    if ('memory' in performance) {
      memoryBefore = (performance as any).memory.usedJSHeapSize;
    }

    // Run benchmark iterations
    for (let i = 0; i < iterations; i++) {
      const start = performance.now();
      
      try {
        await fn();
      } catch (error) {
        console.error(`Benchmark "${name}" failed on iteration ${i + 1}:`, error);
        throw error;
      }
      
      const end = performance.now();
      times.push(end - start);
    }

    // Get final memory usage
    if ('memory' in performance) {
      memoryAfter = (performance as any).memory.usedJSHeapSize;
    }

    const totalTime = times.reduce((sum, time) => sum + time, 0);
    const averageTime = totalTime / iterations;
    const minTime = Math.min(...times);
    const maxTime = Math.max(...times);

    const result: BenchmarkResult = {
      name,
      duration: totalTime,
      iterations,
      averageTime,
      minTime,
      maxTime,
      memoryUsage: memoryBefore && memoryAfter ? {
        before: memoryBefore,
        after: memoryAfter,
        delta: memoryAfter - memoryBefore,
      } : undefined,
    };

    this.results.push(result);
    return result;
  }

  // Benchmark component rendering
  async measureComponentRender(
    name: string,
    renderFn: () => Promise<void> | void,
    iterations = 10
  ): Promise<BenchmarkResult> {
    return this.measure(name, renderFn, iterations);
  }

  // Benchmark animation performance
  async measureAnimation(
    name: string,
    animationFn: () => Promise<void>,
    duration = 1000
  ): Promise<BenchmarkResult> {
    const frames: number[] = [];
    let frameCount = 0;
    let startTime = 0;

    const measureFrame = () => {
      const now = performance.now();
      if (startTime === 0) {
        startTime = now;
      }
      
      const elapsed = now - startTime;
      if (elapsed < duration) {
        frameCount++;
        frames.push(now);
        requestAnimationFrame(measureFrame);
      }
    };

    const start = performance.now();
    
    // Start animation and frame measurement
    requestAnimationFrame(measureFrame);
    await animationFn();
    
    // Wait for animation to complete
    await new Promise(resolve => setTimeout(resolve, duration));
    
    const end = performance.now();
    const fps = frameCount / (duration / 1000);

    return {
      name: `${name} (Animation)`,
      duration: end - start,
      iterations: frameCount,
      averageTime: duration / frameCount,
      minTime: 0,
      maxTime: duration,
      memoryUsage: undefined,
    };
  }

  // Benchmark bundle loading
  async measureBundleLoad(
    name: string,
    importFn: () => Promise<any>
  ): Promise<BenchmarkResult> {
    return this.measure(`${name} (Bundle Load)`, importFn);
  }

  // Get all benchmark results
  getResults(): BenchmarkResult[] {
    return [...this.results];
  }

  // Get results summary
  getSummary() {
    const totalTests = this.results.length;
    const totalTime = this.results.reduce((sum, result) => sum + result.duration, 0);
    const averageTime = totalTime / totalTests;

    const slowTests = this.results
      .filter(result => result.averageTime > 100)
      .sort((a, b) => b.averageTime - a.averageTime);

    const memoryIntensive = this.results
      .filter(result => result.memoryUsage && result.memoryUsage.delta > 1048576) // 1MB
      .sort((a, b) => (b.memoryUsage?.delta || 0) - (a.memoryUsage?.delta || 0));

    return {
      totalTests,
      totalTime,
      averageTime,
      slowTests: slowTests.slice(0, 5),
      memoryIntensive: memoryIntensive.slice(0, 5),
    };
  }

  // Clear results
  clear() {
    this.results = [];
  }

  // Export results as JSON
  exportResults() {
    return JSON.stringify({
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      results: this.results,
      summary: this.getSummary(),
    }, null, 2);
  }
}

// Singleton benchmark instance
export const benchmark = new Benchmark();

// Performance testing utilities
export const performanceTests = {
  // Test component mount time
  async testComponentMount(Component: React.ComponentType, props = {}) {
    const { render, unmount } = await import('@testing-library/react');
    
    return benchmark.measure('Component Mount', () => {
      const result = render(React.createElement(Component, props));
      unmount();
      return result;
    });
  },

  // Test image loading performance
  async testImageLoad(src: string) {
    return benchmark.measure('Image Load', () => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = src;
      });
    });
  },

  // Test scroll performance
  async testScrollPerformance(element: HTMLElement, distance = 1000) {
    return benchmark.measureAnimation('Scroll Performance', async () => {
      element.scrollTo({ top: distance, behavior: 'smooth' });
    });
  },

  // Test bundle size impact
  async testBundleSize(importFn: () => Promise<any>) {
    const beforeSize = performance.memory ? (performance as any).memory.usedJSHeapSize : 0;
    
    const result = await benchmark.measureBundleLoad('Bundle Import', importFn);
    
    const afterSize = performance.memory ? (performance as any).memory.usedJSHeapSize : 0;
    
    return {
      ...result,
      bundleImpact: afterSize - beforeSize,
    };
  },
};

// Automated performance test suite
export async function runPerformanceTestSuite() {
  console.log('🚀 Starting performance test suite...');
  
  try {
    // Test critical resource loading
    await benchmark.measure('Critical CSS Injection', async () => {
      const { injectCriticalCSS } = await import('./critical-css');
      injectCriticalCSS();
    });

    // Test chapter loading
    for (let i = 1; i <= 4; i++) {
      await benchmark.measureBundleLoad(`Chapter ${i} Load`, async () => {
        const { loadChapter } = await import('./dynamic-imports');
        return loadChapter(i as any);
      });
    }

    // Test preloader performance
    await benchmark.measure('Preloader Initialization', async () => {
      const { preloader } = await import('./preloader');
      await preloader.preloadCriticalResources();
    });

    const summary = benchmark.getSummary();
    console.log('✅ Performance test suite completed:', summary);
    
    return summary;
  } catch (error) {
    console.error('❌ Performance test suite failed:', error);
    throw error;
  }
}