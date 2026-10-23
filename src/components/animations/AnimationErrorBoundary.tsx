'use client';

import { Component, ReactNode, ErrorInfo } from 'react';

/**
 * AnimationErrorBoundary Component
 * 
 * A reusable error boundary that catches React errors that occur in child components,
 * particularly useful for catching animation-related failures from GSAP and other
 * animation libraries.
 * 
 * Features:
 * - Catches React errors during rendering
 * - Displays a graceful fallback UI when errors occur
 * - Allows the rest of the page to continue functioning
 * - Logs errors for debugging purposes
 * - Supports custom fallback content
 * - Provides a reset capability for recovery
 * 
 * Usage:
 * ```tsx
 * <AnimationErrorBoundary>
 *   <YourAnimatedComponent />
 * </AnimationErrorBoundary>
 * ```
 * 
 * Requirements: 1.5
 */

interface AnimationErrorBoundaryProps {
  /** The child components to wrap with error boundary */
  children: ReactNode;
  /** Optional custom fallback UI to display when an error occurs */
  fallback?: ReactNode;
  /** Optional callback fired when an error is caught */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  /** Optional unique identifier for this boundary instance */
  boundaryId?: string;
}

interface AnimationErrorBoundaryState {
  /** Whether an error has been caught */
  hasError: boolean;
  /** The error that was caught */
  error?: Error;
  /** Error info from React */
  errorInfo?: ErrorInfo;
}

/**
 * Default fallback UI component displayed when animation fails
 */
function DefaultFallback() {
  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
      <p className="text-sm text-gray-600">
        Some content could not be displayed. The page will continue functioning.
      </p>
    </div>
  );
}

export class AnimationErrorBoundary extends Component<
  AnimationErrorBoundaryProps,
  AnimationErrorBoundaryState
> {
  constructor(props: AnimationErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: undefined,
      errorInfo: undefined,
    };
  }

  /**
   * Static method called by React when a child component throws an error
   * This allows the error boundary to catch the error and update state
   */
  static getDerivedStateFromError(error: Error): AnimationErrorBoundaryState {
    return {
      hasError: true,
      error,
    };
  }

  /**
   * Lifecycle method called after an error has been caught
   * Used for side effects like logging errors
   */
  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error for debugging purposes
    console.error(
      `%c[AnimationErrorBoundary] Caught error:`,
      'color: #FF6900; font-weight: bold;',
      error
    );
    console.error(
      `%c[AnimationErrorBoundary] Error info:`,
      'color: #FF6900; font-weight: bold;',
      errorInfo
    );

    // Update state with error info
    this.setState({
      error,
      errorInfo,
    });

    // Call optional onError callback if provided
    this.props.onError?.(error, errorInfo);

    // Optionally report to error reporting service
    // Example: Sentry, Bugsnag, etc.
    // if (typeof window !== 'undefined' && window.location.hostname !== 'localhost') {
    //   fetch('/api/error-reporting', {
    //     method: 'POST',
    //     body: JSON.stringify({ error: error.message, stack: error.stack }),
    //   });
    // }
  }

  /**
   * Method to reset the error boundary and attempt to recover
   * Useful for retrying the operation that failed
   */
  resetBoundary = (): void => {
    this.setState({
      hasError: false,
      error: undefined,
      errorInfo: undefined,
    });
  };

  /**
   * Render method
   * Displays fallback UI when error exists, otherwise renders children
   */
  render(): ReactNode {
    // If an error has been caught, display the fallback
    if (this.state.hasError) {
      // If a custom fallback is provided, use it
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Otherwise, use the default fallback
      return <DefaultFallback />;
    }

    // No error, render children normally
    return this.props.children;
  }
}

/**
 * Higher-order component wrapper for easy use with functional components
 * 
 * Usage:
 * ```tsx
 * const AnimatedSection = withAnimationErrorBoundary(MyAnimatedComponent);
 * ```
 */
export function withAnimationErrorBoundary<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  fallback?: ReactNode,
  onError?: (error: Error, errorInfo: ErrorInfo) => void
) {
  return function WithAnimationErrorBoundary(props: P) {
    return (
      <AnimationErrorBoundary fallback={fallback} onError={onError}>
        <WrappedComponent {...props} />
      </AnimationErrorBoundary>
    );
  };
}

export default AnimationErrorBoundary;