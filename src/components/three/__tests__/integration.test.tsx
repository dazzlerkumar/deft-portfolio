import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ThreeProvider } from '../three-context';
import { SceneWrapper } from '../scene-wrapper';
import { GrowingTree } from '../growing-tree';

// Mock WebGL detection
vi.mock('@/lib/utils/webgl-detection', () => ({
  detectWebGLCapabilities: vi.fn(),
  getRecommendedQualityLevel: vi.fn(),
}));

// Mock React Three Fiber
vi.mock('@react-three/fiber', () => ({
  Canvas: vi.fn(({ children }) => <div data-testid="canvas">{children}</div>),
  useFrame: vi.fn(),
}));

// No need to mock framer-motion-3d since we're not using it

import { detectWebGLCapabilities, getRecommendedQualityLevel } from '@/lib/utils/webgl-detection';

const mockDetectWebGLCapabilities = vi.mocked(detectWebGLCapabilities);
const mockGetRecommendedQualityLevel = vi.mocked(getRecommendedQualityLevel);

describe('3D Components Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render 3D scene when WebGL is supported', async () => {
    const mockCapabilities = {
      webgl: true,
      webgl2: true,
      maxTextureSize: 4096,
      maxVertexUniforms: 256,
      maxFragmentUniforms: 64,
      extensions: ['OES_texture_float'],
      renderer: 'test-renderer',
      vendor: 'test-vendor',
      isLowEndDevice: false
    };

    mockDetectWebGLCapabilities.mockResolvedValue(mockCapabilities);
    mockGetRecommendedQualityLevel.mockReturnValue('high');

    render(
      <ThreeProvider>
        <SceneWrapper>
          <GrowingTree progress={0.5} />
        </SceneWrapper>
      </ThreeProvider>
    );

    // Wait for WebGL detection to complete
    await waitFor(() => {
      expect(screen.getByTestId('canvas')).toBeInTheDocument();
    });

    // Should render the 3D scene
    expect(screen.getByTestId('canvas')).toBeInTheDocument();
  });

  it('should render fallback when WebGL is not supported', async () => {
    const mockCapabilities = {
      webgl: false,
      webgl2: false,
      maxTextureSize: 0,
      maxVertexUniforms: 0,
      maxFragmentUniforms: 0,
      extensions: [],
      renderer: 'unknown',
      vendor: 'unknown',
      isLowEndDevice: false
    };

    mockDetectWebGLCapabilities.mockResolvedValue(mockCapabilities);
    mockGetRecommendedQualityLevel.mockReturnValue('low');

    const fallback = <div data-testid="fallback">2D Fallback</div>;

    render(
      <ThreeProvider>
        <SceneWrapper fallback={fallback}>
          <GrowingTree progress={0.5} />
        </SceneWrapper>
      </ThreeProvider>
    );

    // Wait for WebGL detection to complete
    await waitFor(() => {
      expect(screen.getByTestId('fallback')).toBeInTheDocument();
    });

    // Should render fallback instead of 3D scene
    expect(screen.getByTestId('fallback')).toBeInTheDocument();
    expect(screen.queryByTestId('canvas')).not.toBeInTheDocument();
  });

  it('should handle detection errors gracefully', async () => {
    mockDetectWebGLCapabilities.mockRejectedValue(new Error('Detection failed'));

    render(
      <ThreeProvider>
        <SceneWrapper>
          <GrowingTree progress={0.5} />
        </SceneWrapper>
      </ThreeProvider>
    );

    // Should show fallback when detection fails
    await waitFor(() => {
      expect(screen.getByText('3D Content Unavailable')).toBeInTheDocument();
    });
  });

  it('should adjust quality based on device capabilities', async () => {
    const lowEndCapabilities = {
      webgl: true,
      webgl2: false,
      maxTextureSize: 2048,
      maxVertexUniforms: 64,
      maxFragmentUniforms: 16,
      extensions: [],
      renderer: 'Mali-400',
      vendor: 'ARM',
      isLowEndDevice: true
    };

    mockDetectWebGLCapabilities.mockResolvedValue(lowEndCapabilities);
    mockGetRecommendedQualityLevel.mockReturnValue('low');

    render(
      <ThreeProvider>
        <SceneWrapper>
          <GrowingTree progress={0.5} />
        </SceneWrapper>
      </ThreeProvider>
    );

    // Should still render 3D scene but with low quality
    await waitFor(() => {
      expect(screen.getByTestId('canvas')).toBeInTheDocument();
    });
  });

  it('should show loading state initially', () => {
    // Don't resolve the promise immediately
    mockDetectWebGLCapabilities.mockImplementation(() => new Promise(() => {}));

    render(
      <ThreeProvider>
        <SceneWrapper>
          <GrowingTree progress={0.5} />
        </SceneWrapper>
      </ThreeProvider>
    );

    // Should show loading state
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});