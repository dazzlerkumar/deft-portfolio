"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CodeShowcaseProps {
  title: string;
  description: string;
  codeSnippet: string;
  language: string;
  githubUrl?: string;
  liveUrl?: string;
  highlights?: string[];
}

export function CodeShowcase({
  title,
  description,
  codeSnippet,
  language,
  githubUrl,
  liveUrl,
  highlights = []
}: CodeShowcaseProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">{title}</h3>
          <div className="flex gap-2">
            {githubUrl && (
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-gray-800 text-gray-300 rounded text-sm hover:bg-gray-700 transition-colors"
              >
                GitHub
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors"
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
        <p className="text-gray-300 mb-4">{description}</p>
        
        {highlights.length > 0 && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-400 mb-2">Key Features:</h4>
            <div className="flex flex-wrap gap-2">
              {highlights.map((highlight, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-800 text-gray-300 rounded text-xs"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="relative">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full p-4 text-left bg-gray-800 hover:bg-gray-750 transition-colors flex items-center justify-between"
        >
          <span className="text-gray-300 font-mono text-sm">
            {language} • {isExpanded ? 'Hide' : 'Show'} Code
          </span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <pre className="p-4 bg-gray-950 text-gray-300 text-sm overflow-x-auto">
                <code>{codeSnippet}</code>
              </pre>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}