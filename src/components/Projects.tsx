"use client";

import { useMemo } from "react";
import Link from "next/link";
import { siteContent, type Project } from "@/data/site-content";
import { FadeIn, HeadingWipe } from "@/components/ui/Animation";

const projects: Project[] = siteContent.projects;
const MOTION = {
  projectStaggerMs: 80,
  projectStaggerMaxMs: 520,
};

interface ProjectsProps {
  showAllProjects: boolean;
  setShowAllProjects: (show: boolean) => void;
}

export default function Projects({ showAllProjects, setShowAllProjects }: ProjectsProps) {
  const displayedProjects = useMemo(
    () => (showAllProjects ? projects : projects.filter((project) => project.featured)),
    [showAllProjects]
  );

  return (
    <section id="work" className="relative z-10 mx-auto max-w-5xl px-6 py-20 md:px-8 md:py-32 scroll-mt-20">
      <h2 className="text-sm font-semibold tracking-wide uppercase text-zinc-400 mb-12">
        <HeadingWipe>Selected Work</HeadingWipe>
      </h2>

      <div className="flex flex-col gap-10 md:gap-14 transition-all duration-700 ease-in-out">
        {displayedProjects.map((project, idx) => (
          <FadeIn key={project.id} delay={Math.min(idx * MOTION.projectStaggerMs, MOTION.projectStaggerMaxMs) / 1000} className="group relative grid md:grid-cols-[1fr_2fr] gap-4 md:gap-12 items-center rounded-xl border border-transparent px-3 py-3 md:px-4 md:py-4 hover:-translate-y-[2px] hover:border-zinc-200">
            {/* Left Column: Title & Tags */}
            <div>
              <h3 className="text-2xl font-medium text-zinc-900">{project.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 border border-zinc-200 text-zinc-600 rounded-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Column: Details & Links */}
            <div className="flex flex-col justify-center">
              <p className="text-lg text-zinc-600 leading-relaxed">{project.impact}</p>

              <div className="mt-8 flex gap-6 text-sm font-medium">
                {project.projectSlug && (
                  <Link href={`/projects/${project.projectSlug}`} className="group/link inline-flex items-center gap-2 text-zinc-900">
                    View Code
                    <span className="transition-transform group-hover/link:translate-x-1">→</span>
                  </Link>
                )}
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="group/link inline-flex items-center gap-2 text-zinc-900">
                    Live Project
                    <span className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1">↗</span>
                  </a>
                )}
                {project.sourceUrl && (
                  <a href={project.sourceUrl} target="_blank" rel="noopener noreferrer" className="group/link inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition-colors">
                    Source Code
                    <span className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1">↗</span>
                  </a>
                )}
              </div>
            </div>

            {/* Subtle divider for all but last */}
            {idx !== displayedProjects.length - 1 && (
              <div className="col-span-full h-px w-full bg-zinc-200 mt-10 md:mt-14" />
            )}
          </FadeIn>
        ))}
      </div>

      {projects.length > displayedProjects.length || showAllProjects ? (
        <div className="mt-10 md:mt-14 flex justify-center">
          <button
            onClick={() => setShowAllProjects(!showAllProjects)}
            className="group inline-flex h-11 items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white px-6 text-sm font-medium text-zinc-900 transition-all hover:border-zinc-300 hover:bg-zinc-50 active:scale-[0.98]"
          >
            {showAllProjects ? "Show Less" : "View All Projects"}
            <svg
              className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${showAllProjects ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      ) : null}
    </section>
  );
}