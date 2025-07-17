"use client";

import { motion } from "framer-motion";

interface ProcessSectionProps {
  service: {
    name: string;
    process: string[];
  };
  processRef: React.RefObject<HTMLDivElement>;
  processInView: boolean;
}

export function ProcessSection({
  service,
  processRef,
  processInView,
}: ProcessSectionProps) {
  return (
    <motion.section ref={processRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={processInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our {service.name} Process
          </h2>
          <p className="text-xl text-gray-600">
            Simple, straightforward steps to get your project completed
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {service.process.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={processInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="text-center"
            >
              <div className="relative mb-6">
                <div className="w-16 h-16 bg-ocean-blue text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                  {index + 1}
                </div>
                {index < service.process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-300"></div>
                )}
              </div>
              <h3 className="text-xl font-bold mb-3">{step}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
