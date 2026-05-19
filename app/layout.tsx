import './globals.css';
import { CartProvider } from '@/context/CartContext';
import Header from '@/components/Header';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Catálogo de Pedidos',
  description: 'Sistema de preventa ágil',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-neutral-950 text-neutral-50 min-h-screen">
        <CartProvider>
          <Header />
          <div className="max-w-5xl mx-auto p-4 md:p-8">{children}</div>
        </CartProvider>
      </body>
    </html>
  );
}