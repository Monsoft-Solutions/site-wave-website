"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  ArrowLeft,
  Home,
  MessageSquare,
  Clock,
  Star,
  Phone,
  Mail,
  Calendar,
  Heart,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/lib/config/site";

// Animation variants
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 100 },
  },
};

const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

const sparkleAnimation = {
  scale: [1, 1.2, 1],
  rotate: [0, 180, 360],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
};

/**
 * Thank you page component displayed after successful contact form submission
 */
export function ThankYouPage(): React.JSX.Element {
  const router = useRouter();

  /**
   * Navigate back to contact page
   */
  const handleBackToContact = () => {
    router.push("/contact");
  };

  /**
   * Navigate to homepage
   */
  const handleGoHome = () => {
    router.push("/");
  };

  return (
    <section className="min-h-screen py-20 bg-gradient-to-br from-muted/5 via-background to-accent/5 flex items-center justify-center">
      <div className="container">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl"
        >
          {/* Floating decorative elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <motion.div
              animate={sparkleAnimation}
              className="absolute top-1/4 left-1/4 text-primary/20"
            >
              <Sparkles className="w-6 h-6" />
            </motion.div>
            <motion.div
              animate={sparkleAnimation}
              style={{ animationDelay: "0.5s" }}
              className="absolute top-1/3 right-1/4 text-primary/20"
            >
              <Heart className="w-4 h-4" />
            </motion.div>
            <motion.div
              animate={sparkleAnimation}
              style={{ animationDelay: "1s" }}
              className="absolute bottom-1/4 left-1/3 text-primary/20"
            >
              <Star className="w-5 h-5" />
            </motion.div>
          </div>

          {/* Main content */}
          <Card className="glass-card overflow-hidden relative">
            <CardContent className="p-12 text-center">
              {/* Success icon */}
              <motion.div variants={itemVariants} className="mb-8">
                <motion.div
                  animate={floatingAnimation}
                  className="w-24 h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
                </motion.div>
              </motion.div>

              {/* Header */}
              <motion.div variants={itemVariants} className="mb-8">
                <Badge
                  variant="outline"
                  className="mb-4 bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
                >
                  <MessageSquare className="w-3 h-3 mr-1" />
                  Message Sent Successfully
                </Badge>
                <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                  Thank You!
                </h1>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                  We&apos;ve received your message and are excited to learn more
                  about your project. Our team will review your submission and
                  get back to you soon.
                </p>
              </motion.div>

              {/* What happens next */}
              <motion.div variants={itemVariants} className="mb-10">
                <h3 className="text-xl font-semibold mb-6 flex items-center justify-center">
                  <Clock className="w-5 h-5 mr-2 text-primary" />
                  What Happens Next?
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  <motion.div
                    variants={itemVariants}
                    className="p-6 bg-muted/50 rounded-2xl"
                  >
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="font-semibold mb-2">Review & Analysis</h4>
                    <p className="text-sm text-muted-foreground">
                      Our team will carefully review your project details and
                      requirements
                    </p>
                    <div className="mt-3 text-xs text-primary font-medium">
                      Within 2-4 hours
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="p-6 bg-muted/50 rounded-2xl"
                  >
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Phone className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <h4 className="font-semibold mb-2">Personal Outreach</h4>
                    <p className="text-sm text-muted-foreground">
                      We&apos;ll reach out via email or phone to discuss your
                      vision in detail
                    </p>
                    <div className="mt-3 text-xs text-primary font-medium">
                      Within 24 hours
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="p-6 bg-muted/50 rounded-2xl"
                  >
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <Calendar className="w-6 h-6 text-green-600 dark:text-green-400" />
                    </div>
                    <h4 className="font-semibold mb-2">Strategy Session</h4>
                    <p className="text-sm text-muted-foreground">
                      Schedule a consultation to map out your project roadmap
                    </p>
                    <div className="mt-3 text-xs text-primary font-medium">
                      Within 48 hours
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Contact information */}
              <motion.div variants={itemVariants} className="mb-10">
                <div className="p-6 bg-primary/5 border border-primary/20 rounded-2xl max-w-2xl mx-auto">
                  <h4 className="font-semibold mb-4 flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 mr-2 text-primary" />
                    Need Immediate Assistance?
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center justify-center">
                      <Mail className="w-4 h-4 mr-2 text-primary" />
                      <a
                        href={`mailto:${siteConfig.creator.email}`}
                        className="text-primary hover:underline font-medium"
                      >
                        {siteConfig.creator.email}
                      </a>
                    </div>
                    <div className="flex items-center justify-center">
                      <Phone className="w-4 h-4 mr-2 text-primary" />
                      <a
                        href={`tel:${siteConfig.creator.phone.replace(/[^\d]/g, "")}`}
                        className="text-primary hover:underline font-medium"
                      >
                        {siteConfig.creator.phone}
                      </a>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    We typically respond to urgent inquiries within 2-4 hours
                    during business hours
                  </p>
                </div>
              </motion.div>

              {/* Action buttons */}
              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4 justify-center"
              >
                <Button
                  onClick={handleGoHome}
                  className="flex items-center justify-center gap-2 px-8 py-3"
                >
                  <Home className="w-4 h-4" />
                  Back to Homepage
                </Button>
                <Button
                  variant="outline"
                  onClick={handleBackToContact}
                  className="flex items-center justify-center gap-2 px-8 py-3"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Send Another Message
                </Button>
              </motion.div>

              {/* Additional resources */}
              <motion.div
                variants={itemVariants}
                className="mt-12 pt-8 border-t"
              >
                <p className="text-sm text-muted-foreground mb-4">
                  While you wait, explore our latest work and insights
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link href="/portfolio">
                    <Badge
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary/10 transition-colors"
                    >
                      View Our Portfolio
                    </Badge>
                  </Link>
                  <Link href="/services">
                    <Badge
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary/10 transition-colors"
                    >
                      Explore Services
                    </Badge>
                  </Link>
                  <Link href="/blog">
                    <Badge
                      variant="secondary"
                      className="cursor-pointer hover:bg-primary/10 transition-colors"
                    >
                      Read Our Blog
                    </Badge>
                  </Link>
                </div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
