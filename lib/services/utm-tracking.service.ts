/**
 * UTM Parameter Tracking Service
 *
 * This service handles detection, storage, and retrieval of UTM parameters
 * for marketing campaign tracking across page navigation sessions.
 *
 * Features:
 * - Automatic UTM parameter detection from URL
 * - Session storage persistence across navigation
 * - Referrer tracking and landing page detection
 * - Type-safe UTM parameter handling
 * - Integration with contact form submissions
 */

export interface UTMParameters {
  utm_source?: string; // Traffic source (e.g., "google", "facebook", "newsletter")
  utm_medium?: string; // Marketing medium (e.g., "cpc", "social", "email")
  utm_campaign?: string; // Campaign name (e.g., "spring_sale", "new_product_launch")
  utm_term?: string; // Paid search keyword
  utm_content?: string; // Content variation (e.g., "banner_ad", "text_link")
}

export interface TrackingData extends UTMParameters {
  referrer_url?: string; // The page that referred the user
  landing_page_url?: string; // First page user visited in this session
  session_start?: string; // ISO timestamp of when tracking started
}

export interface FullTrackingData extends TrackingData {
  source_page_url: string; // Current page URL where form was submitted
  ip_address?: string; // Will be detected server-side
  user_agent?: string; // Will be detected server-side
}

// Session storage keys
const STORAGE_KEYS = {
  UTM_PARAMS: "utm_tracking_params",
  LANDING_PAGE: "utm_landing_page",
  REFERRER: "utm_referrer",
  SESSION_START: "utm_session_start",
} as const;

class UTMTrackingService {
  private isClient = typeof window !== "undefined";

  /**
   * Extract UTM parameters from URL search params
   */
  public extractUTMFromURL(url?: string): UTMParameters {
    if (!this.isClient && !url) return {};

    try {
      const urlToCheck = url || window.location.href;
      const urlObj = new URL(urlToCheck);
      const params = urlObj.searchParams;

      return {
        utm_source: params.get("utm_source") || undefined,
        utm_medium: params.get("utm_medium") || undefined,
        utm_campaign: params.get("utm_campaign") || undefined,
        utm_term: params.get("utm_term") || undefined,
        utm_content: params.get("utm_content") || undefined,
      };
    } catch (error) {
      console.warn("Failed to extract UTM parameters:", error);
      return {};
    }
  }

  /**
   * Check if any UTM parameters are present in the object
   */
  public hasUTMParameters(params: UTMParameters): boolean {
    return Object.values(params).some(
      (value) => value !== undefined && value !== ""
    );
  }

  /**
   * Store UTM parameters in session storage
   */
  public storeUTMParameters(params: UTMParameters): void {
    if (!this.isClient) return;

    try {
      // Only store if we have actual UTM parameters
      if (this.hasUTMParameters(params)) {
        sessionStorage.setItem(STORAGE_KEYS.UTM_PARAMS, JSON.stringify(params));

        // Store session start timestamp if not already set
        if (!sessionStorage.getItem(STORAGE_KEYS.SESSION_START)) {
          sessionStorage.setItem(
            STORAGE_KEYS.SESSION_START,
            new Date().toISOString()
          );
        }
      }
    } catch (error) {
      console.warn("Failed to store UTM parameters:", error);
    }
  }

  /**
   * Retrieve UTM parameters from session storage
   */
  public getStoredUTMParameters(): UTMParameters {
    if (!this.isClient) return {};

    try {
      const stored = sessionStorage.getItem(STORAGE_KEYS.UTM_PARAMS);
      return stored ? JSON.parse(stored) : {};
    } catch (error) {
      console.warn("Failed to retrieve UTM parameters:", error);
      return {};
    }
  }

  /**
   * Store referrer information
   */
  public storeReferrer(referrer?: string): void {
    if (!this.isClient) return;

    try {
      const referrerUrl = referrer || document.referrer || "";

      // Only store if we have a referrer and it's not from the same domain
      if (referrerUrl && !this.isSameDomain(referrerUrl)) {
        sessionStorage.setItem(STORAGE_KEYS.REFERRER, referrerUrl);
      }
    } catch (error) {
      console.warn("Failed to store referrer:", error);
    }
  }

  /**
   * Store landing page information
   */
  public storeLandingPage(url?: string): void {
    if (!this.isClient) return;

    try {
      const landingPage = url || window.location.href;

      // Only store if not already set (first page of session)
      if (!sessionStorage.getItem(STORAGE_KEYS.LANDING_PAGE)) {
        sessionStorage.setItem(STORAGE_KEYS.LANDING_PAGE, landingPage);
      }
    } catch (error) {
      console.warn("Failed to store landing page:", error);
    }
  }

  /**
   * Get complete tracking data including UTM, referrer, and landing page
   */
  public getTrackingData(): TrackingData {
    if (!this.isClient) return {};

    const utmParams = this.getStoredUTMParameters();
    const referrer = sessionStorage.getItem(STORAGE_KEYS.REFERRER) || undefined;
    const landingPage =
      sessionStorage.getItem(STORAGE_KEYS.LANDING_PAGE) || undefined;
    const sessionStart =
      sessionStorage.getItem(STORAGE_KEYS.SESSION_START) || undefined;

    return {
      ...utmParams,
      referrer_url: referrer,
      landing_page_url: landingPage,
      session_start: sessionStart,
    };
  }

  /**
   * Get complete tracking data for form submission
   */
  public getFormTrackingData(currentPageUrl?: string): FullTrackingData {
    const trackingData = this.getTrackingData();
    const sourcePageUrl =
      currentPageUrl || (this.isClient ? window.location.href : "");

    return {
      ...trackingData,
      source_page_url: sourcePageUrl,
    };
  }

  /**
   * Initialize UTM tracking for the current page
   * Call this on page load to capture UTM parameters and set up tracking
   */
  public initializeTracking(): void {
    if (!this.isClient) return;

    // Extract UTM parameters from current URL
    const utmParams = this.extractUTMFromURL();

    // Store UTM parameters if found
    if (this.hasUTMParameters(utmParams)) {
      this.storeUTMParameters(utmParams);
    }

    // Store referrer information
    this.storeReferrer();

    // Store landing page (only if first visit in session)
    this.storeLandingPage();
  }

  /**
   * Clear all stored tracking data
   */
  public clearTrackingData(): void {
    if (!this.isClient) return;

    try {
      Object.values(STORAGE_KEYS).forEach((key) => {
        sessionStorage.removeItem(key);
      });
    } catch (error) {
      console.warn("Failed to clear tracking data:", error);
    }
  }

  /**
   * Check if URL is from the same domain
   */
  private isSameDomain(url: string): boolean {
    if (!this.isClient) return false;

    try {
      const urlObj = new URL(url);
      return urlObj.hostname === window.location.hostname;
    } catch {
      return false;
    }
  }

  /**
   * Get UTM parameters formatted for Google Analytics
   */
  public getGATrackingData(): Record<string, string> {
    const trackingData = this.getTrackingData();
    const gaData: Record<string, string> = {};

    // Map UTM parameters to GA format
    if (trackingData.utm_source) gaData.utm_source = trackingData.utm_source;
    if (trackingData.utm_medium) gaData.utm_medium = trackingData.utm_medium;
    if (trackingData.utm_campaign)
      gaData.utm_campaign = trackingData.utm_campaign;
    if (trackingData.utm_term) gaData.utm_term = trackingData.utm_term;
    if (trackingData.utm_content) gaData.utm_content = trackingData.utm_content;

    return gaData;
  }

  /**
   * Debug method to log current tracking state
   */
  public debugTrackingState(): void {
    if (!this.isClient) {
      console.log("UTM Tracking Debug: Not in client environment");
      return;
    }

    const trackingData = this.getTrackingData();
    console.group("🎯 UTM Tracking Debug");
    console.log("Current URL:", window.location.href);
    console.log("UTM Parameters:", {
      utm_source: trackingData.utm_source || "Not set",
      utm_medium: trackingData.utm_medium || "Not set",
      utm_campaign: trackingData.utm_campaign || "Not set",
      utm_term: trackingData.utm_term || "Not set",
      utm_content: trackingData.utm_content || "Not set",
    });
    console.log("Referrer URL:", trackingData.referrer_url || "Not set");
    console.log(
      "Landing Page URL:",
      trackingData.landing_page_url || "Not set"
    );
    console.log("Session Start:", trackingData.session_start || "Not set");
    console.log("Has UTM Parameters:", this.hasUTMParameters(trackingData));
    console.groupEnd();
  }
}

// Export singleton instance
export const utmTrackingService = new UTMTrackingService();

// Export type-safe hooks for React components
export { UTMTrackingService };

// Utility functions for common use cases
export const extractUTMFromURL = (url?: string) =>
  utmTrackingService.extractUTMFromURL(url);
export const getTrackingData = () => utmTrackingService.getTrackingData();
export const getFormTrackingData = (currentPageUrl?: string) =>
  utmTrackingService.getFormTrackingData(currentPageUrl);
export const initializeTracking = () => utmTrackingService.initializeTracking();
export const clearTrackingData = () => utmTrackingService.clearTrackingData();
export const debugTrackingState = () => utmTrackingService.debugTrackingState();
