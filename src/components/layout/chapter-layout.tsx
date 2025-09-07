"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { SocialShare } from "@/components/ui/social-share";
import { usePathname } from "next/navigation";

interface ChapterLayoutProps {
  children: ReactNode;
  chapterNumber: number;
  title: string;
  theme: "chapter1" | "chapter2" | "chapter3" | "chapter4";
  className?: string;
}

const themeClasses = {
  chapter1: "bg-chapter1-background text-gray-800",
  chapter2: "bg-chapter2-background text-gray-800", 
  chapter3: "bg-chapter3-background text-gray-800",
  chapter4: "bg-chapter4-background text-chapter4-secondary",
};

export function ChapterLayout({ 
  children, 
  chapterNumber, 
  title, 
  theme,
  className = "" 
}: ChapterLayoutProps) {
  const pathname = usePathname();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://storytelling-portfolio.vercel.app";
  const currentUrl = `${siteUrl}${pathname}`;
  
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
      className={`min-h-screen relative ${themeClasses[theme]} ${className}`}
    >
      {/* Chapter Header */}
      <div className="absolute top-8 left-8 z-10">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <span className="text-sm font-mono opacity-70">
            Chapter {chapterNumber}
          </span>
          <h1 className="text-2xl font-bold mt-1">
            {title}
          </h1>
        </motion.div>
      </div>

      {/* Social Share Button */}
      <div className="absolute top-8 right-8 z-10">
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <SocialShare
            url={currentUrl}
            title={`Chapter ${chapterNumber}: ${title}`}
            description={`Explore ${title} in this interactive storytelling portfolio journey.`}
          />
        </motion.div>
      </div>

      {/* Chapter Content */}
      <div className="relative z-0">
        {children}
      </div>
    </motion.section>
  );
}