import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { VisitBlock } from "@/components/site/VisitBlock";
import { FinalCta } from "@/components/site/FinalCta";
import { coastPhotos } from "@/data/images";
import { cityLine, formattedAddress } from "@/data/site";

export const metadata: Metadata = {
  title: "Visit",
  description: `${formattedAddress}, ${cityLine}. Hours, parking and directions for Vogue Salon Laguna Beach.`,
};

export default function VisitPage() {
  return (
    <>
      <PageHeader
        eyebrow="Laguna Beach, California"
        lines={["Come", <em key="s" className="italic-display">and see us.</em>]}
        photo={coastPhotos[2]}
        lede="Free and metered parking along South Coast Highway. Walk-ins welcome when the floor allows."
        height="short"
      />

      <VisitBlock full />
      <FinalCta />
    </>
  );
}
