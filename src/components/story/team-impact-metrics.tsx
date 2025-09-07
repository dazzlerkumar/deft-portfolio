"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface MetricData {
  id: string;
  label: string;
  value: number;
  maxValue: number;
  unit: string;
  description: string;
  trend: 'up' | 'down' | 'stable';
  color: string;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  skillGrowth: number;
  satisfaction: number;
  productivity: number;
  avatar: string;
}

export function TeamImpactMetrics() {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [animationProgress, setAnimationProgress] = useState(0);

  const metrics: MetricData[] = [
    {
      id: "delivery",
      label: "Delivery Speed",
      value: 85,
      maxValue: 100,
      unit: "%",
      description: "Faster feature delivery through improved processes",
      trend: "up",
      color: "#6B46C1"
    },
    {
      id: "quality",
      label: "Code Quality",
      value: 92,
      maxValue: 100,
      unit: "%",
      description: "Reduced bugs and improved maintainability",
      trend: "up",
      color: "#F59E0B"
    },
    {
      id: "satisfaction",
      label: "Team Satisfaction",
      value: 88,
      maxValue: 100,
      unit: "%",
      description: "Higher engagement and job satisfaction scores",
      trend: "up",
      color: "#8B5CF6"
    },
    {
      id: "retention",
      label: "Team Retention",
      value: 95,
      maxValue: 100,
      unit: "%",
      description: "Reduced turnover through better leadership",
      trend: "up",
      color: "#10B981"
    }
  ];

  const teamMembers: TeamMember[] = [
    {
      id: "alice",
      name: "Alice Chen",
      role: "Senior Frontend",
      skillGrowth: 85,
      satisfaction: 90,
      productivity: 88,
      avatar: "AC"
    },
    {
      id: "bob",
      name: "Bob Martinez",
      role: "Backend Lead",
      skillGrowth: 78,
      satisfaction: 85,
      productivity: 92,
      avatar: "BM"
    },
    {
      id: "carol",
      name: "Carol Kim",
      role: "Full Stack",
      skillGrowth: 92,
      satisfaction: 88,
      productivity: 85,
      avatar: "CK"
    },
    {
      id: "david",
      name: "David Wilson",
      role: "Junior Dev",
      skillGrowth: 95,
      satisfaction: 92,
      productivity: 80,
      avatar: "DW"
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimationProgress(1);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const getTrendIcon = (trend: MetricData['trend']) => {
    switch (trend) {
      case 'up': return '↗️';
      case 'down': return '↘️';
      case 'stable': return '→';
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Main Metrics Dashboard */}
      <motion.div
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-chapter3-primary/20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-chapter3-primary mb-2">
            Team Performance Metrics
          </h3>
          <p className="text-gray-600">
            Measurable impact of effective technical leadership
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.id}
              className={`relative p-6 rounded-xl cursor-pointer transition-all duration-300 ${
                selectedMetric === metric.id 
                  ? 'bg-gradient-to-br from-chapter3-primary/20 to-chapter3-accent/20 scale-105' 
                  : 'bg-white/60 hover:bg-white/80'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onClick={() => setSelectedMetric(selectedMetric === metric.id ? null : metric.id)}
              whileHover={{ scale: 1.02 }}
            >
              {/* Metric Value */}
              <div className="text-center mb-4">
                <motion.div
                  className="text-3xl font-bold mb-1"
                  style={{ color: metric.color }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
                >
                  {Math.round(metric.value * animationProgress)}{metric.unit}
                </motion.div>
                <div className="text-sm font-medium text-gray-700">
                  {metric.label}
                </div>
                <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                  <span>{getTrendIcon(metric.trend)}</span>
                  <span>Trending {metric.trend}</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                <motion.div
                  className="h-2 rounded-full"
                  style={{ backgroundColor: metric.color }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(metric.value / metric.maxValue) * 100}%` }}
                  transition={{ delay: index * 0.1 + 0.5, duration: 1 }}
                />
              </div>

              {/* Description (shown when selected) */}
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ 
                  height: selectedMetric === metric.id ? 'auto' : 0,
                  opacity: selectedMetric === metric.id ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-xs text-gray-600 mt-2">
                  {metric.description}
                </p>
              </motion.div>

              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
                style={{
                  background: `radial-gradient(circle at center, ${metric.color}20, transparent 70%)`
                }}
                animate={{
                  opacity: selectedMetric === metric.id ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Team Member Growth Visualization */}
      <motion.div
        className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-chapter3-primary/20"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-chapter3-primary mb-2">
            Individual Growth Tracking
          </h3>
          <p className="text-gray-600">
            How leadership investment translates to personal development
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member.id}
              className="bg-gradient-to-r from-white/60 to-purple-50/60 rounded-xl p-6 border border-chapter3-primary/10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.6, duration: 0.6 }}
            >
              {/* Member Header */}
              <div className="flex items-center gap-4 mb-6">
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-chapter3-primary to-chapter3-accent rounded-full flex items-center justify-center text-white font-bold"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.8, duration: 0.4 }}
                >
                  {member.avatar}
                </motion.div>
                <div>
                  <div className="font-semibold text-gray-800">{member.name}</div>
                  <div className="text-sm text-gray-600">{member.role}</div>
                </div>
              </div>

              {/* Growth Metrics */}
              <div className="space-y-4">
                {[
                  { label: 'Skill Growth', value: member.skillGrowth, color: '#6B46C1' },
                  { label: 'Satisfaction', value: member.satisfaction, color: '#F59E0B' },
                  { label: 'Productivity', value: member.productivity, color: '#8B5CF6' }
                ].map((metric, metricIndex) => (
                  <div key={metric.label}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium text-gray-700">
                        {metric.label}
                      </span>
                      <span className="text-sm font-bold" style={{ color: metric.color }}>
                        {metric.value}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="h-2 rounded-full"
                        style={{ backgroundColor: metric.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.value}%` }}
                        transition={{ 
                          delay: index * 0.1 + metricIndex * 0.1 + 1,
                          duration: 0.8
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Impact Summary */}
      <motion.div
        className="bg-gradient-to-r from-chapter3-primary/10 to-chapter3-secondary/10 rounded-2xl p-8 border border-chapter3-primary/20"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8, duration: 0.8 }}
      >
        <div className="text-center">
          <motion.h3
            className="text-2xl font-bold text-chapter3-primary mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            Leadership Impact Summary
          </motion.h3>
          
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-chapter3-primary mb-2">300%</div>
              <div className="text-sm text-gray-600">Team Velocity Increase</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-chapter3-secondary mb-2">0</div>
              <div className="text-sm text-gray-600">Team Members Lost</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-chapter3-accent mb-2">5</div>
              <div className="text-sm text-gray-600">Promotions Achieved</div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}