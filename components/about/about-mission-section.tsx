"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Target,
  Heart,
  MapPin,
  Users,
  TrendingUp,
  Lightbulb,
  Building2,
  ArrowRight,
  Waves,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

export function AboutMissionSection() {
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
    <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-b from-white to-blue-50/30">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-32 md:w-64 h-32 md:h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-24 md:w-48 h-24 md:h-48 bg-orange-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-blue-500/30 rounded-full" />
        <div className="absolute top-1/3 right-1/4 w-2 h-2 bg-orange-500/30 rounded-full" />
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
            className="text-center mb-12 md:mb-16"
          >
            <Badge
              variant="outline"
              className="mb-4 border-blue-500/30 text-blue-700"
            >
              <Waves className="w-4 h-4 mr-2" />
              Our Mission
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
              <span className="text-gray-800">Empowering</span>{" "}
              <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                Southwest Florida
              </span>{" "}
              <span className="text-gray-800">Businesses</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              We&apos;re on a mission to help local businesses in Cape Coral,
              Fort Myers, Naples, and across SWFL thrive in the digital age with
              practical, affordable solutions that drive real results.
            </p>
          </motion.div>

          {/* Split Layout - Mission & Vision */}
          <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16 px-4">
            {/* Mission Card */}
            <motion.div variants={itemVariants}>
              <Card className="group relative overflow-hidden border-2 border-transparent hover:border-blue-500/20 transition-all duration-500 h-full">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 right-0 w-16 md:w-32 h-16 md:h-32 bg-blue-500/10 rounded-full blur-3xl -translate-y-8 md:-translate-y-16 translate-x-8 md:translate-x-16" />

                <CardContent className="p-6 md:p-8 lg:p-12 relative h-full flex flex-col">
                  {/* Icon */}
                  <div className="mb-6 md:mb-8">
                    <div className="w-12 md:w-16 h-12 md:h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Target className="w-6 md:w-8 h-6 md:h-8 text-blue-600" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4 md:space-y-6 flex-grow">
                    <Badge
                      variant="secondary"
                      className="text-xs md:text-sm font-medium bg-blue-50 text-blue-700"
                    >
                      Our Mission
                    </Badge>

                    <h3 className="text-2xl md:text-3xl font-bold leading-tight text-gray-800">
                      Bridging the{" "}
                      <span className="text-blue-600">Digital Gap</span>
                    </h3>

                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                      To make powerful digital tools accessible and affordable
                      for every Southwest Florida business, regardless of size
                      or technical expertise. We believe every local
                      entrepreneur deserves to compete and thrive online.
                    </p>

                    {/* Mission Points */}
                    <div className="space-y-3 md:space-y-4 pt-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 md:mt-3 flex-shrink-0" />
                        <p className="text-sm md:text-base text-gray-600">
                          <span className="font-semibold text-gray-800">
                            Local Focus:
                          </span>{" "}
                          Understanding the unique needs of SWFL businesses and
                          markets
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 md:mt-3 flex-shrink-0" />
                        <p className="text-sm md:text-base text-gray-600">
                          <span className="font-semibold text-gray-800">
                            Practical Solutions:
                          </span>{" "}
                          No-nonsense digital tools that actually move the
                          needle
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 md:mt-3 flex-shrink-0" />
                        <p className="text-sm md:text-base text-gray-600">
                          <span className="font-semibold text-gray-800">
                            Done-for-You:
                          </span>{" "}
                          Complete service so you can focus on running your
                          business
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* What Sets Us Apart Card */}
            <motion.div variants={itemVariants}>
              <Card className="group relative overflow-hidden border-2 border-transparent hover:border-orange-500/20 transition-all duration-500 h-full">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute bottom-0 left-0 w-16 md:w-32 h-16 md:h-32 bg-orange-500/10 rounded-full blur-3xl translate-y-8 md:translate-y-16 -translate-x-8 md:-translate-x-16" />

                <CardContent className="p-6 md:p-8 lg:p-12 relative h-full flex flex-col">
                  {/* Icon */}
                  <div className="mb-6 md:mb-8">
                    <div className="w-12 md:w-16 h-12 md:h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Heart className="w-6 md:w-8 h-6 md:h-8 text-orange-600" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-4 md:space-y-6 flex-grow">
                    <Badge
                      variant="secondary"
                      className="text-xs md:text-sm font-medium bg-orange-50 text-orange-700"
                    >
                      What Sets Us Apart
                    </Badge>

                    <h3 className="text-2xl md:text-3xl font-bold leading-tight text-gray-800">
                      Powered by{" "}
                      <span className="text-orange-600">AI Innovation</span>
                    </h3>

                    <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                      Backed by Monsoft Solutions&apos; expertise in AI
                      automation and custom software, we bring enterprise-level
                      technology to small business pricing. You get the best of
                      both worlds: local service with cutting-edge capabilities.
                    </p>

                    {/* Differentiators */}
                    <div className="space-y-3 md:space-y-4 pt-4">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 md:mt-3 flex-shrink-0" />
                        <p className="text-sm md:text-base text-gray-600">
                          <span className="font-semibold text-gray-800">
                            AI-Powered Efficiency:
                          </span>{" "}
                          Smart automations that save time and money
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 md:mt-3 flex-shrink-0" />
                        <p className="text-sm md:text-base text-gray-600">
                          <span className="font-semibold text-gray-800">
                            Custom CRM Expertise:
                          </span>{" "}
                          Tailored systems that grow with your business
                        </p>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-orange-600 rounded-full mt-2 md:mt-3 flex-shrink-0" />
                        <p className="text-sm md:text-base text-gray-600">
                          <span className="font-semibold text-gray-800">
                            Local + Global:
                          </span>{" "}
                          SWFL presence with world-class technical capabilities
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Service Areas */}
          <motion.div variants={itemVariants} className="mb-12 md:mb-16 px-4">
            <Card className="bg-gradient-to-r from-blue-50 via-white to-orange-50 border-none shadow-lg">
              <CardContent className="p-6 md:p-8 lg:p-12">
                <div className="text-center mb-8 md:mb-12">
                  <div className="w-10 md:w-12 h-10 md:h-12 bg-gradient-to-br from-blue-600 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                    <MapPin className="w-5 md:w-6 h-5 md:h-6 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-800">
                    Proudly Serving Southwest Florida
                  </h3>
                  <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                    From Cape Coral to Naples, we understand the local market,
                    seasonal businesses, tourism, and what it takes to succeed
                    in SWFL.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {[
                    { city: "Cape Coral", icon: Building2, highlight: true },
                    { city: "Fort Myers", icon: Users },
                    { city: "Naples", icon: TrendingUp },
                    { city: "Surrounding Areas", icon: Lightbulb },
                  ].map((area) => {
                    const IconComponent = area.icon;
                    return (
                      <div key={area.city} className="text-center group">
                        <div
                          className={`w-12 md:w-16 h-12 md:h-16 ${
                            area.highlight
                              ? "bg-blue-500/10 border-2 border-blue-500/20"
                              : "bg-gray-100"
                          } rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-300`}
                        >
                          <IconComponent
                            className={`w-6 md:w-8 h-6 md:h-8 ${
                              area.highlight ? "text-blue-600" : "text-gray-600"
                            }`}
                          />
                        </div>
                        <h4
                          className={`text-sm md:text-lg font-semibold mb-1 md:mb-2 ${
                            area.highlight ? "text-blue-600" : "text-gray-700"
                          }`}
                        >
                          {area.city}
                        </h4>
                        {area.highlight && (
                          <p className="text-xs md:text-sm text-blue-500 font-medium">
                            Our Home Base
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Call to Action */}
          <motion.div variants={itemVariants} className="text-center px-4">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-800">
                Ready to Grow Your SWFL Business?
              </h3>
              <p className="text-base md:text-lg text-gray-600 mb-6 md:mb-8">
                Let&apos;s talk about how Site Wave can help you reach more
                customers, streamline operations, and compete in today&apos;s
                digital marketplace.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                  asChild
                >
                  <Link href="/contact">
                    Get Your Free Consultation
                    <ArrowRight className="ml-2 w-4 md:w-5 h-4 md:h-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 md:px-8 py-3 md:py-4 rounded-xl"
                  asChild
                >
                  <Link href="/services">View Our Services</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
