import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { SyntaxHighlighter } from '../syntax-highlighter';

describe('SyntaxHighlighter', () => {
  const defaultProps = {
    code: 'const hello = "world";\nconsole.log(hello);',
    language: 'javascript'
  };

  it('renders code content', () => {
    render(<SyntaxHighlighter {...defaultProps} />);
    
    const codeElement = screen.getByRole('code');
    expect(codeElement).toBeInTheDocument();
    expect(codeElement.innerHTML).toContain('const hello = "world"');
    expect(codeElement.innerHTML).toContain('console.log(hello)');
  });

  it('applies correct language class', () => {
    render(<SyntaxHighlighter {...defaultProps} />);
    
    const codeElement = screen.getByRole('code');
    expect(codeElement).toHaveClass('language-javascript');
  });

  it('shows line numbers by default', () => {
    render(<SyntaxHighlighter {...defaultProps} />);
    
    // Should show line numbers 1 and 2
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('hides line numbers when showLineNumbers is false', () => {
    render(<SyntaxHighlighter {...defaultProps} showLineNumbers={false} />);
    
    // Line numbers should not be present
    expect(screen.queryByText('1')).not.toBeInTheDocument();
    expect(screen.queryByText('2')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<SyntaxHighlighter {...defaultProps} className="custom-class" />);
    
    const container = screen.getByRole('code').closest('div');
    expect(container).toHaveClass('custom-class');
  });

  it('handles single line code', () => {
    render(<SyntaxHighlighter code="const x = 1;" language="javascript" />);
    
    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.queryByText('2')).not.toBeInTheDocument();
  });

  it('handles empty code', () => {
    render(<SyntaxHighlighter code="" language="javascript" />);
    
    const codeElement = screen.getByRole('code');
    expect(codeElement).toBeInTheDocument();
    expect(codeElement).toBeEmptyDOMElement();
  });
});