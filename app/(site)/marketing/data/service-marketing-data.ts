export const coreFeatures = [
  {
    iconName: "Smartphone",
    title: "Mobile-First",
    description: "Optimized for all devices",
  },
  {
    iconName: "Zap",
    title: "Fast Results",
    description: "Quick turnaround time",
  },
  {
    iconName: "Shield",
    title: "Reliable",
    description: "Secure and dependable",
  },
  {
    iconName: "Target",
    title: "Results-Driven",
    description: "Focused on your success",
  },
];

export const whyChooseUs = [
  {
    iconName: "Trophy",
    iconColor: "text-coral-orange",
    title: "Expert Team",
    description: "Experienced professionals dedicated to your success",
    stat: "10+ Years Experience",
  },
  {
    iconName: "Users",
    iconColor: "text-ocean-blue",
    title: "Local Focus",
    description: "We understand the Southwest Florida market",
    stat: "500+ Local Clients",
  },
  {
    iconName: "Award",
    iconColor: "text-green-600",
    title: "Proven Results",
    description: "Track record of delivering successful outcomes",
    stat: "98% Client Satisfaction",
  },
  {
    iconName: "Clock",
    iconColor: "text-purple-600",
    title: "Fast Delivery",
    description: "Quick turnaround without compromising quality",
    stat: "On-Time Delivery",
  },
];

export const getTestimonials = (serviceName: string) => [
  {
    name: "Sarah Martinez",
    business: "Martinez Law Group",
    location: "Cape Coral, FL",
    text: `Site Wave's ${serviceName.toLowerCase()} service transformed our business. We've seen incredible results!`,
    rating: 5,
    result: "+400% leads",
  },
  {
    name: "Mike Thompson",
    business: "Thompson Roofing",
    location: "Fort Myers, FL",
    text: `Professional team that delivered exactly what we needed. Highly recommend their ${serviceName.toLowerCase()} services.`,
    rating: 5,
    result: "+300% revenue",
  },
  {
    name: "Dr. Lisa Rodriguez",
    business: "Coastal Medical",
    location: "Naples, FL",
    text: `Outstanding work! Our ${serviceName.toLowerCase()} solution has exceeded our expectations.`,
    rating: 5,
    result: "+250% appointments",
  },
];
