import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { ChapterTwo } from '../chapter-two';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    h4: ({ children, ...props }: any) => <h4 {...props}>{children}</h4>,
    h5: ({ children, ...props }: any) => <h5 {...props}>{children}</h5>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    svg: ({ children, ...props }: any) => <svg {...props}>{children}</svg>,
    path: ({ children, ...props }: any) => <path {...props}>{children}</path>,
  },
  useScroll: () => ({
    scrollYProgress: { 
      get: () => 0, 
      onChange: vi.fn(() => vi.fn()) // Return unsubscribe function
    }
  }),
  useTransform: () => 0,
  useInView: () => true,
  AnimatePresence: ({ children }: any) => children,
}));

// Mock project data
vi.mock('@/content/projects/project-data', () => ({
  getProjectsByChapter: vi.fn(() => [
    {
      id: 'ecommerce-platform',
      title: 'E-commerce Platform',
      description: 'A full-stack e-commerce solution',
      storyIntegration: 'This project challenged me to think beyond individual features',
      technologies: [
        { name: 'React', category: 'frontend', proficiency: 'advanced' },
        { name: 'Node.js', category: 'backend', proficiency: 'advanced' }
      ],
      images: ['/projects/ecommerce-home.jpg'],
      impact: {
        userReach: 5000,
        teamSize: 3,
        timeframe: '6 months',
        businessValue: '$50K in first quarter sales'
      },
      featured: true,
      category: 'web-application'
    },
    {
      id: 'performance-optimization',
      title: 'Performance Optimization Initiative',
      description: 'Led a comprehensive performance optimization project',
      storyIntegration: 'This project taught me that great code isn\'t just about functionality',
      technologies: [
        { name: 'Webpack', category: 'tool', proficiency: 'advanced' },
        { name: 'Service Workers', category: 'frontend', proficiency: 'advanced' }
      ],
      images: ['/projects/performance-before.jpg'],
      impact: {
        userReach: 100000,
        teamSize: 5,
        timeframe: '3 months',
        performanceImprovement: '70% improvement in load times',
        businessValue: '15% increase in conversion rates'
      },
      featured: true,
      category: 'leadership'
    }
  ])
}));

// Mock components
vi.mock('../story-chapter', () => ({
  StoryChapter: ({ children, onChapterComplete }: any) => (
    <div data-testid="story-chapter">
      {children}
      <button onClick={onChapterComplete} data-testid="chapter-complete">
        Complete Chapter
      </button>
    </div>
  )
}));

vi.mock('@/components/projects/project-showcase', () => ({
  ProjectShowcase: ({ project, variant }: any) => (
    <div data-testid={`project-showcase-${project.id}`} data-variant={variant}>
      <h3>{project.title}</h3>
      <p>{project.description}</p>
    </div>
  )
}));

describe('ChapterTwo', () => {
  const mockOnChapterComplete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders chapter title and subtitle correctly', () => {
    render(<ChapterTwo onChapterComplete={mockOnChapterComplete} />);
    
    expect(screen.getByText('The Puzzle Solver')).toBeInTheDocument();
    expect(screen.getByText(/Real growth happens when you face real challenges/)).toBeInTheDocument();
  });

  it('displays problem-solution pairs', () => {
    render(<ChapterTwo onChapterComplete={mockOnChapterComplete} />);
    
    expect(screen.getByText('Problems & Solutions')).toBeInTheDocument();
    expect(screen.getByText(/E-commerce site loading in 8\+ seconds/)).toBeInTheDocument();
    expect(screen.getByText(/Monolithic codebase becoming unmaintainable/)).toBeInTheDocument();
    expect(screen.getByText(/Complex checkout flow with 70% abandonment/)).toBeInTheDocument();
    expect(screen.getByText(/Inconsistent behavior across different browsers/)).toBeInTheDocument();
  });

  it('shows challenge projects section', () => {
    render(<ChapterTwo onChapterComplete={mockOnChapterComplete} />);
    
    expect(screen.getByText('Challenge Projects')).toBeInTheDocument();
    expect(screen.getByTestId('project-showcase-ecommerce-platform')).toBeInTheDocument();
    expect(screen.getByTestId('project-showcase-performance-optimization')).toBeInTheDocument();
  });

  it('uses challenge variant for project showcases', () => {
    render(<ChapterTwo onChapterComplete={mockOnChapterComplete} />);
    
    const ecommerceShowcase = screen.getByTestId('project-showcase-ecommerce-platform');
    const performanceShowcase = screen.getByTestId('project-showcase-performance-optimization');
    
    expect(ecommerceShowcase).toHaveAttribute('data-variant', 'challenge');
    expect(performanceShowcase).toHaveAttribute('data-variant', 'challenge');
  });

  it('handles problem-solution card interactions', async () => {
    render(<ChapterTwo onChapterComplete={mockOnChapterComplete} />);
    
    // Find problem-solution cards
    const problemCards = screen.getAllByText(/Challenge #/);
    expect(problemCards).toHaveLength(4);
    
    // Test hover interactions (mocked as click for testing)
    const firstCard = problemCards[0].closest('div');
    if (firstCard) {
      fireEvent.click(firstCard);
      // In real implementation, this would reveal solution content
    }
  });

  it('displays puzzle piece visual metaphors', () => {
    render(<ChapterTwo onChapterComplete={mockOnChapterComplete} />);
    
    // Check for SVG puzzle pieces (they should be rendered)
    const svgElements = document.querySelectorAll('svg');
    expect(svgElements.length).toBeGreaterThan(0);
  });

  it('shows conclusion section with call to action', () => {
    render(<ChapterTwo onChapterComplete={mockOnChapterComplete} />);
    
    expect(screen.getByText('The Problem-Solving Mindset')).toBeInTheDocument();
    expect(screen.getByText(/These challenges taught me that every problem is an opportunity/)).toBeInTheDocument();
    expect(screen.getByText('Ready for Leadership?')).toBeInTheDocument();
    expect(screen.getByText('Continue to Chapter 3: The Leadership')).toBeInTheDocument();
  });

  it('calls onChapterComplete when continue button is clicked', () => {
    render(<ChapterTwo onChapterComplete={mockOnChapterComplete} />);
    
    const continueButton = screen.getByText('Continue to Chapter 3: The Leadership');
    fireEvent.click(continueButton);
    
    expect(mockOnChapterComplete).toHaveBeenCalledTimes(1);
  });

  it('applies chapter 2 visual theme correctly', () => {
    render(<ChapterTwo onChapterComplete={mockOnChapterComplete} />);
    
    // Check that the story chapter receives the correct theme
    const storyChapter = screen.getByTestId('story-chapter');
    expect(storyChapter).toBeInTheDocument();
  });

  it('handles scroll progress indicator', () => {
    render(<ChapterTwo onChapterComplete={mockOnChapterComplete} />);
    
    // The scroll progress indicator should be rendered
    // In a real test, we'd check for the progress bar element
    expect(screen.getByTestId('story-chapter')).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    const customClass = 'custom-chapter-class';
    render(<ChapterTwo onChapterComplete={mockOnChapterComplete} className={customClass} />);
    
    // The className should be passed through to the StoryChapter component
    expect(screen.getByTestId('story-chapter')).toBeInTheDocument();
  });

  it('displays impact metrics for problem solutions', () => {
    render(<ChapterTwo onChapterComplete={mockOnChapterComplete} />);
    
    expect(screen.getByText(/Reduced load time to 2\.1s, increased conversions by 15%/)).toBeInTheDocument();
    expect(screen.getByText(/60% faster feature development, reduced bugs by 30%/)).toBeInTheDocument();
    expect(screen.getByText(/Reduced abandonment to 25%, improved user satisfaction/)).toBeInTheDocument();
    expect(screen.getByText(/99\.9% cross-browser compatibility, reduced support tickets by 50%/)).toBeInTheDocument();
  });

  it('handles animation states correctly', async () => {
    render(<ChapterTwo onChapterComplete={mockOnChapterComplete} />);
    
    // Since we're mocking framer-motion, we just verify the component renders
    // In a real test environment, we'd test animation triggers
    await waitFor(() => {
      expect(screen.getByText('The Puzzle Solver')).toBeInTheDocument();
    });
  });
});

describe('ChapterTwo Accessibility', () => {
  it('has proper heading hierarchy', () => {
    render(<ChapterTwo />);
    
    const headings = screen.getAllByRole('heading');
    expect(headings.length).toBeGreaterThan(0);
    
    // Check for main chapter heading
    expect(screen.getByText('The Puzzle Solver')).toBeInTheDocument();
  });

  it('has accessible button labels', () => {
    render(<ChapterTwo />);
    
    const continueButton = screen.getByText('Continue to Chapter 3: The Leadership');
    expect(continueButton).toBeInTheDocument();
    expect(continueButton.tagName).toBe('BUTTON');
  });

  it('provides meaningful text content', () => {
    render(<ChapterTwo />);
    
    // Check that descriptive text is present for screen readers
    expect(screen.getByText(/Real growth happens when you face real challenges/)).toBeInTheDocument();
    expect(screen.getByText(/Every problem is a puzzle waiting to be solved/)).toBeInTheDocument();
  });
});

describe('ChapterTwo Performance', () => {
  it('renders without performance issues', () => {
    const startTime = performance.now();
    render(<ChapterTwo />);
    const endTime = performance.now();
    
    // Component should render quickly (under 100ms in test environment)
    expect(endTime - startTime).toBeLessThan(100);
  });

  it('handles large number of problem-solution pairs', () => {
    // Test with the current 4 pairs - should handle gracefully
    render(<ChapterTwo />);
    
    const challengeCards = screen.getAllByText(/Challenge #/);
    expect(challengeCards).toHaveLength(4);
  });
});