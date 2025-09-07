import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { TeamImpactMetrics } from '../team-impact-metrics';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
  },
}));

describe('TeamImpactMetrics', () => {
  it('renders main metrics dashboard title', () => {
    render(<TeamImpactMetrics />);
    
    expect(screen.getByText('Team Performance Metrics')).toBeInTheDocument();
    expect(screen.getByText('Measurable impact of effective technical leadership')).toBeInTheDocument();
  });

  it('displays all performance metrics correctly', () => {
    render(<TeamImpactMetrics />);
    
    // Check for metric labels
    expect(screen.getByText('Delivery Speed')).toBeInTheDocument();
    expect(screen.getByText('Code Quality')).toBeInTheDocument();
    expect(screen.getByText('Team Satisfaction')).toBeInTheDocument();
    expect(screen.getByText('Team Retention')).toBeInTheDocument();
  });

  it('shows metric values with correct units', () => {
    render(<TeamImpactMetrics />);
    
    // Check for percentage values (they should be visible)
    expect(screen.getByText(/85%/)).toBeInTheDocument(); // Delivery Speed
    expect(screen.getByText(/92%/)).toBeInTheDocument(); // Code Quality
    expect(screen.getByText(/88%/)).toBeInTheDocument(); // Team Satisfaction
    expect(screen.getByText(/95%/)).toBeInTheDocument(); // Team Retention
  });

  it('displays trend indicators for metrics', () => {
    render(<TeamImpactMetrics />);
    
    // All metrics should show "Trending up"
    const trendingUpElements = screen.getAllByText('Trending up');
    expect(trendingUpElements.length).toBeGreaterThan(0);
  });

  it('renders individual team member growth tracking', () => {
    render(<TeamImpactMetrics />);
    
    expect(screen.getByText('Individual Growth Tracking')).toBeInTheDocument();
    expect(screen.getByText('How leadership investment translates to personal development')).toBeInTheDocument();
  });

  it('displays team member information correctly', () => {
    render(<TeamImpactMetrics />);
    
    // Check for team member names
    expect(screen.getByText('Alice Chen')).toBeInTheDocument();
    expect(screen.getByText('Bob Martinez')).toBeInTheDocument();
    expect(screen.getByText('Carol Kim')).toBeInTheDocument();
    expect(screen.getByText('David Wilson')).toBeInTheDocument();
    
    // Check for roles
    expect(screen.getByText('Senior Frontend')).toBeInTheDocument();
    expect(screen.getByText('Backend Lead')).toBeInTheDocument();
    expect(screen.getByText('Full Stack')).toBeInTheDocument();
    expect(screen.getByText('Junior Dev')).toBeInTheDocument();
  });

  it('shows individual growth metrics for team members', () => {
    render(<TeamImpactMetrics />);
    
    // Check for growth metric labels
    expect(screen.getAllByText('Skill Growth')).toHaveLength(4);
    expect(screen.getAllByText('Satisfaction')).toHaveLength(4);
    expect(screen.getAllByText('Productivity')).toHaveLength(4);
  });

  it('displays team member avatars', () => {
    render(<TeamImpactMetrics />);
    
    // Check for avatar initials
    expect(screen.getByText('AC')).toBeInTheDocument(); // Alice Chen
    expect(screen.getByText('BM')).toBeInTheDocument(); // Bob Martinez
    expect(screen.getByText('CK')).toBeInTheDocument(); // Carol Kim
    expect(screen.getByText('DW')).toBeInTheDocument(); // David Wilson
  });

  it('handles metric selection interactions', async () => {
    render(<TeamImpactMetrics />);
    
    // Find and click on a metric
    const deliveryMetric = screen.getByText('Delivery Speed').closest('div');
    
    if (deliveryMetric) {
      fireEvent.click(deliveryMetric);
      
      await waitFor(() => {
        // Should show the description when selected
        expect(screen.getByText('Faster feature delivery through improved processes')).toBeInTheDocument();
      });
    }
  });

  it('displays leadership impact summary', () => {
    render(<TeamImpactMetrics />);
    
    expect(screen.getByText('Leadership Impact Summary')).toBeInTheDocument();
    expect(screen.getByText('300%')).toBeInTheDocument();
    expect(screen.getByText('Team Velocity Increase')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('Team Members Lost')).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
    expect(screen.getByText('Promotions Achieved')).toBeInTheDocument();
  });

  it('applies chapter 3 theme styling', () => {
    render(<TeamImpactMetrics />);
    
    const container = screen.getByText('Team Performance Metrics').closest('div');
    expect(container).toHaveClass('border-chapter3-primary/20');
  });

  it('validates metric data accuracy', () => {
    render(<TeamImpactMetrics />);
    
    // Verify that all metrics are within expected ranges (0-100%)
    const percentageElements = screen.getAllByText(/%$/);
    percentageElements.forEach(element => {
      const value = parseInt(element.textContent?.replace('%', '') || '0');
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThanOrEqual(100);
    });
  });

  it('shows progress bars for metrics', () => {
    render(<TeamImpactMetrics />);
    
    // Progress bars should be present (they have specific styling classes)
    const progressBars = document.querySelectorAll('.h-2.rounded-full');
    expect(progressBars.length).toBeGreaterThan(0);
  });
});