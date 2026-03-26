# Kedar Mane Portfolio

Personal portfolio built with **Next.js 16 App Router**, **React 19**, **TypeScript**, and **Tailwind CSS v4**.

This repo is content-driven: profile data, projects, and social links are managed from central content files, while UI components render that data consistently across light/dark themes.

---

## Tech Stack

- Next.js `16.2.1` (App Router)
- React `19.2.4`
- TypeScript
- Tailwind CSS v4
- Framer Motion (section animations)
- Sonner (toasts)
- Zod (form validation)
- MDX system (`gray-matter`, `next-mdx-remote`, `remark-gfm`) for case studies

---

## Key Features

- Modular single-page layout (`Hero`, `Projects`, `Experience`, `About`, `Contact`)
- Persistent light/dark theme with smooth toggle micro-interactions
- Sticky top scroll progress indicator
- Interactive cursor glow background
- GitHub/Kaggle/LeetCode live presence block (inside About)
- MDX-based project case studies at `/projects/[slug]`
- Contact form with Formspree + Zod validation + toast feedback
- Auto-generated SEO routes:
	- `/sitemap.xml`
	- `/robots.txt`
- JSON-LD structured data (`Person`) in layout

---

## Project Structure

```text
src/
	app/
		layout.tsx                # global metadata + theme bootstrap + JSON-LD
		page.tsx                  # homepage composition + scroll/theme logic
		robots.ts                 # robots.txt generation
		sitemap.ts                # sitemap.xml generation
		projects/[slug]/page.tsx  # dynamic MDX case-study pages
	components/
		Header.tsx
		Hero.tsx
		Projects.tsx
		Experience.tsx
		About.tsx
		LiveStats.tsx
		Contact.tsx
		ui/
			Animation.tsx
			AsyncState.tsx
	content/projects/           # .mdx case studies
	data/site-content.ts        # primary portfolio content source
	lib/
		case-studies.ts           # MDX loading/frontmatter parsing
		utils.ts                  # cn() helper (clsx + tailwind-merge)
```

---

## Local Development

From repo root:

```bash
npm install
npm run dev
```

Build and run production:

```bash
npm run build
npm run start
```

Lint:

```bash
npm run lint
```

---

## How to Update Content

Most updates should happen in:

- `src/data/site-content.ts`

You can edit:

- `identity` (headline, summary, resume CTA)
- `snapshot` cards
- `experience`
- `projects`
- `contact.socialLinks`

---

## How to Add a New Project (Important)

### 1) Add project entry in `src/data/site-content.ts`

Each project uses:

- `id`
- `title`
- `impact`
- `tags`
- `featured`
- optional `sourceUrl`
- optional `liveUrl`
- optional `caseStudySlug`

If you want a dedicated case study page, set `caseStudySlug`.

### 2) Add case study MDX file (optional but recommended)

Create:

- `src/content/projects/<caseStudySlug>.mdx`

Required frontmatter:

```md
---
title: "Project Title"
summary: "Short summary"
publishedAt: "YYYY-MM-DD"
projectId: "project-id-from-site-content"
tags:
	- "Tag1"
readTime: "5 min read"
---
```

Then add your markdown content below.

### 3) Done

Route is auto-generated at:

- `/projects/<caseStudySlug>`

because `generateStaticParams()` reads all MDX files.

---

## How Social Cards Work (GitHub / Kaggle / LeetCode)

Social URLs are read from:

- `siteContent.contact.socialLinks`

The system extracts usernames from profile URLs, including LeetCode patterns like:

- `https://leetcode.com/u/<username>/`

If a profile is missing, UI falls back gracefully using standardized async/fallback components.

---

## Contact Form Setup

Current Formspree endpoint in `src/components/Contact.tsx`:

- `FORMSPREE_ENDPOINT = "https://formspree.io/f/xaqpzebb"`

To switch forms, replace this endpoint value.

---

## SEO + Metadata

- Main metadata: `src/app/layout.tsx`
- JSON-LD Person schema: `src/app/layout.tsx`
- Sitemap: `src/app/sitemap.ts`
- Robots: `src/app/robots.ts`

---

## Theming Notes

- Theme is persisted via `localStorage` key: `portfolio-theme`
- Theme bootstrap happens in `layout.tsx` to avoid FOUC
- Theme behavior/state sync is managed in `src/app/page.tsx`

---

## Contribution / Maintenance Tips

- Prefer content changes in `site-content.ts` over hardcoding UI text.
- For new dynamic/remote UI blocks, use shared components in `src/components/ui/AsyncState.tsx`.
- Keep animations subtle and keyboard accessibility intact (`:focus-visible`).
- Run `npm run build` before commits to catch type and route issues.
