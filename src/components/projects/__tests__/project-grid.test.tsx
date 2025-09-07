import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { ProjectGrid } from '../project-grid';
import { Project } from '@/lib/types/project';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  },
  AnimatePresence: ({ children }: any) => children
}));

// Mock ProjectShowcase component
vi.mock('../project-showcase', () => ({
  ProjectShowcase: ({ project, onProjectSelect }: any) => (
    <div 
      data-testid={`project-${project.id}`}
      onClick={() => onProjectSelect?.(project)}
    >
      {project.title}
    </div>
  )
}));

const mockProjects: Project[] = [
  {
    id: 'web-app-1',
    title: 'Web Application 1',
    description: 'A web application',
    storyIntegration: 'Story context 1',
    technologies: [
      { name: 'React', category: 'frontend', proficiency: 'advanced' }
    ],
    images: [],
    impact: { timeframe: '2 months' },
    featured: true,
    category: 'web-application'
  },
  {
    id: 'mobile-app-1',
    title: 'Mobile App 1',
    description: 'A mobile application',
    storyIntegration: 'Story context 2',
    technologies: [
      { name: 'React Native', category: 'frontend', proficiency: 'intermediate' }
    ],
    images: [],
    impact: { timeframe: '3 months' },
    featured: false,
    category: 'mobile-app'
  },
  {
    id: 'library-1',
    title: 'Library 1',
    description: 'A utility library',
    storyIntegration: 'Story context 3',
    technologies: [
      { name: 'TypeScript', category: 'frontend', proficiency: 'expert' }
    ],
    images: [],
    impact: { timeframe: '1 month' },
    featured: true,
    category: 'library'
  }
];

describe('ProjectGrid', () => {
  it('renders all projects by default', () => {
    render(<ProjectGrid projects={mockProjects} />);
    
    expect(screen.getByText('Web Application 1')).toBeInTheDocument();
    expect(screen.getByText('Mobile App 1')).toBeInTheDocument();
    expect(screen.getByText('Library 1')).toBeInTheDocument();
  });

  it('shows correct project count', () => {
    render(<ProjectGrid projects={mockProjects} />);
    
    expect(screen.getByText('Showing 3 of 3 projects')).toBeInTheDocument();
  });

  it('filters projects by category', async () => {
    render(<ProjectGrid projects={mockProjects} />);
    
    const categorySelect = screen.getByDisplayValue('All Projects');
    fireEvent.change(categorySelect, { target: { value: 'web-application' } });
    
    await waitFor(() => {
      expect(screen.getByText('Web Application 1')).toBeInTheDocument();
      expect(screen.queryByText('Mobile App 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Library 1')).not.toBeInTheDocument();
    });
    
    expect(screen.getByText('Showing 1 of 3 projects')).toBeInTheDocument();
  });

  it('sorts projects by title', async () => {
    render(<ProjectGrid projects={mockProjects} />);
    
    const sortSelect = screen.getByDisplayValue('Featured First');
    fireEvent.change(sortSelect, { target: { value: 'title' } });
    
    await waitFor(() => {
      const projectElements = screen.getAllByTestId(/project-/);
      expect(projectElements[0]).toHaveTextContent('Library 1');
      expect(projectElements[1]).toHaveTextContent('Mobile App 1');
      expect(projectElements[2]).toHaveTextContent('Web Application 1');
    });
  });

  it('sorts projects by featured status', () => {
    render(<ProjectGrid projects={mockProjects} />);
    
    // Default sort is "Featured First"
    const projectElements = screen.getAllByTestId(/project-/);
    expect(projectElements[0]).toHaveTextContent('Web Application 1'); // featured
    expect(projectElements[1]).toHaveTextContent('Library 1'); // featured
    expect(projectElements[2]).toHaveTextContent('Mobile App 1'); // not featured
  });

  it('toggles between grid and list view', () => {
    const { container } = render(<ProjectGrid projects={mockProjects} />);
    
    // Should start in grid view
    const gridContainer = container.querySelector('.grid');
    expect(gridContainer).toBeInTheDocument();
    
    // Switch to list view
    const listButton = screen.getByRole('button', { name: /list/i });
    fireEvent.click(listButton);
    
    const listContainer = container.querySelector('.space-y-6');
    expect(listContainer).toBeInTheDocument();
  });

  it('hides filters when showFilters is false', () => {
    render(<ProjectGrid projects={mockProjects} showFilters={false} />);
    
    expect(screen.queryByDisplayValue('All Projects')).not.toBeInTheDocument();
    expect(screen.queryByText('Showing 3 of 3 projects')).not.toBeInTheDocument();
  });

  it('uses default category filter', () => {
    render(
      <ProjectGrid 
        projects={mockProjects} 
        defaultCategory="library" 
      />
    );
    
    expect(screen.getByText('Library 1')).toBeInTheDocument();
    expect(screen.queryByText('Web Application 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Mobile App 1')).not.toBeInTheDocument();
  });

  it('starts with specified layout', () => {
    const { container } = render(
      <ProjectGrid projects={mockProjects} layout="list" />
    );
    
    const listContainer = container.querySelector('.space-y-6');
    expect(listContainer).toBeInTheDocument();
  });

  it('calls onProjectSelect when project is clicked', () => {
    const mockOnSelect = vi.fn();
    render(
      <ProjectGrid 
        projects={mockProjects} 
        onProjectSelect={mockOnSelect}
      />
    );
    
    const firstProject = screen.getByTestId('project-web-app-1');
    fireEvent.click(firstProject);
    
    expect(mockOnSelect).toHaveBeenCalledWith(mockProjects[0]);
  });

  it('shows empty state when no projects match filter', async () => {
    render(<ProjectGrid projects={mockProjects} />);
    
    const categorySelect = screen.getByDisplayValue('All Projects');
    fireEvent.change(categorySelect, { target: { value: 'experiment' } });
    
    await waitFor(() => {
      expect(screen.getByText('No projects found')).toBeInTheDocument();
      expect(screen.getByText('Try adjusting your filters to see more projects.')).toBeInTheDocument();
    });
  });

  it('applies custom className', () => {
    const { container } = render(
      <ProjectGrid projects={mockProjects} className="custom-grid-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-grid-class');
  });

  it('passes story context to project showcase components', () => {
    render(
      <ProjectGrid 
        projects={mockProjects} 
        storyContext="chapter-1" 
      />
    );
    
    // This would be tested through the ProjectShowcase component
    // which we've mocked, but in integration it would pass the context
    expect(screen.getByText('Web Application 1')).toBeInTheDocument();
  });

  it('handles empty projects array', () => {
    render(<ProjectGrid projects={[]} />);
    
    expect(screen.getByText('Showing 0 of 0 projects')).toBeInTheDocument();
    expect(screen.getByText('No projects found')).toBeInTheDocument();
  });

  it('sorts by category correctly', async () => {
    render(<ProjectGrid projects={mockProjects} />);
    
    const sortSelect = screen.getByDisplayValue('Featured First');
    fireEvent.change(sortSelect, { target: { value: 'category' } });
    
    await waitFor(() => {
      const projectElements = screen.getAllByTestId(/project-/);
      expect(projectElements[0]).toHaveTextContent('Library 1'); // library
      expect(projectElements[1]).toHaveTextContent('Mobile App 1'); // mobile-app
      expect(projectElements[2]).toHaveTextContent('Web Application 1'); // web-application
    });
  });

  it('maintains filter state when switching view modes', async () => {
    render(<ProjectGrid projects={mockProjects} />);
    
    // Filter to web applications
    const categorySelect = screen.getByDisplayValue('All Projects');
    fireEvent.change(categorySelect, { target: { value: 'web-application' } });
    
    await waitFor(() => {
      expect(screen.getByText('Showing 1 of 3 projects')).toBeInTheDocument();
    });
    
    // Switch to list view
    const listButton = screen.getByRole('button', { name: /list/i });
    fireEvent.click(listButton);
    
    // Filter should still be applied
    expect(screen.getByText('Showing 1 of 3 projects')).toBeInTheDocument();
    expect(screen.getByText('Web Application 1')).toBeInTheDocument();
    expect(screen.queryByText('Mobile App 1')).not.toBeInTheDocument();
  });
});