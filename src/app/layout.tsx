import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist_Mono } from "next/font/google";

import { Navbar } from "@/components/navbar";
import { Providers } from "@/components/providers";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cookie — Know what to cook",
  description:
    "Home food should feel exciting, not repetitive, stressful, or boring. What if your kitchen knew what to cook?",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bricolage.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="m-0 flex min-h-full flex-col bg-background p-0">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
