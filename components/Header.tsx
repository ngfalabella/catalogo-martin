'use client';

import Link from 'next/link';
import { useCart } from '@/context/CartContext';

export default function Header() {
  const { cart } = useCart();
  const totalItems = cart.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <header className="sticky top-0 z-50 bg-neutral-900 border-b border-neutral-800 p-4">
      <div className="max-w-5xl mx-auto flex justify-between items-center">
        <Link 
          href="/" 
          className="text-xl font-bold tracking-tight hover:text-emerald-400 transition-colors cursor-pointer"
        >
          Catálogo Venta
        </Link>
        <Link
          href="/cart"
          className="bg-neutral-800 border-2 border-emerald-600 hover:bg-emerald-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 cursor-pointer"
        >
          <span className="uppercase">Ver Pedido</span>
          {totalItems > 0 && (
            <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-sm font-bold">
              {totalItems}
            </span>
          )}
        </Link>
      </div>
    </header>
  );
}