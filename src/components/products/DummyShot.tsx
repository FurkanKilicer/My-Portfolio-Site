"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const VARIANTS = ["map", "catalog", "dashboard", "docs", "portal"] as const;
export type ShotVariant = (typeof VARIANTS)[number];

export function DummyShot({
  variant,
  title,
  className = "",
}: {
  variant: string;
  title: string;
  className?: string;
}) {
  const kind = (VARIANTS as readonly string[]).includes(variant)
    ? (variant as ShotVariant)
    : "dashboard";

  return (
    <div
      className={`flex h-full min-h-[220px] w-full flex-col bg-[#141414] p-3 sm:min-h-[280px] sm:p-4 ${className}`}
    >
      <div className="mb-3 flex items-center justify-between">
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-white/20" />
          <span className="h-2 w-2 rounded-full bg-brand/80" />
        </div>
        <span className="truncate text-[10px] uppercase tracking-[0.16em] text-white/40">
          {title}
        </span>
      </div>
      {kind === "map" ? <MapMock /> : null}
      {kind === "catalog" ? <CatalogMock /> : null}
      {kind === "dashboard" ? <DashboardMock /> : null}
      {kind === "docs" ? <DocsMock /> : null}
      {kind === "portal" ? <PortalMock /> : null}
    </div>
  );
}

export function ProductShot({
  image,
  variant,
  title,
  overlay,
  alt,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 540px, (min-width: 640px) 50vw, 100vw",
}: {
  image?: string;
  variant: string;
  title: string;
  overlay?: string;
  alt?: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  const [ready, setReady] = useState(priority);

  if (overlay) {
    return <PrivacyShot label={overlay} className={className} />;
  }

  if (!image) {
    return <DummyShot variant={variant} title={title} className={className} />;
  }

  return (
    <div
      className={`group/shot relative min-h-[220px] w-full overflow-hidden bg-[#1a1a1a] sm:min-h-[280px] ${className}`}
    >
      {!ready ? (
        <div className="absolute inset-0 animate-pulse bg-white/5" aria-hidden />
      ) : null}
      <Image
        src={image}
        alt={alt ?? title}
        fill
        priority={priority}
        sizes={sizes}
        onLoad={() => setReady(true)}
        className={`object-cover object-top transition-[opacity,transform] duration-500 ease-out group-hover/shot:scale-[1.12] motion-reduce:transition-none motion-reduce:group-hover/shot:scale-100 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}

function PrivacyShot({
  label,
  className = "",
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={`relative flex min-h-[220px] w-full items-center justify-center overflow-hidden bg-[#141414] sm:min-h-[280px] ${className}`}
    >
      <div className="absolute inset-[-20%] scale-110 blur-2xl" aria-hidden>
        <div className="h-1/3 bg-[#1e3a5f]" />
        <div className="grid h-1/3 grid-cols-3 gap-3 p-6">
          <div className="rounded-lg bg-white/70" />
          <div className="rounded-lg bg-white/60" />
          <div className="rounded-lg bg-white/70" />
        </div>
        <div className="h-1/3 bg-white/80" />
      </div>
      <div className="absolute inset-0 bg-black/50" />
      <p className="relative z-10 px-4 text-center text-sm font-semibold uppercase tracking-[0.22em] text-white sm:text-base">
        {label}
      </p>
    </div>
  );
}

export function ZoomFrame({
  children,
  className = "",
  trigger = "scroll",
}: {
  children: React.ReactNode;
  className?: string;
  trigger?: "scroll" | "hover";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [zoomed, setZoomed] = useState(false);

  useEffect(() => {
    if (trigger !== "scroll") return;
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setZoomed(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => setZoomed(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [trigger]);

  const scaleClass =
    trigger === "hover"
      ? "scale-100 transition-transform duration-700 ease-out group-hover:scale-[1.12] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
      : `transition-transform duration-[1200ms] ease-out ${zoomed ? "scale-[1.12]" : "scale-100"}`;

  return (
    <div ref={ref} className={`overflow-hidden rounded-xl border border-white/10 ${className}`}>
      <div className={`h-full w-full origin-center ${scaleClass}`}>{children}</div>
    </div>
  );
}

function MapMock() {
  return (
    <div className="grid min-h-0 flex-1 grid-cols-[1fr_0.7fr] gap-2">
      <div className="relative overflow-hidden rounded-md bg-[#1c1c1c]">
        <div className="absolute inset-6 rounded-full border border-brand/30" />
        <div className="absolute left-[20%] top-[30%] h-2 w-2 rounded-full bg-brand" />
        <div className="absolute left-[55%] top-[48%] h-2 w-2 rounded-full bg-brand/70" />
        <div className="absolute bottom-3 left-3 right-3 h-8 rounded bg-black/40" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-16 rounded-md bg-[#1c1c1c]" />
        <div className="flex-1 rounded-md bg-[#1c1c1c]" />
      </div>
    </div>
  );
}

function CatalogMock() {
  return (
    <div className="grid min-h-0 flex-1 grid-cols-[0.7fr_1.3fr] gap-2">
      <div className="space-y-2 rounded-md bg-[#1c1c1c] p-2">
        <div className="h-2 w-2/3 rounded bg-white/15" />
        <div className="h-2 w-1/2 rounded bg-white/10" />
        <div className="h-2 w-3/4 rounded bg-white/10" />
      </div>
      <div className="grid grid-cols-2 gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-md bg-[#1c1c1c] p-2">
            <div className="mb-2 h-10 rounded bg-brand/15" />
            <div className="h-2 w-3/4 rounded bg-white/15" />
          </div>
        ))}
      </div>
    </div>
  );
}

function DashboardMock() {
  return (
    <div className="grid min-h-0 flex-1 gap-2">
      <div className="grid grid-cols-3 gap-2">
        <div className="h-14 rounded-md bg-[#1c1c1c]" />
        <div className="h-14 rounded-md bg-[#1c1c1c]" />
        <div className="h-14 rounded-md bg-brand/20" />
      </div>
      <div className="flex-1 rounded-md bg-[#1c1c1c] p-3">
        <div className="flex h-full items-end gap-1">
          {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm bg-brand/50"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function DocsMock() {
  return (
    <div className="grid min-h-0 flex-1 grid-cols-[0.9fr_1.1fr] gap-2">
      <div className="space-y-2">
        <div className="h-8 rounded-md bg-brand/70" />
        <div className="h-8 rounded-md bg-[#1c1c1c]" />
        <div className="h-8 rounded-md bg-[#1c1c1c]" />
      </div>
      <div className="rounded-md bg-[#1c1c1c] p-3">
        <div className="space-y-2">
          <div className="h-2 w-full rounded bg-white/15" />
          <div className="h-2 w-5/6 rounded bg-white/10" />
          <div className="h-2 w-2/3 rounded bg-white/10" />
        </div>
      </div>
    </div>
  );
}

function PortalMock() {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-2">
      <div className="h-8 rounded-md bg-[#1c1c1c]" />
      <div className="grid flex-1 grid-cols-2 gap-2">
        <div className="rounded-md bg-[#1c1c1c]" />
        <div className="rounded-md bg-[#1c1c1c]" />
      </div>
    </div>
  );
}
