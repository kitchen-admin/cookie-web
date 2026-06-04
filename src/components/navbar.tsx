"use client";

import Link from "next/link";
import { Download } from "lucide-react";
import { motion } from "motion/react";

import { NAV_SECTIONS } from "@/config/sections";

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-4 z-50 px-4"
    >
      <nav className="mx-auto flex h-[60px] max-w-[800px] items-center justify-between rounded-full border border-(--primitive-black-8) bg-(--primitive-brand-25)/80 px-3 shadow-lg backdrop-blur-md">
        <Link href="/" className="flex items-center gap-3 pl-2">
          <span
            className="size-[26px] shrink-0 rounded-full bg-(--primitive-brand-500)"
            aria-hidden
          />
          <span className="type-body-md-bold text-(--text-primary-black)">
            Cookie
          </span>
        </Link>

        <ul className="hidden items-center gap-4 sm:flex">
          {NAV_SECTIONS.map((section, index) => (
            <motion.li
              key={section.id}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
            >
              <Link
                href={`#${section.id}`}
                className="type-body-sm-regular rounded-full px-4 py-2 text-(--text-primary-black) transition-colors hover:bg-(--primitive-black-4)"
              >
                {section.navLabel}
              </Link>
            </motion.li>
          ))}
          <motion.li
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            <Link
              href="#download"
              className="type-body-sm-bold flex items-center gap-2 rounded-full bg-(--primitive-black-90) px-4 py-2 text-(--primitive-base-white) transition-opacity hover:opacity-90"
            >
              <Download className="size-[18px]" aria-hidden />
              Download App
            </Link>
          </motion.li>
        </ul>
      </nav>
    </motion.header>
  );
}
