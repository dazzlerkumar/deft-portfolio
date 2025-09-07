import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { LearningMilestones } from '../learning-milestones';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    h4: ({ children, ...props }: any) => <h4 {...props}>{children}</h4>,
    h5: ({ children, ...props }: any) => <h5 {...props}>{children}</h5>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    svg: ({ children, ...props }: any) => <svg {...props}>{children}</svg>,
    path: ({ children, ...props }: any) => <path {...props}>{children}</path>,
  },
  useInView: () => true,
  useAnimation: () => ({
    start: vi.fn()
  }),
  AnimatePresence: ({ children }: any) => children,
}));

const mockMilestones = [
  {
    id: 'milestone-1',
    title: 'First HTML Page',
    date: '2015-03',
    description: 'Created my first static webpage with basic HTML and CSS',
    skills: ['HTML', 'CSS'],
    achievement: 'Built a personal homepage with navigation and styling',
    impact: 'Discovered the joy of seeing code come to life in the browser'
  },
  {
    id: 'milestone-2',
    title: 'JavaScript Fundamentals',
    date: '2015-06',
    description: 'Learned JavaScript basics and DOM manipulation',
    skills: ['JavaScript', 'DOM'],
    achievement: 'Created interactive elements and form validation',
    impact: 'Understood how to make websites dynamic and responsive to user input'
  }
];

describe('LearningMilestones', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component title and description', () => {
    render(<LearningMilestones milestones={mockMilestones} />);
    
    expect(screen.getByText('Learning Milestones')).toBeInTheDocument();
    expect(screen.getByText(/Click on each milestone to explore/)).toBeInTheDocument();
  });

  it('displays all milestones', () => {
    render(<LearningMilestones milestones={mockMilestones} />);
    
    expect(screen.getByText('First HTML Page')).toBeInTheDocument();
    expect(screen.getByText('JavaScript Fundamentals')).toBeInTheDocument();
    expect(screen.getByText('2015-03')).toBeInTheDocument();
    expect(screen.getByText('2015-06')).toBeInTheDocument();
  });

  it('shows milestone descriptions', () => {
    render(<LearningMilestones milestones={mockMilestones} />);
    
    expect(screen.getByText('Created my first static webpage with basic HTML and CSS')).toBeInTheDocument();
    expect(screen.getByText('Learned JavaScript basics and DOM manipulation')).toBeInTheDocument();
  });

  it('displays skill tags for each milestone', () => {
    render(<LearningMilestones milestones={mockMilestones} />);
    
    expect(screen.getByText('HTML')).toBeInTheDocument();
    expect(screen.getByText('CSS')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
    expect(screen.getByText('DOM')).toBeInTheDocument();
  });

  it('expands milestone details when clicked', async () => {
    render(<LearningMilestones milestones={mockMilestones} />);
    
    const firstMilestone = screen.getByText('First HTML Page').closest('div');
    expect(firstMilestone).toBeInTheDocument();
    
    // Initially, expanded content should not be visible
    expect(screen.queryByText('Achievement')).not.toBeInTheDocument();
    
    // Click to expand
    fireEvent.click(firstMilestone!);
    
    // Wait for expanded content to appear
    await waitFor(() => {
      expect(screen.getByText('Achievement')).toBeInTheDocument();
      expect(screen.getByText('Impact')).toBeInTheDocument();
      expect(screen.getByText('Built a personal homepage with navigation and styling')).toBeInTheDocument();
    });
  });

  it('collapses milestone when clicked again', async () => {
    render(<LearningMilestones milestones={mockMilestones} />);
    
    const firstMilestone = screen.getByText('First HTML Page').closest('div');
    
    // Expand first
    fireEvent.click(firstMilestone!);
    await waitFor(() => {
      expect(screen.getByText('Achievement')).toBeInTheDocument();
    });
    
    // Collapse
    fireEvent.click(firstMilestone!);
    await waitFor(() => {
      expect(screen.queryByText('Achievement')).not.toBeInTheDocument();
    });
  });

  it('handles hover interactions', () => {
    render(<LearningMilestones milestones={mockMilestones} />);
    
    const firstMilestone = screen.getByText('First HTML Page').closest('div');
    
    // Simulate hover
    fireEvent.mouseEnter(firstMilestone!);
    fireEvent.mouseLeave(firstMilestone!);
    
    // Should not throw any errors
    expect(firstMilestone).toBeInTheDocument();
  });

  it('renders with custom className', () => {
    const { container } = render(
      <LearningMilestones milestones={mockMilestones} className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('handles empty milestones array', () => {
    render(<LearningMilestones milestones={[]} />);
    
    expect(screen.getByText('Learning Milestones')).toBeInTheDocument();
    expect(screen.queryByText('First HTML Page')).not.toBeInTheDocument();
  });

  it('displays expand/collapse indicators correctly', () => {
    render(<LearningMilestones milestones={mockMilestones} />);
    
    expect(screen.getAllByText('Click to expand')).toHaveLength(mockMilestones.length);
  });

  it('alternates milestone positioning', () => {
    const { container } = render(<LearningMilestones milestones={mockMilestones} />);
    
    const milestoneContainers = container.querySelectorAll('.justify-start, .justify-end');
    expect(milestoneContainers.length).toBeGreaterThan(0);
  });
});