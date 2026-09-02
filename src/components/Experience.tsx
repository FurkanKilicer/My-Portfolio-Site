"use client";

import { useI18n } from "@/i18n/LanguageProvider";
import { Container, SectionHeading, SectionShell } from "@/components/ui";

export function Experience() {
  const { t } = useI18n();

  return (
    <SectionShell id="experience" glow="left" className="pt-24 sm:pt-32">
      <Container>
        <SectionHeading
          index={t.experience.index}
          label={t.experience.label}
          title={t.experience.title}
        />
        <p className="-mt-6 mb-12 max-w-2xl text-base leading-7 text-muted">
          {t.experience.summary}
        </p>

        <div className="relative">
          <div className="absolute bottom-4 left-[5px] top-3 w-px bg-foreground/10" aria-hidden />
          <div className="space-y-14 reveal-stagger-items">
            {t.experience.items.map((item) => (
              <article key={`${item.role}-${item.period}`} className="relative pl-8 sm:pl-10">
                <span className="glow-dot absolute left-0 top-2.5 h-2.5 w-2.5 rounded-full bg-brand" />
                <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">
                    {item.role}
                  </h3>
                  <p className="shrink-0 text-sm font-medium text-brand">{item.period}</p>
                </div>
                <p className="mt-1 text-sm text-muted">
                  {item.company} · {item.location}
                </p>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-muted">{item.overview}</p>

                <div className="mt-5 rounded-xl border border-border bg-card p-5 sm:p-6">
                  <div className="grid gap-8 md:grid-cols-2">
                    <div>
                      <h4 className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-2">
                        {t.experience.responsibilitiesLabel}
                      </h4>
                      <ul className="mt-4 space-y-2.5">
                        {item.responsibilities.map((point) => (
                          <li
                            key={point}
                            className="relative pl-4 text-sm leading-6 text-muted before:absolute before:left-0 before:top-2.5 before:h-1 before:w-1 before:rounded-full before:bg-foreground/35"
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-2">
                        {t.experience.contributionsLabel}
                      </h4>
                      <ul className="mt-4 space-y-2.5">
                        {item.contributions.map((point) => (
                          <li
                            key={point}
                            className="relative pl-4 text-sm leading-6 text-muted before:absolute before:left-0 before:top-2.5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-brand"
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {item.stack.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-full border border-border px-3 py-1 text-xs text-foreground"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>

                {item.products.length > 0 ? (
                  <div className="mt-4 flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-2">
                      {t.experience.productsLabel}
                    </span>
                    {item.products.map((name) => (
                      <span key={name} className="text-sm text-foreground/90">
                        {name}
                      </span>
                    ))}
                  </div>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </Container>
    </SectionShell>
  );
}
