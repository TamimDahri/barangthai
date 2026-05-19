import Link from 'next/link';

const STATS = [
  { label: 'Pesanan Bulan Ini', icon: '📦' },
  { label: 'Jumlah Belian', icon: '💰' },
  { label: 'Tier Semasa', icon: '🏷️' },
  { label: 'Sebut Harga Aktif', icon: '📋' },
];

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard Peniaga</h1>
        <p className="text-gray-500 text-sm mt-1">Selamat datang kembali</p>
      </div>

      <div className="bg-thai-blue-pale border border-thai-blue/20 rounded-xl p-5 mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="font-semibold text-thai-blue">Anda belum log masuk</p>
          <p className="text-sm text-thai-blue/70">
            Log masuk untuk melihat pesanan, harga eksklusif dan status penghantaran.
          </p>
        </div>
        <Link
          href="/register-merchant"
          className="text-sm bg-thai-red text-white px-4 py-2 rounded-lg font-medium hover:bg-thai-red-dark transition-colors"
        >
          Daftar Sekarang
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-gray-200 p-4">
            <div className="text-2xl mb-1">{stat.icon}</div>
            <div className="text-xl font-bold text-gray-300">—</div>
            <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          href="/catalog"
          className="bg-white border border-gray-200 rounded-xl p-5 hover:border-thai-red/40 hover:shadow-md transition-all"
        >
          <div className="text-2xl mb-2">🛍️</div>
          <div className="font-semibold text-gray-800">Katalog Produk</div>
          <div className="text-sm text-gray-500 mt-1">Semak harga tier terkini</div>
        </Link>
        <Link
          href="/cart"
          className="bg-white border border-gray-200 rounded-xl p-5 hover:border-thai-blue/40 hover:shadow-md transition-all"
        >
          <div className="text-2xl mb-2">📋</div>
          <div className="font-semibold text-gray-800">Sebut Harga Saya</div>
          <div className="text-sm text-gray-500 mt-1">Semak dan hantar sebut harga</div>
        </Link>
        <Link
          href="/register-merchant"
          className="bg-thai-blue-pale border border-thai-blue/20 rounded-xl p-5 hover:border-thai-blue/50 hover:shadow-md transition-all"
        >
          <div className="text-2xl mb-2">✅</div>
          <div className="font-semibold text-thai-blue">Lengkap Profil</div>
          <div className="text-sm text-thai-blue/70 mt-1">Daftar untuk akses penuh</div>
        </Link>
      </div>
    </div>
  );
}
