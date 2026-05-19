'use client';

import { useCart } from '@/context/CartContext';
import CartItem from '@/components/CartItem';
import Link from 'next/link';

export default function CartPage() {
  const { cart } = useCart();

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <header>
        <h1 className="text-4xl font-black tracking-tight mb-2">Tu Pedido</h1>
        <p className="text-neutral-400 text-lg">Revisá las cantidades antes de confirmar.</p>
      </header>

      {cart.length === 0 ? (
        <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-12 text-center shadow-xl">
          <p className="text-neutral-400 text-lg mb-6">El carrito está vacío.</p>
          <Link
            href="/"
            className="inline-block bg-white text-black px-8 py-4 rounded-xl font-bold hover:bg-neutral-200 transition-colors"
          >
            Volver al catálogo
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((item) => (
              <CartItem key={`${item.id}-${item.tipoCompra}`} item={item} />
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-neutral-800">
            <Link 
              href="/" 
              className="flex-1 bg-neutral-800 hover:bg-neutral-700 text-white text-center text-lg font-bold py-5 rounded-xl transition-colors border border-neutral-700"
            >
              Volver al catálogo
            </Link>
            <Link 
              href="/checkout" 
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-center text-lg font-bold py-5 rounded-xl transition-colors shadow-lg"
            >
              Confirmar pedido
            </Link>
          </div>
        </>
      )}
    </div>
  );
}