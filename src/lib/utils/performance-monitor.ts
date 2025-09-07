'use client';

// Core Web Vitals and performance monitoring

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  timestamp: number;
}

interface WebVitalsMetrics {
  CLS?: PerformanceMetric;
  FID?: PerformanceMetric;
  FCP?: PerformanceMetric;
  LCP?: PerformanceMetric;
  TTFB?: PerformanceMetric;
  INP?: PerformanceMetric;
}

class PerformanceMonitor {
  private metrics: WebVitalsMetrics = {};
  private observers: PerformanceObserver[] = [];
  private navigationStart: number;

  constructor() {
    this.navigationStart = performance.timeOrigin || performance.timing?.navigationStart || Date.now();
    this.initializeObservers();
  }

  private initializeObservers() {
    // Largest Contentful Paint (LCP)
    this.observeLCP();
    
    // First Input Delay (FID) / Interaction to Next Paint (INP)
    this.observeINP();
    
    // Cumulative Layout Shift (CLS)
    this.observeCLS();
    
    // First Contentful Paint (FCP)
    this.observeFCP();
    
    // Time to First Byte (TTFB)
    this.observeTTFB();
  }

  private observeLCP() {
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & { startTime: number };
        
        if (lastEntry) {
          this.recordMetric('LCP', lastEntry.startTime, this.getLCPRating(lastEntry.startTime));
        }
      });

      observer.observe({ type: 'largest-contentful-paint', buffered: true });
      this.observers.push(observer);
    } catch (error) {
      console.warn('LCP observer failed:', error);
    }
  }

  private observeINP() {
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        entries.forEach((entry: any) => {
          if (entry.processingStart && entry.startTime) {
            const inp = entry.processingStart - entry.startTime;
            this.recordMetric('INP', inp, this.getINPRating(inp));
          }
        });
      });

      observer.observe({ type: 'event', buffered: true });
      this.observers.push(observer);
    } catch (error) {
      console.warn('INP observer failed:', error);
    }
  }

  private observeCLS() {
    if (!('PerformanceObserver' in window)) return;

    let clsValue = 0;
    let sessionValue = 0;
    let sessionEntries: any[] = [];

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        entries.forEach((entry: any) => {
          if (!entry.hadRecentInput) {
            const firstSessionEntry = sessionEntries[0];
            const lastSessionEntry = sessionEntries[sessionEntries.length - 1];

            if (sessionValue && 
                entry.startTime - lastSessionEntry.startTime < 1000 &&
                entry.startTime - firstSessionEntry.startTime < 5000) {
              sessionValue += entry.value;
              sessionEntries.push(entry);
            } else {
              sessionValue = entry.value;
              sessionEntries = [entry];
            }

            if (sessionValue > clsValue) {
              clsValue = sessionValue;
              this.recordMetric('CLS', clsValue, this.getCLSRating(clsValue));
            }
          }
        });
      });

      observer.observe({ type: 'layout-shift', buffered: true });
      this.observers.push(observer);
    } catch (error) {
      console.warn('CLS observer failed:', error);
    }
  }

  private observeFCP() {
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
        
        if (fcpEntry) {
          this.recordMetric('FCP', fcpEntry.startTime, this.getFCPRating(fcpEntry.startTime));
        }
      });

      observer.observe({ type: 'paint', buffered: true });
      this.observers.push(observer);
    } catch (error) {
      console.warn('FCP observer failed:', error);
    }
  }

  private observeTTFB() {
    if (!performance.timing) return;

    const ttfb = performance.timing.responseStart - performance.timing.navigationStart;
    this.recordMetric('TTFB', ttfb, this.getTTFBRating(ttfb));
  }

  private recordMetric(name: keyof WebVitalsMetrics, value: number, rating: 'good' | 'needs-improvement' | 'poor') {
    const metric: PerformanceMetric = {
      name,
      value,
      rating,
      timestamp: Date.now(),
    };

    this.metrics[name] = metric;
    this.reportMetric(metric);
  }

  private reportMetric(metric: PerformanceMetric) {
    // Send to analytics service (replace with your analytics provider)
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.rating,
        value: Math.round(metric.value),
        non_interaction: true,
      });
    }

    // Console logging for development
    if (process.env.NODE_ENV === 'development') {
      console.log(`${metric.name}: ${metric.value.toFixed(2)}ms (${metric.rating})`);
    }
  }

  // Rating functions based on Core Web Vitals thresholds
  private getLCPRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 2500) return 'good';
    if (value <= 4000) return 'needs-improvement';
    return 'poor';
  }

  private getFIDRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 100) return 'good';
    if (value <= 300) return 'needs-improvement';
    return 'poor';
  }

  private getINPRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 200) return 'good';
    if (value <= 500) return 'needs-improvement';
    return 'poor';
  }

  private getCLSRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 0.1) return 'good';
    if (value <= 0.25) return 'needs-improvement';
    return 'poor';
  }

  private getFCPRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 1800) return 'good';
    if (value <= 3000) return 'needs-improvement';
    return 'poor';
  }

  private getTTFBRating(value: number): 'good' | 'needs-improvement' | 'poor' {
    if (value <= 800) return 'good';
    if (value <= 1800) return 'needs-improvement';
    return 'poor';
  }

  // Public methods
  getMetrics(): WebVitalsMetrics {
    return { ...this.metrics };
  }

  getPerformanceScore(): number {
    const metrics = Object.values(this.metrics);
    if (metrics.length === 0) return 0;

    const goodCount = metrics.filter(m => m.rating === 'good').length;
    return (goodCount / metrics.length) * 100;
  }

  // Resource timing analysis
  analyzeResourceTiming() {
    if (!performance.getEntriesByType) return {};

    const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[];
    
    const analysis = {
      totalResources: resources.length,
      totalSize: 0,
      slowResources: [] as any[],
      resourceTypes: {} as Record<string, number>,
    };

    resources.forEach(resource => {
      // Categorize by type
      const type = this.getResourceType(resource.name);
      analysis.resourceTypes[type] = (analysis.resourceTypes[type] || 0) + 1;

      // Find slow resources (>1s)
      const loadTime = resource.responseEnd - resource.startTime;
      if (loadTime > 1000) {
        analysis.slowResources.push({
          name: resource.name,
          loadTime: Math.round(loadTime),
          size: resource.transferSize || 0,
        });
      }

      analysis.totalSize += resource.transferSize || 0;
    });

    return analysis;
  }

  private getResourceType(url: string): string {
    if (url.includes('.js')) return 'javascript';
    if (url.includes('.css')) return 'stylesheet';
    if (url.match(/\.(jpg|jpeg|png|gif|webp|svg)$/)) return 'image';
    if (url.match(/\.(woff|woff2|ttf|otf)$/)) return 'font';
    return 'other';
  }

  // Memory usage monitoring
  getMemoryUsage() {
    if ('memory' in performance) {
      const memory = (performance as any).memory;
      return {
        used: Math.round(memory.usedJSHeapSize / 1048576), // MB
        total: Math.round(memory.totalJSHeapSize / 1048576), // MB
        limit: Math.round(memory.jsHeapSizeLimit / 1048576), // MB
      };
    }
    return null;
  }

  // Cleanup
  disconnect() {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
  }
}

// Singleton instance
export const performanceMonitor = new PerformanceMonitor();

// Hook for using performance monitor in components
export function usePerformanceMonitor() {
  return {
    getMetrics: () => performanceMonitor.getMetrics(),
    getScore: () => performanceMonitor.getPerformanceScore(),
    analyzeResources: () => performanceMonitor.analyzeResourceTiming(),
    getMemoryUsage: () => performanceMonitor.getMemoryUsage(),
  };
}

// Performance budget checker
export function checkPerformanceBudget() {
  const metrics = performanceMonitor.getMetrics();
  const budget = {
    LCP: 2500,
    FID: 100,
    CLS: 0.1,
    FCP: 1800,
    TTFB: 800,
  };

  const violations: string[] = [];

  Object.entries(budget).forEach(([metric, threshold]) => {
    const value = metrics[metric as keyof WebVitalsMetrics]?.value;
    if (value && value > threshold) {
      violations.push(`${metric}: ${value.toFixed(2)} > ${threshold}`);
    }
  });

  return {
    passed: violations.length === 0,
    violations,
    score: performanceMonitor.getPerformanceScore(),
  };
}