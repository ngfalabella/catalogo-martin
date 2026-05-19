import ProductCard from '@/components/ProductCard';
import { productosData } from '@/data/products';

export default function Home() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-bold tracking-tight mb-2">Catálogo de Productos</h1>
        <p className="text-neutral-400 text-lg">Seleccioná los productos y armá tu pedido.</p>
      </header>
      
      {productosData.length === 0 ? (
        <div className="text-center p-10 bg-neutral-900 border border-neutral-800 rounded-2xl">
          <p className="text-neutral-400">No hay productos disponibles en este momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {productosData.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </div>
  );
}