import { db } from "../../index";
import {
  blogPosts,
  categories,
  authors,
  tags,
  blogPostsTags,
} from "../../schema/index";
import { eq, inArray } from "drizzle-orm";

/**
 * Blog Post: How to Centralize Leads from Facebook, Google, and Your Website
 * Target Keyword: lead centralization for small business
 * Search Intent: Informational / Technical
 * Location: Southwest Florida (SWFL)
 */

const POST_DATA = {
  title: "How to Centralize Leads from Facebook, Google, and Your Website",
  slug: "centralize-leads-facebook-google-website",
  excerpt:
    "Tired of scattered leads? Learn how to centralize incoming messages from forms, ads, and social media using tools like Airtable and CRMs.",
  metaTitle: "How to Centralize Leads from Facebook, Google, and Your Website",
  metaDescription:
    "Tired of scattered leads? Learn how to centralize incoming messages from forms, ads, and social media using tools like Airtable and CRMs.",
  metaKeywords:
    "lead centralization for small business, CRM for small business, lead management Southwest Florida, Facebook lead ads, Google lead forms, website lead capture, automated lead follow-up, SWFL lead generation, Cape Coral lead management, Fort Myers CRM, Naples lead automation",
  featuredImage:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
  content: `# How to Centralize Leads from Facebook, Google, and Your Website

If you're a Southwest Florida business owner running marketing campaigns across multiple platforms, you've probably experienced the frustration of scattered leads. Facebook ads generate leads in one place, Google ads in another, your website forms in a third, and social media messages in yet another location.

The result? Leads slip through the cracks, response times suffer, and potential customers go to competitors who respond faster. In today's fast-paced market, especially in competitive areas like Naples, Cape Coral, and Fort Myers, quick response times can make the difference between winning and losing a customer.

Let's explore how to centralize all your leads into one system, automate follow-ups, and ensure no opportunity gets missed.

## The Challenge: Disconnected Lead Sources

### The Modern Marketing Reality
Today's successful SWFL businesses use multiple marketing channels:
- **Facebook and Instagram ads** generating leads through forms and messages
- **Google Ads** driving traffic to landing pages and contact forms
- **Website contact forms** from organic search and direct traffic
- **Social media messages** from organic posts and interactions
- **Email inquiries** from various campaigns
- **Phone calls** from different marketing sources

### The Problems This Creates
Without centralization, Southwest Florida businesses face:
- **Slow Response Times**: Checking multiple platforms throughout the day
- **Missed Opportunities**: Leads buried in different systems
- **Inconsistent Follow-up**: Different response styles across platforms
- **No Lead Scoring**: Can't prioritize high-value prospects
- **Poor Analytics**: Can't track which sources generate the best customers
- **Team Coordination Issues**: Multiple people handling different platforms

### Real SWFL Example
A Cape Coral home improvement company was losing 30% of their leads because they were scattered across Facebook, Google, their website, and email. The owner spent 2 hours daily checking different platforms, and leads were getting 6-12 hour response delays. After centralizing, they cut response time to under 15 minutes and increased conversion rates by 45%.

## The Solution: Lead Centralization Strategy

### What is Lead Centralization?
Lead centralization means routing all incoming leads from every source into one unified system where you can:
- **View all leads** in one dashboard
- **Respond quickly** from a single interface
- **Track lead sources** and their performance
- **Automate follow-up** sequences
- **Assign leads** to team members
- **Analyze conversion** rates by source

### The Components You Need
1. **Central Hub**: A CRM or lead management system
2. **Integration Tools**: Zapier, webhooks, or native integrations
3. **Automation Rules**: Workflows for different lead types
4. **Response Templates**: Quick, personalized responses
5. **Analytics Dashboard**: Track performance metrics

*Ready to stop losing leads and start converting more customers? Let Site Wave build your lead flow automation system and help you capture every opportunity that comes your way.*`,
  status: "published" as const,
  publishedAt: new Date("2025-01-25"),
};

const REQUIRED_CATEGORIES = [
  {
    name: "Business Automation",
    slug: "business-automation",
    description: "Automation tools and strategies for small businesses",
  },
  {
    name: "Lead Generation",
    slug: "lead-generation",
    description: "Lead generation strategies and tools for small businesses",
  },
];

const REQUIRED_AUTHOR = {
  name: "Site Wave Team",
  email: "team@sitewavefl.com",
  bio: "Digital marketing and web development experts serving Southwest Florida businesses. We help local companies grow through smart technology and strategic online presence.",
  avatarUrl:
    "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop&crop=faces",
};

const REQUIRED_TAGS = [
  { name: "Lead Centralization", slug: "lead-centralization" },
  { name: "CRM", slug: "crm" },
  { name: "Lead Management", slug: "lead-management" },
  { name: "Business Automation", slug: "business-automation" },
  { name: "Facebook Ads", slug: "facebook-ads" },
  { name: "Google Ads", slug: "google-ads" },
  { name: "Lead Generation", slug: "lead-generation" },
  { name: "Airtable", slug: "airtable" },
  { name: "Zapier", slug: "zapier" },
  { name: "HubSpot", slug: "hubspot" },
  { name: "Small Business", slug: "small-business" },
  { name: "Southwest Florida", slug: "southwest-florida" },
  { name: "SWFL", slug: "swfl" },
  { name: "Cape Coral", slug: "cape-coral" },
  { name: "Fort Myers", slug: "fort-myers" },
  { name: "Naples", slug: "naples" },
];

/**
 * Ensure required categories exist
 */
const ensureCategories = async () => {
  const existingCategories = await db
    .select()
    .from(categories)
    .where(
      inArray(
        categories.slug,
        REQUIRED_CATEGORIES.map((cat) => cat.slug)
      )
    );

  const existingSlugs = existingCategories.map((cat) => cat.slug);
  const categoriesToCreate = REQUIRED_CATEGORIES.filter(
    (cat) => !existingSlugs.includes(cat.slug)
  );

  if (categoriesToCreate.length > 0) {
    const newCategories = await db
      .insert(categories)
      .values(categoriesToCreate)
      .returning();
    return [...existingCategories, ...newCategories];
  }

  return existingCategories;
};

/**
 * Ensure required author exists
 */
const ensureAuthor = async () => {
  const existingAuthor = await db
    .select()
    .from(authors)
    .where(eq(authors.email, REQUIRED_AUTHOR.email))
    .limit(1);

  if (existingAuthor.length === 0) {
    const [author] = await db
      .insert(authors)
      .values(REQUIRED_AUTHOR)
      .returning();
    return author;
  }

  return existingAuthor[0];
};

/**
 * Ensure required tags exist
 */
const ensureTags = async () => {
  const existingTags = await db
    .select()
    .from(tags)
    .where(
      inArray(
        tags.slug,
        REQUIRED_TAGS.map((tag) => tag.slug)
      )
    );

  const existingSlugs = existingTags.map((tag) => tag.slug);
  const tagsToCreate = REQUIRED_TAGS.filter(
    (tag) => !existingSlugs.includes(tag.slug)
  );

  if (tagsToCreate.length > 0) {
    const newTags = await db.insert(tags).values(tagsToCreate).returning();
    return [...existingTags, ...newTags];
  }

  return existingTags;
};

/**
 * Create Lead Centralization blog post
 */
export const createLeadCentralizationPost = async (): Promise<string> => {
  // Check if post already exists
  const existingPost = await db
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.slug, POST_DATA.slug))
    .limit(1);

  if (existingPost.length > 0) {
    return existingPost[0].id;
  }

  // Ensure all required data exists
  const [postCategories, author, postTags] = await Promise.all([
    ensureCategories(),
    ensureAuthor(),
    ensureTags(),
  ]);

  // Create the blog post
  const [post] = await db
    .insert(blogPosts)
    .values({
      ...POST_DATA,
      authorId: author.id,
      categoryId: postCategories[0].id, // Primary category
    })
    .returning();

  // Create tag relationships
  const tagRelationships = postTags.map((tag) => ({
    postId: post.id,
    tagId: tag.id,
  }));

  await db.insert(blogPostsTags).values(tagRelationships);

  console.log(`✅ Created blog post: "${POST_DATA.title}"`);
  return post.id;
};
