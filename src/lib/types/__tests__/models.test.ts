import { describe, it, expect } from 'vitest';
import { 
  StoryContent, 
  Chapter, 
  Project, 
  UserProgress, 
  UserInteraction,
  Technology,
  ImpactMetrics
} from '../index';

describe('Data Models', () => {
  describe('Project Model', () => {
    it('should create a valid project with all required fields', () => {
      const project: Project = {
        id: 'test-project',
        title: 'Test Project',
        description: 'A test project description',
        storyIntegration: 'How this project fits into the story',
        technologies: [
          {
            name: 'React',
            category: 'frontend',
            proficiency: 'expert'
          }
        ],
        images: ['image1.jpg'],
        impact: {
          timeframe: '6 months'
        },
        featured: true,
        category: 'web-application'
      };

      expect(project.id).toBe('test-project');
      expect(project.technologies).toHaveLength(1);
      expect(project.technologies[0].name).toBe('React');
      expect(project.category).toBe('web-application');
    });

    it('should handle optional fields correctly', () => {
      const project: Project = {
        id: 'minimal-project',
        title: 'Minimal Project',
        description: 'Description',
        storyIntegration: 'Integration',
        technologies: [],
        images: [],
        impact: { timeframe: '1 month' },
        featured: false,
        category: 'experiment'
      };

      expect(project.demoUrl).toBeUndefined();
      expect(project.codeUrl).toBeUndefined();
      expect(project.impact.userReach).toBeUndefined();
    });
  });

  describe('Technology Model', () => {
    it('should validate technology categories', () => {
      const validCategories: Technology['category'][] = [
        'frontend', 'backend', 'database', 'tool', 'cloud'
      ];

      validCategories.forEach(category => {
        const tech: Technology = {
          name: 'Test Tech',
          category,
          proficiency: 'intermediate'
        };
        expect(tech.category).toBe(category);
      });
    });

    it('should validate proficiency levels', () => {
      const validProficiencies: Technology['proficiency'][] = [
        'beginner', 'intermediate', 'advanced', 'expert'
      ];

      validProficiencies.forEach(proficiency => {
        const tech: Technology = {
          name: 'Test Tech',
          category: 'frontend',
          proficiency
        };
        expect(tech.proficiency).toBe(proficiency);
      });
    });
  });

  describe('Chapter Model', () => {
    it('should create a valid chapter structure', () => {
      const chapter: Chapter = {
        id: 'chapter-1',
        title: 'Test Chapter',
        subtitle: 'Test Subtitle',
        content: [
          {
            id: 'block-1',
            type: 'text',
            content: 'Test content',
            metadata: {}
          }
        ],
        visualElements: [
          {
            id: 'visual-1',
            type: '3d',
            config: { model: 'tree' },
            fallback: 'tree.svg'
          }
        ],
        projects: [],
        interactiveElements: [
          {
            id: 'interactive-1',
            type: 'click',
            trigger: { selector: '.test' },
            animation: { duration: 300, easing: 'ease-out', properties: {} },
            content: { text: 'Test interaction' }
          }
        ]
      };

      expect(chapter.content).toHaveLength(1);
      expect(chapter.visualElements).toHaveLength(1);
      expect(chapter.interactiveElements).toHaveLength(1);
      expect(chapter.content[0].type).toBe('text');
    });

    it('should handle different content block types', () => {
      const contentTypes: Array<'text' | 'image' | 'video' | 'interactive'> = [
        'text', 'image', 'video', 'interactive'
      ];

      contentTypes.forEach((type, index) => {
        const chapter: Chapter = {
          id: `chapter-${index}`,
          title: 'Test',
          subtitle: '',
          content: [
            {
              id: `block-${index}`,
              type,
              content: 'content',
              metadata: {}
            }
          ],
          visualElements: [],
          projects: [],
          interactiveElements: []
        };

        expect(chapter.content[0].type).toBe(type);
      });
    });
  });

  describe('UserProgress Model', () => {
    it('should track user progress correctly', () => {
      const userProgress: UserProgress = {
        currentChapter: 2,
        visitedSections: ['chapter-1', 'chapter-2'],
        interactionHistory: [
          {
            id: 'interaction-1',
            type: 'navigation',
            timestamp: new Date(),
            elementId: 'chapter-1',
            chapterId: 'chapter-1'
          }
        ],
        preferences: {
          reducedMotion: false,
          skipAnimations: false,
          preferredNavigationStyle: 'story',
          theme: 'auto',
          soundEnabled: true
        },
        completionPercentage: 50,
        lastVisit: new Date()
      };

      expect(userProgress.currentChapter).toBe(2);
      expect(userProgress.visitedSections).toHaveLength(2);
      expect(userProgress.interactionHistory).toHaveLength(1);
      expect(userProgress.completionPercentage).toBe(50);
    });

    it('should validate interaction types', () => {
      const validInteractionTypes: UserInteraction['type'][] = [
        'navigation', 'project_view', 'contact', 'timeline_click'
      ];

      validInteractionTypes.forEach(type => {
        const interaction: UserInteraction = {
          id: 'test-interaction',
          type,
          timestamp: new Date(),
          elementId: 'test-element',
          chapterId: 'chapter-1'
        };
        expect(interaction.type).toBe(type);
      });
    });
  });

  describe('StoryContent Model', () => {
    it('should create complete story content structure', () => {
      const storyContent: StoryContent = {
        chapters: [
          {
            id: 'chapter-1',
            title: 'Chapter 1',
            subtitle: 'Subtitle',
            content: [],
            visualElements: [],
            projects: [],
            interactiveElements: []
          }
        ],
        globalTheme: {
          primaryColors: ['#FF0000', '#00FF00'],
          fonts: {
            heading: 'Inter',
            body: 'Inter',
            mono: 'JetBrains Mono'
          },
          animations: {
            duration: 300,
            easing: 'ease-out',
            reducedMotion: false
          }
        },
        userProgress: {
          currentChapter: 1,
          visitedSections: [],
          interactionHistory: [],
          preferences: {
            reducedMotion: false,
            skipAnimations: false,
            preferredNavigationStyle: 'story',
            theme: 'auto',
            soundEnabled: true
          },
          completionPercentage: 0,
          lastVisit: new Date()
        }
      };

      expect(storyContent.chapters).toHaveLength(1);
      expect(storyContent.globalTheme.primaryColors).toHaveLength(2);
      expect(storyContent.userProgress.currentChapter).toBe(1);
    });
  });

  describe('ImpactMetrics Model', () => {
    it('should handle all optional impact metrics', () => {
      const fullImpact: ImpactMetrics = {
        userReach: 100000,
        performanceImprovement: '50% faster',
        teamSize: 8,
        timeframe: '6 months',
        businessValue: '25% increase in revenue'
      };

      expect(fullImpact.userReach).toBe(100000);
      expect(fullImpact.performanceImprovement).toBe('50% faster');
      expect(fullImpact.teamSize).toBe(8);
      expect(fullImpact.timeframe).toBe('6 months');
      expect(fullImpact.businessValue).toBe('25% increase in revenue');
    });

    it('should handle minimal impact metrics', () => {
      const minimalImpact: ImpactMetrics = {
        timeframe: '3 months'
      };

      expect(minimalImpact.timeframe).toBe('3 months');
      expect(minimalImpact.userReach).toBeUndefined();
      expect(minimalImpact.performanceImprovement).toBeUndefined();
    });
  });
});