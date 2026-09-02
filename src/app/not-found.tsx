import type { Metadata } from "next";
import { NotFoundPage } from "@/components/NotFoundPage";

export const metadata: Metadata = {
  title: "Sayfa bulunamadı",
  description: "Bu adres sitede yok. Ana sayfadan ürünlere veya iletişime geçebilirsiniz.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/" },
};

export default function NotFound() {
  return <NotFoundPage />;
}
