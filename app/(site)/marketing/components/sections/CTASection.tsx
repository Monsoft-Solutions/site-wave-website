"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { DollarSign, HeartHandshake } from "lucide-react";

interface CTASectionProps {
  location: string;
  service: {
    name: string;
  };
  price: string;
  originalPrice?: string;
  discount?: number;
  scrollToForm: () => void;
}

export function CTASection({
  location,
  service,
  price,
  originalPrice,
  discount,
  scrollToForm,
}: CTASectionProps) {
  return (
    <section className="py-20 bg-ocean-blue text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Transform Your {location} Business Today
          </h2>
          <p className="text-xl mb-8 text-gray-100">
            Don&apos;t wait - start your {service.name.toLowerCase()} project
            and see results fast!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              onClick={scrollToForm}
              size="lg"
              className="bg-coral-orange hover:bg-coral-orange/90 text-white px-8 py-4 text-lg font-semibold rounded-full"
            >
              <DollarSign className="w-5 h-5 mr-2" />
              {discount && originalPrice && originalPrice !== price ? (
                <span className="flex items-center gap-2">
                  Start for {price}
                  <span className="text-xs bg-white/20 px-2 py-1 rounded">
                    {discount}% OFF
                  </span>
                </span>
              ) : (
                `Start for ${price}`
              )}
            </Button>
            <div className="flex items-center">
              <HeartHandshake className="w-5 h-5 mr-2" />
              <span>100% Satisfaction Guarantee</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
