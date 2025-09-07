import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SceneWrapper } from '../scene-wrapper';
import { ThreeProvider } from '../three-context';

// Mock React Three Fiber
vi.mock('@react-three/fiber', () => ({
  Canvas: vi.fn(({ children }) => <div data-testid="canvas">{children}</div>),
}));

// Mock the Three context
vi.mock('../three-context', () => ({
  useThree: vi.fn(),
  ThreeProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

import { useThree } from '../three-context';
const mockUseThree = vi.mocked(useThree);

describe('SceneWrapper', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading state when loading', () => {
    mockUseThree.mockReturnValue({
      capabilities: null,
      qualityLevel: 'medium',
      isSupported: false,
      isLoading: true,
      error: null,
    });

    render(
      <SceneWrapper>
        <mesh />
      </SceneWrapper>
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('should render fallback when WebGL is not supported', () => {
    mockUseThree.mockReturnValue({
      capabilities: null,
      qualityLevel: 'low',
      isSupported: false,
      isLoading: false,
      error: 'WebGL is not supported',
    });

    render(
      <SceneWrapper>
        <mesh />
      </SceneWrapper>
    );

    expect(screen.getByText('3D Content Unavailable')).toBeInTheDocument();
    expect(screen.getByText(/WebGL is not supported/)).toBeInTheDocument();
  });

  it('should render custom fallback when provided', () => {
    mockUseThree.mockReturnValue({
      capabilities: null,
      qualityLevel: 'low',
      isSupported: false,
      isLoading: false,
      error: 'WebGL is not supported',
    });

    const customFallback = <div data-testid="custom-fallback">Custom fallback</div>;

    render(
      <SceneWrapper fallback={customFallback}>
        <mesh />
      </SceneWrapper>
    );

    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
    expect(screen.getByText('Custom fallback')).toBeInTheDocument();
  });

  it('should render Canvas when WebGL is supported', () => {
    mockUseThree.mockReturnValue({
      capabilities: {
        webgl: true,
        webgl2: true,
        maxTextureSize: 4096,
        maxVertexUniforms: 256,
        maxFragmentUniforms: 64,
        extensions: [],
        renderer: 'test',
        vendor: 'test',
        isLowEndDevice: false,
      },
      qualityLevel: 'high',
      isSupported: true,
      isLoading: false,
      error: null,
    });

    render(
      <SceneWrapper>
        <mesh data-testid="test-mesh" />
      </SceneWrapper>
    );

    expect(screen.getByTestId('canvas')).toBeInTheDocument();
    expect(screen.getByTestId('test-mesh')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    mockUseThree.mockReturnValue({
      capabilities: null,
      qualityLevel: 'low',
      isSupported: false,
      isLoading: false,
      error: 'WebGL is not supported',
    });

    const { container } = render(
      <SceneWrapper className="custom-class">
        <mesh />
      </SceneWrapper>
    );

    expect(container.firstChild).toHaveClass('scene-wrapper', 'custom-class');
  });

  it('should handle error state', () => {
    mockUseThree.mockReturnValue({
      capabilities: null,
      qualityLevel: 'low',
      isSupported: false,
      isLoading: false,
      error: 'WebGL context creation failed',
    });

    render(
      <SceneWrapper>
        <mesh />
      </SceneWrapper>
    );

    expect(screen.getByText('3D Content Unavailable')).toBeInTheDocument();
    expect(screen.getByText(/WebGL context creation failed/)).toBeInTheDocument();
  });
});