const STATES = [
  'Selangor', 'Kuala Lumpur', 'Johor', 'Perak', 'Pulau Pinang',
  'Kedah', 'Kelantan', 'Terengganu', 'Pahang', 'Negeri Sembilan',
  'Melaka', 'Perlis', 'Sabah', 'Sarawak',
];

export default function RegisterMerchantPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Daftar Akaun Peniaga Borong</h1>
        <p className="text-gray-500 mt-2 text-sm">
          Daftar percuma. Dapatkan akses kepada harga borong eksklusif.
        </p>
      </div>

      <form className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Penuh *</label>
            <input
              type="text"
              placeholder="Nama penuh anda"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-thai-blue/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">No. Telefon / WhatsApp *</label>
            <input
              type="tel"
              placeholder="+60 12-345 6789"
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-thai-blue/50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Emel *</label>
          <input
            type="email"
            placeholder="email@syarikat.com"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-thai-blue/50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Nama Perniagaan *</label>
          <input
            type="text"
            placeholder="Nama kedai / restoran / syarikat"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-thai-blue/50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Jenis Perniagaan *</label>
          <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-thai-blue/50 bg-white">
            <option value="">-- Pilih jenis perniagaan --</option>
            <option>Restoran / Warung</option>
            <option>Gerai Hawker</option>
            <option>Kedai Runcit / Mini Market</option>
            <option>Pemborong / Pengedar</option>
            <option>Pengusaha Katering</option>
            <option>Lain-lain</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Negeri *</label>
          <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-thai-blue/50 bg-white">
            <option value="">-- Pilih negeri --</option>
            {STATES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Anggaran Pembelian Bulanan</label>
          <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-thai-blue/50 bg-white">
            <option value="">-- Pilih julat --</option>
            <option>Kurang dari RM 500</option>
            <option>RM 500 – RM 2,000</option>
            <option>RM 2,000 – RM 5,000</option>
            <option>RM 5,000 – RM 10,000</option>
            <option>Lebih dari RM 10,000</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-thai-red text-white font-bold py-3 rounded-xl hover:bg-thai-red-dark transition-colors mt-2"
        >
          Hantar Permohonan Pendaftaran
        </button>
        <p className="text-xs text-gray-400 text-center">
          Pasukan kami akan menghubungi anda dalam masa 1–2 hari bekerja.
        </p>
      </form>
    </div>
  );
}
