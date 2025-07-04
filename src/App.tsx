import React from 'react';
import { CartProvider } from './contexts/CartContext';
import CartTable from './components/CartTable';
import CartDemo from './components/CartDemo';
import './index.css';

const App: React.FC = () => {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                BoksNBeef Shopping Cart
              </h1>
              <p className="mt-2 text-gray-600">
                Manage your cattle and beef product selections
              </p>
            </div>
            
            <CartDemo />
            <CartTable />
          </div>
        </div>
      </div>
    </CartProvider>
  );
};

export default App; 