import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface AsyncStatusPillProps {
  theme: "light" | "dark";
  state: "loading" | "error" | "success";
  children: ReactNode;
}

export function AsyncStatusPill({ theme, state, children }: AsyncStatusPillProps) {
  const tone = {
    loading: theme === "dark" ? "border-zinc-700 text-zinc-400" : "border-zinc-200 text-zinc-500",
    error: theme === "dark" ? "border-rose-700/70 text-rose-300" : "border-rose-200 text-rose-600",
    success: theme === "dark" ? "border-zinc-700 text-zinc-300" : "border-zinc-200 text-zinc-700",
  };

  return <span className={cn("rounded-full border px-3 py-1", tone[state])}>{children}</span>;
}

interface AsyncNoticeProps {
  theme: "light" | "dark";
  title: string;
  description: string;
}

export function AsyncNotice({ theme, title, description }: AsyncNoticeProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-dashed px-4 py-3",
        theme === "dark" ? "border-zinc-700" : "border-zinc-200"
      )}
      role="status"
      aria-live="polite"
    >
      <p className={cn("text-[11px] uppercase tracking-wider", theme === "dark" ? "text-zinc-400" : "text-zinc-500")}>{title}</p>
      <p className={cn("mt-1 text-sm", theme === "dark" ? "text-zinc-300" : "text-zinc-600")}>{description}</p>
    </div>
  );
}
