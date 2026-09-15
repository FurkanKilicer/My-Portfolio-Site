"use client";

import { LanguageProvider } from "@/i18n/LanguageProvider";
import { FontProvider } from "@/i18n/FontProvider";
import { ThemeProvider } from "@/i18n/ThemeProvider";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <FontProvider>
        <LanguageProvider>{children}</LanguageProvider>
      </FontProvider>
    </ThemeProvider>
  );
}
