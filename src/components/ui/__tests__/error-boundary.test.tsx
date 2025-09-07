import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ErrorBoundary, ChapterErrorBoundary, PageErrorBoundary } from '../error-boundary';
import { vi } from 'vitest';
import { it } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { describe } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { it } from 'node:test';
import { describe } from 'node:test';
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
    button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
  },
}));

// Component that throws an error
const ThrowError = ({ shouldThrow = false }: { shouldThrow?: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>No error</div>;
};

describe('ErrorBoundary', () => {
  // Suppress console.error for these tests
  const originalError = console.error;
  beforeAll(() => {
    console.error = vi.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test content</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  it('renders error UI when there is an error', () => {
    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Component Error')).toBeInTheDocument();
    expect(screen.getByText('A component in this section failed to load properly.')).toBeInTheDocument();
  });

  it('renders custom fallback when provided', () => {
    const customFallback = <div>Custom error message</div>;

    render(
      <ErrorBoundary fallback={customFallback}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Custom error message')).toBeInTheDocument();
  });

  it('calls onError callback when error occurs', () => {
    const mockOnError = vi.fn();

    render(
      <ErrorBoundary onError={mockOnError}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(mockOnError).toHaveBeenCalledWith(
      expect.any(Error),
      expect.objectContaining({
        componentStack: expect.any(String)
      })
    );
  });

  it('handles retry functionality', () => {
    const { rerender } = render(
      <ErrorBoundary maxRetries={2}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Retry (2 left)')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Retry (2 left)'));

    // After retry, should show working component
    rerender(
      <ErrorBoundary maxRetries={2}>
        <ThrowError shouldThrow={false} />
      </ErrorBoundary>
    );

    expect(screen.getByText('No error')).toBeInTheDocument();
  });

  it('disables retry after max attempts', () => {
    render(
      <ErrorBoundary maxRetries={0}>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.queryByText(/Retry/)).not.toBeInTheDocument();
  });

  it('renders page-level error UI', () => {
    render(
      <ErrorBoundary level="page">
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Story Interrupted')).toBeInTheDocument();
    expect(screen.getByText('Our storytelling engine encountered an unexpected plot twist.')).toBeInTheDocument();
    expect(screen.getByText('📖💥')).toBeInTheDocument();
  });

  it('renders chapter-level error UI', () => {
    render(
      <ErrorBoundary level="chapter">
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Chapter Loading Error')).toBeInTheDocument();
    expect(screen.getByText('This chapter seems to have some missing pages.')).toBeInTheDocument();
    expect(screen.getByText('📄⚠️')).toBeInTheDocument();
  });

  it('shows error details in development mode', () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = 'development';

    render(
      <ErrorBoundary level="page">
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Error Details (Development)')).toBeInTheDocument();

    process.env.NODE_ENV = originalEnv;
  });

  it('handles refresh button click', () => {
    // Mock window.location.reload
    const mockReload = vi.fn();
    Object.defineProperty(window, 'location', {
      value: { reload: mockReload },
      writable: true
    });

    render(
      <ErrorBoundary level="page">
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    fireEvent.click(screen.getByText('Start Over'));
    // Note: In a real test environment, you'd need to mock window.location.href
  });
});

describe('ChapterErrorBoundary', () => {
  const originalError = console.error;
  beforeAll(() => {
    console.error = vi.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  it('renders children when no error', () => {
    render(
      <ChapterErrorBoundary chapterNumber={1}>
        <div>Chapter content</div>
      </ChapterErrorBoundary>
    );

    expect(screen.getByText('Chapter content')).toBeInTheDocument();
  });

  it('renders chapter error UI when error occurs', () => {
    render(
      <ChapterErrorBoundary chapterNumber={1}>
        <ThrowError shouldThrow={true} />
      </ChapterErrorBoundary>
    );

    expect(screen.getByText('Chapter Loading Error')).toBeInTheDocument();
  });

  it('has correct retry limit for chapters', () => {
    render(
      <ChapterErrorBoundary chapterNumber={1}>
        <ThrowError shouldThrow={true} />
      </ChapterErrorBoundary>
    );

    expect(screen.getByText('Retry Chapter (2 left)')).toBeInTheDocument();
  });
});

describe('PageErrorBoundary', () => {
  const originalError = console.error;
  beforeAll(() => {
    console.error = vi.fn();
  });

  afterAll(() => {
    console.error = originalError;
  });

  it('renders children when no error', () => {
    render(
      <PageErrorBoundary>
        <div>Page content</div>
      </PageErrorBoundary>
    );

    expect(screen.getByText('Page content')).toBeInTheDocument();
  });

  it('renders page error UI when error occurs', () => {
    render(
      <PageErrorBoundary>
        <ThrowError shouldThrow={true} />
      </PageErrorBoundary>
    );

    expect(screen.getByText('Story Interrupted')).toBeInTheDocument();
  });

  it('has correct retry limit for pages', () => {
    render(
      <PageErrorBoundary>
        <ThrowError shouldThrow={true} />
      </PageErrorBoundary>
    );

    expect(screen.getByText('Continue Story (1 attempts left)')).toBeInTheDocument();
  });
});