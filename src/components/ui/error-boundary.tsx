"use client";

import React, { Component, ReactNode } from "react";
import { motion } from "framer-motion";

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: any;
  retryCount: number;
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: any) => void;
  maxRetries?: number;
  level?: "page" | "chapter" | "component";
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  private retryTimeoutId: NodeJS.Timeout | null = null;

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { 
      hasError: false, 
      retryCount: 0 
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    
    this.setState({ errorInfo });
    
    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);

    // Log to analytics/monitoring service
    if (typeof window !== 'undefined') {
      // In a real app, you'd send this to your error tracking service
      console.log('Error logged for monitoring:', {
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
        level: this.props.level || 'component',
        retryCount: this.state.retryCount
      });
    }
  }

  componentWillUnmount() {
    if (this.retryTimeoutId) {
      clearTimeout(this.retryTimeoutId);
    }
  }

  handleRetry = () => {
    const maxRetries = this.props.maxRetries || 3;
    
    if (this.state.retryCount < maxRetries) {
      this.setState(prevState => ({
        hasError: false,
        error: undefined,
        errorInfo: undefined,
        retryCount: prevState.retryCount + 1
      }));
    }
  };

  handleAutoRetry = () => {
    this.retryTimeoutId = setTimeout(() => {
      this.handleRetry();
    }, 2000);
  };

  handleRefresh = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const { level = 'component' } = this.props;
      const maxRetries = this.props.maxRetries || 3;
      const canRetry = this.state.retryCount < maxRetries;

      // Different error UIs based on error level
      if (level === 'page') {
        return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-lg mx-auto px-6"
            >
              <motion.div
                animate={{ 
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                className="text-8xl mb-6"
              >
                📖💥
              </motion.div>
              
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Story Interrupted
              </h1>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our storytelling engine encountered an unexpected plot twist. 
                Don't worry - every good story has its challenges!
              </p>

              <div className="space-y-4">
                {canRetry && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={this.handleRetry}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors mr-4"
                  >
                    Continue Story ({maxRetries - this.state.retryCount} attempts left)
                  </motion.button>
                )}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={this.handleGoHome}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Start Over
                </motion.button>
              </div>

              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-8 text-left bg-gray-100 p-4 rounded-lg">
                  <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                    Error Details (Development)
                  </summary>
                  <pre className="text-xs text-red-600 overflow-auto">
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
            </motion.div>
          </div>
        );
      }

      if (level === 'chapter') {
        return (
          <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-red-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-center max-w-md mx-auto px-6"
            >
              <div className="text-6xl mb-4">📄⚠️</div>
              
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Chapter Loading Error
              </h2>
              
              <p className="text-gray-600 mb-6">
                This chapter seems to have some missing pages. Let's try to recover the story.
              </p>

              <div className="space-y-3">
                {canRetry && (
                  <button
                    onClick={this.handleRetry}
                    className="block w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    Retry Chapter ({maxRetries - this.state.retryCount} left)
                  </button>
                )}
                
                <button
                  onClick={this.handleGoHome}
                  className="block w-full bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Return to Beginning
                </button>
              </div>
            </motion.div>
          </div>
        );
      }

      // Component-level error (default)
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-50 border border-red-200 rounded-lg p-6 m-4"
        >
          <div className="flex items-start space-x-3">
            <div className="text-2xl">⚠️</div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-red-800 mb-2">
                Component Error
              </h3>
              <p className="text-red-600 text-sm mb-4">
                A component in this section failed to load properly.
              </p>
              
              {canRetry && (
                <button
                  onClick={this.handleRetry}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded text-sm transition-colors"
                >
                  Retry ({maxRetries - this.state.retryCount} left)
                </button>
              )}
            </div>
          </div>
        </motion.div>
      );
    }

    return this.props.children;
  }
}

// Convenience wrapper for chapter-level errors
export function ChapterErrorBoundary({ children, chapterNumber }: { 
  children: ReactNode; 
  chapterNumber?: number;
}) {
  return (
    <ErrorBoundary 
      level="chapter"
      maxRetries={2}
      onError={(error, errorInfo) => {
        console.log(`Chapter ${chapterNumber} error:`, error.message);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}

// Convenience wrapper for page-level errors
export function PageErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary 
      level="page"
      maxRetries={1}
      onError={(error, errorInfo) => {
        console.log('Page-level error:', error.message);
      }}
    >
      {children}
    </ErrorBoundary>
  );
}