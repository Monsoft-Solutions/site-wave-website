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
 * Digital Marketing & Local Visibility Services for Site Wave
 * Helping SWFL businesses get found and attract more customers
 */
const marketingServicesData = [
  {
    id: "6",
    title: "Google Business Profile Management",
    slug: "google-business-management",
    shortDescription:
      "Get found on Google Maps and local search with a fully optimized Google Business Profile that attracts SWFL customers.",
    fullDescription:
      "Your Google Business Profile is often the first thing potential customers see when searching for local businesses. We'll optimize your profile to stand out in Cape Coral, Fort Myers, Naples, and surrounding areas. From compelling descriptions to regular posts and review management, we'll help you dominate local search results and turn online visibility into real customers.",
    features: [
      "Complete profile setup and verification",
      "Keyword-optimized business description",
      "Professional photos and virtual tours",
      "Regular Google posts and updates",
      "Review response management",
      "Q&A monitoring and responses",
      "Performance insights and reporting",
      "Local SEO optimization",
    ],
    benefits: [
      "Higher visibility in Google Maps",
      "More clicks and calls from local searches",
      "Professional online appearance",
      "Better customer trust and credibility",
      "Improved local search rankings",
      "Direct communication with customers",
    ],
    process: [
      {
        step: 1,
        title: "Profile Audit & Verification",
        description:
          "We'll review your current Google Business Profile, claim or verify ownership, and identify optimization opportunities.",
        duration: "1 week",
      },
      {
        step: 2,
        title: "Complete Optimization",
        description:
          "Optimize all profile sections with compelling descriptions, accurate information, and local keywords that SWFL customers search for.",
        duration: "1 week",
      },
      {
        step: 3,
        title: "Photo & Content Setup",
        description:
          "Add professional photos, create regular posting schedule, and set up review management systems.",
        duration: "1 week",
      },
      {
        step: 4,
        title: "Ongoing Management",
        description:
          "Regular posts, review responses, Q&A management, and performance monitoring to maintain and improve your presence.",
        duration: "Monthly",
      },
    ],
    pricing: [
      {
        name: "One-Time Setup",
        price: "$300 - $600",
        description: "Complete profile optimization and setup",
        features: [
          "Profile verification and optimization",
          "Professional description writing",
          "Photo optimization",
          "Initial post creation",
          "Review response templates",
        ],
      },
      {
        name: "Monthly Management",
        price: "$200 - $400/month",
        description: "Ongoing profile management and optimization",
        features: [
          "4 Google posts per month",
          "Review monitoring and responses",
          "Q&A management",
          "Photo updates",
          "Monthly performance reports",
          "Local SEO improvements",
        ],
        popular: true,
      },
      {
        name: "Premium Management",
        price: "$400 - $500/month",
        description: "Advanced management with extra features",
        features: [
          "8 Google posts per month",
          "Advanced review strategy",
          "Competitor monitoring",
          "Video content creation",
          "Weekly performance reports",
          "Priority support",
        ],
      },
    ],
    technologies: [
      "Google Business Profile",
      "Google Analytics",
      "Review Management Tools",
      "Social Media Scheduling",
      "Photo Editing Software",
      "Local SEO Tools",
    ],
    deliverables: [
      "Fully optimized Google Business Profile",
      "Professional business photos",
      "Review management system",
      "Monthly posting schedule",
      "Performance tracking setup",
      "Review response templates",
    ],
    timeline: "Ongoing monthly service",
    category: "Marketing" as const,
    featuredImage:
      "https://images.unsplash.com/photo-1553895501-af9e282e7fc1?w=800&h=600&fit=crop&crop=center",
    testimonial: {
      quote:
        "Since Site Wave optimized our Google Business Profile, we're getting 3x more calls from Google Maps. We're now the top result for 'landscaping Naples' and our calendar is booked solid!",
      author: "Carlos Mendez",
      company: "Paradise Landscaping",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    faq: [
      {
        question:
          "How long does it take to see results from Google Business Profile optimization?",
        answer:
          "You'll often see immediate improvements in visibility within 1-2 weeks. Full optimization benefits typically show within 30-60 days as Google recognizes your improved profile quality.",
      },
      {
        question: "Do you help get more positive reviews?",
        answer:
          "Yes! We create review request strategies and help you respond professionally to all reviews. More positive reviews lead to better local rankings and customer trust.",
      },
      {
        question: "What if I don't have professional photos of my business?",
        answer:
          "We can help coordinate professional photography or work with the photos you have. Good photos are crucial for a strong Google Business Profile, so we'll make sure yours look great.",
      },
    ],
    relatedServices: [
      "local-seo-optimization",
      "social-media-setup",
      "review-management-system",
    ],
  },
  {
    id: "7",
    title: "Social Media Setup & Content",
    slug: "social-media-setup",
    shortDescription:
      "Professional social media presence that connects with your SWFL community and turns followers into customers.",
    fullDescription:
      "Build a strong social media presence that reflects your business personality and connects with Southwest Florida customers. We'll set up and optimize your profiles across the platforms that matter most to your business, create engaging content that showcases your work, and help you build genuine relationships with your local community.",
    features: [
      "Professional profile setup and optimization",
      "Custom bio and business description writing",
      "Branded cover photos and profile images",
      "Content calendar and posting strategy",
      "Local hashtag research and strategy",
      "Engaging post creation (graphics and captions)",
      "Community engagement guidelines",
      "Social media analytics setup",
    ],
    benefits: [
      "Professional, consistent brand presence",
      "Increased local brand awareness",
      "Direct engagement with potential customers",
      "Showcase your work and personality",
      "Drive traffic to your website",
      "Build trust and credibility in SWFL",
    ],
    process: [
      {
        step: 1,
        title: "Platform Strategy",
        description:
          "Determine which social media platforms make the most sense for your business and SWFL audience.",
        duration: "1 week",
      },
      {
        step: 2,
        title: "Profile Setup & Optimization",
        description:
          "Create or optimize your profiles with professional branding, compelling descriptions, and proper contact information.",
        duration: "1 week",
      },
      {
        step: 3,
        title: "Content Strategy Development",
        description:
          "Plan content themes, posting schedule, and local hashtag strategy that resonates with Southwest Florida audiences.",
        duration: "1 week",
      },
      {
        step: 4,
        title: "Content Creation",
        description:
          "Create engaging posts with graphics, photos, and captions that showcase your business and connect with your community.",
        duration: "Ongoing",
      },
    ],
    pricing: [
      {
        name: "Social Media Setup",
        price: "$200 - $600",
        description: "One-time setup and optimization",
        features: [
          "Setup on 2 platforms",
          "Profile optimization",
          "Branded graphics creation",
          "Bio and description writing",
          "Initial content calendar",
        ],
      },
      {
        name: "Content Package - Basic",
        price: "$400 - $700/month",
        description: "10 posts per month across platforms",
        features: [
          "10 custom posts per month",
          "Professional graphics",
          "Caption writing",
          "Local hashtag research",
          "Basic engagement monitoring",
        ],
      },
      {
        name: "Content Package - Premium",
        price: "$700 - $1,200/month",
        description: "30 posts per month with extra features",
        features: [
          "30 custom posts per month",
          "Video content creation",
          "Stories and reels",
          "Community management",
          "Monthly analytics reports",
          "Social media advertising setup",
        ],
        popular: true,
      },
    ],
    technologies: [
      "Facebook Business Manager",
      "Instagram Creator Studio",
      "Canva Pro",
      "Hootsuite",
      "Buffer",
      "Social Media Analytics",
    ],
    deliverables: [
      "Optimized social media profiles",
      "Branded graphics and templates",
      "Content calendar",
      "Post graphics and captions",
      "Hashtag strategy",
      "Analytics and reporting setup",
    ],
    timeline: "1-2 weeks setup, ongoing content",
    category: "Marketing" as const,
    featuredImage:
      "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=800&h=600&fit=crop&crop=center",
    testimonial: {
      quote:
        "Our social media went from embarrassing to amazing! The professional posts and local content have brought us so many new customers. We love seeing our work showcased beautifully.",
      author: "Jessica Torres",
      company: "Coastal Cleaning Services",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    faq: [
      {
        question: "Which social media platforms should my business be on?",
        answer:
          "It depends on your business type and customers. Most SWFL businesses benefit from Facebook and Instagram, while some also need LinkedIn or TikTok. We'll recommend the best platforms for your specific business.",
      },
      {
        question: "Do you create the graphics and captions for posts?",
        answer:
          "Yes! We create custom graphics, write engaging captions, and research the best hashtags for your local market. Everything is brand-consistent and professionally designed.",
      },
      {
        question: "Can I review posts before they go live?",
        answer:
          "Absolutely! We send all content for your approval before posting. You can request changes or provide input on any post to ensure it matches your voice and brand.",
      },
    ],
    relatedServices: [
      "google-business-management",
      "paid-advertising-campaigns",
      "content-strategy-blog",
    ],
  },
  {
    id: "8",
    title: "Paid Advertising Campaigns",
    slug: "paid-advertising-campaigns",
    shortDescription:
      "Targeted Facebook and Google ads that generate qualified leads and customers for your SWFL business.",
    fullDescription:
      "Stop waiting for customers to find you—reach them directly with strategic advertising campaigns. We create and manage targeted ads on Google and Facebook that put your business in front of ready-to-buy customers in Southwest Florida. From lead generation to sales promotion, we'll design campaigns that deliver real results for your budget.",
    features: [
      "Target audience research and setup",
      "Compelling ad copy and creative design",
      "Landing page creation and optimization",
      "Conversion tracking and analytics",
      "Bid management and budget optimization",
      "A/B testing for better performance",
      "Local geographic targeting for SWFL",
      "Monthly performance reporting",
    ],
    benefits: [
      "Immediate visibility and traffic",
      "Highly targeted local customers",
      "Measurable return on investment",
      "Quick lead generation",
      "Competitive advantage in your market",
      "Scalable advertising that grows with you",
    ],
    process: [
      {
        step: 1,
        title: "Campaign Strategy",
        description:
          "Define your goals, target audience, and campaign structure based on your business objectives and SWFL market.",
        duration: "1 week",
      },
      {
        step: 2,
        title: "Creative Development",
        description:
          "Create compelling ad copy, graphics, and landing pages that convert browsers into customers.",
        duration: "1-2 weeks",
      },
      {
        step: 3,
        title: "Campaign Launch",
        description:
          "Set up tracking, launch campaigns, and begin monitoring performance to ensure optimal results from day one.",
        duration: "1 week",
      },
      {
        step: 4,
        title: "Optimization & Management",
        description:
          "Continuously monitor, test, and optimize campaigns to improve performance and reduce costs.",
        duration: "Ongoing",
      },
    ],
    pricing: [
      {
        name: "Google Ads Setup",
        price: "$500 - $1,500",
        description: "Campaign setup and initial optimization",
        features: [
          "Campaign strategy development",
          "Keyword research",
          "Ad copy creation",
          "Landing page setup",
          "Conversion tracking",
          "Initial optimization",
        ],
      },
      {
        name: "Google Ads Management",
        price: "15-20% of ad spend (min $800/month)",
        description: "Ongoing campaign management and optimization",
        features: [
          "Monthly campaign optimization",
          "Bid management",
          "New ad creation",
          "Performance reporting",
          "Landing page updates",
          "Conversion rate optimization",
        ],
        popular: true,
      },
      {
        name: "Facebook Ads Management",
        price: "15-20% of ad spend (min $600/month)",
        description: "Social media advertising management",
        features: [
          "Audience targeting",
          "Creative development",
          "Campaign optimization",
          "A/B testing",
          "Performance reporting",
          "Retargeting campaigns",
        ],
      },
    ],
    technologies: [
      "Google Ads",
      "Facebook Ads Manager",
      "Google Analytics",
      "Facebook Pixel",
      "Landing Page Builders",
      "Conversion Tracking",
    ],
    deliverables: [
      "Complete campaign setup",
      "Ad creatives and copy",
      "Targeted audience segments",
      "Landing pages (if needed)",
      "Conversion tracking setup",
      "Monthly performance reports",
    ],
    timeline: "2-3 weeks setup, ongoing management",
    category: "Marketing" as const,
    featuredImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center",
    testimonial: {
      quote:
        "Our Google Ads campaign has been incredible! We're getting 5-10 qualified leads per day and our cost per lead keeps getting better. The ROI has been fantastic.",
      author: "Robert Kim",
      company: "SWFL Solar Solutions",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    faq: [
      {
        question: "What's the minimum ad budget I need to get started?",
        answer:
          "For Google Ads, we recommend at least $1,000/month in ad spend, and for Facebook Ads, $800/month. This gives us enough data to optimize effectively and generate meaningful results.",
      },
      {
        question: "How quickly will I see results from paid advertising?",
        answer:
          "You'll start seeing traffic and leads almost immediately after launch. However, it typically takes 2-4 weeks to fully optimize campaigns for the best performance and cost efficiency.",
      },
      {
        question: "Do you create landing pages for the ads?",
        answer:
          "Yes! We can create custom landing pages optimized for conversions, or we can send traffic to specific pages on your existing website. Landing pages usually improve conversion rates significantly.",
      },
    ],
    relatedServices: [
      "google-business-management",
      "social-media-setup",
      "custom-website-development",
    ],
  },
  {
    id: "9",
    title: "Review Management System",
    slug: "review-management-system",
    shortDescription:
      "Automate review requests and manage your online reputation to build trust with SWFL customers.",
    fullDescription:
      "Online reviews can make or break a local business in Southwest Florida. We'll set up automated systems to request reviews from happy customers and help you respond professionally to all feedback. Build a stellar online reputation that attracts new customers and sets you apart from competitors in your area.",
    features: [
      "Automated review request campaigns",
      "Multi-platform review monitoring",
      "Professional response templates",
      "Review dashboard and analytics",
      "Negative review management strategy",
      "Google and Facebook review optimization",
      "Email and SMS review requests",
      "Reputation monitoring alerts",
    ],
    benefits: [
      "More positive reviews from satisfied customers",
      "Better search rankings from review signals",
      "Professional responses to all feedback",
      "Improved online reputation and credibility",
      "Automated system saves time and effort",
      "Competitive advantage in local search",
    ],
    process: [
      {
        step: 1,
        title: "Current Review Audit",
        description:
          "Analyze your existing online reviews across all platforms to understand your current reputation status.",
        duration: "1 week",
      },
      {
        step: 2,
        title: "System Setup",
        description:
          "Set up automated review request systems and monitoring across Google, Facebook, and other relevant platforms.",
        duration: "1-2 weeks",
      },
      {
        step: 3,
        title: "Response Strategy",
        description:
          "Create professional response templates and train you on best practices for handling all types of reviews.",
        duration: "1 week",
      },
      {
        step: 4,
        title: "Ongoing Management",
        description:
          "Monitor new reviews, send automated requests, and provide ongoing reputation management support.",
        duration: "Monthly",
      },
    ],
    pricing: [
      {
        name: "Review System Setup",
        price: "$400 - $800",
        description: "One-time setup of review management system",
        features: [
          "Review audit and strategy",
          "Automated request system setup",
          "Response templates creation",
          "Platform monitoring setup",
          "Training and documentation",
        ],
      },
      {
        name: "Monthly Management",
        price: "$200 - $400/month",
        description: "Ongoing review management and monitoring",
        features: [
          "Review monitoring and alerts",
          "Professional response writing",
          "Monthly review request campaigns",
          "Reputation analytics reporting",
          "Strategy adjustments",
        ],
        popular: true,
      },
      {
        name: "Premium Management",
        price: "$400 - $500/month",
        description: "Advanced reputation management",
        features: [
          "Advanced review analytics",
          "Competitor review monitoring",
          "Crisis management support",
          "Video review requests",
          "Weekly reporting",
          "Priority response times",
        ],
      },
    ],
    technologies: [
      "Review Management Software",
      "Google Business Profile API",
      "Facebook Reviews",
      "Email Marketing Platforms",
      "SMS Automation",
      "Analytics Dashboards",
    ],
    deliverables: [
      "Automated review request system",
      "Professional response templates",
      "Review monitoring dashboard",
      "Monthly reputation reports",
      "Review strategy documentation",
      "Training materials",
    ],
    timeline: "2-3 weeks setup, ongoing monthly service",
    category: "Marketing" as const,
    featuredImage:
      "https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=800&h=600&fit=crop&crop=center",
    testimonial: {
      quote:
        "The review system has been a game-changer! We went from 12 reviews to over 100 in six months. Our online reputation is now our biggest competitive advantage.",
      author: "Amanda White",
      company: "Pristine Pool Care",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    faq: [
      {
        question: "How do you get customers to leave more reviews?",
        answer:
          "We set up automated email and SMS campaigns that request reviews at the perfect moment—right after a positive customer experience. The timing and messaging make a huge difference in response rates.",
      },
      {
        question: "What do you do about negative reviews?",
        answer:
          "We help you respond professionally and quickly to negative reviews, often turning unhappy customers into satisfied ones. We also provide strategies to minimize negative reviews through better customer service.",
      },
      {
        question: "Which review platforms do you monitor?",
        answer:
          "We monitor Google, Facebook, Yelp, and other industry-specific review sites relevant to your business. The focus is usually on Google and Facebook since those impact local search the most.",
      },
    ],
    relatedServices: [
      "google-business-management",
      "local-seo-optimization",
      "social-media-setup",
    ],
  },
  {
    id: "10",
    title: "Local Directory Optimization",
    slug: "local-directory-optimization",
    shortDescription:
      "Get your business listed accurately across 50+ online directories to improve local search visibility.",
    fullDescription:
      "Ensure your Southwest Florida business is found everywhere customers look online. We'll submit and optimize your business information across major local directories, review sites, and industry-specific platforms. Consistent, accurate listings boost your local SEO and make it easy for SWFL customers to find and contact you.",
    features: [
      "50+ directory submissions and optimization",
      "NAP (Name, Address, Phone) consistency audit",
      "Category and keyword optimization",
      "Business description writing",
      "Photo uploads and optimization",
      "Duplicate listing cleanup",
      "Monthly monitoring and updates",
      "Citation tracking and reporting",
    ],
    benefits: [
      "Improved local search engine rankings",
      "Better online visibility and discoverability",
      "Consistent business information everywhere",
      "More potential customer touchpoints",
      "Enhanced local SEO authority",
      "Professional online presence",
    ],
    process: [
      {
        step: 1,
        title: "Directory Audit",
        description:
          "Analyze your current directory presence and identify inconsistencies or missing listings that need attention.",
        duration: "1 week",
      },
      {
        step: 2,
        title: "Information Optimization",
        description:
          "Prepare optimized business descriptions, select proper categories, and ensure all information is consistent and compelling.",
        duration: "1 week",
      },
      {
        step: 3,
        title: "Directory Submissions",
        description:
          "Submit your business to 50+ relevant directories with optimized information and professional presentation.",
        duration: "2-3 weeks",
      },
      {
        step: 4,
        title: "Monitoring & Maintenance",
        description:
          "Monitor listings for accuracy, handle any issues, and provide monthly updates on your directory presence.",
        duration: "Monthly",
      },
    ],
    pricing: [
      {
        name: "Directory Setup",
        price: "$400 - $800",
        description: "One-time directory optimization and submission",
        features: [
          "50+ directory submissions",
          "Business information optimization",
          "Duplicate listing cleanup",
          "Category optimization",
          "Initial citation report",
        ],
      },
      {
        name: "Monthly Monitoring",
        price: "$100 - $200/month",
        description: "Ongoing directory monitoring and updates",
        features: [
          "Monthly listing monitoring",
          "Information updates as needed",
          "New directory opportunities",
          "Citation tracking reports",
          "Issue resolution",
        ],
        popular: true,
      },
    ],
    technologies: [
      "Local Directory Platforms",
      "Citation Tracking Tools",
      "Business Listing Management",
      "SEO Monitoring Tools",
      "Local Search Analytics",
      "Data Management Systems",
    ],
    deliverables: [
      "50+ directory submissions",
      "Optimized business listings",
      "Citation tracking spreadsheet",
      "Monthly monitoring reports",
      "Duplicate listing cleanup",
      "Directory optimization strategy",
    ],
    timeline: "3-4 weeks setup, ongoing monthly monitoring",
    category: "Marketing" as const,
    featuredImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center",
    testimonial: {
      quote:
        "Having our business information consistent across all directories has made a huge difference. We're showing up in more local searches and getting found by customers we never would have reached before.",
      author: "Steven Garcia",
      company: "Garcia Home Repairs",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    faq: [
      {
        question: "Why do I need to be listed in so many directories?",
        answer:
          "Different customers use different platforms to find businesses. Being listed everywhere ensures you don't miss potential customers, and consistent listings boost your local SEO rankings.",
      },
      {
        question: "How long does it take for directory listings to show up?",
        answer:
          "Most directories approve listings within 1-4 weeks. Some may take longer, and we monitor the process to ensure everything is properly submitted and approved.",
      },
      {
        question: "What happens if my business information changes?",
        answer:
          "With our monthly monitoring service, we'll update your information across all directories whenever you have changes to your address, phone number, hours, or other details.",
      },
    ],
    relatedServices: [
      "local-seo-optimization",
      "google-business-management",
      "review-management-system",
    ],
  },
];

/**
 * Execute marketing services seeding operation
 */
const execute = async (): Promise<number> => {
  let totalInserted = 0;

  for (const serviceData of marketingServicesData) {
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
 * Clear marketing services data and all related records
 */
const clear = async (): Promise<void> => {
  // Get all marketing service IDs
  const marketingServices = await db
    .select({ id: services.id })
    .from(services)
    .where(or(...marketingServicesData.map((s) => eq(services.slug, s.slug))));

  const serviceIds = marketingServices.map((s) => s.id);

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
 * Marketing services seed operation configuration
 */
export const marketingServicesSeed: SeedOperation = {
  config: {
    name: "marketing-services",
    order: 8,
    description:
      "Seed Digital Marketing & Local Visibility Services for Site Wave",
  },
  execute,
  clear,
};
