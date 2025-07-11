import { JsonLd } from "@/components/seo/JsonLd";
import { getBaseUrl } from "@/lib/utils/url.util";
import { transformServicesWithRelationsToServices } from "@/lib/utils/service-transform.util";
import type { ServiceWithRelations } from "@/lib/types/service-with-relations.type";
import type { ServiceCategory } from "@/lib/types";

// Import Site Wave service components
import { SiteWaveServicesHero } from "@/components/services/site-wave-services-hero";
import { SiteWaveServicesGrid } from "@/components/services/site-wave-services-grid";
import { SiteWaveServicePackages } from "@/components/services/site-wave-service-packages";
import { SiteWaveWhyChooseUs } from "@/components/services/site-wave-why-choose-us";
import { SiteWaveServicesContact } from "@/components/services/site-wave-services-contact";
import { getAllServices, getServicesNames } from "@/lib/api/services.api";
import { getAllServiceCategories } from "@/lib/api/service-categories.api";
import { generateSeoMetadata } from "@/lib/config/seo";

// Force dynamic rendering to ensure revalidation works
export const dynamic = "force-dynamic";

export async function generateMetadata() {
  const servicesNames = await getServicesNames();

  if (!servicesNames.success) {
    return generateSeoMetadata({
      title: "Digital Services for Southwest Florida Businesses | Site Wave",
      description:
        "Professional website development, SEO, digital marketing, and business automation services for small businesses in Cape Coral, Fort Myers, and Naples, FL.",
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
  }

  return generateSeoMetadata({
    title: "Digital Services for Southwest Florida Businesses | Site Wave",
    description:
      "Professional website development, SEO, digital marketing, and business automation services for small businesses in Cape Coral, Fort Myers, and Naples, FL.",
    keywords: [
      ...servicesNames.data,
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
}

export default async function ServicesPage() {
  const baseUrl = getBaseUrl();

  // Initialize with fallback data
  let services: ServiceWithRelations[] = [];
  let categories: ServiceCategory[] = [];
  let error: string | null = null;

  // Fetch services (SSR)
  const servicesResponse = await getAllServices();

  if (servicesResponse.success && servicesResponse.data) {
    services = servicesResponse.data;
  } else {
    error = "Failed to load services";
  }

  // Fetch service categories (SSR)
  const categoriesResponse = await getAllServiceCategories();

  if (categoriesResponse.success && categoriesResponse.data) {
    categories = categoriesResponse.data;
  }

  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Digital Services for Southwest Florida Businesses",
    description:
      "Professional website development, SEO, digital marketing, and business automation services for small businesses in Cape Coral, Fort Myers, and Naples, FL.",
    provider: {
      "@type": "Organization",
      name: "Site Wave by Monsoft Solutions",
      url: baseUrl,
      address: {
        "@type": "PostalAddress",
        addressRegion: "FL",
        addressLocality: "Southwest Florida",
        addressCountry: "US",
      },
    },
    serviceType: services?.map((service) => service.title) || [
      "Website Development",
      "SEO Optimization",
      "Digital Marketing",
      "Business Automation",
      "Brand Design",
    ],
    areaServed: [
      "Cape Coral, FL",
      "Fort Myers, FL",
      "Naples, FL",
      "Southwest Florida",
    ],
  };

  return (
    <>
      <JsonLd type="Organization" data={serviceStructuredData} />

      <div className="min-h-screen">
        {/* Hero Section */}
        <SiteWaveServicesHero />

        {/* Services Grid Section */}
        <SiteWaveServicesGrid
          services={transformServicesWithRelationsToServices(services)}
          categories={categories}
          isLoading={false}
          error={error}
        />

        {/* Service Packages Section */}
        <SiteWaveServicePackages />

        {/* Why Choose Us Section */}
        <SiteWaveWhyChooseUs />

        {/* Contact Section */}
        <SiteWaveServicesContact />
      </div>
    </>
  );
}
