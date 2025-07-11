"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  HelpCircle,
  ChevronDown,
  MapPin,
  DollarSign,
  Globe,
  MessageSquare,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

// FAQ categories and questions specific to Site Wave
const faqData = [
  {
    id: "services",
    category: "Services",
    icon: Globe,
    color: "text-ocean-blue",
    questions: [
      {
        id: "what-services",
        question: "What services does Site Wave offer?",
        answer:
          "We provide complete digital solutions for Southwest Florida businesses including: custom website development, local SEO optimization, digital marketing (social media & ads), business automation (CRM & workflows), analytics & reporting, and professional design services. Everything your business needs to succeed online.",
      },
      {
        id: "local-focus",
        question: "Do you only work with businesses in Southwest Florida?",
        answer:
          "While we specialize in serving businesses in Cape Coral, Fort Myers, Naples, and the broader SWFL area, we also work with businesses throughout Florida and select clients nationwide. Our local expertise gives SWFL businesses a competitive advantage, but our services can benefit any business looking for quality digital solutions.",
      },
      {
        id: "website-types",
        question: "What types of websites do you build?",
        answer:
          "We build all types of websites: business websites, e-commerce stores, service provider sites, restaurants, real estate, healthcare, legal, and more. Every website is custom-designed to match your brand and built with SEO, mobile responsiveness, and conversion optimization in mind.",
      },
      {
        id: "seo-results",
        question: "How long does it take to see SEO results?",
        answer:
          "Local SEO improvements can be seen within 2-3 months, with significant results typically within 4-6 months. However, SEO is an ongoing process. We start with immediate optimizations (Google Business Profile, local citations) while building long-term organic growth through content and technical SEO.",
      },
    ],
  },
  {
    id: "pricing",
    category: "Pricing & Process",
    icon: DollarSign,
    color: "text-coral-orange",
    questions: [
      {
        id: "pricing-range",
        question: "How much do your services cost?",
        answer:
          "Our pricing varies by service: Websites ($500-$8,000), Local SEO ($800-$2,500/month), Digital Marketing ($400-$1,500/month), Business Automation ($800-$4,000), and Design Services ($150-$2,000). We offer package deals and custom pricing based on your needs. Every project starts with a free consultation to provide accurate pricing.",
      },
      {
        id: "payment-terms",
        question: "What are your payment terms?",
        answer:
          "We require 50% deposit to begin work, with the balance due before launch or per agreed milestones. Monthly services are billed in advance. We accept payments via check, ACH, or credit card. Rush projects may include a 25-50% premium.",
      },
      {
        id: "timeline",
        question: "How long does a typical project take?",
        answer:
          "Websites: 3-6 weeks, Website redesigns: 2-5 weeks, E-commerce sites: 4-8 weeks, SEO setup: 1-2 weeks (ongoing monthly), CRM implementation: 2-4 weeks. Timelines depend on project complexity and your feedback speed. We provide detailed project timelines during consultation.",
      },
      {
        id: "free-consultation",
        question: "What's included in the free consultation?",
        answer:
          "Your free 30-minute consultation includes: analysis of your current online presence, custom strategy recommendations, local market insights, competitive analysis, technology recommendations, transparent pricing options, and a clear timeline. No sales pressure - just valuable insights for your business.",
      },
    ],
  },
  {
    id: "local",
    category: "Local Expertise",
    icon: MapPin,
    color: "text-green-600",
    questions: [
      {
        id: "local-advantage",
        question: "What's the advantage of working with a local SWFL company?",
        answer:
          "We understand the Southwest Florida market, demographics, and seasonal business patterns. We know local competitors, popular keywords, and what resonates with SWFL customers. Plus, we're available for in-person meetings, local networking events, and we understand the unique challenges facing businesses in our area.",
      },
      {
        id: "meet-in-person",
        question: "Can we meet in person?",
        answer:
          "Absolutely! While we work efficiently online, we're happy to meet in person throughout Cape Coral, Fort Myers, Naples, and surrounding areas. We can meet at your business, a local coffee shop, or our office. Just mention your preference during the consultation scheduling.",
      },
      {
        id: "local-seo-difference",
        question: "How is local SEO different from regular SEO?",
        answer:
          "Local SEO focuses on helping your business appear in 'near me' searches and Google's local pack (map results). This includes optimizing your Google Business Profile, building local citations, managing reviews, and creating location-specific content. It's crucial for businesses serving customers in specific geographic areas like SWFL.",
      },
    ],
  },
  {
    id: "support",
    category: "Support & Maintenance",
    icon: MessageSquare,
    color: "text-purple-600",
    questions: [
      {
        id: "ongoing-support",
        question: "Do you provide ongoing support after launch?",
        answer:
          "Yes! All projects include 30-90 days of post-launch support depending on the service. We also offer ongoing maintenance plans ($100-$300/month) that include updates, backups, security monitoring, and technical support. Monthly services like SEO and marketing include continuous optimization and support.",
      },
      {
        id: "website-updates",
        question: "Can I update my website myself?",
        answer:
          "Absolutely! We build websites with user-friendly content management systems and provide training. You'll be able to update text, images, add blog posts, and make basic changes. For more complex updates or if you prefer us to handle everything, our maintenance plans are very affordable.",
      },
      {
        id: "emergency-support",
        question: "What if my website goes down or I have an emergency?",
        answer:
          "We offer emergency support for all our clients. Contact us immediately and we'll prioritize fixing critical issues. Clients on maintenance plans get priority support and faster response times. We also provide website monitoring to catch issues before they affect your business.",
      },
      {
        id: "hosting-included",
        question: "Is website hosting included?",
        answer:
          "Hosting can be included for an additional $150-$500/year depending on your needs. We use reliable, high-performance hosting optimized for business websites. This includes SSL certificates, daily backups, and monitoring. You can also use your own hosting provider if preferred.",
      },
    ],
  },
];

export function SiteWaveContactFaq() {
  const [activeCategory, setActiveCategory] = useState("services");
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const activeCategoryData = faqData.find((item) => item.id === activeCategory);

  const toggleQuestion = (questionId: string) => {
    setOpenQuestion(openQuestion === questionId ? null : questionId);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-soft-sand/20 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <Badge
              variant="outline"
              className="mb-4 px-4 py-2 border-ocean-blue/30 bg-background/90"
            >
              <HelpCircle className="w-4 h-4 mr-2 text-ocean-blue" />
              Frequently Asked Questions
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-deep-navy mb-4">
              Everything You Need to Know
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get answers to common questions about our services, pricing, and
              how we help Southwest Florida businesses grow online.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Category Navigation */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-1"
            >
              <div className="space-y-2 sticky top-8">
                {faqData.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-200 ${
                      activeCategory === category.id
                        ? "bg-ocean-blue text-white shadow-lg"
                        : "bg-background hover:bg-ocean-blue/5 border border-border"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <category.icon
                        className={`w-5 h-5 ${
                          activeCategory === category.id
                            ? "text-white"
                            : category.color
                        }`}
                      />
                      <span className="font-medium">{category.category}</span>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>

            {/* FAQ Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <AnimatePresence mode="wait">
                {activeCategoryData && (
                  <motion.div
                    key={activeCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="space-y-4"
                  >
                    {activeCategoryData.questions.map((faq, _index) => (
                      <motion.div
                        key={faq.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: _index * 0.1 }}
                      >
                        <Card className="overflow-hidden">
                          <CardHeader
                            className="cursor-pointer hover:bg-muted/50 transition-colors duration-200"
                            onClick={() => toggleQuestion(faq.id)}
                          >
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg font-heading text-deep-navy text-left">
                                {faq.question}
                              </CardTitle>
                              <motion.div
                                animate={{
                                  rotate: openQuestion === faq.id ? 180 : 0,
                                }}
                                transition={{ duration: 0.2 }}
                              >
                                <ChevronDown className="w-5 h-5 text-muted-foreground" />
                              </motion.div>
                            </div>
                          </CardHeader>
                          <AnimatePresence>
                            {openQuestion === faq.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <CardContent className="pt-0">
                                  <div className="prose prose-sm max-w-none text-muted-foreground">
                                    {faq.answer}
                                  </div>
                                </CardContent>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </Card>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Still Have Questions CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16"
          >
            <Card className="bg-gradient-to-br from-ocean-blue/5 to-coral-orange/5 border-ocean-blue/20">
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 bg-coral-orange/10 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-8 h-8 text-coral-orange" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold font-heading text-deep-navy mb-2">
                  Still Have Questions?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Can&apos;t find the answer you&apos;re looking for? Our
                  Southwest Florida team is here to help. Get personalized
                  answers and a custom strategy for your business.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    className="bg-coral-orange hover:bg-coral-orange/90 text-white group"
                    onClick={() => {
                      const formElement =
                        document.getElementById("contact-form");
                      if (formElement) {
                        formElement.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    Get Your Free Consultation
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-ocean-blue/30 text-ocean-blue hover:bg-ocean-blue/5"
                    onClick={() =>
                      (window.location.href = "tel:+1-239-555-0123")
                    }
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Call (239) 555-0123
                  </Button>
                </div>

                {/* Quick Benefits */}
                <div className="mt-8 pt-6 border-t border-ocean-blue/20">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4 text-ocean-blue" />
                      <span className="text-muted-foreground">
                        Free consultation
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4 text-ocean-blue" />
                      <span className="text-muted-foreground">
                        Local SWFL expertise
                      </span>
                    </div>
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle className="w-4 h-4 text-ocean-blue" />
                      <span className="text-muted-foreground">
                        No obligation
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
