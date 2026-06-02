import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ChevronDown, Star, X } from "lucide-react";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";

type Search = {
  category?: string;
};

export const Route = createFileRoute("/shop")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    category: typeof s.category === "string" ? s.category : undefined,
  }),
  component: Shop,
});

const CATS_LABELS: Record<string, string> = {
  All: "Wszystko",
  Keyboards: "Klawiatury",
  Switches: "Switche",
  Keycaps: "Keycapy",
  Accessories: "Akcesoria",
};
const CATS = ["All", "Keyboards", "Switches", "Keycaps", "Accessories"];
const SORTS = [
  { id: "featured", label: "Wyróżnione" },
  { id: "price-asc", label: "Cena: Rosnąco" },
  { id: "price-desc", label: "Cena: Malejąco" },
  { id: "rated", label: "Najlepiej oceniane" },
  { id: "newest", label: "Najnowsze" },
] as const;

function Shop() {
  const { category: urlCat } = Route.useSearch();
  const [cat, setCat] = useState<string>(urlCat ?? "All");
  const [price, setPrice] = useState<number>(400);
  const [minRating, setMinRating] = useState<number>(0);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<(typeof SORTS)[number]["id"]>("featured");

  const filtered = useMemo(() => {
    let r = products.slice();
    if (cat !== "All") r = r.filter((p) => p.category === cat);
    r = r.filter((p) => p.price <= price);
    if (minRating) r = r.filter((p) => p.rating >= minRating);
    if (inStockOnly) r = r.filter((p) => p.stock > 0);

    switch (sort) {
      case "price-asc": r.sort((a, b) => a.price - b.price); break;
      case "price-desc": r.sort((a, b) => b.price - a.price); break;
      case "rated": r.sort((a, b) => b.rating - a.rating); break;
      case "newest": r.sort((a, b) => b.id - a.id); break;
    }
    return r;
  }, [cat, price, minRating, inStockOnly, sort]);

  const activeChips: { label: string; clear: () => void }[] = [];
  if (cat !== "All") activeChips.push({ label: CATS_LABELS[cat] ?? cat, clear: () => setCat("All") });
  if (price < 400) activeChips.push({ label: `≤ $${price}`, clear: () => setPrice(400) });
  if (minRating) activeChips.push({ label: `${minRating}★ i więcej`, clear: () => setMinRating(0) });
  if (inStockOnly) activeChips.push({ label: "Dostępne", clear: () => setInStockOnly(false) });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10 pb-20">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Sklep</h1>
        <p className="text-muted-foreground mt-1">Każdy element. Każdy layout. Każdy switch.</p>
      </div>

      <div className="grid lg:grid-cols-[260px_1fr] gap-8">
        <aside className="space-y-6">
          <FilterBlock title="Kategoria">
            <div className="flex flex-col gap-1">
              {CATS.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  className={`text-left px-3 py-2 rounded-lg text-sm transition ${
                    cat === c ? "bg-primary/15 text-foreground font-medium" : "text-muted-foreground hover:bg-surface-elevated"
                  }`}
                >
                  {CATS_LABELS[c] ?? c}
                </button>
              ))}
            </div>
          </FilterBlock>

          <FilterBlock title="Cena">
            <div className="px-1">
              <input
                type="range"
                min={0}
                max={400}
                step={10}
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full accent-[var(--primary)]"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2 font-mono">
                <span>$0</span><span className="text-foreground">$0 – ${price}</span><span>$400</span>
              </div>
            </div>
          </FilterBlock>

          <FilterBlock title="Ocena">
            <div className="flex flex-col gap-1">
              {[0, 4, 4.5, 4.8].map((r) => (
                <button
                  key={r}
                  onClick={() => setMinRating(r)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${
                    minRating === r ? "bg-primary/15 font-medium" : "text-muted-foreground hover:bg-surface-elevated"
                  }`}
                >
                  <Star className="w-3.5 h-3.5 fill-warning text-warning" />
                  {r === 0 ? "Dowolna ocena" : `${r}+ gwiazdek`}
                </button>
              ))}
            </div>
          </FilterBlock>

          <FilterBlock title="Dostępność">
            <label className="flex items-center gap-3 px-3 py-2 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-4 h-4 accent-[var(--primary)]"
              />
              Tylko dostępne
            </label>
          </FilterBlock>
        </aside>

        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <div className="text-sm text-muted-foreground">
              Pokazano <span className="text-foreground font-medium">{filtered.length}</span> z {products.length} produktów
            </div>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as any)}
                className="appearance-none pl-4 pr-9 py-2 rounded-lg glass text-sm font-medium cursor-pointer"
              >
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id} className="bg-surface">
                    {s.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none" />
            </div>
          </div>

          {activeChips.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-5">
              {activeChips.map((c, i) => (
                <button
                  key={i}
                  onClick={c.clear}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full glass text-xs hover:bg-destructive/20 hover:border-destructive/40 transition"
                >
                  {c.label} <X className="w-3 h-3" />
                </button>
              ))}
            </div>
          )}

          {filtered.length === 0 ? (
            <div className="p-16 text-center rounded-2xl glass">
              <p className="text-muted-foreground">Żaden produkt nie pasuje do filtrów.</p>
              <button onClick={() => { setCat("All"); setPrice(400); setMinRating(0); setInStockOnly(false); }} className="mt-4 text-accent text-sm hover:underline">
                Wyczyść filtry
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FilterBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl glass p-4">
      <h3 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3 px-1">
        {title}
      </h3>
      {children}
    </div>
  );
}

// keep Link import referenced
void Link;
