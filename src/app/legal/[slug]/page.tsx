import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { LegalDocument } from "@/components/legal/legal-document";
import { LEGAL_DOCS } from "@/config/legal-docs";
import { getLegalDocument } from "@/lib/legal";

type LegalSlugPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return LEGAL_DOCS.map((doc) => ({ slug: doc.slug }));
}

export async function generateMetadata({
  params,
}: LegalSlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const document = getLegalDocument(slug);
  if (!document) {
    return { title: "Legal Center" };
  }

  return {
    title: document.title,
    description: document.description,
  };
}

export default async function LegalSlugPage({ params }: LegalSlugPageProps) {
  const { slug } = await params;
  const document = getLegalDocument(slug);
  if (!document) notFound();

  return <LegalDocument document={document} />;
}
