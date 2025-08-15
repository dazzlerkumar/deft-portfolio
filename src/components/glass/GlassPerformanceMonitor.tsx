/**
 * Glass Performance Monitor Component
 * Visual performance monitoring and debugging component for glass effects
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useGlassPerformance } from '@/hooks/useGlassPerformance';
import type { PerformanceMetrics } from '@/utils/glass-performance';

interface GlassPerformanceMonitorProps {
  /** Show detailed metrics */
  showDetails?: boolean;
  /** Position of the monitor */
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  /** Enable/disable monitoring */
  enabled?: boolean;
  /** Custom styling */
  className?: string;
}

/**
 * Performance monitoring component for glass effects
 */
export function GlassPerformanceMonitor({
  showDetails = false,
  position = 'top-right',
  enabled = true,
  className = '',
}: GlassPerformanceMonitorProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const { state, startMonitoring, stopMonitoring } = useGlassPerformance({
    enableMonitoring: enabled,
    onPerformanceChange: setMetrics,
  });

  useEffect(() => {
    if (enabled) {
      startMonitoring();
      setIsVisible(true);
    } else {
      stopMonitoring();
      setIsVisible(false);
    }

    return () => {
      stopMonitoring();
    };
  }, [enabled, startMonitoring, stopMonitoring]);

  if (!isVisible || !metrics) {
    return null;
  }

  const getPerformanceColor = (frameRate: number) => {
    if (frameRate >= 55) return '#10b981'; // Green
    if (frameRate >= 30) return '#f59e0b'; // Yellow
    return '#ef4444'; // Red
  };

  const getPerformanceStatus = (tier: string) => {
    switch (tier) {
      case 'high': return '🚀';
      case 'medium': return '⚡';
      case 'low': return '🐌';
      default: return '❓';
    }
  };

  const positionClasses = {
    'top-left': 'top-4 left-4',
    'top-right': 'top-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'bottom-right': 'bottom-4 right-4',
  };

  return (
    <div
      className={`
        fixed ${positionClasses[position]} z-50 
        bg-black/80 backdrop-blur-sm text-white text-xs 
        rounded-lg p-3 font-mono min-w-[200px]
        border border-white/20
        ${className}
      `}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="font-semibold">Glass Performance</span>
        <span className="text-lg">
          {getPerformanceStatus(metrics.performanceTier)}
        </span>
      </div>

      <div className="space-y-1">
        <div className="flex justify-between">
          <span>FPS:</span>
          <span 
            style={{ color: getPerformanceColor(metrics.frameRate) }}
            className="font-bold"
          >
            {metrics.frameRate}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Tier:</span>
          <span className="capitalize">{metrics.performanceTier}</span>
        </div>

        <div className="flex justify-between">
          <span>Screen:</span>
          <span className="capitalize">{state.screenSize}</span>
        </div>

        {state.isOptimized && (
          <div className="text-yellow-400 text-center mt-2">
            ⚠️ Optimized
          </div>
        )}

        {showDetails && (
          <>
            <hr className="border-white/20 my-2" />
            
            <div className="flex justify-between">
              <span>Frame Time:</span>
              <span>{metrics.averageFrameTime.toFixed(1)}ms</span>
            </div>

            <div className="flex justify-between">
              <span>Dropped:</span>
              <span>{metrics.droppedFrames}</span>
            </div>

            {metrics.isThrottled && (
              <div className="text-red-400 text-center mt-1">
                🔥 Throttled
              </div>
            )}

            <div className="mt-2 text-xs opacity-75">
              <div>Blur: {state.config.blur}px</div>
              <div>Opacity: {(state.config.opacity || 0.1).toFixed(2)}</div>
              <div>Saturation: {state.config.saturation}%</div>
            </div>
          </>
        )}
      </div>

      <button
        onClick={() => setIsVisible(false)}
        className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center hover:bg-red-600 transition-colors"
        title="Close monitor"
      >
        ×
      </button>
    </div>
  );
}

/**
 * Simple FPS counter component
 */
export function GlassFPSCounter({
  className = '',
}: {
  className?: string;
}) {
  const [fps, setFps] = useState(0);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const updateFPS = (currentTime: number) => {
      frameCount++;
      const deltaTime = currentTime - lastTime;

      if (deltaTime >= 1000) {
        setFps(Math.round((frameCount * 1000) / deltaTime));
        frameCount = 0;
        lastTime = currentTime;
      }

      animationId = requestAnimationFrame(updateFPS);
    };

    animationId = requestAnimationFrame(updateFPS);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, []);

  const getColor = (fps: number) => {
    if (fps >= 55) return 'text-green-400';
    if (fps >= 30) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div
      className={`
        fixed top-4 left-4 z-50 
        bg-black/60 backdrop-blur-sm text-white 
        rounded px-2 py-1 font-mono text-sm
        ${getColor(fps)} ${className}
      `}
    >
      {fps} FPS
    </div>
  );
}

export default GlassPerformanceMonitor;