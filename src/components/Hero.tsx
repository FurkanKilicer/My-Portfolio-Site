"use client";

import { useI18n } from "@/i18n/LanguageProvider";
import { Container, SectionShell } from "@/components/ui";
import { IconArrowRight, IconPin } from "@/components/icons";

export function Hero() {
  const { t } = useI18n();

  return (
    <SectionShell glow="hero" className="pt-16 sm:pt-24">
      <Container>
        <div className="mb-6 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted">
          <span className="glow-dot h-1.5 w-1.5 animate-pulse rounded-full bg-brand" />
          {t.hero.availability}
        </div>
        <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
          {t.hero.name}
        </h1>
        <p className="mt-4 text-lg font-medium sm:text-xl">
          <span className="glow-text text-brand">{t.hero.roleLead}</span>
          <span className="text-foreground">{t.hero.roleRest}</span>
        </p>
        <p className="mt-6 max-w-2xl text-base leading-8 text-muted sm:text-lg">
          {t.hero.bio}
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
          <a
            href="#products"
            className="glow-button inline-flex items-center justify-center gap-2 rounded-lg bg-brand px-5 py-2.5 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-hover"
          >
            {t.hero.viewProducts}
            <IconArrowRight className="h-4 w-4" />
          </a>
          <a
            href="#resume"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-brand/30 bg-transparent px-5 py-2.5 text-sm font-medium text-foreground shadow-glow-soft transition-colors hover:border-brand hover:bg-card"
          >
            {t.hero.viewResume}
            <IconArrowRight className="h-4 w-4" />
          </a>
          <p className="inline-flex items-center gap-2 text-sm text-muted sm:ml-2">
            <IconPin className="h-4 w-4 text-brand" />
            {t.hero.location}
          </p>
        </div>
        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {t.hero.stats.map((stat) => {
            const isLink = "href" in stat && Boolean(stat.href);
            const className =
              "glow-card group relative block overflow-hidden rounded-xl border border-border bg-card px-5 py-6 text-left";
            const content = (
              <>
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-2">
                  {stat.label}
                </p>
                <p className="mt-3 text-2xl font-semibold tracking-tight text-foreground transition-transform duration-300 group-hover:translate-x-0.5">
                  {stat.value}
                </p>
                {isLink ? (
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-brand opacity-70 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100">
                    {stat.hint}
                    <IconArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  </span>
                ) : null}
              </>
            );

            if (isLink) {
              return (
                <a
                  key={stat.label}
                  href={stat.href}
                  className={`${className} cursor-pointer transition-colors hover:border-brand/50`}
                >
                  {content}
                </a>
              );
            }

            return (
              <article key={stat.label} className={className}>
                {content}
              </article>
            );
          })}
        </div>
      </Container>
    </SectionShell>
  );
}
