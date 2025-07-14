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
 * Blog post data for "Digital Starter Pack: Everything You Need to Launch Online"
 */
const POST_DATA = {
  title: "Digital Starter Pack: Everything You Need to Launch Online",
  slug: "digital-starter-pack-launch-online",
  excerpt:
    "Starting a business in Cape Coral or Fort Myers? Here's the complete digital checklist to get your online presence up and running.",
  metaTitle: "Digital Starter Pack: Everything You Need to Launch Online",
  metaDescription:
    "Starting a business in Cape Coral or Fort Myers? Here's the complete digital checklist to get your online presence up and running.",
  metaKeywords:
    "small business digital launch, digital startup checklist, new business online, Cape Coral startup, Fort Myers business launch, Southwest Florida entrepreneur, SWFL business setup",
  content: `# Digital Starter Pack: Everything You Need to Launch Online

Congratulations on taking the leap into entrepreneurship! Whether you're opening a consulting practice in Cape Coral, launching a boutique in Naples, or starting a service business in Fort Myers, you're about to embark on an exciting journey. But before you can focus on serving customers, you need to establish a strong digital foundation.

In today's world, your digital presence often creates the first impression potential customers have of your business. A professional online presence builds credibility, attracts customers, and sets you apart from competitors who are still relying on word-of-mouth alone.

Don't worry—getting started online doesn't have to be overwhelming or expensive. This digital starter pack will walk you through everything you need to launch your Southwest Florida business online, step by step.

## Step 1: Choose Your Domain and Hosting

Your domain name is your digital address, so choose wisely. It's often the first thing potential customers see, and it should reflect your business while being easy to remember and type.

### Selecting the Perfect Domain Name

**Keep it simple and memorable:** Your domain should be easy to spell, pronounce, and remember. If people can't easily tell others about your website, you're missing opportunities.

**Make it relevant to your business:** Include your business name or a keyword that describes what you do. For example, "capecoralplumbing.com" immediately tells visitors what to expect.

**Consider local extensions:** While .com is still the gold standard, don't overlook local options like .capecoral or .naples if they make sense for your business.

**Check availability across platforms:** Before settling on a domain, make sure the corresponding social media handles are available too. Consistency across platforms builds brand recognition.

### Choosing Reliable Hosting

Your hosting provider is like the foundation of your digital home. Here's what to look for:

**Reliability and uptime:** Your website should be accessible 24/7. Look for providers that guarantee 99.9% uptime.

**Speed and performance:** Southwest Florida customers expect fast-loading websites. Choose hosting that prioritizes speed, especially for mobile users.

**Local support:** Consider providers that offer phone support during business hours. When you have questions or issues, you want to talk to someone who understands your needs.

**Room to grow:** Your hosting should scale with your business. Start with what you need now, but ensure you can upgrade easily as your business grows.

## Step 2: Build a Modern Website

Your website is your digital storefront, and it needs to make a great first impression. Modern consumers expect professional, fast-loading websites that work perfectly on both desktop and mobile devices.

### Essential Website Elements

**Professional design:** Your website should reflect your brand and industry. A law firm needs a different look than a surf shop, but both need to appear professional and trustworthy.

**Mobile responsiveness:** Over 60% of web traffic comes from mobile devices. Your website must look and function perfectly on smartphones and tablets.

**Fast loading speed:** Southwest Florida customers won't wait around for slow websites. Aim for loading times under 3 seconds.

**Clear navigation:** Visitors should be able to find what they need within seconds. Use clear menu labels and logical page organization.

**Contact information:** Make it easy for customers to reach you. Include your phone number, email, and physical address (if applicable) prominently on every page.

### Key Pages Every Business Website Needs

**Home page:** This is your elevator pitch. Clearly explain what you do, who you serve, and why customers should choose you.

**About page:** Tell your story. People do business with people they know and trust. Share your background, experience, and what makes you unique.

**Services or products page:** Detail what you offer. Use clear descriptions and, if applicable, pricing information.

**Contact page:** Include multiple ways to reach you—phone, email, contact form, and directions to your location.

**Testimonials or reviews:** Social proof builds trust. Feature customer testimonials, reviews, or case studies prominently.

## Step 3: Set Up Your Google Business Profile

Your Google Business Profile (formerly Google My Business) is crucial for local visibility. When people search for businesses like yours in Cape Coral, Fort Myers, or Naples, your profile determines whether they find you.

### Complete Your Profile

**Business information:** Fill out every section completely. Include your business name, address, phone number, website, hours of operation, and business category.

**Photos:** Upload high-quality photos of your business, products, services, and team. Visual content makes your profile more engaging and trustworthy.

**Business description:** Write a compelling description that includes relevant keywords for your industry and location.

**Attributes:** Select all relevant attributes that describe your business, such as "wheelchair accessible," "free WiFi," or "accepts credit cards."

### Optimize for Local Search

**Choose the right categories:** Select the most accurate primary category for your business, then add relevant secondary categories.

**Use local keywords:** Include location-specific terms in your business description and posts.

**Encourage reviews:** Ask satisfied customers to leave reviews. Respond to all reviews professionally, both positive and negative.

**Post regularly:** Use Google Posts to share updates, events, promotions, and news about your business.

## Step 4: Claim Your Social Media Handles

Social media platforms are where many of your customers spend their time. Even if you don't plan to be active immediately, claiming your handles protects your brand and gives you options for future growth.

### Priority Platforms for Southwest Florida Businesses

**Facebook:** Essential for local businesses. Create a business page and complete your profile with location information, hours, and contact details.

**Instagram:** Perfect for visually-oriented businesses. Great for showcasing your work, behind-the-scenes content, and local community involvement.

**LinkedIn:** Crucial for B2B businesses and professional services. Helps with networking and establishing credibility.

**Google:** Your Google Business Profile is technically social media too. Keep it updated and active.

### Social Media Setup Tips

**Use consistent branding:** Your profile images, cover photos, and bio should match across all platforms.

**Complete your profiles:** Fill out every section with relevant information about your business.

**Link to your website:** Make sure all your social profiles link back to your website.

**Plan your content:** Even if you're not ready to post regularly, have a plan for what kind of content you'll share.

## Step 5: Add Analytics and Lead Forms

You can't improve what you don't measure. Setting up analytics and lead capture systems from day one helps you understand your audience and track your growth.

### Google Analytics Setup

**Track website traffic:** Understand how many people visit your site, where they come from, and what they do while they're there.

**Monitor user behavior:** See which pages are most popular, where visitors spend the most time, and where they leave your site.

**Measure conversions:** Track when visitors take important actions, like filling out contact forms or calling your business.

**Set up goals:** Define what success looks like for your website and track progress toward those goals.

### Lead Capture Systems

**Contact forms:** Make it easy for potential customers to reach you. Include forms on your contact page and consider adding them to other relevant pages.

**Email newsletter signup:** Build an email list from day one. Offer something valuable in exchange for email addresses.

**Call tracking:** Use tracking numbers to understand which marketing efforts drive phone calls.

**CRM integration:** Consider using a customer relationship management system to organize and follow up with leads.

## Additional Digital Essentials

### Email Marketing

Set up a professional email address using your domain name. This builds credibility and keeps your business communications organized.

### Online Reviews Management

Monitor what people are saying about your business online. Set up Google Alerts for your business name and respond to reviews professionally.

### Basic SEO

Learn the basics of search engine optimization. This includes using relevant keywords, writing meta descriptions, and creating quality content.

### Security and Backups

Protect your digital assets with strong passwords, regular backups, and security monitoring.

## Your Launch Timeline

Getting everything set up doesn't have to happen overnight. Here's a realistic timeline for launching your digital presence:

**Week 1:** Register your domain and set up hosting
**Week 2:** Create your website content and design
**Week 3:** Set up Google Business Profile and social media accounts
**Week 4:** Install analytics and test everything
**Week 5:** Launch and promote your new online presence

## Common Mistakes to Avoid

**Perfectionism paralysis:** Don't wait until everything is perfect. Launch with a good foundation and improve over time.

**Ignoring mobile users:** Test your website on multiple devices before launching.

**Forgetting about SEO:** Build SEO considerations into your website from the beginning.

**Not backing up:** Set up automatic backups for your website and important data.

**Inconsistent branding:** Make sure your name, logo, and messaging are consistent across all platforms.

## The Investment

Building a professional digital presence is an investment in your business's future. While costs vary depending on your needs, here's what to expect:

**Domain registration:** $10-15 per year
**Website hosting:** $5-25 per month
**Professional website design:** $500-5000 (or more for complex sites)
**Basic analytics and tools:** Often free with paid upgrade options

Remember, this is an investment that works for your business 24/7, attracting customers even while you sleep.

## Your Next Steps

Ready to launch your Southwest Florida business online? Here's how to get started:

1. **Make a list:** Write down all the digital assets you need (domain, hosting, website, social media accounts)
2. **Set a timeline:** Decide when you want to launch and work backward
3. **Consider professional help:** Some tasks are DIY-friendly, while others benefit from professional expertise
4. **Test everything:** Before you announce your launch, test all your systems thoroughly
5. **Plan your promotion:** Decide how you'll announce your new online presence

## Let Site Wave Help You Launch

Starting a business is exciting, but it can also be overwhelming. You have enough to worry about without becoming a digital marketing expert overnight.

At Site Wave, we specialize in helping Southwest Florida entrepreneurs launch their businesses online with confidence. We understand the unique challenges of starting a business in Cape Coral, Fort Myers, Naples, and across SWFL.

Our all-in-one digital launch package includes everything you need to get started online professionally and affordably. From domain registration to website design, Google Business Profile setup to social media account creation, we handle the technical details so you can focus on what you do best—running your business.

**Ready to launch?** Contact Site Wave today for your all-in-one digital startup package. Visit www.sitewavefl.com, call us, or email contact@sitewavefl.com to schedule your consultation.

Your digital journey starts here—let's make it a successful one.

---

*Starting a business in Southwest Florida? Site Wave provides comprehensive digital solutions for entrepreneurs and small businesses. From website design to complete digital marketing strategies, we're here to help you succeed online.*`,
  status: "published" as const,
  featuredImage: "/blog/digital-starter-pack-business-launch.jpg",
  publishedAt: new Date("2025-01-16"),
};

const REQUIRED_CATEGORIES = [
  {
    name: "Small Business",
    slug: "small-business",
    description:
      "Tips, strategies, and insights for small business owners in Southwest Florida",
  },
  {
    name: "Digital Marketing",
    slug: "digital-marketing",
    description: "Digital marketing strategies and tips for small businesses",
  },
  {
    name: "Business Startup",
    slug: "business-startup",
    description:
      "Resources and guides for entrepreneurs starting new businesses",
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
  { name: "digital launch", slug: "digital-launch" },
  { name: "business startup", slug: "business-startup" },
  { name: "entrepreneur", slug: "entrepreneur" },
  { name: "small business", slug: "small-business" },
  { name: "website setup", slug: "website-setup" },
  { name: "Google Business Profile", slug: "google-business-profile" },
  { name: "social media setup", slug: "social-media-setup" },
  { name: "domain registration", slug: "domain-registration" },
  { name: "website hosting", slug: "website-hosting" },
  { name: "Southwest Florida", slug: "southwest-florida" },
  { name: "SWFL", slug: "swfl" },
  { name: "Cape Coral", slug: "cape-coral" },
  { name: "Fort Myers", slug: "fort-myers" },
  { name: "Naples", slug: "naples" },
  { name: "business launch", slug: "business-launch" },
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
 * Create blog post with all required relationships
 */
export const createDigitalStarterPackPost = async (): Promise<string> => {
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
      categoryId: postCategories[0].id, // Primary category (Small Business)
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
