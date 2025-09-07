import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { 
  BreadcrumbNavigation, 
  StoryPositionIndicator, 
  StoryNavigation 
} from '../breadcrumb-navigation';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
}));

// Mock lucide-react icons
vi.mock('lucide-react', () => ({
  ChevronRight: () => <div data-testid="chevron-right" />,
  Home: () => <div data-testid="home-icon" />,
}));

const mockBreadcrumbItems = [
  { id: 'chapter-1', title: 'The Beginning', isActive: false, isAccessible: true },
  { id: 'chapter-2', title: 'The Challenges', isActive: true, isAccessible: true },
  { id: 'chapter-3', title: 'The Leadership', isActive: false, isAccessible: false },
];

describe('BreadcrumbNavigation', () => {
  const mockOnNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders breadcrumb items correctly', () => {
    render(
      <BreadcrumbNavigation
        items={mockBreadcrumbItems}
        onNavigate={mockOnNavigate}
      />
    );

    expect(screen.getByText('The Beginning')).toBeInTheDocument();
    expect(screen.getByText('The Challenges')).toBeInTheDocument();
    expect(screen.getByText('The Leadership')).toBeInTheDocument();
  });

  it('shows home button when enabled', () => {
    render(
      <BreadcrumbNavigation
        items={mockBreadcrumbItems}
        onNavigate={mockOnNavigate}
        showHome={true}
      />
    );

    expect(screen.getByTestId('home-icon')).toBeInTheDocument();
  });

  it('hides home button when disabled', () => {
    render(
      <BreadcrumbNavigation
        items={mockBreadcrumbItems}
        onNavigate={mockOnNavigate}
        showHome={false}
      />
    );

    expect(screen.queryByTestId('home-icon')).not.toBeInTheDocument();
  });

  it('handles navigation clicks', () => {
    render(
      <BreadcrumbNavigation
        items={mockBreadcrumbItems}
        onNavigate={mockOnNavigate}
      />
    );

    fireEvent.click(screen.getByText('The Beginning'));
    expect(mockOnNavigate).toHaveBeenCalledWith(mockBreadcrumbItems[0]);
  });

  it('disables inaccessible items', () => {
    render(
      <BreadcrumbNavigation
        items={mockBreadcrumbItems}
        onNavigate={mockOnNavigate}
      />
    );

    const inaccessibleItem = screen.getByText('The Leadership');
    expect(inaccessibleItem).toHaveClass('cursor-not-allowed');
    
    fireEvent.click(inaccessibleItem);
    expect(mockOnNavigate).not.toHaveBeenCalledWith(mockBreadcrumbItems[2]);
  });

  it('highlights active item', () => {
    render(
      <BreadcrumbNavigation
        items={mockBreadcrumbItems}
        onNavigate={mockOnNavigate}
      />
    );

    const activeItem = screen.getByText('The Challenges');
    expect(activeItem).toHaveClass('text-blue-600');
  });

  it('shows chevron separators', () => {
    render(
      <BreadcrumbNavigation
        items={mockBreadcrumbItems}
        onNavigate={mockOnNavigate}
      />
    );

    const chevrons = screen.getAllByTestId('chevron-right');
    // Should have chevrons between home and first item, and between items
    expect(chevrons.length).toBeGreaterThan(0);
  });
});

describe('StoryPositionIndicator', () => {
  it('displays chapter information correctly', () => {
    render(
      <StoryPositionIndicator
        currentChapter={1}
        totalChapters={4}
        chapterTitle="The Challenges"
        completionPercentage={50}
      />
    );

    expect(screen.getByText('Chapter 2: The Challenges')).toBeInTheDocument();
    expect(screen.getByText('2 of 4 chapters')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('renders progress dots correctly', () => {
    const { container } = render(
      <StoryPositionIndicator
        currentChapter={1}
        totalChapters={4}
        chapterTitle="The Challenges"
        completionPercentage={50}
      />
    );

    // Should render 4 dots for 4 chapters
    const dots = container.querySelectorAll('.w-3.h-3.rounded-full');
    expect(dots).toHaveLength(4);
  });

  it('highlights current chapter dot', () => {
    const { container } = render(
      <StoryPositionIndicator
        currentChapter={1}
        totalChapters={4}
        chapterTitle="The Challenges"
        completionPercentage={50}
      />
    );

    const dots = container.querySelectorAll('.w-3.h-3.rounded-full');
    // Second dot (index 1) should be current
    expect(dots[1]).toHaveClass('bg-blue-600');
  });
});

describe('StoryNavigation', () => {
  const mockOnNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders both breadcrumb and position indicator', () => {
    render(
      <StoryNavigation
        currentChapter={1}
        totalChapters={4}
        chapterTitle="The Challenges"
        completionPercentage={50}
        breadcrumbItems={mockBreadcrumbItems}
        onNavigate={mockOnNavigate}
      />
    );

    // Should have breadcrumb elements
    expect(screen.getByText('The Beginning')).toBeInTheDocument();
    
    // Should have position indicator elements
    expect(screen.getByText('Chapter 2: The Challenges')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('handles navigation from breadcrumb', () => {
    render(
      <StoryNavigation
        currentChapter={1}
        totalChapters={4}
        chapterTitle="The Challenges"
        completionPercentage={50}
        breadcrumbItems={mockBreadcrumbItems}
        onNavigate={mockOnNavigate}
      />
    );

    fireEvent.click(screen.getByText('The Beginning'));
    expect(mockOnNavigate).toHaveBeenCalledWith(mockBreadcrumbItems[0]);
  });

  it('applies custom className', () => {
    const { container } = render(
      <StoryNavigation
        currentChapter={1}
        totalChapters={4}
        chapterTitle="The Challenges"
        completionPercentage={50}
        breadcrumbItems={mockBreadcrumbItems}
        onNavigate={mockOnNavigate}
        className="custom-navigation"
      />
    );

    expect(container.firstChild).toHaveClass('story-navigation');
    expect(container.firstChild).toHaveClass('custom-navigation');
  });
});