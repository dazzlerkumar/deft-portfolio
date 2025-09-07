import { describe, it, expect } from 'vitest';
import { 
  projectData, 
  getProjectsByChapter, 
  getFeaturedProjects, 
  getProjectsByCategory 
} from '../project-data';
import { Project, ProjectCategory } from '@/lib/types/project';

describe('Project Data', () => {
  describe('projectData', () => {
    it('contains valid project objects', () => {
      const projects = Object.values(projectData);
      
      expect(projects.length).toBeGreaterThan(0);
      
      projects.forEach((project: Project) => {
        expect(project).toHaveProperty('id');
        expect(project).toHaveProperty('title');
        expect(project).toHaveProperty('description');
        expect(project).toHaveProperty('storyIntegration');
        expect(project).toHaveProperty('technologies');
        expect(project).toHaveProperty('images');
        expect(project).toHaveProperty('impact');
        expect(project).toHaveProperty('featured');
        expect(project).toHaveProperty('category');
        
        expect(typeof project.id).toBe('string');
        expect(typeof project.title).toBe('string');
        expect(typeof project.description).toBe('string');
        expect(typeof project.storyIntegration).toBe('string');
        expect(Array.isArray(project.technologies)).toBe(true);
        expect(Array.isArray(project.images)).toBe(true);
        expect(typeof project.impact).toBe('object');
        expect(typeof project.featured).toBe('boolean');
        expect(typeof project.category).toBe('string');
      });
    });

    it('has projects with valid technology objects', () => {
      const projects = Object.values(projectData);
      
      projects.forEach((project: Project) => {
        project.technologies.forEach((tech) => {
          expect(tech).toHaveProperty('name');
          expect(tech).toHaveProperty('category');
          expect(tech).toHaveProperty('proficiency');
          
          expect(typeof tech.name).toBe('string');
          expect(['frontend', 'backend', 'database', 'tool', 'cloud']).toContain(tech.category);
          expect(['beginner', 'intermediate', 'advanced', 'expert']).toContain(tech.proficiency);
        });
      });
    });

    it('has projects with valid impact metrics', () => {
      const projects = Object.values(projectData);
      
      projects.forEach((project: Project) => {
        expect(project.impact).toHaveProperty('timeframe');
        expect(typeof project.impact.timeframe).toBe('string');
        
        if (project.impact.userReach) {
          expect(typeof project.impact.userReach).toBe('number');
          expect(project.impact.userReach).toBeGreaterThan(0);
        }
        
        if (project.impact.teamSize) {
          expect(typeof project.impact.teamSize).toBe('number');
          expect(project.impact.teamSize).toBeGreaterThan(0);
        }
        
        if (project.impact.performanceImprovement) {
          expect(typeof project.impact.performanceImprovement).toBe('string');
        }
        
        if (project.impact.businessValue) {
          expect(typeof project.impact.businessValue).toBe('string');
        }
      });
    });

    it('has valid project categories', () => {
      const projects = Object.values(projectData);
      const validCategories: ProjectCategory[] = [
        'web-application',
        'mobile-app',
        'library',
        'tool',
        'experiment',
        'leadership'
      ];
      
      projects.forEach((project: Project) => {
        expect(validCategories).toContain(project.category);
      });
    });

    it('has projects with valid URLs when provided', () => {
      const projects = Object.values(projectData);
      
      projects.forEach((project: Project) => {
        if (project.demoUrl) {
          expect(project.demoUrl).toMatch(/^https?:\/\/.+/);
        }
        
        if (project.codeUrl) {
          expect(project.codeUrl).toMatch(/^https?:\/\/.+/);
        }
      });
    });
  });

  describe('getProjectsByChapter', () => {
    it('returns correct projects for chapter 1', () => {
      const chapter1Projects = getProjectsByChapter('1');
      
      expect(chapter1Projects).toHaveLength(3);
      expect(chapter1Projects.map(p => p.id)).toEqual([
        'first-website',
        'javascript-calculator',
        'react-todo'
      ]);
    });

    it('returns correct projects for chapter 2', () => {
      const chapter2Projects = getProjectsByChapter('2');
      
      expect(chapter2Projects).toHaveLength(2);
      expect(chapter2Projects.map(p => p.id)).toEqual([
        'ecommerce-platform',
        'performance-optimization'
      ]);
    });

    it('returns correct projects for chapter 3', () => {
      const chapter3Projects = getProjectsByChapter('3');
      
      expect(chapter3Projects).toHaveLength(1);
      expect(chapter3Projects.map(p => p.id)).toEqual(['design-system']);
    });

    it('returns empty array for chapter 4', () => {
      const chapter4Projects = getProjectsByChapter('4');
      
      expect(chapter4Projects).toHaveLength(0);
    });

    it('returns empty array for non-existent chapter', () => {
      const nonExistentProjects = getProjectsByChapter('999');
      
      expect(nonExistentProjects).toHaveLength(0);
    });

    it('filters out undefined projects', () => {
      // This tests the .filter(Boolean) in the implementation
      const projects = getProjectsByChapter('1');
      
      projects.forEach(project => {
        expect(project).toBeDefined();
        expect(project).not.toBeNull();
      });
    });
  });

  describe('getFeaturedProjects', () => {
    it('returns only featured projects', () => {
      const featuredProjects = getFeaturedProjects();
      
      expect(featuredProjects.length).toBeGreaterThan(0);
      featuredProjects.forEach(project => {
        expect(project.featured).toBe(true);
      });
    });

    it('includes expected featured projects', () => {
      const featuredProjects = getFeaturedProjects();
      const featuredIds = featuredProjects.map(p => p.id);
      
      expect(featuredIds).toContain('first-website');
      expect(featuredIds).toContain('react-todo');
      expect(featuredIds).toContain('ecommerce-platform');
      expect(featuredIds).toContain('design-system');
      expect(featuredIds).toContain('performance-optimization');
    });

    it('excludes non-featured projects', () => {
      const featuredProjects = getFeaturedProjects();
      const featuredIds = featuredProjects.map(p => p.id);
      
      expect(featuredIds).not.toContain('javascript-calculator');
    });
  });

  describe('getProjectsByCategory', () => {
    it('returns projects for web-application category', () => {
      const webApps = getProjectsByCategory('web-application');
      
      expect(webApps.length).toBeGreaterThan(0);
      webApps.forEach(project => {
        expect(project.category).toBe('web-application');
      });
    });

    it('returns projects for library category', () => {
      const libraries = getProjectsByCategory('library');
      
      expect(libraries.length).toBeGreaterThan(0);
      libraries.forEach(project => {
        expect(project.category).toBe('library');
      });
    });

    it('returns projects for tool category', () => {
      const tools = getProjectsByCategory('tool');
      
      expect(tools.length).toBeGreaterThan(0);
      tools.forEach(project => {
        expect(project.category).toBe('tool');
      });
    });

    it('returns projects for leadership category', () => {
      const leadership = getProjectsByCategory('leadership');
      
      expect(leadership.length).toBeGreaterThan(0);
      leadership.forEach(project => {
        expect(project.category).toBe('leadership');
      });
    });

    it('returns empty array for non-existent category', () => {
      const nonExistent = getProjectsByCategory('non-existent' as ProjectCategory);
      
      expect(nonExistent).toHaveLength(0);
    });

    it('includes expected projects in correct categories', () => {
      const webApps = getProjectsByCategory('web-application');
      const webAppIds = webApps.map(p => p.id);
      
      expect(webAppIds).toContain('first-website');
      expect(webAppIds).toContain('react-todo');
      expect(webAppIds).toContain('ecommerce-platform');
      
      const libraries = getProjectsByCategory('library');
      const libraryIds = libraries.map(p => p.id);
      
      expect(libraryIds).toContain('design-system');
      
      const tools = getProjectsByCategory('tool');
      const toolIds = tools.map(p => p.id);
      
      expect(toolIds).toContain('javascript-calculator');
    });
  });

  describe('Data Consistency', () => {
    it('has unique project IDs', () => {
      const projects = Object.values(projectData);
      const ids = projects.map(p => p.id);
      const uniqueIds = [...new Set(ids)];
      
      expect(ids.length).toBe(uniqueIds.length);
    });

    it('has consistent ID keys and project.id values', () => {
      Object.entries(projectData).forEach(([key, project]) => {
        expect(key).toBe(project.id);
      });
    });

    it('has at least one project in each major category', () => {
      const categories = ['web-application', 'library', 'tool', 'leadership'];
      
      categories.forEach(category => {
        const projectsInCategory = getProjectsByCategory(category as ProjectCategory);
        expect(projectsInCategory.length).toBeGreaterThan(0);
      });
    });

    it('has a mix of featured and non-featured projects', () => {
      const projects = Object.values(projectData);
      const featuredCount = projects.filter(p => p.featured).length;
      const nonFeaturedCount = projects.filter(p => !p.featured).length;
      
      expect(featuredCount).toBeGreaterThan(0);
      expect(nonFeaturedCount).toBeGreaterThan(0);
    });

    it('has projects with various technology categories', () => {
      const projects = Object.values(projectData);
      const allTechs = projects.flatMap(p => p.technologies);
      const categories = [...new Set(allTechs.map(t => t.category))];
      
      expect(categories).toContain('frontend');
      expect(categories).toContain('backend');
      expect(categories.length).toBeGreaterThan(2);
    });
  });
});