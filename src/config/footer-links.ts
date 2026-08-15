import { NAV_ITEMS, type NavHref } from "@/config/sections";

export const FOOTER_HEADING = "STOP SCROLLING,\nSTART COOKING!";

export const FOOTER_COPYRIGHT =
  "© 2026 Cookie Intelligence Pvt. Ltd. All rights reserved.";

export const FOOTER_NAV_LINKS: NavHref[] = [
  ...NAV_ITEMS,
  { label: "Legal", href: "/legal" },
];

export type SocialLink = {
  name: string;
  href: string;
  iconSrc: string;
};

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/heycookieapp/",
    iconSrc: "/social/instagram.svg",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/cookie-kitchen/",
    iconSrc: "/social/linkedin.svg",
  },
  {
    name: "X",
    href: "https://x.com/heycookieapp",
    iconSrc: "/social/x.svg",
  },
];
