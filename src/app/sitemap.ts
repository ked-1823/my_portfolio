import type { MetadataRoute } from "next";
import { getAllCaseStudiesMeta } from "@/lib/case-studies";

const SITE_URL = "https://kedarmane.me";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const caseStudies = getAllCaseStudiesMeta().map((study) => ({
    url: `${SITE_URL}/projects/${study.slug}`,
    lastModified: study.publishedAt ? new Date(study.publishedAt) : now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...caseStudies,
  ];
}
