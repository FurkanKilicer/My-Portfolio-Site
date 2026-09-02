"use client";

import { LanguageProvider } from "@/i18n/LanguageProvider";
import { ThemeProvider } from "@/i18n/ThemeProvider";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>{children}</LanguageProvider>
    </ThemeProvider>
  );
}
