import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { db } from "@/lib/db";
import { contactSubmissions } from "@/lib/db/schema/contact-submission.table";
import {
  contactFormSchema,
  enhancedContactFormSchema,
  marketingContactFormSchema,
  type ContactFormData,
  type EnhancedContactFormData,
  type MarketingContactFormData,
} from "@/lib/utils/contact-form-validation";
import { ApiResponse } from "@/lib/types/api-response.type";
import { ContactSubmissionResponse } from "@/lib/types/contact-submission.type";
import { emailService } from "@/lib/services/email.service";

// Rate limiting storage (in production, use Redis or a database)
const rateLimitMap = new Map<string, { count: number; lastReset: number }>();

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes in milliseconds
const RATE_LIMIT_MAX_REQUESTS = 5; // Max 5 submissions per 15 minutes per IP

/**
 * Simple in-memory rate limiting
 * In production, use Redis or a proper rate limiting service
 */
function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const rateLimitData = rateLimitMap.get(ip);

  if (!rateLimitData) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }

  // Reset count if window has passed
  if (now - rateLimitData.lastReset > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }

  // Check if limit exceeded
  if (rateLimitData.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  // Increment count
  rateLimitData.count++;
  return false;
}

/**
 * Simple spam detection
 * In production, use a more sophisticated solution
 */
function detectSpam(data: {
  name: string;
  email: string;
  message: string;
}): boolean {
  const { name, email, message } = data;

  // Check for suspicious keywords
  const spamKeywords = [
    "bitcoin",
    "cryptocurrency",
    "loan",
    "viagra",
    "casino",
    "pills",
    "weight loss",
    "make money",
    "work from home",
    "click here",
    "limited time",
    "act now",
    "guaranteed",
    "risk-free",
  ];

  const text = `${name} ${email} ${message}`.toLowerCase();
  if (spamKeywords.some((keyword) => text.includes(keyword))) {
    return true;
  }

  // Check for excessive URLs
  const urlCount = (message.match(/https?:\/\//g) || []).length;
  if (urlCount > 2) {
    return true;
  }

  // Check for repetitive text
  const words = message.split(/\s+/);
  const uniqueWords = new Set(words);
  if (words.length > 10 && uniqueWords.size < words.length * 0.5) {
    return true;
  }

  return false;
}

/**
 * Extract UTM tracking data from validated form data
 */
function extractUTMTrackingData(
  data: ContactFormData | EnhancedContactFormData | MarketingContactFormData
) {
  // Since all form schemas now include UTM fields, we can safely access them
  const utmData = data as Record<string, unknown>;

  return {
    utmSource: (utmData.utmSource as string | undefined) || null,
    utmMedium: (utmData.utmMedium as string | undefined) || null,
    utmCampaign: (utmData.utmCampaign as string | undefined) || null,
    utmTerm: (utmData.utmTerm as string | undefined) || null,
    utmContent: (utmData.utmContent as string | undefined) || null,
    referrerUrl: (utmData.referrerUrl as string | undefined) || null,
    landingPageUrl: (utmData.landingPageUrl as string | undefined) || null,
  };
}

/**
 * GET endpoint - Method not allowed
 */
export async function GET() {
  return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
}

/**
 * POST endpoint - Handle contact form submissions
 */
export async function POST(request: NextRequest) {
  try {
    // Get client IP address
    const headersList = await headers();
    const forwardedFor = headersList.get("x-forwarded-for");
    const realIp = headersList.get("x-real-ip");
    const clientIp = forwardedFor?.split(",")[0] || realIp || "unknown";

    // Apply rate limiting
    if (isRateLimited(clientIp)) {
      const response: ApiResponse<ContactSubmissionResponse> = {
        success: false,
        data: {} as ContactSubmissionResponse,
        error: "Rate limit exceeded",
        message: "Too many submissions. Please try again later.",
      };
      return NextResponse.json(response, { status: 429 });
    }

    // Parse and validate request body
    const body = await request.json();

    // Try schemas in order: marketing, enhanced, then basic for backward compatibility
    let validatedData:
      | MarketingContactFormData
      | EnhancedContactFormData
      | ContactFormData;
    let formType: "marketing" | "enhanced" | "basic";

    const marketingResult = marketingContactFormSchema.safeParse(body);
    if (marketingResult.success) {
      validatedData = marketingResult.data;
      formType = "marketing";
    } else {
      const enhancedResult = enhancedContactFormSchema.safeParse(body);
      if (enhancedResult.success) {
        validatedData = enhancedResult.data;
        formType = "enhanced";
      } else {
        const basicResult = contactFormSchema.safeParse(body);
        if (basicResult.success) {
          validatedData = basicResult.data;
          formType = "basic";
        } else {
          const response: ApiResponse<ContactSubmissionResponse> = {
            success: false,
            data: {} as ContactSubmissionResponse,
            error: "Validation failed",
            message: basicResult.error.errors.map((e) => e.message).join(", "),
          };
          return NextResponse.json(response, { status: 400 });
        }
      }
    }

    const { name, email, subject, message } = validatedData;

    // Extract form-specific fields
    let company = null;
    let projectType = null;
    let budget = null;
    let timeline = null;
    let phone = null;
    let website = null;
    let serviceInterest = null;
    let location = null;
    let price = null;
    let sourcePageUrl = null;

    // Extract UTM tracking data from all form types
    const utmData = extractUTMTrackingData(validatedData);

    if (formType === "marketing") {
      const marketingData = validatedData as MarketingContactFormData;
      company = marketingData.company || null;
      timeline = marketingData.timeline || null;
      phone = marketingData.phone || null;
      website = marketingData.website || null;
      serviceInterest = marketingData.serviceInterest || null;
      location = marketingData.location || null;
      price = marketingData.price || null;
      sourcePageUrl = marketingData.sourcePageUrl || null;
    } else if (formType === "enhanced") {
      const enhancedData = validatedData as EnhancedContactFormData;
      company = enhancedData.company || null;
      projectType = enhancedData.serviceId || null; // Store service ID in projectType field
      budget = enhancedData.budget || null;
      timeline = enhancedData.timeline || null;
      serviceInterest = enhancedData.serviceInterest || null;
      sourcePageUrl = enhancedData.sourcePageUrl || null;
    } else {
      // Basic form - extract sourcePageUrl if available
      const basicData = validatedData as ContactFormData;
      sourcePageUrl =
        ((basicData as Record<string, unknown>).sourcePageUrl as
          | string
          | undefined) || null;
    }

    // Spam detection
    if (detectSpam({ name, email, message })) {
      console.warn(`Spam detected from IP ${clientIp}:`, {
        name,
        email,
        subject,
      });

      // Return success to avoid revealing spam detection
      const response: ApiResponse<ContactSubmissionResponse> = {
        success: true,
        data: { submissionId: "generated" }, // Fake ID to avoid revealing spam detection
        message: "Thank you for your message. We'll get back to you soon!",
      };
      return NextResponse.json(response);
    }

    // Get user agent for tracking
    const userAgent = headersList.get("user-agent") || null;

    // Insert into database with UTM tracking data
    const [submission] = await db
      .insert(contactSubmissions)
      .values({
        name,
        email,
        subject: subject || null,
        message,
        company,
        projectType,
        budget,
        timeline,
        phone,
        website,
        serviceInterest,
        location,
        formType,
        price,
        sourcePageUrl,
        // UTM tracking fields
        utmSource: utmData.utmSource,
        utmMedium: utmData.utmMedium,
        utmCampaign: utmData.utmCampaign,
        utmTerm: utmData.utmTerm,
        utmContent: utmData.utmContent,
        referrerUrl: utmData.referrerUrl,
        landingPageUrl: utmData.landingPageUrl,
        // System fields
        ipAddress: clientIp !== "unknown" ? clientIp : null,
        userAgent,
        status: "new",
      })
      .returning({ id: contactSubmissions.id });

    console.log(
      `New ${formType} contact submission from ${email} (ID: ${submission.id})`,
      utmData.utmSource ? `UTM Source: ${utmData.utmSource}` : ""
    );

    // Send confirmation email to user and notification to admins
    const emailPromises = [
      emailService.sendTemplatedEmail(
        "contact-form-confirmation",
        {
          senderName: name,
          senderEmail: email,
          subject: subject || "General Inquiry",
          message,
          submittedAt: new Date().toISOString(),
          companyName: "Site Wave",
          supportEmail: "support@monsoftlabs.com",
          siteUrl: "https://sitewave.com",
        },
        {
          to: email,
          subject: "We've received your message - Thank you!",
          from: "support@monsoftlabs.com",
        }
      ),
      emailService.sendTemplatedEmail(
        "contact-form-notification",
        {
          senderName: name,
          senderEmail: email,
          subject: subject || "General Inquiry",
          message,
          submittedAt: new Date().toISOString(),
          companyName: "Site Wave",
          supportEmail: "support@monsoftlabs.com",
          siteUrl: "https://sitewave.com",
          ipAddress: clientIp !== "unknown" ? clientIp : undefined,
          userAgent: userAgent || undefined,
        },
        {
          to: "hello@sitewavefl.com",
          subject: `New ${formType} contact form submission`,
          from: "support@monsoftlabs.com",
        }
      ),
    ];

    // Send emails in parallel
    const emailResults = await Promise.allSettled(emailPromises);

    // Log email sending results
    emailResults.forEach((result, index) => {
      const emailType = index === 0 ? "confirmation" : "notification";
      if (result.status === "rejected") {
        console.error(`Failed to send ${emailType} email:`, result.reason);
      } else {
        console.log(`${emailType} email sent successfully`);
      }
    });

    // Return success response
    const response: ApiResponse<ContactSubmissionResponse> = {
      success: true,
      data: { submissionId: submission.id },
      message: "Thank you for your message. We'll get back to you soon!",
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Contact form submission error:", error);

    const response: ApiResponse<ContactSubmissionResponse> = {
      success: false,
      data: {} as ContactSubmissionResponse,
      error: error instanceof Error ? error.message : "Internal server error",
      message:
        "Sorry, we encountered an error processing your message. Please try again later.",
    };

    return NextResponse.json(response, { status: 500 });
  }
}
