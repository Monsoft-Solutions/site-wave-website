import { z } from "zod";

// Common validation messages
export const validationMessages = {
  required: (field: string) => `${field} is required`,
  email: "Please enter a valid email address",
  min: (field: string, length: number) =>
    `${field} must be at least ${length} characters`,
  max: (field: string, length: number) =>
    `${field} must be at most ${length} characters`,
  url: "Please enter a valid URL",
  phone: "Please enter a valid phone number",
};

// Common field schemas
export const emailSchema = z
  .string()
  .min(1, validationMessages.required("Email"))
  .email(validationMessages.email);

export const nameSchema = z
  .string()
  .min(1, validationMessages.required("Name"))
  .min(2, validationMessages.min("Name", 2))
  .max(100, validationMessages.max("Name", 100));

export const phoneSchema = z
  .string()
  .regex(/^[\d\s()+-]+$/, validationMessages.phone)
  .optional();

export const urlSchema = z.string().url(validationMessages.url).optional();

// Service ID validation (replaces project type validation)
export const serviceIdSchema = z
  .string()
  .uuid("Please select a valid service")
  .optional();

// Budget range validation
export const budgetRangeSchema = z
  .enum(["under-10k", "10k-25k", "25k-50k", "50k-100k", "100k+", "not-sure"])
  .optional();

// Timeline validation
export const timelineSchema = z
  .enum(["asap", "1-2-months", "3-6-months", "6-12-months", "flexible"])
  .optional();

// Marketing form timeline validation
export const marketingTimelineSchema = z
  .enum(["asap", "1-3-months", "3-6-months", "6-plus-months", "exploring"])
  .optional();

// Contact form schema
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  subject: z.string().min(1, validationMessages.required("Subject")).optional(),
  message: z
    .string()
    .min(1, validationMessages.required("Message"))
    .min(10, validationMessages.min("Message", 10))
    .max(1000, validationMessages.max("Message", 1000)),
});

// Enhanced contact form schema with additional project details
export const enhancedContactFormSchema = contactFormSchema.extend({
  company: z
    .string()
    .max(255, validationMessages.max("Company", 255))
    .optional(),
  phone: phoneSchema,
  serviceId: serviceIdSchema,
  budget: budgetRangeSchema,
  timeline: timelineSchema,
  // Metadata fields
  serviceInterest: z.string().max(255).optional(),
  formType: z.string().max(50).optional(),
  // Tracking fields
  sourcePageUrl: z.string().url().optional().or(z.literal("")),
});

// Marketing contact form schema with separate metadata fields
export const marketingContactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: z
    .string()
    .min(1, validationMessages.required("Phone"))
    .regex(/^[\+]?[1-9][\d]{0,15}$/, validationMessages.phone),
  company: z
    .string()
    .min(1, validationMessages.required("Company"))
    .max(255, validationMessages.max("Company", 255)),
  website: z.string().url(validationMessages.url).optional().or(z.literal("")),
  subject: z
    .string()
    .min(1, validationMessages.required("Subject"))
    .max(255, validationMessages.max("Subject", 255)),
  message: z
    .string()
    .min(1, validationMessages.required("Message"))
    .min(10, validationMessages.min("Message", 10))
    .max(1000, validationMessages.max("Message", 1000)),
  timeline: marketingTimelineSchema,

  // Metadata fields (not user-entered, but included for validation)
  serviceInterest: z.string().max(255).optional(),
  location: z.string().max(255).optional(),
  formType: z.string().max(50).optional(),
  price: z.string().max(100).optional(),
  sourcePageUrl: z.string().url().optional().or(z.literal("")),
});

// Blog comment schema
export const blogCommentSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  comment: z
    .string()
    .min(1, validationMessages.required("Comment"))
    .min(3, validationMessages.min("Comment", 3))
    .max(500, validationMessages.max("Comment", 500)),
});

// Newsletter subscription schema
export const newsletterSchema = z.object({
  email: emailSchema,
});

// Type exports
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type EnhancedContactFormData = z.infer<typeof enhancedContactFormSchema>;
export type MarketingContactFormData = z.infer<
  typeof marketingContactFormSchema
>;
export type BlogCommentData = z.infer<typeof blogCommentSchema>;
export type NewsletterData = z.infer<typeof newsletterSchema>;
