"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useI18n } from "@/i18n/LanguageProvider";

const STACK_ICONS = [
  { id: "react", label: "React" },
  { id: "next", label: "Next.js" },
  { id: "ts", label: "TypeScript" },
  { id: "redux", label: "Redux" },
  { id: "figma", label: "Figma" },
  { id: "mf", label: "Module Federation" },
  { id: "ophelia", label: "Ophelia" },
] as const;

function StackGlyph({ id }: { id: (typeof STACK_ICONS)[number]["id"] }) {
  if (id === "react") {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
        <circle cx="12" cy="12" r="2.1" fill="#61dafb" />
        <g fill="none" stroke="#61dafb" strokeWidth="1.15">
          <ellipse cx="12" cy="12" rx="10" ry="4.2" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(60 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4.2" transform="rotate(120 12 12)" />
        </g>
      </svg>
    );
  }

  if (id === "next") {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-foreground" aria-hidden>
        <circle cx="12" cy="12" r="10" fill="currentColor" />
        <path
          d="M8 7.5h2.1l5.1 8.1V7.5H17.5v9H15.4L10.3 8.4v8.1H8V7.5Z"
          fill="var(--card)"
        />
      </svg>
    );
  }

  if (id === "ts") {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
        <rect width="24" height="24" rx="4" fill="#3178c6" />
        <text x="12" y="16.5" textAnchor="middle" fill="#fff" fontSize="9" fontWeight="700">
          TS
        </text>
      </svg>
    );
  }

  if (id === "redux") {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
        <circle cx="12" cy="12" r="9" fill="none" stroke="#764abc" strokeWidth="1.6" />
        <circle cx="12" cy="6.2" r="1.7" fill="#764abc" />
        <circle cx="6.8" cy="15.2" r="1.7" fill="#764abc" />
        <circle cx="17.2" cy="15.2" r="1.7" fill="#764abc" />
      </svg>
    );
  }

  if (id === "figma") {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
        <path fill="#f24e1e" d="M8.5 2h3.5v6.5H8.5A3.25 3.25 0 0 1 8.5 2Z" />
        <path fill="#ff7262" d="M12 2h3.5a3.25 3.25 0 1 1 0 6.5H12V2Z" />
        <path fill="#a259ff" d="M8.5 8.5H12V15H8.5a3.25 3.25 0 0 1 0-6.5Z" />
        <path fill="#1abcfe" d="M12 8.5h3.5a3.25 3.25 0 1 1 0 6.5H12V8.5Z" />
        <path fill="#0acf83" d="M8.5 15a3.25 3.25 0 1 0 3.25 3.25V15H8.5Z" />
      </svg>
    );
  }

  if (id === "mf") {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
        <rect x="3" y="4" width="8" height="7" rx="1.2" fill="#8dd6f9" />
        <rect x="13" y="4" width="8" height="7" rx="1.2" fill="#1c78c0" />
        <rect x="3" y="13" width="8" height="7" rx="1.2" fill="#1c78c0" />
        <rect x="13" y="13" width="8" height="7" rx="1.2" fill="#8dd6f9" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7" aria-hidden>
      <rect width="24" height="24" rx="6" fill="#f97316" />
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fill="#fff"
        fontSize="11"
        fontWeight="700"
      >
        O
      </text>
    </svg>
  );
}

function IconMarquee() {
  const loop = [...STACK_ICONS, ...STACK_ICONS];

  return (
    <div className="about-marquee-mask mt-5 -mx-1 overflow-hidden" aria-hidden>
      <ul className="about-marquee-track flex w-max gap-2.5 pr-2.5">
        {loop.map((item, index) => (
          <li
            key={`${item.id}-${index}`}
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-card-elevated shadow-sm"
            title={item.label}
          >
            <StackGlyph id={item.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function FigmaMark({
  word,
  author,
}: {
  word: string;
  author: string;
}) {
  const frame = useRef<HTMLDivElement>(null);
  const mark = useRef<HTMLSpanElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 180, h: 62.41 });

  useEffect(() => {
    const node = mark.current;
    if (!node) return;

    const measure = () => {
      const box = node.getBoundingClientRect();
      setSize({ w: box.width, h: box.height });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [word]);

  useEffect(() => {
    const markNode = mark.current;
    const cursorNode = cursor.current;
    const frameNode = frame.current;
    if (!markNode || !cursorNode || !frameNode) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const w = markNode.offsetWidth;
    const h = markNode.offsetHeight;

    const ctx = gsap.context(() => {
      gsap.set(cursorNode, { x: 18, y: -8 });
      const tl = gsap.timeline({ repeat: -1 });
      tl.to(cursorNode, { x: w - 8, y: 6, duration: 2, ease: "sine.inOut" })
        .to(cursorNode, { x: w * 0.55, y: h + 10, duration: 2, ease: "sine.inOut" })
        .to(cursorNode, { x: 10, y: h * 0.45, duration: 2, ease: "sine.inOut" })
        .to(cursorNode, { x: 18, y: -8, duration: 2, ease: "sine.inOut" });
    }, frameNode);

    return () => ctx.revert();
  }, [size.w, size.h, word]);

  return (
    <div
      ref={frame}
      className="relative mx-auto mt-5 flex min-h-[7.5rem] items-center justify-center px-2 pb-6 pt-4"
    >
      <div className="relative inline-block">
        <span
          ref={mark}
          className="relative z-[1] block select-none text-[2.65rem] font-semibold leading-none tracking-[-0.06em] text-foreground sm:text-[2.85rem]"
        >
          {word}
        </span>

        <div
          className="pointer-events-none absolute -inset-[7px] z-[2] border border-[#0d99ff]"
          aria-hidden
        >
          {["-top-1 -left-1", "-top-1 -right-1", "-bottom-1 -left-1", "-bottom-1 -right-1", "-top-1 left-1/2 -translate-x-1/2", "-bottom-1 left-1/2 -translate-x-1/2", "top-1/2 -left-1 -translate-y-1/2", "top-1/2 -right-1 -translate-y-1/2"].map(
            (pos) => (
              <span
                key={pos}
                className={`absolute h-[7px] w-[7px] border border-[#0d99ff] bg-white ${pos}`}
              />
            ),
          )}
          <span className="absolute -bottom-6 right-0 rounded-[3px] bg-[#0d99ff] px-1.5 py-0.5 text-[10px] font-medium tabular-nums text-white">
            {Math.round(size.w)} × {size.h.toFixed(2)}
          </span>
        </div>

        <div
          ref={cursor}
          className="pointer-events-none absolute left-0 top-0 z-[3]"
          aria-hidden
        >
          <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
            <path
              d="M1 1 16 10.2l-6.2 1.3 2.6 7.3-2.8 1L7.1 12.4 1 16.8V1Z"
              fill="#ff62a5"
              stroke="#fff"
              strokeWidth="1.2"
              strokeLinejoin="round"
            />
          </svg>
          <span className="ml-3 mt-3 inline-block rounded-[4px] bg-[#ff62a5] px-1.5 py-0.5 text-[10px] font-medium leading-none text-white">
            {author}
          </span>
        </div>
      </div>
    </div>
  );
}

export function AboutBentoSide() {
  const { t } = useI18n();
  const overview = t.about.overview;

  return (
    <>
      <article className="glow-card overflow-hidden rounded-2xl border border-border bg-card py-5 sm:py-6 lg:col-span-3">
        <h3 className="text-[15px] font-semibold text-foreground px-5">{overview.stackTitle}</h3>
        <p className="mt-2 text-sm leading-6 text-muted px-5">{overview.stackBody}</p>
        <IconMarquee />
      </article>

      <article className="glow-card overflow-hidden rounded-2xl border border-border bg-card p-5 sm:p-6 lg:col-span-3 overflow-visible">
        <h3 className="text-[15px] font-semibold text-foreground">{overview.visualTitle}</h3>
        <p className="mt-2 text-sm leading-6 text-muted">{overview.visualCaption}</p>
        <FigmaMark word={overview.visualMark} author={t.hero.name} />
      </article>
    </>
  );
}
