import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      {/* Add new sections here in scroll order; register each id in src/config/sections.ts */}
      <Hero />
      <Features />
    </main>
  );
}
