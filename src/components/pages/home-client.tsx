"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { StoryLayout } from "@/components/layout";

export function HomePageClient() {
    const router = useRouter();

    const handleBeginJourney = () => {
        router.push("/chapter/1");
    };

    return (
        <StoryLayout currentChapter={1} showNavigation={false}>
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
                    <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-purple-400 rounded-full animate-pulse opacity-40 animation-delay-1000"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse opacity-50 animation-delay-2000"></div>
                    <div className="absolute top-2/3 right-1/4 w-1 h-1 bg-indigo-400 rounded-full animate-pulse opacity-30 animation-delay-3000"></div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="text-center max-w-4xl mx-auto px-8 relative z-10"
                >
                    <motion.h1
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
                    >
                        The Story Begins
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed"
                    >
                        Welcome to an unconventional journey through the career
                        of a lead frontend engineer. This is not just a
                        portfolio—it&apos;s a story of growth, challenges,
                        leadership, and vision.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.9, duration: 0.8 }}
                        className="space-y-4"
                    >
                        <button
                            onClick={handleBeginJourney}
                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 animate-pulse-soft"
                        >
                            Begin the Journey
                        </button>

                        <div className="flex justify-center space-x-8 mt-8 text-sm text-slate-400">
                            <span>Interactive Storytelling</span>
                            <span>•</span>
                            <span>Immersive Experience</span>
                            <span>•</span>
                            <span>Creative Presentation</span>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </StoryLayout>
    );
}
