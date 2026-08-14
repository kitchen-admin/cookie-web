import { readFileSync } from "node:fs";
import { join } from "node:path";

import matter from "gray-matter";

import { isLegalSlug, type LegalSlug } from "@/config/legal-docs";

export type LegalHeading = {
  id: string;
  title: string;
};

export type LegalDocument = {
  slug: LegalSlug;
  title: string;
  description: string;
  effectiveDate: string;
  notice: string;
  body: string;
  headings: LegalHeading[];
};

/**
 * Turn a section title into a URL fragment, e.g. "Your rights" → "your-rights".
 * Must stay in sync with heading ids in LegalMarkdown.
 */
export function slugifyHeading(title: string): string {
  return title
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Read ## headings from markdown for the contents list. */
export function extractLegalHeadings(markdown: string): LegalHeading[] {
  const headings: LegalHeading[] = [];
  for (const match of markdown.matchAll(/^## (.+)$/gm)) {
    const title = match[1].trim();
    headings.push({ id: slugifyHeading(title), title });
  }
  return headings;
}

/** Show 2026-06-27 as June 27, 2026. Noon UTC avoids timezone day-shifts. */
export function formatEffectiveDate(isoDate: string): string {
  return new Date(`${isoDate}T12:00:00Z`).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function legalFilePath(slug: LegalSlug): string {
  return join(process.cwd(), "content", "legal", `${slug}.md`);
}

/** Load one legal markdown file and its header (title, notice, date). */
export function getLegalDocument(slug: string): LegalDocument | null {
  if (!isLegalSlug(slug)) return null;

  const file = readFileSync(legalFilePath(slug), "utf8");
  const { data, content } = matter(file);
  const title = String(data.title ?? slug);
  const description = String(data.description ?? "");
  const effectiveDate = String(data.effectiveDate ?? "");
  const notice = String(data.notice ?? "");
  const body = content.trim();

  return {
    slug,
    title,
    description,
    effectiveDate,
    notice,
    body,
    headings: extractLegalHeadings(body),
  };
}
