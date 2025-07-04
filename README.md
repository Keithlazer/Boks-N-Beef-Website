# BoksNBeef Shopping Cart

A React TypeScript shopping cart implementation for BoksNBeef with enhanced cart management features.

## Features Implemented

### 1. Individual Item Delete Buttons
- ✅ Delete button (trash icon) at the end of each cart item row
- ✅ Uses `FaTrash` icon from react-icons
- ✅ Red hover effect with Tailwind CSS
- ✅ Removes only that specific item from cart

### 2. Clear Entire Cart Button
- ✅ "Clear Entire Cart" button below cart items
- ✅ Only visible when cart has items
- ✅ Red background with white text
- ✅ Hover opacity effect

### 3. Clear Cart Confirmation Modal
- ✅ Modal using react-modal
- ✅ Title: "Confirm Clear Cart?"
- ✅ Body: "Are you sure you want to remove all items from your cart?"
- ✅ Two buttons: Cancel (gray outline) and Confirm (solid red)
- ✅ On confirm: Clears entire cart and closes modal
- ✅ Accessible with proper aria labels

### 4. Empty Cart State
- ✅ Hides cart items table when empty
- ✅ Hides Clear Cart button when empty
- ✅ Shows "Your cart is empty" message
- ✅ Includes "Continue Shopping" button linking to "/menu"

### 5. Cart Context Modifications
- ✅ `removeItem(itemId: string) => void` method
- ✅ `clearCart() => void` method
- ✅ Full TypeScript support with interfaces

## Project Structure

```
src/
├── components/
│   ├── CartTable.tsx          # Main cart table with delete buttons
│   ├── ClearCartButton.tsx    # Clear cart button with modal
│   └── CartDemo.tsx           # Demo component to add sample items
├── contexts/
│   └── CartContext.tsx        # Cart context with all methods
├── types/
│   └── cart.ts               # TypeScript interfaces
├── App.tsx                   # Main app component
├── index.tsx                 # App entry point
└── index.css                 # Tailwind CSS and custom styles
```

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Install additional required packages:
```bash
npm install tailwindcss @tailwindcss/forms react-icons react-modal @types/react-modal
```

3. Start the development server:
```bash
npm start
```

## Usage

### Adding Items to Cart
Use the `addItem` method from the cart context:
```typescript
const { addItem } = useCart();

addItem({
  id: 'unique-id',
  name: 'Product Name',
  price: 42.99,
  quantity: 1,
  category: 'beef',
  image: 'image-url'
});
```

### Removing Individual Items
Use the `removeItem` method:
```typescript
const { removeItem } = useCart();
removeItem('item-id');
```

### Clearing Entire Cart
Use the `clearCart` method:
```typescript
const { clearCart } = useCart();
clearCart();
```

## Component Details

### CartTable Component
- Displays all cart items in a responsive table
- Individual delete buttons for each item
- Quantity controls with +/- buttons
- Empty state with shopping cart icon
- Cart summary with total price
- Integration with ClearCartButton

### ClearCartButton Component
- Conditional rendering (only shows when cart has items)
- Confirmation modal using react-modal
- Accessible design with proper ARIA labels
- Red styling with hover effects

### CartContext
- Uses React useReducer for state management
- Provides all cart operations: add, remove, update, clear
- TypeScript interfaces for type safety
- Methods for calculating totals

## Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Custom Colors**: Beef-themed color palette (beef-red, beef-dark, beef-light)
- **Responsive Design**: Mobile-first approach
- **Hover Effects**: Smooth transitions and visual feedback
- **Accessibility**: Proper contrast ratios and ARIA labels

## TypeScript Interfaces

```typescript
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  category: 'cattle' | 'beef' | 'services';
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}
```

## Testing the Implementation

1. Start the application
2. Use the "Add Sample Items to Cart" section to add items
3. Test individual delete buttons on each item
4. Test quantity controls (+/- buttons)
5. Test the "Clear Entire Cart" button and confirmation modal
6. Verify empty cart state appears when all items are removed

## Browser Compatibility

- Modern browsers with ES6+ support
- Responsive design for mobile, tablet, and desktop
- Accessible for screen readers and keyboard navigation

## Future Enhancements

- Persist cart data in localStorage
- Add animations for item removal
- Implement cart item categories/filtering
- Add bulk operations (select multiple items)
- Integration with backend API
- Payment processing integration 