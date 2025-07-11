"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Quote, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    name: "Sarah Martinez",
    business: "Coastal Realty Group",
    location: "Cape Coral",
    rating: 5,
    text: "Site Wave transformed our online presence completely. Our new website is beautiful and we're getting more leads than ever before. They really understand the local market.",
  },
  {
    name: "Mike Thompson",
    business: "Thompson's HVAC",
    location: "Fort Myers",
    rating: 5,
    text: "The team at Site Wave made everything so easy. They handled our Google Business setup, website, and even our social media. Great local service!",
  },
  {
    name: "Jennifer Lee",
    business: "Bella Vista Salon",
    location: "Naples",
    rating: 5,
    text: "Working with Site Wave was the best decision for our business. Their SEO work has us showing up first on Google searches. Highly recommend!",
  },
];

export function SiteWaveTestimonialsSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-b from-ocean-blue/5 to-soft-sand/30">
      <div className="container mx-auto px-4" ref={ref}>
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-deep-navy mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real results from real Southwest Florida businesses
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-coral-orange text-coral-orange"
                      />
                    ))}
                  </div>
                  <div className="relative mb-6">
                    <Quote className="w-8 h-8 text-ocean-blue/20 absolute -top-2 -left-2" />
                    <p className="text-muted-foreground italic pl-6">
                      {testimonial.text}
                    </p>
                  </div>
                  <div className="border-t pt-4">
                    <p className="font-semibold text-deep-navy">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.business}
                    </p>
                    <p className="text-xs text-coral-orange font-medium">
                      {testimonial.location}
                    </p>
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
