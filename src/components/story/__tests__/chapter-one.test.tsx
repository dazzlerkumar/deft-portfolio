import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { ChapterOne } from '../chapter-one';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    code: ({ children, ...props }: any) => <code {...props}>{children}</code>,
    svg: ({ children, ...props }: any) => <svg {...props}>{children}</svg>,
    path: ({ children, ...props }: any) => <path {...props}>{children}</path>,
    rect: ({ children, ...props }: any) => <rect {...props}>{children}</rect>,
    circle: ({ children, ...props }: any) => <circle {...props}>{children}</circle>,
  },
  useScroll: () => ({
    scrollYProgress: { 
      get: () => 0, 
      onChange: vi.fn(() => vi.fn()) // Return unsubscribe function
    }
  }),
  useTransform: () => 0,
  useInView: () => true,
  useAnimation: () => ({
    start: vi.fn()
  }),
  AnimatePresence: ({ children }: any) => children,
}));

// Mock the content data
vi.mock('@/content/chapters/chapter-1', () => ({
  chapter1LearningMilestones: [
    {
      id: 'test-milestone',
      title: 'Test Milestone',
      date: '2023-01',
      description: 'Test description',
      skills: ['React', 'TypeScript'],
      achievement: 'Test achievement',
      impact: 'Test impact'
    }
  ],
  chapter1SkillProgression: [
    {
      skill: 'JavaScript',
      level: 85,
      color: '#F7931E'
    }
  ]
}));

describe('ChapterOne', () => {
  const mockOnChapterComplete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders chapter title and subtitle', () => {
    render(<ChapterOne onChapterComplete={mockOnChapterComplete} />);
    
    expect(screen.getByText('The Beginning')).toBeInTheDocument();
    expect(screen.getByText('Where curiosity met code')).toBeInTheDocument();
  });

  it('displays the main content sections', () => {
    render(<ChapterOne onChapterComplete={mockOnChapterComplete} />);
    
    expect(screen.getByText('The Spark')).toBeInTheDocument();
    expect(screen.getByText(/Every great journey starts/)).toBeInTheDocument();
    expect(screen.getByText('Learning Milestones')).toBeInTheDocument();
    expect(screen.getByText('Skill Evolution')).toBeInTheDocument();
  });

  it('renders learning milestones component', () => {
    render(<ChapterOne onChapterComplete={mockOnChapterComplete} />);
    
    expect(screen.getByText('Test Milestone')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
  });

  it('renders skill progression component', () => {
    render(<ChapterOne onChapterComplete={mockOnChapterComplete} />);
    
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('85%')).toBeInTheDocument();
  });

  it('calls onChapterComplete when continue button is clicked', async () => {
    render(<ChapterOne onChapterComplete={mockOnChapterComplete} />);
    
    const continueButton = screen.getByText('Continue to Chapter 2: The Challenges');
    fireEvent.click(continueButton);
    
    expect(mockOnChapterComplete).toHaveBeenCalledTimes(1);
  });

  it('displays code snippet with proper styling', () => {
    render(<ChapterOne onChapterComplete={mockOnChapterComplete} />);
    
    const codeElement = screen.getByText('"Hello, World!"');
    expect(codeElement).toBeInTheDocument();
    expect(codeElement.tagName).toBe('CODE');
  });

  it('renders conclusion section with call to action', () => {
    render(<ChapterOne onChapterComplete={mockOnChapterComplete} />);
    
    expect(screen.getByText('The Foundation Years')).toBeInTheDocument();
    expect(screen.getByText('Ready for the Next Chapter?')).toBeInTheDocument();
    expect(screen.getByText(/The journey from that first/)).toBeInTheDocument();
  });

  it('applies correct CSS classes for responsive design', () => {
    const { container } = render(<ChapterOne onChapterComplete={mockOnChapterComplete} />);
    
    // Check for responsive classes
    const responsiveElements = container.querySelectorAll('.md\\:text-6xl, .md\\:text-4xl, .md\\:text-2xl');
    expect(responsiveElements.length).toBeGreaterThan(0);
  });

  it('renders with custom className', () => {
    const { container } = render(
      <ChapterOne onChapterComplete={mockOnChapterComplete} className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('handles missing onChapterComplete prop gracefully', () => {
    expect(() => {
      render(<ChapterOne />);
    }).not.toThrow();
  });
});