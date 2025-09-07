import { describe, it, expect, vi, beforeEach } from 'vitest';
import { loadChapter, createDynamicComponent, chapterImports } from '../dynamic-imports';

// Mock the chapter components
vi.mock('../../components/story/chapter-one', () => ({
  ChapterOne: () => 'Chapter One Component',
}));

vi.mock('../../components/story/chapter-two', () => ({
  ChapterTwo: () => 'Chapter Two Component',
}));

vi.mock('../../components/story/chapter-three', () => ({
  ChapterThree: () => 'Chapter Three Component',
}));

vi.mock('../../components/story/chapter-four', () => ({
  ChapterFour: () => 'Chapter Four Component',
}));

describe('Dynamic Imports', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('loadChapter', () => {
    it('should load chapter 1 successfully', async () => {
      const module = await loadChapter(1);
      expect(module).toBeDefined();
      expect(module.ChapterOne).toBeDefined();
    });

    it('should load chapter 2 successfully', async () => {
      const module = await loadChapter(2);
      expect(module).toBeDefined();
      expect(module.ChapterTwo).toBeDefined();
    });

    it('should load chapter 3 successfully', async () => {
      const module = await loadChapter(3);
      expect(module).toBeDefined();
      expect(module.ChapterThree).toBeDefined();
    });

    it('should load chapter 4 successfully', async () => {
      const module = await loadChapter(4);
      expect(module).toBeDefined();
      expect(module.ChapterFour).toBeDefined();
    });

    it('should handle loading errors gracefully', async () => {
      // Mock a failing import
      const originalImport = chapterImports[1];
      (chapterImports as any)[1] = () => Promise.reject(new Error('Import failed'));

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      await expect(loadChapter(1)).rejects.toThrow('Import failed');
      expect(consoleSpy).toHaveBeenCalledWith('Failed to load chapter 1:', expect.any(Error));

      // Restore original import
      (chapterImports as any)[1] = originalImport;
      consoleSpy.mockRestore();
    });
  });

  describe('createDynamicComponent', () => {
    it('should create dynamic component successfully', async () => {
      const mockComponent = () => 'Mock Component';
      const importFn = () => Promise.resolve({ default: mockComponent });

      const DynamicComponent = createDynamicComponent(importFn);
      expect(DynamicComponent).toBeDefined();
    });

    it('should handle import errors with fallback', async () => {
      const fallbackComponent = () => 'Fallback Component';
      const importFn = () => Promise.reject(new Error('Import failed'));

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const DynamicComponent = createDynamicComponent(importFn, fallbackComponent);
      expect(DynamicComponent).toBeDefined();

      consoleSpy.mockRestore();
    });

    it('should handle import errors without fallback', async () => {
      const importFn = () => Promise.reject(new Error('Import failed'));

      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

      const DynamicComponent = createDynamicComponent(importFn);
      expect(DynamicComponent).toBeDefined();

      consoleSpy.mockRestore();
    });
  });

  describe('chapterImports', () => {
    it('should have imports for all chapters', () => {
      expect(chapterImports[1]).toBeDefined();
      expect(chapterImports[2]).toBeDefined();
      expect(chapterImports[3]).toBeDefined();
      expect(chapterImports[4]).toBeDefined();
    });

    it('should return functions that return promises', () => {
      Object.values(chapterImports).forEach(importFn => {
        expect(typeof importFn).toBe('function');
        const result = importFn();
        expect(result).toBeInstanceOf(Promise);
      });
    });
  });
});