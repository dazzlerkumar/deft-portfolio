import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BestPracticesShowcase } from '../best-practices-showcase';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  },
  AnimatePresence: ({ children }: any) => children
}));

// Mock SyntaxHighlighter
vi.mock('../syntax-highlighter', () => ({
  SyntaxHighlighter: ({ code, language }: any) => (
    <div data-testid="syntax-highlighter">
      <span>{language}</span>
      <pre>{code}</pre>
    </div>
  )
}));

describe('BestPracticesShowcase', () => {
  const mockExamples = [
    {
      id: 'example1',
      title: 'Performance Optimization',
      category: 'performance' as const,
      description: 'How to optimize React components',
      language: 'tsx',
      badExample: {
        code: 'const BadComponent = () => { /* bad code */ };',
        explanation: 'This is inefficient'
      },
      goodExample: {
        code: 'const GoodComponent = () => { /* good code */ };',
        explanation: 'This is optimized'
      },
      benefits: ['Better performance', 'Improved UX']
    },
    {
      id: 'example2',
      title: 'Accessibility Best Practices',
      category: 'accessibility' as const,
      description: 'Making components accessible',
      language: 'tsx',
      goodExample: {
        code: 'const AccessibleComponent = () => { /* accessible code */ };',
        explanation: 'This follows WCAG guidelines'
      },
      benefits: ['Screen reader support', 'Keyboard navigation']
    }
  ];

  const defaultProps = {
    examples: mockExamples,
    title: 'Best Practices'
  };

  it('renders title and category filters', () => {
    render(<BestPracticesShowcase {...defaultProps} />);
    
    expect(screen.getByText('Best Practices')).toBeInTheDocument();
    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Performance')).toBeInTheDocument();
    expect(screen.getByText('Accessibility')).toBeInTheDocument();
  });

  it('renders example list', () => {
    render(<BestPracticesShowcase {...defaultProps} />);
    
    expect(screen.getByText('Performance Optimization')).toBeInTheDocument();
    expect(screen.getByText('Accessibility Best Practices')).toBeInTheDocument();
  });

  it('shows first example by default', () => {
    render(<BestPracticesShowcase {...defaultProps} />);
    
    expect(screen.getByText('How to optimize React components')).toBeInTheDocument();
    expect(screen.getByText('const GoodComponent = () => { /* good code */ };')).toBeInTheDocument();
  });

  it('filters examples by category', () => {
    render(<BestPracticesShowcase {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Performance'));
    
    expect(screen.getByText('Performance Optimization')).toBeInTheDocument();
    expect(screen.queryByText('Accessibility Best Practices')).not.toBeInTheDocument();
  });

  it('switches examples when clicked', () => {
    render(<BestPracticesShowcase {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Accessibility Best Practices'));
    
    expect(screen.getByText('Making components accessible')).toBeInTheDocument();
    expect(screen.getByText('const AccessibleComponent = () => { /* accessible code */ };')).toBeInTheDocument();
  });

  it('shows comparison when available and toggled', () => {
    render(<BestPracticesShowcase {...defaultProps} />);
    
    // Should show comparison button for first example
    expect(screen.getByText('Show Comparison')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('Show Comparison'));
    
    expect(screen.getByText('Avoid This')).toBeInTheDocument();
    expect(screen.getByText('const BadComponent = () => { /* bad code */ };')).toBeInTheDocument();
    expect(screen.getByText('This is inefficient')).toBeInTheDocument();
  });

  it('hides comparison button when no bad example', () => {
    render(<BestPracticesShowcase {...defaultProps} />);
    
    // Switch to second example (no bad example)
    fireEvent.click(screen.getByText('Accessibility Best Practices'));
    
    expect(screen.queryByText('Show Comparison')).not.toBeInTheDocument();
  });

  it('displays benefits list', () => {
    render(<BestPracticesShowcase {...defaultProps} />);
    
    expect(screen.getByText('Benefits:')).toBeInTheDocument();
    expect(screen.getByText('Better performance')).toBeInTheDocument();
    expect(screen.getByText('Improved UX')).toBeInTheDocument();
  });

  it('shows category indicators', () => {
    render(<BestPracticesShowcase {...defaultProps} />);
    
    // Should show category badge
    expect(screen.getByText('performance')).toBeInTheDocument();
  });

  it('handles empty benefits array', () => {
    const exampleWithoutBenefits = [{
      ...mockExamples[0],
      benefits: []
    }];
    
    render(<BestPracticesShowcase examples={exampleWithoutBenefits} title="Test" />);
    
    expect(screen.queryByText('Benefits:')).not.toBeInTheDocument();
  });
});