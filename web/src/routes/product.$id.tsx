import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Heart, ShoppingCart, Minus, Plus, Check, ChevronDown, Shield, Truck, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { getProduct, products } from "@/lib/products";
import { useCart, useWishlist } from "@/lib/store";
import { ProductCard, ProductImage } from "@/components/ProductCard";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const add = useCart((s) => s.add);
  const toggleWish = useWishlist((s) => s.toggle);
  const wished = useWishlist((s) => s.ids.includes(product.id));
  const [color, setColor] = useState(product.colors?.[0]);
  const [sw, setSw] = useState(product.switches?.[0]);
  const [qty, setQty] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);
  const [tab, setTab] = useState<"description" | "specs" | "reviews">("description");

  const stockLabel =
    product.stock === 0
      ? { text: "Wyprzedane", color: "text-destructive", dot: "bg-destructive" }
      : product.stock < 10
        ? { text: `Zostało tylko ${product.stock}!`, color: "text-warning", dot: "bg-warning" }
        : { text: "Dostępne", color: "text-success", dot: "bg-success" };

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const fallbackRelated = products.filter((p) => p.id !== product.id).slice(0, 4 - related.length);
  const showRelated = [...related, ...fallbackRelated].slice(0, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 pb-20">
      <nav className="text-xs text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground">Strona główna</Link> /{" "}
        <Link to="/shop" className="hover:text-foreground">Sklep</Link> /{" "}
        <span className="text-foreground">{product.name}</span>
      </nav>

      <div className="grid lg:grid-cols-2 gap-10">
        <div>
          <motion.div
            key={imgIdx}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <ProductImage product={product} className="aspect-square w-full" showKeyboard={product.category === "Keyboards"} />
          </motion.div>
          <div className="grid grid-cols-4 gap-3 mt-4">
            {[0, 1, 2, 3].map((i) => (
              <button
                key={i}
                onClick={() => setImgIdx(i)}
                className={cn(
                  "aspect-square rounded-lg overflow-hidden border-2 transition",
                  imgIdx === i ? "border-primary glow-primary" : "border-transparent opacity-70 hover:opacity-100",
                )}
              >
                <ProductImage product={product} className="w-full h-full" />
              </button>
            ))}
          </div>
        </div>

        <div>
          {product.badge && (
            <span className="inline-block px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold uppercase tracking-wider">
              {product.badge}
            </span>
          )}
          <h1 className="mt-3 text-3xl sm:text-4xl font-bold">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3 text-sm">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className={cn("w-4 h-4", i <= Math.round(product.rating) ? "fill-warning text-warning" : "text-muted")} />
              ))}
            </div>
            <span className="font-medium">{product.rating}</span>
            <span className="text-muted-foreground">({product.reviews} opinii)</span>
          </div>

          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-4xl font-bold">${product.price}</span>
            {product.originalPrice > product.price && (
              <>
                <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                <span className="px-2 py-0.5 rounded-md bg-destructive/15 text-destructive text-xs font-bold">
                  -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              </>
            )}
          </div>

          <div className="mt-3 flex items-center gap-2 text-sm font-medium">
            <span className={`w-2 h-2 rounded-full ${stockLabel.dot} animate-pulse`} />
            <span className={stockLabel.color}>{stockLabel.text}</span>
          </div>

          <p className="mt-6 text-muted-foreground leading-relaxed">{product.description}</p>

          {product.colors && (
            <div className="mt-8">
              <div className="text-sm font-medium mb-3">Kolor: <span className="text-muted-foreground">{color}</span></div>
              <div className="flex gap-2">
                {product.colors.map((c: string) => {
                  const swatch: Record<string, string> = {
                    "Midnight Black": "bg-slate-900",
                    "Arctic White": "bg-slate-100",
                    "Deep Purple": "bg-purple-600",
                    "Stealth Grey": "bg-slate-600",
                    "Rose Gold": "bg-rose-300",
                    "Jet Black": "bg-black",
                    "Glacier White": "bg-white",
                    "Olive Green": "bg-lime-800",
                  };
                  return (
                    <button
                      key={c}
                      onClick={() => setColor(c)}
                      title={c}
                      className={cn(
                        "w-10 h-10 rounded-full border-2 transition",
                        swatch[c] ?? "bg-muted",
                        color === c ? "border-primary glow-primary scale-110" : "border-border",
                      )}
                    />
                  );
                })}
              </div>
            </div>
          )}

          {product.switches && (
            <div className="mt-6">
              <div className="text-sm font-medium mb-2">Typ switcha</div>
              <div className="relative">
                <select
                  value={sw}
                  onChange={(e) => setSw(e.target.value)}
                  className="w-full appearance-none px-4 py-3 pr-10 rounded-xl glass text-sm font-medium cursor-pointer"
                >
                  {product.switches.map((s: string) => (
                    <option key={s} value={s} className="bg-surface">{s}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          )}

          <div className="mt-6">
            <div className="text-sm font-medium mb-2">Ilość</div>
            <div className="inline-flex items-center gap-1 p-1 rounded-xl glass">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="grid place-items-center w-9 h-9 rounded-lg hover:bg-surface-elevated">
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-semibold">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="grid place-items-center w-9 h-9 rounded-lg hover:bg-surface-elevated">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              disabled={product.stock === 0}
              onClick={() => {
                add(product, qty, { color, switch: sw });
                toast.success("Dodano do koszyka ✓");
              }}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl gradient-primary text-white font-semibold glow-primary disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 active:scale-[0.98] transition"
            >
              <ShoppingCart className="w-5 h-5" />
              {product.stock === 0 ? "Wyprzedane" : "Dodaj do koszyka"}
            </button>
            <button
              onClick={() => {
                toggleWish(product.id);
                toast.success(wished ? "Usunięto z listy życzeń" : "Dodano do listy życzeń ✓");
              }}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl glass font-semibold hover:bg-surface-elevated transition"
            >
              <Heart className={cn("w-5 h-5", wished && "fill-primary text-primary")} />
              <span className="sm:hidden">Lista życzeń</span>
            </button>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs">
            {[
              { icon: Truck, label: "Darmowa pow. $100" },
              { icon: RotateCcw, label: "30 dni na zwrot" },
              { icon: Shield, label: "Dożywotnia gwarancja" },
            ].map((f) => (
              <div key={f.label} className="p-3 rounded-xl glass">
                <f.icon className="w-4 h-4 mx-auto mb-1.5 text-accent" />
                {f.label}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16">
        <div className="flex gap-1 border-b border-border">
          {(["description", "specs", "reviews"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={cn(
                "px-5 py-3 text-sm font-medium capitalize transition relative",
                tab === t ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t === "specs" ? "Specyfikacja" : t === "reviews" ? "Opinie" : "Opis"}
              {tab === t && (
                <motion.span
                  layoutId="tab-underline"
                  className="absolute inset-x-2 -bottom-px h-0.5 gradient-primary rounded-full"
                />
              )}
            </button>
          ))}
        </div>

        <div className="py-8">
          {tab === "description" && (
            <div className="max-w-3xl space-y-4 text-muted-foreground leading-relaxed">
              <p>{product.description}</p>
              <p>
                Każdy produkt MechKeys budowany jest w małych seriach i indywidualnie
                kontrolowany przed wysyłką. My obsesyjnie dbamy o detale, żebyś ty
                mógł obsesyjnie dbać o swoje rzemiosło.
              </p>
              <ul className="grid sm:grid-cols-2 gap-2 pt-2">
                {product.tags.map((t: string) => (
                  <li key={t} className="flex items-center gap-2 text-foreground">
                    <Check className="w-4 h-4 text-accent" /> {t}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {tab === "specs" && (
            <div className="max-w-2xl rounded-2xl glass overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {Object.entries(product.specs ?? { Typ: product.category, Tagi: product.tags.join(", ") }).map(([k, v], i) => (
                    <tr key={k} className={cn("border-b border-border last:border-0", i % 2 && "bg-surface/30")}>
                      <td className="py-3 px-5 font-medium text-muted-foreground w-1/3">{k}</td>
                      <td className="py-3 px-5">{String(v)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {tab === "reviews" && <Reviews rating={product.rating} count={product.reviews} />}
        </div>
      </div>

      <section className="mt-16 border-t border-border pt-12">
        <h2 className="text-2xl font-bold mb-6">Może ci się spodobać</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {showRelated.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}

function Reviews({ rating, count }: { rating: number; count: number }) {
  const breakdown = [
    { stars: 5, pct: 78 },
    { stars: 4, pct: 16 },
    { stars: 3, pct: 4 },
    { stars: 2, pct: 1 },
    { stars: 1, pct: 1 },
  ];
  const mock = [
    { name: "Aleks K.", date: "2 tygodnie temu", rating: 5, body: "Najlepsza klawiatura, na jakiej kiedykolwiek pisałem. Thock jest nierealny, a gasket mount maślany. Jakość wykonania na poziomie dwa razy droższych modeli." },
    { name: "Mira S.", date: "miesiąc temu", rating: 5, body: "Przesiadłam się z Logitecha i nie wracam. Tryb wireless stabilny, a bateria naprawdę długo trzyma." },
    { name: "Jurek T.", date: "miesiąc temu", rating: 4, body: "Uwielbiam. Dzień zajęło mi przyzwyczajenie się do layoutu, teraz piszę szybciej niż kiedykolwiek. Szkoda tylko, że keycapy nie są shine-through." },
    { name: "Sam W.", date: "2 miesiące temu", rating: 5, body: "Koduję na tym cały dzień. Taktylny bump *palce lizać*. Warty każdego grosza." },
  ];
  return (
    <div className="grid lg:grid-cols-[280px_1fr] gap-10">
      <div className="text-center lg:text-left">
        <div className="text-6xl font-bold gradient-text">{rating}</div>
        <div className="flex justify-center lg:justify-start gap-0.5 my-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <Star key={i} className={cn("w-5 h-5", i <= Math.round(rating) ? "fill-warning text-warning" : "text-muted")} />
          ))}
        </div>
        <div className="text-sm text-muted-foreground">Na podstawie {count} opinii</div>
        <div className="mt-6 space-y-2">
          {breakdown.map((b) => (
            <div key={b.stars} className="flex items-center gap-3 text-xs">
              <span className="w-6 font-mono">{b.stars}★</span>
              <div className="flex-1 h-2 rounded-full bg-surface-elevated overflow-hidden">
                <div className="h-full gradient-primary" style={{ width: `${b.pct}%` }} />
              </div>
              <span className="w-8 text-right font-mono text-muted-foreground">{b.pct}%</span>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-4">
        {mock.map((r) => (
          <div key={r.name} className="p-5 rounded-2xl glass">
            <div className="flex items-center gap-3">
              <div className="grid place-items-center w-10 h-10 rounded-full gradient-primary font-semibold text-white text-sm">
                {r.name[0]}
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">{r.name}</div>
                <div className="text-xs text-muted-foreground">{r.date}</div>
              </div>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className={cn("w-3.5 h-3.5", i <= r.rating ? "fill-warning text-warning" : "text-muted")} />
                ))}
              </div>
            </div>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{r.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
