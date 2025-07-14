/**
 * Blog Posts Index
 * Central export file for all individual blog post creation functions
 */

import { createCustomWebsitePost } from "./01-custom-website-small-business.post";
import { createLocalSEOPost } from "./02-local-seo-cape-coral.post";
import { createGoogleBusinessProfilePost } from "./03-google-business-profile-naples.post";
import { createWebsiteRedesignPost } from "./04-website-redesign-checklist.post";
import { createLandingPagePost } from "./05-high-converting-landing-page.post";
import { createFacebookGoogleAdsPost } from "./06-facebook-vs-google-ads.post";
import { createWebsiteMistakesPost } from "./07-website-mistakes-small-business.post";
import { createLeadCentralizationPost } from "./08-centralize-leads-automation.post";
import { createBloggingLocalSEOPost } from "./09-blogging-local-seo.post";
import { createDigitalStarterPackPost } from "./10-digital-starter-pack.post";

// Individual post exports
export { createCustomWebsitePost } from "./01-custom-website-small-business.post";
export { createLocalSEOPost } from "./02-local-seo-cape-coral.post";
export { createGoogleBusinessProfilePost } from "./03-google-business-profile-naples.post";
export { createWebsiteRedesignPost } from "./04-website-redesign-checklist.post";
export { createLandingPagePost } from "./05-high-converting-landing-page.post";

// Add new post exports here as you create them
export { createFacebookGoogleAdsPost } from "./06-facebook-vs-google-ads.post";
export { createWebsiteMistakesPost } from "./07-website-mistakes-small-business.post";
export { createLeadCentralizationPost } from "./08-centralize-leads-automation.post";
export { createBloggingLocalSEOPost } from "./09-blogging-local-seo.post";
export { createDigitalStarterPackPost } from "./10-digital-starter-pack.post";

/**
 * Array of all post creation functions
 * This can be used by the coordinator to execute all posts
 */
export const ALL_POST_CREATORS = [
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
