import {
  pgTable,
  uuid,
  varchar,
  text,
  timestamp,
  inet,
} from "drizzle-orm/pg-core";
import { submissionStatusEnum } from "@/lib/db/schema/enums/submission-status.enum";

/**
 * Contact form submissions table for storing user inquiries
 * Tracks contact form data with metadata for administration
 * Extended to support enhanced form with project details and marketing form data
 * Enhanced with UTM parameter tracking for marketing campaigns
 */
export const contactSubmissions = pgTable("contact_submissions", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),

  // Enhanced form fields
  company: varchar("company", { length: 255 }),
  projectType: varchar("project_type", { length: 50 }),
  budget: varchar("budget", { length: 50 }),
  timeline: varchar("timeline", { length: 50 }),

  // Marketing form fields
  phone: varchar("phone", { length: 20 }),
  website: varchar("website", { length: 500 }),
  serviceInterest: varchar("service_interest", { length: 255 }),
  location: varchar("location", { length: 255 }),
  formType: varchar("form_type", { length: 50 }),
  price: varchar("price", { length: 100 }),

  // Tracking fields
  sourcePageUrl: varchar("source_page_url", { length: 500 }),

  // UTM Parameter tracking fields for marketing campaigns
  utmSource: varchar("utm_source", { length: 255 }), // e.g., "google", "facebook", "newsletter"
  utmMedium: varchar("utm_medium", { length: 255 }), // e.g., "cpc", "social", "email"
  utmCampaign: varchar("utm_campaign", { length: 255 }), // e.g., "spring_sale", "new_product_launch"
  utmTerm: varchar("utm_term", { length: 255 }), // e.g., keyword for paid search
  utmContent: varchar("utm_content", { length: 255 }), // e.g., "banner_ad", "text_link"

  // Referrer information
  referrerUrl: varchar("referrer_url", { length: 500 }), // The page that referred the user
  landingPageUrl: varchar("landing_page_url", { length: 500 }), // First page user visited

  // System fields
  status: submissionStatusEnum("status").notNull().default("new"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  ipAddress: inet("ip_address"),
  userAgent: text("user_agent"),
});
