import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ProgressTracker, progressTracker } from '../progress-tracker';
import { UserProgress, UserInteraction } from '@/lib/types';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('ProgressTracker', () => {
  let tracker: ProgressTracker;

  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    tracker = ProgressTracker.getInstance();
  });

  afterEach(() => {
    // Reset the singleton instance for clean tests
    (ProgressTracker as any).instance = undefined;
  });

  describe('Singleton Pattern', () => {
    it('returns the same instance', () => {
      const instance1 = ProgressTracker.getInstance();
      const instance2 = ProgressTracker.getInstance();
      expect(instance1).toBe(instance2);
    });
  });

  describe('Default Progress', () => {
    it('initializes with default progress when no stored data', () => {
      const progress = tracker.getProgress();
      
      expect(progress.currentChapter).toBe(0);
      expect(progress.visitedSections).toEqual([]);
      expect(progress.interactionHistory).toEqual([]);
      expect(progress.completionPercentage).toBe(0);
      expect(progress.preferences.preferredNavigationStyle).toBe('story');
    });
  });

  describe('Chapter Management', () => {
    it('updates current chapter', () => {
      tracker.setCurrentChapter(2);
      const progress = tracker.getProgress();
      
      expect(progress.currentChapter).toBe(2);
      expect(progress.completionPercentage).toBe(60); // 3/5 * 100
      expect(localStorageMock.setItem).toHaveBeenCalled();
    });

    it('updates last visit time when setting chapter', () => {
      const beforeTime = new Date();
      tracker.setCurrentChapter(1);
      const progress = tracker.getProgress();
      
      expect(progress.lastVisit.getTime()).toBeGreaterThanOrEqual(beforeTime.getTime());
    });
  });

  describe('Section Tracking', () => {
    it('marks sections as visited', () => {
      tracker.visitSection('section-1');
      tracker.visitSection('section-2');
      
      const progress = tracker.getProgress();
      expect(progress.visitedSections).toContain('section-1');
      expect(progress.visitedSections).toContain('section-2');
    });

    it('does not duplicate visited sections', () => {
      tracker.visitSection('section-1');
      tracker.visitSection('section-1');
      
      const progress = tracker.getProgress();
      expect(progress.visitedSections.filter(s => s === 'section-1')).toHaveLength(1);
    });
  });

  describe('Interaction History', () => {
    it('adds interactions with timestamp', () => {
      const interaction = {
        id: 'test-interaction',
        type: 'navigation' as const,
        elementId: 'button-1',
        chapterId: 'chapter-1'
      };

      tracker.addInteraction(interaction);
      const progress = tracker.getProgress();
      
      expect(progress.interactionHistory).toHaveLength(1);
      expect(progress.interactionHistory[0]).toMatchObject(interaction);
      expect(progress.interactionHistory[0].timestamp).toBeInstanceOf(Date);
    });

    it('limits interaction history to 100 items', () => {
      // Add 105 interactions
      for (let i = 0; i < 105; i++) {
        tracker.addInteraction({
          id: `interaction-${i}`,
          type: 'navigation',
          elementId: `element-${i}`,
          chapterId: 'chapter-1'
        });
      }

      const progress = tracker.getProgress();
      expect(progress.interactionHistory).toHaveLength(100);
      
      // Should keep the most recent ones
      expect(progress.interactionHistory[99].id).toBe('interaction-104');
    });
  });

  describe('Preferences Management', () => {
    it('updates user preferences', () => {
      tracker.updatePreferences({
        reducedMotion: true,
        preferredNavigationStyle: 'traditional'
      });

      const progress = tracker.getProgress();
      expect(progress.preferences.reducedMotion).toBe(true);
      expect(progress.preferences.preferredNavigationStyle).toBe('traditional');
      expect(progress.preferences.skipAnimations).toBe(false); // Should preserve other preferences
    });
  });

  describe('Progress Reset', () => {
    it('resets progress to default state', () => {
      // Set some progress
      tracker.setCurrentChapter(3);
      tracker.visitSection('section-1');
      tracker.addInteraction({
        id: 'test',
        type: 'navigation',
        elementId: 'test',
        chapterId: 'chapter-1'
      });

      // Reset
      tracker.resetProgress();
      const progress = tracker.getProgress();

      expect(progress.currentChapter).toBe(0);
      expect(progress.visitedSections).toEqual([]);
      expect(progress.interactionHistory).toEqual([]);
      expect(progress.completionPercentage).toBe(0);
    });
  });

  describe('Analytics Data', () => {
    it('provides analytics data', () => {
      tracker.addInteraction({
        id: 'test-1',
        type: 'navigation',
        elementId: 'test',
        chapterId: 'chapter-1'
      });
      tracker.setCurrentChapter(2);

      const analytics = tracker.getAnalyticsData();
      
      expect(analytics.totalInteractions).toBe(1);
      expect(analytics.chaptersCompleted).toBe(3); // currentChapter + 1
      expect(analytics.preferredNavigationStyle).toBe('story');
      expect(typeof analytics.sessionDuration).toBe('number');
    });
  });

  describe('Visitor Status', () => {
    it('identifies new visitors', () => {
      expect(tracker.isReturningVisitor()).toBe(false);
    });

    it('identifies returning visitors', () => {
      tracker.addInteraction({
        id: 'test',
        type: 'navigation',
        elementId: 'test',
        chapterId: 'chapter-1'
      });

      expect(tracker.isReturningVisitor()).toBe(true);
    });
  });

  describe('Local Storage Integration', () => {
    it('saves progress to localStorage', () => {
      tracker.setCurrentChapter(1);
      
      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'storytelling-portfolio-progress',
        expect.any(String)
      );
    });

    it('loads progress from localStorage', () => {
      const mockProgress: UserProgress = {
        currentChapter: 2,
        visitedSections: ['section-1'],
        interactionHistory: [],
        preferences: {
          reducedMotion: true,
          skipAnimations: false,
          preferredNavigationStyle: 'traditional',
          theme: 'dark',
          soundEnabled: false
        },
        completionPercentage: 40,
        lastVisit: new Date('2023-01-01')
      };

      localStorageMock.getItem.mockReturnValue(JSON.stringify(mockProgress));
      
      // Create new instance to test loading
      (ProgressTracker as any).instance = undefined;
      const newTracker = ProgressTracker.getInstance();
      const progress = newTracker.getProgress();

      expect(progress.currentChapter).toBe(2);
      expect(progress.visitedSections).toContain('section-1');
      expect(progress.preferences.reducedMotion).toBe(true);
    });

    it('handles localStorage errors gracefully', () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });

      // Should not throw and should return default progress
      (ProgressTracker as any).instance = undefined;
      const newTracker = ProgressTracker.getInstance();
      const progress = newTracker.getProgress();

      expect(progress.currentChapter).toBe(0);
    });
  });

  describe('Event Subscription', () => {
    it('notifies subscribers of progress changes', () => {
      const listener = vi.fn();
      const unsubscribe = tracker.subscribe(listener);

      tracker.setCurrentChapter(1);
      
      expect(listener).toHaveBeenCalledWith(expect.objectContaining({
        currentChapter: 1
      }));

      unsubscribe();
      tracker.setCurrentChapter(2);
      
      // Should not be called after unsubscribe
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('handles listener errors gracefully', () => {
      const errorListener = vi.fn(() => {
        throw new Error('Listener error');
      });
      const goodListener = vi.fn();

      tracker.subscribe(errorListener);
      tracker.subscribe(goodListener);

      // Should not throw and should still call good listener
      expect(() => tracker.setCurrentChapter(1)).not.toThrow();
      expect(goodListener).toHaveBeenCalled();
    });
  });
});