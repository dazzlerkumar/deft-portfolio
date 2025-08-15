/**
 * GlassPageTransition Component
 * Page transition effects with glass element morphing
 */

"use client";

import React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { glassPageVariants } from "@/utils/glass-animations";

interface GlassPageTransitionProps {
    /** Children to animate */
    children: React.ReactNode;
    /** Unique key for the page (used for AnimatePresence) */
    pageKey: string;
    /** Custom transition variants */
    variants?: Variants;
    /** Additional className */
    className?: string;
    /** Transition mode */
    mode?: "wait" | "sync" | "popLayout";
}

/**
 * Page transition wrapper with glass morphing effects
 */
export const GlassPageTransition: React.FC<GlassPageTransitionProps> = ({
    children,
    pageKey,
    variants = glassPageVariants,
    className = "",
    mode = "wait",
}) => {
    return (
        <AnimatePresence mode={mode}>
            <motion.div
                key={pageKey}
                className={`glass-page-transition ${className}`.trim()}
                variants={variants}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    );
};

/**
 * Glass overlay transition for modal-like effects
 */
export const GlassOverlayTransition: React.FC<{
    isVisible: boolean;
    children: React.ReactNode;
    onClose?: () => void;
    className?: string;
}> = ({ isVisible, children, onClose, className = "" }) => {
    const overlayVariants: Variants = {
        hidden: {
            opacity: 0,
            backdropFilter: "blur(0px) saturate(100%)",
        },
        visible: {
            opacity: 1,
            backdropFilter: "blur(40px) saturate(120%)",
            transition: {
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
        exit: {
            opacity: 0,
            backdropFilter: "blur(0px) saturate(100%)",
            transition: {
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    const contentVariants: Variants = {
        hidden: {
            opacity: 0,
            scale: 0.9,
            backdropFilter: "blur(0px) saturate(100%)",
        },
        visible: {
            opacity: 1,
            scale: 1,
            backdropFilter: "blur(20px) saturate(180%)",
            transition: {
                duration: 0.4,
                delay: 0.1,
                ease: [0.175, 0.885, 0.32, 1.275],
            },
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            backdropFilter: "blur(0px) saturate(100%)",
            transition: {
                duration: 0.3,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    variants={overlayVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onClick={onClose}
                    style={{
                        background: "rgba(0, 0, 0, 0.3)",
                    }}
                >
                    <motion.div
                        className={`glass-overlay-content ${className}`.trim()}
                        variants={contentVariants}
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: "rgba(255, 255, 255, 0.08)",
                            border: "1px solid rgba(255, 255, 255, 0.15)",
                            borderRadius: "20px",
                            boxShadow:
                                "0 20px 48px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                        }}
                    >
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GlassPageTransition;
