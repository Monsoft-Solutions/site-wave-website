"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Phone,
  Mail,
  MessageCircle,
  Calendar,
  Clock,
  Waves,
  MapPin,
  ArrowRight,
  CheckCircle,
  Gift,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

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

// Quick contact methods
const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our team",
    action: "tel:+1-239-555-0123",
    label: "(239) 555-0123",
    color: "ocean-blue",
    availability: "Mon-Fri 9AM-6PM EST",
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us a detailed message",
    action: "mailto:hello@sitewave.io",
    label: "hello@sitewave.io",
    color: "coral-orange",
    availability: "24/7 Response",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Quick questions & instant answers",
    action: "#contact-form",
    label: "Start Chat",
    color: "ocean-blue",
    availability: "Business Hours",
  },
  {
    icon: Calendar,
    title: "Book Meeting",
    description: "Schedule your free consultation",
    action: "#contact-form",
    label: "Free Consultation",
    color: "coral-orange",
    availability: "Same Week",
  },
];

// Southwest Florida locations we serve
const serviceLocations = [
  "Cape Coral",
  "Fort Myers",
  "Naples",
  "Bonita Springs",
  "Estero",
  "Marco Island",
];

// Free consultation benefits
const consultationBenefits = [
  "Custom strategy for your business",
  "Local market analysis",
  "Technology recommendations",
  "Competitive pricing options",
  "Timeline & next steps",
];

export function SiteWaveHeroContactSection() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [isBusinessHours, setIsBusinessHours] = useState(false);

  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -150]);

  // Update time and business hours status
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        timeZoneName: "short",
      });
      setCurrentTime(timeString);

      const hours = now.getHours();
      const isWeekday = now.getDay() >= 1 && now.getDay() <= 5;
      setIsBusinessHours(isWeekday && hours >= 9 && hours < 18);
    };

    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  const scrollToForm = () => {
    const formElement = document.getElementById("contact-form");
    if (formElement) {
      formElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-soft-sand via-background to-ocean-blue/10 min-h-[90vh] flex items-center pt-20">
      {/* Coastal Background Pattern */}
      <motion.div
        className="absolute inset-0 bg-grid-ocean-blue/5 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"
        style={{ y }}
      />

      {/* Floating Wave Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <FloatingWave
            key={i}
            delay={i * 1.2}
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
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-ocean-blue/20 rounded-full blur-3xl"
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
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-coral-orange/20 rounded-full blur-3xl"
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
          {/* Main Content */}
          <div className="text-center mb-16">
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <Badge
                variant="outline"
                className="px-6 py-3 text-sm border-ocean-blue/30 bg-background/90 backdrop-blur-sm hover:bg-ocean-blue/10 transition-all duration-300"
              >
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Waves className="w-4 h-4 text-ocean-blue" />
                  </motion.div>
                  <Clock className="w-3 h-3" />
                  <span>{currentTime}</span>
                  <div
                    className={`w-2 h-2 rounded-full ${
                      isBusinessHours ? "bg-green-500" : "bg-coral-orange"
                    } pulse`}
                  />
                  <span className="text-xs opacity-75">
                    {isBusinessHours
                      ? "We&apos;re online!"
                      : "We&apos;ll respond soon"}
                  </span>
                </div>
              </Badge>
            </motion.div>

            {/* Main Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h1 className="text-4xl font-bold font-heading tracking-tight sm:text-6xl lg:text-7xl mb-6 text-deep-navy">
                <span className="block">Let&apos;s Grow Your</span>
                <span className="block text-ocean-blue">SWFL Business</span>
              </h1>
            </motion.div>

            {/* Free Consultation Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-8"
            >
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-coral-orange to-coral-orange/80 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg">
                <Gift className="w-5 h-5" />
                <span>FREE Consultation • No Obligation • Local Experts</span>
              </div>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl text-muted-foreground max-w-4xl mx-auto leading-relaxed mb-8"
            >
              Ready to take your Southwest Florida business to the next level?
              Our local team specializes in websites, SEO, digital marketing,
              and automation solutions that help businesses in Cape Coral, Fort
              Myers, and Naples attract more customers and grow confidently.
            </motion.p>

            {/* Location Highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap gap-3 justify-center mb-12"
            >
              {serviceLocations.map((location) => (
                <div
                  key={location}
                  className="flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 border border-ocean-blue/20"
                >
                  <MapPin className="w-4 h-4 text-ocean-blue" />
                  <span className="text-sm font-medium text-deep-navy">
                    {location}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Contact Methods Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          >
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
              >
                <Card className="relative h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1 border-border hover:border-ocean-blue/30 group cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 mx-auto transition-colors duration-300 ${
                        method.color === "ocean-blue"
                          ? "bg-ocean-blue/10 group-hover:bg-ocean-blue text-ocean-blue group-hover:text-white"
                          : "bg-coral-orange/10 group-hover:bg-coral-orange text-coral-orange group-hover:text-white"
                      }`}
                    >
                      <method.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold font-heading text-deep-navy mb-2">
                      {method.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {method.description}
                    </p>
                    <div className="text-sm font-medium text-deep-navy mb-2">
                      {method.label}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {method.availability}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Free Consultation Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-ocean-blue/5 to-coral-orange/5 border-ocean-blue/20">
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <h3 className="text-2xl font-bold font-heading text-deep-navy mb-2">
                    What You&apos;ll Get in Your Free Consultation
                  </h3>
                  <p className="text-muted-foreground">
                    No sales pressure • Just valuable insights for your business
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {consultationBenefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-ocean-blue flex-shrink-0" />
                      <span className="text-sm text-deep-navy font-medium">
                        {benefit}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Button
                    size="lg"
                    className="bg-coral-orange hover:bg-coral-orange/90 text-white group"
                    onClick={scrollToForm}
                  >
                    Start Your Free Consultation
                    <motion.div
                      className="ml-2"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
