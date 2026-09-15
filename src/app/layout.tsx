import type { Metadata, Viewport } from "next";
import {
  Geist,
  Geist_Mono,
  IBM_Plex_Sans,
  Newsreader,
  Outfit,
  Source_Sans_3,
  Syne,
} from "next/font/google";
import { Providers } from "@/components/Providers";
import { getMetadata } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = getMetadata();

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  colorScheme: "dark light",
};

const themeScript = `
try {
  const theme = localStorage.getItem("theme");
  if (theme === "light") document.documentElement.classList.remove("dark");
  else document.documentElement.classList.add("dark");
  const locale = localStorage.getItem("locale");
  document.documentElement.lang = locale === "en" ? "en" : "tr";
  const font = localStorage.getItem("font");
  document.documentElement.dataset.font =
    font === "editorial" || font === "outfit" || font === "syne" || font === "geist" || font === "plex"
      ? font
      : "plex";
} catch {}
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      data-font="plex"
      className={`${geistSans.variable} ${geistMono.variable} ${plexSans.variable} ${outfit.variable} ${newsreader.variable} ${sourceSans.variable} ${syne.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-full bg-background font-sans text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
