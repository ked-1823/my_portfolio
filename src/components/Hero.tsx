"use client";

import { RefObject } from "react";
import { siteContent } from "@/data/site-content";
import { FadeIn } from "@/components/ui/Animation";

const featuredCredentials = [
  {
    label: "IBM Cognitive Class",
    href: "https://courses.cognitiveclass.ai/certificates/ab3578492ebd43179157ea9c87dc80c8",
  },
  {
    label: "FreeCodeCamp ML",
    href: "https://www.freecodecamp.org/certification/kedarmane/machine-learning-with-python-v7",
  },
  {
    label: "NullClass Internship",
    href: "/images/nullclass_internship.jpg",
  },
] as const;

interface HeroProps {
  theme: "light" | "dark";
  heroPhotoAnchorRef: RefObject<HTMLDivElement | null>;
  scrollToSection: (id: "hero" | "work" | "experience" | "about" | "contact") => void;
}

export default function Hero({ theme, heroPhotoAnchorRef, scrollToSection }: HeroProps) {
  return (
    <section id="hero" className="relative z-10 mx-auto max-w-5xl px-6 pt-40 pb-20 md:px-8 md:pt-48 md:pb-32">
      <FadeIn className="flex flex-col-reverse md:flex-row gap-8 md:gap-16 items-start">
        <div className="max-w-3xl">
          <p className="text-zinc-500 text-sm font-medium tracking-wide uppercase mb-6">
            {siteContent.identity.role}
          </p>
          <h1 className="text-4xl md:text-6xl font-medium tracking-tight leading-[1.1] text-zinc-900">
            {siteContent.identity.headline}
          </h1>
          <p className="mt-8 max-w-xl text-lg text-zinc-600 leading-relaxed">
            {siteContent.identity.summary}
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("work");
              }}
              className={`inline-flex h-11 items-center justify-center px-6 text-sm font-medium transition-transform hover:scale-[1.02] active:scale-[0.98] ${
                theme === "dark"
                  ? "bg-zinc-100 text-black hover:bg-zinc-200"
                  : "bg-black text-white hover:bg-zinc-800"
              }`}
            >
              View Selected Work
            </a>
            <a
              href={siteContent.identity.recruiterCta}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center justify-center border border-zinc-300 bg-white px-6 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50"
            >
              Resume
            </a>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {featuredCredentials.map((credential) => (
              <a
                key={credential.label}
                href={credential.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-zinc-200 bg-white/80 px-3 py-1.5 text-[11px] font-medium tracking-wide text-zinc-700 transition-colors hover:border-zinc-300 hover:text-zinc-900"
              >
                {credential.label}
              </a>
            ))}
          </div>
        </div>

        <div
          ref={heroPhotoAnchorRef}
          className="shrink-0 w-28 h-28 md:w-40 md:h-40 rounded-full opacity-0"
          aria-hidden="true"
        >
        </div>
      </FadeIn>

      <FadeIn delay={0.2} className="mt-20 grid sm:grid-cols-2 gap-3 pt-8 border-t border-zinc-200">
        {siteContent.snapshot.map((item) => (
          <div key={item.label} className="rounded-lg border border-zinc-200/80 bg-white/60 px-4 py-3">
            <p className="text-[11px] font-medium tracking-wider uppercase text-zinc-500">{item.label}</p>
            <p className="mt-1 text-sm font-medium text-zinc-900">{item.value}</p>
          </div>
        ))}
      </FadeIn>
    </section>
  );
}