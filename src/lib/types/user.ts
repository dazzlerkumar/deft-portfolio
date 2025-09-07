export interface UserProgress {
  currentChapter: number;
  visitedSections: string[];
  interactionHistory: UserInteraction[];
  preferences: UserPreferences;
  completionPercentage: number;
  lastVisit: Date;
}

export interface UserInteraction {
  id: string;
  type: string;
  timestamp: Date;
  data?: Record<string, any>;
}

export interface UserPreferences {
  reducedMotion: boolean;
  skipAnimations: boolean;
  preferredNavigationStyle: 'story' | 'traditional';
  theme: 'auto' | 'light' | 'dark';
  soundEnabled: boolean;
}

export interface ContactSubmission {
  name: string;
  email: string;
  message: string;
  type: 'collaboration' | 'job_opportunity' | 'general';
  timestamp: Date;
  source: string;
}

export interface AnalyticsEvent {
  event: string;
  properties: Record<string, any>;
  timestamp: Date;
  sessionId: string;
  userId?: string;
}