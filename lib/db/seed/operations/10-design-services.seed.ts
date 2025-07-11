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
 * Design Solutions for Site Wave
 * Creative services that capture the essence of SWFL businesses
 */
const designServicesData = [
  {
    id: "16",
    title: "Logo & Brand Identity",
    slug: "logo-brand-identity",
    shortDescription:
      "Create a memorable brand identity that captures your business personality and appeals to Southwest Florida customers.",
    fullDescription:
      "Your brand is more than just a logo—it's the complete visual story of your business. We'll create a cohesive brand identity that reflects your personality, appeals to SWFL customers, and stands out in the local market. From coastal-inspired designs to professional corporate looks, we'll craft a brand that makes the right impression every time.",
    features: [
      "Custom logo design with multiple concepts",
      "Brand color palette selection",
      "Typography and font recommendations",
      "Brand guidelines and usage instructions",
      "Logo variations (horizontal, vertical, icon)",
      "File formats for all uses (web, print, social)",
      "Brand voice and messaging guidance",
      "Competitive analysis and market research",
    ],
    benefits: [
      "Professional, memorable brand presence",
      "Consistent visual identity across all materials",
      "Stand out from local competitors",
      "Build customer trust and recognition",
      "Flexible brand assets for all applications",
      "SWFL-inspired design that resonates locally",
    ],
    process: [
      {
        step: 1,
        title: "Brand Discovery",
        description:
          "We'll explore your business personality, target audience, and competitive landscape to understand what makes you unique in Southwest Florida.",
        duration: "1 week",
      },
      {
        step: 2,
        title: "Concept Development",
        description:
          "Create 3-5 initial logo concepts that capture different aspects of your brand and appeal to your SWFL customers.",
        duration: "1-2 weeks",
      },
      {
        step: 3,
        title: "Refinement & Selection",
        description:
          "Refine your favorite concept based on your feedback, perfect the details, and develop the complete brand identity.",
        duration: "1 week",
      },
      {
        step: 4,
        title: "Brand System Creation",
        description:
          "Develop color palettes, typography, and create all logo variations and file formats you'll need.",
        duration: "1 week",
      },
      {
        step: 5,
        title: "Guidelines & Delivery",
        description:
          "Create brand guidelines showing how to use your new identity and deliver all files in formats ready for any application.",
        duration: "1 week",
      },
    ],
    pricing: [
      {
        name: "Essential Brand",
        price: "$500 - $800",
        description: "Logo design with basic brand elements",
        features: [
          "Custom logo design (3 concepts)",
          "2 revisions included",
          "Basic color palette",
          "Standard file formats",
          "Simple brand guidelines",
        ],
      },
      {
        name: "Complete Brand Identity",
        price: "$800 - $1,200",
        description: "Comprehensive brand package",
        features: [
          "Custom logo design (5 concepts)",
          "Unlimited revisions",
          "Complete color palette",
          "Typography selection",
          "All logo variations",
          "Comprehensive brand guidelines",
          "All file formats included",
        ],
        popular: true,
      },
      {
        name: "Premium Brand System",
        price: "$1,200 - $1,500",
        description: "Complete brand system with extras",
        features: [
          "Premium logo design process",
          "Extended brand exploration",
          "Custom icon set",
          "Brand voice guidelines",
          "Marketing material templates",
          "6 months of brand support",
        ],
      },
    ],
    technologies: [
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Figma",
      "Canva Pro",
      "Adobe InDesign",
      "Brand Guidelines Tools",
    ],
    deliverables: [
      "Custom logo in all formats",
      "Brand color palette",
      "Typography recommendations",
      "Brand guidelines document",
      "Logo usage examples",
      "Vector and raster files",
    ],
    timeline: "3-5 weeks",
    category: "Design" as const,
    featuredImage:
      "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop&crop=center",
    testimonial: {
      quote:
        "Our new logo perfectly captures the coastal, professional vibe we wanted. Customers love it, and we're proud to put it on everything. It's helped us stand out in the crowded Fort Myers market!",
      author: "Ashley Rivera",
      company: "Coastal Consulting Group",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    faq: [
      {
        question: "How many logo concepts will I see?",
        answer:
          "Depending on your package, you'll see 3-5 initial concepts that explore different design directions. We then refine your favorite based on your feedback until it's perfect.",
      },
      {
        question: "What file formats will I receive?",
        answer:
          "You'll get your logo in all the formats you need: vector files (AI, EPS, SVG), high-resolution PNGs, JPEGs, and web-optimized files. Everything for print, web, and social media use.",
      },
      {
        question:
          "Can you incorporate Southwest Florida elements into the design?",
        answer:
          "Absolutely! We love creating designs that reflect the local SWFL culture, whether it's coastal themes, palm trees, sunshine, or other elements that resonate with your local market.",
      },
    ],
    relatedServices: [
      "custom-website-development",
      "print-design",
      "digital-advertising-graphics",
    ],
  },
  {
    id: "17",
    title: "Print Design",
    slug: "print-design",
    shortDescription:
      "Professional print materials that make a great impression and help your SWFL business stand out in person.",
    fullDescription:
      "Sometimes the best marketing happens offline. We design beautiful print materials that make a lasting impression on your Southwest Florida customers. From business cards that get kept to brochures that get shared, we'll create print designs that work as hard as you do to grow your business.",
    features: [
      "Business cards and stationery design",
      "Brochure and flyer creation",
      "Postcard and direct mail pieces",
      "Trade show and event materials",
      "Menu and price list design",
      "Professional presentation folders",
      "Print-ready file preparation",
      "Local printer coordination (optional)",
    ],
    benefits: [
      "Professional appearance in face-to-face meetings",
      "Tangible marketing materials customers can keep",
      "Stand out at local events and trade shows",
      "Consistent branding across all materials",
      "High-quality designs that reflect your business",
      "Local SWFL market knowledge applied",
    ],
    process: [
      {
        step: 1,
        title: "Project Planning",
        description:
          "Discuss your print needs, target audience, and how the materials will be used in your SWFL business.",
        duration: "1 week",
      },
      {
        step: 2,
        title: "Design Development",
        description:
          "Create initial design concepts that align with your brand and appeal to your local Southwest Florida market.",
        duration: "1-2 weeks",
      },
      {
        step: 3,
        title: "Revisions & Refinement",
        description:
          "Refine the designs based on your feedback to ensure they perfectly represent your business.",
        duration: "1 week",
      },
      {
        step: 4,
        title: "Print Preparation",
        description:
          "Prepare print-ready files with proper bleeds, resolution, and color profiles for professional printing.",
        duration: "1 week",
      },
      {
        step: 5,
        title: "Delivery & Support",
        description:
          "Deliver final files and optionally coordinate with local SWFL printers to ensure perfect results.",
        duration: "1 week",
      },
    ],
    pricing: [
      {
        name: "Business Cards",
        price: "$150 - $300",
        description: "Professional business card design",
        features: [
          "Custom business card design",
          "2 design concepts",
          "2 revisions included",
          "Print-ready files",
          "Standard and premium options",
        ],
      },
      {
        name: "Brochures & Flyers",
        price: "$300 - $800",
        description: "Marketing brochures and flyers",
        features: [
          "Tri-fold or bi-fold brochure design",
          "Content layout and organization",
          "Professional imagery integration",
          "Print-ready files",
          "Up to 3 revisions",
        ],
        popular: true,
      },
      {
        name: "Complete Print Package",
        price: "$800 - $1,200",
        description: "Full suite of print materials",
        features: [
          "Business cards and letterhead",
          "Brochure or flyer design",
          "Postcard or direct mail piece",
          "Presentation folder design",
          "Consistent branding across all pieces",
          "Local printer coordination",
        ],
      },
    ],
    technologies: [
      "Adobe InDesign",
      "Adobe Illustrator",
      "Adobe Photoshop",
      "Print Production Tools",
      "Color Management",
      "Print Specifications",
    ],
    deliverables: [
      "Print-ready design files",
      "High-resolution PDFs",
      "Source design files",
      "Print specifications guide",
      "Local printer recommendations",
      "File delivery in multiple formats",
    ],
    timeline: "2-4 weeks",
    category: "Design" as const,
    featuredImage:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop&crop=center",
    testimonial: {
      quote:
        "The brochures have been fantastic for our Naples real estate business. They look so professional and really help us stand out when meeting with potential clients. We get compliments on them constantly!",
      author: "Robert Martinez",
      company: "Paradise Properties Naples",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    },
    faq: [
      {
        question: "Do you handle the printing, or just the design?",
        answer:
          "We primarily focus on design, but we can coordinate with local SWFL printers to ensure your materials are printed perfectly. We'll provide print-ready files and specifications.",
      },
      {
        question: "Can you match my existing brand colors exactly?",
        answer:
          "Yes! We'll use your exact brand colors and ensure they're properly configured for print production. We can also provide Pantone color specifications if needed.",
      },
      {
        question: "What's the difference between design for print vs. web?",
        answer:
          "Print design requires higher resolution, specific color modes (CMYK), and considerations for paper and printing processes. We handle all the technical aspects to ensure perfect printed results.",
      },
    ],
    relatedServices: [
      "logo-brand-identity",
      "digital-advertising-graphics",
      "custom-signage",
    ],
  },
  {
    id: "18",
    title: "Digital Advertising Graphics",
    slug: "digital-advertising-graphics",
    shortDescription:
      "Eye-catching graphics for your online ads, social media, and digital marketing that get SWFL customers to click.",
    fullDescription:
      "Make your digital marketing impossible to ignore with professional graphics designed for online success. We create compelling visuals for social media posts, Google ads, Facebook campaigns, email marketing, and website banners that capture attention and drive action from your Southwest Florida audience.",
    features: [
      "Social media post graphics and templates",
      "Facebook and Instagram ad designs",
      "Google Ads banner and display creatives",
      "Email marketing graphics and headers",
      "Website banners and promotional graphics",
      "Story and reel templates",
      "Animated graphics and GIFs",
      "Brand-consistent design templates",
    ],
    benefits: [
      "Professional, scroll-stopping visuals",
      "Higher engagement on social media",
      "Better click-through rates on ads",
      "Consistent brand presence online",
      "Templates for ongoing content creation",
      "SWFL-focused design that resonates locally",
    ],
    process: [
      {
        step: 1,
        title: "Content Strategy",
        description:
          "Understand your digital marketing goals and create a visual strategy that will resonate with your SWFL audience.",
        duration: "1 week",
      },
      {
        step: 2,
        title: "Design Creation",
        description:
          "Create initial graphics and templates that align with your brand and platform best practices.",
        duration: "2-3 weeks",
      },
      {
        step: 3,
        title: "Review & Refinement",
        description:
          "Review designs together and refine them based on your feedback and platform requirements.",
        duration: "1 week",
      },
      {
        step: 4,
        title: "Template Development",
        description:
          "Create easy-to-use templates so you can continue creating consistent graphics for ongoing campaigns.",
        duration: "1 week",
      },
      {
        step: 5,
        title: "Delivery & Training",
        description:
          "Deliver all graphics in the right formats and provide training on using templates for future content.",
        duration: "1 week",
      },
    ],
    pricing: [
      {
        name: "Social Media Graphics",
        price: "$200 - $500",
        description: "Graphics for social media posting",
        features: [
          "10 custom social media posts",
          "Platform-optimized sizes",
          "Brand-consistent designs",
          "2 revisions per graphic",
          "Ready-to-post formats",
        ],
      },
      {
        name: "Ad Campaign Package",
        price: "$500 - $1,000",
        description: "Complete ad campaign graphics",
        features: [
          "Facebook and Instagram ad sets",
          "Google display ads",
          "Landing page graphics",
          "A/B testing variations",
          "Performance-optimized designs",
          "Multiple size formats",
        ],
        popular: true,
      },
      {
        name: "Digital Marketing Suite",
        price: "$1,000 - $1,800",
        description: "Comprehensive digital graphics package",
        features: [
          "30+ social media graphics",
          "Ad campaign creatives",
          "Email marketing templates",
          "Website banner graphics",
          "Animated GIFs and videos",
          "Editable template files",
        ],
      },
    ],
    technologies: [
      "Adobe Photoshop",
      "Adobe Illustrator",
      "Canva Pro",
      "Figma",
      "After Effects",
      "Animation Tools",
    ],
    deliverables: [
      "Custom digital graphics",
      "Platform-optimized sizes",
      "Editable template files",
      "Animation files (if applicable)",
      "Usage guidelines",
      "File organization system",
    ],
    timeline: "3-5 weeks",
    category: "Design" as const,
    featuredImage:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&crop=center",
    testimonial: {
      quote:
        "The Facebook ad graphics have been incredible! Our click-through rates doubled, and we're getting so many more leads. The designs really capture the fun, beachy vibe our Cape Coral customers love.",
      author: "Maria Santos",
      company: "Tropical Tours & Adventures",
      avatar:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    },
    faq: [
      {
        question: "What sizes and formats do you create graphics in?",
        answer:
          "We create graphics optimized for each platform - Instagram posts, Facebook ads, Google display ads, email headers, and more. Each graphic is sized perfectly for its intended use.",
      },
      {
        question: "Can you create animated graphics or videos?",
        answer:
          "Yes! We can create animated GIFs, simple motion graphics, and short video content that works great for social media stories and ad campaigns.",
      },
      {
        question:
          "Do you provide templates so we can create more graphics ourselves?",
        answer:
          "Absolutely! We can create easy-to-use templates in Canva or provide Photoshop templates so you can continue creating consistent graphics for ongoing campaigns.",
      },
    ],
    relatedServices: [
      "social-media-setup",
      "paid-advertising-campaigns",
      "logo-brand-identity",
    ],
  },
  {
    id: "19",
    title: "Custom Signage",
    slug: "custom-signage",
    shortDescription:
      "Professional signage design for your SWFL storefront, office, or vehicle that attracts customers and builds brand recognition.",
    fullDescription:
      "Make a strong first impression with custom signage that showcases your business professionally. Whether you need storefront signs, vehicle wraps, yard signs, or trade show displays, we'll design signage that captures attention and communicates your brand effectively to the Southwest Florida community.",
    features: [
      "Storefront and building signage design",
      "Vehicle wrap and decal design",
      "Yard signs and real estate signage",
      "Trade show and event displays",
      "Indoor office signage and wayfinding",
      "Banner and flag design",
      "Window graphics and decals",
      "Local vendor coordination",
    ],
    benefits: [
      "Professional brand visibility in SWFL",
      "Attract walk-in customers and traffic",
      "Consistent branding across all locations",
      "Durable, weather-resistant designs",
      "Stand out from local competitors",
      "Mobile advertising with vehicle graphics",
    ],
    process: [
      {
        step: 1,
        title: "Site Assessment",
        description:
          "Evaluate your location, vehicle, or display needs to understand the best signage solutions for your business.",
        duration: "1 week",
      },
      {
        step: 2,
        title: "Design Development",
        description:
          "Create signage designs that align with your brand and work effectively in the Southwest Florida environment.",
        duration: "2-3 weeks",
      },
      {
        step: 3,
        title: "Technical Specifications",
        description:
          "Develop detailed specifications for materials, sizes, and installation requirements with local regulations in mind.",
        duration: "1 week",
      },
      {
        step: 4,
        title: "Vendor Coordination",
        description:
          "Work with trusted local SWFL sign companies to ensure proper production and installation of your signage.",
        duration: "2-4 weeks",
      },
      {
        step: 5,
        title: "Installation Support",
        description:
          "Provide design support during installation to ensure your signage looks perfect and meets all requirements.",
        duration: "1 week",
      },
    ],
    pricing: [
      {
        name: "Basic Sign Design",
        price: "$300 - $800",
        description: "Simple signage design projects",
        features: [
          "Single sign design",
          "2 design concepts",
          "Technical specifications",
          "Print-ready files",
          "Basic vendor coordination",
        ],
      },
      {
        name: "Complete Signage Package",
        price: "$800 - $1,500",
        description: "Multiple signs or complex projects",
        features: [
          "Multiple sign designs",
          "Vehicle wrap design",
          "Material recommendations",
          "Installation specifications",
          "Local vendor management",
          "Project coordination",
        ],
        popular: true,
      },
      {
        name: "Comprehensive Signage System",
        price: "$1,500 - $2,000",
        description: "Complete business signage solution",
        features: [
          "Full signage system design",
          "Indoor and outdoor signage",
          "Vehicle graphics package",
          "Trade show displays",
          "Brand consistency guidelines",
          "Ongoing signage support",
        ],
      },
    ],
    technologies: [
      "Adobe Illustrator",
      "Adobe Photoshop",
      "CAD Software",
      "3D Modeling Tools",
      "Production Specifications",
      "Material Guidelines",
    ],
    deliverables: [
      "Custom signage designs",
      "Technical production files",
      "Material and size specifications",
      "Installation guidelines",
      "Local vendor recommendations",
      "Project management support",
    ],
    timeline: "4-8 weeks (including production)",
    category: "Design" as const,
    featuredImage:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop&crop=center",
    testimonial: {
      quote:
        "Our new storefront sign has been amazing for business! We've had so many people say they finally noticed our shop. The design perfectly captures our brand and looks great in the Florida sunshine.",
      author: "James Wilson",
      company: "Island Surf Shop",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    },
    faq: [
      {
        question: "Do you handle the actual sign production and installation?",
        answer:
          "We focus on design and can coordinate with trusted local SWFL sign companies for production and installation. We'll manage the process to ensure your vision becomes reality.",
      },
      {
        question: "What about local permits and regulations?",
        answer:
          "We're familiar with Southwest Florida signage regulations and work with local vendors who handle permits. We'll design within guidelines to avoid complications.",
      },
      {
        question: "Can you design vehicle wraps for my business?",
        answer:
          "Absolutely! Vehicle wraps are a great mobile advertising opportunity in SWFL. We'll design graphics that look great on your specific vehicle and effectively promote your business.",
      },
    ],
    relatedServices: [
      "logo-brand-identity",
      "print-design",
      "digital-advertising-graphics",
    ],
  },
  {
    id: "20",
    title: "Presentations & Document Design",
    slug: "presentations-document-design",
    shortDescription:
      "Professional presentations and documents that impress clients and help you win more business in SWFL.",
    fullDescription:
      "Make every presentation count with professionally designed slides and documents that showcase your expertise. Whether you're pitching to new clients, presenting to investors, or creating proposals, we'll design materials that look impressive and communicate your message clearly to Southwest Florida audiences.",
    features: [
      "PowerPoint and Keynote presentation design",
      "Sales proposal and pitch deck creation",
      "Client proposal templates",
      "Annual report and document design",
      "Training material and workbook layout",
      "Interactive PDF documents",
      "Brand-consistent templates",
      "Chart and infographic design",
    ],
    benefits: [
      "Professional, polished presentations",
      "Impress clients and win more business",
      "Clear, effective communication",
      "Consistent branding across materials",
      "Save time with reusable templates",
      "Stand out from competitors",
    ],
    process: [
      {
        step: 1,
        title: "Content Review",
        description:
          "Review your existing content and understand the purpose and audience for your presentation or document.",
        duration: "1 week",
      },
      {
        step: 2,
        title: "Structure Planning",
        description:
          "Organize content flow and create a logical structure that effectively communicates your message.",
        duration: "1 week",
      },
      {
        step: 3,
        title: "Design Development",
        description:
          "Create visually appealing designs that align with your brand and enhance your content's impact.",
        duration: "2-3 weeks",
      },
      {
        step: 4,
        title: "Content Integration",
        description:
          "Integrate your content with the design, create charts and graphics, and ensure everything flows smoothly.",
        duration: "1-2 weeks",
      },
      {
        step: 5,
        title: "Final Review & Delivery",
        description:
          "Review the final presentation together, make any needed adjustments, and deliver in all required formats.",
        duration: "1 week",
      },
    ],
    pricing: [
      {
        name: "Basic Presentation",
        price: "$300 - $600",
        description: "Simple presentation design",
        features: [
          "Up to 15 slides",
          "Professional template design",
          "Basic charts and graphics",
          "Brand-consistent styling",
          "PowerPoint or Keynote format",
        ],
      },
      {
        name: "Professional Presentation",
        price: "$600 - $1,000",
        description: "Comprehensive presentation package",
        features: [
          "Up to 30 slides",
          "Custom design elements",
          "Advanced charts and infographics",
          "Interactive elements",
          "Multiple format delivery",
          "Reusable template creation",
        ],
        popular: true,
      },
      {
        name: "Executive Document Suite",
        price: "$1,000 - $2,000",
        description: "Complete document design package",
        features: [
          "Multiple presentations",
          "Proposal templates",
          "Document layouts",
          "Interactive PDFs",
          "Advanced graphics package",
          "Ongoing template support",
        ],
      },
    ],
    technologies: [
      "Microsoft PowerPoint",
      "Apple Keynote",
      "Adobe InDesign",
      "Adobe Illustrator",
      "Canva Pro",
      "Google Slides",
    ],
    deliverables: [
      "Professional presentation files",
      "Editable template versions",
      "PDF versions for sharing",
      "Chart and graphic elements",
      "Usage guidelines",
      "Multiple format options",
    ],
    timeline: "3-6 weeks",
    category: "Design" as const,
    featuredImage:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center",
    testimonial: {
      quote:
        "The investor presentation was absolutely perfect! The professional design helped us secure funding for our expansion into new SWFL markets. It really made us look like the serious business we are.",
      author: "Patricia Johnson",
      company: "Gulf Coast Innovations",
      avatar:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    },
    faq: [
      {
        question: "Can you work with our existing content and slides?",
        answer:
          "Absolutely! We can take your existing content and transform it into a professionally designed presentation that's much more visually appealing and effective.",
      },
      {
        question:
          "Do you create templates we can use for future presentations?",
        answer:
          "Yes! We can create custom PowerPoint or Keynote templates that match your brand, making it easy for you to create consistent presentations in the future.",
      },
      {
        question: "Can you help with the actual content writing?",
        answer:
          "While we focus primarily on design, we can help organize and structure your content for maximum impact. For extensive writing, we can recommend content specialists.",
      },
    ],
    relatedServices: [
      "logo-brand-identity",
      "print-design",
      "digital-advertising-graphics",
    ],
  },
];

/**
 * Execute design services seeding operation
 */
const execute = async (): Promise<number> => {
  let totalInserted = 0;

  for (const serviceData of designServicesData) {
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
 * Clear design services data and all related records
 */
const clear = async (): Promise<void> => {
  // Get all design service IDs
  const designServices = await db
    .select({ id: services.id })
    .from(services)
    .where(or(...designServicesData.map((s) => eq(services.slug, s.slug))));

  const serviceIds = designServices.map((s) => s.id);

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
 * Design services seed operation configuration
 */
export const designServicesSeed: SeedOperation = {
  config: {
    name: "design-services",
    order: 10,
    description: "Seed Design Solutions for Site Wave",
  },
  execute,
  clear,
};
