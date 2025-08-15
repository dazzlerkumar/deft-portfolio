"use client";

import React, { useState, useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import GlassPanel from "@/components/glass/GlassPanel";
import Glass from "@/components/glass/Glass";
import { GlassAnimated } from "@/components/glass/GlassAnimated";
import { GlassStagger } from "@/components/glass/GlassStagger";
import { useMagneticHover } from "@/hooks/useMagneticHover";
import { personalInfo } from "@/data/portfolio";

interface LiquidGlassHeroProps {
    className?: string;
}

export default function LiquidGlassHero({
    className = "",
}: LiquidGlassHeroProps) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    // Enhanced magnetic hover for CTA button
    const magneticCTA = useMagneticHover({
        strength: 0.4,
        springConfig: { damping: 25, stiffness: 700 },
    });

    // Mouse tracking for magnetic effects
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 700 };
    const x = useSpring(mouseX, springConfig);
    const y = useSpring(mouseY, springConfig);

    // Transform values for floating elements
    const rotateX = useTransform(y, [-300, 300], [10, -10]);
    const rotateY = useTransform(x, [-300, 300], [-10, 10]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;

            setMousePosition({
                x: (clientX / innerWidth) * 100,
                y: (clientY / innerHeight) * 100,
            });

            mouseX.set(clientX - innerWidth / 2);
            mouseY.set(clientY - innerHeight / 2);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <div
            className={`relative min-h-screen flex items-center justify-center overflow-hidden ${className}`}
        >
            {/* Dynamic Gradient Mesh Background */}
            <div className="absolute inset-0 -z-10">
                {/* Base gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900" />

                {/* Animated gradient orbs */}
                <motion.div
                    className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-30"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)",
                        x: useTransform(x, [-300, 300], [-50, 50]),
                        y: useTransform(y, [-300, 300], [-30, 30]),
                    }}
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <motion.div
                    className="absolute top-3/4 right-1/4 w-80 h-80 rounded-full opacity-25"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(16, 185, 129, 0.4) 0%, transparent 70%)",
                        x: useTransform(x, [-300, 300], [30, -30]),
                        y: useTransform(y, [-300, 300], [20, -20]),
                    }}
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.25, 0.4, 0.25],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2,
                    }}
                />

                <motion.div
                    className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full opacity-20"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(147, 51, 234, 0.4) 0%, transparent 70%)",
                        x: useTransform(x, [-300, 300], [20, -40]),
                        y: useTransform(y, [-300, 300], [-40, 20]),
                    }}
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.2, 0.35, 0.2],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 4,
                    }}
                />

                {/* Mesh overlay */}
                <div
                    className="absolute inset-0 opacity-30"
                    style={{
                        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)`,
                    }}
                />
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Avatar Glass Frame - Left Side */}
                    <motion.div
                        className="lg:col-span-4 flex justify-center lg:justify-start"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 1,
                            delay: 0.3,
                            ease: "easeOut",
                        }}
                        style={{
                            rotateX,
                            rotateY,
                        }}
                    >
                        <Glass
                            variant="hero"
                            theme="default"
                            className="relative p-2 rounded-full"
                            enableHover={true}
                            enableEntrance={true}
                        >
                            {/* Inner glow effect */}
                            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 via-transparent to-emerald-400/20 animate-pulse" />

                            {/* Avatar container */}
                            <div className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden">
                                {/* Placeholder for avatar - replace with actual image */}
                                <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-emerald-500/20 flex items-center justify-center">
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-emerald-400 flex items-center justify-center text-white text-4xl font-bold">
                                        DK
                                    </div>
                                </div>

                                {/* Circular border with glow */}
                                <div className="absolute inset-0 rounded-full border-2 border-white/30 shadow-[inset_0_0_20px_rgba(255,255,255,0.1)]" />
                            </div>
                        </Glass>
                    </motion.div>

                    {/* Main Identity Glass Panel - Right Side */}
                    <motion.div
                        className="lg:col-span-8 space-y-6"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                            duration: 1,
                            delay: 0.5,
                            ease: "easeOut",
                        }}
                    >
                        <GlassPanel
                            variant="hero"
                            padding="xl"
                            morphing={true}
                            floating={true}
                            className="text-center lg:text-left"
                        >
                            {/* Bilingual Name Display */}
                            <div className="space-y-4 mb-6">
                                <motion.h1
                                    className="text-4xl md:text-6xl lg:text-7xl font-bold text-white"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.7 }}
                                >
                                    {personalInfo.name}
                                </motion.h1>

                                <motion.div
                                    className="text-2xl md:text-3xl lg:text-4xl text-blue-300/80 font-medium"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: 0.9 }}
                                >
                                    {personalInfo.nameHindi}
                                </motion.div>
                            </div>

                            {/* Professional Subtitle */}
                            <motion.div
                                className="space-y-3 mb-8"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 1.1 }}
                            >
                                <h2 className="text-xl md:text-2xl lg:text-3xl text-emerald-300 font-semibold">
                                    {personalInfo.title}
                                </h2>
                                <p className="text-lg md:text-xl text-white/80">
                                    at{" "}
                                    <span className="text-blue-300 font-medium">
                                        {personalInfo.company}
                                    </span>
                                </p>
                            </motion.div>

                            {/* Tagline */}
                            <motion.p
                                className="text-base md:text-lg text-white/70 leading-relaxed max-w-2xl"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 1.3 }}
                            >
                                {personalInfo.tagline}
                            </motion.p>
                        </GlassPanel>

                        {/* Floating Action Panel */}
                        <motion.div
                            className="flex justify-center lg:justify-start"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.5 }}
                        >
                            <motion.div
                                style={{
                                    x: useTransform(
                                        x,
                                        [-300, 300],
                                        isHovered ? [-10, 10] : [0, 0]
                                    ),
                                    y: useTransform(
                                        y,
                                        [-300, 300],
                                        isHovered ? [-5, 5] : [0, 0]
                                    ),
                                }}
                            >
                                <Glass
                                    variant="button"
                                    theme="blue"
                                    className="group relative px-8 py-4 cursor-pointer"
                                    enableHover={true}
                                    onMouseEnter={() => setIsHovered(true)}
                                    onMouseLeave={() => setIsHovered(false)}
                                >
                                    {/* Magnetic hover effect */}
                                    <motion.div
                                        className="flex items-center space-x-3"
                                        animate={{
                                            scale: isHovered ? 1.05 : 1,
                                        }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <span className="text-lg font-medium text-white">
                                            Explore My Work
                                        </span>
                                        <motion.svg
                                            className="w-5 h-5 text-white"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            animate={{
                                                x: isHovered ? 5 : 0,
                                            }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                                            />
                                        </motion.svg>
                                    </motion.div>

                                    {/* Blue glass tint overlay */}
                                    <div className="absolute inset-0 bg-blue-500/10 rounded-inherit opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </Glass>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Floating decorative elements */}
                <motion.div
                    className="absolute top-20 right-20 w-4 h-4 bg-blue-400/60 rounded-full"
                    animate={{
                        y: [-10, 10, -10],
                        opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />

                <motion.div
                    className="absolute bottom-32 left-20 w-3 h-3 bg-emerald-400/60 rounded-full"
                    animate={{
                        y: [10, -10, 10],
                        opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                />

                <motion.div
                    className="absolute top-1/2 left-10 w-2 h-2 bg-purple-400/60 rounded-full"
                    animate={{
                        x: [-5, 5, -5],
                        y: [-5, 5, -5],
                        opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 2,
                    }}
                />
            </div>
        </div>
    );
}
