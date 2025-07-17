# UTM Parameter Tracking Documentation

## Overview

This document outlines the UTM parameter tracking system implemented in our application. The system captures marketing campaign data through UTM parameters and records this information when users submit contact forms. This enables accurate attribution of form submissions to specific marketing campaigns and ad sources.

## Table of Contents

1. [UTM Parameter Basics](#utm-parameter-basics)
2. [Implementation Components](#implementation-components)
3. [How It Works](#how-it-works)
4. [Creating Campaign URLs](#creating-campaign-urls)
5. [Integration with Contact Forms](#integration-with-contact-forms)
6. [Database Storage](#database-storage)
7. [Analytics Integration](#analytics-integration)
8. [Testing UTM Tracking](#testing-utm-tracking)
9. [Reporting and Analysis](#reporting-and-analysis)
10. [Troubleshooting](#troubleshooting)

## UTM Parameter Basics

UTM parameters are tags added to URLs to track the effectiveness of online marketing campaigns. The five standard UTM parameters are:

- **utm_source**: Identifies the source of traffic (e.g., google, facebook, newsletter)
- **utm_medium**: Identifies the marketing medium (e.g., cpc, email, social)
- **utm_campaign**: Identifies the specific campaign (e.g., spring_sale, product_launch)
- **utm_term**: Identifies paid search terms
- **utm_content**: Differentiates similar content or links within the same ad

Additionally, our system tracks:

- **referrer_url**: The referring URL if available
- **landing_page_url**: The first page visited by the user

## Implementation Components

Our UTM tracking system consists of several components:

1. **UTM Tracking Service**: Core service that extracts, stores, and retrieves UTM data
2. **UTM Tracking Hook**: React hook that makes UTM data available to components
3. **UTM Tracking Initializer**: Component that initializes tracking on page load
4. **Form Integration**: Integration with various contact forms
5. **API Handling**: Backend processing of UTM data
6. **Database Schema**: Database fields to store UTM parameters

## How It Works

1. When a user visits the site via a URL containing UTM parameters, the UTM Tracking Initializer detects these parameters.
2. The parameters are extracted and stored in the browser's session storage.
3. When the user navigates through the site, these parameters are preserved.
4. When the user submits a contact form, the stored UTM parameters are attached to the submission.
5. The backend API saves these parameters along with the form submission data in the database.
6. The data is also sent to Google Analytics for campaign tracking.

## Creating Campaign URLs

To track campaigns effectively, append UTM parameters to your campaign URLs:

```
https://www.example.com/landing-page?utm_source=google&utm_medium=cpc&utm_campaign=spring_promo&utm_term=web_design&utm_content=responsive_ad
```

### URL Parameters Explained:

- **utm_source=google**: Traffic source (Google)
- **utm_medium=cpc**: Marketing medium (cost-per-click)
- **utm_campaign=spring_promo**: Campaign name
- **utm_term=web_design**: Search term targeted
- **utm_content=responsive_ad**: Ad variant identifier

### URL Builders:

- [Google Analytics Campaign URL Builder](https://ga-dev-tools.google/campaign-url-builder/)
- [Facebook Campaign URL Builder](https://www.facebook.com/business/google-analytics/build-your-url)

## Integration with Contact Forms

UTM parameters are automatically captured in all contact forms including:

- Basic Contact Form
- Marketing Contact Form
- Enhanced Contact Forms

The forms use the `useFormTrackingData` hook to retrieve stored UTM data and include it with form submissions.

### Example Integration:

```typescript
// Import the tracking hook
import { useFormTrackingData } from "@/lib/hooks/use-utm-tracking";

// In your form component
const { getTrackingDataForSubmission } = useFormTrackingData();

// When submitting the form
const handleSubmit = async (data) => {
  // Get UTM data from session storage
  const trackingData = getTrackingDataForSubmission();

  // Combine form data with UTM data
  const submissionData = {
    ...data,
    utmSource: trackingData.utm_source,
    utmMedium: trackingData.utm_medium,
    utmCampaign: trackingData.utm_campaign,
    utmTerm: trackingData.utm_term,
    utmContent: trackingData.utm_content,
    referrerUrl: trackingData.referrer_url,
    landingPageUrl: trackingData.landing_page_url,
  };

  // Submit the combined data
  await submitForm(submissionData);
};
```

## Database Storage

UTM parameters are stored in the `contact_submissions` table with the following fields:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_term`
- `utm_content`
- `referrer_url`
- `landing_page_url`

This allows for detailed analysis of which marketing campaigns and channels are generating leads.

## Analytics Integration

The UTM tracking system integrates with Google Analytics to provide additional insights:

1. UTM parameters are automatically captured by Google Analytics
2. Form submissions are tracked as conversion events
3. Campaign performance can be analyzed in the Google Analytics dashboard

## Testing UTM Tracking

To test the UTM tracking system:

1. Create a test URL with UTM parameters:

   ```
   http://localhost:3000/?utm_source=test_source&utm_medium=test_medium&utm_campaign=test_campaign
   ```

2. Visit the URL and check session storage:
   - Open browser developer tools
   - Navigate to Application > Session Storage
   - Verify that UTM parameters are stored

3. Submit a contact form and verify in the database that UTM parameters are saved with the submission.

## Reporting and Analysis

You can analyze campaign performance using database queries:

```sql
-- Count submissions by campaign source
SELECT utm_source, COUNT(*) as submission_count
FROM contact_submissions
WHERE utm_source IS NOT NULL
GROUP BY utm_source
ORDER BY submission_count DESC;

-- Analyze conversion rates by campaign
SELECT utm_campaign, COUNT(*) as submission_count
FROM contact_submissions
WHERE utm_campaign IS NOT NULL
GROUP BY utm_campaign
ORDER BY submission_count DESC;

-- Track performance over time
SELECT
  DATE_TRUNC('week', created_at) as week,
  utm_campaign,
  COUNT(*) as submissions
FROM contact_submissions
WHERE utm_campaign IS NOT NULL
GROUP BY week, utm_campaign
ORDER BY week DESC, submissions DESC;
```

## Troubleshooting

Common issues and solutions:

### UTM Parameters Not Being Captured

- Ensure the UTM Tracking Initializer is properly included in the root layout
- Verify that the URL parameters are correctly formatted
- Check browser console for any errors in the UTM tracking service

### UTM Data Not Persisting Across Pages

- Verify that session storage is working properly
- Check that the UTM tracking service is correctly initialized

### UTM Data Not Being Submitted with Forms

- Ensure the form is using the `useFormTrackingData` hook
- Verify that the form submission includes the UTM fields
- Check that the API endpoint is correctly processing UTM data

### Database Not Storing UTM Data

- Verify that the database schema includes the UTM fields
- Check API handlers for proper data processing
- Review database migration files if applicable
