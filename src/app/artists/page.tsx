import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { ArtistDirectory } from "@/components/artists/ArtistDirectory";
import { Section } from "@/components/ui/Section";
import { FinalCta } from "@/components/site/FinalCta";
import { artists } from "@/data/artists";

export const metadata: Metadata = {
  title: "Artists",
  description:
    "The team at Vogue Salon Laguna Beach — cutters, colorists, texture and extension specialists.",
};

export default function ArtistsPage() {
  return (
    <>
      <PageHeader
        eyebrow={`${artists.length} artists · Laguna Beach`}
        lines={["Meet the", <em key="a" className="italic-display">artists.</em>]}
        photo={artists[2].portrait}
        lede="You are not booking a service, you are booking a person. Find the one whose work looks like what you want."
      />

      <Section className="pt-16 md:pt-20">
        <ArtistDirectory />
      </Section>

      <FinalCta />
    </>
  );
}
