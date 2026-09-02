"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import en from "@/locales/en.json";
import tr from "@/locales/tr.json";
import {
  DEFAULT_LOCALE,
  LOCALE_STORAGE_KEY,
  isLocale,
  type Locale,
} from "@/i18n/config";
import type { Messages } from "@/i18n/messages";

const dictionaries = { tr, en } as const;

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Messages;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (isLocale(stored)) {
      setLocaleState(stored);
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    document.documentElement.lang = locale;
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  }, [hydrated, locale]);

  const value = useMemo<LanguageContextValue>(
    () => ({
      locale,
      setLocale: setLocaleState,
      t: dictionaries[locale],
    }),
    [locale],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useI18n must be used within LanguageProvider");
  }
  return context;
}
