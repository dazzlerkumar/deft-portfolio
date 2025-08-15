/**
 * Enhanced Glass Demo Component
 * Demonstration of enhanced glass morphism components with liquid effects
 */

'use client';

import React, { useState } from 'react';
import { Glass, GlassPanel, GlassButton, GlassCard, GlassInput } from './index';

export function GlassDemo() {
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const handleButtonClick = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-emerald-900 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-white text-center mb-12 glass-shimmer">
          Enhanced Glass Morphism Components
        </h1>
        
        {/* Enhanced Glass Panels with configurable opacity and blur */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassPanel 
            variant="subtle" 
            padding="lg" 
            innerGlow 
            opacity={0.06}
            blur={15}
            morphing
            className="glass-transition-spring"
          >
            <h3 className="text-white font-semibold mb-2">Configurable Glass</h3>
            <p className="text-white/70">Custom opacity (0.06) and blur (15px)</p>
          </GlassPanel>
          
          <GlassPanel 
            variant="medium" 
            padding="lg" 
            floating 
            opacity={0.12}
            blur={25}
            morphing
          >
            <h3 className="text-white font-semibold mb-2">Enhanced Medium</h3>
            <p className="text-white/70">Higher opacity with morphing effects</p>
          </GlassPanel>
          
          <GlassPanel 
            variant="heavy" 
            padding="lg"
            opacity={0.18}
            blur={35}
            morphing
          >
            <h3 className="text-white font-semibold mb-2">Heavy Glass</h3>
            <p className="text-white/70">Maximum opacity and blur</p>
          </GlassPanel>
        </div>
        
        {/* Enhanced Glass Cards with hover morphing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard
            variant="card"
            theme="blue"
            clickable
            hoverLift
            morphing
            morphIntensity="medium"
            onHover={(isHovered) => console.log('Card hovered:', isHovered)}
            onClick={() => setSelectedCard('blue')}
            header={<h3 className="text-xl font-semibold text-blue-200">Morphing Blue Card</h3>}
            footer={
              <GlassButton 
                size="sm" 
                buttonVariant="primary" 
                liquid
                liquidIntensity="medium"
              >
                Learn More
              </GlassButton>
            }
            className={selectedCard === 'blue' ? 'ring-2 ring-blue-500/50' : ''}
          >
            <p className="text-white/80">
              Enhanced card with medium morphing intensity and liquid button.
            </p>
          </GlassCard>
          
          <GlassCard
            variant="card"
            theme="emerald"
            clickable
            morphing
            morphIntensity="strong"
            onClick={() => setSelectedCard('emerald')}
            header={<h3 className="text-xl font-semibold text-emerald-200">Strong Morphing</h3>}
            className={selectedCard === 'emerald' ? 'ring-2 ring-emerald-500/50' : ''}
          >
            <p className="text-white/80">
              This card uses strong morphing intensity for dramatic effects.
            </p>
          </GlassCard>
        </div>
        
        {/* Enhanced Glass Buttons with liquid effects */}
        <GlassPanel variant="navigation" padding="lg">
          <h3 className="text-white font-semibold mb-4">Liquid Glass Buttons</h3>
          <div className="flex flex-wrap gap-4">
            <GlassButton
              buttonVariant="primary"
              size="md"
              loading={isLoading}
              liquid
              liquidIntensity="subtle"
              onClick={handleButtonClick}
            >
              Subtle Liquid
            </GlassButton>
            
            <GlassButton 
              buttonVariant="secondary" 
              size="md"
              liquid
              liquidIntensity="medium"
            >
              Medium Liquid
            </GlassButton>
            
            <GlassButton 
              buttonVariant="accent" 
              size="md"
              liquid
              liquidIntensity="strong"
            >
              Strong Liquid
            </GlassButton>
            
            <GlassButton 
              buttonVariant="ghost" 
              size="md"
              liquid={false}
            >
              No Liquid
            </GlassButton>
          </div>
        </GlassPanel>
        
        {/* Enhanced Glass Inputs with floating labels */}
        <GlassPanel variant="card" padding="lg">
          <h3 className="text-white font-semibold mb-4">Enhanced Glass Form Elements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GlassInput
              label="Email Address"
              type="email"
              placeholder="Enter your email"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              floatingLabel
              labelAnimation="smooth"
              required
            />
            
            <GlassInput
              label="Password"
              type="password"
              placeholder="Enter password"
              floatingLabel
              labelAnimation="spring"
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              }
            />
            
            <GlassInput
              label="Search"
              type="search"
              placeholder="Search..."
              floatingLabel
              labelAnimation="bounce"
              iconAfter={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              }
            />
            
            <GlassInput
              label="Phone Number"
              type="tel"
              placeholder="+1 (555) 000-0000"
              floatingLabel={false}
              helperText="We'll never share your phone number"
            />
          </div>
        </GlassPanel>

        {/* Cubic-Bezier Animation Showcase */}
        <GlassPanel variant="card" padding="lg">
          <h3 className="text-white font-semibold mb-4">Cubic-Bezier Easing Curves</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Glass 
              variant="accent" 
              theme="blue"
              className="p-4 text-center glass-transition-smooth hover:scale-105"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full mx-auto mb-2"></div>
              <p className="text-white/80 text-sm">Smooth</p>
            </Glass>
            
            <Glass 
              variant="accent" 
              theme="emerald"
              className="p-4 text-center glass-transition-spring hover:scale-105"
            >
              <div className="w-8 h-8 bg-emerald-500 rounded-full mx-auto mb-2"></div>
              <p className="text-white/80 text-sm">Spring</p>
            </Glass>
            
            <Glass 
              variant="accent" 
              theme="purple"
              className="p-4 text-center glass-transition-bounce hover:scale-105"
            >
              <div className="w-8 h-8 bg-purple-500 rounded-full mx-auto mb-2"></div>
              <p className="text-white/80 text-sm">Bounce</p>
            </Glass>
            
            <Glass 
              variant="accent" 
              theme="rose"
              className="p-4 text-center glass-transition-elastic hover:scale-105"
            >
              <div className="w-8 h-8 bg-rose-500 rounded-full mx-auto mb-2"></div>
              <p className="text-white/80 text-sm">Elastic</p>
            </Glass>
          </div>
        </GlassPanel>

        {/* Glass Variants with Enhanced Effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Glass variant="subtle" className="p-6 glass-morph-liquid">
            <h4 className="text-lg font-medium text-white mb-2">Liquid Morph</h4>
            <p className="text-white/70 text-sm">Continuous morphing animation</p>
          </Glass>
          
          <Glass variant="medium" className="p-6 glass-shimmer">
            <h4 className="text-lg font-medium text-white mb-2">Shimmer Effect</h4>
            <p className="text-white/70 text-sm">Subtle shimmer animation</p>
          </Glass>
          
          <Glass 
            variant="heavy" 
            className="p-6 glass-morph-bounce cursor-pointer"
            onClick={(e) => {
              const element = e.currentTarget as HTMLElement;
              element.style.animation = 'none';
              setTimeout(() => {
                element.style.animation = 'glassMorphBounce 1s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
              }, 10);
            }}
          >
            <h4 className="text-lg font-medium text-white mb-2">Bounce Morph</h4>
            <p className="text-white/70 text-sm">Click to trigger bounce</p>
          </Glass>
        </div>
      </div>
    </div>
  );
}

export default GlassDemo;