import { siteContent, type ExperienceItem } from "@/data/site-content";
import { FadeIn, HeadingWipe, ExpBulletPoint } from "@/components/ui/Animation";

const experience: ExperienceItem[] = siteContent.experience;

export default function Experience() {
  return (
    <section id="experience" className="relative z-10 mx-auto max-w-5xl px-6 py-20 md:px-8 md:py-32 scroll-mt-20 border-t border-zinc-200">
      <h2 className="text-sm font-semibold tracking-wide uppercase text-zinc-400 mb-12"><HeadingWipe>Experience</HeadingWipe></h2>

      <div className="flex flex-col gap-12">
        {experience.map((item) => (
          <FadeIn key={`${item.company}-${item.role}`} className="grid md:grid-cols-[1fr_2fr] gap-4 md:gap-12 items-baseline">
            <div className="text-zinc-500 text-sm mt-1">
              {item.period}
            </div>

            <div>
              <div className="flex flex-wrap items-baseline gap-x-4 mb-1 border-b border-transparent">
                <h3 className="text-lg font-medium text-zinc-900">{item.role}</h3>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[11px] font-semibold text-zinc-400 hover:text-zinc-900 transition-colors uppercase tracking-wider"
                  >
                    View Details ↗
                  </a>
                )}
              </div>
              <p className="text-zinc-500 mb-4">{item.company}</p>
              <ul className="space-y-3 text-zinc-600 text-base leading-relaxed">
                {item.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3">
                    <ExpBulletPoint className="bg-zinc-400" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}