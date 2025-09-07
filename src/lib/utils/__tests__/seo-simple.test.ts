import { describe, it, expect } from 'vitest';

describe('SEO Implementation', () => {
  it('should pass basic test', () => {
    expect(true).toBe(true);
  });

  it('should have SEO utilities available', async () => {
    const { generateMetadata, defaultSEOConfig } = await import('../seo');
    
    expect(generateMetadata).toBeDefined();
    expect(defaultSEOConfig).toBeDefined();
    expect(defaultSEOConfig.title).toContain('Storytelling Portfolio');
  });

  it('should have structured data utilities available', async () => {
    const { generatePersonStructuredData, generateWebSiteStructuredData } = await import('../structured-data');
    
    expect(generatePersonStructuredData).toBeDefined();
    expect(generateWebSiteStructuredData).toBeDefined();
    
    const personData = generatePersonStructuredData();
    expect(personData['@type']).toBe('Person');
    
    const websiteData = generateWebSiteStructuredData();
    expect(websiteData['@type']).toBe('WebSite');
  });
});