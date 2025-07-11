"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  ArrowRight,
  CheckCircle,
  Globe,
  Search,
  Smartphone,
  TrendingUp,
  Bot,
  Palette,
  Star,
  Zap,
} from "lucide-react";
import { Service } from "@/lib/types/service.type";

interface SiteWaveServicesGridProps {
  services: Service[];
  categories: string[];
  isLoading: boolean;
  error?: string | null;
}

// Icon mapping for services
const serviceIcons = {
  "Website Development": Globe,
  SEO: Search,
  "Digital Marketing": Smartphone,
  Analytics: TrendingUp,
  Automation: Bot,
  Design: Palette,
  "Local SEO": Search,
  "Business Automation": Bot,
  "E-commerce": Globe,
  "Content Strategy": TrendingUp,
  "Social Media": Smartphone,
  "Review Management": Star,
  Hosting: Globe,
  CRM: Bot,
  "Lead Management": Zap,
  "Marketing Automation": Bot,
  Integration: Zap,
  "Print Design": Palette,
  Advertising: Smartphone,
  "Custom Signage": Palette,
  Presentations: Palette,
  "Directory Optimization": Search,
  default: Globe,
};

export function SiteWaveServicesGrid({
  services,
  categories,
  isLoading,
  error,
}: SiteWaveServicesGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const filteredServices = selectedCategory
    ? services.filter((service) => service.category === selectedCategory)
    : services;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  if (isLoading) {
    return (
      <div className="py-20 bg-gradient-to-b from-ocean-blue/10 to-soft-sand/30">
        <div className="container">
          <div className="flex justify-center py-12">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-12 h-12 rounded-full border-4 border-ocean-blue border-t-transparent animate-spin" />
              <p className="text-muted-foreground">Loading services...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-20 bg-gradient-to-b from-ocean-blue/10 to-soft-sand/30">
        <div className="container">
          <div className="flex justify-center py-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md">
              <p className="text-red-600 text-center">
                Error loading services: {error}
              </p>
              <p className="text-red-500 text-center mt-2 text-sm">
                Please try refreshing the page or contact us for assistance.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Get the icon for a service
  const getServiceIcon = (title: string, category: string) => {
    const key = title as keyof typeof serviceIcons;
    const categoryKey = category as keyof typeof serviceIcons;
    return (
      serviceIcons[key] || serviceIcons[categoryKey] || serviceIcons.default
    );
  };

  return (
    <section
      id="services"
      className="py-20 lg:py-32 bg-gradient-to-b from-ocean-blue/10 to-soft-sand/30"
    >
      <div className="container" ref={ref}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-deep-navy mb-4">
              Complete Digital Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything your Southwest Florida business needs to succeed online
              – from websites to marketing to automation.
            </p>
          </motion.div>
        </div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <Badge
            variant={selectedCategory === null ? "default" : "secondary"}
            className={`cursor-pointer px-6 py-3 text-sm transition-all font-medium ${
              selectedCategory === null
                ? "bg-ocean-blue text-white hover:bg-ocean-blue/90"
                : "bg-background hover:bg-ocean-blue/10 text-muted-foreground hover:text-ocean-blue"
            }`}
            onClick={() => setSelectedCategory(null)}
          >
            All Services
          </Badge>
          {categories.map((category) => (
            <Badge
              key={category}
              variant={selectedCategory === category ? "default" : "secondary"}
              className={`cursor-pointer px-6 py-3 text-sm transition-all font-medium ${
                selectedCategory === category
                  ? "bg-ocean-blue text-white hover:bg-ocean-blue/90"
                  : "bg-background hover:bg-ocean-blue/10 text-muted-foreground hover:text-ocean-blue"
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Badge>
          ))}
        </motion.div>

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {filteredServices.map((service) => {
            const ServiceIcon = getServiceIcon(service.title, service.category);
            const isPopular =
              service.title.includes("Website") ||
              service.title.includes("SEO");

            return (
              <motion.div key={service.id} variants={itemVariants}>
                <Card
                  className={`group h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                    isPopular
                      ? "border-ocean-blue shadow-lg ring-2 ring-ocean-blue/10"
                      : "border-border hover:border-ocean-blue/30"
                  }`}
                  onMouseEnter={() => setHoveredId(service.id)}
                  onMouseLeave={() => setHoveredId(null)}
                >
                  {isPopular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                      <div className="bg-coral-orange text-white px-4 py-1 rounded-full text-sm font-semibold">
                        Most Popular
                      </div>
                    </div>
                  )}

                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                          isPopular
                            ? "bg-ocean-blue text-white"
                            : "bg-ocean-blue/10 text-ocean-blue"
                        }`}
                      >
                        <ServiceIcon className="w-6 h-6" />
                      </div>
                      <Badge
                        variant="outline"
                        className="group-hover:border-ocean-blue/40 transition-colors duration-300"
                      >
                        {service.category}
                      </Badge>
                    </div>

                    <CardTitle className="group-hover:text-ocean-blue transition-colors duration-300 text-xl font-heading text-deep-navy">
                      {service.title}
                    </CardTitle>

                    <CardDescription className="text-muted-foreground mt-2">
                      {service.shortDescription}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex flex-col flex-grow justify-between pt-6">
                    <div className="space-y-4 mb-6">
                      <h4 className="font-medium text-sm text-deep-navy mb-2">
                        Key Features:
                      </h4>
                      <ul className="space-y-2">
                        {service.features.slice(0, 3).map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-start text-sm text-muted-foreground"
                          >
                            <CheckCircle className="w-4 h-4 text-ocean-blue mr-2 flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto space-y-4">
                      <div className="border-t pt-4">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-muted-foreground">
                            Starting from
                          </span>
                          <span className="font-bold text-deep-navy">
                            {service.pricing[0]?.price || "Contact us"}
                          </span>
                        </div>
                      </div>

                      <Button
                        asChild
                        className={`w-full transition-all ${
                          hoveredId === service.id
                            ? "bg-ocean-blue hover:bg-ocean-blue/90 text-white"
                            : "bg-ocean-blue/10 hover:bg-ocean-blue text-ocean-blue hover:text-white"
                        }`}
                      >
                        <Link
                          href={`/services/${service.slug}`}
                          className="flex items-center justify-center group"
                        >
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* No Services Message */}
        {filteredServices.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-background/80 backdrop-blur-sm rounded-xl p-8 border border-ocean-blue/20">
              <p className="text-muted-foreground">
                No services found in this category.
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="ml-2 text-ocean-blue hover:underline"
                >
                  View all services
                </button>
              </p>
            </div>
          </motion.div>
        )}

        {/* Bottom CTA */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="text-muted-foreground mb-6">
            Don&apos;t see exactly what you need? Let&apos;s talk about your
            specific requirements.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-coral-orange hover:bg-coral-orange/90 text-white px-8 py-6 text-lg font-semibold group"
          >
            <Link href="/contact">
              Get Custom Quote
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
