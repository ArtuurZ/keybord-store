import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { Toaster } from "sonner";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";

function NotFoundComponent() {
  const ascii = String.raw`
 ┌──┬──┬──┬──┬──┬──┬──┬──┐
 │4 │0 │4 │  │  │  │  │  │
 └──┴──┴──┴──┴──┴──┴──┴──┘`;
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 grid place-items-center px-4 py-20">
        <div className="text-center max-w-lg">
          <pre className="font-mono text-xs sm:text-sm gradient-text whitespace-pre overflow-x-auto">
            {ascii}
          </pre>
          <h1 className="mt-6 text-5xl font-bold">Key not found</h1>
          <p className="mt-3 text-muted-foreground">
            That key isn't mapped. Let's get you back to a working layout.
          </p>
          <Link
            to="/"
            className="mt-8 inline-flex px-5 py-3 rounded-lg gradient-primary text-white font-semibold"
          >
            Back to home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    // noop
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something glitched on our end. Try again or head home.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="px-4 py-2 rounded-md gradient-primary text-white text-sm font-medium"
          >
            Try again
          </button>
          <a href="/" className="px-4 py-2 rounded-md border border-input text-sm">
            Home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <BackToTop />
        <Toaster
          theme="dark"
          position="bottom-right"
          toastOptions={{
            style: {
              background: "oklch(0.22 0.04 265)",
              border: "1px solid oklch(0.32 0.04 265)",
              color: "white",
            },
          }}
        />
      </div>
    </QueryClientProvider>
  );
}
