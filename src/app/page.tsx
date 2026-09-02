import { HomePage } from "@/components/HomePage";
import { JsonLd } from "@/components/JsonLd";
import { getJsonLd } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <JsonLd data={getJsonLd()} />
      <HomePage />
    </>
  );
}
