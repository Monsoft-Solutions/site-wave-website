/**
 * Barrel export for all seed operations
 * Each seed operation should be exported here to be automatically discovered
 */

export { siteConfigSeed } from "./00-site-config.seed";
export { adminUserSeed } from "./admin-user.seed";
export { categoriesSeed } from "./01-categories.seed";
export { authorsSeed } from "./02-authors.seed";
export { tagsSeed } from "./03-tags.seed";
export { blogPostsSeed } from "./04-blog-posts.seed";
export { blogPostTagsSeed } from "./05-blog-post-tags.seed";

// Site Wave Services - organized by category
export { servicesMasterSeed } from "./06-services-master.seed";
