"use client";

import { useEffect, useMemo, useState } from "react";
import { siteContent } from "@/data/site-content";
import { FadeIn, HeadingWipe } from "@/components/ui/Animation";
import { AsyncNotice, AsyncStatusPill } from "@/components/ui/AsyncState";

type GitHubUser = {
  login: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
  updated_at: string;
};

function getProfileUrl(label: string): string | null {
  return siteContent.contact.socialLinks.find((link) => link.label.toLowerCase() === label.toLowerCase())?.href ?? null;
}

function getUsernameFromUrl(url: string | null, fallback = ""): string {
  if (!url) return fallback;

  try {
    const parsed = new URL(url);
    const segments = parsed.pathname.split("/").filter(Boolean);
    const first = segments[0];
    const username = ["u", "users", "user", "profile"].includes(first) ? segments[1] : first;
    return username || fallback;
  } catch {
    return fallback;
  }
}

interface LiveStatsProps {
  theme: "light" | "dark";
  insideAbout?: boolean;
}

export default function LiveStats({ theme, insideAbout = false }: LiveStatsProps) {
  const githubUrl = useMemo(() => getProfileUrl("github") ?? "https://github.com/ked-1823", []);
  const kaggleUrl = useMemo(() => getProfileUrl("kaggle"), []);
  const leetcodeUrl = useMemo(() => getProfileUrl("leetcode"), []);

  const githubUsername = useMemo(() => getUsernameFromUrl(githubUrl, "ked-1823"), [githubUrl]);
  const kaggleUsername = useMemo(() => getUsernameFromUrl(kaggleUrl, "kaggle"), [kaggleUrl]);
  const leetcodeUsername = useMemo(() => getUsernameFromUrl(leetcodeUrl, "leetcode"), [leetcodeUrl]);

  const heatmapUrl = useMemo(() => `https://ghchart.rshah.org/16a34a/${githubUsername}`, [githubUsername]);
  const leetCardTheme = theme === "dark" ? "dark" : "light";
  const leetCardUrl = useMemo(
    () => `https://leetcard.jacoblin.cool/${leetcodeUsername}?theme=${leetCardTheme}&font=baloo&ext=heatmap`,
    [leetcodeUsername, leetCardTheme]
  );

  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [heatmapUnavailable, setHeatmapUnavailable] = useState(false);
  const [leetcardUnavailable, setLeetcardUnavailable] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function fetchGitHubStats() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`https://api.github.com/users/${githubUsername}`, {
          headers: {
            Accept: "application/vnd.github+json",
          },
        });

        if (!response.ok) {
          throw new Error("Could not load GitHub stats right now.");
        }

        const data: GitHubUser = await response.json();
        if (!cancelled) {
          setUser(data);
        }
      } catch {
        if (!cancelled) {
          setError("Live stats unavailable at the moment.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchGitHubStats();

    return () => {
      cancelled = true;
    };
  }, [githubUsername]);

  return (
    <FadeIn>
      <div className={insideAbout ? "" : "relative z-10 mx-auto max-w-5xl px-6 py-20 md:px-8 md:py-32 scroll-mt-20 border-t border-zinc-200"}>
        <h2 className={`text-sm font-semibold tracking-wide uppercase text-zinc-400 ${insideAbout ? "mb-6" : "mb-12"}`}>
          <HeadingWipe>Live Coding Presence</HeadingWipe>
        </h2>

        <div
          className={`rounded-2xl border p-6 md:p-8 ${
            theme === "dark" ? "border-zinc-800 bg-zinc-900/70" : "border-zinc-200 bg-white/70"
          }`}
        >
          <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${
                theme === "dark" ? "text-zinc-100 hover:text-zinc-300" : "text-zinc-900 hover:text-zinc-600"
              }`}
            >
              github.com/{githubUsername}
              <span aria-hidden="true">↗</span>
            </a>
            {user?.updated_at && <span className={`text-xs ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"}`}>Synced {new Date(user.updated_at).toLocaleDateString()}</span>}
          </div>

          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`block overflow-hidden rounded-xl border p-3 ${
              theme === "dark" ? "border-zinc-700 bg-zinc-950" : "border-zinc-200 bg-white"
            }`}
          >
            {heatmapUnavailable ? (
              <AsyncNotice
                theme={theme}
                title="Contribution Heatmap"
                description="Heatmap is temporarily unavailable. Open GitHub profile for latest activity."
              />
            ) : (
              <img
                src={heatmapUrl}
                alt={`${githubUsername} GitHub contribution heatmap`}
                className={`h-auto w-full ${theme === "dark" ? "brightness-90 contrast-110" : ""}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                onError={() => setHeatmapUnavailable(true)}
              />
            )}
          </a>

          <div className="mt-5 flex flex-wrap items-center gap-2 text-xs">
            {loading ? (
              <AsyncStatusPill theme={theme} state="loading">Loading live stats...</AsyncStatusPill>
            ) : error || !user ? (
              <AsyncStatusPill theme={theme} state="error">{error ?? "GitHub stats unavailable"}</AsyncStatusPill>
            ) : (
              <>
                <AsyncStatusPill theme={theme} state="success">Repos: {user.public_repos}</AsyncStatusPill>
                <AsyncStatusPill theme={theme} state="success">Followers: {user.followers}</AsyncStatusPill>
                <AsyncStatusPill theme={theme} state="success">Following: {user.following}</AsyncStatusPill>
              </>
            )}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <a
              href={kaggleUrl ?? "https://www.kaggle.com/"}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-xl border px-4 py-3 transition-colors ${
                theme === "dark" ? "border-zinc-700 hover:border-zinc-500" : "border-zinc-200 hover:border-zinc-300"
              }`}
            >
              <p className={`text-[11px] uppercase tracking-wider ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"}`}>Kaggle</p>
              <p className={`mt-1 text-sm font-medium ${theme === "dark" ? "text-zinc-100" : "text-zinc-900"}`}>{kaggleUrl ? `@${kaggleUsername}` : "Set profile URL"}</p>
              <p className={`mt-1 text-xs ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"}`}>
                Competitions, notebooks, and ranking visibility
              </p>
            </a>

            {leetcodeUrl ? (
              <a
                href={leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-xl border px-4 py-3 transition-colors ${
                  theme === "dark" ? "border-zinc-700 hover:border-zinc-500" : "border-zinc-200 hover:border-zinc-300"
                }`}
              >
                <p className={`text-[11px] uppercase tracking-wider ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"}`}>LeetCode</p>
                <p className={`mt-1 text-sm font-medium ${theme === "dark" ? "text-zinc-100" : "text-zinc-900"}`}>@{leetcodeUsername}</p>
                <p className={`mt-1 text-xs ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"}`}>
                  Problem-solving consistency and DSA practice profile
                </p>
              </a>
            ) : (
              <AsyncNotice
                theme={theme}
                title="LeetCode (Optional)"
                description="Add a LeetCode link in social profiles to enable this card."
              />
            )}
          </div>

          {leetcodeUrl && (
            <div className="mt-6">
              <p className={`mb-2 text-[11px] uppercase tracking-wider ${theme === "dark" ? "text-zinc-400" : "text-zinc-500"}`}>
                LeetCode Activity Chart
              </p>
              <a
                href={leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`block overflow-hidden rounded-xl border p-3 ${
                  theme === "dark" ? "border-zinc-700 bg-zinc-950" : "border-zinc-200 bg-white"
                }`}
              >
                {leetcardUnavailable ? (
                  <AsyncNotice
                    theme={theme}
                    title="LeetCode chart unavailable"
                    description="Chart provider is temporarily unavailable. Open profile for latest activity."
                  />
                ) : (
                  <img
                    src={leetCardUrl}
                    alt={`${leetcodeUsername} LeetCode activity and stats chart`}
                    className="h-auto w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    onError={() => setLeetcardUnavailable(true)}
                  />
                )}
              </a>
            </div>
          )}
        </div>
      </div>
    </FadeIn>
  );
}
