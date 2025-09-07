import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { StoryLayout } from '../story-layout';
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
import { beforeEach } from 'node:test';
import { describe } from 'node:test';

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
    nav: ({ children, ...props }: any) => <nav {...props}>{children}</nav>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

const mockPush = vi.fn();
const mockRouter = {
  push: mockPush,
  pathname: '/',
  query: {},
  asPath: '/',
};

describe('StoryLayout', () => {
  beforeEach(() => {
    (useRouter as any).mockReturnValue(mockRouter);
    mockPush.mockClear();
    
    // Mock window.innerWidth for mobile detection
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  it('renders children correctly', () => {
    render(
      <StoryLayout>
        <div data-testid="test-content">Test Content</div>
      </StoryLayout>
    );

    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });

  it('shows navigation when showNavigation is true', () => {
    render(
      <StoryLayout showNavigation={true}>
        <div>Content</div>
      </StoryLayout>
    );

    // Should show chapter navigation buttons
    expect(screen.getByText('The Beginning')).toBeInTheDocument();
    expect(screen.getByText('The Challenges')).toBeInTheDocument();
    expect(screen.getByText('The Leadership')).toBeInTheDocument();
    expect(screen.getByText('The Vision')).toBeInTheDocument();
  });

  it('hides navigation when showNavigation is false', () => {
    render(
      <StoryLayout showNavigation={false}>
        <div>Content</div>
      </StoryLayout>
    );

    expect(screen.queryByText('The Beginning')).not.toBeInTheDocument();
  });

  it('highlights current chapter correctly', () => {
    render(
      <StoryLayout currentChapter={2} showNavigation={true}>
        <div>Content</div>
      </StoryLayout>
    );

    const chapterButtons = screen.getAllByRole('button');
    const chapter2Button = chapterButtons.find(button => 
      button.textContent?.includes('The Challenges')
    );
    
    expect(chapter2Button).toHaveClass('bg-white/20');
  });

  it('calls onChapterChange when chapter navigation is clicked', async () => {
    const mockOnChapterChange = vi.fn();
    
    render(
      <StoryLayout 
        currentChapter={1} 
        showNavigation={true}
        onChapterChange={mockOnChapterChange}
      >
        <div>Content</div>
      </StoryLayout>
    );

    const challengesButton = screen.getByText('The Challenges');
    fireEvent.click(challengesButton);

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/chapter/2');
      expect(mockOnChapterChange).toHaveBeenCalledWith(2);
    });
  });

  it('disables navigation to unvisited chapters', () => {
    const userProgress = {
      visitedSections: ['chapter-1'],
      completionPercentage: 25
    };

    render(
      <StoryLayout 
        currentChapter={1} 
        showNavigation={true}
        userProgress={userProgress}
      >
        <div>Content</div>
      </StoryLayout>
    );

    const leadershipButton = screen.getByText('The Leadership');
    expect(leadershipButton).toBeDisabled();
  });

  it('shows progress indicator with correct percentage', () => {
    const userProgress = {
      visitedSections: ['chapter-1', 'chapter-2'],
      completionPercentage: 50
    };

    render(
      <StoryLayout 
        currentChapter={2} 
        userProgress={userProgress}
      >
        <div>Content</div>
      </StoryLayout>
    );

    const progressBar = document.querySelector('[style*="width: 50%"]');
    expect(progressBar).toBeInTheDocument();
  });

  it('provides skip navigation for accessibility', () => {
    render(
      <StoryLayout>
        <div>Content</div>
      </StoryLayout>
    );

    const skipLink = screen.getByText('Skip to main content');
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('handles mobile navigation toggle', () => {
    // Mock mobile viewport
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 600,
    });

    render(
      <StoryLayout showNavigation={true}>
        <div>Content</div>
      </StoryLayout>
    );

    const toggleButton = screen.getByLabelText('Toggle navigation');
    expect(toggleButton).toBeInTheDocument();

    fireEvent.click(toggleButton);
    
    // Mobile menu should appear
    expect(screen.getByText('Chapter 1: The Beginning')).toBeInTheDocument();
  });

  it('shows chapter breadcrumbs at bottom', () => {
    render(
      <StoryLayout currentChapter={2} showNavigation={true}>
        <div>Content</div>
      </StoryLayout>
    );

    expect(screen.getByText('2 / 4')).toBeInTheDocument();
    expect(screen.getByLabelText('Previous chapter')).toBeInTheDocument();
    expect(screen.getByLabelText('Next chapter')).toBeInTheDocument();
  });

  it('disables previous button on first chapter', () => {
    render(
      <StoryLayout currentChapter={1} showNavigation={true}>
        <div>Content</div>
      </StoryLayout>
    );

    const prevButton = screen.getByLabelText('Previous chapter');
    expect(prevButton).toBeDisabled();
  });

  it('disables next button on last chapter', () => {
    render(
      <StoryLayout currentChapter={4} showNavigation={true}>
        <div>Content</div>
      </StoryLayout>
    );

    const nextButton = screen.getByLabelText('Next chapter');
    expect(nextButton).toBeDisabled();
  });
});