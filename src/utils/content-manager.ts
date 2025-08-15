/**
 * Content Management Utilities
 * Provides functions for managing and updating portfolio content
 */

import { PortfolioData, Project, BlogPost, Skill, Experience, PersonalInfo } from '@/types/portfolio';
import { portfolioData } from '@/data/portfolio';

// Content Manager Class
export class ContentManager {
  private data: PortfolioData;

  constructor(initialData: PortfolioData = portfolioData) {
    this.data = { ...initialData };
  }

  // Personal Information Management
  updatePersonalInfo(updates: Partial<PersonalInfo>): PersonalInfo {
    this.data.personal = { ...this.data.personal, ...updates };
    this.updateLastModified();
    return this.data.personal;
  }

  getPersonalInfo(): PersonalInfo {
    return this.data.personal;
  }

  // Project Management
  addProject(project: Project): Project[] {
    this.data.projects.push(project);
    this.updateLastModified();
    return this.data.projects;
  }

  updateProject(projectId: string, updates: Partial<Project>): Project | null {
    const projectIndex = this.data.projects.findIndex(p => p.id === projectId);
    if (projectIndex === -1) return null;

    this.data.projects[projectIndex] = { ...this.data.projects[projectIndex], ...updates };
    this.updateLastModified();
    return this.data.projects[projectIndex];
  }

  removeProject(projectId: string): boolean {
    const initialLength = this.data.projects.length;
    this.data.projects = this.data.projects.filter(p => p.id !== projectId);
    
    if (this.data.projects.length < initialLength) {
      this.updateLastModified();
      return true;
    }
    return false;
  }

  getProjects(featured?: boolean): Project[] {
    if (featured !== undefined) {
      return this.data.projects.filter(p => p.featured === featured);
    }
    return this.data.projects;
  }

  getProjectById(projectId: string): Project | null {
    return this.data.projects.find(p => p.id === projectId) || null;
  }

  // Featured Posts Management
  addFeaturedPost(post: BlogPost): BlogPost[] {
    this.data.featuredPosts.push(post);
    this.updateLastModified();
    return this.data.featuredPosts;
  }

  updateFeaturedPost(postId: string, updates: Partial<BlogPost>): BlogPost | null {
    const postIndex = this.data.featuredPosts.findIndex(p => p.id === postId);
    if (postIndex === -1) return null;

    this.data.featuredPosts[postIndex] = { ...this.data.featuredPosts[postIndex], ...updates };
    this.updateLastModified();
    return this.data.featuredPosts[postIndex];
  }

  removeFeaturedPost(postId: string): boolean {
    const initialLength = this.data.featuredPosts.length;
    this.data.featuredPosts = this.data.featuredPosts.filter(p => p.id !== postId);
    
    if (this.data.featuredPosts.length < initialLength) {
      this.updateLastModified();
      return true;
    }
    return false;
  }

  getFeaturedPosts(): BlogPost[] {
    return this.data.featuredPosts;
  }

  getFeaturedPostById(postId: string): BlogPost | null {
    return this.data.featuredPosts.find(p => p.id === postId) || null;
  }

  // Skills Management
  addSkill(skill: Skill): Skill[] {
    this.data.skills.push(skill);
    this.updateLastModified();
    return this.data.skills;
  }

  updateSkill(skillId: string, updates: Partial<Skill>): Skill | null {
    const skillIndex = this.data.skills.findIndex(s => s.id === skillId);
    if (skillIndex === -1) return null;

    this.data.skills[skillIndex] = { ...this.data.skills[skillIndex], ...updates };
    this.updateLastModified();
    return this.data.skills[skillIndex];
  }

  removeSkill(skillId: string): boolean {
    const initialLength = this.data.skills.length;
    this.data.skills = this.data.skills.filter(s => s.id !== skillId);
    
    if (this.data.skills.length < initialLength) {
      this.updateLastModified();
      return true;
    }
    return false;
  }

  getSkills(category?: string): Skill[] {
    if (category) {
      return this.data.skills.filter(s => s.category === category);
    }
    return this.data.skills;
  }

  getSkillById(skillId: string): Skill | null {
    return this.data.skills.find(s => s.id === skillId) || null;
  }

  // Experience Management
  addExperience(experience: Experience): Experience[] {
    this.data.experience.push(experience);
    this.updateLastModified();
    return this.data.experience;
  }

  updateExperience(experienceId: string, updates: Partial<Experience>): Experience | null {
    const expIndex = this.data.experience.findIndex(e => e.id === experienceId);
    if (expIndex === -1) return null;

    this.data.experience[expIndex] = { ...this.data.experience[expIndex], ...updates };
    this.updateLastModified();
    return this.data.experience[expIndex];
  }

  removeExperience(experienceId: string): boolean {
    const initialLength = this.data.experience.length;
    this.data.experience = this.data.experience.filter(e => e.id !== experienceId);
    
    if (this.data.experience.length < initialLength) {
      this.updateLastModified();
      return true;
    }
    return false;
  }

  getExperience(featured?: boolean): Experience[] {
    if (featured !== undefined) {
      return this.data.experience.filter(e => e.featured === featured);
    }
    return this.data.experience.sort((a, b) => a.order - b.order);
  }

  getExperienceById(experienceId: string): Experience | null {
    return this.data.experience.find(e => e.id === experienceId) || null;
  }

  // Utility Methods
  private updateLastModified(): void {
    this.data.lastUpdated = new Date();
  }

  getFullData(): PortfolioData {
    return { ...this.data };
  }

  exportData(): string {
    return JSON.stringify(this.data, null, 2);
  }

  importData(jsonData: string): boolean {
    try {
      const parsedData = JSON.parse(jsonData) as PortfolioData;
      this.data = parsedData;
      this.updateLastModified();
      return true;
    } catch (error) {
      console.error('Failed to import data:', error);
      return false;
    }
  }

  // Search and Filter Methods
  searchProjects(query: string): Project[] {
    const lowercaseQuery = query.toLowerCase();
    return this.data.projects.filter(project =>
      project.title.toLowerCase().includes(lowercaseQuery) ||
      project.description.toLowerCase().includes(lowercaseQuery) ||
      project.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
      project.technologies.some(tech => tech.name.toLowerCase().includes(lowercaseQuery))
    );
  }

  searchFeaturedPosts(query: string): BlogPost[] {
    const lowercaseQuery = query.toLowerCase();
    return this.data.featuredPosts.filter(post =>
      post.title.toLowerCase().includes(lowercaseQuery) ||
      (post.excerpt && post.excerpt.toLowerCase().includes(lowercaseQuery)) ||
      post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  }

  getProjectsByTechnology(technology: string): Project[] {
    return this.data.projects.filter(project =>
      project.technologies.some(tech => 
        tech.name.toLowerCase() === technology.toLowerCase()
      )
    );
  }

  getSkillsByCategory(category: string): Skill[] {
    return this.data.skills.filter(skill => skill.category === category);
  }

  // Statistics Methods
  getProjectCount(): number {
    return this.data.projects.length;
  }

  getFeaturedProjectCount(): number {
    return this.data.projects.filter(p => p.featured).length;
  }

  getFeaturedPostCount(): number {
    return this.data.featuredPosts.length;
  }

  getSkillCount(): number {
    return this.data.skills.length;
  }

  getExperienceCount(): number {
    return this.data.experience.length;
  }

  getTotalYearsOfExperience(): number {
    return Math.max(...this.data.skills.map(skill => skill.yearsOfExperience));
  }

  // Validation Methods
  validateProject(project: Partial<Project>): string[] {
    const errors: string[] = [];
    
    if (!project.title) errors.push('Project title is required');
    if (!project.description) errors.push('Project description is required');
    if (!project.category) errors.push('Project category is required');
    if (!project.technologies || project.technologies.length === 0) {
      errors.push('At least one technology is required');
    }
    
    return errors;
  }

  validateBlogPost(post: Partial<BlogPost>): string[] {
    const errors: string[] = [];
    
    if (!post.title) errors.push('Post title is required');
    if (!post.url) errors.push('Post URL is required');
    if (!post.platform) errors.push('Post platform is required');
    
    return errors;
  }

  validateSkill(skill: Partial<Skill>): string[] {
    const errors: string[] = [];
    
    if (!skill.name) errors.push('Skill name is required');
    if (!skill.category) errors.push('Skill category is required');
    if (skill.level !== undefined && (skill.level < 1 || skill.level > 100)) {
      errors.push('Skill level must be between 1 and 100');
    }
    
    return errors;
  }
}

// Create a singleton instance
export const contentManager = new ContentManager();

// Helper functions for easy access
export const getPersonalInfo = () => contentManager.getPersonalInfo();
export const getFeaturedProjects = () => contentManager.getProjects(true);
export const getAllProjects = () => contentManager.getProjects();
export const getFeaturedPosts = () => contentManager.getFeaturedPosts();
export const getSkills = (category?: string) => contentManager.getSkills(category);
export const getExperience = (featured?: boolean) => contentManager.getExperience(featured);
export const getContactInfo = () => contentManager.getFullData().contact;

// Export default instance
export default contentManager;