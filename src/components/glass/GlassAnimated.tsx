/**
 * GlassAnimated Component
 * Enhanced glass component with morphing animations and interactions
 */

"use client";

import React, {
    forwardRef,
    useState,
    Ref,
    MutableRefObject,
    ElementType,
} from "react";
import { motion, HTMLMotionProps, Variants } from "framer-motion";
import {
    useMagneticHover,
    useScrollGlassMorph,
} from "@/hooks/useMagneticHover";
import { useScrollAnimation } from "@/hooks/useAnimations";
import {
    glassLiftVariants,
    glassMorphVariants,
    glassScrollVariants,
    glassButtonVariants,
    glassCardVariants,
    glassTransitions,
} from "@/utils/glass-animations";
import type { GlassComponentProps } from "@/types/glass";
import { getGlassConfiguration } from "@/utils/glass-config";

function assignRef<T>(ref: Ref<T> | undefined, value: T | null) {
    if (!ref) return;
    if (typeof ref === "function") ref(value);
    else (ref as MutableRefObject<T | null>).current = value;
}
interface GlassAnimatedProps extends GlassComponentProps {
    /** Animation type */
    animationType?:
        | "lift"
        | "morph"
        | "button"
        | "card"
        | "scroll"
        | "magnetic";
    /** Morphing intensity for morph animation */
    morphIntensity?: "subtle" | "medium" | "strong";
    /** Whether to enable magnetic hover effect */
    magnetic?: boolean;
    /** Magnetic effect strength (0-1) */
    magneticStrength?: number;
    /** Whether to enable scroll-based animations */
    scrollAnimation?: boolean;
    /** Whether to enable breathing animation during idle */
    breathing?: boolean;
    /** Whether to enable shimmer effect on hover */
    shimmer?: boolean;
    /** Custom animation variants */
    customVariants?: Variants;
    /** Animation delay for staggered entrance */
    delay?: number;
    /** Click handler */
    onClick?: (event: React.MouseEvent) => void;
    /** Hover handlers */
    onHoverStart?: () => void;
    onHoverEnd?: () => void;
    /** HTML element type */
    as?: string;
}

/**
 * Enhanced glass component with morphing animations and magnetic interactions
 */
export const GlassAnimated = forwardRef<HTMLElement, GlassAnimatedProps>(
    (
        {
            animationType = "lift",
            morphIntensity = "medium",
            magnetic = false,
            magneticStrength = 0.3,
            scrollAnimation = false,
            breathing = false,
            shimmer = false,
            customVariants,
            delay = 0,
            variant = "medium",
            theme = "default",
            className = "",
            children,
            onClick,
            onHoverStart,
            onHoverEnd,
            as = "div",
            ...props
        },
        ref
    ) => {
        const [isHovered, setIsHovered] = useState(false);

        // Get glass configuration
        const {
            config,
            cssVars,
            className: glassClassName,
        } = getGlassConfiguration({
            variant,
            theme,
            className,
            ...props,
        });

        // Magnetic hover effect
        const magneticHover = useMagneticHover({
            strength: magneticStrength,
            enabled: magnetic,
        });

        // Scroll-based glass morphing
        const scrollGlass = useScrollGlassMorph();

        // Scroll animation trigger
        const { ref: scrollRef, isInView } = useScrollAnimation(0.2);

        // Select animation variants based on type
        const getAnimationVariants = () => {
            if (customVariants) return customVariants;

            switch (animationType) {
                case "lift":
                    return glassLiftVariants;
                case "morph":
                    return glassMorphVariants[morphIntensity];
                case "button":
                    return glassButtonVariants;
                case "card":
                    return glassCardVariants;
                case "scroll":
                    return glassScrollVariants;
                case "magnetic":
                    return {
                        rest: { scale: 1 },
                        hover: {
                            scale: 1.05,
                            transition: glassTransitions.hover,
                        },
                    };
                default:
                    return glassLiftVariants;
            }
        };

        const variants = getAnimationVariants();

        // Handle hover events
        const handleHoverStart = () => {
            setIsHovered(true);
            onHoverStart?.();
        };

        const handleHoverEnd = () => {
            setIsHovered(false);
            onHoverEnd?.();
        };

        // Combine refs for magnetic and scroll effects
        /*        const combinedRef = (element: HTMLElement | null) => {
            if (magnetic && magneticHover.ref) {
                (magneticHover.ref as HTMLElementRef).current = element;
            }
            if (scrollAnimation && scrollRef) {
                (scrollRef as any).current = element;
            }
            if (ref) {
                if (typeof ref === "function") {
                    ref(element);
                } else {
                    (ref as any).current = element;
                }
            }
        }; */
        const combinedRef = (element: HTMLElement | null) => {
            if (magnetic) assignRef<HTMLElement>(magneticHover.ref, element);
            if (scrollAnimation) assignRef<HTMLElement>(scrollRef, element);
            assignRef<HTMLElement>(ref, element);
        };

        // Dynamic styles based on scroll and magnetic effects
        const dynamicStyles = {
            ...cssVars,
            ...(scrollAnimation && {
                "--glass-blur": `${16 + scrollGlass.scrollProgress * 16}px`,
                "--glass-opacity": 0.05 + scrollGlass.scrollProgress * 0.1,
                "--glass-saturation": `${
                    150 + scrollGlass.scrollProgress * 50
                }%`,
            }),
        } as React.CSSProperties;

        // Animation props
        const animationProps = {
            variants: scrollAnimation ? glassScrollVariants : variants,
            initial: scrollAnimation ? "hidden" : "rest",
            animate: scrollAnimation
                ? isInView
                    ? "visible"
                    : "hidden"
                : "rest",
            whileHover: !scrollAnimation ? "hover" : undefined,
            whileTap: !scrollAnimation ? "tap" : undefined,
            transition: {
                ...glassTransitions.hover,
                delay,
            },
            style: {
                ...dynamicStyles,
                ...(magnetic && {
                    x: magneticHover.motionValues.x,
                    y: magneticHover.motionValues.y,
                }),
            },
        };

        const MotionComponent = motion[
            as as keyof typeof motion
        ] as ElementType;

        return (
            <MotionComponent
                ref={combinedRef}
                className={`${glassClassName} glass-animated ${className}`.trim()}
                onClick={onClick}
                onHoverStart={handleHoverStart}
                onHoverEnd={handleHoverEnd}
                {...animationProps}
                {...props}
            >
                {/* Breathing animation overlay */}
                {breathing && (
                    <motion.div
                        className="absolute inset-0 pointer-events-none rounded-inherit"
                        animate={{
                            backdropFilter: [
                                "blur(20px) saturate(180%)",
                                "blur(24px) saturate(200%)",
                                "blur(20px) saturate(180%)",
                            ],
                        }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />
                )}

                {/* Shimmer effect on hover */}
                {shimmer && (
                    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-inherit">
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                            initial={{ x: "-100%" }}
                            animate={isHovered ? { x: "100%" } : { x: "-100%" }}
                            transition={{
                                duration: 0.8,
                                ease: "easeOut",
                            }}
                        />
                    </div>
                )}

                {/* Magnetic hover indicator */}
                {magnetic && isHovered && (
                    <motion.div
                        className="absolute inset-0 pointer-events-none rounded-inherit border-2 border-blue-400/30"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                    />
                )}

                {/* Content */}
                <div className="relative z-10">{children}</div>
            </MotionComponent>
        );
    }
);

GlassAnimated.displayName = "GlassAnimated";

export default GlassAnimated;
