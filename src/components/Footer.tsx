"use client";

import { useI18n } from "@/i18n/LanguageProvider";
import { Container, SectionShell } from "@/components/ui";

export function Footer() {
  const { t } = useI18n();

  return (
    <SectionShell as="footer" glow="none" className="relative z-10 mt-16 border-t border-border py-8 sm:mt-24">
      <Container className="relative z-10 flex flex-col gap-2 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>{t.footer.credit}</p>
        <p>{t.footer.built}</p>
      </Container>
    </SectionShell>
  );
}
