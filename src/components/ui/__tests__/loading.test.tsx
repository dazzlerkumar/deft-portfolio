import React from 'react';
import { render, screen } from '@testing-library/react';
import { Loading, ChapterLoading } from '../loading';
import { vi } from 'vitest';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
  },
}));

describe('Loading', () => {
  it('renders with default props', () => {
    render(<Loading />);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('renders custom message', () => {
    render(<Loading message="Custom loading message" />);

    expect(screen.getByText('Custom loading message')).toBeInTheDocument();
  });

  it('applies custom className', () => {
    render(<Loading className="custom-loading-class" />);

    const container = screen.getByText('Loading...').parentElement;
    expect(container).toHaveClass('custom-loading-class');
  });

  it('renders dots variant by default', () => {
    render(<Loading />);

    // Should render 3 dots
    const dots = document.querySelectorAll('.bg-blue-500.rounded-full');
    expect(dots).toHaveLength(3);
  });

  it('renders spinner variant', () => {
    render(<Loading variant="spinner" />);

    const spinner = document.querySelector('.border-2.border-gray-300.border-t-blue-500.rounded-full');
    expect(spinner).toBeInTheDocument();
  });

  it('renders pulse variant', () => {
    render(<Loading variant="pulse" />);

    const pulse = document.querySelector('.bg-blue-500.rounded-full');
    expect(pulse).toBeInTheDocument();
  });

  it('renders story variant with book icon', () => {
    render(<Loading variant="story" />);

    expect(screen.getByText('📖')).toBeInTheDocument();
    
    // Should render floating particles (4 particles)
    const particles = document.querySelectorAll('.bg-blue-400.rounded-full');
    expect(particles).toHaveLength(4);
  });

  it('handles different sizes', () => {
    const { rerender } = render(<Loading size="sm" />);
    
    let dots = document.querySelectorAll('.w-2.h-2');
    expect(dots).toHaveLength(3);

    rerender(<Loading size="md" />);
    dots = document.querySelectorAll('.w-3.h-3');
    expect(dots).toHaveLength(3);

    rerender(<Loading size="lg" />);
    dots = document.querySelectorAll('.w-4.h-4');
    expect(dots).toHaveLength(3);
  });

  it('applies correct text sizes', () => {
    const { rerender } = render(<Loading size="sm" message="Test" />);
    
    let text = screen.getByText('Test');
    expect(text).toHaveClass('text-xs');

    rerender(<Loading size="md" message="Test" />);
    text = screen.getByText('Test');
    expect(text).toHaveClass('text-sm');

    rerender(<Loading size="lg" message="Test" />);
    text = screen.getByText('Test');
    expect(text).toHaveClass('text-base');
  });

  it('hides message when not provided', () => {
    render(<Loading message="" />);

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
  });
});

describe('ChapterLoading', () => {
  it('renders chapter loading with correct theme', () => {
    render(<ChapterLoading chapterNumber={1} chapterTitle="The Beginning" />);

    expect(screen.getByText('Chapter 1')).toBeInTheDocument();
    expect(screen.getByText('The Beginning')).toBeInTheDocument();
    expect(screen.getByText('🌱')).toBeInTheDocument();
  });

  it('applies correct theme colors for different chapters', () => {
    const { rerender } = render(
      <ChapterLoading chapterNumber={1} chapterTitle="The Beginning" />
    );

    let container = document.querySelector('.bg-gradient-to-br');
    expect(container).toHaveClass('from-orange-400', 'to-blue-400');

    rerender(<ChapterLoading chapterNumber={2} chapterTitle="The Challenges" />);
    container = document.querySelector('.bg-gradient-to-br');
    expect(container).toHaveClass('from-blue-400', 'to-indigo-600');

    rerender(<ChapterLoading chapterNumber={3} chapterTitle="The Leadership" />);
    container = document.querySelector('.bg-gradient-to-br');
    expect(container).toHaveClass('from-purple-500', 'to-yellow-400');

    rerender(<ChapterLoading chapterNumber={4} chapterTitle="The Vision" />);
    container = document.querySelector('.bg-gradient-to-br');
    expect(container).toHaveClass('from-slate-700', 'to-blue-500');
  });

  it('shows correct icons for different chapters', () => {
    const { rerender } = render(
      <ChapterLoading chapterNumber={1} chapterTitle="The Beginning" />
    );

    expect(screen.getByText('🌱')).toBeInTheDocument();

    rerender(<ChapterLoading chapterNumber={2} chapterTitle="The Challenges" />);
    expect(screen.getByText('🧩')).toBeInTheDocument();

    rerender(<ChapterLoading chapterNumber={3} chapterTitle="The Leadership" />);
    expect(screen.getByText('🤝')).toBeInTheDocument();

    rerender(<ChapterLoading chapterNumber={4} chapterTitle="The Vision" />);
    expect(screen.getByText('🚀')).toBeInTheDocument();
  });

  it('falls back to chapter 1 theme for unknown chapters', () => {
    render(<ChapterLoading chapterNumber={99} chapterTitle="Unknown Chapter" />);

    expect(screen.getByText('🌱')).toBeInTheDocument();
    
    const container = document.querySelector('.bg-gradient-to-br');
    expect(container).toHaveClass('from-orange-400', 'to-blue-400');
  });

  it('applies custom className', () => {
    render(
      <ChapterLoading 
        chapterNumber={1} 
        chapterTitle="Test" 
        className="custom-chapter-loading"
      />
    );

    const container = document.querySelector('.bg-gradient-to-br');
    expect(container).toHaveClass('custom-chapter-loading');
  });

  it('includes loading component with story message', () => {
    render(<ChapterLoading chapterNumber={1} chapterTitle="The Beginning" />);

    expect(screen.getByText('Loading your story...')).toBeInTheDocument();
  });

  it('renders full screen layout', () => {
    render(<ChapterLoading chapterNumber={1} chapterTitle="The Beginning" />);

    const container = document.querySelector('.bg-gradient-to-br');
    expect(container).toHaveClass('min-h-screen', 'flex', 'items-center', 'justify-center');
  });
});