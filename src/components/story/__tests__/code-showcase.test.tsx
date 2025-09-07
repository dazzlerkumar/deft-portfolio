import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { CodeShowcase } from '../code-showcase';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  },
  AnimatePresence: ({ children }: any) => children
}));

describe('CodeShowcase', () => {
  const defaultProps = {
    title: 'Test Component',
    description: 'A test component for demonstration',
    codeSnippet: 'const test = "hello world";',
    language: 'javascript'
  };

  it('renders title and description', () => {
    render(<CodeShowcase {...defaultProps} />);
    
    expect(screen.getByText('Test Component')).toBeInTheDocument();
    expect(screen.getByText('A test component for demonstration')).toBeInTheDocument();
  });

  it('shows language and toggle button', () => {
    render(<CodeShowcase {...defaultProps} />);
    
    expect(screen.getByText(/javascript/i)).toBeInTheDocument();
    expect(screen.getByText(/show code/i)).toBeInTheDocument();
  });

  it('toggles code visibility when button is clicked', () => {
    render(<CodeShowcase {...defaultProps} />);
    
    const toggleButton = screen.getByRole('button');
    
    // Code should be hidden initially
    expect(screen.queryByText('const test = "hello world";')).not.toBeInTheDocument();
    
    // Click to show code
    fireEvent.click(toggleButton);
    expect(screen.getByText('const test = "hello world";')).toBeInTheDocument();
    expect(screen.getByText(/hide code/i)).toBeInTheDocument();
    
    // Click to hide code
    fireEvent.click(toggleButton);
    expect(screen.queryByText('const test = "hello world";')).not.toBeInTheDocument();
    expect(screen.getByText(/show code/i)).toBeInTheDocument();
  });

  it('renders external links when provided', () => {
    const propsWithLinks = {
      ...defaultProps,
      githubUrl: 'https://github.com/test/repo',
      liveUrl: 'https://test.com'
    };
    
    render(<CodeShowcase {...propsWithLinks} />);
    
    const githubLink = screen.getByRole('link', { name: /github/i });
    const liveLink = screen.getByRole('link', { name: /live demo/i });
    
    expect(githubLink).toHaveAttribute('href', 'https://github.com/test/repo');
    expect(liveLink).toHaveAttribute('href', 'https://test.com');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(liveLink).toHaveAttribute('target', '_blank');
  });

  it('renders highlights when provided', () => {
    const propsWithHighlights = {
      ...defaultProps,
      highlights: ['React', 'TypeScript', 'Testing']
    };
    
    render(<CodeShowcase {...propsWithHighlights} />);
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Testing')).toBeInTheDocument();
    expect(screen.getByText('Key Features:')).toBeInTheDocument();
  });

  it('does not render highlights section when empty', () => {
    render(<CodeShowcase {...defaultProps} />);
    
    expect(screen.queryByText('Key Features:')).not.toBeInTheDocument();
  });
});