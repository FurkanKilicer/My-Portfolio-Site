"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/i18n/LanguageProvider";
import { Container, SectionHeading, SectionShell } from "@/components/ui";
import { IconArrowRight, IconCheck } from "@/components/icons";
import { AboutBentoSide } from "@/components/AboutBentoSide";

function IstanbulClock({ locale }: { locale: string }) {
  const [now, setNow] = useState("");
  const [iso, setIso] = useState("");

  useEffect(() => {
    const tick = () => {
      const date = new Date();
      setIso(date.toISOString());
      setNow(
        date.toLocaleString(locale === "tr" ? "tr-TR" : "en-GB", {
          timeZone: "Europe/Istanbul",
          weekday: "short",
          day: "numeric",
          month: "short",
          hour: "2-digit",
          minute: "2-digit",
        }),
      );
    };

    tick();
    const id = window.setInterval(tick, 1000);
    return () => window.clearInterval(id);
  }, [locale]);

  if (!now) {
    return (
      <span className="tabular-nums text-sm text-muted" aria-hidden>
        —
      </span>
    );
  }

  return (
    <time className="tabular-nums text-sm text-foreground" dateTime={iso}>
      {now}
    </time>
  );
}

export function About() {
  const { t, locale } = useI18n();
  const overview = t.about.overview;

  return (
    <SectionShell id="about" glow="right" className="pt-24 sm:pt-32">
      <Container>
        <SectionHeading
          index={t.about.index}
          label={t.about.label}
          title={t.about.title}
        />

        <div className="grid gap-4 lg:grid-cols-12 lg:grid-rows-[minmax(11rem,auto)_minmax(11rem,auto)]">
          <article className="glow-card flex flex-col justify-between rounded-2xl border border-border bg-card p-6 sm:p-8 lg:col-span-9 lg:row-span-2">
            <div>
              <p className="max-w-3xl text-[1.35rem] font-semibold leading-snug tracking-tight text-foreground sm:text-[1.7rem]">
                {overview.pitchLead}
                <span className="text-brand">{overview.pitchAccent}</span>
                {overview.pitchTail}
              </p>
              <p className="mt-4 max-w-2xl text-sm leading-6 text-muted">{overview.pitchBody}</p>
              <p className="mt-6 max-w-3xl text-base leading-7 text-foreground sm:text-lg sm:leading-8">
                {overview.proofQuote}
              </p>
              <p className="mt-4 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-2">
                {overview.proofMeta}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">{overview.proofNote}</p>
            </div>
            <div className="mt-8 flex flex-wrap items-end justify-between gap-4">
              <a
                href="#contact"
                className="glow-button inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2 text-sm font-semibold text-brand-foreground transition-colors hover:bg-brand-hover"
              >
                {overview.cta}
                <IconArrowRight className="h-4 w-4" />
              </a>
              <div className="text-right">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-2">
                  {overview.clockLabel}
                </p>
                <p className="mt-1">
                  <IstanbulClock locale={locale} />
                </p>
                <p className="mt-0.5 text-xs text-muted">{t.hero.location}</p>
              </div>
            </div>
          </article>

          <AboutBentoSide />
        </div>

        <div
          id="resume"
          className="glow-card mt-10 rounded-2xl border border-border bg-card p-6 sm:mt-12 sm:p-8"
        >
          <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-2">
            {t.resume.label}
          </h3>
          <p className="mt-4 max-w-2xl text-base leading-7 text-muted">{t.resume.summary}</p>
          <ul className="mt-6 grid gap-3 sm:grid-cols-2">
            {t.resume.highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </SectionShell>
  );
}
