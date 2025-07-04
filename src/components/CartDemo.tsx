import React from 'react';
import { useCart } from '../contexts/CartContext';
import { CartItem } from '../types/cart';

const CartDemo: React.FC = () => {
  const { addItem } = useCart();

  const sampleItems: CartItem[] = [
    {
      id: '1',
      name: 'Brahman Bull',
      price: 2500.00,
      quantity: 1,
      category: 'cattle',
      image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: '2',
      name: 'Dry-Aged Ribeye',
      price: 42.99,
      quantity: 1,
      category: 'beef',
      image: 'https://images.unsplash.com/photo-1558036118-5c9d6205a8fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: '3',
      name: 'Angus Heifer',
      price: 1800.00,
      quantity: 1,
      category: 'cattle',
      image: 'https://images.unsplash.com/photo-1552767059-ce182ead6c1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    },
    {
      id: '4',
      name: 'Beef Tenderloin',
      price: 49.99,
      quantity: 1,
      category: 'beef',
      image: 'https://images.unsplash.com/photo-1603366615917-1fa6dad5c4fa?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80'
    }
  ];

  const handleAddItem = (item: CartItem) => {
    addItem(item);
  };

  return (
    <div className="bg-white shadow sm:rounded-lg mb-8">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Add Sample Items to Cart
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sampleItems.map((item) => (
            <div key={item.id} className="border border-gray-200 rounded-lg p-4">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded-md mb-3"
                />
              )}
              <h4 className="font-medium text-gray-900 mb-1">{item.name}</h4>
              <p className="text-sm text-gray-500 capitalize mb-2">{item.category}</p>
              <p className="text-lg font-semibold text-gray-900 mb-3">
                ${item.price.toFixed(2)}
              </p>
              <button
                onClick={() => handleAddItem(item)}
                className="w-full bg-beef-red hover:bg-beef-dark text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
              >
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartDemo; 