import { CartItemType } from '@/types';

export const generateWhatsAppOrderString = (items: CartItemType[]): string => {
  if (items.length === 0) return '';

  let text = '📋 *NUEVO PEDIDO*\n\n';

  // El sistema agrupa dinámicamente según el campo "marca" de cada producto
  const groupedByBrand = items.reduce((acc, item) => {
    if (!acc[item.marca]) acc[item.marca] = [];
    acc[item.marca].push(item);
    return acc;
  }, {} as Record<string, CartItemType[]>);

  for (const [marca, prods] of Object.entries(groupedByBrand)) {
    text += `*${marca}*\n`;
    
    prods.forEach((p) => {
      const palabraPack = p.cantidad === 1 ? 'Pack' : 'Packs';
      text += `▪ ${p.cantidad} ${palabraPack} de ${p.sabor} ${p.presentacion}\n`;
    });
    
    text += '\n';
  }

  text += '------------------------\n';
  text += '⚠️ _Requiere confirmación del Vendedor';
  
  return text;
};