import type { Metadata } from "next";
import { LegalPage } from "@/components/site/LegalPage";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy"
      intro="What we collect when you book, and what we do with it."
      sections={[
        {
          heading: "Booking information",
          body: "Appointments are handled by our booking provider. Name, contact details and appointment history are held there under that provider's terms.",
        },
        {
          heading: "This website",
          body: "The site records basic, aggregate usage so we can tell which pages are working. No profiles are built and nothing is sold.",
        },
        {
          heading: "Getting in touch",
          body: "To ask what we hold, or to have it removed, call the salon on (949) 376-7600.",
        },
      ]}
    />
  );
}
