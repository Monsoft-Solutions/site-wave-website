import { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/config/seo";

// Import Site Wave specific sections
import { SiteWaveHeroSection } from "@/components/sections/site-wave-hero-section";
import { SiteWaveServicesSection } from "@/components/sections/site-wave-services-section";
import { SiteWaveLocationSection } from "@/components/sections/site-wave-location-section";
import { SiteWaveTestimonialsSection } from "@/components/sections/site-wave-testimonials-section";
import { SiteWaveAboutSection } from "@/components/sections/site-wave-about-section";
import { SiteWaveCtaSection } from "@/components/sections/site-wave-cta-section";

export const metadata: Metadata = generateSeoMetadata({
  title: "Site Wave - Digital Services for Southwest Florida Businesses",
  description:
    "Site Wave by Monsoft Solutions provides website development, SEO, digital marketing, and business automation services for small businesses in Cape Coral, Fort Myers, and Naples, FL.",
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
});

export default function SiteWaveHomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section - Eye-catching introduction */}
      <SiteWaveHeroSection />

      {/* Services Section - Core offerings */}
      <SiteWaveServicesSection />

      {/* Location Section - Southwest Florida focus */}
      <SiteWaveLocationSection />

      {/* About Section - Powered by Monsoft Solutions */}
      <SiteWaveAboutSection />

      {/* Testimonials Section - Social proof */}
      <SiteWaveTestimonialsSection />

      {/* CTA Section - Call to action */}
      <SiteWaveCtaSection />
    </div>
  );
}
