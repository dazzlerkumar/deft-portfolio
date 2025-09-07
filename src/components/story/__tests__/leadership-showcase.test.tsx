import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LeadershipShowcase } from '../leadership-showcase';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h4: ({ children, ...props }: any) => <h4 {...props}>{children}</h4>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
}));

describe('LeadershipShowcase', () => {
  it('renders leadership showcase title and description', () => {
    render(<LeadershipShowcase />);
    
    expect(screen.getByText('Leadership in Action')).toBeInTheDocument();
    expect(screen.getByText('Key projects that demonstrate technical leadership and team impact')).toBeInTheDocument();
  });

  it('displays all leadership projects', () => {
    render(<LeadershipShowcase />);
    
    expect(screen.getByText('Enterprise Design System')).toBeInTheDocument();
    expect(screen.getByText('Performance Optimization Initiative')).toBeInTheDocument();
    expect(screen.getByText('Engineering Team Scaling')).toBeInTheDocument();
  });

  it('shows project descriptions correctly', () => {
    render(<LeadershipShowcase />);
    
    expect(screen.getByText(/Led the creation of a comprehensive design system/)).toBeInTheDocument();
    expect(screen.getByText(/Spearheaded a company-wide performance improvement/)).toBeInTheDocument();
    expect(screen.getByText(/Successfully scaled the frontend team from 3 to 15/)).toBeInTheDocument();
  });

  it('displays team size and duration for each project', () => {
    render(<LeadershipShowcase />);
    
    expect(screen.getByText('8 engineers')).toBeInTheDocument();
    expect(screen.getByText('12 engineers')).toBeInTheDocument();
    expect(screen.getByText('15 engineers')).toBeInTheDocument();
    
    expect(screen.getByText('6 months')).toBeInTheDocument();
    expect(screen.getByText('4 months')).toBeInTheDocument();
    expect(screen.getByText('12 months')).toBeInTheDocument();
  });

  it('shows leadership roles for each project', () => {
    render(<LeadershipShowcase />);
    
    expect(screen.getByText('Technical Lead & Architecture')).toBeInTheDocument();
    expect(screen.getByText('Performance Lead & Mentor')).toBeInTheDocument();
    expect(screen.getByText('Team Lead & Culture Champion')).toBeInTheDocument();
  });

  it('displays impact metrics for projects', () => {
    render(<LeadershipShowcase />);
    
    // Design System impacts
    expect(screen.getByText('+40%')).toBeInTheDocument();
    expect(screen.getByText('Development Speed')).toBeInTheDocument();
    expect(screen.getByText('95%')).toBeInTheDocument();
    expect(screen.getByText('Design Consistency')).toBeInTheDocument();
    
    // Performance impacts
    expect(screen.getByText('-60%')).toBeInTheDocument();
    expect(screen.getByText('Page Load Time')).toBeInTheDocument();
    expect(screen.getByText('+25%')).toBeInTheDocument();
    expect(screen.getByText('User Engagement')).toBeInTheDocument();
    
    // Team Scaling impacts
    expect(screen.getByText('400%')).toBeInTheDocument();
    expect(screen.getByText('Team Growth')).toBeInTheDocument();
  });

  it('expands project details when clicked', async () => {
    render(<LeadershipShowcase />);
    
    const designSystemProject = screen.getByText('Enterprise Design System').closest('div');
    
    if (designSystemProject) {
      fireEvent.click(designSystemProject);
      
      await waitFor(() => {
        expect(screen.getByText('The Challenge')).toBeInTheDocument();
        expect(screen.getByText('The Solution')).toBeInTheDocument();
        expect(screen.getByText('Technologies & Approaches')).toBeInTheDocument();
        expect(screen.getByText('Measurable Impact')).toBeInTheDocument();
      });
    }
  });

  it('shows detailed challenge and solution when expanded', async () => {
    render(<LeadershipShowcase />);
    
    const designSystemProject = screen.getByText('Enterprise Design System').closest('div');
    
    if (designSystemProject) {
      fireEvent.click(designSystemProject);
      
      await waitFor(() => {
        expect(screen.getByText(/Inconsistent UI\/UX across products/)).toBeInTheDocument();
        expect(screen.getByText(/Built a scalable component library/)).toBeInTheDocument();
      });
    }
  });

  it('displays technology tags when project is expanded', async () => {
    render(<LeadershipShowcase />);
    
    const designSystemProject = screen.getByText('Enterprise Design System').closest('div');
    
    if (designSystemProject) {
      fireEvent.click(designSystemProject);
      
      await waitFor(() => {
        expect(screen.getByText('React')).toBeInTheDocument();
        expect(screen.getByText('TypeScript')).toBeInTheDocument();
        expect(screen.getByText('Storybook')).toBeInTheDocument();
        expect(screen.getByText('Figma')).toBeInTheDocument();
        expect(screen.getByText('Jest')).toBeInTheDocument();
      });
    }
  });

  it('shows detailed impact metrics when expanded', async () => {
    render(<LeadershipShowcase />);
    
    const designSystemProject = screen.getByText('Enterprise Design System').closest('div');
    
    if (designSystemProject) {
      fireEvent.click(designSystemProject);
      
      await waitFor(() => {
        expect(screen.getByText('Faster feature delivery')).toBeInTheDocument();
        expect(screen.getByText('Cross-product alignment')).toBeInTheDocument();
        expect(screen.getByText('All teams using system')).toBeInTheDocument();
      });
    }
  });

  it('collapses project when clicked again', async () => {
    render(<LeadershipShowcase />);
    
    const designSystemProject = screen.getByText('Enterprise Design System').closest('div');
    
    if (designSystemProject) {
      // Expand
      fireEvent.click(designSystemProject);
      
      await waitFor(() => {
        expect(screen.getByText('The Challenge')).toBeInTheDocument();
      });
      
      // Collapse
      fireEvent.click(designSystemProject);
      
      await waitFor(() => {
        expect(screen.queryByText('The Challenge')).not.toBeInTheDocument();
      });
    }
  });

  it('renders call to action section', () => {
    render(<LeadershipShowcase />);
    
    expect(screen.getByText('Want to see how I can help scale your team and deliver impact?')).toBeInTheDocument();
    expect(screen.getByText('Let\'s Connect')).toBeInTheDocument();
  });

  it('applies chapter 3 theme styling', () => {
    render(<LeadershipShowcase />);
    
    const container = screen.getByText('Leadership in Action').closest('div');
    expect(container).toHaveClass('border-chapter3-primary/20');
  });

  it('validates impact metric data types', () => {
    render(<LeadershipShowcase />);
    
    // Check that percentage and numeric values are displayed correctly
    const impactValues = ['+40%', '95%', '100%', '-60%', '+25%', '+35%', '400%', '92%'];
    
    impactValues.forEach(value => {
      expect(screen.getByText(value)).toBeInTheDocument();
    });
  });

  it('handles hover interactions on projects', async () => {
    render(<LeadershipShowcase />);
    
    const designSystemProject = screen.getByText('Enterprise Design System').closest('div');
    
    if (designSystemProject) {
      fireEvent.mouseEnter(designSystemProject);
      
      // Should handle hover state (component should not crash)
      expect(designSystemProject).toBeInTheDocument();
      
      fireEvent.mouseLeave(designSystemProject);
    }
  });
});