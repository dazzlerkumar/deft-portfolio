'use client';

import { chapterImports, type ChapterNumber } from './dynamic-imports';

interface PreloadOptions {
  priority?: 'high' | 'low';
  timeout?: number;
}

class ContentPreloader {
  private preloadedChapters = new Set<ChapterNumber>();
  private preloadPromises = new Map<ChapterNumber, Promise<any>>();
  private imageCache = new Set<string>();

  // Preload next chapter content
  async preloadChapter(chapterNumber: ChapterNumber, options: PreloadOptions = {}) {
    if (this.preloadedChapters.has(chapterNumber)) {
      return this.preloadPromises.get(chapterNumber);
    }

    const { priority = 'low', timeout = 5000 } = options;

    const preloadPromise = this.createPreloadPromise(chapterNumber, timeout);
    this.preloadPromises.set(chapterNumber, preloadPromise);

    try {
      await preloadPromise;
      this.preloadedChapters.add(chapterNumber);
    } catch (error) {
      console.warn(`Failed to preload chapter ${chapterNumber}:`, error);
      this.preloadPromises.delete(chapterNumber);
    }

    return preloadPromise;
  }

  private createPreloadPromise(chapterNumber: ChapterNumber, timeout: number) {
    const importFn = chapterImports[chapterNumber];
    if (!importFn) {
      return Promise.reject(new Error(`Invalid chapter number: ${chapterNumber}`));
    }
    
    return Promise.race([
      importFn(),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Preload timeout')), timeout)
      ),
    ]);
  }

  // Preload images with intersection observer
  preloadImage(src: string): Promise<void> {
    if (this.imageCache.has(src)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        this.imageCache.add(src);
        resolve();
      };
      img.onerror = reject;
      img.src = src;
    });
  }

  // Preload multiple images
  async preloadImages(sources: string[]): Promise<void> {
    const promises = sources
      .filter(src => !this.imageCache.has(src))
      .map(src => this.preloadImage(src));

    try {
      await Promise.allSettled(promises);
    } catch (error) {
      console.warn('Some images failed to preload:', error);
    }
  }

  // Smart preloading based on user behavior
  async smartPreload(currentChapter: ChapterNumber, userProgress: number) {
    const promises: Promise<any>[] = [];
    const nextChapter = (currentChapter + 1) as ChapterNumber;
    
    // Preload next chapter if user is more than 50% through current chapter
    if (userProgress > 0.5 && nextChapter <= 4) {
      promises.push(this.preloadChapter(nextChapter, { priority: 'high' }));
    }

    // Preload chapter after next with lower priority
    const chapterAfterNext = (currentChapter + 2) as ChapterNumber;
    if (userProgress > 0.8 && chapterAfterNext <= 4) {
      promises.push(this.preloadChapter(chapterAfterNext, { priority: 'low' }));
    }

    // Wait for all preloads to complete
    await Promise.all(promises);
  }

  // Preload critical resources
  async preloadCriticalResources() {
    const criticalImages = [
      '/images/hero-background.webp',
      '/images/chapter-1-hero.webp',
      '/images/loading-spinner.svg',
    ];

    await this.preloadImages(criticalImages);
  }

  // Clear cache to free memory
  clearCache() {
    this.preloadedChapters.clear();
    this.preloadPromises.clear();
    this.imageCache.clear();
  }

  // Get preload status
  getPreloadStatus() {
    return {
      preloadedChapters: Array.from(this.preloadedChapters),
      cachedImages: this.imageCache.size,
      activePreloads: this.preloadPromises.size,
    };
  }
}

// Singleton instance
export const preloader = new ContentPreloader();

// Hook for using preloader in components
export function usePreloader() {
  return {
    preloadChapter: preloader.preloadChapter.bind(preloader),
    preloadImages: preloader.preloadImages.bind(preloader),
    smartPreload: preloader.smartPreload.bind(preloader),
    getStatus: preloader.getPreloadStatus.bind(preloader),
  };
}

// Preload on idle
export function preloadOnIdle(callback: () => Promise<void>) {
  if ('requestIdleCallback' in window) {
    requestIdleCallback(async () => {
      try {
        await callback();
      } catch (error) {
        console.warn('Idle preload failed:', error);
      }
    });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(async () => {
      try {
        await callback();
      } catch (error) {
        console.warn('Idle preload failed:', error);
      }
    }, 100);
  }
}