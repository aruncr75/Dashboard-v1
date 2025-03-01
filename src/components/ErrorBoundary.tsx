import React, { Component, ReactNode } from "react";

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("Unhandled error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div className="p-4 text-center">Something went wrong.</div>;
    }

    return this.props.children;
  }
}
