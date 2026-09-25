import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { SelectedWork } from "@/components/home/SelectedWork";
import { ServicesPreview } from "@/components/home/ServicesPreview";
import { ArtistsPreview } from "@/components/home/ArtistsPreview";
import { Philosophy } from "@/components/home/Philosophy";
import { Testimonials } from "@/components/home/Testimonials";
import { FromTheChair } from "@/components/home/FromTheChair";
import { VisitBlock } from "@/components/site/VisitBlock";
import { FinalCta } from "@/components/site/FinalCta";

/**
 * Homepage order follows the conversion path:
 * discover → see the work → meet the artists → understand the services → book.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Intro />
      <SelectedWork />
      <ServicesPreview />
      <ArtistsPreview />
      <Philosophy />
      <Testimonials />
      <FromTheChair />
      <VisitBlock />
      <FinalCta />
    </>
  );
}
