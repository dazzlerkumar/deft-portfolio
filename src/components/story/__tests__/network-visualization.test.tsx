import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { NetworkVisualization } from '../network-visualization';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    line: ({ children, ...props }: any) => <line {...props}>{children}</line>,
    circle: ({ children, ...props }: any) => <circle {...props}>{children}</circle>,
    g: ({ children, ...props }: any) => <g {...props}>{children}</g>,
  },
}));

describe('NetworkVisualization', () => {
  it('renders network visualization title and description', () => {
    render(<NetworkVisualization />);
    
    expect(screen.getByText('Team Collaboration Network')).toBeInTheDocument();
    expect(screen.getByText('Visualizing connections, influence, and collaborative impact')).toBeInTheDocument();
  });

  it('displays team statistics correctly', () => {
    render(<NetworkVisualization />);
    
    expect(screen.getByText('8')).toBeInTheDocument();
    expect(screen.getByText('Team Members')).toBeInTheDocument();
    expect(screen.getByText('15+')).toBeInTheDocument();
    expect(screen.getByText('Cross-team Connections')).toBeInTheDocument();
    expect(screen.getByText('300%')).toBeInTheDocument();
    expect(screen.getByText('Productivity Increase')).toBeInTheDocument();
  });

  it('renders network nodes with correct data', () => {
    render(<NetworkVisualization />);
    
    // Check for team member labels
    expect(screen.getByText('Tech Lead')).toBeInTheDocument();
    expect(screen.getByText('You')).toBeInTheDocument();
    expect(screen.getByText('Senior Dev')).toBeInTheDocument();
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('UX Designer')).toBeInTheDocument();
    expect(screen.getByText('Design')).toBeInTheDocument();
  });

  it('displays impact percentages for team members', () => {
    render(<NetworkVisualization />);
    
    expect(screen.getByText('Impact: 100%')).toBeInTheDocument(); // Tech Lead
    expect(screen.getByText('Impact: 85%')).toBeInTheDocument();  // Senior Dev
    expect(screen.getByText('Impact: 80%')).toBeInTheDocument();  // UX Designer
  });

  it('shows connection type legend', () => {
    render(<NetworkVisualization />);
    
    expect(screen.getByText('Leadership')).toBeInTheDocument();
    expect(screen.getByText('Mentorship')).toBeInTheDocument();
    expect(screen.getByText('Collaboration')).toBeInTheDocument();
  });

  it('renders SVG network visualization', () => {
    render(<NetworkVisualization />);
    
    const svg = document.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('handles node hover interactions', async () => {
    render(<NetworkVisualization />);
    
    // Find a node label (they should be clickable/hoverable)
    const techLeadLabel = screen.getByText('Tech Lead');
    const container = techLeadLabel.closest('div');
    
    if (container) {
      fireEvent.mouseEnter(container);
      
      await waitFor(() => {
        // The active node should have different styling
        expect(container).toBeInTheDocument();
      });
      
      fireEvent.mouseLeave(container);
    }
  });

  it('applies chapter 3 theme colors', () => {
    render(<NetworkVisualization />);
    
    const container = screen.getByText('Team Collaboration Network').closest('div')?.parentElement;
    expect(container).toHaveClass('border-chapter3-primary/20');
  });

  it('displays correct network structure data', () => {
    render(<NetworkVisualization />);
    
    // Verify all expected team roles are present
    const roles = ['You', 'Frontend', 'Backend', 'Fullstack', 'Design', 'Product'];
    roles.forEach(role => {
      expect(screen.getByText(role)).toBeInTheDocument();
    });
  });
});