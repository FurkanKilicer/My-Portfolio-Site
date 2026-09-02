"use client";

import { useI18n } from "@/i18n/LanguageProvider";
import { Container, SectionHeading, SectionShell } from "@/components/ui";

export function Technologies() {
  const { t } = useI18n();

  return (
    <SectionShell id="technologies" glow="right" className="pt-24 sm:pt-32">
      <Container>
        <SectionHeading
          index={t.technologies.index}
          label={t.technologies.label}
          title={t.technologies.title}
        />
        <div className="grid gap-4 sm:grid-cols-2 reveal-stagger-items">
          {t.technologies.groups.map((group) => (
            <article
              key={group.title}
              className="glow-card rounded-2xl border border-border bg-card p-6"
            >
              <h3 className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-2">
                {group.title}
              </h3>
              <ul className="mt-5 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-border bg-card-elevated px-3 py-1 text-sm text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Container>
    </SectionShell>
  );
}
