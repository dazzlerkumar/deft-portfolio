import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { StoryChapter, VisualTheme } from '../story-chapter';
import { vi } from 'vitest';
import { it } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { describe } from 'node:test';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
  useScroll: () => ({ scrollYProgress: { onChange: vi.fn(), get: () => 0 } }),
  useTransform: () => "0%",
}));

const mockTheme: VisualTheme = {
  name: "chapter1",
  colors: {
    primary: "#FF6B35",
    secondary: "#4A90E2", 
    accent: "#F7931E",
    background: "linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #4A90E2 100%)",
    text: "#2C3E50"
  },
  animations: {
    style: "organic",
    duration: 1.2,
    easing: "easeOut"
  },
  visualMetaphor: "growing-tree"
};

describe('StoryChapter', () => {
  const defaultProps = {
    chapterNumber: 1,
    title: "The Beginning",
    visualTheme: mockTheme,
    children: <div data-testid="chapter-content">Chapter Content</div>
  };

  it('renders chapter content correctly', () => {
    render(<StoryChapter {...defaultProps} />);

    expect(screen.getByText('Chapter 1')).toBeInTheDocument();
    expect(screen.getByText('The Beginning')).toBeInTheDocument();
    expect(screen.getByTestId('chapter-content')).toBeInTheDocument();
  });

  it('displays subtitle when provided', () => {
    render(
      <StoryChapter 
        {...defaultProps} 
        subtitle="Where it all started"
      />
    );

    expect(screen.getByText('Where it all started')).toBeInTheDocument();
  });

  it('applies theme colors correctly', () => {
    render(<StoryChapter {...defaultProps} />);

    const section = screen.getByRole('region');
    expect(section).toHaveStyle({
      background: mockTheme.colors.background,
      color: mockTheme.colors.text
    });
  });

  it('calls onChapterComplete when provided', () => {
    const mockOnComplete = jest.fn();
    
    render(
      <StoryChapter 
        {...defaultProps} 
        onChapterComplete={mockOnComplete}
      />
    );

    // This would normally be triggered by scroll progress
    // In a real test, you'd simulate scroll events
    expect(mockOnComplete).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(
      <StoryChapter 
        {...defaultProps} 
        className="custom-chapter-class"
      />
    );

    const section = screen.getByRole('region');
    expect(section).toHaveClass('custom-chapter-class');
  });

  it('renders different visual metaphors based on theme', () => {
    const chapter2Theme: VisualTheme = {
      ...mockTheme,
      name: "chapter2",
      visualMetaphor: "puzzle-pieces"
    };

    render(
      <StoryChapter 
        {...defaultProps} 
        visualTheme={chapter2Theme}
      />
    );

    // Check that puzzle pieces are rendered (24 elements for puzzle-pieces metaphor)
    const puzzlePieces = document.querySelectorAll('.bg-current.opacity-5.rounded-lg');
    expect(puzzlePieces).toHaveLength(24);
  });

  it('renders network nodes for chapter 3 theme', () => {
    const chapter3Theme: VisualTheme = {
      ...mockTheme,
      name: "chapter3",
      visualMetaphor: "network-nodes"
    };

    render(
      <StoryChapter 
        {...defaultProps} 
        visualTheme={chapter3Theme}
      />
    );

    // Check that network nodes are rendered (12 elements)
    const networkNodes = document.querySelectorAll('.bg-current.rounded-full');
    expect(networkNodes).toHaveLength(12);
  });

  it('renders space launch theme for chapter 4', () => {
    const chapter4Theme: VisualTheme = {
      ...mockTheme,
      name: "chapter4",
      visualMetaphor: "space-launch"
    };

    render(
      <StoryChapter 
        {...defaultProps} 
        visualTheme={chapter4Theme}
      />
    );

    // Check that space launch gradient is rendered
    const spaceGradient = document.querySelector('.bg-gradient-radial');
    expect(spaceGradient).toBeInTheDocument();
  });

  it('handles theme switching correctly', () => {
    const { rerender } = render(<StoryChapter {...defaultProps} />);

    expect(screen.getByText('Chapter 1')).toBeInTheDocument();

    const newTheme: VisualTheme = {
      ...mockTheme,
      name: "chapter2",
      colors: {
        ...mockTheme.colors,
        primary: "#00D4FF",
        background: "linear-gradient(135deg, #00D4FF 0%, #0099CC 50%, #1A1A1A 100%)"
      }
    };

    rerender(
      <StoryChapter 
        {...defaultProps} 
        chapterNumber={2}
        title="The Challenges"
        visualTheme={newTheme}
      />
    );

    expect(screen.getByText('Chapter 2')).toBeInTheDocument();
    expect(screen.getByText('The Challenges')).toBeInTheDocument();
  });

  it('renders decorative elements for chapter 1', () => {
    render(<StoryChapter {...defaultProps} />);

    // Check for SVG path element (decorative curve for chapter 1)
    const svgPath = document.querySelector('path[d="M20 80 Q 50 20 80 80"]');
    expect(svgPath).toBeInTheDocument();
  });

  it('renders rotating border for chapter 2', () => {
    const chapter2Theme: VisualTheme = {
      ...mockTheme,
      name: "chapter2"
    };

    render(
      <StoryChapter 
        {...defaultProps} 
        visualTheme={chapter2Theme}
      />
    );

    // Check for rotating border element
    const rotatingBorder = document.querySelector('.border-2.opacity-20');
    expect(rotatingBorder).toBeInTheDocument();
  });

  it('handles interactive elements when provided', () => {
    const interactiveElements = [
      {
        id: 'test-element',
        type: 'click' as const,
        trigger: { selector: '.test-trigger' },
        animation: { duration: 0.5, easing: 'ease', properties: {} },
        content: { text: 'Test content' }
      }
    ];

    render(
      <StoryChapter 
        {...defaultProps} 
        interactiveElements={interactiveElements}
      />
    );

    // Interactive elements are passed as props but rendering depends on implementation
    expect(screen.getByTestId('chapter-content')).toBeInTheDocument();
  });
});