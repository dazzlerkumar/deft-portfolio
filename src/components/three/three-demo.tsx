"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SceneWrapper, GrowingTree, PuzzlePieces, Network3D, SpaceEnvironment, ThreeProvider } from '@/components/three';

export function ThreeDemo() {
  const [activeDemo, setActiveDemo] = useState<'tree' | 'puzzle' | 'network' | 'space'>('tree');
  const [progress, setProgress] = useState(0.5);

  const demos = [
    { id: 'tree', name: 'Growing Tree', component: GrowingTree },
    { id: 'puzzle', name: 'Puzzle Pieces', component: PuzzlePieces },
    { id: 'network', name: 'Network 3D', component: Network3D },
    { id: 'space', name: 'Space Environment', component: SpaceEnvironment },
  ] as const;

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">3D Components Demo</h2>
        
        {/* Demo Selection */}
        <div className="flex flex-wrap gap-2 mb-4">
          {demos.map((demo) => (
            <button
              key={demo.id}
              onClick={() => setActiveDemo(demo.id)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeDemo === demo.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {demo.name}
            </button>
          ))}
        </div>

        {/* Progress Control */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Progress: {Math.round(progress * 100)}%
          </label>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={progress}
            onChange={(e) => setProgress(parseFloat(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* 3D Scene */}
      <motion.div
        key={activeDemo}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="h-96 bg-gradient-to-br from-gray-900 to-blue-900 rounded-xl overflow-hidden"
      >
        <ThreeProvider>
          <SceneWrapper
            className="w-full h-full"
            camera={{ position: [0, 0, 8], fov: 60 }}
            fallback={
              <div className="flex items-center justify-center h-full text-white">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <p className="text-lg font-semibold mb-2">3D Not Available</p>
                  <p className="text-sm opacity-80">WebGL is not supported on this device</p>
                </div>
              </div>
            }
          >
            {activeDemo === 'tree' && <GrowingTree progress={progress} />}
            {activeDemo === 'puzzle' && <PuzzlePieces progress={progress} />}
            {activeDemo === 'network' && <Network3D progress={progress} />}
            {activeDemo === 'space' && <SpaceEnvironment progress={progress} />}
          </SceneWrapper>
        </ThreeProvider>
      </motion.div>

      {/* Info Panel */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold mb-2">Current Demo: {demos.find(d => d.id === activeDemo)?.name}</h3>
        <p className="text-sm text-gray-600">
          {activeDemo === 'tree' && 'Interactive growing tree with organic animations representing learning and growth.'}
          {activeDemo === 'puzzle' && 'Dynamic puzzle pieces that come together, representing problem-solving and challenges.'}
          {activeDemo === 'network' && 'Network visualization showing team connections and leadership relationships.'}
          {activeDemo === 'space' && 'Immersive space environment with planets and rocket launch representing future vision.'}
        </p>
      </div>
    </div>
  );
}