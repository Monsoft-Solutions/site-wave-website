# Blog Posts Seed System

This directory contains individual blog post seed files. Each file is responsible for creating a single blog post along with all its related data (categories, authors, tags).

## Structure

- **Individual Post Files**: Each blog post has its own file named with a number prefix (e.g., `01-custom-website-small-business.post.ts`)
- **Coordinator**: The main `04-blog-posts.seed.ts` file in the operations directory orchestrates all posts
- **Index**: The `index.ts` file exports all post creation functions for easy importing

## How to Add a New Blog Post

### 1. Create the Post File

Create a new file following the naming convention: `XX-descriptive-name.post.ts`

```typescript
import { db } from "../../index";
import {
  blogPosts,
  categories,
  authors,
  tags,
  blogPostsTags,
} from "../../schema/index";
import { eq, inArray } from "drizzle-orm";

// Define your post data
const POST_DATA = {
  title: "Your Post Title",
  slug: "your-post-slug",
  excerpt: "Brief description of your post",
  // ... other fields
};

// Define required category, author, and tags
const REQUIRED_CATEGORY = {
  name: "Category Name",
  slug: "category-slug",
  description: "Category description",
};

const REQUIRED_AUTHOR = {
  name: "Author Name",
  email: "author@example.com",
  bio: "Author bio",
  avatarUrl: "https://example.com/avatar.jpg",
};

const REQUIRED_TAGS = [
  { name: "Tag 1", slug: "tag-1" },
  { name: "Tag 2", slug: "tag-2" },
  // ... more tags
];

// Implementation functions
const ensureCategory = async () => {
  /* ... */
};
const ensureAuthor = async () => {
  /* ... */
};
const ensureTags = async () => {
  /* ... */
};

// Main export function
export const createYourPost = async (): Promise<string> => {
  // Implementation
};
```

### 2. Update the Index File

Add your new post to `index.ts`:

```typescript
export { createYourPost } from "./XX-your-post-name.post";

export const ALL_POST_CREATORS = [
  createCustomWebsitePost,
  createYourPost, // Add your new post here
];
```

### 3. Update the Coordinator

Add your post to the `POST_CREATORS` array in `../operations/04-blog-posts.seed.ts`:

```typescript
import { createYourPost } from "../posts/XX-your-post-name.post";

const POST_CREATORS = [
  createCustomWebsitePost,
  createYourPost, // Add your new post here
];
```

## Post Data Structure

Each post should include the following fields:

- `title`: The post title
- `slug`: URL-friendly version of the title
- `excerpt`: Short description for previews
- `content`: Full markdown content
- `featuredImage`: URL to the featured image
- `metaTitle`: SEO title
- `metaDescription`: SEO description
- `metaKeywords`: SEO keywords
- `status`: "published" or "draft"
- `publishedAt`: Publication date

## Best Practices

1. **SEO Optimization**: Include proper meta tags and keywords
2. **Local Focus**: Target Southwest Florida (SWFL) market
3. **Comprehensive Content**: Include detailed, helpful content
4. **Proper Tagging**: Use relevant tags for better organization
5. **Error Handling**: Check if posts already exist before creating
6. **Relationships**: Ensure all required categories, authors, and tags exist

## Business Focus

All blog posts should align with Site Wave's business model:

- Target small businesses in Southwest Florida
- Focus on web development, SEO, and digital marketing
- Include local references (Cape Coral, Fort Myers, Naples)
- Provide actionable insights and tips
- Include clear calls to action

## Running the Seeds

To run all blog post seeds:

```bash
npm run seed
```

To run only blog posts:

```bash
npm run seed:blog-posts
```

## Content Guidelines

- Use proper markdown formatting
- Include actionable tips and insights
- Target local Southwest Florida market
- Maintain professional but approachable tone
- Include relevant case studies or examples
- End with clear calls to action
- Optimize for target keywords
