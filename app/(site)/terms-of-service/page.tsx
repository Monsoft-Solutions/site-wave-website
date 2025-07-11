import { Metadata } from "next";
import { Markdown } from "@/components/ui/markdown";
import { generateSeoMetadata } from "@/lib/config/seo";

const termsContent = `# Terms of Service

*Last updated: ${new Date().toLocaleDateString()}*

## About Site Wave

**Site Wave** is a division of **Monsoft Solutions, LLC** that provides digital marketing, website development, SEO, and business automation services to small businesses and entrepreneurs in Southwest Florida, including Cape Coral, Fort Myers, Naples, and surrounding areas.

## Acceptance of Terms

By engaging our services, visiting our website, or entering into an agreement with Site Wave, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.

## Our Services

### Website Development & Design
- Custom website development and design
- Website redesigns and improvements
- E-commerce website development
- Mobile-responsive design implementation
- Website maintenance and updates

### SEO & Digital Marketing
- Search Engine Optimization (SEO)
- Local SEO and Google Business Profile optimization
- Content creation and blog development
- Social media setup and optimization
- Google Ads and Meta advertising campaigns

### Business Automation & Analytics
- Google Analytics and Search Console setup
- CRM implementation and automation
- Lead generation and management systems
- Business process automation
- Integration with third-party tools and platforms

## Service Agreement Terms

### Project Scope
- All services are provided based on agreed-upon project scope and deliverables
- Changes to project scope may result in additional charges
- Timeline estimates are provided in good faith but may vary based on project complexity
- Client cooperation and timely feedback are required for successful project completion

### Payment Terms
- **Payment Schedule**: As outlined in individual service agreements
- **Late Payments**: Late fees may apply to overdue invoices
- **Refund Policy**: Refunds are handled on a case-by-case basis
- **Disputed Charges**: Must be reported within 30 days of invoice date

### Client Responsibilities
- Provide accurate business information and requirements
- Supply necessary content, images, and brand materials
- Respond to requests for feedback within reasonable timeframes
- Maintain ownership and legality of all provided content
- Comply with platform terms of service (Google, Facebook, etc.)

## Intellectual Property

### Client-Owned Content
- You retain ownership of all content, images, and materials you provide
- You grant us license to use these materials for your project delivery
- You warrant that you have rights to all content you provide to us

### Site Wave Work Product
- Custom code, designs, and strategies developed specifically for your project become your property upon full payment
- We retain rights to general methodologies, processes, and non-client-specific knowledge
- We may showcase completed work in our portfolio (with your permission)

### Third-Party Assets
- Third-party plugins, themes, or tools remain subject to their respective licenses
- We ensure all third-party components are properly licensed for your use

## Service Guarantees and Limitations

### What We Guarantee
- Professional service delivery according to agreed specifications
- Industry-standard security practices for data handling
- Timely communication and project updates
- Compliance with platform best practices and guidelines

### What We Cannot Guarantee
- **Search Rankings**: SEO results depend on many factors beyond our control
- **Advertising Performance**: Ad campaign results vary based on market conditions
- **Website Traffic**: Organic traffic growth depends on content quality and market factors
- **Third-Party Platform Changes**: We're not responsible for changes to Google, Facebook, etc.

## Limitation of Liability

### Service Limitations
Site Wave's liability is limited to the amount paid for the specific services in question. We are not liable for:

- **Indirect Damages**: Lost profits, business interruption, or consequential damages
- **Third-Party Actions**: Changes to Google algorithms, platform policy updates, etc.
- **Data Loss**: Though we implement best practices, you're responsible for maintaining backups
- **Performance Metrics**: We optimize for best practices but cannot guarantee specific results

### Force Majeure
We are not responsible for delays or failures due to circumstances beyond our control, including natural disasters, technical failures, or changes in third-party services.

## Website Hosting and Maintenance

### Hosting Services
- Website hosting recommendations are provided based on your needs
- You maintain ownership and control of your hosting account
- We can manage hosting on your behalf with proper access credentials

### Ongoing Maintenance
- Website maintenance services are available separately
- Security updates and backups are recommended but not automatically included
- You are responsible for keeping content current and accurate

## Confidentiality

### Client Information
- We maintain strict confidentiality of all business information shared with us
- Client data is never shared with unauthorized parties
- We may use aggregated, anonymized data for case studies (with permission)

### Non-Disclosure
- Both parties agree to keep confidential information private
- This obligation continues beyond the termination of our service relationship

## Termination

### Client Termination
- You may terminate services with written notice
- Payment is due for all work completed up to termination date
- We will provide completed work and transfer ownership as applicable

### Site Wave Termination
- We may terminate services for non-payment or breach of terms
- We will provide reasonable notice except in cases of material breach
- You remain responsible for payment of services rendered

## Dispute Resolution

### Initial Resolution
- Disputes should first be addressed through direct communication
- We're committed to finding mutually acceptable solutions
- Good faith effort to resolve issues is expected from both parties

### Formal Disputes
- Disputes will be governed by Florida state law
- Venue for legal proceedings is in Lee County, Florida
- Both parties agree to attempt mediation before litigation

## Service Areas and Local Focus

Site Wave proudly serves businesses throughout Southwest Florida, including:
- Cape Coral
- Fort Myers
- Naples
- Bonita Springs
- Estero
- And surrounding SWFL communities

## Platform Compliance

### Third-Party Platforms
We ensure compliance with terms of service for:
- Google (Analytics, Ads, Business Profile, Search Console)
- Meta platforms (Facebook, Instagram)
- Social media platforms
- Hosting and domain providers

### Policy Changes
- We monitor platform policy changes and update strategies accordingly
- Clients will be notified of significant changes affecting their services

## Updates to Terms

These terms may be updated to reflect:
- Changes in our service offerings
- Legal or regulatory requirements
- Industry best practices
- Platform policy updates

Significant changes will be communicated via email or website notice.

## Contact Information

For questions about these terms or our services:

**Site Wave by Monsoft Solutions, LLC**  
Website: [https://sitewavefl.com](https://sitewavefl.com)  
Email: [Contact through our website contact form]  
Service Area: Cape Coral, Fort Myers, Naples, and Southwest Florida

## Effective Date

These terms are effective as of the last updated date shown above and apply to all current and future service agreements with Site Wave.

---

*By engaging our services, you acknowledge that you have read, understood, and agree to be bound by these terms of service. We're committed to helping your Southwest Florida business succeed online.*
`;

export const metadata: Metadata = generateSeoMetadata({
  title: "Terms of Service - Site Wave Digital Marketing",
  description:
    "Terms of service for Site Wave's digital marketing, website development, and SEO services for Southwest Florida businesses in Cape Coral, Fort Myers, and Naples.",
});

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container py-16">
        <div className="mx-auto max-w-4xl">
          <Markdown content={termsContent} className="prose-lg" />
        </div>
      </div>
    </div>
  );
}
