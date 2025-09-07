import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { TimelineDemo } from '../timeline-demo';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
  AnimatePresence: ({ children }: any) => <div>{children}</div>,
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  ChevronRight: () => <div data-testid="chevron-right" />,
  Home: () => <div data-testid="home-icon" />,
}));

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('Timeline Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorageMock.getItem.mockReturnValue(null);
    
    // Reset the singleton instance
    const { ProgressTracker } = require('@/lib/utils/progress-tracker');
    (ProgressTracker as any).instance = undefined;
  });

  it('renders complete timeline demo', () => {
    render(<TimelineDemo />);

    expect(screen.getByText('Interactive Story Timeline Demo')).toBeInTheDocument();
    expect(screen.getByText('Current Progress')).toBeInTheDocument();
    expect(screen.getByText('User Preferences')).toBeInTheDocument();
  });

  it('displays initial progress state', () => {
    render(<TimelineDemo />);

    expect(screen.getByText('Chapter:')).toBeInTheDocument();
    expect(screen.getByText('Completion:')).toBeInTheDocument();
    expect(screen.getByText('Sections Visited:')).toBeInTheDocument();
    expect(screen.getByText('Interactions:')).toBeInTheDocument();
  });

  it('shows timeline events', () => {
    render(<TimelineDemo />);

    expect(screen.getByText('The Beginning')).toBeInTheDocument();
    expect(screen.getByText('First Framework')).toBeInTheDocument();
    expect(screen.getByText('The Challenges')).toBeInTheDocument();
  });

  it('handles timeline event selection', async () => {
    render(<TimelineDemo />);

    // Find and click on a timeline event
    const timelineEvent = screen.getByText('First Framework').closest('.timeline-event');
    expect(timelineEvent).toBeInTheDocument();

    if (timelineEvent) {
      fireEvent.click(timelineEvent);

      await waitFor(() => {
        // Should update the current event display
        expect(screen.getByText('Current: First Framework')).toBeInTheDocument();
      });
    }
  });

  it('updates progress when navigating', async () => {
    render(<TimelineDemo />);

    // Click on a later event
    const challengesEvent = screen.getByText('The Challenges').closest('.timeline-event');
    if (challengesEvent) {
      fireEvent.click(challengesEvent);

      await waitFor(() => {
        // Progress should be updated
        expect(screen.getByText('Current: The Challenges')).toBeInTheDocument();
      });
    }
  });

  it('handles preference changes', async () => {
    render(<TimelineDemo />);

    const reducedMotionCheckbox = screen.getByLabelText('Reduced Motion');
    fireEvent.click(reducedMotionCheckbox);

    await waitFor(() => {
      expect(reducedMotionCheckbox).toBeChecked();
    });
  });

  it('shows breadcrumb navigation', () => {
    render(<TimelineDemo />);

    expect(screen.getByTestId('home-icon')).toBeInTheDocument();
    expect(screen.getByText('The Beginning')).toBeInTheDocument();
  });

  it('handles breadcrumb navigation', async () => {
    render(<TimelineDemo />);

    const homeButton = screen.getByTestId('home-icon').closest('button');
    if (homeButton) {
      fireEvent.click(homeButton);

      await waitFor(() => {
        // Should navigate to the beginning
        expect(screen.getByText('Current: The Beginning')).toBeInTheDocument();
      });
    }
  });

  it('displays story position indicator', () => {
    render(<TimelineDemo />);

    expect(screen.getByText(/Chapter \d+:/)).toBeInTheDocument();
    expect(screen.getByText(/\d+ of \d+ chapters/)).toBeInTheDocument();
    expect(screen.getByText(/\d+%/)).toBeInTheDocument();
  });

  it('shows skip ahead functionality', () => {
    render(<TimelineDemo />);

    const skipButton = screen.getByText('Skip to Next Chapter');
    expect(skipButton).toBeInTheDocument();
    expect(skipButton).not.toBeDisabled();
  });

  it('handles navigation style preference', async () => {
    render(<TimelineDemo />);

    const navigationSelect = screen.getByDisplayValue('Story Navigation');
    fireEvent.change(navigationSelect, { target: { value: 'traditional' } });

    await waitFor(() => {
      expect(navigationSelect).toHaveValue('traditional');
    });
  });

  it('persists progress in localStorage', async () => {
    render(<TimelineDemo />);

    // Navigate to trigger localStorage save
    const timelineEvent = screen.getByText('First Framework').closest('.timeline-event');
    if (timelineEvent) {
      fireEvent.click(timelineEvent);

      await waitFor(() => {
        expect(localStorageMock.setItem).toHaveBeenCalledWith(
          'storytelling-portfolio-progress',
          expect.any(String)
        );
      });
    }
  });

  it('shows debug information when expanded', async () => {
    render(<TimelineDemo />);

    const debugToggle = screen.getByText('Debug Information');
    fireEvent.click(debugToggle);

    await waitFor(() => {
      expect(screen.getByText(/"currentPosition":/)).toBeInTheDocument();
    });
  });

  it('displays current event details', () => {
    render(<TimelineDemo />);

    // Should show details for the initial event
    expect(screen.getByText(/Current: /)).toBeInTheDocument();
    expect(screen.getByText(/Early Career/)).toBeInTheDocument();
  });

  it('handles accessibility features', () => {
    render(<TimelineDemo />);

    // Check for proper ARIA labels
    const breadcrumbNav = screen.getByLabelText('Breadcrumb');
    expect(breadcrumbNav).toBeInTheDocument();

    // Check for proper form labels
    const reducedMotionLabel = screen.getByLabelText('Reduced Motion');
    expect(reducedMotionLabel).toBeInTheDocument();
  });
});