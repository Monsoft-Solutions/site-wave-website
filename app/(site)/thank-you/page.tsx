import { ThankYouPage } from "@/components/sections/contact/thank-you-page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thank You - Site Wave",
  description:
    "Thank you for contacting Site Wave. We've received your message and will get back to you soon.",
  robots: "noindex, nofollow", // Prevent indexing of this page
};

export default function ThankYouPageRoute() {
  return <ThankYouPage />;
}
