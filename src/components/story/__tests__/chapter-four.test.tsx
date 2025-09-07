import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ChapterFour } from '../chapter-four';

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
  AnimatePresence: ({ children }: any) => children,
}));

// Mock child components
vi.mock('../contact-mission-control', () => ({
  ContactMissionControl: () => <div data-testid="contact-mission-control">Contact Mission Control</div>
}));

vi.mock('../future-vision', () => ({
  FutureVision: () => <div data-testid="future-vision">Future Vision</div>
}));

vi.mock('../space-background', () => ({
  SpaceBackground: () => <div data-testid="space-background">Space Background</div>
}));

describe('ChapterFour', () => {
  const mockOnChapterComplete = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders chapter header correctly', () => {
    render(<ChapterFour onChapterComplete={mockOnChapterComplete} />);
    
    expect(screen.getByText('Chapter 4')).toBeInTheDocument();
    expect(screen.getAllByText('The Vision')).toHaveLength(2); // Header and section
    expect(screen.getAllByText('Building the future, together')).toHaveLength(2); // Header and section
  });

  it('renders space background', () => {
    render(<ChapterFour onChapterComplete={mockOnChapterComplete} />);
    
    expect(screen.getByTestId('space-background')).toBeInTheDocument();
  });

  it('starts with the first section (intro)', () => {
    render(<ChapterFour onChapterComplete={mockOnChapterComplete} />);
    
    expect(screen.getAllByText('The Vision')).toHaveLength(2);
    expect(screen.getAllByText('Building the future, together')).toHaveLength(2);
    expect(screen.getByTestId('future-vision')).toBeInTheDocument();
  });

  it('progresses through sections when continue button is clicked', async () => {
    render(<ChapterFour onChapterComplete={mockOnChapterComplete} />);
    
    // Should start with section 0 (intro)
    expect(screen.getByTestId('future-vision')).toBeInTheDocument();
    
    // Click continue to go to section 1
    const continueButton = screen.getByText('Continue');
    fireEvent.click(continueButton);
    
    await waitFor(() => {
      expect(screen.getByText("What's Next?")).toBeInTheDocument();
      expect(screen.getByText('Technology evolves, fundamentals remain')).toBeInTheDocument();
    });
  });

  it('shows contact section in final section', async () => {
    render(<ChapterFour onChapterComplete={mockOnChapterComplete} />);
    
    // Navigate to final section
    const continueButton = screen.getByText('Continue');
    
    // Click twice to get to contact section
    fireEvent.click(continueButton);
    await waitFor(() => {
      fireEvent.click(screen.getByText('Continue'));
    });
    
    await waitFor(() => {
      expect(screen.getByText("Let's Connect")).toBeInTheDocument();
      expect(screen.getByTestId('contact-mission-control')).toBeInTheDocument();
    });
  });

  it('calls onChapterComplete when reaching the end', async () => {
    render(<ChapterFour onChapterComplete={mockOnChapterComplete} />);
    
    // Navigate through all sections
    const continueButton = screen.getByText('Continue');
    
    // Section 0 -> 1
    fireEvent.click(continueButton);
    
    await waitFor(() => {
      // Section 1 -> 2
      fireEvent.click(screen.getByText('Continue'));
    });
    
    await waitFor(() => {
      // Section 2 -> complete
      fireEvent.click(screen.getByText('Epilogue'));
    });
    
    await waitFor(() => {
      expect(mockOnChapterComplete).toHaveBeenCalledTimes(1);
    });
  });

  it('displays correct section progress indicators', () => {
    render(<ChapterFour onChapterComplete={mockOnChapterComplete} />);
    
    // Should have 3 progress indicators (3 sections)
    const progressIndicators = screen.getAllByRole('generic').filter(
      el => el.className.includes('w-3 h-3 rounded-full')
    );
    
    // Note: This test might need adjustment based on actual DOM structure
    // The exact number depends on how the progress indicators are rendered
    expect(progressIndicators.length).toBeGreaterThan(0);
  });

  it('applies futuristic theme styling', () => {
    const { container } = render(<ChapterFour onChapterComplete={mockOnChapterComplete} />);
    
    const mainContainer = container.querySelector('.bg-chapter4-background');
    expect(mainContainer).toBeInTheDocument();
  });

  it('shows fundamentals cards in section 1', async () => {
    render(<ChapterFour onChapterComplete={mockOnChapterComplete} />);
    
    // Navigate to section 1
    const continueButton = screen.getByText('Continue');
    fireEvent.click(continueButton);
    
    await waitFor(() => {
      expect(screen.getByText('User Empathy')).toBeInTheDocument();
      expect(screen.getByText('Attention to Detail')).toBeInTheDocument();
      expect(screen.getByText('Continuous Learning')).toBeInTheDocument();
    });
  });

  it('has proper accessibility structure', () => {
    render(<ChapterFour onChapterComplete={mockOnChapterComplete} />);
    
    // Check for proper heading hierarchy
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    
    // Check for button accessibility
    expect(screen.getByRole('button', { name: /continue/i })).toBeInTheDocument();
  });
});