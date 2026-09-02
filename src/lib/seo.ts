import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";

export const SITE_NAME = "Furkan Kılıçer";
export const SITE_TITLE = "Furkan Kılıçer — Senior Software Developer";
export const SITE_TITLE_TEMPLATE = "%s · Furkan Kılıçer";

/** ~155 karakter; Google snippet uzunluğuna uygun, sayfa içeriğiyle aynı. */
export const SITE_DESCRIPTION =
  "İstanbul’da Senior Software Developer. Kartega’da React, Next.js ve TypeScript ile ürün arayüzleri; pazar yeri, kurumsal site ve ödeme yüzeyleri geliştiriyor.";

export const PERSON = {
  name: SITE_NAME,
  jobTitle: "Senior Software Developer",
  email: "furkn.klcr@gmail.com",
  telephone: "+90 534 014 40 53",
  locality: "İstanbul",
  country: "TR",
  employer: "Kartega Yazılım ve Danışmanlık A.Ş.",
  linkedin: "https://www.linkedin.com/in/furkan-kilicer/",
  github: "https://github.com/FurkanKilicer",
} as const;

export function getMetadata(): Metadata {
  const siteUrl = getSiteUrl();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: SITE_TITLE,
      template: SITE_TITLE_TEMPLATE,
    },
    description: SITE_DESCRIPTION,
    applicationName: SITE_NAME,
    authors: [{ name: PERSON.name, url: PERSON.linkedin }],
    creator: PERSON.name,
    publisher: PERSON.name,
    keywords: [
      "Furkan Kılıçer",
      "Senior Software Developer",
      "Senior Frontend Developer",
      "React",
      "Next.js",
      "TypeScript",
      "Kartega",
      "İstanbul",
    ],
    category: "technology",
    referrer: "origin-when-cross-origin",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: "/",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "profile",
      locale: "tr_TR",
      alternateLocale: ["en_US"],
      url: "/",
      siteName: SITE_NAME,
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
    },
    twitter: {
      card: "summary_large_image",
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
    },
  };
}

export function getJsonLd() {
  const siteUrl = getSiteUrl();
  const personId = `${siteUrl}/#person`;
  const websiteId = `${siteUrl}/#website`;
  const pageId = `${siteUrl}/#webpage`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: siteUrl,
        name: SITE_NAME,
        inLanguage: "tr",
        description: SITE_DESCRIPTION,
        publisher: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: PERSON.name,
        url: siteUrl,
        jobTitle: PERSON.jobTitle,
        email: PERSON.email,
        telephone: PERSON.telephone,
        image: `${siteUrl}/icon.png`,
        address: {
          "@type": "PostalAddress",
          addressLocality: PERSON.locality,
          addressCountry: PERSON.country,
        },
        worksFor: {
          "@type": "Organization",
          name: PERSON.employer,
        },
        sameAs: [PERSON.linkedin, PERSON.github],
        knowsAbout: [
          "React",
          "Next.js",
          "TypeScript",
          "Redux",
          "Frontend development",
        ],
      },
      {
        "@type": "ProfilePage",
        "@id": pageId,
        url: siteUrl,
        name: SITE_TITLE,
        description: SITE_DESCRIPTION,
        inLanguage: "tr",
        isPartOf: { "@id": websiteId },
        about: { "@id": personId },
        mainEntity: { "@id": personId },
      },
    ],
  };
}
