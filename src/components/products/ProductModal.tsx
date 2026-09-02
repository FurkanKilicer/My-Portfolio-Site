"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IconArrowUpRight, IconClose } from "@/components/icons";
import { ProductShot } from "@/components/products/DummyShot";
import type { Messages } from "@/i18n/messages";

type ProductItem = Messages["products"]["items"][number];
type ProductCopy = Messages["products"];

export function VisitSiteLink({
  href,
  label,
  className = "",
}: {
  href: string;
  label: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 text-sm font-medium text-brand transition hover:text-brand-hover ${className}`}
    >
      {label}
      <IconArrowUpRight className="h-4 w-4" />
    </a>
  );
}

export function ProductModal({
  item,
  copy,
  onClose,
}: {
  item: ProductItem;
  copy: ProductCopy;
  onClose: () => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    const { body } = document;
    const previous = {
      htmlOverflow: html.style.overflow,
      htmlScrollBehavior: html.style.scrollBehavior,
      bodyOverflow: body.style.overflow,
      bodyOverscroll: body.style.overscrollBehavior,
    };

    html.style.overflow = "hidden";
    html.style.scrollBehavior = "auto";
    body.style.overflow = "hidden";
    body.style.overscrollBehavior = "none";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      html.style.overflow = previous.htmlOverflow;
      html.style.scrollBehavior = previous.htmlScrollBehavior;
      body.style.overflow = previous.bodyOverflow;
      body.style.overscrollBehavior = previous.bodyOverscroll;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (!mounted) return null;

  return createPortal(
    <div className="product-modal-backdrop fixed inset-0 z-[80] flex items-center justify-center overflow-hidden bg-black/80 p-4 sm:p-6">
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label={copy.closeLabel}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
        className="product-modal-panel relative z-10 flex h-[min(90dvh,52rem)] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#121212] shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white transition hover:border-white/40"
          aria-label={copy.closeLabel}
        >
          <IconClose className="h-4 w-4" />
        </button>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="overflow-hidden border-b border-white/10">
          <ProductShot
            image={"image" in item ? item.image : undefined}
            overlay={"overlay" in item ? item.overlay : undefined}
            variant={item.visual}
            title={item.name}
            alt={`${item.name} — ${item.tagline}`}
            className="min-h-[260px] aspect-[16/9] sm:min-h-[340px]"
            sizes="(min-width: 768px) 896px, 100vw"
          />
        </div>

        <div className="px-6 py-8 sm:px-10 sm:py-10">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-2">
            {item.company}
          </p>
          <h2
            id="product-modal-title"
            className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            {item.name}
          </h2>
          <p className="mt-2 text-base text-zinc-400">{item.tagline}</p>
          {"url" in item && item.url ? (
            <div className="mt-5">
              <VisitSiteLink href={item.url} label={copy.visitSiteCta} />
            </div>
          ) : null}

          <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-2">
            {copy.overviewLabel}
          </p>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-zinc-200 sm:text-[15px]">
            {item.overview}
          </p>

          <p className="mt-8 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-2">
            {copy.roleLabel}
          </p>
          <p className="mt-2 text-lg text-white">{item.role}</p>

          <div className="mt-8 grid gap-8 sm:grid-cols-2">
            <ModalList title={copy.workedOnLabel} items={item.workedOn} />
            <ModalList title={copy.contributionsLabel} items={item.contributions} />
          </div>
        </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

function ModalList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-muted-2">
        {title}
      </p>
      <ul className="mt-4 space-y-3">
        {items.map((entry) => (
          <li key={entry} className="flex gap-3 text-sm leading-6 text-zinc-200">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-[2px] bg-brand" />
            {entry}
          </li>
        ))}
      </ul>
    </div>
  );
}
