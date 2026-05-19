export interface PriceTier {
  label: string;
  labelMs: string;
  minQty: number;
  maxQty: number | null;
  pricePerUnit: number;
  badge?: string;
}

export interface Product {
  id: string;
  name: string;
  nameMs: string;
  category: string;
  categoryMs: string;
  description: string;
  descriptionMs: string;
  unit: string;
  unitMs: string;
  weight: string;
  origin: string;
  moq: number;
  priceTiers: PriceTier[];
  emoji: string;
  tags: string[];
  inStock: boolean;
  requiresChilledLogistics: boolean;
}

export const CATEGORIES = [
  { id: 'snacks-sauces', name: 'Thai Snacks, Dry Foods & Sauces', nameMs: 'Snek Thai, Makanan Kering & Sos' },
  { id: 'frozen-seafood', name: 'Frozen Seafood (Chilled Logistics)', nameMs: 'Makanan Laut Sejuk Beku 🧊' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'pes-tomyam-ros',
    name: 'Tom Yam Paste (Ros)',
    nameMs: 'Pes Tomyam Ros',
    category: 'snacks-sauces',
    categoryMs: 'Snek Thai, Makanan Kering & Sos',
    description: 'Authentic Thai Tom Yam paste with rich roasted chili and lemongrass flavor.',
    descriptionMs: 'Pes Tomyam Thai asli dengan cita rasa cili panggang dan serai yang kaya. Sesuai untuk sup tomyam, masak lemak, dan pelbagai hidangan.',
    unit: 'jar',
    unitMs: 'balang',
    weight: '200g',
    origin: 'Thailand',
    moq: 1,
    emoji: '🍲',
    priceTiers: [
      { label: 'Retail', labelMs: 'Runcit', minQty: 1, maxQty: 11, pricePerUnit: 6.50 },
      { label: 'Dealer', labelMs: 'Dealer', minQty: 12, maxQty: 35, pricePerUnit: 5.80, badge: 'POPULAR' },
      { label: 'Wholesale', labelMs: 'Borong', minQty: 36, maxQty: null, pricePerUnit: 5.00, badge: 'TERBAIK' },
    ],
    tags: ['pes', 'tomyam', 'sup', 'kari'],
    inStock: true,
    requiresChilledLogistics: false,
  },
  {
    id: 'sos-hijau-thai',
    name: 'Thai Green Sauce',
    nameMs: 'Sos Hijau Thai',
    category: 'snacks-sauces',
    categoryMs: 'Snek Thai, Makanan Kering & Sos',
    description: 'Sweet and spicy Thai green chili sauce, perfect for grilled meats and seafood.',
    descriptionMs: 'Sos cili hijau Thai yang manis dan pedas. Sesuai untuk daging panggang, ayam goreng, dan makanan laut. Kegemaran ramai pelanggan restoran.',
    unit: 'bottle',
    unitMs: 'botol',
    weight: '300ml',
    origin: 'Thailand',
    moq: 1,
    emoji: '🫙',
    priceTiers: [
      { label: 'Retail', labelMs: 'Runcit', minQty: 1, maxQty: 11, pricePerUnit: 5.50 },
      { label: 'Dealer', labelMs: 'Dealer', minQty: 12, maxQty: 35, pricePerUnit: 4.80, badge: 'POPULAR' },
      { label: 'Wholesale', labelMs: 'Borong', minQty: 36, maxQty: null, pricePerUnit: 4.20, badge: 'TERBAIK' },
    ],
    tags: ['sos', 'cili', 'hijau', 'pedas'],
    inStock: true,
    requiresChilledLogistics: false,
  },
  {
    id: 'rumpai-laut-rangup',
    name: 'Crispy Seaweed Snack',
    nameMs: 'Rumpai Laut Rangup',
    category: 'snacks-sauces',
    categoryMs: 'Snek Thai, Makanan Kering & Sos',
    description: 'Light and crispy Thai seaweed snack, popular among all ages.',
    descriptionMs: 'Snek rumpai laut Thai yang ringan dan rangup. Popular di kalangan semua peringkat umur. Dijual dalam kotak 20 pek mini.',
    unit: 'box (20 packs)',
    unitMs: 'kotak',
    weight: '4g × 20 pek',
    origin: 'Thailand',
    moq: 1,
    emoji: '🌿',
    priceTiers: [
      { label: 'Retail', labelMs: 'Runcit', minQty: 1, maxQty: 11, pricePerUnit: 12.00 },
      { label: 'Dealer', labelMs: 'Dealer', minQty: 12, maxQty: 35, pricePerUnit: 10.50, badge: 'POPULAR' },
      { label: 'Wholesale', labelMs: 'Borong', minQty: 36, maxQty: null, pricePerUnit: 9.00, badge: 'TERBAIK' },
    ],
    tags: ['rumpai laut', 'snek', 'rangup', 'ringan'],
    inStock: true,
    requiresChilledLogistics: false,
  },
  {
    id: 'sate-ikan-thai',
    name: 'Fish Satay Snack',
    nameMs: 'Sate Ikan Thai',
    category: 'snacks-sauces',
    categoryMs: 'Snek Thai, Makanan Kering & Sos',
    description: 'Savory and chewy Thai fish satay snack, great for hawker stalls.',
    descriptionMs: 'Snek sate ikan Thai yang lazat dan kenyal. Sesuai untuk dijual semula di gerai peniaga dan kedai runcit. Tahan lama dan mudah disimpan.',
    unit: 'pack',
    unitMs: 'pek',
    weight: '30g',
    origin: 'Thailand',
    moq: 1,
    emoji: '🍢',
    priceTiers: [
      { label: 'Retail', labelMs: 'Runcit', minQty: 1, maxQty: 23, pricePerUnit: 3.50 },
      { label: 'Dealer', labelMs: 'Dealer', minQty: 24, maxQty: 47, pricePerUnit: 3.00, badge: 'POPULAR' },
      { label: 'Wholesale', labelMs: 'Borong', minQty: 48, maxQty: null, pricePerUnit: 2.50, badge: 'TERBAIK' },
    ],
    tags: ['sate', 'ikan', 'snek', 'kenyal'],
    inStock: true,
    requiresChilledLogistics: false,
  },
  {
    id: 'lokcing-thai',
    name: 'Thai Fish Cake Crackers (Lokcing)',
    nameMs: 'Lokcing Thai',
    category: 'snacks-sauces',
    categoryMs: 'Snek Thai, Makanan Kering & Sos',
    description: 'Crunchy Thai fish cake crackers with authentic flavors, a bestseller.',
    descriptionMs: 'Kerepek kek ikan Thai yang rangup dengan perisa asli. Produk terlaris di kalangan peniaga gerai dan restoran Thai. Sesuai sebagai ulam atau snek.',
    unit: 'pack',
    unitMs: 'pek',
    weight: '100g',
    origin: 'Thailand',
    moq: 1,
    emoji: '🥨',
    priceTiers: [
      { label: 'Retail', labelMs: 'Runcit', minQty: 1, maxQty: 11, pricePerUnit: 7.50 },
      { label: 'Dealer', labelMs: 'Dealer', minQty: 12, maxQty: 35, pricePerUnit: 6.50, badge: 'POPULAR' },
      { label: 'Wholesale', labelMs: 'Borong', minQty: 36, maxQty: null, pricePerUnit: 5.50, badge: 'TERBAIK' },
    ],
    tags: ['lokcing', 'kerepek', 'ikan', 'rangup'],
    inStock: true,
    requiresChilledLogistics: false,
  },
  {
    id: 'pes-kari-kuning',
    name: 'Thai Yellow Curry Paste',
    nameMs: 'Pes Kari Kuning Thai',
    category: 'snacks-sauces',
    categoryMs: 'Snek Thai, Makanan Kering & Sos',
    description: 'Aromatic Thai yellow curry paste made with turmeric and spices.',
    descriptionMs: 'Pes kari kuning Thai yang harum dengan kunyit dan rempah ratus pilihan. Sesuai untuk kari ayam, daging, dan sayur-sayuran.',
    unit: 'jar',
    unitMs: 'balang',
    weight: '400g',
    origin: 'Thailand',
    moq: 1,
    emoji: '🍛',
    priceTiers: [
      { label: 'Retail', labelMs: 'Runcit', minQty: 1, maxQty: 11, pricePerUnit: 8.50 },
      { label: 'Dealer', labelMs: 'Dealer', minQty: 12, maxQty: 35, pricePerUnit: 7.50, badge: 'POPULAR' },
      { label: 'Wholesale', labelMs: 'Borong', minQty: 36, maxQty: null, pricePerUnit: 6.50, badge: 'TERBAIK' },
    ],
    tags: ['pes', 'kari', 'kuning', 'rempah'],
    inStock: true,
    requiresChilledLogistics: false,
  },

  // ── Frozen Seafood (Chilled Logistics Required) ──────────────────────────
  {
    id: 'lala-sejuk-beku',
    name: 'Frozen Clams (Lala)',
    nameMs: 'Lala Sejuk Beku',
    category: 'frozen-seafood',
    categoryMs: 'Makanan Laut Sejuk Beku 🧊',
    description: 'Fresh-frozen Thai hard-shell clams, cleaned and packed in vacuum bags.',
    descriptionMs: 'Lala cangkerang keras Thailand yang dibekukan segar, dibersihkan dan dibungkus vakum. Segar, rangup, sesuai untuk tomyam lala dan masak cili.',
    unit: 'kg',
    unitMs: 'kg',
    weight: 'per kg (beg vakum)',
    origin: 'Thailand',
    moq: 5,
    emoji: '🐚',
    priceTiers: [
      { label: 'Retail', labelMs: 'Runcit', minQty: 5, maxQty: 19, pricePerUnit: 22.00 },
      { label: 'Dealer', labelMs: 'Dealer', minQty: 20, maxQty: 49, pricePerUnit: 19.50, badge: 'POPULAR' },
      { label: 'Wholesale', labelMs: 'Borong', minQty: 50, maxQty: null, pricePerUnit: 17.00, badge: 'TERBAIK' },
    ],
    tags: ['lala', 'kerang', 'sejuk beku', 'tomyam'],
    inStock: true,
    requiresChilledLogistics: true,
  },
  {
    id: 'lobster-thai',
    name: 'Thai Lobster (Frozen)',
    nameMs: 'Udang Lobster Thai (Sejuk Beku)',
    category: 'frozen-seafood',
    categoryMs: 'Makanan Laut Sejuk Beku 🧊',
    description: 'Premium Thai spiny lobster, IQF-frozen whole, graded by size.',
    descriptionMs: 'Udang lobster berduri Thailand berkualiti premium, dibekukan IQF dalam keadaan segar, bersaiz seragam. Sesuai untuk restoran dan katering mewah.',
    unit: 'kg',
    unitMs: 'kg',
    weight: 'per kg (~300–500g/ekor)',
    origin: 'Thailand',
    moq: 2,
    emoji: '🦞',
    priceTiers: [
      { label: 'Retail', labelMs: 'Runcit', minQty: 2, maxQty: 9, pricePerUnit: 95.00 },
      { label: 'Dealer', labelMs: 'Dealer', minQty: 10, maxQty: 24, pricePerUnit: 85.00, badge: 'POPULAR' },
      { label: 'Wholesale', labelMs: 'Borong', minQty: 25, maxQty: null, pricePerUnit: 78.00, badge: 'TERBAIK' },
    ],
    tags: ['lobster', 'udang', 'sejuk beku', 'premium'],
    inStock: true,
    requiresChilledLogistics: true,
  },
  {
    id: 'lokching-sejuk-beku',
    name: 'Fresh Fish Cake — Lokching (Frozen)',
    nameMs: 'Lokching Ikan Segar (Sejuk Beku)',
    category: 'frozen-seafood',
    categoryMs: 'Makanan Laut Sejuk Beku 🧊',
    description: 'Soft and springy Thai fish cake (lokching), made fresh and frozen. Not to be confused with dried lokcing crackers.',
    descriptionMs: 'Kek ikan Thai yang lembut dan kenyal (lokching), dibuat segar dan dibekukan. Berbeza dengan lokcing kering. Sesuai untuk tomyam, steamboat, dan goreng.',
    unit: 'pek (500g)',
    unitMs: 'pek',
    weight: '500g/pek',
    origin: 'Thailand',
    moq: 10,
    emoji: '🐟',
    priceTiers: [
      { label: 'Retail', labelMs: 'Runcit', minQty: 10, maxQty: 29, pricePerUnit: 12.50 },
      { label: 'Dealer', labelMs: 'Dealer', minQty: 30, maxQty: 59, pricePerUnit: 11.00, badge: 'POPULAR' },
      { label: 'Wholesale', labelMs: 'Borong', minQty: 60, maxQty: null, pricePerUnit: 9.50, badge: 'TERBAIK' },
    ],
    tags: ['lokching', 'kek ikan', 'sejuk beku', 'steamboat'],
    inStock: true,
    requiresChilledLogistics: true,
  },
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getActiveTier(product: Product, qty: number): PriceTier {
  const sorted = [...product.priceTiers].sort((a, b) => b.minQty - a.minQty);
  return sorted.find((t) => qty >= t.minQty) ?? product.priceTiers[0];
}
