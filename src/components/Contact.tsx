"use client";

import type { ReactNode } from "react";
import { IconGitHub, IconLinkedIn, IconMail } from "@/components/icons";
import { Container, SectionHeading, SectionShell } from "@/components/ui";
import { useI18n } from "@/i18n/LanguageProvider";

export function Contact() {
  const { t } = useI18n();
  const githubHandle = `@${t.social.github.replace(/\/$/, "").split("/").pop() ?? ""}`;
  const linkedinHandle = t.social.linkedin
    .replace(/^https?:\/\/(www\.)?linkedin\.com\//, "")
    .replace(/\/$/, "");

  const channels: {
    href: string;
    label: string;
    value: string;
    icon: ReactNode;
    external?: boolean;
  }[] = [
    {
      href: `mailto:${t.social.email}`,
      label: t.contact.emailLabel,
      value: t.social.email,
      icon: <IconMail className="h-3.5 w-3.5" />,
    },
    {
      href: t.social.linkedin,
      label: t.contact.linkedinLabel,
      value: linkedinHandle,
      icon: <IconLinkedIn className="h-3.5 w-3.5" />,
      external: true,
    },
    {
      href: t.social.github,
      label: t.contact.githubLabel,
      value: githubHandle,
      icon: <IconGitHub className="h-3.5 w-3.5" />,
      external: true,
    },
  ];

  return (
    <SectionShell id="contact" glow="right" className="pt-24 sm:pt-32">
      <Container>
        <SectionHeading
          index={t.contact.index}
          label={t.contact.label}
          title={t.contact.title}
          description={t.contact.summary}
        />
        <div className="overflow-hidden rounded-xl border border-border">
          <div className="grid md:grid-cols-3">
            {channels.map((channel, index) => (
              <a
                key={channel.href}
                href={channel.href}
                {...(channel.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={`block px-6 py-7 transition-colors hover:bg-white/[0.03] sm:px-8 sm:py-8 ${
                  index > 0 ? "border-t border-border md:border-t-0 md:border-l" : ""
                }`}
              >
                <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-2">
                  {channel.icon}
                  {channel.label}
                </p>
                <p className="mt-4 text-lg font-semibold tracking-tight text-foreground">
                  {channel.value}
                </p>
              </a>
            ))}
          </div>
        </div>
      </Container>
    </SectionShell>
  );
}
