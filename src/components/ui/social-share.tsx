"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SocialShareProps {
  url: string;
  title: string;
  description: string;
  className?: string;
}

interface SharePlatform {
  name: string;
  icon: string;
  shareUrl: (url: string, title: string, description: string) => string;
  color: string;
}

const sharePlatforms: SharePlatform[] = [
  {
    name: "Twitter",
    icon: "𝕏",
    shareUrl: (url, title) => `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
    color: "hover:bg-black",
  },
  {
    name: "LinkedIn",
    icon: "in",
    shareUrl: (url, title, description) => 
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(description)}`,
    color: "hover:bg-blue-600",
  },
  {
    name: "Facebook",
    icon: "f",
    shareUrl: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    color: "hover:bg-blue-500",
  },
  {
    name: "Reddit",
    icon: "r",
    shareUrl: (url, title) => `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
    color: "hover:bg-orange-500",
  },
];

export function SocialShare({ url, title, description, className = "" }: SocialShareProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShare = (platform: SharePlatform) => {
    const shareUrl = platform.shareUrl(url, title, description);
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <span className="text-sm">📤</span>
        <span className="text-sm font-medium">Share</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute top-full mt-2 right-0 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 min-w-[200px] z-50"
          >
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                Share this chapter
              </h4>
              
              {/* Social Platform Buttons */}
              <div className="grid grid-cols-2 gap-2">
                {sharePlatforms.map((platform) => (
                  <button
                    key={platform.name}
                    onClick={() => handleShare(platform)}
                    className={`flex items-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:text-white rounded-md transition-colors ${platform.color}`}
                  >
                    <span className="font-bold">{platform.icon}</span>
                    <span>{platform.name}</span>
                  </button>
                ))}
              </div>

              {/* Copy Link Button */}
              <div className="border-t border-gray-200 dark:border-gray-600 pt-2 mt-3">
                <button
                  onClick={handleCopyLink}
                  className="w-full flex items-center justify-center space-x-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  <span>{copied ? "✓" : "🔗"}</span>
                  <span>{copied ? "Copied!" : "Copy Link"}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop to close menu */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}