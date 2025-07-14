import type { SeedOperation } from "../types/seed-config.type";
import { createCustomWebsitePost } from "../posts/01-custom-website-small-business.post";
import { createLocalSEOPost } from "../posts/02-local-seo-cape-coral.post";
import { createGoogleBusinessProfilePost } from "../posts/03-google-business-profile-naples.post";
import { createWebsiteRedesignPost } from "../posts/04-website-redesign-checklist.post";
import { createLandingPagePost } from "../posts/05-high-converting-landing-page.post";
import { createFacebookGoogleAdsPost } from "../posts/06-facebook-vs-google-ads.post";
import { createWebsiteMistakesPost } from "../posts/07-website-mistakes-small-business.post";
import { createLeadCentralizationPost } from "../posts/08-centralize-leads-automation.post";
import { createBloggingLocalSEOPost } from "../posts/09-blogging-local-seo.post";
import { createDigitalStarterPackPost } from "../posts/10-digital-starter-pack.post";

/**
 * Blog Posts Seed Coordinator
 * This file orchestrates the creation of all blog posts by importing and executing
 * individual post creation functions from the /posts directory.
 */

/**
 * Array of post creation functions to be executed
 */
const POST_CREATORS = [
  createCustomWebsitePost,
  createLocalSEOPost,
  createGoogleBusinessProfilePost,
  createWebsiteRedesignPost,
  createLandingPagePost,
  createFacebookGoogleAdsPost,
  createWebsiteMistakesPost,
  createLeadCentralizationPost,
  createBloggingLocalSEOPost,
  createDigitalStarterPackPost,
];

/**
 * Execute all blog post creation operations
 */
const execute = async (): Promise<number> => {
  console.log("Creating blog posts...");

  let totalCreated = 0;

  for (const createPost of POST_CREATORS) {
    try {
      const postId = await createPost();
      if (postId) {
        totalCreated++;
        console.log(`✓ Created post with ID: ${postId}`);
      }
    } catch (error) {
      console.error(`✗ Failed to create post:`, error);
      throw error;
    }
  }

  console.log(`Blog posts creation completed. Total created: ${totalCreated}`);
  return totalCreated;
};

/**
 * Clear all blog posts and related data
 * Note: This removes all blog posts, including their tag relationships
 */
const clear = async (): Promise<void> => {
  console.log("Clearing blog posts...");

  // Note: Due to foreign key constraints, we should clear in the proper order
  // The individual post files handle their own cleanup logic
  // For now, we'll just clear the main blog posts table
  // (cascade deletes should handle the relationships)

  const { db } = await import("../../index");
  const { blogPosts, blogPostsTags } = await import("../../schema/index");

  // Clear tag relationships first
  await db.delete(blogPostsTags);

  // Clear blog posts
  await db.delete(blogPosts);

  console.log("✓ Blog posts cleared");
};

/**
 * Blog posts seed operation configuration
 */
export const blogPostsSeed: SeedOperation = {
  config: {
    name: "blog-posts",
    order: 4,
    description:
      "Seed blog posts with all related data (categories, authors, tags)",
  },
  execute,
  clear,
};
