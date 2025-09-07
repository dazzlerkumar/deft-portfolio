"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactForm {
  name: string;
  email: string;
  company: string;
  message: string;
  contactReason: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export function ContactMissionControl() {
  const [formData, setFormData] = useState<ContactForm>({
    name: "",
    email: "",
    company: "",
    message: "",
    contactReason: "collaboration"
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [missionStatus, setMissionStatus] = useState("standby");

  const contactReasons = [
    { value: "collaboration", label: "🤝 Collaboration Opportunity" },
    { value: "hiring", label: "💼 Hiring Discussion" },
    { value: "consulting", label: "🎯 Consulting Project" },
    { value: "speaking", label: "🎤 Speaking Engagement" },
    { value: "networking", label: "🌐 Professional Networking" },
    { value: "other", label: "💬 General Inquiry" }
  ];

  const socialLinks = [
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/yourprofile",
      icon: "💼",
      description: "Professional network"
    },
    {
      name: "GitHub",
      url: "https://github.com/yourprofile",
      icon: "🐙",
      description: "Code repositories"
    },
    {
      name: "Twitter",
      url: "https://twitter.com/yourhandle",
      icon: "🐦",
      description: "Tech thoughts & updates"
    },
    {
      name: "Email",
      url: "mailto:your.email@example.com",
      icon: "📧",
      description: "Direct communication"
    }
  ];

  useEffect(() => {
    if (formData.name || formData.email || formData.message) {
      setMissionStatus("active");
    } else {
      setMissionStatus("standby");
    }
  }, [formData]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Mission commander name required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Communication channel required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid communication frequency";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Mission briefing required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Mission briefing too brief (minimum 10 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setMissionStatus("error");
      return;
    }

    setIsSubmitting(true);
    setMissionStatus("launching");

    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the form data to your backend
      console.log("Form submitted:", formData);
      
      setIsSubmitted(true);
      setMissionStatus("success");
    } catch (error) {
      setMissionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof ContactForm, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  const getMissionStatusColor = () => {
    switch (missionStatus) {
      case "standby": return "text-chapter4-secondary/60";
      case "active": return "text-chapter4-accent";
      case "launching": return "text-yellow-400";
      case "success": return "text-green-400";
      case "error": return "text-red-400";
      default: return "text-chapter4-secondary/60";
    }
  };

  const getMissionStatusText = () => {
    switch (missionStatus) {
      case "standby": return "MISSION CONTROL - STANDBY";
      case "active": return "MISSION CONTROL - ACTIVE";
      case "launching": return "LAUNCHING COMMUNICATION...";
      case "success": return "MISSION SUCCESS - MESSAGE SENT";
      case "error": return "MISSION ERROR - RETRY REQUIRED";
      default: return "MISSION CONTROL - STANDBY";
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl mx-auto text-center"
      >
        <motion.div
          className="bg-chapter4-primary/50 backdrop-blur-sm border border-green-400/50 rounded-xl p-8"
          animate={{
            boxShadow: [
              "0 0 20px rgba(34, 197, 94, 0.3)",
              "0 0 40px rgba(34, 197, 94, 0.5)",
              "0 0 20px rgba(34, 197, 94, 0.3)"
            ]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="text-6xl mb-6"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, ease: "easeInOut" }}
          >
            🚀
          </motion.div>
          
          <h3 className="text-3xl font-bold text-green-400 mb-4">
            Mission Successful!
          </h3>
          
          <p className="text-lg text-chapter4-secondary/90 mb-6">
            Your message has been transmitted successfully. I'll respond within 24-48 hours.
          </p>
          
          <p className="text-chapter4-secondary/70">
            Thank you for reaching out, {formData.name}!
          </p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Mission Control Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <motion.div
          className={`inline-block px-6 py-2 bg-chapter4-primary/50 backdrop-blur-sm border border-chapter4-accent/30 rounded-full mb-6 ${getMissionStatusColor()}`}
          animate={{
            borderColor: missionStatus === "active" ? "rgba(14, 165, 233, 0.6)" : "rgba(14, 165, 233, 0.3)"
          }}
        >
          <span className="font-mono text-sm font-semibold">
            {getMissionStatusText()}
          </span>
        </motion.div>
        
        <h3 className="text-3xl font-bold text-chapter4-secondary mb-4">
          Mission Control Interface
        </h3>
        <p className="text-lg text-chapter4-secondary/80">
          Ready to start a conversation? Let's make something amazing together.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-chapter4-primary/30 backdrop-blur-sm border border-chapter4-accent/30 rounded-xl p-8"
        >
          <h4 className="text-2xl font-bold text-chapter4-secondary mb-6">
            Mission Briefing
          </h4>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Contact Reason */}
            <div>
              <label className="block text-sm font-semibold text-chapter4-secondary mb-3">
                Mission Type
              </label>
              <div className="grid grid-cols-2 gap-2">
                {contactReasons.map((reason) => (
                  <motion.button
                    key={reason.value}
                    type="button"
                    onClick={() => handleInputChange("contactReason", reason.value)}
                    className={`p-3 text-left rounded-lg border transition-all duration-200 ${
                      formData.contactReason === reason.value
                        ? "border-chapter4-accent bg-chapter4-accent/20 text-chapter4-secondary"
                        : "border-chapter4-accent/30 bg-chapter4-primary/20 text-chapter4-secondary/70 hover:border-chapter4-accent/50"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="text-sm">{reason.label}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-chapter4-secondary mb-2">
                Mission Commander
              </label>
              <input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className={`w-full px-4 py-3 bg-chapter4-primary/50 border rounded-lg text-chapter4-secondary placeholder-chapter4-secondary/50 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.name
                    ? "border-red-400 focus:ring-red-400/50"
                    : "border-chapter4-accent/30 focus:border-chapter4-accent focus:ring-chapter4-accent/50"
                }`}
                placeholder="Your name"
              />
              <AnimatePresence>
                {errors.name && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-400 text-sm mt-1"
                  >
                    {errors.name}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-chapter4-secondary mb-2">
                Communication Channel
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className={`w-full px-4 py-3 bg-chapter4-primary/50 border rounded-lg text-chapter4-secondary placeholder-chapter4-secondary/50 focus:outline-none focus:ring-2 transition-all duration-200 ${
                  errors.email
                    ? "border-red-400 focus:ring-red-400/50"
                    : "border-chapter4-accent/30 focus:border-chapter4-accent focus:ring-chapter4-accent/50"
                }`}
                placeholder="your.email@example.com"
              />
              <AnimatePresence>
                {errors.email && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-400 text-sm mt-1"
                  >
                    {errors.email}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Company */}
            <div>
              <label htmlFor="company" className="block text-sm font-semibold text-chapter4-secondary mb-2">
                Organization (Optional)
              </label>
              <input
                id="company"
                type="text"
                value={formData.company}
                onChange={(e) => handleInputChange("company", e.target.value)}
                className="w-full px-4 py-3 bg-chapter4-primary/50 border border-chapter4-accent/30 rounded-lg text-chapter4-secondary placeholder-chapter4-secondary/50 focus:outline-none focus:border-chapter4-accent focus:ring-2 focus:ring-chapter4-accent/50 transition-all duration-200"
                placeholder="Your company or organization"
              />
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className="block text-sm font-semibold text-chapter4-secondary mb-2">
                Mission Details
              </label>
              <textarea
                id="message"
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                rows={5}
                className={`w-full px-4 py-3 bg-chapter4-primary/50 border rounded-lg text-chapter4-secondary placeholder-chapter4-secondary/50 focus:outline-none focus:ring-2 transition-all duration-200 resize-none ${
                  errors.message
                    ? "border-red-400 focus:ring-red-400/50"
                    : "border-chapter4-accent/30 focus:border-chapter4-accent focus:ring-chapter4-accent/50"
                }`}
                placeholder="Tell me about your project, ideas, or how we might work together..."
              />
              <AnimatePresence>
                {errors.message && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-red-400 text-sm mt-1"
                  >
                    {errors.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-chapter4-accent to-chapter4-secondary text-chapter4-primary px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              whileHover={{ boxShadow: "0 0 25px rgba(14, 165, 233, 0.4)" }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center space-x-2">
                  <motion.div
                    className="w-5 h-5 border-2 border-chapter4-primary border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span>Launching...</span>
                </span>
              ) : (
                "🚀 Launch Communication"
              )}
            </motion.button>
          </form>
        </motion.div>

        {/* Alternative Contact Methods */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-8"
        >
          <div>
            <h4 className="text-2xl font-bold text-chapter4-secondary mb-6">
              Alternative Channels
            </h4>
            <p className="text-chapter4-secondary/80 mb-8">
              Prefer a different communication method? Connect with me through these channels:
            </p>

            <div className="space-y-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-chapter4-primary/30 backdrop-blur-sm border border-chapter4-accent/30 rounded-lg p-4 hover:border-chapter4-accent/60 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 0 20px rgba(14, 165, 233, 0.2)"
                  }}
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-2xl">{link.icon}</span>
                    <div>
                      <h5 className="font-semibold text-chapter4-secondary">
                        {link.name}
                      </h5>
                      <p className="text-sm text-chapter4-secondary/70">
                        {link.description}
                      </p>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Response Time Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="bg-chapter4-primary/20 backdrop-blur-sm border border-chapter4-accent/20 rounded-lg p-6"
          >
            <h5 className="font-semibold text-chapter4-secondary mb-3">
              📡 Response Protocol
            </h5>
            <ul className="text-sm text-chapter4-secondary/80 space-y-2">
              <li>• Mission briefings reviewed within 24 hours</li>
              <li>• Detailed responses within 48 hours</li>
              <li>• Urgent communications flagged for priority</li>
              <li>• All transmissions encrypted and secure</li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}