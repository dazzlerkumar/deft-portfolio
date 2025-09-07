"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ArchitectureNode {
  id: string;
  label: string;
  type: 'component' | 'service' | 'data' | 'external';
  description: string;
  technologies: string[];
  connections: string[];
  position: { x: number; y: number };
}

interface ArchitectureDiagramProps {
  nodes: ArchitectureNode[];
  title: string;
  description: string;
}

export function ArchitectureDiagram({
  nodes,
  title,
  description
}: ArchitectureDiagramProps) {
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const getNodeColor = (type: ArchitectureNode['type']) => {
    switch (type) {
      case 'component': return 'bg-blue-600 border-blue-500';
      case 'service': return 'bg-green-600 border-green-500';
      case 'data': return 'bg-purple-600 border-purple-500';
      case 'external': return 'bg-orange-600 border-orange-500';
      default: return 'bg-gray-600 border-gray-500';
    }
  };

  const getConnections = (nodeId: string) => {
    const node = nodes.find(n => n.id === nodeId);
    return node?.connections || [];
  };

  return (
    <motion.div
      className="bg-gray-900 rounded-lg border border-gray-700 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6 border-b border-gray-700">
        <h3 className="text-2xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>

      <div className="flex">
        {/* Diagram Area */}
        <div className="flex-1 relative bg-gray-950 h-96 overflow-hidden">
          <svg className="w-full h-full">
            {/* Render connections */}
            {nodes.map(node => 
              node.connections.map(connectionId => {
                const targetNode = nodes.find(n => n.id === connectionId);
                if (!targetNode) return null;
                
                const isHighlighted = hoveredNode === node.id || hoveredNode === connectionId;
                
                return (
                  <line
                    key={`${node.id}-${connectionId}`}
                    x1={node.position.x + 60}
                    y1={node.position.y + 30}
                    x2={targetNode.position.x + 60}
                    y2={targetNode.position.y + 30}
                    stroke={isHighlighted ? "#60a5fa" : "#374151"}
                    strokeWidth={isHighlighted ? 2 : 1}
                    strokeDasharray={isHighlighted ? "0" : "5,5"}
                    className="transition-all duration-200"
                  />
                );
              })
            )}
          </svg>

          {/* Render nodes */}
          {nodes.map(node => (
            <motion.div
              key={node.id}
              className={`absolute cursor-pointer ${getNodeColor(node.type)} rounded-lg border-2 p-3 shadow-lg`}
              style={{
                left: node.position.x,
                top: node.position.y,
                width: 120,
                height: 60
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => setSelectedNode(node)}
            >
              <div className="text-white text-xs font-medium text-center">
                {node.label}
              </div>
              <div className="text-white text-xs opacity-75 text-center mt-1">
                {node.type}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Details Panel */}
        <div className="w-80 border-l border-gray-700 bg-gray-850">
          <div className="p-4 border-b border-gray-700">
            <h4 className="text-sm font-medium text-gray-300">Component Details</h4>
          </div>
          
          <AnimatePresence mode="wait">
            {selectedNode ? (
              <motion.div
                key={selectedNode.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-4"
              >
                <h5 className="text-lg font-semibold text-white mb-2">
                  {selectedNode.label}
                </h5>
                <div className="mb-3">
                  <span className={`inline-block px-2 py-1 rounded text-xs text-white ${getNodeColor(selectedNode.type).split(' ')[0]}`}>
                    {selectedNode.type}
                  </span>
                </div>
                <p className="text-gray-300 text-sm mb-4">
                  {selectedNode.description}
                </p>
                
                {selectedNode.technologies.length > 0 && (
                  <div className="mb-4">
                    <h6 className="text-sm font-medium text-gray-400 mb-2">Technologies:</h6>
                    <div className="flex flex-wrap gap-1">
                      {selectedNode.technologies.map((tech, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-700 text-gray-300 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedNode.connections.length > 0 && (
                  <div>
                    <h6 className="text-sm font-medium text-gray-400 mb-2">Connections:</h6>
                    <div className="space-y-1">
                      {selectedNode.connections.map(connectionId => {
                        const connectedNode = nodes.find(n => n.id === connectionId);
                        return connectedNode ? (
                          <button
                            key={connectionId}
                            onClick={() => setSelectedNode(connectedNode)}
                            className="block w-full text-left px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded text-xs text-gray-300 transition-colors"
                          >
                            → {connectedNode.label}
                          </button>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 text-center text-gray-400"
              >
                <svg className="w-12 h-12 mx-auto mb-3 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm">Click on a component to view details</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}