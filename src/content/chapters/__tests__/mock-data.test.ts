import { describe, it, expect } from 'vitest';
import { 
  getMockStoryContent, 
  getMockProjects, 
  getMockChapter,
  mockStoryContent,
  mockProjects,
  mockChapters
} from '../mock-data';

describe('Mock Data', () => {
  describe('getMockStoryContent', () => {
    it('should return complete story content structure', () => {
      const storyContent = getMockStoryContent();
      
      expect(storyContent.chapters).toHaveLength(4);
      expect(storyContent.globalTheme).toBeDefined();
      expect(storyContent.userProgress).toBeDefined();
      expect(storyContent.chapters[0].title).toBe('The Beginning');
      expect(storyContent.chapters[3].title).toBe('The Vision');
    });

    it('should have valid chapter structure', () => {
      const storyContent = getMockStoryContent();
      
      storyContent.chapters.forEach(chapter => {
        expect(chapter.id).toBeDefined();
        expect(chapter.title).toBeDefined();
        expect(Array.isArray(chapter.content)).toBe(true);
        expect(Array.isArray(chapter.projects)).toBe(true);
        expect(Array.isArray(chapter.visualElements)).toBe(true);
        expect(Array.isArray(chapter.interactiveElements)).toBe(true);
      });
    });
  });

  describe('getMockProjects', () => {
    it('should return array of valid projects', () => {
      const projects = getMockProjects();
      
      expect(projects).toHaveLength(3);
      expect(projects[0].title).toBe('E-commerce Platform Redesign');
      expect(projects[1].title).toBe('Design System Library');
      expect(projects[2].title).toBe('Real-time Collaboration Tool');
    });

    it('should have valid project structure', () => {
      const projects = getMockProjects();
      
      projects.forEach(project => {
        expect(project.id).toBeDefined();
        expect(project.title).toBeDefined();
        expect(project.description).toBeDefined();
        expect(project.storyIntegration).toBeDefined();
        expect(Array.isArray(project.technologies)).toBe(true);
        expect(Array.isArray(project.images)).toBe(true);
        expect(project.impact).toBeDefined();
        expect(project.impact.timeframe).toBeDefined();
        expect(typeof project.featured).toBe('boolean');
        expect(project.category).toBeDefined();
      });
    });
  });

  describe('getMockChapter', () => {
    it('should return specific chapter by ID', () => {
      const chapter1 = getMockChapter('chapter-1');
      const chapter2 = getMockChapter('chapter-2');
      
      expect(chapter1?.title).toBe('The Beginning');
      expect(chapter2?.title).toBe('The Challenges');
    });

    it('should return undefined for non-existent chapter', () => {
      const nonExistent = getMockChapter('chapter-999');
      expect(nonExistent).toBeUndefined();
    });
  });

  describe('Mock Data Consistency', () => {
    it('should have consistent project references across chapters', () => {
      const projects = getMockProjects();
      const projectIds = projects.map(p => p.id);
      
      mockChapters.forEach((chapter) => {
        chapter.projects.forEach((project) => {
          expect(projectIds).toContain(project.id);
        });
      });
    });

    it('should have valid technology categories and proficiencies', () => {
      const validCategories = ['frontend', 'backend', 'database', 'tool', 'cloud'];
      const validProficiencies = ['beginner', 'intermediate', 'advanced', 'expert'];
      
      mockProjects.forEach((project) => {
        project.technologies.forEach((tech) => {
          expect(validCategories).toContain(tech.category);
          expect(validProficiencies).toContain(tech.proficiency);
        });
      });
    });

    it('should have valid project categories', () => {
      const validCategories = [
        'web-application', 'mobile-app', 'library', 'tool', 'experiment', 'leadership'
      ];
      
      mockProjects.forEach((project) => {
        expect(validCategories).toContain(project.category);
      });
    });

    it('should have valid user progress data', () => {
      const userProgress = mockStoryContent.userProgress;
      
      expect(userProgress.currentChapter).toBeGreaterThan(0);
      expect(userProgress.currentChapter).toBeLessThanOrEqual(mockChapters.length);
      expect(userProgress.completionPercentage).toBeGreaterThanOrEqual(0);
      expect(userProgress.completionPercentage).toBeLessThanOrEqual(100);
      expect(userProgress.lastVisit).toBeInstanceOf(Date);
    });
  });
});