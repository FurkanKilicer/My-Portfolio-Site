"use client";

import { useI18n } from "@/i18n/LanguageProvider";
import { Container, SectionHeading, SectionShell } from "@/components/ui";
import { IconCheck } from "@/components/icons";

export function About() {
  const { t } = useI18n();

  return (
    <SectionShell id="about" glow="right" className="pt-24 sm:pt-32">
      <Container>
        <SectionHeading
          index={t.about.index}
          label={t.about.label}
          title={t.about.title}
        />
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 reveal-stagger-items">
          <div className="space-y-8">
            {t.about.blocks.map((block) => (
              <div key={block.heading}>
                <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-2">
                  {block.heading}
                </h3>
                <p className="mt-3 max-w-xl text-base leading-7 text-muted">
                  {block.body}
                </p>
              </div>
            ))}
          </div>
          <aside className="glow-card h-fit rounded-2xl border border-border bg-card p-6 sm:p-7">
            <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-2">
              {t.about.expertiseTitle}
            </h3>
            <ul className="mt-5 space-y-3.5">
              {t.about.expertise.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-foreground">
                  <IconCheck className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
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
