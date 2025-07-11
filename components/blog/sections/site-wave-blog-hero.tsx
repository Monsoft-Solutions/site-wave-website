"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Waves, MapPin, BookOpen } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";

// Floating coastal particles for visual interest
const FloatingParticle = ({
  delay = 0,
  duration = 20,
  initialX = 0,
  initialY = 0,
}: {
  delay?: number;
  duration?: number;
  initialX?: number;
  initialY?: number;
}) => (
  <motion.div
    className="absolute w-2 h-2 bg-ocean-blue/40 rounded-full"
    initial={{
      opacity: 0,
      x: initialX,
      y: initialY,
      scale: 0,
    }}
    animate={{
      opacity: [0, 1, 0],
      y: initialY - 400,
      x: [initialX, initialX + 60, initialX - 40, initialX],
      scale: [0, 1, 0.5, 0],
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut",
    }}
  />
);

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

const statsVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};

interface SiteWaveBlogHeroProps {
  totalPosts?: number;
  totalBusinessesHelped?: number;
  totalSWFLReaders?: number;
}

export function SiteWaveBlogHero({
  totalPosts = 50,
  totalBusinessesHelped = 150,
  totalSWFLReaders = 4250,
}: SiteWaveBlogHeroProps) {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, -150]);
  const contentY = useTransform(scrollY, [0, 500], [0, -75]);

  return (
    <section className="relative overflow-hidden min-h-[80vh] flex items-center">
      {/* Animated Background */}
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        {/* Coastal Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-soft-sand/30 to-ocean-blue/10" />

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.3))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.3))]" />

        {/* Floating Gradient Orbs - Coastal Theme */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-ocean-blue/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-coral-orange/15 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Additional coastal orb */}
        <motion.div
          className="absolute top-1/2 right-1/3 w-64 h-64 bg-soft-sand/20 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Floating Coastal Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 2.5}
            duration={20 + i * 3}
            initialX={Math.random() * 100}
            initialY={700 + Math.random() * 200}
          />
        ))}
      </div>

      <div className="container relative z-10" ref={ref}>
        <motion.div
          className="mx-auto max-w-5xl text-center"
          style={{ y: contentY }}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Badge with Southwest Florida branding */}
          <motion.div variants={itemVariants}>
            <Badge
              variant="outline"
              className="mb-6 px-6 py-3 border-ocean-blue/30 bg-background/90 backdrop-blur-sm hover:bg-ocean-blue/10 transition-all duration-300"
            >
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
              >
                <Waves className="w-4 h-4 mr-2 text-ocean-blue" />
              </motion.div>
              Southwest Florida Business Insights
            </Badge>
          </motion.div>

          {/* Main Headline with Site Wave branding */}
          <motion.h1
            className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6 font-heading"
            variants={itemVariants}
          >
            <span className="block">Grow Your SWFL Business with</span>
            <span className="block bg-gradient-to-r from-ocean-blue via-coral-orange to-ocean-blue bg-clip-text text-transparent">
              Expert Digital Insights
            </span>
          </motion.h1>

          {/* Subtitle focused on local business value */}
          <motion.p
            className="text-xl text-muted-foreground max-w-4xl mx-auto mb-8 leading-relaxed"
            variants={itemVariants}
          >
            Practical guides, proven strategies, and local success stories to
            help your Cape Coral, Fort Myers, or Naples business thrive online.
            <span className="text-ocean-blue font-medium">
              {" "}
              Real advice from your neighbors in digital.
            </span>
          </motion.p>

          {/* CTA Buttons with Site Wave theming */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
            variants={itemVariants}
          >
            <Button
              size="lg"
              className="px-8 py-4 bg-ocean-blue hover:bg-ocean-blue/90 text-white font-medium group"
            >
              Start Learning
              <BookOpen className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 border-coral-orange text-coral-orange hover:bg-coral-orange hover:text-white font-medium group"
            >
              Free Consultation
              <MapPin className="ml-2 w-5 h-5 group-hover:scale-110 transition-transform" />
            </Button>
          </motion.div>

          {/* Stats Section - Local Focus */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-muted/30"
            variants={containerVariants}
          >
            <motion.div
              className="flex flex-col items-center"
              variants={statsVariants}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-ocean-blue rounded-full animate-pulse"></div>
                <span className="text-3xl font-bold text-ocean-blue font-heading">
                  {totalPosts}+
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Expert Articles Published
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center"
              variants={statsVariants}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-coral-orange rounded-full animate-pulse"></div>
                <span className="text-3xl font-bold text-coral-orange font-heading">
                  {totalBusinessesHelped}+
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                SWFL Businesses Helped
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col items-center"
              variants={statsVariants}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="w-3 h-3 bg-deep-navy rounded-full animate-pulse"></div>
                <span className="text-3xl font-bold text-deep-navy font-heading">
                  {totalSWFLReaders.toLocaleString()}+
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Local Readers Monthly
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
