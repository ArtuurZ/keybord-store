import { Link } from "@tanstack/react-router";
import { Keyboard, Twitter, Instagram, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border bg-surface/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <div className="grid place-items-center w-9 h-9 rounded-lg gradient-primary glow-primary">
              <Keyboard className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg">
              Mech<span className="gradient-text">Keys</span> Studio
            </span>
          </Link>
          <p className="mt-4 text-sm text-muted-foreground max-w-sm">
            Ręcznie składane mechaniczne klawiatury, switche i keycapy dla
            twórców, programistów i graczy, którzy nie idą na kompromisy.
          </p>
          <div className="mt-6 flex gap-3">
            {[Twitter, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid place-items-center w-10 h-10 rounded-lg glass hover:bg-primary/20 hover:border-primary/40 transition"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-4 uppercase tracking-wider text-muted-foreground">
            Sklep
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/shop" className="hover:text-accent transition">Wszystkie produkty</Link></li>
            <li><Link to="/shop" search={{ category: "Keyboards" } as any} className="hover:text-accent transition">Klawiatury</Link></li>
            <li><Link to="/shop" search={{ category: "Switches" } as any} className="hover:text-accent transition">Switche</Link></li>
            <li><Link to="/shop" search={{ category: "Keycaps" } as any} className="hover:text-accent transition">Keycapy</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-sm mb-4 uppercase tracking-wider text-muted-foreground">
            Firma
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-accent transition">O nas</Link></li>
            <li><Link to="/account" className="hover:text-accent transition">Konto</Link></li>
            <li><a href="#" className="hover:text-accent transition">Wsparcie</a></li>
            <li><a href="#" className="hover:text-accent transition">Wysyłka</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>
            © {new Date().getFullYear()} MechKeys Studio. Wszelkie prawa zastrzeżone. ·{" "}
            <span className="text-foreground/80">Designed by Artur Zubacz</span>
          </div>
          <div className="font-mono">Type Like You Mean It.</div>
        </div>
      </div>
    </footer>
  );
}
