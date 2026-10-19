import { siteContent, type ExperienceItem } from "@/data/site-content";
import { FadeIn, HeadingWipe, ExpBulletPoint } from "@/components/ui/Animation";

const experience: ExperienceItem[] = siteContent.experience;
const professionalExperience = experience.filter((item) => item.role.includes("Intern"));
const credentials = experience.filter((item) => !item.role.includes("Intern"));

export default function Experience() {
  return (
    <section id="experience" className="relative z-10 mx-auto max-w-5xl px-6 py-20 md:px-8 md:py-32 scroll-mt-20 border-t border-zinc-200">
      <h2 className="text-sm font-semibold tracking-wide uppercase text-zinc-400 mb-12"><HeadingWipe>Experience</HeadingWipe></h2>

      <div className="space-y-14">
        <div className="grid gap-6 lg:grid-cols-2">
          {professionalExperience.map((item) => (
            <FadeIn
              key={`${item.company}-${item.role}`}
              className="rounded-2xl border border-white/70 bg-white/80 p-6 shadow-[0_10px_28px_rgba(74,15,20,0.08)] transition-colors hover:border-white dark:border-zinc-800/80 dark:bg-zinc-950/25 dark:shadow-none dark:hover:border-zinc-700"
            >
              <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="mb-2 text-xs font-medium uppercase tracking-wider text-zinc-500">{item.period}</p>
                  <h3 className="text-lg font-medium text-zinc-900">{item.role}</h3>
                  <p className="mt-1 text-zinc-500">{item.company}</p>
                </div>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-[11px] font-semibold uppercase tracking-wider text-zinc-400 transition-colors hover:text-zinc-900"
                  >
                    View Details ↗
                  </a>
                )}
              </div>
              <ul className="space-y-2 text-sm leading-relaxed text-zinc-600">
                {item.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-start gap-3">
                    <ExpBulletPoint className="mt-1 bg-zinc-400" />
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          ))}
        </div>

        <div>
          <p className="mb-5 text-xs font-semibold uppercase tracking-wider text-zinc-400">Certifications & Activities</p>
          <div className="grid gap-4 md:grid-cols-2">
            {credentials.map((item) => (
              <FadeIn
                key={`${item.company}-${item.role}`}
                className="rounded-xl border border-white/70 bg-white/80 p-5 shadow-[0_8px_22px_rgba(74,15,20,0.06)] transition-colors hover:border-white dark:border-zinc-800/70 dark:bg-zinc-950/20 dark:shadow-none dark:hover:border-zinc-700"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">{item.period}</p>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 text-[11px] font-semibold uppercase tracking-wider text-zinc-400 transition-colors hover:text-zinc-900"
                    >
                      View Details ↗
                    </a>
                  )}
                </div>
                <h3 className="mt-3 text-base font-medium text-zinc-900">{item.role}</h3>
                <p className="mt-1 text-sm text-zinc-500">{item.company}</p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">{item.outcomes.join(" ")}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}