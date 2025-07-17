"use client";

import { TestimonialCard } from "../shared/TestimonialCard";
import { getTestimonials } from "../../data/service-marketing-data";

interface TestimonialsSectionProps {
  location: string;
  service: {
    name: string;
  };
}

export function TestimonialsSection({
  location,
  service,
}: TestimonialsSectionProps) {
  const testimonials = getTestimonials(service.name);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Our {location} Clients Say
          </h2>
          <p className="text-xl text-gray-600">
            Real results from real businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              business={testimonial.business}
              location={testimonial.location}
              text={testimonial.text}
              rating={testimonial.rating}
              result={testimonial.result}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
