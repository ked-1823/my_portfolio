"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import profilePic from "../../public/images/400x400.jpg";
import { siteContent } from "@/data/site-content";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import About from "@/components/About";
import Contact from "@/components/Contact";

const sectionIds = ["hero", "work", "experience", "about", "contact"] as const;

const MOTION = {
  userScrollThresholdPx: 8,
  dockEnterMinPx: 120,
  dockEnterViewportRatio: 0.14,
  dockExitPx: 24,
  dockTransitionMs: 520,
  dockEmphasisMs: 420,
  revealDurationMs: 780,
  headingDurationMs: 560,
  bulletDurationMs: 360,
  bulletStaggerMs: 35,
  bulletStaggerMaxMs: 280,
  projectStaggerMs: 80,
  projectStaggerMaxMs: 520,
  standardEasing: "cubic-bezier(0.22, 1, 0.36, 1)",
};

const THEME_STORAGE_KEY = "portfolio-theme";

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [activeSection, setActiveSection] = useState<(typeof sectionIds)[number]>("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [photoMorphStyle, setPhotoMorphStyle] = useState({
    x: 0,
    y: 0,
    size: 40,
    opacity: 0,
  });
  const [isDockEmphasized, setIsDockEmphasized] = useState(false);

  const navPhotoAnchorRef = useRef<HTMLSpanElement | null>(null);
  const heroPhotoAnchorRef = useRef<HTMLDivElement | null>(null);
  const isPhotoDockedRef = useRef(false);
  const lastDockStateRef = useRef<boolean | null>(null);
  const scrollInitYRef = useRef<number | null>(null);
  const hasUserScrolledRef = useRef(false);
  const dockPolishTimeoutRef = useRef<number | null>(null);
  const cursorGlowRef = useRef<HTMLDivElement | null>(null);
  const navListRef = useRef<HTMLUListElement | null>(null);
  const navLinkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});
  const [navUnderlineStyle, setNavUnderlineStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const hasInitializedThemeRef = useRef(false);

  const scrollToSection = (sectionId: (typeof sectionIds)[number]) => {
    const target = document.getElementById(sectionId);
    if (!target) return;

    target.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const navItems = useMemo(
    () => [
      { id: "work", label: "Work", hideOnMobile: true },
      { id: "experience", label: "Experience", hideOnMobile: true },
      { id: "about", label: "About", hideOnMobile: true },
      { id: "contact", label: "Contact", hideOnMobile: false },
    ],
    []
  );

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY) as "light" | "dark" | null;
    const initialTheme = savedTheme === "light" || savedTheme === "dark" ? savedTheme : "dark";

    document.documentElement.classList.toggle("dark", initialTheme === "dark");
    window.localStorage.setItem(THEME_STORAGE_KEY, initialTheme);
    setTheme(initialTheme);
    hasInitializedThemeRef.current = true;
  }, []);

  useEffect(() => {
    if (!hasInitializedThemeRef.current) return;
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.4;
      const totalScrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScrollableHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / totalScrollableHeight)) : 0;
      setScrollProgress(progress);

      if (scrollInitYRef.current === null) {
        scrollInitYRef.current = window.scrollY;
      }
      if (!hasUserScrolledRef.current && Math.abs(window.scrollY - scrollInitYRef.current) > MOTION.userScrollThresholdPx) {
        hasUserScrolledRef.current = true;
      }

      const enterDockY = Math.max(MOTION.dockEnterMinPx, window.innerHeight * MOTION.dockEnterViewportRatio);
      const exitDockY = MOTION.dockExitPx;
      const shouldDockPhoto = isPhotoDockedRef.current
        ? window.scrollY > exitDockY
        : window.scrollY > enterDockY;
      isPhotoDockedRef.current = shouldDockPhoto;

      const navAnchor = navPhotoAnchorRef.current;
      const heroAnchor = heroPhotoAnchorRef.current;
      if (navAnchor && heroAnchor) {
        const dockChanged = lastDockStateRef.current === null || lastDockStateRef.current !== shouldDockPhoto;
        if (dockChanged) {
          const navRect = navAnchor.getBoundingClientRect();
          const heroRect = heroAnchor.getBoundingClientRect();
          const targetRect = shouldDockPhoto ? navRect : heroRect;

          setPhotoMorphStyle({
            x: targetRect.left,
            y: targetRect.top,
            size: targetRect.width,
            opacity: 1,
          });

          if (shouldDockPhoto) {
            setIsDockEmphasized(true);
            if (dockPolishTimeoutRef.current) {
              window.clearTimeout(dockPolishTimeoutRef.current);
            }
            dockPolishTimeoutRef.current = window.setTimeout(() => {
              setIsDockEmphasized(false);
            }, MOTION.dockEmphasisMs);
          } else {
            setIsDockEmphasized(false);
          }

          lastDockStateRef.current = shouldDockPhoto;
        }
      }
      
      let currentSection = "hero" as (typeof sectionIds)[number];
      
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const { offsetTop, offsetHeight } = el;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentSection = id;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);



      if (dockPolishTimeoutRef.current) {
        window.clearTimeout(dockPolishTimeoutRef.current);
      }
    };
  }, [showAllProjects]);

  useEffect(() => {
    const updateUnderline = () => {
      const listEl = navListRef.current;
      const activeNavItem = navItems.find((item) => item.id === activeSection);
      const activeLinkEl = activeNavItem ? navLinkRefs.current[activeNavItem.id] : null;

      if (!listEl || !activeLinkEl || activeLinkEl.offsetParent === null || activeLinkEl.offsetWidth === 0) {
        setNavUnderlineStyle((prev) => ({ ...prev, opacity: 0 }));
        return;
      }

      const listRect = listEl.getBoundingClientRect();
      const linkRect = activeLinkEl.getBoundingClientRect();

      setNavUnderlineStyle({
        left: linkRect.left - listRect.left,
        width: linkRect.width,
        opacity: 1,
      });
    };

    updateUnderline();
    window.addEventListener("resize", updateUnderline);
    return () => window.removeEventListener("resize", updateUnderline);
  }, [activeSection, navItems]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const handlePointerMove = (event: PointerEvent) => {
      if (!cursorGlowRef.current) return;
      cursorGlowRef.current.style.setProperty("--cursor-x", `${event.clientX}px`);
      cursorGlowRef.current.style.setProperty("--cursor-y", `${event.clientY}px`);
      cursorGlowRef.current.style.opacity = "1";
    };

    const handlePointerLeave = () => {
      if (!cursorGlowRef.current) return;
      cursorGlowRef.current.style.opacity = "0";
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerleave", handlePointerLeave);
    };
  }, []);

  return (
    <main className="relative min-h-screen selection:bg-zinc-200">
      <a
        href="#main-content"
        className="skip-link"
      >
        Skip to main content
      </a>

      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
            linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)
          `,
          backgroundSize: "20px 20px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 80% 80% at 0% 0%, #000 50%, transparent 90%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      <div
        ref={cursorGlowRef}
        className="fixed inset-0 z-0 pointer-events-none opacity-0 transition-opacity duration-500"
        style={{
          backgroundImage:
            theme === "dark"
              ? "radial-gradient(420px circle at var(--cursor-x, 50%) var(--cursor-y, 50%), rgba(99, 102, 241, 0.18), transparent 62%)"
              : "radial-gradient(420px circle at var(--cursor-x, 50%) var(--cursor-y, 50%), rgba(24, 24, 27, 0.08), transparent 62%)",
        }}
        aria-hidden="true"
      />

      <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[2px] bg-transparent" aria-hidden="true">
        <div
          className={`h-full origin-left transition-transform duration-100 ${theme === "dark" ? "bg-indigo-400/90" : "bg-zinc-900/85"}`}
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        activeSection={activeSection}
        navItems={navItems}
        scrollToSection={scrollToSection}
        navUnderlineStyle={navUnderlineStyle}
        navPhotoAnchorRef={navPhotoAnchorRef}
        navListRef={navListRef}
        navLinkRefs={navLinkRefs}
      />

      <div id="main-content">
        <Hero theme={theme} heroPhotoAnchorRef={heroPhotoAnchorRef} scrollToSection={scrollToSection} />

        <div
          className={`pointer-events-none fixed z-[60] overflow-hidden rounded-full bg-zinc-100 transition-[box-shadow,border-color] duration-300 ${isDockEmphasized ? 'border border-zinc-400 shadow-[0_6px_20px_rgba(24,24,27,0.18)]' : 'border border-zinc-200 shadow-sm'}`}
          style={{
            left: photoMorphStyle.x,
            top: photoMorphStyle.y,
            width: photoMorphStyle.size,
            height: photoMorphStyle.size,
            opacity: photoMorphStyle.opacity,
            transition: hasUserScrolledRef.current
              ? `left ${MOTION.dockTransitionMs}ms cubic-bezier(0.22, 1, 0.36, 1), top ${MOTION.dockTransitionMs}ms cubic-bezier(0.22, 1, 0.36, 1), width ${MOTION.dockTransitionMs}ms cubic-bezier(0.22, 1, 0.36, 1), height ${MOTION.dockTransitionMs}ms cubic-bezier(0.22, 1, 0.36, 1)`
              : "none",
          }}
          aria-hidden="true"
        >
          <Image
            src={profilePic}
            placeholder="blur"
            alt={`${siteContent.identity.name} profile`}
            fill
            sizes="160px"
            className="h-full w-full object-cover grayscale"
          />
        </div>

        <Projects showAllProjects={showAllProjects} setShowAllProjects={setShowAllProjects} />
        <Experience />
        <About theme={theme} />
        <Contact />
      </div>

      <footer className="relative z-10 border-t border-zinc-200">
        <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8 text-xs text-zinc-500 md:flex-row md:items-center md:justify-between md:px-8">
          <p>© 2026 Kedar Mane</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span>Built with Next.js</span>
            <span aria-hidden="true">&bull;</span>
            <span>Last updated: Mar 2026</span>
            <span aria-hidden="true">&bull;</span>
            <span>
              Background pattern powered by {" "}
              <a
                href="https://patterncraft.fun"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2 transition-opacity hover:opacity-80"
              >
                PatternCraft.fun
              </a>
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
