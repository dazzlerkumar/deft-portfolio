import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { InteractiveTimeline } from '../interactive-timeline';
import { TimelineEvent, UserProgress } from '@/lib/types';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => <div>{children}</div>,
}));

const mockEvents: TimelineEvent[] = [
  {
    id: 'event-1',
    title: 'The Beginning',
    date: 'Early Career',
    description: 'Starting the journey as a frontend developer.',
    chapterId: 'chapter-1',
    position: 0
  },
  {
    id: 'event-2',
    title: 'First Framework',
    date: 'Year 1',
    description: 'Mastering the first JavaScript framework.',
    chapterId: 'chapter-1',
    position: 1
  },
  {
    id: 'event-3',
    title: 'The Challenges',
    date: 'Mid Career',
    description: 'Facing complex technical challenges.',
    chapterId: 'chapter-2',
    position: 2
  }
];

const mockUserProgress: UserProgress = {
  currentChapter: 1,
  visitedSections: ['event-1'],
  interactionHistory: [],
  preferences: {
    reducedMotion: false,
    skipAnimations: false,
    preferredNavigationStyle: 'story',
    theme: 'auto',
    soundEnabled: true
  },
  completionPercentage: 33,
  lastVisit: new Date()
};

describe('InteractiveTimeline', () => {
  const mockOnEventSelect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders timeline events correctly', () => {
    render(
      <InteractiveTimeline
        events={mockEvents}
        currentPosition={0}
        onEventSelect={mockOnEventSelect}
      />
    );

    expect(screen.getByText('Story Progress')).toBeInTheDocument();
    expect(screen.getByText('The Beginning')).toBeInTheDocument();
    expect(screen.getByText('First Framework')).toBeInTheDocument();
    expect(screen.getByText('The Challenges')).toBeInTheDocument();
  });

  it('displays progress indicator correctly', () => {
    render(
      <InteractiveTimeline
        events={mockEvents}
        currentPosition={1}
        onEventSelect={mockOnEventSelect}
      />
    );

    expect(screen.getByText('2 of 3 milestones')).toBeInTheDocument();
  });

  it('handles event selection', async () => {
    render(
      <InteractiveTimeline
        events={mockEvents}
        currentPosition={0}
        onEventSelect={mockOnEventSelect}
      />
    );

    const firstEvent = screen.getByText('The Beginning').closest('.timeline-event');
    expect(firstEvent).toBeInTheDocument();

    if (firstEvent) {
      fireEvent.click(firstEvent);
      await waitFor(() => {
        expect(mockOnEventSelect).toHaveBeenCalledWith(mockEvents[0]);
      });
    }
  });

  it('shows visited events with checkmarks', () => {
    render(
      <InteractiveTimeline
        events={mockEvents}
        currentPosition={1}
        onEventSelect={mockOnEventSelect}
        userProgress={mockUserProgress}
      />
    );

    // Check for checkmark SVG in visited event
    const checkmarks = screen.getAllByRole('img', { hidden: true });
    expect(checkmarks.length).toBeGreaterThan(0);
  });

  it('disables inaccessible events', () => {
    render(
      <InteractiveTimeline
        events={mockEvents}
        currentPosition={0}
        onEventSelect={mockOnEventSelect}
      />
    );

    // Event at position 2 should be inaccessible when current position is 0
    const futureEvent = screen.getByText('The Challenges').closest('.timeline-event');
    expect(futureEvent).toHaveClass('opacity-50');
    expect(futureEvent).toHaveClass('cursor-not-allowed');
  });

  it('handles skip ahead functionality', async () => {
    render(
      <InteractiveTimeline
        events={mockEvents}
        currentPosition={0}
        onEventSelect={mockOnEventSelect}
      />
    );

    const skipButton = screen.getByText('Skip to Next Chapter');
    fireEvent.click(skipButton);

    await waitFor(() => {
      expect(mockOnEventSelect).toHaveBeenCalledWith(mockEvents[1]);
    });
  });

  it('disables skip button when at last event', () => {
    render(
      <InteractiveTimeline
        events={mockEvents}
        currentPosition={2}
        onEventSelect={mockOnEventSelect}
      />
    );

    const skipButton = screen.getByText('Skip to Next Chapter');
    expect(skipButton).toBeDisabled();
  });

  it('shows event descriptions on hover', async () => {
    render(
      <InteractiveTimeline
        events={mockEvents}
        currentPosition={0}
        onEventSelect={mockOnEventSelect}
      />
    );

    const firstEvent = screen.getByText('The Beginning').closest('.timeline-event');
    if (firstEvent) {
      fireEvent.mouseEnter(firstEvent);
      
      await waitFor(() => {
        expect(screen.getByText('Starting the journey as a frontend developer.')).toBeInTheDocument();
      });
    }
  });

  it('highlights current event', () => {
    render(
      <InteractiveTimeline
        events={mockEvents}
        currentPosition={1}
        onEventSelect={mockOnEventSelect}
      />
    );

    // The current event should have specific styling
    const currentEventNode = screen.getByText('2').closest('div');
    expect(currentEventNode).toHaveClass('bg-blue-600');
  });

  it('applies custom className', () => {
    const { container } = render(
      <InteractiveTimeline
        events={mockEvents}
        currentPosition={0}
        onEventSelect={mockOnEventSelect}
        className="custom-timeline"
      />
    );

    expect(container.firstChild).toHaveClass('interactive-timeline');
    expect(container.firstChild).toHaveClass('custom-timeline');
  });

  it('handles empty events array', () => {
    render(
      <InteractiveTimeline
        events={[]}
        currentPosition={0}
        onEventSelect={mockOnEventSelect}
      />
    );

    expect(screen.getByText('0 of 0 milestones')).toBeInTheDocument();
  });
});