import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { SkillProgression } from '../skill-progression';
import { it } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { beforeEach } from 'node:test';
import { describe } from 'node:test';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    h3: ({ children, ...props }: any) => <h3 {...props}>{children}</h3>,
    h4: ({ children, ...props }: any) => <h4 {...props}>{children}</h4>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
    svg: ({ children, ...props }: any) => <svg {...props}>{children}</svg>,
    path: ({ children, ...props }: any) => <path {...props}>{children}</path>,
  },
  useInView: () => true,
  useAnimation: () => ({
    start: vi.fn()
  }),
}));

const mockSkills = [
  { skill: 'HTML/CSS', level: 90, color: '#FF6B35' },
  { skill: 'JavaScript', level: 75, color: '#F7931E' },
  { skill: 'React', level: 65, color: '#4A90E2' },
  { skill: 'Node.js', level: 55, color: '#68D391' },
];

describe('SkillProgression', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component title and description', () => {
    render(<SkillProgression skills={mockSkills} />);
    
    expect(screen.getByText('Skill Evolution')).toBeInTheDocument();
    expect(screen.getByText(/Watch how my technical expertise grew/)).toBeInTheDocument();
  });

  it('displays all skills with their names and levels', () => {
    render(<SkillProgression skills={mockSkills} />);
    
    mockSkills.forEach(skill => {
      expect(screen.getByText(skill.skill)).toBeInTheDocument();
      expect(screen.getAllByText(`${skill.level}%`)).toHaveLength(2); // One in header, one in indicator
    });
  });

  it('shows skill mastery levels correctly', () => {
    render(<SkillProgression skills={mockSkills} />);
    
    expect(screen.getAllByText('Expert')).toHaveLength(1); // HTML/CSS at 90%
    expect(screen.getAllByText('Advanced')).toHaveLength(2); // JavaScript at 75%, React at 65%
    expect(screen.getAllByText('Intermediate')).toHaveLength(1); // Node.js at 55%
  });

  it('renders progress bars for each skill', () => {
    const { container } = render(<SkillProgression skills={mockSkills} />);
    
    const progressBars = container.querySelectorAll('.h-3.bg-gray-700\\/50');
    expect(progressBars).toHaveLength(mockSkills.length);
  });

  it('displays star ratings based on skill levels', () => {
    const { container } = render(<SkillProgression skills={mockSkills} />);
    
    // Each skill should have 5 stars
    const stars = container.querySelectorAll('svg');
    expect(stars.length).toBeGreaterThan(mockSkills.length * 5);
  });

  it('shows growth visualization section', async () => {
    render(<SkillProgression skills={mockSkills} />);
    
    await waitFor(() => {
      expect(screen.getByText('Continuous Growth')).toBeInTheDocument();
      expect(screen.getByText(/Each skill represents countless hours/)).toBeInTheDocument();
    });
  });

  it('renders with custom className', () => {
    const { container } = render(
      <SkillProgression skills={mockSkills} className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('handles empty skills array', () => {
    render(<SkillProgression skills={[]} />);
    
    expect(screen.getByText('Skill Evolution')).toBeInTheDocument();
    expect(screen.queryByText('HTML/CSS')).not.toBeInTheDocument();
  });

  it('applies correct skill level indicators', () => {
    render(<SkillProgression skills={mockSkills} />);
    
    // Check that skill level indicators are positioned correctly
    const { container } = render(<SkillProgression skills={mockSkills} />);
    const indicators = container.querySelectorAll('.absolute.-top-8');
    expect(indicators).toHaveLength(mockSkills.length);
  });

  it('displays skill mastery categories correctly', () => {
    const testSkills = [
      { skill: 'Expert Skill', level: 85, color: '#FF6B35' },
      { skill: 'Advanced Skill', level: 75, color: '#F7931E' },
      { skill: 'Intermediate Skill', level: 55, color: '#4A90E2' },
      { skill: 'Beginner Skill', level: 35, color: '#68D391' },
    ];

    render(<SkillProgression skills={testSkills} />);
    
    expect(screen.getByText('Expert')).toBeInTheDocument();
    expect(screen.getByText('Advanced')).toBeInTheDocument();
    expect(screen.getByText('Intermediate')).toBeInTheDocument();
    expect(screen.getByText('Beginner')).toBeInTheDocument();
  });

  it('handles hover effects on skill cards', () => {
    const { container } = render(<SkillProgression skills={mockSkills} />);
    
    const skillCards = container.querySelectorAll('.group');
    expect(skillCards).toHaveLength(mockSkills.length);
  });
});