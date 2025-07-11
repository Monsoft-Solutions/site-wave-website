"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Code,
  Search,
  Megaphone,
  Zap,
  Trophy,
  TrendingUp,
  BookOpen,
  MapPin,
  ArrowRight,
  Users,
} from "lucide-react";
import Link from "next/link";

interface SiteWaveCategory {
  name: string;
  slug: string;
  count: number;
  description: string;
  color: string;
  icon: string;
  trending?: boolean;
}

interface SiteWaveCategoryHubProps {
  categories: SiteWaveCategory[];
}

// Icon mapping for Site Wave categories
const iconMap = {
  code: Code,
  search: Search,
  megaphone: Megaphone,
  zap: Zap,
  trophy: Trophy,
  "trending-up": TrendingUp,
  "book-open": BookOpen,
  "map-pin": MapPin,
};

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

const cardHoverVariants = {
  hover: {
    y: -8,
    scale: 1.05,
    transition: {
      duration: 0.3,
    },
  },
};

// Default Site Wave categories if none provided
const defaultSiteWaveCategories: SiteWaveCategory[] = [
  {
    name: "Website Development",
    slug: "website-development",
    count: 12,
    description: "Custom websites that convert visitors into customers",
    color: "from-ocean-blue to-ocean-blue/70",
    icon: "code",
    trending: true,
  },
  {
    name: "SEO & Local Marketing",
    slug: "seo-local-marketing",
    count: 18,
    description: "Get found by Southwest Florida customers on Google",
    color: "from-coral-orange to-coral-orange/70",
    icon: "search",
    trending: true,
  },
  {
    name: "Digital Marketing",
    slug: "digital-marketing",
    count: 15,
    description: "Social media, ads, and online presence strategies",
    color: "from-ocean-blue/80 to-coral-orange/80",
    icon: "megaphone",
  },
  {
    name: "Business Automation",
    slug: "business-automation",
    count: 9,
    description: "Save time with smart CRM and automation tools",
    color: "from-deep-navy to-ocean-blue",
    icon: "zap",
  },
  {
    name: "Case Studies",
    slug: "case-studies",
    count: 8,
    description: "Real results from SWFL businesses like yours",
    color: "from-coral-orange/80 to-deep-navy/80",
    icon: "trophy",
  },
  {
    name: "Local Business Tips",
    slug: "local-business-tips",
    count: 14,
    description: "Proven strategies for Southwest Florida success",
    color: "from-deep-navy/80 to-coral-orange/80",
    icon: "map-pin",
    trending: true,
  },
];

export function SiteWaveCategoryHub({
  categories = defaultSiteWaveCategories,
}: SiteWaveCategoryHubProps) {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  return (
    <section
      className="py-20 bg-gradient-to-br from-background via-soft-sand/20 to-background"
      ref={ref}
    >
      <div className="container">
        <motion.div
          className="mx-auto max-w-7xl"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section Header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <Badge
              variant="outline"
              className="mb-4 px-6 py-3 border-ocean-blue/30 bg-background/90 backdrop-blur-sm"
            >
              <Users className="w-4 h-4 mr-2 text-ocean-blue" />
              Explore by Business Need
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl mb-4 font-heading">
              <span className="bg-gradient-to-r from-ocean-blue via-coral-orange to-ocean-blue bg-clip-text text-transparent">
                Southwest Florida
              </span>{" "}
              Business Hub
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Find exactly what you need to grow your business in Cape Coral,
              Fort Myers, Naples, and beyond. Expert insights organized by your
              business challenges.
            </p>
          </motion.div>

          {/* Categories Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
            variants={containerVariants}
          >
            {categories.map((category) => {
              const IconComponent =
                iconMap[category.icon as keyof typeof iconMap] || Code;

              return (
                <motion.div
                  key={category.slug}
                  variants={itemVariants}
                  whileHover="hover"
                  className="group cursor-pointer"
                >
                  <motion.div variants={cardHoverVariants}>
                    <Card className="relative overflow-hidden border border-ocean-blue/10 bg-gradient-to-br from-card to-card/50 hover:border-ocean-blue/30 hover:shadow-2xl transition-all duration-500 h-full">
                      {/* Trending Badge */}
                      {category.trending && (
                        <div className="absolute top-4 right-4 z-20">
                          <Badge className="bg-coral-orange text-white border-0 text-xs">
                            <TrendingUp className="w-3 h-3 mr-1" />
                            Hot in SWFL
                          </Badge>
                        </div>
                      )}

                      {/* Background Pattern */}
                      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] dark:bg-grid-slate-700/25 opacity-20" />

                      {/* Gradient Overlay based on category color */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`}
                      />

                      <CardContent className="relative z-10 p-8 h-full flex flex-col">
                        {/* Icon */}
                        <div className="mb-6">
                          <div
                            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                          >
                            <IconComponent className="w-8 h-8 text-white" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-xl font-bold group-hover:text-ocean-blue transition-colors duration-200 font-heading">
                              {category.name}
                            </h3>
                            <Badge variant="secondary" className="text-xs">
                              {category.count} articles
                            </Badge>
                          </div>

                          <p className="text-muted-foreground mb-6 leading-relaxed">
                            {category.description}
                          </p>
                        </div>

                        {/* CTA */}
                        <Link
                          href={`/blog/category/${category.slug}`}
                          className="inline-flex items-center text-sm font-medium text-ocean-blue hover:text-coral-orange transition-colors duration-200 group/link"
                        >
                          Explore Articles
                          <ArrowRight className="ml-2 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Bottom CTA Section */}
          <motion.div
            className="text-center bg-gradient-to-br from-ocean-blue/5 via-soft-sand/30 to-coral-orange/5 rounded-3xl p-12"
            variants={itemVariants}
          >
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-6">
                <MapPin className="w-6 h-6 text-ocean-blue" />
                <h3 className="text-2xl font-bold text-ocean-blue font-heading">
                  Can&apos;t Find What You&apos;re Looking For?
                </h3>
              </div>

              <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
                Our team of Southwest Florida digital experts is here to help.
                Whether you need a custom strategy for your Cape Coral
                storefront or want to dominate local search in Naples,
                we&apos;ve got you covered.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-ocean-blue hover:bg-ocean-blue/90 text-white font-medium"
                >
                  <Link href="/contact">
                    Get Personalized Advice
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-coral-orange text-coral-orange hover:bg-coral-orange hover:text-white font-medium"
                >
                  <Link href="/blog">
                    Browse All Articles
                    <BookOpen className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>

              {/* Local Trust Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-8 border-t border-muted/30">
                <div className="text-center">
                  <div className="text-2xl font-bold text-coral-orange font-heading mb-1">
                    150+
                  </div>
                  <div className="text-sm text-muted-foreground">
                    SWFL Businesses Helped
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-ocean-blue font-heading mb-1">
                    5+ Years
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Serving Southwest Florida
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-deep-navy font-heading mb-1">
                    Local Team
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Based in Cape Coral
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
