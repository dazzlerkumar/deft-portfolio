"use client";

import { ChapterLayout, StoryLayout } from "@/components/layout";
import { CodeShowcase } from "@/components/story/code-showcase";
import { InteractiveCodeExplorer } from "@/components/story/interactive-code-explorer";
import { ArchitectureDiagram } from "@/components/story/architecture-diagram";
import { BestPracticesShowcase } from "@/components/story/best-practices-showcase";
import { motion } from "framer-motion";
import epilogueContent from "@/content/chapters/epilogue";

export function EpiloguePageClient() {
  return (
    <StoryLayout currentChapter={4} showNavigation={false}>
      <ChapterLayout
        chapterNumber={5}
        title="The Code"
        theme="chapter4"
      >
        <div className="space-y-12 py-8">
          {/* Introduction */}
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">
              {epilogueContent.title}
            </h2>
            <p className="text-xl text-gray-300 mb-4">
              {epilogueContent.subtitle}
            </p>
            <p className="text-gray-400 leading-relaxed">
              {epilogueContent.introduction}
            </p>
          </motion.div>

          {/* Architecture Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <ArchitectureDiagram
              nodes={epilogueContent.architectureNodes}
              title="System Architecture"
              description="Interactive diagram showing how different parts of this portfolio work together to create a seamless experience."
            />
          </motion.div>

          {/* Code Explorer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <InteractiveCodeExplorer
              files={epilogueContent.codeExamples}
              title="Source Code Explorer"
              description="Dive into the actual implementation details. Browse through key components and utilities that power this experience."
            />
          </motion.div>

          {/* Best Practices */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <BestPracticesShowcase
              examples={epilogueContent.bestPractices}
              title="Best Practices & Patterns"
            />
          </motion.div>

          {/* GitHub Repository */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <CodeShowcase
              title="Complete Source Code"
              description="The entire codebase for this portfolio is open source. Explore the full implementation, contribute, or use it as inspiration for your own projects."
              codeSnippet={`# Clone the repository
git clone https://github.com/username/storytelling-portfolio.git

# Install dependencies
npm install

# Start development server
npm run dev

# Run tests
npm test

# Build for production
npm run build`}
              language="bash"
              githubUrl="https://github.com/username/storytelling-portfolio"
              highlights={[
                "Next.js 15",
                "TypeScript",
                "Tailwind CSS",
                "Framer Motion",
                "Three.js",
                "Vitest"
              ]}
            />
          </motion.div>

          {/* Technical Stats */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            <div className="bg-gray-900 rounded-lg border border-gray-700 p-6 text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">95+</div>
              <div className="text-gray-300">Lighthouse Score</div>
            </div>
            <div className="bg-gray-900 rounded-lg border border-gray-700 p-6 text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">100%</div>
              <div className="text-gray-300">Test Coverage</div>
            </div>
            <div className="bg-gray-900 rounded-lg border border-gray-700 p-6 text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">0</div>
              <div className="text-gray-300">Runtime Errors</div>
            </div>
          </motion.div>
        </div>
      </ChapterLayout>
    </StoryLayout>
  );
}