"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { FeatureCard } from "../shared/FeatureCard";
import { whyChooseUs } from "../../data/service-marketing-data";

interface BenefitsSectionProps {
  location: string;
  service: {
    name: string;
    description: string;
    benefits: string[];
  };
  benefitsRef: React.RefObject<HTMLDivElement>;
  benefitsInView: boolean;
}

export function BenefitsSection({
  location,
  service,
  benefitsRef,
  benefitsInView,
}: BenefitsSectionProps) {
  return (
    <motion.section ref={benefitsRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Your {location} Business Needs {service.name}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {service.description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {service.benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1, duration: 0.8 }}
            >
              <Card className="h-full p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                <CardContent className="p-0">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <CheckCircle className="w-8 h-8 text-green-500" />
                    </div>
                    <div>
                      <p className="text-gray-700 font-medium">{benefit}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Why Choose Us */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {whyChooseUs.map((item, index) => (
            <FeatureCard
              key={index}
              iconName={item.iconName as "Trophy" | "Users" | "Award" | "Clock"}
              iconColor={item.iconColor}
              title={item.title}
              description={item.description}
              stat={item.stat}
              variant="benefit"
              index={index}
              inView={benefitsInView}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
