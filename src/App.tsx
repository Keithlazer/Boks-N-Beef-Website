import React, { Suspense, lazy } from 'react';
import { CartProvider } from './contexts/CartContext';
import { ErrorBoundary } from './components/SharedComponents';
import './index.css';

const HeroSection = lazy(() => import('./components/HeroSection'));
const CartDemo = lazy(() => import('./components/CartDemo'));
const CartTable = lazy(() => import('./components/CartTable'));

const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <CartProvider>
        <div className="min-h-screen bg-gray-50">
          {/* Enhanced Hero Section */}
          <Suspense fallback={<div>Loading hero...</div>}>
            <HeroSection season="summer" />
          </Suspense>
          
          {/* Main Content */}
          <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
            <div className="px-4 py-6 sm:px-0">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 font-ranch">
                  Shopping Cart
                </h2>
                <p className="mt-2 text-gray-600 font-ui">
                  Manage your cattle and beef product selections
                </p>
              </div>
              <Suspense fallback={<div>Loading cart demo...</div>}>
                <CartDemo />
              </Suspense>
              <Suspense fallback={<div>Loading cart table...</div>}>
                <CartTable />
              </Suspense>
            </div>
          </div>
        </div>
      </CartProvider>
    </ErrorBoundary>
  );
};

export default App; 