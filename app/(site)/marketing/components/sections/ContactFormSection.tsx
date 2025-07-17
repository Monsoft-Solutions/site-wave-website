"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { MarketingContactForm } from "@/components/contact-forms/MarketingContactForm";

interface ContactFormSectionProps {
  location: string;
  service: {
    name: string;
  };
  price: string;
  formRef: React.RefObject<HTMLDivElement>;
}

export function ContactFormSection({
  location,
  service,
  price,
  formRef,
}: ContactFormSectionProps) {
  return (
    <section ref={formRef} className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card className="p-8 shadow-2xl border-0 bg-gradient-to-r from-white to-gray-50">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-600">
                Get your {service.name.toLowerCase()} project started today
              </p>
            </div>
            <MarketingContactForm
              location={location}
              service={service.name}
              price={price}
              className="max-w-none"
            />
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
