import { StoryContent, Project, Chapter } from '@/lib/types';

export const mockProjects: Project[] = [
  {
    id: 'project-1',
    title: 'E-commerce Platform Redesign',
    description: 'Led the complete frontend redesign of a major e-commerce platform, improving conversion rates by 35%',
    storyIntegration: 'This project taught me the importance of user-centered design and performance optimization.',
    technologies: [
      { name: 'React', category: 'frontend', proficiency: 'expert' },
      { name: 'TypeScript', category: 'frontend', proficiency: 'expert' },
      { name: 'Next.js', category: 'frontend', proficiency: 'expert' },
      { name: 'Tailwind CSS', category: 'frontend', proficiency: 'advanced' }
    ],
    demoUrl: 'https://demo.example.com',
    codeUrl: 'https://github.com/example/project',
    images: ['/projects/ecommerce-1.jpg', '/projects/ecommerce-2.jpg'],
    impact: {
      userReach: 100000,
      performanceImprovement: '35% faster load times',
      teamSize: 8,
      timeframe: '6 months',
      businessValue: '35% increase in conversion rate'
    },
    featured: true,
    category: 'web-application'
  },
  {
    id: 'project-2',
    title: 'Design System Library',
    description: 'Created a comprehensive design system used across 12 products, reducing development time by 40%',
    storyIntegration: 'Building this system taught me about scalable architecture and team collaboration.',
    technologies: [
      { name: 'React', category: 'frontend', proficiency: 'expert' },
      { name: 'Storybook', category: 'tool', proficiency: 'advanced' },
      { name: 'Figma', category: 'tool', proficiency: 'advanced' },
      { name: 'npm', category: 'tool', proficiency: 'expert' }
    ],
    codeUrl: 'https://github.com/example/design-system',
    images: ['/projects/design-system-1.jpg'],
    impact: {
      teamSize: 25,
      timeframe: '8 months',
      businessValue: '40% reduction in development time'
    },
    featured: true,
    category: 'library'
  },
  {
    id: 'project-3',
    title: 'Real-time Collaboration Tool',
    description: 'Built a real-time collaborative editing platform supporting 1000+ concurrent users',
    storyIntegration: 'This project pushed me to learn about real-time systems and performance at scale.',
    technologies: [
      { name: 'React', category: 'frontend', proficiency: 'expert' },
      { name: 'WebSocket', category: 'frontend', proficiency: 'advanced' },
      { name: 'Node.js', category: 'backend', proficiency: 'intermediate' },
      { name: 'Redis', category: 'database', proficiency: 'intermediate' }
    ],
    demoUrl: 'https://collab-demo.example.com',
    images: ['/projects/collab-1.jpg', '/projects/collab-2.jpg'],
    impact: {
      userReach: 50000,
      performanceImprovement: 'Sub-100ms latency',
      teamSize: 5,
      timeframe: '4 months',
      businessValue: 'Enabled remote team productivity'
    },
    featured: false,
    category: 'web-application'
  }
];

export const mockChapters: Chapter[] = [
  {
    id: 'chapter-1',
    title: 'The Beginning',
    subtitle: 'Where curiosity met code',
    content: [
      {
        id: 'block-1',
        type: 'text',
        content: 'Every great journey starts with a single step. Mine began with a simple "Hello, World!" that sparked a passion for creating digital experiences.',
        metadata: {}
      },
      {
        id: 'block-2',
        type: 'text',
        content: 'From late-night coding sessions to my first deployed application, this chapter explores the foundation of my development journey.',
        metadata: {}
      }
    ],
    visualElements: [
      {
        id: 'growing-tree',
        type: '3d',
        config: { model: 'tree', animation: 'growth' },
        fallback: '/images/tree-illustration.svg'
      }
    ],
    projects: [mockProjects[0]],
    interactiveElements: [
      {
        id: 'learning-milestones',
        type: 'click',
        trigger: { selector: '.milestone', threshold: 0.5 },
        animation: { duration: 500, easing: 'ease-out', properties: { scale: 1.1 } },
        content: { text: 'Click to explore this learning milestone' }
      }
    ]
  },
  {
    id: 'chapter-2',
    title: 'The Challenges',
    subtitle: 'Solving problems, one pixel at a time',
    content: [
      {
        id: 'block-1',
        type: 'text',
        content: 'Real growth happens when you face real challenges. This chapter showcases the complex problems I\'ve tackled and the creative solutions I\'ve built.',
        metadata: {}
      }
    ],
    visualElements: [
      {
        id: 'puzzle-pieces',
        type: 'animation',
        config: { type: 'puzzle-assembly', pieces: 8 },
        fallback: '/images/puzzle-illustration.svg'
      }
    ],
    projects: [mockProjects[1], mockProjects[2]],
    interactiveElements: [
      {
        id: 'problem-solution-pairs',
        type: 'hover',
        trigger: { selector: '.problem-card', threshold: 0.3 },
        animation: { duration: 300, easing: 'ease-in-out', properties: { transform: 'translateY(-10px)' } },
        content: { text: 'Hover to see the solution' }
      }
    ]
  },
  {
    id: 'chapter-3',
    title: 'The Leadership',
    subtitle: 'Empowering teams, scaling impact',
    content: [
      {
        id: 'block-1',
        type: 'text',
        content: 'Leadership in tech isn\'t just about code—it\'s about people, processes, and creating environments where great work happens.',
        metadata: {}
      }
    ],
    visualElements: [
      {
        id: 'network-visualization',
        type: '3d',
        config: { type: 'network', nodes: 12, connections: 'dynamic' },
        fallback: '/images/network-illustration.svg'
      }
    ],
    projects: mockProjects,
    interactiveElements: [
      {
        id: 'team-impact-viz',
        type: 'scroll',
        trigger: { selector: '.impact-section', threshold: 0.6 },
        animation: { duration: 800, easing: 'ease-out', properties: { opacity: 1 } },
        content: { component: 'TeamImpactChart' }
      }
    ]
  },
  {
    id: 'chapter-4',
    title: 'The Vision',
    subtitle: 'Building the future, together',
    content: [
      {
        id: 'block-1',
        type: 'text',
        content: 'The best is yet to come. Let\'s explore what we can build together and how we can shape the future of digital experiences.',
        metadata: {}
      }
    ],
    visualElements: [
      {
        id: 'space-launch',
        type: '3d',
        config: { type: 'rocket', animation: 'launch-sequence' },
        fallback: '/images/rocket-illustration.svg'
      }
    ],
    projects: [],
    interactiveElements: [
      {
        id: 'contact-mission-control',
        type: 'click',
        trigger: { selector: '.contact-form', threshold: 0.8 },
        animation: { duration: 600, easing: 'ease-out', properties: { scale: 1.05 } },
        content: { component: 'ContactForm' }
      }
    ]
  }
];

export const mockStoryContent: StoryContent = {
  chapters: mockChapters,
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
    visitedSections: ['chapter-1'],
    interactionHistory: [
      {
        id: 'interaction-1',
        type: 'navigation',
        timestamp: new Date(),
        data: {
          elementId: 'chapter-1',
          chapterId: 'chapter-1',
          duration: 120000
        }
      }
    ],
    preferences: {
      reducedMotion: false,
      skipAnimations: false,
      preferredNavigationStyle: 'story',
      theme: 'auto',
      soundEnabled: true
    },
    completionPercentage: 25,
    lastVisit: new Date()
  }
};

// Helper function to get mock data for development
export function getMockStoryContent(): StoryContent {
  return mockStoryContent;
}

export function getMockProjects(): Project[] {
  return mockProjects;
}

export function getMockChapter(chapterId: string): Chapter | undefined {
  return mockChapters.find(chapter => chapter.id === chapterId);
}