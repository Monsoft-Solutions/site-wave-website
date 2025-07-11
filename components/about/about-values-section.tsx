"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Heart,
  Handshake,
  Target,
  Users,
  Zap,
  MapPin,
  Building2,
  Star,
  Clock,
  Shield,
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface Value {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  principle: string;
  color: string;
  bgColor: string;
}

const values: Value[] = [
  {
    icon: Heart,
    title: "Local-First",
    description:
      "We live and work in Southwest Florida. Your success is our community's success, and we're invested in seeing every SWFL business thrive.",
    principle: "Neighbors helping neighbors succeed",
    color: "text-blue-600",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Handshake,
    title: "Partnership Mindset",
    description:
      "We're not just a vendor—we're your digital growth partner. We take the time to understand your business and become an extension of your team.",
    principle: "Your goals become our goals",
    color: "text-orange-600",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Target,
    title: "Results-Driven",
    description:
      "Every strategy, every website, every campaign is built with one goal: driving real results for your business. We measure success by your growth.",
    principle: "Impact over impressions",
    color: "text-blue-600",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Users,
    title: "Small Business Champions",
    description:
      "Big agencies often overlook small businesses. We specialize in understanding the unique challenges and opportunities of growing local companies.",
    principle: "Every business deserves expert-level marketing",
    color: "text-orange-600",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Zap,
    title: "Smart & Efficient",
    description:
      "Powered by AI and automation, we deliver enterprise-level solutions at small business prices. Work smarter, not harder.",
    principle: "Maximum impact, minimal complexity",
    color: "text-blue-600",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Clock,
    title: "Done-for-You Service",
    description:
      "You run your business—we'll handle the digital stuff. No tech headaches, no lengthy learning curves. Just results delivered to your door.",
    principle: "Technology should simplify, not complicate",
    color: "text-orange-600",
    bgColor: "bg-orange-500/10",
  },
];

export function AboutValuesSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-blue-50/30 to-white">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Coastal patterns */}
        <div className="absolute top-20 left-10 w-16 md:w-32 h-16 md:h-32 border-2 border-blue-500/10 rotate-45 rounded-xl" />
        <div className="absolute bottom-20 right-10 w-12 md:w-24 h-12 md:h-24 border-2 border-orange-500/10 rotate-12 rounded-lg" />
        <div className="absolute top-1/2 left-1/3 w-4 h-4 bg-blue-500/20 rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-orange-500/20 rounded-full" />
      </div>

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
            className="text-center mb-16 md:mb-20"
          >
            <Badge
              variant="outline"
              className="mb-4 border-blue-500/30 text-blue-700"
            >
              <Building2 className="w-4 h-4 mr-2" />
              Our Values
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
              <span className="text-gray-800">How We</span>{" "}
              <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                Serve SWFL
              </span>{" "}
              <span className="text-gray-800">Businesses</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4">
              These values aren&apos;t just words on a page—they&apos;re the
              foundation of every client relationship and the driving force
              behind every solution we create.
            </p>
          </motion.div>

          {/* Values Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16 px-4">
            {values.map((value) => {
              const IconComponent = value.icon;

              return (
                <motion.div key={value.title} variants={itemVariants}>
                  <Card className="group relative overflow-hidden border-2 border-transparent hover:border-blue-500/20 transition-all duration-500 cursor-pointer transform hover:-translate-y-2 h-full">
                    {/* Background Effects */}
                    <div
                      className={`absolute inset-0 ${value.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                    />
                    <div className="absolute top-0 right-0 w-12 md:w-20 h-12 md:h-20 bg-gradient-to-br from-blue-500/5 to-orange-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />

                    <CardContent className="p-6 md:p-8 relative h-full flex flex-col">
                      {/* Icon */}
                      <div className="mb-4 md:mb-6">
                        <div
                          className={`w-12 md:w-16 h-12 md:h-16 ${value.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}
                        >
                          <IconComponent
                            className={`w-6 md:w-8 h-6 md:h-8 ${value.color}`}
                          />
                        </div>
                      </div>

                      {/* Content */}
                      <div className="space-y-3 md:space-y-4 flex-grow">
                        <h3 className="text-lg md:text-xl font-bold group-hover:text-blue-600 transition-colors duration-300">
                          {value.title}
                        </h3>

                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                          {value.description}
                        </p>

                        {/* Principle Quote */}
                        <div className="pt-3 md:pt-4 border-t border-gray-200 group-hover:border-blue-500/20 transition-colors duration-300 mt-auto">
                          <p className="text-xs md:text-sm italic text-gray-500 group-hover:text-blue-600/80 transition-colors duration-300">
                            &ldquo;{value.principle}&rdquo;
                          </p>
                        </div>
                      </div>

                      {/* Hover Indicator */}
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Values in Action */}
          <motion.div variants={itemVariants} className="px-4">
            <Card className="bg-gradient-to-br from-blue-50 via-white to-orange-50 border-blue-500/20 shadow-lg">
              <CardContent className="p-6 md:p-8 lg:p-12">
                <div className="text-center mb-8 md:mb-12">
                  <div className="w-10 md:w-12 h-10 md:h-12 bg-gradient-to-br from-blue-600 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                    <Star className="w-5 md:w-6 h-5 md:h-6 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-800">
                    Values in Action
                  </h3>
                  <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                    See how our commitment to Southwest Florida businesses
                    translates into real results and meaningful partnerships.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  <div className="text-center group">
                    <div className="w-10 md:w-12 h-10 md:h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Heart className="w-5 md:w-6 h-5 md:h-6 text-blue-600" />
                    </div>
                    <h4 className="text-sm md:text-base font-semibold mb-1 md:mb-2 text-gray-800">
                      Local Partnership
                    </h4>
                    <p className="text-xs md:text-sm text-gray-600">
                      95% client retention rate
                    </p>
                  </div>

                  <div className="text-center group">
                    <div className="w-10 md:w-12 h-10 md:h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Target className="w-5 md:w-6 h-5 md:h-6 text-orange-600" />
                    </div>
                    <h4 className="text-sm md:text-base font-semibold mb-1 md:mb-2 text-gray-800">
                      Results Delivered
                    </h4>
                    <p className="text-xs md:text-sm text-gray-600">
                      Average 150% ROI increase
                    </p>
                  </div>

                  <div className="text-center group">
                    <div className="w-10 md:w-12 h-10 md:h-12 bg-blue-500/10 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                      <MapPin className="w-5 md:w-6 h-5 md:h-6 text-blue-600" />
                    </div>
                    <h4 className="text-sm md:text-base font-semibold mb-1 md:mb-2 text-gray-800">
                      SWFL Focused
                    </h4>
                    <p className="text-xs md:text-sm text-gray-600">
                      100+ local businesses served
                    </p>
                  </div>

                  <div className="text-center group">
                    <div className="w-10 md:w-12 h-10 md:h-12 bg-orange-500/10 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300">
                      <Shield className="w-5 md:w-6 h-5 md:h-6 text-orange-600" />
                    </div>
                    <h4 className="text-sm md:text-base font-semibold mb-1 md:mb-2 text-gray-800">
                      Trust & Reliability
                    </h4>
                    <p className="text-xs md:text-sm text-gray-600">
                      On-time delivery guarantee
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Local Business Commitment */}
          <motion.div
            variants={itemVariants}
            className="mt-12 md:mt-16 text-center px-4"
          >
            <Card className="bg-gradient-to-r from-blue-600 to-orange-500 border-none text-white">
              <CardContent className="p-6 md:p-8 lg:p-12">
                <h3 className="text-xl md:text-2xl lg:text-3xl font-bold mb-3 md:mb-4">
                  Our Commitment to Southwest Florida
                </h3>
                <p className="text-base md:text-lg opacity-90 max-w-3xl mx-auto mb-4 md:mb-6">
                  Every dollar you invest with Site Wave stays in our local
                  economy. We&apos;re not just building websites—we&apos;re
                  building a stronger SWFL business community.
                </p>
                <div className="grid grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">
                      100%
                    </div>
                    <div className="text-xs md:text-sm opacity-80">
                      Local Team
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">
                      24/7
                    </div>
                    <div className="text-xs md:text-sm opacity-80">
                      Support Available
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-bold mb-1 md:mb-2">
                      0%
                    </div>
                    <div className="text-xs md:text-sm opacity-80">
                      Hidden Fees
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
