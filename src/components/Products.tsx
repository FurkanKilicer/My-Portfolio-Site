"use client";

import { useState } from "react";
import { IconArrowUpRight } from "@/components/icons";
import { ProductShot, ZoomFrame } from "@/components/products/DummyShot";
import { ProductModal, VisitSiteLink } from "@/components/products/ProductModal";
import { Container, SectionHeading, SectionShell } from "@/components/ui";
import { useI18n } from "@/i18n/LanguageProvider";
import type { Messages } from "@/i18n/messages";

type ProductItem = Messages["products"]["items"][number];

function productImage(item: ProductItem) {
  return "image" in item ? item.image : undefined;
}

function productOverlay(item: ProductItem) {
  return "overlay" in item ? item.overlay : undefined;
}

function productUrl(item: ProductItem) {
  return "url" in item ? item.url : undefined;
}

export function Products() {
  const { t } = useI18n();
  const [selected, setSelected] = useState<ProductItem | null>(null);
  const featured = t.products.items.slice(0, 2);
  const rest = t.products.items.slice(2);

  return (
    <>
      <SectionShell id="products" glow="center" className="pt-24 sm:pt-32">
        <Container>
          <SectionHeading
            index={t.products.index}
            label={t.products.label}
            title={t.products.title}
            description={t.products.summary}
          />

          <div className="space-y-16 sm:space-y-24">
            {featured.map((item, index) => (
              <FeaturedProduct
                key={item.name}
                item={item}
                imageFirst={index % 2 === 0}
                cta={t.products.detailsCta}
                visitLabel={t.products.visitSiteCta}
                roleLabel={t.products.roleShortLabel}
                priority={index === 0}
                onOpen={() => setSelected(item)}
              />
            ))}
          </div>

          <div className="mt-16 grid gap-6 sm:mt-24 sm:grid-cols-2">
            {rest.map((item) => (
              <ProductCard
                key={item.name}
                item={item}
                cta={t.products.cardCta}
                visitLabel={t.products.visitSiteCta}
                onOpen={() => setSelected(item)}
              />
            ))}
          </div>
        </Container>
      </SectionShell>

      {selected ? (
        <ProductModal
          item={selected}
          copy={t.products}
          onClose={() => setSelected(null)}
        />
      ) : null}
    </>
  );
}

function FeaturedProduct({
  item,
  imageFirst,
  cta,
  visitLabel,
  roleLabel,
  priority,
  onOpen,
}: {
  item: ProductItem;
  imageFirst: boolean;
  cta: string;
  visitLabel: string;
  roleLabel: string;
  priority?: boolean;
  onOpen: () => void;
}) {
  const shot = (
    <button
      type="button"
      onClick={onOpen}
      className="block w-full text-left"
      aria-label={`${item.name} — ${cta}`}
    >
      <ZoomFrame className="min-h-[240px] sm:min-h-[320px]">
        <ProductShot
          image={productImage(item)}
          overlay={productOverlay(item)}
          variant={item.visual}
          title={item.name}
          alt={`${item.name} — ${item.tagline}`}
          className="min-h-[240px] sm:min-h-[320px]"
          priority={priority}
          sizes="(min-width: 1024px) 640px, 100vw"
        />
      </ZoomFrame>
    </button>
  );

  const copy = (
    <div className={imageFirst ? "lg:pl-4" : "lg:pr-4"}>
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-2">
        {item.company}
      </p>
      <h3 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
        {item.name}
      </h3>
      <p className="mt-2 text-base text-foreground">{item.tagline}</p>
      <p className="mt-4 text-sm leading-7 text-muted">{item.description}</p>
      <p className="mt-6 text-sm text-foreground">
        <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-2">
          {roleLabel}{" "}
        </span>
        {item.role}
      </p>
      <ul className="mt-5 flex flex-wrap gap-2">
        {item.stack.map((tech) => (
          <li
            key={`${item.name}-${tech}`}
            className="rounded-md border border-border bg-card-elevated px-2.5 py-1 text-xs text-foreground"
          >
            {tech}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2">
        <button
          type="button"
          onClick={onOpen}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-brand transition hover:text-brand-hover"
        >
          {cta}
          <IconArrowUpRight className="h-4 w-4" />
        </button>
        {productUrl(item) ? (
          <VisitSiteLink href={productUrl(item)!} label={visitLabel} />
        ) : null}
      </div>
    </div>
  );

  return (
    <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
      <div className={imageFirst ? "" : "lg:order-2"}>{shot}</div>
      <div className={imageFirst ? "" : "lg:order-1"}>{copy}</div>
    </article>
  );
}

function ProductCard({
  item,
  cta,
  visitLabel,
  onOpen,
}: {
  item: ProductItem;
  cta: string;
  visitLabel: string;
  onOpen: () => void;
}) {
  const site = productUrl(item);

  return (
    <article className="overflow-hidden rounded-2xl border border-border bg-card">
      <button
        type="button"
        onClick={onOpen}
        className="block w-full text-left"
        aria-label={`${item.name} — ${cta}`}
      >
        <div className="overflow-hidden border-b border-border">
          <ProductShot
            image={productImage(item)}
            overlay={productOverlay(item)}
            variant={item.visual}
            title={item.name}
            alt={`${item.name} — ${item.tagline}`}
          />
        </div>
      </button>
      <div className="p-5 sm:p-6">
        <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-2">
          {item.company}
        </p>
        <h3 className="mt-3 text-xl font-semibold text-foreground">{item.name}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{item.tagline}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2">
          <button
            type="button"
            onClick={onOpen}
            className="inline-flex items-center gap-1 text-sm font-medium text-brand hover:text-brand-hover"
          >
            {cta}
            <IconArrowUpRight className="h-4 w-4" />
          </button>
          {site ? <VisitSiteLink href={site} label={visitLabel} /> : null}
        </div>
      </div>
    </article>
  );
}
