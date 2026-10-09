import React, { createContext, useContext, useState } from 'react';
import { CartItem, Product } from '../types';
import { INITIAL_PRODUCTS } from '../data/products';
import { HapticEngine } from '../utils/haptics';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  discount: number;
  total: number;
  couponCode: string;
  isCouponApplied: boolean;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Preload initial 3 items to match "CANASTA 03" from the UI screenshot
  const [items, setItems] = useState<CartItem[]>([
    { product: INITIAL_PRODUCTS[0], quantity: 1 }, // Apex 75
    { product: INITIAL_PRODUCTS[1], quantity: 1 }, // HyperLight 39
    { product: INITIAL_PRODUCTS[5], quantity: 1 }, // Orto-Sonic
  ]);
  const [isOpen, setIsOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [isCouponApplied, setIsCouponApplied] = useState(false);

  const addItem = (product: Product, quantity = 1) => {
    HapticEngine.trigger('medium');
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeItem = (productId: string) => {
    HapticEngine.trigger('selection');
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    HapticEngine.trigger('selection');
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    HapticEngine.trigger('selection');
    setItems([]);
  };

  const applyCoupon = (code: string): boolean => {
    const clean = code.trim().toUpperCase();
    if (clean === 'BIENVENIDA10' || clean === 'BYTE10' || clean === 'CUPON') {
      setIsCouponApplied(true);
      setCouponCode(clean);
      HapticEngine.trigger('success');
      return true;
    }
    HapticEngine.trigger('error');
    return false;
  };

  const removeCoupon = () => {
    setIsCouponApplied(false);
    setCouponCode('');
    HapticEngine.trigger('selection');
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.priceClp * item.quantity, 0);
  const discount = isCouponApplied ? Math.round(subtotal * 0.1) : 0;
  const total = subtotal - discount;

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        setIsOpen,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        discount,
        total,
        couponCode,
        isCouponApplied,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
