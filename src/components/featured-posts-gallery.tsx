/**
 * Featured Posts Glass Gallery Component
 * Displays Medium blog posts in glass containers with masonry layout and morphing effects
 */

'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowTopRightOnSquareIcon, ClockIcon } from '@heroicons/react/24/outline';
import { featuredPosts } from '@/data/portfolio';
import type { BlogPost } from '@/types/portfolio';

interface FeaturedPostsGalleryProps {
  className?: string;
}

/**
 * Individual glass post card component with morphing effects
 */
const GlassPostCard: React.FC<{ 
  post: BlogPost; 
  index: number; 
  isInView: boolean;
}> = ({ post, index, isInView }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Varying heights for masonry layout
  const cardHeights = ['h-80', 'h-96', 'h-[22rem]'];
  const cardHeight = cardHeights[index % cardHeights.length];
  
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 60,
      scale: 0.9,
      filter: 'blur(10px)'
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      filter: 'blur(0px)'
    }
  };

  const cardTransition = {
    duration: 0.6,
    delay: index * 0.1,
    ease: [0.175, 0.885, 0.32, 1.275] as const
  };

  return (
    <motion.article
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      transition={cardTransition}
      className={`group relative ${cardHeight} cursor-pointer`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.open(post.url, '_blank', 'noopener,noreferrer')}
    >
      {/* Glass card container with morphing effects */}
      <div 
        className={`
          relative h-full w-full overflow-hidden rounded-2xl
          bg-white/6 backdrop-blur-[25px] saturate-[180%]
          border border-white/12 
          shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,0.2)]
          transition-all duration-[400ms] ease-[cubic-bezier(0.175,0.885,0.32,1.275)]
          transform-gpu will-change-transform
          ${isHovered ? 
            'bg-white/10 backdrop-blur-[30px] saturate-[200%] border-white/20 shadow-[0_20px_48px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.3)] -translate-y-2 scale-[1.02]' : 
            ''
          }
        `}
      >
        {/* Gradient overlay based on post gradient */}
        <div 
          className={`
            absolute inset-0 opacity-20 rounded-2xl
            bg-gradient-to-br ${post.gradient}
            transition-opacity duration-300
            ${isHovered ? 'opacity-30' : ''}
          `}
        />
        
        {/* Content container */}
        <div className="relative h-full p-6 flex flex-col justify-between">
          {/* Header with platform and read time */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              {/* Medium platform indicator */}
              <div className="glass-tech-badge px-2 py-1 text-xs font-medium text-white/80">
                Medium
              </div>
              
              {/* Category badge */}
              <div className="glass-tech-badge px-2 py-1 text-xs font-medium text-white/70 capitalize">
                {post.category}
              </div>
            </div>
            
            {/* Read time with clock icon */}
            <div className="flex items-center space-x-1 text-white/60 text-sm">
              <ClockIcon className="w-4 h-4" />
              <span>{post.readTime} min</span>
            </div>
          </div>
          
          {/* Post title */}
          <div className="flex-1 mb-4">
            <h3 className="text-xl font-semibold text-white leading-tight line-clamp-3 mb-3">
              {post.title}
            </h3>
            
            {/* Post excerpt */}
            <p className="text-white/70 text-sm leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
          </div>
          
          {/* Footer with tags and external link */}
          <div className="space-y-3">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span 
                  key={tag}
                  className="glass-pill"
                >
                  <div className="glass-enhanced px-2 py-1 text-xs text-white/70 rounded-full">
                    {tag}
                  </div>
                </span>
              ))}
            </div>
            
            {/* External link button with glass styling */}
            <div className="flex items-center justify-between">
              <span className="text-white/50 text-xs">
                {post.publishDate.toLocaleDateString('en-US', { 
                  month: 'short', 
                  day: 'numeric', 
                  year: 'numeric' 
                })}
              </span>
              
              <div 
                className={`
                  glass-button-primary px-3 py-2 rounded-lg
                  flex items-center space-x-2 text-sm font-medium
                  transition-all duration-250 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
                  ${isHovered ? 'transform -translate-y-0.5' : ''}
                `}
              >
                <span>Read More</span>
                <ArrowTopRightOnSquareIcon className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Glass reflection effect on hover */}
        <div 
          className={`
            absolute inset-0 pointer-events-none rounded-2xl
            bg-gradient-to-r from-transparent via-white/10 to-transparent
            transform -translate-x-full transition-transform duration-600 ease-out
            ${isHovered ? 'translate-x-full' : ''}
          `}
        />
      </div>
    </motion.article>
  );
};

/**
 * Main featured posts gallery component
 */
export const FeaturedPostsGallery: React.FC<FeaturedPostsGalleryProps> = ({ 
  className = '' 
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { 
    once: true, 
    margin: "-100px 0px" 
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1
    }
  };

  const containerTransition = {
    duration: 0.6,
    staggerChildren: 0.1,
    ease: [0.25, 0.46, 0.45, 0.94] as const
  };

  const headerVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      filter: 'blur(10px)'
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: 'blur(0px)'
    }
  };

  const headerTransition = {
    duration: 0.8,
    ease: [0.175, 0.885, 0.32, 1.275] as const
  };

  return (
    <section 
      ref={sectionRef}
      className={`relative py-20 px-8 ${className}`}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={containerTransition}
        className="max-w-7xl mx-auto"
      >
        {/* Section header */}
        <motion.div 
          variants={headerVariants}
          transition={headerTransition}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            <span className="glass-text-morph">Featured Posts</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Insights and tutorials on modern web development, sharing knowledge 
            through practical examples and best practices.
          </p>
        </motion.div>

        {/* Masonry-style gallery grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-max">
          {featuredPosts.map((post, index) => (
            <GlassPostCard
              key={post.id}
              post={post}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>

        {/* View all posts link */}
        <motion.div
          variants={headerVariants}
          transition={headerTransition}
          className="text-center mt-16"
        >
          <button 
            className="glass-magnetic-button px-8 py-4 text-lg font-medium text-white/90 rounded-2xl"
            onClick={() => window.open('https://medium.com/@deepakkumar', '_blank', 'noopener,noreferrer')}
          >
            <span className="flex items-center space-x-3">
              <span>View All Posts</span>
              <ArrowTopRightOnSquareIcon className="w-5 h-5" />
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating glass elements */}
        <div className="glass-float-element w-32 h-32 absolute top-20 left-10 animate-float opacity-20" />
        <div className="glass-float-element w-24 h-24 absolute bottom-32 right-16 animate-float opacity-15" 
             style={{ animationDelay: '2s' }} />
        <div className="glass-float-element w-20 h-20 absolute top-1/2 right-1/4 animate-float opacity-10" 
             style={{ animationDelay: '4s' }} />
      </div>
    </section>
  );
};

export default FeaturedPostsGallery;