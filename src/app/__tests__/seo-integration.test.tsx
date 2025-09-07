import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render } from '@testing-library/react';
import { generateMetadata as generateChapterMetadata } from '../chapter/[id]/page';
import { metadata as homeMetadata } from '../page';
import { metadata as epilogueMetadata } from '../epilogue/page';

// Mock Next.js modules
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  usePathname: () => '/chapter/1',
}));

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

describe('SEO Integration', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    process.env.NEXT_PUBLIC_SITE_URL = 'https://test-portfolio.com';
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('Home Page Metadata', () => {
    it('should have proper metadata structure', () => {
      expect(homeMetadata).toBeDefined();
      expect(homeMetadata.title).toContain('Storytelling Portfolio');
      expect(homeMetadata.description).toBeDefined();
      expect(homeMetadata.keywords).toBeDefined();
      expect(homeMetadata.openGraph).toBeDefined();
      expect(homeMetadata.twitter).toBeDefined();
    });

    it('should have SEO-optimized content', () => {
      expect(homeMetadata.description).toContain('frontend engineer');
      expect(homeMetadata.description).toContain('interactive storytelling');
      expect(Array.isArray(homeMetadata.keywords)).toBe(true);
      expect(homeMetadata.keywords).toContain('frontend engineer');
    });

    it('should have proper Open Graph metadata', () => {
      expect(homeMetadata.openGraph?.title).toBeDefined();
      expect(homeMetadata.openGraph?.description).toBeDefined();
      expect(homeMetadata.openGraph?.type).toBe('website');
      expect(homeMetadata.openGraph?.siteName).toBe('Storytelling Portfolio');
      expect(homeMetadata.openGraph?.images).toBeDefined();
    });

    it('should have proper Twitter metadata', () => {
      expect(homeMetadata.twitter?.card).toBe('summary_large_image');
      expect(homeMetadata.twitter?.title).toBeDefined();
      expect(homeMetadata.twitter?.description).toBeDefined();
      expect(homeMetadata.twitter?.images).toBeDefined();
    });
  });

  describe('Chapter Page Metadata', () => {
    const chapters = ['1', '2', '3', '4'];

    chapters.forEach((chapterId) => {
      it(`should generate proper metadata for chapter ${chapterId}`, async () => {
        const params = Promise.resolve({ id: chapterId });
        const metadata = await generateChapterMetadata({ params });

        expect(metadata).toBeDefined();
        expect(metadata.title).toContain(`Chapter ${chapterId}`);
        expect(metadata.title).toContain('Storytelling Portfolio');
        expect(metadata.description).toBeDefined();
        expect(metadata.keywords).toBeDefined();
        expect(metadata.openGraph).toBeDefined();
        expect(metadata.twitter).toBeDefined();
      });

      it(`should have unique content for chapter ${chapterId}`, async () => {
        const params = Promise.resolve({ id: chapterId });
        const metadata = await generateChapterMetadata({ params });

        expect(metadata.description).not.toBe('');
        expect(metadata.description!.length).toBeGreaterThan(50);
        expect(Array.isArray(metadata.keywords)).toBe(true);
        expect(metadata.keywords!.length).toBeGreaterThan(0);
      });

      it(`should generate proper OG image URL for chapter ${chapterId}`, async () => {
        const params = Promise.resolve({ id: chapterId });
        const metadata = await generateChapterMetadata({ params });

        const ogImage = metadata.openGraph?.images?.[0];
        expect(ogImage?.url).toContain('/api/og');
        expect(ogImage?.url).toContain(`chapter=${chapterId}`);
        expect(ogImage?.width).toBe(1200);
        expect(ogImage?.height).toBe(630);
      });
    });

    it('should handle invalid chapter ID', async () => {
      const params = Promise.resolve({ id: 'invalid' });
      const metadata = await generateChapterMetadata({ params });

      expect(metadata.title).toContain('Chapter Not Found');
      expect(metadata.description).toContain('could not be found');
    });
  });

  describe('Epilogue Page Metadata', () => {
    it('should have proper metadata structure', () => {
      expect(epilogueMetadata).toBeDefined();
      expect(epilogueMetadata.title).toContain('Epilogue');
      expect(epilogueMetadata.title).toContain('The Code');
      expect(epilogueMetadata.description).toBeDefined();
      expect(epilogueMetadata.keywords).toBeDefined();
      expect(epilogueMetadata.openGraph).toBeDefined();
      expect(epilogueMetadata.twitter).toBeDefined();
    });

    it('should have technical content focus', () => {
      expect(epilogueMetadata.description).toContain('technical');
      expect(epilogueMetadata.description).toContain('implementation');
      expect(epilogueMetadata.keywords).toContain('source code');
      expect(epilogueMetadata.keywords).toContain('architecture');
    });

    it('should generate proper OG image URL', () => {
      const ogImage = epilogueMetadata.openGraph?.images?.[0];
      expect(ogImage?.url).toContain('/api/og');
      expect(ogImage?.url).toContain('chapter=epilogue');
    });
  });

  describe('Metadata Consistency', () => {
    it('should have consistent branding across all pages', async () => {
      const homeTitle = homeMetadata.title as string;
      const epilogueTitle = epilogueMetadata.title as string;
      
      const chapter1Params = Promise.resolve({ id: '1' });
      const chapter1Metadata = await generateChapterMetadata({ params: chapter1Params });
      const chapter1Title = chapter1Metadata.title as string;

      expect(homeTitle).toContain('Storytelling Portfolio');
      expect(epilogueTitle).toContain('Storytelling Portfolio');
      expect(chapter1Title).toContain('Storytelling Portfolio');
    });

    it('should have consistent site name in Open Graph', async () => {
      const homeSiteName = homeMetadata.openGraph?.siteName;
      const epilogueSiteName = epilogueMetadata.openGraph?.siteName;
      
      const chapter1Params = Promise.resolve({ id: '1' });
      const chapter1Metadata = await generateChapterMetadata({ params: chapter1Params });
      const chapter1SiteName = chapter1Metadata.openGraph?.siteName;

      expect(homeSiteName).toBe('Storytelling Portfolio');
      expect(epilogueSiteName).toBe('Storytelling Portfolio');
      expect(chapter1SiteName).toBe('Storytelling Portfolio');
    });

    it('should have consistent Twitter card type', async () => {
      const homeCard = homeMetadata.twitter?.card;
      const epilogueCard = epilogueMetadata.twitter?.card;
      
      const chapter1Params = Promise.resolve({ id: '1' });
      const chapter1Metadata = await generateChapterMetadata({ params: chapter1Params });
      const chapter1Card = chapter1Metadata.twitter?.card;

      expect(homeCard).toBe('summary_large_image');
      expect(epilogueCard).toBe('summary_large_image');
      expect(chapter1Card).toBe('summary_large_image');
    });
  });

  describe('SEO Best Practices', () => {
    it('should have appropriate title lengths', async () => {
      const titles = [
        homeMetadata.title as string,
        epilogueMetadata.title as string,
      ];

      // Add chapter titles
      for (const chapterId of ['1', '2', '3', '4']) {
        const params = Promise.resolve({ id: chapterId });
        const metadata = await generateChapterMetadata({ params });
        titles.push(metadata.title as string);
      }

      titles.forEach((title) => {
        expect(title.length).toBeLessThanOrEqual(60); // SEO best practice
        expect(title.length).toBeGreaterThan(10);
      });
    });

    it('should have appropriate description lengths', async () => {
      const descriptions = [
        homeMetadata.description as string,
        epilogueMetadata.description as string,
      ];

      // Add chapter descriptions
      for (const chapterId of ['1', '2', '3', '4']) {
        const params = Promise.resolve({ id: chapterId });
        const metadata = await generateChapterMetadata({ params });
        descriptions.push(metadata.description as string);
      }

      descriptions.forEach((description) => {
        expect(description.length).toBeLessThanOrEqual(160); // SEO best practice
        expect(description.length).toBeGreaterThan(50);
      });
    });

    it('should have robots metadata for indexing', () => {
      expect(homeMetadata.robots?.index).toBe(true);
      expect(homeMetadata.robots?.follow).toBe(true);
      expect(epilogueMetadata.robots?.index).toBe(true);
      expect(epilogueMetadata.robots?.follow).toBe(true);
    });

    it('should have proper image dimensions for social sharing', async () => {
      const metadataList = [homeMetadata, epilogueMetadata];

      // Add chapter metadata
      for (const chapterId of ['1', '2', '3', '4']) {
        const params = Promise.resolve({ id: chapterId });
        const metadata = await generateChapterMetadata({ params });
        metadataList.push(metadata);
      }

      metadataList.forEach((metadata) => {
        const ogImage = metadata.openGraph?.images?.[0];
        expect(ogImage?.width).toBe(1200);
        expect(ogImage?.height).toBe(630);
      });
    });
  });
});