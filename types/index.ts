export type Sabor = 'Coca' | 'Coca Zero' | 'Sprite' | 'Sprite Zero' | 'Fanta';
export type Presentacion = '600ml' | '1.75L';
export type TipoCompra = 'Pack' | 'Pallet';

export interface Producto {
  id: string;
  marca: string;
  sabor: Sabor;
  presentacion: Presentacion;
  imagen: string; // <-- Nueva propiedad
  unidadesPorPack: number;
  precioPack: number;
  precioPallet: number;
}

export interface CartItemType extends Producto {
  tipoCompra: TipoCompra;
  cantidad: number;
}