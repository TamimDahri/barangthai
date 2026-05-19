import ProductCard from '@/components/ProductCard';
import { PRODUCTS, CATEGORIES } from '@/lib/products';

export default function CatalogPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Katalog Produk</h1>
        <p className="text-gray-500 mt-1 text-sm">Semua produk Thailand untuk pasaran borong Malaysia</p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button className="bg-thai-red text-white text-sm px-4 py-2 rounded-full font-medium">
          Semua Kategori
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className="bg-white border border-gray-200 text-gray-600 text-sm px-4 py-2 rounded-full hover:border-thai-blue/40 hover:text-thai-blue transition-colors"
          >
            {cat.nameMs}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-8 flex flex-wrap items-center gap-4 text-xs text-gray-600">
        <span className="font-semibold text-gray-700">Panduan Harga Tier:</span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-gray-300 rounded-full inline-block" /> Runcit — kuantiti kecil
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-thai-blue rounded-full inline-block" /> Dealer — kuantiti sederhana
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 bg-green-500 rounded-full inline-block" /> Borong — harga terendah
        </span>
      </div>

      {CATEGORIES.map((cat) => {
        const catProducts = PRODUCTS.filter((p) => p.category === cat.id);
        return (
          <div key={cat.id} className="mb-10">
            <h2 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
              {cat.id === 'frozen-seafood' && <span className="text-blue-600">🧊</span>}
              {cat.nameMs}
              {cat.id === 'frozen-seafood' && (
                <span className="text-xs bg-thai-blue-pale text-thai-blue px-2 py-0.5 rounded-full font-normal">Perlu Truk Berpendingin</span>
              )}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {catProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
