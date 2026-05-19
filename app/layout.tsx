import type { Metadata, Viewport } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { CartProvider } from '@/context/CartContext';

export const metadata: Metadata = {
  metadataBase: new URL('https://barangthailand.com'),
  title: {
    default: 'BarangThailand.com — Platform Borong B2B Produk Thai',
    template: '%s — BarangThailand.com',
  },
  description:
    'Platform borong produk Thailand untuk peniaga Malaysia. Restoran, gerai hawker, dan kedai runcit. Sistem harga tier mengikut kuantiti MOQ.',
  openGraph: {
    siteName: 'BarangThailand.com',
    locale: 'ms_MY',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#A51931',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ms" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-gray-50">
        <CartProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
