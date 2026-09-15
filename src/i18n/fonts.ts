export const FONT_PRESETS = [
  "plex",
  "editorial",
  "outfit",
  "syne",
  "geist",
] as const;

export type FontPreset = (typeof FONT_PRESETS)[number];

export const DEFAULT_FONT: FontPreset = "plex";
export const FONT_STORAGE_KEY = "font";

export function isFontPreset(value: string | null): value is FontPreset {
  return FONT_PRESETS.includes(value as FontPreset);
}

export function nextFontPreset(current: FontPreset): FontPreset {
  const index = FONT_PRESETS.indexOf(current);
  return FONT_PRESETS[(index + 1) % FONT_PRESETS.length];
}
