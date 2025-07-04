import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { ConfirmationModal } from './SharedComponents';

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

      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={handleClearCart}
        title="Confirm Clear Cart?"
        message="Are you sure you want to remove all items from your cart?"
        confirmText="Confirm"
        cancelText="Cancel"
        variant="danger"
      />
    </>
  );
};

export default ClearCartButton; 