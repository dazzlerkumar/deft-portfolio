/**
 * Data Layer Index
 * Exports all portfolio data and utilities
 */

// Main portfolio data
export { 
  portfolioData,
  personalInfo,
  featuredProjects,
  featuredPosts,
  experience,
  skills,
  contactInfo
} from './portfolio';

// Content management utilities
export {
  ContentManager,
  contentManager,
  getPersonalInfo,
  getFeaturedProjects,
  getAllProjects,
  getFeaturedPosts,
  getSkills,
  getExperience,
  getContactInfo
} from '../utils/content-manager';

// Data validation utilities
export {
  validatePersonalInfo,
  validateProject,
  validateBlogPost,
  validateSkill,
  validateExperience,
  validatePortfolioData,
  type ValidationResult
} from '../utils/data-validation';

// Re-export types for convenience
export type {
  PortfolioData,
  PersonalInfo,
  Project,
  BlogPost,
  Skill,
  Experience,
  ContactInfo,
  Technology,
  ProjectCategory,
  SkillCategory
} from '../types/portfolio';