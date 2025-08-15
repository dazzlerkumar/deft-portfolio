/**
 * Glass Performance Demo Component
 * Demonstrates performance optimizations and responsive behavior
 */

"use client";

import React, { useState } from "react";
import { Glass } from "./Glass";
import { GlassCard } from "./GlassCard";
import { GlassButton } from "./GlassButton";
import {
    GlassPerformanceMonitor,
    GlassFPSCounter,
} from "./GlassPerformanceMonitor";
import { useResponsiveGlass } from "@/hooks/useGlassPerformance";

export function GlassPerformanceDemo() {
    const [showMonitor, setShowMonitor] = useState(false);
    const [showFPS, setShowFPS] = useState(false);
    const [performanceMode, setPerformanceMode] = useState<
        "auto" | "low" | "medium" | "high"
    >("auto");

    const { config, cssVars } = useResponsiveGlass("medium");

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-emerald-900 p-8">
            {/* Performance Controls */}
            <div className="fixed top-4 left-4 z-40 space-y-2">
                <button
                    onClick={() => setShowMonitor(!showMonitor)}
                    className="px-3 py-1 bg-black/60 text-white text-sm rounded backdrop-blur-sm"
                >
                    {showMonitor ? "Hide" : "Show"} Monitor
                </button>

                <button
                    onClick={() => setShowFPS(!showFPS)}
                    className="px-3 py-1 bg-black/60 text-white text-sm rounded backdrop-blur-sm"
                >
                    {showFPS ? "Hide" : "Show"} FPS
                </button>

                <select
                    value={performanceMode}
                    onChange={(e) =>
                        setPerformanceMode(
                            e.target.value as "auto" | "low" | "medium" | "high"
                        )
                    }
                    className="px-2 py-1 bg-black/60 text-white text-sm rounded backdrop-blur-sm"
                >
                    <option value="auto">Auto Performance</option>
                    <option value="low">Low Performance</option>
                    <option value="medium">Medium Performance</option>
                    <option value="high">High Performance</option>
                </select>
            </div>

            {/* Performance Monitors */}
            {showMonitor && (
                <GlassPerformanceMonitor
                    showDetails={true}
                    position="top-right"
                    enabled={true}
                />
            )}

            {showFPS && <GlassFPSCounter />}

            {/* Demo Content */}
            <div className="max-w-6xl mx-auto space-y-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-white mb-4">
                        Glass Performance Demo
                    </h1>
                    <p className="text-white/80 text-lg">
                        Responsive glass morphism with performance optimizations
                    </p>
                </div>

                {/* Performance Comparison Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Minimal Performance */}
                    <GlassCard
                        variant="subtle"
                        className="glass-minimal perf-low touch-optimized"
                        /*  enablePerformanceMonitoring={false} */
                    >
                        <h3 className="text-white font-semibold mb-2">
                            Minimal Performance
                        </h3>
                        <p className="text-white/80 text-sm mb-4">
                            Optimized for low-end devices with reduced blur and
                            animations.
                        </p>
                        <div className="space-y-2">
                            <div className="h-2 bg-white/20 rounded overflow-hidden">
                                <div className="h-full bg-blue-400 w-3/4 rounded"></div>
                            </div>
                            <p className="text-xs text-white/60">
                                8px blur, 120% saturation
                            </p>
                        </div>
                    </GlassCard>

                    {/* Medium Performance */}
                    <GlassCard
                        variant="medium"
                        className="glass-medium perf-medium touch-optimized"
                        /*     enablePerformanceMonitoring={true} */
                    >
                        <h3 className="text-white font-semibold mb-2">
                            Medium Performance
                        </h3>
                        <p className="text-white/80 text-sm mb-4">
                            Balanced performance with moderate blur and smooth
                            animations.
                        </p>
                        <div className="space-y-2">
                            <div className="h-2 bg-white/20 rounded overflow-hidden">
                                <div className="h-full bg-emerald-400 w-4/5 rounded"></div>
                            </div>
                            <p className="text-xs text-white/60">
                                16px blur, 150% saturation
                            </p>
                        </div>
                    </GlassCard>

                    {/* High Performance */}
                    <GlassCard
                        variant="heavy"
                        className="glass-heavy perf-high hw-full touch-optimized"
                        /*  enablePerformanceMonitoring={true} */
                        /*     enableHardwareAcceleration={true} */
                    >
                        <h3 className="text-white font-semibold mb-2">
                            High Performance
                        </h3>
                        <p className="text-white/80 text-sm mb-4">
                            Full effects with hardware acceleration and complex
                            animations.
                        </p>
                        <div className="space-y-2">
                            <div className="h-2 bg-white/20 rounded overflow-hidden">
                                <div className="h-full bg-purple-400 w-full rounded"></div>
                            </div>
                            <p className="text-xs text-white/60">
                                24px blur, 180% saturation
                            </p>
                        </div>
                    </GlassCard>
                </div>

                {/* Responsive Behavior Demo */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white text-center">
                        Responsive Behavior
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {/* Mobile */}
                        <Glass
                            variant="card"
                            className="glass-mobile p-4 text-center"
                            enableTouchOptimization={true}
                        >
                            <div className="text-2xl mb-2">📱</div>
                            <h4 className="text-white font-medium mb-1">
                                Mobile
                            </h4>
                            <p className="text-white/70 text-xs">
                                Touch optimized, reduced blur
                            </p>
                        </Glass>

                        {/* Tablet */}
                        <Glass
                            variant="card"
                            className="glass-tablet p-4 text-center"
                            enableTouchOptimization={true}
                        >
                            <div className="text-2xl mb-2">📱</div>
                            <h4 className="text-white font-medium mb-1">
                                Tablet
                            </h4>
                            <p className="text-white/70 text-xs">
                                Balanced performance
                            </p>
                        </Glass>

                        {/* Desktop */}
                        <Glass
                            variant="card"
                            className="glass-desktop p-4 text-center"
                            enableHardwareAcceleration={true}
                        >
                            <div className="text-2xl mb-2">💻</div>
                            <h4 className="text-white font-medium mb-1">
                                Desktop
                            </h4>
                            <p className="text-white/70 text-xs">
                                Full effects enabled
                            </p>
                        </Glass>

                        {/* Wide Screen */}
                        <Glass
                            variant="card"
                            className="glass-wide p-4 text-center"
                            enableHardwareAcceleration={true}
                        >
                            <div className="text-2xl mb-2">🖥️</div>
                            <h4 className="text-white font-medium mb-1">
                                Wide Screen
                            </h4>
                            <p className="text-white/70 text-xs">
                                Enhanced effects
                            </p>
                        </Glass>
                    </div>
                </div>

                {/* Interactive Elements */}
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-white text-center">
                        Interactive Elements
                    </h2>

                    <div className="flex flex-wrap justify-center gap-4">
                        <GlassButton
                            variant="accent"
                            className="touch-optimized"
                            /*  enablePerformanceMonitoring={true} */
                        >
                            Performance Button
                        </GlassButton>

                        <GlassButton
                            variant="medium"
                            className="hw-full"
                            /*    enableHardwareAcceleration={true} */
                        >
                            Hardware Accelerated
                        </GlassButton>

                        <GlassButton
                            variant="subtle"
                            className="perf-low"
                            /*  enableTouchOptimization={true} */
                        >
                            Low Performance
                        </GlassButton>
                    </div>
                </div>

                {/* Performance Metrics Display */}
                <Glass
                    variant="medium"
                    className="p-6 text-center"
                    style={cssVars}
                >
                    <h3 className="text-white font-semibold mb-4">
                        Current Configuration
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                            <div className="text-white/60">Blur</div>
                            <div className="text-white font-mono">
                                {config.blur}px
                            </div>
                        </div>
                        <div>
                            <div className="text-white/60">Opacity</div>
                            <div className="text-white font-mono">
                                {config.opacity}
                            </div>
                        </div>
                        <div>
                            <div className="text-white/60">Saturation</div>
                            <div className="text-white font-mono">
                                {config.saturation}%
                            </div>
                        </div>
                        <div>
                            <div className="text-white/60">Radius</div>
                            <div className="text-white font-mono">
                                {config.borderRadius}px
                            </div>
                        </div>
                    </div>
                </Glass>
            </div>
        </div>
    );
}

export default GlassPerformanceDemo;
