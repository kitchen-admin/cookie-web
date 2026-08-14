/**
 * Hub cards for /legal. Each slug matches a file in content/legal/.
 * Blurbs come from the original Legal Center homepage.
 */
export const LEGAL_DOCS = [
  {
    slug: "privacy",
    title: "Privacy Policy",
    description:
      "How Cookie collects, uses, protects, shares, and deletes information for its AI-powered home cooking companion.",
  },
  {
    slug: "terms",
    title: "Terms & Conditions",
    description:
      "The rules for using Cookie, including accounts, subscriptions, AI limitations, intellectual property, disclaimers, termination, and disputes.",
  },
  {
    slug: "cookies",
    title: "Cookie Policy",
    description:
      "How Cookie uses browser cookies, local storage, analytics technologies, preference storage, session tools, and mobile identifiers.",
  },
  {
    slug: "ai",
    title: "AI Usage & Transparency Policy",
    description:
      "How Cookie uses proprietary and third-party AI systems, what AI can and cannot do, and how Cookie protects privacy in AI requests.",
  },
  {
    slug: "data-deletion",
    title: "Data Deletion Policy",
    description:
      "How Cookie users can delete accounts, profiles, pantry data, AI conversations, preferences, and related personal information.",
  },
  {
    slug: "acceptable-use",
    title: "Acceptable Use Policy",
    description:
      "Rules that protect Cookie users, systems, AI features, recipes, accounts, and community spaces from misuse.",
  },
  {
    slug: "copyright",
    title: "Copyright & DMCA Policy",
    description:
      "How Cookie handles copyright, DMCA notices, counter notices, repeat infringement, recipe ownership, and trademark use.",
  },
  {
    slug: "community",
    title: "Community Guidelines",
    description:
      "Future-ready guidelines for recipe sharing, comments, images, respectful behavior, moderation, and enforcement in Cookie community features.",
  },
] as const;

export type LegalSlug = (typeof LEGAL_DOCS)[number]["slug"];

export const LEGAL_EFFECTIVE_DATE = "2026-06-27";

export function isLegalSlug(value: string): value is LegalSlug {
  return LEGAL_DOCS.some((doc) => doc.slug === value);
}
