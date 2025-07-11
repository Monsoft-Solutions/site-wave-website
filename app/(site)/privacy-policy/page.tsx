import { Metadata } from "next";
import { Markdown } from "@/components/ui/markdown";
import { generateSeoMetadata } from "@/lib/config/seo";

const privacyContent = `# Privacy Policy

*Last updated: ${new Date().toLocaleDateString()}*

## About Site Wave

**Site Wave** is a division of **Monsoft Solutions, LLC** that provides digital marketing, website development, SEO, and business automation services to small businesses and entrepreneurs in Southwest Florida, including Cape Coral, Fort Myers, Naples, and surrounding areas.

## Information We Collect

### Personal Information
When you use our services or visit our website, we may collect:

- **Contact Information**: Name, email address, phone number, business name, and mailing address
- **Business Information**: Industry, services offered, target audience, and business goals
- **Website Analytics**: Information about how you interact with our website through Google Analytics
- **Communication Records**: Records of our conversations, emails, and support interactions
- **Payment Information**: Billing details and payment history (processed securely through third-party providers)

### Service-Specific Data Collection

**Website Development Services**:
- Content provided for your website
- Brand assets (logos, images, documents)
- Hosting and domain preferences

**SEO & Marketing Services**:
- Current website performance data
- Social media account information
- Google Business Profile access
- Competitor analysis data

**Automation & CRM Services**:
- Lead data and customer information you share with us
- Business process documentation
- Integration requirements and existing tool access

## How We Use Your Information

We use collected information to:

- **Deliver Services**: Provide the digital marketing, website, SEO, and automation services you've contracted
- **Communication**: Keep you informed about project progress, send service updates, and provide customer support
- **Service Improvement**: Analyze service performance and improve our offerings
- **Legal Compliance**: Meet legal obligations and protect against fraud
- **Marketing**: Send relevant updates about our services (with your consent)

## Information Sharing and Disclosure

### Third-Party Service Providers
We work with trusted partners to deliver our services:

- **Hosting Providers**: For website hosting and domain management
- **Analytics Platforms**: Google Analytics, Search Console, and similar tools
- **Marketing Platforms**: Social media management tools, email marketing services
- **Payment Processors**: Secure payment processing (we never store credit card information)
- **CRM and Automation Tools**: Airtable, automation platforms, and similar services

### Client Data
- We maintain strict confidentiality of your business information
- Client data is never shared with competitors or unauthorized parties
- We may use aggregated, anonymized data for case studies (with permission)

### Legal Requirements
We may disclose information when required by law, court order, or to protect our rights and safety.

## Data Security

We implement industry-standard security measures:

- **Encryption**: All data transmission is encrypted using SSL/TLS
- **Access Controls**: Limited access to client data on a need-to-know basis
- **Regular Updates**: Security patches and software updates are applied promptly
- **Secure Storage**: Client data is stored on secure, reputable platforms
- **Staff Training**: Our team is trained on data privacy and security practices

## Data Retention

- **Active Clients**: We retain data for the duration of our service relationship
- **Former Clients**: Data is retained for up to 7 years for business and legal purposes
- **Marketing Data**: Email subscribers can unsubscribe at any time
- **Website Analytics**: Follows Google Analytics retention settings (26 months by default)

## Your Rights and Choices

You have the right to:

- **Access**: Request a copy of the personal information we have about you
- **Correction**: Request correction of inaccurate information
- **Deletion**: Request deletion of your data (subject to legal requirements)
- **Portability**: Receive your data in a portable format
- **Opt-Out**: Unsubscribe from marketing communications
- **Restrict Processing**: Limit how we use your information

## Cookies and Tracking

Our website uses:

- **Essential Cookies**: Required for website functionality
- **Analytics Cookies**: Google Analytics to understand website usage
- **Marketing Cookies**: For retargeting and advertising (with consent)

You can control cookie preferences through your browser settings.

## Third-Party Websites

Our services may link to or integrate with third-party websites and services. Each has its own privacy policy that we encourage you to review:

- Google (Analytics, Ads, Business Profile)
- Social media platforms (Facebook, Instagram, LinkedIn)
- Payment processors
- Hosting and domain providers

## Children's Privacy

Our services are designed for businesses and we do not knowingly collect information from children under 13.

## Southwest Florida Focus

As a local business serving Southwest Florida, we understand the importance of community trust and maintain high standards for protecting local business information.

## Updates to This Policy

We may update this privacy policy to reflect:

- Changes in our services or business practices
- New legal requirements
- Technology updates or security improvements

Significant changes will be communicated via email or website notice.

## Contact Us

For questions about this privacy policy or to exercise your rights:

**Site Wave by Monsoft Solutions, LLC**  
Website: [https://sitewavefl.com](https://sitewavefl.com)  
Email: [Contact through our website contact form]  
Service Area: Cape Coral, Fort Myers, Naples, and Southwest Florida

## Effective Date

This privacy policy is effective as of the last updated date shown above and applies to all information collected by Site Wave.

---

*Your privacy is important to us. We're committed to protecting your information while helping your Southwest Florida business succeed online.*
`;

export const metadata: Metadata = generateSeoMetadata({
  title: "Privacy Policy - Site Wave Digital Marketing",
  description:
    "Privacy policy for Site Wave, providing digital marketing, website development, and SEO services to Southwest Florida businesses in Cape Coral, Fort Myers, and Naples.",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container py-16">
        <div className="mx-auto max-w-4xl">
          <Markdown content={privacyContent} className="prose-lg" />
        </div>
      </div>
    </div>
  );
}
