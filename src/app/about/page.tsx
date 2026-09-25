import type { Metadata } from "next";
import Link from "next/link";

import { PageHeader } from "@/components/site/PageHeader";
import { Figure, Parallax } from "@/components/ui/Figure";
import { DisplayLines, Reveal } from "@/components/ui/Reveal";
import { Section, SectionHead } from "@/components/ui/Section";
import { TextLink } from "@/components/ui/Actions";
import { FinalCta } from "@/components/site/FinalCta";
import { ArtistCard } from "@/components/artists/ArtistCard";
import { artists } from "@/data/artists";
import { coastPhotos, craftPhotos, interiorPhotos } from "@/data/images";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Vogue opened in Newport Beach in 1988. The Laguna Beach salon now stands on its own — same craft, its own voice.",
};

/**
 * The story told in five short chapters, photography-led. Deliberately light on
 * the history: enough to establish the lineage, not a company timeline.
 */
const chapters = [
  {
    n: "01",
    title: "Origins",
    body: [
      "Vogue opened in Newport Beach in 1988, founded by Donato Bianchini on a straightforward premise: put serious hairdressers in one room and the standard sets itself.",
      "Nearly four decades on, the Laguna Beach salon steps out under its own name. Same lineage, same standard, its own voice.",
    ],
  },
  {
    n: "02",
    title: "Craft",
    body: [
      "Everything starts dry, with a conversation. We look at how your hair grows, where it breaks, and what you will realistically do with it at home.",
      "The technique is not the point. The technique is what lets the idea survive contact with your Tuesday morning.",
    ],
  },
  {
    n: "03",
    title: "Education",
    body: [
      "Sassoon-trained cutters. Colorists with advanced education from Wella and Bumble and bumble, and colour intensives in New York.",
      "We keep training because the work keeps moving. A salon that stopped learning in 2015 looks exactly like a salon that stopped learning in 2015.",
    ],
  },
  {
    n: "04",
    title: "Individuality",
    body: [
      "There is no house look here. A house look is a shortcut, and it shows on everybody who walks out wearing it.",
      "What we have instead is a house standard, and eight people who will each read your hair slightly differently.",
    ],
  },
  {
    n: "05",
    title: "Laguna Beach",
    body: [
      "South Coast Highway, a short walk from the water. The light in this room is the same light you will be seen in, which changes how colour is judged.",
      "It is a small town with a serious eye. That suits us.",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow={`Est. ${site.established} · Newport Beach`}
        lines={["Vogue", <em key="l" className="italic-display">Laguna.</em>]}
        photo={interiorPhotos[0]}
        lede="An independent salon on South Coast Highway, with thirty-eight years of practice behind it."
      />

      {/* Opening statement ------------------------------------------------ */}
      <Section>
        <div className="gutter grid gap-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <DisplayLines
              lines={["Craft never", "stops", <em key="e" className="italic-display">evolving.</em>]}
              className="display-lg"
              stagger={120}
            />
          </div>
          <Reveal variant="up" delay={220} className="md:col-span-4 md:col-start-9 md:pb-3 md:self-end">
            <p className="body-lede text-charcoal">
              The old brand asked people to love their hair. We would rather earn it than ask for
              it — which mostly means listening harder and cutting better.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* A band of process photography ------------------------------------ */}
      <Parallax strength={0.14} className="h-[48vh] min-h-60 md:h-[72vh]">
        <Figure
          photo={craftPhotos[2]}
          width={2200}
          sizes="100vw"
          className="h-full"
          reveal={false}
          zoom={false}
        />
      </Parallax>

      {/* Chapters ---------------------------------------------------------- */}
      <Section tone="bone">
        <div className="gutter">
          {chapters.map((chapter, i) => (
            <div
              key={chapter.n}
              className="grid gap-8 border-t border-ink/12 py-14 md:grid-cols-12 md:py-20"
            >
              <Reveal variant="fade" className="md:col-span-3">
                <span className="eyebrow text-bronze">{chapter.n}</span>
                <h2 className="display-md mt-6">{chapter.title}</h2>
              </Reveal>

              <Reveal variant="up" delay={120} className="md:col-span-6 md:col-start-5">
                {chapter.body.map((paragraph, j) => (
                  <p
                    key={j}
                    className={`max-w-xl text-[1rem] leading-[1.9] text-charcoal ${j > 0 ? "mt-6" : ""}`}
                  >
                    {paragraph}
                  </p>
                ))}
              </Reveal>

              {/* Every other chapter gets a plate in the outer column. */}
              {i % 2 === 0 && (
                <Figure
                  photo={i === 0 ? craftPhotos[0] : i === 2 ? interiorPhotos[2] : coastPhotos[1]}
                  ratio="3/4"
                  width={700}
                  delay={160}
                  className="md:col-span-2 md:col-start-11"
                  sizes="(max-width: 768px) 100vw, 18vw"
                />
              )}
            </div>
          ))}
          <div className="border-t border-ink/12" />
        </div>
      </Section>

      {/* Team -------------------------------------------------------------- */}
      <Section>
        <div className="gutter">
          <SectionHead eyebrow="The team" aside={<TextLink href="/artists">All artists</TextLink>}>
            <h2 className="display-lg">
              Eight people,
              <br />
              <span className="italic-display">one standard.</span>
            </h2>
          </SectionHead>

          <div className="mt-20 grid grid-cols-2 gap-x-4 gap-y-14 md:mt-28 md:grid-cols-4 md:gap-x-6">
            {artists.slice(0, 4).map((artist, i) => (
              <ArtistCard
                key={artist.slug}
                artist={artist}
                delay={i * 80}
                showSpecialties={false}
                className={i % 2 === 1 ? "md:mt-16" : ""}
              />
            ))}
          </div>

          <Reveal variant="up" className="mt-16">
            <Link href="/artists" className="group inline-flex items-baseline gap-5">
              <span className="display-md transition-colors duration-700 group-hover:text-bronze">
                See everyone
              </span>
              <span className="label-ui text-ash">→</span>
            </Link>
          </Reveal>
        </div>
      </Section>

      <FinalCta />
    </>
  );
}
