import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ChapterThree } from '../chapter-three';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
}));

// Mock child components
vi.mock('../network-visualization', () => ({
  NetworkVisualization: () => <div data-testid="network-visualization">Network Visualization</div>
}));

vi.mock('../team-impact-metrics', () => ({
  TeamImpactMetrics: () => <div data-testid="team-impact-metrics">Team Impact Metrics</div>
}));

vi.mock('../leadership-showcase', () => ({
  LeadershipShowcase: () => <div data-testid="leadership-showcase">Leadership Showcase</div>
}));

describe('ChapterThree', () => {
  const mockOnChapterComplete = vi.fn();

  beforeEach(() => {
    mockOnChapterComplete.mockClear();
  });

  it('renders chapter header correctly', () => {
    render(<ChapterThree onChapterComplete={mockOnChapterComplete} />);
    
    expect(screen.getByText('Chapter 3')).toBeInTheDocument();
    expect(screen.getByText('The Leadership')).toBeInTheDocument();
    expect(screen.getByText('Empowering teams, scaling impact')).toBeInTheDocument();
  });

  it('displays first section content by default', () => {
    render(<ChapterThree onChapterComplete={mockOnChapterComplete} />);
    
    expect(screen.getByText('The Leadership')).toBeInTheDocument();
    expect(screen.getByText('Empowering teams, scaling impact')).toBeInTheDocument();
    expect(screen.getByTestId('network-visualization')).toBeInTheDocument();
  });

  it('progresses through sections when continue button is clicked', async () => {
    render(<ChapterThree onChapterComplete={mockOnChapterComplete} />);
    
    const continueButton = screen.getByText('Continue');
    
    // Click to go to section 1
    fireEvent.click(continueButton);
    
    await waitFor(() => {
      expect(screen.getByText('Building High-Performing Teams')).toBeInTheDocument();
      expect(screen.getByTestId('team-impact-metrics')).toBeInTheDocument();
    });
    
    // Click to go to section 2
    fireEvent.click(continueButton);
    
    await waitFor(() => {
      expect(screen.getByText('Scaling Impact Through Systems')).toBeInTheDocument();
      expect(screen.getByTestId('leadership-showcase')).toBeInTheDocument();
    });
  });

  it('calls onChapterComplete when reaching the end', async () => {
    render(<ChapterThree onChapterComplete={mockOnChapterComplete} />);
    
    const continueButton = screen.getByText('Continue');
    
    // Progress through all sections
    fireEvent.click(continueButton); // Section 1
    fireEvent.click(continueButton); // Section 2
    
    // Now button should say "Next Chapter"
    await waitFor(() => {
      expect(screen.getByText('Next Chapter')).toBeInTheDocument();
    });
    
    fireEvent.click(screen.getByText('Next Chapter'));
    
    expect(mockOnChapterComplete).toHaveBeenCalledTimes(1);
  });

  it('displays progress indicators correctly', () => {
    render(<ChapterThree onChapterComplete={mockOnChapterComplete} />);
    
    // Should have 3 progress dots
    const progressDots = screen.getAllByRole('generic').filter(el => 
      el.className.includes('w-3 h-3 rounded-full')
    );
    
    expect(progressDots).toHaveLength(3);
  });

  it('applies chapter 3 theme colors', () => {
    render(<ChapterThree onChapterComplete={mockOnChapterComplete} />);
    
    const container = screen.getByText('The Leadership').closest('div');
    expect(container).toHaveClass('bg-gradient-to-br', 'from-chapter3-background');
  });

  it('renders all section content', () => {
    render(<ChapterThree onChapterComplete={mockOnChapterComplete} />);
    
    // Check that section content is defined
    expect(screen.getByText(/Leadership in tech isn't just about code/)).toBeInTheDocument();
  });
});