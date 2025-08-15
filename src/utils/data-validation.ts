/**
 * Data Validation Utilities
 * Provides validation functions for portfolio data structures
 */

import { 
  PortfolioData, 
  PersonalInfo, 
  Project, 
  BlogPost, 
  Skill, 
  Experience,
  ProjectCategory,
  SkillCategory 
} from '@/types/portfolio';

// Validation result interface
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

// Personal Info Validation
export function validatePersonalInfo(personalInfo: Partial<PersonalInfo>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields
  if (!personalInfo.name) errors.push('Name is required');
  if (!personalInfo.title) errors.push('Title is required');
  if (!personalInfo.company) errors.push('Company is required');
  if (!personalInfo.bio) errors.push('Bio is required');

  // Optional but recommended fields
  if (!personalInfo.nameHindi) warnings.push('Hindi name is recommended for bilingual support');
  if (!personalInfo.tagline) warnings.push('Tagline is recommended');
  if (!personalInfo.avatar?.url) warnings.push('Avatar URL is recommended');

  // Location validation
  if (personalInfo.location) {
    if (!personalInfo.location.city) errors.push('Location city is required');
    if (!personalInfo.location.country) errors.push('Location country is required');
    if (!personalInfo.location.timezone) errors.push('Location timezone is required');
  } else {
    errors.push('Location information is required');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

// Project Validation
export function validateProject(project: Partial<Project>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields
  if (!project.id) errors.push('Project ID is required');
  if (!project.title) errors.push('Project title is required');
  if (!project.description) errors.push('Project description is required');
  if (!project.category) errors.push('Project category is required');
  if (!project.slug) errors.push('Project slug is required');

  // Technology validation
  if (!project.technologies || project.technologies.length === 0) {
    errors.push('At least one technology is required');
  }

  // Images validation
  if (!project.images?.thumbnail) errors.push('Project thumbnail image is required');
  if (!project.images?.gallery || project.images.gallery.length === 0) {
    warnings.push('Project gallery images are recommended');
  }

  // Links validation
  if (!project.links?.live && !project.links?.github && !project.links?.demo) {
    warnings.push('At least one project link (live, github, or demo) is recommended');
  }

  // Date validation
  if (!project.startDate) errors.push('Project start date is required');
  if (project.startDate && project.endDate && project.startDate > project.endDate) {
    errors.push('Project start date cannot be after end date');
  }

  // Priority validation
  if (project.priority !== undefined && (project.priority < 1 || project.priority > 10)) {
    errors.push('Project priority must be between 1 and 10');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

// Blog Post Validation
export function validateBlogPost(post: Partial<BlogPost>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields
  if (!post.id) errors.push('Post ID is required');
  if (!post.title) errors.push('Post title is required');
  if (!post.url) errors.push('Post URL is required');
  if (!post.platform) errors.push('Post platform is required');
  if (!post.publishDate) errors.push('Post publish date is required');

  // URL validation
  if (post.url && !isValidUrl(post.url)) {
    errors.push('Post URL must be a valid URL');
  }

  // Platform validation
  const validPlatforms = ['medium', 'dev', 'hashnode', 'personal'];
  if (post.platform && !validPlatforms.includes(post.platform)) {
    errors.push(`Post platform must be one of: ${validPlatforms.join(', ')}`);
  }

  // Optional but recommended fields
  if (!post.excerpt) warnings.push('Post excerpt is recommended');
  if (!post.tags || post.tags.length === 0) warnings.push('Post tags are recommended');
  if (!post.readTime) warnings.push('Post read time is recommended');
  if (!post.gradient) warnings.push('Post gradient is recommended for styling');

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

// Skill Validation
export function validateSkill(skill: Partial<Skill>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields
  if (!skill.id) errors.push('Skill ID is required');
  if (!skill.name) errors.push('Skill name is required');
  if (!skill.category) errors.push('Skill category is required');

  // Level validation
  if (skill.level === undefined) {
    errors.push('Skill level is required');
  } else if (skill.level < 1 || skill.level > 100) {
    errors.push('Skill level must be between 1 and 100');
  }

  // Years of experience validation
  if (skill.yearsOfExperience === undefined) {
    errors.push('Years of experience is required');
  } else if (skill.yearsOfExperience < 0 || skill.yearsOfExperience > 50) {
    errors.push('Years of experience must be between 0 and 50');
  }

  // Category validation
  const validCategories: SkillCategory[] = [
    'frontend', 'backend', 'mobile', 'devops', 'design', 'database', 'testing', 'other'
  ];
  if (skill.category && !validCategories.includes(skill.category)) {
    errors.push(`Skill category must be one of: ${validCategories.join(', ')}`);
  }

  // Optional but recommended fields
  if (!skill.description) warnings.push('Skill description is recommended');
  if (!skill.icon) warnings.push('Skill icon is recommended');

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

// Experience Validation
export function validateExperience(experience: Partial<Experience>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Required fields
  if (!experience.id) errors.push('Experience ID is required');
  if (!experience.company) errors.push('Company name is required');
  if (!experience.position) errors.push('Position is required');
  if (!experience.startDate) errors.push('Start date is required');
  if (!experience.description) errors.push('Description is required');

  // Date validation
  if (experience.startDate && experience.endDate && experience.startDate > experience.endDate) {
    errors.push('Start date cannot be after end date');
  }

  // Duration validation
  if (!experience.duration) errors.push('Duration is required');

  // Location validation
  if (experience.location && !experience.location.remote && !experience.location.city) {
    errors.push('City is required for non-remote positions');
  }

  // Optional but recommended fields
  if (!experience.responsibilities || experience.responsibilities.length === 0) {
    warnings.push('Responsibilities are recommended');
  }
  if (!experience.achievements || experience.achievements.length === 0) {
    warnings.push('Achievements are recommended');
  }
  if (!experience.technologies || experience.technologies.length === 0) {
    warnings.push('Technologies used are recommended');
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

// Full Portfolio Data Validation
export function validatePortfolioData(data: Partial<PortfolioData>): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate personal info
  if (data.personal) {
    const personalValidation = validatePersonalInfo(data.personal);
    errors.push(...personalValidation.errors.map(e => `Personal Info: ${e}`));
    warnings.push(...personalValidation.warnings.map(w => `Personal Info: ${w}`));
  } else {
    errors.push('Personal information is required');
  }

  // Validate projects
  if (data.projects) {
    data.projects.forEach((project, index) => {
      const projectValidation = validateProject(project);
      errors.push(...projectValidation.errors.map(e => `Project ${index + 1}: ${e}`));
      warnings.push(...projectValidation.warnings.map(w => `Project ${index + 1}: ${w}`));
    });
  } else {
    warnings.push('Projects are recommended');
  }

  // Validate featured posts
  if (data.featuredPosts) {
    data.featuredPosts.forEach((post, index) => {
      const postValidation = validateBlogPost(post);
      errors.push(...postValidation.errors.map(e => `Featured Post ${index + 1}: ${e}`));
      warnings.push(...postValidation.warnings.map(w => `Featured Post ${index + 1}: ${w}`));
    });
  } else {
    warnings.push('Featured posts are recommended');
  }

  // Validate skills
  if (data.skills) {
    data.skills.forEach((skill, index) => {
      const skillValidation = validateSkill(skill);
      errors.push(...skillValidation.errors.map(e => `Skill ${index + 1}: ${e}`));
      warnings.push(...skillValidation.warnings.map(w => `Skill ${index + 1}: ${w}`));
    });
  } else {
    warnings.push('Skills are recommended');
  }

  // Validate experience
  if (data.experience) {
    data.experience.forEach((exp, index) => {
      const expValidation = validateExperience(exp);
      errors.push(...expValidation.errors.map(e => `Experience ${index + 1}: ${e}`));
      warnings.push(...expValidation.warnings.map(w => `Experience ${index + 1}: ${w}`));
    });
  } else {
    warnings.push('Experience is recommended');
  }

  // Check for required metadata
  if (!data.lastUpdated) warnings.push('Last updated timestamp is recommended');
  if (!data.version) warnings.push('Version number is recommended');

  return {
    isValid: errors.length === 0,
    errors,
    warnings
  };
}

// Utility Functions
function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}