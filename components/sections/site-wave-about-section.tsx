"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Shield, Zap, Users, Award } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Trusted Technology",
    description:
      "Backed by Monsoft Solutions' expertise in AI, automation, and enterprise software",
  },
  {
    icon: Zap,
    title: "AI-Driven Efficiency",
    description:
      "Leveraging smart automation to save time and money for your business",
  },
  {
    icon: Users,
    title: "Local Focus",
    description:
      "Dedicated to serving small businesses and entrepreneurs in Southwest Florida",
  },
  {
    icon: Award,
    title: "Quality Results",
    description:
      "Innovation, integrity, and efficiency in every project we deliver",
  },
];

export function SiteWaveAboutSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-background to-ocean-blue/5">
      <div className="container mx-auto px-4" ref={ref}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-deep-navy mb-6">
              Powered by
              <span className="text-ocean-blue"> Monsoft Solutions</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Site Wave is a specialized branch of{" "}
              <strong>Monsoft Solutions</strong>, a trusted technology company
              with global experience in AI automation, custom software
              development, and scalable business solutions.
            </p>
            <p className="text-lg text-muted-foreground mb-8">
              We bring enterprise-level expertise to local businesses, making
              advanced technology accessible and affordable for Southwest
              Florida entrepreneurs.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              >
                <div className="w-12 h-12 bg-ocean-blue/10 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-ocean-blue" />
                </div>
                <h3 className="text-lg font-bold font-heading text-deep-navy mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
