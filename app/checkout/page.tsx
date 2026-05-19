'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { generateWhatsAppOrderString } from '@/utils/whatsapp';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart } = useCart();
  const [copied, setCopied] = useState(false);

  // Si acceden a esta URL sin productos, los devolvemos al inicio
  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <h2 className="text-2xl font-bold mb-4">No hay pedido para generar</h2>
        <Link href="/" className="text-emerald-500 hover:text-emerald-400 hover:underline font-medium cursor-pointer transition-colors">Volver al inicio</Link>
      </div>
    );
  }

  const orderString = generateWhatsAppOrderString(cart);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(orderString);
      setCopied(true);
      // Damos más tiempo al estado de éxito para que el usuario alcance a leerlo
      setTimeout(() => setCopied(false), 5000);
    } catch (err) {
      console.error('Error al copiar', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <header className="text-center">
        <h1 className="text-4xl font-black tracking-tight mb-4">Último paso</h1>
        <p className="text-lg text-neutral-400">
          Copiá el mensaje y envialo por WhatsApp al vendedor para confirmar la compra.
        </p>
      </header>

      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xl">
        
        {/* Instrucciones Claras */}
        <div className="mb-8 space-y-5 bg-neutral-950 p-5 rounded-xl border border-neutral-800">
          <div className="flex items-start gap-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-900/50 text-emerald-400 font-bold border border-emerald-800 shrink-0">1</span>
            <p className="text-neutral-300 mt-1">Revisá que el pedido esté correcto en el recuadro de abajo.</p>
          </div>
          <div className="flex items-start gap-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-900/50 text-emerald-400 font-bold border border-emerald-800 shrink-0">2</span>
            <p className="text-neutral-300 mt-1">Apretá el botón verde para <strong>Copiar el mensaje</strong>.</p>
          </div>
          <div className="flex items-start gap-4">
            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-900/50 text-emerald-400 font-bold border border-emerald-800 shrink-0">3</span>
            <p className="text-neutral-300 mt-1">Abrí WhatsApp, pegá el texto en el chat del vendedor y envialo.</p>
          </div>
        </div>

        {/* Vista previa del mensaje */}
        <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800 mb-8 shadow-inner overflow-x-auto">
          <pre className="text-neutral-400 text-sm sm:text-base whitespace-pre-wrap font-sans">
            {orderString}
          </pre>
        </div>

        {/* Botones de acción final */}
        <div className="flex flex-col gap-4">
          <button
            onClick={handleCopy}
            className={`w-full text-white text-xl font-black py-6 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg active:scale-[0.98] cursor-pointer ${
              copied 
                ? 'bg-emerald-700 scale-[1.02]' 
                : 'bg-emerald-600 hover:bg-emerald-500'
            }`}
          >
            {copied ? (
              <>
                <span className="text-3xl">✓</span>
                <span>¡Listo! Ahora pegalo en WhatsApp</span>
              </>
            ) : (
              <>
                <span className="text-3xl">📋</span>
                <span>Copiar mensaje</span>
              </>
            )}
          </button>

          <Link 
            href="/cart"
            className="w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white text-lg font-bold py-5 rounded-xl transition-colors border border-neutral-700 flex items-center justify-center cursor-pointer"
          >
            Editar pedido
          </Link>
        </div>
      </div>
    </div>
  );
}