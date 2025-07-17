import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { validLocations } from "@/app/(site)/marketing/[location]/services-config";

interface PageProps {
  params: Promise<{
    location: string;
  }>;
  searchParams: Promise<{
    price?: string;
    offer?: string;
    service?: string;
  }>;
}

function formatLocationName(location: string): string {
  return location
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { location } = await params;
  const { price = "Starting at $2,999" } = await searchParams;

  if (!validLocations.includes(location.toLowerCase())) {
    return {
      title: "Page Not Found",
      description: "The requested page could not be found.",
    };
  }

  const locationName = formatLocationName(location);
  const title = `Professional Website Design & Development in ${locationName} - Site Wave`;
  const description = `Get a stunning, mobile-responsive website for your ${locationName} business. ${price}. Free consultation and design guide. Custom web design that converts visitors to customers.`;

  return {
    title,
    description,
    keywords: [
      `website design ${locationName}`,
      `web development ${locationName}`,
      `small business website ${locationName}`,
      `professional website ${locationName}`,
      `responsive web design`,
      `custom website development`,
      `local web designer`,
      `affordable website design`,
    ],
    openGraph: {
      title,
      description,
      type: "website",
      url: `/marketing/${location}`,
      images: [
        {
          url: `/api/og?title=${encodeURIComponent(`Website Design in ${locationName}`)}&description=${encodeURIComponent(description)}`,
          width: 1200,
          height: 630,
          alt: `Website Design Services in ${locationName}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [
        `/api/og?title=${encodeURIComponent(`Website Design in ${locationName}`)}&description=${encodeURIComponent(description)}`,
      ],
    },
    alternates: {
      canonical: `/marketing/${location}`,
    },
  };
}

export default async function MarketingPage({
  params,
  searchParams,
}: PageProps) {
  const { location } = await params;
  const { price, offer, service } = await searchParams;

  if (!validLocations.includes(location.toLowerCase())) {
    notFound();
  }

  // Default service for backward compatibility
  const defaultService = service || "custom-website-development";

  // Build the query string for the redirect
  const queryParams = new URLSearchParams();
  if (price) queryParams.set("price", price);
  if (offer) queryParams.set("offer", offer);

  const queryString = queryParams.toString();
  const redirectUrl = `/marketing/${location}/${defaultService}${queryString ? `?${queryString}` : ""}`;

  // Redirect to the new service-specific structure
  redirect(redirectUrl);
}

export async function generateStaticParams() {
  // Pre-generate pages for major SWFL cities and key Florida markets
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

  return majorCities.map((location) => ({
    location,
  }));
}
