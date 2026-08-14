import type { Metadata } from "next";
import Link from "next/link";

import { LEGAL_DOCS, LEGAL_EFFECTIVE_DATE } from "@/config/legal-docs";
import { formatEffectiveDate } from "@/lib/legal";

export const metadata: Metadata = {
  title: "Legal Center",
  description:
    "Privacy Policy, Terms & Conditions, and other Cookie legal documents.",
};

export default function LegalCenterPage() {
  const effectiveLabel = formatEffectiveDate(LEGAL_EFFECTIVE_DATE);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 pt-32 pb-24 md:px-20">
      <h1 className="type-display-section text-(--text-display)">
        Legal Center
      </h1>
      <p className="type-body-sm-regular mt-3 text-(--text-secondary-black)">
        Effective {effectiveLabel}
      </p>

      <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {LEGAL_DOCS.map((doc) => (
          <li key={doc.slug}>
            <Link
              href={`/legal/${doc.slug}`}
              className="flex h-full flex-col rounded-2xl bg-(--surface-faq-panel) p-6 transition-opacity hover:opacity-90"
            >
              <h2 className="type-display-xs-semibold text-(--text-display)">
                {doc.title}
              </h2>
              <p className="type-body-md-regular mt-2 text-(--text-primary-black)">
                {doc.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
