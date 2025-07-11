"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Mail,
  MapPin,
  Users,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Waves,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";

interface SiteWaveNewsletterCTAProps {
  subscriberCount?: number;
  localBusinessCount?: number;
  className?: string;
}

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
    },
  },
};

export function SiteWaveNewsletterCTA({
  subscriberCount = 2500,
  localBusinessCount = 150,
  className = "",
}: SiteWaveNewsletterCTAProps) {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubscribed(true);
    setIsSubmitting(false);
    setEmail("");
  };

  return (
    <section className={`py-20 ${className}`} ref={ref}>
      <div className="container">
        <motion.div
          className="mx-auto max-w-6xl"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-ocean-blue via-ocean-blue/90 to-coral-orange border border-ocean-blue/20 shadow-2xl">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] opacity-30" />

            {/* Floating Gradient Orbs */}
            <motion.div
              className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-2xl"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-coral-orange/20 rounded-full blur-2xl"
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="relative z-10 px-8 py-16 lg:px-16 lg:py-20">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Content */}
                <motion.div variants={itemVariants}>
                  {/* Badge */}
                  <Badge
                    variant="outline"
                    className="mb-6 px-4 py-2 border-white/30 bg-white/10 backdrop-blur-sm text-white"
                  >
                    <Waves className="w-4 h-4 mr-2" />
                    Southwest Florida&apos;s #1 Business Newsletter
                  </Badge>

                  {/* Headline */}
                  <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6 font-heading">
                    Stay Ahead of the Competition in
                    <span className="block text-soft-sand">
                      Cape Coral, Fort Myers & Naples
                    </span>
                  </h2>

                  {/* Description */}
                  <p className="text-lg text-white/90 mb-8 leading-relaxed">
                    Get weekly insights, proven strategies, and exclusive case
                    studies delivered straight to your inbox. Join{" "}
                    {localBusinessCount}+ Southwest Florida business owners who
                    rely on our expertise.
                  </p>

                  {/* Value Props */}
                  <div className="space-y-3 mb-8">
                    {[
                      "Weekly digital marketing tips that work in SWFL",
                      "Exclusive case studies from local businesses",
                      "First access to new guides and resources",
                      "Local market insights and trends",
                    ].map((benefit, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 text-white/90"
                        variants={itemVariants}
                        transition={{ delay: index * 0.1 }}
                      >
                        <CheckCircle className="w-5 h-5 text-soft-sand flex-shrink-0" />
                        <span>{benefit}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Newsletter Form */}
                <motion.div className="relative" variants={itemVariants}>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                    {!isSubscribed ? (
                      <>
                        <div className="text-center mb-8">
                          <div className="w-16 h-16 bg-soft-sand rounded-2xl flex items-center justify-center mx-auto mb-4">
                            <Mail className="w-8 h-8 text-ocean-blue" />
                          </div>
                          <h3 className="text-xl font-bold text-white mb-2 font-heading">
                            Join {subscriberCount.toLocaleString()}+ SWFL
                            Business Owners
                          </h3>
                          <p className="text-white/80 text-sm">
                            No spam, just valuable insights. Unsubscribe
                            anytime.
                          </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="relative">
                            <Input
                              type="email"
                              placeholder="Enter your business email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full bg-white/90 border-white/30 text-ocean-blue placeholder:text-ocean-blue/60 focus:bg-white focus:border-coral-orange h-12"
                              required
                              disabled={isSubmitting}
                            />
                          </div>

                          <Button
                            type="submit"
                            size="lg"
                            disabled={isSubmitting || !email}
                            className="w-full bg-coral-orange hover:bg-coral-orange/90 text-white font-medium h-12"
                          >
                            {isSubmitting ? (
                              "Subscribing..."
                            ) : (
                              <>
                                Get Weekly SWFL Business Insights
                                <ArrowRight className="ml-2 w-4 h-4" />
                              </>
                            )}
                          </Button>
                        </form>

                        <p className="text-xs text-white/70 text-center mt-4">
                          By subscribing, you agree to receive marketing emails
                          from Site Wave. We respect your privacy and won&apos;t
                          share your information.
                        </p>
                      </>
                    ) : (
                      <div className="text-center py-8">
                        <motion.div
                          className="w-16 h-16 bg-soft-sand rounded-2xl flex items-center justify-center mx-auto mb-4"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", duration: 0.6 }}
                        >
                          <CheckCircle className="w-8 h-8 text-ocean-blue" />
                        </motion.div>
                        <h3 className="text-xl font-bold text-white mb-2 font-heading">
                          Welcome to the SWFL Business Community!
                        </h3>
                        <p className="text-white/90 mb-6">
                          Check your email for a welcome message and your first
                          exclusive insights.
                        </p>
                        <Button
                          asChild
                          variant="outline"
                          className="border-white/30 text-white hover:bg-white/10"
                        >
                          <Link href="/blog">
                            Continue Reading Articles
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Social Proof */}
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 pt-8 border-t border-white/20"
                variants={containerVariants}
              >
                <motion.div className="text-center" variants={itemVariants}>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Users className="w-5 h-5 text-soft-sand" />
                    <span className="text-2xl font-bold text-white font-heading">
                      {subscriberCount.toLocaleString()}+
                    </span>
                  </div>
                  <p className="text-white/80 text-sm">
                    Newsletter Subscribers
                  </p>
                </motion.div>

                <motion.div className="text-center" variants={itemVariants}>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <MapPin className="w-5 h-5 text-soft-sand" />
                    <span className="text-2xl font-bold text-white font-heading">
                      {localBusinessCount}+
                    </span>
                  </div>
                  <p className="text-white/80 text-sm">
                    SWFL Businesses Helped
                  </p>
                </motion.div>

                <motion.div className="text-center" variants={itemVariants}>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-soft-sand" />
                    <span className="text-2xl font-bold text-white font-heading">
                      98%
                    </span>
                  </div>
                  <p className="text-white/80 text-sm">
                    Find Our Tips Valuable
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
