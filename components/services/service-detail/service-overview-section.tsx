"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  CheckCircle,
  Clock,
  Tag,
  Sparkles,
  Target,
  Rocket,
  Code,
  Palette,
  TrendingUp,
  Shield,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ServiceOverviewSectionProps {
  features: string[];
  deliverables: string[];
  technologies?: string[];
  timeline: string;
  category: string;
}

export function ServiceOverviewSection({
  features,
  deliverables,
  technologies,
  timeline,
  category,
}: ServiceOverviewSectionProps) {
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
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
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
    hidden: { opacity: 0, y: 50, rotateX: -10 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 20,
      },
    },
  };

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "development":
        return Code;
      case "design":
        return Palette;
      case "marketing":
        return TrendingUp;
      case "consulting":
        return Target;
      default:
        return Shield;
    }
  };

  const CategoryIcon = getCategoryIcon(category);

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-soft-sand/30 via-background to-ocean-blue/5">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-ocean-blue/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />

        {/* Floating Gradients */}
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-ocean-blue/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-80 h-80 bg-coral-orange/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
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
            <Badge
              variant="outline"
              className="mb-4 px-4 py-2 border-ocean-blue/30 text-ocean-blue bg-ocean-blue/5"
            >
              <CategoryIcon className="w-4 h-4 mr-2" />
              {category} Service
            </Badge>
          </motion.div>

          <motion.h2
            className="text-4xl md:text-5xl font-bold font-heading text-deep-navy mb-6"
            variants={itemVariants}
          >
            What You&apos;ll
            <span className="text-ocean-blue ml-3">Receive</span>
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
            variants={itemVariants}
          >
            We deliver comprehensive solutions tailored specifically for
            Southwest Florida businesses. Here&apos;s exactly what&apos;s
            included in your service package.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Features Card */}
          <motion.div
            variants={cardVariants}
            className="group bg-background/80 backdrop-blur-sm rounded-2xl p-8 border border-ocean-blue/20 hover:border-ocean-blue/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-ocean-blue/10 rounded-xl flex items-center justify-center mr-4 group-hover:bg-ocean-blue group-hover:text-white transition-all duration-300">
                <Sparkles className="w-6 h-6 text-ocean-blue group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold font-heading text-deep-navy">
                Key Features
              </h3>
            </div>

            <div className="space-y-3">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ delay: 0.3 + index * 0.1 }}
                >
                  <CheckCircle className="w-5 h-5 text-ocean-blue mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    {feature}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Deliverables Card */}
          <motion.div
            variants={cardVariants}
            className="group bg-background/80 backdrop-blur-sm rounded-2xl p-8 border border-coral-orange/20 hover:border-coral-orange/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-coral-orange/10 rounded-xl flex items-center justify-center mr-4 group-hover:bg-coral-orange group-hover:text-white transition-all duration-300">
                <Rocket className="w-6 h-6 text-coral-orange group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold font-heading text-deep-navy">
                Deliverables
              </h3>
            </div>

            <div className="space-y-3">
              {deliverables.map((deliverable, index) => (
                <motion.div
                  key={index}
                  className="flex items-start"
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                  }
                  transition={{ delay: 0.4 + index * 0.1 }}
                >
                  <CheckCircle className="w-5 h-5 text-coral-orange mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground leading-relaxed">
                    {deliverable}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Timeline & Technologies Card */}
          <motion.div
            variants={cardVariants}
            className="group bg-background/80 backdrop-blur-sm rounded-2xl p-8 border border-deep-navy/20 hover:border-deep-navy/40 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
          >
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-deep-navy/10 rounded-xl flex items-center justify-center mr-4 group-hover:bg-deep-navy group-hover:text-white transition-all duration-300">
                <Clock className="w-6 h-6 text-deep-navy group-hover:text-white" />
              </div>
              <h3 className="text-xl font-bold font-heading text-deep-navy">
                Timeline & Tech
              </h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <Tag className="w-5 h-5 text-deep-navy mr-3" />
                <div>
                  <p className="text-sm font-medium text-deep-navy">Timeline</p>
                  <p className="text-sm text-muted-foreground">{timeline}</p>
                </div>
              </div>

              {technologies && technologies.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-deep-navy mb-3">
                    Technologies Used
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech, index) => (
                      <motion.span
                        key={index}
                        className="inline-block px-3 py-1 bg-deep-navy/10 text-deep-navy text-xs rounded-full"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={
                          inView
                            ? { opacity: 1, scale: 1 }
                            : { opacity: 0, scale: 0.8 }
                        }
                        transition={{ delay: 0.5 + index * 0.1 }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          className="text-center"
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="bg-gradient-to-r from-ocean-blue via-coral-orange to-ocean-blue bg-300% animate-gradient rounded-2xl p-8">
            <h3 className="text-2xl font-bold font-heading text-white mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">
              Join hundreds of Southwest Florida businesses that trust Site Wave
              for their digital growth. Let&apos;s discuss how this service can
              help you achieve your goals.
            </p>
            <motion.a
              href="#contact"
              className="inline-flex items-center px-8 py-3 bg-white text-ocean-blue font-semibold rounded-xl hover:bg-soft-sand transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Your Free Consultation
              <Target className="w-5 h-5 ml-2" />
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
