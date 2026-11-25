import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { getAllCaseStudiesMeta, getCaseStudyBySlug } from "@/lib/case-studies";

interface CaseStudyPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllCaseStudiesMeta().map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: `${study.meta.title} | Case Study`,
    description: study.meta.summary,
    openGraph: {
      title: `${study.meta.title} | Case Study`,
      description: study.meta.summary,
      type: "article",
      url: `/projects/${study.meta.slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const { content } = await compileMDX({
    source: study.content,
    options: {
      parseFrontmatter: false,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
      },
    },
  });

  return (
    <main className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <article className="mx-auto max-w-3xl px-6 py-16 md:px-8 md:py-24">
        <Link href="/#work" className="mb-8 inline-flex items-center text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
          ← Back to Projects
        </Link>

        <header className="mb-10 border-b border-zinc-200 pb-8 dark:border-zinc-800">
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Case Study</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{study.meta.title}</h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-300">{study.meta.summary}</p>

          <div className="mt-6 flex flex-wrap items-center gap-2">
            {(study.meta.tags ?? []).map((tag) => (
              <span key={tag} className="rounded-full border border-zinc-200 px-2.5 py-1 text-xs text-zinc-700 dark:border-zinc-700 dark:text-zinc-300">
                {tag}
              </span>
            ))}
            {study.meta.readTime && (
              <span className="rounded-full border border-zinc-200 px-2.5 py-1 text-xs text-zinc-500 dark:border-zinc-700 dark:text-zinc-400">
                {study.meta.readTime}
              </span>
            )}
          </div>
        </header>

        <div
          className="space-y-6 leading-relaxed [&_h2]:mt-10 [&_h2]:text-2xl [&_h2]:font-semibold [&_h3]:mt-8 [&_h3]:text-xl [&_h3]:font-semibold [&_p]:text-zinc-700 [&_p]:dark:text-zinc-300 [&_ul]:ml-6 [&_ul]:list-disc [&_ol]:ml-6 [&_ol]:list-decimal [&_li]:mt-1 [&_a]:underline [&_a]:underline-offset-4 [&_hr]:my-8 [&_hr]:border-zinc-200 [&_hr]:dark:border-zinc-800 [&_pre]:overflow-x-auto [&_pre]:rounded-xl [&_pre]:border [&_pre]:border-zinc-200 [&_pre]:bg-zinc-50 [&_pre]:p-4 [&_pre]:text-sm [&_pre]:dark:border-zinc-800 [&_pre]:dark:bg-zinc-900 [&_code]:rounded [&_code]:bg-zinc-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_code]:dark:bg-zinc-800 [&_pre_code]:bg-transparent [&_pre_code]:p-0 [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_table]:border-collapse [&_th]:border [&_th]:border-zinc-200 [&_th]:px-3 [&_th]:py-2 [&_th]:text-left [&_th]:text-sm [&_th]:font-semibold [&_th]:dark:border-zinc-800 [&_td]:border [&_td]:border-zinc-200 [&_td]:px-3 [&_td]:py-2 [&_td]:text-sm [&_td]:dark:border-zinc-800"
        >
          {content}
        </div>
      </article>
    </main>
  );
}
