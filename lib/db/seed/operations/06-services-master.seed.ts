import { db } from "../../index";
import {
  services,
  serviceFeatures,
  serviceBenefits,
  serviceProcessSteps,
  servicePricingTiers,
  servicePricingFeatures,
  serviceTechnologies,
  serviceDeliverables,
  serviceGalleryImages,
  serviceTestimonials,
  serviceFaqs,
  serviceRelated,
} from "../../schema/index";
import type { SeedOperation } from "../types/seed-config.type";

// Import all category-specific seeders
import { websiteServicesSeed } from "./07-website-services.seed";
import { marketingServicesSeed } from "./08-marketing-services.seed";
import { automationServicesSeed } from "./09-automation-services.seed";
import { designServicesSeed } from "./10-design-services.seed";
import { hostingServicesSeed } from "./11-hosting-services.seed";

/**
 * Service relationships mapping - defined after all services are created
 * Maps service slugs to their related service slugs
 */
const serviceRelationships: Record<string, string[]> = {
  // Website Services
  "custom-website-development": [
    "website-redesign-optimization",
    "local-seo-optimization",
    "e-commerce-solutions",
  ],
  "website-redesign-optimization": [
    "custom-website-development",
    "local-seo-optimization",
    "content-strategy-blog",
  ],
  "e-commerce-solutions": [
    "custom-website-development",
    "paid-advertising-campaigns",
    "social-media-setup",
  ],
  "local-seo-optimization": [
    "custom-website-development",
    "google-business-management",
    "content-strategy-blog",
  ],
  "content-strategy-blog": [
    "local-seo-optimization",
    "social-media-setup",
    "custom-website-development",
  ],

  // Marketing Services
  "google-business-management": [
    "local-seo-optimization",
    "social-media-setup",
    "review-management-system",
  ],
  "social-media-setup": [
    "google-business-management",
    "paid-advertising-campaigns",
    "content-strategy-blog",
  ],
  "paid-advertising-campaigns": [
    "google-business-management",
    "social-media-setup",
    "custom-website-development",
  ],
  "review-management-system": [
    "google-business-management",
    "local-seo-optimization",
    "social-media-setup",
  ],
  "local-directory-optimization": [
    "local-seo-optimization",
    "google-business-management",
    "review-management-system",
  ],

  // Automation Services
  "crm-implementation-setup": [
    "lead-management-automation",
    "analytics-reporting-setup",
    "marketing-automation",
  ],
  "lead-management-automation": [
    "crm-implementation-setup",
    "marketing-automation",
    "analytics-reporting-setup",
  ],
  "analytics-reporting-setup": [
    "crm-implementation-setup",
    "lead-management-automation",
    "paid-advertising-campaigns",
  ],
  "marketing-automation": [
    "lead-management-automation",
    "crm-implementation-setup",
    "social-media-setup",
  ],
  "integration-solutions": [
    "crm-implementation-setup",
    "lead-management-automation",
    "analytics-reporting-setup",
  ],

  // Design Services
  "logo-brand-identity": [
    "custom-website-development",
    "print-design",
    "digital-advertising-graphics",
  ],
  "print-design": [
    "logo-brand-identity",
    "digital-advertising-graphics",
    "custom-signage",
  ],
  "digital-advertising-graphics": [
    "social-media-setup",
    "paid-advertising-campaigns",
    "logo-brand-identity",
  ],
  "custom-signage": [
    "logo-brand-identity",
    "print-design",
    "digital-advertising-graphics",
  ],
  "presentations-document-design": [
    "logo-brand-identity",
    "print-design",
    "digital-advertising-graphics",
  ],

  // Hosting Services
  "hosting-domain-services": [
    "custom-website-development",
    "website-redesign-optimization",
    "analytics-reporting-setup",
  ],
};

/**
 * Execute master services seeding operation
 * This orchestrates all category-specific seeders
 */
const execute = async (): Promise<number> => {
  let totalInserted = 0;

  console.log("🌊 Starting Site Wave services seeding...");

  // Execute all category-specific seeders
  const seeders = [
    websiteServicesSeed,
    marketingServicesSeed,
    automationServicesSeed,
    designServicesSeed,
    hostingServicesSeed,
  ];

  for (const seeder of seeders) {
    console.log(`🔧 Seeding ${seeder.config.description}...`);
    const inserted = await seeder.execute();
    totalInserted += inserted;
    console.log(`✅ Inserted ${inserted} services from ${seeder.config.name}`);
  }

  // Now handle service relationships
  console.log("🔗 Setting up service relationships...");
  await setupServiceRelationships();
  console.log("✅ Service relationships configured");

  console.log(
    `🎉 Site Wave services seeding complete! Total: ${totalInserted} services`
  );
  return totalInserted;
};

/**
 * Set up relationships between services after all services are created
 */
const setupServiceRelationships = async (): Promise<void> => {
  // Get all services to build a slug-to-id mapping
  const allServices = await db
    .select({ id: services.id, slug: services.slug })
    .from(services);
  const serviceMap = new Map(allServices.map((s) => [s.slug, s.id]));

  // Insert service relationships
  for (const [serviceSlug, relatedSlugs] of Object.entries(
    serviceRelationships
  )) {
    const serviceId = serviceMap.get(serviceSlug);
    if (!serviceId) {
      console.warn(`⚠️ Service not found: ${serviceSlug}`);
      continue;
    }

    const relatedServiceIds: string[] = [];
    for (const relatedSlug of relatedSlugs) {
      const relatedServiceId = serviceMap.get(relatedSlug);
      if (relatedServiceId) {
        relatedServiceIds.push(relatedServiceId);
      } else {
        console.warn(
          `⚠️ Related service not found: ${relatedSlug} for ${serviceSlug}`
        );
      }
    }

    if (relatedServiceIds.length > 0) {
      const relationshipValues = relatedServiceIds.map((relatedServiceId) => ({
        serviceId,
        relatedServiceId,
      }));
      await db.insert(serviceRelated).values(relationshipValues);
    }
  }
};

/**
 * Clear all services data and related records
 * This provides a clean slate before seeding
 */
const clear = async (): Promise<void> => {
  console.log("🧹 Clearing all existing services data...");

  // Delete in reverse order of dependencies to avoid foreign key constraints
  await db.delete(serviceRelated);
  console.log("  ✅ Cleared service relationships");

  // Delete pricing features first, then pricing tiers
  await db.delete(servicePricingFeatures);
  console.log("  ✅ Cleared service pricing features");

  await db.delete(servicePricingTiers);
  console.log("  ✅ Cleared service pricing tiers");

  // Delete other related data
  await db.delete(serviceFaqs);
  console.log("  ✅ Cleared service FAQs");

  await db.delete(serviceTestimonials);
  console.log("  ✅ Cleared service testimonials");

  await db.delete(serviceGalleryImages);
  console.log("  ✅ Cleared service gallery images");

  await db.delete(serviceDeliverables);
  console.log("  ✅ Cleared service deliverables");

  await db.delete(serviceTechnologies);
  console.log("  ✅ Cleared service technologies");

  await db.delete(serviceProcessSteps);
  console.log("  ✅ Cleared service process steps");

  await db.delete(serviceBenefits);
  console.log("  ✅ Cleared service benefits");

  await db.delete(serviceFeatures);
  console.log("  ✅ Cleared service features");

  // Finally delete the services themselves
  await db.delete(services);
  console.log("  ✅ Cleared services");

  console.log("🎯 All services data cleared successfully");
};

/**
 * Master services seed operation configuration
 */
export const servicesMasterSeed: SeedOperation = {
  config: {
    name: "services-master",
    order: 6,
    description: "Seed all Site Wave services organized by category",
  },
  execute,
  clear,
};
