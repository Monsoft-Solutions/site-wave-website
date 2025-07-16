"use client";

import { useEffect } from "react";
import { useUTMTracking } from "@/lib/hooks/use-utm-tracking";
import {
  trackEvent,
  initializeAnalytics,
  isAnalyticsEnabled,
} from "@/lib/utils/analytics";

/**
 * UTM Tracking Initializer Component
 *
 * This component should be included in the root layout to:
 * - Automatically detect and store UTM parameters from URLs
 * - Initialize session tracking for marketing campaigns
 * - Integrate UTM data with Google Analytics
 * - Provide debug information in development
 *
 * The component doesn't render any UI - it's purely for tracking initialization.
 */
export function UTMTrackingInitializer() {
  const {
    trackingData,
    isInitialized,
    hasUTMParams,
    getGATrackingData,
    debugTrackingState,
  } = useUTMTracking({
    autoInitialize: true,
    debug: process.env.NODE_ENV === "development",
  });

  // Send UTM data to Google Analytics when available
  useEffect(() => {
    if (isInitialized && hasUTMParams && typeof window !== "undefined") {
      try {
        // Get UTM data formatted for Google Analytics
        const gaData = getGATrackingData();

        // Send campaign tracking event to GA with UTM data
        if (Object.keys(gaData).length > 0) {
          trackEvent({
            action: "utm_campaign_tracked",
            category: "marketing",
            label: `${gaData.utm_source || "unknown"}_${gaData.utm_medium || "unknown"}_${gaData.utm_campaign || "unknown"}`,
          });

          // Also track as a specific campaign attribution event
          if (gaData.utm_source || gaData.utm_medium || gaData.utm_campaign) {
            trackEvent({
              action: "campaign_attribution",
              category: "marketing",
              label: `Source: ${gaData.utm_source || "unknown"}, Medium: ${gaData.utm_medium || "unknown"}, Campaign: ${gaData.utm_campaign || "unknown"}`,
            });
          }
        }
      } catch (error) {
        console.warn("Failed to send UTM data to Google Analytics:", error);
      }
    }
  }, [isInitialized, hasUTMParams, trackingData, getGATrackingData]);

  // Debug logging in development
  useEffect(() => {
    if (process.env.NODE_ENV === "development" && isInitialized) {
      // Add a slight delay to avoid console spam during hydration
      const timer = setTimeout(() => {
        if (hasUTMParams) {
          console.log("🎯 UTM Parameters detected and stored:", trackingData);
        } else {
          console.log("📝 UTM Tracking initialized (no UTM parameters found)");
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isInitialized, hasUTMParams, trackingData]);

  // Debug function available via console
  useEffect(() => {
    if (
      process.env.NODE_ENV === "development" &&
      typeof window !== "undefined"
    ) {
      // Make debug function available in console
      console.log(
        "🔧 Debug UTM tracking: Call debugTrackingState() from console"
      );
    }
  }, [debugTrackingState, trackingData]);

  // This component doesn't render anything
  return null;
}

/**
 * Enhanced Analytics Initializer with UTM Integration
 *
 * This component enhances the existing AnalyticsInitializer to include
 * UTM tracking alongside the existing analytics functionality.
 */
export function EnhancedAnalyticsInitializer() {
  useEffect(() => {
    if (isAnalyticsEnabled()) {
      // Initialize analytics with a small delay to ensure the page has loaded
      const timer = setTimeout(() => {
        initializeAnalytics();
      }, 200);

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <UTMTrackingInitializer />
    </>
  );
}
