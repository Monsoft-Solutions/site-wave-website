"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  marketingContactFormSchema,
  type MarketingContactFormData,
} from "@/lib/utils/contact-form-validation";
import { analytics } from "@/lib/utils/analytics";
import { useFormTrackingData } from "@/lib/hooks/use-utm-tracking";

interface MarketingContactFormProps {
  location?: string;
  service?: string;
  price?: string;
  onSuccess?: (data: MarketingContactFormData) => void;
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

  // Get UTM tracking data for form submission
  const { getTrackingDataForSubmission } = useFormTrackingData();

  const form = useForm<MarketingContactFormData>({
    resolver: zodResolver(marketingContactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      website: "",
      subject: `${service} Inquiry`,
      message: "",
      timeline: undefined,
      // Metadata fields
      serviceInterest: service,
      location: location,
      formType: "marketing-landing",
      price: price,
      sourcePageUrl: typeof window !== "undefined" ? window.location.href : "",
      // UTM fields will be populated on form submission
      utmSource: undefined,
      utmMedium: undefined,
      utmCampaign: undefined,
      utmTerm: undefined,
      utmContent: undefined,
      referrerUrl: undefined,
      landingPageUrl: undefined,
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

  const onSubmit = async (data: MarketingContactFormData) => {
    setIsSubmitting(true);
    analytics.trackContact.formSubmit();

    try {
      // Get current UTM tracking data from session
      const trackingData = getTrackingDataForSubmission();

      // Prepare submission data with UTM tracking information
      const submissionData: MarketingContactFormData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        website: data.website || "",
        subject: data.subject,
        message: data.message, // Clean message without metadata
        timeline: data.timeline,
        // Metadata fields
        serviceInterest: service,
        location: location,
        formType: "marketing-landing",
        price: price,
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
        onSuccess(submissionData);
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

      if (error instanceof Error) {
        if (error.message.includes("Rate limit exceeded")) {
          toast.error("Too many submissions", {
            description: "Please wait a few minutes before trying again.",
            duration: 8000,
          });
        } else if (error.message.includes("Validation failed")) {
          toast.error("Please check your information", {
            description: "Make sure all required fields are filled correctly.",
            duration: 6000,
          });
        } else {
          toast.error("Submission failed", {
            description: "Please try again or contact us directly.",
            duration: 6000,
          });
        }
      } else {
        toast.error("Something went wrong", {
          description: "Please try again later.",
          duration: 6000,
        });
      }

      analytics.trackError(
        "form_submission_error",
        error instanceof Error ? error.message : "Unknown error",
        "MarketingContactForm"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className={className}>
        <CardContent className="p-6 text-center">
          <div className="space-y-4">
            <div className="flex items-center justify-center w-16 h-16 mx-auto bg-green-100 rounded-full">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900">Thank You!</h3>
            <p className="text-gray-600">
              We&apos;ll contact you within 24 hours with next steps for your{" "}
              {service.toLowerCase()} project in {location}.
            </p>
            <p className="text-sm text-gray-500">
              Check your email for our comprehensive {service.toLowerCase()}{" "}
              guide!
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-xl">
          Get Your Free {service} Consultation
        </CardTitle>
        <p className="text-gray-600">
          {price} - Serving {location} and surrounding areas
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div className="space-y-2">
            <Label htmlFor="name">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              {...form.register("name")}
              className="w-full"
            />
            {form.formState.errors.name && (
              <p className="text-sm text-red-600">
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              {...form.register("email")}
              className="w-full"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-600">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(555) 123-4567"
              {...form.register("phone")}
              className="w-full"
            />
            {form.formState.errors.phone && (
              <p className="text-sm text-red-600">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>

          {/* Company Field */}
          <div className="space-y-2">
            <Label htmlFor="company">
              Company Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="company"
              type="text"
              placeholder="Your business name"
              {...form.register("company")}
              className="w-full"
            />
            {form.formState.errors.company && (
              <p className="text-sm text-red-600">
                {form.formState.errors.company.message}
              </p>
            )}
          </div>

          {/* Website Field */}
          <div className="space-y-2">
            <Label htmlFor="website">Current Website (if any)</Label>
            <Input
              id="website"
              type="url"
              placeholder="https://your-current-website.com"
              {...form.register("website")}
              className="w-full"
            />
            {form.formState.errors.website && (
              <p className="text-sm text-red-600">
                {form.formState.errors.website.message}
              </p>
            )}
          </div>

          {/* Timeline Field */}
          <div className="space-y-2">
            <Label htmlFor="timeline">Project Timeline</Label>
            <Select
              onValueChange={(value) =>
                form.setValue(
                  "timeline",
                  value as
                    | "asap"
                    | "1-3-months"
                    | "3-6-months"
                    | "6-plus-months"
                    | "exploring",
                  {
                    shouldValidate: true,
                  }
                )
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="When do you need this completed?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="asap">ASAP</SelectItem>
                <SelectItem value="1-3-months">1-3 months</SelectItem>
                <SelectItem value="3-6-months">3-6 months</SelectItem>
                <SelectItem value="6-plus-months">6+ months</SelectItem>
                <SelectItem value="exploring">
                  Just exploring options
                </SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.timeline && (
              <p className="text-sm text-red-600">
                {form.formState.errors.timeline.message}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <Label htmlFor="message">
              Project Details <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="message"
              placeholder={`Tell us about your ${service.toLowerCase()} needs...`}
              rows={4}
              {...form.register("message")}
              className="w-full"
            />
            {form.formState.errors.message && (
              <p className="text-sm text-red-600">
                {form.formState.errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Sending...
              </>
            ) : (
              `Get Your Free ${service} Consultation`
            )}
          </Button>

          {/* Trust Indicators */}
          <div className="text-center text-sm text-gray-500 mt-4">
            <p>
              ✓ Free consultation • ✓ No obligation • ✓ Response within 24hrs
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
