import { Chapter, StoryContent, Project } from '@/lib/types';

export interface ContentMetadata {
  title: string;
  subtitle?: string;
  chapterNumber: number;
  visualTheme?: string;
  projects?: string[];
}

export interface MarkdownContent {
  content: string;
  metadata: ContentMetadata;
}

/**
 * Parse markdown frontmatter and content
 */
export function parseMarkdownContent(rawContent: string): MarkdownContent {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
  const match = rawContent.match(frontmatterRegex);
  
  if (!match) {
    throw new Error('Invalid markdown format: missing frontmatter');
  }
  
  const [, frontmatter, content] = match;
  const metadata = parseFrontmatter(frontmatter);
  
  return {
    content: content.trim(),
    metadata
  };
}

/**
 * Parse YAML-like frontmatter into metadata object
 */
function parseFrontmatter(frontmatter: string): ContentMetadata {
  const lines = frontmatter.split('\n');
  const metadata: Partial<ContentMetadata> = {};
  
  for (const line of lines) {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
      
      switch (key.trim()) {
        case 'title':
          metadata.title = value.replace(/['"]/g, '');
          break;
        case 'subtitle':
          metadata.subtitle = value.replace(/['"]/g, '');
          break;
        case 'chapterNumber':
          metadata.chapterNumber = parseInt(value, 10);
          break;
        case 'visualTheme':
          metadata.visualTheme = value.replace(/['"]/g, '');
          break;
        case 'projects':
          // Handle array format like ["project-1", "project-2"] or [project-1, project-2]
          const cleanValue = value.replace(/[\[\]]/g, '').replace(/['"]/g, '');
          metadata.projects = cleanValue.split(',').map(p => p.trim());
          break;
      }
    }
  }
  
  if (!metadata.title || metadata.chapterNumber === undefined) {
    throw new Error('Missing required metadata: title and chapterNumber');
  }
  
  return metadata as ContentMetadata;
}

/**
 * Convert markdown content to structured chapter data
 */
export function markdownToChapter(
  markdownContent: MarkdownContent,
  projects: Project[] = []
): Chapter {
  const { content, metadata } = markdownContent;
  
  // Parse content blocks from markdown
  const contentBlocks = parseContentBlocks(content);
  
  // Filter projects mentioned in this chapter
  const chapterProjects = projects.filter(project => 
    metadata.projects?.includes(project.id)
  );
  
  return {
    id: `chapter-${metadata.chapterNumber}`,
    title: metadata.title,
    subtitle: metadata.subtitle || '',
    content: contentBlocks,
    visualElements: [], // Will be populated by specific chapter implementations
    projects: chapterProjects,
    interactiveElements: [] // Will be populated by specific chapter implementations
  };
}

/**
 * Parse markdown content into structured content blocks
 */
function parseContentBlocks(content: string) {
  const blocks = [];
  const sections = content.split(/\n\n+/);
  
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i].trim();
    if (!section) continue;
    
    // Detect block type based on content
    let type: 'text' | 'image' | 'video' | 'interactive' = 'text';
    
    if (section.startsWith('![')) {
      type = 'image';
    } else if (section.includes('youtube.com') || section.includes('vimeo.com')) {
      type = 'video';
    } else if (section.startsWith('<!-- interactive:')) {
      type = 'interactive';
    }
    
    blocks.push({
      id: `block-${i}`,
      type,
      content: section,
      metadata: {}
    });
  }
  
  return blocks;
}

/**
 * Load and validate story content structure
 */
export async function loadStoryContent(chapters: MarkdownContent[], projects: Project[]): Promise<StoryContent> {
  const processedChapters = chapters.map(chapter => 
    markdownToChapter(chapter, projects)
  );
  
  // Sort chapters by number
  processedChapters.sort((a, b) => {
    const aNum = parseInt(a.id.split('-')[1], 10);
    const bNum = parseInt(b.id.split('-')[1], 10);
    return aNum - bNum;
  });
  
  return {
    chapters: processedChapters,
    globalTheme: {
      primaryColors: ['#FF6B35', '#004E89', '#7209B7', '#F2F2F2'],
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
}

/**
 * Validate chapter content structure
 */
export function validateChapterContent(chapter: Chapter): { valid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  if (!chapter.id) errors.push('Chapter ID is required');
  if (!chapter.title) errors.push('Chapter title is required');
  if (!Array.isArray(chapter.content)) errors.push('Chapter content must be an array');
  if (!Array.isArray(chapter.projects)) errors.push('Chapter projects must be an array');
  
  // Validate content blocks
  chapter.content.forEach((block, index) => {
    if (!block.id) errors.push(`Content block ${index} missing ID`);
    if (!block.type) errors.push(`Content block ${index} missing type`);
    if (!block.content) errors.push(`Content block ${index} missing content`);
  });
  
  return {
    valid: errors.length === 0,
    errors
  };
}