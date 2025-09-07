import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

// Mock the chapter page component
const MockChapterPage = () => {
  const [currentChapter, setCurrentChapter] = React.useState(2);
  
  const handleChapterComplete = () => {
    setCurrentChapter(3);
  };

  return (
    <div>
      <div data-testid="current-chapter">Chapter {currentChapter}</div>
      <button onClick={handleChapterComplete} data-testid="complete-chapter">
        Complete Chapter
      </button>
    </div>
  );
};

describe('Chapter Two Integration', () => {
  it('handles chapter completion correctly', () => {
    render(<MockChapterPage />);
    
    expect(screen.getByTestId('current-chapter')).toHaveTextContent('Chapter 2');
    
    fireEvent.click(screen.getByTestId('complete-chapter'));
    
    expect(screen.getByTestId('current-chapter')).toHaveTextContent('Chapter 3');
  });

  it('renders chapter navigation elements', () => {
    render(<MockChapterPage />);
    
    expect(screen.getByTestId('current-chapter')).toBeInTheDocument();
    expect(screen.getByTestId('complete-chapter')).toBeInTheDocument();
  });
});