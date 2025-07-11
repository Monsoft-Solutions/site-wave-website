"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import {
  Building2,
  Users,
  TrendingUp,
  MapPin,
  Award,
  Globe,
  Star,
  Zap,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Interactive stat card component
const StatCard = ({
  icon: Icon,
  value,
  label,
  description,
  color,
  bgColor,
  delay = 0,
}: {
  icon: React.ComponentType<{ className?: string }>;
  value: number;
  label: string;
  description: string;
  color: string;
  bgColor: string;
  delay?: number;
}) => {
  const [ref, inView] = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  return (
    <motion.div
      ref={ref}
      className="relative group"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 50, scale: 0.9 }
      }
      transition={{
        duration: 0.6,
        delay: delay,
        type: "spring",
        stiffness: 100,
        damping: 15,
      }}
      whileHover={{
        scale: 1.02,
        y: -5,
        transition: { duration: 0.3 },
      }}
    >
      {/* Background glow effect */}
      <div
        className={`absolute inset-0 rounded-2xl ${bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm`}
      />

      {/* Card content */}
      <div className="relative p-8 bg-white border border-gray-200 rounded-2xl hover:border-blue-500/30 transition-all duration-500 group-hover:bg-white shadow-sm hover:shadow-lg">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div
            className={`p-4 rounded-full ${bgColor} group-hover:scale-110 transition-transform duration-300`}
          >
            <Icon className={`w-8 h-8 ${color}`} />
          </div>
        </div>

        {/* Animated counter */}
        <div className="text-center">
          <div className="text-4xl md:text-5xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors duration-300">
            {inView && (
              <CountUp
                end={value}
                duration={2}
                delay={delay}
                preserveValue
                suffix={value >= 100 ? "+" : ""}
              />
            )}
          </div>

          <p className="text-lg font-semibold text-gray-700 mb-2">{label}</p>

          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export function AboutStatsSection() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const stats = [
    {
      icon: Building2,
      value: 150,
      label: "SWFL Businesses Served",
      description: "From Cape Coral to Naples",
      color: "text-blue-600",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: TrendingUp,
      value: 85,
      label: "Average ROI Increase",
      description: "Within 6 months",
      color: "text-orange-600",
      bgColor: "bg-orange-500/10",
    },
    {
      icon: Award,
      value: 98,
      label: "Client Satisfaction Rate",
      description: "Based on project reviews",
      color: "text-blue-600",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Clock,
      value: 24,
      label: "Average Project Days",
      description: "From start to launch",
      color: "text-orange-600",
      bgColor: "bg-orange-500/10",
    },
  ];

  const achievements = [
    {
      icon: Star,
      title: "5-Star Reviews",
      description: "Consistent quality across all projects",
    },
    {
      icon: MapPin,
      title: "Local Expertise",
      description: "Deep understanding of SWFL markets",
    },
    {
      icon: Zap,
      title: "AI-Powered",
      description: "Cutting-edge tech at local prices",
    },
    {
      icon: Users,
      title: "Personal Service",
      description: "Direct access to our team",
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-white to-blue-50/30">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-orange-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container relative" ref={ref}>
        <motion.div
          className="mx-auto max-w-7xl"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <Badge
              variant="outline"
              className="mb-4 border-blue-500/30 text-blue-700"
            >
              <Award className="w-4 h-4 mr-2" />
              Our Impact
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gray-800">Real Results for</span>{" "}
              <span className="bg-gradient-to-r from-blue-600 to-orange-500 bg-clip-text text-transparent">
                Real Businesses
              </span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Numbers don&apos;t lie. Here&apos;s how we&apos;ve helped
              Southwest Florida businesses grow, thrive, and compete in the
              digital marketplace.
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <StatCard
                key={stat.label}
                icon={stat.icon}
                value={stat.value}
                label={stat.label}
                description={stat.description}
                color={stat.color}
                bgColor={stat.bgColor}
                delay={index * 0.1}
              />
            ))}
          </div>

          {/* Why These Numbers Matter */}
          <motion.div variants={itemVariants} className="mb-16">
            <div className="bg-gradient-to-r from-blue-600 to-orange-500 rounded-3xl p-8 lg:p-12 text-white">
              <div className="text-center mb-12">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Why These Numbers Matter
                </h3>
                <p className="text-lg opacity-90 max-w-3xl mx-auto">
                  Behind every statistic is a Southwest Florida business
                  that&apos;s reaching more customers, growing revenue, and
                  building their digital presence.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {achievements.map((achievement) => {
                  const IconComponent = achievement.icon;
                  return (
                    <div key={achievement.title} className="text-center">
                      <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold mb-2">
                        {achievement.title}
                      </h4>
                      <p className="text-sm opacity-80">
                        {achievement.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Client Success Stories Teaser */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="bg-white border border-gray-200 rounded-2xl p-8 lg:p-12 shadow-sm">
              <div className="max-w-4xl mx-auto">
                <Globe className="w-12 h-12 text-blue-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold mb-4 text-gray-800">
                  From Local Startups to Established Companies
                </h3>
                <p className="text-lg text-gray-600 mb-8">
                  We&apos;ve helped restaurants increase reservations, retail
                  stores boost online sales, service companies generate more
                  leads, and nonprofits expand their reach—all right here in
                  Southwest Florida.
                </p>
                <div className="grid md:grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      Restaurant
                    </div>
                    <div className="text-sm text-gray-500">
                      300% more online orders
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                      Retail Store
                    </div>
                    <div className="text-sm text-gray-500">
                      200% increase in foot traffic
                    </div>
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      Service Company
                    </div>
                    <div className="text-sm text-gray-500">
                      400% more qualified leads
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
