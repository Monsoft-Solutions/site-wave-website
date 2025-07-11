import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import { getBaseUrl } from "@/lib/utils/url.util";
import type { ServiceWithRelations } from "@/lib/types/service-with-relations.type";

// Import the redesigned service detail components
import { ServiceHeroSection } from "@/components/services/service-detail/service-hero-section";
import { ServiceOverviewSection } from "@/components/services/service-detail/service-overview-section";
import { ServiceProcessSection } from "@/components/services/service-detail/service-process-section";
import { ServicePricingSection } from "@/components/services/service-detail/service-pricing-section";
import { ServiceBenefitsSection } from "@/components/services/service-detail/service-benefits-section";
import { ServiceFaqSection } from "@/components/services/service-detail/service-faq-section";
import { ServiceTestimonialSection } from "@/components/services/service-detail/service-testimonial-section";
import { ServiceCtaSection } from "@/components/services/service-detail/service-cta-section";
import { getServiceBySlug } from "@/lib/api/services.api";
import type { Metadata } from "next";
import { generateSeoMetadata } from "@/lib/config/seo";

// Generate dynamic metadata for the service detail page
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const serviceResult = await getServiceBySlug(slug);

  if (!serviceResult || !serviceResult.data) {
    return {
      title: "Service Not Found - Site Wave",
      description: "The requested service could not be found.",
    };
  }

  const service = serviceResult.data;

  return generateSeoMetadata({
    title: `${service.title} - Site Wave Digital Services`,
    description: service.shortDescription,
    keywords: [
      service.title.toLowerCase(),
      service.category.toLowerCase(),
      "southwest florida",
      "digital services",
      "site wave",
      ...(service.technologies || []),
    ],
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const baseUrl = getBaseUrl();

  let service: ServiceWithRelations | null = null;

  try {
    const serviceResponse = await getServiceBySlug(slug);

    if (!serviceResponse || !serviceResponse.data) {
      notFound();
    }

    service = serviceResponse.data;
  } catch (error) {
    console.error("Error fetching service:", error);
    notFound();
  }

  if (!service) {
    notFound();
  }

  // Generate structured data
  const serviceStructuredData = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.fullDescription,
    category: service.category,
    provider: {
      "@type": "Organization",
      name: "Site Wave by Monsoft Solutions",
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      address: {
        "@type": "PostalAddress",
        addressRegion: "Florida",
        addressLocality: "Southwest Florida",
        addressCountry: "US",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+1-239-XXX-XXXX",
        contactType: "customer service",
        areaServed: "US",
      },
    },
    ...(service.pricing.length > 0 && {
      offers: service.pricing.map((tier) => ({
        "@type": "Offer",
        name: tier.name,
        price: tier.price,
        description: tier.description,
        category: "Service",
        availability: "https://schema.org/InStock",
      })),
    }),
    areaServed: ["Southwest Florida", "Cape Coral", "Fort Myers", "Naples"],
    serviceType: service.category,
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Timeline",
        value: service.timeline,
      },
      {
        "@type": "PropertyValue",
        name: "Technologies",
        value: service.technologies?.join(", ") || "",
      },
    ],
  };

  return (
    <>
      <JsonLd type="Organization" data={serviceStructuredData} />

      <div className="min-h-screen bg-background">
        {/* Hero Section - Main service introduction */}
        <ServiceHeroSection service={service} />

        {/* Overview Section - Features and deliverables combined */}
        <ServiceOverviewSection
          features={service.features}
          deliverables={service.deliverables}
          technologies={service.technologies}
          timeline={service.timeline}
          category={service.category}
        />

        {/* Process Section - How we work */}
        {service.process.length > 0 && (
          <ServiceProcessSection process={service.process} />
        )}

        {/* Benefits Section - Why choose us for this service */}
        {service.benefits.length > 0 && (
          <ServiceBenefitsSection benefits={service.benefits} />
        )}

        {/* Pricing Section - Investment and packages */}
        {service.pricing.length > 0 && (
          <ServicePricingSection
            pricing={service.pricing}
            serviceTitle={service.title}
          />
        )}

        {/* Testimonial Section - Social proof */}
        {service.testimonials && service.testimonials.length > 0 && (
          <ServiceTestimonialSection testimonials={service.testimonials} />
        )}

        {/* FAQ Section - Common questions */}
        {service.faq.length > 0 && <ServiceFaqSection faq={service.faq} />}

        {/* CTA Section - Strong call to action */}
        <ServiceCtaSection
          serviceTitle={service.title}
          category={service.category}
          shortDescription={service.shortDescription}
        />
      </div>
    </>
  );
}
