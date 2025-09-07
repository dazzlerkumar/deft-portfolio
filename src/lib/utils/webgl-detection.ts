/**
 * WebGL Detection and Capability Testing
 * Provides utilities for detecting WebGL support and device capabilities
 */

export interface WebGLCapabilities {
  webgl: boolean;
  webgl2: boolean;
  maxTextureSize: number;
  maxVertexUniforms: number;
  maxFragmentUniforms: number;
  extensions: string[];
  renderer: string;
  vendor: string;
  isLowEndDevice: boolean;
}

/**
 * Detects WebGL support and capabilities
 */
export function detectWebGLCapabilities(): WebGLCapabilities {
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  const gl2 = canvas.getContext('webgl2');
  
  const capabilities: WebGLCapabilities = {
    webgl: !!gl,
    webgl2: !!gl2,
    maxTextureSize: 0,
    maxVertexUniforms: 0,
    maxFragmentUniforms: 0,
    extensions: [],
    renderer: 'unknown',
    vendor: 'unknown',
    isLowEndDevice: false
  };

  if (gl) {
    // Get basic capabilities
    capabilities.maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
    capabilities.maxVertexUniforms = gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS);
    capabilities.maxFragmentUniforms = gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS);
    
    // Get extensions
    capabilities.extensions = gl.getSupportedExtensions() || [];
    
    // Get renderer info if available
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) {
      capabilities.renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
      capabilities.vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL);
    }
    
    // Determine if this is a low-end device
    capabilities.isLowEndDevice = isLowEndDevice(capabilities);
  }

  // Clean up
  canvas.remove();
  
  return capabilities;
}

/**
 * Determines if the device is low-end based on WebGL capabilities
 */
function isLowEndDevice(capabilities: WebGLCapabilities): boolean {
  // Check for common low-end indicators
  const lowEndIndicators = [
    capabilities.maxTextureSize < 4096,
    capabilities.maxVertexUniforms < 128,
    capabilities.maxFragmentUniforms < 16,
    !capabilities.extensions.includes('OES_texture_float'),
    capabilities.renderer.toLowerCase().includes('mali'),
    capabilities.renderer.toLowerCase().includes('adreno 3'),
    capabilities.renderer.toLowerCase().includes('powervr'),
  ];

  // If 2 or more indicators are true, consider it low-end
  return lowEndIndicators.filter(Boolean).length >= 2;
}

/**
 * Gets the recommended quality level based on device capabilities
 */
export function getRecommendedQualityLevel(capabilities: WebGLCapabilities): 'low' | 'medium' | 'high' {
  if (!capabilities.webgl) return 'low';
  if (capabilities.isLowEndDevice) return 'low';
  if (capabilities.webgl2 && capabilities.maxTextureSize >= 8192) return 'high';
  return 'medium';
}

/**
 * Checks if the device supports the minimum requirements for 3D features
 */
export function supportsMinimum3D(capabilities: WebGLCapabilities): boolean {
  return capabilities.webgl && capabilities.maxTextureSize >= 2048;
}