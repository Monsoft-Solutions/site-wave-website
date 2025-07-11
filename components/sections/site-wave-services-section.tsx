"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Globe,
  Search,
  Smartphone,
  TrendingUp,
  Bot,
  Palette,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

const services = [
  {
    icon: Globe,
    title: "Website Development",
    description:
      "Custom websites built from scratch to match your brand and attract customers",
    features: [
      "Custom design & development",
      "Mobile-responsive",
      "SEO-optimized",
      "Content management system",
    ],
    pricing: "$500 - $8,000",
    popular: true,
  },
  {
    icon: Search,
    title: "Local SEO",
    description: "Get found on Google by local customers in Southwest Florida",
    features: [
      "Local keyword optimization",
      "Google Business Profile setup",
      "Citation building",
      "Performance tracking",
    ],
    pricing: "$800 - $2,500/month",
    popular: false,
  },
  {
    icon: Smartphone,
    title: "Digital Marketing",
    description: "Social media, ads, and online presence to grow your business",
    features: [
      "Social media management",
      "Google & Meta ads",
      "Review management",
      "Lead generation",
    ],
    pricing: "$400 - $1,500/month",
    popular: false,
  },
  {
    icon: TrendingUp,
    title: "Analytics & Reporting",
    description: "Understand your customers and measure your success",
    features: [
      "Google Analytics setup",
      "Custom dashboards",
      "Performance tracking",
      "Monthly reports",
    ],
    pricing: "$400 - $1,500",
    popular: false,
  },
  {
    icon: Bot,
    title: "Business Automation",
    description: "CRM, lead management, and workflow automation to save time",
    features: [
      "CRM implementation",
      "Lead automation",
      "Email sequences",
      "Integration setup",
    ],
    pricing: "$800 - $4,000",
    popular: false,
  },
  {
    icon: Palette,
    title: "Design Services",
    description: "Professional branding, logos, and marketing materials",
    features: [
      "Logo & brand identity",
      "Print design",
      "Digital graphics",
      "Marketing materials",
    ],
    pricing: "$150 - $2,000",
    popular: false,
  },
];

export function SiteWaveServicesSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section
      id="services"
      className="py-20 lg:py-32 bg-gradient-to-b from-background to-soft-sand/30"
    >
      <div className="container mx-auto px-4" ref={ref}>
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-deep-navy mb-4">
              Complete Digital Solutions
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything your Southwest Florida business needs to succeed online
              – from websites to marketing to automation.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card
                className={`relative h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  service.popular
                    ? "border-ocean-blue shadow-lg ring-2 ring-ocean-blue/10"
                    : "border-border hover:border-ocean-blue/30"
                }`}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-coral-orange text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                      service.popular
                        ? "bg-ocean-blue text-white"
                        : "bg-ocean-blue/10 text-ocean-blue"
                    }`}
                  >
                    <service.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl font-heading text-deep-navy">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {service.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center gap-2"
                      >
                        <CheckCircle className="w-4 h-4 text-ocean-blue flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-muted-foreground">
                        Starting at
                      </span>
                      <span className="text-lg font-bold text-deep-navy">
                        {service.pricing}
                      </span>
                    </div>

                    <Button
                      asChild
                      className={`w-full group ${
                        service.popular
                          ? "bg-ocean-blue hover:bg-ocean-blue/90 text-white"
                          : "bg-transparent border-ocean-blue text-ocean-blue hover:bg-ocean-blue hover:text-white"
                      }`}
                      variant={service.popular ? "default" : "outline"}
                    >
                      <Link href="/contact">
                        Get Started
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <div className="bg-ocean-blue/5 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold font-heading text-deep-navy mb-4">
              Need a Custom Solution?
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              Every business is unique. Let&apos;s create a tailored package
              that fits your specific needs and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-ocean-blue hover:bg-ocean-blue/90 text-white"
              >
                <Link href="/contact">
                  Schedule Free Consultation
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-ocean-blue text-ocean-blue hover:bg-ocean-blue hover:text-white"
              >
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
