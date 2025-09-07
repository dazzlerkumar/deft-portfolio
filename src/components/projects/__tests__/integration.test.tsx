import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { ProjectShowcaseDemo } from '../project-showcase-demo';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    img: ({ children, ...props }: any) => <img {...props}>{children}</img>
  },
  AnimatePresence: ({ children }: any) => children,
  useInView: () => true
}));

describe('Project Showcase Integration', () => {
  it('renders the demo component with all views', () => {
    render(<ProjectShowcaseDemo />);
    
    expect(screen.getByText('Project Showcase System Demo')).toBeInTheDocument();
    expect(screen.getByText('Single Showcase')).toBeInTheDocument();
    expect(screen.getByText('Project Grid')).toBeInTheDocument();
    expect(screen.getByText('Chapter Projects')).toBeInTheDocument();
  });

  it('switches between different views', () => {
    render(<ProjectShowcaseDemo />);
    
    // Should start with showcase view
    expect(screen.getByText('Individual Project Showcase')).toBeInTheDocument();
    
    // Switch to grid view
    const gridButton = screen.getByText('Project Grid');
    fireEvent.click(gridButton);
    expect(screen.getByText('Featured Projects Grid')).toBeInTheDocument();
    
    // Switch to chapter view
    const chapterButton = screen.getByText('Chapter Projects');
    fireEvent.click(chapterButton);
    expect(screen.getByText('Chapter 1: "The Beginning" Projects')).toBeInTheDocument();
  });

  it('displays feature information', () => {
    render(<ProjectShowcaseDemo />);
    
    expect(screen.getByText('Project Showcase System Features')).toBeInTheDocument();
    expect(screen.getByText('Interactive Components')).toBeInTheDocument();
    expect(screen.getByText('Story Integration')).toBeInTheDocument();
    expect(screen.getByText('Advanced Features')).toBeInTheDocument();
  });

  it('shows project data integration', () => {
    render(<ProjectShowcaseDemo />);
    
    // Should display project from the data
    expect(screen.getByText('Personal Portfolio v1')).toBeInTheDocument();
  });
});