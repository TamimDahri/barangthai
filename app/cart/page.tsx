'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useCart, type CartItem } from '@/context/CartContext';
import { getActiveTier } from '@/lib/products';

const WHATSAPP_NUMBER = '60123456789';

function buildStandardWhatsAppMsg(
  items: CartItem[],
  subtotal: number,
  paymentType: 'deposit' | 'full'
): string {
  const lines = items
    .map((i) => `- ${i.product.nameMs} × ${i.qty} ${i.product.unitMs} (${i.tier.labelMs}) = RM ${(i.qty * i.tier.pricePerUnit).toFixed(2)}`)
    .join('\n');
  const depositAmt = (subtotal * 0.5).toFixed(2);
  const paymentLine =
    paymentType === 'deposit'
      ? `Bayaran Deposit 50%: RM ${depositAmt}\nBaki RM ${depositAmt} semasa penghantaran`
      : `Bayaran Penuh: RM ${subtotal.toFixed(2)}`;

  return `Salam! Saya ingin membuat *pesanan borong* di BarangThailand.com:\n\n*Item Pesanan (Standard):*\n${lines}\n\n*Subtotal: RM ${subtotal.toFixed(2)}*\n${paymentLine}\n\nNama: \nNo. Tel: \nAlamat penghantaran: `;
}

function buildChilledWhatsAppMsg(
  items: CartItem[],
  subtotal: number,
  location: string,
  date: string,
  notes: string
): string {
  const lines = items
    .map((i) => `- ${i.product.nameMs} × ${i.qty} ${i.product.unitMs} (${i.tier.labelMs}) = RM ${(i.qty * i.tier.pricePerUnit).toFixed(2)}`)
    .join('\n');

  return `Salam! Saya memerlukan *sebut harga & kos logistik* untuk item sejuk beku:\n\n*Item Sejuk Beku 🧊:*\n${lines}\n\n*Subtotal Item: RM ${subtotal.toFixed(2)}*\n(Kos logistik belum termasuk)\n\nLokasi Penghantaran: ${location || '(belum diisi)'}\nTarikh Pilihan: ${date || '(belum diisi)'}\nCatatan: ${notes || '-'}\n\nNama: \nNo. Tel: `;
}

function CartItemRow({
  item,
  onRemove,
  onQtyChange,
}: {
  item: CartItem;
  onRemove: () => void;
  onQtyChange: (qty: number) => void;
}) {
  const subtotal = item.qty * item.tier.pricePerUnit;
  return (
    <div className="flex items-center gap-3 py-4 border-b border-gray-100 last:border-0">
      <div className="text-3xl w-10 text-center flex-shrink-0">{item.product.emoji}</div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-gray-800 text-sm leading-tight truncate">{item.product.nameMs}</p>
        <p className="text-xs text-gray-400 mt-0.5">{item.product.weight}</p>
        <div className="flex items-center gap-1 mt-1">
          <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${
            item.tier.label === 'Wholesale' ? 'bg-green-100 text-green-700'
            : item.tier.label === 'Dealer' ? 'bg-blue-100 text-blue-700'
            : 'bg-gray-100 text-gray-600'
          }`}>
            {item.tier.labelMs}
          </span>
          <span className="text-xs text-gray-400">RM {item.tier.pricePerUnit.toFixed(2)}/{item.product.unitMs}</span>
        </div>
      </div>

      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden flex-shrink-0">
        <button
          onClick={() => onQtyChange(item.qty - 1)}
          className="px-2.5 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold transition-colors text-sm"
        >−</button>
        <span className="w-10 text-center text-sm font-semibold">{item.qty}</span>
        <button
          onClick={() => onQtyChange(item.qty + 1)}
          className="px-2.5 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-600 font-bold transition-colors text-sm"
        >+</button>
      </div>

      <div className="text-right flex-shrink-0">
        <p className="font-bold text-gray-800 text-sm">RM {subtotal.toFixed(2)}</p>
        <button onClick={onRemove} className="text-xs text-red-400 hover:text-red-600 mt-0.5">buang</button>
      </div>
    </div>
  );
}

export default function CartPage() {
  const { items, removeItem, updateQty, standardSubtotal, chilledSubtotal, grandTotal, hasStandard, hasChilled } = useCart();

  const [deliveryLocation, setDeliveryLocation] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  const standardItems = items.filter((i) => !i.product.requiresChilledLogistics);
  const chilledItems = items.filter((i) => i.product.requiresChilledLogistics);
  const deposit = standardSubtotal * 0.5;

  function openWhatsApp(msg: string) {
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  }

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold text-gray-700 mb-2">Bakul Sebut Harga Kosong</h1>
        <p className="text-gray-400 mb-8">Tambah produk dari katalog untuk mula membuat pesanan borong.</p>
        <Link
          href="/catalog"
          className="inline-block bg-thai-red text-white font-bold px-8 py-3 rounded-xl hover:bg-thai-red-dark transition-colors"
        >
          Lihat Katalog Produk
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Bakul Sebut Harga</h1>
        <Link href="/catalog" className="text-sm text-thai-red hover:underline">+ Tambah Produk</Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: item lists */}
        <div className="lg:col-span-2 space-y-6">

          {/* ── Standard Items ──────────────────────────── */}
          {hasStandard && (
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
              <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
                <span className="text-base">🛍️</span>
                <span className="font-semibold text-gray-700 text-sm">Produk Standard</span>
                <span className="text-xs text-gray-400 ml-auto">{standardItems.length} item</span>
              </div>
              <div className="px-5">
                {standardItems.map((item) => (
                  <CartItemRow
                    key={item.product.id}
                    item={item}
                    onRemove={() => removeItem(item.product.id)}
                    onQtyChange={(qty) => updateQty(item.product.id, qty)}
                  />
                ))}
              </div>
              <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between text-sm font-semibold">
                <span className="text-gray-600">Subtotal Standard</span>
                <span className="text-gray-800">RM {standardSubtotal.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* ── Chilled / Frozen Items ───────────────────── */}
          {hasChilled && (
            <div className="bg-white rounded-2xl border border-blue-200 overflow-hidden">
              <div className="px-5 py-3 bg-blue-50 border-b border-blue-100 flex items-center gap-2">
                <span className="text-base">🧊</span>
                <span className="font-semibold text-blue-800 text-sm">Produk Sejuk Beku</span>
                <span className="text-xs text-blue-400 ml-auto">{chilledItems.length} item</span>
              </div>
              <div className="px-5 py-2">
                <div className="flex items-start gap-2 bg-blue-50 rounded-lg px-3 py-2 my-3 text-xs text-blue-700">
                  <span className="mt-0.5">ℹ️</span>
                  <span>Item ini memerlukan <strong>truk berpendingin</strong>. Kos penghantaran bergantung pada lokasi dan berat — akan dikira dalam sebut harga.</span>
                </div>
                {chilledItems.map((item) => (
                  <CartItemRow
                    key={item.product.id}
                    item={item}
                    onRemove={() => removeItem(item.product.id)}
                    onQtyChange={(qty) => updateQty(item.product.id, qty)}
                  />
                ))}
              </div>
              <div className="px-5 py-3 bg-blue-50 border-t border-blue-100 flex justify-between text-sm font-semibold">
                <span className="text-blue-700">Subtotal Item Sejuk</span>
                <div className="text-right">
                  <span className="text-blue-800">RM {chilledSubtotal.toFixed(2)}</span>
                  <span className="block text-xs text-blue-500 font-normal">+ kos logistik (TBD)</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right: checkout panels */}
        <div className="space-y-5">

          {/* Grand total summary */}
          <div className="bg-white rounded-2xl border border-gray-200 p-5">
            <h2 className="font-bold text-gray-700 mb-3 text-sm">Ringkasan Pesanan</h2>
            {hasStandard && (
              <div className="flex justify-between text-sm text-gray-600 mb-1.5">
                <span>🛍️ Item Standard</span><span>RM {standardSubtotal.toFixed(2)}</span>
              </div>
            )}
            {hasChilled && (
              <div className="flex justify-between text-sm text-gray-600 mb-1.5">
                <span>🧊 Item Sejuk Beku</span><span>RM {chilledSubtotal.toFixed(2)}</span>
              </div>
            )}
            {hasChilled && (
              <div className="flex justify-between text-sm text-blue-500 mb-1.5">
                <span>Kos Logistik Sejuk</span><span>TBD</span>
              </div>
            )}
            <div className="border-t border-gray-100 mt-2 pt-2 flex justify-between font-bold text-gray-800">
              <span>Jumlah Item</span><span>RM {grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* ── Option 1: Payment for Standard Items ──── */}
          {hasStandard && (
            <div className="bg-white rounded-2xl border border-gray-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 bg-thai-red text-white rounded-full text-xs font-bold flex items-center justify-center">1</span>
                <h2 className="font-bold text-gray-800 text-sm">Bayar Deposit / Penuh</h2>
              </div>
              <p className="text-xs text-gray-500 mb-4">Untuk item standard (snek & sos). Pilih cara bayaran:</p>

              {/* Deposit option */}
              <div className="border border-orange-200 bg-orange-50 rounded-xl p-4 mb-3">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-orange-800 text-sm">Bayar Deposit (50%)</span>
                  <span className="font-bold text-orange-700 text-lg">RM {deposit.toFixed(2)}</span>
                </div>
                <p className="text-xs text-orange-600 mb-3">
                  Baki RM {deposit.toFixed(2)} dibayar semasa penghantaran.
                </p>
                <button
                  onClick={() =>
                    openWhatsApp(buildStandardWhatsAppMsg(standardItems, standardSubtotal, 'deposit'))
                  }
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-lg transition-colors text-sm"
                >
                  📱 Bayar Deposit via WhatsApp
                </button>
              </div>

              {/* Full payment option */}
              <div className="border border-green-200 bg-green-50 rounded-xl p-4">
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-green-800 text-sm">Bayar Penuh</span>
                  <span className="font-bold text-green-700 text-lg">RM {standardSubtotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-green-600 mb-3">
                  Bayaran terus 100%. Tiada baki. Penghantaran lebih cepat diproses.
                </p>
                <button
                  onClick={() =>
                    openWhatsApp(buildStandardWhatsAppMsg(standardItems, standardSubtotal, 'full'))
                  }
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2.5 rounded-lg transition-colors text-sm"
                >
                  📱 Bayar Penuh via WhatsApp
                </button>
              </div>
            </div>
          )}

          {/* ── Option 2: Chilled Logistics Quote ──────── */}
          {hasChilled && (
            <div className="bg-white rounded-2xl border border-blue-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-6 bg-thai-blue text-white rounded-full text-xs font-bold flex items-center justify-center">
                  {hasStandard ? '2' : '1'}
                </span>
                <h2 className="font-bold text-gray-800 text-sm">Minta Sebut Harga & Kos Logistik</h2>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                Untuk item sejuk beku 🧊. Kami akan hitung kos truk berpendingin berdasarkan lokasi anda.
              </p>

              <div className="space-y-3 mb-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Lokasi Penghantaran *</label>
                  <select
                    value={deliveryLocation}
                    onChange={(e) => setDeliveryLocation(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:border-blue-400"
                  >
                    <option value="">-- Pilih negeri --</option>
                    {['Selangor', 'Kuala Lumpur', 'Johor', 'Perak', 'Pulau Pinang', 'Kedah', 'Kelantan', 'Terengganu', 'Pahang', 'Negeri Sembilan', 'Melaka', 'Perlis'].map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Tarikh Penghantaran Pilihan</label>
                  <input
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Catatan Tambahan</label>
                  <textarea
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    placeholder="Contoh: perlu tiba sebelum 10am, ada loading bay, dsb."
                    rows={2}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:border-blue-400"
                  />
                </div>
              </div>

              <button
                onClick={() =>
                  openWhatsApp(
                    buildChilledWhatsAppMsg(
                      chilledItems,
                      chilledSubtotal,
                      deliveryLocation,
                      deliveryDate,
                      deliveryNotes
                    )
                  )
                }
                className="w-full bg-thai-blue hover:bg-thai-blue-dark text-white font-bold py-3 rounded-xl transition-colors text-sm"
              >
                🧊 Minta Sebut Harga & Kos Logistik
              </button>
              <p className="text-xs text-gray-400 text-center mt-2">Pasukan kami akan balas dalam 1–2 jam bekerja.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
