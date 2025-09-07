import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import {
  generatePersonStructuredData,
  generateWebSiteStructuredData,
  generateChapterStructuredData,
  generateBreadcrumbStructuredData,
} from '../structured-data';

describe('Structured Data Utils', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('generatePersonStructuredData', () => {
    it('should generate valid Person schema', () => {
      const data = generatePersonStructuredData();

      expect(data['@context']).toBe('https://schema.org');
      expect(data['@type']).toBe('Person');
      expect(data.name).toBeDefined();
      expect(data.jobTitle).toBeDefined();
      expect(data.description).toBeDefined();
      expect(data.url).toBeDefined();
      expect(data.image).toBeDefined();
      expect(Array.isArray(data.sameAs)).toBe(true);
      expect(data.worksFor).toBeDefined();
      expect(data.worksFor['@type']).toBe('Organization');
      expect(Array.isArray(data.knowsAbout)).toBe(true);
    });

    it('should include relevant skills and technologies', () => {
      const data = generatePersonStructuredData();

      expect(data.knowsAbout).toContain('React');
      expect(data.knowsAbout).toContain('Next.js');
      expect(data.knowsAbout).toContain('TypeScript');
      expect(data.knowsAbout).toContain('Frontend Development');
      expect(data.knowsAbout).toContain('Team Leadership');
    });

    it('should use environment URL when available', () => {
      process.env.NEXT_PUBLIC_SITE_URL = 'https://custom.com';
      
      const data = generatePersonStructuredData();

      expect(data.url).toBe('https://custom.com');
      expect(data.image).toBe('https://custom.com/profile-image.jpg');
    });

    it('should use fallback URL when environment variable not set', () => {
      delete process.env.NEXT_PUBLIC_SITE_URL;
      
      const data = generatePersonStructuredData();

      expect(data.url).toBe('https://storytelling-portfolio.vercel.app');
      expect(data.image).toBe('https://storytelling-portfolio.vercel.app/profile-image.jpg');
    });
  });

  describe('generateWebSiteStructuredData', () => {
    it('should generate valid WebSite schema', () => {
      const data = generateWebSiteStructuredData();

      expect(data['@context']).toBe('https://schema.org');
      expect(data['@type']).toBe('WebSite');
      expect(data.name).toBeDefined();
      expect(data.description).toBeDefined();
      expect(data.url).toBeDefined();
      expect(data.author).toBeDefined();
      expect(data.author['@type']).toBe('Person');
      expect(data.potentialAction).toBeDefined();
      expect(data.potentialAction['@type']).toBe('SearchAction');
    });

    it('should include search action with correct structure', () => {
      const data = generateWebSiteStructuredData();

      expect(data.potentialAction.target).toBeDefined();
      expect(data.potentialAction.target['@type']).toBe('EntryPoint');
      expect(data.potentialAction.target.urlTemplate).toContain('/search?q=');
      expect(data.potentialAction['query-input']).toBe('required name=search_term_string');
    });

    it('should use environment URL when available', () => {
      process.env.NEXT_PUBLIC_SITE_URL = 'https://custom.com';
      
      const data = generateWebSiteStructuredData();

      expect(data.url).toBe('https://custom.com');
      expect(data.potentialAction.target.urlTemplate).toBe('https://custom.com/search?q={search_term_string}');
    });
  });

  describe('generateChapterStructuredData', () => {
    it('should generate valid CreativeWork schema', () => {
      const data = generateChapterStructuredData('1', 'Test Chapter', 'Test Description');

      expect(data['@context']).toBe('https://schema.org');
      expect(data['@type']).toBe('CreativeWork');
      expect(data.name).toBe('Test Chapter');
      expect(data.description).toBe('Test Description');
      expect(data.author).toBeDefined();
      expect(data.author['@type']).toBe('Person');
      expect(data.dateCreated).toBeDefined();
      expect(data.dateModified).toBeDefined();
      expect(Array.isArray(data.genre)).toBe(true);
      expect(Array.isArray(data.keywords)).toBe(true);
      expect(data.isPartOf).toBeDefined();
      expect(data.isPartOf['@type']).toBe('WebSite');
    });

    it('should generate correct URL for chapter', () => {
      process.env.NEXT_PUBLIC_SITE_URL = 'https://test.com';
      
      const data = generateChapterStructuredData('2', 'Test Chapter', 'Test Description');

      expect(data.url).toBe('https://test.com/chapter/2');
    });

    it('should include relevant genre and keywords', () => {
      const data = generateChapterStructuredData('1', 'Test Chapter', 'Test Description');

      expect(data.genre).toContain('Portfolio');
      expect(data.genre).toContain('Interactive Story');
      expect(data.keywords).toContain('frontend development');
      expect(data.keywords).toContain('career journey');
    });

    it('should have valid date format', () => {
      const data = generateChapterStructuredData('1', 'Test Chapter', 'Test Description');

      // Check that dateCreated is a valid date string
      expect(data.dateCreated).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      
      // Check that dateModified is a valid date string
      expect(data.dateModified).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
  });

  describe('generateBreadcrumbStructuredData', () => {
    it('should generate valid BreadcrumbList schema', () => {
      const items = [
        { name: 'Home', url: 'https://example.com' },
        { name: 'Chapter 1', url: 'https://example.com/chapter/1' },
      ];
      
      const data = generateBreadcrumbStructuredData(items);

      expect(data['@context']).toBe('https://schema.org');
      expect(data['@type']).toBe('BreadcrumbList');
      expect(Array.isArray(data.itemListElement)).toBe(true);
      expect(data.itemListElement).toHaveLength(2);
    });

    it('should generate correct list items with positions', () => {
      const items = [
        { name: 'Home', url: 'https://example.com' },
        { name: 'Chapter 1', url: 'https://example.com/chapter/1' },
        { name: 'Section', url: 'https://example.com/chapter/1/section' },
      ];
      
      const data = generateBreadcrumbStructuredData(items);

      expect(data.itemListElement[0]['@type']).toBe('ListItem');
      expect(data.itemListElement[0].position).toBe(1);
      expect(data.itemListElement[0].name).toBe('Home');
      expect(data.itemListElement[0].item).toBe('https://example.com');

      expect(data.itemListElement[1].position).toBe(2);
      expect(data.itemListElement[1].name).toBe('Chapter 1');

      expect(data.itemListElement[2].position).toBe(3);
      expect(data.itemListElement[2].name).toBe('Section');
    });

    it('should handle empty items array', () => {
      const data = generateBreadcrumbStructuredData([]);

      expect(data.itemListElement).toHaveLength(0);
    });

    it('should handle single item', () => {
      const items = [{ name: 'Home', url: 'https://example.com' }];
      
      const data = generateBreadcrumbStructuredData(items);

      expect(data.itemListElement).toHaveLength(1);
      expect(data.itemListElement[0].position).toBe(1);
    });
  });
});