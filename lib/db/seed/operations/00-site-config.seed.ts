import { db } from "../../index";
import { siteConfigs } from "../../schema/index";
import type { NewSiteConfig } from "@/lib/types/site-config.type";
import type { SeedOperation } from "../types/seed-config.type";

/**
 * Site configuration data for Site Wave by Monsoft Solutions
 */
const siteConfigData: NewSiteConfig = {
  name: "Site Wave",
  description:
    "Site Wave provides high-quality digital services for small businesses and entrepreneurs in Cape Coral, Fort Myers, Naples, and across Southwest Florida. We help local businesses grow through smart, scalable technology including website development, SEO, digital marketing, and business automation.",
  ogImage: "/og-image.jpg",
  links: {
    twitter: "https://twitter.com/sitewavefl",
    github: "https://github.com/monsoft-solutions",
    linkedin: "https://linkedin.com/company/monsoft-solutions",
    facebook: "https://www.facebook.com/sitewave.swfl",
    instagram: "https://instagram.com/sitewave.fl",
  },
  creator: {
    name: "Site Wave",
    email: "contact@sitewavefl.com",
    twitter: "@sitewavefl",
    url: "https://www.sitewavefl.com",
  },
  keywords: [
    "website development",
    "website design",
    "website maintenance",
    "website hosting",
    "website management",
    "website support",
    "website development",
    "website design",
    "SEO",
    "digital marketing",
    "Southwest Florida",
    "SWFL",
    "Cape Coral",
    "Fort Myers",
    "Naples",
    "small business",
    "automation",
    "local business",
    "web design",
    "google business profile",
    "social media",
    "CRM",
    "analytics",
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
    generator: "Next.js",
    applicationName: "Site Wave - Digital Services for SWFL",
    referrer: "origin-when-cross-origin",
    authors: [{ name: "Site Wave", url: "https://www.sitewavefl.com" }],
    colorScheme: "light dark",
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "#F4F1DE" }, // Soft Sand
      { media: "(prefers-color-scheme: dark)", color: "#023047" }, // Deep Navy
    ],
    viewport: {
      width: "device-width",
      initialScale: 1,
      maximumScale: 5,
      userScalable: true,
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
      bing: process.env.NEXT_PUBLIC_BING_VERIFICATION,
    },
  },
  isActive: true,
};

/**
 * Execute site configuration seeding operation
 */
const execute = async (): Promise<number> => {
  // Check if site config already exists
  const existingConfig = await db.select().from(siteConfigs).limit(1);

  if (existingConfig.length === 0) {
    const insertedConfig = await db
      .insert(siteConfigs)
      .values(siteConfigData)
      .returning();

    return insertedConfig.length;
  }

  // Return 0 if already exists to avoid duplicates
  return 0;
};

/**
 * Clear site configuration data
 */
const clear = async (): Promise<void> => {
  await db.delete(siteConfigs);
};

/**
 * Site configuration seed operation
 */
export const siteConfigSeed: SeedOperation = {
  config: {
    name: "site-config",
    order: 0,
    description: "Seed site configuration data",
  },
  execute,
  clear,
};
