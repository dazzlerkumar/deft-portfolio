import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { ProjectModal } from '../project-modal';
import { Project } from '@/lib/types/project';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  },
  AnimatePresence: ({ children }: any) => children
}));

const mockProject: Project = {
  id: 'test-project',
  title: 'Test Project Modal',
  description: 'A comprehensive test project for modal functionality',
  storyIntegration: 'This project showcases modal interactions',
  technologies: [
    { name: 'React', category: 'frontend', proficiency: 'advanced' },
    { name: 'TypeScript', category: 'frontend', proficiency: 'intermediate' },
    { name: 'Node.js', category: 'backend', proficiency: 'advanced' },
    { name: 'MongoDB', category: 'database', proficiency: 'intermediate' },
    { name: 'AWS', category: 'cloud', proficiency: 'intermediate' }
  ],
  demoUrl: 'https://example.com/demo',
  codeUrl: 'https://github.com/example/test-project',
  images: ['/test-image-1.jpg', '/test-image-2.jpg', '/test-image-3.jpg'],
  impact: {
    userReach: 5000,
    teamSize: 4,
    timeframe: '3 months',
    performanceImprovement: '60% faster loading',
    businessValue: 'Increased conversion rate by 30%'
  },
  featured: true,
  category: 'web-application'
};

describe('ProjectModal', () => {
  const defaultProps = {
    project: mockProject,
    isOpen: true,
    onClose: vi.fn(),
    onNext: vi.fn(),
    onPrevious: vi.fn(),
    hasNext: true,
    hasPrevious: true
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders project information when open', () => {
    render(<ProjectModal {...defaultProps} />);
    
    expect(screen.getByText('Test Project Modal')).toBeInTheDocument();
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });

  it('does not render when closed', () => {
    render(<ProjectModal {...defaultProps} isOpen={false} />);
    
    expect(screen.queryByText('Test Project Modal')).not.toBeInTheDocument();
  });

  it('calls onClose when close button is clicked', () => {
    const mockOnClose = vi.fn();
    render(<ProjectModal {...defaultProps} onClose={mockOnClose} />);
    
    const closeButton = screen.getByRole('button', { name: /close/i });
    fireEvent.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('calls onClose when backdrop is clicked', () => {
    const mockOnClose = vi.fn();
    render(<ProjectModal {...defaultProps} onClose={mockOnClose} />);
    
    // Find the backdrop (the element with bg-black/80)
    const backdrop = document.querySelector('.bg-black\\/80');
    if (backdrop) {
      fireEvent.click(backdrop);
      expect(mockOnClose).toHaveBeenCalled();
    }
  });

  it('handles navigation buttons', () => {
    const mockOnNext = vi.fn();
    const mockOnPrevious = vi.fn();
    
    render(
      <ProjectModal 
        {...defaultProps} 
        onNext={mockOnNext}
        onPrevious={mockOnPrevious}
      />
    );
    
    const nextButton = screen.getByRole('button', { name: /next/i });
    const prevButton = screen.getByRole('button', { name: /previous/i });
    
    fireEvent.click(nextButton);
    expect(mockOnNext).toHaveBeenCalled();
    
    fireEvent.click(prevButton);
    expect(mockOnPrevious).toHaveBeenCalled();
  });

  it('disables navigation buttons when no next/previous available', () => {
    render(
      <ProjectModal 
        {...defaultProps} 
        hasNext={false}
        hasPrevious={false}
      />
    );
    
    const nextButton = screen.getByRole('button', { name: /next/i });
    const prevButton = screen.getByRole('button', { name: /previous/i });
    
    expect(nextButton).toBeDisabled();
    expect(prevButton).toBeDisabled();
  });

  it('switches between tabs', async () => {
    render(<ProjectModal {...defaultProps} />);
    
    // Should start on Overview tab
    expect(screen.getByText('Description')).toBeInTheDocument();
    
    // Switch to Technical tab
    const technicalTab = screen.getByRole('button', { name: 'Technical' });
    fireEvent.click(technicalTab);
    
    await waitFor(() => {
      expect(screen.getByText('Technologies')).toBeInTheDocument();
      expect(screen.getByText('Frontend')).toBeInTheDocument();
    });
    
    // Switch to Impact tab
    const impactTab = screen.getByRole('button', { name: 'Impact' });
    fireEvent.click(impactTab);
    
    await waitFor(() => {
      expect(screen.getByText('5,000')).toBeInTheDocument();
      expect(screen.getByText('Users Reached')).toBeInTheDocument();
    });
  });

  it('displays technologies grouped by category', async () => {
    render(<ProjectModal {...defaultProps} />);
    
    const technicalTab = screen.getByRole('button', { name: 'Technical' });
    fireEvent.click(technicalTab);
    
    await waitFor(() => {
      expect(screen.getByText('Frontend')).toBeInTheDocument();
      expect(screen.getByText('Backend')).toBeInTheDocument();
      expect(screen.getByText('Database')).toBeInTheDocument();
      expect(screen.getByText('Cloud')).toBeInTheDocument();
    });
  });

  it('shows proficiency levels for technologies', async () => {
    render(<ProjectModal {...defaultProps} />);
    
    const technicalTab = screen.getByRole('button', { name: 'Technical' });
    fireEvent.click(technicalTab);
    
    await waitFor(() => {
      expect(screen.getByText('advanced')).toBeInTheDocument();
      expect(screen.getByText('intermediate')).toBeInTheDocument();
    });
  });

  it('displays impact metrics correctly', async () => {
    render(<ProjectModal {...defaultProps} />);
    
    const impactTab = screen.getByRole('button', { name: 'Impact' });
    fireEvent.click(impactTab);
    
    await waitFor(() => {
      expect(screen.getByText('5,000')).toBeInTheDocument();
      expect(screen.getByText('4')).toBeInTheDocument();
      expect(screen.getByText('60% faster loading')).toBeInTheDocument();
      expect(screen.getByText('Increased conversion rate by 30%')).toBeInTheDocument();
    });
  });

  it('handles image navigation', async () => {
    render(<ProjectModal {...defaultProps} />);
    
    // Should show first image by default
    const image = screen.getByAltText('Test Project Modal screenshot 1');
    expect(image).toBeInTheDocument();
    
    // Click next image button
    const nextImageButton = screen.getAllByRole('button').find(btn => 
      btn.querySelector('svg') && btn.className.includes('right-4')
    );
    
    if (nextImageButton) {
      fireEvent.click(nextImageButton);
      
      await waitFor(() => {
        const secondImage = screen.getByAltText('Test Project Modal screenshot 2');
        expect(secondImage).toBeInTheDocument();
      });
    }
  });

  it('handles thumbnail navigation', async () => {
    render(<ProjectModal {...defaultProps} />);
    
    // Find thumbnail buttons
    const thumbnails = screen.getAllByRole('button').filter(btn => 
      btn.querySelector('img[alt^="Thumbnail"]')
    );
    
    if (thumbnails.length > 1) {
      fireEvent.click(thumbnails[1]);
      
      await waitFor(() => {
        const secondImage = screen.getByAltText('Test Project Modal screenshot 2');
        expect(secondImage).toBeInTheDocument();
      });
    }
  });

  it('toggles demo view', async () => {
    render(<ProjectModal {...defaultProps} />);
    
    const demoButton = screen.getByText('View Live Demo');
    fireEvent.click(demoButton);
    
    await waitFor(() => {
      expect(screen.getByText('Live Demo')).toBeInTheDocument();
      expect(screen.getByTitle('Test Project Modal Demo')).toBeInTheDocument();
    });
    
    const viewImagesButton = screen.getByText('View Images');
    fireEvent.click(viewImagesButton);
    
    await waitFor(() => {
      const image = screen.getByAltText('Test Project Modal screenshot 1');
      expect(image).toBeInTheDocument();
    });
  });

  it('displays external links in footer', () => {
    render(<ProjectModal {...defaultProps} />);
    
    const demoLink = screen.getByRole('link', { name: /live demo/i });
    const codeLink = screen.getByRole('link', { name: /view code/i });
    
    expect(demoLink).toHaveAttribute('href', 'https://example.com/demo');
    expect(codeLink).toHaveAttribute('href', 'https://github.com/example/test-project');
  });

  it('handles keyboard navigation', () => {
    const mockOnClose = vi.fn();
    const mockOnNext = vi.fn();
    const mockOnPrevious = vi.fn();
    
    render(
      <ProjectModal 
        {...defaultProps}
        onClose={mockOnClose}
        onNext={mockOnNext}
        onPrevious={mockOnPrevious}
      />
    );
    
    // Test Escape key
    fireEvent.keyDown(window, { key: 'Escape' });
    expect(mockOnClose).toHaveBeenCalled();
    
    // Test Arrow keys
    fireEvent.keyDown(window, { key: 'ArrowRight' });
    expect(mockOnNext).toHaveBeenCalled();
    
    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(mockOnPrevious).toHaveBeenCalled();
  });

  it('shows story context in overview tab', () => {
    render(<ProjectModal {...defaultProps} />);
    
    expect(screen.getByText('Story Context')).toBeInTheDocument();
    expect(screen.getByText('"This project showcases modal interactions"')).toBeInTheDocument();
  });

  it('displays category information', () => {
    render(<ProjectModal {...defaultProps} />);
    
    expect(screen.getByText('Category')).toBeInTheDocument();
    expect(screen.getByText('Web Application')).toBeInTheDocument();
  });

  it('handles projects without demo URL', () => {
    const projectWithoutDemo = { ...mockProject, demoUrl: undefined };
    render(<ProjectModal {...defaultProps} project={projectWithoutDemo} />);
    
    expect(screen.queryByText('View Live Demo')).not.toBeInTheDocument();
    expect(screen.queryByRole('link', { name: /live demo/i })).not.toBeInTheDocument();
  });

  it('handles projects without code URL', () => {
    const projectWithoutCode = { ...mockProject, codeUrl: undefined };
    render(<ProjectModal {...defaultProps} project={projectWithoutCode} />);
    
    expect(screen.queryByRole('link', { name: /view code/i })).not.toBeInTheDocument();
  });

  it('returns null when project is null', () => {
    const { container } = render(
      <ProjectModal {...defaultProps} project={null} />
    );
    
    expect(container.firstChild).toBeNull();
  });
});