"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, MapPin, Phone, Mail, Waves } from "lucide-react";
import Link from "next/link";
import { trackEvent } from "@/lib/utils/analytics";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TypeAnimation } from "react-type-animation";

// Floating Wave Component for coastal theme
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
    className="absolute w-6 h-6 text-ocean-blue/30"
    initial={{
      opacity: 0,
      x: x,
      y: y,
      scale: 0,
    }}
    animate={{
      opacity: [0, 1, 0],
      y: y - 100,
      x: [x, x + 30, x - 30, x],
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

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const floatingVariants = {
  animate: {
    y: [0, -15, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export function SiteWaveHeroSection() {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -150]);

  const handleCTAClick = (cta: string) => {
    trackEvent({
      action: "site_wave_hero_cta_click",
      category: "conversion",
      label: cta,
    });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-soft-sand via-background to-ocean-blue/10 min-h-screen flex items-center">
      {/* Coastal Background Pattern */}
      <motion.div
        className="absolute inset-0 bg-grid-ocean-blue/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"
        style={{ y }}
      />

      {/* Floating Wave Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <FloatingWave
            key={i}
            delay={i * 1.5}
            duration={8 + i * 2}
            x={
              Math.random() *
              (typeof window !== "undefined" ? window.innerWidth : 1200)
            }
            y={
              Math.random() *
              (typeof window !== "undefined" ? window.innerHeight : 800)
            }
          />
        ))}
      </div>

      {/* Animated Background Gradient Orbs */}
      <motion.div
        className="absolute top-20 left-20 w-96 h-96 bg-ocean-blue/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 120, 240, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-80 h-80 bg-coral-orange/20 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 240, 120, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <div className="container relative z-10" ref={ref}>
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-20 lg:py-32">
            {/* Content */}
            <motion.div
              className="text-center lg:text-left"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {/* Badge */}
              <motion.div variants={itemVariants}>
                <motion.div variants={floatingVariants} animate="animate">
                  <Badge
                    variant="outline"
                    className="mb-6 px-6 py-3 text-sm border-ocean-blue/30 bg-background/90 backdrop-blur-sm hover:bg-ocean-blue/10 transition-all duration-300 cursor-pointer"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Waves className="w-4 h-4 mr-2 text-ocean-blue" />
                    </motion.div>
                    Serving Southwest Florida
                  </Badge>
                </motion.div>
              </motion.div>

              {/* Main Headline */}
              <motion.div variants={itemVariants}>
                <h1 className="text-4xl font-bold font-heading tracking-tight sm:text-6xl lg:text-7xl mb-6 text-deep-navy">
                  <motion.span
                    className="block"
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  >
                    Grow Your
                  </motion.span>
                  <motion.span
                    className="block text-ocean-blue"
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    Local Business
                  </motion.span>
                  <motion.span
                    className="block text-2xl sm:text-3xl lg:text-4xl font-medium text-muted-foreground mt-2"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                  >
                    with
                    <TypeAnimation
                      sequence={[
                        " Professional Websites",
                        2000,
                        " Smart SEO",
                        2000,
                        " Digital Marketing",
                        2000,
                        " Business Automation",
                        2000,
                      ]}
                      wrapper="span"
                      speed={50}
                      className="text-coral-orange ml-2"
                      repeat={Infinity}
                    />
                  </motion.span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.p
                className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                variants={itemVariants}
              >
                <strong className="text-deep-navy">Site Wave</strong> by Monsoft
                Solutions delivers high-quality digital services for small
                businesses and entrepreneurs in{" "}
                <strong className="text-ocean-blue">
                  Cape Coral, Fort Myers, Naples, and across Southwest Florida
                </strong>
                . We help you attract more customers and grow confidently.
              </motion.p>

              {/* Location Highlights */}
              <motion.div
                className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
                variants={itemVariants}
              >
                <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 border border-ocean-blue/20">
                  <MapPin className="w-4 h-4 text-ocean-blue" />
                  <span className="text-sm font-medium text-deep-navy">
                    Cape Coral
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 border border-ocean-blue/20">
                  <MapPin className="w-4 h-4 text-ocean-blue" />
                  <span className="text-sm font-medium text-deep-navy">
                    Fort Myers
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 border border-ocean-blue/20">
                  <MapPin className="w-4 h-4 text-ocean-blue" />
                  <span className="text-sm font-medium text-deep-navy">
                    Naples
                  </span>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                variants={itemVariants}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    asChild
                    size="lg"
                    className="bg-ocean-blue hover:bg-ocean-blue/90 text-white px-8 py-6 text-lg font-semibold group"
                    onClick={() => handleCTAClick("book_consultation")}
                  >
                    <Link href="/contact">
                      Book Free Consultation
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
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
                    className="border-ocean-blue text-ocean-blue hover:bg-ocean-blue hover:text-white px-8 py-6 text-lg font-semibold"
                    onClick={() => handleCTAClick("view_services")}
                  >
                    <Link href="/services">View Our Services</Link>
                  </Button>
                </motion.div>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                className="mt-12 flex flex-col sm:flex-row gap-6 justify-center lg:justify-start text-muted-foreground"
                variants={itemVariants}
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-ocean-blue" />
                  <span className="text-sm">Ready to chat? Let's connect</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-coral-orange" />
                  <span className="text-sm">Get started at sitewave.io</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Visual Element */}
            <motion.div
              className="relative lg:block hidden"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 1 }}
            >
              <div className="relative w-full h-96 bg-coastal-gradient rounded-3xl p-8 coastal-card">
                <div className="absolute inset-0 bg-gradient-to-br from-ocean-blue/10 to-coral-orange/10 rounded-3xl"></div>
                <div className="relative z-10 h-full flex flex-col justify-center items-center text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="mb-6"
                  >
                    <Waves className="w-20 h-20 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold font-heading text-white mb-4">
                    Local-Focused
                  </h3>
                  <p className="text-white/90 text-lg">
                    We understand the unique needs of Southwest Florida
                    businesses
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
