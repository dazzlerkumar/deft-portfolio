import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ArchitectureDiagram } from '../architecture-diagram';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  },
  AnimatePresence: ({ children }: any) => children
}));

describe('ArchitectureDiagram', () => {
  const mockNodes = [
    {
      id: 'node1',
      label: 'Frontend',
      type: 'component' as const,
      description: 'React frontend application',
      technologies: ['React', 'TypeScript'],
      connections: ['node2'],
      position: { x: 50, y: 50 }
    },
    {
      id: 'node2',
      label: 'API',
      type: 'service' as const,
      description: 'Backend API service',
      technologies: ['Node.js', 'Express'],
      connections: [],
      position: { x: 200, y: 50 }
    }
  ];

  const defaultProps = {
    nodes: mockNodes,
    title: 'System Architecture',
    description: 'Overview of system components'
  };

  it('renders title and description', () => {
    render(<ArchitectureDiagram {...defaultProps} />);
    
    expect(screen.getByText('System Architecture')).toBeInTheDocument();
    expect(screen.getByText('Overview of system components')).toBeInTheDocument();
  });

  it('renders all nodes', () => {
    render(<ArchitectureDiagram {...defaultProps} />);
    
    expect(screen.getByText('Frontend')).toBeInTheDocument();
    expect(screen.getByText('API')).toBeInTheDocument();
    expect(screen.getByText('component')).toBeInTheDocument();
    expect(screen.getByText('service')).toBeInTheDocument();
  });

  it('shows default message when no node is selected', () => {
    render(<ArchitectureDiagram {...defaultProps} />);
    
    expect(screen.getByText('Click on a component to view details')).toBeInTheDocument();
  });

  it('shows node details when clicked', () => {
    render(<ArchitectureDiagram {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Frontend'));
    
    expect(screen.getByText('React frontend application')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
  });

  it('shows connections for selected node', () => {
    render(<ArchitectureDiagram {...defaultProps} />);
    
    fireEvent.click(screen.getByText('Frontend'));
    
    expect(screen.getByText('Connections:')).toBeInTheDocument();
    expect(screen.getByText('→ API')).toBeInTheDocument();
  });

  it('allows navigation between connected nodes', () => {
    render(<ArchitectureDiagram {...defaultProps} />);
    
    // Select first node
    fireEvent.click(screen.getByText('Frontend'));
    expect(screen.getByText('React frontend application')).toBeInTheDocument();
    
    // Click on connection to navigate to second node
    fireEvent.click(screen.getByText('→ API'));
    expect(screen.getByText('Backend API service')).toBeInTheDocument();
  });

  it('handles nodes with no connections', () => {
    render(<ArchitectureDiagram {...defaultProps} />);
    
    fireEvent.click(screen.getByText('API'));
    
    expect(screen.getByText('Backend API service')).toBeInTheDocument();
    expect(screen.queryByText('Connections:')).not.toBeInTheDocument();
  });

  it('handles nodes with no technologies', () => {
    const nodesWithoutTech = [
      {
        ...mockNodes[0],
        technologies: []
      }
    ];
    
    render(<ArchitectureDiagram {...defaultProps} nodes={nodesWithoutTech} />);
    
    fireEvent.click(screen.getByText('Frontend'));
    
    expect(screen.queryByText('Technologies:')).not.toBeInTheDocument();
  });

  it('renders SVG connections', () => {
    render(<ArchitectureDiagram {...defaultProps} />);
    
    const svg = screen.getByRole('img', { hidden: true });
    expect(svg).toBeInTheDocument();
  });
});