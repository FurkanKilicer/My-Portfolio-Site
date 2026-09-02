"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

function Reveal({
  children,
  immediate = false,
}: {
  children: ReactNode;
  immediate?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const show = () => {
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => setVisible(true));
      });
    };

    if (reduceMotion) {
      setVisible(true);
      return;
    }

    if (immediate) {
      show();
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        show();
        observer.disconnect();
      },
      { threshold: 0.08, rootMargin: "0px 0px -12% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [immediate]);

  return (
    <div ref={ref} className={visible ? "reveal is-visible" : "reveal"}>
      <div className="reveal-stagger">{children}</div>
    </div>
  );
}

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-6xl px-5 sm:px-8 ${className}`}>
      {children}
    </div>
  );
}

const glowPlacement = {
  hero: "left-[-14%] top-8 h-[26rem] w-[26rem] bg-brand/32",
  left: "left-[-14%] top-[42%] h-[22rem] w-[22rem] -translate-y-1/2 bg-brand/30",
  right: "right-[-14%] top-[48%] h-[20rem] w-[20rem] -translate-y-1/2 bg-brand/26",
  center: "left-1/2 top-[46%] h-[18rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 bg-brand/22",
  none: "",
} as const;

export function SectionShell({
  id,
  children,
  className = "",
  glow = "left",
  line = false,
  as: Tag = "section",
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  glow?: keyof typeof glowPlacement;
  line?: boolean;
  as?: "section" | "footer";
}) {
  const skipGlow = glow === "none";

  return (
    <Tag id={id} className={`relative isolate ${className}`}>
      {skipGlow ? null : (
        <div
          className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${
            glow === "hero" ? "" : "section-glow-inset"
          }`}
          aria-hidden
        >
          {line ? <div className="section-glow-line" /> : null}
          <div className="section-glow-wash" />
          <div className={`glow-orb ${glowPlacement[glow]}`} />
        </div>
      )}
      <Reveal immediate={glow === "hero" || Tag === "footer"}>{children}</Reveal>
    </Tag>
  );
}

export function SectionHeading({
  index,
  label,
  title,
  description,
}: {
  index: string;
  label: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-10 sm:mb-12">
      <div className="flex items-center gap-5">
        <p className="shrink-0 font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-zinc-400">
          {index} / {label}
        </p>
        <span
          className="h-px min-w-0 flex-1 bg-gradient-to-r from-foreground/25 to-transparent"
          aria-hidden
        />
      </div>
      <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 max-w-2xl text-sm leading-6 text-muted sm:text-base">
          {description}
        </p>
      ) : null}
    </div>
  );
}
