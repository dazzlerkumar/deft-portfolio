import { useState, useEffect } from 'react';
import { UserProgress, UserInteraction, UserPreferences } from '@/lib/types';

const STORAGE_KEY = 'storytelling-portfolio-progress';
const PREFERENCES_KEY = 'storytelling-portfolio-preferences';

export class ProgressTracker {
  private static instance: ProgressTracker;
  private progress: UserProgress;
  private listeners: Set<(progress: UserProgress) => void> = new Set();

  private constructor() {
    this.progress = this.loadProgress();
  }

  static getInstance(): ProgressTracker {
    if (!ProgressTracker.instance) {
      ProgressTracker.instance = new ProgressTracker();
    }
    return ProgressTracker.instance;
  }

  // Load progress from localStorage
  private loadProgress(): UserProgress {
    if (typeof window === 'undefined') {
      return this.getDefaultProgress();
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert date strings back to Date objects
        return {
          ...parsed,
          lastVisit: new Date(parsed.lastVisit),
          interactionHistory: parsed.interactionHistory.map((interaction: any) => ({
            ...interaction,
            timestamp: new Date(interaction.timestamp)
          }))
        };
      }
    } catch (error) {
      console.warn('Failed to load progress from localStorage:', error);
    }

    return this.getDefaultProgress();
  }

  // Save progress to localStorage
  private saveProgress(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.progress));
    } catch (error) {
      console.warn('Failed to save progress to localStorage:', error);
    }
  }

  // Get default progress state
  private getDefaultProgress(): UserProgress {
    return {
      currentChapter: 0,
      visitedSections: [],
      interactionHistory: [],
      preferences: this.loadPreferences(),
      completionPercentage: 0,
      lastVisit: new Date()
    };
  }

  // Load user preferences
  private loadPreferences(): UserPreferences {
    if (typeof window === 'undefined') {
      return this.getDefaultPreferences();
    }

    try {
      const stored = localStorage.getItem(PREFERENCES_KEY);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn('Failed to load preferences from localStorage:', error);
    }

    return this.getDefaultPreferences();
  }

  // Get default preferences
  private getDefaultPreferences(): UserPreferences {
    return {
      reducedMotion: false,
      skipAnimations: false,
      preferredNavigationStyle: 'story',
      theme: 'auto',
      soundEnabled: true
    };
  }

  // Save preferences to localStorage
  private savePreferences(): void {
    if (typeof window === 'undefined') return;

    try {
      localStorage.setItem(PREFERENCES_KEY, JSON.stringify(this.progress.preferences));
    } catch (error) {
      console.warn('Failed to save preferences to localStorage:', error);
    }
  }

  // Get current progress
  getProgress(): UserProgress {
    return { ...this.progress };
  }

  // Update current chapter
  setCurrentChapter(chapterNumber: number): void {
    this.progress.currentChapter = chapterNumber;
    this.progress.lastVisit = new Date();
    this.updateCompletionPercentage();
    this.saveProgress();
    this.notifyListeners();
  }

  // Mark a section as visited
  visitSection(sectionId: string): void {
    if (!this.progress.visitedSections.includes(sectionId)) {
      this.progress.visitedSections.push(sectionId);
      this.updateCompletionPercentage();
      this.saveProgress();
      this.notifyListeners();
    }
  }

  // Add user interaction
  addInteraction(interaction: Omit<UserInteraction, 'timestamp'>): void {
    const fullInteraction: UserInteraction = {
      ...interaction,
      timestamp: new Date()
    };

    this.progress.interactionHistory.push(fullInteraction);
    
    // Keep only last 100 interactions to prevent storage bloat
    if (this.progress.interactionHistory.length > 100) {
      this.progress.interactionHistory = this.progress.interactionHistory.slice(-100);
    }

    this.progress.lastVisit = new Date();
    this.saveProgress();
    this.notifyListeners();
  }

  // Update user preferences
  updatePreferences(preferences: Partial<UserPreferences>): void {
    this.progress.preferences = {
      ...this.progress.preferences,
      ...preferences
    };
    this.savePreferences();
    this.saveProgress();
    this.notifyListeners();
  }

  // Calculate completion percentage
  private updateCompletionPercentage(): void {
    // Assuming 4 main chapters + epilogue = 5 total sections
    const totalSections = 5;
    const completedSections = Math.min(this.progress.currentChapter + 1, totalSections);
    this.progress.completionPercentage = (completedSections / totalSections) * 100;
  }

  // Reset progress (useful for testing or user request)
  resetProgress(): void {
    this.progress = this.getDefaultProgress();
    this.saveProgress();
    this.notifyListeners();
  }

  // Subscribe to progress changes
  subscribe(listener: (progress: UserProgress) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  // Notify all listeners of progress changes
  private notifyListeners(): void {
    this.listeners.forEach(listener => {
      try {
        listener(this.getProgress());
      } catch (error) {
        console.warn('Error in progress listener:', error);
      }
    });
  }

  // Get analytics data
  getAnalyticsData(): {
    totalInteractions: number;
    sessionDuration: number;
    chaptersCompleted: number;
    preferredNavigationStyle: string;
  } {
    const now = new Date();
    const sessionStart = this.progress.interactionHistory[0]?.timestamp || now;
    const sessionDuration = now.getTime() - sessionStart.getTime();

    return {
      totalInteractions: this.progress.interactionHistory.length,
      sessionDuration: Math.round(sessionDuration / 1000), // in seconds
      chaptersCompleted: this.progress.currentChapter + 1,
      preferredNavigationStyle: this.progress.preferences.preferredNavigationStyle
    };
  }

  // Check if user is returning visitor
  isReturningVisitor(): boolean {
    return this.progress.interactionHistory.length > 0;
  }

  // Get time since last visit
  getTimeSinceLastVisit(): number {
    const now = new Date();
    return now.getTime() - this.progress.lastVisit.getTime();
  }
}

// Export singleton instance
export const progressTracker = ProgressTracker.getInstance();

// React hook for using progress tracker
export function useProgressTracker() {
  const [progress, setProgress] = useState<UserProgress>(progressTracker.getProgress());

  useEffect(() => {
    const unsubscribe = progressTracker.subscribe(setProgress);
    return unsubscribe;
  }, []);

  return {
    progress,
    setCurrentChapter: (chapter: number) => progressTracker.setCurrentChapter(chapter),
    visitSection: (sectionId: string) => progressTracker.visitSection(sectionId),
    addInteraction: (interaction: Omit<UserInteraction, 'timestamp'>) => 
      progressTracker.addInteraction(interaction),
    updatePreferences: (preferences: Partial<UserPreferences>) => 
      progressTracker.updatePreferences(preferences),
    resetProgress: () => progressTracker.resetProgress(),
    isReturningVisitor: () => progressTracker.isReturningVisitor(),
    getAnalyticsData: () => progressTracker.getAnalyticsData()
  };
}