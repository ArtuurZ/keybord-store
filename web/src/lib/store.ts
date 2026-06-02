import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "./products";

export type CartItem = {
  id: number;
  product: Product;
  qty: number;
  variant?: { color?: string; switch?: string };
};

type CartState = {
  items: CartItem[];
  promo: string | null;
  add: (p: Product, qty?: number, variant?: CartItem["variant"]) => void;
  remove: (id: number) => void;
  setQty: (id: number, qty: number) => void;
  clear: () => void;
  applyPromo: (code: string) => boolean;
  removePromo: () => void;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      promo: null,
      add: (p, qty = 1, variant) =>
        set((s) => {
          const existing = s.items.find((i) => i.id === p.id);
          if (existing) {
            return {
              items: s.items.map((i) =>
                i.id === p.id ? { ...i, qty: i.qty + qty } : i,
              ),
            };
          }
          return { items: [...s.items, { id: p.id, product: p, qty, variant }] };
        }),
      remove: (id) => set((s) => ({ items: s.items.filter((i) => i.id !== id) })),
      setQty: (id, qty) =>
        set((s) => ({
          items: s.items
            .map((i) => (i.id === id ? { ...i, qty: Math.max(1, qty) } : i))
            .filter((i) => i.qty > 0),
        })),
      clear: () => set({ items: [], promo: null }),
      applyPromo: (code) => {
        if (code.toUpperCase() === "MECH20") {
          set({ promo: "MECH20" });
          return true;
        }
        return false;
      },
      removePromo: () => set({ promo: null }),
    }),
    { name: "mk-cart" },
  ),
);

export const cartTotals = (items: CartItem[], promo: string | null) => {
  const subtotal = items.reduce((s, i) => s + i.product.price * i.qty, 0);
  const discount = promo === "MECH20" ? subtotal * 0.2 : 0;
  const afterDiscount = subtotal - discount;
  const shipping = afterDiscount >= 100 || afterDiscount === 0 ? 0 : 9.99;
  const tax = afterDiscount * 0.08;
  const total = afterDiscount + shipping + tax;
  const itemCount = items.reduce((s, i) => s + i.qty, 0);
  return { subtotal, discount, shipping, tax, total, itemCount };
};

type WishState = {
  ids: number[];
  toggle: (id: number) => void;
  has: (id: number) => boolean;
  remove: (id: number) => void;
};

export const useWishlist = create<WishState>()(
  persist(
    (set, get) => ({
      ids: [],
      toggle: (id) =>
        set((s) => ({
          ids: s.ids.includes(id) ? s.ids.filter((i) => i !== id) : [...s.ids, id],
        })),
      has: (id) => get().ids.includes(id),
      remove: (id) => set((s) => ({ ids: s.ids.filter((i) => i !== id) })),
    }),
    { name: "mk-wishlist" },
  ),
);

type UIState = {
  mobileOpen: boolean;
  searchOpen: boolean;
  setMobileOpen: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;
};

export const useUI = create<UIState>((set) => ({
  mobileOpen: false,
  searchOpen: false,
  setMobileOpen: (v) => set({ mobileOpen: v }),
  setSearchOpen: (v) => set({ searchOpen: v }),
}));
