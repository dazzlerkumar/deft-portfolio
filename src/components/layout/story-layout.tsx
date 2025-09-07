"use client";

import React, { ReactNode,/*  useState, useEffect */ } from "react";
import { motion, AnimatePresence } from "framer-motion";
//import Link from "next/link";
import { useRouter } from "next/navigation";

interface StoryLayoutProps {
    children: ReactNode;
    currentChapter?: number;
    showNavigation?: boolean;
    userProgress?: {
        visitedSections: string[];
        completionPercentage: number;
    };
    onChapterChange?: (chapter: number) => void;
}

const chapters = [
    { id: 1, title: "The Beginning", path: "/chapter/1" },
    { id: 2, title: "The Challenges", path: "/chapter/2" },
    { id: 3, title: "The Leadership", path: "/chapter/3" },
    { id: 4, title: "The Vision", path: "/chapter/4" },
];

export function StoryLayout({
    children,
    currentChapter = 1,
    showNavigation = true,
    userProgress,
    onChapterChange,
}: StoryLayoutProps) {
   // const [isNavOpen, setIsNavOpen] = useState(false);
    // const [isMobile, setIsMobile] = useState(false);
    const router = useRouter();

    /*    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []); */

    const handleChapterNavigation = (chapterId: number) => {
        const chapter = chapters.find((c) => c.id === chapterId);
        if (chapter) {
            router.push(chapter.path);
            onChapterChange?.(chapterId);
            //setIsNavOpen(false);
        }
    };

    const isChapterVisited = (chapterId: number) => {
        return (
            userProgress?.visitedSections.includes(`chapter-${chapterId}`) ||
            chapterId <= currentChapter
        );
    };
    return (
        <div className="min-h-screen relative overflow-x-hidden">
            {/* Chapter Navigation */}
            {showNavigation && (
                <>
                    {/* Mobile Navigation Toggle */}
                    {/*    {isMobile && (
                        <button
                            onClick={() => setIsNavOpen(!isNavOpen)}
                            className="fixed top-4 right-4 z-50 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg md:hidden"
                            aria-label="Toggle navigation"
                        >
                            <motion.div
                                animate={{ rotate: isNavOpen ? 45 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className="w-5 h-0.5 bg-gray-800 mb-1"></div>
                                <div className="w-5 h-0.5 bg-gray-800 mb-1"></div>
                                <div className="w-5 h-0.5 bg-gray-800"></div>
                            </motion.div>
                        </button>
                    )} */}

                    {/* Desktop Navigation */}
                    {/*  {!isMobile && (
                        <nav className="fixed top-6 right-6 z-50">
                            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 shadow-xl">
                                <div className="flex flex-col space-y-3">
                                    {chapters.map((chapter) => (
                                        <motion.button
                                            key={chapter.id}
                                            onClick={() =>
                                                handleChapterNavigation(
                                                    chapter.id
                                                )
                                            }
                                            className={`group relative flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 ${
                                                currentChapter === chapter.id
                                                    ? "bg-white/20 text-white"
                                                    : isChapterVisited(
                                                          chapter.id
                                                      )
                                                    ? "text-white/80 hover:bg-white/10"
                                                    : "text-white/40 cursor-not-allowed"
                                            }`}
                                            disabled={
                                                !isChapterVisited(chapter.id)
                                            }
                                            whileHover={{
                                                scale: isChapterVisited(
                                                    chapter.id
                                                )
                                                    ? 1.05
                                                    : 1,
                                            }}
                                            whileTap={{
                                                scale: isChapterVisited(
                                                    chapter.id
                                                )
                                                    ? 0.95
                                                    : 1,
                                            }}
                                        >
                                            <div
                                                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                                    currentChapter ===
                                                    chapter.id
                                                        ? "bg-white scale-125"
                                                        : isChapterVisited(
                                                              chapter.id
                                                          )
                                                        ? "bg-white/60"
                                                        : "bg-white/20"
                                                }`}
                                            />
                                            <span className="text-sm font-medium whitespace-nowrap">
                                                {chapter.title}
                                            </span>
                                        </motion.button>
                                    ))}
                                </div>
                            </div>
                        </nav>
                    )} */}

                    {/* Mobile Navigation Menu */}
                    {/*     <AnimatePresence>
                        {isMobile && isNavOpen && (
                            <motion.nav
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.2 }}
                                className="fixed top-20 right-4 z-40 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl min-w-[200px]"
                            >
                                <div className="flex flex-col space-y-2">
                                    {chapters.map((chapter) => (
                                        <motion.button
                                            key={chapter.id}
                                            onClick={() =>
                                                handleChapterNavigation(
                                                    chapter.id
                                                )
                                            }
                                            className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 text-left ${
                                                currentChapter === chapter.id
                                                    ? "bg-blue-500 text-white"
                                                    : isChapterVisited(
                                                          chapter.id
                                                      )
                                                    ? "text-gray-800 hover:bg-gray-100"
                                                    : "text-gray-400 cursor-not-allowed"
                                            }`}
                                            disabled={
                                                !isChapterVisited(chapter.id)
                                            }
                                            whileTap={{
                                                scale: isChapterVisited(
                                                    chapter.id
                                                )
                                                    ? 0.95
                                                    : 1,
                                            }}
                                        >
                                            <div
                                                className={`w-2 h-2 rounded-full ${
                                                    currentChapter ===
                                                    chapter.id
                                                        ? "bg-white"
                                                        : isChapterVisited(
                                                              chapter.id
                                                          )
                                                        ? "bg-blue-500"
                                                        : "bg-gray-300"
                                                }`}
                                            />
                                            <span className="text-sm font-medium">
                                                Chapter {chapter.id}:{" "}
                                                {chapter.title}
                                            </span>
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.nav>
                        )}
                    </AnimatePresence> */}
                </>
            )}

            {/* Progress Indicator */}
            <div className="fixed top-0 left-0 w-full h-1 bg-gray-200/30 z-30">
                <motion.div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                    initial={{ width: 0 }}
                    animate={{
                        width: `${
                            userProgress?.completionPercentage ||
                            (currentChapter / 4) * 100
                        }%`,
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                />
            </div>

            {/* Skip Navigation for Accessibility */}
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-white text-black px-4 py-2 rounded-lg shadow-lg"
            >
                Skip to main content
            </a>

            {/* Main Content */}
            <main id="main-content" className="relative">
                {children}
            </main>

            {/* Chapter Navigation Breadcrumbs (Bottom) */}
            {showNavigation && (
                <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-40">
                    <motion.div
                        className="bg-white/10 backdrop-blur-md rounded-full px-6 py-3 shadow-xl flex items-center space-x-4"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                    >
                        {/* Left Navigation */}
                        <motion.button
                            onClick={() =>
                                handleChapterNavigation(currentChapter - 1)
                            }
                            disabled={currentChapter <= 1}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                                currentChapter > 1
                                    ? "bg-white/20 text-white hover:bg-white/30"
                                    : "bg-white/10 text-white/30 cursor-not-allowed"
                            }`}
                            whileHover={
                                currentChapter > 1 ? { scale: 1.1 } : {}
                            }
                            whileTap={currentChapter > 1 ? { scale: 0.9 } : {}}
                            aria-label="Previous chapter"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </motion.button>

                        {/* Current Chapter Display */}
                        <div className="flex flex-col items-center min-w-[120px]">
                            <div className="text-white/60 text-xs font-medium">
                                Chapter {currentChapter}
                            </div>
                            <div className="text-white text-sm font-bold text-center">
                                {
                                    chapters.find(
                                        (c) => c.id === currentChapter
                                    )?.title
                                }
                            </div>
                        </div>
                        {/* Right Navigation */}
                        <motion.button
                            onClick={() =>
                                handleChapterNavigation(currentChapter + 1)
                            }
                            disabled={
                                currentChapter >= chapters.length ||
                                !isChapterVisited(currentChapter + 1)
                            }
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                                currentChapter < chapters.length &&
                                isChapterVisited(currentChapter + 1)
                                    ? "bg-white/20 text-white hover:bg-white/30"
                                    : "bg-white/10 text-white/30 cursor-not-allowed"
                            }`}
                            whileHover={
                                currentChapter < chapters.length &&
                                isChapterVisited(currentChapter + 1)
                                    ? { scale: 1.1 }
                                    : {}
                            }
                            whileTap={
                                currentChapter < chapters.length &&
                                isChapterVisited(currentChapter + 1)
                                    ? { scale: 0.9 }
                                    : {}
                            }
                            aria-label="Next chapter"
                        >
                            <svg
                                className="w-4 h-4"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </motion.button>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
