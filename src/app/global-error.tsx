"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="tr">
      <body className="min-h-full bg-[#0a0a0a] text-[#fafafa]">
        <main className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center px-6">
          <h1 className="text-3xl font-semibold tracking-tight">
            Site yüklenemedi.
          </h1>
          <p className="mt-4 text-base leading-7 text-[#a1a1aa]">
            Beklenmeyen bir hata oluştu. Yeniden deneyin.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-8 w-fit rounded-lg bg-[#f97316] px-5 py-2.5 text-sm font-semibold text-[#0a0a0a]"
          >
            Tekrar dene
          </button>
        </main>
      </body>
    </html>
  );
}
