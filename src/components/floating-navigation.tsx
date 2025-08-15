"use client";

import React, { useState, useEffect } from "react";
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useActiveSection } from "@/hooks/useActiveSection";
import { mergeGlassConfig } from "@/utils/glass-config";
import { useScrollGlassMorph } from "@/hooks/useMagneticHover";
import { glassNavVariants } from "@/utils/glass-animations";

interface NavigationItem {
    label: string;
    href: string;
    section?: string;
}

const navigationItems: NavigationItem[] = [
    { label: "Home", href: "/", section: "hero" },
    { label: "About Me", href: "#about", section: "about" },
    { label: "Projects", href: "#projects", section: "projects" },
    { label: "Posts", href: "#posts", section: "posts" },
];

export default function FloatingNavigation() {
    const [isVisible] = useState(true);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();
    const pathname = usePathname();

    // Use the active section hook
    const activeSection = useActiveSection({
        sections: ["hero", "about", "projects", "posts"],
        offset: 100,
    });

    // Enhanced scroll-based glass morphing
    const scrollGlass = useScrollGlassMorph();

    // Handle scroll-based visibility and glass morphing
    useMotionValueEvent(scrollY, "change", (latest) => {
        /*   const previous = scrollY.getPrevious() ?? 0;
    
    // Hide navigation when scrolling down fast, show when scrolling up
    if (latest > previous && latest > 150) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    } */

        // Calculate scroll progress for glass morphing (0 to 1)
        const maxScroll = 300; // Maximum scroll distance for full glass effect
        const progress = Math.min(latest / maxScroll, 1);
        setScrollProgress(progress);
    });

    // Handle smooth scroll navigation
    const handleSmoothScroll = (href: string) => {
        if (href.startsWith("#")) {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            }
        }
        setIsMobileMenuOpen(false);
    };

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (isMobileMenuOpen) {
                const nav = document.getElementById("floating-navigation");
                if (nav && !nav.contains(event.target as Node)) {
                    setIsMobileMenuOpen(false);
                }
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, [isMobileMenuOpen]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isMobileMenuOpen]);

    // Calculate dynamic glass properties based on scroll
    const glassConfig = mergeGlassConfig("navigation", {
        opacity: 0.05 + scrollProgress * 0.1, // 0.05 to 0.15
        blur: 16 + scrollProgress * 16, // 16px to 32px
        saturation: 150 + scrollProgress * 50, // 150% to 200%
        borderOpacity: 0.1 + scrollProgress * 0.2, // 0.1 to 0.3
    });

    // Generate dynamic CSS variables for glass morphing
    const glassStyle = {
        "--glass-opacity": glassConfig.opacity,
        "--glass-blur": `${glassConfig.blur}px`,
        "--glass-saturation": `${glassConfig.saturation}%`,
        "--glass-border-opacity": glassConfig.borderOpacity,
    } as React.CSSProperties;

    return (
        <>
            <motion.nav
                id="adaptive-glass-navigation"
                className="fixed top-0 left-0 right-0 z-50 px-4 py-4"
                style={glassStyle}
                initial={{ y: -100, opacity: 0 }}
                animate={{
                    y: isVisible ? 0 : -100,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{
                    duration: 0.3,
                    ease: [0.25, 0.46, 0.45, 0.94],
                }}
            >
                {/* Glass Navigation Container with Enhanced Morphing */}
                <motion.div
                    className="glass-navigation glass-animated px-6 py-3 mx-auto max-w-fit rounded-full"
                    variants={glassNavVariants}
                    animate={scrollProgress > 0.1 ? 'opaque' : 'transparent'}
                    style={{
                        backdropFilter: `blur(${glassConfig.blur}px) saturate(${glassConfig.saturation}%)`,
                        WebkitBackdropFilter: `blur(${glassConfig.blur}px) saturate(${glassConfig.saturation}%)`,
                        background: `rgba(255, 255, 255, ${glassConfig.opacity})`,
                        borderColor: `rgba(255, 255, 255, ${glassConfig.borderOpacity})`,
                        boxShadow: `0 ${8 + scrollProgress * 16}px ${32 + scrollProgress * 16}px rgba(0, 0, 0, ${0.1 + scrollProgress * 0.1})`,
                    } as React.CSSProperties}
                    transition={{
                        duration: 0.3,
                        ease: [0.175, 0.885, 0.32, 1.275],
                    }}
                >
                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navigationItems.map((item, index) => (
                            <motion.div
                                key={item.href}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.4,
                                    delay: index * 0.1,
                                    ease: [0.25, 0.46, 0.45, 0.94],
                                }}
                            >
                                {item.href.startsWith("#") ? (
                                    <motion.button
                                        onClick={() =>
                                            handleSmoothScroll(item.href)
                                        }
                                        className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                                            activeSection === item.section
                                                ? "text-white bg-white/10 backdrop-blur-sm border border-white/20"
                                                : "text-zinc-300 hover:text-white hover:bg-white/5"
                                        }`}
                                        whileHover={{
                                            scale: 1.05,
                                            backgroundColor:
                                                "rgba(255, 255, 255, 0.08)",
                                        }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {item.label}
                                        {activeSection === item.section && (
                                            <motion.div
                                                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-full border border-white/30"
                                                layoutId="activeGlassIndicator"
                                                transition={{
                                                    duration: 0.3,
                                                    ease: "easeInOut",
                                                }}
                                            />
                                        )}
                                    </motion.button>
                                ) : (
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Link
                                            href={item.href}
                                            className={`relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                                                pathname === item.href
                                                    ? "text-white bg-white/10 backdrop-blur-sm border border-white/20"
                                                    : "text-zinc-300 hover:text-white hover:bg-white/5"
                                            }`}
                                        >
                                            {item.label}
                                            {pathname === item.href && (
                                                <motion.div
                                                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-full border border-white/30"
                                                    layoutId="activeGlassIndicator"
                                                    transition={{
                                                        duration: 0.3,
                                                        ease: "easeInOut",
                                                    }}
                                                />
                                            )}
                                        </Link>
                                    </motion.div>
                                )}
                            </motion.div>
                        ))}
                    </div>

                    {/* Mobile Navigation Toggle */}
                    <div className="md:hidden flex items-center">
                        <motion.button
                            onClick={() =>
                                setIsMobileMenuOpen(!isMobileMenuOpen)
                            }
                            className="relative w-10 h-10 flex flex-col justify-center items-center rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Toggle mobile menu"
                        >
                            <motion.span
                                className="w-5 h-0.5 bg-white rounded-full"
                                animate={{
                                    rotate: isMobileMenuOpen ? 45 : 0,
                                    y: isMobileMenuOpen ? 0 : -3,
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: [0.25, 0.46, 0.45, 0.94],
                                }}
                            />
                            <motion.span
                                className="w-5 h-0.5 bg-white rounded-full mt-1"
                                animate={{
                                    opacity: isMobileMenuOpen ? 0 : 1,
                                }}
                                transition={{ duration: 0.3 }}
                            />
                            <motion.span
                                className="w-5 h-0.5 bg-white rounded-full mt-1"
                                animate={{
                                    rotate: isMobileMenuOpen ? -45 : 0,
                                    y: isMobileMenuOpen ? -6 : 0,
                                }}
                                transition={{
                                    duration: 0.3,
                                    ease: [0.25, 0.46, 0.45, 0.94],
                                }}
                            />
                        </motion.button>
                    </div>
                </motion.div>
            </motion.nav>

            {/* Mobile Glass Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        className="fixed inset-0 z-40 md:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{
                            duration: 0.4,
                            ease: [0.25, 0.46, 0.45, 0.94],
                        }}
                    >
                        {/* Heavy Blur Backdrop */}
                        <motion.div
                            className="absolute inset-0 glass-overlay"
                            style={{
                                background: "rgba(0, 0, 0, 0.3)",
                                backdropFilter: "blur(40px) saturate(120%)",
                                WebkitBackdropFilter:
                                    "blur(40px) saturate(120%)",
                            } as React.CSSProperties}
                            transition={{ duration: 0.4 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Glass Menu Content */}
                        <motion.div
                            className="relative flex flex-col items-center justify-center h-full"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            transition={{
                                duration: 0.4,
                                ease: [0.175, 0.885, 0.32, 1.275],
                            }}
                        >
                            {/* Glass Menu Panel */}
                            <motion.div
                                className="glass-panel-enhanced p-8 rounded-3xl"
                                style={{
                                    background: "rgba(255, 255, 255, 0.08)",
                                    backdropFilter: "blur(24px) saturate(180%)",
                                    WebkitBackdropFilter:
                                        "blur(24px) saturate(180%)",
                                    border: "1px solid rgba(255, 255, 255, 0.15)",
                                    boxShadow:
                                        "0 20px 48px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                                } as React.CSSProperties}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                transition={{
                                    duration: 0.4,
                                    delay: 0.1,
                                    ease: [0.175, 0.885, 0.32, 1.275],
                                }}
                            >
                                <div className="flex flex-col space-y-6">
                                    {navigationItems.map((item, index) => (
                                        <motion.div
                                            key={item.href}
                                            initial={{
                                                opacity: 0,
                                                y: 30,
                                                scale: 0.9,
                                            }}
                                            animate={{
                                                opacity: 1,
                                                y: 0,
                                                scale: 1,
                                            }}
                                            exit={{
                                                opacity: 0,
                                                y: -30,
                                                scale: 0.9,
                                            }}
                                            transition={{
                                                duration: 0.4,
                                                delay: 0.2 + index * 0.1,
                                                ease: [
                                                    0.175, 0.885, 0.32, 1.275,
                                                ],
                                            }}
                                        >
                                            {item.href.startsWith("#") ? (
                                                <motion.button
                                                    onClick={() =>
                                                        handleSmoothScroll(
                                                            item.href
                                                        )
                                                    }
                                                    className={`relative px-8 py-4 text-xl font-medium rounded-2xl transition-all duration-300 w-full text-center ${
                                                        activeSection ===
                                                        item.section
                                                            ? "text-white bg-white/10 backdrop-blur-sm border border-white/20"
                                                            : "text-zinc-200 hover:text-white hover:bg-white/5"
                                                    }`}
                                                    whileHover={{
                                                        scale: 1.02,
                                                        backgroundColor:
                                                            "rgba(255, 255, 255, 0.08)",
                                                    }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    {item.label}
                                                    {activeSection ===
                                                        item.section && (
                                                        <motion.div
                                                            className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-2xl border border-white/30"
                                                            layoutId="activeMobileGlassIndicator"
                                                            transition={{
                                                                duration: 0.3,
                                                                ease: "easeInOut",
                                                            }}
                                                        />
                                                    )}
                                                </motion.button>
                                            ) : (
                                                <motion.div
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <Link
                                                        href={item.href}
                                                        onClick={() =>
                                                            setIsMobileMenuOpen(
                                                                false
                                                            )
                                                        }
                                                        className={`relative px-8 py-4 text-xl font-medium rounded-2xl transition-all duration-300 block text-center ${
                                                            pathname ===
                                                            item.href
                                                                ? "text-white bg-white/10 backdrop-blur-sm border border-white/20"
                                                                : "text-zinc-200 hover:text-white hover:bg-white/5"
                                                        }`}
                                                    >
                                                        {item.label}
                                                        {pathname ===
                                                            item.href && (
                                                            <motion.div
                                                                className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-emerald-500/20 rounded-2xl border border-white/30"
                                                                layoutId="activeMobileGlassIndicator"
                                                                transition={{
                                                                    duration: 0.3,
                                                                    ease: "easeInOut",
                                                                }}
                                                            />
                                                        )}
                                                    </Link>
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Close instruction with glass styling */}
                            <motion.p
                                className="mt-8 text-sm text-zinc-400 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ delay: 0.6, duration: 0.3 }}
                            >
                                Tap anywhere to close
                            </motion.p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
