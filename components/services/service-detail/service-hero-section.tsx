"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Clock,
  Star,
  MapPin,
  Phone,
  Waves,
  Sparkles,
  Target,
  CheckCircle,
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";

// Floating Wave Component
const FloatingWave = ({
  delay = 0,
  duration = 8,
  x = 0,
  y = 0,
}: {
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
}) => (
  <motion.div
    className="absolute w-8 h-8 text-ocean-blue/20"
    initial={{
      opacity: 0,
      x: x,
      y: y,
      scale: 0,
      rotate: 0,
    }}
    animate={{
      opacity: [0, 1, 0],
      y: y - 300,
      x: [x, x + 50, x - 50, x],
      scale: [0, 1, 0],
      rotate: [0, 180, 360],
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut",
    }}
  >
    <Waves className="w-full h-full" />
  </motion.div>
);

interface ServiceData {
  id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  timeline: string;
  category: string;
  featuredImage: string;
}

interface ServiceHeroSectionProps {
  service: ServiceData;
}

export function ServiceHeroSection({ service }: ServiceHeroSectionProps) {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  // Client-side wave generation to avoid hydration mismatch
  const [waves, setWaves] = useState<
    Array<{
      id: number;
      delay: number;
      duration: number;
      x: number;
      y: number;
    }>
  >([]);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    // Generate consistent waves only on client
    const newWaves = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      delay: i * 1.5,
      duration: 8 + (i % 4) * 2,
      x:
        ((typeof window !== "undefined" ? window.innerWidth : 1200) / 12) * i +
        (i % 3) * 80,
      y:
        (typeof window !== "undefined" ? window.innerHeight : 800) +
        (i % 4) * 20,
    }));

    setWaves(newWaves);
  }, []);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0.7]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.8 },
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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8, rotateY: -20 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring" as const,
        stiffness: 80,
        damping: 20,
        delay: 0.5,
      },
    },
  };

  const floatingVariants = {
    animate: {
      y: [0, -15, 0],
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut" as const,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-soft-sand/40 via-background to-ocean-blue/10">
      {/* Animated Coastal Background */}
      <motion.div className="absolute inset-0" style={{ y: y1, opacity }}>
        <div className="absolute inset-0 bg-grid-ocean-blue/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
      </motion.div>

      {/* Floating Waves */}
      {isClient && (
        <div className="absolute inset-0 pointer-events-none">
          {waves.map((wave) => (
            <FloatingWave key={wave.id} {...wave} />
          ))}
        </div>
      )}

      {/* Background Gradient Orbs */}
      <motion.div className="absolute inset-0" style={{ y: y2 }}>
        <motion.div
          className="absolute top-20 left-20 w-96 h-96 bg-ocean-blue/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-32 right-32 w-80 h-80 bg-coral-orange/20 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-64 h-64 bg-soft-sand/30 rounded-full blur-2xl"
          animate={{
            scale: [0.8, 1.4, 0.8],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />
      </motion.div>

      <div className="container relative z-10" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 lg:py-32">
          {/* Content Side */}
          <motion.div
            className="text-center lg:text-left"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            {/* Category Badge */}
            <motion.div variants={itemVariants}>
              <motion.div variants={floatingVariants} animate="animate">
                <Badge
                  variant="outline"
                  className="mb-6 px-6 py-3 text-sm border-ocean-blue/30 bg-ocean-blue/5 text-ocean-blue hover:bg-ocean-blue/10 transition-all duration-300"
                >
                  <Waves className="w-4 h-4 mr-2" />
                  {service.category} Service
                </Badge>
              </motion.div>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold font-heading text-deep-navy mb-6 leading-tight"
              variants={itemVariants}
            >
              {service.title}
              <motion.span
                className="block text-ocean-blue mt-2"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                for SWFL Businesses
              </motion.span>
            </motion.h1>

            {/* Description */}
            <motion.p
              className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed max-w-2xl"
              variants={itemVariants}
            >
              {service.shortDescription}
            </motion.p>

            {/* Key Points */}
            <motion.div
              className="flex flex-wrap gap-4 mb-8"
              variants={itemVariants}
            >
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 text-ocean-blue mr-2" />
                <span>{service.timeline}</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 text-coral-orange mr-2" />
                <span>Southwest Florida</span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground">
                <Star className="w-4 h-4 text-ocean-blue mr-2" />
                <span>5-Star Local Service</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-8"
              variants={itemVariants}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-ocean-blue hover:bg-ocean-blue/90 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Link href="#contact">
                    Get Free Consultation
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="border-coral-orange text-coral-orange hover:bg-coral-orange hover:text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300"
                >
                  <Link href="tel:+1-239-XXX-XXXX">
                    <Phone className="w-5 h-5 mr-2" />
                    Call Now
                  </Link>
                </Button>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground"
              variants={itemVariants}
            >
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-ocean-blue mr-2" />
                <span>100+ Happy Clients</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-coral-orange mr-2" />
                <span>Local SWFL Team</span>
              </div>
              <div className="flex items-center">
                <CheckCircle className="w-4 h-4 text-ocean-blue mr-2" />
                <span>Results Guaranteed</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Image Side */}
          <motion.div
            className="relative"
            variants={imageVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-2xl border border-ocean-blue/20 bg-background"
              whileHover={{
                scale: 1.02,
                rotateY: 5,
                rotateX: 2,
              }}
              transition={{ duration: 0.3 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src={service.featuredImage}
                alt={`${service.title} - Site Wave Digital Services`}
                width={600}
                height={400}
                className="w-full h-auto"
                priority
              />

              {/* Floating Elements */}
              <motion.div
                className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg"
                variants={floatingVariants}
                animate="animate"
              >
                <div className="flex items-center text-sm">
                  <Star className="w-4 h-4 text-coral-orange mr-1" />
                  <span className="font-semibold text-deep-navy">
                    5.0 Rating
                  </span>
                </div>
              </motion.div>

              <motion.div
                className="absolute bottom-4 left-4 bg-ocean-blue/90 backdrop-blur-sm text-white rounded-xl px-4 py-2 shadow-lg"
                variants={floatingVariants}
                animate="animate"
                transition={{ delay: 1 }}
              >
                <div className="flex items-center text-sm">
                  <Target className="w-4 h-4 mr-2" />
                  <span className="font-semibold">Local Experts</span>
                </div>
              </motion.div>

              {/* Sparkle Effects */}
              <motion.div
                className="absolute top-1/4 left-4 w-6 h-6 text-coral-orange/60"
                animate={{
                  scale: [0, 1, 0],
                  rotate: [0, 180, 360],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
              >
                <Sparkles className="w-full h-full" />
              </motion.div>

              <motion.div
                className="absolute bottom-1/3 right-6 w-4 h-4 text-ocean-blue/60"
                animate={{
                  scale: [0, 1, 0],
                  rotate: [0, -180, -360],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                  delay: 0.5,
                }}
              >
                <Sparkles className="w-full h-full" />
              </motion.div>
            </motion.div>

            {/* Background Glow */}
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-ocean-blue/20 to-coral-orange/20 rounded-2xl blur-xl opacity-0"
              animate={{
                opacity: [0, 0.7, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-ocean-blue/30 rounded-full flex justify-center">
          <motion.div
            className="w-1 h-3 bg-ocean-blue rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
