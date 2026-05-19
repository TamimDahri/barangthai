'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { totalItems, hasChilled } = useCart();

  return (
    <header>
      <nav className="bg-thai-red text-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
              <span className="font-bold text-xl tracking-tight text-white">🇹🇭 BarangThailand</span>
              <span className="text-xs text-red-200 hidden sm:block">Platform Borong B2B</span>
            </Link>

            <div className="hidden md:flex items-center gap-6 text-sm font-medium">
              <Link href="/catalog" className="hover:text-thai-blue-pale transition-colors">Katalog</Link>
              <Link href="/dashboard" className="hover:text-thai-blue-pale transition-colors">Dashboard</Link>
              <Link href="/cart" className="relative hover:text-thai-blue-pale transition-colors flex items-center gap-1">
                {hasChilled ? '🧊' : '🛒'} Sebut Harga
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-3 bg-thai-blue text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Link>
              <Link
                href="/register-merchant"
                className="bg-thai-blue text-white px-4 py-1.5 rounded-full font-bold hover:bg-thai-blue-mid transition-colors"
              >
                Daftar Peniaga
              </Link>
            </div>

            <div className="flex items-center gap-3 md:hidden">
              <Link href="/cart" className="relative" onClick={() => setOpen(false)}>
                <span className="text-xl">{hasChilled ? '🧊' : '🛒'}</span>
                {totalItems > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-thai-blue text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center leading-none">
                    {totalItems > 9 ? '9+' : totalItems}
                  </span>
                )}
              </Link>
              <button
                className="p-2 rounded-md hover:bg-thai-red-dark transition-colors"
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
              >
                <span className="text-xl">{open ? '✕' : '☰'}</span>
              </button>
            </div>
          </div>

          {open && (
            <div className="md:hidden py-3 border-t border-thai-red-dark flex flex-col gap-3 text-sm font-medium pb-4">
              <Link href="/catalog" className="hover:text-thai-blue-pale" onClick={() => setOpen(false)}>Katalog Produk</Link>
              <Link href="/dashboard" className="hover:text-thai-blue-pale" onClick={() => setOpen(false)}>Dashboard</Link>
              <Link href="/cart" className="hover:text-thai-blue-pale" onClick={() => setOpen(false)}>
                {hasChilled ? '🧊' : '🛒'} Sebut Harga {totalItems > 0 && `(${totalItems})`}
              </Link>
              <Link
                href="/register-merchant"
                className="bg-thai-blue text-white px-4 py-2 rounded-full font-bold text-center"
                onClick={() => setOpen(false)}
              >
                Daftar Peniaga
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Thai flag stripe accent */}
      <div className="flex h-1">
        <div className="flex-1 bg-thai-red" />
        <div className="flex-1 bg-white" />
        <div className="flex-[2] bg-thai-blue" />
        <div className="flex-1 bg-white" />
        <div className="flex-1 bg-thai-red" />
      </div>
    </header>
  );
}
