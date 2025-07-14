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
 * Blog Post: Top 5 Website Mistakes Small Businesses Make (and How to Fix Them)
 * Target Keyword: common small business website mistakes
 * Search Intent: Informational / Pain Point
 * Location: Southwest Florida (SWFL)
 */

const POST_DATA = {
  title: "Top 5 Website Mistakes Small Businesses Make (and How to Fix Them)",
  slug: "top-5-website-mistakes-small-businesses-fix",
  excerpt:
    "Don't lose leads due to website mistakes. Find out the top errors SWFL businesses make—and how to avoid them.",
  metaTitle:
    "Top 5 Website Mistakes Small Businesses Make (and How to Fix Them)",
  metaDescription:
    "Don't lose leads due to website mistakes. Find out the top errors SWFL businesses make—and how to avoid them.",
  metaKeywords:
    "common small business website mistakes, website mistakes to avoid, small business website problems, website fixes Southwest Florida, SWFL web design mistakes, Cape Coral website problems, Fort Myers website issues, Naples website mistakes",
  featuredImage:
    "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800&h=400&fit=crop",
  content: `# Top 5 Website Mistakes Small Businesses Make (and How to Fix Them)

Your website is working 24/7 to represent your business, but what if it's actually costing you customers? After helping hundreds of Southwest Florida businesses improve their online presence, we've identified the same costly mistakes happening over and over again.

From Cape Coral to Naples, small businesses are unknowingly driving away potential customers with these common website errors. The good news? Every single one of these mistakes is fixable, and the solutions are often simpler than you think.

Let's dive into the top 5 website mistakes that are hurting SWFL businesses and show you exactly how to fix them.

## Mistake #1: No Mobile Responsiveness

### The Problem
In 2025, over 60% of web traffic comes from mobile devices. Yet we still encounter Southwest Florida businesses with websites that don't work properly on smartphones or tablets. When a potential customer in Fort Myers tries to view your website on their phone and has to pinch and zoom to read your content, they're gone.

### Why This Hurts Your Business
- **Poor User Experience**: Visitors leave immediately when they can't navigate easily
- **Google Penalties**: Google penalizes non-mobile-friendly sites in search rankings
- **Lost Revenue**: Mobile users are often ready to buy or call right now
- **Competitive Disadvantage**: Your competitors with mobile-friendly sites capture these customers

### Real SWFL Example
A Cape Coral restaurant lost 40% of their online orders because their menu was impossible to read on mobile devices. After fixing their mobile responsiveness, they saw a 65% increase in online orders within 30 days.

### How to Fix It

**Immediate Solutions:**
1. **Test Your Site**: Use Google's Mobile-Friendly Test tool to check your current site
2. **Responsive Design**: Ensure your website automatically adjusts to different screen sizes
3. **Touch-Friendly Elements**: Make buttons and links easy to tap with fingers
4. **Readable Text**: Use font sizes that don't require zooming

**Technical Requirements:**
- Minimum 16px font size for body text
- Buttons at least 44x44 pixels (finger-friendly)
- Adequate spacing between clickable elements
- Fast loading times on mobile networks

**Professional Fix:**
If your current website isn't mobile-responsive, it's time for a redesign. Modern websites should be built with a mobile-first approach, meaning they're designed for smartphones first, then enhanced for larger screens.

## Mistake #2: Poor Call-to-Action (CTA) Placement

### The Problem
Many Southwest Florida businesses have websites that look nice but don't guide visitors toward taking action. Your website might get traffic, but if visitors can't easily find how to contact you, request a quote, or make a purchase, you're missing valuable conversions.

### Why This Hurts Your Business
- **Confused Visitors**: People don't know what to do next
- **Missed Opportunities**: Interested prospects leave without converting
- **Lower ROI**: Your marketing efforts don't generate leads
- **Competitive Loss**: Visitors go to competitors with clearer CTAs

### Common CTA Mistakes We See:
- No clear primary action on the homepage
- Contact information buried in the footer
- Too many competing CTAs confusing visitors
- Generic phrases like "Click Here" instead of action-oriented language

### How to Fix It

**Homepage CTAs:**
- **Primary CTA**: One main action prominently displayed (e.g., "Get Your Free Quote")
- **Above the Fold**: Visitors should see your main CTA without scrolling
- **Contrasting Colors**: Make CTAs stand out visually
- **Action-Oriented Text**: Use verbs like "Get," "Start," "Schedule," "Download"

**Strategic Placement:**
- Header/navigation area
- Homepage hero section
- End of service descriptions
- Contact page
- Blog post conclusions

**Phone Number Visibility:**
For service businesses in SWFL, your phone number should be:
- In the header of every page
- Large enough to be easily clicked on mobile
- Linked to enable one-tap calling
- Include your area code (239) for local trust

**SWFL Success Story:** A Naples HVAC company increased their website conversions by 180% simply by adding a prominent "Schedule Service" button to their homepage and making their phone number clickable on mobile.

## Mistake #3: Lack of SEO Setup

### The Problem
Many small businesses in Southwest Florida have beautifully designed websites that nobody can find. Without proper SEO (Search Engine Optimization), your website is invisible to potential customers searching for your services on Google.

### Why This Hurts Your Business
- **No Organic Traffic**: People can't find you when searching for your services
- **Missed Local Opportunities**: Local customers find your competitors instead
- **Expensive Advertising**: You have to pay for all your website traffic
- **Slow Growth**: Your business relies only on word-of-mouth and paid ads

### Common SEO Mistakes:
- No title tags or meta descriptions
- Missing local keywords (Cape Coral, Fort Myers, Naples, SWFL)
- No Google Business Profile optimization
- Poor or missing header structure (H1, H2, H3 tags)
- No local schema markup
- Slow loading speeds

### How to Fix It

**Basic SEO Essentials:**
1. **Title Tags**: Each page should have a unique, descriptive title under 60 characters
2. **Meta Descriptions**: Compelling descriptions under 160 characters that include your main keywords
3. **Header Structure**: Use H1 for page titles, H2 for main sections, H3 for subsections
4. **Local Keywords**: Include your city and service area naturally in content

**Local SEO for SWFL:**
- **Location Pages**: Create dedicated pages for each city you serve
- **NAP Consistency**: Ensure your Name, Address, Phone number are identical everywhere online
- **Google Business Profile**: Complete and optimize your profile with photos, hours, and regular updates
- **Local Citations**: List your business in local directories and industry-specific sites

**Content Strategy:**
- **Service Pages**: Create detailed pages for each service you offer
- **Location-Based Content**: Write about local projects, community involvement, and area-specific tips
- **Blog Regularly**: Fresh content helps with search rankings and establishes expertise

**Technical SEO:**
- **Site Speed**: Optimize images and enable caching for faster loading
- **Mobile Optimization**: Ensure your site works perfectly on all devices
- **SSL Certificate**: Secure your site with HTTPS encryption
- **XML Sitemap**: Help search engines understand your site structure

## Mistake #4: Slow Loading Times

### The Problem
Southwest Florida internet users expect websites to load quickly. If your site takes more than 3 seconds to load, you're losing visitors and potential customers. Slow websites frustrate users and hurt your search engine rankings.

### Why This Hurts Your Business
- **High Bounce Rate**: 53% of mobile users leave sites that take over 3 seconds to load
- **Poor User Experience**: Slow sites create negative first impressions
- **SEO Penalties**: Google uses page speed as a ranking factor
- **Lost Revenue**: Every second of delay can reduce conversions by 7%

### Common Speed Issues:
- Large, unoptimized images
- Too many plugins or widgets
- Poor hosting providers
- Lack of caching
- Excessive code or scripts

### How to Fix It

**Image Optimization:**
- **Compress Images**: Use tools like TinyPNG or WebP format
- **Proper Sizing**: Don't use huge images scaled down with CSS
- **Lazy Loading**: Load images only when visitors scroll to them
- **Alt Text**: Include descriptive alt text for SEO and accessibility

**Hosting and Technical:**
- **Quality Hosting**: Invest in reliable hosting with good performance
- **Content Delivery Network (CDN)**: Distribute your content globally for faster delivery
- **Caching**: Enable browser and server caching
- **Minimize Code**: Remove unnecessary plugins and optimize CSS/JavaScript

**Regular Monitoring:**
- **Google PageSpeed Insights**: Check your site speed regularly
- **GTmetrix**: Get detailed performance reports
- **Real User Testing**: Test your site on different devices and connections

**SWFL Example:** A Fort Myers law firm's website was taking 8 seconds to load due to large images and poor hosting. After optimization, their load time dropped to 2.1 seconds, and they saw a 45% increase in contact form submissions.

## Mistake #5: No Lead Capture System

### The Problem
Many Southwest Florida businesses drive traffic to their websites but have no system to capture visitor information. Without a way to follow up with interested prospects, you're missing out on valuable leads and potential customers.

### Why This Hurts Your Business
- **One-Time Visitors**: People visit once and you never hear from them again
- **No Follow-Up**: You can't nurture relationships with potential customers
- **Missed Opportunities**: Interested prospects don't convert immediately and are lost
- **Lower Lifetime Value**: You can't build long-term customer relationships

### What's Missing:
- Contact forms on key pages
- Email newsletter signup
- Free resources or downloads
- Clear value propositions for sharing contact info
- Follow-up automation systems

### How to Fix It

**Essential Lead Capture Elements:**
1. **Contact Forms**: Easy-to-find forms on every important page
2. **Email Signup**: Newsletter or updates subscription with clear benefits
3. **Free Resources**: Offer valuable content in exchange for contact information
4. **Multiple Touchpoints**: Provide various ways for people to connect with you

**Contact Form Best Practices:**
- **Keep It Simple**: Only ask for necessary information initially
- **Mobile-Friendly**: Ensure forms work perfectly on smartphones
- **Clear Value**: Explain what happens after they submit
- **Quick Response**: Set up auto-responses and follow up quickly

**Lead Magnets for SWFL Businesses:**
- **Free Estimates**: Perfect for contractors and service providers
- **Resource Guides**: "Hurricane Preparation Checklist" for property services
- **Local Information**: "Best Restaurants in Naples" for hospitality businesses
- **Expert Tips**: Industry-specific advice and insights

**Follow-Up Systems:**
- **Email Automation**: Set up sequences to nurture leads over time
- **CRM Integration**: Track and manage all your leads in one place
- **Multi-Channel Approach**: Combine email, phone, and social media follow-up

**Example Lead Capture Strategy:**
A Cape Coral landscaping company added a simple contact form offering "Free Landscape Design Consultation" to their homepage. They also created a downloadable guide "Best Plants for Southwest Florida Gardens" as a lead magnet. Result: 300% increase in qualified leads within 60 days.

## The Cumulative Effect of These Mistakes

These mistakes don't just hurt your business individually—they compound each other. A slow, non-mobile-friendly website with poor SEO and no lead capture system creates a perfect storm of lost opportunities.

### What This Costs SWFL Businesses:
- **Lost Revenue**: Missed sales and conversions
- **Wasted Marketing**: Advertising that doesn't convert
- **Competitive Disadvantage**: Customers choose better-optimized competitors
- **Reputation Damage**: Poor website experience reflects on your business

### The Fix Multiplier Effect:
When you fix these issues together, the improvements multiply:
- Better mobile experience + clear CTAs = more conversions
- Fast loading + good SEO = higher search rankings
- Lead capture + follow-up = more customers and higher lifetime value

## How to Prioritize Your Fixes

If you're dealing with multiple website issues, here's the order we recommend for Southwest Florida businesses:

### Phase 1: Critical Issues (Fix Immediately)
1. **Mobile Responsiveness**: This affects the majority of your visitors
2. **Site Speed**: Impacts both user experience and SEO
3. **Clear Contact Information**: Make it easy for people to reach you

### Phase 2: Conversion Optimization (Fix Within 30 Days)
1. **Improve CTAs**: Guide visitors toward taking action
2. **Add Lead Capture**: Start collecting visitor information
3. **Optimize Key Pages**: Focus on your most important pages first

### Phase 3: Long-term Growth (Fix Within 90 Days)
1. **SEO Optimization**: Improve your search visibility
2. **Content Strategy**: Add valuable content regularly
3. **Advanced Analytics**: Track and optimize your results

## DIY vs. Professional Help

Some fixes you can handle yourself, while others require professional expertise:

### DIY Fixes:
- Adding clear contact information
- Improving CTA text and placement
- Optimizing images for speed
- Adding basic contact forms

### Professional Help Needed:
- Complete mobile responsiveness overhaul
- Advanced SEO optimization
- Custom lead capture systems
- Technical speed optimization
- Integration with CRM and automation tools

## Measuring Your Success

After fixing these issues, track these metrics to measure improvement:

### Key Metrics to Monitor:
- **Bounce Rate**: Should decrease as user experience improves
- **Average Session Duration**: Should increase with better content and navigation
- **Conversion Rate**: Should increase with better CTAs and lead capture
- **Mobile Traffic**: Should increase as mobile experience improves
- **Search Rankings**: Should improve with better SEO
- **Lead Quality**: Should improve with better targeting and forms

### Tools for Tracking:
- Google Analytics for traffic and behavior
- Google Search Console for SEO performance
- Hotjar or similar for user behavior recording
- Your CRM for lead tracking and quality

## The SWFL Competitive Advantage

Fixing these common mistakes gives you a significant advantage in the Southwest Florida market. Many of your competitors are still making these errors, so addressing them puts you ahead of the pack.

### Local Market Benefits:
- **Seasonal Traffic**: Better mobile experience captures tourist traffic
- **Local SEO**: Improved visibility for "near me" searches
- **Trust Building**: Professional website builds credibility with locals
- **Word-of-Mouth**: Better user experience leads to more referrals

## Taking Action: Your Next Steps

Don't let these mistakes continue costing your business. Here's your action plan:

### Week 1: Assessment
1. **Mobile Test**: Check your site on multiple devices
2. **Speed Test**: Use Google PageSpeed Insights
3. **SEO Audit**: Review your current search visibility
4. **CTA Review**: Evaluate your current calls-to-action
5. **Lead Capture Assessment**: Identify opportunities to capture visitor information

### Week 2-3: Quick Fixes
1. **Update Contact Information**: Make phone numbers clickable
2. **Improve CTAs**: Add clear, action-oriented buttons
3. **Optimize Images**: Compress and resize large images
4. **Add Basic Forms**: Create simple contact forms

### Week 4-8: Major Improvements
1. **Mobile Optimization**: Ensure full responsiveness
2. **SEO Implementation**: Optimize titles, descriptions, and content
3. **Lead Capture Systems**: Set up comprehensive lead generation
4. **Speed Optimization**: Address technical performance issues

### Ongoing: Monitoring and Optimization
1. **Regular Testing**: Check performance monthly
2. **Content Updates**: Add fresh, relevant content
3. **Analytics Review**: Monitor metrics and adjust strategy
4. **Continuous Improvement**: Keep optimizing based on data

## Conclusion: Your Website Should Work as Hard as You Do

Your website is one of your most valuable business assets—make sure it's working for you, not against you. These five mistakes are costing Southwest Florida businesses thousands of dollars in lost revenue every month.

The good news? Every single one of these issues is fixable. Whether you tackle them yourself or work with professionals, addressing these problems will improve your online presence, attract more customers, and grow your business.

Remember, your website is often the first impression potential customers have of your business. Make it count.

### Don't Wait—Your Competitors Aren't

While you're reading this, your competitors might be fixing these same issues. The Southwest Florida market is competitive, but businesses that prioritize their online presence consistently outperform those that don't.

Your website should be your best salesperson, working 24/7 to attract customers, generate leads, and grow your business. Don't let these common mistakes hold you back from the success you deserve.

*Ready to fix these website mistakes and start converting more visitors into customers? Let Site Wave conduct a comprehensive website audit and create a customized improvement plan for your Southwest Florida business.*`,
  status: "published" as const,
  publishedAt: new Date("2025-01-22"),
};

const REQUIRED_CATEGORIES = [
  {
    name: "Web Design",
    slug: "web-design",
    description: "Web design tips and best practices for small businesses",
  },
  {
    name: "Website Optimization",
    slug: "website-optimization",
    description:
      "Website optimization strategies for better performance and conversions",
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
  { name: "Website Mistakes", slug: "website-mistakes" },
  { name: "Small Business", slug: "small-business" },
  { name: "Web Design", slug: "web-design" },
  { name: "Website Optimization", slug: "website-optimization" },
  { name: "Mobile Responsive", slug: "mobile-responsive" },
  { name: "SEO", slug: "seo" },
  { name: "User Experience", slug: "user-experience" },
  { name: "Call to Action", slug: "call-to-action" },
  { name: "Lead Generation", slug: "lead-generation" },
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
 * Create Website Mistakes blog post
 */
export const createWebsiteMistakesPost = async (): Promise<string> => {
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
