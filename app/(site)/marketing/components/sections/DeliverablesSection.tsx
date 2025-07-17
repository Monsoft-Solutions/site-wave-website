"use client";

import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface DeliverablesSectionProps {
  service: {
    name: string;
    deliverables: string[];
  };
}

export function DeliverablesSection({ service }: DeliverablesSectionProps) {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What You&apos;ll Receive
          </h2>
          <p className="text-xl text-gray-600">
            Complete deliverables for your {service.name.toLowerCase()} project
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {service.deliverables.map((deliverable, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full bg-white border-2 border-coral-orange/20">
                <CardContent className="p-0">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <Award className="w-8 h-8 text-coral-orange" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {deliverable}
                      </h3>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
