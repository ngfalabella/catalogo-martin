'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItemType } from '@/types';

interface CartContextProps {
  cart: CartItemType[];
  addItem: (item: CartItemType) => void;
  removeItem: (id: string, tipoCompra: string) => void;
  updateQuantity: (id: string, tipoCompra: string, cantidad: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  // 1. Al montar el componente, recuperamos el carrito de localStorage
  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error('Error parseando el carrito de localStorage', e);
      }
    }
  }, []);

  // 2. Cada vez que el carrito cambia, actualizamos localStorage
  // Usamos isMounted para evitar sobreescribir con un array vacío en el primer render del servidor
  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  const addItem = (newItem: CartItemType) => {
    setCart((prev) => {
      const exists = prev.find((i) => i.id === newItem.id && i.tipoCompra === newItem.tipoCompra);
      if (exists) {
        return prev.map((i) =>
          i.id === newItem.id && i.tipoCompra === newItem.tipoCompra
            ? { ...i, cantidad: i.cantidad + newItem.cantidad }
            : i
        );
      }
      return [...prev, newItem];
    });
  };

  const removeItem = (id: string, tipoCompra: string) => {
    setCart((prev) => prev.filter((i) => !(i.id === id && i.tipoCompra === tipoCompra)));
  };

  const updateQuantity = (id: string, tipoCompra: string, cantidad: number) => {
    if (cantidad <= 0) return removeItem(id, tipoCompra);
    setCart((prev) =>
      prev.map((i) => (i.id === id && i.tipoCompra === tipoCompra ? { ...i, cantidad } : i))
    );
  };

  const clearCart = () => setCart([]);

  // Ya no retornamos "null", dejamos pasar a los children para que la UI cargue de inmediato
  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart debe ser usado dentro de un CartProvider');
  return context;
};