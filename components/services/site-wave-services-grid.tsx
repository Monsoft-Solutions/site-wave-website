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
  ChevronDown,
  Grid3X3,
  List,
} from "lucide-react";
import { Service } from "@/lib/types/service.type";

interface SiteWaveServicesGridProps {
  services: Service[];
  categories: string[];
  isLoading: boolean;
  error?: string | null;
}

// Configuration constants
const SERVICES_PER_PAGE = 9; // 3x3 grid - clean visual layout
const FEATURED_SERVICES_COUNT = 6; // Show top 6 featured services initially

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

// Featured service titles (you can customize this list)
const FEATURED_SERVICES = [
  "Custom Website Development",
  "Website Redesign & Optimization",
  "Local SEO Optimization",
  "E-commerce Solutions",
  "Google Business Profile Management",
  "Social Media Setup & Content",
];

export function SiteWaveServicesGrid({
  services,
  categories,
  isLoading,
  error,
}: SiteWaveServicesGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<"featured" | "all" | "category">(
    "featured"
  );
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Smart filtering and pagination logic
  const getDisplayServices = () => {
    let filteredServices = services;

    // Apply category filter if selected
    if (selectedCategory) {
      filteredServices = services.filter(
        (service) => service.category === selectedCategory
      );
      setViewMode("category");
      return {
        services: filteredServices,
        totalPages: Math.ceil(filteredServices.length / SERVICES_PER_PAGE),
        showPagination: filteredServices.length > SERVICES_PER_PAGE,
        isComplete: true,
      };
    }

    // If "All Services" is selected, show based on view mode
    if (viewMode === "featured") {
      // Show featured services first
      const featuredServices = services.filter((service) =>
        FEATURED_SERVICES.includes(service.title)
      );
      const remainingServices = services.filter(
        (service) => !FEATURED_SERVICES.includes(service.title)
      );

      // Combine featured + some remaining to reach FEATURED_SERVICES_COUNT
      const displayServices = [
        ...featuredServices,
        ...remainingServices.slice(
          0,
          Math.max(0, FEATURED_SERVICES_COUNT - featuredServices.length)
        ),
      ].slice(0, FEATURED_SERVICES_COUNT);

      return {
        services: displayServices,
        totalPages: 1,
        showPagination: false,
        isComplete: false,
        remainingCount: services.length - displayServices.length,
      };
    }

    // Show all services with pagination
    const startIndex = (currentPage - 1) * SERVICES_PER_PAGE;
    const endIndex = startIndex + SERVICES_PER_PAGE;
    const paginatedServices = filteredServices.slice(startIndex, endIndex);

    return {
      services: paginatedServices,
      totalPages: Math.ceil(filteredServices.length / SERVICES_PER_PAGE),
      showPagination: filteredServices.length > SERVICES_PER_PAGE,
      isComplete: true,
    };
  };

  const displayData = getDisplayServices();

  // Reset pagination when category changes
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    if (category === null) {
      setViewMode("featured");
    }
  };

  const handleViewAllServices = () => {
    setViewMode("all");
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of services grid
    const element = document.getElementById("services-grid");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
      id="services-grid"
      className="py-20 bg-gradient-to-b from-ocean-blue/10 to-soft-sand/30"
    >
      <div className="container" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-deep-navy mb-4">
            Our Digital Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From stunning websites to powerful automation, we provide complete
            digital solutions for Southwest Florida businesses.
          </p>
        </motion.div>

        {/* Category Filters */}
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
            onClick={() => handleCategoryChange(null)}
          >
            All Services
            {selectedCategory === null && viewMode === "featured" && (
              <span className="ml-1 text-xs opacity-80">(Featured)</span>
            )}
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
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </Badge>
          ))}
        </motion.div>

        {/* Services Count and View Toggle */}
        {!selectedCategory && (
          <motion.div
            className="flex justify-between items-center mb-8"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="text-sm text-muted-foreground">
              {viewMode === "featured" ? (
                <span>
                  Showing {displayData.services.length} featured services
                  {displayData.remainingCount &&
                    displayData.remainingCount > 0 && (
                      <span>
                        {" "}
                        • {displayData.remainingCount} more available
                      </span>
                    )}
                </span>
              ) : (
                <span>
                  Showing {(currentPage - 1) * SERVICES_PER_PAGE + 1}-
                  {Math.min(currentPage * SERVICES_PER_PAGE, services.length)}{" "}
                  of {services.length} services
                </span>
              )}
            </div>

            {viewMode === "featured" &&
              displayData.remainingCount &&
              displayData.remainingCount > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleViewAllServices}
                  className="gap-2 text-ocean-blue border-ocean-blue hover:bg-ocean-blue hover:text-white"
                >
                  <Grid3X3 className="w-4 h-4" />
                  View All Services
                </Button>
              )}
          </motion.div>
        )}

        {/* Services Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {displayData.services.map((service) => {
            const ServiceIcon = getServiceIcon(service.title, service.category);
            const isPopular =
              service.title.includes("Website") ||
              service.title.includes("SEO") ||
              FEATURED_SERVICES.includes(service.title);

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

        {/* Load More Section for Featured View */}
        {!selectedCategory &&
          viewMode === "featured" &&
          displayData.remainingCount &&
          displayData.remainingCount > 0 && (
            <motion.div
              className="text-center mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="max-w-md mx-auto">
                <p className="text-muted-foreground mb-6">
                  We have {displayData.remainingCount} more services to help
                  grow your business.
                </p>
                <Button
                  onClick={handleViewAllServices}
                  size="lg"
                  className="bg-ocean-blue hover:bg-ocean-blue/90 text-white px-8 py-3 gap-3"
                >
                  View All {services.length} Services
                  <ChevronDown className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>
          )}

        {/* Pagination for All Services View and Category View */}
        {displayData.showPagination && displayData.totalPages > 1 && (
          <motion.div
            className="mt-12 flex justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="gap-2"
              >
                Previous
              </Button>

              {/* Page Numbers */}
              <div className="hidden sm:flex items-center gap-1">
                {[...Array(displayData.totalPages)].map((_, i) => {
                  const pageNum = i + 1;
                  const isCurrentPage = pageNum === currentPage;

                  // Show first, last, current, and adjacent pages
                  const showPage =
                    pageNum === 1 ||
                    pageNum === displayData.totalPages ||
                    Math.abs(pageNum - currentPage) <= 1;

                  if (!showPage) {
                    // Show ellipsis for gaps
                    if (pageNum === 2 && currentPage > 4) {
                      return (
                        <span
                          key={pageNum}
                          className="px-2 text-muted-foreground"
                        >
                          ...
                        </span>
                      );
                    }
                    if (
                      pageNum === displayData.totalPages - 1 &&
                      currentPage < displayData.totalPages - 3
                    ) {
                      return (
                        <span
                          key={pageNum}
                          className="px-2 text-muted-foreground"
                        >
                          ...
                        </span>
                      );
                    }
                    return null;
                  }

                  return (
                    <Button
                      key={pageNum}
                      variant={isCurrentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePageChange(pageNum)}
                      className={
                        isCurrentPage
                          ? "bg-ocean-blue hover:bg-ocean-blue/90"
                          : ""
                      }
                    >
                      {pageNum}
                    </Button>
                  );
                })}
              </div>

              {/* Mobile page indicator */}
              <div className="sm:hidden px-4 py-2 text-sm text-muted-foreground">
                {currentPage} of {displayData.totalPages}
              </div>

              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === displayData.totalPages}
                className="gap-2"
              >
                Next
              </Button>
            </div>
          </motion.div>
        )}

        {/* No Services Message */}
        {displayData.services.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-md mx-auto">
              <h3 className="text-xl font-semibold text-deep-navy mb-2">
                No services found
              </h3>
              <p className="text-muted-foreground mb-6">
                {selectedCategory
                  ? `No services found in the ${selectedCategory} category.`
                  : "No services are currently available."}
              </p>
              {selectedCategory && (
                <Button
                  variant="outline"
                  onClick={() => handleCategoryChange(null)}
                  className="gap-2"
                >
                  <List className="w-4 h-4" />
                  View All Services
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
