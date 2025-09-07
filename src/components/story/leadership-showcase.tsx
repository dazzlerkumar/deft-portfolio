"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

interface LeadershipProject {
  id: string;
  title: string;
  description: string;
  challenge: string;
  solution: string;
  impact: {
    metric: string;
    value: string;
    description: string;
  }[];
  technologies: string[];
  teamSize: number;
  duration: string;
  role: string;
}

export function LeadershipShowcase() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const projects: LeadershipProject[] = [
    {
      id: "design-system",
      title: "Enterprise Design System",
      description: "Led the creation of a comprehensive design system that unified 12 product teams across the organization.",
      challenge: "Inconsistent UI/UX across products, slow development cycles, and design debt accumulation.",
      solution: "Built a scalable component library with automated testing, documentation, and adoption guidelines.",
      impact: [
        { metric: "Development Speed", value: "+40%", description: "Faster feature delivery" },
        { metric: "Design Consistency", value: "95%", description: "Cross-product alignment" },
        { metric: "Team Adoption", value: "100%", description: "All teams using system" }
      ],
      technologies: ["React", "TypeScript", "Storybook", "Figma", "Jest"],
      teamSize: 8,
      duration: "6 months",
      role: "Technical Lead & Architecture"
    },
    {
      id: "performance-optimization",
      title: "Performance Optimization Initiative",
      description: "Spearheaded a company-wide performance improvement program that enhanced user experience across all products.",
      challenge: "Poor Core Web Vitals scores affecting user engagement and SEO rankings.",
      solution: "Implemented systematic performance monitoring, optimization strategies, and team training programs.",
      impact: [
        { metric: "Page Load Time", value: "-60%", description: "Faster initial loads" },
        { metric: "User Engagement", value: "+25%", description: "Improved retention" },
        { metric: "SEO Rankings", value: "+35%", description: "Better visibility" }
      ],
      technologies: ["Next.js", "Webpack", "Lighthouse", "WebPageTest", "Analytics"],
      teamSize: 12,
      duration: "4 months",
      role: "Performance Lead & Mentor"
    },
    {
      id: "team-scaling",
      title: "Engineering Team Scaling",
      description: "Successfully scaled the frontend team from 3 to 15 engineers while maintaining code quality and team culture.",
      challenge: "Rapid growth requirements with limited senior talent and knowledge transfer needs.",
      solution: "Developed comprehensive onboarding, mentorship programs, and scalable development processes.",
      impact: [
        { metric: "Team Growth", value: "400%", description: "Successful scaling" },
        { metric: "Code Quality", value: "92%", description: "Maintained standards" },
        { metric: "Retention Rate", value: "95%", description: "High satisfaction" }
      ],
      technologies: ["Mentorship", "Process Design", "Code Review", "Training", "Culture"],
      teamSize: 15,
      duration: "12 months",
      role: "Team Lead & Culture Champion"
    }
  ];

  return (
    <div className="w-full max-w-6xl mx-auto">
      <motion.div
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-chapter3-primary/20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-chapter3-primary mb-2">
            Leadership in Action
          </h3>
          <p className="text-gray-600">
            Key projects that demonstrate technical leadership and team impact
          </p>
        </div>

        <div className="space-y-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className={`relative rounded-xl border-2 transition-all duration-500 cursor-pointer ${
                selectedProject === project.id
                  ? 'border-chapter3-primary bg-gradient-to-r from-chapter3-primary/10 to-chapter3-accent/10'
                  : hoveredProject === project.id
                  ? 'border-chapter3-accent bg-chapter3-accent/5'
                  : 'border-gray-200 bg-white/60'
              }`}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              onClick={() => setSelectedProject(selectedProject === project.id ? null : project.id)}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              whileHover={{ scale: 1.01 }}
            >
              {/* Project Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <motion.h4
                      className="text-xl font-bold text-chapter3-primary mb-2"
                      animate={{
                        scale: selectedProject === project.id ? 1.05 : 1
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {project.title}
                    </motion.h4>
                    <p className="text-gray-700 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                  
                  <motion.div
                    className="ml-4 flex flex-col items-end gap-2"
                    animate={{
                      opacity: hoveredProject === project.id || selectedProject === project.id ? 1 : 0.7
                    }}
                  >
                    <div className="text-sm text-chapter3-secondary font-semibold">
                      {project.teamSize} engineers
                    </div>
                    <div className="text-sm text-gray-600">
                      {project.duration}
                    </div>
                    <div className="text-xs text-chapter3-accent font-medium">
                      {project.role}
                    </div>
                  </motion.div>
                </div>

                {/* Quick Impact Preview */}
                <motion.div
                  className="flex flex-wrap gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.3 }}
                >
                  {project.impact.slice(0, 3).map((impact, impactIndex) => (
                    <div key={impact.metric} className="flex items-center gap-2">
                      <motion.div
                        className="text-lg font-bold text-chapter3-primary"
                        animate={{
                          scale: [1, 1.1, 1],
                          color: selectedProject === project.id ? '#F59E0B' : '#6B46C1'
                        }}
                        transition={{
                          scale: { duration: 2, repeat: Infinity, delay: impactIndex * 0.5 },
                          color: { duration: 0.3 }
                        }}
                      >
                        {impact.value}
                      </motion.div>
                      <div className="text-sm text-gray-600">{impact.metric}</div>
                    </div>
                  ))}
                </motion.div>
              </div>

              {/* Expanded Details */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: selectedProject === project.id ? 'auto' : 0,
                  opacity: selectedProject === project.id ? 1 : 0
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-6 border-t border-chapter3-primary/20">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
                    {/* Challenge & Solution */}
                    <div className="space-y-6">
                      <div>
                        <h5 className="font-semibold text-chapter3-primary mb-2">
                          The Challenge
                        </h5>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {project.challenge}
                        </p>
                      </div>
                      
                      <div>
                        <h5 className="font-semibold text-chapter3-secondary mb-2">
                          The Solution
                        </h5>
                        <p className="text-gray-700 text-sm leading-relaxed">
                          {project.solution}
                        </p>
                      </div>

                      {/* Technologies */}
                      <div>
                        <h5 className="font-semibold text-chapter3-accent mb-2">
                          Technologies & Approaches
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <motion.span
                              key={tech}
                              className="px-3 py-1 bg-chapter3-primary/10 text-chapter3-primary text-xs rounded-full font-medium"
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: techIndex * 0.1 }}
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Detailed Impact Metrics */}
                    <div>
                      <h5 className="font-semibold text-chapter3-primary mb-4">
                        Measurable Impact
                      </h5>
                      <div className="space-y-4">
                        {project.impact.map((impact, impactIndex) => (
                          <motion.div
                            key={impact.metric}
                            className="bg-white/60 rounded-lg p-4 border border-chapter3-primary/10"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: impactIndex * 0.1 + 0.2 }}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-gray-800">
                                {impact.metric}
                              </span>
                              <motion.span
                                className="text-xl font-bold text-chapter3-primary"
                                animate={{
                                  scale: [1, 1.1, 1]
                                }}
                                transition={{
                                  duration: 2,
                                  repeat: Infinity,
                                  delay: impactIndex * 0.3
                                }}
                              >
                                {impact.value}
                              </motion.span>
                            </div>
                            <p className="text-sm text-gray-600">
                              {impact.description}
                            </p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Hover Glow Effect */}
              <motion.div
                className="absolute inset-0 rounded-xl pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${
                    selectedProject === project.id ? '#6B46C1' : '#8B5CF6'
                  }15, transparent 70%)`
                }}
                animate={{
                  opacity: hoveredProject === project.id || selectedProject === project.id ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          className="mt-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <p className="text-gray-600 mb-4">
            Want to see how I can help scale your team and deliver impact?
          </p>
          <motion.button
            className="bg-gradient-to-r from-chapter3-primary to-chapter3-accent text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "0 4px 15px rgba(107, 70, 193, 0.3)",
                "0 8px 25px rgba(107, 70, 193, 0.4)",
                "0 4px 15px rgba(107, 70, 193, 0.3)"
              ]
            }}
            transition={{
              boxShadow: { duration: 2, repeat: Infinity }
            }}
          >
            Let's Connect
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}