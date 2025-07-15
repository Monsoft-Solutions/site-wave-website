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
 * Simple spam detection for contact forms
 * This is just a basic implementation and should be expanded
 * with a more robust solution in production
 */
function detectSpam(data: {
  name: string;
  email: string;
  message: string;
}): boolean {
  const { name, email, message } = data;

  // Check for common spam indicators
  const spamPatterns = [
    /\b(viagra|cialis|crypto|casino|porn|xxx|loan|dating|sex|free money)\b/i,
    /\b(buy|cheap|discount|wholesale|sell)\b.{0,20}\b(watches|drugs|medicine|pills)\b/i,
  ];

  // Check content against patterns
  for (const pattern of spamPatterns) {
    if (pattern.test(name) || pattern.test(email) || pattern.test(message)) {
      return true;
    }
  }

  // Count links in message - too many links is often spam
  const linkMatches = message.match(/https?:\/\/\S+/g);
  if (linkMatches && linkMatches.length > 3) {
    return true;
  }

  return false;
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

    // Insert into database
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
        ipAddress: clientIp !== "unknown" ? clientIp : null,
        userAgent,
        status: "new",
      })
      .returning({ id: contactSubmissions.id });

    console.log(
      `New ${formType} contact submission from ${email} (ID: ${submission.id})`
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

    // Send emails in parallel (don't wait for completion to avoid blocking the response)
    Promise.all(emailPromises)
      .then(([confirmationResult, notificationResult]) => {
        if (confirmationResult.success) {
          console.log(`Confirmation email sent to ${email}`);
        } else {
          console.error(
            `Failed to send confirmation email to ${email}:`,
            confirmationResult.error
          );
        }

        if (notificationResult.success) {
          console.log(`Notification email sent to admins`);
        } else {
          console.error(
            `Failed to send notification email to admins:`,
            notificationResult.error
          );
        }
      })
      .catch((error) => {
        console.error("Error sending emails:", error);
      });

    const response: ApiResponse<ContactSubmissionResponse> = {
      success: true,
      data: {
        submissionId: submission.id,
      },
      message: "Thank you for your message. We'll get back to you soon!",
    };
    return NextResponse.json(response);
  } catch (error) {
    console.error("Contact form submission error:", error);

    const response: ApiResponse<ContactSubmissionResponse> = {
      success: false,
      data: {} as ContactSubmissionResponse,
      error: "Internal server error",
      message: "Something went wrong. Please try again later.",
    };
    return NextResponse.json(response, { status: 500 });
  }
}
