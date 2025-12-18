/**
 * Farmer Game - Main App Component
 * React Router setup with lazy-loaded pages and error boundaries
 */

import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import Loading from '@/components/ui/Loading';

// Lazy load pages for code splitting
const Landing = lazy(() => import('@/pages/Landing'));
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Game = lazy(() => import('@/pages/Game'));
const Leaderboard = lazy(() => import('@/pages/Leaderboard'));

/**
 * Error Boundary Component
 */
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error boundary caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
            <div className="text-6xl mb-4">😕</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Oops! Something went wrong
            </h1>
            <p className="text-gray-600 mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Loading Fallback Component
 */
const LoadingFallback: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-orange-50 to-white">
    <Loading fullScreen text="Loading..." />
  </div>
);

/**
 * Main App Component
 */
function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Suspense fallback={<LoadingFallback />}>
          <Routes>
            {/* Landing Page - No Layout */}
            <Route path="/" element={<Landing />} />

            {/* Pages with Layout */}
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/game" element={<Game />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Route>

            {/* Catch-all redirect */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
