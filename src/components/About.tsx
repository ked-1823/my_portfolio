import { siteContent } from "@/data/site-content";
import { FadeIn, HeadingWipe } from "@/components/ui/Animation";
import LiveStats from "@/components/LiveStats";

interface AboutProps {
  theme: "light" | "dark";
}

export default function About({ theme }: AboutProps) {
  return (
    <section id="about" className="relative z-10 mx-auto max-w-5xl px-6 py-20 md:px-8 md:py-32 scroll-mt-20 border-t border-zinc-200">
      <FadeIn className="grid md:grid-cols-[1fr_2fr] gap-12">
        <h2 className="text-sm font-semibold tracking-wide uppercase text-zinc-400">
          <HeadingWipe>About</HeadingWipe>
        </h2>

        <div>
          <p className="text-lg md:text-xl text-zinc-900 leading-relaxed mb-8">
            {siteContent.about.description}
          </p>

          <div className="grid sm:grid-cols-2 gap-8 pt-8 border-t border-zinc-200">
            <div>
              <h3 className="font-medium text-zinc-900 mb-4">Core Focus</h3>
              <ul className="space-y-2 text-zinc-600">
                {siteContent.about.strengths.map(strength => (
                  <li key={strength}>{strength}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-zinc-900 mb-4">Working Style</h3>
              <ul className="space-y-2 text-zinc-600">
                {siteContent.about.workingStyle.map(style => (
                  <li key={style}>{style}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.08} className="mt-12 pt-8 border-t border-zinc-200">
        <LiveStats theme={theme} insideAbout />
      </FadeIn>
    </section>
  );
}