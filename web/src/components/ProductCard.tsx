import { Link } from "@tanstack/react-router";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import type { Product } from "@/lib/products";
import { useCart, useWishlist } from "@/lib/store";
import { cn } from "@/lib/utils";

export function ProductImage({
  product,
  className,
  showKeyboard = false,
}: {
  product: Product;
  className?: string;
  showKeyboard?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl bg-gradient-to-br",
        product.gradient,
        className,
      )}
    >
      <img
        src={product.image}
        alt={product.name}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md glass text-[10px] font-mono uppercase tracking-wider text-white/80">
        {product.category}
      </div>
    </div>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const add = useCart((s) => s.add);
  const toggle = useWishlist((s) => s.toggle);
  const wished = useWishlist((s) => s.ids.includes(product.id));
  const soldOut = product.stock === 0;

  const badgeColor: Record<string, string> = {
    Bestseller: "bg-primary text-primary-foreground",
    Nowość: "bg-accent text-accent-foreground",
    Promocja: "bg-destructive text-destructive-foreground",
    "Wyprzedane": "bg-muted text-muted-foreground",
    "Top": "bg-accent text-accent-foreground",
    "Ulubieniec": "bg-primary text-primary-foreground",
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="group relative flex flex-col rounded-2xl glass overflow-hidden hover:border-primary/40 transition-colors"
    >
      <Link to="/product/$id" params={{ id: String(product.id) }} className="block">
        <ProductImage product={product} className="aspect-[4/3] w-full" />
        {product.badge && (
          <span
            className={cn(
              "absolute top-3 left-3 px-2.5 py-1 rounded-full text-[10px] font-semibold tracking-wide uppercase",
              badgeColor[product.badge] ?? "bg-secondary text-secondary-foreground",
            )}
          >
            {product.badge}
          </span>
        )}
      </Link>
      <button
        aria-label="Wishlist"
        onClick={(e) => {
          e.preventDefault();
          toggle(product.id);
          toast.success(wished ? "Removed from wishlist" : "Added to wishlist ✓");
        }}
        className="absolute top-3 right-3 grid place-items-center w-9 h-9 rounded-full glass hover:bg-primary/20 transition"
      >
        <Heart
          className={cn("w-4 h-4", wished ? "fill-primary text-primary" : "text-white")}
        />
      </button>

      <div className="flex flex-col gap-2 p-4 flex-1">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">
          {product.category}
        </span>
        <Link
          to="/product/$id"
          params={{ id: String(product.id) }}
          className="font-semibold leading-tight hover:text-accent transition"
        >
          {product.name}
        </Link>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Star className="w-3.5 h-3.5 fill-warning text-warning" />
          <span className="text-foreground font-medium">{product.rating}</span>
          <span>({product.reviews})</span>
        </div>
        <div className="mt-1 flex items-end justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold">${product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-muted-foreground line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          <button
            disabled={soldOut}
            onClick={() => {
              add(product);
              toast.success("Added to cart ✓");
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg gradient-primary text-white text-xs font-semibold disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-95 transition"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {soldOut ? "Wyprzedane" : "Dodaj"}
          </button>
        </div>
      </div>
    </motion.div>
  );
}

