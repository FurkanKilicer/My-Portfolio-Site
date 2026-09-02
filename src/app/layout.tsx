import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
} catch {}
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
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
