/**
 * Projects Showcase Component
 * Glass morphism showcase for featured projects with hover morphing effects
 */

"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/glass/GlassCard";
import { GlassButton } from "@/components/glass/GlassButton";
import { GlassStagger } from "@/components/glass/GlassStagger";
import { GlassAnimated } from "@/components/glass/GlassAnimated";
import { featuredProjects } from "@/data/portfolio";
import type { Project } from "@/types/portfolio";

interface ProjectCardProps {
    project: Project;
    index: number;
}

/**
 * Individual project card with glass morphism effects
 */
const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
    const [isHovered, setIsHovered] = useState(false);

    // Get project-specific glass theme based on project type
    const getProjectTheme = (projectId: string) => {
        switch (projectId) {
            case "angularly-ecommerce":
                return "rose"; // Angular red theme
            case "config-gen":
                return "emerald"; // Tool green theme
            case "nextjs-template":
                return "blue"; // Next.js blue theme
            default:
                return "default";
        }
    };

    const theme = getProjectTheme(project.id);

    return (
        <div className="group">
            <GlassAnimated
                animationType="card"
                magnetic={true}
                magneticStrength={0.2}
                shimmer={true}
                as="div"
                className="h-full"
            >
                <GlassCard
                    variant="card"
                    theme={theme}
                    morphing={true}
                    morphIntensity="medium"
                    hoverLift={true}
                    clickable={true}
                    padding="lg"
                    className="h-full relative overflow-hidden"
                    onHover={setIsHovered}
                    onClick={() => {
                        if (project.links.live) {
                            window.open(project.links.live, "_blank");
                        } else if (project.links.github) {
                            window.open(project.links.github, "_blank");
                        }
                    }}
                >
                    {/* Project Image with Glass Overlay */}
                    <div className="relative mb-6 rounded-xl overflow-hidden">
                        <div className="aspect-video bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-xl relative">
                            {/* Placeholder for project image */}
                            <div className="absolute inset-0 bg-gradient-to-br from-zinc-700/50 to-zinc-800/50 flex items-center justify-center">
                                <div className="text-4xl font-bold text-zinc-500">
                                    {project.title.charAt(0)}
                                </div>
                            </div>

                            {/* Glass overlay with title */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-4 left-4 right-4">
                                    <div className="glass-enhanced p-3 rounded-lg">
                                        <h4 className="text-white font-medium text-sm">
                                            {project.title}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Project Content */}
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors duration-300">
                                {project.title}
                            </h3>
                            <p className="text-zinc-300 text-sm leading-relaxed line-clamp-3">
                                {project.description}
                            </p>
                        </div>

                        {/* Technology Badges */}
                        <div className="flex flex-wrap gap-2">
                            {project.technologies
                                .slice(0, 4)
                                .map((tech, techIndex) => (
                                    <motion.div
                                        key={tech.name}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            duration: 0.3,
                                            delay:
                                                index * 0.1 + techIndex * 0.05,
                                            ease: "easeOut",
                                        }}
                                        className="glass-pill"
                                    >
                                        <span
                                            className="inline-block px-3 py-1 text-xs font-medium rounded-full glass-enhanced transition-all duration-200 hover:scale-105"
                                            style={{
                                                background: `rgba(${
                                                    tech.color
                                                        ? hexToRgb(tech.color)
                                                        : "255, 255, 255"
                                                }, 0.1)`,
                                                border: `1px solid rgba(${
                                                    tech.color
                                                        ? hexToRgb(tech.color)
                                                        : "255, 255, 255"
                                                }, 0.2)`,
                                                color: tech.color || "#ffffff",
                                            }}
                                        >
                                            {tech.name}
                                        </span>
                                    </motion.div>
                                ))}
                            {project.technologies.length > 4 && (
                                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full glass-enhanced text-zinc-400">
                                    +{project.technologies.length - 4}
                                </span>
                            )}
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex gap-3 pt-2">
                            {project.links.live && (
                                <GlassButton
                                    variant="button"
                                    theme={theme}
                                    size="sm"
                                    className="flex-1 text-center"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.open(
                                            project.links.live,
                                            "_blank"
                                        );
                                    }}
                                >
                                    <span className="text-sm font-medium">
                                        View Live
                                    </span>
                                </GlassButton>
                            )}

                            {project.links.github && (
                                <GlassButton
                                    variant="button"
                                    theme="default"
                                    size="sm"
                                    className="flex-1 text-center"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        window.open(
                                            project.links.github,
                                            "_blank"
                                        );
                                    }}
                                >
                                    <span className="text-sm font-medium">
                                        GitHub
                                    </span>
                                </GlassButton>
                            )}
                        </div>
                    </div>

                    {/* Hover reflection effect */}
                    <div
                        className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${
                            isHovered ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent transform -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000" />
                    </div>
                </GlassCard>
            </GlassAnimated>
        </div>
    );
};

/**
 * Main projects showcase component
 */
const ProjectsShowcase: React.FC = () => {
    return (
        <section className="relative py-20 px-4 sm:px-6 lg:px-8">
            {/* Background gradient mesh */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
                <div
                    className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "2s" }}
                />
                <div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: "4s" }}
                />
            </div>

            <div className="relative max-w-7xl mx-auto">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="text-center mb-16"
                >
                    <GlassCard
                        variant="hero"
                        theme="default"
                        morphing={true}
                        morphIntensity="subtle"
                        className="inline-block px-8 py-6 mb-8"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            Featured{" "}
                            <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-purple-400 bg-clip-text text-transparent">
                                Projects
                            </span>
                        </h2>
                        <p className="text-zinc-300 text-lg max-w-2xl mx-auto leading-relaxed">
                            Showcase of technical projects demonstrating modern
                            web development skills, creative problem-solving,
                            and expertise in cutting-edge technologies.
                        </p>
                    </GlassCard>
                </motion.div>

                {/* Projects Grid with Staggered Animation */}
                <GlassStagger
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    staggerDelay={0.1}
                    initialDelay={0.2}
                >
                    {featuredProjects.map((project, index) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            index={index}
                        />
                    ))}
                </GlassStagger>

                {/* View All Projects CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
                    className="text-center mt-16"
                >
                    <GlassButton
                        variant="accent"
                        theme="blue"
                        size="lg"
                        className="px-8 py-4"
                    >
                        <span className="text-lg font-medium">
                            View All Projects
                        </span>
                        <svg
                            className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 8l4 4m0 0l-4 4m4-4H3"
                            />
                        </svg>
                    </GlassButton>
                </motion.div>
            </div>
        </section>
    );
};

/**
 * Utility function to convert hex color to RGB values
 */
function hexToRgb(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return "255, 255, 255";

    const r = parseInt(result[1], 16);
    const g = parseInt(result[2], 16);
    const b = parseInt(result[3], 16);

    return `${r}, ${g}, ${b}`;
}

export default ProjectsShowcase;
