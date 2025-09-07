import { describe, it, expect } from 'vitest';
import {
  parseMarkdownContent,
  markdownToChapter,
  loadStoryContent,
  validateChapterContent
} from '../content-loader';
import { Project, Chapter } from '@/lib/types';

describe('Content Loader', () => {
  describe('parseMarkdownContent', () => {
    it('should parse valid markdown with frontmatter', () => {
      const markdown = `---
title: "Test Chapter"
subtitle: "Test Subtitle"
chapterNumber: 1
visualTheme: "test-theme"
projects: ["project-1", "project-2"]
---

This is the content of the chapter.

## Section 1

More content here.`;

      const result = parseMarkdownContent(markdown);

      expect(result.metadata.title).toBe('Test Chapter');
      expect(result.metadata.subtitle).toBe('Test Subtitle');
      expect(result.metadata.chapterNumber).toBe(1);
      expect(result.metadata.visualTheme).toBe('test-theme');
      expect(result.metadata.projects).toEqual(['project-1', 'project-2']);
      expect(result.content).toContain('This is the content of the chapter.');
    });

    it('should throw error for invalid markdown format', () => {
      const invalidMarkdown = 'Just content without frontmatter';

      expect(() => parseMarkdownContent(invalidMarkdown)).toThrow(
        'Invalid markdown format: missing frontmatter'
      );
    });

    it('should throw error for missing required metadata', () => {
      const markdownMissingTitle = `---
chapterNumber: 1
---

Content here.`;

      expect(() => parseMarkdownContent(markdownMissingTitle)).toThrow(
        'Missing required metadata: title and chapterNumber'
      );
    });

    it('should handle metadata with quotes', () => {
      const markdown = `---
title: "Quoted Title"
subtitle: 'Single Quoted'
chapterNumber: 1
---

Content`;

      const result = parseMarkdownContent(markdown);
      expect(result.metadata.title).toBe('Quoted Title');
      expect(result.metadata.subtitle).toBe('Single Quoted');
    });
  });

  describe('markdownToChapter', () => {
    const mockProjects: Project[] = [
      {
        id: 'project-1',
        title: 'Test Project',
        description: 'A test project',
        storyIntegration: 'Test integration',
        technologies: [],
        images: [],
        impact: { timeframe: '1 month' },
        featured: false,
        category: 'web-application'
      }
    ];

    it('should convert markdown content to chapter structure', () => {
      const markdownContent = {
        content: 'Chapter content here.\n\nSecond paragraph.',
        metadata: {
          title: 'Test Chapter',
          subtitle: 'Test Subtitle',
          chapterNumber: 1,
          projects: ['project-1']
        }
      };

      const chapter = markdownToChapter(markdownContent, mockProjects);

      expect(chapter.id).toBe('chapter-1');
      expect(chapter.title).toBe('Test Chapter');
      expect(chapter.subtitle).toBe('Test Subtitle');
      expect(chapter.content).toHaveLength(2);
      expect(chapter.projects).toHaveLength(1);
      expect(chapter.projects[0].id).toBe('project-1');
    });

    it('should handle chapters without projects', () => {
      const markdownContent = {
        content: 'Chapter content',
        metadata: {
          title: 'Test Chapter',
          chapterNumber: 1
        }
      };

      const chapter = markdownToChapter(markdownContent, mockProjects);

      expect(chapter.projects).toHaveLength(0);
    });

    it('should parse different content block types', () => {
      const markdownContent = {
        content: `Regular text paragraph.

![Image description](image.jpg)

Check out this video: https://youtube.com/watch?v=123

<!-- interactive: test-element -->
Interactive content here.`,
        metadata: {
          title: 'Test Chapter',
          chapterNumber: 1
        }
      };

      const chapter = markdownToChapter(markdownContent, []);

      expect(chapter.content).toHaveLength(4);
      expect(chapter.content[0].type).toBe('text');
      expect(chapter.content[1].type).toBe('image');
      expect(chapter.content[2].type).toBe('video');
      expect(chapter.content[3].type).toBe('interactive');
    });
  });

  describe('loadStoryContent', () => {
    it('should create valid story content structure', async () => {
      const chapters = [
        {
          content: 'Chapter 1 content',
          metadata: { title: 'Chapter 1', chapterNumber: 1 }
        },
        {
          content: 'Chapter 2 content',
          metadata: { title: 'Chapter 2', chapterNumber: 2 }
        }
      ];

      const storyContent = await loadStoryContent(chapters, []);

      expect(storyContent.chapters).toHaveLength(2);
      expect(storyContent.chapters[0].id).toBe('chapter-1');
      expect(storyContent.chapters[1].id).toBe('chapter-2');
      expect(storyContent.globalTheme).toBeDefined();
      expect(storyContent.userProgress).toBeDefined();
    });

    it('should sort chapters by number', async () => {
      const chapters = [
        {
          content: 'Chapter 3 content',
          metadata: { title: 'Chapter 3', chapterNumber: 3 }
        },
        {
          content: 'Chapter 1 content',
          metadata: { title: 'Chapter 1', chapterNumber: 1 }
        },
        {
          content: 'Chapter 2 content',
          metadata: { title: 'Chapter 2', chapterNumber: 2 }
        }
      ];

      const storyContent = await loadStoryContent(chapters, []);

      expect(storyContent.chapters[0].title).toBe('Chapter 1');
      expect(storyContent.chapters[1].title).toBe('Chapter 2');
      expect(storyContent.chapters[2].title).toBe('Chapter 3');
    });
  });

  describe('validateChapterContent', () => {
    it('should validate valid chapter content', () => {
      const validChapter: Chapter = {
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
        visualElements: [],
        projects: [],
        interactiveElements: []
      };

      const result = validateChapterContent(validChapter);

      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should identify missing required fields', () => {
      const invalidChapter: Chapter = {
        id: '',
        title: '',
        subtitle: '',
        content: [
          {
            id: '',
            type: 'text',
            content: '',
            metadata: {}
          }
        ],
        visualElements: [],
        projects: [],
        interactiveElements: []
      };

      const result = validateChapterContent(invalidChapter);

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Chapter ID is required');
      expect(result.errors).toContain('Chapter title is required');
      expect(result.errors).toContain('Content block 0 missing ID');
      expect(result.errors).toContain('Content block 0 missing content');
    });

    it('should validate content block structure', () => {
      const chapterWithInvalidBlocks: Chapter = {
        id: 'chapter-1',
        title: 'Test Chapter',
        subtitle: '',
        content: [
          {
            id: 'block-1',
            type: 'text',
            content: 'Valid block',
            metadata: {}
          },
          {
            id: '',
            type: 'text',
            content: '',
            metadata: {}
          }
        ],
        visualElements: [],
        projects: [],
        interactiveElements: []
      };

      const result = validateChapterContent(chapterWithInvalidBlocks);

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Content block 1 missing ID');
      expect(result.errors).toContain('Content block 1 missing content');
    });
  });
});