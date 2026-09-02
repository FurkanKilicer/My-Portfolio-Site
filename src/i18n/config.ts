export type Locale = "tr" | "en";

export const LOCALE_STORAGE_KEY = "locale";
export const DEFAULT_LOCALE: Locale = "tr";

export function isLocale(value: string | null): value is Locale {
  return value === "tr" || value === "en";
}
