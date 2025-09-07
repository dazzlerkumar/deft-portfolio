"use client";

import React, { Suspense, ReactNode } from 'react';
import { Canvas } from '@react-three/fiber';
import { useThree } from './three-context';
import { Loading } from '@/components/ui/loading';
import { ErrorBoundary } from '@/components/ui/error-boundary';

interface SceneWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
  camera?: {
    position?: [number, number, number];
    fov?: number;
  };
  performance?: {
    min?: number;
    max?: number;
    debounce?: number;
  };
}

export function SceneWrapper({ 
  children, 
  fallback,
  className = "",
  camera = { position: [0, 0, 5], fov: 75 },
  performance = { min: 0.5, max: 1, debounce: 200 }
}: SceneWrapperProps) {
  const { isSupported, isLoading, error, qualityLevel } = useThree();

  // Show loading state
  if (isLoading) {
    return (
      <div className={`scene-wrapper ${className}`}>
        <Loading />
      </div>
    );
  }

  // Show fallback if WebGL is not supported or there's an error
  if (!isSupported || error) {
    return (
      <div className={`scene-wrapper ${className}`}>
        {fallback || <SceneFallback error={error} />}
      </div>
    );
  }

  // Adjust settings based on quality level
  const canvasSettings = getCanvasSettings(qualityLevel);

  return (
    <div className={`scene-wrapper ${className}`}>
      <ErrorBoundary 
        level="component"
        fallback={<SceneFallback error="3D rendering failed" />}
      >
        <Suspense fallback={<Loading />}>
          <Canvas
            camera={camera}
            performance={performance}
            dpr={canvasSettings.dpr}
            gl={{
              preserveDrawingBuffer: false,
              failIfMajorPerformanceCaveat: true,
              antialias: canvasSettings.antialias,
              alpha: canvasSettings.alpha,
              powerPreference: canvasSettings.powerPreference,
              ...canvasSettings.gl
            }}
          >
            {children}
          </Canvas>
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

function getCanvasSettings(qualityLevel: 'low' | 'medium' | 'high') {
  switch (qualityLevel) {
    case 'low':
      return {
        dpr: Math.min(window.devicePixelRatio, 1),
        antialias: false,
        alpha: true,
        powerPreference: 'low-power' as const,
        gl: {}
      };
    case 'medium':
      return {
        dpr: Math.min(window.devicePixelRatio, 1.5),
        antialias: true,
        alpha: true,
        powerPreference: 'default' as const,
        gl: {}
      };
    case 'high':
      return {
        dpr: Math.min(window.devicePixelRatio, 2),
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance' as const,
        gl: {}
      };
    default:
      return {
        dpr: 1,
        antialias: false,
        alpha: true,
        powerPreference: 'default' as const,
        gl: {}
      };
  }
}

interface SceneFallbackProps {
  error?: string | null;
}

function SceneFallback({ error }: SceneFallbackProps) {
  return (
    <div className="flex items-center justify-center h-full min-h-[200px] bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg border-2 border-dashed border-gray-300">
      <div className="text-center p-6">
        <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
          <svg 
            className="w-8 h-8 text-gray-400" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">
          3D Content Unavailable
        </h3>
        <p className="text-sm text-gray-500 max-w-xs">
          {error || "Your device doesn't support WebGL or 3D graphics. The experience will continue with 2D elements."}
        </p>
      </div>
    </div>
  );
}