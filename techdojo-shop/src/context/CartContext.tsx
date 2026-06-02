'use client';
import { createContext, useContext, useState, useEffect, useCallback } from 'react';

type CartItem = {
  productId: { _id: string; name: string; price: number; image: string; category: string };
  size: string;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  addToCart: (productId: string, size: string) => Promise<void>;
  removeFromCart: (productId: string, size: string) => Promise<void>;
  clearCart: () => Promise<void>;
  refreshCart: () => Promise<void>;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextType>({} as CartContextType);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const refreshCart = useCallback(async () => {
    try {
      const res = await fetch('/api/cart');
      if (res.ok) {
        const data = await res.json();
        setCart(data.cart || []);
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error);
    }
  }, []);

  useEffect(() => { refreshCart(); }, [refreshCart]);

  const addToCart = async (productId: string, size: string) => {
    const res = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, size, action: 'add' })
    });
    const data = await res.json();
    setCart(data.cart || []);
    setIsOpen(true);
  };

  const removeFromCart = async (productId: string, size: string) => {
    const res = await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, size, action: 'remove' })
    });
    const data = await res.json();
    setCart(data.cart || []);
  };

  const clearCart = async () => {
    await fetch('/api/cart', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'clear' })
    });
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.productId?.price || 0) * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, cartCount, cartTotal, addToCart, removeFromCart, clearCart, refreshCart, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);