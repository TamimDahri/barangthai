import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getProductById, PRODUCTS } from '@/lib/products';
import MOQCalculator from '@/components/MOQCalculator';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata(
  props: PageProps<'/catalog/[id]'>
): Promise<Metadata> {
  const { id } = await props.params;
  const product = getProductById(id);
  if (!product) return {};
  const lowestPrice = product.priceTiers[product.priceTiers.length - 1].pricePerUnit;
  return {
    title: product.nameMs,
    description: `${product.descriptionMs} Harga borong dari RM ${lowestPrice.toFixed(2)}/${product.unitMs}. MOQ: ${product.moq} ${product.unitMs}.`,
    openGraph: {
      title: `${product.nameMs} | Borong B2B`,
      description: product.descriptionMs,
    },
  };
}

export default async function ProductDetailPage(props: PageProps<'/catalog/[id]'>) {
  const { id } = await props.params;
  const product = getProductById(id);
  if (!product) notFound();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <nav className="text-sm text-gray-400 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-thai-red">Laman Utama</Link>
        <span>/</span>
        <Link href="/catalog" className="hover:text-thai-red">Katalog</Link>
        <span>/</span>
        <span className="text-gray-700">{product.nameMs}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Left: product info */}
        <div className="lg:col-span-3">
          <div className={`rounded-2xl h-72 flex items-center justify-center text-8xl mb-6 ${product.requiresChilledLogistics ? 'bg-gradient-to-br from-thai-blue/5 to-thai-blue/10' : 'bg-gradient-to-br from-thai-red/5 to-thai-blue/5'}`}>
            {product.emoji}
          </div>

          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{product.nameMs}</h1>
              <p className="text-gray-400 text-sm">{product.name}</p>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ${
                product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'
              }`}
            >
              {product.inStock ? '✓ Stok Ada' : 'Tiada Stok'}
            </span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            {product.tags.map((tag) => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                #{tag}
              </span>
            ))}
          </div>

          <p className="text-gray-600 leading-relaxed mb-6">{product.descriptionMs}</p>

          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100">
            <div className="px-4 py-3 flex justify-between text-sm">
              <span className="text-gray-500">Berat / Saiz</span>
              <span className="font-medium">{product.weight}</span>
            </div>
            <div className="px-4 py-3 flex justify-between text-sm">
              <span className="text-gray-500">Unit</span>
              <span className="font-medium capitalize">{product.unitMs}</span>
            </div>
            <div className="px-4 py-3 flex justify-between text-sm">
              <span className="text-gray-500">Negara Asal</span>
              <span className="font-medium">🇹🇭 {product.origin}</span>
            </div>
            <div className="px-4 py-3 flex justify-between text-sm">
              <span className="text-gray-500">MOQ</span>
              <span className="font-medium">
                {product.moq} {product.unitMs}
              </span>
            </div>
            <div className="px-4 py-3 flex justify-between text-sm">
              <span className="text-gray-500">Kategori</span>
              <span className="font-medium">{product.categoryMs}</span>
            </div>
          </div>
        </div>

        {/* Right: MOQ calculator */}
        <div className="lg:col-span-2">
          <MOQCalculator product={product} />
        </div>
      </div>
    </div>
  );
}
