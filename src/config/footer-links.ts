import { NAV_ITEMS, type NavHref } from "@/config/sections";

export const FOOTER_HEADING = "STOP SCROLLING,\nSTART COOKING!";

export const FOOTER_COPYRIGHT =
  "© 2026 Cookie Intelligence Pvt. Ltd. All rights reserved.";

export const FOOTER_NAV_LINKS: NavHref[] = [
  ...NAV_ITEMS,
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export type SocialLink = {
  name: string;
  href: string;
  iconSrc: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "Instagram",
    href: "https://instagram.com",
    iconSrc: "/social/instagram.svg",
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    iconSrc: "/social/linkedin.svg",
  },
  {
    name: "X",
    href: "https://x.com",
    iconSrc: "/social/x.svg",
  },
];
