import type { Metadata } from "next";
import { LegalPage } from "@/components/site/LegalPage";

export const metadata: Metadata = { title: "Accessibility" };

export default function AccessibilityPage() {
  return (
    <LegalPage
      title="Accessibility"
      intro="We want this site, and the salon itself, to work for everyone."
      sections={[
        {
          heading: "In the salon",
          body: "The Laguna Beach salon has step-free entry from South Coast Highway. Tell us when you book if there is anything we can do to make the visit easier.",
        },
        {
          heading: "On this site",
          body: "Built to WCAG 2.1 AA as a target: keyboard-navigable throughout, described imagery, and full support for reduced-motion preferences — set that in your system and the animations stand down.",
        },
        {
          heading: "Something not working?",
          body: "If any part of this site gets in your way, call us on (949) 376-7600 and we will fix it and help you in the meantime.",
        },
      ]}
    />
  );
}
