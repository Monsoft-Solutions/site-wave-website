"use client";

import { useEffect, useState, useCallback } from "react";
import {
  utmTrackingService,
  type UTMParameters,
  type TrackingData,
  type FullTrackingData,
} from "@/lib/services/utm-tracking.service";

/**
 * React hook for UTM parameter tracking
 *
 * This hook provides easy access to UTM tracking functionality
 * and automatically initializes tracking on mount.
 *
 * @param options Configuration options
 * @returns UTM tracking state and methods
 */
export function useUTMTracking(
  options: {
    /**
     * Whether to automatically initialize tracking on mount
     * @default true
     */
    autoInitialize?: boolean;
    /**
     * Whether to enable debug logging
     * @default false
     */
    debug?: boolean;
  } = {}
) {
  const { autoInitialize = true, debug = false } = options;

  const [trackingData, setTrackingData] = useState<TrackingData>({});
  const [isInitialized, setIsInitialized] = useState(false);
  const [hasUTMParams, setHasUTMParams] = useState(false);

  // Initialize tracking and update state
  const initializeTracking = useCallback(() => {
    try {
      console.log("Initializing UTM tracking");
      utmTrackingService.initializeTracking();
      const data = utmTrackingService.getTrackingData();
      setTrackingData(data);
      setHasUTMParams(utmTrackingService.hasUTMParameters(data));
      setIsInitialized(true);

      if (debug) {
        utmTrackingService.debugTrackingState();
      }
    } catch (error) {
      console.error("Failed to initialize UTM tracking:", error);
    }
  }, [debug]);

  // Get current tracking data
  const refreshTrackingData = useCallback(() => {
    const data = utmTrackingService.getTrackingData();
    setTrackingData(data);
    setHasUTMParams(utmTrackingService.hasUTMParameters(data));
    return data;
  }, []);

  // Get form tracking data with current page URL
  const getFormTrackingData = useCallback(
    (currentPageUrl?: string): FullTrackingData => {
      return utmTrackingService.getFormTrackingData(currentPageUrl);
    },
    []
  );

  // Extract UTM parameters from URL
  const extractUTMFromURL = useCallback((url?: string): UTMParameters => {
    return utmTrackingService.extractUTMFromURL(url);
  }, []);

  // Clear all tracking data
  const clearTrackingData = useCallback(() => {
    utmTrackingService.clearTrackingData();
    setTrackingData({});
    setHasUTMParams(false);
    setIsInitialized(false);
  }, []);

  // Debug current tracking state
  const debugTrackingState = useCallback(() => {
    utmTrackingService.debugTrackingState();
  }, []);

  // Get UTM data formatted for Google Analytics
  const getGATrackingData = useCallback(() => {
    return utmTrackingService.getGATrackingData();
  }, []);

  // Auto-initialize on mount
  useEffect(() => {
    if (autoInitialize && !isInitialized) {
      initializeTracking();
    }
  }, [autoInitialize, isInitialized, initializeTracking]);

  // Listen for page navigation changes to refresh data
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleLocationChange = () => {
        // Small delay to ensure URL has updated
        setTimeout(() => {
          refreshTrackingData();
        }, 100);
      };

      // Listen for popstate events (back/forward navigation)
      window.addEventListener("popstate", handleLocationChange);

      return () => {
        window.removeEventListener("popstate", handleLocationChange);
      };
    }
  }, [refreshTrackingData]);

  return {
    // State
    trackingData,
    isInitialized,
    hasUTMParams,

    // UTM parameters (for convenience)
    utmSource: trackingData.utm_source,
    utmMedium: trackingData.utm_medium,
    utmCampaign: trackingData.utm_campaign,
    utmTerm: trackingData.utm_term,
    utmContent: trackingData.utm_content,

    // Referrer and landing page data
    referrerUrl: trackingData.referrer_url,
    landingPageUrl: trackingData.landing_page_url,
    sessionStart: trackingData.session_start,

    // Methods
    initializeTracking,
    refreshTrackingData,
    getFormTrackingData,
    extractUTMFromURL,
    clearTrackingData,
    debugTrackingState,
    getGATrackingData,
  };
}

/**
 * Simplified hook that just returns current UTM parameters
 * Useful when you only need the UTM data without full tracking capabilities
 */
export function useUTMParameters(): UTMParameters & { hasParams: boolean } {
  const [utmParams, setUtmParams] = useState<UTMParameters>({});
  const [hasParams, setHasParams] = useState(false);

  useEffect(() => {
    const params = utmTrackingService.getStoredUTMParameters();
    setUtmParams(params);
    setHasParams(utmTrackingService.hasUTMParameters(params));
  }, []);

  return {
    ...utmParams,
    hasParams,
  };
}

/**
 * Hook that provides form-ready tracking data
 * Includes all tracking information needed for contact form submissions
 */
export function useFormTrackingData() {
  const { getFormTrackingData } = useUTMTracking();

  const getTrackingDataForSubmission = useCallback(
    (currentPageUrl?: string) => {
      return getFormTrackingData(currentPageUrl);
    },
    [getFormTrackingData]
  );

  return {
    getTrackingDataForSubmission,
  };
}
