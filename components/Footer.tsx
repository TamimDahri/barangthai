import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t-4 border-thai-blue text-gray-700 mt-auto">
      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <h3 className="text-thai-blue font-bold text-lg mb-3">🇹🇭 BarangThailand.com</h3>
            <p className="text-sm leading-relaxed text-gray-500">
              Platform borong B2B produk Thai untuk peniaga Malaysia — restoran, gerai hawker, dan kedai runcit.
            </p>
          </div>
          <div>
            <h4 className="text-gray-800 font-semibold mb-3">Pautan Cepat</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/catalog" className="text-gray-500 hover:text-thai-red transition-colors">Katalog Produk</Link></li>
              <li><Link href="/register-merchant" className="text-gray-500 hover:text-thai-red transition-colors">Daftar Akaun Borong</Link></li>
              <li><Link href="/dashboard" className="text-gray-500 hover:text-thai-red transition-colors">Dashboard Peniaga</Link></li>
              <li><Link href="/cart" className="text-gray-500 hover:text-thai-red transition-colors">Sebut Harga</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-gray-800 font-semibold mb-3">Hubungi Kami</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li>📱 WhatsApp: +60 12-345 6789</li>
              <li>📧 info@barangthailand.com</li>
              <li>🕐 Isnin–Sabtu, 9am–6pm</li>
            </ul>
          </div>
        </div>

        {/* Thai flag stripe */}
        <div className="flex h-1 mt-8 mb-4 rounded overflow-hidden">
          <div className="flex-1 bg-thai-red" />
          <div className="flex-1 bg-white border-y border-gray-200" />
          <div className="flex-[2] bg-thai-blue" />
          <div className="flex-1 bg-white border-y border-gray-200" />
          <div className="flex-1 bg-thai-red" />
        </div>

        <div className="text-center text-xs text-gray-400">
          © 2025 BarangThailand.com — Hak cipta terpelihara. Platform Borong B2B Produk Thai
        </div>
      </div>
    </footer>
  );
}
