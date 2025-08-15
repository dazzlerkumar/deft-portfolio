/**
 * TypeScript interfaces for portfolio data models
 * Defines the structure for all portfolio-related data
 */

// Base types
export type ProjectCategory = 
  | 'web-app' 
  | 'mobile-app' 
  | 'api' 
  | 'library' 
  | 'tool' 
  | 'design-system' 
  | 'other';

export type SkillCategory = 
  | 'frontend' 
  | 'backend' 
  | 'mobile' 
  | 'devops' 
  | 'design' 
  | 'database' 
  | 'testing' 
  | 'other';

export type ExperienceType = 
  | 'full-time' 
  | 'part-time' 
  | 'contract' 
  | 'freelance' 
  | 'internship' 
  | 'volunteer';

export type ContactMethod = 
  | 'email' 
  | 'phone' 
  | 'linkedin' 
  | 'github' 
  | 'twitter' 
  | 'website' 
  | 'other';

// Personal information interface
export interface PersonalInfo {
  name: string;
  nameHindi?: string; // Bilingual support for Hindi name (दीपक कुमार)
  title: string;
  company: string; // Current company (Techpix Software Solutions)
  tagline: string;
  bio: string;
  location: {
    city: string;
    country: string;
    timezone: string;
  };
  avatar: {
    url: string;
    alt: string;
  };
  availability: {
    status: 'available' | 'busy' | 'unavailable';
    message?: string;
    nextAvailable?: Date;
  };
  philosophy: string[];
  interests: string[];
}

// Project interface
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  category: ProjectCategory;
  featured: boolean;
  status: 'completed' | 'in-progress' | 'planned' | 'archived';
  
  // Visual assets
  images: {
    thumbnail: string;
    gallery: string[];
    hero?: string;
  };
  
  // Technical details
  technologies: Technology[];
  features: string[];
  challenges?: string[];
  learnings?: string[];
  
  // Links
  links: {
    live?: string;
    github?: string;
    demo?: string;
    case_study?: string;
  };
  
  // Metadata
  startDate: Date;
  endDate?: Date;
  duration?: string;
  teamSize?: number;
  role?: string;
  
  // SEO and display
  slug: string;
  tags: string[];
  priority: number; // For sorting
}

// Technology/Skill interface
export interface Technology {
  name: string;
  category: SkillCategory;
  icon?: string;
  color?: string;
  url?: string;
}

// Skill interface with proficiency
export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: number; // 1-100 proficiency level
  yearsOfExperience: number;
  icon?: string;
  color?: string;
  description?: string;
  certifications?: Certification[];
  projects?: string[]; // Project IDs that use this skill
}

// Experience interface
export interface Experience {
  id: string;
  company: string;
  position: string;
  type: ExperienceType;
  location: {
    city?: string;
    country?: string;
    remote: boolean;
  };
  
  // Duration
  startDate: Date;
  endDate?: Date; // undefined for current position
  duration: string; // Human-readable duration
  
  // Details
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: Technology[];
  
  // Company info
  companyInfo: {
    website?: string;
    logo?: string;
    industry?: string;
    size?: string;
  };
  
  // Display
  featured: boolean;
  order: number;
}

// Education interface
export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: Date;
  endDate?: Date;
  gpa?: number;
  honors?: string[];
  relevantCourses?: string[];
  projects?: string[];
  location: {
    city: string;
    country: string;
  };
}

// Certification interface
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  issueDate: Date;
  expiryDate?: Date;
  credentialId?: string;
  credentialUrl?: string;
  badge?: string;
  skills: string[]; // Related skill names
}

// Contact information interface
export interface ContactInfo {
  email: string;
  phone?: string;
  location: {
    city: string;
    country: string;
    timezone: string;
  };
  social: SocialLink[];
  availability: {
    status: 'available' | 'busy' | 'unavailable';
    message?: string;
    preferredContactMethod: ContactMethod;
    responseTime: string; // e.g., "within 24 hours"
  };
}

// Social media link interface
export interface SocialLink {
  platform: string;
  url: string;
  username: string;
  icon?: string;
  primary: boolean; // For highlighting main social profiles
}

// Testimonial interface
export interface Testimonial {
  id: string;
  name: string;
  position: string;
  company: string;
  content: string;
  avatar?: string;
  rating?: number; // 1-5 stars
  date: Date;
  featured: boolean;
  projectId?: string; // Related project if applicable
}

// Blog post interface for external posts (Medium, etc.)
export interface BlogPost {
  id: string;
  title: string;
  slug?: string; // Optional for external posts
  excerpt?: string;
  content?: string; // Optional for external posts
  url: string; // External URL for Medium posts
  platform: 'medium' | 'dev' | 'hashnode' | 'personal';
  publishDate: Date;
  lastModified?: Date;
  tags: string[];
  category: string;
  featured: boolean;
  readTime?: number; // in minutes
  gradient?: string; // CSS gradient for card styling
  image?: {
    url: string;
    alt: string;
  };
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

// Main portfolio data interface
export interface PortfolioData {
  personal: PersonalInfo;
  projects: Project[];
  featuredPosts: BlogPost[]; // Featured blog posts from Medium
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  certifications: Certification[];
  testimonials: Testimonial[];
  contact: ContactInfo;
  
  // Optional sections
  blog?: BlogPost[];
  
  // Metadata
  lastUpdated: Date;
  version: string;
}

// API response interfaces
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: Date;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Form interfaces for contact and other forms
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  company?: string;
  phone?: string;
  projectType?: ProjectCategory;
  budget?: string;
  timeline?: string;
  source?: string; // How they found the portfolio
}

export interface NewsletterSubscription {
  email: string;
  name?: string;
  interests?: string[];
  source?: string;
}

// Filter and search interfaces
export interface ProjectFilters {
  categories?: ProjectCategory[];
  technologies?: string[];
  featured?: boolean;
  status?: Project['status'][];
  dateRange?: {
    start: Date;
    end: Date;
  };
}

export interface SkillFilters {
  categories?: SkillCategory[];
  minLevel?: number;
  maxLevel?: number;
  minExperience?: number;
}

export interface SearchQuery {
  query: string;
  filters?: {
    projects?: ProjectFilters;
    skills?: SkillFilters;
  };
  sortBy?: 'relevance' | 'date' | 'name' | 'priority';
  sortOrder?: 'asc' | 'desc';
}

// Animation and UI state interfaces
export interface AnimationConfig {
  enabled: boolean;
  reducedMotion: boolean;
  duration: 'fast' | 'medium' | 'slow';
  easing: 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';
}

export interface UIState {
  theme: 'light' | 'dark' | 'auto';
  animations: AnimationConfig;
  navigation: {
    isOpen: boolean;
    activeSection: string;
  };
  modals: {
    [key: string]: boolean;
  };
  loading: {
    [key: string]: boolean;
  };
}

// Utility types
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Type guards
export const isProject = (item: unknown): item is Project => {
  return item !== null && typeof item === 'object' && 'id' in item && 'title' in item && 
         typeof (item as Record<string, unknown>).id === 'string' && 
         typeof (item as Record<string, unknown>).title === 'string';
};

export const isSkill = (item: unknown): item is Skill => {
  return item !== null && typeof item === 'object' && 'id' in item && 'name' in item && 'level' in item &&
         typeof (item as Record<string, unknown>).id === 'string' && 
         typeof (item as Record<string, unknown>).name === 'string' && 
         typeof (item as Record<string, unknown>).level === 'number';
};

export const isExperience = (item: unknown): item is Experience => {
  return item !== null && typeof item === 'object' && 'id' in item && 'company' in item &&
         typeof (item as Record<string, unknown>).id === 'string' && 
         typeof (item as Record<string, unknown>).company === 'string';
};

// Default values and constants
export const DEFAULT_ANIMATION_CONFIG: AnimationConfig = {
  enabled: true,
  reducedMotion: false,
  duration: 'medium',
  easing: 'ease-out',
};

export const PROJECT_CATEGORIES: Record<ProjectCategory, string> = {
  'web-app': 'Web Application',
  'mobile-app': 'Mobile Application',
  'api': 'API/Backend',
  'library': 'Library/Package',
  'tool': 'Developer Tool',
  'design-system': 'Design System',
  'other': 'Other',
};

export const SKILL_CATEGORIES: Record<SkillCategory, string> = {
  'frontend': 'Frontend Development',
  'backend': 'Backend Development',
  'mobile': 'Mobile Development',
  'devops': 'DevOps/Infrastructure',
  'design': 'Design/UX',
  'database': 'Database',
  'testing': 'Testing/QA',
  'other': 'Other',
};