"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  MessageSquare,
  Calendar,
  Heart,
  Star,
  Rocket,
  Phone,
  MapPin,
  Clock,
  Zap,
  Building2,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface CtaOption {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  buttonText: string;
  href: string;
  color: string;
  bgColor: string;
  featured?: boolean;
}

const ctaOptions: CtaOption[] = [
  {
    icon: Rocket,
    title: "Free Business Consultation",
    description:
      "Get a personalized digital strategy for your SWFL business. We'll analyze your current presence and show you exactly how to grow online.",
    buttonText: "Book Free Consultation",
    href: "/contact",
    color: "text-blue-600",
    bgColor: "bg-blue-500/10",
    featured: true,
  },
  {
    icon: MessageSquare,
    title: "Quick Project Quote",
    description:
      "Need a website, SEO, or marketing help? Get a transparent, no-obligation quote tailored to your business goals and budget.",
    buttonText: "Get Quote",
    href: "/contact",
    color: "text-orange-600",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Calendar,
    title: "Schedule a Call",
    description:
      "Prefer to talk? Schedule a 30-minute discovery call to discuss your business challenges and how we can help solve them.",
    buttonText: "Schedule Call",
    href: "/contact",
    color: "text-blue-600",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Building2,
    title: "Visit Our Office",
    description:
      "Located right here in Southwest Florida. Stop by for coffee and let's discuss your digital goals in person.",
    buttonText: "Get Directions",
    href: "/contact",
    color: "text-orange-600",
    bgColor: "bg-orange-500/10",
  },
];

export function AboutCtaSection() {
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
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-orange-600">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />

        {/* Floating Shapes */}
        <div className="absolute top-20 right-20 w-8 h-8 bg-white/20 rounded-full animate-bounce" />
        <div className="absolute bottom-20 left-20 w-6 h-6 bg-orange-400/30 rotate-45 animate-pulse" />
        <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-white/30 rounded-full animate-float" />
      </div>

      {/* Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8ZGVmcz4KICAgIDxwYXR0ZXJuIGlkPSJncmlkIiB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz4KICAgIDwvcGF0dGVybj4KICA8L2RlZnM+CiAgPHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPgo8L3N2Zz4=')] opacity-20" />

      <div className="container relative px-4" ref={ref}>
        <motion.div
          className="mx-auto max-w-7xl"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="text-center mb-12 md:mb-20"
          >
            <Badge
              variant="outline"
              className="mb-4 bg-white/10 border-white/20 text-white"
            >
              <Star className="w-4 h-4 mr-2 text-yellow-400" />
              Ready to Grow?
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-white">
              Let&apos;s Build Your{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Digital Success
              </span>{" "}
              Story
            </h2>
            <p className="text-lg md:text-xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Your Southwest Florida business deserves to thrive online. Whether
              you&apos;re just starting out or ready to scale, we&apos;re here
              to help you every step of the way.
            </p>
          </motion.div>

          {/* Main CTA Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12 md:mb-20">
            {ctaOptions.map((option) => {
              const IconComponent = option.icon;

              return (
                <motion.div key={option.title} variants={itemVariants}>
                  <Card
                    className={`group relative overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 ${
                      option.featured
                        ? "border-2 border-yellow-400/50 shadow-lg hover:shadow-xl"
                        : "border border-white/20 hover:border-white/40"
                    }`}
                  >
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    {option.featured && (
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full blur-2xl" />
                    )}

                    <CardContent className="p-4 md:p-6 lg:p-8 relative">
                      {/* Featured Badge */}
                      {option.featured && (
                        <div className="absolute -top-2 -right-2">
                          <Badge className="bg-yellow-400 text-blue-900 font-semibold text-xs">
                            Most Popular
                          </Badge>
                        </div>
                      )}

                      {/* Icon */}
                      <div className="mb-4 md:mb-6">
                        <div className="w-12 md:w-16 h-12 md:h-16 bg-white/10 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                          <IconComponent className="w-6 md:w-8 h-6 md:h-8 text-white" />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
                        <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-yellow-300 transition-colors duration-300">
                          {option.title}
                        </h3>

                        <p className="text-xs md:text-sm text-blue-100 leading-relaxed">
                          {option.description}
                        </p>
                      </div>

                      {/* CTA Button */}
                      <Button
                        className={`w-full group-hover:scale-105 transition-transform duration-300 ${
                          option.featured
                            ? "bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-semibold"
                            : "bg-white/10 hover:bg-white/20 text-white border border-white/30"
                        }`}
                        variant={option.featured ? "default" : "outline"}
                        asChild
                      >
                        <Link href={option.href}>
                          {option.buttonText}
                          <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                      </Button>

                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform translate-x-full group-hover:-translate-x-full transition-transform duration-1000" />
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Why Choose Site Wave */}
          <motion.div variants={itemVariants} className="mb-12 md:mb-16">
            <Card className="bg-white/10 backdrop-blur-sm border-white/20">
              <CardContent className="p-6 md:p-8 lg:p-12">
                <div className="text-center mb-8 md:mb-12">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 text-white">
                    Why SWFL Businesses Choose Site Wave
                  </h3>
                  <p className="text-sm md:text-base text-blue-100 max-w-2xl mx-auto">
                    We&apos;re not just another digital agency. We&apos;re your
                    local neighbors who understand Southwest Florida business
                    challenges.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  <div className="text-center group">
                    <div className="w-10 md:w-12 h-10 md:h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-5 md:w-6 h-5 md:h-6 text-yellow-400" />
                    </div>
                    <h4 className="font-semibold mb-1 md:mb-2 text-white text-sm md:text-base">
                      Local Team
                    </h4>
                    <p className="text-xs md:text-sm text-blue-200">
                      Based in Cape Coral, serving all of SWFL
                    </p>
                  </div>

                  <div className="text-center group">
                    <div className="w-10 md:w-12 h-10 md:h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Clock className="w-5 md:w-6 h-5 md:h-6 text-yellow-400" />
                    </div>
                    <h4 className="font-semibold mb-1 md:mb-2 text-white text-sm md:text-base">
                      Quick Turnaround
                    </h4>
                    <p className="text-xs md:text-sm text-blue-200">
                      Most projects completed in 2-4 weeks
                    </p>
                  </div>

                  <div className="text-center group">
                    <div className="w-10 md:w-12 h-10 md:h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Zap className="w-5 md:w-6 h-5 md:h-6 text-yellow-400" />
                    </div>
                    <h4 className="font-semibold mb-1 md:mb-2 text-white text-sm md:text-base">
                      AI-Powered
                    </h4>
                    <p className="text-xs md:text-sm text-blue-200">
                      Enterprise tools at small business prices
                    </p>
                  </div>

                  <div className="text-center group">
                    <div className="w-10 md:w-12 h-10 md:h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Heart className="w-5 md:w-6 h-5 md:h-6 text-yellow-400" />
                    </div>
                    <h4 className="font-semibold mb-1 md:mb-2 text-white text-sm md:text-base">
                      Personal Touch
                    </h4>
                    <p className="text-xs md:text-sm text-blue-200">
                      You&apos;ll work directly with our team
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants} className="text-center">
            <Card className="bg-white border-none shadow-xl">
              <CardContent className="p-6 md:p-8 lg:p-12">
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-xl md:text-2xl font-bold mb-6 text-gray-800">
                    Prefer to Reach Out Directly?
                  </h3>

                  <div className="grid sm:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
                    <div className="text-center">
                      <div className="w-12 md:w-16 h-12 md:h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Phone className="w-6 md:w-8 h-6 md:h-8 text-blue-600" />
                      </div>
                      <h4 className="font-semibold mb-2 text-gray-800 text-sm md:text-base">
                        Call Us
                      </h4>
                      <p className="text-gray-600 mb-4 text-sm md:text-base">
                        Speak with a local digital expert
                      </p>
                      <Button
                        variant="outline"
                        className="border-blue-600 text-blue-600 hover:bg-blue-50 text-sm md:text-base"
                        asChild
                      >
                        <Link href="tel:+1234567890">(239) 555-WAVE</Link>
                      </Button>
                    </div>

                    <div className="text-center">
                      <div className="w-12 md:w-16 h-12 md:h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="w-6 md:w-8 h-6 md:h-8 text-orange-600" />
                      </div>
                      <h4 className="font-semibold mb-2 text-gray-800 text-sm md:text-base">
                        Send a Message
                      </h4>
                      <p className="text-gray-600 mb-4 text-sm md:text-base">
                        Get a response within 24 hours
                      </p>
                      <Button
                        variant="outline"
                        className="border-orange-600 text-orange-600 hover:bg-orange-50 text-sm md:text-base"
                        asChild
                      >
                        <Link href="mailto:hello@sitewave.io">
                          hello@sitewave.io
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="text-center">
                    <p className="text-gray-500 mb-6 text-sm md:text-base">
                      Serving Cape Coral, Fort Myers, Naples, and all of
                      Southwest Florida
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        size="lg"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-sm md:text-base"
                        asChild
                      >
                        <Link href="/contact">
                          Start Your Project Today
                          <Rocket className="ml-2 w-4 md:w-5 h-4 md:h-5" />
                        </Link>
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 md:px-8 py-3 md:py-4 rounded-xl text-sm md:text-base"
                        asChild
                      >
                        <Link href="/services">Explore Our Services</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
