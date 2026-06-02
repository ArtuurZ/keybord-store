import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Zap,
  Settings2,
  Truck,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { products } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import phantom75 from "@/assets/product-phantom-75.jpg";
import gateronYellow from "@/assets/product-gateron-yellow.jpg";
import keycapsNeon from "@/assets/product-keycaps-neon.jpg";

export const Route = createFileRoute("/")({
  component: Home,
});

const categories = [
  { name: "Pełne Klawiatury", category: "Keyboards", gradient: "from-purple-600 via-fuchsia-500 to-cyan-400", count: 3, image: phantom75 },
  { name: "Switche", category: "Switches", gradient: "from-yellow-400 via-amber-500 to-rose-500", count: 2, image: gateronYellow },
  { name: "Keycapy", category: "Keycaps", gradient: "from-fuchsia-600 via-purple-600 to-cyan-500", count: 2, image: keycapsNeon },
];

const features = [
  { icon: Sparkles, title: "Premium Wykonanie", desc: "CNC aluminium, gasket mount, komponenty klasy pro." },
  { icon: Settings2, title: "Własna Konfiguracja", desc: "Hot-swap PCB. Wybierz switche, keycapy i layout." },
  { icon: Truck, title: "Szybka Wysyłka", desc: "Darmowa wysyłka na świecie powyżej 100$. 2 dni w kraju." },
  { icon: ShieldCheck, title: "Dożywotnia Gwarancja", desc: "Stoimy za każdą klawiaturą, którą wysyłamy. Na zawsze." },
];

function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <Bestsellers />
      <Why />
      <Newsletter />
    </>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 gradient-mesh opacity-90" />
      <div className="absolute inset-0 [background-image:linear-gradient(oklch(1_0_0/0.04)_1px,transparent_1px),linear-gradient(90deg,oklch(1_0_0/0.04)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-24 lg:pt-24 lg:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-xs font-mono uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
              Nowość: Phantom 75% Wireless
            </div>
            <h1 className="mt-6 text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-[1.05] tracking-tight">
              Type Like
              <br />
              You <span className="gradient-text">Mean It.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-lg">
              Ręcznie składane mechaniczne klawiatury dla twórców, programistów
              i graczy, którzy nie godzą się na membranową papkę.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl gradient-primary text-white font-semibold glow-primary hover:opacity-90 active:scale-95 transition"
              >
                Kup Teraz <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass font-semibold hover:bg-surface-elevated transition"
              >
                Zobacz Kolekcję
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-8 text-sm">
              <div>
                <div className="text-2xl font-bold gradient-text">12k+</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Buildersów</div>
              </div>
              <div>
                <div className="text-2xl font-bold gradient-text">4.9</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Średnia ocena</div>
              </div>
              <div>
                <div className="text-2xl font-bold gradient-text">50+</div>
                <div className="text-xs text-muted-foreground uppercase tracking-wider">Opcji switchy</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -inset-8 rounded-[3rem] gradient-primary opacity-30 blur-3xl" />
            <HeroKeyboard />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HeroKeyboard() {
  const rows = [
    ["esc", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "—", "del"],
    ["tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]"],
    ["caps", "A", "S", "D", "F", "G", "H", "J", "K", "L", ";", "'", "↵"],
    ["⇧", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "↑", "fn"],
  ];
  return (
    <div className="relative perspective-[1200px]">
      <div
        className="relative rounded-3xl p-5 bg-gradient-to-br from-surface-elevated to-surface border border-border shadow-2xl"
        style={{ transform: "rotateX(22deg) rotateZ(-4deg)" }}
      >
        <div className="absolute -inset-1 rounded-3xl gradient-primary opacity-40 blur-xl -z-10" />
        <div className="flex flex-col gap-1.5">
          {rows.map((row, ri) => (
            <div key={ri} className="flex gap-1.5 justify-center">
              {row.map((key, ki) => {
                const isAccent = (ri + ki) % 7 === 0;
                return (
                  <motion.div
                    key={ki}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + ri * 0.05 + ki * 0.015 }}
                    className={`relative grid place-items-center rounded-md text-[10px] font-mono font-semibold ${
                      key.length > 2 ? "px-3" : "w-7"
                    } h-8 bg-gradient-to-b from-[oklch(0.32_0.04_265)] to-[oklch(0.22_0.04_265)] border border-white/5 shadow-[inset_0_-3px_0_oklch(0_0_0/0.5),0_1px_0_oklch(1_0_0/0.05)] text-white/80`}
                  >
                    {key}
                    {isAccent && (
                      <span className="absolute -bottom-1 left-1 right-1 h-0.5 rounded-full bg-accent shadow-[0_0_8px_var(--accent)]" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-center">
          <div className="h-8 w-64 rounded-md bg-gradient-to-b from-[oklch(0.32_0.04_265)] to-[oklch(0.22_0.04_265)] border border-white/5 shadow-[inset_0_-3px_0_oklch(0_0_0/0.5)]" />
        </div>
      </div>
    </div>
  );
}

function Categories() {
  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
      <div className="flex items-end justify-between mb-10">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold">Zobacz Kolekcję</h2>
          <p className="text-muted-foreground mt-2">Zbuduj swój wymarzony setup, element po elemencie.</p>
        </div>
        <Link to="/shop" className="hidden sm:inline-flex text-sm text-accent hover:underline">
          Zobacz wszystko →
        </Link>
      </div>
      <div className="grid sm:grid-cols-3 gap-5">
        {categories.map((c) => (
          <Link
            key={c.name}
            to="/shop"
            search={{ category: c.category } as any}
            className="group relative overflow-hidden rounded-3xl aspect-[4/5] sm:aspect-[3/4]"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${c.gradient} opacity-40`} />
            <img
              src={c.image}
              alt={c.name}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <span className="text-xs font-mono uppercase tracking-wider text-white/80">
                {c.count} produktów
              </span>
              <h3 className="mt-1 text-2xl font-bold text-white drop-shadow-lg">{c.name}</h3>
              <span className="mt-3 inline-flex items-center gap-1 text-sm text-white group-hover:gap-2 transition-all">
                Przeglądaj <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function Bestsellers() {
  const bestsellers = products.filter((p) => p.badge || p.rating >= 4.8).slice(0, 6);
  return (
    <section className="py-20 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-accent">
              Bestsellery
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-1">
              Na czym wszyscy piszą.
            </h2>
          </div>
          <Link to="/shop" className="text-sm text-accent hover:underline">
            Zobacz wszystkie →
          </Link>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-4 scrollbar-thin -mx-4 px-4 snap-x">
          {bestsellers.map((p) => (
            <div key={p.id} className="min-w-[260px] sm:min-w-[300px] snap-start">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section className="py-20 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto">
          <span className="text-xs font-mono uppercase tracking-wider text-accent">
            Dlaczego MechKeys
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold mt-1">
            Stworzone dla obsesjonatów.
          </h2>
        </div>
        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f) => (
            <div
              key={f.title}
              className="p-6 rounded-2xl glass hover:border-primary/40 transition group"
            >
              <div className="grid place-items-center w-12 h-12 rounded-xl gradient-primary glow-primary group-hover:scale-110 transition">
                <f.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl p-10 sm:p-14 gradient-mesh border border-border">
          <div className="absolute inset-0 [background-image:radial-gradient(circle_at_30%_50%,oklch(0.6_0.25_295/0.4),transparent_60%)]" />
          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-accent">
                <Zap className="w-3.5 h-3.5" /> Newsletter
              </div>
              <h2 className="mt-3 text-3xl sm:text-4xl font-bold">
                Dołącz do 12 000+ entuzjastów klawiatur.
              </h2>
              <p className="mt-2 text-muted-foreground">
                Premiery, wnikliwe recenzje i wcześniejszy dostęp — prosto na twojego maila.
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!email) return;
                toast.success("Jesteś z nami. Witamy w klubie ✓");
                setEmail("");
              }}
              className="flex gap-2 p-1.5 rounded-2xl glass"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ty@domena.pl"
                className="flex-1 bg-transparent px-4 outline-none text-sm placeholder:text-muted-foreground"
              />
              <button className="px-5 py-3 rounded-xl gradient-primary text-white text-sm font-semibold">
                Zapisz się
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
