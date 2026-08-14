import Link from "next/link";

import { LegalMarkdown } from "@/components/legal/legal-markdown";
import { LegalToc } from "@/components/legal/legal-toc";
import {
  formatEffectiveDate,
  type LegalDocument as LegalDocumentData,
} from "@/lib/legal";
import { cn } from "@/lib/utils";

export function LegalDocument({ document }: { document: LegalDocumentData }) {
  const effectiveLabel = formatEffectiveDate(document.effectiveDate);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-6 pt-32 pb-24 md:px-20">
      <Link
        href="/legal"
        className={cn(
          "type-body-sm-medium underline underline-offset-4",
          "text-text-brand-primary"
        )}
      >
        All legal documents
      </Link>

      <h1 className="type-display-section mt-6 text-(--text-display)">
        {document.title}
      </h1>
      <p className="type-body-sm-regular mt-3 text-(--text-secondary-black)">
        Effective {effectiveLabel}
      </p>

      {document.notice ? (
        <p className="type-body-md-regular mt-6 rounded-2xl bg-(--surface-faq-panel) px-5 py-4 text-(--text-primary-black)">
          {document.notice}
        </p>
      ) : null}

      <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
        {document.headings.length > 0 ? (
          <LegalToc headings={document.headings} />
        ) : null}

        <article className="min-w-0 max-w-180 flex-1">
          <LegalMarkdown markdown={document.body} />
        </article>
      </div>
    </main>
  );
}
