"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  MapPin,
  Users,
  Zap,
  Shield,
  Award,
  Clock,
  Heart,
  TrendingUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const reasons = [
  {
    icon: MapPin,
    title: "Local-Focused",
    description:
      "We understand Southwest Florida businesses and your unique challenges",
    details: "Born and raised in SWFL, we know the local market inside and out",
    color: "coral-orange",
  },
  {
    icon: Users,
    title: "All-in-One Solution",
    description:
      "From websites to marketing to automation - we handle everything",
    details:
      "No need to juggle multiple vendors - we&apos;re your complete digital partner",
    color: "ocean-blue",
  },
  {
    icon: Zap,
    title: "AI-Driven Efficiency",
    description: "Smart automation and tools that save you time and money",
    details:
      "Powered by cutting-edge AI to maximize your ROI and streamline operations",
    color: "coral-orange",
  },
  {
    icon: Shield,
    title: "Done-for-You Service",
    description:
      "No tech experience needed - we handle all the technical details",
    details:
      "Focus on running your business while we take care of your digital presence",
    color: "ocean-blue",
  },
  {
    icon: Award,
    title: "Proven Results",
    description:
      "200+ happy clients with measurable growth in Southwest Florida",
    details: "Real results from real local businesses just like yours",
    color: "coral-orange",
  },
  {
    icon: Clock,
    title: "Fast Implementation",
    description:
      "Quick turnaround times with quality that doesn&apos;t compromise",
    details: "Get online and start growing faster than you thought possible",
    color: "ocean-blue",
  },
  {
    icon: Heart,
    title: "Personal Support",
    description: "Direct access to our team - no call centers or outsourcing",
    details:
      "You&apos;ll work with the same dedicated team throughout your journey",
    color: "coral-orange",
  },
  {
    icon: TrendingUp,
    title: "Growth-Focused",
    description:
      "Every solution is designed to help your business grow and scale",
    details: "We&apos;re invested in your success - your growth is our success",
    color: "ocean-blue",
  },
];

export function SiteWaveWhyChooseUs() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
    <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-ocean-blue/10">
      <div className="container" ref={ref}>
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <Badge
              variant="outline"
              className="mb-4 px-4 py-2 text-sm border-ocean-blue/30 bg-ocean-blue/10 text-ocean-blue"
            >
              Why Choose Site Wave
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-deep-navy mb-4">
              Your Digital Success Partner
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We&apos;re not just another digital agency. We&apos;re your
              neighbors, your partners, and your biggest advocates for success
              in Southwest Florida.
            </p>
          </motion.div>
        </div>

        {/* Reasons Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {reasons.map((reason) => (
            <motion.div key={reason.title} variants={itemVariants}>
              <div className="group bg-background/80 backdrop-blur-sm rounded-xl p-6 border border-ocean-blue/20 hover:border-ocean-blue/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                      reason.color === "coral-orange"
                        ? "bg-coral-orange/10 text-coral-orange group-hover:bg-coral-orange group-hover:text-white"
                        : "bg-ocean-blue/10 text-ocean-blue group-hover:bg-ocean-blue group-hover:text-white"
                    }`}
                  >
                    <reason.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold font-heading text-deep-navy mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {reason.description}
                  </p>
                  <p className="text-xs text-muted-foreground/80 leading-relaxed">
                    {reason.details}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Stats Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-gradient-to-r from-ocean-blue to-coral-orange rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold font-heading mb-8">
              Trusted by Southwest Florida Businesses
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">200+</div>
                <div className="text-sm opacity-90">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">
                  5+ Years
                </div>
                <div className="text-sm opacity-90">SWFL Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">500+</div>
                <div className="text-sm opacity-90">Projects Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold mb-2">24/7</div>
                <div className="text-sm opacity-90">Support Available</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Testimonial Quote */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="bg-background/80 backdrop-blur-sm rounded-xl p-8 border border-ocean-blue/20 max-w-4xl mx-auto">
            <blockquote className="text-lg md:text-xl text-muted-foreground italic mb-6">
              &quot;Site Wave transformed our business. They didn&apos;t just
              build us a website - they created a complete digital presence that
              actually brings in customers. The team understands local
              businesses and what we need to succeed.&quot;
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-ocean-blue/10 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-ocean-blue" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-deep-navy">
                  Sarah Johnson
                </div>
                <div className="text-sm text-muted-foreground">
                  Cape Coral Restaurant Owner
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
