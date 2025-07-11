import { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/config/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { SiteWaveHeroContactSection } from "@/components/sections/contact/site-wave-hero-contact-section";
import { EnhancedContactForm } from "@/components/sections/contact/enhanced-contact-form";
import { SiteWaveContactFaq } from "@/components/sections/contact/site-wave-contact-faq";

export const metadata: Metadata = generateSeoMetadata({
  title: "Contact Site Wave - Free Consultation for Your SWFL Business",
  description:
    "Get a free consultation from Site Wave's Southwest Florida digital experts. We help businesses in Cape Coral, Fort Myers, and Naples grow with custom websites, SEO, and digital marketing.",
  keywords: [
    "contact site wave",
    "free consultation southwest florida",
    "web design cape coral",
    "seo fort myers",
    "digital marketing naples",
    "website development swfl",
    "local business marketing",
    "cape coral web designers",
    "fort myers seo company",
    "naples digital marketing",
  ],
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        type="Organization"
        data={{
          name: "Site Wave",
          description:
            "Site Wave by Monsoft Solutions provides website development, SEO, digital marketing, and business automation services for small businesses in Southwest Florida.",
          url: "https://sitewavefl.com",
          telephone: "+1-239-555-0123",
          email: "hello@sitewavefl.com",
          contactPoint: [
            {
              "@type": "ContactPoint",
              telephone: "+1-239-555-0123",
              contactType: "customer service",
              availableLanguage: ["English"],
              areaServed: [
                "Cape Coral, FL",
                "Fort Myers, FL",
                "Naples, FL",
                "Southwest Florida",
              ],
            },
            {
              "@type": "ContactPoint",
              email: "hello@sitewavefl.com",
              contactType: "sales",
              availableLanguage: ["English"],
              areaServed: "Southwest Florida",
            },
          ],
          address: {
            "@type": "PostalAddress",
            addressLocality: "Cape Coral",
            addressRegion: "FL",
            addressCountry: "US",
          },
          areaServed: [
            {
              "@type": "Place",
              name: "Cape Coral, FL",
            },
            {
              "@type": "Place",
              name: "Fort Myers, FL",
            },
            {
              "@type": "Place",
              name: "Naples, FL",
            },
            {
              "@type": "Place",
              name: "Southwest Florida",
            },
          ],
          serviceArea: {
            "@type": "GeoCircle",
            geoMidpoint: {
              "@type": "GeoCoordinates",
              latitude: 26.5629,
              longitude: -81.9495,
            },
            geoRadius: "50000",
          },
          parentOrganization: {
            "@type": "Organization",
            name: "Monsoft Solutions",
          },
        }}
      />

      <div className="min-h-screen">
        {/* Hero Section with Site Wave Branding and Free Consultation Focus */}
        <SiteWaveHeroContactSection />

        {/* Enhanced Contact Form - Service-focused with Free Consultation */}
        <EnhancedContactForm />

        {/* Site Wave FAQ Section - SWFL Business Focused */}
        <SiteWaveContactFaq />
      </div>
    </>
  );
}
