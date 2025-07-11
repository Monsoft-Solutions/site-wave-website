"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ArrowRight,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Clock,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us Today",
    description: "Ready to chat? We&apos;re here to help you succeed",
    action: "Call Now",
    href: "tel:+1-239-555-0123",
    color: "ocean-blue",
  },
  {
    icon: Mail,
    title: "Get Started Online",
    description: "Visit sitewavefl.com and tell us about your project",
    action: "Send Message",
    href: "/contact",
    color: "coral-orange",
  },
  {
    icon: Calendar,
    title: "Free Consultation",
    description: "No obligation meeting to discuss your needs",
    action: "Book Meeting",
    href: "/contact",
    color: "ocean-blue",
  },
];

const benefits = [
  "Free initial consultation",
  "Custom solutions for your business",
  "Local Southwest Florida expertise",
  "No obligation quote",
  "Fast response time",
  "Dedicated project manager",
];

export function SiteWaveServicesContact() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
      },
    },
  };

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-ocean-blue/10 to-soft-sand/30">
      <div className="container" ref={ref}>
        {/* Main CTA Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <Badge
            variant="outline"
            className="mb-4 px-4 py-2 text-sm border-coral-orange/30 bg-coral-orange/10 text-coral-orange"
          >
            Ready to Get Started?
          </Badge>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-deep-navy mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Let&apos;s discuss how we can help your Southwest Florida business
            succeed online. Free consultation • No obligation • Local expertise
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                size="lg"
                className="bg-ocean-blue hover:bg-ocean-blue/90 text-white px-8 py-6 text-lg font-semibold group"
              >
                <Link href="/contact">
                  <Calendar className="mr-2 h-5 w-5" />
                  Book Free Consultation
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-coral-orange text-coral-orange hover:bg-coral-orange hover:text-white px-8 py-6 text-lg font-semibold"
              >
                <Link href="/contact">Get Custom Quote</Link>
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Contact Methods Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {contactMethods.map((method) => (
            <motion.div key={method.title} variants={itemVariants}>
              <div className="group bg-background/80 backdrop-blur-sm rounded-xl p-8 border border-ocean-blue/20 hover:border-ocean-blue/40 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 text-center">
                <div className="flex justify-center mb-4">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                      method.color === "coral-orange"
                        ? "bg-coral-orange/10 text-coral-orange group-hover:bg-coral-orange group-hover:text-white"
                        : "bg-ocean-blue/10 text-ocean-blue group-hover:bg-ocean-blue group-hover:text-white"
                    }`}
                  >
                    <method.icon className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-lg font-bold font-heading text-deep-navy mb-2">
                  {method.title}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {method.description}
                </p>
                <Button
                  asChild
                  variant="outline"
                  className={`transition-all ${
                    method.color === "coral-orange"
                      ? "border-coral-orange text-coral-orange hover:bg-coral-orange hover:text-white"
                      : "border-ocean-blue text-ocean-blue hover:bg-ocean-blue hover:text-white"
                  }`}
                >
                  <Link href={method.href}>{method.action}</Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Section */}
        <motion.div
          className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-ocean-blue/20"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Benefits */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold font-heading text-deep-navy mb-6">
                What You Get When You Work With Us
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-ocean-blue flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Contact Info */}
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-ocean-blue to-coral-orange rounded-xl p-6 text-white">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6" />
                  <div>
                    <h4 className="font-semibold">Southwest Florida</h4>
                    <p className="text-sm opacity-90">
                      Cape Coral, Fort Myers, Naples & Beyond
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-6 h-6" />
                  <div>
                    <h4 className="font-semibold">Business Hours</h4>
                    <p className="text-sm opacity-90">
                      Mon-Fri: 8AM-6PM | Sat: 9AM-2PM
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-6 h-6" />
                  <div>
                    <h4 className="font-semibold">Response Time</h4>
                    <p className="text-sm opacity-90">Usually within 2 hours</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-muted-foreground mb-4">
                  Ready to transform your business? Let&apos;s start the
                  conversation.
                </p>
                <Button
                  asChild
                  size="lg"
                  className="bg-coral-orange hover:bg-coral-orange/90 text-white px-8 py-6 text-lg font-semibold group"
                >
                  <Link href="/contact">
                    Start Your Project
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom Testimonial */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="max-w-4xl mx-auto">
            <blockquote className="text-lg md:text-xl text-muted-foreground italic mb-6">
              &quot;Working with Site Wave was the best decision we made for our
              business. They took care of everything - from our website to our
              marketing - and we saw results within the first month. Highly
              recommend!&quot;
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-12 h-12 bg-coral-orange/10 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-coral-orange" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-deep-navy">
                  Mike Rodriguez
                </div>
                <div className="text-sm text-muted-foreground">
                  Fort Myers Business Owner
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
