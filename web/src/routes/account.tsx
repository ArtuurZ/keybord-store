import { createFileRoute, Link } from "@tanstack/react-router";
import { LogIn, User, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/account")({
  component: Account,
});

function Account() {
  return (
    <div className="mx-auto max-w-xl px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-center">
      <div className="grid place-items-center w-20 h-20 rounded-3xl glass mx-auto mb-6">
        <User className="w-10 h-10 text-muted-foreground" />
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold">Nie jesteś zalogowany</h1>
      <p className="mt-3 text-muted-foreground max-w-sm mx-auto">
        Zaloguj się, aby zobaczyć swoje zamówienia, listę życzeń i ustawienia konta.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
        <button className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl gradient-primary text-white font-semibold hover:opacity-90 transition">
          <LogIn className="w-4 h-4" /> Zaloguj się
        </button>
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass font-medium hover:bg-surface-elevated transition"
        >
          Przeglądaj sklep <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div className="mt-10 p-5 rounded-2xl glass text-sm text-muted-foreground text-left">
        <p className="font-semibold text-foreground mb-2">Co daje konto?</p>
        <ul className="space-y-1.5 list-disc list-inside">
          <li>Śledzenie zamówień i historia zakupów</li>
          <li>Zapisywanie ulubionych produktów na liście życzeń</li>
          <li>Szybsze składanie zamówień z zapisanymi adresami</li>
          <li>Punkty lojalnościowe i wcześniejszy dostęp do premier</li>
        </ul>
      </div>
    </div>
  );
}
