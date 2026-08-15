import type { Metadata } from "next";
import { Caveat, Geist_Mono, Instrument_Sans } from "next/font/google";
import localFont from "next/font/local";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Providers } from "@/components/providers";
import { siteImages } from "@/config/site-images";
import "./globals.css";

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const boldnova = localFont({
  src: "../../font/chef-font.otf",
  variable: "--font-boldnova",
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/** Handwritten signature on About us (Figma "Divyanshu, Krishna & Chahat"). */
const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Cookie",
    template: "Cookie: %s",
  },
  description:
    "Cookie turns the ingredients you already have into meals you actually love to eat.",
  icons: {
    icon: [{ url: siteImages.favicon, type: "image/png" }],
    apple: siteImages.favicon,
  },
  // Site-wide social preview card. Pages inherit this unless they set their
  // own `openGraph`/`twitter`, so it also covers About us.
  openGraph: {
    type: "website",
    siteName: "Cookie",
    images: [
      {
        url: siteImages.socialPreview,
        width: 1200,
        height: 640,
        alt: "Cookie — turn what's already in your fridge into meals you'll actually love",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [siteImages.socialPreview],
  },
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
      className={`${instrumentSans.variable} ${boldnova.variable} ${geistMono.variable} ${caveat.variable} h-full antialiased`}
    >
      <body className="m-0 flex min-h-full flex-col bg-background p-0">
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
