import { db } from "../../index";
import { inArray, or, eq } from "drizzle-orm";
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
  NewServiceGalleryImage,
  NewServiceTestimonial,
  NewServiceFaq,
} from "@/lib/types/service";
import type { SeedOperation } from "../types/seed-config.type";

/**
 * Website & Digital Presence Services for Site Wave
 * Friendly, professional services for SWFL local businesses
 */
const websiteServicesData = [
  {
    id: "1",
    title: "Custom Website Development",
    slug: "custom-website-development",
    shortDescription:
      "Beautiful, mobile-friendly websites that help your SWFL business shine online and attract more local customers.",
    fullDescription:
      "Your website is often the first impression customers have of your business. We create stunning, mobile-responsive websites that reflect your brand and connect with Southwest Florida customers. From Cape Coral to Naples, we understand what local businesses need to succeed online. Every site includes modern design, fast loading speeds, and easy content management—no tech experience required!",
    features: [
      "Mobile-responsive design that looks great on all devices",
      "Content Management System for easy updates",
      "Basic SEO optimization to get found on Google",
      "Contact forms and lead capture functionality",
      "SSL certificate and security setup",
      "Cross-browser compatibility testing",
      "Local business optimization",
      "Social media integration",
    ],
    benefits: [
      "Professional online presence that builds trust",
      "Attract more local customers from search engines",
      "Mobile-friendly design for on-the-go customers",
      "Easy to update without technical knowledge",
      "Secure and reliable hosting included",
      "Stand out from competitors with custom design",
    ],
    process: [
      {
        step: 1,
        title: "Discovery & Planning",
        description:
          "We'll chat about your business goals, target customers, and what makes you special in Southwest Florida. No tech jargon—just a friendly conversation about your vision.",
        duration: "1 week",
      },
      {
        step: 2,
        title: "Design & Mockups",
        description:
          "Our design team creates beautiful mockups that capture your brand's personality and appeal to SWFL customers. You'll see exactly how your site will look before we build it.",
        duration: "1-2 weeks",
      },
      {
        step: 3,
        title: "Development & Building",
        description:
          "We bring your design to life with clean, fast-loading code. Your site will work perfectly on phones, tablets, and computers.",
        duration: "2-4 weeks",
      },
      {
        step: 4,
        title: "Review & Launch",
        description:
          "You'll get to review everything and request changes. Once you're thrilled with the results, we'll launch your site and make sure everything runs smoothly.",
        duration: "1 week",
      },
      {
        step: 5,
        title: "Support & Training",
        description:
          "We'll teach you how to update your content and provide 30 days of support to answer any questions. You're never left in the dark!",
        duration: "30 days",
      },
    ],
    pricing: [
      {
        name: "Starter Website",
        price: "$500 - $2,000",
        description: "Perfect for new businesses getting started online",
        features: [
          "Up to 5 pages",
          "Mobile-responsive design",
          "Basic SEO setup",
          "Contact form",
          "Social media links",
          "30 days support",
        ],
      },
      {
        name: "Professional Website",
        price: "$2,000 - $5,000",
        description: "Ideal for established local businesses",
        features: [
          "Up to 15 pages",
          "Custom design and branding",
          "Advanced SEO optimization",
          "Photo gallery",
          "Google Maps integration",
          "Blog setup",
          "90 days support",
        ],
        popular: true,
      },
      {
        name: "Premium Website",
        price: "$5,000 - $8,000",
        description: "For businesses ready to dominate their market",
        features: [
          "Unlimited pages",
          "Advanced functionality",
          "Lead capture systems",
          "Analytics setup",
          "Speed optimization",
          "Priority support",
          "6 months support",
        ],
      },
    ],
    technologies: [
      "WordPress",
      "React",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Bootstrap",
    ],
    deliverables: [
      "Fully responsive website",
      "Content management training",
      "SEO-optimized pages",
      "Contact forms setup",
      "Google Analytics integration",
      "Hosting and domain setup (optional)",
    ],
    timeline: "3-6 weeks",
    category: "Development" as const,
    featuredImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center",
    gallery: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=600&fit=crop&crop=center",
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&h=600&fit=crop&crop=center",
    ],
    testimonial: {
      quote:
        "Site Wave transformed our online presence! We went from invisible to getting calls daily from new customers in Fort Myers. The team made everything so easy to understand.",
      author: "Maria Gonzalez",
      company: "Sunshine Landscaping",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    faq: [
      {
        question: "Do I need to know anything technical to manage my website?",
        answer:
          "Not at all! We use user-friendly systems and provide training so you can easily update text, photos, and contact information. If you can use Facebook, you can manage your website.",
      },
      {
        question: "Will my website work on mobile phones?",
        answer:
          "Absolutely! Every website we build is mobile-responsive, meaning it automatically adjusts to look perfect on phones, tablets, and computers. This is crucial since most SWFL customers browse on their phones.",
      },
      {
        question: "What if I need changes after my website is launched?",
        answer:
          "We include support time with every project, and we're always here to help. Minor updates are usually quick and affordable. We want your website to grow with your business!",
      },
      {
        question: "Do you help with hosting and domain names?",
        answer:
          "Yes! We can handle all the technical setup including hosting, domain registration, and email setup. Or if you prefer to use your existing hosting, that works too.",
      },
    ],
    relatedServices: [
      "website-redesign-optimization",
      "local-seo-optimization",
      "e-commerce-solutions",
    ],
  },
  {
    id: "2",
    title: "Website Redesign & Optimization",
    slug: "website-redesign-optimization",
    shortDescription:
      "Breathe new life into your existing website with a modern makeover that converts visitors into customers.",
    fullDescription:
      "Is your website feeling outdated or not bringing in the customers you need? We specialize in transforming existing websites into modern, high-performing customer magnets. Whether your site is slow, not mobile-friendly, or just doesn't reflect your business anymore, we'll give it a complete makeover that works for today's Southwest Florida market.",
    features: [
      "Complete design overhaul with modern aesthetics",
      "Mobile responsiveness improvements",
      "Page speed optimization",
      "SEO enhancements and content restructuring",
      "User experience improvements",
      "New features and functionality",
      "301 redirects to preserve search rankings",
      "Content migration and organization",
    ],
    benefits: [
      "Professional appearance that builds credibility",
      "Better search engine rankings",
      "Improved user experience and conversions",
      "Faster loading times",
      "Mobile-friendly for smartphone users",
      "Modern functionality that competitors lack",
    ],
    process: [
      {
        step: 1,
        title: "Website Audit & Analysis",
        description:
          "We'll analyze your current website's performance, identify what's working, what's not, and create a roadmap for improvement.",
        duration: "1 week",
      },
      {
        step: 2,
        title: "Strategy & Planning",
        description:
          "Based on the audit, we'll plan the redesign to improve user experience, search rankings, and conversion rates.",
        duration: "1 week",
      },
      {
        step: 3,
        title: "Design & Development",
        description:
          "We'll redesign and rebuild your website with modern best practices while preserving what's already working well.",
        duration: "3-4 weeks",
      },
      {
        step: 4,
        title: "Content Migration",
        description:
          "We'll carefully move your existing content, set up proper redirects, and ensure nothing important is lost in the transition.",
        duration: "1 week",
      },
      {
        step: 5,
        title: "Launch & Optimization",
        description:
          "After launch, we'll monitor performance and make adjustments to ensure your redesigned site performs even better than expected.",
        duration: "2 weeks",
      },
    ],
    pricing: [
      {
        name: "Refresh",
        price: "$1,500 - $3,000",
        description: "Quick updates to modernize your existing site",
        features: [
          "Design refresh",
          "Mobile optimization",
          "Speed improvements",
          "Basic SEO updates",
          "Content reorganization",
          "30 days support",
        ],
      },
      {
        name: "Complete Redesign",
        price: "$3,000 - $6,000",
        description: "Full website transformation",
        features: [
          "Complete design overhaul",
          "UX improvements",
          "New functionality",
          "Advanced SEO optimization",
          "Content migration",
          "Analytics setup",
          "90 days support",
        ],
        popular: true,
      },
    ],
    technologies: [
      "WordPress",
      "React",
      "HTML5",
      "CSS3",
      "JavaScript",
      "PageSpeed Tools",
    ],
    deliverables: [
      "Redesigned website",
      "Performance optimization",
      "SEO improvements",
      "Content migration",
      "301 redirect setup",
      "Updated analytics tracking",
    ],
    timeline: "2-5 weeks",
    category: "Development" as const,
    featuredImage:
      "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop&crop=center",
    testimonial: {
      quote:
        "Our website went from embarrassing to amazing! The redesign doubled our online inquiries and we finally look as professional as we are. Best investment we've made!",
      author: "Tom Bradley",
      company: "Bradley Air Conditioning",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    faq: [
      {
        question: "Will I lose my search engine rankings during a redesign?",
        answer:
          "We take special care to preserve your SEO value by setting up proper redirects and maintaining your site structure. In most cases, rankings improve after our optimization work.",
      },
      {
        question: "How long will my website be down during the redesign?",
        answer:
          "We build your new site separately, so your current site stays live throughout the process. There's typically only a few minutes of downtime when we switch over to the new site.",
      },
      {
        question: "Can you work with my existing content?",
        answer:
          "Absolutely! We'll review your existing content and help you decide what to keep, update, or replace. We can also help write new content if needed.",
      },
    ],
    relatedServices: [
      "custom-website-development",
      "local-seo-optimization",
      "content-strategy-blog",
    ],
  },
  {
    id: "3",
    title: "E-commerce Solutions",
    slug: "e-commerce-solutions",
    shortDescription:
      "Start selling online with a beautiful, easy-to-manage store that works for retail, services, and appointments.",
    fullDescription:
      "Ready to sell your products or services online? We create user-friendly e-commerce websites that make it easy for Southwest Florida customers to find and buy from you. Whether you're selling physical products, booking services, or taking appointments, we'll set up everything you need to start generating revenue online.",
    features: [
      "Product catalog with photos and descriptions",
      "Secure payment processing (credit cards, PayPal)",
      "Inventory management system",
      "Shipping calculations and tax setup",
      "Mobile-optimized checkout process",
      "Order management dashboard",
      "Customer account creation",
      "Email notifications for orders",
    ],
    benefits: [
      "24/7 sales even when you're not working",
      "Reach customers beyond your local area",
      "Professional online store appearance",
      "Secure payment processing builds trust",
      "Easy inventory and order management",
      "Integration with accounting software",
    ],
    process: [
      {
        step: 1,
        title: "Store Planning",
        description:
          "We'll discuss your products, pricing, shipping needs, and payment preferences to plan the perfect online store for your business.",
        duration: "1 week",
      },
      {
        step: 2,
        title: "Design & Setup",
        description:
          "Create an attractive store design and set up your product categories, payment systems, and shipping options.",
        duration: "2-3 weeks",
      },
      {
        step: 3,
        title: "Product Upload",
        description:
          "We'll help you add your products with compelling descriptions and photos that sell. You can also learn to add products yourself.",
        duration: "1-2 weeks",
      },
      {
        step: 4,
        title: "Testing & Training",
        description:
          "We'll test all purchasing processes and train you on managing orders, inventory, and customer communications.",
        duration: "1 week",
      },
      {
        step: 5,
        title: "Launch & Support",
        description:
          "Launch your store and provide ongoing support to ensure smooth operations and help you grow your online sales.",
        duration: "Ongoing",
      },
    ],
    pricing: [
      {
        name: "Basic Store",
        price: "$3,500 - $6,000",
        description: "Perfect for small product catalogs",
        features: [
          "Up to 50 products",
          "Basic e-commerce functionality",
          "Payment processing setup",
          "Mobile-responsive design",
          "Basic reporting",
          "60 days support",
        ],
      },
      {
        name: "Professional Store",
        price: "$6,000 - $10,000",
        description: "Full-featured online store",
        features: [
          "Up to 500 products",
          "Advanced inventory management",
          "Customer accounts and wishlists",
          "Email marketing integration",
          "Advanced analytics",
          "Product reviews system",
          "90 days support",
        ],
        popular: true,
      },
      {
        name: "Enterprise Store",
        price: "$10,000 - $12,000",
        description: "Large stores with advanced features",
        features: [
          "Unlimited products",
          "Multi-location inventory",
          "Advanced reporting",
          "Custom integrations",
          "Marketing automation",
          "Priority support",
          "6 months support",
        ],
      },
    ],
    technologies: [
      "Shopify",
      "WooCommerce",
      "Stripe",
      "PayPal",
      "QuickBooks",
      "Mailchimp",
    ],
    deliverables: [
      "Complete e-commerce website",
      "Payment processing setup",
      "Inventory management system",
      "Order management training",
      "Customer support templates",
      "Analytics and reporting setup",
    ],
    timeline: "4-8 weeks",
    category: "Development" as const,
    featuredImage:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop&crop=center",
    testimonial: {
      quote:
        "Our online store has been a game-changer! We're now selling to customers all over Florida, not just locally. The setup was so much easier than we expected.",
      author: "Jennifer Walsh",
      company: "Coastal Crafts & Gifts",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    faq: [
      {
        question: "What payment methods can customers use?",
        answer:
          "We set up secure payment processing for all major credit cards, PayPal, and other popular payment methods. Your customers will have flexible options to pay however they prefer.",
      },
      {
        question: "How do I manage inventory and orders?",
        answer:
          "Your online store includes an easy-to-use dashboard where you can track inventory, process orders, and communicate with customers. We'll train you on everything during setup.",
      },
      {
        question: "Can I sell services or appointments, not just products?",
        answer:
          "Absolutely! We can set up booking systems for services, consultations, or any appointment-based business. Perfect for salons, contractors, consultants, and more.",
      },
      {
        question: "What about shipping and taxes?",
        answer:
          "We'll configure shipping rates based on your preferences (flat rate, calculated, free shipping, etc.) and set up proper tax collection for Florida and other states as needed.",
      },
    ],
    relatedServices: [
      "custom-website-development",
      "digital-marketing-campaigns",
      "social-media-setup",
    ],
  },
  {
    id: "4",
    title: "Local SEO Optimization",
    slug: "local-seo-optimization",
    shortDescription:
      "Get found by local customers when they search for your services in Cape Coral, Fort Myers, Naples, and beyond.",
    fullDescription:
      "When someone in Southwest Florida searches for your type of business, you want to be the first result they see. Our local SEO services help your business dominate local search results, show up in Google Maps, and attract more customers from your area. We know the SWFL market and exactly what it takes to outrank your competition.",
    features: [
      "Local keyword research and optimization",
      "Google Business Profile optimization",
      "Local citation building (directories)",
      "On-page SEO improvements",
      "Local content creation",
      "Review management strategy",
      "Local competitor analysis",
      "Schema markup implementation",
    ],
    benefits: [
      "Higher visibility in local search results",
      "More qualified local leads and calls",
      "Improved Google Maps ranking",
      "Better online reputation management",
      "Increased website traffic from local searches",
      "Competitive advantage over local businesses",
    ],
    process: [
      {
        step: 1,
        title: "Local SEO Audit",
        description:
          "We'll analyze your current local search presence and identify opportunities to improve your visibility in SWFL markets.",
        duration: "1 week",
      },
      {
        step: 2,
        title: "Keyword Research",
        description:
          "Identify the exact terms local customers use to find businesses like yours, focusing on Cape Coral, Fort Myers, Naples, and surrounding areas.",
        duration: "1 week",
      },
      {
        step: 3,
        title: "On-Page Optimization",
        description:
          "Optimize your website content, titles, and structure to rank higher for local searches and provide value to potential customers.",
        duration: "2-3 weeks",
      },
      {
        step: 4,
        title: "Local Listings & Citations",
        description:
          "Create and optimize your business listings across 50+ local directories and review sites to build local authority.",
        duration: "2-3 weeks",
      },
      {
        step: 5,
        title: "Monitoring & Reporting",
        description:
          "Track your local search performance and provide monthly reports showing your progress and new opportunities.",
        duration: "Ongoing",
      },
    ],
    pricing: [
      {
        name: "Local SEO Setup",
        price: "$800 - $1,500",
        description: "One-time optimization to get you started",
        features: [
          "Local keyword research",
          "Google Business Profile optimization",
          "Basic citation building",
          "On-page SEO improvements",
          "Initial performance report",
        ],
      },
      {
        name: "Monthly Local SEO",
        price: "$500 - $1,200/month",
        description: "Ongoing optimization and management",
        features: [
          "Continuous optimization",
          "Monthly citation building",
          "Content creation",
          "Review management",
          "Monthly performance reports",
          "Competitor monitoring",
        ],
        popular: true,
      },
      {
        name: "Premium Local SEO",
        price: "$1,200 - $2,500/month",
        description: "Comprehensive local dominance strategy",
        features: [
          "Advanced local optimization",
          "Multi-location management",
          "Advanced content strategy",
          "Local PR and link building",
          "Weekly reporting",
          "Dedicated account manager",
        ],
      },
    ],
    technologies: [
      "Google Business Profile",
      "Google Analytics",
      "Google Search Console",
      "Local Citation Tools",
      "SEO Analysis Tools",
      "Schema Markup",
    ],
    deliverables: [
      "Optimized Google Business Profile",
      "Local citation submissions",
      "On-page SEO improvements",
      "Local keyword strategy",
      "Monthly performance reports",
      "Review management system",
    ],
    timeline: "6-month minimum commitment",
    category: "Marketing" as const,
    featuredImage:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop&crop=center",
    testimonial: {
      quote:
        "Since working with Site Wave, we show up first when people search for 'plumber Fort Myers.' Our phone hasn't stopped ringing with new customers!",
      author: "Mike Rodriguez",
      company: "Rodriguez Plumbing Services",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    faq: [
      {
        question: "How long does it take to see SEO results?",
        answer:
          "You'll typically start seeing improvements in 2-3 months, with significant results by 6 months. Local SEO is a long-term investment that compounds over time.",
      },
      {
        question: "Do you guarantee first page rankings?",
        answer:
          "While we can't guarantee specific rankings (no honest SEO company can), we focus on proven strategies that consistently improve local visibility for our SWFL clients.",
      },
      {
        question: "What's included in the monthly service?",
        answer:
          "Monthly service includes ongoing optimization, citation building, content creation, review management, and detailed reporting on your local search performance.",
      },
      {
        question: "Can you help with negative reviews?",
        answer:
          "Yes! We include review management strategy to help you get more positive reviews and properly respond to any negative feedback in a professional manner.",
      },
    ],
    relatedServices: [
      "custom-website-development",
      "google-business-management",
      "content-strategy-blog",
    ],
  },
  {
    id: "5",
    title: "Content Strategy & Blog Creation",
    slug: "content-strategy-blog",
    shortDescription:
      "Engage your SWFL audience with valuable content that builds trust, improves SEO, and generates leads.",
    fullDescription:
      "Stand out as the expert in your field with a professional blog that attracts and educates your Southwest Florida customers. We create content strategies that showcase your expertise, improve your search rankings, and turn website visitors into loyal customers. From home improvement tips to business insights, we'll help you become the go-to resource in your industry.",
    features: [
      "Content strategy and editorial calendar",
      "Professional blog design and setup",
      "SEO-optimized blog posts",
      "Local content focused on SWFL",
      "Industry-specific topic research",
      "Internal linking strategy",
      "Social media content integration",
      "Analytics and performance tracking",
    ],
    benefits: [
      "Establish authority and expertise in your field",
      "Improve search engine rankings",
      "Generate more qualified leads",
      "Build trust with potential customers",
      "Create shareable content for social media",
      "Educate customers and reduce support calls",
    ],
    process: [
      {
        step: 1,
        title: "Content Strategy Development",
        description:
          "We'll research your industry, audience, and competitors to create a content plan that resonates with SWFL customers.",
        duration: "1 week",
      },
      {
        step: 2,
        title: "Blog Design & Setup",
        description:
          "Create an attractive, easy-to-navigate blog that integrates seamlessly with your website and brand.",
        duration: "1-2 weeks",
      },
      {
        step: 3,
        title: "Content Creation",
        description:
          "Write engaging, SEO-optimized blog posts that provide value to your audience and showcase your expertise.",
        duration: "Ongoing",
      },
      {
        step: 4,
        title: "Publishing & Promotion",
        description:
          "Publish content on schedule and promote it through your social media channels and email marketing.",
        duration: "Ongoing",
      },
      {
        step: 5,
        title: "Performance Analysis",
        description:
          "Track content performance and adjust strategy based on what resonates most with your audience.",
        duration: "Monthly",
      },
    ],
    pricing: [
      {
        name: "Blog Setup",
        price: "$500 - $1,000",
        description: "One-time blog design and strategy",
        features: [
          "Blog design and setup",
          "Content strategy development",
          "Editorial calendar creation",
          "SEO optimization setup",
          "Social media integration",
        ],
      },
      {
        name: "Monthly Content",
        price: "$400 - $800/month",
        description: "4 blog posts per month",
        features: [
          "4 SEO-optimized blog posts",
          "Content research and writing",
          "Local SWFL focus",
          "Social media posting",
          "Performance reporting",
        ],
        popular: true,
      },
      {
        name: "Premium Content",
        price: "$800 - $1,500/month",
        description: "8 blog posts plus extras",
        features: [
          "8 SEO-optimized blog posts",
          "Advanced content strategy",
          "Email newsletter content",
          "Video script writing",
          "Advanced analytics",
          "Quarterly strategy reviews",
        ],
      },
    ],
    technologies: [
      "WordPress",
      "SEO Tools",
      "Google Analytics",
      "Content Management",
      "Social Media Platforms",
      "Email Marketing",
    ],
    deliverables: [
      "Professional blog setup",
      "Content strategy document",
      "Editorial calendar",
      "SEO-optimized blog posts",
      "Social media content",
      "Monthly performance reports",
    ],
    timeline: "Ongoing monthly service",
    category: "Marketing" as const,
    featuredImage:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop&crop=center",
    testimonial: {
      quote:
        "Our blog has become our best sales tool! Customers often mention reading our posts before choosing us. It's helped us become the trusted experts in our field.",
      author: "Sarah Mitchell",
      company: "Coastal Home Inspections",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    faq: [
      {
        question: "What topics will you write about for my business?",
        answer:
          "We research your industry and create content that answers common customer questions, showcases your expertise, and addresses local SWFL interests and concerns.",
      },
      {
        question: "How often should I publish new blog content?",
        answer:
          "We recommend at least 4 posts per month for consistent SEO benefits and audience engagement. More frequent posting can accelerate results.",
      },
      {
        question: "Can I review content before it's published?",
        answer:
          "Absolutely! We send all content for your review and approval before publishing. You can request edits or provide input on any post.",
      },
      {
        question: "Do you promote the blog posts on social media?",
        answer:
          "Yes! We create social media content based on your blog posts and can schedule them across your social platforms to maximize reach and engagement.",
      },
    ],
    relatedServices: [
      "local-seo-optimization",
      "social-media-setup",
      "custom-website-development",
    ],
  },
];

/**
 * Execute website services seeding operation
 */
const execute = async (): Promise<number> => {
  let totalInserted = 0;

  for (const serviceData of websiteServicesData) {
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

    // Insert gallery images
    if (serviceData.gallery && serviceData.gallery.length > 0) {
      const galleryValues: NewServiceGalleryImage[] = serviceData.gallery.map(
        (imageUrl, index) => ({
          serviceId: insertedService.id,
          imageUrl,
          order: index + 1,
        })
      );
      await db.insert(serviceGalleryImages).values(galleryValues);
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
 * Clear website services data and all related records
 */
const clear = async (): Promise<void> => {
  // Get all website service IDs
  const websiteServices = await db
    .select({ id: services.id })
    .from(services)
    .where(or(...websiteServicesData.map((s) => eq(services.slug, s.slug))));

  const serviceIds = websiteServices.map((s) => s.id);

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
 * Website services seed operation configuration
 */
export const websiteServicesSeed: SeedOperation = {
  config: {
    name: "website-services",
    order: 7,
    description: "Seed Website & Digital Presence Services for Site Wave",
  },
  execute,
  clear,
};
