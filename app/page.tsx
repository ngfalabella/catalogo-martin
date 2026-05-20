import { productosData } from '@/data/products';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  // Filtramos los productos por su presentación
  const productos175 = productosData.filter(p => p.presentacion === '1.75L');
  const productos150 = productosData.filter(p => p.presentacion === '1.5L');
  const productos600 = productosData.filter(p => p.presentacion === '600ml');

  return (
    <div className="max-w-5xl mx-auto space-y-12 pb-12">
      
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
          Catálogo de Productos
        </h1>
        <p className="text-neutral-400 text-lg mt-2">
          Elegí los productos y armá tu pedido.
        </p>
      </header>

      {/* Sección 1.75 Litros */}
      <section>
        <div className="flex items-center gap-4 mb-6 border-b border-neutral-800 pb-4">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Línea <span className="text-emerald-500">1.75 Litros</span>
          </h2>
          <span className="bg-neutral-800 text-neutral-300 text-xs font-bold px-3 py-1 rounded-full">
            Familiar
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos175.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      </section>

      {/* Sección 1.5 Litros (Saborizadas) */}
      <section>
        <div className="flex items-center gap-4 mb-6 border-b border-neutral-800 pb-4">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Línea <span className="text-emerald-500">1.5 Litros</span>
          </h2>
          <span className="bg-neutral-800 text-neutral-300 text-xs font-bold px-3 py-1 rounded-full">
            Saborizadas
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos150.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      </section>

      {/* Sección 600 ml */}
      <section>
        <div className="flex items-center gap-4 mb-6 border-b border-neutral-800 pb-4">
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            Línea <span className="text-emerald-500">600 ml</span>
          </h2>
          <span className="bg-neutral-800 text-neutral-300 text-xs font-bold px-3 py-1 rounded-full">
            Individual
          </span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {productos600.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))}
        </div>
      </section>

    </div>
  );
}