import React, { useState } from 'react';
import Modal from 'react-modal';
import { useCart } from '../contexts/CartContext';

interface ClearCartButtonProps {
  className?: string;
}

const ClearCartButton: React.FC<ClearCartButtonProps> = ({ className = '' }) => {
  const { clearCart, items } = useCart();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClearCart = () => {
    clearCart();
    setIsModalOpen(false);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Don't render if cart is empty
  if (items.length === 0) {
    return null;
  }

  return (
    <>
      <button
        onClick={openModal}
        className={`bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 ${className}`}
        aria-label="Clear entire cart"
      >
        Clear Entire Cart
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="ReactModal__Content"
        overlayClassName="ReactModal__Overlay"
        contentLabel="Confirm Clear Cart"
        ariaHideApp={false}
      >
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Confirm Clear Cart?
          </h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to remove all items from your cart?
          </p>
          
          <div className="flex justify-center space-x-4">
            <button
              onClick={closeModal}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={handleClearCart}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
            >
              Confirm
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ClearCartButton; 