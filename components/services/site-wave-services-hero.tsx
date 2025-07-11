"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, MapPin, Waves, CheckCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
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
    className="absolute w-6 h-6 text-ocean-blue/20"
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

export function SiteWaveServicesHero() {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true,
  });

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
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-soft-sand via-background to-ocean-blue/10 py-20 lg:py-32">
      {/* Coastal Background Pattern */}
      <div className="absolute inset-0 bg-grid-ocean-blue/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />

      {/* Floating Wave Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <FloatingWave
            key={i}
            delay={i * 1.5}
            duration={8 + i * 2}
            x={Math.random() * 1200}
            y={Math.random() * 800}
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <motion.div
              className="text-center lg:text-left"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {/* Badge */}
              <motion.div variants={itemVariants}>
                <Badge
                  variant="outline"
                  className="mb-6 px-6 py-3 text-sm border-ocean-blue/30 bg-background/90 backdrop-blur-sm hover:bg-ocean-blue/10 transition-all duration-300"
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
                  Digital Services for SWFL
                </Badge>
              </motion.div>

              {/* Main Headline */}
              <motion.div variants={itemVariants}>
                <h1 className="text-4xl font-bold font-heading tracking-tight sm:text-6xl lg:text-7xl mb-6 text-deep-navy">
                  <span className="block mb-2">Smart Digital</span>
                  <span className="bg-gradient-to-r from-ocean-blue via-coral-orange to-ocean-blue bg-clip-text text-transparent">
                    <TypeAnimation
                      sequence={[
                        "Solutions",
                        2000,
                        "Websites",
                        2000,
                        "Marketing",
                        2000,
                        "Automation",
                        2000,
                      ]}
                      wrapper="span"
                      repeat={Infinity}
                      speed={50}
                    />
                  </span>
                </h1>
              </motion.div>

              {/* Description */}
              <motion.div variants={itemVariants}>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl lg:mx-0 mx-auto">
                  Everything your Southwest Florida business needs to thrive
                  online. From websites to marketing to automation - we handle
                  it all so you can focus on what you do best.
                </p>
              </motion.div>

              {/* Location Badge */}
              <motion.div variants={itemVariants}>
                <div className="flex items-center gap-2 mb-8 justify-center lg:justify-start">
                  <MapPin className="w-5 h-5 text-coral-orange" />
                  <span className="text-muted-foreground">
                    Serving Cape Coral, Fort Myers, Naples & Beyond
                  </span>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div variants={itemVariants}>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                  <Button
                    asChild
                    size="lg"
                    className="bg-ocean-blue hover:bg-ocean-blue/90 text-white px-8 py-6 text-lg font-semibold group"
                  >
                    <Link href="/contact">
                      Get Free Consultation
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-ocean-blue text-ocean-blue hover:bg-ocean-blue hover:text-white px-8 py-6 text-lg font-semibold"
                  >
                    <Link href="#services">View Services</Link>
                  </Button>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Side - Features Grid */}
            <motion.div
              className="lg:block hidden"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              <div className="grid grid-cols-2 gap-6">
                {[
                  {
                    title: "Local Focus",
                    description: "Southwest Florida specialists",
                    icon: MapPin,
                  },
                  {
                    title: "All-in-One",
                    description: "Complete digital solutions",
                    icon: CheckCircle,
                  },
                  {
                    title: "Proven Results",
                    description: "200+ happy local clients",
                    icon: Star,
                  },
                  {
                    title: "Expert Team",
                    description: "Backed by Monsoft Solutions",
                    icon: Waves,
                  },
                ].map((feature) => (
                  <motion.div
                    key={feature.title}
                    variants={itemVariants}
                    className="bg-background/80 backdrop-blur-sm rounded-xl p-6 border border-ocean-blue/20 hover:border-ocean-blue/40 transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-ocean-blue/10 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className="w-6 h-6 text-ocean-blue" />
                    </div>
                    <h3 className="text-lg font-semibold font-heading text-deep-navy mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
