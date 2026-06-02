import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Wrench, Users, Sparkles, Heart } from "lucide-react";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 gradient-mesh opacity-80" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-xs font-mono uppercase tracking-wider text-accent">Założone 2021 · Warszawa, PL</span>
            <h1 className="mt-4 text-5xl sm:text-6xl font-extrabold leading-tight">
              Tworzymy klawiatury dla ludzi, którym <span className="gradient-text">zależy</span>.
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              MechKeys zaczęło się w garażu z trójką nerdów, tokarką i niezdrową
              obsesją na punkcie idealnego thocka. Pięć lat później wysyłamy klawiatury
              do 40+ krajów, ale obsesja się nie zmieniła.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl font-bold">Budowane w małych seriach.</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Każda klawiatura, którą sprzedajemy, zaczyna się jako blok aluminium w naszym
            warsztacie. CNC-ujemy obudowy, ręcznie smarujemy switche i indywidualnie
            kontrolujemy jakość każdej sztuki przed wysyłką. Bez masowej produkcji.
            Bez outsourcingu QA. Tylko mały zespół, który dba o każdy klawisz.
          </p>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            Dlatego nasze czasy realizacji są dłuższe. I dlatego nasze klawiatury służą latami.
          </p>
        </div>
        <div className="aspect-square rounded-3xl bg-gradient-to-br from-purple-700 via-fuchsia-600 to-cyan-500 relative overflow-hidden">
          <div className="absolute inset-0 [background-image:linear-gradient(oklch(1_0_0/0.06)_1px,transparent_1px),linear-gradient(90deg,oklch(1_0_0/0.06)_1px,transparent_1px)] [background-size:32px_32px]" />
          <div className="absolute bottom-6 left-6 right-6">
            <div className="font-mono text-xs text-white/70 uppercase tracking-widest">Warsztat</div>
            <div className="text-2xl font-bold text-white">Warszawa, PL</div>
          </div>
        </div>
      </section>

      <section className="border-t border-border py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">W co wierzymy</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Wrench, title: "Rzemiosło ponad skalę", desc: "Małe serie, wielkie standardy." },
              { icon: Sparkles, title: "Detale mają znaczenie", desc: "Każdy klawisz. Każda sprężyna. Każdy stabilizator." },
              { icon: Users, title: "Społeczność na pierwszym miejscu", desc: "Tworzone z i dla społeczności keyboardowej." },
              { icon: Heart, title: "Zbudowane na lata", desc: "Dożywotnia gwarancja to nie marketing." },
            ].map((v) => (
              <div key={v.title} className="p-6 rounded-2xl glass">
                <div className="grid place-items-center w-12 h-12 rounded-xl gradient-primary glow-primary">
                  <v.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="mt-4 font-semibold">{v.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h2 className="text-3xl font-bold">Gotowy, by pisać tak, jakbyś tego chciał?</h2>
        <Link to="/shop" className="inline-flex mt-6 px-8 py-4 rounded-xl gradient-primary text-white font-semibold glow-primary">
          Zobacz kolekcję
        </Link>
      </section>
    </div>
  );
}
