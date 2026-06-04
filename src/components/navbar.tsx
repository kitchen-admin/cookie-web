"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import { ShimmerButton } from "@/components/ui/shimmer-button";

// Simple list of links shown in the top bar.
const navLinks = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md"
    >
      <nav className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
        {/* Brand name with Magic UI shiny text effect */}
        <Link href="/" className="flex items-center gap-2">
          <AnimatedShinyText className="text-lg font-semibold text-foreground">
            Cookie Kitchen
          </AnimatedShinyText>
        </Link>

        {/* Main navigation links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link, index) => (
            <motion.li
              key={link.label}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05, duration: 0.4 }}
            >
              <Link
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </motion.li>
          ))}
        </ul>

        {/* Call-to-action button with Magic UI shimmer effect */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <ShimmerButton className="px-4 py-2 text-sm shadow-md">
            Order Now
          </ShimmerButton>
        </motion.div>
      </nav>
    </motion.header>
  );
}
