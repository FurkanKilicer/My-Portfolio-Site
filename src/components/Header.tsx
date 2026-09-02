"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/LanguageProvider";
import { useTheme } from "@/i18n/ThemeProvider";
import { Container } from "@/components/ui";
import {
  IconClose,
  IconGitHub,
  IconLinkedIn,
  IconMenu,
  IconMoon,
  IconSun,
} from "@/components/icons";

const NAV_ITEMS = [
  "about",
  "experience",
  "technologies",
  "products",
  "resume",
  "contact",
] as const;

type NavKey = (typeof NAV_ITEMS)[number];

function NavLink({
  item,
  label,
  active,
  onClick,
  className = "",
}: {
  item: NavKey;
  label: string;
  active: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <a
      href={`/#${item}`}
      onClick={onClick}
      aria-current={active ? "location" : undefined}
      className={`relative inline-flex items-center pb-1 text-sm transition-colors ${
        active ? "text-foreground" : "text-muted hover:text-foreground"
      } ${className}`}
    >
      {label}
      <span
        className={`nav-underline pointer-events-none absolute inset-x-0 -bottom-0.5 h-px bg-brand shadow-[0_0_8px_rgba(249,115,22,0.9)] ${
          active ? "is-active" : ""
        }`}
      />
    </a>
  );
}

export function Header() {
  const { t, locale, setLocale } = useI18n();
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<NavKey | null>(null);
  const [atTop, setAtTop] = useState(true);
  const spyLockUntil = useRef(0);

  const selectSection = (key: NavKey) => {
    setActive(key);
    spyLockUntil.current = Date.now() + 800;
  };

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const scrollTop = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, Math.max(0, scrollTop / max)) : 0);
      setAtTop(scrollTop < 12);

      if (Date.now() < spyLockUntil.current) {
        return;
      }

      const header = document.querySelector("header");
      const probe = (header?.getBoundingClientRect().height ?? 68) + 8;
      let current: NavKey | null = null;
      for (const id of NAV_ITEMS) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= probe && rect.bottom > probe) {
          current = id;
        }
      }

      if (max > 0 && scrollTop >= max - 4) {
        current = "contact";
      }

      setActive(current);
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const solid = !atTop || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,box-shadow,backdrop-filter,-webkit-backdrop-filter] duration-300 ease-out ${
        solid ? "header-glass" : "header-clear"
      }`}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <a href="/#top" className="shrink-0 text-sm font-semibold tracking-tight">
          {t.hero.name}
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
          {NAV_ITEMS.map((key) => (
            <NavLink
              key={key}
              item={key}
              label={t.nav[key]}
              active={active === key}
              onClick={() => selectSection(key)}
            />
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <a
            href={t.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md p-2 text-muted transition-colors hover:text-brand hover:shadow-glow"
            aria-label={t.a11y.linkedin}
          >
            <IconLinkedIn className="h-4 w-4" />
          </a>
          <a
            href={t.social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md p-2 text-muted transition-colors hover:text-brand hover:shadow-glow"
            aria-label={t.a11y.github}
          >
            <IconGitHub className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            className="rounded-md p-2 text-muted transition-colors hover:text-foreground"
            aria-label={t.a11y.toggleTheme}
          >
            {theme === "dark" ? (
              <IconSun className="h-4 w-4" />
            ) : (
              <IconMoon className="h-4 w-4" />
            )}
          </button>
          <div
            className="ml-1 flex items-center rounded-full border border-brand/30 px-1 py-0.5 text-xs shadow-glow-soft"
            role="group"
            aria-label={t.a11y.language}
          >
            {(["tr", "en"] as const).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setLocale(code)}
                className={`rounded-full px-2 py-1 font-medium uppercase transition-colors ${
                  locale === code
                    ? "bg-brand text-brand-foreground shadow-glow"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {code}
              </button>
            ))}
          </div>
          <button
            type="button"
            className="rounded-md p-2 text-muted lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
          >
            {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
          </button>
        </div>
      </Container>

      {open ? (
        <nav
          className={`border-t lg:hidden ${
            solid ? "border-white/10 bg-black/20" : "border-border bg-background"
          }`}
          aria-label="Mobile"
        >
          <Container className="flex flex-col py-3">
            {NAV_ITEMS.map((key) => (
              <NavLink
                key={key}
                item={key}
                label={t.nav[key]}
                active={active === key}
                onClick={() => {
                  selectSection(key);
                  setOpen(false);
                }}
                className="w-fit py-2.5"
              />
            ))}
          </Container>
        </nav>
      ) : null}

      <div
        className={`overflow-hidden transition-[height,opacity] duration-300 ease-out ${
          solid ? "h-[3px] opacity-100" : "h-0 opacity-0"
        }`}
        role="progressbar"
        aria-hidden={!solid}
        aria-label={t.a11y.scrollProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
      >
        <div className="h-[3px] w-full bg-white/10">
          <div
            className="h-full origin-left bg-brand shadow-[0_0_12px_rgba(249,115,22,0.85)]"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </div>
    </header>
  );
}
