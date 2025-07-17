"use client";

import { useMarketingAnimations } from "../../hooks/useMarketingAnimations";
import { HeroSection } from "../../components/sections/HeroSection";
import { BenefitsSection } from "../../components/sections/BenefitsSection";
import { FeaturesSection } from "../../components/sections/FeaturesSection";
import { ProcessSection } from "../../components/sections/ProcessSection";
import { TestimonialsSection } from "../../components/sections/TestimonialsSection";
import { DeliverablesSection } from "../../components/sections/DeliverablesSection";
import { ContactFormSection } from "../../components/sections/ContactFormSection";
import { CTASection } from "../../components/sections/CTASection";

interface ServiceWithDetails {
  name: string;
  description: string;
  benefits: string[];
  features: string[];
  process: string[];
  deliverables: string[];
}

interface ServiceMarketingLandingPageProps {
  location: string;
  service: ServiceWithDetails;
  price: string;
  originalPrice?: string;
  discount?: number;
  discountAmount?: string;
  offer?: string;
}

export function ServiceMarketingLandingPage({
  location,
  service,
  price,
  originalPrice,
  discount,
  discountAmount,
  offer,
}: ServiceMarketingLandingPageProps) {
  const { refs, inView, transforms, actions } = useMarketingAnimations();

  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        location={location}
        service={service}
        price={price}
        originalPrice={originalPrice}
        discount={discount}
        discountAmount={discountAmount}
        offer={offer}
        heroRef={refs.heroRef}
        heroInView={inView.heroInView}
        backgroundY={transforms.backgroundY}
        heroOpacity={transforms.heroOpacity}
        scrollToForm={actions.scrollToForm}
      />

      <BenefitsSection
        location={location}
        service={service}
        benefitsRef={refs.benefitsRef}
        benefitsInView={inView.benefitsInView}
      />

      <FeaturesSection service={service} featuresRef={refs.featuresRef} />

      <ProcessSection
        service={service}
        processRef={refs.processRef}
        processInView={inView.processInView}
      />

      <TestimonialsSection location={location} service={service} />

      <DeliverablesSection service={service} />

      <ContactFormSection
        location={location}
        service={service}
        price={price}
        formRef={refs.formRef}
      />

      <CTASection
        location={location}
        service={service}
        price={price}
        originalPrice={originalPrice}
        discount={discount}
        scrollToForm={actions.scrollToForm}
      />
    </div>
  );
}
