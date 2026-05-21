export default function Loading() {
  return (
    <div className="max-w-5xl mx-auto flex flex-col items-center justify-center min-h-[60vh] gap-5">
      {/* Spinner animado con los colores de tu marca */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-neutral-800 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"></div>
      </div>
      
      {/* Texto de estado */}
      <p className="text-neutral-400 text-lg font-bold uppercase tracking-widest animate-pulse">
        Cargando catálogo...
      </p>
    </div>
  );
}