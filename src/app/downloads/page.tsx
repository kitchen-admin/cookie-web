import type { Metadata } from "next";

import { DownloadRedirect } from "@/components/sections/download-redirect";

export const metadata: Metadata = {
  title: "Download",
  description: "Download Cookie for iPhone or Android.",
};

export default function DownloadsPage() {
  return <DownloadRedirect />;
}
