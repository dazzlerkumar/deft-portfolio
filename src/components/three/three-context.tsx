"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { WebGLCapabilities, detectWebGLCapabilities, getRecommendedQualityLevel } from '@/lib/utils/webgl-detection';

interface ThreeContextValue {
  capabilities: WebGLCapabilities | null;
  qualityLevel: 'low' | 'medium' | 'high';
  isSupported: boolean;
  isLoading: boolean;
  error: string | null;
}

const ThreeContext = createContext<ThreeContextValue>({
  capabilities: null,
  qualityLevel: 'medium',
  isSupported: false,
  isLoading: true,
  error: null,
});

export function useThree() {
  const context = useContext(ThreeContext);
  if (!context) {
    throw new Error('useThree must be used within a ThreeProvider');
  }
  return context;
}

interface ThreeProviderProps {
  children: ReactNode;
}

export function ThreeProvider({ children }: ThreeProviderProps) {
  const [capabilities, setCapabilities] = useState<WebGLCapabilities | null>(null);
  const [qualityLevel, setQualityLevel] = useState<'low' | 'medium' | 'high'>('medium');
  const [isSupported, setIsSupported] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const detectCapabilities = async () => {
      try {
        // Small delay to ensure DOM is ready
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const caps = detectWebGLCapabilities();
        setCapabilities(caps);
        setIsSupported(caps.webgl);
        setQualityLevel(getRecommendedQualityLevel(caps));
        
        if (!caps.webgl) {
          setError('WebGL is not supported on this device');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to detect WebGL capabilities');
        setIsSupported(false);
      } finally {
        setIsLoading(false);
      }
    };

    detectCapabilities();
  }, []);

  const value: ThreeContextValue = {
    capabilities,
    qualityLevel,
    isSupported,
    isLoading,
    error,
  };

  return (
    <ThreeContext.Provider value={value}>
      {children}
    </ThreeContext.Provider>
  );
}