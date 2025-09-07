"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface NetworkNode {
  id: string;
  label: string;
  role: string;
  x: number;
  y: number;
  connections: string[];
  impact: number;
}

interface NetworkConnection {
  from: string;
  to: string;
  strength: number;
  type: 'collaboration' | 'mentorship' | 'leadership';
}

export function NetworkVisualization() {
  const [activeNode, setActiveNode] = useState<string | null>(null);
  const [animationPhase, setAnimationPhase] = useState(0);

  const nodes: NetworkNode[] = [
    {
      id: "leader",
      label: "Tech Lead",
      role: "You",
      x: 50,
      y: 50,
      connections: ["dev1", "dev2", "dev3", "designer", "pm"],
      impact: 100
    },
    {
      id: "dev1",
      label: "Senior Dev",
      role: "Frontend",
      x: 25,
      y: 25,
      connections: ["leader", "dev2", "designer"],
      impact: 85
    },
    {
      id: "dev2",
      label: "Mid Dev",
      role: "Backend",
      x: 75,
      y: 25,
      connections: ["leader", "dev1", "dev3"],
      impact: 70
    },
    {
      id: "dev3",
      label: "Junior Dev",
      role: "Fullstack",
      x: 75,
      y: 75,
      connections: ["leader", "dev2"],
      impact: 60
    },
    {
      id: "designer",
      label: "UX Designer",
      role: "Design",
      x: 25,
      y: 75,
      connections: ["leader", "dev1"],
      impact: 80
    },
    {
      id: "pm",
      label: "Product Manager",
      role: "Product",
      x: 50,
      y: 20,
      connections: ["leader"],
      impact: 75
    }
  ];

  const connections: NetworkConnection[] = [
    { from: "leader", to: "dev1", strength: 0.9, type: "leadership" },
    { from: "leader", to: "dev2", strength: 0.8, type: "leadership" },
    { from: "leader", to: "dev3", strength: 0.7, type: "mentorship" },
    { from: "leader", to: "designer", strength: 0.8, type: "collaboration" },
    { from: "leader", to: "pm", strength: 0.9, type: "collaboration" },
    { from: "dev1", to: "dev2", strength: 0.6, type: "collaboration" },
    { from: "dev1", to: "designer", strength: 0.7, type: "collaboration" },
    { from: "dev2", to: "dev3", strength: 0.8, type: "mentorship" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationPhase((prev) => (prev + 1) % 3);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getConnectionColor = (type: NetworkConnection['type']) => {
    switch (type) {
      case 'leadership': return '#6B46C1';
      case 'mentorship': return '#F59E0B';
      case 'collaboration': return '#8B5CF6';
      default: return '#6B46C1';
    }
  };

  const getNodeColor = (node: NetworkNode) => {
    if (node.id === "leader") return '#6B46C1';
    if (activeNode === node.id) return '#F59E0B';
    return '#8B5CF6';
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-chapter3-primary/20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-chapter3-primary mb-2">
            Team Collaboration Network
          </h3>
          <p className="text-gray-600">
            Visualizing connections, influence, and collaborative impact
          </p>
        </div>

        {/* Network Visualization */}
        <div className="relative w-full h-96 bg-gradient-to-br from-purple-50 to-amber-50 rounded-xl overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            {/* Connections */}
            {connections.map((connection, index) => {
              const fromNode = nodes.find(n => n.id === connection.from);
              const toNode = nodes.find(n => n.id === connection.to);
              
              if (!fromNode || !toNode) return null;

              return (
                <motion.line
                  key={`${connection.from}-${connection.to}`}
                  x1={fromNode.x}
                  y1={fromNode.y}
                  x2={toNode.x}
                  y2={toNode.y}
                  stroke={getConnectionColor(connection.type)}
                  strokeWidth={connection.strength * 2}
                  strokeOpacity={0.6}
                  initial={{ pathLength: 0 }}
                  animate={{ 
                    pathLength: 1,
                    strokeOpacity: animationPhase === 1 ? 0.8 : 0.6
                  }}
                  transition={{ 
                    delay: index * 0.1,
                    duration: 1,
                    strokeOpacity: { duration: 0.5 }
                  }}
                />
              );
            })}

            {/* Nodes */}
            {nodes.map((node, index) => (
              <g key={node.id}>
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={node.id === "leader" ? 4 : 3}
                  fill={getNodeColor(node)}
                  className="cursor-pointer"
                  initial={{ scale: 0 }}
                  animate={{ 
                    scale: 1,
                    r: activeNode === node.id ? 5 : (node.id === "leader" ? 4 : 3)
                  }}
                  transition={{ 
                    delay: index * 0.1 + 0.5,
                    duration: 0.6,
                    r: { duration: 0.3 }
                  }}
                  whileHover={{ scale: 1.2 }}
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                />
                
                {/* Node pulse effect */}
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={node.id === "leader" ? 4 : 3}
                  fill="none"
                  stroke={getNodeColor(node)}
                  strokeWidth={1}
                  strokeOpacity={0.4}
                  animate={{
                    r: [
                      node.id === "leader" ? 4 : 3,
                      node.id === "leader" ? 8 : 6,
                      node.id === "leader" ? 4 : 3
                    ],
                    strokeOpacity: [0.4, 0, 0.4]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                />
              </g>
            ))}
          </svg>

          {/* Node Labels */}
          {nodes.map((node) => (
            <motion.div
              key={`label-${node.id}`}
              className="absolute pointer-events-none"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ 
                opacity: activeNode === node.id || activeNode === null ? 1 : 0.5,
                scale: activeNode === node.id ? 1.1 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg border border-gray-200 text-center min-w-max">
                <div className="font-semibold text-sm text-gray-800">
                  {node.label}
                </div>
                <div className="text-xs text-gray-600">
                  {node.role}
                </div>
                <div className="text-xs font-medium text-chapter3-primary">
                  Impact: {node.impact}%
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <motion.div
          className="mt-6 flex flex-wrap justify-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-chapter3-primary rounded"></div>
            <span className="text-sm text-gray-600">Leadership</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-chapter3-secondary rounded"></div>
            <span className="text-sm text-gray-600">Mentorship</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-1 bg-chapter3-accent rounded"></div>
            <span className="text-sm text-gray-600">Collaboration</span>
          </div>
        </motion.div>

        {/* Interactive Stats */}
        <motion.div
          className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2 }}
        >
          <div className="text-center p-4 bg-chapter3-primary/10 rounded-lg">
            <div className="text-2xl font-bold text-chapter3-primary">8</div>
            <div className="text-sm text-gray-600">Team Members</div>
          </div>
          <div className="text-center p-4 bg-chapter3-secondary/10 rounded-lg">
            <div className="text-2xl font-bold text-chapter3-secondary">15+</div>
            <div className="text-sm text-gray-600">Cross-team Connections</div>
          </div>
          <div className="text-center p-4 bg-chapter3-accent/10 rounded-lg">
            <div className="text-2xl font-bold text-chapter3-accent">300%</div>
            <div className="text-sm text-gray-600">Productivity Increase</div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}