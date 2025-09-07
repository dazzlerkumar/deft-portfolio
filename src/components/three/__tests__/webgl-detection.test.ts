import { describe, it, expect, vi, beforeEach } from 'vitest';
import { detectWebGLCapabilities, getRecommendedQualityLevel, supportsMinimum3D } from '@/lib/utils/webgl-detection';

// Mock WebGL context
const mockWebGLContext = {
  getParameter: vi.fn(),
  getSupportedExtensions: vi.fn(),
  getExtension: vi.fn(),
};

const mockCanvas = {
  getContext: vi.fn(),
  remove: vi.fn(),
};

// Mock DOM
Object.defineProperty(document, 'createElement', {
  value: vi.fn(() => mockCanvas),
  writable: true,
});

describe('WebGL Detection', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('detectWebGLCapabilities', () => {
    it('should detect WebGL support when available', () => {
      mockCanvas.getContext.mockImplementation((type) => {
        if (type === 'webgl' || type === 'experimental-webgl') {
          return mockWebGLContext;
        }
        if (type === 'webgl2') {
          return mockWebGLContext;
        }
        return null;
      });

      mockWebGLContext.getParameter.mockImplementation((param) => {
        switch (param) {
          case 'MAX_TEXTURE_SIZE':
            return 4096;
          case 'MAX_VERTEX_UNIFORM_VECTORS':
            return 256;
          case 'MAX_FRAGMENT_UNIFORM_VECTORS':
            return 64;
          default:
            return 'test-renderer';
        }
      });

      mockWebGLContext.getSupportedExtensions.mockReturnValue([
        'OES_texture_float',
        'WEBGL_debug_renderer_info'
      ]);

      mockWebGLContext.getExtension.mockImplementation((ext) => {
        if (ext === 'WEBGL_debug_renderer_info') {
          return {
            UNMASKED_RENDERER_WEBGL: 'test-renderer',
            UNMASKED_VENDOR_WEBGL: 'test-vendor'
          };
        }
        return null;
      });

      const capabilities = detectWebGLCapabilities();

      expect(capabilities.webgl).toBe(true);
      expect(capabilities.webgl2).toBe(true);
      expect(capabilities.maxTextureSize).toBe(4096);
      expect(capabilities.extensions).toContain('OES_texture_float');
      expect(mockCanvas.remove).toHaveBeenCalled();
    });

    it('should handle no WebGL support', () => {
      mockCanvas.getContext.mockReturnValue(null);

      const capabilities = detectWebGLCapabilities();

      expect(capabilities.webgl).toBe(false);
      expect(capabilities.webgl2).toBe(false);
      expect(capabilities.maxTextureSize).toBe(0);
      expect(capabilities.extensions).toEqual([]);
    });

    it('should detect low-end devices', () => {
      mockCanvas.getContext.mockReturnValue(mockWebGLContext);
      
      mockWebGLContext.getParameter.mockImplementation((param) => {
        switch (param) {
          case 'MAX_TEXTURE_SIZE':
            return 2048; // Low texture size
          case 'MAX_VERTEX_UNIFORM_VECTORS':
            return 64; // Low uniform count
          case 'MAX_FRAGMENT_UNIFORM_VECTORS':
            return 8; // Low uniform count
          default:
            return 'Mali-400'; // Low-end GPU
        }
      });

      mockWebGLContext.getSupportedExtensions.mockReturnValue([]);
      mockWebGLContext.getExtension.mockReturnValue(null);

      const capabilities = detectWebGLCapabilities();

      expect(capabilities.isLowEndDevice).toBe(true);
    });
  });

  describe('getRecommendedQualityLevel', () => {
    it('should return low quality for no WebGL', () => {
      const capabilities = {
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

      expect(getRecommendedQualityLevel(capabilities)).toBe('low');
    });

    it('should return low quality for low-end devices', () => {
      const capabilities = {
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

      expect(getRecommendedQualityLevel(capabilities)).toBe('low');
    });

    it('should return high quality for high-end devices', () => {
      const capabilities = {
        webgl: true,
        webgl2: true,
        maxTextureSize: 8192,
        maxVertexUniforms: 512,
        maxFragmentUniforms: 128,
        extensions: ['OES_texture_float'],
        renderer: 'NVIDIA GeForce RTX 3080',
        vendor: 'NVIDIA',
        isLowEndDevice: false
      };

      expect(getRecommendedQualityLevel(capabilities)).toBe('high');
    });

    it('should return medium quality for mid-range devices', () => {
      const capabilities = {
        webgl: true,
        webgl2: false,
        maxTextureSize: 4096,
        maxVertexUniforms: 256,
        maxFragmentUniforms: 64,
        extensions: ['OES_texture_float'],
        renderer: 'Intel HD Graphics',
        vendor: 'Intel',
        isLowEndDevice: false
      };

      expect(getRecommendedQualityLevel(capabilities)).toBe('medium');
    });
  });

  describe('supportsMinimum3D', () => {
    it('should return true for devices meeting minimum requirements', () => {
      const capabilities = {
        webgl: true,
        webgl2: false,
        maxTextureSize: 2048,
        maxVertexUniforms: 128,
        maxFragmentUniforms: 32,
        extensions: [],
        renderer: 'test',
        vendor: 'test',
        isLowEndDevice: false
      };

      expect(supportsMinimum3D(capabilities)).toBe(true);
    });

    it('should return false for devices not meeting minimum requirements', () => {
      const capabilities = {
        webgl: false,
        webgl2: false,
        maxTextureSize: 1024,
        maxVertexUniforms: 64,
        maxFragmentUniforms: 16,
        extensions: [],
        renderer: 'test',
        vendor: 'test',
        isLowEndDevice: true
      };

      expect(supportsMinimum3D(capabilities)).toBe(false);
    });
  });
});