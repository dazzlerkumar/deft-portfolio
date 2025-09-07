import { UserProgress } from './user';
import { Project } from './project';

export interface StoryContent {
  chapters: Chapter[];
  globalTheme: GlobalTheme;
  userProgress: UserProgress;
}

export interface Chapter {
  id: string;
  title: string;
  subtitle: string;
  content: ContentBlock[];
  visualElements: VisualElement[];
  projects: Project[];
  interactiveElements: InteractiveElement[];
}

export interface ContentBlock {
  id: string;
  type: 'text' | 'image' | 'video' | 'interactive';
  content: string;
  metadata?: Record<string, any>;
}

export interface VisualElement {
  id: string;
  type: '3d' | 'animation' | 'illustration';
  config: Record<string, any>;
  fallback?: string;
}

export interface InteractiveElement {
  id: string;
  type: 'hover' | 'click' | 'scroll' | 'drag';
  trigger: ElementTrigger;
  animation: AnimationConfig;
  content: ElementContent;
}

export interface ElementTrigger {
  selector: string;
  threshold?: number;
  delay?: number;
}

export interface AnimationConfig {
  duration: number;
  easing: string;
  properties: Record<string, any>;
}

export interface ElementContent {
  text?: string;
  media?: string;
  component?: string;
}

export interface GlobalTheme {
  primaryColors: string[];
  fonts: FontConfig;
  animations: AnimationDefaults;
}

export interface FontConfig {
  heading: string;
  body: string;
  mono: string;
}

export interface AnimationDefaults {
  duration: number;
  easing: string;
  reducedMotion: boolean;
}

export interface TimelineEvent {
  id: string;
  title: string;
  date: string;
  description: string;
  chapterId: string;
  position: number;
}

