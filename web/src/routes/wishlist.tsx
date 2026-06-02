import { createFileRoute, Link } from "@tanstack/react-router";
import { Heart, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { useWishlist, useCart } from "@/lib/store";
import { products } from "@/lib/products";
import { ProductImage } from "@/components/ProductCard";

export const Route = createFileRoute("/wishlist")({
  component: WishlistPage,
});

function WishlistPage() {
  const ids = useWishlist((s) => s.ids);
  const remove = useWishlist((s) => s.remove);
  const add = useCart((s) => s.add);
  const items = products.filter((p) => ids.includes(p.id));

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-10 pb-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Lista życzeń</h1>
          <p className="text-muted-foreground mt-1">{items.length} {items.length === 1 ? "zapisany produkt" : "zapisanych produktów"}</p>
        </div>
      </div>

      {items.length === 0 ? (
        <div className="rounded-2xl glass p-16 text-center">
          <Heart className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h2 className="text-xl font-semibold">Twoja lista życzeń jest pusta</h2>
          <p className="text-muted-foreground mt-1">Zapisz klawiatury, które kochasz.</p>
          <Link to="/shop" className="inline-flex mt-6 px-5 py-3 rounded-xl gradient-primary text-white font-semibold">
            Przejdź do sklepu
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {items.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex items-center gap-4 p-4 rounded-2xl glass"
              >
                <Link to="/product/$id" params={{ id: String(p.id) }}>
                  <ProductImage product={p} className="w-20 h-20" />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link to="/product/$id" params={{ id: String(p.id) }} className="font-semibold hover:text-accent">
                    {p.name}
                  </Link>
                  <div className="text-xs text-muted-foreground">{p.category}</div>
                  <div className="text-sm font-bold mt-1">${p.price}</div>
                </div>
                <button
                  onClick={() => { add(p); toast.success("Dodano do koszyka ✓"); }}
                  disabled={p.stock === 0}
                  className="px-4 py-2.5 rounded-lg gradient-primary text-white text-sm font-semibold disabled:opacity-50"
                >
                  Do koszyka
                </button>
                <button
                  onClick={() => remove(p.id)}
                  className="grid place-items-center w-9 h-9 rounded-lg hover:bg-destructive/15 hover:text-destructive"
                  aria-label="Usuń"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
