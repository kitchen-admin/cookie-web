"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { AppStoreBadges } from "@/components/app-store-badges";
import { APP_STORE_URL, PLAY_STORE_URL } from "@/config/app-store-links";
import {
  DOWNLOADS_COPY,
  DOWNLOADS_FALLBACK_DELAY_MS,
  DOWNLOADS_REDIRECT_DELAY_MS,
} from "@/config/downloads";
import { siteImages } from "@/config/site-images";

/**
 * Picks the store listing that matches this device.
 * Android → Play Store, iPhone/iPad → App Store, everything else → home.
 * iPads that pretend to be a Mac (iPadOS) still have a touch screen, so
 * we treat “MacIntel + more than one touch point” as iOS too.
 */
function destinationForDevice(): string {
  const userAgent = navigator.userAgent || navigator.vendor || "";

  if (/android/i.test(userAgent)) {
    return PLAY_STORE_URL;
  }

  const isIos =
    /iPad|iPhone|iPod/.test(userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  if (isIos) {
    return APP_STORE_URL;
  }

  return "/";
}

export function DownloadRedirect() {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const redirectTimer = window.setTimeout(() => {
      window.location.replace(destinationForDevice());
    }, DOWNLOADS_REDIRECT_DELAY_MS);

    const fallbackTimer = window.setTimeout(() => {
      setShowFallback(true);
    }, DOWNLOADS_FALLBACK_DELAY_MS);

    return () => {
      window.clearTimeout(redirectTimer);
      window.clearTimeout(fallbackTimer);
    };
  }, []);

  return (
    <main className="flex flex-1 flex-col items-center justify-center bg-linear-to-b from-white to-(--surface-hero-gradient-end) px-6 py-16">
      <div className="flex w-full max-w-md flex-col items-center text-center">
        <h1>
          <Image
            src={siteImages.logoMark}
            alt="Cookie"
            width={188}
            height={40}
            priority
            className="h-10 w-auto object-contain"
          />
        </h1>
        <p className="type-body-xl-regular mt-6 text-(--text-primary-black)">
          {DOWNLOADS_COPY.lead}
        </p>

        <div
          className="mt-8 size-10 animate-spin rounded-full border-4 border-(--primitive-black-8) border-t-(--text-display)"
          aria-hidden
        />

        {showFallback ? (
          <div className="mt-10 flex w-full flex-col items-center gap-4">
            <p className="type-body-md-regular text-(--text-secondary-black)">
              {DOWNLOADS_COPY.fallbackLead}
            </p>
            <AppStoreBadges className="justify-center" />
            <Link
              href="/"
              className="type-body-md-semibold text-(--text-display) underline underline-offset-4"
            >
              {DOWNLOADS_COPY.websiteLabel}
            </Link>
          </div>
        ) : null}
      </div>
    </main>
  );
}
