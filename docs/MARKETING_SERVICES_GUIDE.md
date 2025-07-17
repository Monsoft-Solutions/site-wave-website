# Service-Specific Marketing Pages Guide

## Overview

The enhanced marketing system now supports service-specific landing pages that can be targeted for different services across various locations. This provides better SEO targeting and higher conversion rates with dynamic pricing, offers, and discount capabilities.

## URL Structure

The URL structure supports both path parameters and query parameters:

```
/marketing/[location]/[service]?price=[price]&offer=[offer]&discount=[discount]
```

### Path Parameters

#### Location Parameter (`[location]`)

Must be one of the valid location slugs (case-insensitive, kebab-case format).

#### Service Parameter (`[service]`)

Must be one of the valid service slugs (exact match required).

### Query Parameters (Optional)

#### Price Parameter (`?price=`)

- **Format**: Currency string (e.g., "$2,999", "$1,500.00", "€1,200")
- **Default**: Uses the service's `startingPrice` if not provided
- **Examples**:
  - `?price=$2,500`
  - `?price=$1,999.99`
  - `?price=2000` (will be formatted as currency)

#### Offer Parameter (`?offer=`)

- **Format**: Free-form text for promotional messaging
- **Examples**:
  - `?offer=Limited Time 20% Off`
  - `?offer=Free Consultation This Month`
  - `?offer=Spring Special - 30% Discount`

#### Discount Parameter (`?discount=`)

- **Format**: Percentage value (0-100)
- **Behavior**: Automatically calculates discounted price from base price
- **Examples**:
  - `?discount=20` (20% off)
  - `?discount=15` (15% off)
  - `?discount=30` (30% off)

### Complete URL Examples

- `/marketing/cape-coral/custom-website-development?price=$2,500&discount=20&offer=Spring Special`
- `/marketing/fort-myers/local-seo-optimization?discount=15`
- `/marketing/naples/google-business-management?price=$499&offer=Limited Time Offer`

## Available Services

### 1. Custom Website Development

- **Slug**: `custom-website-development`
- **Starting Price**: $2,999
- **Target**: Businesses needing new websites
- **Best For**: Small to medium businesses looking for professional web presence
- **Keywords**: custom website, web development, business website, professional website
- **Benefits**:
  - 100% custom design tailored to your brand
  - Mobile-responsive across all devices
  - SEO-optimized for search engines
  - Fast loading speed and performance
  - Secure and reliable hosting included
- **Process**: Discovery & Strategy Session → Custom Design & Wireframing → Development & Integration → Testing & Launch
- **Features**: Custom Design & Branding, Mobile-Responsive Layout, SEO Optimization, Content Management System, Security & SSL Certificate, Analytics & Tracking Setup
- **Deliverables**: Fully functional custom website, Mobile-responsive design, SEO-optimized content structure, Content management system, 1 year of hosting & support

### 2. Website Redesign & Optimization

- **Slug**: `website-redesign-optimization`
- **Starting Price**: $1,999
- **Target**: Businesses with outdated websites
- **Best For**: Established businesses wanting to modernize
- **Keywords**: website redesign, website optimization, website makeover, website refresh
- **Benefits**:
  - Modern, professional design that builds trust
  - Improved user experience and navigation
  - Better search engine rankings
  - Higher conversion rates and lead generation
  - Mobile-first responsive design
- **Process**: Website Audit & Analysis → Redesign Strategy & Planning → Design & Development → Testing & Optimization
- **Features**: Complete Website Redesign, Performance Optimization, SEO Improvements, Mobile Optimization, User Experience Enhancement, Conversion Rate Optimization
- **Deliverables**: Completely redesigned website, Performance optimization report, SEO improvement implementation, Mobile-responsive upgrade, 3 months of optimization support

### 3. Local SEO Optimization

- **Slug**: `local-seo-optimization`
- **Starting Price**: $899
- **Target**: Local businesses wanting better search visibility
- **Best For**: Service-based businesses in competitive markets
- **Keywords**: local SEO, local search, Google My Business, local rankings
- **Benefits**:
  - Rank higher in local search results
  - Attract more local customers
  - Increase website traffic and calls
  - Build local business credibility
  - Outrank your competition
- **Process**: Local SEO Audit & Research → Google My Business Optimization → Local Citation Building → Review Management Setup
- **Features**: Google My Business Optimization, Local Keyword Research, Local Citation Building, Review Management, Local Content Creation, Local Link Building
- **Deliverables**: Optimized Google My Business profile, Local citation submissions, Local keyword optimization, Review management system, Monthly SEO performance reports

### 4. Google Business Management

- **Slug**: `google-business-management`
- **Starting Price**: $599
- **Target**: Businesses without optimized Google Business profiles
- **Best For**: Local businesses needing immediate online presence
- **Keywords**: Google Business, Google My Business, local business, business profile
- **Benefits**:
  - Professional Google Business Profile
  - Increased local visibility
  - More customer calls and directions
  - Enhanced business credibility
  - Improved local search rankings
- **Process**: Business Profile Setup → Optimization & Enhancement → Photo & Content Upload → Ongoing Management
- **Features**: Complete Profile Setup, Professional Photos, Business Information Optimization, Customer Review Management, Post Creation & Scheduling, Performance Tracking
- **Deliverables**: Fully optimized Google Business Profile, Professional business photos, Review management system, Monthly posting schedule, Performance tracking dashboard

### 5. E-commerce Solutions

- **Slug**: `e-commerce-solutions`
- **Starting Price**: $3,999
- **Target**: Businesses wanting to sell online
- **Best For**: Retail businesses expanding to online sales
- **Keywords**: e-commerce, online store, sell online, shopping cart
- **Benefits**:
  - Professional online store design
  - Secure payment processing
  - Inventory management system
  - 24/7 sales capability
  - Mobile-optimized shopping experience
- **Process**: E-commerce Strategy & Planning → Store Design & Development → Payment & Shipping Setup → Testing & Launch
- **Features**: Custom E-commerce Design, Secure Payment Processing, Inventory Management, Shopping Cart & Checkout, Product Management System, Order Management
- **Deliverables**: Complete e-commerce website, Payment gateway integration, Inventory management system, Order processing workflow, E-commerce training & support

### 6. Social Media Setup

- **Slug**: `social-media-setup`
- **Starting Price**: $799
- **Target**: Businesses lacking social media presence
- **Best For**: B2C businesses wanting to engage customers
- **Keywords**: social media, Facebook, Instagram, social media marketing
- **Benefits**:
  - Professional social media presence
  - Consistent brand messaging
  - Increased online visibility
  - Better customer engagement
  - Streamlined social media management
- **Process**: Social Media Strategy → Profile Setup & Optimization → Content Creation & Branding → Launch & Training
- **Features**: Multi-Platform Setup, Professional Profile Design, Content Template Creation, Brand Consistency, Social Media Guidelines, Analytics Setup
- **Deliverables**: Optimized social media profiles, Professional branding across platforms, Content templates and guidelines, Social media management training, Performance tracking setup

## Valid Locations

The system supports 70+ locations across Florida, with a focus on Southwest Florida (SWFL). All location parameters must be in kebab-case format.

### Southwest Florida (Primary Market)

- `cape-coral`
- `fort-myers`
- `naples`
- `bonita-springs`
- `estero`
- `sanibel`
- `fort-myers-beach`
- `marco-island`
- `punta-gorda`
- `port-charlotte`
- `venice`
- `sarasota`
- `bradenton`
- `lehigh-acres`
- `golden-gate`
- `immokalee`
- `labelle`
- `palmetto`
- `englewood`
- `north-port`
- `osprey`
- `siesta-key`
- `longboat-key`
- `anna-maria-island`
- `holmes-beach`
- `bradenton-beach`
- `palmetto-bay`
- `southwest-florida`
- `swfl`

### Major Florida Markets

- `florida`
- `tampa`
- `st-petersburg`
- `clearwater`
- `lakeland`
- `winter-haven`
- `ocala`
- `gainesville`
- `tallahassee`
- `jacksonville`
- `orlando`
- `kissimmee`
- `winter-park`
- `sanford`
- `melbourne`
- `cocoa-beach`
- `vero-beach`
- `stuart`
- `west-palm-beach`
- `boca-raton`
- `delray-beach`
- `boynton-beach`
- `lake-worth`
- `palm-beach`
- `jupiter`
- `fort-lauderdale`
- `hollywood`
- `pembroke-pines`
- `coral-springs`
- `sunrise`
- `plantation`
- `davie`
- `weston`
- `miami`
- `miami-beach`
- `coral-gables`
- `homestead`
- `key-largo`
- `marathon`
- `key-west`

### Location Formatting Examples

- **Input**: `Cape Coral` → **URL**: `cape-coral`
- **Input**: `Fort Myers Beach` → **URL**: `fort-myers-beach`
- **Input**: `St. Petersburg` → **URL**: `st-petersburg`
- **Input**: `Anna Maria Island` → **URL**: `anna-maria-island`

## Static Generation

### Pre-generated Pages

The system pre-generates pages for optimal performance using `generateStaticParams()`:

#### Major Cities (18 locations):

- `cape-coral`, `fort-myers`, `naples`, `bonita-springs`, `estero`
- `sarasota`, `bradenton`, `venice`, `punta-gorda`, `port-charlotte`
- `southwest-florida`, `swfl`, `florida`
- `tampa`, `st-petersburg`, `orlando`, `miami`, `fort-lauderdale`

#### All Services (6 services):

- `custom-website-development`
- `website-redesign-optimization`
- `local-seo-optimization`
- `google-business-management`
- `e-commerce-solutions`
- `social-media-setup`

**Total Pre-generated Pages**: 108 pages (18 cities × 6 services)

### Dynamic Generation

All other location/service combinations are generated on-demand for the full coverage of 70+ locations.

## Pricing & Discount System

### Price Calculation

The system uses a sophisticated price calculation function with decimal precision:

1. **Base Price**: Extracted from `price` parameter or service's `startingPrice`
2. **Discount Calculation**: Applied as percentage of base price
3. **Currency Formatting**: Uses `Intl.NumberFormat` for proper currency display
4. **Decimal Precision**: Maintains exactly 2 decimal places

### Examples with Calculations

#### Custom Website Development with 20% Discount:

```
Base Price: $2,999.00
Discount: 20%
Discount Amount: $599.80
Final Price: $2,399.20
URL: /marketing/cape-coral/custom-website-development?discount=20
```

#### Local SEO with Custom Price and 15% Discount:

```
Base Price: $1,200.00 (custom)
Discount: 15%
Discount Amount: $180.00
Final Price: $1,020.00
URL: /marketing/fort-myers/local-seo-optimization?price=$1,200&discount=15
```

#### Google Business Management with Special Offer:

```
Base Price: $599.00
No Discount
Final Price: $599.00
Special Offer: "March Special - Free Setup"
URL: /marketing/naples/google-business-management?offer=March Special - Free Setup
```

## Features

### Service-Specific Content

Each service page includes:

- Custom hero section with service-specific messaging
- Service-specific benefits and features
- Tailored process steps
- Relevant deliverables
- Service-specific testimonials
- Customized contact form

### SEO Optimization

- Service-specific meta titles and descriptions
- Location + service keyword targeting
- Service-specific Open Graph images
- Structured data for better search results

### Conversion Optimization

- Service-specific pricing display
- Relevant calls-to-action
- Service-focused testimonials
- Clear value propositions

## Usage Examples

### Basic Service Pages (No Query Parameters)

#### Custom Website Development in Cape Coral:

```
URL: /marketing/cape-coral/custom-website-development
Title: Custom Website Development in Cape Coral - Site Wave | $2,999.00
Description: Professional custom website development services in Cape Coral. Professional custom website development tailored to your business needs $2,999.00. Free consultation and strategy session.
Keywords: custom website Cape Coral, web development Cape Coral, business website Cape Coral, professional website Cape Coral, small business custom-website-development Cape Coral, professional custom-website-development Cape Coral, local custom-website-development services, affordable custom-website-development
```

#### Local SEO in Fort Myers:

```
URL: /marketing/fort-myers/local-seo-optimization
Title: Local SEO Optimization in Fort Myers - Site Wave | $899.00
Description: Professional local seo optimization services in Fort Myers. Dominate local search results and attract more customers in your area $899.00. Free consultation and strategy session.
Keywords: local SEO Fort Myers, local search Fort Myers, Google My Business Fort Myers, local rankings Fort Myers, small business local-seo-optimization Fort Myers, professional local-seo-optimization Fort Myers, local local-seo-optimization services, affordable local-seo-optimization
```

### Advanced Examples with Query Parameters

#### Website Development with Custom Pricing and Discount:

```
URL: /marketing/naples/custom-website-development?price=$3,500&discount=25&offer=Summer Special
Title: Custom Website Development in Naples - Site Wave | $2,625.00 (25% OFF)
Description: Professional custom website development services in Naples. Professional custom website development tailored to your business needs $2,625.00 - Save $875.00 with 25% discount!. Free consultation and strategy session.
Price Display: Original: $3,500.00 → Final: $2,625.00 (Save $875.00)
Offer Badge: "🎉 Summer Special"
```

#### E-commerce with Special Pricing:

```
URL: /marketing/sarasota/e-commerce-solutions?price=$4,500&discount=15
Title: E-commerce Solutions in Sarasota - Site Wave | $3,825.00 (15% OFF)
Description: Professional e-commerce solutions services in Sarasota. Complete e-commerce website development to sell your products online $3,825.00 - Save $675.00 with 15% discount!. Free consultation and strategy session.
Price Display: Original: $4,500.00 → Final: $3,825.00 (Save $675.00)
```

#### Google Business Management with Promotional Offer:

```
URL: /marketing/bonita-springs/google-business-management?offer=Free Review Management Setup
Title: Google Business Management in Bonita Springs - Site Wave | $599.00
Description: Professional google business management services in Bonita Springs. Professional Google Business Profile setup and management to attract local customers $599.00. Free consultation and strategy session.
Offer Badge: "🎉 Free Review Management Setup"
```

### Marketing Campaign URLs

#### Targeted Social Media Campaign:

```
Campaign: Facebook Ads for Local SEO
URL: /marketing/cape-coral/local-seo-optimization?discount=20&offer=Limited Time - 20% Off Local SEO
Target: Local businesses in Cape Coral
Budget Range: $899+ prospects
Expected Price: $719.20 (20% off $899)
```

#### Email Marketing Campaign:

```
Campaign: Website Redesign Newsletter
URL: /marketing/fort-myers/website-redesign-optimization?price=$1,599&discount=30&offer=Newsletter Exclusive
Target: Existing subscribers with outdated websites
Budget Range: $1,599+ prospects
Expected Price: $1,119.30 (30% off $1,599)
```

#### Google Ads Landing Page:

```
Campaign: Custom Website Development PPC
URL: /marketing/southwest-florida/custom-website-development?price=$2,500&offer=Google Ads Special
Target: SWFL business owners searching for web development
Budget Range: $2,500+ prospects
Price Display: $2,500.00
```

## Parameter Validation & Error Handling

### Location Validation

- **Case Sensitivity**: Location parameters are case-insensitive and converted to lowercase
- **Invalid Locations**: Returns 404 Not Found page
- **Format**: Must be kebab-case (e.g., `fort-myers-beach`, not `Fort Myers Beach`)

### Service Validation

- **Exact Match**: Service parameters must exactly match valid service slugs
- **Invalid Services**: Returns 404 Not Found page
- **Available Services**: Only the 6 pre-defined services are accepted

### Query Parameter Validation

#### Price Parameter

- **Format**: Accepts any currency format, extracts numeric value using regex `/[^\d.]/g`
- **Examples**: `$2,999`, `2999`, `$2,999.99`, `€2,999`, `2999.50`
- **Fallback**: Uses service's `startingPrice` if invalid or not provided

#### Discount Parameter

- **Range**: 0-100 (percentage)
- **Invalid Values**: Ignored if NaN, negative, or > 100
- **Calculation**: Applied to base price, maintains 2 decimal precision

#### Offer Parameter

- **Format**: Free-form text
- **Display**: Shows as promotional badge in hero section
- **URL Encoding**: Automatically handles URL encoding/decoding

## Marketing Campaigns

### Service-Specific Campaigns with Dynamic Pricing

You can now create highly targeted campaigns with custom pricing and offers:

#### 1. Website Development Campaigns

```
Standard Campaign:
URL: /marketing/[location]/custom-website-development
Price: $2,999.00 (default)

Premium Campaign:
URL: /marketing/[location]/custom-website-development?price=$3,999&offer=Premium Package
Price: $3,999.00

Discount Campaign:
URL: /marketing/[location]/custom-website-development?discount=20&offer=Early Bird Special
Price: $2,399.20 (20% off $2,999)
```

#### 2. Local SEO Campaigns

```
Standard Campaign:
URL: /marketing/[location]/local-seo-optimization
Price: $899.00 (default)

Quick Start Campaign:
URL: /marketing/[location]/local-seo-optimization?price=$699&offer=Quick Start Package
Price: $699.00

Seasonal Campaign:
URL: /marketing/[location]/local-seo-optimization?discount=25&offer=Summer Growth Special
Price: $674.25 (25% off $899)
```

#### 3. Google Business Management Campaigns

```
Basic Campaign:
URL: /marketing/[location]/google-business-management
Price: $599.00 (default)

Express Setup:
URL: /marketing/[location]/google-business-management?price=$399&offer=Express Setup
Price: $399.00

Limited Time Offer:
URL: /marketing/[location]/google-business-management?discount=30&offer=Limited Time - 30% Off
Price: $419.30 (30% off $599)
```

### A/B Testing Strategies

#### Price Point Testing

Test different price points for the same service:

```
Version A: /marketing/naples/custom-website-development
Version B: /marketing/naples/custom-website-development?price=$2,499
Version C: /marketing/naples/custom-website-development?price=$3,499&offer=Premium Package
```

#### Discount vs. Custom Pricing

```
Discount Approach: /marketing/fort-myers/local-seo-optimization?discount=20&offer=20% Off Limited Time
Custom Price: /marketing/fort-myers/local-seo-optimization?price=$719&offer=Special Pricing
```

#### Service Comparison Testing

Test different services for the same location:

```
High-End: /marketing/naples/custom-website-development?price=$3,999
Mid-Range: /marketing/naples/website-redesign-optimization?price=$1,999
Entry-Level: /marketing/naples/google-business-management?price=$599
```

#### Offer Message Testing

```
Urgency: ?offer=Limited Time - Only 5 Spots Left
Value: ?offer=Free SEO Consultation Included
Social Proof: ?offer=Join 500+ Satisfied SWFL Businesses
```

## Backward Compatibility

The original `/marketing/[location]` structure still works and automatically redirects to:

```
/marketing/[location]/custom-website-development
```

This ensures existing links and bookmarks continue to work.

## Implementation

### Static Generation

Pages are pre-generated for:

- 18 major cities/locations
- 6 high-converting services
- Total: 108 pre-generated pages

### Dynamic Generation

Additional combinations are generated on-demand for:

- All 70+ supported locations
- All 6 services
- Custom pricing and offers

## Analytics & Tracking

### Service-Specific Tracking

- Track conversions by service type
- Monitor which services perform best in each location
- Identify high-value service combinations

### Performance Metrics

- Conversion rates by service
- Cost per acquisition by service
- Customer lifetime value by service type

## Best Practices

### Content Strategy

1. **Service-Specific Benefits**: Highlight benefits specific to each service
2. **Local Relevance**: Include location-specific examples and case studies
3. **Clear Pricing**: Display service-specific pricing prominently
4. **Social Proof**: Use testimonials relevant to each service

### SEO Strategy

1. **Keyword Targeting**: Use service + location keyword combinations
2. **Content Depth**: Provide comprehensive service information
3. **Local Citations**: Include location-specific business information
4. **Schema Markup**: Implement service-specific structured data

### Conversion Optimization

1. **Service-Specific CTAs**: Use calls-to-action relevant to each service
2. **Progressive Disclosure**: Show service details progressively
3. **Social Proof**: Display service-specific testimonials and results
4. **Pricing Transparency**: Show clear, service-specific pricing

## Next Steps

1. **Set up tracking** for service-specific conversions
2. **Create service-specific content** for blog posts and resources
3. **Develop service-specific ad campaigns** for Google Ads and Facebook
4. **Monitor performance** and optimize based on conversion data
5. **Expand to additional services** as needed

This enhanced system provides much better targeting and conversion opportunities while maintaining the flexibility to serve all your different services effectively.
