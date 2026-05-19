'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Product } from '@/lib/products';
import { getActiveTier } from '@/lib/products';
import { useCart } from '@/context/CartContext';

export default function MOQCalculator({ product }: { product: Product }) {
  const [qty, setQty] = useState(product.moq);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();
  const router = useRouter();

  const activeTier = getActiveTier(product, qty);
  const total = qty * activeTier.pricePerUnit;
  const activeTierIndex = product.priceTiers.indexOf(activeTier);
  const nextTier = product.priceTiers[activeTierIndex + 1];

  function handleAdd() {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-6 sticky top-20">
      <h2 className="text-lg font-bold text-gray-800 mb-1">Kalkulator MOQ & Harga</h2>

      {product.requiresChilledLogistics && (
        <div className="text-xs text-thai-blue bg-thai-blue-pale border border-thai-blue/20 rounded-lg px-3 py-2 mb-4 flex items-center gap-1.5">
          🧊 <span>Produk ini memerlukan <strong>truk berpendingin</strong>. Kos logistik akan dikira semasa sebut harga.</span>
        </div>
      )}

      {/* Tier selector */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {product.priceTiers.map((tier) => {
          const isActive = activeTier.label === tier.label;
          return (
            <button
              key={tier.label}
              onClick={() => setQty(tier.minQty)}
              className={`rounded-lg p-2.5 text-center border-2 transition-all ${
                isActive
                  ? tier.label === 'Wholesale'
                    ? 'border-green-500 bg-green-50'
                    : tier.label === 'Dealer'
                    ? 'border-thai-blue bg-thai-blue-pale'
                    : 'border-gray-400 bg-gray-50'
                  : 'border-gray-100 bg-gray-50 opacity-60 hover:opacity-80'
              }`}
            >
              <div className={`font-bold text-xs ${isActive ? (tier.label === 'Wholesale' ? 'text-green-800' : tier.label === 'Dealer' ? 'text-thai-blue' : 'text-gray-700') : 'text-gray-500'}`}>
                {tier.labelMs}
              </div>
              <div className={`text-xs mt-0.5 ${isActive ? 'text-gray-600' : 'text-gray-400'}`}>
                {tier.minQty}{tier.maxQty ? `–${tier.maxQty}` : '+'}
              </div>
              <div className={`text-sm font-bold mt-1 ${isActive ? (tier.label === 'Wholesale' ? 'text-green-700' : tier.label === 'Dealer' ? 'text-thai-blue' : 'text-gray-700') : 'text-gray-400'}`}>
                RM {tier.pricePerUnit.toFixed(2)}
              </div>
            </button>
          );
        })}
      </div>

      {/* Qty input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Kuantiti ({product.unitMs})
        </label>
        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
          <button
            className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-lg transition-colors"
            onClick={() => setQty(Math.max(product.moq, qty - 1))}
          >−</button>
          <input
            type="number"
            value={qty}
            min={product.moq}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              if (!isNaN(val)) setQty(Math.max(product.moq, val));
            }}
            className="flex-1 text-center text-lg font-semibold py-2.5 outline-none"
          />
          <button
            className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-lg transition-colors"
            onClick={() => setQty(qty + 1)}
          >+</button>
        </div>
      </div>

      {/* Active tier badge */}
      <div className={`text-sm font-medium px-3 py-2 rounded-lg mb-4 flex items-center justify-between ${
        activeTier.label === 'Wholesale'
          ? 'bg-green-100 text-green-800'
          : activeTier.label === 'Dealer'
          ? 'bg-thai-blue-pale text-thai-blue'
          : 'bg-gray-100 text-gray-700'
      }`}>
        <span>Tier Aktif: <strong>{activeTier.labelMs}</strong> — RM {activeTier.pricePerUnit.toFixed(2)}/{product.unitMs}</span>
        {activeTier.badge && (
          <span className="ml-2 bg-thai-blue text-white text-xs px-2 py-0.5 rounded-full font-bold">{activeTier.badge}</span>
        )}
      </div>

      {/* Summary */}
      <div className="bg-gray-50 rounded-xl p-4 mb-4">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Harga Seunit</span><span>RM {activeTier.pricePerUnit.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Kuantiti</span><span>× {qty} {product.unitMs}</span>
        </div>
        <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-2">
          <span>Jumlah Anggaran</span>
          <span className="text-thai-red">RM {total.toFixed(2)}</span>
        </div>
        {product.requiresChilledLogistics && (
          <p className="text-xs text-thai-blue mt-1.5">+ Kos logistik sejuk (dikira semasa sebut harga)</p>
        )}
      </div>

      {/* Next tier hint */}
      {nextTier && activeTier.maxQty !== null && (
        <div className="text-xs text-gray-600 bg-thai-blue-pale border border-thai-blue/20 rounded-lg px-3 py-2 mb-4">
          💡 Tambah <strong>{activeTier.maxQty + 1 - qty}</strong> lagi untuk harga{' '}
          <strong>{nextTier.labelMs}</strong> (RM {nextTier.pricePerUnit.toFixed(2)}/{product.unitMs})
        </div>
      )}

      <button
        onClick={handleAdd}
        className={`w-full font-bold py-3 rounded-xl transition-all mb-2 ${
          added
            ? 'bg-green-600 text-white'
            : 'bg-thai-red text-white hover:bg-thai-red-dark'
        }`}
      >
        {added ? '✓ Ditambah ke Bakul!' : '+ Tambah ke Bakul Sebut Harga'}
      </button>
      {added && (
        <button
          onClick={() => router.push('/cart')}
          className="w-full border border-thai-red/30 text-thai-red py-2.5 rounded-xl hover:bg-thai-red/5 transition-colors text-sm font-medium mb-2"
        >
          Lihat Bakul & Teruskan →
        </button>
      )}
      <button className="w-full border border-gray-200 text-gray-700 py-2.5 rounded-xl hover:bg-gray-50 transition-colors text-sm">
        📱 Hubungi via WhatsApp
      </button>
    </div>
  );
}
