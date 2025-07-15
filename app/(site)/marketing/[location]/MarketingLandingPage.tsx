"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MarketingContactForm } from "@/components/contact-forms/MarketingContactForm";
import {
  Star,
  Users,
  Trophy,
  Smartphone,
  Zap,
  Shield,
  ArrowDown,
  Phone,
  Globe,
  Code,
  Rocket,
  HeartHandshake,
} from "lucide-react";

interface MarketingLandingPageProps {
  location: string;
  price: string;
  offer?: string;
}

export function MarketingLandingPage({
  location,
  price,
  offer,
}: MarketingLandingPageProps) {
  const { scrollY } = useScroll();
  const formRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { once: true });
  const benefitsInView = useInView(benefitsRef, { once: true });

  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const features = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile-First Design",
      description: "Your website will look perfect on every device",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Optimized for speed and performance",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Reliable",
      description: "Built with security and uptime in mind",
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "SEO Optimized",
      description: "Designed to rank well in search engines",
    },
  ];

  const benefits = [
    {
      icon: <Trophy className="w-8 h-8 text-coral-orange" />,
      title: "Increase Your Sales",
      description:
        "Professional websites convert 3x more visitors into customers",
      stat: "300% Higher Conversion",
    },
    {
      icon: <Users className="w-8 h-8 text-ocean-blue" />,
      title: "Build Trust & Credibility",
      description: "75% of consumers judge credibility based on website design",
      stat: "75% Judge by Design",
    },
    {
      icon: <Globe className="w-8 h-8 text-green-600" />,
      title: "Reach More Customers",
      description: "Get found online by customers searching for your services",
      stat: "24/7 Online Presence",
    },
    {
      icon: <Rocket className="w-8 h-8 text-purple-600" />,
      title: "Stay Competitive",
      description:
        "Don&apos;t lose customers to competitors with better websites",
      stat: "Competitive Advantage",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Martinez",
      business: "Martinez Law Group",
      location: "Cape Coral, FL",
      text: "Site Wave transformed our online presence. We&apos;ve seen a 400% increase in leads since launching our new website!",
      rating: 5,
    },
    {
      name: "Mike Thompson",
      business: "Thompson Roofing & Construction",
      location: "Fort Myers, FL",
      text: "The team was amazing to work with. Our new website has helped us book more jobs than ever before.",
      rating: 5,
    },
    {
      name: "Dr. Lisa Rodriguez",
      business: "Coastal Medical Practice",
      location: "Naples, FL",
      text: "Professional, fast, and exactly what we needed. Our patients love our new online booking system.",
      rating: 5,
    },
  ];

  const process = [
    {
      step: "1",
      title: "Free Consultation",
      description: "We discuss your business goals and website needs",
      duration: "30 minutes",
    },
    {
      step: "2",
      title: "Custom Design",
      description: "Our designers create a beautiful, custom website",
      duration: "1-2 weeks",
    },
    {
      step: "3",
      title: "Development",
      description: "We build your website with modern technology",
      duration: "2-3 weeks",
    },
    {
      step: "4",
      title: "Launch & Support",
      description: "We launch your site and provide ongoing support",
      duration: "Ongoing",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity }}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-ocean-blue via-ocean-blue-600 to-ocean-blue-800"
      >
        {/* Animated Background */}
        <motion.div
          style={{ y: backgroundY }}
          className="absolute inset-0 opacity-10"
        >
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-coral-orange rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-soft-sand rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-2000"></div>
        </motion.div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {offer && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="mb-6"
              >
                <Badge className="bg-coral-orange text-white px-6 py-2 text-lg font-semibold animate-pulse">
                  🎉 {offer}
                </Badge>
              </motion.div>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Professional Website Design
              <br />
              <span className="text-coral-orange">
                for {location} Businesses
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-100"
            >
              Get a stunning, mobile-responsive website that converts visitors
              into customers.
              <br />
              <span className="text-coral-orange font-semibold">{price}</span> •
              Free Consultation & Design Guide
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
            >
              <Button
                onClick={scrollToForm}
                size="lg"
                className="bg-coral-orange hover:bg-coral-orange/90 text-white px-8 py-4 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-300 shadow-2xl"
              >
                Get Your Free Quote
                <ArrowDown className="ml-2 w-5 h-5" />
              </Button>

              <div className="flex items-center text-gray-200">
                <Phone className="w-5 h-5 mr-2" />
                <span className="text-lg">(555) 123-4567</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ delay: 1, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={heroInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.5 }}
                  className="text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg"
                >
                  <div className="text-coral-orange mb-2 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-sm">{feature.title}</h3>
                  <p className="text-xs text-gray-200 mt-1">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-white"
          >
            <ArrowDown className="w-6 h-6" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Benefits Section */}
      <motion.section ref={benefitsRef} className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Your {location} Business Needs a Professional Website
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              In today&apos;s digital world, your website is often the first
              impression customers have of your business.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.2, duration: 0.8 }}
              >
                <Card className="h-full p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-0">
                    <div className="mb-4 flex justify-center">
                      {benefit.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-3">{benefit.title}</h3>
                    <p className="text-gray-600 mb-4">{benefit.description}</p>
                    <Badge variant="outline" className="text-sm font-semibold">
                      {benefit.stat}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our {location} Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Join hundreds of satisfied business owners who trust Site Wave
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full">
                  <CardContent className="p-0">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-5 h-5 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                    <p className="text-gray-600 mb-6 italic">
                      &quot;{testimonial.text}&quot;
                    </p>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {testimonial.name}
                      </p>
                      <p className="text-gray-600">{testimonial.business}</p>
                      <p className="text-sm text-gray-500">
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

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Simple 4-Step Process
            </h2>
            <p className="text-xl text-gray-600">
              From consultation to launch, we make it easy
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-ocean-blue text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto">
                    {step.step}
                  </div>
                  {index < process.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-300"></div>
                  )}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600 mb-2">{step.description}</p>
                <Badge variant="outline">{step.duration}</Badge>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section ref={formRef} className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="p-8 shadow-2xl border-0 bg-gradient-to-r from-white to-gray-50">
              <MarketingContactForm
                location={location}
                price={price}
                className="max-w-none"
              />
            </Card>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-ocean-blue text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Grow Your {location} Business?
            </h2>
            <p className="text-xl mb-8 text-gray-100">
              Don&apos;t let your competitors get ahead. Get your professional
              website today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                onClick={scrollToForm}
                size="lg"
                className="bg-coral-orange hover:bg-coral-orange/90 text-white px-8 py-4 text-lg font-semibold rounded-full"
              >
                Start Your Project
              </Button>
              <div className="flex items-center">
                <HeartHandshake className="w-5 h-5 mr-2" />
                <span>100% Satisfaction Guarantee</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
