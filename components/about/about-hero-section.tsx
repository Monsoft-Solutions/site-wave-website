"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronDown,
  MapPin,
  Building2,
  TrendingUp,
  Users,
  Rocket,
  Waves,
} from "lucide-react";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { TypeAnimation } from "react-type-animation";

// Floating Wave Particle Component
const FloatingWave = ({
  delay = 0,
  duration = 15,
  x = 0,
  y = 0,
  size = "w-3 h-3",
}: {
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  size?: string;
}) => (
  <motion.div
    className={`absolute ${size} bg-gradient-to-r from-blue-500/30 to-orange-500/30 rounded-full`}
    initial={{
      opacity: 0,
      x: x,
      y: y,
      scale: 0,
    }}
    animate={{
      opacity: [0, 1, 1, 0],
      y: y - 100,
      x: [x, x + 30, x - 30, x],
      scale: [0, 1, 1.2, 0],
      rotate: 360,
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      delay: delay,
      ease: "easeInOut",
    }}
  />
);

// Interactive coastal background
const CoastalBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 119, 182, 0.1), transparent)`,
        }}
        animate={{
          backgroundPosition: `${mousePosition.x * 0.05}px ${
            mousePosition.y * 0.05
          }px`,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />
    </div>
  );
};

export function AboutHeroSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [waves, setWaves] = useState<
    Array<{
      id: number;
      delay: number;
      duration: number;
      x: number;
      y: number;
      size: string;
    }>
  >([]);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);

    if (typeof window !== "undefined") {
      const newWaves = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        delay: i * 1.5,
        duration: 12 + (i % 4) * 2,
        x: (window.innerWidth / 12) * i + (i % 3) * 80,
        y: window.innerHeight + (i % 3) * 20,
        size: i % 3 === 0 ? "w-4 h-4" : i % 2 === 0 ? "w-3 h-3" : "w-2 h-2",
      }));
      setWaves(newWaves);
    }
  }, []);

  const { scrollY } = useScroll();
  // Reduce parallax effect and remove aggressive opacity fade
  const y1 = useTransform(scrollY, [0, 600], [0, 30]);
  const y2 = useTransform(scrollY, [0, 600], [0, -30]);
  // Keep opacity more stable - only start fading much later
  const opacity = useTransform(scrollY, [0, 800], [1, 0.3]);

  const springY1 = useSpring(y1, { stiffness: 100, damping: 30 });
  const springY2 = useSpring(y2, { stiffness: 100, damping: 30 });

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

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Coastal Gradient Background */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, 
            rgb(244, 241, 222) 0%, 
            rgb(244, 241, 222) 20%, 
            rgba(0, 119, 182, 0.1) 50%, 
            rgba(255, 107, 53, 0.1) 80%, 
            rgb(244, 241, 222) 100%)`,
        }}
        animate={{
          background: [
            "linear-gradient(135deg, rgb(244, 241, 222) 0%, rgba(0, 119, 182, 0.05) 50%, rgb(244, 241, 222) 100%)",
            "linear-gradient(225deg, rgb(244, 241, 222) 0%, rgba(255, 107, 53, 0.05) 50%, rgb(244, 241, 222) 100%)",
            "linear-gradient(315deg, rgb(244, 241, 222) 0%, rgba(0, 119, 182, 0.05) 50%, rgb(244, 241, 222) 100%)",
          ],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      />

      {/* Interactive Coastal Background */}
      <CoastalBackground />

      {/* Floating Wave Particles */}
      <div className="absolute inset-0 overflow-hidden">
        {isClient &&
          waves.map((wave) => (
            <FloatingWave
              key={wave.id}
              delay={wave.delay}
              duration={wave.duration}
              x={wave.x}
              y={wave.y}
              size={wave.size}
            />
          ))}
      </div>

      {/* Decorative Elements - Reduced parallax effect */}
      <motion.div
        className="absolute top-20 right-20 w-16 h-16 border-2 border-blue-500/20 rounded-full"
        style={{ y: springY1 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-12 h-12 bg-orange-500/10 rounded-lg rotate-45"
        style={{ y: springY2 }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="container relative">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
          className="mx-auto max-w-5xl text-center"
          style={{ opacity }}
        >
          {/* Location Badge */}
          <motion.div variants={itemVariants} className="mb-6 md:mb-8">
            <Badge
              variant="outline"
              className="bg-white/80 backdrop-blur-sm border-blue-500/30 text-blue-700 px-4 md:px-6 py-2 text-sm font-medium"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Proudly Serving Southwest Florida
            </Badge>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            variants={itemVariants}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 leading-tight px-4"
          >
            <span className="text-gray-800">Helping</span>{" "}
            <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
              SWFL Businesses
            </span>{" "}
            <br />
            <span className="text-gray-800">Ride the</span>{" "}
            <span className="bg-gradient-to-r from-orange-500 to-blue-600 bg-clip-text text-transparent flex items-center justify-center gap-2 md:gap-4">
              Digital Wave
              <Waves className="w-8 h-8 md:w-16 md:h-16 text-blue-500" />
            </span>
          </motion.h1>

          {/* Dynamic Subtitle */}
          <motion.div variants={itemVariants} className="mb-8 md:mb-12 px-4">
            <p className="text-lg md:text-xl lg:text-2xl text-gray-600 mb-4 md:mb-6 font-medium">
              We create{" "}
              <TypeAnimation
                sequence={[
                  "stunning websites",
                  2000,
                  "powerful SEO strategies",
                  2000,
                  "smart automations",
                  2000,
                  "effective marketing",
                  2000,
                  "digital success stories",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                className="text-blue-600 font-bold"
                repeat={Infinity}
              />{" "}
              for Cape Coral, Fort Myers, Naples, and beyond.
            </p>
            <p className="text-base md:text-lg text-gray-500 max-w-3xl mx-auto">
              Backed by Monsoft Solutions&apos; expertise in AI and custom
              software, Site Wave delivers practical, affordable digital
              solutions that help local entrepreneurs and small businesses
              thrive.
            </p>
          </motion.div>

          {/* Service Highlights */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12 max-w-4xl mx-auto px-4"
          >
            <div className="text-center group">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">
                <Building2 className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
              </div>
              <p className="font-semibold text-gray-700 text-sm md:text-base">
                Websites
              </p>
              <p className="text-xs md:text-sm text-gray-500">Custom Built</p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
              </div>
              <p className="font-semibold text-gray-700 text-sm md:text-base">
                SEO
              </p>
              <p className="text-xs md:text-sm text-gray-500">Local Focus</p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-6 h-6 md:w-8 md:h-8 text-blue-600" />
              </div>
              <p className="font-semibold text-gray-700 text-sm md:text-base">
                Marketing
              </p>
              <p className="text-xs md:text-sm text-gray-500">Results Driven</p>
            </div>
            <div className="text-center group">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-2 md:mb-3 group-hover:scale-110 transition-transform duration-300">
                <Rocket className="w-6 h-6 md:w-8 md:h-8 text-orange-600" />
              </div>
              <p className="font-semibold text-gray-700 text-sm md:text-base">
                Automation
              </p>
              <p className="text-xs md:text-sm text-gray-500">AI Powered</p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 md:gap-6 justify-center mb-12 md:mb-16 px-4"
          >
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              asChild
            >
              <Link href="/contact">
                Get Your Free Consultation
                <Rocket className="ml-2 w-4 h-4 md:w-5 md:h-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-semibold rounded-xl"
              asChild
            >
              <Link href="/services">View Our Services</Link>
            </Button>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-2"
          >
            <p className="text-sm text-gray-500">Learn More About Us</p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronDown className="w-6 h-6 text-blue-500" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
