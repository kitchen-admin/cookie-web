"use client";

import { useEffect, useRef, useState } from "react";

import type { LegalHeading } from "@/lib/legal";
import { cn } from "@/lib/utils";

/** How far from the top of the window a heading counts as "current". */
const ACTIVE_HEADING_OFFSET_PX = 120;
/** Ignore scroll updates while the page is jumping to a clicked section. */
const CLICK_LOCK_MS = 700;

type LegalTocProps = {
  headings: LegalHeading[];
};

/**
 * Contents list for a legal page.
 * Clicking a row highlights it. After the jump, scrolling updates the
 * highlight to the section near the top of the screen.
 */
export function LegalToc({ headings }: LegalTocProps) {
  const [activeId, setActiveId] = useState(headings[0]?.id ?? "");
  const clickLockRef = useRef(false);

  useEffect(() => {
    function headingIdNearTop(): string {
      let currentId = headings[0]?.id ?? "";
      for (const heading of headings) {
        const element = document.getElementById(heading.id);
        if (!element) continue;
        if (element.getBoundingClientRect().top <= ACTIVE_HEADING_OFFSET_PX) {
          currentId = heading.id;
        }
      }
      return currentId;
    }

    function syncActiveFromScroll() {
      if (clickLockRef.current) return;
      const nextId = headingIdNearTop();
      if (nextId) setActiveId(nextId);
    }

    const hashId = window.location.hash.replace("#", "");
    if (hashId && headings.some((heading) => heading.id === hashId)) {
      setActiveId(hashId);
    } else {
      syncActiveFromScroll();
    }

    window.addEventListener("scroll", syncActiveFromScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", syncActiveFromScroll);
    };
  }, [headings]);

  function selectHeading(id: string) {
    setActiveId(id);
    clickLockRef.current = true;
    window.setTimeout(() => {
      clickLockRef.current = false;
    }, CLICK_LOCK_MS);
  }

  return (
    <aside className="lg:sticky lg:top-10 lg:w-56 lg:shrink-0">
      <h2 className="type-body-sm-semibold text-(--text-display)">Contents</h2>
      <ol className="mt-3 flex flex-col gap-2">
        {headings.map((heading, index) => {
          const isActive = heading.id === activeId;
          return (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                aria-current={isActive ? "location" : undefined}
                onClick={() => selectHeading(heading.id)}
                className={cn(
                  "block border-l-2 py-0.5 pl-2.5 -ml-2.5",
                  isActive
                    ? "type-body-sm-semibold border-text-brand-primary text-text-brand-primary"
                    : "type-body-sm-regular border-transparent text-(--text-secondary-black) hover:text-text-brand-primary"
                )}
              >
                {index + 1}. {heading.title}
              </a>
            </li>
          );
        })}
      </ol>
    </aside>
  );
}
