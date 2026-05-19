'use client';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { Product, PriceTier } from '@/lib/products';
import { getActiveTier } from '@/lib/products';

export interface CartItem {
  product: Product;
  qty: number;
  tier: PriceTier;
}

interface CartContextValue {
  items: CartItem[];
  addItem: (product: Product, qty: number) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  standardSubtotal: number;
  chilledSubtotal: number;
  grandTotal: number;
  hasStandard: boolean;
  hasChilled: boolean;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'barangthailand_cart_v1';

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = useCallback((product: Product, qty: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      const newQty = existing ? existing.qty + qty : qty;
      const tier = getActiveTier(product, newQty);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: newQty, tier } : i
        );
      }
      return [...prev, { product, qty: newQty, tier }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  }, []);

  const updateQty = useCallback((productId: string, qty: number) => {
    setItems((prev) =>
      prev.map((i) => {
        if (i.product.id !== productId) return i;
        const newQty = Math.max(i.product.moq, qty);
        return { ...i, qty: newQty, tier: getActiveTier(i.product, newQty) };
      })
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const standardItems = items.filter((i) => !i.product.requiresChilledLogistics);
  const chilledItems = items.filter((i) => i.product.requiresChilledLogistics);
  const standardSubtotal = standardItems.reduce(
    (sum, i) => sum + i.qty * i.tier.pricePerUnit,
    0
  );
  const chilledSubtotal = chilledItems.reduce(
    (sum, i) => sum + i.qty * i.tier.pricePerUnit,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQty,
        clearCart,
        totalItems: items.reduce((sum, i) => sum + i.qty, 0),
        standardSubtotal,
        chilledSubtotal,
        grandTotal: standardSubtotal + chilledSubtotal,
        hasStandard: standardItems.length > 0,
        hasChilled: chilledItems.length > 0,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
