import { JsonLd } from "@/components/seo/JsonLd";
import { getBaseUrl } from "@/lib/utils/url.util";
import type { BlogListOptions, BlogListResponse } from "@/lib/types";

// Import Site Wave blog sections
import { SiteWaveBlogHero } from "@/components/blog/sections/site-wave-blog-hero";
import { SiteWaveFeaturedArticles } from "@/components/blog/sections/site-wave-featured-articles";
import { SiteWaveCategoryHub } from "@/components/blog/sections/site-wave-category-hub";
import { SiteWaveArticlesGrid } from "@/components/blog/sections/site-wave-articles-grid";
import { SiteWaveNewsletterCTA } from "@/components/blog/sections/site-wave-newsletter-cta";

// Import client component for filters (interactive features only)
import { SiteWaveBlogFilters } from "@/components/blog/SiteWaveBlogFilters";
import { getBlogCategories, getBlogPosts } from "@/lib/api/blog.service";

// Force dynamic rendering for cache invalidation
export const dynamic = "force-dynamic";

interface BlogPageProps {
  searchParams: Promise<{
    page?: string;
    category?: string;
    search?: string;
  }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const { page, category, search } = await searchParams;
  const currentPage = parseInt(page || "1", 10);
  const currentCategory = category || "all";
  const currentSearch = search || "";
  const baseUrl = getBaseUrl();

  // Initialize with fallback data
  let blogData: BlogListResponse = {
    posts: [],
    totalPages: 0,
    totalPosts: 0,
    currentPage: 1,
    hasNextPage: false,
    hasPreviousPage: false,
  };
  let categories: Array<{ name: string; slug: string; count: number }> = [];

  try {
    // Build query parameters
    const params = new URLSearchParams({
      page: currentPage.toString(),
      limit: "12",
    });

    if (currentCategory !== "all") {
      params.set("categorySlug", currentCategory);
    }

    if (currentSearch) {
      params.set("searchQuery", currentSearch);
    }

    const options: BlogListOptions = {
      page: currentPage,
      limit: 12,
      categorySlug: currentCategory,
      searchQuery: currentSearch,
      status: "published",
    };

    // Get blog posts
    const result = await getBlogPosts(options);

    blogData = result;

    // Fetch categories with counts (SSR)
    const categoriesResponse = await getBlogCategories();
    categories = categoriesResponse.map((category) => ({
      name: category.category.name,
      slug: category.category.slug,
      count: category.postCount,
    }));
  } catch (error) {
    console.error("Error fetching blog data:", error);
    // Continue with empty data - better than crashing
  }

  // Transform data for Site Wave components
  const transformedPosts = blogData.posts.map((post) => ({
    id: post.id,
    title: post.title,
    excerpt: post.excerpt,
    category: {
      name: post.category.name,
      slug: post.category.slug,
    },
    author: {
      name: post.author.name,
      avatar: post.author.avatarUrl || undefined,
    },
    publishedAt: (post.publishedAt || post.createdAt).toString(),
    readingTime: post.readingTime,
    featuredImage: post.featuredImage || undefined,
    slug: post.slug,
    featured:
      blogData.posts.indexOf(post) === 0 &&
      currentPage === 1 &&
      !currentSearch &&
      currentCategory === "all",
    trending: Math.random() > 0.7, // Random trending for demo
    likes: Math.floor(Math.random() * 100) + 10,
    comments: Math.floor(Math.random() * 50) + 2,
  }));

  const transformedCategories = categories.map((cat) => ({
    name: cat.name,
    slug: cat.slug,
    count: cat.count,
    description: getSiteWaveCategoryDescription(cat.name),
    color: getSiteWaveCategoryColor(cat.name),
    icon: getSiteWaveCategoryIcon(cat.name),
    trending: Math.random() > 0.6,
  }));

  // Show different layouts based on filters
  const isFiltered =
    !!currentSearch || currentCategory !== "all" || currentPage > 1;
  const showHero = !isFiltered;
  const showFeatured = !isFiltered && transformedPosts.length > 0;
  const showCategories = !isFiltered;

  return (
    <>
      <JsonLd
        type="WebSite"
        data={{
          name: "Site Wave Blog - Digital Marketing Insights for Southwest Florida",
          description:
            "Expert insights on website development, SEO, digital marketing, and business automation for small businesses in Cape Coral, Fort Myers, and Naples, FL.",
          url: `${baseUrl}/blog`,
        }}
      />

      <div className="min-h-screen">
        {/* Hero Section - Only on main page */}
        {showHero && (
          <SiteWaveBlogHero
            totalPosts={blogData.totalPosts}
            totalBusinessesHelped={150}
            totalSWFLReaders={blogData.totalPosts * 85} // Local focus
          />
        )}

        {/* Featured Articles - Only on main page */}
        {showFeatured && (
          <SiteWaveFeaturedArticles articles={transformedPosts} />
        )}

        {/* Category Hub - Only on main page */}
        {showCategories && (
          <SiteWaveCategoryHub categories={transformedCategories} />
        )}

        {/* Search and Filter Section - Client Component */}
        <section className="py-12 bg-gradient-to-br from-soft-sand/20 via-background to-soft-sand/20">
          <div className="container">
            <div className="mx-auto max-w-6xl">
              <SiteWaveBlogFilters
                categories={categories}
                currentCategory={currentCategory}
                currentSearch={currentSearch}
                currentPage={currentPage}
                totalPages={blogData.totalPages}
              />
            </div>
          </div>
        </section>

        {/* Articles Grid */}
        <SiteWaveArticlesGrid
          articles={transformedPosts}
          title={getSiteWaveGridTitle(
            currentSearch,
            currentCategory,
            categories
          )}
          description={getSiteWaveGridDescription(
            currentSearch,
            currentCategory,
            blogData.totalPosts
          )}
          showHeader={isFiltered}
          className={
            isFiltered
              ? "bg-background"
              : "bg-gradient-to-br from-background via-soft-sand/10 to-background"
          }
        />

        {/* Newsletter CTA - Site Wave themed */}
        <SiteWaveNewsletterCTA
          subscriberCount={2500}
          localBusinessCount={150}
          className="bg-gradient-to-br from-ocean-blue/5 via-background to-coral-orange/5"
        />
      </div>
    </>
  );
}

// Helper functions for Site Wave themed categories
function getSiteWaveCategoryDescription(name: string): string {
  const descriptions: Record<string, string> = {
    "Website Development":
      "Custom websites that convert visitors into customers",
    "SEO & Local Marketing":
      "Get found by Southwest Florida customers on Google",
    "Digital Marketing": "Social media, ads, and online presence strategies",
    "Business Automation": "Save time with smart CRM and automation tools",
    "Case Studies": "Real results from SWFL businesses like yours",
    "Industry Insights": "Stay ahead with the latest digital trends",
    "How-To Guides": "Step-by-step tutorials for business growth",
    "Local Business Tips": "Proven strategies for Southwest Florida success",
  };
  return (
    descriptions[name] || "Expert insights for growing your business online"
  );
}

function getSiteWaveCategoryColor(name: string): string {
  const colors: Record<string, string> = {
    "Website Development": "from-ocean-blue to-ocean-blue/70",
    "SEO & Local Marketing": "from-coral-orange to-coral-orange/70",
    "Digital Marketing": "from-ocean-blue/80 to-coral-orange/80",
    "Business Automation": "from-deep-navy to-ocean-blue",
    "Case Studies": "from-coral-orange/80 to-deep-navy/80",
    "Industry Insights": "from-ocean-blue to-deep-navy",
    "How-To Guides": "from-coral-orange to-ocean-blue/70",
    "Local Business Tips": "from-deep-navy/80 to-coral-orange/80",
  };
  return colors[name] || "from-ocean-blue to-coral-orange";
}

function getSiteWaveCategoryIcon(name: string): string {
  const icons: Record<string, string> = {
    "Website Development": "code",
    "SEO & Local Marketing": "search",
    "Digital Marketing": "megaphone",
    "Business Automation": "zap",
    "Case Studies": "trophy",
    "Industry Insights": "trending-up",
    "How-To Guides": "book-open",
    "Local Business Tips": "map-pin",
  };
  return icons[name] || "code";
}

function getSiteWaveGridTitle(
  currentSearch: string,
  currentCategory: string,
  categories: Array<{ name: string; slug: string; count: number }>
): string {
  if (currentSearch) {
    return `Search Results`;
  }
  if (currentCategory !== "all") {
    const category = categories.find((c) => c.slug === currentCategory);
    return `${category?.name || currentCategory} Articles`;
  }
  return "Latest Insights for SWFL Businesses";
}

function getSiteWaveGridDescription(
  currentSearch: string,
  currentCategory: string,
  totalPosts: number
): string {
  if (currentSearch) {
    return `${
      totalPosts === 0
        ? "No results"
        : `${totalPosts} ${totalPosts === 1 ? "result" : "results"}`
    } found for "${currentSearch}"`;
  }
  if (currentCategory !== "all") {
    return `Expert advice to help your Southwest Florida business thrive online`;
  }
  return "Practical insights to grow your business in Cape Coral, Fort Myers, Naples, and beyond";
}
