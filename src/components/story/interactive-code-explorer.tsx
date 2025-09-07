"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SyntaxHighlighter } from "./syntax-highlighter";

interface CodeFile {
  name: string;
  path: string;
  content: string;
  language: string;
  description: string;
}

interface InteractiveCodeExplorerProps {
  files: CodeFile[];
  title: string;
  description: string;
}

export function InteractiveCodeExplorer({
  files,
  title,
  description
}: InteractiveCodeExplorerProps) {
  const [selectedFile, setSelectedFile] = useState(files[0]);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredFiles = files.filter(file =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    file.path.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <motion.div
      className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
          />
          <svg
            className="absolute right-3 top-2.5 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <div className="flex h-96">
        {/* File Explorer */}
        <div className="w-1/3 border-r border-gray-700 bg-gray-850">
          <div className="p-4 border-b border-gray-700">
            <h4 className="text-sm font-medium text-gray-300">Files</h4>
          </div>
          <div className="overflow-y-auto h-full">
            {filteredFiles.map((file, index) => (
              <button
                key={index}
                onClick={() => setSelectedFile(file)}
                className={`w-full text-left p-3 hover:bg-gray-800 transition-colors border-b border-gray-800 ${
                  selectedFile.name === file.name ? 'bg-gray-800 border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="text-sm font-medium text-white truncate">
                  {file.name}
                </div>
                <div className="text-xs text-gray-400 truncate">
                  {file.path}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Code Viewer */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-700 bg-gray-800">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-white">{selectedFile.name}</h4>
                <p className="text-xs text-gray-400">{selectedFile.path}</p>
              </div>
              <span className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs">
                {selectedFile.language}
              </span>
            </div>
            {selectedFile.description && (
              <p className="text-sm text-gray-300 mt-2">{selectedFile.description}</p>
            )}
          </div>
          
          <div className="flex-1 overflow-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedFile.name}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <SyntaxHighlighter
                  code={selectedFile.content}
                  language={selectedFile.language}
                  showLineNumbers={true}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
}