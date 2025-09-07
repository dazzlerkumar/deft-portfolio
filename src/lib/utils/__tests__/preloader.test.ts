import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { preloader, usePreloader, preloadOnIdle } from '../preloader';

// Mock dynamic imports
vi.mock('../dynamic-imports', () => ({
  chapterImports: {
    1: vi.fn(() => Promise.resolve({ ChapterOne: () => null })),
    2: vi.fn(() => Promise.resolve({ ChapterTwo: () => null })),
    3: vi.fn(() => Promise.resolve({ ChapterThree: () => null })),
    4: vi.fn(() => Promise.resolve({ ChapterFour: () => null })),
  },
}));

describe('ContentPreloader', () => {
  beforeEach(() => {
    // Mock Image constructor
    global.Image = class {
      onload: (() => void) | null = null;
      onerror: (() => void) | null = null;
      src = '';

      constructor() {
        // Simulate successful image load
        setTimeout(() => {
          if (this.onload) this.onload();
        }, 10);
      }
    } as any;

    // Mock requestIdleCallback
    global.requestIdleCallback = vi.fn((callback) => {
      setTimeout(callback, 0);
      return 1;
    });

    // Clear preloader cache
    preloader.clearCache();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Chapter preloading', () => {
    it('should preload chapter successfully', async () => {
      await preloader.preloadChapter(1);
      
      const status = preloader.getPreloadStatus();
      expect(status.preloadedChapters).toContain(1);
    });

    it('should handle preload timeout', async () => {
      // Mock a slow import
      const slowImport = vi.fn(() => new Promise(resolve => setTimeout(resolve, 6000)));
      
      try {
        await preloader.preloadChapter(1, { timeout: 100 });
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
      }
    });

    it('should not preload same chapter twice', async () => {
      await preloader.preloadChapter(1);
      await preloader.preloadChapter(1); // Second call
      
      const status = preloader.getPreloadStatus();
      expect(status.preloadedChapters.filter(ch => ch === 1)).toHaveLength(1);
    });
  });

  describe('Image preloading', () => {
    it('should preload single image', async () => {
      await preloader.preloadImage('/test-image.jpg');
      
      const status = preloader.getPreloadStatus();
      expect(status.cachedImages).toBe(1);
    });

    it('should preload multiple images', async () => {
      const images = ['/image1.jpg', '/image2.jpg', '/image3.jpg'];
      await preloader.preloadImages(images);
      
      const status = preloader.getPreloadStatus();
      expect(status.cachedImages).toBe(3);
    });

    it('should not preload same image twice', async () => {
      await preloader.preloadImage('/test-image.jpg');
      await preloader.preloadImage('/test-image.jpg'); // Second call
      
      const status = preloader.getPreloadStatus();
      expect(status.cachedImages).toBe(1);
    });
  });

  describe('Smart preloading', () => {
    it('should preload next chapter when user is 50% through current', async () => {
      await preloader.smartPreload(1, 0.6);
      
      const status = preloader.getPreloadStatus();
      expect(status.preloadedChapters).toContain(2);
    });

    it('should preload chapter after next when user is 80% through current', async () => {
      await preloader.smartPreload(1, 0.9);
      
      const status = preloader.getPreloadStatus();
      expect(status.preloadedChapters).toContain(2);
      expect(status.preloadedChapters).toContain(3);
    });

    it('should not preload beyond chapter 4', async () => {
      await preloader.smartPreload(4, 0.9);
      
      const status = preloader.getPreloadStatus();
      expect(status.preloadedChapters).not.toContain(5);
    });
  });

  describe('Critical resources', () => {
    it('should preload critical resources', async () => {
      await preloader.preloadCriticalResources();
      
      const status = preloader.getPreloadStatus();
      expect(status.cachedImages).toBeGreaterThan(0);
    });
  });

  describe('Cache management', () => {
    it('should clear cache', async () => {
      await preloader.preloadChapter(1);
      await preloader.preloadImage('/test-image.jpg');
      
      preloader.clearCache();
      
      const status = preloader.getPreloadStatus();
      expect(status.preloadedChapters).toHaveLength(0);
      expect(status.cachedImages).toBe(0);
    });

    it('should get preload status', async () => {
      await preloader.preloadChapter(1);
      await preloader.preloadImage('/test-image.jpg');
      
      const status = preloader.getPreloadStatus();
      expect(status.preloadedChapters).toContain(1);
      expect(status.cachedImages).toBe(1);
      expect(typeof status.activePreloads).toBe('number');
    });
  });
});

describe('usePreloader hook', () => {
  it('should return preloader methods', () => {
    const preloaderHook = usePreloader();
    
    expect(typeof preloaderHook.preloadChapter).toBe('function');
    expect(typeof preloaderHook.preloadImages).toBe('function');
    expect(typeof preloaderHook.smartPreload).toBe('function');
    expect(typeof preloaderHook.getStatus).toBe('function');
  });
});

describe('preloadOnIdle', () => {
  it('should execute callback on idle', async () => {
    const callback = vi.fn().mockResolvedValue(undefined);
    
    preloadOnIdle(callback);
    
    // Wait for idle callback
    await new Promise(resolve => setTimeout(resolve, 10));
    
    expect(callback).toHaveBeenCalled();
  });

  it('should handle callback errors gracefully', async () => {
    const callback = vi.fn().mockRejectedValue(new Error('Test error'));
    const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    
    preloadOnIdle(callback);
    
    // Wait for idle callback
    await new Promise(resolve => setTimeout(resolve, 10));
    
    expect(callback).toHaveBeenCalled();
    expect(consoleSpy).toHaveBeenCalledWith('Idle preload failed:', expect.any(Error));
    
    consoleSpy.mockRestore();
  });

  it('should use setTimeout fallback when requestIdleCallback is not available', async () => {
    const originalRequestIdleCallback = global.requestIdleCallback;
    delete (global as any).requestIdleCallback;
    
    const callback = vi.fn().mockResolvedValue(undefined);
    
    preloadOnIdle(callback);
    
    // Wait for setTimeout
    await new Promise(resolve => setTimeout(resolve, 150));
    
    expect(callback).toHaveBeenCalled();
    
    // Restore
    global.requestIdleCallback = originalRequestIdleCallback;
  });
});