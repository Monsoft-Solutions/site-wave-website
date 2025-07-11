"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Phone, Mail, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function SiteWaveCtaSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-soft-sand/30 to-ocean-blue/10">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-deep-navy mb-6">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help your Southwest Florida business
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
                className="border-ocean-blue text-ocean-blue hover:bg-ocean-blue hover:text-white px-8 py-6 text-lg font-semibold"
              >
                <Link href="/services">View Our Services</Link>
              </Button>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-ocean-blue/10 rounded-full flex items-center justify-center">
                  <Phone className="w-8 h-8 text-ocean-blue" />
                </div>
              </div>
              <h3 className="text-lg font-bold font-heading text-deep-navy mb-2">
                Call Us Today
              </h3>
              <p className="text-muted-foreground">
                Ready to chat? We're here to help you succeed
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-coral-orange/10 rounded-full flex items-center justify-center">
                  <Mail className="w-8 h-8 text-coral-orange" />
                </div>
              </div>
              <h3 className="text-lg font-bold font-heading text-deep-navy mb-2">
                Get Started Online
              </h3>
              <p className="text-muted-foreground">
                Visit sitewave.io and tell us about your project
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-ocean-blue/10 rounded-full flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-ocean-blue" />
                </div>
              </div>
              <h3 className="text-lg font-bold font-heading text-deep-navy mb-2">
                Free Consultation
              </h3>
              <p className="text-muted-foreground">
                No obligation meeting to discuss your needs
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
