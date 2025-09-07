import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { InteractiveCodeExplorer } from '../interactive-code-explorer';

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

describe('InteractiveCodeExplorer', () => {
  const mockFiles = [
    {
      name: 'component.tsx',
      path: 'src/components/component.tsx',
      content: 'const Component = () => <div>Hello</div>;',
      language: 'tsx',
      description: 'A React component'
    },
    {
      name: 'utils.ts',
      path: 'src/lib/utils.ts',
      content: 'export const helper = () => "help";',
      language: 'typescript',
      description: 'Utility functions'
    }
  ];

  const defaultProps = {
    files: mockFiles,
    title: 'Code Explorer',
    description: 'Explore the codebase'
  };

  it('renders title and description', () => {
    render(<InteractiveCodeExplorer {...defaultProps} />);
    
    expect(screen.getByText('Code Explorer')).toBeInTheDocument();
    expect(screen.getByText('Explore the codebase')).toBeInTheDocument();
  });

  it('renders file list', () => {
    render(<InteractiveCodeExplorer {...defaultProps} />);
    
    expect(screen.getByText('component.tsx')).toBeInTheDocument();
    expect(screen.getByText('utils.ts')).toBeInTheDocument();
    expect(screen.getByText('src/components/component.tsx')).toBeInTheDocument();
    expect(screen.getByText('src/lib/utils.ts')).toBeInTheDocument();
  });

  it('shows first file by default', () => {
    render(<InteractiveCodeExplorer {...defaultProps} />);
    
    expect(screen.getByText('const Component = () => <div>Hello</div>;')).toBeInTheDocument();
    expect(screen.getByText('A React component')).toBeInTheDocument();
  });

  it('switches files when clicked', () => {
    render(<InteractiveCodeExplorer {...defaultProps} />);
    
    // Click on second file
    fireEvent.click(screen.getByText('utils.ts'));
    
    expect(screen.getByText('export const helper = () => "help";')).toBeInTheDocument();
    expect(screen.getByText('Utility functions')).toBeInTheDocument();
  });

  it('filters files based on search', () => {
    render(<InteractiveCodeExplorer {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search files...');
    fireEvent.change(searchInput, { target: { value: 'component' } });
    
    expect(screen.getByText('component.tsx')).toBeInTheDocument();
    expect(screen.queryByText('utils.ts')).not.toBeInTheDocument();
  });

  it('shows file details in header', () => {
    render(<InteractiveCodeExplorer {...defaultProps} />);
    
    expect(screen.getByText('tsx')).toBeInTheDocument();
    expect(screen.getByText('component.tsx')).toBeInTheDocument();
    expect(screen.getByText('src/components/component.tsx')).toBeInTheDocument();
  });

  it('handles empty search results', () => {
    render(<InteractiveCodeExplorer {...defaultProps} />);
    
    const searchInput = screen.getByPlaceholderText('Search files...');
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
    
    expect(screen.queryByText('component.tsx')).not.toBeInTheDocument();
    expect(screen.queryByText('utils.ts')).not.toBeInTheDocument();
  });

  it('passes correct props to SyntaxHighlighter', () => {
    render(<InteractiveCodeExplorer {...defaultProps} />);
    
    const syntaxHighlighter = screen.getByTestId('syntax-highlighter');
    expect(syntaxHighlighter).toBeInTheDocument();
    expect(screen.getByText('tsx')).toBeInTheDocument();
    expect(screen.getByText('const Component = () => <div>Hello</div>;')).toBeInTheDocument();
  });
});