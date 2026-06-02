import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, X, ShoppingBag, Tag, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { useCart, cartTotals } from "@/lib/store";
import { ProductImage } from "@/components/ProductCard";

export const Route = createFileRoute("/cart")({
  component: CartPage,
});

function CartPage() {
  const items = useCart((s) => s.items);
  const promo = useCart((s) => s.promo);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const applyPromo = useCart((s) => s.applyPromo);
  const removePromo = useCart((s) => s.removePromo);
  const totals = cartTotals(items, promo);
  const [code, setCode] = useState("");
  const [promoErr, setPromoErr] = useState(false);

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <div className="grid place-items-center mx-auto w-20 h-20 rounded-2xl glass mb-6">
          <ShoppingBag className="w-9 h-9 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-bold">Twój koszyk jest pusty</h1>
        <p className="mt-2 text-muted-foreground">Czas znaleźć swoją kolejną obsesję na punkcie klawiatur.</p>
        <Link
          to="/shop"
          className="inline-flex mt-8 px-6 py-3.5 rounded-xl gradient-primary text-white font-semibold"
        >
          Rozpocznij zakupy
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-20">
      <h1 className="text-3xl font-bold mb-2">Twój koszyk</h1>
      <p className="text-muted-foreground mb-8">{totals.itemCount} {totals.itemCount === 1 ? "produkt" : "produktów"}</p>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8">
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex gap-4 p-4 rounded-2xl glass"
              >
                <Link to="/product/$id" params={{ id: String(item.id) }} className="flex-shrink-0">
                  <ProductImage product={item.product} className="w-24 h-24 sm:w-28 sm:h-28" />
                </Link>
                <div className="flex-1 min-w-0 flex flex-col">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <Link to="/product/$id" params={{ id: String(item.id) }} className="font-semibold hover:text-accent">
                        {item.product.name}
                      </Link>
                      <div className="text-xs text-muted-foreground mt-0.5">
                        {item.product.category}
                        {item.variant?.color && ` · ${item.variant.color}`}
                        {item.variant?.switch && ` · ${item.variant.switch}`}
                      </div>
                    </div>
                    <button
                      onClick={() => { remove(item.id); toast("Usunięto z koszyka"); }}
                      className="grid place-items-center w-8 h-8 rounded-lg hover:bg-destructive/15 hover:text-destructive transition"
                      aria-label="Usuń"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="mt-auto flex items-center justify-between gap-3 pt-3">
                    <div className="inline-flex items-center gap-1 p-1 rounded-lg glass">
                      <button onClick={() => setQty(item.id, item.qty - 1)} className="grid place-items-center w-7 h-7 rounded hover:bg-surface-elevated">
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                      <button onClick={() => setQty(item.id, item.qty + 1)} className="grid place-items-center w-7 h-7 rounded hover:bg-surface-elevated">
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="font-bold">${(item.product.price * item.qty).toFixed(2)}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <Link to="/shop" className="inline-block mt-4 text-sm text-accent hover:underline">
            ← Kontynuuj zakupy
          </Link>
        </div>

        <div className="lg:sticky lg:top-24 self-start">
          <div className="rounded-2xl glass p-6">
            <h2 className="font-bold text-lg mb-5">Podsumowanie zamówienia</h2>

            <div className="mb-5">
              {promo ? (
                <div className="flex items-center justify-between p-3 rounded-lg bg-success/10 border border-success/30 text-sm">
                  <span className="flex items-center gap-2 text-success font-medium">
                    <Check className="w-4 h-4" /> {promo} zastosowany
                  </span>
                  <button onClick={removePromo} className="text-xs text-muted-foreground hover:text-foreground">Usuń</button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const ok = applyPromo(code);
                    if (ok) { toast.success("Kod promocyjny zastosowany ✓"); setPromoErr(false); }
                    else { setPromoErr(true); toast.error("Nieprawidłowy kod"); }
                  }}
                  className="space-y-2"
                >
                  <label className="text-xs text-muted-foreground flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5" /> Kod promocyjny (wypróbuj MECH20)
                  </label>
                  <div className="flex gap-2">
                    <input
                      value={code}
                      onChange={(e) => { setCode(e.target.value); setPromoErr(false); }}
                      placeholder="Kod"
                      className={`flex-1 px-3 py-2.5 rounded-lg bg-input border ${promoErr ? "border-destructive" : "border-border"} text-sm uppercase outline-none focus:border-primary`}
                    />
                    <button className="px-4 py-2.5 rounded-lg gradient-primary text-white text-sm font-semibold">Zastosuj</button>
                  </div>
                  {promoErr && (
                    <p className="text-xs text-destructive flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> Nieprawidłowy kod
                    </p>
                  )}
                </form>
              )}
            </div>

            <div className="space-y-2.5 text-sm">
              <Row label="Suma częściowa" value={`$${totals.subtotal.toFixed(2)}`} />
              {totals.discount > 0 && <Row label="Rabat" value={`-$${totals.discount.toFixed(2)}`} highlight />}
              <Row label="Wysyłka" value={totals.shipping === 0 ? "Darmowa" : `$${totals.shipping.toFixed(2)}`} />
              {totals.shipping > 0 && (
                <p className="text-xs text-muted-foreground">Dodaj jeszcze ${(100 - (totals.subtotal - totals.discount)).toFixed(2)}, aby uzyskać darmową wysyłkę.</p>
              )}
              <Row label="VAT (8%)" value={`$${totals.tax.toFixed(2)}`} />
            </div>

            <div className="border-t border-border my-5" />

            <div className="flex items-baseline justify-between">
              <span className="font-bold text-lg">Razem</span>
              <span className="text-2xl font-bold gradient-text">${totals.total.toFixed(2)}</span>
            </div>

            <Link
              to="/checkout"
              className="mt-6 inline-flex w-full items-center justify-center px-6 py-4 rounded-xl gradient-primary text-white font-semibold glow-primary hover:opacity-90 transition"
            >
              Przejdź do kasy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{label}</span>
      <span className={highlight ? "text-success font-semibold" : "font-medium"}>{value}</span>
    </div>
  );
}
