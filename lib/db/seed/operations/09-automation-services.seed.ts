import { db } from "../../index";
import { or, eq, inArray } from "drizzle-orm";
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
 * Business Automation & Analytics Services for Site Wave
 * Streamlining operations for SWFL businesses
 */
const automationServicesData = [
  {
    id: "11",
    title: "CRM Implementation & Setup",
    slug: "crm-implementation-setup",
    shortDescription:
      "Organize your customer relationships with a CRM system that's perfect for your SWFL business and easy to use.",
    fullDescription:
      "Stop losing track of leads and customers with a Customer Relationship Management (CRM) system designed for your business. We'll help you choose the right CRM, set it up properly, and train your team to use it effectively. From small service businesses to growing companies across Southwest Florida, we make customer management simple and powerful.",
    features: [
      "CRM selection and consultation",
      "Complete system setup and configuration",
      "Custom pipeline and workflow creation",
      "Contact import and data migration",
      "Email template and automation setup",
      "Team user management and permissions",
      "Integration with existing tools",
      "Comprehensive training for your team",
    ],
    benefits: [
      "Never lose track of leads or customers again",
      "Streamlined sales process and follow-ups",
      "Better customer service and communication",
      "Automated reminders and tasks",
      "Detailed sales reporting and insights",
      "Improved team collaboration",
    ],
    process: [
      {
        step: 1,
        title: "Needs Assessment",
        description:
          "We'll discuss your current customer management challenges and business goals to recommend the perfect CRM solution.",
        duration: "1 week",
      },
      {
        step: 2,
        title: "CRM Selection & Setup",
        description:
          "Choose the best CRM for your needs and budget, then set up all the basic configurations and custom fields.",
        duration: "1-2 weeks",
      },
      {
        step: 3,
        title: "Customization & Integration",
        description:
          "Create custom pipelines, set up automations, and integrate with your existing email, website, and other tools.",
        duration: "2-3 weeks",
      },
      {
        step: 4,
        title: "Data Migration",
        description:
          "Import your existing customer data, clean up duplicates, and organize everything properly in your new system.",
        duration: "1 week",
      },
      {
        step: 5,
        title: "Training & Support",
        description:
          "Train your team on the new system and provide 90 days of ongoing support to ensure smooth adoption.",
        duration: "90 days",
      },
    ],
    pricing: [
      {
        name: "Basic CRM Setup",
        price: "$1,200 - $2,500",
        description: "Essential CRM setup for small businesses",
        features: [
          "CRM consultation and selection",
          "Basic setup and configuration",
          "Contact import and organization",
          "Essential automations",
          "Team training (up to 5 users)",
          "30 days support",
        ],
      },
      {
        name: "Professional CRM",
        price: "$2,500 - $4,000",
        description: "Advanced CRM solution for growing businesses",
        features: [
          "Advanced CRM setup and customization",
          "Custom pipelines and workflows",
          "Email marketing integration",
          "Sales reporting dashboard",
          "Team training (up to 15 users)",
          "90 days support",
        ],
        popular: true,
      },
      {
        name: "Enterprise CRM",
        price: "$4,000+",
        description: "Complete CRM solution with integrations",
        features: [
          "Full CRM implementation",
          "Advanced integrations",
          "Custom reporting and analytics",
          "Multi-department setup",
          "Unlimited team training",
          "6 months support",
        ],
      },
    ],
    technologies: [
      "HubSpot",
      "Salesforce",
      "Pipedrive",
      "Monday.com",
      "Airtable",
      "Zoho CRM",
    ],
    deliverables: [
      "Fully configured CRM system",
      "Custom pipelines and workflows",
      "Imported and organized contact data",
      "Team training materials",
      "User guides and documentation",
      "Integration setup with existing tools",
    ],
    timeline: "4-8 weeks",
    category: "Support" as const,
    featuredImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center",
    testimonial: {
      quote:
        "The CRM has transformed how we manage customers! We've increased our follow-up rate by 300% and haven't lost a single lead since implementation. It's been a game-changer for our Fort Myers business.",
      author: "Rachel Martinez",
      company: "Elite Real Estate Group",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    faq: [
      {
        question: "Which CRM is best for my type of business?",
        answer:
          "It depends on your industry, team size, and specific needs. We'll analyze your requirements and recommend the CRM that offers the best value and functionality for your SWFL business.",
      },
      {
        question: "Can you import our existing customer data?",
        answer:
          "Yes! We can import data from spreadsheets, existing CRMs, email lists, and most other formats. We also clean up duplicates and organize the data properly.",
      },
      {
        question: "How long does it take for the team to learn the new system?",
        answer:
          "Most teams are comfortable with basic functions within 1-2 weeks. We provide comprehensive training and ongoing support to ensure everyone feels confident using the system.",
      },
    ],
    relatedServices: [
      "lead-management-automation",
      "analytics-reporting-setup",
      "marketing-automation",
    ],
  },
  {
    id: "12",
    title: "Lead Management Automation",
    slug: "lead-management-automation",
    shortDescription:
      "Automatically capture, organize, and follow up with leads so you never miss a potential customer again.",
    fullDescription:
      "Turn your lead chaos into an organized, automated system that works 24/7. We'll set up systems to capture leads from your website, social media, ads, and other sources, then automatically organize them and trigger follow-up sequences. Perfect for busy Southwest Florida businesses that want to maximize every opportunity without the manual work.",
    features: [
      "Multi-channel lead capture setup",
      "Automated lead scoring and qualification",
      "Instant lead notification systems",
      "Automated follow-up email sequences",
      "Lead tracking and analytics",
      "CRM integration and synchronization",
      "Lead source attribution reporting",
      "Automated task creation and reminders",
    ],
    benefits: [
      "Never miss another lead or opportunity",
      "Instant response to inquiries builds trust",
      "Automated follow-ups increase conversions",
      "Better lead organization and tracking",
      "More time for actual customer service",
      "Detailed insights on lead sources",
    ],
    process: [
      {
        step: 1,
        title: "Lead Source Analysis",
        description:
          "Identify all your current and potential lead sources and analyze how leads currently flow through your business.",
        duration: "1 week",
      },
      {
        step: 2,
        title: "Capture System Setup",
        description:
          "Set up lead capture forms, landing pages, and integrations to automatically collect leads from all sources.",
        duration: "2 weeks",
      },
      {
        step: 3,
        title: "Automation Development",
        description:
          "Create automated workflows for lead qualification, notifications, and follow-up sequences based on your sales process.",
        duration: "2-3 weeks",
      },
      {
        step: 4,
        title: "Testing & Optimization",
        description:
          "Test all automation sequences and optimize them for better performance and conversion rates.",
        duration: "1 week",
      },
      {
        step: 5,
        title: "Training & Monitoring",
        description:
          "Train your team on the new system and monitor performance to ensure everything works smoothly.",
        duration: "2 weeks",
      },
    ],
    pricing: [
      {
        name: "Basic Lead Automation",
        price: "$800 - $1,500",
        description: "Essential lead capture and follow-up automation",
        features: [
          "Lead capture form setup",
          "Basic email automation",
          "CRM integration",
          "Lead notifications",
          "Simple reporting",
          "30 days support",
        ],
      },
      {
        name: "Advanced Lead System",
        price: "$1,500 - $2,500",
        description: "Comprehensive lead management automation",
        features: [
          "Multi-source lead capture",
          "Advanced email sequences",
          "Lead scoring and qualification",
          "Automated task creation",
          "Detailed analytics",
          "90 days support",
        ],
        popular: true,
      },
      {
        name: "Enterprise Lead Solution",
        price: "$2,500+",
        description: "Complete lead automation with integrations",
        features: [
          "Full lead automation suite",
          "Custom integrations",
          "Advanced reporting",
          "Multi-team workflows",
          "Priority support",
          "6 months support",
        ],
      },
    ],
    technologies: [
      "Zapier",
      "HubSpot",
      "Mailchimp",
      "ActiveCampaign",
      "Airtable",
      "Google Forms",
    ],
    deliverables: [
      "Lead capture system setup",
      "Automated follow-up sequences",
      "CRM integration and sync",
      "Lead scoring framework",
      "Analytics and reporting dashboard",
      "Team training and documentation",
    ],
    timeline: "4-6 weeks",
    category: "Support" as const,
    featuredImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center",
    testimonial: {
      quote:
        "Since implementing the lead automation system, we respond to inquiries in under 5 minutes automatically, and our conversion rate has doubled. It's like having a dedicated sales assistant working 24/7!",
      author: "David Chen",
      company: "Coastal Construction Co.",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    faq: [
      {
        question: "What lead sources can you connect to the automation system?",
        answer:
          "We can connect website forms, Facebook leads, Google Ads, phone calls, email inquiries, and virtually any other lead source. Everything gets automatically organized in one place.",
      },
      {
        question: "How quickly do automated follow-ups start?",
        answer:
          "Follow-ups can start immediately—within seconds of receiving a lead. Quick response times significantly improve conversion rates, especially for service-based businesses.",
      },
      {
        question: "Can the system qualify leads automatically?",
        answer:
          "Yes! We can set up lead scoring based on factors like location, budget, urgency, and other criteria specific to your business to prioritize the best opportunities.",
      },
    ],
    relatedServices: [
      "crm-implementation-setup",
      "marketing-automation",
      "analytics-reporting-setup",
    ],
  },
  {
    id: "13",
    title: "Analytics & Reporting Setup",
    slug: "analytics-reporting-setup",
    shortDescription:
      "Get clear insights into your business performance with professional analytics and easy-to-understand reports.",
    fullDescription:
      "Make data-driven decisions with comprehensive analytics that show exactly how your Southwest Florida business is performing. We'll set up tracking for your website, marketing campaigns, and business operations, then create beautiful dashboards that give you the insights you need without the complexity you don't want.",
    features: [
      "Google Analytics 4 setup and configuration",
      "Google Search Console optimization",
      "Custom dashboard creation",
      "Goal and conversion tracking",
      "Marketing campaign analytics",
      "Business performance reports",
      "Automated report generation",
      "Data visualization and insights",
    ],
    benefits: [
      "Clear understanding of what's working",
      "Data-driven business decisions",
      "Track ROI on marketing investments",
      "Identify growth opportunities",
      "Monitor website and campaign performance",
      "Easy-to-understand reports",
    ],
    process: [
      {
        step: 1,
        title: "Analytics Audit",
        description:
          "Review your current analytics setup and identify what data you need to track for better business decisions.",
        duration: "1 week",
      },
      {
        step: 2,
        title: "Tracking Implementation",
        description:
          "Set up proper analytics tracking on your website, forms, and marketing campaigns with accurate goal configuration.",
        duration: "1-2 weeks",
      },
      {
        step: 3,
        title: "Dashboard Creation",
        description:
          "Build custom dashboards that display your most important metrics in an easy-to-understand format.",
        duration: "1-2 weeks",
      },
      {
        step: 4,
        title: "Report Automation",
        description:
          "Set up automated monthly reports and train you on how to interpret the data and use insights for growth.",
        duration: "1 week",
      },
      {
        step: 5,
        title: "Ongoing Optimization",
        description:
          "Monitor data accuracy and optimize tracking to ensure you're getting the most valuable insights for your business.",
        duration: "Monthly",
      },
    ],
    pricing: [
      {
        name: "Basic Analytics",
        price: "$400 - $800",
        description: "Essential website and business tracking",
        features: [
          "Google Analytics 4 setup",
          "Search Console configuration",
          "Basic goal tracking",
          "Monthly report template",
          "Training session",
        ],
      },
      {
        name: "Professional Analytics",
        price: "$800 - $1,500",
        description: "Comprehensive analytics and reporting",
        features: [
          "Advanced tracking setup",
          "Custom dashboard creation",
          "Conversion tracking",
          "Marketing campaign analytics",
          "Automated monthly reports",
          "Quarterly review meetings",
        ],
        popular: true,
      },
      {
        name: "Enterprise Analytics",
        price: "$1,500+",
        description: "Advanced analytics with custom integrations",
        features: [
          "Advanced custom tracking",
          "Multi-platform integrations",
          "Custom report automation",
          "Advanced data visualization",
          "Weekly analytics reviews",
          "Dedicated analytics support",
        ],
      },
    ],
    technologies: [
      "Google Analytics 4",
      "Google Search Console",
      "Google Data Studio",
      "Microsoft Power BI",
      "Airtable",
      "Google Sheets",
    ],
    deliverables: [
      "Configured Google Analytics 4",
      "Search Console optimization",
      "Custom analytics dashboard",
      "Automated report templates",
      "Goal and conversion tracking",
      "Training materials and documentation",
    ],
    timeline: "3-5 weeks",
    category: "Support" as const,
    featuredImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center",
    testimonial: {
      quote:
        "The analytics dashboard has been eye-opening! We discovered that 60% of our best customers come from Google, not Facebook like we thought. This insight helped us reallocate our marketing budget and increase revenue by 25%.",
      author: "Lisa Thompson",
      company: "Sunshine Spa & Wellness",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    faq: [
      {
        question: "What metrics should I be tracking for my business?",
        answer:
          "It depends on your business goals, but typically we track website traffic, lead sources, conversion rates, and ROI on marketing spend. We'll identify the most important metrics for your specific business.",
      },
      {
        question: "How often will I receive reports?",
        answer:
          "We typically set up automated monthly reports, but can customize the frequency based on your needs. You'll also have 24/7 access to your live dashboard for real-time insights.",
      },
      {
        question: "Do I need to be technical to understand the reports?",
        answer:
          "Not at all! We design reports and dashboards to be clear and actionable for business owners. We also provide training to help you understand and use the insights effectively.",
      },
    ],
    relatedServices: [
      "crm-implementation-setup",
      "lead-management-automation",
      "paid-advertising-campaigns",
    ],
  },
  {
    id: "14",
    title: "Marketing Automation",
    slug: "marketing-automation",
    shortDescription:
      "Automate your marketing to nurture leads, retain customers, and grow your SWFL business on autopilot.",
    fullDescription:
      "Create marketing that works while you sleep with automated email sequences, social media posts, and customer communications. We'll set up sophisticated marketing automation that nurtures leads, welcomes new customers, and keeps your business top-of-mind with your Southwest Florida audience—all without you having to remember to send another email.",
    features: [
      "Email marketing automation sequences",
      "Customer onboarding workflows",
      "Lead nurturing campaigns",
      "Social media automation",
      "Customer retention programs",
      "Abandoned cart recovery (for e-commerce)",
      "Birthday and anniversary campaigns",
      "Re-engagement sequences",
    ],
    benefits: [
      "Consistent communication with customers",
      "Higher conversion rates from nurturing",
      "Automated customer retention",
      "Time savings on repetitive tasks",
      "Personalized customer experiences",
      "Increased customer lifetime value",
    ],
    process: [
      {
        step: 1,
        title: "Strategy Development",
        description:
          "Analyze your customer journey and identify opportunities for automation that will improve experience and drive results.",
        duration: "1 week",
      },
      {
        step: 2,
        title: "Content Creation",
        description:
          "Write compelling email sequences, create templates, and develop content that resonates with your SWFL audience.",
        duration: "2-3 weeks",
      },
      {
        step: 3,
        title: "Automation Setup",
        description:
          "Build and configure automated workflows, set up triggers, and integrate with your existing systems.",
        duration: "2-3 weeks",
      },
      {
        step: 4,
        title: "Testing & Launch",
        description:
          "Test all automation sequences to ensure they work properly, then launch and monitor initial performance.",
        duration: "1 week",
      },
      {
        step: 5,
        title: "Optimization",
        description:
          "Monitor performance and continuously optimize sequences for better open rates, click rates, and conversions.",
        duration: "Ongoing",
      },
    ],
    pricing: [
      {
        name: "Starter Automation",
        price: "$1,000 - $2,000",
        description: "Essential marketing automation setup",
        features: [
          "Welcome email sequence",
          "Basic lead nurturing",
          "Customer onboarding automation",
          "Simple social media scheduling",
          "Performance tracking",
          "60 days support",
        ],
      },
      {
        name: "Professional Automation",
        price: "$2,000 - $3,000",
        description: "Comprehensive marketing automation",
        features: [
          "Advanced email sequences",
          "Multi-stage lead nurturing",
          "Customer retention campaigns",
          "Social media automation",
          "A/B testing setup",
          "Quarterly optimization",
        ],
        popular: true,
      },
      {
        name: "Enterprise Automation",
        price: "$3,000+",
        description: "Advanced automation with integrations",
        features: [
          "Complex workflow automation",
          "Advanced personalization",
          "Multi-channel campaigns",
          "Custom integrations",
          "Advanced analytics",
          "Monthly optimization",
        ],
      },
    ],
    technologies: [
      "Mailchimp",
      "ActiveCampaign",
      "HubSpot",
      "Zapier",
      "ConvertKit",
      "Buffer",
    ],
    deliverables: [
      "Automated email sequences",
      "Marketing workflow documentation",
      "Social media automation setup",
      "Customer journey mapping",
      "Performance tracking dashboard",
      "Team training and handoff",
    ],
    timeline: "6-10 weeks",
    category: "Marketing" as const,
    featuredImage:
      "https://images.unsplash.com/photo-1556155092-490a1ba16284?w=800&h=600&fit=crop&crop=center",
    testimonial: {
      quote:
        "The marketing automation has been incredible! Our email sequences convert 25% of leads into customers automatically, and we're saving 15 hours per week on manual follow-ups. It's like having a marketing team that never sleeps.",
      author: "Jennifer Walsh",
      company: "Island Home Inspections",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    faq: [
      {
        question:
          "What types of automated campaigns work best for local businesses?",
        answer:
          "Welcome sequences, appointment reminders, seasonal promotions, and follow-up campaigns work great for SWFL businesses. We'll customize automation based on your specific industry and customer behavior.",
      },
      {
        question: "Can you integrate with my existing email list?",
        answer:
          "Yes! We can import your existing contacts and segment them appropriately for different automation sequences. We also ensure compliance with email marketing regulations.",
      },
      {
        question: "How do you measure the success of marketing automation?",
        answer:
          "We track open rates, click rates, conversion rates, and revenue generated from automated campaigns. You'll get regular reports showing exactly how your automation is performing.",
      },
    ],
    relatedServices: [
      "lead-management-automation",
      "crm-implementation-setup",
      "social-media-setup",
    ],
  },
  {
    id: "15",
    title: "Integration Solutions",
    slug: "integration-solutions",
    shortDescription:
      "Connect your business tools and apps so they work together seamlessly, eliminating double data entry and manual work.",
    fullDescription:
      "Stop wasting time copying information between different apps and systems. We'll connect your website, CRM, email marketing, accounting software, and other business tools so they automatically share information and work together. Perfect for Southwest Florida businesses that want to streamline operations and focus on growing instead of managing technology.",
    features: [
      "System analysis and integration planning",
      "API connections and data synchronization",
      "Workflow automation between platforms",
      "Data mapping and field matching",
      "Error handling and data validation",
      "Real-time and scheduled synchronization",
      "Custom integration development",
      "Testing and ongoing monitoring",
    ],
    benefits: [
      "Eliminate manual data entry",
      "Reduce errors and inconsistencies",
      "Save time on administrative tasks",
      "Real-time data synchronization",
      "Better business process efficiency",
      "Improved team productivity",
    ],
    process: [
      {
        step: 1,
        title: "System Assessment",
        description:
          "Review all your current business tools and identify integration opportunities that will save time and improve efficiency.",
        duration: "1 week",
      },
      {
        step: 2,
        title: "Integration Planning",
        description:
          "Create a detailed plan for connecting your systems, including data flow mapping and technical requirements.",
        duration: "1 week",
      },
      {
        step: 3,
        title: "Development & Configuration",
        description:
          "Build the integrations using APIs, automation tools, or custom solutions based on your specific needs.",
        duration: "2-4 weeks",
      },
      {
        step: 4,
        title: "Testing & Validation",
        description:
          "Thoroughly test all integrations to ensure data flows correctly and all business processes work as expected.",
        duration: "1 week",
      },
      {
        step: 5,
        title: "Deployment & Support",
        description:
          "Deploy the integrations and provide ongoing monitoring and support to ensure everything continues working smoothly.",
        duration: "2 weeks",
      },
    ],
    pricing: [
      {
        name: "Basic Integration",
        price: "$500 - $1,500",
        description: "Simple 2-platform connection",
        features: [
          "Connect 2 business systems",
          "Basic data synchronization",
          "Setup and configuration",
          "Testing and validation",
          "30 days support",
        ],
      },
      {
        name: "Multi-Platform Integration",
        price: "$1,500 - $2,500",
        description: "Connect 3-5 business systems",
        features: [
          "Connect 3-5 platforms",
          "Advanced data mapping",
          "Workflow automation",
          "Error handling",
          "90 days support",
          "Performance monitoring",
        ],
        popular: true,
      },
      {
        name: "Enterprise Integration",
        price: "$2,500+",
        description: "Complex multi-system integration",
        features: [
          "Unlimited platform connections",
          "Custom API development",
          "Advanced workflow automation",
          "Real-time monitoring",
          "Priority support",
          "6 months support",
        ],
      },
    ],
    technologies: [
      "Zapier",
      "Make (Integromat)",
      "Microsoft Power Automate",
      "Custom APIs",
      "Webhooks",
      "Database Connections",
    ],
    deliverables: [
      "Configured system integrations",
      "Data synchronization workflows",
      "Integration documentation",
      "Error monitoring setup",
      "Testing validation reports",
      "Team training materials",
    ],
    timeline: "4-8 weeks",
    category: "Support" as const,
    featuredImage:
      "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=600&fit=crop&crop=center",
    testimonial: {
      quote:
        "The integration between our website, CRM, and QuickBooks has saved us hours every week. New leads automatically go to our CRM, and completed jobs sync to our accounting software. It's like magic!",
      author: "Michael Rodriguez",
      company: "Premier Pool Services",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    faq: [
      {
        question: "What business tools can you integrate?",
        answer:
          "We can integrate most popular business tools including CRMs, email marketing platforms, accounting software, project management tools, e-commerce platforms, and more. If it has an API, we can usually connect it.",
      },
      {
        question:
          "What if one of my tools doesn't have integration capabilities?",
        answer:
          "We can often find creative solutions using automation platforms or custom development. In some cases, we might recommend switching to a more integration-friendly alternative.",
      },
      {
        question: "How do you handle data security during integration?",
        answer:
          "Security is our top priority. We use encrypted connections, secure authentication methods, and follow best practices to ensure your business data remains safe during all integrations.",
      },
    ],
    relatedServices: [
      "crm-implementation-setup",
      "lead-management-automation",
      "analytics-reporting-setup",
    ],
  },
];

/**
 * Execute automation services seeding operation
 */
const execute = async (): Promise<number> => {
  let totalInserted = 0;

  for (const serviceData of automationServicesData) {
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
 * Clear automation services data and all related records
 */
const clear = async (): Promise<void> => {
  // Get all automation service IDs
  const automationServices = await db
    .select({ id: services.id })
    .from(services)
    .where(or(...automationServicesData.map((s) => eq(services.slug, s.slug))));

  const serviceIds = automationServices.map((s) => s.id);

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
      .delete(serviceGalleryImages)
      .where(inArray(serviceGalleryImages.serviceId, serviceIds));
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
 * Automation services seed operation configuration
 */
export const automationServicesSeed: SeedOperation = {
  config: {
    name: "automation-services",
    order: 9,
    description: "Seed Business Automation & Analytics Services for Site Wave",
  },
  execute,
  clear,
};
