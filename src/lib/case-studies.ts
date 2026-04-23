import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type CaseStudyFrontmatter = {
  title: string;
  summary: string;
  publishedAt: string;
  projectId: string;
  tags?: string[];
  readTime?: string;
};

export type CaseStudyMeta = CaseStudyFrontmatter & {
  slug: string;
};

export type CaseStudyDoc = {
  meta: CaseStudyMeta;
  content: string;
};

const CASE_STUDIES_DIR = path.join(process.cwd(), "src", "content", "projects");

function getCaseStudyPaths(): string[] {
  if (!fs.existsSync(CASE_STUDIES_DIR)) return [];

  return fs
    .readdirSync(CASE_STUDIES_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => path.join(CASE_STUDIES_DIR, file));
}

export function getAllCaseStudiesMeta(): CaseStudyMeta[] {
  return getCaseStudyPaths()
    .map((filePath) => {
      const fileContents = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContents);
      const slug = path.basename(filePath, ".mdx");

      return {
        slug,
        ...(data as CaseStudyFrontmatter),
      };
    })
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
}

export function getCaseStudyBySlug(slug: string): CaseStudyDoc | null {
  const filePath = path.join(CASE_STUDIES_DIR, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    meta: {
      slug,
      ...(data as CaseStudyFrontmatter),
    },
    content,
  };
}
