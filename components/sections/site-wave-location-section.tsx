"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { MapPin, Phone, Users, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const locations = [
  {
    name: "Cape Coral",
    description:
      "Serving the growing business community in Cape Coral with digital solutions",
    icon: MapPin,
    stats: "500+ Businesses",
  },
  {
    name: "Fort Myers",
    description:
      "Helping Fort Myers companies establish strong online presence",
    icon: MapPin,
    stats: "Downtown Hub",
  },
  {
    name: "Naples",
    description:
      "Supporting Naples entrepreneurs with professional web services",
    icon: MapPin,
    stats: "Premium Market",
  },
  {
    name: "SWFL Region",
    description: "Extending our services throughout Southwest Florida",
    icon: MapPin,
    stats: "Regional Coverage",
  },
];

export function SiteWaveLocationSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-soft-sand/30 to-background">
      <div className="container mx-auto px-4" ref={ref}>
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-deep-navy mb-4">
              Proudly Serving Southwest Florida
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We understand the unique needs of local businesses in SWFL. Our
              team knows the market, the community, and what it takes to succeed
              here.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {locations.map((location, index) => (
            <motion.div
              key={location.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-ocean-blue/20">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-ocean-blue/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <location.icon className="w-6 h-6 text-ocean-blue" />
                  </div>
                  <h3 className="text-lg font-bold font-heading text-deep-navy mb-2">
                    {location.name}
                  </h3>
                  <p className="text-muted-foreground mb-3 text-sm">
                    {location.description}
                  </p>
                  <div className="text-xs font-semibold text-coral-orange">
                    {location.stats}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="bg-ocean-blue/5 rounded-2xl p-8 lg:p-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl lg:text-3xl font-bold font-heading text-deep-navy mb-4">
                Why Choose Local?
              </h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-ocean-blue flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-deep-navy">
                      Community Understanding
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      We know SWFL businesses, customers, and what works in our
                      local market
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-ocean-blue flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-deep-navy">
                      Personal Service
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Direct access to our team - no call centers or overseas
                      support
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-ocean-blue flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-semibold text-deep-navy">
                      Proven Results
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      Track record of helping local businesses grow and succeed
                      online
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center lg:text-left">
              <div className="bg-white rounded-xl p-6 shadow-lg inline-block">
                <div className="text-3xl font-bold text-ocean-blue mb-2">
                  Local Business
                </div>
                <div className="text-lg text-deep-navy mb-4">
                  ✓ Serving SWFL Since Day One
                </div>
                <div className="flex justify-center lg:justify-start gap-4 text-sm text-muted-foreground">
                  <div>Cape Coral</div>
                  <div>•</div>
                  <div>Fort Myers</div>
                  <div>•</div>
                  <div>Naples</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
