import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { ThreeProvider, useThree } from '../three-context';

// Mock the WebGL detection utility
vi.mock('@/lib/utils/webgl-detection', () => ({
  detectWebGLCapabilities: vi.fn(),
  getRecommendedQualityLevel: vi.fn(),
}));

import { detectWebGLCapabilities, getRecommendedQualityLevel } from '@/lib/utils/webgl-detection';

const mockDetectWebGLCapabilities = vi.mocked(detectWebGLCapabilities);
const mockGetRecommendedQualityLevel = vi.mocked(getRecommendedQualityLevel);

// Test component that uses the context
function TestComponent() {
  const { capabilities, qualityLevel, isSupported, isLoading, error } = useThree();
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  
  return (
    <div>
      <div data-testid="supported">{isSupported ? 'supported' : 'not-supported'}</div>
      <div data-testid="quality">{qualityLevel}</div>
      <div data-testid="webgl">{capabilities?.webgl ? 'webgl-available' : 'webgl-unavailable'}</div>
    </div>
  );
}

describe('ThreeProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should provide WebGL capabilities when supported', async () => {
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
        <TestComponent />
      </ThreeProvider>
    );

    // Should show loading initially
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    // Wait for capabilities to be detected
    await waitFor(() => {
      expect(screen.getByTestId('supported')).toHaveTextContent('supported');
    });

    expect(screen.getByTestId('quality')).toHaveTextContent('high');
    expect(screen.getByTestId('webgl')).toHaveTextContent('webgl-available');
  });

  it('should handle WebGL not supported', async () => {
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

    render(
      <ThreeProvider>
        <TestComponent />
      </ThreeProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId('supported')).toHaveTextContent('not-supported');
    });

    expect(screen.getByTestId('quality')).toHaveTextContent('low');
    expect(screen.getByTestId('webgl')).toHaveTextContent('webgl-unavailable');
  });

  it('should handle detection errors', async () => {
    mockDetectWebGLCapabilities.mockRejectedValue(new Error('Detection failed'));

    render(
      <ThreeProvider>
        <TestComponent />
      </ThreeProvider>
    );

    await waitFor(() => {
      expect(screen.getByText('Error: Detection failed')).toBeInTheDocument();
    });
  });

  it('should throw error when useThree is used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    expect(() => {
      render(<TestComponent />);
    }).toThrow('useThree must be used within a ThreeProvider');
    
    consoleSpy.mockRestore();
  });
});