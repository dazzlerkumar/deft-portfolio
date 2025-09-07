"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SyntaxHighlighter } from "./syntax-highlighter";

interface BestPracticeExample {
  id: string;
  title: string;
  category: 'performance' | 'accessibility' | 'testing' | 'architecture' | 'security';
  description: string;
  badExample?: {
    code: string;
    explanation: string;
  };
  goodExample: {
    code: string;
    explanation: string;
  };
  language: string;
  benefits: string[];
}

interface BestPracticesShowcaseProps {
  examples: BestPracticeExample[];
  title: string;
}

export function BestPracticesShowcase({
  examples,
  title
}: BestPracticesShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedExample, setSelectedExample] = useState<BestPracticeExample>(examples[0]);
  const [showComparison, setShowComparison] = useState(false);

  const categories = [
    { id: 'all', label: 'All', color: 'bg-gray-600' },
    { id: 'performance', label: 'Performance', color: 'bg-green-600' },
    { id: 'accessibility', label: 'Accessibility', color: 'bg-blue-600' },
    { id: 'testing', label: 'Testing', color: 'bg-purple-600' },
    { id: 'architecture', label: 'Architecture', color: 'bg-orange-600' },
    { id: 'security', label: 'Security', color: 'bg-red-600' }
  ];

  const filteredExamples = selectedCategory === 'all' 
    ? examples 
    : examples.filter(example => example.category === selectedCategory);

  const getCategoryColor = (category: string) => {
    const categoryObj = categories.find(c => c.id === category);
    return categoryObj?.color || 'bg-gray-600';
  };

  return (
    <motion.div
      className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                selectedCategory === category.id
                  ? `${category.color} text-white`
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex">
        {/* Examples List */}
        <div className="w-1/3 border-r border-gray-700 bg-gray-850">
          <div className="p-4 border-b border-gray-700">
            <h4 className="text-sm font-medium text-gray-300">Examples</h4>
          </div>
          <div className="overflow-y-auto h-96">
            {filteredExamples.map((example) => (
              <button
                key={example.id}
                onClick={() => setSelectedExample(example)}
                className={`w-full text-left p-4 hover:bg-gray-800 transition-colors border-b border-gray-800 ${
                  selectedExample.id === example.id ? 'bg-gray-800 border-l-4 border-l-blue-500' : ''
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-2 h-2 rounded-full ${getCategoryColor(example.category)}`} />
                  <span className="text-sm font-medium text-white">{example.title}</span>
                </div>
                <p className="text-xs text-gray-400 line-clamp-2">
                  {example.description}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Example Details */}
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b border-gray-700 bg-gray-800">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-lg font-semibold text-white">{selectedExample.title}</h4>
              <span className={`px-2 py-1 rounded text-xs text-white ${getCategoryColor(selectedExample.category)}`}>
                {selectedExample.category}
              </span>
            </div>
            <p className="text-gray-300 text-sm mb-3">{selectedExample.description}</p>
            
            {selectedExample.badExample && (
              <div className="flex gap-2">
                <button
                  onClick={() => setShowComparison(!showComparison)}
                  className="px-3 py-1 bg-gray-700 text-gray-300 rounded text-sm hover:bg-gray-600 transition-colors"
                >
                  {showComparison ? 'Hide' : 'Show'} Comparison
                </button>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-auto">
            <AnimatePresence mode="wait">
              {showComparison && selectedExample.badExample ? (
                <motion.div
                  key="comparison"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-2 gap-4 p-4"
                >
                  {/* Bad Example */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <h5 className="text-sm font-medium text-red-400">Avoid This</h5>
                    </div>
                    <SyntaxHighlighter
                      code={selectedExample.badExample.code}
                      language={selectedExample.language}
                      showLineNumbers={false}
                    />
                    <p className="text-xs text-gray-400 mt-2">
                      {selectedExample.badExample.explanation}
                    </p>
                  </div>

                  {/* Good Example */}
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <h5 className="text-sm font-medium text-green-400">Best Practice</h5>
                    </div>
                    <SyntaxHighlighter
                      code={selectedExample.goodExample.code}
                      language={selectedExample.language}
                      showLineNumbers={false}
                    />
                    <p className="text-xs text-gray-400 mt-2">
                      {selectedExample.goodExample.explanation}
                    </p>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="single"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                    <h5 className="text-sm font-medium text-green-400">Best Practice</h5>
                  </div>
                  <SyntaxHighlighter
                    code={selectedExample.goodExample.code}
                    language={selectedExample.language}
                  />
                  <p className="text-sm text-gray-300 mt-4">
                    {selectedExample.goodExample.explanation}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Benefits */}
            {selectedExample.benefits.length > 0 && (
              <div className="p-4 border-t border-gray-700 bg-gray-850">
                <h5 className="text-sm font-medium text-gray-300 mb-2">Benefits:</h5>
                <ul className="space-y-1">
                  {selectedExample.benefits.map((benefit, index) => (
                    <li key={index} className="text-sm text-gray-400 flex items-start gap-2">
                      <span className="text-green-400 mt-1">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}