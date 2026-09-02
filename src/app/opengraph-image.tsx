import { ImageResponse } from "next/og";
import { SITE_NAME } from "@/lib/seo";

export const alt = "Furkan Kılıçer — Senior Software Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0a0a0a",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: "#f97316",
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 999,
              background: "#f97316",
            }}
          />
          Portfolio
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              color: "#fafafa",
              fontSize: 72,
              fontWeight: 600,
              letterSpacing: "-0.04em",
              lineHeight: 1.05,
            }}
          >
            {SITE_NAME}
          </div>
          <div style={{ color: "#f97316", fontSize: 32, fontWeight: 500 }}>
            Senior Software Developer
          </div>
          <div style={{ color: "#a1a1aa", fontSize: 26, lineHeight: 1.4, maxWidth: 860 }}>
            React, Next.js ve TypeScript ile ürün arayüzleri. İstanbul.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
