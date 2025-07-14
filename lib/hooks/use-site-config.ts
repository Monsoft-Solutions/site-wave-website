import { useState, useEffect } from "react";

// Client-side site configuration type (subset of full configuration)
export type ClientSiteConfig = {
  name: string;
  description: string;
  ogImage: string;
  links: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    facebook?: string;
    instagram?: string;
  };
  creator: {
    name: string;
    email: string;
    twitter?: string;
    url?: string;
  };
  keywords: string[];
  language: string;
  locale: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
  };
  socialMedia: {
    twitter: {
      card: string;
      site?: string;
      creator?: string;
    };
  };
};

// Default fallback configuration for immediate use
const defaultConfig: ClientSiteConfig = {
  name: "Site Wave",
  description:
    "Site Wave by Monsoft Solutions provides website development, SEO, digital marketing, and business automation services for small businesses in Cape Coral, Fort Myers, Naples, and Southwest Florida.",
  ogImage: "/og-image.jpg",
  links: {
    twitter: "https://twitter.com/sitewavefl",
    github: "https://github.com/monsoft-solutions",
    linkedin: "https://linkedin.com/company/monsoft-solutions",
    facebook: "https://facebook.com/sitewavefl",
    instagram: "https://instagram.com/sitewavefl",
  },
  creator: {
    name: "Site Wave by Monsoft Solutions",
    email: "hello@sitewavefl.com",
    twitter: "@sitewavefl",
    url: "https://sitewavefl.com",
  },
  keywords: [
    "website development southwest florida",
    "SEO Cape Coral",
    "digital marketing Fort Myers",
    "web design Naples FL",
    "local business marketing SWFL",
    "Google Business Profile setup",
    "website redesign Florida",
    "CRM automation",
    "social media management",
    "local SEO services",
  ],
  language: "en",
  locale: "en_US",
  theme: {
    primaryColor: "#0077B6", // Ocean Blue
    secondaryColor: "#FF6B35", // Coral Orange
  },
  socialMedia: {
    twitter: {
      card: "summary_large_image",
      site: "@sitewavefl",
      creator: "@sitewavefl",
    },
  },
};

/**
 * Hook to fetch and manage site configuration on the client side
 * Returns default configuration immediately and updates with API data when available
 */
export function useSiteConfig() {
  const [config, setConfig] = useState<ClientSiteConfig>(defaultConfig);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/site-config");

        if (!response.ok) {
          throw new Error(
            `Failed to fetch site configuration: ${response.status}`
          );
        }

        const { data } = await response.json();
        setConfig(data);
      } catch (err) {
        console.warn(
          "Failed to fetch site configuration, using defaults:",
          err
        );
        setError(err instanceof Error ? err.message : "Unknown error");
        // Keep using default config on error
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return {
    config,
    loading,
    error,
    refetch: () => {
      setLoading(true);
      setError(null);
      // Re-trigger the fetch by changing a dependency
      window.location.reload();
    },
  };
}
