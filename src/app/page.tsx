import { AboutUs } from "@/components/sections/about-us";
import { Features } from "@/components/sections/features";
import { Hero } from "@/components/sections/hero";

export default function Home() {
  return (
    <main className="mt-0 flex flex-1 flex-col bg-background pt-0">
      {/* Add new sections here in scroll order; register each id in src/config/sections.ts */}
      <Hero />
      <Features />
      <AboutUs />
    </main>
  );
}
