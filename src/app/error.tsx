"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex min-h-[calc(100dvh-4.25rem)] items-center px-5 pt-[4.25rem] sm:px-8">
      <div className="mx-auto w-full max-w-6xl py-16 sm:py-24">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-400">
          Hata
        </p>
        <h1 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
          Sayfa yüklenemedi.
        </h1>
        <p className="mt-5 max-w-lg text-base leading-7 text-muted sm:text-lg">
          Beklenmeyen bir sorun oluştu. Yeniden deneyebilir veya ana sayfaya dönebilirsiniz.
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center justify-center rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-hover"
          >
            Tekrar dene
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-lg border border-brand/30 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-brand hover:bg-card"
          >
            Ana sayfa
          </a>
        </div>
      </div>
    </main>
  );
}
