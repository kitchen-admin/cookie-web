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
    "Cookie turns the ingredients you already have into meals you actually love to eat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background">
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
