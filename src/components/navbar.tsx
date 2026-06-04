"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Download } from "lucide-react";
import { motion } from "motion/react";

import {
  NAVBAR_CONTENT_FADE_S,
  NAVBAR_PILL_EXPAND_S,
} from "@/config/hero-load-sequence";
import { navButtonGapClassName } from "@/config/layout";
import { NAV_SECTIONS } from "@/config/sections";
import { siteImages } from "@/config/site-images";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [showContent, setShowContent] = useState(false);

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="fixed inset-x-0 top-6 z-50 flex justify-center px-4"
    >
      <motion.nav
        initial={{ width: 60 }}
        animate={{ width: "100%" }}
        transition={{
          duration: NAVBAR_PILL_EXPAND_S,
          ease: [0.22, 1, 0.36, 1],
        }}
        onAnimationComplete={() => setShowContent(true)}
        className={cn(
          "mx-auto flex h-[60px] max-w-[800px] items-center overflow-hidden rounded-full border border-(--primitive-black-8) bg-(--primitive-base-white)/80 px-3 shadow-lg backdrop-blur-md",
          showContent ? "justify-between" : "justify-center"
        )}
      >
        <motion.div
          initial={false}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: NAVBAR_CONTENT_FADE_S, ease: "easeOut" }}
          className={cn(
            "flex w-full items-center justify-between",
            !showContent && "pointer-events-none"
          )}
          aria-hidden={!showContent}
        >
          <Link href="/" className="flex shrink-0 items-center">
            <Image
              src={siteImages.logoLight}
              alt="Cookie"
              width={200}
              height={40}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>

          <div
            className={cn(
              "hidden items-center sm:flex",
              navButtonGapClassName
            )}
          >
            {NAV_SECTIONS.map((section) => (
              <Link
                key={section.id}
                href={`#${section.id}`}
                className="type-body-sm-regular shrink-0 rounded-full px-4 py-2 text-(--text-primary-black) transition-colors hover:bg-(--primitive-black-4)"
              >
                {section.navLabel}
              </Link>
            ))}
            <Link
              href="#download"
              className="type-body-sm-bold flex shrink-0 items-center gap-2 rounded-full bg-(--primitive-black-90) px-4 py-2 text-(--primitive-base-white) transition-opacity hover:opacity-90"
            >
              <Download className="size-[18px]" aria-hidden />
              Download App
            </Link>
          </div>
        </motion.div>
      </motion.nav>
    </motion.header>
  );
}
