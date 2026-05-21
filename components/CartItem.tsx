'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CartItemType } from '@/types';
import { useCart } from '@/context/CartContext';

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCart();
  const [imgError, setImgError] = useState(false);

  const formatPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(precio);
  };

  const precioUnitario = item.tipoCompra === 'Pack' ? item.precioPack : item.precioPallet;
  const subtotal = precioUnitario * item.cantidad;

  return (
    <div className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-5 shadow-sm">
      
      {/* BLOQUE 1: Identidad del Producto */}
      <div className="flex items-center gap-4 w-full md:w-auto flex-1 min-w-0">
        
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-xl overflow-hidden shrink-0 p-2 shadow-sm">
          {!item.imagen || imgError ? (
            <span className="flex items-center justify-center w-full h-full text-2xl opacity-40">🥤</span>
          ) : (
            <Image 
              src={item.imagen} 
              alt={`${item.sabor} ${item.presentacion}`}
              fill
              className="object-contain"
              sizes="96px"
              onError={() => setImgError(true)}
            />
          )}
        </div>

        <div className="flex flex-col min-w-0">
          <span className="text-neutral-500 text-xs font-bold uppercase tracking-wider">{item.marca}</span>
          <h3 className="text-xl sm:text-2xl font-bold text-white truncate leading-tight">
            {item.sabor}
          </h3>
          <p className="text-neutral-400 text-sm mt-1">
            Envase: <span className="text-white font-semibold">{item.presentacion}</span>
          </p>
          <p className="text-neutral-500 text-sm mt-0.5">
            Pack: {formatPrecio(precioUnitario)}
          </p>
        </div>
      </div>

      {/* BLOQUE 2: Controles con Etiqueta Superior, Subtotal y Acción */}
      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full md:w-auto border-t border-neutral-800 md:border-none pt-4 md:pt-0 shrink-0">
        
        {/* Controles numéricos con indicador de packs integrado */}
        <div className="flex flex-col items-center gap-1 w-full sm:w-auto shrink-0">
          <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider leading-none">Packs</span>
          <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded-xl h-14 w-full sm:w-auto justify-between px-1">
            <button
              onClick={() => updateQuantity(item.id, item.tipoCompra, item.cantidad - 1)}
              aria-label="Restar"
              className="w-12 h-full flex items-center justify-center text-3xl font-light text-neutral-400 hover:text-white active:scale-95 transition-all cursor-pointer"
            >
              -
            </button>
            <div className="w-12 flex items-center justify-center pointer-events-none">
              <span className="text-xl font-bold text-white leading-none">{item.cantidad}</span>
            </div>
            <button
              onClick={() => updateQuantity(item.id, item.tipoCompra, item.cantidad + 1)}
              aria-label="Sumar"
              className="w-12 h-full flex items-center justify-center text-3xl font-light text-neutral-400 hover:text-white active:scale-95 transition-all cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        {/* Subtotal Protegido */}
        <div className="flex flex-row sm:flex-col justify-between sm:justify-center items-center sm:items-end w-full sm:w-auto min-w-[130px] shrink-0 px-2 sm:px-0 self-end sm:self-auto h-14">
          <span className="text-xs text-neutral-500 font-bold uppercase tracking-wider">Subtotal</span>
          <span className="text-2xl font-black text-emerald-400 whitespace-nowrap tracking-tight">
            {formatPrecio(subtotal)}
          </span>
        </div>

     
        <button
          onClick={() => removeItem(item.id, item.tipoCompra)}
          className="w-full md:w-auto h-12 md:h-14 px-4 flex items-center justify-center text-neutral-400 hover:text-red-400 bg-neutral-800/50 md:bg-transparent hover:bg-red-950/30 rounded-xl transition-colors shrink-0 group self-end sm:self-auto cursor-pointer"
        >
          <span className="md:hidden font-bold">Quitar producto</span>
          <span className="hidden md:flex text-2xl group-hover:scale-110 transition-transform">✕</span>
        </button>

      </div>
    </div>
  );
}