"use client";

import { motion } from "motion/react";

import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex max-w-2xl flex-col items-center gap-6 text-center"
      >
        <AnimatedShinyText className="text-sm font-medium uppercase tracking-widest">
          Fresh from the oven
        </AnimatedShinyText>

        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Welcome to Cookie Kitchen
        </h1>

        <p className="max-w-md text-lg text-muted-foreground">
          A simple foundation for your bakery website. We will add more
          sections, pages, and design details in the next step.
        </p>
      </motion.div>
    </main>
  );
}
