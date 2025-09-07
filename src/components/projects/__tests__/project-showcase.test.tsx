import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { ProjectShowcase } from '../project-showcase';
import { Project } from '@/lib/types/project';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    img: ({ children, ...props }: any) => <img {...props}>{children}</img>
  },
  AnimatePresence: ({ children }: any) => children,
  useInView: () => true
}));

const mockProject: Project = {
  id: 'test-project',
  title: 'Test Project',
  description: 'A test project for unit testing',
  storyIntegration: 'This project represents a key milestone in my journey',
  technologies: [
    { name: 'React', category: 'frontend', proficiency: 'advanced' },
    { name: 'TypeScript', category: 'frontend', proficiency: 'intermediate' },
    { name: 'Node.js', category: 'backend', proficiency: 'advanced' }
  ],
  demoUrl: 'https://example.com/demo',
  codeUrl: 'https://github.com/example/test-project',
  images: ['/test-image-1.jpg', '/test-image-2.jpg'],
  impact: {
    userReach: 1000,
    teamSize: 3,
    timeframe: '2 months',
    performanceImprovement: '50% faster loading',
    businessValue: 'Increased user engagement by 25%'
  },
  featured: true,
  category: 'web-application'
};

describe('ProjectShowcase', () => {
  it('renders project information correctly', () => {
    render(<ProjectShowcase project={mockProject} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.getByText('A test project for unit testing')).toBeInTheDocument();
    expect(screen.getByText('Featured')).toBeInTheDocument();
  });

  it('displays story integration when storyContext is provided', () => {
    render(<ProjectShowcase project={mockProject} storyContext="chapter-1" />);
    
    expect(screen.getByText('"This project represents a key milestone in my journey"')).toBeInTheDocument();
  });

  it('shows technology tags', () => {
    render(<ProjectShowcase project={mockProject} />);
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Node.js')).toBeInTheDocument();
  });

  it('displays external links when URLs are provided', () => {
    render(<ProjectShowcase project={mockProject} />);
    
    const demoLinks = screen.getAllByRole('link');
    const demoLink = demoLinks.find(link => link.getAttribute('href') === 'https://example.com/demo');
    const codeLink = demoLinks.find(link => link.getAttribute('href') === 'https://github.com/example/test-project');
    
    expect(demoLink).toBeInTheDocument();
    expect(codeLink).toBeInTheDocument();
  });

  it('handles hover interaction type', async () => {
    render(
      <ProjectShowcase 
        project={mockProject} 
        config={{ interactionType: 'hover' }}
      />
    );
    
    const showcase = screen.getByRole('generic', { name: /project-showcase/ });
    
    fireEvent.mouseEnter(showcase);
    
    await waitFor(() => {
      expect(screen.getByText('Technologies Used')).toBeInTheDocument();
    });
  });

  it('handles click interaction type', async () => {
    const mockOnSelect = vi.fn();
    render(
      <ProjectShowcase 
        project={mockProject} 
        config={{ interactionType: 'click' }}
        onProjectSelect={mockOnSelect}
      />
    );
    
    const showcase = screen.getByRole('generic', { name: /project-showcase/ });
    
    fireEvent.click(showcase);
    
    expect(mockOnSelect).toHaveBeenCalledWith(mockProject);
  });

  it('displays impact metrics when expanded', async () => {
    render(<ProjectShowcase project={mockProject} />);
    
    const showcase = screen.getByRole('generic', { name: /project-showcase/ });
    fireEvent.mouseEnter(showcase);
    
    await waitFor(() => {
      expect(screen.getByText('1,000')).toBeInTheDocument();
      expect(screen.getByText('Users Reached')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('Team Size')).toBeInTheDocument();
    });
  });

  it('shows business value when available', async () => {
    render(<ProjectShowcase project={mockProject} />);
    
    const showcase = screen.getByRole('generic', { name: /project-showcase/ });
    fireEvent.mouseEnter(showcase);
    
    await waitFor(() => {
      expect(screen.getByText('Business Impact')).toBeInTheDocument();
      expect(screen.getByText('Increased user engagement by 25%')).toBeInTheDocument();
    });
  });

  it('handles image navigation', async () => {
    render(<ProjectShowcase project={mockProject} />);
    
    const showcase = screen.getByRole('generic', { name: /project-showcase/ });
    fireEvent.mouseEnter(showcase);
    
    await waitFor(() => {
      const imageButtons = screen.getAllByRole('button');
      const secondImageButton = imageButtons.find(button => 
        button.className.includes('w-2 h-2')
      );
      
      if (secondImageButton) {
        fireEvent.click(secondImageButton);
      }
    });
  });

  it('toggles code snippet display', async () => {
    render(<ProjectShowcase project={mockProject} />);
    
    const showcase = screen.getByRole('generic', { name: /project-showcase/ });
    fireEvent.mouseEnter(showcase);
    
    await waitFor(() => {
      const codeButton = screen.getByText('Code Snippet');
      fireEvent.click(codeButton);
    });
    
    await waitFor(() => {
      expect(screen.getByText(/Example code snippet for Test Project/)).toBeInTheDocument();
    });
  });

  it('handles projects without images', () => {
    const projectWithoutImages = { ...mockProject, images: [] };
    render(<ProjectShowcase project={projectWithoutImages} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    expect(screen.queryByRole('img')).not.toBeInTheDocument();
  });

  it('handles projects without demo or code URLs', () => {
    const projectWithoutUrls = { 
      ...mockProject, 
      demoUrl: undefined, 
      codeUrl: undefined 
    };
    render(<ProjectShowcase project={projectWithoutUrls} />);
    
    expect(screen.getByText('Test Project')).toBeInTheDocument();
    
    const showcase = screen.getByRole('generic', { name: /project-showcase/ });
    fireEvent.mouseEnter(showcase);
    
    // Should not have external link buttons in header
    const links = screen.queryAllByRole('link');
    expect(links).toHaveLength(0);
  });

  it('applies custom className', () => {
    const { container } = render(
      <ProjectShowcase project={mockProject} className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('shows limited technologies initially and expands on hover', async () => {
    const projectWithManyTechs = {
      ...mockProject,
      technologies: [
        { name: 'React', category: 'frontend' as const, proficiency: 'advanced' as const },
        { name: 'TypeScript', category: 'frontend' as const, proficiency: 'advanced' as const },
        { name: 'Node.js', category: 'backend' as const, proficiency: 'advanced' as const },
        { name: 'MongoDB', category: 'database' as const, proficiency: 'intermediate' as const },
        { name: 'Docker', category: 'tool' as const, proficiency: 'intermediate' as const },
        { name: 'AWS', category: 'cloud' as const, proficiency: 'intermediate' as const }
      ]
    };
    
    render(<ProjectShowcase project={projectWithManyTechs} />);
    
    // Should show "+2 more" initially
    expect(screen.getByText('+2 more')).toBeInTheDocument();
    
    const showcase = screen.getByRole('generic', { name: /project-showcase/ });
    fireEvent.mouseEnter(showcase);
    
    await waitFor(() => {
      expect(screen.getByText('Docker')).toBeInTheDocument();
      expect(screen.getByText('AWS')).toBeInTheDocument();
    });
  });
});