import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { NarrativeTransition } from '../narrative-transition';
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
import { afterEach } from 'node:test';
import { beforeEach } from 'node:test';
import { describe } from 'node:test';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

describe('NarrativeTransition', () => {
  const defaultProps = {
    fromChapter: 1,
    toChapter: 2,
    isActive: true,
    onComplete: vi.fn()
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders nothing when not active', () => {
    render(
      <NarrativeTransition 
        {...defaultProps} 
        isActive={false}
      />
    );

    expect(screen.queryByText(/From growth to challenges/)).not.toBeInTheDocument();
  });

  it('renders transition content when active', () => {
    render(<NarrativeTransition {...defaultProps} />);

    expect(screen.getByText('From growth to challenges...')).toBeInTheDocument();
    expect(screen.getByText('🌱→🧩')).toBeInTheDocument();
    expect(screen.getByText('Chapter 1')).toBeInTheDocument();
    expect(screen.getByText('Chapter 2')).toBeInTheDocument();
  });

  it('calls onComplete after duration', async () => {
    const mockOnComplete = vi.fn();
    
    render(
      <NarrativeTransition 
        {...defaultProps} 
        duration={1000}
        onComplete={mockOnComplete}
      />
    );

    // Fast-forward time
    vi.advanceTimersByTime(1000);

    await waitFor(() => {
      expect(mockOnComplete).toHaveBeenCalled();
    });
  });

  it('shows correct transition theme for different chapter combinations', () => {
    const { rerender } = render(<NarrativeTransition {...defaultProps} />);

    expect(screen.getByText('From growth to challenges...')).toBeInTheDocument();
    expect(screen.getByText('🌱→🧩')).toBeInTheDocument();

    rerender(
      <NarrativeTransition 
        {...defaultProps}
        fromChapter={2}
        toChapter={3}
      />
    );

    expect(screen.getByText('From solving to leading...')).toBeInTheDocument();
    expect(screen.getByText('🧩→🤝')).toBeInTheDocument();
  });

  it('handles different transition types', () => {
    const { rerender } = render(
      <NarrativeTransition 
        {...defaultProps} 
        transitionType="slide"
      />
    );

    expect(screen.getByText('From growth to challenges...')).toBeInTheDocument();

    rerender(
      <NarrativeTransition 
        {...defaultProps} 
        transitionType="morph"
      />
    );

    expect(screen.getByText('From growth to challenges...')).toBeInTheDocument();

    rerender(
      <NarrativeTransition 
        {...defaultProps} 
        transitionType="dissolve"
      />
    );

    expect(screen.getByText('From growth to challenges...')).toBeInTheDocument();
  });

  it('renders particles pattern for appropriate transitions', () => {
    render(
      <NarrativeTransition 
        {...defaultProps}
        fromChapter={4}
        toChapter={1}
      />
    );

    expect(screen.getByText('Beginning anew...')).toBeInTheDocument();
    
    // Check for particle elements (20 particles)
    const particles = document.querySelectorAll('.bg-white.rounded-full');
    expect(particles.length).toBeGreaterThan(0);
  });

  it('renders waves pattern for chapter 3 to 4 transition', () => {
    render(
      <NarrativeTransition 
        {...defaultProps}
        fromChapter={3}
        toChapter={4}
      />
    );

    expect(screen.getByText('From leadership to vision...')).toBeInTheDocument();
    
    // Check for wave elements
    const waves = document.querySelectorAll('.bg-gradient-to-r.from-transparent.via-white.to-transparent');
    expect(waves.length).toBeGreaterThan(0);
  });

  it('renders geometric pattern for chapter 2 to 3 transition', () => {
    render(
      <NarrativeTransition 
        {...defaultProps}
        fromChapter={2}
        toChapter={3}
      />
    );

    expect(screen.getByText('From solving to leading...')).toBeInTheDocument();
    
    // Check for geometric elements
    const geometricElements = document.querySelectorAll('.border-2.border-white');
    expect(geometricElements.length).toBeGreaterThan(0);
  });

  it('uses default theme for unknown chapter combinations', () => {
    render(
      <NarrativeTransition 
        {...defaultProps}
        fromChapter={5}
        toChapter={6}
      />
    );

    // Should fall back to 1-2 transition theme
    expect(screen.getByText('From growth to challenges...')).toBeInTheDocument();
  });

  it('renders progress indicator', () => {
    render(<NarrativeTransition {...defaultProps} />);

    // Check for progress bar elements
    const progressContainer = document.querySelector('.bg-white\\/30.rounded-full');
    const progressBar = document.querySelector('.bg-white.rounded-full');
    
    expect(progressContainer).toBeInTheDocument();
    expect(progressBar).toBeInTheDocument();
  });

  it('handles custom duration', () => {
    const mockOnComplete = vi.fn();
    
    render(
      <NarrativeTransition 
        {...defaultProps} 
        duration={3000}
        onComplete={mockOnComplete}
      />
    );

    // Should not complete before custom duration
    vi.advanceTimersByTime(2000);
    expect(mockOnComplete).not.toHaveBeenCalled();

    // Should complete after custom duration
    vi.advanceTimersByTime(1000);
    expect(mockOnComplete).toHaveBeenCalled();
  });

  it('manages transition stages correctly', () => {
    render(<NarrativeTransition {...defaultProps} duration={1000} />);

    // Initially in enter stage
    expect(screen.getByText('From growth to challenges...')).toBeInTheDocument();

    // Advance to transition stage (20% of duration)
    vi.advanceTimersByTime(200);
    
    // Advance to exit stage (80% of duration)
    vi.advanceTimersByTime(600);
    
    // Complete (100% of duration)
    vi.advanceTimersByTime(200);
  });
});