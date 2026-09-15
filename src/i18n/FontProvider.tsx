"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_FONT,
  FONT_STORAGE_KEY,
  isFontPreset,
  nextFontPreset,
  type FontPreset,
} from "@/i18n/fonts";

type FontContextValue = {
  font: FontPreset;
  cycleFont: () => void;
};

const FontContext = createContext<FontContextValue | null>(null);

function applyFont(font: FontPreset) {
  document.documentElement.dataset.font = font;
}

export function FontProvider({ children }: { children: ReactNode }) {
  const [font, setFont] = useState<FontPreset>(DEFAULT_FONT);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(FONT_STORAGE_KEY);
    const next = isFontPreset(stored) ? stored : DEFAULT_FONT;
    setFont(next);
    applyFont(next);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    applyFont(font);
    window.localStorage.setItem(FONT_STORAGE_KEY, font);
  }, [hydrated, font]);

  const value = useMemo<FontContextValue>(
    () => ({
      font,
      cycleFont: () => setFont((current) => nextFontPreset(current)),
    }),
    [font],
  );

  return <FontContext.Provider value={value}>{children}</FontContext.Provider>;
}

export function useFont() {
  const context = useContext(FontContext);
  if (!context) {
    throw new Error("useFont must be used within FontProvider");
  }
  return context;
}
