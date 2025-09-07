"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface VisionCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  technologies: string[];
}

export function FutureVision() {
  const [selectedVision, setSelectedVision] = useState<string | null>(null);

  const visions: VisionCard[] = [
    {
      id: "ai-collaboration",
      title: "AI-Human Collaboration",
      description: "Building interfaces where AI enhances human creativity rather than replacing it, creating more intuitive and powerful development workflows.",
      icon: "🤖",
      technologies: ["AI/ML Integration", "Natural Language Interfaces", "Intelligent Code Generation"]
    },
    {
      id: "immersive-web",
      title: "Immersive Web Experiences",
      description: "Pushing the boundaries of what's possible in the browser with WebGL, WebXR, and advanced animations that create truly engaging experiences.",
      icon: "🌐",
      technologies: ["WebXR", "Three.js", "Advanced CSS", "Performance Optimization"]
    },
    {
      id: "accessible-future",
      title: "Universally Accessible Design",
      description: "Creating digital experiences that work beautifully for everyone, regardless of their abilities, devices, or circumstances.",
      icon: "♿",
      technologies: ["WCAG 2.2+", "Inclusive Design", "Assistive Technology", "Progressive Enhancement"]
    },
    {
      id: "sustainable-tech",
      title: "Sustainable Technology",
      description: "Building efficient, low-carbon digital solutions that consider environmental impact without compromising user experience.",
      icon: "🌱",
      technologies: ["Green Computing", "Efficient Algorithms", "Minimal Resource Usage", "Edge Computing"]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <h3 className="text-3xl font-bold text-chapter4-secondary mb-4">
          Shaping Tomorrow's Digital Landscape
        </h3>
        <p className="text-lg text-chapter4-secondary/80 max-w-3xl mx-auto">
          These are the areas where I see the most potential for meaningful impact in the coming years.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {visions.map((vision, index) => (
          <motion.div
            key={vision.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            className={`relative bg-chapter4-primary/30 backdrop-blur-sm border rounded-xl p-6 cursor-pointer transition-all duration-300 ${
              selectedVision === vision.id
                ? "border-chapter4-accent shadow-lg shadow-chapter4-accent/20 scale-105"
                : "border-chapter4-accent/30 hover:border-chapter4-accent/60"
            }`}
            onClick={() => setSelectedVision(selectedVision === vision.id ? null : vision.id)}
            whileHover={{ y: -5 }}
          >
            <div className="flex items-start space-x-4">
              <motion.div
                className="text-4xl"
                animate={{
                  scale: selectedVision === vision.id ? 1.2 : 1,
                  rotate: selectedVision === vision.id ? 360 : 0,
                }}
                transition={{ duration: 0.5 }}
              >
                {vision.icon}
              </motion.div>
              
              <div className="flex-1">
                <h4 className="text-xl font-bold text-chapter4-secondary mb-2">
                  {vision.title}
                </h4>
                
                <p className="text-chapter4-secondary/80 mb-4 leading-relaxed">
                  {vision.description}
                </p>

                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: selectedVision === vision.id ? "auto" : 0,
                    opacity: selectedVision === vision.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="pt-4 border-t border-chapter4-accent/20">
                    <h5 className="text-sm font-semibold text-chapter4-accent mb-2">
                      Key Technologies:
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {vision.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-chapter4-accent/20 text-chapter4-accent text-sm rounded-full border border-chapter4-accent/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Hover glow effect */}
            <motion.div
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-chapter4-accent/10 to-transparent opacity-0 pointer-events-none"
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>

      {/* Call to action */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.6 }}
        className="text-center mt-12"
      >
        <p className="text-lg text-chapter4-secondary/90 mb-6">
          Interested in exploring any of these areas together?
        </p>
        <motion.div
          className="inline-block px-6 py-3 bg-gradient-to-r from-chapter4-accent/20 to-chapter4-secondary/20 rounded-full border border-chapter4-accent/30"
          animate={{
            boxShadow: [
              "0 0 10px rgba(14, 165, 233, 0.3)",
              "0 0 20px rgba(14, 165, 233, 0.5)",
              "0 0 10px rgba(14, 165, 233, 0.3)"
            ]
          }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <span className="text-chapter4-secondary font-medium">
            Let's build the future together
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}