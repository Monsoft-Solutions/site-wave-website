"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  name: string;
  business: string;
  location: string;
  text: string;
  rating: number;
  result: string;
  index?: number;
  className?: string;
}

export function TestimonialCard({
  name,
  business,
  location,
  text,
  rating,
  result,
  index = 0,
  className = "",
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.2, duration: 0.8 }}
      viewport={{ once: true }}
      className={className}
    >
      <Card className="p-6 h-full">
        <CardContent className="p-0">
          <div className="flex mb-4">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
            ))}
          </div>
          <p className="text-gray-600 mb-4 italic">&quot;{text}&quot;</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-gray-900">{name}</p>
              <p className="text-gray-600">{business}</p>
              <p className="text-sm text-gray-500">{location}</p>
            </div>
            <Badge className="bg-green-100 text-green-800">{result}</Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
