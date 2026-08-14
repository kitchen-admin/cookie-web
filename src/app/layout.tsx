import type { Metadata } from "next";
import { Geist_Mono, Instrument_Sans } from "next/font/google";
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
      className={`${instrumentSans.variable} ${boldnova.variable} ${geistMono.variable} h-full antialiased`}
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
