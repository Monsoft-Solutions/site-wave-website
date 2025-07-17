"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Smartphone,
  Zap,
  Shield,
  Target,
  Trophy,
  Users,
  Award,
  Clock,
  CheckCircle,
} from "lucide-react";

const iconMap = {
  Smartphone,
  Zap,
  Shield,
  Target,
  Trophy,
  Users,
  Award,
  Clock,
  CheckCircle,
};

interface FeatureCardProps {
  iconName: keyof typeof iconMap;
  iconColor?: string;
  title: string;
  description: string;
  stat?: string;
  index?: number;
  inView?: boolean;
  variant?: "default" | "benefit" | "core";
  className?: string;
}

export function FeatureCard({
  iconName,
  iconColor = "text-coral-orange",
  title,
  description,
  stat,
  index = 0,
  inView = true,
  variant = "default",
  className = "",
}: FeatureCardProps) {
  const IconComponent = iconMap[iconName];

  const getIconSize = () => {
    switch (variant) {
      case "core":
        return "w-6 h-6";
      case "benefit":
        return "w-8 h-8";
      default:
        return "w-6 h-6";
    }
  };

  const getDelay = () => {
    switch (variant) {
      case "benefit":
        return 0.5 + index * 0.2;
      case "core":
        return 1.2 + index * 0.1;
      default:
        return index * 0.1;
    }
  };

  const getCardStyle = () => {
    switch (variant) {
      case "core":
        return "text-center p-4 bg-white/10 backdrop-blur-sm rounded-lg";
      case "benefit":
        return "h-full p-6 text-center hover:shadow-lg transition-all duration-300 transform hover:scale-105";
      default:
        return "p-6 h-full hover:shadow-lg transition-all duration-300 transform hover:scale-105";
    }
  };

  if (variant === "core") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: getDelay(), duration: 0.5 }}
        className={`${getCardStyle()} ${className}`}
      >
        <div className="text-coral-orange mb-2 flex justify-center">
          <IconComponent className={getIconSize()} />
        </div>
        <h3 className="font-semibold text-sm">{title}</h3>
        <p className="text-xs text-gray-200 mt-1">{description}</p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: getDelay(), duration: 0.8 }}
      className={className}
    >
      <Card className={getCardStyle()}>
        <CardContent className="p-0">
          {variant === "benefit" ? (
            <>
              <div className="mb-4 flex justify-center">
                <IconComponent className={`${getIconSize()} ${iconColor}`} />
              </div>
              <h3 className="text-xl font-bold mb-3">{title}</h3>
              <p className="text-gray-600 mb-4">{description}</p>
              {stat && (
                <Badge variant="outline" className="text-sm font-semibold">
                  {stat}
                </Badge>
              )}
            </>
          ) : (
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <IconComponent className={`${getIconSize()} ${iconColor}`} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {title}
                </h3>
                <p className="text-gray-700 font-medium">{description}</p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
}
