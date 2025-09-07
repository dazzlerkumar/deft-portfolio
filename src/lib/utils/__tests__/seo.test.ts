import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { generateMetadata, defaultSEOConfig, chapterSEOConfigs, getChapterOGImageUrl } from '../seo';

describe('SEO Utils', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('generateMetadata', () => {
    it('should generate basic metadata with default values', () => {
      const metadata = generateMetadata({
        title: 'Test Title',
        description: 'Test Description',
      });

      expect(metadata.title).toBe('Test Title | Storytelling Portfolio');
      expect(metadata.description).toBe('Test Description');
      expect(metadata.keywords).toContain('frontend engineer');
      expect(metadata.keywords).toContain('portfolio');
      expect(metadata.authors).toEqual([{ name: 'Lead Frontend Engineer' }]);
    });

    it('should not modify title if it already contains "Storytelling Portfolio"', () => {
      const metadata = generateMetadata({
        title: 'Chapter 1 | Storytelling Portfolio',
        description: 'Test Description',
      });

      expect(metadata.title).toBe('Chapter 1 | Storytelling Portfolio');
    });

    it('should generate Open Graph metadata', () => {
      const metadata = generateMetadata({
        title: 'Test Title',
        description: 'Test Description',
        url: 'https://example.com/test',
      });

      expect(metadata.openGraph).toBeDefined();
      expect(metadata.openGraph?.title).toBe('Test Title | Storytelling Portfolio');
      expect(metadata.openGraph?.description).toBe('Test Description');
      expect(metadata.openGraph?.url).toBe('https://example.com/test');
      expect(metadata.openGraph?.siteName).toBe('Storytelling Portfolio');
      expect(metadata.openGraph?.type).toBe('website');
    });

    it('should generate Twitter metadata', () => {
      const metadata = generateMetadata({
        title: 'Test Title',
        description: 'Test Description',
      });

      expect(metadata.twitter).toBeDefined();
      expect(metadata.twitter?.card).toBe('summary_large_image');
      expect(metadata.twitter?.title).toBe('Test Title | Storytelling Portfolio');
      expect(metadata.twitter?.description).toBe('Test Description');
      expect(metadata.twitter?.creator).toBe('@frontend_engineer');
    });

    it('should generate dynamic OG image URL when no image provided', () => {
      process.env.NEXT_PUBLIC_SITE_URL = 'https://test.com';
      
      const metadata = generateMetadata({
        title: 'Test Title',
        description: 'Test Description',
      });

      const expectedImageUrl = 'https://test.com/api/og?title=Test%20Title&description=Test%20Description';
      expect(metadata.openGraph?.images?.[0]?.url).toBe(expectedImageUrl);
      expect(metadata.twitter?.images?.[0]).toBe(expectedImageUrl);
    });

    it('should use provided image URL when specified', () => {
      const customImage = 'https://example.com/custom-image.jpg';
      
      const metadata = generateMetadata({
        title: 'Test Title',
        description: 'Test Description',
        image: customImage,
      });

      expect(metadata.openGraph?.images?.[0]?.url).toBe(customImage);
      expect(metadata.twitter?.images?.[0]).toBe(customImage);
    });

    it('should include article-specific metadata for article type', () => {
      const publishedTime = '2024-01-01';
      const modifiedTime = '2024-01-02';
      
      const metadata = generateMetadata({
        title: 'Test Article',
        description: 'Test Description',
        type: 'article',
        publishedTime,
        modifiedTime,
        author: 'Test Author',
        section: 'Test Section',
      });

      expect(metadata.openGraph?.type).toBe('article');
      expect(metadata.openGraph?.publishedTime).toBe(publishedTime);
      expect(metadata.openGraph?.modifiedTime).toBe(modifiedTime);
      expect(metadata.openGraph?.authors).toEqual(['Test Author']);
      expect(metadata.openGraph?.section).toBe('Test Section');
    });

    it('should include robots metadata', () => {
      const metadata = generateMetadata({
        title: 'Test Title',
        description: 'Test Description',
      });

      expect(metadata.robots).toBeDefined();
      expect(metadata.robots?.index).toBe(true);
      expect(metadata.robots?.follow).toBe(true);
      expect(metadata.robots?.googleBot).toBeDefined();
    });

    it('should merge custom keywords with default keywords', () => {
      const metadata = generateMetadata({
        title: 'Test Title',
        description: 'Test Description',
        keywords: ['custom', 'keywords'],
      });

      expect(metadata.keywords).toContain('frontend engineer');
      expect(metadata.keywords).toContain('custom');
      expect(metadata.keywords).toContain('keywords');
    });
  });

  describe('defaultSEOConfig', () => {
    it('should have required properties', () => {
      expect(defaultSEOConfig.title).toBeDefined();
      expect(defaultSEOConfig.description).toBeDefined();
      expect(defaultSEOConfig.keywords).toBeDefined();
      expect(Array.isArray(defaultSEOConfig.keywords)).toBe(true);
    });

    it('should have meaningful content', () => {
      expect(defaultSEOConfig.title).toContain('Storytelling Portfolio');
      expect(defaultSEOConfig.description).toContain('frontend engineer');
      expect(defaultSEOConfig.keywords).toContain('portfolio');
    });
  });

  describe('chapterSEOConfigs', () => {
    const chapters = ['1', '2', '3', '4', 'epilogue'];

    chapters.forEach((chapter) => {
      it(`should have valid config for chapter ${chapter}`, () => {
        const config = chapterSEOConfigs[chapter];
        
        expect(config).toBeDefined();
        expect(config.title).toBeDefined();
        expect(config.description).toBeDefined();
        expect(config.keywords).toBeDefined();
        expect(config.section).toBeDefined();
        
        expect(config.title).toContain('Storytelling Portfolio');
        expect(config.description.length).toBeGreaterThan(50);
        expect(Array.isArray(config.keywords)).toBe(true);
        expect(config.keywords!.length).toBeGreaterThan(0);
      });
    });

    it('should have unique titles for each chapter', () => {
      const titles = Object.values(chapterSEOConfigs).map(config => config.title);
      const uniqueTitles = new Set(titles);
      
      expect(uniqueTitles.size).toBe(titles.length);
    });

    it('should have unique descriptions for each chapter', () => {
      const descriptions = Object.values(chapterSEOConfigs).map(config => config.description);
      const uniqueDescriptions = new Set(descriptions);
      
      expect(uniqueDescriptions.size).toBe(descriptions.length);
    });
  });

  describe('getChapterOGImageUrl', () => {
    it('should generate correct OG image URL', () => {
      process.env.NEXT_PUBLIC_SITE_URL = 'https://test.com';
      
      const url = getChapterOGImageUrl('1', 'Test Title', 'Test Description');
      
      expect(url).toBe('https://test.com/api/og?title=Test%20Title&description=Test%20Description&chapter=1');
    });

    it('should handle special characters in title and description', () => {
      process.env.NEXT_PUBLIC_SITE_URL = 'https://test.com';
      
      const url = getChapterOGImageUrl('1', 'Title & More', 'Description with "quotes"');
      
      expect(url).toContain('Title%20%26%20More');
      expect(url).toContain('Description%20with%20%22quotes%22');
    });

    it('should use fallback URL when NEXT_PUBLIC_SITE_URL is not set', () => {
      delete process.env.NEXT_PUBLIC_SITE_URL;
      
      const url = getChapterOGImageUrl('1', 'Test Title', 'Test Description');
      
      expect(url).toContain('https://storytelling-portfolio.vercel.app');
    });
  });
});