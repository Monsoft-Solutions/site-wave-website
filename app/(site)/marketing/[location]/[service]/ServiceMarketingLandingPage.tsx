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
  Code,
  HeartHandshake,
  CheckCircle,
  Target,
  Award,
  Clock,
  DollarSign,
  Search,
  ShoppingCart,
  Share2,
  Building,
  Monitor,
} from "lucide-react";

interface ServiceConfig {
  name: string;
  description: string;
  startingPrice: string;
  keywords: string[];
  benefits: string[];
  process: string[];
  features: string[];
  deliverables: string[];
}

interface ServiceMarketingLandingPageProps {
  location: string;
  service: ServiceConfig;
  price: string;
  originalPrice?: string;
  discount?: string;
  discountAmount?: string;
  offer?: string;
}

const getServiceIcon = (serviceName: string) => {
  const lowerName = serviceName.toLowerCase();
  if (lowerName.includes("website") || lowerName.includes("web"))
    return <Monitor className="w-8 h-8" />;
  if (lowerName.includes("seo")) return <Search className="w-8 h-8" />;
  if (lowerName.includes("google") || lowerName.includes("business"))
    return <Building className="w-8 h-8" />;
  if (lowerName.includes("e-commerce") || lowerName.includes("ecommerce"))
    return <ShoppingCart className="w-8 h-8" />;
  if (lowerName.includes("social")) return <Share2 className="w-8 h-8" />;
  return <Code className="w-8 h-8" />;
};

export function ServiceMarketingLandingPage({
  location,
  service,
  price,
  originalPrice,
  discount,
  discountAmount,
  offer,
}: ServiceMarketingLandingPageProps) {
  const { scrollY } = useScroll();
  const formRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const processRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  const heroInView = useInView(heroRef, { once: true });
  const benefitsInView = useInView(benefitsRef, { once: true });
  const processInView = useInView(processRef, { once: true });
  const featuresInView = useInView(featuresRef, { once: true });

  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const coreFeatures = [
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile-First",
      description: "Optimized for all devices",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Fast Results",
      description: "Quick turnaround time",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Reliable",
      description: "Secure and dependable",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Results-Driven",
      description: "Focused on your success",
    },
  ];

  const whyChooseUs = [
    {
      icon: <Trophy className="w-8 h-8 text-coral-orange" />,
      title: "Expert Team",
      description: "Experienced professionals dedicated to your success",
      stat: "10+ Years Experience",
    },
    {
      icon: <Users className="w-8 h-8 text-ocean-blue" />,
      title: "Local Focus",
      description: "We understand the Southwest Florida market",
      stat: "500+ Local Clients",
    },
    {
      icon: <Award className="w-8 h-8 text-green-600" />,
      title: "Proven Results",
      description: "Track record of delivering successful outcomes",
      stat: "98% Client Satisfaction",
    },
    {
      icon: <Clock className="w-8 h-8 text-purple-600" />,
      title: "Fast Delivery",
      description: "Quick turnaround without compromising quality",
      stat: "On-Time Delivery",
    },
  ];

  const testimonials = [
    {
      name: "Sarah Martinez",
      business: "Martinez Law Group",
      location: "Cape Coral, FL",
      text: `Site Wave's ${service.name.toLowerCase()} service transformed our business. We've seen incredible results!`,
      rating: 5,
      result: "+400% leads",
    },
    {
      name: "Mike Thompson",
      business: "Thompson Roofing",
      location: "Fort Myers, FL",
      text: `Professional team that delivered exactly what we needed. Highly recommend their ${service.name.toLowerCase()} services.`,
      rating: 5,
      result: "+300% revenue",
    },
    {
      name: "Dr. Lisa Rodriguez",
      business: "Coastal Medical",
      location: "Naples, FL",
      text: `Outstanding work! Our ${service.name.toLowerCase()} solution has exceeded our expectations.`,
      rating: 5,
      result: "+250% appointments",
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

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-4"
            >
              <div
                className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm mb-6`}
              >
                <div className="text-coral-orange">
                  {getServiceIcon(service.name)}
                </div>
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              {service.name}
              <br />
              <span className="text-coral-orange">in {location}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-gray-100"
            >
              {service.description}
              <br />
              {discount && originalPrice && originalPrice !== price ? (
                <span className="space-x-2">
                  <span className="text-gray-400 line-through">
                    {originalPrice}
                  </span>
                  <span className="text-coral-orange font-semibold">
                    {price}
                  </span>
                  <Badge className="bg-green-600 text-white">
                    Save {discountAmount} ({discount}% OFF)
                  </Badge>
                </span>
              ) : (
                <span className="text-coral-orange font-semibold">{price}</span>
              )}{" "}
              • Free Consultation & Strategy Session
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
                className="bg-coral-orange hover:bg-coral-orange/90 text-white px-8 py-4 text-lg font-semibold rounded-full transform hover:scale-105 transition-all duration-300"
              >
                Get Started Today
              </Button>
              <Button
                variant="outline"
                size="lg"
                className=" text-ocean-blue hover:bg-ocean-blue hover:text-white hover:shadow-lg px-8 py-4 text-lg font-semibold rounded-full backdrop-blur-sm"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call (305) 797-4357
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ delay: 1, duration: 0.8 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
            >
              {coreFeatures.map((feature, index) => (
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

      {/* Service Benefits Section */}
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
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={benefitsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + index * 0.2, duration: 0.8 }}
              >
                <Card className="h-full p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <CardContent className="p-0">
                    <div className="mb-4 flex justify-center">{item.icon}</div>
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <Badge variant="outline" className="text-sm font-semibold">
                      {item.stat}
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Service Features Section */}
      <motion.section ref={featuresRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={featuresInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What&apos;s Included in Your {service.name} Package
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to succeed with {service.name.toLowerCase()}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full border-l-4 border-l-coral-orange">
                  <CardContent className="p-0">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-coral-orange" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {feature}
                        </h3>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Process Section */}
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

      {/* Testimonials Section */}
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
                    <p className="text-gray-600 mb-4 italic">
                      &quot;{testimonial.text}&quot;
                    </p>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">
                          {testimonial.name}
                        </p>
                        <p className="text-gray-600">{testimonial.business}</p>
                        <p className="text-sm text-gray-500">
                          {testimonial.location}
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        {testimonial.result}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What You&apos;ll Receive
            </h2>
            <p className="text-xl text-gray-600">
              Complete deliverables for your {service.name.toLowerCase()}{" "}
              project
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
    </div>
  );
}
