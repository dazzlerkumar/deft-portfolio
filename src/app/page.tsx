import type { Metadata } from "next";
import Link from "next/link";
import React from "react";
import Particles from "@/components/particles";
import {
    generateMetadata as generateSEOMetadata,
    defaultSEOConfig,
} from "@/lib/utils/seo";

export const metadata: Metadata = generateSEOMetadata({
    ...defaultSEOConfig,
    url: `${
        process.env.NEXT_PUBLIC_SITE_URL ||
        "https://storytelling-portfolio.vercel.app"
    }`,
});

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black">
            <nav className="my-16 fade-in">
                <h1 className="text-xl md:text-xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Crafting interfaces where speed, clarity, and empathy meet.
                </h1>
            </nav>
            <div className="hidden w-screen h-px glow md:block fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
            <Particles
                className="absolute inset-0 -z-10 fade-in bg-brand-900"
                quantity={100}
            />
            <h1 className="py-3.5 px-0.5 z-10 text-4xl text-transparent duration-1000  cursor-default text-edge-outline title font-display sm:text-6xl md:text-9xl whitespace-nowrap bg-clip-text bg-brand-100">
                DEEPAK
            </h1>

            <div className="hidden w-screen h-px glow md:block fade-right bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />
            <div className="my-16 text-center fade-in">
                <p className="text-xl md:text-xl text-brand-300 mb-12 leading-relaxed max-w-[50vw]">
                    A lead frontend engineer turning complex constraints into
                    clear, high‑performing experiences—told in chapters of
                    breakthroughs, setbacks, and shipped results.
                </p>
                <Link
                    href="/chapter/1"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/25 animate-pulse-soft active:scale-95"
                >
                    Begin the Story
                </Link>
            </div>
        </div>
    );
}
