import type { Metadata } from "next";
import { PageHeader } from "@/components/site/PageHeader";
import { ServicesExplorer } from "@/components/services/ServicesExplorer";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { FinalCta } from "@/components/site/FinalCta";
import { pricingDisclaimers } from "@/data/services";
import { categoryPhotos } from "@/data/images";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Cut, color, texture and extensions at Vogue Salon Laguna Beach. Starting prices and what each service includes.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services & pricing"
        lines={["What we", <em key="d" className="italic-display">do here.</em>]}
        photo={categoryPhotos.color}
        lede="Four disciplines, one standard. Prices below are starting points — your artist will confirm before anything begins."
      />

      <Section className="pb-0 md:pb-0">
        <ServicesExplorer />
      </Section>

      {/* The disclaimers, given the space they deserve rather than 8pt grey. */}
      <Section tone="bone">
        <div className="gutter grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Reveal variant="fade" className="border-t border-ink/12 pt-4">
              <span className="eyebrow text-ash">Before you book</span>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:col-start-6">
            <ul className="space-y-7">
              {pricingDisclaimers.map((line, i) => (
                <Reveal as="li" key={i} variant="up" delay={i * 90} className="flex gap-6">
                  <span className="eyebrow shrink-0 pt-1.5 text-bronze">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="body-lede text-charcoal">{line}</p>
                </Reveal>
              ))}
            </ul>

            <Reveal variant="fade" delay={260} className="mt-14 border-t border-ink/12 pt-6">
              <h2 className="eyebrow text-ash">Cancellations</h2>
              <p className="mt-4 max-w-xl text-[0.9rem] leading-[1.85] text-ash">
                {site.cancellationPolicy}
              </p>
            </Reveal>
          </div>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
