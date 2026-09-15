"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useI18n } from "@/i18n/LanguageProvider";

export function HeroVisual() {
  const { t } = useI18n();
  const root = useRef<HTMLDivElement>(null);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setAnimate(!reduce);
    const node = root.current;
    if (!node || reduce) return;

    const ctx = gsap.context(() => {
      gsap.to("[data-orbit]", {
        rotate: 360,
        duration: 48,
        ease: "none",
        repeat: -1,
        transformOrigin: "210px 210px",
        svgOrigin: "210 210",
      });

      gsap.to("[data-float]", {
        y: -10,
        duration: 2.4,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        stagger: 0.35,
      });

      gsap.to("[data-pulse]", {
        scale: 1.18,
        opacity: 0.35,
        duration: 1.6,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        transformOrigin: "center",
        svgOrigin: "210 210",
      });

      gsap.to("[data-dash]", {
        strokeDashoffset: -72,
        duration: 2.2,
        ease: "none",
        repeat: -1,
      });
    }, node);

    return () => ctx.revert();
  }, []);

  const v = t.hero.visual;

  return (
    <div
      ref={root}
      className="relative mx-auto aspect-square w-full max-w-[28rem]"
      aria-hidden
    >
      <svg viewBox="0 0 420 420" className="h-full w-full">
        <defs>
          <linearGradient id="hero-line" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--brand)" stopOpacity="0.15" />
            <stop offset="100%" stopColor="var(--brand)" stopOpacity="0.7" />
          </linearGradient>
        </defs>

        <g data-orbit>
          <circle
            cx="210"
            cy="210"
            r="148"
            fill="none"
            stroke="currentColor"
            className="text-border"
            strokeWidth="1"
            strokeDasharray="3 10"
          />
          <circle cx="210" cy="62" r="3.5" fill="var(--brand)" />
          <circle cx="348" cy="278" r="3.5" fill="var(--brand)" opacity="0.7" />
          <circle cx="72" cy="278" r="3.5" fill="var(--brand)" opacity="0.5" />
        </g>

        <path
          d="M210 210 L210 92"
          fill="none"
          stroke="url(#hero-line)"
          strokeWidth="1.5"
          data-dash
          strokeDasharray="6 8"
        />
        <path
          d="M210 210 L328 292"
          fill="none"
          stroke="url(#hero-line)"
          strokeWidth="1.5"
          data-dash
          strokeDasharray="6 8"
        />
        <path
          d="M210 210 L92 292"
          fill="none"
          stroke="url(#hero-line)"
          strokeWidth="1.5"
          data-dash
          strokeDasharray="6 8"
        />

        {animate ? (
          <>
            <circle r="4" fill="var(--brand)">
              <animateMotion dur="3.2s" repeatCount="indefinite" path="M210,210 L210,92" />
            </circle>
            <circle r="4" fill="var(--brand)" opacity="0.8">
              <animateMotion dur="3.2s" begin="1.05s" repeatCount="indefinite" path="M210,210 L328,292" />
            </circle>
            <circle r="4" fill="var(--brand)" opacity="0.6">
              <animateMotion dur="3.2s" begin="2.1s" repeatCount="indefinite" path="M210,210 L92,292" />
            </circle>
          </>
        ) : null}

        <g data-float>
          <circle
            cx="210"
            cy="210"
            r="46"
            fill="none"
            stroke="var(--brand)"
            strokeOpacity="0.35"
            strokeWidth="1"
            data-pulse
          />
          <circle cx="210" cy="210" r="36" fill="var(--card)" stroke="var(--brand)" strokeWidth="1.5" />
          <text
            x="210"
            y="215"
            textAnchor="middle"
            fill="currentColor"
            className="text-foreground"
            fontSize="12"
            fontWeight="600"
          >
            {v.host}
          </text>
        </g>

        <g data-float>
          <rect
            x="162"
            y="58"
            width="96"
            height="40"
            rx="10"
            fill="var(--card)"
            stroke="var(--border)"
          />
          <text x="210" y="83" textAnchor="middle" fill="currentColor" className="text-foreground" fontSize="11">
            {v.catalog}
          </text>
        </g>

        <g data-float>
          <rect
            x="286"
            y="278"
            width="96"
            height="40"
            rx="10"
            fill="var(--card)"
            stroke="var(--border)"
          />
          <text x="334" y="303" textAnchor="middle" fill="currentColor" className="text-foreground" fontSize="11">
            {v.checkout}
          </text>
        </g>

        <g data-float>
          <rect
            x="38"
            y="278"
            width="96"
            height="40"
            rx="10"
            fill="var(--card)"
            stroke="var(--border)"
          />
          <text x="86" y="303" textAnchor="middle" fill="currentColor" className="text-foreground" fontSize="11">
            {v.account}
          </text>
        </g>
      </svg>
      <p className="pointer-events-none absolute inset-x-0 bottom-1 text-center text-[10px] font-medium uppercase tracking-[0.2em] text-muted-2">
        {v.caption}
      </p>
    </div>
  );
}
