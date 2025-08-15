/**
 * ContactSection Component
 * Glass morphism contact section with forms, social links, and availability status
 */

'use client';

import React, { useState } from 'react';
import Glass from './glass/Glass';
import GlassInput from './glass/GlassInput';
import GlassButton from './glass/GlassButton';
import { contactInfo } from '@/data/portfolio';

// Icons for social platforms and contact
const SocialIcon = ({ platform }: { platform: string }) => {
  const iconMap: Record<string, React.ReactElement> = {
    github: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    linkedin: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    medium: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
      </svg>
    ),
    twitter: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>
    ),
    user: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    email: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    location: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    clock: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )
  };
  
  return iconMap[platform] || null;
};

// Availability status indicator
const AvailabilityStatus = () => {
  const { availability } = contactInfo;
  
  const statusConfig = {
    available: {
      color: 'emerald',
      bgColor: 'bg-emerald-500/20',
      borderColor: 'border-emerald-500/30',
      textColor: 'text-emerald-400',
      dotColor: 'bg-emerald-500',
      label: 'Available'
    },
    busy: {
      color: 'amber',
      bgColor: 'bg-amber-500/20',
      borderColor: 'border-amber-500/30',
      textColor: 'text-amber-400',
      dotColor: 'bg-amber-500',
      label: 'Busy'
    },
    unavailable: {
      color: 'red',
      bgColor: 'bg-red-500/20',
      borderColor: 'border-red-500/30',
      textColor: 'text-red-400',
      dotColor: 'bg-red-500',
      label: 'Unavailable'
    }
  };
  
  const config = statusConfig[availability.status as keyof typeof statusConfig];
  
  return (
    <Glass
      variant="card"
      className={`inline-flex items-center gap-3 px-4 py-3 ${config.bgColor} ${config.borderColor} border`}
    >
      <div className="relative">
        <div className={`w-3 h-3 rounded-full ${config.dotColor}`} />
        <div className={`absolute inset-0 w-3 h-3 rounded-full ${config.dotColor} animate-ping opacity-75`} />
      </div>
      <div>
        <div className={`text-sm font-medium ${config.textColor}`}>
          {config.label}
        </div>
        <div className="text-xs text-white/60">
          {availability.message}
        </div>
      </div>
    </Glass>
  );
};

// Social link pill component
const SocialPill = ({ social }: { social: typeof contactInfo.social[0] }) => {
  return (
    <Glass
      as="a"
      variant="button"
      theme="default"
      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white/80 hover:text-white transition-colors duration-200 group"
      enableHover
      {...{ href: social.url, target: "_blank", rel: "noopener noreferrer" }}
    >
      <SocialIcon platform={social.platform.toLowerCase()} />
      <span>{social.platform}</span>
      <svg 
        className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </Glass>
  );
};

// Main contact section component
const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-6 py-20">
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Get In Touch
        </h2>
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          Ready to collaborate on your next project? Let&apos;s create something amazing together.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Contact Form - Large Glass Panel */}
        <Glass
          variant="card"
          className="p-8 space-y-6"
        >
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-white mb-2">
              Send a Message
            </h3>
            <p className="text-white/60">
              Fill out the form below and I&apos;ll get back to you within 24 hours.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <GlassInput
                label="Your Name"
                type="text"
                value={formData.name}
                onChange={handleInputChange('name')}
                required
                icon={<SocialIcon platform="user" />}
                placeholder="John Doe"
              />
              <GlassInput
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleInputChange('email')}
                required
                icon={<SocialIcon platform="email" />}
                placeholder="john@example.com"
              />
            </div>
            
            <GlassInput
              label="Subject"
              type="text"
              value={formData.subject}
              onChange={handleInputChange('subject')}
              required
              placeholder="Project collaboration"
            />
            
            <div className="relative">
              <Glass
                variant="input"
                className="p-4"
              >
                <textarea
                  value={formData.message}
                  onChange={handleInputChange('message')}
                  placeholder="Tell me about your project..."
                  required
                  rows={6}
                  className="w-full bg-transparent border-none outline-none text-white placeholder-white/50 resize-none"
                />
                <label className="absolute top-2 left-4 text-xs text-white/60">
                  Message *
                </label>
              </Glass>
            </div>

            {/* Submit Status */}
            {submitStatus !== 'idle' && (
              <Glass
                variant="card"
                className={`p-4 ${
                  submitStatus === 'success' 
                    ? 'bg-emerald-500/20 border-emerald-500/30' 
                    : 'bg-red-500/20 border-red-500/30'
                } border`}
              >
                <div className={`text-sm ${
                  submitStatus === 'success' ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {submitStatus === 'success' 
                    ? '✓ Message sent successfully! I&apos;ll get back to you soon.' 
                    : '✗ Failed to send message. Please try again.'}
                </div>
              </Glass>
            )}

            <GlassButton
              type="submit"
              buttonVariant="primary"
              size="lg"
              loading={isSubmitting}
              disabled={isSubmitting}
              className="w-full"
              liquid
              liquidIntensity="medium"
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </GlassButton>
          </form>
        </Glass>

        {/* Contact Information */}
        <div className="space-y-8">
          {/* Availability Status */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Current Status
            </h3>
            <AvailabilityStatus />
          </div>

          {/* Contact Details */}
          <Glass
            variant="card"
            className="p-6 space-y-4"
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              Contact Information
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/70">
                <SocialIcon platform="email" />
                <span>{contactInfo.email}</span>
              </div>
              
              <div className="flex items-center gap-3 text-white/70">
                <SocialIcon platform="location" />
                <span>{contactInfo.location.city}, {contactInfo.location.country}</span>
              </div>
              
              <div className="flex items-center gap-3 text-white/70">
                <SocialIcon platform="clock" />
                <span>Response time: {contactInfo.availability.responseTime}</span>
              </div>
            </div>
          </Glass>

          {/* Social Links */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Connect With Me
            </h3>
            <div className="flex flex-wrap gap-3">
              {contactInfo.social
                .filter(social => social.primary)
                .map((social) => (
                  <SocialPill key={social.platform} social={social} />
                ))}
            </div>
          </div>

          {/* Location with Glass Map Overlay */}
          <Glass
            variant="card"
            className="p-6 relative overflow-hidden"
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              Location
            </h3>
            
            {/* Subtle glass map overlay effect */}
            <div className="relative h-32 bg-gradient-to-br from-blue-500/20 to-emerald-500/20 rounded-lg overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <SocialIcon platform="location" />
                  <div className="text-sm text-white/70 mt-2">
                    {contactInfo.location.city}, {contactInfo.location.country}
                  </div>
                  <div className="text-xs text-white/50 mt-1">
                    {contactInfo.location.timezone}
                  </div>
                </div>
              </div>
              
              {/* Animated location pulse */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-ping opacity-75" />
                <div className="absolute inset-0 w-3 h-3 bg-blue-500 rounded-full" />
              </div>
            </div>
          </Glass>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;