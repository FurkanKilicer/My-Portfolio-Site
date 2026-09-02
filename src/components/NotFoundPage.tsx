"use client";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { IconArrowRight } from "@/components/icons";
import { Container, SectionShell } from "@/components/ui";
import { useI18n } from "@/i18n/LanguageProvider";

export function NotFoundPage() {
  const { t } = useI18n();

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-brand-foreground"
      >
        {t.a11y.skipToContent}
      </a>
      <Header />
      <div className="relative min-h-full">
        <main
          id="main-content"
          className="flex min-h-[calc(100dvh-4.25rem)] items-center pt-[4.25rem]"
        >
          <SectionShell glow="hero" className="w-full py-16 sm:py-24">
            <Container>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-400">
                00 / {t.notFound.label}
              </p>
              <p className="glow-text mt-6 text-7xl font-semibold tracking-tight text-brand sm:text-8xl">
                {t.notFound.code}
              </p>
              <h1 className="mt-4 max-w-xl text-3xl font-semibold tracking-tight text-foreground sm:text-5xl">
                {t.notFound.title}
              </h1>
              <p className="mt-5 max-w-lg text-base leading-7 text-muted sm:text-lg">
                {t.notFound.summary}
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href="/"
                  className="glow-button inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-hover"
                >
                  {t.notFound.home}
                  <IconArrowRight className="h-4 w-4" />
                </a>
                <a
                  href="/#contact"
                  className="inline-flex items-center justify-center rounded-lg border border-brand/30 px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-brand hover:bg-card"
                >
                  {t.notFound.contact}
                </a>
              </div>
            </Container>
          </SectionShell>
        </main>
        <Footer />
      </div>
    </>
  );
}
