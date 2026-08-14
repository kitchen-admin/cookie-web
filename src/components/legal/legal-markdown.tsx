import type { ReactNode } from "react";
import Link from "next/link";
import type { Components } from "react-markdown";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { slugifyHeading } from "@/lib/legal";

function nodeText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(nodeText).join("");
  if (typeof node === "object" && "props" in node) {
    return nodeText(
      (node as { props?: { children?: ReactNode } }).props?.children
    );
  }
  return "";
}

const markdownComponents: Components = {
  h2: ({ children }) => {
    const title = nodeText(children);
    return (
      <h2
        id={slugifyHeading(title)}
        className="type-display-xs-semibold mt-10 scroll-mt-8 text-(--text-display) first:mt-0"
      >
        {children}
      </h2>
    );
  },
  h3: ({ children }) => (
    <h3 className="type-body-lg-semibold mt-6 text-(--text-display)">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="type-body-md-regular mt-4 text-(--text-primary-black)">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="type-body-md-regular mt-4 list-disc space-y-2 pl-6 text-(--text-primary-black)">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="type-body-md-regular mt-4 list-decimal space-y-2 pl-6 text-(--text-primary-black)">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,
  a: ({ href, children }) => {
    const className =
      "font-medium text-text-brand-primary underline underline-offset-4";
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className={className}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  },
  strong: ({ children }) => (
    <strong className="font-semibold text-(--text-primary-black)">
      {children}
    </strong>
  ),
  table: ({ children }) => (
    <div className="mt-4 overflow-x-auto">
      <table className="w-full min-w-140 border-collapse text-left">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="border-b border-border">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="type-body-sm-semibold px-3 py-2.5 text-(--text-display)">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="type-body-sm-regular border-b border-border px-3 py-2.5 align-top text-(--text-primary-black)">
      {children}
    </td>
  ),
  pre: ({ children }) => (
    <pre className="type-body-sm-regular mt-4 overflow-x-auto rounded-2xl bg-muted p-4 font-mono text-(--text-primary-black)">
      {children}
    </pre>
  ),
  code: ({ children }) => (
    <code className="font-mono text-[0.9em]">{children}</code>
  ),
};

export function LegalMarkdown({ markdown }: { markdown: string }) {
  return (
    <div className="[&_p_code]:rounded [&_p_code]:bg-muted [&_p_code]:px-1 [&_p_code]:py-0.5">
      <Markdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {markdown}
      </Markdown>
    </div>
  );
}
