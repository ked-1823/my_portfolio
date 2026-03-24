"use client";

import { RefObject, MutableRefObject } from "react";
import { siteContent } from "@/data/site-content";

interface NavItem {
  id: string;
  label: string;
  hideOnMobile: boolean;
}

interface HeaderProps {
  theme: "light" | "dark";
  toggleTheme: () => void;
  activeSection: string;
  navItems: NavItem[];
  scrollToSection: (id: "hero" | "work" | "experience" | "about" | "contact") => void;
  navUnderlineStyle: { left: number; width: number; opacity: number };
  navPhotoAnchorRef: RefObject<HTMLSpanElement | null>;
  navListRef: RefObject<HTMLUListElement | null>;
  navLinkRefs: MutableRefObject<Record<string, HTMLAnchorElement | null>>;
}

export default function Header({
  theme,
  toggleTheme,
  activeSection,
  navItems,
  scrollToSection,
  navUnderlineStyle,
  navPhotoAnchorRef,
  navListRef,
  navLinkRefs,
}: HeaderProps) {
  return (
    <header className={`fixed top-0 z-50 w-full backdrop-blur-md border-b transition-colors ${theme === "dark" ? "bg-zinc-950/80 border-zinc-800" : "bg-[#f9fafb]/80 border-zinc-200"}`}>
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 md:px-8">
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection("hero");
          }}
          className="inline-flex items-center gap-2 text-sm font-semibold tracking-tight text-zinc-900 hover:opacity-70 transition-opacity"
        >
          <span
            ref={navPhotoAnchorRef}
            className="h-8 w-8 rounded-full opacity-0"
            aria-hidden="true"
          >
          </span>
          <span>{siteContent.identity.name}</span>
        </a>

        <div className="flex items-center gap-4 text-sm">
          <ul ref={navListRef} className="relative flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <li key={item.id} className={item.hideOnMobile ? "hidden md:block" : "block"}>
                  <a
                    ref={(el) => {
                      navLinkRefs.current[item.id] = el;
                    }}
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.id as "hero" | "work" | "experience" | "about" | "contact");
                    }}
                    className={`relative pb-1 transition-colors duration-200 ${
                      isActive ? "text-zinc-900 font-medium" : "text-zinc-500 hover:text-zinc-900"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
            <span
              className="pointer-events-none absolute bottom-0 h-[1px] bg-zinc-900 transition-all duration-300 ease-out"
              style={{
                left: navUnderlineStyle.left,
                width: navUnderlineStyle.width,
                opacity: navUnderlineStyle.opacity,
                backgroundColor: theme === "dark" ? "#e4e4e7" : "#18181b",
              }}
              aria-hidden="true"
            />
          </ul>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            title={theme === "dark" ? "Light mode" : "Dark mode"}
            className={`inline-flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
              theme === "dark"
                ? "border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-zinc-100"
                : "border-zinc-200 text-zinc-500 hover:border-zinc-300 hover:text-zinc-700"
            }`}
          >
            <span className="relative h-4 w-4">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className={`absolute inset-0 h-4 w-4 transition-all duration-200 ${
                  theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-45 scale-75 opacity-0"
                }`}
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className={`absolute inset-0 h-4 w-4 transition-all duration-200 ${
                  theme === "dark" ? "rotate-45 scale-75 opacity-0" : "rotate-0 scale-100 opacity-100"
                } ${theme === "dark" ? "text-zinc-300" : "text-zinc-500"}`}
                aria-hidden="true"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3c0 0 0 0 0 0A7 7 0 0 0 21 12.79Z" />
              </svg>
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
}