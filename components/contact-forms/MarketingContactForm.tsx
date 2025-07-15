"use client";

import { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LoadingSpinner } from "@/components/layout/Loading";
import { Send, CheckCircle, ArrowRight } from "lucide-react";
import { z } from "zod";
import { analytics } from "@/lib/utils/analytics";

// Validation schema for marketing contact form (updated to match API endpoint)
const marketingContactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z
    .string()
    .min(10, "Please enter a valid phone number")
    .regex(/^[\+]?[1-9][\d]{0,15}$/, "Please enter a valid phone number"),
  company: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters"),
  website: z
    .string()
    .url("Please enter a valid website URL")
    .optional()
    .or(z.literal("")),
  subject: z
    .string()
    .min(2, "Subject must be at least 2 characters")
    .max(100, "Subject must be less than 100 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
  timeline: z.enum(
    ["asap", "1-3-months", "3-6-months", "6-plus-months", "exploring"],
    {
      required_error: "Please select your timeline",
    }
  ),
});

type MarketingContactData = z.infer<typeof marketingContactSchema>;

interface MarketingContactFormProps {
  location?: string;
  service?: string;
  price?: string;
  variant?: "default" | "compact" | "inline";
  onSuccess?: (data: MarketingContactData) => void;
  className?: string;
}

export function MarketingContactForm({
  location = "your area",
  service = "Website Design",
  price = "Starting at $2,999",
  onSuccess,
  className = "",
}: MarketingContactFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasStartedForm, setHasStartedForm] = useState(false);

  const form = useForm<MarketingContactData>({
    resolver: zodResolver(marketingContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      website: "",
      subject: `${service} Inquiry`,
      message: "",
      timeline: undefined,
    },
  });

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

  const onSubmit = async (data: MarketingContactData) => {
    setIsSubmitting(true);
    analytics.trackContact.formSubmit();

    try {
      // Prepare submission data to match the enhanced contact form API structure
      const submissionData = {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: `${data.message}\n\n--- Additional Information ---\nPhone: ${data.phone}\nCompany: ${data.company}\nWebsite: ${data.website || "Not provided"}\nService Interest: ${service}\nLocation: ${location}\nTimeline: ${data.timeline}\nSource: Marketing Landing Page`,
        company: data.company,
        timeline: data.timeline,
        // Add metadata for tracking
        formType: "marketing-landing",
        serviceInterest: service,
        location: location,
        price: price,
      };

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit form");
      }

      setIsSubmitted(true);
      toast.success("Thank you! We'll contact you within 24 hours.", {
        description: `Check your email for our ${service.toLowerCase()} guide!`,
        duration: 6000,
      });

      analytics.trackContact.formComplete();

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess(data);
      }

      // Redirect to thank you page after a short delay
      setTimeout(() => {
        router.push("/thank-you");
      }, 1500);

      // Reset form after a longer delay (in case user doesn't get redirected)
      setTimeout(() => {
        form.reset();
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error("Form submission error:", error);

      // Track form submission error
      analytics.trackError(
        "marketing_form_error",
        error instanceof Error ? error.message : "Unknown error",
        "MarketingContactForm"
      );

      toast.error(
        "Something went wrong. Please try again or call us directly.",
        {
          description: "Our team is standing by to help you!",
          duration: 5000,
        }
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const fieldVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3 },
    },
  };

  const timelineOptions = [
    { value: "asap", label: "ASAP" },
    { value: "1-3-months", label: "1-3 months" },
    { value: "3-6-months", label: "3-6 months" },
    { value: "6-plus-months", label: "6+ months" },
    { value: "exploring", label: "Just exploring" },
  ];

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className={`p-8 text-center ${className}`}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4"
        >
          <CheckCircle className="w-8 h-8 text-green-600" />
        </motion.div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h3>
        <p className="text-gray-600 mb-4">
          We&apos;ve received your information and will contact you within 24
          hours.
        </p>
        <p className="text-sm text-gray-500">
          Check your email for our free {service.toLowerCase()} guide!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={formVariants}
      initial="hidden"
      animate="visible"
      className={`${className}`}
    >
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Header */}
          <motion.div variants={fieldVariants} className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Get Your Free {service} Quote
            </h3>
            <p className="text-gray-600">
              Professional {service.toLowerCase()} for small businesses in{" "}
              {location}
            </p>
            <div className="mt-3">
              <span className="inline-flex items-center px-4 py-2 bg-coral-orange/10 text-coral-orange rounded-full text-sm font-semibold">
                {price} • Free Consultation
              </span>
            </div>
          </motion.div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div variants={fieldVariants} className="space-y-2">
              <Label
                htmlFor="name"
                className="text-sm font-medium text-gray-700"
              >
                Full Name *
              </Label>
              <Input
                id="name"
                {...form.register("name")}
                className="w-full"
                placeholder="John Smith"
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.name.message}
                </p>
              )}
            </motion.div>

            <motion.div variants={fieldVariants} className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email Address *
              </Label>
              <Input
                id="email"
                type="email"
                {...form.register("email")}
                className="w-full"
                placeholder="john@company.com"
              />
              {form.formState.errors.email && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.email.message}
                </p>
              )}
            </motion.div>

            <motion.div variants={fieldVariants} className="space-y-2">
              <Label
                htmlFor="phone"
                className="text-sm font-medium text-gray-700"
              >
                Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                {...form.register("phone")}
                className="w-full"
                placeholder="(555) 123-4567"
              />
              {form.formState.errors.phone && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.phone.message}
                </p>
              )}
            </motion.div>

            <motion.div variants={fieldVariants} className="space-y-2">
              <Label
                htmlFor="company"
                className="text-sm font-medium text-gray-700"
              >
                Company Name *
              </Label>
              <Input
                id="company"
                {...form.register("company")}
                className="w-full"
                placeholder="Your Business Name"
              />
              {form.formState.errors.company && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.company.message}
                </p>
              )}
            </motion.div>

            <motion.div
              variants={fieldVariants}
              className="space-y-2 md:col-span-2"
            >
              <Label
                htmlFor="website"
                className="text-sm font-medium text-gray-700"
              >
                Current Website (if any)
              </Label>
              <Input
                id="website"
                type="url"
                {...form.register("website")}
                className="w-full"
                placeholder="https://www.yourwebsite.com"
              />
              {form.formState.errors.website && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.website.message}
                </p>
              )}
            </motion.div>

            <motion.div
              variants={fieldVariants}
              className="space-y-2 md:col-span-2"
            >
              <Label
                htmlFor="subject"
                className="text-sm font-medium text-gray-700"
              >
                Subject *
              </Label>
              <Input
                id="subject"
                {...form.register("subject")}
                className="w-full"
                placeholder="Website Design Inquiry"
              />
              {form.formState.errors.subject && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.subject.message}
                </p>
              )}
            </motion.div>

            <motion.div variants={fieldVariants} className="space-y-2">
              <Label className="text-sm font-medium text-gray-700">
                Timeline *
              </Label>
              <div className="grid grid-cols-1 gap-2">
                {timelineOptions.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="radio"
                      value={option.value}
                      {...form.register("timeline")}
                      className="text-ocean-blue focus:ring-ocean-blue"
                    />
                    <span className="text-sm text-gray-700">
                      {option.label}
                    </span>
                  </label>
                ))}
              </div>
              {form.formState.errors.timeline && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.timeline.message}
                </p>
              )}
            </motion.div>

            <motion.div variants={fieldVariants} className="space-y-2">
              <Label
                htmlFor="message"
                className="text-sm font-medium text-gray-700"
              >
                Tell us about your project *
              </Label>
              <Textarea
                id="message"
                {...form.register("message")}
                className="w-full min-h-[100px]"
                placeholder={`What kind of ${service.toLowerCase()} do you need? Any specific features or requirements?`}
              />
              {form.formState.errors.message && (
                <p className="text-sm text-red-600">
                  {form.formState.errors.message.message}
                </p>
              )}
            </motion.div>
          </div>

          {/* Submit Button */}
          <motion.div variants={fieldVariants} className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-ocean-blue hover:bg-ocean-blue/90 text-white py-4 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-[1.02] disabled:transform-none"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <LoadingSpinner />
                  <span className="ml-2">Sending...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Send className="w-5 h-5 mr-2" />
                  Get My Free Quote
                  <ArrowRight className="w-5 h-5 ml-2" />
                </span>
              )}
            </Button>
            <p className="text-xs text-gray-500 text-center mt-3">
              We respect your privacy. Your information will never be shared.
            </p>
          </motion.div>
        </form>
      </FormProvider>
    </motion.div>
  );
}
