export interface Project {
  id: string;
  title: string;
  description: string;
  storyIntegration: string;
  technologies: Technology[];
  demoUrl?: string;
  codeUrl?: string;
  images: string[];
  impact: ImpactMetrics;
  featured: boolean;
  category: ProjectCategory;
}

export interface Technology {
  name: string;
  category: 'frontend' | 'backend' | 'database' | 'tool' | 'cloud';
  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface ImpactMetrics {
  userReach?: number;
  performanceImprovement?: string;
  teamSize?: number;
  timeframe: string;
  businessValue?: string;
}

export type ProjectCategory = 
  | 'web-application' 
  | 'mobile-app' 
  | 'library' 
  | 'tool' 
  | 'experiment' 
  | 'leadership';

export interface ProjectShowcaseConfig {
  interactionType: 'scroll' | 'click' | 'hover';
  visualStyle: 'card' | 'fullscreen' | 'inline';
  animationPreset: 'fade' | 'slide' | 'zoom' | 'custom';
}