'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Producto } from '@/types';
import { useCart } from '@/context/CartContext';

interface Props {
  producto: Producto;
}

export default function ProductCard({ producto }: Props) {
  const { cart, addItem, updateQuantity } = useCart();
  const [imgError, setImgError] = useState(false);
  
  // Estados para UX y animaciones
  const [isAddingStatus, setIsAddingStatus] = useState(false); // Estado "¡Agregado!"

  // Buscamos si el producto YA está en el carrito para mostrar el contador persistente
  const cartItem = cart.find(item => item.id === producto.id && item.tipoCompra === 'Pack');

  const handleInitialAdd = () => {
    // 1. Iniciamos estado de feedback visual
    setIsAddingStatus(true);
    // 2. Agregamos al carrito real (qty 1)
    addItem({ ...producto, tipoCompra: 'Pack', cantidad: 1 });
  };

  // Efecto para revertir el texto "¡Agregado!" después de 1 segundo
  useEffect(() => {
    if (isAddingStatus) {
      const timer = setTimeout(() => {
        setIsAddingStatus(false);
      }, 1000); // 1 segundo es razonable
      return () => clearTimeout(timer);
    }
  }, [isAddingStatus]);

  const formatPrecio = (precio: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0,
    }).format(precio);
  };

  return (
    <div className="bg-neutral-900 border border-neutral-800 hover:border-neutral-700 transition-colors rounded-2xl p-5 sm:p-6 flex flex-col gap-6 shadow-xl">
      
      {/* Contenedor de Imagen */}
      <div className="relative w-full aspect-square bg-white rounded-xl overflow-hidden flex items-center justify-center p-4 border border-neutral-700 shadow-inner">
        {!producto.imagen || imgError ? (
          <div className="text-neutral-400 text-sm font-bold">Sin imagen</div>
        ) : (
          <Image 
            src={producto.imagen} 
            alt={`${producto.sabor} ${producto.presentacion}`}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {/* Identificación del Producto */}
      <div className="flex flex-col gap-1 text-center sm:text-left">
        <h2 className="text-2xl font-black text-white tracking-tight">
          {producto.sabor}
        </h2>
        <p className="text-lg text-neutral-400 font-bold">
          Envase: <span className="text-white">{producto.presentacion}</span>
        </p>
      </div>

      {/* Precio del Pack Destacado con detalle de unidades */}
      <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-3 flex justify-between items-center shadow-md">
        <div className="flex flex-col text-left">
          <span className="text-sm text-neutral-400 font-bold uppercase tracking-wider">Precio Pack</span>
          <span className="text-xs text-neutral-500 font-medium">x{producto.unidadesPorPack} un.</span>
        </div>
        <span className="text-xl font-black text-emerald-400">{formatPrecio(producto.precioPack)}</span>
      </div>

      {/* ZONA DE BOTÓN DE ACCIÓN / CONTADOR (UX Dinámica) */}
      <div className="mt-auto h-16 flex items-center justify-center relative">
        
        {/* Renderizado condicional: Si NO está en el carrito, mostramos el botón grande */}
        {!cartItem ? (
          <button
            onClick={handleInitialAdd}
            disabled={isAddingStatus} // Se deshabilita mientras muestra "Agregado"
            className={`w-full h-full text-white text-lg font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all duration-300 active:scale-[0.98] ${
              isAddingStatus 
                ? 'bg-emerald-700 cursor-not-allowed scale-[1.02] animate-pulse' // Estado Feedback
                : 'bg-emerald-600 hover:bg-emerald-500 cursor-pointer' // Estado Normal con cursor pointer
            }`}
          >
            {isAddingStatus ? (
              <>
                <span className="text-2xl">✓</span>
                <span>¡Agregado!</span>
              </>
            ) : (
              <span>Sumar al pedido</span>
            )}
          </button>
        ) : (
          // Renderizado condicional: Si YA está en el carrito, mostramos CONTROLES GIGANTES
          // Esta zona aparece automáticamente después del 1s de feedback si cartItem ya existe.
          <div className="w-full h-full flex items-center gap-3 bg-neutral-950 rounded-xl p-2 border border-emerald-900/50 shadow-inner animate-fade-in">
            <button
              onClick={() => updateQuantity(producto.id, 'Pack', cartItem.cantidad - 1)}
              aria-label="Restar una unidad"
              className="w-14 h-14 flex items-center justify-center text-3xl font-light bg-neutral-800 hover:bg-neutral-700 rounded-lg text-white active:bg-neutral-600 transition-colors cursor-pointer"
            >
              -
            </button>
            
            <div className="flex-1 flex flex-col items-center justify-center cursor-default">
              <span className="text-3xl font-black text-white">{cartItem.cantidad}</span>
              <span className="text-xs text-neutral-400 font-medium uppercase -mt-1">Packs</span>
            </div>

            <button
              onClick={() => updateQuantity(producto.id, 'Pack', cartItem.cantidad + 1)}
              aria-label="Sumar una unidad"
              className="w-14 h-14 flex items-center justify-center text-3xl font-light bg-neutral-800 hover:bg-neutral-700 rounded-lg text-white active:bg-neutral-600 transition-colors cursor-pointer"
            >
              +
            </button>
          </div>
        )}
      </div>

    </div>
  );
}