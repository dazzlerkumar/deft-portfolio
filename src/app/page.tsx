"use client";
import Particles from "@/components/particles";
import ScrollProgress from "@/components/scroll-progress";
import FloatingNavigation from "@/components/floating-navigation";
import LiquidGlassHero from "@/components/liquid-glass-hero";
import ProjectsShowcase from "@/components/projects-showcase";
import SkillsVisualization from "@/components/skills-visualization";
import FeaturedPostsGallery from "@/components/featured-posts-gallery";
import ContactSection from "@/components/contact-section";

export default function Home() {
    return (
        <div className="relative">
            {/* Floating Navigation */}
            <FloatingNavigation />
            
            {/* Liquid Glass Hero Section */}
            <div id="hero" className="relative">
                {/* Enhanced particles with improved interactions */}
                <Particles
                    className="absolute inset-0 -z-20"
                    quantity={80}
                    staticity={40}
                    ease={50}
                />
                
                <LiquidGlassHero />
            </div>
            
            {/* Scroll progress indicators */}
            <ScrollProgress />
            
            {/* About Section */}
            <div id="about" className="min-h-screen bg-gradient-to-b from-zinc-900/50 to-black flex items-center justify-center">
                <div className="text-center text-zinc-400 max-w-2xl mx-auto px-8">
                    <h2 className="text-3xl font-semibold mb-6 text-white">
                        About Me
                    </h2>
                    <p className="text-lg leading-relaxed mb-8">
                        This enhanced landing page demonstrates advanced animations including 
                        staggered character reveals, improved particle interactions, floating 
                        geometric elements, magnetic hover effects, and smooth scroll indicators.
                    </p>
                    <p className="text-lg leading-relaxed">
                        The floating navigation system adapts to scroll position and provides 
                        smooth navigation between sections with visual feedback.
                    </p>
                </div>
            </div>
            
            {/* Projects Section */}
            <div id="projects" className="min-h-screen bg-gradient-to-b from-black to-zinc-900/50 flex items-center justify-center">
                <ProjectsShowcase />
            </div>
            
            {/* Skills Section */}
            <div id="skills" className="min-h-screen bg-gradient-to-b from-zinc-900/50 to-black flex items-center justify-center">
                <SkillsVisualization />
            </div>
            
            {/* Featured Posts Section */}
            <div id="posts" className="min-h-screen bg-gradient-to-b from-black to-zinc-900/50 flex items-center justify-center">
                <FeaturedPostsGallery />
            </div>
            
            {/* Contact Section */}
            <div id="contact" className="min-h-screen bg-gradient-to-b from-black to-zinc-900 flex items-center justify-center">
                <ContactSection />
            </div>
        </div>
    );
}
