// app/layout.tsx — the HTML shell for the entire site.
// This is the equivalent of the <head> + <body> in the old index.html.
// next/font loads Bricolage Grotesque — faster than a <link> tag.

import type { Metadata } from "next";
import { Bricolage_Grotesque } from "next/font/google";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";
import "./globals.css";

// Load the font with the same weights used in the design
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-sans", // maps to the @theme token in globals.css
  display: "swap",
});

// SEO metadata — replaces the <meta> tags in the old index.html
export const metadata: Metadata = {
  title: "Cookie Kitchen",
  description:
    "Cookie Kitchen — Your intelligent health companion. Personalized meal plans, smart pantry management, and activity tracking built around your real life. Join the waitlist.",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${bricolage.variable} font-sans text-base font-normal text-text-primary bg-white antialiased overflow-x-hidden leading-normal`}
      >
        {/* Page-level blur — fixed to viewport top and bottom edges on every page */}
        <ProgressiveBlur position="top" height="80px" className="fixed z-9999" />
        <ProgressiveBlur position="bottom" height="80px" className="fixed z-9999" />
        {children}
      </body>
    </html>
  );
}
