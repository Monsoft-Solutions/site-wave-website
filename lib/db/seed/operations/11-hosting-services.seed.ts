import { db } from "../../index";
import { eq, or, inArray } from "drizzle-orm";
import {
  services,
  serviceFeatures,
  serviceBenefits,
  serviceProcessSteps,
  servicePricingTiers,
  servicePricingFeatures,
  serviceTechnologies,
  serviceDeliverables,
  serviceTestimonials,
  serviceFaqs,
  serviceRelated,
} from "../../schema/index";
import type {
  NewServiceFeature,
  NewServiceBenefit,
  NewServiceProcessStep,
  NewServicePricingFeature,
  NewServiceTechnology,
  NewServiceDeliverable,
  NewServiceTestimonial,
  NewServiceFaq,
} from "@/lib/types/service";
import type { SeedOperation } from "../types/seed-config.type";

/**
 * Hosting & Domain Services for Site Wave
 * Reliable, hassle-free hosting solutions for SWFL businesses
 */
const hostingServicesData = [
  {
    id: "21",
    title: "Hosting & Domain Services",
    slug: "hosting-domain-services",
    shortDescription:
      "Reliable web hosting and domain management that keeps your SWFL business online 24/7 without the technical headaches.",
    fullDescription:
      "Keep your website running smoothly with our reliable hosting and domain services designed specifically for Southwest Florida businesses. We handle all the technical details so you can focus on running your business. From domain registration to secure hosting and professional email setup, we make sure your online presence is always available for your customers.",
    features: [
      "Domain name registration and management",
      "Reliable web hosting with 99.9% uptime",
      "SSL certificate installation and renewal",
      "Professional email setup (Google or Zoho)",
      "Website backup and security monitoring",
      "DNS management and configuration",
      "Staging environment for safe updates",
      "24/7 monitoring and support",
    ],
    benefits: [
      "Your website stays online and accessible",
      "Professional email addresses build credibility",
      "Secure hosting protects your business data",
      "Automatic backups prevent data loss",
      "Fast loading speeds improve customer experience",
      "No technical maintenance required",
    ],
    process: [
      {
        step: 1,
        title: "Domain & Hosting Setup",
        description:
          "Help you choose the perfect domain name and set up reliable hosting that meets your SWFL business needs.",
        duration: "1-2 days",
      },
      {
        step: 2,
        title: "Security Configuration",
        description:
          "Install SSL certificates, configure security settings, and set up monitoring to keep your site safe.",
        duration: "1 day",
      },
      {
        step: 3,
        title: "Email Setup",
        description:
          "Create professional email addresses using your domain name and set up email forwarding or full email hosting.",
        duration: "1-2 days",
      },
      {
        step: 4,
        title: "Backup & Monitoring",
        description:
          "Configure automatic backups and monitoring systems to ensure your website stays online and secure.",
        duration: "1 day",
      },
      {
        step: 5,
        title: "Ongoing Maintenance",
        description:
          "Provide ongoing monitoring, updates, and technical support to keep everything running smoothly.",
        duration: "Ongoing",
      },
    ],
    pricing: [
      {
        name: "Basic Hosting",
        price: "$150 - $250/year",
        description: "Essential hosting for small websites",
        features: [
          "Domain registration included",
          "Reliable web hosting",
          "SSL certificate",
          "Basic email setup",
          "Monthly backups",
          "Email support",
        ],
      },
      {
        name: "Professional Hosting",
        price: "$250 - $400/year",
        description: "Enhanced hosting with premium features",
        features: [
          "Domain and premium hosting",
          "Enhanced security features",
          "Professional email hosting",
          "Weekly backups",
          "Performance optimization",
          "Priority support",
        ],
        popular: true,
      },
      {
        name: "Business Hosting Plus",
        price: "$400 - $500/year",
        description: "Premium hosting with maintenance",
        features: [
          "Premium hosting and domain",
          "Advanced security monitoring",
          "Full email hosting suite",
          "Daily backups",
          "Staging environment",
          "Monthly maintenance included",
        ],
      },
    ],
    technologies: [
      "cPanel Hosting",
      "CloudFlare CDN",
      "SSL Certificates",
      "Google Workspace",
      "Zoho Mail",
      "DNS Management",
    ],
    deliverables: [
      "Registered domain name",
      "Configured web hosting",
      "SSL certificate installation",
      "Professional email setup",
      "Backup system configuration",
      "Login credentials and documentation",
    ],
    timeline: "1-3 business days",
    category: "Support" as const,
    featuredImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop&crop=center",
    testimonial: {
      quote:
        "We've had zero downtime since switching to Site Wave's hosting. Our customers can always reach us online, and the professional email addresses have really improved our credibility!",
      author: "Tony Ricci",
      company: "Ricci's Restaurant",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    faq: [
      {
        question: "What's included with hosting and domain services?",
        answer:
          "You get domain registration, reliable web hosting, SSL certificate, professional email setup, regular backups, and ongoing technical support. Everything you need to keep your business online.",
      },
      {
        question: "Can you help transfer my existing domain and website?",
        answer:
          "Absolutely! We can transfer your domain from your current provider and migrate your website to our hosting with minimal downtime.",
      },
      {
        question: "What happens if my website goes down?",
        answer:
          "Our hosting includes 24/7 monitoring, and we're notified immediately if there are any issues. We'll work to resolve problems quickly and keep you informed throughout the process.",
      },
      {
        question: "Do you provide email hosting with custom domain addresses?",
        answer:
          "Yes! We can set up professional email addresses using your domain name (like yourname@yourbusiness.com) through Google Workspace or Zoho Mail.",
      },
    ],
    relatedServices: [
      "custom-website-development",
      "website-redesign-optimization",
      "analytics-reporting-setup",
    ],
  },
];

/**
 * Execute hosting services seeding operation
 */
const execute = async (): Promise<number> => {
  let totalInserted = 0;

  for (const serviceData of hostingServicesData) {
    // Insert the main service record
    const [insertedService] = await db
      .insert(services)
      .values({
        title: serviceData.title,
        slug: serviceData.slug,
        shortDescription: serviceData.shortDescription,
        fullDescription: serviceData.fullDescription,
        timeline: serviceData.timeline,
        category: serviceData.category,
        featuredImage: serviceData.featuredImage,
      })
      .returning();

    totalInserted++;

    // Insert features
    if (serviceData.features.length > 0) {
      const featureValues: NewServiceFeature[] = serviceData.features.map(
        (feature, index) => ({
          serviceId: insertedService.id,
          feature,
          order: index + 1,
        })
      );
      await db.insert(serviceFeatures).values(featureValues);
    }

    // Insert benefits
    if (serviceData.benefits.length > 0) {
      const benefitValues: NewServiceBenefit[] = serviceData.benefits.map(
        (benefit, index) => ({
          serviceId: insertedService.id,
          benefit,
          order: index + 1,
        })
      );
      await db.insert(serviceBenefits).values(benefitValues);
    }

    // Insert process steps
    if (serviceData.process.length > 0) {
      const processValues: NewServiceProcessStep[] = serviceData.process.map(
        (step) => ({
          serviceId: insertedService.id,
          step: step.step,
          title: step.title,
          description: step.description,
          duration: step.duration,
        })
      );
      await db.insert(serviceProcessSteps).values(processValues);
    }

    // Insert pricing tiers and their features
    if (serviceData.pricing.length > 0) {
      for (const [pricingIndex, pricing] of serviceData.pricing.entries()) {
        const [insertedPricingTier] = await db
          .insert(servicePricingTiers)
          .values({
            serviceId: insertedService.id,
            name: pricing.name,
            price: pricing.price,
            description: pricing.description,
            popular: pricing.popular || false,
            order: pricingIndex + 1,
          })
          .returning();

        // Insert pricing tier features
        if (pricing.features.length > 0) {
          const pricingFeatureValues: NewServicePricingFeature[] =
            pricing.features.map((feature, index) => ({
              pricingTierId: insertedPricingTier.id,
              feature,
              order: index + 1,
            }));
          await db.insert(servicePricingFeatures).values(pricingFeatureValues);
        }
      }
    }

    // Insert technologies
    if (serviceData.technologies && serviceData.technologies.length > 0) {
      const technologyValues: NewServiceTechnology[] =
        serviceData.technologies.map((technology, index) => ({
          serviceId: insertedService.id,
          technology,
          order: index + 1,
        }));
      await db.insert(serviceTechnologies).values(technologyValues);
    }

    // Insert deliverables
    if (serviceData.deliverables.length > 0) {
      const deliverableValues: NewServiceDeliverable[] =
        serviceData.deliverables.map((deliverable, index) => ({
          serviceId: insertedService.id,
          deliverable,
          order: index + 1,
        }));
      await db.insert(serviceDeliverables).values(deliverableValues);
    }

    // Note: Hosting services don't include gallery images

    // Insert testimonial
    if (serviceData.testimonial) {
      const testimonialValue: NewServiceTestimonial = {
        serviceId: insertedService.id,
        quote: serviceData.testimonial.quote,
        author: serviceData.testimonial.author,
        company: serviceData.testimonial.company,
        avatar: serviceData.testimonial.avatar,
      };
      await db.insert(serviceTestimonials).values([testimonialValue]);
    }

    // Insert FAQs
    if (serviceData.faq.length > 0) {
      const faqValues: NewServiceFaq[] = serviceData.faq.map((faq, index) => ({
        serviceId: insertedService.id,
        question: faq.question,
        answer: faq.answer,
        order: index + 1,
      }));
      await db.insert(serviceFaqs).values(faqValues);
    }
  }

  return totalInserted;
};

/**
 * Clear hosting services data and all related records
 */
const clear = async (): Promise<void> => {
  // Get all hosting service IDs
  const hostingServices = await db
    .select({ id: services.id })
    .from(services)
    .where(or(...hostingServicesData.map((s) => eq(services.slug, s.slug))));

  const serviceIds = hostingServices.map((s) => s.id);

  if (serviceIds.length > 0) {
    // Delete related data for these services
    await db
      .delete(serviceRelated)
      .where(
        or(
          inArray(serviceRelated.serviceId, serviceIds),
          inArray(serviceRelated.relatedServiceId, serviceIds)
        )
      );

    // Delete pricing features first
    const pricingTiers = await db
      .select({ id: servicePricingTiers.id })
      .from(servicePricingTiers)
      .where(inArray(servicePricingTiers.serviceId, serviceIds));

    const pricingTierIds = pricingTiers.map((t) => t.id);
    if (pricingTierIds.length > 0) {
      await db
        .delete(servicePricingFeatures)
        .where(inArray(servicePricingFeatures.pricingTierId, pricingTierIds));
    }

    // Delete other related data
    await db
      .delete(servicePricingTiers)
      .where(inArray(servicePricingTiers.serviceId, serviceIds));
    await db
      .delete(serviceFaqs)
      .where(inArray(serviceFaqs.serviceId, serviceIds));
    await db
      .delete(serviceTestimonials)
      .where(inArray(serviceTestimonials.serviceId, serviceIds));
    await db
      .delete(serviceDeliverables)
      .where(inArray(serviceDeliverables.serviceId, serviceIds));
    await db
      .delete(serviceTechnologies)
      .where(inArray(serviceTechnologies.serviceId, serviceIds));
    await db
      .delete(serviceProcessSteps)
      .where(inArray(serviceProcessSteps.serviceId, serviceIds));
    await db
      .delete(serviceBenefits)
      .where(inArray(serviceBenefits.serviceId, serviceIds));
    await db
      .delete(serviceFeatures)
      .where(inArray(serviceFeatures.serviceId, serviceIds));

    // Finally delete the services themselves
    await db.delete(services).where(inArray(services.id, serviceIds));
  }
};

/**
 * Hosting services seed operation configuration
 */
export const hostingServicesSeed: SeedOperation = {
  config: {
    name: "hosting-services",
    order: 11,
    description: "Seed Hosting & Domain Services for Site Wave",
  },
  execute,
  clear,
};
