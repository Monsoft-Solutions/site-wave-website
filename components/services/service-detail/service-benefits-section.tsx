"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  CheckCircle2,
  TrendingUp,
  Shield,
  Sparkles,
  Users,
  Target,
  Heart,
  Star,
  Award,
  Zap,
} from "lucide-react";

interface ServiceBenefitsSectionProps {
  benefits: string[];
}

export function ServiceBenefitsSection({
  benefits,
}: ServiceBenefitsSectionProps) {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
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

  const cardVariants = {
    hidden: { opacity: 0, y: 60, rotateY: -15 },
    visible: {
      opacity: 1,
      y: 0,
      rotateY: 0,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 20,
      },
    },
  };

  // Icon rotation for visual interest
  const benefitIcons = [
    TrendingUp,
    Shield,
    Users,
    Target,
    Heart,
    Star,
    Award,
    Zap,
    Sparkles,
    CheckCircle2,
  ];

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-coral-orange/5 via-background to-soft-sand/20">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-coral-orange/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />

        {/* Floating Gradient Orbs */}
        <motion.div
          className="absolute top-32 right-20 w-80 h-80 bg-coral-orange/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 left-20 w-96 h-96 bg-ocean-blue/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>

      <div className="container relative z-10" ref={ref}>
        <motion.div
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center px-4 py-2 bg-coral-orange/10 rounded-full mb-6">
              <Heart className="w-5 h-5 text-coral-orange mr-2" />
              <span className="text-coral-orange font-medium">
                Why Choose Site Wave
              </span>
            </div>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold font-heading text-deep-navy mb-6"
            variants={itemVariants}
          >
            Benefits That
            <span className="text-coral-orange ml-3">Drive Results</span>
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
            variants={itemVariants}
          >
            As your local Southwest Florida digital partner, we understand what
            drives business success in our community. Here&apos;s how this
            service will transform your business.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {benefits.map((benefit, index) => {
            const IconComponent = benefitIcons[index % benefitIcons.length];
            const isHighlighted = index < 3; // Highlight first 3 benefits

            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className={`group relative overflow-hidden rounded-2xl p-8 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                  isHighlighted
                    ? "bg-gradient-to-br from-coral-orange/10 to-coral-orange/5 border-2 border-coral-orange/20 hover:border-coral-orange/40"
                    : "bg-background/80 backdrop-blur-sm border border-ocean-blue/20 hover:border-ocean-blue/40"
                }`}
              >
                {/* Background Pattern for Highlighted Cards */}
                {isHighlighted && (
                  <div className="absolute top-0 right-0 w-32 h-32 bg-coral-orange/5 rounded-full blur-2xl" />
                )}

                <div className="relative z-10">
                  <div className="flex items-start mb-6">
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center mr-4 transition-all duration-300 ${
                        isHighlighted
                          ? "bg-coral-orange/15 text-coral-orange group-hover:bg-coral-orange group-hover:text-white"
                          : "bg-ocean-blue/10 text-ocean-blue group-hover:bg-ocean-blue group-hover:text-white"
                      }`}
                    >
                      <IconComponent className="w-7 h-7" />
                    </div>

                    {isHighlighted && (
                      <motion.div
                        className="ml-auto"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Sparkles className="w-5 h-5 text-coral-orange" />
                      </motion.div>
                    )}
                  </div>

                  <p className="text-muted-foreground leading-relaxed group-hover:text-foreground transition-colors duration-300">
                    {benefit}
                  </p>
                </div>

                {/* Hover Effect Overlay */}
                <motion.div
                  className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 ${
                    isHighlighted ? "bg-coral-orange" : "bg-ocean-blue"
                  }`}
                  whileHover={{ scale: 1.02 }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom Trust Section */}
        <motion.div
          className="mt-20 text-center"
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="bg-gradient-to-r from-deep-navy to-ocean-blue rounded-2xl p-8 text-white">
            <div className="flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-coral-orange mr-3" />
              <h3 className="text-2xl font-bold font-heading">
                Trusted by 100+ Southwest Florida Businesses
              </h3>
            </div>

            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              From Cape Coral to Naples, local businesses choose Site Wave for
              results-driven digital solutions that understand the unique SWFL
              market.
            </p>

            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-coral-orange">100+</div>
                <div className="text-sm text-white/80">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-coral-orange">5★</div>
                <div className="text-sm text-white/80">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-coral-orange">24/7</div>
                <div className="text-sm text-white/80">Local Support</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
