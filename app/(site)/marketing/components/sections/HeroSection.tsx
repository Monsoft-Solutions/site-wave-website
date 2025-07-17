"use client";

import { motion, MotionValue } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, Phone } from "lucide-react";
import { getServiceIcon } from "../../../../../utils/serviceUtils";
import { FeatureCard } from "../shared/FeatureCard";
import { coreFeatures } from "../../data/service-marketing-data";

interface HeroSectionProps {
  location: string;
  service: {
    name: string;
    description: string;
  };
  price: string;
  originalPrice?: string;
  discount?: number;
  discountAmount?: string;
  offer?: string;
  heroRef: React.RefObject<HTMLDivElement>;
  heroInView: boolean;
  backgroundY: MotionValue<number>;
  heroOpacity: MotionValue<number>;
  scrollToForm: () => void;
}

export function HeroSection({
  location,
  service,
  price,
  originalPrice,
  discount,
  discountAmount,
  offer,
  heroRef,
  heroInView,
  backgroundY,
  heroOpacity,
  scrollToForm,
}: HeroSectionProps) {
  return (
    <motion.section
      ref={heroRef}
      style={{ opacity: heroOpacity }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-ocean-blue via-ocean-blue-600 to-ocean-blue-800"
    >
      {/* Animated Background */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 opacity-10"
      >
        <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-coral-orange rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-soft-sand rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {offer && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-6"
            >
              <Badge className="bg-coral-orange text-white px-6 py-2 text-lg font-semibold animate-pulse">
                🎉 {offer}
              </Badge>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mb-4"
          >
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6">
              <div className="text-coral-orange">
                {getServiceIcon(service.name)}
              </div>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            {service.name}
            <br />
            <span className="text-coral-orange">in {location}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-100"
          >
            {service.description}
            <br />
            {discount && originalPrice && originalPrice !== price ? (
              <span className="space-x-2">
                <span className="text-gray-400 line-through">
                  {originalPrice}
                </span>
                <span className="text-coral-orange font-semibold">{price}</span>
                <Badge className="bg-green-600 text-white">
                  Save {discountAmount} ({discount}% OFF)
                </Badge>
              </span>
            ) : (
              <span className="text-coral-orange font-semibold">{price}</span>
            )}{" "}
            • Free Consultation & Strategy Session
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <Button
              onClick={scrollToForm}
              size="lg"
              className="bg-coral-orange hover:bg-coral-orange/90 text-white px-8 py-4 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-300"
            >
              Get Started Today
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-ocean-blue hover:bg-ocean-blue hover:text-white hover:shadow-lg px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call (305) 797-4357
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={heroInView ? { opacity: 1 } : {}}
            transition={{ delay: 1, duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
          >
            {coreFeatures.map((feature, index) => (
              <FeatureCard
                key={index}
                iconName={
                  feature.iconName as "Smartphone" | "Zap" | "Shield" | "Target"
                }
                title={feature.title}
                description={feature.description}
                variant="core"
                index={index}
                inView={heroInView}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-white"
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
