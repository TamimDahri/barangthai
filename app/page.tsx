import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { PRODUCTS } from '@/lib/products';

export default function HomePage() {
  const featured = PRODUCTS.slice(0, 4);

  return (
    <>
      {/* Hero — Thai red, clean and vibrant */}
      <section className="bg-thai-red text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-3 py-1 rounded-full text-sm text-blue-100 mb-6">
              🇹🇭 Platform Borong B2B Produk Thailand
            </div>
            <h1 className="text-3xl sm:text-5xl font-bold leading-tight tracking-tight">
              Borong Produk Thai<br />
              <span className="text-thai-blue-pale">Terus dari Thailand</span>
            </h1>
            <p className="mt-4 text-red-100 text-lg leading-relaxed max-w-xl">
              Khas untuk peniaga Malaysia — restoran, gerai hawker, kedai runcit.
              Sistem harga tier mengikut kuantiti. Semakin banyak, semakin murah.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/catalog"
                className="bg-white text-thai-red font-bold px-6 py-3 rounded-full hover:bg-thai-blue-pale transition-colors"
              >
                Lihat Katalog Produk
              </Link>
              <Link
                href="/register-merchant"
                className="bg-thai-blue text-white font-bold px-6 py-3 rounded-full hover:bg-thai-blue-mid transition-colors"
              >
                Daftar Akaun Peniaga
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap gap-8 text-sm">
              <div>
                <div className="text-2xl font-bold text-thai-blue-pale">500+</div>
                <div className="text-red-200">Produk Thai</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-thai-blue-pale">3 Tier</div>
                <div className="text-red-200">Sistem Harga MOQ</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-thai-blue-pale">Semenanjung</div>
                <div className="text-red-200">Penghantaran Malaysia</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tier Explanation */}
      <section className="bg-white py-12 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">Sistem Harga Tier (MOQ)</h2>
          <p className="text-gray-500 mb-8 text-sm">Semakin banyak kuantiti pesanan, semakin rendah harga seunit.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 bg-gray-300 rounded-full inline-block" />
                <span className="font-bold text-gray-700">Tier 1 — Runcit</span>
              </div>
              <p className="text-sm text-gray-500">Kuantiti kecil. Sesuai untuk ujian produk baru atau pesanan kecil.</p>
            </div>
            <div className="border border-thai-blue/30 bg-thai-blue-pale rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 bg-thai-blue rounded-full inline-block" />
                <span className="font-bold text-thai-blue">Tier 2 — Dealer</span>
              </div>
              <p className="text-sm text-thai-blue/70">Kuantiti sederhana. Harga lebih kompetitif untuk margin lebih baik.</p>
            </div>
            <div className="border border-green-200 bg-green-50 rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-3 h-3 bg-green-500 rounded-full inline-block" />
                <span className="font-bold text-green-800">Tier 3 — Borong</span>
              </div>
              <p className="text-sm text-green-600">Kuantiti besar. Harga terendah untuk keuntungan maksimum.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">Produk Pilihan</h2>
              <p className="text-gray-500 text-sm mt-0.5">Snek Thai, Makanan Kering & Sos</p>
            </div>
            <Link href="/catalog" className="text-sm font-semibold text-thai-red hover:underline">
              Lihat Semua →
            </Link>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA — Thai blue accent on white */}
      <section className="bg-thai-blue-pale border-y border-thai-blue/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-thai-blue">Bersedia untuk mula berniaga?</h2>
          <p className="mt-2 text-thai-blue/70">Daftar sebagai peniaga borong dan dapatkan akses harga eksklusif.</p>
          <Link
            href="/register-merchant"
            className="mt-6 inline-block bg-thai-red text-white font-bold px-8 py-3 rounded-full hover:bg-thai-red-dark transition-colors"
          >
            Daftar Sekarang — Percuma
          </Link>
        </div>
      </section>
    </>
  );
}
