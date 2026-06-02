import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, CreditCard, ChevronRight, Lock, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useCart, cartTotals } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/checkout")({
  component: Checkout,
});

const STEPS = ["Wysyłka", "Płatność", "Potwierdzenie"] as const;

function Checkout() {
  const items = useCart((s) => s.items);
  const promo = useCart((s) => s.promo);
  const clear = useCart((s) => s.clear);
  const totals = cartTotals(items, promo);
  const [step, setStep] = useState(0);
  const [orderNumber] = useState(() => `MK-${Math.floor(100000 + Math.random() * 900000)}`);

  if (items.length === 0 && step < 2) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center">
        <ShoppingBag className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold">Nie masz jeszcze nic do zamówienia</h1>
        <Link to="/shop" className="inline-flex mt-6 px-5 py-3 rounded-xl gradient-primary text-white font-semibold">
          Przejdź do sklepu
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 pt-10 pb-20">
      <Link to="/cart" className="text-sm text-muted-foreground hover:text-foreground">
        ← Wróć do koszyka
      </Link>
      <h1 className="text-3xl font-bold mt-2 mb-8">Kasa</h1>

      <div className="flex items-center justify-between max-w-2xl mx-auto mb-12">
        {STEPS.map((label, i) => (
          <div key={label} className="flex items-center flex-1 last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "grid place-items-center w-10 h-10 rounded-full font-semibold text-sm transition",
                  i < step && "bg-success text-white",
                  i === step && "gradient-primary text-white glow-primary",
                  i > step && "glass text-muted-foreground",
                )}
              >
                {i < step ? <Check className="w-5 h-5" /> : i + 1}
              </div>
              <span className={cn("text-xs font-medium", i === step ? "text-foreground" : "text-muted-foreground")}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn("h-px flex-1 mx-3", i < step ? "bg-success" : "bg-border")} />
            )}
          </div>
        ))}
      </div>

      <div className={cn("grid gap-8", step < 2 && "lg:grid-cols-[1fr_360px]")}>
        <div>
          <AnimatePresence mode="wait">
            {step === 0 && (
              <Step key="ship">
                <ShippingForm onNext={() => setStep(1)} />
              </Step>
            )}
            {step === 1 && (
              <Step key="pay">
                <PaymentForm onBack={() => setStep(0)} onNext={() => { setStep(2); clear(); }} />
              </Step>
            )}
            {step === 2 && (
              <Step key="done">
                <Confirmation orderNumber={orderNumber} />
              </Step>
            )}
          </AnimatePresence>
        </div>
        {step < 2 && (
          <div className="lg:sticky lg:top-24 self-start rounded-2xl glass p-6 h-fit">
            <h3 className="font-bold mb-4">Podsumowanie</h3>
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 scrollbar-thin">
              {items.map((i) => (
                <div key={i.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground truncate pr-2">{i.qty}× {i.product.name}</span>
                  <span className="font-medium">${(i.product.price * i.qty).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border my-4" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Suma częściowa</span><span>${totals.subtotal.toFixed(2)}</span></div>
              {totals.discount > 0 && <div className="flex justify-between text-success"><span>Rabat</span><span>-${totals.discount.toFixed(2)}</span></div>}
              <div className="flex justify-between"><span className="text-muted-foreground">Wysyłka</span><span>{totals.shipping === 0 ? "Darmowa" : `$${totals.shipping.toFixed(2)}`}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">VAT</span><span>${totals.tax.toFixed(2)}</span></div>
            </div>
            <div className="border-t border-border my-4" />
            <div className="flex justify-between items-baseline">
              <span className="font-bold">Razem</span>
              <span className="text-xl font-bold gradient-text">${totals.total.toFixed(2)}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Step({ children }: { children: React.ReactNode }) {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.25 }}>
      {children}
    </motion.div>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground mb-1.5 block">{label}{props.required && " *"}</span>
      <input
        {...props}
        className="w-full px-4 py-3 rounded-lg bg-input border border-border outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm transition"
      />
    </label>
  );
}

function ShippingForm({ onNext }: { onNext: () => void }) {
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onNext(); }}
      className="rounded-2xl glass p-6 space-y-4"
    >
      <h2 className="font-bold text-lg">Dane do wysyłki</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Imię" required placeholder="Artur" />
        <Field label="Nazwisko" required placeholder="Zubacz" />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Email" type="email" required placeholder="ty@domena.pl" />
        <Field label="Telefon" type="tel" required placeholder="+48 500 000 000" />
      </div>
      <Field label="Adres (linia 1)" required placeholder="ul. Klawiszowa 12" />
      <Field label="Adres (linia 2)" placeholder="Mieszkanie, lokal (opcjonalnie)" />
      <div className="grid sm:grid-cols-3 gap-4">
        <Field label="Miasto" required placeholder="Warszawa" />
        <Field label="Województwo" required placeholder="Mazowieckie" />
        <Field label="Kod pocztowy" required placeholder="00-001" />
      </div>
      <label className="block">
        <span className="text-xs font-medium text-muted-foreground mb-1.5 block">Kraj *</span>
        <select required className="w-full px-4 py-3 rounded-lg bg-input border border-border outline-none focus:border-primary text-sm">
          {["Polska", "Niemcy", "Czechy", "Słowacja", "Wielka Brytania", "Francja", "Stany Zjednoczone"].map((c) => (
            <option key={c} className="bg-surface">{c}</option>
          ))}
        </select>
      </label>
      <label className="flex items-center gap-2.5 text-sm text-muted-foreground">
        <input type="checkbox" className="w-4 h-4 accent-[var(--primary)]" defaultChecked /> Zapisz adres na przyszłość
      </label>
      <button className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl gradient-primary text-white font-semibold mt-2">
        Przejdź do płatności <ChevronRight className="w-4 h-4" />
      </button>
    </form>
  );
}

function PaymentForm({ onBack, onNext }: { onBack: () => void; onNext: () => void }) {
  const [card, setCard] = useState("");
  const formatted = card.replace(/\D/g, "").slice(0, 16).replace(/(.{4})/g, "$1 ").trim();
  const brand = card.startsWith("4") ? "VISA" : card.startsWith("5") || card.startsWith("2") ? "MC" : "";

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); toast.success("Płatność udana ✓"); onNext(); }}
      className="rounded-2xl glass p-6 space-y-4"
    >
      <div className="flex items-center gap-2 mb-2">
        <h2 className="font-bold text-lg">Płatność</h2>
        <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Lock className="w-3.5 h-3.5" /> Bezpieczna i szyfrowana
        </span>
      </div>

      <div className="relative aspect-[1.6/1] max-w-sm rounded-2xl gradient-primary p-5 text-white overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-50" />
        <div className="relative flex flex-col h-full">
          <div className="flex justify-between items-start">
            <CreditCard className="w-8 h-8" />
            <span className="font-bold tracking-widest text-sm">{brand}</span>
          </div>
          <div className="mt-auto font-mono text-lg tracking-wider">
            {formatted || "•••• •••• •••• ••••"}
          </div>
        </div>
      </div>

      <label className="block">
        <span className="text-xs font-medium text-muted-foreground mb-1.5 block">Numer karty *</span>
        <input
          required
          value={formatted}
          onChange={(e) => setCard(e.target.value.replace(/\D/g, ""))}
          placeholder="1234 5678 9012 3456"
          maxLength={19}
          className="w-full px-4 py-3 rounded-lg bg-input border border-border outline-none focus:border-primary font-mono text-sm"
        />
      </label>
      <Field label="Imię i nazwisko na karcie" required placeholder="ARTUR ZUBACZ" />
      <div className="grid grid-cols-2 gap-4">
        <Field label="Data ważności MM/RR" required placeholder="12/28" maxLength={5} />
        <Field label="CVV" required placeholder="123" maxLength={4} />
      </div>

      <div className="flex gap-3 mt-2">
        <button type="button" onClick={onBack} className="px-5 py-3.5 rounded-xl glass font-semibold">Wstecz</button>
        <button className="flex-1 px-6 py-3.5 rounded-xl gradient-primary text-white font-semibold inline-flex items-center justify-center gap-2">
          Złóż zamówienie <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
}

function Confirmation({ orderNumber }: { orderNumber: string }) {
  return (
    <div className="rounded-2xl glass p-10 text-center max-w-2xl mx-auto">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 12 }}
        className="grid place-items-center mx-auto w-20 h-20 rounded-full bg-success/20 mb-6"
      >
        <Check className="w-10 h-10 text-success" />
      </motion.div>
      <h2 className="text-3xl font-bold">Zamówienie złożone!</h2>
      <p className="mt-2 text-muted-foreground">Dziękujemy, że piszesz z nami. Twoja klawiatura wkrótce wyruszy w drogę.</p>
      <div className="mt-8 p-5 rounded-xl bg-surface/50 inline-block">
        <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Numer zamówienia</div>
        <div className="font-mono font-bold text-xl gradient-text">#{orderNumber}</div>
      </div>
      <div className="mt-6 text-sm text-muted-foreground">
        Przewidywana dostawa: <span className="text-foreground font-medium">3–5 dni roboczych</span>
      </div>
      <Link to="/shop" className="inline-flex mt-8 px-6 py-3.5 rounded-xl gradient-primary text-white font-semibold">
        Kontynuuj zakupy
      </Link>
    </div>
  );
}
