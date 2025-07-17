import { useRef } from "react";
import { useScroll, useTransform, useInView } from "framer-motion";

export function useMarketingAnimations() {
  const { scrollY } = useScroll();
  const formRef = useRef<HTMLDivElement>(null!);
  const heroRef = useRef<HTMLDivElement>(null!);
  const benefitsRef = useRef<HTMLDivElement>(null!);
  const processRef = useRef<HTMLDivElement>(null!);
  const featuresRef = useRef<HTMLDivElement>(null!);

  const heroInView = useInView(heroRef, { once: true });
  const benefitsInView = useInView(benefitsRef, { once: true });
  const processInView = useInView(processRef, { once: true });
  const featuresInView = useInView(featuresRef, { once: true });

  const backgroundY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return {
    refs: {
      formRef,
      heroRef,
      benefitsRef,
      processRef,
      featuresRef,
    },
    inView: {
      heroInView,
      benefitsInView,
      processInView,
      featuresInView,
    },
    transforms: {
      backgroundY,
      heroOpacity,
    },
    actions: {
      scrollToForm,
    },
  };
}
