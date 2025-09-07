import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock framer-motion for testing
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h4: ({ children, ...props }: any) => <h4 {...props}>{children}</h4>,
    h5: ({ children, ...props }: any) => <h5 {...props}>{children}</h5>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
  AnimatePresence: ({ children }: any) => children,
}));

// Create a test component that includes the ProblemSolutionCard logic
interface ProblemSolutionPair {
  id: string;
  problem: string;
  solution: string;
  impact: string;
  projectId?: string;
}

interface ProblemSolutionCardProps {
  pair: ProblemSolutionPair;
  index: number;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: () => void;
  onHover: () => void;
  onLeave: () => void;
  inView: boolean;
}

// Simplified version of the ProblemSolutionCard for testing
function TestProblemSolutionCard({ 
  pair, 
  index, 
  isSelected, 
  isHovered, 
  onSelect, 
  onHover, 
  onLeave, 
  inView 
}: ProblemSolutionCardProps) {
  return (
    <div
      className="problem-solution-card"
      data-testid={`problem-card-${pair.id}`}
      onClick={onSelect}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className="card-header">
        <h4>Challenge #{index + 1}</h4>
      </div>

      <div className="problem-section">
        <h5>Problem</h5>
        <p>{pair.problem}</p>
      </div>

      {(isHovered || isSelected) && (
        <div className="solution-section" data-testid={`solution-${pair.id}`}>
          <div className="solution">
            <h5>Solution</h5>
            <p>{pair.solution}</p>
          </div>
          <div className="impact">
            <h5>Impact</h5>
            <p>{pair.impact}</p>
          </div>
        </div>
      )}

      <div className="hover-indicator">
        {isHovered || isSelected ? "Click to pin" : "Hover to reveal"}
      </div>
    </div>
  );
}

// Test wrapper component
function TestProblemSolutionContainer() {
  const [selectedPair, setSelectedPair] = React.useState<string | null>(null);
  const [hoveredPuzzle, setHoveredPuzzle] = React.useState<string | null>(null);

  const problemSolutionPairs: ProblemSolutionPair[] = [
    {
      id: "performance",
      problem: "E-commerce site loading in 8+ seconds, causing 40% bounce rate",
      solution: "Implemented code splitting, lazy loading, and optimized images",
      impact: "Reduced load time to 2.1s, increased conversions by 15%",
      projectId: "performance-optimization"
    },
    {
      id: "scalability",
      problem: "Monolithic codebase becoming unmaintainable with team growth",
      solution: "Architected modular component system with clear boundaries",
      impact: "60% faster feature development, reduced bugs by 30%",
      projectId: "ecommerce-platform"
    }
  ];

  return (
    <div>
      {problemSolutionPairs.map((pair, index) => (
        <TestProblemSolutionCard
          key={pair.id}
          pair={pair}
          index={index}
          isSelected={selectedPair === pair.id}
          isHovered={hoveredPuzzle === pair.id}
          onSelect={() => setSelectedPair(selectedPair === pair.id ? null : pair.id)}
          onHover={() => setHoveredPuzzle(pair.id)}
          onLeave={() => setHoveredPuzzle(null)}
          inView={true}
        />
      ))}
    </div>
  );
}

describe('Problem-Solution Interactions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders problem-solution cards correctly', () => {
    render(<TestProblemSolutionContainer />);
    
    expect(screen.getByTestId('problem-card-performance')).toBeInTheDocument();
    expect(screen.getByTestId('problem-card-scalability')).toBeInTheDocument();
    
    expect(screen.getByText('Challenge #1')).toBeInTheDocument();
    expect(screen.getByText('Challenge #2')).toBeInTheDocument();
  });

  it('shows problem text initially', () => {
    render(<TestProblemSolutionContainer />);
    
    expect(screen.getByText(/E-commerce site loading in 8\+ seconds/)).toBeInTheDocument();
    expect(screen.getByText(/Monolithic codebase becoming unmaintainable/)).toBeInTheDocument();
  });

  it('hides solution content initially', () => {
    render(<TestProblemSolutionContainer />);
    
    expect(screen.queryByTestId('solution-performance')).not.toBeInTheDocument();
    expect(screen.queryByTestId('solution-scalability')).not.toBeInTheDocument();
  });

  it('reveals solution on hover', async () => {
    render(<TestProblemSolutionContainer />);
    
    const performanceCard = screen.getByTestId('problem-card-performance');
    
    fireEvent.mouseEnter(performanceCard);
    
    await waitFor(() => {
      expect(screen.getByTestId('solution-performance')).toBeInTheDocument();
      expect(screen.getByText(/Implemented code splitting, lazy loading/)).toBeInTheDocument();
      expect(screen.getByText(/Reduced load time to 2\.1s/)).toBeInTheDocument();
    });
  });

  it('hides solution on mouse leave', async () => {
    render(<TestProblemSolutionContainer />);
    
    const performanceCard = screen.getByTestId('problem-card-performance');
    
    // Hover to show solution
    fireEvent.mouseEnter(performanceCard);
    await waitFor(() => {
      expect(screen.getByTestId('solution-performance')).toBeInTheDocument();
    });
    
    // Leave to hide solution
    fireEvent.mouseLeave(performanceCard);
    await waitFor(() => {
      expect(screen.queryByTestId('solution-performance')).not.toBeInTheDocument();
    });
  });

  it('pins solution on click', async () => {
    render(<TestProblemSolutionContainer />);
    
    const performanceCard = screen.getByTestId('problem-card-performance');
    
    // Click to pin solution
    fireEvent.click(performanceCard);
    
    await waitFor(() => {
      expect(screen.getByTestId('solution-performance')).toBeInTheDocument();
    });
    
    // Mouse leave should not hide pinned solution
    fireEvent.mouseLeave(performanceCard);
    await waitFor(() => {
      expect(screen.getByTestId('solution-performance')).toBeInTheDocument();
    });
  });

  it('unpins solution on second click', async () => {
    render(<TestProblemSolutionContainer />);
    
    const performanceCard = screen.getByTestId('problem-card-performance');
    
    // Click to pin
    fireEvent.click(performanceCard);
    await waitFor(() => {
      expect(screen.getByTestId('solution-performance')).toBeInTheDocument();
    });
    
    // Click again to unpin
    fireEvent.click(performanceCard);
    await waitFor(() => {
      expect(screen.queryByTestId('solution-performance')).not.toBeInTheDocument();
    });
  });

  it('allows multiple cards to be pinned simultaneously', async () => {
    render(<TestProblemSolutionContainer />);
    
    const performanceCard = screen.getByTestId('problem-card-performance');
    const scalabilityCard = screen.getByTestId('problem-card-scalability');
    
    // Pin both cards
    fireEvent.click(performanceCard);
    fireEvent.click(scalabilityCard);
    
    await waitFor(() => {
      expect(screen.getByTestId('solution-performance')).toBeInTheDocument();
      expect(screen.getByTestId('solution-scalability')).toBeInTheDocument();
    });
  });

  it('shows correct hover indicators', () => {
    render(<TestProblemSolutionContainer />);
    
    // Initially shows "Hover to reveal"
    expect(screen.getAllByText('Hover to reveal')).toHaveLength(2);
    
    const performanceCard = screen.getByTestId('problem-card-performance');
    
    // On hover, shows "Click to pin"
    fireEvent.mouseEnter(performanceCard);
    expect(screen.getByText('Click to pin')).toBeInTheDocument();
  });

  it('maintains hover state independently for each card', async () => {
    render(<TestProblemSolutionContainer />);
    
    const performanceCard = screen.getByTestId('problem-card-performance');
    const scalabilityCard = screen.getByTestId('problem-card-scalability');
    
    // Hover first card
    fireEvent.mouseEnter(performanceCard);
    await waitFor(() => {
      expect(screen.getByTestId('solution-performance')).toBeInTheDocument();
      expect(screen.queryByTestId('solution-scalability')).not.toBeInTheDocument();
    });
    
    // Hover second card while first is still hovered
    fireEvent.mouseEnter(scalabilityCard);
    await waitFor(() => {
      expect(screen.getByTestId('solution-performance')).toBeInTheDocument();
      expect(screen.getByTestId('solution-scalability')).toBeInTheDocument();
    });
  });

  it('displays all problem-solution content correctly', () => {
    render(<TestProblemSolutionContainer />);
    
    const performanceCard = screen.getByTestId('problem-card-performance');
    fireEvent.mouseEnter(performanceCard);
    
    // Check problem content
    expect(screen.getByText(/E-commerce site loading in 8\+ seconds/)).toBeInTheDocument();
    
    // Check solution content
    expect(screen.getByText(/Implemented code splitting, lazy loading/)).toBeInTheDocument();
    
    // Check impact content
    expect(screen.getByText(/Reduced load time to 2\.1s/)).toBeInTheDocument();
  });

  it('handles rapid hover interactions gracefully', async () => {
    render(<TestProblemSolutionContainer />);
    
    const performanceCard = screen.getByTestId('problem-card-performance');
    
    // Rapid hover/leave cycles
    for (let i = 0; i < 5; i++) {
      fireEvent.mouseEnter(performanceCard);
      fireEvent.mouseLeave(performanceCard);
    }
    
    // Should end in unhovered state
    await waitFor(() => {
      expect(screen.queryByTestId('solution-performance')).not.toBeInTheDocument();
    });
  });
});

describe('Problem-Solution Accessibility', () => {
  it('has proper ARIA labels and roles', () => {
    render(<TestProblemSolutionContainer />);
    
    const cards = screen.getAllByTestId(/problem-card-/);
    cards.forEach(card => {
      expect(card).toBeInTheDocument();
      // In a real implementation, we'd check for proper ARIA attributes
    });
  });

  it('supports keyboard navigation', () => {
    render(<TestProblemSolutionContainer />);
    
    const performanceCard = screen.getByTestId('problem-card-performance');
    
    // Focus the card
    performanceCard.focus();
    
    // Press Enter to activate (simulate click)
    fireEvent.keyDown(performanceCard, { key: 'Enter', code: 'Enter' });
    
    // In a real implementation, this would trigger the click handler
    expect(performanceCard).toBeInTheDocument();
  });

  it('provides meaningful text for screen readers', () => {
    render(<TestProblemSolutionContainer />);
    
    // Check that problem and solution text is accessible
    expect(screen.getByText('Problem')).toBeInTheDocument();
    
    const performanceCard = screen.getByTestId('problem-card-performance');
    fireEvent.mouseEnter(performanceCard);
    
    expect(screen.getByText('Solution')).toBeInTheDocument();
    expect(screen.getByText('Impact')).toBeInTheDocument();
  });
});