import Link from 'next/link';
import type { Product } from '@/lib/products';

export default function ProductCard({ product }: { product: Product }) {
  const isFrozen = product.requiresChilledLogistics;

  return (
    <Link
      href={`/catalog/${product.id}`}
      className={`group block bg-white rounded-xl border transition-all duration-200 overflow-hidden hover:shadow-lg ${
        isFrozen
          ? 'border-thai-blue/20 hover:border-thai-blue/50'
          : 'border-gray-200 hover:border-thai-red/40'
      }`}
    >
      <div
        className={`h-40 flex items-center justify-center text-5xl ${
          isFrozen
            ? 'bg-gradient-to-br from-thai-blue/5 to-thai-blue/10'
            : 'bg-gradient-to-br from-thai-red/5 to-thai-blue/5'
        }`}
      >
        {product.emoji}
        {isFrozen && (
          <span className="absolute top-2 right-2 text-xs bg-thai-blue text-white px-1.5 py-0.5 rounded font-medium">🧊</span>
        )}
      </div>

      <div className="p-4">
        <h3
          className={`font-semibold text-sm leading-tight transition-colors ${
            isFrozen
              ? 'text-gray-800 group-hover:text-thai-blue'
              : 'text-gray-800 group-hover:text-thai-red'
          }`}
        >
          {product.nameMs}
        </h3>
        <p className="text-xs text-gray-400 mt-0.5">{product.weight} · {product.origin}</p>

        <div className="mt-3 space-y-1.5">
          {product.priceTiers.map((tier) => (
            <div key={tier.label} className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5">
                <span
                  className={`inline-block w-2 h-2 rounded-full ${
                    tier.label === 'Wholesale'
                      ? 'bg-green-500'
                      : tier.label === 'Dealer'
                      ? 'bg-thai-blue'
                      : 'bg-gray-300'
                  }`}
                />
                <span className="text-gray-500">
                  {tier.labelMs} ({tier.minQty}{tier.maxQty ? `–${tier.maxQty}` : '+'})
                </span>
              </span>
              <span
                className={`font-bold ${
                  tier.label === 'Wholesale'
                    ? 'text-green-700'
                    : tier.label === 'Dealer'
                    ? 'text-thai-blue'
                    : 'text-gray-600'
                }`}
              >
                RM {tier.pricePerUnit.toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-400">MOQ: {product.moq} {product.unitMs}</span>
          <span
            className={`text-xs font-semibold group-hover:underline ${
              isFrozen ? 'text-thai-blue' : 'text-thai-red'
            }`}
          >
            Lihat & Pesan →
          </span>
        </div>
      </div>
    </Link>
  );
}
