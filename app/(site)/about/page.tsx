"use client";

import { JsonLd } from "@/components/seo/JsonLd";

// Import Site Wave About page sections
import { AboutHeroSection } from "@/components/about/about-hero-section";
import { AboutMissionSection } from "@/components/about/about-mission-section";
import { AboutValuesSection } from "@/components/about/about-values-section";
import { AboutStatsSection } from "@/components/about/about-stats-section";
import { AboutTeamSection } from "@/components/about/about-team-section";
import { AboutCtaSection } from "@/components/about/about-cta-section";

export default function AboutPage() {
  return (
    <>
      <JsonLd
        type="Organization"
        data={{
          name: "Site Wave",
          description:
            "Digital services for small businesses and entrepreneurs in Southwest Florida. Website development, SEO, digital marketing, and automation solutions.",
          url: "https://sitewavefl.com",
          logo: "https://sitewavefl.com/logo.png",
          foundingDate: "2024",
          numberOfEmployees: "10-25",
          location: {
            "@type": "Place",
            name: "Cape Coral, FL",
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
          sameAs: [
            "https://facebook.com/sitewaveswfl",
            "https://instagram.com/sitewaveswfl",
          ],
        }}
      />

      <main className="relative overflow-hidden">
        {/* Hero Section */}
        <AboutHeroSection />

        {/* Mission & Services */}
        <AboutMissionSection />

        {/* Our Values & Approach */}
        <AboutValuesSection />

        {/* Success Stats */}
        <AboutStatsSection />

        {/* Local Team */}
        <AboutTeamSection />

        {/* Contact CTA */}
        <AboutCtaSection />
      </main>
    </>
  );
}
