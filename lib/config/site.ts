import { clientEnv } from "../env-client";
import type { SiteConfigData } from "../types/site-config.type";

/**
 * Synchronous site config for server-side compatibility and fallback
 * For client-side usage, use the useSiteConfig hook instead
 * For server-side dynamic config, use getSiteConfigFromDB from site-config.util.ts
 */
export const siteConfig = {
  name: "Site Wave",
  description:
    "Site Wave by Monsoft Solutions provides website development, SEO, digital marketing, and business automation services for small businesses in Cape Coral, Fort Myers, Naples, and Southwest Florida.",
  url: clientEnv.NEXT_PUBLIC_SITE_URL,
  ogImage: "/og-image.jpg",
  links: {
    twitter: "https://twitter.com/sitewavefl",
    github: "https://github.com/monsoft-solutions",
    linkedin: "https://linkedin.com/company/monsoft-solutions",
    facebook: "https://facebook.com/sitewavefl",
    instagram: "https://instagram.com/sitewavefl",
  },
  creator: {
    name: "Site Wave by Monsoft Solutions",
    email: "hello@sitewavefl.com",
    phone: "(305) 797-4357",
    twitter: "@sitewavefl",
    url: "https://sitewavefl.com",
  },
  keywords: [
    "website development southwest florida",
    "SEO Cape Coral",
    "digital marketing Fort Myers",
    "web design Naples FL",
    "local business marketing SWFL",
    "Google Business Profile setup",
    "website redesign Florida",
    "CRM automation",
    "social media management",
    "local SEO services",
  ],
  language: "en",
  locale: "en_US",
  theme: {
    primaryColor: "#0077B6", // Ocean Blue
    secondaryColor: "#FF6B35", // Coral Orange
  },
  socialMedia: {
    twitter: {
      card: "summary_large_image",
      site: "@sitewavefl",
      creator: "@sitewavefl",
    },
  },
  metadata: {
    metadataBase: new URL(clientEnv.NEXT_PUBLIC_SITE_URL),
    generator: "Next.js",
    applicationName: "Site Wave - Digital Services for Southwest Florida",
    referrer: "origin-when-cross-origin",
    authors: [
      { name: "Site Wave by Monsoft Solutions", url: "https://sitewavefl.com" },
    ],
    colorScheme: "light dark",
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "#0077B6" },
      { media: "(prefers-color-scheme: dark)", color: "#023047" },
    ],
    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 5,
      userScalable: true,
    },
    verification: {
      google: clientEnv.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      yandex: clientEnv.NEXT_PUBLIC_YANDEX_VERIFICATION,
      bing: clientEnv.NEXT_PUBLIC_BING_VERIFICATION,
    },
  },
} as const;

export type SiteConfig = SiteConfigData & {
  url: string;
  metadata: SiteConfigData["metadata"] & {
    metadataBase: URL;
  };
};
