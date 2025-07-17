import {
  Monitor,
  Search,
  Building,
  ShoppingCart,
  Share2,
  Code,
} from "lucide-react";

export const getServiceIcon = (serviceName: string) => {
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
