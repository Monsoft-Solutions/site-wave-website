# SiteWave Website Template

<div align="center">
  
  <h3>🚀 Modern, Full-Featured Website Template for Next.js</h3>
  
  <p>A production-ready website template featuring a blog system, contact forms, SEO optimization, and database integration</p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.3-black?logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
  [![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Latest-336791?logo=postgresql)](https://www.postgresql.org/)
  
</div>

## 🌟 Features

### Core Features

- ✅ **Modern Tech Stack** - Built with Next.js 15, TypeScript, and Tailwind CSS
- ✅ **Blog System** - Full-featured blog with categories, tags, and dynamic routing
- ✅ **Database Integration** - PostgreSQL with Drizzle ORM for type-safe database operations
- ✅ **Contact Forms** - Validated contact forms with spam protection
- ✅ **SEO Optimized** - Advanced SEO with dynamic sitemaps, Google Search Console integration, and structured data
- ✅ **Responsive Design** - Mobile-first approach with beautiful UI components
- ✅ **Dark Mode Support** - Built-in theme switching with next-themes
- ✅ **Type Safety** - End-to-end TypeScript with Zod validation

### Blog Features

- 📝 Dynamic blog posts with slugs
- 🏷️ Categories and tags system
- 🔍 Full-text search functionality
- 📅 Published/Draft/Archived status
- 👤 Author profiles with avatars
- 🔗 Related posts suggestions
- 📊 Reading time calculation
- 🎨 Markdown support with syntax highlighting

### Technical Features

- 🗄️ **Database Schema** - Pre-configured tables for blog posts, authors, categories, tags, and contact submissions
- 📧 **Email Integration** - Ready for email notifications
- 🔒 **Environment Variables** - Secure configuration with validation
- 🎨 **Component Library** - Pre-built UI components using shadcn/ui
- 📱 **Loading States** - Skeleton loaders and error boundaries
- 🚀 **Performance** - Optimized images, lazy loading, and caching strategies

### SEO & Search Engine Features

- 🗺️ **Dynamic Sitemap** - Automatically generated sitemap including all pages, blog posts, categories, and tags
- 🔍 **Google Search Console** - Direct integration with Google Indexing API for instant indexing
- 📊 **SEO Metadata** - Dynamic meta tags, Open Graph, and Twitter cards for all pages
- 🏷️ **Structured Data** - JSON-LD schema markup for better search results
- 🤖 **Robots.txt** - Dynamic robots.txt generation with sitemap reference
- ⚡ **Instant Indexing** - Notify Google immediately when content is added or updated

## 🛠️ Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Database:** [PostgreSQL](https://www.postgresql.org/)
- **ORM:** [Drizzle ORM](https://orm.drizzle.team/)
- **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **Markdown:** [React Markdown](https://github.com/remarkjs/react-markdown) + [Gray Matter](https://github.com/jonschlinkert/gray-matter)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Date Handling:** [date-fns](https://date-fns.org/)

## 📋 Prerequisites

- Node.js 18.17 or later
- PostgreSQL database
- npm, yarn, pnpm, or bun package manager

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Monsoft-Solutions/website-template
cd website-template
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 3. Set up environment variables

Copy the example environment file and update with your values:

```bash
cp env.example .env
```

Update the `.env` file with your configuration:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/your_database_name

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME="Your Site Name"
NEXT_PUBLIC_SITE_DESCRIPTION="Your site description"

# Contact Form Email (Optional)
EMAIL_FROM=noreply@yoursite.com
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password

# Google Search Console (Optional - for instant indexing)
GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."

# Analytics (Optional)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

### 4. Set up the database

Generate and run database migrations:

```bash
# Generate migrations
npm run db:generate

# Run migrations
npm run db:migrate

# (Optional) Seed the database with sample data
npm run db:seed
```

### 5. Run the development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see your website.

## 📁 Project Structure

```
site-wave-website/
├── app/                        # Next.js App Router
│   ├── api/                    # API routes
│   ├── about/                  # About page
│   ├── blog/                   # Blog pages
│   │   └── [slug]/            # Dynamic blog post pages
│   ├── contact/               # Contact page
│   ├── services/              # Services page
│   ├── layout.tsx             # Root layout
│   ├── page.tsx               # Home page
│   ├── error.tsx              # Error boundary
│   ├── not-found.tsx          # 404 page
│   ├── loading.tsx            # Loading state
│   ├── sitemap.ts             # Dynamic sitemap
│   └── robots.ts              # Dynamic robots.txt
│
├── components/                 # React components
│   ├── forms/                 # Form components
│   ├── layout/                # Layout components (Header, Footer, etc.)
│   ├── seo/                   # SEO components
│   └── ui/                    # shadcn/ui components
│
├── lib/                       # Utilities and configurations
│   ├── api/                   # API client functions
│   ├── config/                # Site configuration
│   ├── db/                    # Database configuration
│   │   ├── migrations/        # Database migrations
│   │   ├── schema/            # Database schema definitions
│   │   └── seed/              # Database seeders
│   ├── types/                 # TypeScript type definitions
│   └── utils/                 # Utility functions
│
├── public/                    # Static assets
│   └── images/               # Images
│
├── .env.example              # Environment variables example
├── drizzle.config.ts         # Drizzle ORM configuration
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind CSS configuration
└── tsconfig.json             # TypeScript configuration
```

## 🗄️ Database Schema

The template includes a complete database schema for a blog system:

### Tables

- **authors** - Blog post authors with profiles
- **categories** - Post categories with slugs
- **blog_posts** - Blog posts with full metadata
- **tags** - Tags for blog posts
- **blog_posts_tags** - Many-to-many relationship
- **contact_submissions** - Contact form submissions

## 🎨 Customization

### Site Configuration

Edit `lib/config/site.ts` to customize your site:

```typescript
export const siteConfig = {
  name: "Your Site Name",
  description: "Your site description",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://yoursite.com",
  ogImage: "/og-image.jpg",
  links: {
    twitter: "https://twitter.com/yourhandle",
    github: "https://github.com/yourhandle",
  },
};
```

### Styling

- Tailwind configuration: `tailwind.config.ts`
- Global styles: `app/globals.css`
- Component variants: Using CVA (Class Variance Authority)

### Adding New Pages

1. Create a new directory in `app/`
2. Add a `page.tsx` file
3. Export a default React component

Example:

```typescript
// app/new-page/page.tsx
export default function NewPage() {
  return (
    <div>
      <h1>New Page</h1>
    </div>
  );
}
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Drizzle Studio (database GUI)
- `npm run db:seed` - Seed database with sample data
- `npm run sitemap:notify` - Submit all pages to Google for indexing

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Other Platforms

The template can be deployed to any platform that supports Next.js:

- Railway
- Netlify
- DigitalOcean App Platform
- AWS Amplify
- Google Cloud Run

### Database Hosting Options

- [Supabase](https://supabase.com/) (Recommended)
- [Neon](https://neon.tech/)
- [Railway](https://railway.app/)
- [DigitalOcean Managed Databases](https://www.digitalocean.com/products/managed-databases)

## 🔍 SEO Configuration

### Dynamic Sitemap

The website automatically generates a comprehensive sitemap at `/sitemap.xml` that includes:

- All static pages (home, about, services, contact, blog)
- All published blog posts with their slugs
- All blog categories and tags
- Proper last modified dates and priorities

The sitemap is generated dynamically using Next.js's built-in sitemap support, ensuring it's always up-to-date.

### Google Search Console Integration

To enable instant indexing with Google Search Console:

1. **Create a Service Account** in Google Cloud Console
2. **Add the service account** to your Google Search Console property
3. **Set environment variables**:

   ```env
   GOOGLE_CLIENT_EMAIL=your-service-account@project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...your-key...\n-----END PRIVATE KEY-----\n"
   ```

4. **Submit pages to Google**:
   ```bash
   npm run sitemap:notify
   ```

This will:

- Fetch all URLs from your dynamic sitemap
- Submit them to Google using the Indexing API
- Report success/failure for each URL

### SEO Best Practices

- **Meta Tags**: Each page has customizable meta titles and descriptions
- **Open Graph**: Social media previews for all pages
- **Structured Data**: JSON-LD markup for blog posts and organization info
- **Robots.txt**: Automatically generated with sitemap reference
- **Canonical URLs**: Proper canonical tags to avoid duplicate content

## 🧪 Development Guidelines

### Code Style

- Follow TypeScript best practices
- Use kebab-case for file names
- Use PascalCase for components and types
- Use camelCase for functions and variables
- Add proper TypeScript types - avoid `any`

### Component Development

1. Create components in `components/` directory
2. Use TypeScript interfaces for props
3. Add JSDoc comments for complex components
4. Follow the established naming conventions

### Database Changes

1. Modify schema in `lib/db/schema/`
2. Generate migration: `npm run db:generate`
3. Apply migration: `npm run db:migrate`

## 🔧 Troubleshooting

### Common Issues

**Database Connection Errors**

- Ensure PostgreSQL is running
- Check DATABASE_URL in `.env`
- Verify database credentials

**Build Errors**

- Clear `.next` directory: `rm -rf .next`
- Delete `node_modules` and reinstall
- Check for TypeScript errors: `npx tsc --noEmit`

**Environment Variables**

- Ensure all required variables are set
- Check for typos in variable names
- Restart dev server after changes

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [Apache License 2.0](LICENSE).

## 👤 Creator

**Monsoft Solutions**

- Website: [https://monsoft.io](https://monsoft.io)
- Email: [hello@monsoftsolutions.com](mailto:hello@monsoftsolutions.com)
- GitHub: [Monsoft-Solutions](https://github.com/Monsoft-Solutions)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [shadcn/ui](https://ui.shadcn.com/) for the beautiful components
- [Drizzle ORM](https://orm.drizzle.team/) for the type-safe database toolkit
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework

---

<div align="center">
  Made with ❤️ by <a href="https://monsoft.io">Monsoft Solutions, LLC</a>
</div>
