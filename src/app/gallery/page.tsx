import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { GalleryBrowser } from "@/components/gallery/GalleryBrowser";
import { Section } from "@/components/ui/Section";
import { FinalCta } from "@/components/site/FinalCta";
import { getWork, works } from "@/data/gallery";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Selected cut, color, texture and extension work from the Laguna Beach team.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHeader
        eyebrow={`${works.length} pieces · Selected work`}
        lines={["The", <em key="e" className="italic-display">edit.</em>]}
        photo={getWork("w21").photo}
        lede="Curated, not collected. Every piece here was chosen because it shows a decision worth seeing."
        height="short"
      />

      <Section className="pt-14 md:pt-20">
        <GalleryBrowser />
      </Section>

      <FinalCta />
    </>
  );
}
