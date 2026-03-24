"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { siteContent } from "@/data/site-content";
import { toast } from "sonner";
import { FadeIn, HeadingWipe } from "@/components/ui/Animation";
import { z } from "zod";
import { cn } from "@/lib/utils";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(60, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000, "Message is too long"),
});

type ContactState = z.infer<typeof contactSchema>;

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xaqpzebb";

export default function Contact() {
  const [contactState, setContactState] = useState<ContactState>({ name: "", email: "", message: "" });
  const [touched, setTouched] = useState<Partial<Record<keyof ContactState, boolean>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const copyResetTimeoutRef = useRef<number | null>(null);

  const validationResult = useMemo(() => {
    return contactSchema.safeParse(contactState);
  }, [contactState]);

  const contactValid = validationResult.success;
  const fieldErrors = validationResult.success ? {} : validationResult.error.flatten().fieldErrors;

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
    
    if (!contactValid || isSubmitting) return;

    setIsSubmitting(true);

    try {
      const formData = new FormData(e.currentTarget);
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setContactState({ name: "", email: "", message: "" });
        setTouched({});
        toast.success("Message sent successfully!");
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = async () => {
    try {
      if (copyResetTimeoutRef.current) {
        window.clearTimeout(copyResetTimeoutRef.current);
      }

      await navigator.clipboard.writeText(siteContent.contact.email);
      setCopyState("copied");
      toast.success("Email copied to clipboard!");
      copyResetTimeoutRef.current = window.setTimeout(() => {
        setCopyState("idle");
      }, 1400);
    } catch {
      setCopyState("error");
      toast.error("Failed to copy email");
      copyResetTimeoutRef.current = window.setTimeout(() => {
        setCopyState("idle");
      }, 1800);
    }
  };

  useEffect(() => {
    return () => {
      if (copyResetTimeoutRef.current) {
        window.clearTimeout(copyResetTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section id="contact" className="relative z-10 mx-auto max-w-5xl px-6 py-20 md:px-8 md:py-32 scroll-mt-20 border-t border-zinc-200">
      <FadeIn className="bg-white p-8 md:p-16 border border-zinc-200 rounded-3xl">
        <div className="grid md:grid-cols-[1fr_1.25fr] gap-12 md:gap-16">
          <div>
            <h2 className="text-3xl font-medium tracking-tight text-zinc-900 mb-4">
              <HeadingWipe className="bg-white">Let&apos;s connect.</HeadingWipe>
            </h2>
            <p className="text-zinc-600 mb-8 max-w-sm text-sm sm:text-base leading-relaxed">
              {siteContent.identity.availability} {siteContent.contact.responseTime}
            </p>

            <div className="flex min-w-0 flex-col gap-4 text-sm font-medium">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <a href={"mailto:" + siteContent.contact.email} className="min-w-0 max-w-full break-all text-zinc-900 hover:text-zinc-500 transition-colors w-fit">
                  {siteContent.contact.email}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  aria-label="Copy email"
                  title="Copy email"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-300 text-zinc-700 transition-colors hover:border-zinc-400 hover:text-zinc-900"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4" aria-hidden="true">
                    <rect x="9" y="9" width="11" height="11" rx="2" />
                    <path d="M5 15V6a2 2 0 0 1 2-2h9" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {siteContent.contact.socialLinks.map(link => (
                  <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-zinc-900 transition-colors w-fit break-words">
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleContactSubmit} className="flex flex-col gap-8 md:mt-2" noValidate>
            <input type="hidden" name="_subject" value="New portfolio message" />
            <input type="hidden" name="_replyto" value={contactState.email} />
            <input type="text" name="_gotcha" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

            <div className="relative group flex flex-col">
              <input
                type="text"
                id="name"
                name="name"
                placeholder=" "
                value={contactState.name}
                onChange={(e) => setContactState(p => ({ ...p, name: e.target.value }))}
                onBlur={() => setTouched(p => ({ ...p, name: true }))}
                className={cn(
                  "peer w-full border-b bg-transparent py-3 text-base text-zinc-900 placeholder-transparent outline-none transition-colors",
                  touched.name && fieldErrors.name ? "border-rose-400 focus:border-rose-500" : "border-zinc-300 focus:border-zinc-900"
                )}
                required
              />
              <label
                htmlFor="name"
                className={cn(
                  "absolute left-0 top-3 text-base transition-all peer-focus:-top-4 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-xs cursor-text",
                  touched.name && fieldErrors.name ? "text-rose-500" : "text-zinc-500 peer-focus:text-zinc-900 peer-[&:not(:placeholder-shown)]:text-zinc-900"
                )}
              >
                Name
              </label>
              <span className={cn("pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-focus-within:scale-x-100", touched.name && fieldErrors.name ? "bg-rose-500/70" : "bg-zinc-900/70")} />
              {touched.name && fieldErrors.name && (
                <span className="absolute -bottom-5 left-0 text-[11px] text-rose-500 font-medium">{fieldErrors.name[0]}</span>
              )}
            </div>

            <div className="relative group flex flex-col pt-2">
              <input
                type="email"
                id="email"
                name="email"
                placeholder=" "
                value={contactState.email}
                onChange={(e) => setContactState(p => ({ ...p, email: e.target.value }))}
                onBlur={() => setTouched(p => ({ ...p, email: true }))}
                className={cn(
                  "peer w-full border-b bg-transparent py-3 text-base text-zinc-900 placeholder-transparent outline-none transition-colors",
                  touched.email && fieldErrors.email ? "border-rose-400 focus:border-rose-500" : "border-zinc-300 focus:border-zinc-900"
                )}
                required
              />
              <label
                htmlFor="email"
                className={cn(
                  "absolute left-0 top-3 text-base transition-all peer-focus:-top-4 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-xs cursor-text",
                  touched.email && fieldErrors.email ? "text-rose-500" : "text-zinc-500 peer-focus:text-zinc-900 peer-[&:not(:placeholder-shown)]:text-zinc-900"
                )}
              >
                Email
              </label>
              <span className={cn("pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-focus-within:scale-x-100", touched.email && fieldErrors.email ? "bg-rose-500/70" : "bg-zinc-900/70")} />
              {touched.email && fieldErrors.email && (
                <span className="absolute -bottom-5 left-0 text-[11px] text-rose-500 font-medium">{fieldErrors.email[0]}</span>
              )}
            </div>

            <div className="relative group flex flex-col pt-2">
              <textarea
                id="message"
                name="message"
                placeholder=" "
                value={contactState.message}
                onChange={(e) => setContactState(p => ({ ...p, message: e.target.value }))}
                onBlur={() => setTouched(p => ({ ...p, message: true }))}
                rows={4}
                className={cn(
                  "peer w-full border-b bg-transparent py-3 text-base text-zinc-900 placeholder-transparent outline-none transition-colors resize-none",
                  touched.message && fieldErrors.message ? "border-rose-400 focus:border-rose-500" : "border-zinc-300 focus:border-zinc-900"
                )}
                required
              />
              <label
                htmlFor="message"
                className={cn(
                  "absolute left-0 top-3 text-base transition-all peer-focus:-top-4 peer-focus:text-xs peer-[&:not(:placeholder-shown)]:-top-4 peer-[&:not(:placeholder-shown)]:text-xs cursor-text",
                  touched.message && fieldErrors.message ? "text-rose-500" : "text-zinc-500 peer-focus:text-zinc-900 peer-[&:not(:placeholder-shown)]:text-zinc-900"
                )}
              >
                Message
              </label>
              <span className={cn("pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-300 ease-out group-focus-within:scale-x-100", touched.message && fieldErrors.message ? "bg-rose-500/70" : "bg-zinc-900/70")} />
              {touched.message && fieldErrors.message && (
                <span className="absolute -bottom-5 left-0 text-[11px] text-rose-500 font-medium">{fieldErrors.message[0]}</span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-4 mt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-zinc-900 px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </div>
          </form>
        </div>
      </FadeIn>
    </section>
  );
}