import { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceMarketingLandingPage } from "./ServiceMarketingLandingPage";
import {
  validServices,
  validLocations,
} from "@/app/(site)/marketing/[location]/services-config";

interface PageProps {
  params: Promise<{
    location: string;
    service: string;
  }>;
  searchParams: Promise<{
    price?: string;
    offer?: string;
    discount?: string;
  }>;
}

function formatLocationName(location: string): string {
  return location
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// Function to calculate discounted price
function calculatePrice(
  basePrice: string,
  discount?: string
): { originalPrice: string; finalPrice: string; discountAmount?: string } {
  if (!discount) {
    return { originalPrice: basePrice, finalPrice: basePrice };
  }

  // Extract numeric value from price string (e.g., "$2,999" -> 2999)
  const numericPrice = parseFloat(basePrice.replace(/[$,]/g, ""));
  const discountPercent = parseFloat(discount);

  if (
    isNaN(numericPrice) ||
    isNaN(discountPercent) ||
    discountPercent < 0 ||
    discountPercent > 100
  ) {
    return { originalPrice: basePrice, finalPrice: basePrice };
  }

  const discountAmount = (numericPrice * discountPercent) / 100;
  const finalPrice = numericPrice - discountAmount;

  // Format prices back to currency strings
  const formattedOriginal = `$${numericPrice.toLocaleString()}`;
  const formattedFinal = `$${Math.round(finalPrice).toLocaleString()}`;
  const formattedDiscount = `$${Math.round(discountAmount).toLocaleString()}`;

  return {
    originalPrice: formattedOriginal,
    finalPrice: formattedFinal,
    discountAmount: formattedDiscount,
  };
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { location, service } = await params;
  const { price, discount } = await searchParams;

  if (
    !validLocations.includes(location.toLowerCase()) ||
    !validServices[service as keyof typeof validServices]
  ) {
    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    };
  }

  const locationName = formatLocationName(location);
  const serviceConfig = validServices[service as keyof typeof validServices];
  const basePrice = price || serviceConfig.startingPrice;
  const { finalPrice, discountAmount } = calculatePrice(basePrice, discount);

  const title = `${serviceConfig.name} in ${locationName} - Site Wave | ${finalPrice}${discount ? ` (${discount}% OFF)` : ""}`;
  const description = `Professional ${serviceConfig.name.toLowerCase()} services in ${locationName}. ${serviceConfig.description} ${finalPrice}${discount ? ` - Save ${discountAmount} with ${discount}% discount!` : ""}. Free consultation and strategy session.`;

  return {
    title,
    description,
    keywords: [
      ...serviceConfig.keywords.map((keyword) => `${keyword} ${locationName}`),
      `${serviceConfig.name.toLowerCase()} ${locationName}`,
      `small business ${service} ${locationName}`,
      `professional ${service} ${locationName}`,
      `local ${service} services`,
      `affordable ${service}`,
      ...(discount
        ? [
            `${discount}% discount ${service}`,
            `cheap ${service} ${locationName}`,
          ]
        : []),
    ],
    openGraph: {
      title,
      description,
      type: "website",
      url: `/marketing/${location}/${service}`,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(`${serviceConfig.name} in ${locationName}`)}&description=${encodeURIComponent(description)}`,
          width: 1200,
          height: 630,
          alt: `${serviceConfig.name} Services in ${locationName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        `/api/og?title=${encodeURIComponent(`${serviceConfig.name} in ${locationName}`)}&description=${encodeURIComponent(description)}`,
      ],
    },
    alternates: {
      canonical: `/marketing/${location}/${service}`,
    },
  };
}

export default async function ServiceMarketingPage({
  params,
  searchParams,
}: PageProps) {
  const { location, service } = await params;
  const { price, offer, discount } = await searchParams;

  if (
    !validLocations.includes(location.toLowerCase()) ||
    !validServices[service as keyof typeof validServices]
  ) {
    notFound();
  }

  const locationName = formatLocationName(location);
  const serviceConfig = validServices[service as keyof typeof validServices];
  const basePrice = price || serviceConfig.startingPrice;
  const { originalPrice, finalPrice, discountAmount } = calculatePrice(
    basePrice,
    discount
  );

  return (
    <ServiceMarketingLandingPage
      location={locationName}
      service={serviceConfig}
      price={finalPrice}
      originalPrice={originalPrice}
      discount={discount}
      discountAmount={discountAmount}
      offer={offer}
    />
  );
}

export async function generateStaticParams() {
  // Pre-generate pages for major SWFL cities and key Florida markets with top converting services
  const majorCities = [
    "cape-coral",
    "fort-myers",
    "naples",
    "bonita-springs",
    "estero",
    "sarasota",
    "bradenton",
    "venice",
    "punta-gorda",
    "port-charlotte",
    "southwest-florida",
    "swfl",
    "florida",
    "tampa",
    "st-petersburg",
    "orlando",
    "miami",
    "fort-lauderdale",
  ];

  const topServices = Object.keys(validServices);

  const staticParams = [];
  for (const location of majorCities) {
    for (const service of topServices) {
      staticParams.push({
        location,
        service,
      });
    }
  }

  return staticParams;
}
