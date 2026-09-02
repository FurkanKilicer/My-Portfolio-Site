"use client";

import { useEffect } from "react";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Experience } from "@/components/Experience";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Products } from "@/components/Products";
import { Technologies } from "@/components/Technologies";
import { useI18n } from "@/i18n/LanguageProvider";

export function HomePage() {
  const { t } = useI18n();

  useEffect(() => {
    document.title = t.meta.title;
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.setAttribute("content", t.meta.description);
    }
  }, [t]);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-brand-foreground"
      >
        {t.a11y.skipToContent}
      </a>
      <Header />
      <div id="top" className="relative min-h-full">
        <main id="main-content" className="pt-[4.25rem]">
          <Hero />
          <About />
          <Experience />
          <Technologies />
          <Products />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
}
