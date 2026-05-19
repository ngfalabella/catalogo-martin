'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { generateWhatsAppOrderString } from '@/utils/whatsapp';

export default function WhatsAppOrder() {
  const { cart } = useCart();
  const [copied, setCopied] = useState(false);

  // Si no hay productos, no renderizamos esta sección
  if (cart.length === 0) return null;

  const orderString = generateWhatsAppOrderString(cart);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(orderString);
      setCopied(true);
      
      // Volvemos al estado inicial después de 3 segundos
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Error al copiar el texto', err);
    }
  };

  return (
    <div className="mt-8 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-xl">
      <h3 className="text-2xl font-black text-white mb-4">Resumen para enviar</h3>
      
      {/* Vista previa del mensaje */}
      <div className="bg-neutral-950 p-5 rounded-xl border border-neutral-800 mb-6 shadow-inner">
        <pre className="text-neutral-300 text-sm sm:text-base whitespace-pre-wrap font-sans">
          {orderString}
        </pre>
      </div>

      {/* Botón de acción */}
      <button
        onClick={handleCopy}
        className={`w-full text-white text-lg font-bold py-5 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg active:scale-[0.98] cursor-pointer ${
          copied 
            ? 'bg-emerald-700 scale-[1.02]' // Estado de éxito
            : 'bg-emerald-600 hover:bg-emerald-500' // Estado normal
        }`}
      >
        {copied ? (
          <>
            <span className="text-2xl">✓</span>
            <span>¡Pedido Copiado!</span>
          </>
        ) : (
          <>
            <span className="text-2xl">📋</span>
            <span>Copiar pedido para WhatsApp</span>
          </>
        )}
      </button>

      {/* Mensaje de ayuda adicional para usuarios no técnicos */}
      {copied && (
        <p className="text-emerald-400 text-center text-sm mt-4 font-medium animate-fade-in">
          Ya podés ir a WhatsApp y poner "Pegar" en el chat.
        </p>
      )}
    </div>
  );
}