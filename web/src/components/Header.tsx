import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  Keyboard,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCart, useWishlist, useUI } from "@/lib/store";
import { products } from "@/lib/products";
import { ProductImage } from "./ProductCard";

const navItems = [
  { to: "/shop", label: "Sklep" },
  { to: "/shop", label: "Switche", search: { category: "Switches" } },
  { to: "/shop", label: "Keycapy", search: { category: "Keycaps" } },
  { to: "/about", label: "O nas" },
];

export function Header() {
  const pathname = useRouterState({ select: (r) => r.location.pathname });
  const cartCount = useCart((s) => s.items.reduce((a, b) => a + b.qty, 0));
  const wishCount = useWishlist((s) => s.ids.length);
  const { mobileOpen, setMobileOpen, searchOpen, setSearchOpen } = useUI();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname, setMobileOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all ${
          scrolled
            ? "glass border-b border-border/60"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="grid place-items-center w-9 h-9 rounded-lg gradient-primary glow-primary">
                <Keyboard className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight">
                Mech<span className="gradient-text">Keys</span>
              </span>
            </Link>
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((n) => (
                <Link
                  key={n.label}
                  to={n.to}
                  search={n.search as any}
                  className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition"
                  activeProps={{ className: "text-foreground" }}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="grid place-items-center w-10 h-10 rounded-lg hover:bg-surface-elevated transition"
            >
              <Search className="w-5 h-5" />
            </button>
            <Link
              to="/wishlist"
              aria-label="Wishlist"
              className="relative grid place-items-center w-10 h-10 rounded-lg hover:bg-surface-elevated transition"
            >
              <Heart className="w-5 h-5" />
              {wishCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-accent text-accent-foreground text-[10px] font-bold grid place-items-center">
                  {wishCount}
                </span>
              )}
            </Link>
            <Link
              to="/cart"
              aria-label="Cart"
              className="relative grid place-items-center w-10 h-10 rounded-lg hover:bg-surface-elevated transition"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full gradient-primary text-white text-[10px] font-bold grid place-items-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <Link
              to="/account"
              aria-label="Account"
              className="hidden sm:grid place-items-center w-10 h-10 rounded-lg hover:bg-surface-elevated transition"
            >
              <User className="w-5 h-5" />
            </Link>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
              className="md:hidden grid place-items-center w-10 h-10 rounded-lg hover:bg-surface-elevated transition"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border glass overflow-hidden"
            >
              <nav className="px-4 py-4 flex flex-col gap-1">
                {navItems.map((n) => (
                  <Link
                    key={n.label}
                    to={n.to}
                    search={n.search as any}
                    className="px-3 py-2.5 rounded-lg hover:bg-surface-elevated text-sm font-medium"
                  >
                    {n.label}
                  </Link>
                ))}
                <Link
                  to="/account"
                  className="px-3 py-2.5 rounded-lg hover:bg-surface-elevated text-sm font-medium"
                >
                  Konto
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}

function SearchModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (!open) setQ("");
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const results = q
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(q.toLowerCase()) ||
          p.category.toLowerCase().includes(q.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(q.toLowerCase())),
      )
    : products.slice(0, 4);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-md p-4 sm:p-10"
        >
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            onClick={(e) => e.stopPropagation()}
            className="mx-auto max-w-2xl rounded-2xl glass overflow-hidden"
          >
            <div className="flex items-center gap-3 p-4 border-b border-border">
              <Search className="w-5 h-5 text-muted-foreground" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Szukaj klawiatur, switchy, keycapów..."
                className="flex-1 bg-transparent outline-none text-base placeholder:text-muted-foreground"
              />
              <button
                onClick={onClose}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                ESC
              </button>
            </div>
            <div className="max-h-[60vh] overflow-y-auto p-3">
              {results.length === 0 && (
                <div className="p-8 text-center text-muted-foreground text-sm">
                  Brak wyników dla "{q}"
                </div>
              )}
              <div className="grid gap-2">
                {results.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      navigate({ to: "/product/$id", params: { id: String(p.id) } });
                      onClose();
                    }}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-surface-elevated text-left transition"
                  >
                    <ProductImage product={p} className="w-14 h-14 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm truncate">{p.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {p.category} · ${p.price}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
