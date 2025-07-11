"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, CheckCircle, Star, Zap, Rocket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import Link from "next/link";

const packages = [
  {
    id: "launch-grow",
    title: "Launch & Grow Kit",
    description: "Perfect for new businesses getting started online",
    priceRange: "$3,500 - $5,500",
    popular: false,
    icon: Rocket,
    features: [
      "Basic Website + Hosting",
      "Logo + Brand Identity",
      "Google Business Setup",
      "Social Media Setup (2 platforms)",
      "10 Social Media Posts",
      "SSL Certificate & Security",
      "30 Days Support",
    ],
    benefits: [
      "Complete online presence",
      "Professional branding",
      "Local visibility",
      "Social media ready",
    ],
  },
  {
    id: "level-up",
    title: "Level-Up Business Suite",
    description: "Comprehensive solution for growing businesses",
    priceRange: "$6,500 - $9,500",
    popular: true,
    icon: Star,
    features: [
      "Standard Website",
      "Complete Brand Package",
      "Local SEO Setup",
      "CRM Implementation",
      "Print Design (Cards + Brochure)",
      "Google Analytics Setup",
      "Lead Management System",
      "90 Days Support",
    ],
    benefits: [
      "Advanced online presence",
      "Lead generation ready",
      "Professional materials",
      "Business automation",
    ],
  },
  {
    id: "digital-takeover",
    title: "Total Digital Takeover",
    description: "Complete digital transformation for serious growth",
    priceRange: "$12,000 - $18,000",
    popular: false,
    icon: Zap,
    features: [
      "E-commerce or Advanced Website",
      "Full Design & SEO",
      "Automation + Ads Setup",
      "6 Months Management & Analytics",
      "Custom Integrations",
      "Review Management System",
      "Monthly Performance Reports",
      "Priority Support",
    ],
    benefits: [
      "Maximum online impact",
      "Complete automation",
      "Ongoing optimization",
      "Full-service management",
    ],
  },
];

export function SiteWaveServicePackages() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-soft-sand/30 to-background">
      <div className="container" ref={ref}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-deep-navy mb-4">
              Complete Service Packages
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need bundled together for maximum value and impact.
              Choose the package that fits your business goals.
            </p>
          </motion.div>
        </div>

        {/* Packages Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {packages.map((pkg) => (
            <motion.div key={pkg.id} variants={itemVariants}>
              <Card
                className={`relative h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 ${
                  pkg.popular
                    ? "border-ocean-blue shadow-lg ring-2 ring-ocean-blue/10"
                    : "border-border hover:border-ocean-blue/30"
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-coral-orange text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Most Popular
                    </div>
                  </div>
                )}

                <CardHeader className="pb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        pkg.popular
                          ? "bg-ocean-blue text-white"
                          : "bg-ocean-blue/10 text-ocean-blue"
                      }`}
                    >
                      <pkg.icon className="w-6 h-6" />
                    </div>
                    <Badge
                      variant="outline"
                      className="bg-soft-sand/50 border-ocean-blue/20"
                    >
                      Package Deal
                    </Badge>
                  </div>

                  <CardTitle className="text-2xl font-heading text-deep-navy mb-2">
                    {pkg.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground mb-4">
                    {pkg.description}
                  </CardDescription>

                  <div className="mb-6">
                    <span className="text-3xl font-bold text-deep-navy">
                      {pkg.priceRange}
                    </span>
                    <span className="text-muted-foreground ml-2">one-time</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Features */}
                  <div>
                    <h4 className="font-semibold text-deep-navy mb-3">
                      What&apos;s Included:
                    </h4>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-start text-sm text-muted-foreground"
                        >
                          <CheckCircle className="w-4 h-4 text-ocean-blue mr-2 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Benefits */}
                  <div className="border-t pt-4">
                    <h4 className="font-semibold text-deep-navy mb-3">
                      Key Benefits:
                    </h4>
                    <ul className="space-y-2">
                      {pkg.benefits.map((benefit, index) => (
                        <li
                          key={index}
                          className="flex items-start text-sm text-muted-foreground"
                        >
                          <Star className="w-4 h-4 text-coral-orange mr-2 flex-shrink-0 mt-0.5" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <Button
                      asChild
                      className={`w-full transition-all ${
                        pkg.popular
                          ? "bg-ocean-blue hover:bg-ocean-blue/90 text-white"
                          : "bg-ocean-blue/10 hover:bg-ocean-blue text-ocean-blue hover:text-white"
                      }`}
                      size="lg"
                    >
                      <Link
                        href="/contact"
                        className="flex items-center justify-center group"
                      >
                        Get Started
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-background/80 backdrop-blur-sm rounded-xl p-8 border border-ocean-blue/20">
            <h3 className="text-2xl font-bold font-heading text-deep-navy mb-4">
              Need Something Custom?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Every business is unique. We can create a custom package that
              perfectly fits your needs and budget. Let&apos;s discuss your
              specific requirements.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-coral-orange hover:bg-coral-orange/90 text-white px-8 py-6 text-lg font-semibold group"
              >
                <Link href="/contact">
                  Get Custom Quote
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-ocean-blue text-ocean-blue hover:bg-ocean-blue hover:text-white px-8 py-6 text-lg font-semibold"
              >
                <Link href="/contact">Schedule Call</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
