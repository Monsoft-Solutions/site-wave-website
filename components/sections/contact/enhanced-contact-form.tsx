"use client";

import { useState, useEffect, useMemo } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { FormField } from "@/components/forms/FormField";
import { LoadingSpinner } from "@/components/layout/Loading";
import {
  enhancedContactFormSchema,
  type EnhancedContactFormData,
} from "@/lib/utils/contact-form-validation";
import { ContactFormResponse } from "@/lib/types/contact-submission.type";
import { analytics } from "@/lib/utils/analytics";
import { useServices } from "@/lib/hooks/use-services.hook";
import { ServiceWithRelations } from "@/lib/types/service-with-relations.type";
import { useFormTrackingData } from "@/lib/hooks/use-utm-tracking";
import {
  Send,
  User,
  MessageSquare,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  Sparkles,
  Clock,
  Briefcase,
  FileText,
  Heart,
  Search,
  X,
  Star,
  Globe,
  Smartphone,
  TrendingUp,
  Bot,
  Palette,
  Zap,
} from "lucide-react";

// Form configuration constants
const FORM_CONFIG = {
  TOTAL_STEPS: 4,
  FEATURED_SERVICES_COUNT: 6,
} as const;

// HTTP status codes
const HTTP_STATUS = {
  BAD_REQUEST: 400,
  TOO_MANY_REQUESTS: 429,
} as const;

// Error messages
const ERROR_MESSAGES = {
  RATE_LIMIT_EXCEEDED: "Rate limit exceeded",
  VALIDATION_FAILED: "Validation failed",
  SEND_FAILED: "Failed to send message",
  GENERIC_ERROR: "Unknown error",
  RATE_LIMIT_DESCRIPTION: "Too many submissions. Please try again later.",
  VALIDATION_DESCRIPTION: "Please check your form data and try again.",
  RETRY_DESCRIPTION: "Please try again later.",
} as const;

// Success messages
const SUCCESS_MESSAGES = {
  MESSAGE_SENT: "Message sent successfully!",
  RESPONSE_DESCRIPTION: "We'll get back to you as soon as possible.",
} as const;

// Type definitions
type BudgetId =
  | "under-10k"
  | "10k-25k"
  | "25k-50k"
  | "50k-100k"
  | "100k+"
  | "not-sure";

type TimelineId =
  | "asap"
  | "1-2-months"
  | "3-6-months"
  | "6-12-months"
  | "flexible";

type ServiceViewMode = "featured" | "all" | "category";

interface BudgetRange {
  id: BudgetId;
  label: string;
  icon: string;
}

interface TimelineOption {
  id: TimelineId;
  label: string;
  icon: string;
}

// Service category icons mapping for UI
const categoryIcons: Record<string, string> = {
  Development: "🌐",
  Design: "🎨",
  Consulting: "💡",
  Marketing: "📈",
  Support: "🛠️",
};

// Icon mapping for services (matching site-wave-services-grid.tsx)
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

// Featured service titles (matching site-wave-services-grid.tsx)
const FEATURED_SERVICES = [
  "Custom Website Development",
  "Website Redesign & Optimization",
  "Local SEO Optimization",
  "E-commerce Solutions",
  "Google Business Profile Management",
  "Social Media Setup & Content",
];

// Budget ranges
const budgetRanges: BudgetRange[] = [
  { id: "under-10k", label: "Under $10k", icon: "💰" },
  { id: "10k-25k", label: "$10k - $25k", icon: "💎" },
  { id: "25k-50k", label: "$25k - $50k", icon: "🏆" },
  { id: "50k-100k", label: "$50k - $100k", icon: "🚀" },
  { id: "100k+", label: "$100k+", icon: "⭐" },
  { id: "not-sure", label: "Not sure yet", icon: "🤔" },
];

// Timeline options
const timelineOptions: TimelineOption[] = [
  { id: "asap", label: "ASAP", icon: "⚡" },
  { id: "1-2-months", label: "1-2 months", icon: "📅" },
  { id: "3-6-months", label: "3-6 months", icon: "🗓️" },
  { id: "6-12-months", label: "6-12 months", icon: "📆" },
  { id: "flexible", label: "Flexible", icon: "🕰️" },
];

/**
 * Enhanced contact form with multi-step workflow
 */
export function EnhancedContactForm(): React.JSX.Element {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hasStartedForm, setHasStartedForm] = useState<boolean>(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string>("");
  const [selectedBudget, setSelectedBudget] = useState<BudgetId | "">("");
  const [selectedTimeline, setSelectedTimeline] = useState<TimelineId | "">("");

  // Service filtering states
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ServiceViewMode>("featured");

  // Fetch services from database
  const {
    data: services,
    isLoading: servicesLoading,
    error: servicesError,
  } = useServices();

  // Get UTM tracking data for form submission
  const { getTrackingDataForSubmission } = useFormTrackingData();

  const form = useForm<EnhancedContactFormData>({
    resolver: zodResolver(enhancedContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      company: "",
      phone: "",
      // UTM fields will be populated on form submission
      utmSource: undefined,
      utmMedium: undefined,
      utmCampaign: undefined,
      utmTerm: undefined,
      utmContent: undefined,
      referrerUrl: undefined,
      landingPageUrl: undefined,
    },
    mode: "onChange",
  });

  // Extract unique categories from services
  const categories = useMemo(() => {
    if (!services) return [];
    return Array.from(new Set(services.map((service) => service.category)));
  }, [services]);

  // Smart filtering logic for services
  const filteredServices = useMemo(() => {
    if (!services) return { services: [], isComplete: true, remainingCount: 0 };

    let filtered = services;

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (service) =>
          service.title.toLowerCase().includes(query) ||
          service.shortDescription.toLowerCase().includes(query) ||
          service.category.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (selectedCategory) {
      filtered = filtered.filter(
        (service) => service.category === selectedCategory
      );
    }

    // Apply view mode logic
    if (!selectedCategory && viewMode === "featured" && !searchQuery.trim()) {
      // Show featured services first
      const featuredServices = filtered.filter((service) =>
        FEATURED_SERVICES.includes(service.title)
      );
      const remainingServices = filtered.filter(
        (service) => !FEATURED_SERVICES.includes(service.title)
      );

      // Combine featured + some remaining to reach FEATURED_SERVICES_COUNT
      const displayServices = [
        ...featuredServices,
        ...remainingServices.slice(
          0,
          Math.max(
            0,
            FORM_CONFIG.FEATURED_SERVICES_COUNT - featuredServices.length
          )
        ),
      ].slice(0, FORM_CONFIG.FEATURED_SERVICES_COUNT);

      return {
        services: displayServices,
        isComplete: false,
        remainingCount: services.length - displayServices.length,
      };
    }

    return {
      services: filtered,
      isComplete: true,
      remainingCount: 0,
    };
  }, [services, searchQuery, selectedCategory, viewMode]);

  // Track form start when user first interacts with any field
  useEffect(() => {
    const subscription = form.watch(() => {
      if (!hasStartedForm) {
        analytics.trackContact.formStart();
        setHasStartedForm(true);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, hasStartedForm]);

  /**
   * Get the icon for a service
   */
  const getServiceIcon = (title: string, category: string) => {
    const key = title as keyof typeof serviceIcons;
    const categoryKey = category as keyof typeof serviceIcons;
    return (
      serviceIcons[key] || serviceIcons[categoryKey] || serviceIcons.default
    );
  };

  /**
   * Check if a service is featured/popular
   */
  const isServicePopular = (service: ServiceWithRelations): boolean => {
    return (
      service.title.includes("Website") ||
      service.title.includes("SEO") ||
      FEATURED_SERVICES.includes(service.title)
    );
  };

  /**
   * Handle category filter change
   */
  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    if (category === null) {
      setViewMode("featured");
    } else {
      setViewMode("category");
    }
  };

  /**
   * Handle view all services
   */
  const handleViewAllServices = () => {
    setViewMode("all");
    setSelectedCategory(null);
  };

  /**
   * Clear search and filters
   */
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory(null);
    setViewMode("featured");
  };

  /**
   * Navigate to next step
   */
  const nextStep = (): void => {
    if (currentStep < FORM_CONFIG.TOTAL_STEPS) {
      setCurrentStep(currentStep + 1);
    }
  };

  /**
   * Navigate to previous step
   */
  const prevStep = (): void => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  /**
   * Handle form submission
   */
  const onSubmit = async (data: EnhancedContactFormData): Promise<void> => {
    console.log('🚀 Form submission started', { data, selectedServiceId, selectedBudget, selectedTimeline });

    // Prevent double submission
    if (isSubmitting) {
      console.log('⚠️ Already submitting, preventing double submission');
      return;
    }

    setIsSubmitting(true);
    console.log('✅ Set isSubmitting to true');

    try {
      analytics.trackContact.formSubmit();
      console.log('📊 Analytics tracked');

      // Check if services are loaded
      console.log('🔍 Checking if services are loaded...');
      if (!services || services.length === 0) {
        console.log('❌ Services not loaded yet');
        toast.error("Please wait for services to load and try again");
        setIsSubmitting(false);
        return;
      }

      // Validate required fields before submission
      console.log('🔍 Validating required fields...');
      if (!selectedServiceId || !selectedBudget || !selectedTimeline) {
        console.log('❌ Validation failed - missing required fields', {
          selectedServiceId,
          selectedBudget,
          selectedTimeline
        });
        toast.error("Please complete all required fields");
        setIsSubmitting(false);
        return;
      }
      console.log('✅ Required fields validation passed');

      // Get the selected service to extract the title
      const selectedService = services?.find((s) => s.id === selectedServiceId);
      console.log('🔍 Selected service:', selectedService);

      // Get current UTM tracking data from session
      console.log('🔍 Getting tracking data...');
      const trackingData = getTrackingDataForSubmission();
      console.log('📊 Tracking data:', trackingData);

      const submissionData = {
        ...data,
        serviceId: selectedServiceId,
        budget: selectedBudget,
        timeline: selectedTimeline,
        // Add metadata fields
        serviceInterest: selectedService?.title || null,
        formType: "enhanced",
        // Add source page URL for tracking
        sourcePageUrl: trackingData.source_page_url,
        // UTM tracking fields from session
        utmSource: trackingData.utm_source,
        utmMedium: trackingData.utm_medium,
        utmCampaign: trackingData.utm_campaign,
        utmTerm: trackingData.utm_term,
        utmContent: trackingData.utm_content,
        referrerUrl: trackingData.referrer_url,
        landingPageUrl: trackingData.landing_page_url,
      };

      console.log('📦 Submission data prepared:', submissionData);
      console.log('🌐 Making API request to /api/contact...');

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      console.log('📡 API response received:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok
      });

      // Handle response parsing with error handling
      console.log('🔍 Parsing response...');
      let result: ContactFormResponse;
      try {
        result = await response.json();
        console.log('✅ Response parsed successfully:', result);
      } catch (parseError) {
        console.error("❌ Failed to parse response:", parseError);
        throw new Error("Invalid response from server");
      }

      if (!response.ok) {
        console.log('❌ Response not OK, handling error...');
        if (response.status === HTTP_STATUS.TOO_MANY_REQUESTS) {
          console.log('⚠️ Rate limit exceeded');
          toast.error(ERROR_MESSAGES.RATE_LIMIT_EXCEEDED, {
            description:
              result.message || ERROR_MESSAGES.RATE_LIMIT_DESCRIPTION,
          });
          setIsSubmitting(false);
          return;
        }

        if (response.status === HTTP_STATUS.BAD_REQUEST) {
          console.log('⚠️ Bad request - validation failed');
          toast.error(ERROR_MESSAGES.VALIDATION_FAILED, {
            description: result.error || ERROR_MESSAGES.VALIDATION_DESCRIPTION,
          });
          setIsSubmitting(false);
          return;
        }

        console.log('❌ Other error:', result.error);
        throw new Error(result.error || ERROR_MESSAGES.SEND_FAILED);
      }

      console.log('🎉 Success! Showing success message...');
      toast.success(SUCCESS_MESSAGES.MESSAGE_SENT, {
        description: result.message || SUCCESS_MESSAGES.RESPONSE_DESCRIPTION,
      });

      console.log('📊 Tracking form completion...');
      analytics.trackContact.formComplete();

      console.log('🔄 Resetting form state...');
      // Reset form state
      form.reset();
      setCurrentStep(1);
      setSelectedServiceId("");
      setSelectedBudget("");
      setSelectedTimeline("");
      setHasStartedForm(false);
      clearFilters();

      console.log('🎯 Redirecting to thank you page...');
      // Redirect to thank you page after a short delay
      router.push("/thank-you");
    } catch (error) {
      console.error("❌ Contact form error:", error);

      const errorMessage =
        error instanceof Error ? error.message : ERROR_MESSAGES.GENERIC_ERROR;
      analytics.trackError(
        "contact_form_error",
        errorMessage,
        "EnhancedContactForm"
      );

      toast.error(ERROR_MESSAGES.SEND_FAILED, {
        description:
          error instanceof Error
            ? error.message
            : ERROR_MESSAGES.RETRY_DESCRIPTION,
      });
    } finally {
      console.log('🔄 Finally block: setting isSubmitting to false');
      setIsSubmitting(false);
    }
  };

  /**
   * Check if current step is valid
   */
  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return selectedServiceId !== "";
      case 2:
        return selectedBudget !== "" && selectedTimeline !== "";
      case 3:
        return form.watch("name") !== "" && form.watch("email") !== "";
      case 4:
        return form.watch("message") !== "";
      default:
        return false;
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-muted/5 via-background to-accent/5">
      <div className="container">
        <div className="mx-auto max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              <MessageSquare className="w-3 h-3 mr-1" />
              Tell Us About Your Project
            </Badge>
            <h2 className="text-3xl font-bold mb-4">
              Let&apos;s Create Something Amazing Together
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Share your vision with us. This quick form helps us understand
              your needs so we can provide the most relevant information and
              next steps.
            </p>
          </div>

          <Card className="glass-card overflow-hidden">
            {/* Progress Bar */}
            <div className="p-6 border-b bg-muted/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">
                  Step {currentStep} of {FORM_CONFIG.TOTAL_STEPS}
                </h3>
                <span className="text-sm text-muted-foreground">
                  {Math.round((currentStep / FORM_CONFIG.TOTAL_STEPS) * 100)}%
                  Complete
                </span>
              </div>
              <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-primary rounded-full transition-all duration-500 ease-in-out"
                  style={{
                    width: `${(currentStep / FORM_CONFIG.TOTAL_STEPS) * 100}%`,
                  }}
                />
              </div>
            </div>

            <CardContent className="py-8 p-0 class-name">
              <FormProvider {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="px-6">
                  {/* Step 1: Project Type with Enhanced Filtering */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="text-center mb-8">
                        <Briefcase className="w-12 h-12 text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                          What type of project do you have in mind?
                        </h3>
                        <p className="text-muted-foreground">
                          This helps us understand your needs better
                        </p>
                      </div>

                      {servicesLoading ? (
                        <div className="flex justify-center items-center py-8">
                          <LoadingSpinner className="mr-2" />
                          <span>Loading services...</span>
                        </div>
                      ) : servicesError ? (
                        <div className="text-center py-8 text-red-500">
                          <p>
                            Failed to load services. Please try again later.
                          </p>
                        </div>
                      ) : (
                        <>
                          {/* Search and Filter Section */}
                          <div className="space-y-4 mb-8">
                            {/* Search Bar */}
                            <div className="relative">
                              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                              <Input
                                type="text"
                                placeholder="Search services..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 pr-10"
                              />
                              {searchQuery && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                                  onClick={() => setSearchQuery("")}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              )}
                            </div>

                            {/* Category Filters */}
                            <div className="flex flex-wrap justify-center gap-2">
                              <Badge
                                variant={
                                  selectedCategory === null
                                    ? "default"
                                    : "secondary"
                                }
                                className={`cursor-pointer px-4 py-2 text-sm transition-all font-medium ${
                                  selectedCategory === null
                                    ? "bg-primary text-white hover:bg-primary/90"
                                    : "bg-background hover:bg-primary/10 text-muted-foreground hover:text-primary"
                                }`}
                                onClick={() => handleCategoryChange(null)}
                              >
                                All Services
                                {selectedCategory === null &&
                                  viewMode === "featured" && (
                                    <span className="ml-1 text-xs opacity-80">
                                      (Featured)
                                    </span>
                                  )}
                              </Badge>
                              {categories.map((category: string) => (
                                <Badge
                                  key={category}
                                  variant={
                                    selectedCategory === category
                                      ? "default"
                                      : "secondary"
                                  }
                                  className={`cursor-pointer px-4 py-2 text-sm transition-all font-medium ${
                                    selectedCategory === category
                                      ? "bg-primary text-white hover:bg-primary/90"
                                      : "bg-background hover:bg-primary/10 text-muted-foreground hover:text-primary"
                                  }`}
                                  onClick={() => handleCategoryChange(category)}
                                >
                                  <span className="mr-1">
                                    {categoryIcons[category] || "🔧"}
                                  </span>
                                  {category}
                                </Badge>
                              ))}
                            </div>

                            {/* Results Count */}
                            <div className="flex justify-between items-center text-sm text-muted-foreground">
                              <span>
                                {searchQuery.trim() ? (
                                  `Found ${filteredServices.services.length} service${filteredServices.services.length !== 1 ? "s" : ""} for "${searchQuery}"`
                                ) : viewMode === "featured" &&
                                  !selectedCategory ? (
                                  <>
                                    Showing {filteredServices.services.length}{" "}
                                    featured services
                                    {filteredServices.remainingCount > 0 && (
                                      <span>
                                        {" "}
                                        • {filteredServices.remainingCount} more
                                        available
                                      </span>
                                    )}
                                  </>
                                ) : (
                                  `Showing ${filteredServices.services.length} service${filteredServices.services.length !== 1 ? "s" : ""}`
                                )}
                              </span>

                              {(searchQuery.trim() || selectedCategory) && (
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={clearFilters}
                                  className="gap-1 text-primary hover:text-primary hover:bg-primary/10"
                                >
                                  <X className="w-3 h-3" />
                                  Clear filters
                                </Button>
                              )}
                            </div>
                          </div>

                          {/* Services Grid */}
                          {filteredServices.services.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {filteredServices.services.map(
                                (service: ServiceWithRelations) => {
                                  const ServiceIcon = getServiceIcon(
                                    service.title,
                                    service.category
                                  );
                                  const isPopular = isServicePopular(service);

                                  return (
                                    <div
                                      key={service.id}
                                      className={`relative p-4 border-2 rounded-2xl cursor-pointer transition-all hover:scale-105 active:scale-95 ${
                                        selectedServiceId === service.id
                                          ? "border-primary bg-primary/5"
                                          : isPopular
                                            ? "border-primary/30 bg-primary/5 hover:border-primary/50"
                                            : "border-border hover:border-primary/50"
                                      }`}
                                      onClick={() =>
                                        setSelectedServiceId(service.id)
                                      }
                                    >
                                      {isPopular &&
                                        selectedServiceId !== service.id && (
                                          <div className="absolute -top-2 right-2 z-10">
                                            <Badge
                                              variant="secondary"
                                              className="bg-orange-100 text-orange-600 border-orange-200 text-xs"
                                            >
                                              Popular
                                            </Badge>
                                          </div>
                                        )}

                                      <div className="flex items-start space-x-3">
                                        <div
                                          className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                            isPopular
                                              ? "bg-primary text-white"
                                              : "bg-primary/10 text-primary"
                                          }`}
                                        >
                                          <ServiceIcon className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                          <h4 className="font-medium text-foreground mb-1">
                                            {service.title}
                                          </h4>
                                          <p className="text-sm text-muted-foreground line-clamp-2">
                                            {service.shortDescription}
                                          </p>
                                          <div className="flex items-center gap-2 mt-2">
                                            <Badge
                                              variant="outline"
                                              className="text-xs"
                                            >
                                              {service.category}
                                            </Badge>
                                            {service.pricing?.[0]?.price && (
                                              <span className="text-xs text-muted-foreground">
                                                From {service.pricing[0].price}
                                              </span>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                      {selectedServiceId === service.id && (
                                        <CheckCircle className="absolute top-4 right-4 w-5 h-5 text-primary" />
                                      )}
                                    </div>
                                  );
                                }
                              )}
                            </div>
                          ) : (
                            /* No Services Found */
                            <div className="text-center py-8">
                              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                                <Search className="w-8 h-8 text-muted-foreground" />
                              </div>
                              <h4 className="font-medium mb-2">
                                No services found
                              </h4>
                              <p className="text-sm text-muted-foreground mb-4">
                                {searchQuery.trim()
                                  ? `No services match "${searchQuery}". Try a different search term or browse by category.`
                                  : selectedCategory
                                    ? `No services found in the ${selectedCategory} category.`
                                    : "No services are currently available."}
                              </p>
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={clearFilters}
                                className="gap-2"
                              >
                                View All Services
                              </Button>
                            </div>
                          )}

                          {/* View All Services Button for Featured Mode */}
                          {!selectedCategory &&
                            viewMode === "featured" &&
                            !searchQuery.trim() &&
                            filteredServices.remainingCount > 0 && (
                              <div className="text-center mt-6">
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={handleViewAllServices}
                                  className="gap-2"
                                >
                                  View All {services?.length || 0} Services
                                  <ArrowRight className="w-4 h-4" />
                                </Button>
                              </div>
                            )}
                        </>
                      )}
                    </div>
                  )}

                  {/* Step 2: Budget and Timeline */}
                  {currentStep === 2 && (
                    <div className="space-y-8">
                      {/* Budget Selection */}
                      <div>
                        <div className="text-center mb-6">
                          <Heart className="w-12 h-12 text-primary mx-auto mb-4" />
                          <h3 className="text-xl font-semibold mb-2">
                            What&apos;s your budget range?
                          </h3>
                          <p className="text-muted-foreground">
                            This helps us recommend the best approach
                          </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {budgetRanges.map((budget) => (
                            <div
                              key={budget.id}
                              className={`p-3 border-2 rounded-xl cursor-pointer text-center transition-all hover:scale-105 active:scale-95 ${
                                selectedBudget === budget.id
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/50"
                              }`}
                              onClick={() => setSelectedBudget(budget.id)}
                            >
                              <span className="text-lg block mb-1">
                                {budget.icon}
                              </span>
                              <span className="text-sm font-medium">
                                {budget.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Timeline Selection */}
                      <div>
                        <div className="text-center mb-6">
                          <Clock className="w-12 h-12 text-primary mx-auto mb-4" />
                          <h3 className="text-xl font-semibold mb-2">
                            When would you like to start?
                          </h3>
                          <p className="text-muted-foreground">
                            Understanding your timeline helps us plan
                            accordingly
                          </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {timelineOptions.map((timeline) => (
                            <div
                              key={timeline.id}
                              className={`p-3 border-2 rounded-xl cursor-pointer text-center transition-all hover:scale-105 active:scale-95 ${
                                selectedTimeline === timeline.id
                                  ? "border-primary bg-primary/5"
                                  : "border-border hover:border-primary/50"
                              }`}
                              onClick={() => setSelectedTimeline(timeline.id)}
                            >
                              <span className="text-lg block mb-1">
                                {timeline.icon}
                              </span>
                              <span className="text-sm font-medium">
                                {timeline.label}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Contact Information */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="text-center mb-8">
                        <User className="w-12 h-12 text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                          Let&apos;s get to know you
                        </h3>
                        <p className="text-muted-foreground">
                          Your contact information helps us reach out with the
                          right details
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          name="name"
                          label="Full Name"
                          placeholder="John Doe"
                          required
                        />
                        <FormField
                          name="email"
                          label="Email Address"
                          type="email"
                          placeholder="john@example.com"
                          required
                        />
                        <FormField
                          name="phone"
                          label="Phone Number (Optional)"
                          type="tel"
                          placeholder="(555) 123-4567"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          name="company"
                          label="Company (Optional)"
                          placeholder="Your Company"
                        />
                        <FormField
                          name="subject"
                          label="Project Title"
                          placeholder="My Awesome Project"
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 4: Project Details */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div className="text-center mb-8">
                        <FileText className="w-12 h-12 text-primary mx-auto mb-4" />
                        <h3 className="text-xl font-semibold mb-2">
                          Tell us about your project
                        </h3>
                        <p className="text-muted-foreground">
                          The more details you share, the better we can help you
                        </p>
                      </div>

                      <div className="space-y-2">
                        <label
                          htmlFor="message"
                          className="text-sm font-medium"
                        >
                          Project Description{" "}
                          <span className="text-destructive">*</span>
                        </label>
                        <textarea
                          id="message"
                          {...form.register("message")}
                          rows={8}
                          className="flex min-h-[200px] w-full rounded-xl border border-input bg-background px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                          placeholder="Describe your project, goals, and any specific requirements you have in mind. Include any relevant details about features, target audience, or technical preferences..."
                        />
                        {form.formState.errors.message && (
                          <p className="text-sm text-destructive">
                            {form.formState.errors.message.message}
                          </p>
                        )}
                      </div>

                      {/* Project Summary */}
                      <div className="p-4 bg-muted/50 rounded-xl">
                        <h4 className="font-medium mb-2 flex items-center">
                          <Sparkles className="w-4 h-4 mr-2 text-primary" />
                          Project Summary
                        </h4>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <p>
                            <strong>Service:</strong>{" "}
                            {services?.find((s) => s.id === selectedServiceId)
                              ?.title || "Not selected"}
                          </p>
                          <p>
                            <strong>Budget:</strong>{" "}
                            {budgetRanges.find((b) => b.id === selectedBudget)
                              ?.label || "Not selected"}
                          </p>
                          <p>
                            <strong>Timeline:</strong>{" "}
                            {timelineOptions.find(
                              (t) => t.id === selectedTimeline
                            )?.label || "Not selected"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8 pt-6 border-t">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className="flex items-center"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Previous
                    </Button>

                    {currentStep < FORM_CONFIG.TOTAL_STEPS ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        disabled={!isStepValid(currentStep)}
                        className="flex items-center"
                      >
                        Next
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={isSubmitting || !isStepValid(currentStep)}
                        className="flex items-center"
                        onClick={() => console.log('🖱️ Submit button clicked', { isSubmitting, isStepValid: isStepValid(currentStep) })}
                      >
                        {isSubmitting ? (
                          <>
                            <LoadingSpinner className="mr-2" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <Send className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              </FormProvider>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
